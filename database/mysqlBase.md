---
title: mysql －学习笔记
date: 2019-11-05 13:10:11
tags: mysql
categories: database
keywords: mysql study
description: mysql的一些笔记
---

## 常用

```mysql
-- 增加唯一索引
alter table tablename add unique index uniq_name(filedName);

-- 修改唯一索引
alter table tablename drop key uniq_name;
alter table tablename add unique index uniq_name(filedName);

-- 在MYSQL里，不能先select一个表的记录，在按此条件进行更新和删除同一个表的记录，解决办法是，将select得到的结果，再通过中间表select一遍
update tablename set status = 1 where id in (select id from (select id from tablename where name <> 1));

-- 增加字段
alter table tablename add column `fieldName` varcher(200) null comment '字段名称' after `id`;
```

## 一、优化方法

### 1.1. sql优化

#### 1.1.1 索引优化

1. 重复索引: MySQL需要单独维护重复的索引，并且优化器在优化查询的时候也需要逐个地进行考虑，这会影响性能,建议删除多余索引
2. 联合索引符合最左原则: key index(a,b,c)相当于创建了三个索引a,ab,abc。不支持bc索引
3. 那些情况下不会使用索引
   - 索引不会包含有NULL值的列: 只要列中包含有NULL值都将不会被包含在索引中，复合索引中只要有一列含有NULL值，那么这一列对于此复合索引就是无效的。所以我们在数据库设计时不要让字段的默认值为NULL
   - 条件中有or: 要想使用or，又想让索引生效，只能将or条件中的每个列都加上索引
   - like查询是以%开头
   - 存在索引列的数据类型隐形转换: 如列类型是字符串，那一定要在条件中将数据使用引号引用起来,否则不使用索引
   - where 子句里对索引列上有数学运算，用不上索引
   - where 子句里对有索引列使用函数
   - 数据量极少: 如果mysql估计使用全表扫描要比使用索引快
   - Join的字段类型不相同: 如果你要把DECIMAL字段和一个INT字段Join在一起，MySQL就无法使用它们的索引。
4. 不推荐使用索引
   - 数据唯一性差（一个字段的取值只有几种时）的字段不要使用索引
   - 频繁更新的字段不要使用索引
   - 字段不在where语句出现时不要添加索引,如果where后含IS NULL /IS NOT NULL/ like ‘%输入符%’等条件，不建议使用索引
   - where 子句里对索引列使用不等于（<>），使用索引效果一般

#### 1.1.2 慢查询优化

通过记录慢查询日志，找到查询慢的sql进行优化(增加索引等) 

```mysql
-- 慢查询报表生成工具
pt-query-digest slow-log > text.log
-- 索引维护工具
pt-duplicate-key-checker  -u root -p '123456'
-- 查询不使用的索引
pt-index-usage -uroot -p '123456' mysql-slow.log
```

#### 1.1.3 语句优化

- 避免 SELECT *，(1)，读出越多的数据，那么查询就会变得越慢。(2)，加网络传输的负载
- 不使用ORDER BY RAND()，MySQL会去执行RAND()函数（很耗CPU时间），而且这是为了每一行记录去记行，然后再对其排序
- 使用ENUM而不是VARCHAR： ENUM保存的是TINYINT，但其外表上显示为字符串。这样一来，用这个字段来做一些选项列表变得相当的完美。如果你有一个字段，比如“性别”，“国家”，“民族”，“状态”或“部门”，你知道这些字段的取值是有限而且固定的，那么，你应该使用ENUM而不是VARCHAR
- 拆分大的DELETE或INSERT语句： DELETE和INSERT会进行锁表，如果生产环境操作的话，可能会造成服务无法使用的情况。建议使用limit 1000循环删除数据，删除的时候也sleep一下。
- 当只需要一条数据时使用**LIMIT 1**：这样MySQL数据库引擎会在找到一条数据后停止搜索，而不是继续往后查少下一条符合记录的数据

#### 1.1.5 **EXPLAIN**

explain不会考虑的情况: 触发器、存储过程的信息或用户自定义函数对查询的影响情况、各种Cache、显示MySQL在执行查询时所作的优化工作、部分统计信息是估算的，并非精确值、只能解释SELECT操作，其他操作要重写为SELECT后查看执行计划

