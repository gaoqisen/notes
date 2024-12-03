---
title: Mysql －学习笔记
date: 2024-11-28 22:10:11
tags: mysq
categories: database
keywords: database
description: Mysql的一些学习笔记
---



## 一、Mysql的 AKF 立方体

用 AKF 理解下 mysql为了确保数据库的高可用性在处理海量数据的时是如何实现的

![image-20241123234031462](/Users/gaoqisen/Library/Application Support/typora-user-images/image-20241123234031462.png)

X 轴：为了解决单点故障，mysql 可以用 **主从复制** 等方式进行副本扩展，这样在其中一台机器出现故障时。其他的机器也能正常提供服务

Y 轴：可以理解为数据的垂直拆分，比如当数据量太大的时候，单表的数据列太多，可以将表拆分为多张表。也可以将数据进行 **分库** 比如用户库、订单库等，这样可以避免单点故障用户库出现问题后订单库还是能提供服务的。

Z轴: 可以理解为数据的水平拆分，比如用户库里面的用户数据太多，单表查询很慢可以进行用户 ID 的取模 **分表** 操作，这种分表操作就是分区的效果（100 w的数据模 10，就是将数据分为 10 份每份 10w 的数据分区）。

上面每个轴的具体实现方式各有不同，关键点就是副本的扩展和分库分表。副本的扩展要考虑副本之间的数据如何同步，扩展的时候出现单点故障如何恢复等问题，下面先了解下副本扩展的各种架构演进

### 1.2 高可用

常见的高可用架构方案，每种架构都是遇到问题后慢慢演进出来的，下面通过时间和版本梳理下。

| 架构方式                                                     | 年份       | 版本    | 解决问题                                           |
| :----------------------------------------------------------- | ---------- | ------- | -------------------------------------------------- |
| 主从复制架构（Master - Slave Replication）                   | 1999       | 3.23   | 官方提供的防止数据丢失、读写分离                             |
| 双主复制架构（Dual - Master Replication）                    | 2005          |5.0      | 官方提供的双向数据同步，异地容灾                             |
| 主主复制管理 MMM(Master-Master replication manager) | 2007～2008 | 5.0+ | Open Query公司开发的简化主主复制故障切换、提高可用性                   |
| 集群高可用 MHA<br />（MySQL Master High Availability）       | 2010～2011 | 5.1+    | Yahoo公司开发的减少切换主从速度、自动修复复制关系                 |
| 半同步（半同步Semisynchronous replication）                       |   2010       |     5.5+    |   官方数据一致性要求高                                 |
| ProxySql + 主从复制                                          |      2013      |    5.6+     |     ProxySQL开源社区提供的通过中间件实现读写分离和负载均衡                       |
| 分片 + 高可用                                                |      2013      |     5.6+    |     Google、Facebook等海量数据存储+超大规模系统                                               |
| Mysql组复制 MGR（MySQL Group Replication）                   | 2016       | 5.7.17+    | 官方实现Paxos 保证数据一致性、高可用和自动故障处理 |
| InnoDB Cluster                                               |   2016         |  8.0+      | 官方一站式高可用方案                                                   |

各种架构的优缺点分析

| 架构方式        | 优点 | 缺点 | 原理 |
| :-------------- | ---- | ---- | ---- |
| 主从复制架构MSR |  简单易用，提供读写分离    | 单点故障风险高     |  主节点写入binlog日志，从节点同步数据    |
| 双主复制架构 | 双主互相备份，实现高可用（不建议使用） | 写入冲突更新丢失，切换复杂 | 两个主节点互相写入数据，互相复制对方的变更     |
| 主主复制管理MMM |  主主复制，避免单点故障  | 部署维护复杂 |  通过监视复制延迟实现自动故障切换    |
| 集群高可用 MHA |   主从自动化故障切换，快速故障恢复   |   部署和配置复杂   |   监控主节点状态和健康实现自动故障切换   |
| 半同步   |   提供更高的数据一致性和可靠性   |  对网络延迟敏感    |   写入数据需要执至少一个从节点收到数据后提交事务   |
| ProxySql + 主从复制  |  提供负载均衡和故障转移    |   需要额外的中间件，增加复杂性   |   代理层进行路由监控节点状态实现故障转移   |
| 分片 + 高可用   |   实现水平扩展，适用大规模数据   | 部署和管理复杂     |  数据进行水平分片后+MHA    |
| Mysql组复制MGR  |   提供高可用+数据一致性，支持自动故障转移   | 部署管理复杂     |  多个数据库节点形成组，通过组复制协议实现同步和故障处理    |
| InnoDB Cluster  |  集成高可用和灾难恢复方案，支持自动化管理和监控    |  需要MysqlRouter，引入额外组件    |  使用Mysql Shell+Group Replication组件实现自动故障转移、数据同步和管理，基于binlog和组复制协议实现高可用    |

