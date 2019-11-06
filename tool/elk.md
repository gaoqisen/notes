---
title: linux+elasticsearch+logstash 自动同步mysql实现搜索引擎
date: 2018-09-22 22:50:11
tags: elasticsearch
categories: linux
---
## 一、安装elasticsearch

作用：将数据放到elasticsearch进行搜索

#### 1、配置elasticsearch的yum源

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

#### 2、yum安装

```
yum -y install elasticsearch
```
#### 3、启动

```
service elasticsearch start   // 启动命令
```
Starting elasticsearch (via systemctl):                    [  确定  ]  // 出现这个表示启动成功
## 二、安装logstash 
用于将mysql里面的数据同步到elasticsearch

```
wget https://artifacts.elastic.co/downloads/logstash/logstash-6.4.1.zip  // 下载到目录解压文件
cd logstash-6.4.1   // 进入logstash文件夹
vim mysql.conf   // 新建mysql.conf文件
```
在mysql.conf文件中配置如下信息：

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
新建data.sql

```
vim data.sql     // 新建

写入如下内容
SELECT * FROM tableName   // 查询语句
```
启动logstash

```
bin/logstash -f mysql.conf   // 在logstash-6.4.1目录启动，如果其它目录，需要更改路径
```
## 三、测试是否安装成功

```
curl 'http://127.0.0.1:9200/_search?pretty'  // 出现数据库里面的数据表示成功
```

```
{
    "took": 153,
    "timed_out": false,
    "_shards": {
        "total": 15,
        "successful": 15,
        "skipped": 0,
        "failed": 0
    },
    "hits": {
        "total": 6,
        "max_score": 1,
        "hits": [
            {
                "_index": "product",
                "_type": "doc",
                "_id": "2",
                "_score": 1,
                "_source": {
                    "add_time": "426",
                    "summary": null,
                    "@version": "1",
                    "@timestamp": "2018-09-26T05:41:00.179Z",
                }
            },
            {
                "_index": "sl_product",
                "_type": "doc",
                "_id": "2",
                "_score": 1,
                "_source": {
                    "@version": "1",
                    "id": 2,
                    "category_id": null,
                    "sub_image": null,
                    "status": 1,
                    "@timestamp": "2018-09-26T07:56:00.437Z",
                }
            },
            {
                "_index": "product",
                "_type": "doc",
                "_id": "1",
                "_score": 1,
                "_source": {
                    "add_time": "123",
                    "summary": "1",
                    "@version": "1",
                    "sub_image": "test",
                    "@timestamp": "2018-09-26T05:41:00.178Z"
                }
            },
            {
                "_index": "sl_product",
                "_type": "doc",
                "_id": "1",
                "_score": 1,
                "_source": {
                    "add_time": "123",
                    "@version": "1",
                    "@timestamp": "2018-09-26T07:56:00.436Z",
                    "type": "product",
                    "tag_price": null
                }
            },
            {
                "_index": "product",
                "_type": "doc",
                "_id": "3",
                "_score": 1,
                "_source": {
                    "add_time": "2018-09-22 12:04:14",
                    "summary": "<p>123</p><audio controls=\"controls\" style=\"display: none;\"></audio>",
                    "@version": "1",
                    "status": 1,
                    "retail_price": 12,
                    "sub_image": "test asdf",
                    "@timestamp": "2018-09-26T05:41:00.180Z",
                    "tag_price": "123"
                }
            },
            {
                "_index": "sl_product",
                "_type": "doc",
                "_id": "3",
                "_score": 1,
                "_source": {
                    "version": 1,
                    "retail_price": 12,
                    "add_time": "2018-09-22 12:04:14",
                    "@version": "1",
                    "@timestamp": "2018-09-26T07:56:00.442Z"
                }
            }
        ]
    }
}
```