```mysql
-- mysql执行计划
mysql> explain select * from servers;
+----+-------------+---------+------+---------------+------+---------+------+------+-------+
| id | select_type | table   | type | possible_keys | key  | key_len | ref  | rows | Extra |
+----+-------------+---------+------+---------------+------+---------+------+------+-------+
|  1 | SIMPLE      | servers | ALL  | NULL          | NULL | NULL    | NULL |    1 | NULL  |
+----+-------------+---------+------+---------------+------+---------+------+------+-------+
1 row in set (0.03 sec)
```

- id: 执行编号，标识select所属的行。如果在语句中没子查询或关联查询，只有唯一的select，每行都将显示1。否则，内层的select语句一般会顺序编号，对应于其在原始语句中的位置

- select_type: 显示本行是简单或复杂select。

  | 查询类型             | 描述                                                       |
  | -------------------- | ---------------------------------------------------------- |
  | SIMPLE               | 简单SELECT,不使用UNION或子查询等                           |
  | PRIMARY              | 查询中若包含任何复杂的子部分,最外层的select被标记为PRIMARY |
  | UNION                | UNION中的第二个或后面的SELECT语句                          |
  | DEPENDENT UNION      | UNION中的第二个或后面的SELECT语句，取决于外面的查询        |
  | UNION RESULT         | UNION的结果                                                |
  | SUBQUERY             | 子查询中的第一个SELECT                                     |
  | DEPENDENT SUBQUERY   | 子查询中的第一个SELECT，取决于外面的查询                   |
  | DERIVED              | 派生表的SELECT, FROM子句的子查询                           |
  | UNCACHEABLE SUBQUERY | 一个子查询的结果不能被缓存，必须重新评估外链接的第一行     |

- table: 显示这一行的数据是关于哪张表的，有时不是真实的表名字,看到的是derivedx(x为数字，应该是第几步的意思)

- type: 数据访问/读取操作类型(**从上到下，性能从差到好**)

  `const`（通过唯一索引或者主键直接定位一条记录）、`eq_ref`（对于前面表中的每一行，在当前表中通过唯一索引查找一行匹配数据）、`ref`（通过普通索引查找数据，可能返回多条匹配记录）、`range`（对索引进行范围查询，如使用`BETWEEN`、`>`、`<`等操作符）、`index`（全索引扫描，遍历整个索引来查找匹配数据）、`ALL`（全表扫描，性能最差，需要遍历整个表来查找数据）

  | 类型          | 描述                                                         |
  | ------------- | ------------------------------------------------------------ |
  | ALL           | Full Table Scan， MySQL将遍历全表以找到匹配的行              |
  | index         | Full Index Scan，index与ALL区别为index类型只遍历索引树       |
  | range         | 只检索给定范围的行，使用一个索引来选择行                     |
  | ref           | 表示上述表的连接匹配条件，即哪些列或常量被用于查找索引列上的值 |
  | eq_ref        | 使用的索引是唯一索引，对于每个索引键值，表中只有一条记录匹配，简单来说，就是多表连接中使用primary key或者 unique key作为关联条件 |
  | const、system | 当MySQL对查询某部分进行优化，并转换为一个常量时，使用这些类型访问。如将主键置于where列表中，MySQL就能将该查询转换为一个常量,system是const类型的特例，当查询的表只有一行的情况下，使用system |
  | NULL          | MySQL在优化过程中分解语句，执行时甚至不用访问表或索引，例如从一个索引列里选取最小值可以通过单独索引查找完成 |

- possible_keys: MySQL能使用哪个索引在表中找到记录，查询涉及到的字段上若存在索引，则该索引将被列出，但不一定被查询使用

- key: 显示mysql决定采用哪个索引来优化查询

- key_len: 表示索引中使用的字节数，可通过该列计算查询中使用的索引的长度（key_len显示的值为索引字段的最大可能长度，并非实际使用长度，即key_len是根据表定义计算而得，不是通过表内检索出的）

- ref: 显示了之前的表在key列记录的索引中查找值所用的列或常量

- rows: 为了找到所需的行而需要读取的行数，估算值，不精确。通过把所有rows列值相乘，可粗略估算整个查询会检查的行数

