---
title: elasticsearch学习
date: 2020-06-25 16:11:32
tags: elasticsearch
categories: tool
keywords: elasticsearch
description: 在linux环境装了一个elasticsearch，遇到了好几个问题，还有一些笔记，记录一下，后面以后安装的时候方便快速解决。
---


## 一、安装

## 1.1 下载安装

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

### 1.2 安装遇到的问题

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

