---
title: CentOS7 安装mysql
date: 2018-10-10 22:50:11
tags: mysql CentOS7
categories: tool
---

## 一、下载mysql的repo源
```
wget http://repo.mysql.com/mysql-community-release-el7-5.noarch.rpm
```

## 二、安装mysql-community-release-el7-5.noarch.rpm包
```
 sudo rpm -ivh mysql-community-release-el7-5.noarch.rpm
```
## 三、安装mysql

```
sudo yum install mysql-server
```

## 四、进入mysql

```
mysql
```

## 五、报错

> ERROR 2002 (HY000): Can‘t connect to local MySQL server through socket ‘/var/lib/mysql/mysql.sock‘ (2)，原因是/var/lib/mysql的访问权限问题。下面的命令把/var/lib/mysql的拥有者改为当前用户：

```
sudo chown -R root:root /var/lib/mysql
```
## 六、重启mysql

```
service mysqld restart
```

## 七、更改密码

```
update user set password=password('123456') where user='root';
```