- Extra: 包含MySQL解决查询的详细信息

  - Using where:列数据是从仅仅使用了索引中的信息而没有读取实际的行动的表返回的，这发生在对表的全部的请求列都是同一个索引的部分的时候，表示mysql服务器将在存储引擎检索行后再进行过滤

  - Using temporary：表示MySQL需要使用临时表来存储结果集，常见于排序和分组查询

  - Using filesort：MySQL中无法利用索引完成的排序操作称为“文件排序”

  - Using join buffer：改值强调了在获取连接条件时没有使用索引，并且需要连接缓冲区来存储中间结果。如果出现了这个值，那应该注意，根据查询的具体情况可能需要添加索引来改进能。

  - Impossible where：这个值强调了where语句会导致没有符合条件的行。

  - Select tables optimized away：这个值意味着仅通过使用索引，优化器可能仅从聚合函数结果中返回一行

### 1.2. 表结构优化

1. 类型选择: 尽量设置小的类型, 数据库90%以上的时间都是在IO上，尽量少的IO读写就会提高数据库性能。时间类型尽量使用TIMESTAMP类型，只需要精确到某一天的数据类型，建议使用DATE(3个字节)类型 。数字类型尽量不要使用DOUBLE(长度问题和精度问题)。字符串类型尽量不要用TEXT类型，建议使用 CHAR 类型，不定长字段尽量使用 VARCHAR。反对在数据库中使用 LOB 类型数据，应该使用其他工具存储大数据。
2. 能增加not null约束的一定要加上：NULL 类型比较特殊，SQL 难优化。虽然 MySQL NULL类型和 Oracle 的NULL 有差异，会进入索引中，但如果是一个组合索引，那么这个NULL 类型的字段会极大影响整个索引的效率。此外，NULL 在索引中的处理也是特殊的，也会占用额外的存放空间
3. 日期类型或者存储ip字段优化：把IP地址存成UNSIGNED INT

### 1.3 服务器优化

1. mysql配置优化
    - **存储引擎**: InnoDB(**支持事务，行锁,支持外键**)，MyISAM(**表级锁、不支持事务和全文索引**)
    - **back_log**:  MySql的连接数据达到max_connections时，新来的请求将会被存在堆栈中，
      以等待某一连接释放资源，该堆栈的数量即back_log，如果等待连接的数量超过back_log，
      将不不被授予连接资源。查看mysql 当前系统默认back_log值，
      命令：show variables like 'back_log’;
    - **wait_timeout**: 可以减少wait的连接数(wait_timeout=1800) show variables like 'wait_timeout';
    - **max_connections**: 最大链接数，show variables like 'max_connections';
    - **thread_concurrency**: 目前默认的8，可以修改为thread_concurrency=64，thread_concurrency应设为CPU核数的2倍，比如有1个双核的CPU，那thread_concurrency 的应该为4，2个双核的cpu thread_concurrency的值应为8。show variables like 'thread_concurrency';
    - **max_connect_errors**: 这个参数负责阻止客户端尝试暴力破解密码，当某台主机错误连接次数达到该值时，该主机无法再尝试登陆。解决方法是重启mysql，或者把该值改大一点
    - **query_cache_type**: query_cache_type=1 开启缓存，显示为ON。大多数的MySQL服务器都开启了查询缓存。利用变量代替函数去执行sql，CURDATE(),NOW(),RAND()这些时间函数都不会开启查询缓存。

2. 硬件优化
   1. 配置较大的内存。足够大的内存,是提高 MYSQL数据库性能的方法之一。内存的速度 比磁盘I/O快得多,可以通过增加系统的缓冲区容量,使数据在内存停留的时间更长,以减少磁盘I/O。
   2. 配置高速磁盘系统,以减少读盘的等待时间,提高响应速度
   3. 合理分布磁盘I/O,把磁盘IO分散在多个设备上,以减少资源竞争,提高并行操作能力
   4. 配置多处理器, MYSQL是多线程的数据库,多处理器可同时执行多个线程。
   5. cpu并不是越多越好,mysql5.5是的服务器不要超过32核,偏向选择单核频率更快的cpu;

## 二、基本操作

