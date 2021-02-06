---
title: 简单的权限管理小工具详细设计
date: 2020-12-09 20:50:11
tags: java springBoot
categories: java
keywords: java springBoot
description: GQS-WEBCENTER, 一个轻量级的WEB中心。
---

## 一、项目结构

```
// 通用的核心类
webcenter-core
// 提供的接口
webcenter-api
// 只要的业务逻辑，项目通过集成core、api、admin即可实现简单的单系统权限框架
webcenter-admin
// 审核流，项目集成core、api、admin、review接口实现审核流功能
webcenter-review
// 控制台，项目通过集成core、api、admin、console即可实现web中心的单点登录功能
webcenter-console
// 提供ui页面
webcenter-webpage
```

## 二、项目流程


![https://gaoqisen.github.io/GraphBed/202012/20201212175908.png](https://gaoqisen.github.io/GraphBed/202012/20201212175908.png)

一个用户多个角色

一个部门，多个角色(包含当前部门和当前部门子部门的所有权限)

一个用户一个部门，一个角色(用户拥有所有角色的并集权限)

一个角色多个菜单和权限
![https://gaoqisen.github.io/GraphBed/202012/20201212180556.png](https://gaoqisen.github.io/GraphBed/202012/20201212180556.png)


## 三、功能点

### webcenter-admin

1. 权限管理
2. 用户管理
3. 角色管理
4. 菜单管理
5. 流程审核

### webcenter-console

#### 系统管理

用于给系统初始化client_id等参数，其它自系统必须通过初始化的参数进行系统的配置。

#### 权限管理

主要是进行接口的管理，给进行权限的控制，防止没有权限的用户进行接口的攻击

#### 用户管理

用户体系都用同一套。用户通过单点登录获取用户和权限信息等。

#### 角色管理

给角色可以添加不同系统的不同菜单，和不同的权限

#### 菜单管理

菜单管理实现增加系统ID参数，通过系统ID区分不同的系统有不同的菜单。

## 四、实现方式

1. 通过导入依赖和增加数据库即可实现，简单的登陆注册、权限管理等
2. 以一种插件的方式去集成

## 五、接口详细设计

### 5.1 webcenter-admin

用户的增删改查

角色的增删改查

菜单的增删改查

权限的查询（增加通过系统启动的时候初始化到数据库）

登录接口

退出接口

密码修改接口

菜单查询接口

验证码获取接口

## 5.2 webcenter-console

单点登录接口(登录后返回用户的权限、菜单等信息)

退出接口

系统的增删改查接口

菜单通过系统区分

用户角色的权限分配区分系统

## 5.3 webcenter-review









