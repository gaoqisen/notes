---
title: CentOS7部署MinDoc API在线文档管理系统
date: 2018-10-16 22:50:11
tags: MinDoc 
categories: tool
---

> 前言：

- 由于是前后端分离的项目，API是前后端最重要的沟通工具，用一个好的在线文档管理系统代替FTP等文本传输API是一个很不错的选择。在线文档比较好的开源文档系统就是wiki。MediaWiki是基于wiki用PHP开发的，配置起来比较复杂。后来发现一个MinDoc使用go语言开发的，特别方便。我将两种配置方式都记录一下。两种方式都需要安装mysql，CentOS7 的yum里面没有mysql，需要手动下载。

- 需要准备的就是配置外网可以访问的端口号，mindoc默认8181，可以先去配置好，阿里云的ECS服务器可以直接在安全组里面配置。

- 没有安装mysql的可以先安装mysql

```

wget http://repo.mysql.com/mysql-community-release-el7-5.noarch.rpm   //下载mysql的repo源

sudo rpm -ivh mysql-community-release-el7-5.noarch.rpm // 安装mysql-community-release-el7-5.noarch.rpm包

sudo yum install mysql-server // 安装mysql

mysql -u root  // 重置mysql密码

// 出现ERROR 2002 (HY000): Can‘t connect to local MySQL server through socket ‘/var/lib/mysql/mysql.sock‘ (2)

sudo chown -R root:root /var/lib/mysql

service mysqld restart  // 重启mysql

mysql  //直接回车进入mysql控制台
mysql > use mysql;   // 使用mysql数据库
mysql > update user set password=password('123456') where user='root';  // 更改密码
```


## 一、MinDoc

#### 1. 下载MinDoc

```
mkdir mindoc && cd mindoc  //创建一个目录

wget https://github.com/lifei6671/mindoc/releases/download/v0.9/mindoc_linux_amd64.zip  //下载二进制包

unzip mindoc_linux_amd64.zip  // 解压

```

#### 2. 修改conf/app.conf 文件，打开文件注释

```
db_adapter=mysql
db_host=127.0.0.1
db_port=3306
db_database=mindoc_db
db_username=root
db_password=123456

adb_adapter=sqlite3
db_database=./database/mindoc.db
```

#### 3. 当前目录进行安装

```
./mindoc_linux_amd64 install
```

#### 4. 出现Install Successfully! 之后就可以运行并访问

```
./mindoc_linux_amd64   // 在线运行，不能退出

nohup ./mindoc_linux_amd64 & // 后台运行

```

访问http://IP:8181 即可，帐号admin 密码123456

![MinDoc](https://gaoqisen.github.io/GraphBed/201810/20181018093114.png)

end


## 二、mediawiki


#### 1. 安装需要的一些配置

```
yum install httpd php php-mysql php-gd php-xml mysql-server mysql libxml2

```
#### 2. 在mysql启动的状态下配置mysql

```
mysql_secure_installation
```

#### 3. 在mysql里面配置项目

```

create database wikidb;  
grant all on wikidb.* to root;  
grant all on wikidb.* to root@localhost;  
grant all on wikidb.* to wikiuser;  
grant all on wikidb.* to wikiuser@localhost;  
set password for wikiuser@localhost=password('wikipw');
```

#### 4.修改httpd配置

```
vim /etc/httpd/conf/httpd.conf

#ServerName www.example.com:80 // 前面的#去掉(去掉注释)

vim /etc/hosts 

127.0.0.1 localhost localhost.localadmin xxhost  // 添加hostname

service httpd restart  // 启动网络服务
```
#### 5.Mediawiki的手动安装

```
wget http://releases.wikimedia.org/mediawiki/1.22/mediawiki-1.22.5.tar.gz

tar -xvf mediawiki-1.22.5.tar.gz  // 解压

mv mediawiki-1.22.5 /var/www/html/w  // 将解压后的文件夹移动到httpd.conf中DocumentRoot指定的文件夹中，默认是"var/www/html"

chown -R 777 /var/www/html/w/
chmod 777 /var/www/html/w/mw-config   // 改变权限

```

通过http://ip/w/index.php访问，出现下面标志表示成功

![mediawike](https://gaoqisen.github.io/GraphBed/201810/20181018100047.png)


> 两种方式都实现了，最后就需要自己去配置个性化的设置。这两个都有自己不同的展示方式，个人偏好与第一种页面风格很友好。功能也更加完善，编辑器也是基于Markdown的。



