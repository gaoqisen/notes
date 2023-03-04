---
title: Docker模拟集群并进行代码同步功能的练习记录
date: 2018-12-28 20:10:11
tags: linux docker rsync
categories: tool
keywords: docker
description: 由一个rsync服务端和多个rsync客服端实现同步。并把学习docker时的命令记录下来，方便以后在忘记命令是快速找到。
---

> 多个服务器同步的需求，利用rsync就可以实现。线上正式环境中无法进行测试，因此只能在本地进行测试，测试通过之后才可以在线上进行运行。虚拟机和docker我就不犹豫的选择了docker。看了下docker的文档，pull了ubuntu的进行模拟测试。

## docker

### docker Toolbox 更改镜像源

```
// 临时处理
docker-machine ssh default // 先进入虚拟机，default 是默认的虚拟机名称
sudo vi /var/lib/boot2docker/profile // 编辑这个文件，添加镜像源 --registry-mirror https://registry.docker-cn.com
sudo /etc/init.d/docker restart // 重启 docker 进程
exit // 退出虚拟机
docker info // 看一下镜像源是否设置成功（是否有刚刚设置的 --registry-mirror 这一行）
docker pull nginx // 现在可以愉快地拉取`nginx`镜像了

// 永久解决修改启动脚本 start.sh 注释掉 yes | "${DOCKER_MACHINE}" regenerate-certs "${VM}"
if [ "${VM_STATUS}" != "Running" ]; then
  "${DOCKER_MACHINE}" start "${VM}"
  # yes | "${DOCKER_MACHINE}" regenerate-certs "${VM}"
fi
```

### docker 构建脚本

```
FROM ubuntu:18.04
# 签名
MAINTAINER ln "1073825890@qq.com"
# 添加本地jdk到服务器
ADD jdk-8u191-linux-x64.tar /usr/local
# 添加本地tomcat到服务器
ADD apache-tomcat-8.5.37.tar.gz /usr/local
# 添加项目到tomcat的webapps文件中
ADD dpm.war /usr/local/apache-tomcat-8.5.37/webapps
# ADD时自动解压了，否则需要解压
#RUN tar -xzvf /usr/local/jdk-8u191
#RUN rm /usr/local/jdk-8u191-linux-x64.tar
#环境变量
ENV JAVA_HOME /usr/lib/jvm/java-8-oracle/
ENV CLASSPATH $JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar
ENV PATH $PATH:$JAVA_HOME/bin
# 设置中文
ENV LANG C.UTF-8
RUN mkdir -p /usr/lib/jvm \
        &&  mv /usr/local/jdk1.8.0_191/  /usr/lib/jvm/java-8-oracle/ \
        && apt-get update \
        && apt-get install net-tools -y \
        && apt-get install curl -y \
        && apt-get install vim -y \
        && apt-get install rsync -y \
        && apt-get install openssh-server -y \
        && echo "PermitRootLogin yes" >> /etc/ssh/sshd_config \
        && echo "Port 8000" >> /etc/ssh/sshd_config \
#       && sudo /etc/init.d/ssh stop && sudo /etc/init.d/ssh start
```

#### docker常用命令

```
docker build -t java:image .  // 用docker脚本进行构建项目
docker image ls  // 查看镜像
docker run --name=application001 -p 8888:8080 -itd ab  // 将本地的8888端口映射到docker应用的8080端口以交互模式重新分配一个伪输入终端在后台运行容器
docker exec -it ab /bin/bash  // 进入应用的命令行页面

docker stop ab  // 停止应用  ab为ID或名词
docker start ab  // 启动应用
docker rm ab   // 删除未运行的应用
docker image rm ab  // 删除镜像， 删除镜像时需要删除应用，删除应用时需要停止应用
docker inspect mycat  // 检查docker运行的容器
iptables -t nat -A docker -p tcp --dport 2222 -j DNAT --to-destination 172.17.0.2:22  // 把本地的2222映射到172.17.0.2的22端口上面。
docker port id // 查看映射端口，  映射的端口直接用127.0.0.1访问
```

- 通过构建docker > 查看镜像 > 运行应用 > 进入ubuntu命令行完成整个构建过程。强大的docker使用就这么简单的几步就把应用启动起来了。运行的时候可以用不同的端口运行多个应用。

## rsync同步代码

> rsync服务端需要安装sshpass、ssh、rsync才能进行同步

- 脚本

```shell
#/bin/bash
# 当前服务器项目绝对路径
fromPath=/usr/local/apache-tomcat-8.5.37/webapps/dpm/WEB-INF/classes/templates/
# tomcat里面的相对路径
toPath=/webapps/dpm/WEB-INF/classes/templates
# 依次为：IP 端口号 TOMCAT路径 SSH密码 登陆用户名。 多个服务器用如：("172.17.0.2 8000 /usr/local/apache-tomcat-8.5.37 123456" "172.17.0.2 8000 /usr/local/apache-tomcat-8.5.37 123456")注意中间空格隔开。 创建
的是一个shell的二维数组
servers=("172.17.0.2 8000 /usr/local/apache-tomcat-8.5.37 123456 root")
currentDate=`date "+%Y-%m-%d %H:%M:%S"`
input=$1
rsyncFun(){
        echo "${currentDate} INFO:rsync start !!!"
        for key in ${!servers[@]}
        do
                server=(${servers[$key]})
                rsync -e "sshpass -p ${server[3]} ssh -p ${server[1]}" -avH ${fromPath} ${server[4]}@${server[0]}:${server[2]}${toPath}
                if [ -n "${input}" ]
                then
                        # 注意tomcat的bin目录下setclasspath.sh文件里面的JAVA_HOME和JRE_HOME是否正常.如>果报错需要在if上方增加JAVA_HOME=/usr/lib/jvm/java-8-oracle和JRE_HOME=/usr/lib/jvm/java-8-oracle/jre
                        sshpass -p ${server[3]} ssh -p ${server[1]} ${server[4]}@${server[0]} "sh ${server[2]}/bin/shutdown.sh"
                        sshpass -p ${server[3]} ssh -p ${server[1]} ${server[4]}@${server[0]} "sh ${server[2]}/bin/startup.sh"
                fi
        done
}
endDate=`date "+%Y-%m-%d %H:%M:%S"`
timeFun(){
        startTime=`date -d "$currentDate" +%s`
        entTime=`date -d "$endDate" +%s`
        return $(($entTime-$startTime))
}
rsyncFun
timeFun
echo "${endDate} INFO:rsync success!!! $?"
```

> 运行的时候直接用bash fileName.sh进行启动，如果用sh fileName.sh启动的话，会报错。

