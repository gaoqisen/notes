---
title: Linux 使用jenkins+maven+git实现自动化部署java项目
date: 2018-10-11 12:50:11
tags: linux jenkins
categories: linux
---

要将项目发布到通过外网访问，就需要将jar或者war通过scp传到服务器，在启动项目。如果项目中更改了一行代码，那么就需要进行一下步骤：

1. 本地将项目打包为war或者jar包
2. 将打包后的文件传到服务器
3. 将之前项目kill掉
4. 将新项目移动到指定位置启动

但有了jenkins后我们就可以只需要将代码提交到git或者svn上面就可以了，其它的事情全部交给jenkins去完成。
要实现这个功能大概的思路如下：
### 1、安装jenkins（自动化配置）
### 2、安装git（管理项目）
### 3、安装maven(编译项目)
### 4、配置jenkins如下
- 安装插件 （jenkins集成tomcat、svn、git等的插件）
- 全局工具配置（让jenkins找到jdk,maven,git的环境变量等）
- 创建任务
## 一、安装jenkins
由于yum的repo里面没有jenkins,先配置yum
```
sudo wget -O /etc/yum.repos.d/jenkins.repo https://pkg.jenkins.io/redhat-stable/jenkins.repo
sudo rpm --import https://pkg.jenkins.io/redhat-stable/jenkins.io.key
```
yum安装
```
yum -y install jenkins
```
更改jenkins配置

```
vi /etc/sysconfig/jenkins    
```
将JENKINS_NAME改为root,JENKINS_PORT改为8081


启动jenkins
```
service jenkins start
```
开通8081的端口号之后，通过在外网用http://ip地址:8081 访问出现如下页面即可：
![Screen Shot 2018-09-28 at 11.40.06 AM.png](https://upload-images.jianshu.io/upload_images/7172355-94f52d212942da67.png)

根据提示，在/var/lib/jenkins/secrets/initialAdminPassword中找到密码复制进去点击继续，不要着急稍微等待一会之后即可看到如下页面
![Screen Shot 2018-09-28 at 11.51.35 AM.png](https://upload-images.jianshu.io/upload_images/7172355-56400f88e17f8e14.png)

之后点击第一个默认配置，右边的是自定义配置，不熟悉的可以选择第一个（左边的那个）之后就是漫长的等待，等jenkins下载基础插件
![Screen Shot 2018-09-28 at 11.53.46 AM.png](https://upload-images.jianshu.io/upload_images/7172355-3f1e8b681f8ec0aa.png)


安装完成之后就创建自己的账号和密码吧！
![Screen Shot 2018-09-28 at 11.55.40 AM.png](https://upload-images.jianshu.io/upload_images/7172355-03531f545de1a6be.png)

之后点击继续后出现下面这个页面就安装完成了
![Screen Shot 2018-09-28 at 11.57.43 AM.png](https://upload-images.jianshu.io/upload_images/7172355-6ac8274b849c4ab6.png)

##  二、安装maven
配置yum
```
wget http://repos.fedorapeople.org/repos/dchen/apache-maven/epel-apache-maven.repo -O /etc/yum.repos.d/epel-apache-maven.repo

```
yum安装
```
yum -y install apache-maven
```
查看是否安装成功

```
mvn -v
```
## 三、安装git
```
 yum -y  install git
 git --version   // 查看git版本号
```

## 四、配置jenkins
#### 1、安装插件
maven integration 插件：用于maven集成jenkins，如果不安装就不会有“构建一个maven”项目选项
![Screen Shot 2018-09-28 at 1.52.52 PM.png](https://upload-images.jianshu.io/upload_images/7172355-7bc48dc8e26005c3.png)

#### 2、全局工具配置（让jenkins找到jdk,maven,git等）

#### 3、新建任务
遇到的坑：
1、配置git出现如下错误
![Screen Shot 2018-09-28 at 2.15.07 PM.png](https://upload-images.jianshu.io/upload_images/7172355-d942152e96871a33.png)

因为此仓库为我的私有仓库，需要配置Credentials，点开add， Add Credentials的 Kind选择SSH Username with private key，Username选择之前在github上传的公钥用户的用户名，此次为root，Private Key为jenkins服务器登录github的本地私钥，查看私钥cat /root/.ssh/id_rsa （如果没有这个文件则生成命令为：ssh-keygen -t rsa）复制粘贴到Key区域，完成添加。此时可以发现报错已经消失。
构建的时候可能会遇到git超时可以安装这个处理[https://www.jianshu.com/p/264772bb9264]
(https://www.jianshu.com/p/264772bb9264)
要这个页面将超时时间设置长一些，我设置的是260分钟。默认是10分钟，由于项目比较大，通过git将项目迁到服务器总是超时。设置这个就好了
![Screen Shot 2018-09-29 at 12.59.39 PM.png](https://upload-images.jianshu.io/upload_images/7172355-32371bea9a3ee3aa.png)

2、构建触发器，就是设置何时开始启动build，运行程序。选这里选默认
![Screen Shot 2018-09-28 at 2.18.24 PM.png](https://upload-images.jianshu.io/upload_images/7172355-c7b08050fdf477a8.png)
3、其它的先不动将build改为如下：
![Screen Shot 2018-09-29 at 3.40.05 PM.png](https://upload-images.jianshu.io/upload_images/7172355-5ed23615d1c30b3e.png)

4.在写sh脚本的时候要加 BUILD_ID=dontKillMe 否则项目不会启动

```
#!/bin/bash
port=8098
echo "check $port"
grep_port=`netstat -tlpn | grep "\b$port\b"`
echo "grep port is $grep_port"
if [ -n "$grep_port" ]
then
  echo "端口 $port 在使用"
  netstat -nlp |grep :8098 |grep -v grep|awk '{print $7}' |awk -F '/' '{print $1}' |xargs kill -9
  echo "kill 掉$port 端口"
else
  echo "端口没有被使用"
fi
echo "开始重启"
# 此处要注意加BUILD_ID=dontKillMe 否则jenkins不会将项目启动下去
BUILD_ID=dontKillMe nohup java -jar /var/lib/jenkins/workspace/projectName/target/projectName-0.0.1-SNAPSHOT.jar &
echo "jenkins 自动化部署成功"
```
最后在控制台查看jenkins部署日志，项目需要用maven可以编译通过
![Screen Shot 2018-09-29 at 3.41.18 PM.png](https://upload-images.jianshu.io/upload_images/7172355-4f7fb05ab2b74afc.png)

## 五、配置git钩子触发jenkins构建


