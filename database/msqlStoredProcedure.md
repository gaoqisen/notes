---
title: Mysql存储过程 －学习笔记
date: 2020-02-19 17:10:11
tags: mysql procudure
categories: database
keywords: procudure database
description: Mysql存储过程的一些学习笔记
---

## 一、优势

启动服务器后或者第一次执行后(可以设置)就可以把存储过程加载到高速缓存中,这样以后调用起来就不用再通过编译，执行效率当然就高。另外执行存储过程只需要传递几个参数，用语句就需要传递整个sql语句，有效减少网络数据的传递.

## 二、存储过程

```sql
-- 创建测试表
create table admin_user_1
(
    id   int null,
    role int null
);
-- 查看视图
SELECT * from information_schema.VIEWS;
SELECT * from information_schema.TABLES;
show procedure status where db='gqs_1';
show create procedure gqs_1.test;
DROP PROCEDURE gqs_1.test;
-- 存储过程 创建一个通过ID删除数据的过程
CREATE PROCEDURE delete_matches(IN a_id INTEGER)
TEST1:BEGIN
    DELETE FROM admin_user_0
    WHERE id = a_id;
END TEST1;
-- 查看存储过程
show create procedure delete_matches;
-- 调用过程
call delete_matches(0);
-- 定义变量1、用户变量名一般以@开头。2、滥用用户变量会导致程序难以理解及管理
select '123' into @a;
select @a;
set @a = '456';
set @a = 1+1+3;
-- 在存储过程中使用用户变量
CREATE PROCEDURE test() select concat(@add, 'success');
set @add = 'ok';
call test();
-- if else
create procedure test1(in args int)
begin
    declare a int;
    set a = args +1;
    if a = 2 then
        INSERT INTO gqs_1.admin_user_1 (id, role) VALUES (6, 8);
    end if;
    if args = 0 then
        update gqs_1.admin_user_1 set role  = 6 where id = 8;
        else
        update gqs_1.admin_user_1 set role  = 5 where id = 8;
    end if;
end;
call test1(0);
-- case
create procedure test2(in args int)
begin
    declare a int;
    set a = args +1;
    case a
        when 0 then
            INSERT INTO gqs_1.admin_user_1 (id, role) VALUES (6, 8);
        when 1 then
            update gqs_1.admin_user_1 set role  = 8 where id = 8;
        else
            update gqs_1.admin_user_1 set role  = 5 where id = 8;
    end case;
end;
call test1(0);
-- for 在操作钱检查结果
create procedure test3(in args int)
begin
    declare a int;
    set a = args +1;
    while a <6 do
        INSERT INTO gqs_1.admin_user_1 (id, role) VALUES (a, 8);
        set a=a+1;
    end while;
end;
call test3(2);
-- repeat···· end repea  在操作后检查结果
create procedure test4()
begin
    declare a int;
    set a =0;
    repeat
        INSERT INTO gqs_1.admin_user_1 (id, role) VALUES (a, 8);
        set a=a+1;
        until a >= 5
        end repeat;
end;
call test4();
-- loop ·····endloop
create procedure test5()
begin
    declare a int;
    set a =0;
    l:loop
        INSERT INTO gqs_1.admin_user_1 (id, role) VALUES (a, 8);
        set a=a+1;
        if a >=5 then
            leave l;
        end if;
    end loop;
end;
call test5();

```

## 三、事件调度器Event Scheduler

1. 语法

  ```sql
  -- []: 表示可选，[|]: 单选
create
[definer = { user | current_user }]  //  定义者
event
[if not exists]
event_name  // 时间名
on schedule schedule   // 调度规则
// on schedule子句
// 1. at timestamp用于创建单次执行的事件，timestamp执行事件执行的时间(如果指定的时间是过去的时间，则会产生一个warning)，时间可以是具体的时间字符串或者是一个datetime类型的表达式(如current_timestamp)：
//   如果要指定将来某个时间，直接使用at timestamp，例：at '2017-08-08 08:08:08'；
//   如果要指定将来某个时间间隔，可利用interval关键字(interval关键字可以进行组合，at timestamp + INTERVAL 2 HOUR、 + INTERVAL 30 MINUTE)
// 2. every子句用于创建重复执行的事件，如果每分钟执行一次，则可以：EVERY 1 MINUTE。
//   当然，every子句可以指定一个开始事件和结束时间，通过STARTS和ENDS关键字来表示，具体语法与前面类似
//   例如：EVERY 12 HOUR STARTS CURRENT_TIMESTAMP + INTERVAL 30 MINUTE ENDS CURRENT_TIMESTAMP + INTERVAL 4 WEEK。
[on completion [not] preserve]  //注意特定时间执行的事件，如果设置了该参数，执行完毕后，事件将被删除，不想删除的话可以设置成on completion preserve
[enable | disable | disable on slave]  // 系统将执行这个事件
[comment 'comment']  // 描述
do event_body;  // 事件体，可以是单行 SQL 语法，或是 BEGIN……END 语句块
  ```

2. 例子

```sql
-- 查看事件调度器是否开启
SHOW VARIABLES LIKE 'event_scheduler';
SELECT @@event_scheduler;
-- 开启事件触发器
SET GLOBAL event_scheduler = ON;
-- 创建一个事件，并调用存储过程
CREATE DEFINER=`root`@`localhost` EVENT `test_sche_event`
    ON SCHEDULE EVERY 5 SECOND STARTS '2016-07-12 22:11:50'
    ON COMPLETION NOT PRESERVE ENABLE
    DO CALL `add`;
-- 每秒插入一条数据
CREATE EVENT e_test
    ON SCHEDULE EVERY 1 SECOND
    DO INSERT INTO gqs_1.admin_user_1 (id, role) VALUES (8);
-- 每秒插入一条数据通过存储过程
CREATE EVENT e_test1
    ON SCHEDULE EVERY 1 SECOND
    DO CALL test();
-- 临时关闭事件
ALTER EVENT e_test1 DISABLE;
-- 开启事件
ALTER EVENT e_test1 ENABLE;
-- 删除事件
DROP EVENT IF EXISTS e_test1;
```

## 四、springBoot调用存储过程

```
@Query(value = "call test(?1) ", nativeQuery = true)
int selectdByLike(@Param("pname") String pname);
```