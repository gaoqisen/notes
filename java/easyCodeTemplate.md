---
title: EasyCode代码生成器
date: 2021-07-19 21:10:05
tags: easyCode
Categories: java
keywords: EasyCode
description: EasyCode代码生成器的一些模版，方便以后的代码生成。
---

## 一、简介

在idea的插件市场搜素easycode安装之后把下面的模版复制到Settings > Other Settings > EasyCode-MybagisCodeHelper即可。

模版依赖lombok，需要先安装lombok插件和maven依赖tkmybatis。

## 二、配置模版

### 2.1 entity

```groovy
##定义初始变量
$!init
#set($tableName = $tool.append($tableInfo.name, "Entity"))
##设置回调
$!callback.setFileName($tool.append($tableName, ".java"))
$!callback.setSavePath($tool.append($tableInfo.savePath, "/model/entity"))

##拿到主键
#if(!$tableInfo.pkColumn.isEmpty())
    #set($pk = $tableInfo.pkColumn.get(0))
#end

##使用全局变量实现默认包导入
package $!{tableInfo.savePackageName}.model.entity;

import java.io.Serializable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.persistence.*;
$!autoImport
##使用宏定义实现类注释信息
/**
 * $!{tableInfo.comment}($!{tableInfo.name})实体类
 *
 * @author $!author
 * @since $!time.currTime()
 */

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "$tableInfo.obj.getName()")
public class $!{tableInfo.name}Entity implements Serializable {

    private static final long serialVersionUID = $!tool.serial();
#foreach($column in $tableInfo.fullColumn)
#if(${velocityCount} ==  1)
#end
#if(${column.comment})

    /**
     * ${column.comment}
     */
#end
#if(${velocityCount} ==  1)
    @Id
    @Column(name = "$column.obj.getName()")
#else
    @Column(name = "$column.obj.getName()")
#end
    private $!{tool.getClsNameByFullName($column.type)} $!{column.name};
#end
}
```

### 2.2 xml

```groovy
##引入mybatis支持
$!mybatisSupport
$!init
##设置保存名称与保存位置
$!callback.setFileName($tool.append($!{tableInfo.name}, "Mapper.xml"))
$!callback.setSavePath($tool.append($tableInfo.savePath, "/dao/xml"))


##拿到主键
#if(!$tableInfo.pkColumn.isEmpty())
    #set($pk = $tableInfo.pkColumn.get(0))
#end

<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="$!{tableInfo.savePackageName}.dao.$!{tableInfo.name}Mapper">

    <resultMap id="BaseResultMap" type="$!{tableInfo.savePackageName}.model.entity.$!{tableInfo.name}Entity">
        <!--@Table $!{tableInfo.originTableName}-->
#foreach($column in $tableInfo.fullColumn)
        <result property="$!column.name" column="$!column.obj.name" jdbcType="$!column.ext.jdbcType"/>
#end
    </resultMap>

</mapper>

```

### 2.3 mapper

```groovy

##定义初始变量
$!init
#set($tableName = $tool.append($tableInfo.name, "Mapper"))
##设置回调
$!callback.setFileName($tool.append($tableName, ".java"))
$!callback.setSavePath($tool.append($tableInfo.savePath, "/dao"))

##拿到主键
#if(!$tableInfo.pkColumn.isEmpty())
    #set($pk = $tableInfo.pkColumn.get(0))
#end

#if($tableInfo.savePackageName)package $!{tableInfo.savePackageName}.#{end}dao;

import $!{tableInfo.savePackageName}.model.entity.$!{tableInfo.name}Entity;
import tk.mybatis.mapper.common.Mapper;

/**
 * $!{tableInfo.comment}($!{tableInfo.name})表数据库访问层
 *
 * @author $!author
 * @since $!time.currTime()
 */
public interface $!{tableName} extends Mapper<$!{tableInfo.name}Entity>{

}

```

### 2.4 service

```groovy

##定义初始变量
$!init
#set($tableName = $tool.append($tableInfo.name, "Service"))
##设置回调
$!callback.setFileName($tool.append($tableName, ".java"))
$!callback.setSavePath($tool.append($tableInfo.savePath, "/service"))

##拿到主键
#if(!$tableInfo.pkColumn.isEmpty())
    #set($pk = $tableInfo.pkColumn.get(0))
#end

#if($tableInfo.savePackageName)package $!{tableInfo.savePackageName}.#{end}service;

/**
 * $!{tableInfo.comment}($!{tableInfo.name})表服务接口
 *
 * @author $!author
 * @since $!time.currTime()
 */
public interface $!{tableName} {

}

```

### 2.5 serviceimpl

```groovy

##定义初始变量
$!init
#set($tableName = $tool.append($tableInfo.name, "ServiceImpl"))
##设置回调
$!callback.setFileName($tool.append($tableName, ".java"))
$!callback.setSavePath($tool.append($tableInfo.savePath, "/service/impl"))

##拿到主键
#if(!$tableInfo.pkColumn.isEmpty())
    #set($pk = $tableInfo.pkColumn.get(0))
#end

#if($tableInfo.savePackageName)package $!{tableInfo.savePackageName}.#{end}service.impl;

import $!{tableInfo.savePackageName}.dms.$!{tableInfo.name}Dms;
import $!{tableInfo.savePackageName}.service.$!{tableInfo.name}Service;
import org.springframework.stereotype.Service;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * $!{tableInfo.comment}($!{tableInfo.name})表服务实现类
 *
 * @author $!author
 * @since $!time.currTime()
 */
@Service("$!tool.firstLowerCase($!{tableInfo.name})Service")
@Slf4j
@AllArgsConstructor
public class $!{tableName} implements $!{tableInfo.name}Service {

    private final $!{tableInfo.name}Dms $!tool.firstLowerCase($!{tableInfo.name})Dms;

}

```

### 2.6 controller

```groovy

##定义初始变量
$!init
#set($tableName = $tool.append($tableInfo.name, "Controller"))
##设置回调
$!callback.setFileName($tool.append($tableName, ".java"))
$!callback.setSavePath($tool.append($tableInfo.savePath, "/web"))
##拿到主键
#if(!$tableInfo.pkColumn.isEmpty())
    #set($pk = $tableInfo.pkColumn.get(0))
#end

#if($tableInfo.savePackageName)package $!{tableInfo.savePackageName}.#{end}web;

import $!{tableInfo.savePackageName}.entity.$!{tableInfo.name};
import $!{tableInfo.savePackageName}.service.$!{tableInfo.name}Service;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * $!{tableInfo.comment}($!{tableInfo.name})表控制层
 *
 * @author $!author
 * @since $!time.currTime()
 */
@RestController
@RequestMapping("$!tool.firstLowerCase($tableInfo.name)")
@AllArgsConstructor
@Slf4j
public class $!{tableName} {

    private final $!{tableInfo.name}Service $!tool.firstLowerCase($!{tableInfo.name})Service;

}
```