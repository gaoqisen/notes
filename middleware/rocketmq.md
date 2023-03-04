---
title: RocketMQ SpringBoot 实践
date: 2019-10-31 14:39:20
tags: java
categories: tool
keywords: RocketMQ
description: RocketMQ的一些简单安装
---

> 官网：https://rocketmq.apache.org/

## 消息队列简介

- 可以把消息队列比作是一个存放消息的容器，当我们需要使用消息的时候可以取出消息供自己使用。消息队列是分布式系统中重要的组件，使用消息队列主要是为了通过异步处理提高系统性能和削峰、降低系统耦合性。目前使用较多的消息队列有ActiveMQ，RabbitMQ，Kafka，RocketMQ
- 消息队列的优点：
    * 通过异步处理提高系统性能（削峰、减少响应所需时间）;
    * 降低系统耦合性。
- 消息队列缺点:
    * 系统可用性降低: 要担心MQ队列挂掉和消息丢失
    * 系统复杂性提高：需要保证消息没有被重复消费、处理消息丢失的情况、保证消息传递的顺序性等等问题
    * 一致性问题：消息的真正消费者没有正确消费消息，导致数据不一致。
- 名词解释：
  *  Topic:  主题（Topic）作为消息通信载体，类似于广播模式；发布者发布一条消息，该消息通过主题传递给所有的订阅者，在一条消息广播之后才订阅的用户则是收不到该条消息的。
  *  生产者（消息发布者）：负责生产消息并发送消息到Topic
  *  消费者（消息订阅者）: 负责从Topic接收消息并消费
  *  消息：生产者向消息到Topic，消费者接受到的数据
  *  消息属性： 生产者给消息定义的属性，包含Message Key 和 Tag
  *  Group:  给一类生产者和消费者分一个组，消息发布或订阅的逻辑一致
- 应用场景:削峰填谷、异步解耦、顺序收发、分布式事务一致性、大数据分析、分布式缓存同步
- RocketMQ特色功能：消息查询、消息轨迹、集群消费、广播消费、重置消费位点、死信队列、全球消息路由、资源报表、监控报警
- 消息类型：普通消息、事务消息、延时消息、顺序消息

##      MAC安装

### 下载链接

https://www.apache.org/dyn/closer.cgi?path=rocketmq/4.1.0-incubating/rocketmq-all-4.1.0-incubating-source-release.zip

### 命令行安装

```shell
cd  rocketmq-all-4.1.0-incubating
mvn -Prelease-all -DskipTests clean install -U    // maven依赖
cd distribution/target/apache-rocketmq
sh bin/mqnamesrv &  // 启动 Name Server服务
sh bin/mqbroker -n localhost:9876 autoCreateTopicEnable=true & // 启动 broker
```

## docker-compose安装

```yaml
version: '3.5'
services:
  rmqnamesrv:
    image: foxiswho/rocketmq:server
    container_name: rmqnamesrv
    ports:
      - 9876:9876
    volumes:
      - ./data/logs:/opt/logs
      - ./data/store:/opt/store
    networks:
        rmq:
          aliases:
            - rmqnamesrv

  rmqbroker:
    image: foxiswho/rocketmq:broker
    container_name: rmqbroker
    ports:
      - 10909:10909
      - 10911:10911
    volumes:
      - ./data/logs:/opt/logs
      - ./data/store:/opt/store
      - ./data/brokerconf/broker.conf:/etc/rocketmq/broker.conf
    environment:
        NAMESRV_ADDR: "rmqnamesrv:9876"
        JAVA_OPTS: " -Duser.home=/opt"
        JAVA_OPT_EXT: "-server -Xms128m -Xmx128m -Xmn128m"
    command: mqbroker -c /etc/rocketmq/broker.conf
    depends_on:
      - rmqnamesrv
    networks:
      rmq:
        aliases:
          - rmqbroker

  rmqconsole:
    image: styletang/rocketmq-console-ng
    container_name: rmqconsole
    ports:
      - 8080:8080
    environment:
        JAVA_OPTS: "-Drocketmq.namesrv.addr=rmqnamesrv:9876 -Dcom.rocketmq.sendMessageWithVIPChannel=false"
    depends_on:
      - rmqnamesrv
    networks:
      rmq:
        aliases:
          - rmqconsole

networks:
  rmq:
    name: rmq
    driver: bridge
```

> docker-compose安装成功后，springboot链接的时候一直报错无法正常链接，网上说系统物理内存需要空闲20G，因为安装了rmqconsole可能导致内存不够，故单独安装了RrocketMQ。

## SpringBoot简单集成

### 配置文件

```properties
server.port=8081
apache.rocketmq.consumer.PushConsumer=PushConsumer
apache.rocketmq.producer.producerGroup=Producer
apache.rocketmq.namesrvAddr=localhost:9876
```

### pom.xml依赖

