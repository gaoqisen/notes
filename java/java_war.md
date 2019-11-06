---
title: linux+nginx+tomcat的java项目打包war部署
date: 2018-09-18 22:50:11
tags: nginx
categories: linux
---
 环境：linux centos 7 系统、jdk8+tomcat8+nginx-1.12.1+mysql-5.7.16(jdk,tomcat,mysql是通过阿里云的java环境一键部署的，非阿里云的服务器可以自己搭建环境)
### 1.将java代码进行war打包

 * eclipse打包
![打包war.png](https://upload-images.jianshu.io/upload_images/7172355-63099a395fe193c5.png)
* 选择路径，点击finish即可
### 2.将war包移动到tomcat的webapps目录下面

    通过ftp或者scp可以直接将本地的代码放到linux服务器上面
    scp命令：scp 文件名 root@地址:/root   （scp test.war root@107.1.0.1:/root）

### 3.启动tomcat
会出现地址被占用
* 可以用命令：netstat -ltunp    。查看所有的端口号使用情况
* 如果有（tomcat默认使用8080、8009、8005）端口运行；直接用命令：kill -9 端口号
* 重启
### 4.安装nginx-1.12.1
* 安装的sh脚本如下


    #!/bin/sh
    yum install pcre-devel -y
    yum install openssl-devel -y
    yum install zlib-devel -y
    wget http://nginx.org/download/nginx-1.12.1.tar.gz
    tar -zvxf nginx-1.12.1.tar.gz
    cd nginx-1.12.1
    ./configure
    make
    make install
    cd /usr/local/nginx/sbin/
    ./nginx -t
    /usr/local/nginx/sbin/nginx -c /usr/local/nginx/conf/nginx.conf
详情：https://www.jianshu.com/p/73efd33b9da4

* 配置nginx.conf文件
       
      
        server_name  自己的域名
        
        location ^~ /自己的项目 {
                proxy_pass http://localhost:8080;
        }
### 5.重启nginx服务器
如果使用的上面的脚本安装的可以使用一下方式停止nginx，和启动nginx
* 停止nginx: /usr/local/nginx/sbin/nginx -s stop
* 启动nginx: /usr/local/nginx/sbin/nginx -c /usr/local/nginx/conf/nginx.conf
### 6.开放nginx默认的80端口
阿里云服务器可以直接在配置安全组里面配置

---
之后就可以通过域名访问啦



