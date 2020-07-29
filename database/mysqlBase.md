---
title: mysql －学习笔记
date: 2019-11-05 13:10:11
tags: mysql
categories: database
keywords: mysql study
description: mysql的一些笔记
---

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

b

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

  | SIMPLE               | 简单SELECT,不使用UNION或子查询等                           |
  | -------------------- | ---------------------------------------------------------- |
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

  | ALL           | Full Table Scan， MySQL将遍历全表以找到匹配的行              |
  | ------------- | ------------------------------------------------------------ |
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
-- 删除库
    DROP DATABASE[ IF EXISTS] databasesname // 同时删除该数据库相关的目录及其目录内容
```

## 四、数据类型(列类型)


### 4.1数值类型

- 整型

    | 类型      |   字节   |  范围（有符号位）|
    | --- | --- | --- |
    |  tinyint    |  1字节 |    -128 ~ 127      无符号位：0 ~ 255|
    |  smallint    | 2字节  |   -32768 ~ 32767|
    |  mediumint |   3字节|     -8388608 ~ 8388607|
    |  int       |   4字节| |
    |  bigint |      8字节| |
    |  int(M)|   M表示总位数| |
    
    * 默认存在符号位，unsigned 属性修改
    * 显示宽度，如果某个数不够定义字段时设置的位数，则前面以0补填，zerofill 属性修改
        例：int(5)   插入一个数'123'，补填后为'00123'
    * 在满足要求的情况下，越小越好。
    * 1表示bool值真，0表示bool值假。MySQL没有布尔类型，通过整型0和1表示。常用tinyint(1)表示布尔型。
    
- 浮点型  

    |类型      |       字节 |    范围|
    | --- | --- | --- |
    |float(单精度)|     4字节||
    | double(双精度)   | 8字节||
   
    * 浮点型既支持符号位 unsigned 属性，也支持显示宽度 zerofill 属性。
        不同于整型，前后均会补填0.
    * 定义浮点型时，需指定总位数和小数位数。
        float(M, D)     double(M, D)
        M表示总位数，D表示小数位数。
        M和D的大小会决定浮点数的范围。不同于整型的固定范围。
        M既表示总位数（不包括小数点和正负号），也表示显示宽度（所有显示符号均包括）。
        支持科学计数法表示。
        浮点数表示近似值。
- 定点数
    * decimal -- 可变长度
    * decimal(M, D)   M也表示总位数，D表示小数位数。
    * 保存一个精确的数值，不会发生数据的改变，不同于浮点数的四舍五入。
    * 将浮点数转换为字符串来保存，每9位数字保存为4个字节。
    
### 4.2字符串类型
-  char, varchar ----------
    * char(M)    定长字符串，速度快，但浪费空间
    * varchar(M) 变长字符串，速度慢，但节省空间
    * M表示能存储的最大长度，此长度是字符数，非字节数。
    * 不同的编码，所占用的空间不同。
        - char,最多255个字符，与编码无关。
        - varchar,最多65535字符，与编码有关。
    * 一条有效记录最大不能超过65535个字节。
        - utf8 最大为21844个字符，gbk 最大为32766个字符，latin1 最大为65532个字符
        - varchar 是变长的，需要利用存储空间保存 varchar 的长度，如果数据小于255个字节，则采用一个字节来保存长度，反之需要两个字节来保存。
        - varchar 的最大有效长度由最大行大小和使用的字符集确定。
        - 最大有效长度是65532字节，因为在varchar存字符串时，第一个字节是空的，不存在任何数据，然后还需两个字节来存放字符串的长度，所以有效长度是64432-1-2=65532字节。
        - 例：若一个表定义为 CREATE TABLE tb(c1 int, c2 char(30), c3 varchar(N)) charset=utf8; 问N的最大值是多少？ 答：(65535-1-2-4-30*3)/3
-  blob, text ----------
    * blob 二进制字符串（字节字符串）
        tinyblob, blob, mediumblob, longblob
    * text 非二进制字符串（字符字符串）
        tinytext, text, mediumtext, longtext
    * text 在定义时，不需要定义长度，也不会计算总长度。
    * text 类型在定义时，不可给default值
- binary, varbinary ----------
    * 类似于char和varchar，用于保存二进制字符串，也就是保存字节字符串而非字符字符串。
    * char, varchar, text 对应 binary, varbinary, blob.
    
### 4.3日期时间类型

|类型|字节数|名词|范围|
| --- | --- | --- | --- |
|  datetime |   8字节   | 日期及时间   |  1000-01-01 00:00:00 到 9999-12-31 23:59:59|
|    date     |   3字节    |日期      |   1000-01-01 到 9999-12-31|
|    timestamp  | 4字节  |  时间戳   |     19700101000000 到 2038-01-19 03:14:07|
|  time    |    3字节   | 时间 |        -838:59:59 到 838:59:59|
|   year   |     1字节 |   年份    |     1901 - 2155|

- datetime    
    * YYYY-MM-DD hh:mm:ss
- timestamp   
    * YY-MM-DD hh:mm:ss
    * YYYYMMDDhhmmss
    * YYMMDDhhmmss
    * YYYYMMDDhhmmss
    * YYMMDDhhmmss
- date       
    * YYYY-MM-DD
    * YY-MM-DD
    * YYYYMMDD
    * YYMMDD
    * YYYYMMDD
    * YYMMDD
- time        
    * hh:mm:ss
    * hhmmss
    * hhmmss
- year     
    * YYYY
    * YY
    * YYYY
    * YY
    
### 4.4枚举和集合

- 枚举: enum(val1, val2, val3...)
    * 在已知的值中进行单选。最大数量为65535.
    * 枚举值在保存时，以2个字节的整型(smallint)保存。每个枚举值，按保存的位置顺序，从1开始逐一递增。
    * 表现为字符串类型，存储却是整型。
    * NULL值的索引是NULL。
    * 空字符串错误值的索引值是0。
    
- 集合: set(val1, val2, val3...)
    * create table tab ( gender set('男', '女', '无') );
    * insert into tab values ('男, 女');
    * 最多可以有64个不同的成员。以bigint存储，共8个字节。采取位运算的形式。
    * 当创建表时，SET成员值的尾部空格将自动被删除。


## 五、列属性(列约束)

1. PRIMARY 主键
    - 能唯一标识记录的字段，可以作为主键。
    - 一个表只能有一个主键。
    - 主键具有唯一性。
    - 声明字段时，用 primary key 标识。
        也可以在字段列表之后声明
            例：create table tab ( id int, stu varchar(10), primary key (id));
    - 主键字段的值不能为null。
    - 主键可以由多个字段共同组成。此时需要在字段列表后声明的方法。
        例：create table tab ( id int, stu varchar(10), age int, primary key (stu, age));
2. UNIQUE 唯一索引（唯一约束）
    - 使得某字段的值也不能重复。
3. NULL 约束
   - null不是数据类型，是列的一个属性。
   - 表示当前列是否可以为null，表示什么都没有。
   - null, 允许为空。默认。
   -  not null, 不允许为空。
   -  insert into tab values (null, 'val'); //此时表示将第一个字段的值设为null, 取决于该字段是否允许为null
1. DEFAULT 默认值属性
    - 当前字段的默认值。
    - insert into tab values (default, 'val');    -- 此时表示强制使用默认值。
    - create table tab ( add_time timestamp default current_timestamp );//表示将当前时间的时间戳设为默认值。current_date, current_time
2. AUTO_INCREMENT 自动增长约束
    - 自动增长必须为索引（主键或unique）
    - 只能存在一个字段为自动增长。
    - 默认为1开始自动增长。可以通过表属性 auto_increment = x进行设置，或 alter table tbl auto_increment = x;
3. COMMENT 注释
    - 例：create table tab ( id int ) comment '注释内容';
4. FOREIGN KEY 外键约束
    - 用于限制主表与从表数据完整性。
    - alter table t1 add constraint `t1_t2_fk` foreign key (t1_id) references t2(id);
        * 将表t1的t1_id外键关联到表t2的id字段。
        * 每个外键都有一个名字，可以通过 constraint 指定
    - 存在外键的表，称之为从表（子表），外键指向的表，称之为主表（父表）。
    - 作用：保持数据一致性，完整性，主要目的是控制存储在外键表（从表）中的数据。
    - MySQL中，可以对InnoDB引擎使用外键约束,语法：
        * foreign key (外键字段） references 主表名 (关联字段) [主表记录删除时的动作] [主表记录更新时的动作]
        * 此时需要检测一个从表的外键需要约束为主表的已存在的值。外键在没有关联的情况下，可以设置为null.前提是该外键列，没有not null。
        * 可以不指定主表记录更改或更新时的动作，那么此时主表的操作被拒绝。
        * 如果指定了 on update 或 on delete：在删除或更新时，有如下几个操作可以选择：
            1. cascade，级联操作。主表数据被更新（主键值更新），从表也被更新（外键值更新）。主表记录被删除，从表相关记录也被删除。
            2. set null，设置为null。主表数据被更新（主键值更新），从表的外键被设置为null。主表记录被删除，从表相关记录外键被设置成null。但注意，要求该外键列，没有not null属性约束。
            3. restrict，拒绝父表删除和更新。
        * 外键只被InnoDB存储引擎所支持。其他引擎是不支持的。


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
     update product set num = #{subNum} where id = #{id} and version = #{version}
     ```
   
     当竞争激烈(出现并发冲突的概率大)时，悲观锁更有优势，因为乐观锁在执行更新时频繁失败，需要不断重试，浪费CPU资源。
   
   ## 九、参考
   
   - 索引: https://blog.csdn.net/kaka1121/article/details/53395587
   - explain: https://www.cnblogs.com/xuanzhi201111/p/4175635.html
   - 锁: https://www.cnblogs.com/kismetv/p/10787228.html#t1