---
title: java一些常用的类
date: 2020-08-16 20:50:11
tags: java base
categories: java
keywords: java base
description: 记录一些新的语法和自己不经常使用的方法，方便自己以后使用
---



## BeanCopier

拷贝两个对象,网上资料显示: BeanCopier的性能是PropertyUtils (apache-common)的504倍。PropertyUtils的性能是BeanUtils(apache-common)的1.71倍,因此对象的拷贝尽量使用BeanCopier。注意属性没有提供set方法，只是提供了get方法是会报错的，无法复制属性

```java
// 拷贝对象， 在create对象的时候会出现性能瓶颈，可以将创建的过程放在缓存中，方便直接获取
BeanCopier copier = BeanCopier.create(FromEntity.class, ToEntity.class, false);  
ToEntity to = new ToEntity();  
copier.copy(from, to, null);  
```

## Assert

```java

```



