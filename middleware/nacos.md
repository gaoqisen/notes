---
title: SpringBoot+Nacos+Dubbo实现RPC远程调用
date: 2020-02-04 14:20:19
tags: nacos dubbo
categories: tool
---

Nacos文档: [https://nacos.io/zh-cn/docs/what-is-nacos.html](https://nacos.io/zh-cn/docs/what-is-nacos.html)

## docker安装nacos

```
// 克隆
git clone https://github.com/nacos-group/nacos-docker.git
cd nacos-docker
// docker-compose安装
docker-compose -f example/standalone-derby.yaml up
```
访问：[http://127.0.0.1:8848/nacos/](http://127.0.0.1:8848/nacos/)，账号密码均为nacos。

## 创建通用模块api

接口如下:
```
package com.gtk.dubbo.provider.service;
public interface ProviderService {
    String hi();
}
```

## 创建dubbo的provider

### pom.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <parent>
        <groupId>org.gtk</groupId>
        <artifactId>gtk-devops-dependencies</artifactId>
        <version>1.0.0-SNAPSHOT</version>
        <relativePath>../../gtk-devops-dependencies/pom.xml</relativePath>
    </parent>

    <artifactId>gtk-alibaba-dubbo-provider</artifactId>
    <packaging>jar</packaging>

    <name>gtk-alibaba-dubbo-provider</name>
    <inceptionYear>2018-Now</inceptionYear>
    <properties>
        <dubbo.version>2.6.6</dubbo.version>
        <dubbo-spring-boot.version>0.2.1.RELEASE</dubbo-spring-boot.version>
        <dubbo-registry-nacos.version>0.0.1</dubbo-registry-nacos.version>
        <dubbo-serialization-kryo.version>2.6.6</dubbo-serialization-kryo.version>
        <alibaba-spring-context-support.version>1.0.2</alibaba-spring-context-support.version>
    </properties>
    <dependencies>

        <!-- Spring Boot Begin -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
        <!-- Spring Boot End -->

        <!-- Spring Cloud Begin -->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
        </dependency>
        <dependency>
            <groupId>org.gtk</groupId>
            <artifactId>gtk-alibaba-dubbo-api</artifactId>
            <version>1.0.0-SNAPSHOT</version>
        </dependency>
        <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>dubbo</artifactId>
            <version>${dubbo.version}</version>
        </dependency>
        <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>dubbo-registry-nacos</artifactId>
            <version>${dubbo-registry-nacos.version}</version>
        </dependency>
        <!--   高速序列化依赖    -->
        <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>dubbo-serialization-kryo</artifactId>
            <version>${dubbo-serialization-kryo.version}</version>
        </dependency>
        <dependency>
            <groupId>com.alibaba.boot</groupId>
            <artifactId>dubbo-spring-boot-starter</artifactId>
            <version>${dubbo-spring-boot.version}</version>
        </dependency>
        <dependency>
            <groupId>com.alibaba.spring</groupId>
            <artifactId>spring-context-support</artifactId>
            <version>${alibaba-spring-context-support.version}</version>
        </dependency>
        <!--       解决： java.lang.NoClassDefFoundError: io/netty/channel/EventLoopGroup -->
        <dependency>
            <groupId>io.netty</groupId>
            <artifactId>netty-all</artifactId>
            <version>4.1.32.Final</version>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <configuration>
                    <mainClass>com.gtk.consumer.NacosConsumerApplication</mainClass>
                </configuration>
            </plugin>
        </plugins>
    </build>
</project>
```

### application.yml

```yml
spring:
  main:
    allow-bean-definition-overriding: true
  application:
    name: dubbo-provider
  cloud:
    nacos:
      discovery:
        server-addr: 127.0.0.1:8848

server:
  port: 10102

dubbo:
  application:
    name: dubbo-provider
  registry:
    address: nacos://127.0.0.1:8848
  scan:
    basePackages: com.gtk.dubbo.provider.service
  protocol:
    name: dubbo
    port: -1
    # 高速序列化
    serialization: kryo
  provider:
    # 负载均衡配置的值分别是：random(默认随机)，roundrobin(轮循)，leastactive(最少活跃调用数)，consistenthash(一致性 Hash)
    loadbalance: roundrobin
management:
  endpoints:
    web:
      exposure:
        include: "*"
```

### 实现类

```java
package com.gtk.dubbo.provider.service.impl;

import com.alibaba.dubbo.config.annotation.Service;
import com.gtk.dubbo.provider.service.ProviderService;
import org.springframework.beans.factory.annotation.Value;

@Service
public class ProviderServiceImpl implements ProviderService
{
    @Value("${server.port}")
    private String port;

    @Override
    public String hi() {
        return "服务提供者提供" + port;
    }
}
```

## 创建dubbo的consumer

### pom.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <parent>
        <groupId>org.gtk</groupId>
        <artifactId>gtk-devops-dependencies</artifactId>
        <version>1.0.0-SNAPSHOT</version>
        <relativePath>../../gtk-devops-dependencies/pom.xml</relativePath>
    </parent>

    <artifactId>gtk-alibaba-dubbo-consumer</artifactId>
    <packaging>jar</packaging>

    <name>gtk-alibaba-dubbo-consumer</name>
    <inceptionYear>2018-Now</inceptionYear>
    <properties>
        <dubbo.version>2.6.6</dubbo.version>
        <dubbo-spring-boot.version>0.2.1.RELEASE</dubbo-spring-boot.version>
        <dubbo-registry-nacos.version>0.0.1</dubbo-registry-nacos.version>
        <dubbo-serialization-kryo.version>2.6.6</dubbo-serialization-kryo.version>
        <alibaba-spring-context-support.version>1.0.2</alibaba-spring-context-support.version>
    </properties>
    <dependencies>

        <!-- Spring Boot Begin -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
        <!-- Spring Boot End -->

        <!-- Spring Cloud Begin -->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
        </dependency>
        <dependency>
            <groupId>org.gtk</groupId>
            <artifactId>gtk-alibaba-dubbo-api</artifactId>
            <version>1.0.0-SNAPSHOT</version>
        </dependency>
        <!--        <dependency>-->
        <!--            <groupId>org.springframework.cloud</groupId>-->
        <!--            <artifactId>spring-cloud-starter-dubbo</artifactId>-->
        <!--        </dependency>-->
        <!--        &lt;!&ndash; Dubbo &ndash;&gt;-->
        <!--        <dependency>-->
        <!--            <groupId>org.apache.dubbo</groupId>-->
        <!--            <artifactId>dubbo</artifactId>-->
        <!--        </dependency>-->
        <!--        &lt;!&ndash; Dubbo Registry Nacos  因为Apache Dubbo 2.7.1版本构建的时候没有把dubbo-registry-nacos打到all-in-one的包中，这里只有手动处理一下。而2.7.1依赖的是nacos-client不是最新版，这里也升级到最新版。&ndash;&gt;-->
        <!--        <dependency>-->
        <!--            <groupId>org.apache.dubbo</groupId>-->
        <!--            <artifactId>dubbo-registry-nacos</artifactId>-->
        <!--            <version>2.7.1</version>-->
        <!--        </dependency>-->


        <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>dubbo</artifactId>
            <version>${dubbo.version}</version>
        </dependency>
        <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>dubbo-registry-nacos</artifactId>
            <version>${dubbo-registry-nacos.version}</version>
        </dependency>
        <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>dubbo-serialization-kryo</artifactId>
            <version>${dubbo-serialization-kryo.version}</version>
        </dependency>
        <dependency>
            <groupId>com.alibaba.boot</groupId>
            <artifactId>dubbo-spring-boot-starter</artifactId>
            <version>${dubbo-spring-boot.version}</version>
        </dependency>
        <dependency>
            <groupId>com.alibaba.spring</groupId>
            <artifactId>spring-context-support</artifactId>
            <version>${alibaba-spring-context-support.version}</version>
        </dependency>
        <!--       解决： java.lang.NoClassDefFoundError: io/netty/channel/EventLoopGroup -->
        <dependency>
            <groupId>io.netty</groupId>
            <artifactId>netty-all</artifactId>
            <version>4.1.32.Final</version>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <configuration>
                    <mainClass>com.gtk.consumer.NacosConsumerApplication</mainClass>
                </configuration>
            </plugin>
        </plugins>
    </build>
</project>
```

### application.yml

```yml
spring:
  main:
    allow-bean-definition-overriding: true
  application:
    name: dubbo-consumer
  cloud:
    nacos:
      discovery:
        server-addr: 127.0.0.1:8848

server:
  port: 10201

dubbo:
  application:
    # 花了2小时解决。此处把-写成了_  报错：Caused by: java.lang.IllegalStateException: Invalid name="com.alibaba.dubbo.config.ApplicationConfig#0" contains illegal character, only digit, letter, '-', '_' or '.' is legal.
    name: dubbo-consumer
    qos-enable: false
  registry:
    address: nacos://127.0.0.1:8848
  scan:
    basePackages: com.gtk.dubbo.provider.service
  protocol:
    name: dubbo
    port: -1
    # 高速序列化 想要使用 Kryo 序列化只需要 DTO/Domain/Entity 这类传输对象实现序列化接口即可，
    # 无需额外再做配置，如：public class User implements Serializable{}。 Dubbo 已经自动将 JDK 中的常用类进行了注册
    serialization: kryo
management:
  endpoints:
    web:
      exposure:
        include: "*"
```

### 实现类

```java
package com.gtk.nacos.dubbo.controller;

import com.alibaba.dubbo.config.annotation.Reference;
import com.gtk.dubbo.provider.service.ProviderService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ConsumerController {


    @Reference
    private ProviderService providerService;

    @RequestMapping("hi")
    public String hi() {
        return providerService.hi();
    }

}
```

## 须知

- 服务提供者启动服务之后， 服务消费者进行消费。访问服务消费者的接口返回了服务提供者的端口号表示成功。

- 在 Provider 和 Consumer 项目启用 Kryo 高速序列化功能，两个项目的配置方式相同

    ```xml
    // pom.xml
    <properties>
        <dubbo-kryo.version>2.7.2</dubbo-kryo.version>
    </properties>
    <dependency>
        <groupId>org.apache.dubbo</groupId>
        <artifactId>dubbo-serialization-kryo</artifactId>
        <version>${dubbo-kryo.version}</version>
    </dependency>
    // application.yml
    dubbo:
      protocol:
        serialization: kryo
    ```
    
- 服务提供者默认实现了随机的负载均衡策略，可以使用如下配置进行设置。
        
     ```
    # 负载均衡配置的值分别是：random(默认随机)，roundrobin(轮循)，leastactive(最少活跃调用数)，consistenthash(一致性 Hash)
    dubbo:provider:loadbalance: roundrobin
    ```
    
    源码地址: [https://github.com/gaoqisen/gtk-devops-scd](https://github.com/gaoqisen/gtk-devops-scd)