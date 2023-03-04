---
title: oracle －学习笔记
date: 2019-2-18 20:10:11
tags: oracle
categories: database
keywords: oracle study
description: oracle的一些笔记
---

## 一些sql语句

```mysql
-- 时间格式化
to_date('2019-01-28', 'yyyy-mm-dd')
TO_DATE('2018-1-21 17:21:11', 'YYYY-MM-DD HH24:MI:SS')

-- 删除表空间以及内容
drop tablespace tablespace_name including contents and datafiles;

-- 查看oracle库的表空间以及使用情况
select sum(bytes)/(1024*1024) as free_space,tablespace_name   
from dba_free_space  
group by tablespace_name;  

-- 服务器表空间的存储位置
select tablespace_name,
file_name,
bytes/1024/1024 file_size,autoextensible 
from dba_temp_files;

-- 创建临时表空间
create temporary tablespace test_temp
tempfile '/u01/app/oracle/oradata/XE/test_temp.dbf'
size 32m
autoextend on
next 32m maxsize unlimited
extent management local;

-- 创建表空间
create tablespace test_data
logging
datafile '/u01/app/oracle/oradata/XE/test-data.dbf'
size 32m
autoextend on
next 32m maxsize unlimited
extent management local;

-- 创建用户
create user test identified by manager
account unlock
default tablespace test_data
temporary tablespace test_temp;

-- 授权给用户    
grant connect,resource,dba to test;

-- 创建索引
CREATE UNIQUE INDEX ID_EQ ON TABLENAME (ID);

-- 创建非唯一索引
CREATE INDEX ID_EQ ON TABLENAME (ID);

-- 查询当前被锁的对象 
select t2.username, t2.sid, t2.serial#, t2.logon_time
from v$locked_object t1, v$session t2
where t1.session_id = t2.sid
order by t2.logon_time
   
-- 杀会话136,45267为对应的ID    
ALTER SYSTEM KILL SESSION '136,45267'

-- 普通查询（硬解析）
SELECT * FROM TEST.DC_PROJECT WHERE SEQ_ID = 1

-- 绑定变量查询（软解析）
SELECT * FROM TEST.DC_PROJECT WHERE SEQ_ID = :SEQ_ID

CREATE TABLE t (x int);  -- 创建t表
DELETE FROM TEST.T; -- 删除表数据

-- 循环给t表添加100条数据 （硬解析）
DECLARE
  i number := 0;
BEGIN 
	FOR i IN 1 .. 100 LOOP 
		INSERT INTO TEST.T VALUES (i);
	END LOOP;
COMMIT;
END;

-- 循环给t表添加100条数据(软解析）相比于硬解析快20倍（未验证， oracle编程艺术书解释）
DECLARE
  i number := 0;
BEGIN 
	FOR i IN 1 .. 100 LOOP 
		EXECUTE IMMEDIATE
		'INSERT INTO TEST.T VALUES ( :X )' USING i;
	END LOOP;
COMMIT;
END;

-- 查看oracle版本
select * from v$version
select version from v$instance;
Select version FROM Product_component_version   Where SUBSTR(PRODUCT,1,6)='Oracle';

-- SQL>：查看当前的数据库参数undo_retention设置（闪回时间）
SQL>：show parameter undo

-- 修改系统的undo_retention时间
ALTER SYSTEM SET undo_retention=10800 SCOPE=BOTH;

-- SQL>：闪回测试
SQL>：variable scn NUMBER
SQL>：EXEC :scn := dbms_flashback.get_system_change_number;
SQL>：print scn;

-- 查看闪回是否开启
select flashback_on from V$database;
-- 开启闪回
alter system set db_recovery_file_dest_size=2G scope=both;
alter system set db_recovery_file_dest='/u01/app/oracle/oradata/XE/flashback' scope=both;
root: su - oracle -- 必须用oracle用户访问 linux命令行执行
oracle: sqlplus /nolog -- 进入sqlplus控制台 linux命令行执行
SQL>：connect / as sysdba  -- 系统管理员登陆
SQL>：shutdown IMMEDIATE;  -- 不允许新的连接、不等待会话结束、不等待事务结束、做一个检查点并关闭数据文件。没有结束的事务是自动ROLLBACK的。启动时不需要实例恢复。
SQL>：startup mount; -- mount数据库，仅仅给dba进行管理操作，不允许数据库的用户访问。仅仅只是当前实例的控制文件被打开，数据文件未打开。
SQL>：alter database archivelog;   -- 归档日志
SQL>：alter database flashback on;  -- 闪回开启  报错：ORA-00439: feature not enabled: Flashback Database 。 oracle的标准版和标准1版均不支持！只有购买了企业版本才支持flashback.
SQL>：alter database open;  -- 打开数据库

-- 闪回查询（在某个时间节点表做了什么）
select count(*), :scn then_scn, dbms_flashback.get_system_change_number now_scn from test.emp as of scn :scn;
-- 闪回查询（同一个对象在两个时间节点所做的事情）
select count(*), :scn then_scn, dbms_flashback.get_system_change_number now_scn from (select count(*) cnt_now from test.emp), (select count(*) cnt_then from test.emp as of scn :scn

-- 查询资源被锁的简单信息
select username,object_name, sid,serial#,logon_time from v$locked_object,v$session, dba_objects 
where v$locked_object.session_id=v$session.sid AND dba_objects.object_id =v$locked_object.object_id ;

/**
 查询资源被锁的详细信息
 v$locked_object 视图中记录了所有session中的所有被锁定的对象信息。 
 v$session 视图记录了所有session的相关信息。 
 dba_objects 为oracle用户对象及系统对象的集合，通过关联这张表能够获取被锁定对象的详细信息。
 username：oracle用户名 sid：进程号 serial#：序列号 object_name：表名 osuser：操作系统用户名 machine：机器名 program：操作工具 
 logon_time：登陆时间 lockwait：表示当前这张表是否正在等待其他用户解锁这张表 locked_mode：锁表模式（下面详细说明）
 0：none 1：null 空 2：Row-S 行共享(RS)：共享表锁，sub share 3：Row-X 行独占(RX)：用于行的修改，sub exclusive 4：Share 共享锁(S)：阻止其他DML操作，share 
 5：S/Row-X 共享行独占(SRX)：阻止其他事务操作，share/sub exclusive 6：exclusive 独占(X)：独立访问使用，exclusive
 1级锁有：Select，有时会在v$locked_object出现。 
 2级锁有：Select for update,Lock For Update,Lock Row Share select for update当对话使用for update子串打开一个游标时，所有返回集中的数据行都将处于行级(Row-X)独占式锁定，其他对象只能查询这些数据行，不能进行update、delete或select for update操作。 
 3级锁有：Insert, Update, Delete, Lock Row Exclusive 没有commit之前插入同样的一条记录会没有反应, 因为后一个3的锁会一直等待上一个3的锁, 我们必须释放掉上一个才能继续工作。 
 4级锁有：Create Index, Lock Share locked_mode为2,3,4不影响DML(insert,delete,update,select)操作, 但DDL(alter,drop等)操作会提示ora-00054错误。 00054, 00000, 
 “resource busy and acquire with NOWAIT specified” // *Cause: Resource interested is busy.  // *Action: Retry if necessary. 
 5级锁有：Lock Share Row Exclusive 具体来讲有主外键约束时update / delete … ; 可能会产生4,5的锁。 
 6级锁有：Alter table, Drop table, Drop Index, Truncate table, Lock Exclusive
 */
select t2.LOGON_TIME,t2.username,t2.sid,t2.serial#,t3.object_name,t1.LOCKED_MODE,t2.OSUSER,t2.MACHINE,t2.PROGRAM,t2.COMMAND,t2.LOCKWAIT
from v$locked_object t1, v$session t2, dba_objects t3 where t1.session_id = t2.sid and t1.object_id = t3.object_id order by t2.logon_time;

-- 查某session 正在执行的sql语句，从而可以快速定位到哪些操作或者代码导致事务一直进行没有结束等.
SELECT sql_text FROM v$sqltext a WHERE (a.hash_value, a.address) IN
(SELECT DECODE(sql_hash_value, 0, prev_hash_value, sql_hash_value),DECODE(sql_hash_value, 0, prev_sql_addr, sql_address)
FROM v$session b WHERE b.sid = '665') ORDER BY piece ASC;

-- kill 资源被锁
alter system kill session '988,24597'

-- 查看链接数
select username,count(username) from v$session where username is not null group by username

-- 查看表的剩余空间,是否自动扩展，可以自动扩展的最大值
select FILE_NAME,TABLESPACE_NAME,BYTES/1024/1024 BYTES_M, MAXBYTES/1024/1024 MAX_M,AUTOEXTENSIBLE from dba_data_files;

-- 查看表的表空间
select tablespace_name,table_name from user_tables where table_name='TABLE_NAME';

-- 查看表的实际使用情况，和剩余空间
select f.tablespace_name tablespace_name,round((d.sumbytes/1024/1024)) total_m,round((d.sumbytes-f.sumbytes)/1024/1024) used_m,round(f.sumbytes/1024/1024,2) free_m,
round((d.sumbytes-f.sumbytes)*100/d.sumbytes,2)||'%' used_percent,round((f.sumbytes)*100/d.sumbytes,2)||'%' free_percent 
from (select tablespace_name,sum(bytes) sumbytes from dba_free_space group by tablespace_name) f,
(select tablespace_name,sum(bytes) sumbytes from dba_data_files group by tablespace_name) d  where f.tablespace_name= d.tablespace_name(+) 
order by (d.sumbytes-f.sumbytes)*100/d.sumbytes desc; 

```

