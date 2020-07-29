---
title: nginx
date: 2019-5-31 14:43:40
tags: nginx
categories: linux
keywords: nginx
description: nginx学习，nginx.conf标签含义，方便自己理解和配置nginx。
---

## 日志分析

```shell
# 统计所有的PV数（页面浏览量）
cat access.log | wc -l
# 获取访问IP数
cat access.log | awk '{print $1}' | sort -k1 -r | uniq | wc -l
# 查看日志中访问次数最多的前10个IP
cat access.log |cut -d ' ' -f 1 | sort |uniq -c | sort -nr | awk '{print $0 }' | head -n 10 sed -n '/2019:21:[0-9][0-9]:[0-9][0-9]/,/2019:22:[0-9][0-9]:[0-9][0-9]/p' access.log_2019-12-18 |cut -d ' ' -f 1 | sort |uniq -c | sort -nr | awk '{print $0 }' | head -n 10
# 查看日志中访问次数超过1000次的前10个IP
cat access.log |cut -d ' ' -f 1 | sort |uniq -c | sort -nr | awk '{if($1>1000) print $0 }' | head -n 10
# 查看日志中访问url的次数
awk '{print $7}' access.log_2019-12-25|sort | uniq -c |sort -n -k 1 -r > test.txt
```



## 常用命令

```shell
# 重启nginx
./nginx -s reload
# 启动nginx
./nginx
# 关闭nginx
./nginx -s stop
# 查看nginx并发连接数
# TIME_WAIT表示处理完毕，等待超时结束的请求数 Linux默认的TIME_WAIT时长一般是60秒 TIME_WAIT数量较大时会出现访问很慢的情况，如网办
# CLOSE-WAIT： 等待从本地用户发来的连接中断请求
# SYN_SENT：应用已经开始，打开一个连接
# FIN_WAIT1：应用说它已经完成
# FIN_WAIT2：另一边已同意释放
# ESTABLISHED：表示正常数据传输状态 or 当前并发连接数
# SYN_RECV：表示正在等待处理的请求数
# LAST_ACK：等待所有分组死掉
netstat -n | awk '/^tcp/ {++S[$NF]} END {for(a in S) print a, S[a]}'
```

