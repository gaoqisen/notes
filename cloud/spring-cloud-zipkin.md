---
title: spring-cloud-zipkin
date: 2019-5-27 20:13:52
tags: SpringCloud
categories: SpringCloud
keywords: spring-cloud-zipkin
description: springCloud的链路追踪系统。
---

## zipkin项目

### 服务端

- pom.xml

```
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>demo-spring-cloud</groupId>
        <artifactId>demo-spring-cloud-dependencies</artifactId>
        <version>1.0.0-SNAPSHOT</version>
        <relativePath>../cloud-dependences/pom.xml</relativePath>
    </parent>
    <artifactId>demo-spring-cloud-zipkin</artifactId>
    <packaging>jar</packaging>

    <name>demo-spring-cloud-zipkin</name>
    <inceptionYear>2018-Now</inceptionYear>

    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-zipkin</artifactId>
        </dependency>
        <dependency>
            <groupId>io.zipkin.java</groupId>
            <artifactId>zipkin</artifactId>
        </dependency>
        <dependency>
            <groupId>io.zipkin.java</groupId>
            <artifactId>zipkin-server</artifactId>
            <version>2.12.9</version>
        </dependency>
        <dependency>
            <groupId>io.zipkin.java</groupId>
            <artifactId>zipkin-autoconfigure-ui</artifactId>
            <version>2.12.9</version>
        </dependency>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-eureka-server</artifactId>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <configuration>
                    <mainClass>com.demo.spring.zipkin.ZipKinApplication</mainClass>
                </configuration>
            </plugin>
        </plugins>
    </build>
</project>
```

> 需要在dependences的properties里面添加<zipkin.version>2.10.1</zipkin.version>用于管理版本

- application.yml

```
spring:
  application:
    name: hello-spring-cloud-zipkin

server:
  port: 9411

eureka:
  client:
    serviceUrl:
      defaultZone: http://localhost:8761/eureka/

management:
  metrics:
    web:
      server:
        auto-time-requests: false
```

- 访问http://localhost:9411即可。

### 客服端

## 增加pom.xml

```
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-zipkin</artifactId>
</dependency>
```

## 增加application.yml

```
spring:
  zipkin:
    base-url: http://localhost:9411
```


## admin项目

> 链路追踪ui管理页面




