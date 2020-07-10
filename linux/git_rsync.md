---
title: 项目集群，实现单个服务器操作其余服务器自动同步。
date: 2018-12-10 20:10:11
tags: linux git
categories: linux
keywords: 代码同步
description: 实现一个代码同步，并自动化部署的功能。
---


## 原因
项目是一个分布式集群的项目，一个项目运行在多个tomcat服务器上面。功能需要改动，如果手动管理代码，是一件很容易出现操作失误导致项目代码同步不一致的情况。

## 实现目标

 1. 在一个地方操作，其余服务器中的代码自动同步。

 2. 支持回滚操作，如果同步之后的代码有问题，立马回滚到之前的版本（不影响线上操作）。

## 实现思路

### 方案一：git ＋ shell（svn和git的部署方式思路一致）

> git是程序员常用的代码版本控制工具，比较重要的功能就是分支和版本，回退到之前的版本是一件很很容易的事情。第一种方式可以利用git的版本机制。

- 用一台服务器A专门管理代码，并创建git仓库。

- 在这台服务器A上面用maven进行代码编译生成.class文件。（非maven管理的项目，可以在本地编译成功后上传到git仓库）

- 在其他需要同步的服务器上面clone服务器A上面的代码。

- 在其他服务器上面创建同步脚本和回退脚本。

    同步脚本：
    
    1. 拉取最新代码
    2. 关闭tomcat服务器
    3. 启动tomcat服务器
    
    如果代码出现问题的回退脚本:
    
    1. 关闭tomcat服务器
    2. 代码回退
    3. 启动tomcat

- 用工具远程执行脚本。如果配置了ssh免密码登陆，可以用：ssh user@remoteNode "sh /home/sync.sh" 来执行远程脚本。也可以在服务器A上面写一个执行多个服务器远程命令的命令脚本。

- 缺点：每台子服务器都要部署svn或git

### 方案二: jenkins + rsync + git/svn

- 环境: ssh, rsync, git/svn

- 安装ssh： apt-get install openssh-server rsync -y

- ssh启动：/etc/init.d/ssh start  

- 直接用rsync的ssh命令同步： rsync -e "ssh -p 8000" -avH /home root@172.17.0.2:/home

- 每次执行的时候都需要输入密码， 可以安装sshpass在脚本中写入密码实现不输入密码自动同步（在执行的命令前加sshpass -p password即可）。或者让两台服务器的ssh互信，实现免密码远程执行ssh命令（）。

> 还有一种通过daemon方式通过tcp同步的，需要写配置文件，没有实现出来。

- 
[jenkins+svn+rsync+php_一键自动化部署可持续化集成服务器集群项目_支持回滚](https://blog.csdn.net/mlx212/article/details/80918843)  这个写的比较详细，只是语言是php的，换成java的语言应该影响不大。

### 方案三：rsync + svn/git + svn上传class文件

- 思路：找一台分发服务器（安装svn，rsync）或者本地电脑代替分发服务器，开发者将代码提交至svn之后，分发服务器进行拉取代码之后，即进行测试环境和生产环境的代码的发布（利用rsync写脚本进行代码增量同步，可同步至多台服务器）。需要注意的就是非maven环境的代码编译（如果svn上传class文件，负担就是svn占用空间大）。