```mysql
-- 查看mysql锁表信息
show status like '%lock%';
show OPEN TABLES where In_use > 0;
-- 显示哪些线程正在运行
show processlist;
-- kill线程
kill 16557290;
-- 获取锁表信息
select *  from information_schema.processlist where db = 'tablename';
-- 批量kill线程语句生成
select CONCAT('kill ',ID,';')  from information_schema.processlist where db = 'tablename' and info like '***%';
-- mysql 启动、停止、重启（5.0版本）
service mysqld start
service mysqld stop
service mysqld restart 
-- mysql 启动、停止、重启（5.5.7版本）
service mysql start
service mysql stop
service mysql restart
-- 脚本启动、停止、重启
/etc/inint.d/mysqld start
/etc/inint.d/mysqld stop
/etc/inint.d/mysqld restart
-- 链接
mysql -uroot -p   // 回车输入密码即可
-- 查看表的当前自增ID
select auto_increment from information_schema.tables where table_schema='bsp' and table_name='sys_menu';
-- 修改表的当前自增ID
alter table sys_menu AUTO_INCREMENT=100;
-- 查看表信息
SHOW TABLE STATUS;
-- 慢查询日志分析统计工具
mysqldumpslow   
```

## 三、库操作

```mysql
-- 查看当前数据库
SELECT DATABASE();
-- 显示当前时间、用户名、数据库版本
SELECT now(), user(), version();
-- 创建库
CREATE DATABASE[ IF NOT EXISTS] databasesname 数据库选项
        数据库选项：
        CHARACTER SET charset_name
        COLLATE collation_name
-- 查看当前库信息
    SHOW CREATE DATABASE databasesname
-- 修改库的选项信息
    ALTER DATABASE databasesname 选项信息
-- 修改数据库的编码，可使用上一条语句查看是否修改成功
alter database databasesname default character set gbk collate gbk_bin;
-- 删除库,同时删除该数据库相关的目录及其目录内容
DROP DATABASE[ IF EXISTS] databasesname
```

## 四、事务

事务的隔离级别: read uncommitted, read committed, repeatable read, serialize.

| 隔离级别 | 脏读 | 不可重复读 | 幻读 |
| -------- | ---- | ---------- | ---- |
| 读未提交 | true | true       | true |
| 读已提交 |      | true       | true |
| 可重复读 |      |            | true |
| 可序列化 |      |            |      |

read uncommitted：可以读未提交的数据。

脏读: 事务A执行了更新语句未提交事务,事务B获取数据的时候将未提交的数据获取了。之后事务A回滚了，那事务B就读到了脏数据

```sql
set session transaction isolation level read uncommitted;
A:start transaction;
A:select * from psn;
B:start transaction;
B:select * from psn;
A:update psn set name='msb';
A:selecet * from psn
-- 读取的结果msb。产生脏读，因为A事务并没有commit，读取到了不存在的数据
B:select * from psn;  
A:commit;
-- 读取的数据是msb,因为A事务已经commit，数据永久的被修改
B:select * from psn; 
```

read committed: 可以读提交后的数据。

不可重复读: 事务A修改数据后未提交，事务B事务开启进行数据查询，事务A提交事务，事务B再次查询则事务B出现了两次读取数据不一致的情况

```sql
set session transaction isolation level read committed;
A:start transaction;
A:select * from psn;
B:start transaction;
B:select * from psn;
-- 执行到此处的时候发现，两个窗口读取的数据是一致的
A:update psn set name ='zhangsan' where id = 1;
A:select * from psn;
B:select * from psn;
-- 执行到此处发现两个窗口读取的数据不一致，B窗口中读取不到更新的数据
A:commit;
-- 读取到更新的数据(事务B第二次select和本次select的值不一致，则不可重复读)
A:select * from psn;
-- 也读取到更新的数据
B:select * from psn;
-- 发现同一个事务中多次读取数据出现不一致的情况
```

repeatable read(msql默认隔离级别): 可以重复读。

幻读:事务B查询数据后，事务A插入数据，之后事务B再次获取数据，导致事务B两次获取数据的情况不一样就像出现了幻觉一样。

```sql
set session transaction isolation level repeatable read;
A:start transaction;
A:select * from psn;
B:start transaction;
B:select * from psn;
-- 此时两个窗口读取的数据是一致的
A:insert into psn values(4,'sisi');
A:commit;
-- 读取到添加的数据
A:select * from psn;
-- 读取不到添加的数据
B:select * from psn;
-- 报错，无法插入数据
B:insert into psn values(4,'sisi');
-- 此时发现读取不到数据，但是在插入的时候不允许插入，出现了幻读，设置更高级别的隔离级别即可解决
```






