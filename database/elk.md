---
title: linux+elasticsearch+logstash 自动同步mysql实现搜索引擎
date: 2018-09-22 22:50:11
tags: elasticsearch
categories: tool
---

# docker安装

## 一、[Elasticsearch](https://es.xiaoleilu.com/010_Intro/15_API.html)

### 1.1 简介

ElasticSearch是一个基于Lucene构建的开源，分布式，RESTful搜索引擎。 设计用于云计算中，能够达到实时搜索，稳定，可靠，快速，安装使用方便。官方维护的docker镜像[https://www.docker.elastic.co/](https://www.docker.elastic.co/)

### 1.2 安装（lastic 需要 Java 8 环境）

```yaml
mac:
    brew install elasticsearch   // 安装
    elasticsearch --version   //  查看版本号
    elasticsearch   // 启动后默认端口9200
linux:
    wget https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-7.3.1.zip
    unzip elasticsearch-7.3.1.zip
    cd elasticsearch-7.3.1/ 
    ./bin/elasticsearch     // 启动
docker:
    docker pull docker.elastic.co/elasticsearch/elasticsearch:7.3.1   // 拉取镜像
    docker tag docker.elastic.co/elasticsearch/elasticsearch:7.3.1  elasticsearch 
    docker run -d --name elasticsearch -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" elasticsearch    // 运行容器
    docker exec -it es /bin/bash   // 进入容器
    vi elasticsearch.yml  // 添加如下配置解决跨域问题
        http.cors.enabled: true
        http.cors.allow-origin: "*"
    docker restart es   // 重启
```

### 1.3 配置文件

[https://blog.csdn.net/yjclsx/article/details/81319454](https://blog.csdn.net/yjclsx/article/details/81319454)

## 二、Kibana

### 2.1 简介

Kibana 是一款开源的数据分析和可视化平台，它是Elastic Stack 成员之一，设计用于和Elasticsearch 协作。 ... 它很简单，基于浏览器的界面便于您快速创建和分享动态数据仪表板来追踪Elasticsearch 的实时数据变化。 搭建Kibana 非常简单。

### 2.2 安装

```yaml
mac: 
    brew install kibana   // 安装
    kibana   // 启动后默认端口5601
linux:
    wget https://artifacts.elastic.co/downloads/beats/kibana/kibana-7.3.1-linux-x86_64.tar.gz
    tar -zxvf kibana-7.3.1-linux-x86_64.tar.gz
    ./kibana    // 进入kibana的bin目录进行启动
    nohup ./kibana &   // 后台启动
docker:
    docker pull docker.elastic.co/kibana/kibana:7.3.1
    docker tag docker.elastic.co/kibana/kibana:7.3.1 kibana
    docker run --name kibana -p 5601:5601 -d kibana
    docker run -d -p 5601:5601 --link elasticsearch -e ELASTICSEARCH_URL=http://elasticsearch:9200 kibana   // 使用link参数，会在kibana容器hosts文件中加入elasticsearch ip地址，这样我们就直接通过定义的name来访问es服务了

```

### 2.3 配置文件

[https://www.elastic.co/guide/cn/kibana/current/settings.html](https://www.elastic.co/guide/cn/kibana/current/settings.html)

## 三、Logstash

### 3.1 简介

它一个有jruby语言编写的运行在java虚拟机上的具有收集
分析转发数据流功能的工具

### 3.2 安装

```yaml
mac:
    brew install logstash
    logstash --version
linux:
    wget https://artifacts.elastic.co/downloads/logstash/logstash-7.3.1.tar.gz
    tar -zxvf logstash-7.3.1.tar.gz
    bin/logstash -e 'input{stdin{}}output{stdout{codec=>rubydebug}}'
docker:
    docker pull docker.elastic.co/logstash/logstash:7.3.1
    docker tag docker.elastic.co/logstash/logstash:7.3.1 logstash
    docker run -d --name logstash 10.45.53.221:5000/logstash 
    docker run --rm -it --name logstash --link elasticsearch -d -v ~/elk/yaml/logstash.conf:/usr/share/logstash/pipeline/logstash.conf logstash  // 启动logstash并关联elasticsearch
```

### 3.3 配置文件

```yaml
logstash.conf
input {
  beats {
    host => "localhost"
    port => "5043"
  }
}
filter {
   if [fields][doc_type] == 'order' {
    grok {
            match => { "message" => "%{TIMESTAMP_ISO8601:timestamp} %{LOGLEVEL:level} %{JAVALOGMESSAGE:msg}" }
        }
   }

   if [fields][doc_type] == 'customer' { # 这里写两个一样的grok，实际上可能出现多种不同的日志格式，这里做个提示而已,当然如果是相同的格式，这里可以不写的
    grok {
            match => { "message" => "%{TIMESTAMP_ISO8601:timestamp} %{LOGLEVEL:level} %{JAVALOGMESSAGE:msg}" }
        }
   }
}

output {
  stdout { codec => rubydebug }
  elasticsearch {
        hosts => [ "localhost:9200" ]
        index => "%{[fields][doc_type]}-%{+YYYY.MM.dd}"
    }
}
```



# 单独安装

## 一、安装elasticsearch

作用：将数据放到elasticsearch进行搜索

### 1.1 配置elasticsearch的yum源

```
vim /etc/yum.repos.d/elasticsearch.repo   // 配置yum源

// 在elasticsearch.repo（如果没有就新建） 中加入一下内容6.x版本以上，将6改为2即可变更为2.x版本
[elasticsearch-6.x]
name=Elasticsearch repository for 6.x packages
baseurl=https://artifacts.elastic.co/packages/6.x/yum
gpgcheck=1
gpgkey=https://artifacts.elastic.co/GPG-KEY-elasticsearch
enabled=1
autorefresh=1
type=rpm-md
```

### 1.2 yum安装

```
yum -y install elasticsearch
```

### 1.3 启动

```
service elasticsearch start   // 启动命令
```

> Starting elasticsearch (via systemctl):                    [  确定  ]  // 出现这个表示启动成功


## 二、安装logstash 

### 2.1 用于将mysql里面的数据同步到elasticsearch

```
wget https://artifacts.elastic.co/downloads/logstash/logstash-6.4.1.zip  // 下载到目录解压文件
cd logstash-6.4.1   // 进入logstash文件夹
vim mysql.conf   // 新建mysql.conf文件
```

### 2.2 在mysql.conf文件中配置如下信息：

```
input {
     stdin {
     }
     jdbc {
       # mysql数据库连接
       jdbc_connection_string => "jdbc:mysql://localhost/basesdataName?characterEncoding=utf-8&useSSL=false&serverTimezone=UTC"
       # mysqly用户名和密码
       jdbc_user => "root"
       jdbc_password => "password"
       # 驱动配置(可以自己下载mysql-connector-java-6.0.5.jar，填写路径即可)
       jdbc_driver_library => "./lib/mysql-connector-java-6.0.5.jar"
       # 驱动类名
       jdbc_driver_class => "com.mysql.cj.jdbc.Driver"
       jdbc_paging_enabled => "true"
       jdbc_page_size => "50000"
       # 执行指定的sql文件
       statement_filepath => "./data.sql"
       # 设置监听 各字段含义 分 时 天 月  年 ，默认全部为*代表含义：每分钟都更新
       schedule => "* * * * *"
       # 索引类型
       type => "product"
     }
 }

 filter {
     json {
         source => "message"
         remove_field => ["message"]
     }
 }

 output {

     elasticsearch {
         #es服务器
         hosts => ["localhost:9200"]
         #ES索引名称
         index => "sl_product"
         #自增ID
         document_id => "%{id}"
     }


     stdout {
         codec => json_lines
     }
 ｝
```
### 2.3 新建data.sql

```
vim data.sql     // 新建

写入如下内容
SELECT * FROM tableName   // 查询语句
```
### 2.4 启动logstash

```
bin/logstash -f mysql.conf   // 在logstash-6.4.1目录启动，如果其它目录，需要更改路径
```

## 三、测试是否安装成功

```
curl 'http://127.0.0.1:9200/_search?pretty'  // 返回json串表示成功
```

