---
title: java 笔记
date: 2018-10-20 20:50:11
tags: java base
categories: java
keywords: java base
description: 一些之前没有仔细了解过，或忘记的java 基础。这次写出来，加深自己的记忆与理解。
---

## 一、基础

### 1.1 java方法中参数的传递(java中只有值传递)：

- 一个方法不能修改一个基本数据类型的参数（即数值型或布尔型)(方法中改变基本类型数据，不会影响到之前的数据。相当于拷贝数据)

- 一个方法可以改变一个对象参数的状态。(对象: 方法中改变对象的数据，原始的对象的值会跟着改变。)

- 一个方法不能让对象参数引用一个新的对象

### 1.2 ==与equals的区别

== 判断的是是否是对象的地址，即判断连个对象是不是同一个地址。（基本数据类型对比的是值，引用数据类型对比的是对象地址）

equals 判断的是值是否相同（对象没有覆盖equals方法相当于== ，否则通过覆盖的equals判断对象的值是否相等）

- 如果对象需要用equals对比，需要重写equals方法。

- String 对象是重写过equals方法的，所有string的equals对比的是值。

- 当创建string类型对象的时候，虚拟机会在常量池中找是否有相同的对象，如果有就把它赋给当前引用，否则就新创建对象

### 1.3 hashCode与equals

- hashCode的作用就是获取哈西码。它实际返回的是一个int整数。这个哈西码的作用就是确定索引的位置（可以快速找到所需要的对象）。

- hashCode在map中的作用就是为了减少equals的执行次数,相应就提高了执行速度。

- 如果不同的对象拥有相同的hashCode值，他们也不一定是相等的。如果相同的情况下，就像HashSet一样，会使用equals去对比值是否相同。

## 二、事务

### 2.1 @transactional注解在什么情况下会失效

1. 只能应用到public修饰符上，其它修饰符不起作用，但不报错
2. 数据库引擎不支持事务(Mysql的MyISAM不支持事务)
3.  没有被 Spring 管理
4. 数据源没有配置事务管理器
5. 异常捕获之后不抛出。try{}catch(Exception e){}
6. @Transactional 注解属性 propagation 设置错误，如：`TransactionDefinition.PROPAGATION_SUPPORTS`：如果当前存在事务，则加入该事务；如果当前没有事务，则以非事务的方式继续运行。 `TransactionDefinition.PROPAGATION_NOT_SUPPORTED`：以非事务方式运行，如果当前存在事务，则把当前事务挂起。 `TransactionDefinition.PROPAGATION_NEVER`：以非事务方式运行，如果当前存在事务，则抛出异常。这3种设置都会滚。
7. @Transactional 注解属性 rollbackFor 设置错误（抛出异常如果不是运行时异常需要添加注解@Transactional(rollbackFor = Exception.class)）
8. 同一个类中方法调用，导致@Transactional失效。比如有一个类Test，它的一个方法A，A再调用本类的方法B（不论方法B是用public还是private修饰），但方法A没有声明注解事务，而B方法有。则外部调用方法A之后，方法B的事务是不会起作用的（只有当事务方法被当前类以外的代码调用时，才会由`Spring`生成的代理对象来管理）

 


