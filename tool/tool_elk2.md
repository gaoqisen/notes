---
title: ELK学习
date: 2019-08-25 14:18:21
tags: ELK
categories: ELK
keywords: Elasticsearch Logstash Kibana
description: Elasticsearch + Logstash + Kibana的学习记录。一种日志分平台析的架构
---

## [Elasticsearch](https://es.xiaoleilu.com/010_Intro/15_API.html)

### 简介

ElasticSearch是一个基于Lucene构建的开源，分布式，RESTful搜索引擎。 设计用于云计算中，能够达到实时搜索，稳定，可靠，快速，安装使用方便。官方维护的docker镜像[https://www.docker.elastic.co/](https://www.docker.elastic.co/)

### 安装（lastic 需要 Java 8 环境）

```
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

### 配置文件

[https://blog.csdn.net/yjclsx/article/details/81319454](https://blog.csdn.net/yjclsx/article/details/81319454)

## Kibana

### 简介

Kibana 是一款开源的数据分析和可视化平台，它是Elastic Stack 成员之一，设计用于和Elasticsearch 协作。 ... 它很简单，基于浏览器的界面便于您快速创建和分享动态数据仪表板来追踪Elasticsearch 的实时数据变化。 搭建Kibana 非常简单。

### 安装

```
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

### 配置文件

[https://www.elastic.co/guide/cn/kibana/current/settings.html](https://www.elastic.co/guide/cn/kibana/current/settings.html)

## Logstash

### 简介

它一个有jruby语言编写的运行在java虚拟机上的具有收集
分析转发数据流功能的工具

### 安装

```
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

### 配置文件

```
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

## filebeat

### 简介

Filebeat是一个轻量级日志传输Agent，可以将指定日志转发到Logstash、Elasticsearch、Kafka、Redis等中。Filebeat占用资源少，而且安装配置也比较简单，支持目前各类主流OS及Docker平台。

### 安装

```
mac:
    brew install filebeat
linux:
    wget https://artifacts.elastic.co/downloads/beats/filebeat/filebeat-7.3.1-linux-x86_64.tar.gz
    tar -zxvf filebeat-7.3.1-linux-x86_64.tar.gz
    nohup ./filebeat -e -c filebeat.yml >/dev/null 2>&1 &  // 后台启动将所有标准输出及标准错误输出到/dev/null空设备，即没有任何输出
docker:
    docker pull docker.elastic.co/beats/filebeat:7.3.1
    docker tag docker.elastic.co/beats/filebeat:7.3.1 filebeat
    docker run -d --name logstash 10.45.53.221:5000/filebeat 
    docker run --name filebeat -d --link logstash -v ~/elk/yaml/filebeat.yml:/usr/share/filebeat/filebeat.yml -v ~/elk/logs/:/home/logs/ filebeat   // 启动filebeat并关联logstash
```

### 配置文件

```
filebeat.yml
filebeat.prospectors:
- paths:
    - /home/user/elk/logs/order/*.log
  multiline:
      pattern: ^\d{4}
      negate: true
      match: after
  fields:
    doc_type: order
- paths:
    - /home/user/elk/logs/customer/*.log
  multiline:
      pattern: ^\d{4}
      negate: true
      match: after
  fields:
    doc_type: customer
output.logstash: # 输出地址
  hosts: ["logstash:5043"]
```