主从复制

![image](https://gaoqisen.github.io/GraphBed/202411/20241127225955.png)

MMM

![MMM](https://gaoqisen.github.io/GraphBed/202411/20241127232754.png)

MHA

![MHA](https://gaoqisen.github.io/GraphBed/202411/20241127232950.png)

半同步

![半同步](https://gaoqisen.github.io/GraphBed/202411/20241127233636.png)

MHA+半同步

![](https://gaoqisen.github.io/GraphBed/202411/20241127234122.png)

MGR

![MGR](https://gaoqisen.github.io/GraphBed/202411/20241127234718.png)

InnoDB Cluster

![](https://gaoqisen.github.io/GraphBed/202411/20241127235148.png)

### 1.2 分库分表

在数据量特别大的时候，单个数据库承载的压力有限。这时候就会考虑分库，用户库、订单库等，每个库拆分开单独处理。在拆分开之后单表数据量还是太大，查询速度会下降。这时候就需要将数据进行分片，比如将数据分为 128 张表，通过用户 id 进行取模运算。常见的分库分表有 Mycat、ShardingSphere ，他们的原理是通过分片策略进行表路由查询，但是分表之后有一些 sql 语句就没办法执行。当然通过hive 等大数据方案可以将数据聚合在一起，这样就可以执行分表后没办法执行的 sql。  

## 二、InnoDB三大特性

![mysql 架构图](https://gaoqisen.github.io/GraphBed/202412/20241203215851.png)

![mysql 数据格式](https://gaoqisen.github.io/GraphBed/202412/20241203220135.png)

2.1 Buffer Pool（缓冲池）

缓冲池是 innodb 的一个内存区域，可以理解为是磁盘数据里面的数据中转站。举个例子比如磁盘是 50G, 内存 8G，在查询数据时如果没有索引就会进行全表扫描，那么在扫描的时候不能把磁盘里面的数据全部加载到内存中，缓存池的好处

1、Buffer Pool就能加载一部分的数据到内存进行查找，查找完成后替换下一批数据。缓存的数据如果是高频查询数据那么下次查询的时候就可以不用切换到内核态去加载磁盘里面的数据

2、在增删改的时候是有事务的，如果每次都是将数据写入磁盘进行内核态的切换，那么这样效率就不高。这个时候有了Buffer Pool就可以在里面进行更新操作之后就响应完成事务，但是此时 buffer pool 里面的数据称为脏页（没有刷新到磁盘的数据）然后 Mysql 通过各种机制将数据同步到磁盘就可以了。

上面的第二点如果不及时同步，数据库断电内存里面的数据就会消失，就会造成数据不一致。这个时候就会有 redo log 来解决断电的问题。

### 2.2 Double write Buffer(双写缓冲区)

双写缓冲区的作用主要是解决在 buffer pool 往磁盘写数据的时候，由于是随机写一页的数据可能有部分写成功了，部分没有写成功。这个时候有了 Double write Buffer 就可以在重启服务的时候通过 Double write Buffer 恢复数据。具体做法如下：

1、在 Buffer Pool往磁盘写的时候先将数据写入磁盘的 Double write Buffer 里面。由于是顺序写入，效率高

2、在 Double write Buffer 写完之后，在讲数据随机写入磁盘。此时如果写完则清空Double write Buffer。

3、如果出现断电未写完数据，在重启时通过 Double write Bufer 会重新将数据写入磁盘，确保不丢数据

### 2.3 Adaptive Hash Index(自适应哈希)

在 innodb 中是没有哈希数据结构的，但是如果出现很多高频相同的查询，这个时候 mysql 就会根据查询次数、系统负载情况、实际的查询模式等进行自动优化。将相同的查询自适应为 哈希，这样就能提高查询效率，降低系统开销。如果在系统负载高，sql 语句相同查询低则会删除自适应哈希。目前没有可修改的参数，是 mysql 自己进行的自适应优化。

## 三、Mysql 语句执行过程

### 2.1 查询语句

```
1、判断是否存在缓存，高版本已废弃
2、语法解析器
3、sql 优化器
4、判断 buffer 里面是否存在数据
5、不存在数据则从磁盘加载数据
6、判断是否有索引，没有索引则全表扫描
7、有索引则看是否有覆盖索引，有则通过索引查询数据后返回
8、没有则通过索引查询到主键后进行回表操作
```

### 2.2 增删改语句

```
1、从连接池里面复用线程
2、sql 接口进行 sql 的格式检查和预处理
3、语法解析器将 sql 解析未解析树
4、通过解析树进行 sql 优化，找到合适的索引，部分 sql 语法优化等
5、执行器进行具体的执行
 - 记录修改前的数据到 undo.log，用户事务回滚操作
 - 更新数据到 buffer pool，数据不会立即刷新到磁盘
 - 记录数据到 redo.log用户数据库崩溃恢复数据
 - 记录 binlog数据，用于同步数据等操作
6、响应数据操作
7、异步线程进行数据同步，将buffer pool 里面的数据同步到磁盘
 - 先将 buffer pool 同步到 double write buffer。防止随机写中断
 - 将 double write buffer 的数据写入磁盘后清空 double write buffer。
 
```

## 四、事务

存在事务就会有事务的四个特征 ACID，如下：

Atomicity(原子性)：要么全部成功，要么全部失败

Consistency(一致性)：事务执行的前后，数据都是一致的。比如转账一个多10 元一个少 10 元。

Isolation(隔离性): 一个事务的执行不被另一个事务干扰

Durability(持久性): 一旦事务提交数据就被永久修改，即使数据库崩溃

在多个线程同时修改数据的时候就会有如下几个问题：

| 名词       | 现象                                           |
| :--------- | ---------------------------------------------- |
| 脏读       | 修改数据后未提交，另一个事务读取了提交前的数据 |
| 不可重复读 | 同一个事务里面读取同一个数据，出现不一样的情况 |
| 幻读       | 读取数据时，其他事务插入数据。再次读数据不一致 |

为了解决上面的问题，有两个方法。一个是直接加悲观锁，每次修改时都锁住这种方式性能最不好。另外一个就是乐观锁，利用版本的方式。mysql 的开发者为了提高性能于是设计了 MVCC（多并发版本控制），主要目的是为了解决多并发加锁太重的一个方式。做到读写冲突时，不加锁也不阻塞。

MVCC 最主要的就是利用 undo log 去记录回滚日志，用回滚日志里面的事务 id  加上当前事务读取的信息进行判断。具体 Mysql可见性算法伪代码如下：

```java
// 快照读
private static class ReadView{
    // 当前事务ID
    public int current_trx_id;
    // 正在活跃的事务id（未提交的事务）
    public List<Integer> alive_list;
    // 最小事务id
    public int low_limit_id;
    // 目前已出现的事务ID的最大值 + 1
    public int up_limit_id;
}

private static class UndoLog{
    // 当前指针
    public String roll_ptr;
    // 隐含的自增ID
    public int db_row_id;
    // 事务ID
    public int trx_id;
    // 回滚指针
    public UndoLog db_roll_ptr;
}

// 快照读
private static UndoLog readData(UndoLog chain, ReadView readView) {
    UndoLog current = chain;
    while (true) {
        if(visibility(chain, readView)) {
            return current;
        }
        current = chain.db_roll_ptr;
    }
}

private static boolean visibility(UndoLog undoLog, ReadView readView) {
    // 事务已提交或当前事务 可见
    if(undoLog.trx_id < readView.low_limit_id || undoLog.trx_id == readView.current_trx_id) {
        return true;
    }
    // 当前事务在活跃事务后查询 不可见
    if(readView.current_trx_id > undoLog.trx_id) {
        return false;
    }
    // 活跃事务id里面包含当前事务不可见
    return !readView.alive_list.contains(undoLog.trx_id);
}

```

这样 mysql 就用了事务的隔离级别解决了多线程并发读写冲突的问题。

## 五、查询语句优化

索引

索引失效

执行计划

成本计算

