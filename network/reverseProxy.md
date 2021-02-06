---
title: nginx实现反向代理百度
date: 2020-02-17 13:38:10
tags: netword
categories: netword
keywords: proxy
description: docker + nginx 实现反向代理百度
---

## 反向代理(负载均衡)百度百科

反向代理服务器位于用户与目标服务器之间，但是对于用户而言，反向代理服务器就相当于目标服务器，即用户直接访问反向代理服务器就可以获得目标服务器的资源。同时，用户不需要知道目标服务器的地址，也无须在用户端作任何设定。反向代理服务器通常可用来作为Web加速，即使用反向代理作为Web服务器的前置机来降低网络和服务器的负载，提高访问效率

- 反向代理的用途是将防火墙后面的服务器提供给internet用户访问。同时还可以完成诸如负载均衡等功能
- 对外是透明的，访问者并不知道自己访问的是代理。对访问者而言，他以为访问的就是原始服务器
- 
![https://gaoqisen.github.io/GraphBed/202002/20200217174152.png](https://gaoqisen.github.io/GraphBed/202002/20200217174152.png)

## 对比正向代理(翻墙)

- 正向代理用途是为了在防火墙内的局域网提供访问internet的途径。另外还可以使用缓冲特性减少网络使用率
- 正向代理允许客户端通过它访问任意网站并且隐蔽客户端自身，因此你必须采取安全措施来确保仅为经过授权的客户端提供服务

![https://gaoqisen.github.io/GraphBed/202002/20200217174328.png](https://gaoqisen.github.io/GraphBed/202002/20200217174328.png)

两者的区别在于代理的对象不一样：正向代理代理的对象是客户端，反向代理代理的对象是服务端

## 安装nginx

```docker
version: '3.1'
services:
  nginx:
    restart: always
    image: nginx
    container_name: nginx
    ports:
      - 8080:80
      - 8081:8081
    volumes:
      - ./conf/nginx.conf:/etc/nginx/nginx.conf
      - ./conf/test.conf:/etc/nginx/test.conf
      - ./html:/usr/share/nginx/html
```

## 创建文件夹

```
conf   // 文件夹下放nginx.conf和test.conf
html // 文件夹下面放html80/index.html文件
```

## nginx.conf

```nginx
# 启动进程,通常设置成和 CPU 的数量相等
worker_processes  1;
events {
    # epoll 是多路复用 IO(I/O Multiplexing) 中的一种方式
    # 但是仅用于 linux2.6 以上内核,可以大大提高 nginx 的性能
    use epoll;
    # 单个后台 worker process 进程的最大并发链接数
    worker_connections  1024;
}
http {
    # 设定 mime 类型,类型由 mime.type 文件定义
    include       mime.types;
    default_type  application/octet-stream;
    # sendfile 指令指定 nginx 是否调用 sendfile 函数（zero copy 方式）来输出文件，对于普通应用，
    # 必须设为 on，如果用来进行下载等应用磁盘 IO 重负载应用，可设置为 off，以平衡磁盘与网络 I/O 处理速度，降低系统的 uptime.
    sendfile        on;
    # 连接超时时间
    keepalive_timeout  65;
    # 设定请求缓冲
    client_header_buffer_size 2k;
    # 配置虚拟主机 192.168.141.121
    server {
    # 监听的 IP 和端口，配置 192.168.141.121:80
        listen       80;
    # 虚拟主机名称这里配置 IP 地址
        server_name  192.168.141.121;
    # 所有的请求都以 / 开始，所有的请求都可以匹配此 location
        location / {
        # 使用 root 指令指定虚拟主机目录即网页存放目录
        # 比如访问 http://ip/index.html 将找到 /usr/local/docker/nginx/html/html80/index.html
        # 比如访问 http://ip/item/index.html 将找到 /usr/local/docker/nginx/html/html80/item/index.html
            root   /usr/share/nginx/html/html80;
        # 指定欢迎页面，按从左到右顺序查找
            index  index.html index.htm;
        }
    }
    # 引入其他配置
    include test.conf;
}
```

## test.conf

```nginx
## Basic reverse proxy server ##
## backend for 16.32  ##
upstream uicps  {
#    server 192.168.16.32:59002 weight=1;
     server www.baidu.com;
}
 
## Start 16.32 ##
server {
    listen 8081;
    server_name  localhost;
 
#    access_log  logs/proxy34.access.log  main;
#    error_log  logs/proxy34.error.log;
    root   html;
    index  index.html index.htm index.php;
 
    ## send request back to 16.32 ##
    location / {
        proxy_pass  http://uicps;
 
        #Proxy Settings
        proxy_redirect     off;
        proxy_set_header   Host     www.baidu.com;  #           $host;不能使用$host变量
        proxy_set_header   X-Real-IP        $remote_addr;
        proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;
        proxy_next_upstream error timeout invalid_header http_500 http_502 http_503 http_504;
        proxy_max_temp_file_size 0;
        proxy_connect_timeout      90;
        proxy_send_timeout         90;
        proxy_read_timeout         90;
        proxy_buffer_size          4k;
        proxy_buffers              4 32k;
        proxy_busy_buffers_size    64k;
        proxy_temp_file_write_size 64k;
   }
}
```

## 使用

docker-compose up启动之后访问http://localhost:8081/，访问到如下页面表示成功。

![https://gaoqisen.github.io/GraphBed/202002/20200217165051.png](https://gaoqisen.github.io/GraphBed/202002/20200217165051.png)
