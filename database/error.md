---
title: 记录一次数据库迁移的失败经历
date: 2018-09-10 22:50:11
tags: data mysql
categories: database
---
sql数据结构

![表一](https://upload-images.jianshu.io/upload_images/7172355-8763ef5d4ce774b9.png)
表一
![表二](https://upload-images.jianshu.io/upload_images/7172355-c87a27b65ee4a5f5.png)
表二
![表三](https://upload-images.jianshu.io/upload_images/7172355-d7af9c1c49b8f4ca.png)
表三

目标:将表一的数据迁移到表二、表三里面，一分为二。表二里面放产品主体，表三里面放多规格
## 原因：
   由于之前设计表的经验不足，没有考虑到产品多规格的情况，写到快完成的时候，才想到用两张表实现产品的多规格（引以为戒，以后设计表的时候，要多方面考虑）。之前用一张表的时候是用checked字段区分产品是否为多规格的，如果是单规格和多规格的主体，就存1。否则就存多规格主体的ID。最终导致现在上传了2915个产品（包括多规格）。管理很混乱，数据比较多，不可能手工重新传了的。只能做数据迁移。
## 实现思路有两种办法：
#### 一、通过实体类迁移数据。
 - 1.创建originCommodity(表一),commodity（表二），commodityDetail（表三）实体类
 
- 2.通过dao获取所有的originCommodity数据（获取所有的数据）。用for循环将originCommodity里面的数据分割为两张表commodity、commodity。并通过dao的inster批量创建commodity、commodityDetail数据（需要写sql批量插入数据）

#### 二、手动navicat软件＋少量sql

> 将表一里面的数据导入本地的数据库，通过navicat软件手动将不同的字段更改为表二里面的字段，不需要的字段直接删除。之后将数据直接导入到表二，完成迁移。（这是最笨的方法进行迁移。但是迁移的时候需要注意的是ID，表一的是uuid生成的ID，表二是自增ID）。

- 1.将表一分成两个表，commodity、commodityDetail。  commodity里面全部放checked=1的数据（主体）。commodityDetail里面存checked!=1的数据（多规格）。（创建两个表，复制表一里面的全部数据，将commodity里面的checked!=1的删除，将commodityDetail表里面的checked=1的数据删除，完成创建）

- 2.增加一个在commodity里面增加一个origin_id(原来的uuid),用来存放之前的ID。将commodity的ID更改为origin_id。id为自增ID

- 3.更改commodityDetail表里面的checked字段，需要将commodityDetail里面的checked等于commodity表里面的origin_id的数据变为commodity的自增ID。

### 用方法二处理数据遇到的问题：
  由于想要尽快的处理这个问题，我选择了方法二，用最笨的方法处理数据。一路都很顺利的处理完成了。结束之后，我就将原来的commodity删除了。因为要将表里面的数据的ID更改为自增ID，而且开始的时候是新增了自增ID的字段的，之后将原来的uuid字段更改为了origin_id。这样方便其他表关联这张表的时候，可以通过origin_id获取更改之后的ID。但是有一张表我遗漏了，没有将表里面的ID更改，就将这个origin_id删除了。导致现在有一张表无法获取ID。因此，这种方法是一个很笨切不能从用的笨办法，如果用第一种方法，就不会出现这种问题了。
还好这次更改的只是测试数据，下次重新用第一种方法试一次

## 数据库需要用到的命令

###一、 将sql数据签出并放到本地：

```
    mysqldump  -hlocalhost  -uroot --databases  数据库名 | gzip > /root/DatabaseName_$(date +%Y%m%d_%H%M%S).sql.gz

    scp root@ip地址:/root/sql文件名 ./Desktop   // 将文件复制到本地
```

失败使人进步，加油。end




