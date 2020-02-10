---
title: SpringSecurity
date: 2020-02-06 10:36:18
tags: java security
categories: java
keywords: java
description: 关于SpringSecurity的一些学习整理
---

## 官方

- OAuth sql

    ```
    https://github.com/spring-projects/spring-security-oauth/blob/master/spring-security-oauth2/src/test/resources/schema.sql
    ```
    
- pom.xml
    
    ```
     <!-- Spring Security -->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-oauth2</artifactId>
        </dependency>
    ```
## 测试

- 登录获取code

    ```
    http://localhost:8082/oauth/authorize?client_id=client&response_type=code
    ```
- 通过code获取token

    ```
    curl -X POST -H "Content-Type: application/x-www-form-urlencoded" -d 'grant_type=authorization_code&code=7JpO0c' "http://client:secret@localhost:8082/oauth/token"
    ```
- 通过token获取数据

    ```
    curl --location --request GET "http://localhost:8081/contents" --header "Content-Type: application/json" --header "Authorization: Bearer 23e0070c-4fc6-4e6f-a3e8-9e170c8e74e6"
    ```