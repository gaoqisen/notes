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

## 二、常用语法

### 2.1 基本操作

```yml
# <REST Verb> http://localhost:9200/<Index>/<Type>/<ID>
# <請求類型>   <请求地址>/<索引名>/<文档类型>/<文档ID>
# 数据库：数据库  表   行    列
# el：   索引    类型 文档  字段
# 检查集群的健康 Authorization 從/獲取
GET /_cat/health?v
# 查看索引返回：health status index uuid pri rep docs.count docs.deleted store.size pri.store.size 表明我们还没有索引在集群中
GET /_cat/indices?v
# 集群中的节点列表
GET /_cat/nodes?v
# 创建一个索引叫做"customer"
PUT /customer?pretty
# 索引一个简单的customer文档到customer索引，external类型，ID是1
PUT /customer/external/1?pretty
{
  "name": "John Doe"
}
# 删除一个索引
DELETE /customer?pretty
# 删除全部索引
DELETE /_all
# 删除 多个索引
DELETE /customer,customer1,customer2
# 删除 模糊匹配
DELETE /customer*
# 删除一个文档
DELETE /customer/external/2?pretty
```

### 2.2 search查询条件详解

```yml
# 查询出所有问题文档匹配某个查询
GET /centent/_search?q=title:123
# 有多少文档匹配某个查询
GET /centent/_search?q=title:123*&size=0
# 有没有文档匹配某个查询(terminated_early)
GET /centent/_search?q=title:1234*&size=0&terminate_after=1
# match和term的区别：match查询的时候,elasticsearch会根据你给定的字段提供合适的分析器,而term查询不会有分析器分析的过程，match查询相当于模糊匹配,只包含其中一部分关键词就行
GET /_search
{
    "_source": false,
    "query" : {
        "term" : { "title" : "123" }
    }
}
# 查询全部
GET /book/_search
{
  "query": { "match_all": {} }
}
# 排序
GET /book/_search 
{"query" : {
        "match" : {
            "name" : " java"
        }},
    "sort": [
        { "price": "desc" }
    ]}
# 分页
GET  /book/_search 
{
  "query": { "match_all": {} },
  "from": 0,
  "size": 1
}
# 指定返回的字段
GET /book/_search 
{
  "query": { "match_all": {} },
  "_source": ["name", "studymodel"]
}
# 匹配指定条件查询
GET /test_index/_search 
{
  "query": {
    "match": {
      "test_field": "test"
    }
  }
}

```

### 2.3 返回数据详解

```yaml
{
  "took" : 97, #请求耗时多少毫秒
  "timed_out" : false, #是否超时。默认情况下没有超时机制，也就是客户端等待Elasticsearch搜索结束（无论执行多久），提供超时机制的话，Elasticsearch则在指定时长内处理搜索，在指定时长结束的时候，将搜索的结果直接返回（无论是否搜索结束）。指定超时的方式是传递参数，参数单位是：毫秒-ms。秒-s。分钟-m。
  "_shards" : { # 分片
    "total" : 1, #请求发送到多少个shard上
    "successful" : 1, #成功返回搜索结果的shard
    "skipped" : 0, #停止服务的shard
    "failed" : 0 #失败的shard
  },
  "hits" : { #匹配记录数
    "total" : { #返回了多少结果
      "value" : 3,
      "relation" : "eq" # 关系
    },
    "max_score" : 1.0, #搜索结果中，最大的相关度分数，相关度越大分数越高，_score越大，排位越靠前
    "hits" : [ #搜索到的结果集合，默认查询前10条数据。
      {
        "_index" : "centent", #数据所在索引
        "_type" : "centent", #数据所在类型
        "_id" : "4", #数据的id
        "_score" : 1.0, #数据的搜索相关度分数
        "_source" : { # 数据的具体内容。
          "id" : 4,
          "title" : "***",
          "content" : "***"
        }
      }]
  }
}
```



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