```xml
  <!-- https://mvnrepository.com/artifact/org.apache.rocketmq/rocketmq-client -->
        <dependency>
            <groupId>org.apache.rocketmq</groupId>
            <artifactId>rocketmq-client</artifactId>
            <version>4.1.0-incubating</version>
        </dependency>
        <!-- https://mvnrepository.com/artifact/org.apache.rocketmq/rocketmq-common -->
        <dependency>
            <groupId>org.apache.rocketmq</groupId>
            <artifactId>rocketmq-common</artifactId>
            <version>4.1.0-incubating</version>
        </dependency>
        <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>fastjson</artifactId>
            <version>1.2.13</version>
        </dependency>
```

### 生产者服务

```java
package com.example.roketmq.server;


import org.apache.rocketmq.client.producer.DefaultMQProducer;
import org.apache.rocketmq.client.producer.SendResult;
import org.apache.rocketmq.common.message.Message;
import org.apache.rocketmq.remoting.common.RemotingHelper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;

/**
 * @ClassName ProducerService
 * @Author gaoqisen
 * @Date 2019-10-31
 * @Version 1.0
 */
@Service
public class ProducerService {
    @Value("${apache.rocketmq.producer.producerGroup}")
    private String producerGroup;

    @Value("${apache.rocketmq.namesrvAddr}")
    private String namesrvAddr;

    private DefaultMQProducer producer;

    @PostConstruct
    public void initProducer() {
        producer = new DefaultMQProducer(producerGroup);
        producer.setNamesrvAddr(namesrvAddr);
        producer.setRetryTimesWhenSendFailed(3);
        try {
            producer.start();
            System.out.println("[Producer 已启动]");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public String send(String topic, String tags, String msg) {
        SendResult result = null;
        try {
            Message message = new Message(topic, tags, msg.getBytes(RemotingHelper.DEFAULT_CHARSET));
            result = producer.send(message);
            System.out.println("[生产者：] msgID(" + result.getMsgId() + ") " + result.getSendStatus());
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "{\"MsgId\":\"" + result.getMsgId() + "\"}";
    }

    @PreDestroy
    public void shutDownProducer() {
        if (producer != null) {
            producer.shutdown();
        }
    }
}

```

### 消费者

```java
package com.example.roketmq.server;

import org.apache.rocketmq.client.consumer.DefaultMQPushConsumer;
import org.apache.rocketmq.client.consumer.listener.ConsumeConcurrentlyStatus;
import org.apache.rocketmq.client.consumer.listener.MessageListenerConcurrently;
import org.apache.rocketmq.common.consumer.ConsumeFromWhere;
import org.apache.rocketmq.common.message.MessageExt;
import org.apache.rocketmq.remoting.common.RemotingHelper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

/**
 * @ClassName ConsumerService
 * @Author gaoqisen
 * @Date 2019-10-31
 * @Version 1.0
 */
@Component
public class ConsumerService {
    @Value("${apache.rocketmq.consumer.PushConsumer}")
    private String consumerGroup;
    @Value("${apache.rocketmq.namesrvAddr}")
    private String namesrvAddr;

    @PostConstruct
    public void defaultMQPushConsumer() {
        DefaultMQPushConsumer consumer = new DefaultMQPushConsumer(consumerGroup);
        consumer.setNamesrvAddr(namesrvAddr);
        try {
            consumer.subscribe("test1", "push");

            // 如果是第一次启动，从队列头部开始消费
            // 如果不是第一次启动，从上次消费的位置继续消费
            consumer.setConsumeFromWhere(ConsumeFromWhere.CONSUME_FROM_FIRST_OFFSET);

            consumer.registerMessageListener((MessageListenerConcurrently) (list, context) -> {
                try {
                    for (MessageExt messageExt : list) {
                        String messageBody = new String(messageExt.getBody(), RemotingHelper.DEFAULT_CHARSET);
                        System.out.println("[消费者] msgID(" + messageExt.getMsgId() + ") msgBody : " + messageBody);
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                    return ConsumeConcurrentlyStatus.RECONSUME_LATER;
                }
                return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;
            });
            consumer.start();
            System.out.println("[Consumer 已启动]");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

### 测试Controller

```java
package com.example.roketmq.server;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @ClassName TestController
 * @Author gaoqisen
 * @Date 2019-10-31
 * @Version 1.0
 */
@RestController
public class TestController {
    @Autowired
    private ProducerService producer;

    @RequestMapping("/push")
    public String pushMsg(String msg) {
        return producer.send("test1", "push", msg);
    }
}
```



### 如果报错No route info of this topic

- 更改启动方式为：sh bin/mqbroker -n localhost:9876 autoCreateTopicEnable=true &
- jar包的版本要对应上，如rocketmq的版本为4.1.0-incubating，那么jar包的版本也应该为4.1.0-incubating（按照这种方法以解决）。