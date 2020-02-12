---
title: spring-cloud-config
date: 2019-5-26 12:13:02
tags: SpringCloud
categories: SpringCloud
keywords: spring-cloud-config
description: springCloud的配置中心，统一管理配置。
---


## 配置中心服务端

### 创建项目

- 创建存放项目的文件夹，src/main/java、 src/main/rescoures、pom.xml等

- main方法添加注解

```
@SpringBootApplication
@EnableConfigServer
@EnableEurekaClient
```

- 如果启动时报错： Could not find or load main class 。则需要mvn compile一下就好了。

- 启动成功后访问：http://localhost:8888/ 出现spring页面。

```
// 访问方式
http://ip:port/{application}/{profile}[/{label}]
http://ip:port/{application}-{profile}.yml
http://ip:port/{label}/{application}-{profile}.yml
http://ip:port/{application}-{profile}.properties
http://ip:port/{label}/{application}-{profile}.properties
```

### pom.xml

```
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <parent>
        // 对应dependences项目的groupId
        <groupId>com.demo.config</groupId>
        // 对应dependences项目的artifactId
        <artifactId>demo-spring-cloud-dependencies</artifactId>
        <version>1.0.0-SNAPSHOT</version>
        <relativePath>../cloud-dependences/pom.xml</relativePath>
    </parent>

    <artifactId>demo-spring-cloud-config</artifactId>
    <packaging>jar</packaging>

    <name>demo-spring-cloud-config</name>
    <inceptionYear>2018-Now</inceptionYear>

    <dependencies>
        <!-- Spring Boot Begin -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-tomcat</artifactId>
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
            <artifactId>spring-cloud-config-server</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-eureka-server</artifactId>
        </dependency>
        <!-- Spring Cloud End -->
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <configuration>
                    <mainClass>com.funtl.hello.spring.cloud.config.ConfigApplication</mainClass>
                </configuration>
            </plugin>
        </plugins>
    </build>
</project>
```

## 配置中心客户端

### pom.xml

```
<!--从配置中心读取配置-->
<dependency>
  <groupId>org.springframework.cloud</groupId>
  <artifactId>spring-cloud-starter-config</artifactId>
</dependency>
```

### application.yml

```
spring:
  cloud:
    config:
      uri: http://localhost:8888
      name: cloud-zipkin
      label: master
      profile: dev
```