### 1.3 配置

- 下载安装包地址: [https://www.elastic.co/cn/downloads/elasticsearch](https://www.elastic.co/cn/downloads/elasticsearch)

- 修改config/elasticsearch.yml配置

  ```yaml
  # 集群名称
  cluster.name: web-application
  # ------------------------------------ Node ------------------------------------
  # 节点名称
  node.name: node-1
  # 增加一个自定义属性
  #node.attr.rack: r1
  # ----------------------------------- Paths ------------------------------------
  # 存储数据的目录(用逗号分隔)
  #path.data: /path/to/data
  # 日志路径
  #path.logs: /path/to/logs
  # ----------------------------------- Memory -----------------------------------
  # 启动时锁定内存:
  #bootstrap.memory_lock: true
  bootstrap.memory_lock: false
  bootstrap.system_call_filter: false
  # ---------------------------------- Network -----------------------------------
  # 设置外网可以访问
  network.host: 0.0.0.0
  # 自定义端口
  #http.port: 9200
  # --------------------------------- Discovery ----------------------------------
  #
  # 启动后去发现list里面主机节点是否启动 默认列表["127.0.0.1", "[::1]"]
  #discovery.seed_hosts: ["host1", "host2"]
  # 初始化主节点
  cluster.initial_master_nodes: ["node-1"]
  # ---------------------------------- Gateway -----------------------------------
  # 整个集群启动之后
  #gateway.recover_after_nodes: 3
  # ---------------------------------- Various -----------------------------------
  # 删除索引时需要显示名称
  #action.destructive_requires_name: true
  # 启动输入密码访问
  xpack.security.transport.ssl.enabled: true
  xpack.security.enabled: true
  ```

  

- 操作命令

  ```shell
  // 增加elasticsearch用户
  adduser elasticsearch
  // 设置密码
  passwd elasticsearch
  // 更改文件的所属用户
  chown -R elasticsearch filename
  // 切换用户
  su elasticsearch
  // 解压
  tar -zxf XXX.tar.gz
  // 后台启动
  ./elasticsearch -d
  // 修改密码，为多个用户分别设置密码
  bin/elasticsearch-setup-passwords interactive
  ```

- 验证:，浏览器访问http://ip:9200输入帐号密码后返回json串表示启动成功。

### 1.4 安装遇到的问题

#### 1.2.1 外网无法访问

```
vim config/elasticsearch.yml
// 增加下面配置
network.host: 0.0.0.0
```

#### 1.2.2 启动报错

- system call filters failed to install; check the logs and fix your configuration or disable system call filters at your own risk。 因为Centos6不支持SecComp，而ES5.2.1默认bootstrap.system_call_filter为true进行检测，所以导致检测失败，失败后直接导致ES不能启动。解决方法：在elasticsearch.yml中配置bootstrap.system_call_filter为false，注意要在Memory下面:

  ```
  bootstrap.memory_lock: false
  bootstrap.system_call_filter: false
  ```

- max number of threads [1024] for user [elasticsearch] is too low, increase to at least [4096] 最大线程数[1024]太低，至少增加到[4096]。 修改/etc/security/limits.d/90-nproc.conf文件里面1024为4096

- max virtual memory areas vm.max_map_count [65530] is too low, increase to at least [262144] 最大虚拟内存区域vm.max_map_count [65530]太低，至少增加到[262144]

  ```
  vim /etc/sysctl.conf
  // 增加下面配置
  vm.max_map_count=655360
  ```

- max file descriptors [65535] for elasticsearch process is too low, increase to at least[65536]。由于给帐号的最大打开文件个数或者最大打开线程数的限制，一直会报错，因此改一下限制(/etc/security/limits.conf)即可

  ```
  // 增加下面配置
   * soft nofile 65536
   * hard nofile 131072
   * soft nproc 2048
   * hard nproc 4096
   // 退出帐号重新登录(退出重新登录生效)
  ```

## 

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

