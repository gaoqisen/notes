---
title: 审核流学习
date: 2021-2-6 14:23:52
tags: Java flow
categories: java
keywords: 审核流
description: 学习一下审核流，整理一下思路
---

## 一、案例分析

1. 有两个审核组（审核组1、审核组2）、每组有两个审核成员（审核组1- a，b。审核组2- c，d）
2. 当有数据需要审核初始化审核组的时候，如数据a需要审核组1和审核组2进行审核。则初始化两条审核信息
3. 初始数据只有审核组1的成员可以查看并且审核，审核组1审核通过之后审核组2才能查看和审核数据到审核数据。审核组2审核的时候，审核组1只能查看并不能操作审核数据。
4. 当前用户去查询列表的时候，需要先去查找自己的数据权限。如果有权限则进行展示。（代办事项）

sql初始化成功之后，进行代码开发。

## 二、接口设计

### 2.1 创建审核流程接口（初始化审核流）

1. 逻辑：根据审核类型关联flow_review_rule、flow_rule_group、flow_review_group获取审核类型所需要的审核组并创建审核流程
2. 入参: 审核唯一编码、审核类型、用户ID...

### 2.2 流程列表查询接口（代办事项）

1. 入参:  产品编码、用户ID、开始时间和结束时间
2. 逻辑：
   1. 通过用户ID去查询用户所在的审核组，如果没有审核组则直接返还空数据
   2. 通过审核组和业务类型分页获取当前用户可以审核的流程审核表里面的数据
   3. 用业务类型获取业务系统的dubbo接口
   4. 通过dubbo接口和分页获取的审核唯一编码泛化调用业务系统，获取业务系统的列表数据
   5. 组装审核信息后返还给前端

通用的业务审核列表。只是展示需要审核的数据

### 2.3 流程审核查询（查看审核情况）

1. 入参: 审核唯一编码、业务类型
2. 逻辑: 通过审核唯一编码查询审核流程表和审核流程记录表并组装数据后返回给前端

### 2.4 流程审核接口（判断是否有审核权限）

1. 入参: 审核唯一编码、审核人员ID、审核结果、驳回资料等、当前审核流程ID、审核类型
2. 逻辑：
   1. 判断审核情况是通过还是拒绝，如果是拒绝则通过审核类型调用业务系统（用户中心or订单中心）审核接口进行拒绝操作。
   2. 如果是通过则判断当前审核流程是否是最后一个审核流程，如果是最后一个流程则通过审核类型调用业务系统（用户中心or订单中心）审核接口进行审核。
   3. 修改流程表里面当前流程流状态
   4. 在审核流程记录表里面添加记录

审核通过、审核拒绝时调用

### 2.5 流程数据修改接口（判断是否有权限修改）



## 三、数据库表设计

```sql
- 用户和组的关联表
create table flow_group_user(
    id bigint(20) auto_increment key comment '自增ID',

    group_id bigint(20) not null comment '组ID',
    user_id bigint(20) not null comment '用户ID',

    create_user_id bigint(20) comment '创建用户ID',
    create_date timestamp null default current_timestamp comment '创建时间',
    modify_user_id bigint(20) comment '修改用户ID',
    modify_date timestamp null default current_timestamp on update current_timestamp comment '修改时间'
) comment '用户和组的关联表';
-- 审核组
create table flow_review_group(
    id bigint(20) auto_increment key comment '自增ID',

    name varchar(100) not null comment '审核组名称',
    `desc` varchar(300) default null comment '审核组名称',

    create_user_id bigint(20) comment '创建用户ID',
    create_date timestamp null default current_timestamp comment '创建时间',
    modify_user_id bigint(20) comment '修改用户ID',
    modify_date timestamp null default current_timestamp on update current_timestamp comment '修改时间'
) comment '审核组';
-- 审核表（一条审核记录对应多条审核操作操作记录）为了展示所有的审核详情
create table flow_review(
    id bigint(20) auto_increment key comment '自增ID',

    review_no bigint(20) not null comment '审核码',
    rule_id bigint(20) not null comment '规则ID',
    review_status varchar(2) not null comment '审核状态 0-待审核,1-审核中,2-审核成功,3-审核失败',

    create_user_id bigint(20) comment '创建用户ID',
    create_date timestamp null default current_timestamp comment '创建时间',
    modify_user_id bigint(20) comment '修改用户ID',
    modify_date timestamp null default current_timestamp on update current_timestamp comment '修改时间'
) comment '审核表';

-- 审核操作记录表
create table flow_review_operate(
    id bigint(20) auto_increment key comment '自增ID',

    review_no bigint(20) not null comment '审核码',
    review_parent_id bigint(20) not null comment '审核父ID',
    review_status varchar(2) not null comment '审核状态 0-待审核,1-审核成功,2-审核失败',
    `desc` varchar(300) default null comment '审核描述',
    review_group_id bigint(20) not null comment '审核组ID',
    review_user_id bigint(20) not null comment '审核用户ID',

    create_user_id bigint(20) comment '创建用户ID',
    create_date timestamp null default current_timestamp comment '创建时间',
    modify_user_id bigint(20) comment '修改用户ID',
    modify_date timestamp null default current_timestamp on update current_timestamp comment '修改时间'
) comment '审核操作记录表';
-- 审核规则
create table flow_review_rule(
    id bigint(20) auto_increment key comment '自增ID',

    name bigint(50) not null comment '名称',
    `type` varchar(2) not null comment '类型: 0-用户,1-订单,2-实名制',
    `desc` varchar(300) default null comment '描述',
    request_type varchar(2) not null comment '请求类型1-dubbo,2-http',
    class_name varchar(300) default null comment '类名',
    class_method varchar(300) default null comment '类方法',
    class_method_args varchar(300) default null comment '类方法参数',


    create_user_id bigint(20) comment '创建用户ID',
    create_date timestamp null default current_timestamp comment '创建时间',
    modify_user_id bigint(20) comment '修改用户ID',
    modify_date timestamp null default current_timestamp on update current_timestamp comment '修改时间'
) comment '审核规则';
-- 规则和组关联表
create table flow_rule_group(
    id bigint(20) auto_increment key comment '自增ID',

    group_id bigint(20) not null comment '组ID',
    rule_id bigint(20) not null comment '规则ID',
    is_modify varchar(2) not null comment '是否修改0-不修改, 1-修改',
    is_review varchar(2) not null comment '请求审核0-不审核, 1-审核',

    create_user_id bigint(20) comment '创建用户ID',
    create_date timestamp null default current_timestamp comment '创建时间',
    modify_user_id bigint(20) comment '修改用户ID',
    modify_date timestamp null default current_timestamp on update current_timestamp comment '修改时间'
) comment '规则和组关联表';
```