## 六、建表规范

```
    -- Normal Format, NF
        - 每个表保存一个实体信息
        - 每个具有一个ID字段作为主键
        - ID主键 + 原子表
    -- 1NF, 第一范式
        字段不能再分，就满足第一范式。
    -- 2NF, 第二范式
        满足第一范式的前提下，不能出现部分依赖。
        消除复合主键就可以避免部分依赖。增加单列关键字。
    -- 3NF, 第三范式
        满足第二范式的前提下，不能出现传递依赖。
        某个字段依赖于主键，而有其他字段依赖于该字段。这就是传递依赖。
        将一个实体信息的数据放在一个表内实现。
```

## 七、SQL实战

1. 有个部门表如下，写出不同部门之间平均工资高于2000的部门

   ![https://gaoqisen.github.io/GraphBed/202007/20200701153343.png](https://gaoqisen.github.io/GraphBed/202007/20200701153343.png)

   ```sql
   select type, avg(salary) sa from dept group by type having sa > 2000;
   ```

2. 编写一个 SQL 查询，满足条件：无论 person 是否有地址信息，都需要基于上述两表提供 person 的以下信息：FirstName, LastName, City, State

   ```mysql
   # Person
   +-------------+---------+
   | 列名         | 类型     |
   +-------------+---------+
   | PersonId    | int     |
   | FirstName   | varchar |
   | LastName    | varchar |
   +-------------+---------+
   # PersonId 是上表主键
   # Address
   +-------------+---------+
   | 列名         | 类型    |
   +-------------+---------+
   | AddressId   | int     |
   | PersonId    | int     |
   | City        | varchar |
   | State       | varchar |
   +-------------+---------+
   # AddressId 是上表主键
   # sql
   select Person.FirstName, Person.LastName, Address.City, Address.State from Person left join Address on Person.PersonId = Address.PersonId
   ```

   ## 八、锁
   
   ### 8.1 悲观锁
   
   认为别的线程会修改值。在操作数据的时候，直接给数据加锁不让其他的线程修改，当前线程修改成功之后其他线程才可以修改。实现方式就是加锁(如: Java的synchronized)。
   
   ### 8.2 乐观锁
   
   认为别的线程不会修改值。在操作数据的时候不对数据上锁，执行操作的时候判断一下数据是否被修改，如果被修改就放弃操作。实现方式有两种，CAS和版本号机制。
   
   - CAS(Compare And Swap)
   
     在修改的时候判断查出来的数据是否被修改过，如果没有则进行修改，如果被修改了可以进行自旋操作。这种情况有可能出现ABA问题(多线程的时候如果当前线程为A,线程B把num加1，线程C把num减1期间线程A查询出数据还未进行操作，当BC线程执行完成之后A线程在此执行的时候就会认为数据没有修改，但是实际上数据被修改过)，用版本号机制就不会出现这个问题。
   
     ```sql
     # 查询产品数量和ID
     select num,id from product;
     # subNum为查出来的num-1, id和num都为查出来的数据。
     update product set num = #{subNum} where id = #{id} and num = #{num}
     ```
   
     当竞争不激烈 (出现并发冲突的概率小)时，乐观锁更有优势，因为悲观锁会锁住代码块或数据，其他线程无法同时访问，影响并发，而且加锁和释放锁都需要消耗额外的资源。
   
   - 版本号机制
   
     在字段中增加一个版本号用来判断当前数据是否被修改过
   
     ```sql
     # 查询产品数量、ID和版本号
     select num,id,version from product;
     # 通过版本号判断数据是否被修改,subNum是通过计算过后的库存数量, id和version都为查出来的数据
     update product set num = #{subNum}, version = version + 1 where id = #{id} and version = #{version}
     ```
   
     当竞争激烈(出现并发冲突的概率大)时，悲观锁更有优势，因为乐观锁在执行更新时频繁失败，需要不断重试，浪费CPU资源。
   
   ## 九、参考
   
   - 索引: https://blog.csdn.net/kaka1121/article/details/53395587
   - explain: https://www.cnblogs.com/xuanzhi201111/p/4175635.html
   - 锁: https://www.cnblogs.com/kismetv/p/10787228.html#t1