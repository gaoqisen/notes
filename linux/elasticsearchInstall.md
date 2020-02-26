---
title: linux安装elasticsearch遇到的问题
date: 2020-02-25 16:11:32
tags: elasticsearch
categories: linux
keywords: elasticsearch
description: 在linux环境装了一个elasticsearch，遇到了好几个问题，记录一下，后面以后安装的时候方便快速解决。
---

## 版本问题

下载了一个最新的elasticsearch 7.6安装提示java版本必须11，服务器上面安装的jdk为8，因此重新下载了一个6.8.6的版本，解决问题

## root用户无法启动

```
// 增加elasticsearch用户
adduser elasticsearch
// 设置密码
passwd elasticsearch
// 更改文件的所属用户
chown -R elasticsearch filename
// 切换用户
su elasticsearch
// 后台启动
./elasticsearch -d
```

## 外网无法访问

```
vim config/elasticsearch.yml
// 增加下面配置
network.host: 0.0.0.0
```

## 启动报错


- [kSH2rCN] node validation exception bootstrap checks failed
max virtual memory areas vm.max_map_count [65530] is too low, increase to at least [262144]

    ```
    vim /etc/sysctl.conf
    // 增加下面配置
    vm.max_map_count=655360
    ```
- max file descriptors [65535] for elasticsearch process is too low, increase to at least[65536]
        由于给帐号的最大打开文件个数或者最大打开线程数的限制，一直会报错，因此改一下限制即可
    ```
   vi /etc/security/limits.conf
   // 增加下面配置
    * soft nofile 65536
    * hard nofile 131072
    * soft nproc 2048
    * hard nproc 4096
    // 退出帐号重新登录
    ```