---
title: spring-cloud-eurekra
date: 2019-5-27 15:13:52
tags: SpringCloud
categories: SpringCloud
keywords: spring-cloud-eurekra
description: springCloud的注册服务中心。
---

## 创建项目

- 创建存放项目的文件夹，src/main/java、 src/main/rescoures、pom.xml等

- 注解

```
@SpringBootApplication
@EnableEurekaServer
```

## pom.xml

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

    <artifactId>demo-spring-cloud-eureka</artifactId>
    <packaging>jar</packaging>

    <name>demo-spring-cloud-eureka</name>
    <inceptionYear>2018-Now</inceptionYear>

    <dependencies>
        <!-- Spring Boot Begin -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
        <!-- Spring Boot End -->

        <!-- Spring Cloud Begin -->
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
                    <!--jar运行时指定的入口类-->
                    <mainClass>com.demo.spring.eurekra.EurekraApplication</mainClass>
                </configuration>
            </plugin>
        </plugins>
    </build>
</project>
```