> nginx配置生成网站[https://nginxconfig.io/](https://nginxconfig.io/)

## nginx.conf 配置详解

```nginx
#nginx进程数
worker_processes  8;
# 0001表示启用第一个CPU内核，0010表示启用第二个CPU内核，依此类推；worker_processes最多开启8个，8个以上性能提升不会再提升了，而且稳定性变得更低，所以8个进程够用了。
worker_cpu_affinity 00000001 00000010 00000100 00001000 00010000 00100000 01000000 10000000;
#一个nginx进程打开的最多文件描述符数目，理论值应该是最多打开文件数（系统的值ulimit) 与nginx进程数相除，但是nginx分配请求并不均匀，所以建议与ulimit -n的值保持一致。
worker_rlimit_nofile 655350;
#制定日志路径，级别。这个设置可以放入全局块，http块，server块，级别以此为：debug|info|notice|warn|error|crit|alert|emerg
error_log /home/log/nginx/nginx_error.log crit;
 
#单个进程最大连接数
events {
    #参考事件模型，use [ kqueue | rtsig | epoll | /dev/poll | select | poll ]; epoll模型是Linux 2.6以上版本内核中的高性能网络I/O模型，如果跑在FreeBSD上面，就用kqueue模型。
    use epoll;
    #单个worker进程允许客户端最大连接数，这个数值一般根据服务器性能和内存来制定，实际最大值就是worker进程数乘以work_connections实际我们填入一个65535，足够了，这些都算并发值
    worker_connections 40960;
    #告诉nginx收到一个新连接通知后接受尽可能多的连接，默认是on，设置为on后，多个worker按串行方式来处理连接，也就是一个连接只有一个worker被唤醒，其他的处于休眠状态，设置为off后，多个worker按并行方式来处理连接，也就是一个连接会唤醒所有的worker，直到连接分配完毕，没有取得连接的继续休眠。当你的服务器连接数不多时，开启这个参数会让负载有一定的降低，但是当服务器的吞吐量很大时，为了效率，可以关闭这个参数。
    multi_accept on;
    #最大连接数，默认为512
    #worker_connections  1024;
}
#http服务器配置
http {
    #文件扩展名与文件类型映射表
    include       mime.types;
    #默认文件类型，默认为text/plain
    default_type  application/octet-stream;
    #允许sendfile方式传输文件，默认为off，可以在http块，server块，location块。
    sendfile        on;
	#长连接超时时间，单位是秒
    keepalive_timeout  65;
    #防止网络阻塞
    tcp_nopush on;
    #防止网络阻塞
    tcp_nodelay on;
    #隐藏版本号
    server_tokens off;
    #设定服务器名称（即server_name指令所设置）哈希表的框大小，值越大能设置的server_name可以越多。参数哈希框大小总是等于哈希表的大小，即处理器高速缓存区（32）的倍数，这将加速处理器中key的搜索速度，减少内存的存取数。
    server_names_hash_bucket_size 128;
    server_names_hash_max_size 512;
    #客户端请求头部的缓冲区大小
    client_header_buffer_size 2k;
    #设置客户端请求的Header头缓冲区大小，默认为4K。客户端请求行不能超过设置的第一个数，请求的Header头信息不能大于设置的第二个数，否则会报"Request URI too large"(414)或“Bad request”(400)错误。如果客户端的Cookie信息较大，则需增加缓冲区大小
    large_client_header_buffers 4 4k;
    #设置nginx允许接收的客户端请求内容的最大值，及客户端请求Header头信息中设置的Content-Lenth大最大值。如果超出该指令设置的最大值，nginx将返回“Request Entity Too Large”的错误信息(HTTP的413错误码)
    client_max_body_size 500m;
    #这个将为打开文件指定缓存，默认是没有启用的，max指定缓存数量，建议和打开文件数一致，inactive是指经过多长时间文件没被请求后***缓存。
    open_file_cache max=655350 inactive=20s;
    #open_file_cache指令中的inactive参数时间内文件的最少使用次数，如果超过这个数字，文件描述符一直是在缓存中打开的，如上例，如果有一个文件在inactive时间内一次没被使用，它将被移除。
    open_file_cache_min_uses 1;
    #这个是指多长时间检查一次缓存的有效信息。
    open_file_cache_valid 30s;
    #设置nginx读取客户端请求Header头信息的超时时间，如果超过该指令设置的时间，nginx将返回"Requet time out"错误信息（HTTP的408错误码）
    client_header_timeout 15s;
    #设定nginx读取客户端请求内容的超时时间，如果超过该指令设置的时间，nginx将返回"Request time out"错误信息(HTTP状态码408)
    client_body_timeout 15s;
    #设置发送给客户端的应答超时时间。指两次tcp握手，还没有转为established状态的时间。如果这个时间，客户端没有响应，Nginx则关闭连接
    send_timeout 60s;
    #开启gzip压缩功能，对用户请求的页面进行压缩处理，以达到节省网络带宽，提高网站速度的作用。
    gzip on;
    #允许压缩的页面最小字节数。建议值为大于1024字节，小于1K的压缩可能无效果
    gzip_min_length   1k;
    #设置系统获取几个单位的缓存用于存储gzip压缩结果数据流。此设置为：按照原始数据大小以16K为单位的4倍大小申请内存空间。如果不设置的话，默认值是申请跟原始数据相同大小的内存空间去存储gzip压缩的结果。
    gzip_buffers     4 16k;
    #识别http协议的版本,只有1.1版本的压缩，因为可能早期的浏览器或http客户端可能不支持gzip压缩
    gzip_http_version 1.0;
    #设置压缩比，值为1-9，压缩比最大，处理速度会越慢
    gzip_comp_level 2;
    #指定需要被压缩的文件媒体类型
    gzip_types     text/plain text/javascript application/x-javascript application/json application/javascript text/css application/xml;
    #gzip_vary的作用是在http响应中增加一行“Vary: Accept-Encoding”，目的是改变反向代理服务器的缓存策略，反向代理服务器会根据后端服务器是否带Vary头采用不同的缓存策略。   
    gzip_vary on;
    #log日志配置
    log_format  access   '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';
    #用来设置日志格式                  
    access_log   /home/log/nginx/access.log   access;
	#虚拟主机的配置
    server {
	#监听端口
        listen       80;
        #域名可以有多个，用空格隔开
        server_name  test;
        #rewrite ^ https://$http_host$request_uri? permanent;
        # proxy_redirect功能比较强大,其作用是对发送给客户端的URL进行修改
        proxy_redirect off;
        # 问产生405 503的时候给用户的返回状态是200,设置一个@405，在里边做对应的处理
        error_page 405 503 =200 @405;
        location @405{
            root  /opt/htdocs;
        }            
        location / {
            #禁止某个ip或者一个ip段访问.如果指定unix:,那将禁止socket的访问.注意：unix在1.5.1中新加入的功能，如果你的版本比这个低，请不要使用这个方法。
            deny 127.0.0.1;
            deny 127.0.0.2;
            # 客户端主动断掉连接之后，Nginx 会等待后端处理完(或者超时)，然后 记录 「后端的返回信息」 到日志。所以，如果后端 返回 200， 就记录 200 ；如果后端放回 5XX ，那么就记录 5XX 。
            proxy_ignore_client_abort on;
            # 代理转发
            proxy_pass http://inspur;
            # 定项目的根目录，适用与server和location。可以指定多个，如果locaiton没有指定，会往其外层的server或http中寻找继承。
            root   html;
            # 在前后端分离的基础上，通过Nginx配置，指定网站初始页
            index  index.html index.htm;
            # 允许重新定义或添加字段传递给代理服务器的请求头
            proxy_set_header    X-Real-IP   $remote_addr;
            proxy_set_header Host $host:$server_port;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            # 客服端最大上传文件大小
            client_max_body_size    100m;
        }
    }
    #upstream负载均衡配置，配置路由到tomcat的服务地址以及权重
    upstream test{
        #每个请求按访问ip的hash结果分配，这样每个访客固定访问一个后端服务器，可以解决session的问题
        ip_hash;
        # weight设置权重，多个服务器ip进行负载均衡分发
        server 192.168.0.1:80 weight=5;
        server 192.168.0.2:80 weight=10;
        }
}
```
