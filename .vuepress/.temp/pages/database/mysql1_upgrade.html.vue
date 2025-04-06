<template><div><h2 id="一、mysql的-akf-立方体" tabindex="-1"><a class="header-anchor" href="#一、mysql的-akf-立方体" aria-hidden="true">#</a> 一、Mysql的 AKF 立方体</h2>
<p>用 AKF 理解下 mysql为了确保数据库的高可用性在处理海量数据的时是如何实现的</p>
<p><img src="https://gaoqisen.github.io/GraphBed/202412/20241123234031462.png" alt="image-20241123234031462"></p>
<p>X 轴：为了解决单点故障，mysql 可以用 <strong>主从复制</strong> 等方式进行副本扩展，这样在其中一台机器出现故障时。其他的机器也能正常提供服务</p>
<p>Y 轴：可以理解为数据的垂直拆分，比如当数据量太大的时候，单表的数据列太多，可以将表拆分为多张表。也可以将数据进行 <strong>分库</strong> 比如用户库、订单库等，这样可以避免单点故障用户库出现问题后订单库还是能提供服务的。</p>
<p>Z轴: 可以理解为数据的水平拆分，比如用户库里面的用户数据太多，单表查询很慢可以进行用户 ID 的取模 <strong>分表</strong> 操作，这种分表操作就是分区的效果（100 w的数据模 10，就是将数据分为 10 份每份 10w 的数据分区）。</p>
<p>上面每个轴的具体实现方式各有不同，关键点就是副本的扩展和分库分表。副本的扩展要考虑副本之间的数据如何同步，扩展的时候出现单点故障如何恢复等问题，下面先了解下副本扩展的各种架构演进</p>
<h3 id="_1-2-高可用" tabindex="-1"><a class="header-anchor" href="#_1-2-高可用" aria-hidden="true">#</a> 1.2 高可用</h3>
<p>常见的高可用架构方案，每种架构都是遇到问题后慢慢演进出来的，下面通过时间和版本梳理下。</p>
<table>
<thead>
<tr>
<th style="text-align:left">架构方式</th>
<th>年份</th>
<th>版本</th>
<th>解决问题</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">主从复制架构（Master - Slave Replication）</td>
<td>1999</td>
<td>3.23</td>
<td>官方提供的防止数据丢失、读写分离</td>
</tr>
<tr>
<td style="text-align:left">双主复制架构（Dual - Master Replication）</td>
<td>2005</td>
<td>5.0</td>
<td>官方提供的双向数据同步，异地容灾</td>
</tr>
<tr>
<td style="text-align:left">主主复制管理 MMM(Master-Master replication manager)</td>
<td>2007～2008</td>
<td>5.0+</td>
<td>Open Query公司开发的简化主主复制故障切换、提高可用性</td>
</tr>
<tr>
<td style="text-align:left">集群高可用 MHA<br />（MySQL Master High Availability）</td>
<td>2010～2011</td>
<td>5.1+</td>
<td>Yahoo公司开发的减少切换主从速度、自动修复复制关系</td>
</tr>
<tr>
<td style="text-align:left">半同步（半同步Semisynchronous replication）</td>
<td>2010</td>
<td>5.5+</td>
<td>官方数据一致性要求高</td>
</tr>
<tr>
<td style="text-align:left">ProxySql + 主从复制</td>
<td>2013</td>
<td>5.6+</td>
<td>ProxySQL开源社区提供的通过中间件实现读写分离和负载均衡</td>
</tr>
<tr>
<td style="text-align:left">分片 + 高可用</td>
<td>2013</td>
<td>5.6+</td>
<td>Google、Facebook等海量数据存储+超大规模系统</td>
</tr>
<tr>
<td style="text-align:left">Mysql组复制 MGR（MySQL Group Replication）</td>
<td>2016</td>
<td>5.7.17+</td>
<td>官方实现Paxos 保证数据一致性、高可用和自动故障处理</td>
</tr>
<tr>
<td style="text-align:left">InnoDB Cluster</td>
<td>2016</td>
<td>8.0+</td>
<td>官方一站式高可用方案</td>
</tr>
</tbody>
</table>
<p>各种架构的优缺点分析</p>
<table>
<thead>
<tr>
<th style="text-align:left">架构方式</th>
<th>优点</th>
<th>缺点</th>
<th>原理</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">主从复制架构MSR</td>
<td>简单易用，提供读写分离</td>
<td>单点故障风险高</td>
<td>主节点写入binlog日志，从节点同步数据</td>
</tr>
<tr>
<td style="text-align:left">双主复制架构</td>
<td>双主互相备份，实现高可用（不建议使用）</td>
<td>写入冲突更新丢失，切换复杂</td>
<td>两个主节点互相写入数据，互相复制对方的变更</td>
</tr>
<tr>
<td style="text-align:left">主主复制管理MMM</td>
<td>主主复制，避免单点故障</td>
<td>部署维护复杂</td>
<td>通过监视复制延迟实现自动故障切换</td>
</tr>
<tr>
<td style="text-align:left">集群高可用 MHA</td>
<td>主从自动化故障切换，快速故障恢复</td>
<td>部署和配置复杂</td>
<td>监控主节点状态和健康实现自动故障切换</td>
</tr>
<tr>
<td style="text-align:left">半同步</td>
<td>提供更高的数据一致性和可靠性</td>
<td>对网络延迟敏感</td>
<td>写入数据需要执至少一个从节点收到数据后提交事务</td>
</tr>
<tr>
<td style="text-align:left">ProxySql + 主从复制</td>
<td>提供负载均衡和故障转移</td>
<td>需要额外的中间件，增加复杂性</td>
<td>代理层进行路由监控节点状态实现故障转移</td>
</tr>
<tr>
<td style="text-align:left">分片 + 高可用</td>
<td>实现水平扩展，适用大规模数据</td>
<td>部署和管理复杂</td>
<td>数据进行水平分片后+MHA</td>
</tr>
<tr>
<td style="text-align:left">Mysql组复制MGR</td>
<td>提供高可用+数据一致性，支持自动故障转移</td>
<td>部署管理复杂</td>
<td>多个数据库节点形成组，通过组复制协议实现同步和故障处理</td>
</tr>
<tr>
<td style="text-align:left">InnoDB Cluster</td>
<td>集成高可用和灾难恢复方案，支持自动化管理和监控</td>
<td>需要MysqlRouter，引入额外组件</td>
<td>使用Mysql Shell+Group Replication组件实现自动故障转移、数据同步和管理，基于binlog和组复制协议实现高可用</td>
</tr>
</tbody>
</table>
<p>主从复制</p>
<p><img src="https://gaoqisen.github.io/GraphBed/202411/20241127225955.png" alt="image"></p>
<p>MMM</p>
<p><img src="https://gaoqisen.github.io/GraphBed/202411/20241127232754.png" alt="MMM"></p>
<p>MHA</p>
<p><img src="https://gaoqisen.github.io/GraphBed/202411/20241127232950.png" alt="MHA"></p>
<p>半同步</p>
<p><img src="https://gaoqisen.github.io/GraphBed/202411/20241127233636.png" alt="半同步"></p>
<p>MHA+半同步</p>
<p><img src="https://gaoqisen.github.io/GraphBed/202411/20241127234122.png" alt=""></p>
<p>MGR</p>
<p><img src="https://gaoqisen.github.io/GraphBed/202411/20241127234718.png" alt="MGR"></p>
<p>InnoDB Cluster</p>
<p><img src="https://gaoqisen.github.io/GraphBed/202411/20241127235148.png" alt=""></p>
<h3 id="_1-2-分库分表" tabindex="-1"><a class="header-anchor" href="#_1-2-分库分表" aria-hidden="true">#</a> 1.2 分库分表</h3>
<p>在数据量特别大的时候，单个数据库承载的压力有限。这时候就会考虑分库，用户库、订单库等，每个库拆分开单独处理。在拆分开之后单表数据量还是太大，查询速度会下降。这时候就需要将数据进行分片，比如将数据分为 128 张表，通过用户 id 进行取模运算。常见的分库分表有 Mycat、ShardingSphere ，他们的原理是通过分片策略进行表路由查询，但是分表之后有一些 sql 语句就没办法执行。当然通过hive 等大数据方案可以将数据聚合在一起，这样就可以执行分表后没办法执行的 sql。</p>
<h2 id="二、innodb三大特性" tabindex="-1"><a class="header-anchor" href="#二、innodb三大特性" aria-hidden="true">#</a> 二、InnoDB三大特性</h2>
<p><img src="https://gaoqisen.github.io/GraphBed/202412/20241203215851.png" alt="mysql 架构图"></p>
<p><img src="https://gaoqisen.github.io/GraphBed/202412/20241203220135.png" alt="mysql 数据格式"></p>
<h3 id="_2-1-缓冲池" tabindex="-1"><a class="header-anchor" href="#_2-1-缓冲池" aria-hidden="true">#</a> 2.1 缓冲池</h3>
<p>Buffer Pool缓冲池是 innodb 的一个内存区域，可以理解为是磁盘数据里面的数据中转站。举个例子比如磁盘是 50G, 内存 8G，在查询数据时如果没有索引就会进行全表扫描，那么在扫描的时候不能把磁盘里面的数据全部加载到内存中，缓存池的好处</p>
<p>1、Buffer Pool就能加载一部分的数据到内存进行查找，查找完成后替换下一批数据。缓存的数据如果是高频查询数据那么下次查询的时候就可以不用切换到内核态去加载磁盘里面的数据</p>
<p>2、在增删改的时候是有事务的，如果每次都是将数据写入磁盘进行内核态的切换，那么这样效率就不高。这个时候有了Buffer Pool就可以在里面进行更新操作之后就响应完成事务，但是此时 buffer pool 里面的数据称为脏页（没有刷新到磁盘的数据）然后 Mysql 通过各种机制将数据同步到磁盘就可以了。</p>
<p>上面的第二点如果不及时同步，数据库断电内存里面的数据就会消失，就会造成数据不一致。这个时候就会有 redo log 来解决断电的问题。</p>
<h3 id="_2-2-双写缓冲区" tabindex="-1"><a class="header-anchor" href="#_2-2-双写缓冲区" aria-hidden="true">#</a> 2.2 双写缓冲区</h3>
<p>Double write Buffer：双写缓冲区的作用主要是解决在 buffer pool 往磁盘写数据的时候，由于是随机写一页的数据可能有部分写成功了，部分没有写成功。这个时候有了 Double write Buffer 就可以在重启服务的时候通过 Double write Buffer 恢复数据。具体做法如下：</p>
<p>1、在 Buffer Pool往磁盘写的时候先将数据写入磁盘的 Double write Buffer 里面。由于是顺序写入，效率高</p>
<p>2、在 Double write Buffer 写完之后，在讲数据随机写入磁盘。此时如果写完则清空Double write Buffer。</p>
<p>3、如果出现断电未写完数据，在重启时通过 Double write Bufer 会重新将数据写入磁盘，确保不丢数据</p>
<h3 id="_2-3-自适应哈希" tabindex="-1"><a class="header-anchor" href="#_2-3-自适应哈希" aria-hidden="true">#</a> 2.3 自适应哈希</h3>
<p>Adaptive Hash Index： 在 innodb 中是没有哈希数据结构的，但是如果出现很多高频相同的查询，这个时候 mysql 就会根据查询次数、系统负载情况、实际的查询模式等进行自动优化。将相同的查询自适应为 哈希，这样就能提高查询效率，降低系统开销。如果在系统负载高，sql 语句相同查询低则会删除自适应哈希。目前没有可修改的参数，是 mysql 自己进行的自适应优化。</p>
<h2 id="三、mysql-语句执行过程" tabindex="-1"><a class="header-anchor" href="#三、mysql-语句执行过程" aria-hidden="true">#</a> 三、Mysql 语句执行过程</h2>
<h3 id="_2-1-查询语句" tabindex="-1"><a class="header-anchor" href="#_2-1-查询语句" aria-hidden="true">#</a> 2.1 查询语句</h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>1、判断是否存在缓存，高版本已废弃
2、语法解析器
3、sql 优化器
4、判断 buffer 里面是否存在数据
5、不存在数据则从磁盘加载数据
6、判断是否有索引，没有索引则全表扫描
7、有索引则看是否有覆盖索引，有则通过索引查询数据后返回
8、没有则通过索引查询到主键后进行回表操作
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-增删改语句" tabindex="-1"><a class="header-anchor" href="#_2-2-增删改语句" aria-hidden="true">#</a> 2.2 增删改语句</h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>1、从连接池里面复用线程
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
 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="四、事务" tabindex="-1"><a class="header-anchor" href="#四、事务" aria-hidden="true">#</a> 四、事务</h2>
<h3 id="_4-1-acid" tabindex="-1"><a class="header-anchor" href="#_4-1-acid" aria-hidden="true">#</a> 4.1 ACID</h3>
<p>存在事务就会有事务的四个特征 ACID，如下：</p>
<p>Atomicity(原子性)：要么全部成功，要么全部失败</p>
<p>Consistency(一致性)：事务执行的前后，数据都是一致的。比如转账一个多10 元一个少 10 元。</p>
<p>Isolation(隔离性): 一个事务的执行不被另一个事务干扰</p>
<p>Durability(持久性): 一旦事务提交数据就被永久修改，即使数据库崩溃</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>原子性：要么都成功，要么都失败。重做日志（Redo Log）、回滚日志（Undo Log）
一致性: 业务逻辑一致，约束检查、触发器和存储过程
隔离性: 多个线程同时操作互不影响 mvcc、锁机制（共享锁、意向锁、排他锁）
持久性：操作断电后能恢复 重做日志（Redo Log）、双写缓冲区（Doublewrite Buffer）
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在多个线程同时修改数据的时候就会有如下几个问题：</p>
<table>
<thead>
<tr>
<th style="text-align:left">名词</th>
<th>现象</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">脏读</td>
<td>修改数据后未提交，另一个事务读取了提交前的数据</td>
</tr>
<tr>
<td style="text-align:left">不可重复读</td>
<td>同一个事务里面读取同一个数据，出现不一样的情况</td>
</tr>
<tr>
<td style="text-align:left">幻读</td>
<td>读取数据时，其他事务插入数据。再次读数据不一致</td>
</tr>
</tbody>
</table>
<h3 id="_4-2-mvcc" tabindex="-1"><a class="header-anchor" href="#_4-2-mvcc" aria-hidden="true">#</a> 4.2 MVCC</h3>
<p>多版本并发控制，利用多个事务版本机制实现（乐观锁 + redo log）避免了加锁操作。在同一事务中利用read view查询之前的数据。</p>
<table>
<thead>
<tr>
<th>事务读取可性问题</th>
<th>第一次快照读</th>
<th>后面的快照读</th>
<th>原因（read view生成时机）</th>
</tr>
</thead>
<tbody>
<tr>
<td>RR</td>
<td>可见</td>
<td>不可见</td>
<td>第一次快照读生成之后复用</td>
</tr>
<tr>
<td>RC</td>
<td>可见</td>
<td>可见</td>
<td>每次快照读都生成</td>
</tr>
</tbody>
</table>
<ul>
<li>快照读：读写冲突不加锁，读取的是历史版本数据。如Select …</li>
<li>当前读：加锁操作（悲观锁），读取的是最新版本数据。如：select … lock in share mode / Select …. For update / Update/delete/insert</li>
</ul>
<p>为了解决 ACID的问题，有两个方法。一个是直接加悲观锁，每次修改时都锁住这种方式性能最不好。另外一个就是乐观锁，利用版本的方式。mysql 的开发者为了提高性能于是设计了 MVCC（多并发版本控制），主要目的是为了解决多并发加锁太重的一个方式。做到读写冲突时，不加锁也不阻塞。</p>
<p>MVCC 最主要的就是利用 undo log 去记录回滚日志，用回滚日志里面的事务 id  加上当前事务读取的信息进行判断。具体 Mysql可见性算法伪代码如下：</p>
<p><strong>MVCC重要的三个概念: 隐式字段、undo log、read view</strong></p>
<ul>
<li>隐式字段： 除了自定义的字段外，数据库隐式的定义了其他字段</li>
</ul>
<table>
<thead>
<tr>
<th>DB_ROW_ID</th>
<th>隐式主键</th>
</tr>
</thead>
<tbody>
<tr>
<td>DB_TRX_ID(trx_id)</td>
<td>当前事务ID(递增)</td>
</tr>
<tr>
<td>DB_ROLL_PTR</td>
<td>回滚指针</td>
</tr>
</tbody>
</table>
<ul>
<li>Undo log: 在记录日志的时候事务ID递增后回滚指针指向上一个版本</li>
<li>Read View: 在事务执行快照读的一刻会生成数据库系统的快照</li>
</ul>
<table>
<thead>
<tr>
<th>trx_list</th>
<th>记录活跃事务ID</th>
</tr>
</thead>
<tbody>
<tr>
<td>up_limit_id</td>
<td>事务列表最小ID</td>
</tr>
<tr>
<td>low_limit_id</td>
<td>尚未分配ID(最大ID+1)</td>
</tr>
</tbody>
</table>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token comment">// 快照读所需的 ReadView 类</span>
<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">ReadView</span> <span class="token punctuation">{</span>
    <span class="token comment">// 创建该 ReadView 的事务 ID</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> creator_trx_id<span class="token punctuation">;</span>
    <span class="token comment">// 正在活跃的事务 ID 列表（未提交的事务，升序列表）</span>
    <span class="token keyword">public</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">></span></span> trx_list<span class="token punctuation">;</span>
    <span class="token comment">// 当前系统中尚未分配的下一个事务 ID，即大于 alive_list 中所有事务 ID 的最小值</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> low_limit_id<span class="token punctuation">;</span>
    <span class="token comment">// alive_list 中的最小事务 ID</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> up_limit_id<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// UndoLog 类，用于存储回滚日志信息</span>
<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">UndoLog</span> <span class="token punctuation">{</span>
    <span class="token comment">// 当前指针（可用于其他操作，此处保留）</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> roll_ptr<span class="token punctuation">;</span>
    <span class="token comment">// 隐含的自增 ID</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> db_row_id<span class="token punctuation">;</span>
    <span class="token comment">// 修改该行数据的事务 ID</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> trx_id<span class="token punctuation">;</span>
    <span class="token comment">// 回滚指针，指向前一个版本的 UndoLog</span>
    <span class="token keyword">public</span> <span class="token class-name">UndoLog</span> db_roll_ptr<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 快照读方法，用于从 UndoLog 链中查找可见的数据版本</span>
<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">UndoLog</span> <span class="token function">readData</span><span class="token punctuation">(</span><span class="token class-name">UndoLog</span> chain<span class="token punctuation">,</span> <span class="token class-name">ReadView</span> readView<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">UndoLog</span> current <span class="token operator">=</span> chain<span class="token punctuation">;</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>current <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">visibility</span><span class="token punctuation">(</span>current<span class="token punctuation">,</span> readView<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> current<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// 移动到前一个版本的 UndoLog</span>
        current <span class="token operator">=</span> current<span class="token punctuation">.</span>db_roll_ptr<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 可见性判断方法，判断某条 UndoLog 记录对当前 ReadView 是否可见</span>
<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">boolean</span> <span class="token function">visibility</span><span class="token punctuation">(</span><span class="token class-name">UndoLog</span> undoLog<span class="token punctuation">,</span> <span class="token class-name">ReadView</span> readView<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> trxId <span class="token operator">=</span> undoLog<span class="token punctuation">.</span>trx_id<span class="token punctuation">;</span>
    <span class="token comment">// 情况一：事务在 ReadView 创建前已提交</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>trxId <span class="token operator">&lt;</span> readView<span class="token punctuation">.</span>up_limit_id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 情况二：事务是当前事务自己修改的</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>trxId <span class="token operator">==</span> readView<span class="token punctuation">.</span>creator_trx_id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 情况三：事务在 ReadView 创建后开始</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>trxId <span class="token operator">>=</span> readView<span class="token punctuation">.</span>low_limit_id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 情况四：事务在 ReadView 创建时活跃，判断是否已提交</span>
    <span class="token keyword">return</span> <span class="token operator">!</span>readView<span class="token punctuation">.</span>trx_list<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span>trxId<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样 mysql 就用了事务的隔离级别解决了多线程并发读写冲突的问题。</p>
<table>
<thead>
<tr>
<th>事物级别</th>
<th>脏读</th>
<th>不可重复读</th>
<th>幻读</th>
<th></th>
</tr>
</thead>
<tbody>
<tr>
<td>read uncommitted</td>
<td>✅</td>
<td>✅</td>
<td>✅</td>
<td>会读取回滚数据</td>
</tr>
<tr>
<td>read committed</td>
<td>❌</td>
<td>✅ 当前读</td>
<td>✅</td>
<td>mvcc快照读最新</td>
</tr>
<tr>
<td>repeatable read</td>
<td>❌</td>
<td>❌ 快照读</td>
<td>✅ mvcc 与 快照读+间隙锁可解决</td>
<td>mvcc复用快照读</td>
</tr>
<tr>
<td>serialize</td>
<td>❌</td>
<td>❌</td>
<td>❌</td>
<td>加锁</td>
</tr>
</tbody>
</table>
<p>Oracle默认隔离级别为read committed， Msql默认为repeatable read。生产会将隔离级别改为read committed，即可以出现不可重复读和幻读，这样在事务中就可以获取最新的数据。</p>
<div class="language-mysql line-numbers-mode" data-ext="mysql"><pre v-pre class="language-mysql"><code>## 查询数据库当前默认隔离级别
SELECT @@transaction_isolation;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-3-rr下的幻读" tabindex="-1"><a class="header-anchor" href="#_4-3-rr下的幻读" aria-hidden="true">#</a> 4.3 RR下的幻读</h3>
<table>
<thead>
<tr>
<th style="text-align:left"><strong>场景</strong></th>
<th style="text-align:left"><strong>是否可能发生幻读</strong></th>
<th style="text-align:left"><strong>原因</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">纯快照读（普通 SELECT）</td>
<td style="text-align:left">❌ 不会</td>
<td style="text-align:left">MVCC 保证一致性视图</td>
</tr>
<tr>
<td style="text-align:left">纯当前读（SELECT FOR UPDATE）</td>
<td style="text-align:left">❌ 不会</td>
<td style="text-align:left">Next-Key Locking 阻止插入</td>
</tr>
<tr>
<td style="text-align:left">混合快照读 + 当前读</td>
<td style="text-align:left">✅ 可能</td>
<td style="text-align:left">当前读会重新加锁并看到最新数据</td>
</tr>
<tr>
<td style="text-align:left">无索引查询</td>
<td style="text-align:left">❌ 不会</td>
<td style="text-align:left">全表锁阻止插入，但性能极差</td>
</tr>
</tbody>
</table>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>在 MySQL 的 RR 隔离级别下，只有纯快照读（无写操作）且正确使用间隙锁时才能完全避免幻读。若涉及写操作、未正确加锁或索引设计不当，仍可能发生幻读。彻底避免幻读需：
	- 对范围查询使用 SELECT ... FOR UPDATE 显式加锁。
	- 升级至 Serializable 隔离级别（牺牲并发性能）。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="五、索引" tabindex="-1"><a class="header-anchor" href="#五、索引" aria-hidden="true">#</a> 五、索引</h2>
<p>数据记录的数据量级增多后，如果是挨个查询的效率就很低了。这时候为了快速查找，就像一本书的目录一样会给数据建立索引。索引建立之后就能快速的定位数据。Mysql 的索引是使用的B+Tree 实现的，普通节点记录索引数据，叶子节点记录具体的数据。</p>
<p>Mysql 中如果定义了主键，就会把主键作为默认的聚簇索引，聚簇索引的叶子节点就记录了所有的数据。在创建普通索引的时候是按照创建的字段进行索引的，索引的指针是指向聚簇索引的位置。如果普通索引查询的字段不是普通索引的字段（覆盖索引）这时候就需要进行回表操作，也就是先通过普通索引找到聚簇索引的值，在通过聚簇索引找到具体的数据。</p>
<p>那么优化查询语句的时候，就需要从建立合适的索引+查询语句使用索引的方向去优化。</p>
<table>
<thead>
<tr>
<th>名词解释</th>
<th>描述</th>
<th>存储引擎</th>
</tr>
</thead>
<tbody>
<tr>
<td>聚簇索引</td>
<td>索引文件和数据存放在一起</td>
<td>innodb</td>
</tr>
<tr>
<td>非聚簇索引</td>
<td>索引文件和数据没有存放在一起</td>
<td>myisam、innodb</td>
</tr>
<tr>
<td>回表</td>
<td>获取所有数据时候先通过普通索引查询，后通过主键索引</td>
<td></td>
</tr>
<tr>
<td>覆盖索引</td>
<td>普通索引就包含查询的值</td>
<td></td>
</tr>
<tr>
<td>索引下推</td>
<td>从server端的查询下推到存储引擎</td>
<td></td>
</tr>
<tr>
<td>页分裂</td>
<td>b+树插入数据，叶子节点不够时</td>
<td></td>
</tr>
<tr>
<td>页合并</td>
<td>b+树删除数据时</td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="_5-1-索引结构" tabindex="-1"><a class="header-anchor" href="#_5-1-索引结构" aria-hidden="true">#</a> 5.1 索引结构</h3>
<table>
<thead>
<tr>
<th></th>
<th>B+Tree</th>
<th>Hash</th>
</tr>
</thead>
<tbody>
<tr>
<td>结构</td>
<td>有序树结构</td>
<td>K,v散列hash值</td>
</tr>
<tr>
<td>缺点</td>
<td>冗余节点数据占用内存</td>
<td>无法比较大小，不能范围查询</td>
</tr>
<tr>
<td>排序</td>
<td>支持</td>
<td>不支持</td>
</tr>
<tr>
<td>大小匹配</td>
<td>支持</td>
<td>不支持(hash算法后不连续)</td>
</tr>
<tr>
<td>最左前缀匹配</td>
<td>支持</td>
<td>不支持</td>
</tr>
<tr>
<td>等值查找</td>
<td>效率一般</td>
<td>效率高</td>
</tr>
</tbody>
</table>
<p>B树和B+树的区别</p>
<p>存储数据：</p>
<p>B树：不存在重复数据</p>
<p>B+树：索引列只存key，叶子节点存储key和数据</p>
<h3 id="_5-2-索引分类" tabindex="-1"><a class="header-anchor" href="#_5-2-索引分类" aria-hidden="true">#</a> 5.2 索引分类</h3>
<ul>
<li>逻辑角度</li>
</ul>
<table>
<thead>
<tr>
<th>主键索引</th>
<th>建立的主键唯一</th>
</tr>
</thead>
<tbody>
<tr>
<td>唯一索引</td>
<td>一般给业务唯一数据建立</td>
</tr>
<tr>
<td>普通索引</td>
<td>不唯一的数据作为检索条件</td>
</tr>
<tr>
<td>全文索引</td>
<td>文本关键字时，一般用es</td>
</tr>
<tr>
<td>组合索引</td>
<td>多个字段作为检索条件</td>
</tr>
</tbody>
</table>
<ul>
<li>物理存储角度</li>
</ul>
<table>
<thead>
<tr>
<th>聚簇索引</th>
<th>索引和数据在一个文件</th>
<th>InnoDB的主键使用的就是聚簇索引</th>
</tr>
</thead>
<tbody>
<tr>
<td>非聚簇索引</td>
<td>索引和数据分开存放</td>
<td>MyISAM不管是主键还是二级索引都是使用的非聚簇索引</td>
</tr>
</tbody>
</table>
<ul>
<li>数据结构</li>
</ul>
<table>
<thead>
<tr>
<th>tree（b tree，b+tree）常用</th>
<th>适用于查找范围内数据</th>
</tr>
</thead>
<tbody>
<tr>
<td>hash（hash索引）</td>
<td>适用于随机访问场合</td>
</tr>
<tr>
<td>full-text（全文索引）</td>
<td>查找问题中关键字，一般用ES</td>
</tr>
<tr>
<td>R-tree（空间索引）不常用</td>
<td>查询比较接近的数据GIS不完善</td>
</tr>
</tbody>
</table>
<h3 id="_5-3-选择合适的索引" tabindex="-1"><a class="header-anchor" href="#_5-3-选择合适的索引" aria-hidden="true">#</a> 5.3 选择合适的索引</h3>
<p>查询量大的创建索引</p>
<ul>
<li>高频访问的数据：比如订单表通过订单号查询数据，这时候给订单号加索引。订单号一般都是主键索引</li>
<li>查询范围量大的数据：比如经常出现通过时间范围查询数据，造成慢查询等性能问题，给时间加个索引</li>
</ul>
<p>选择合适的列</p>
<ul>
<li>基数高的列：用户 id 不重复适合加索引，性别只有两个不适合加索引</li>
<li>用于关联查询连接的字段：比如 a left join b on a.user_id = b.user_id 给 user_id 建立索引</li>
<li>排序分组的列：经常有 sql 进行 group by 操作。group by 后面得字段可以加索引，可加快分组速度</li>
</ul>
<p>避免不合适的索引</p>
<ul>
<li>已有联合索引：已经有了 index(a, b)还创建一个 index(a)</li>
<li>为每个字段创建索引：索引创建后，增删改的效率就很低。为了查询效率高完全不考虑增删改是不对的</li>
</ul>
<p>索引的类型选择</p>
<ul>
<li>B+ Tree:  Mysql 的默认索引类型，支持范围查询、分组、排序</li>
<li>哈希索引：查询效率极高，不支持范围查询、排序和分组, 一般用 redis 缓存实现</li>
<li>全文索引：检索博客里面的文本数据时，一般用的是 Elasticsearch</li>
</ul>
<h3 id="_5-4-避免索引失效" tabindex="-1"><a class="header-anchor" href="#_5-4-避免索引失效" aria-hidden="true">#</a> 5.4  避免索引失效</h3>
<ol>
<li>避免在索引列上进行计算、函数操作</li>
</ol>
<ul>
<li>
<p><strong>原理</strong>：对索引列使用函数或进行计算时，MySQL 无法直接使用索引快速定位数据，因为索引是基于原始列值构建的，函数或计算会改变索引列的原有值，使索引失效。</p>
</li>
<li>
<p><strong>示例及解决办法</strong></p>
</li>
</ul>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token comment">-- 原查询，索引失效</span>
<span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> users <span class="token keyword">WHERE</span> <span class="token keyword">YEAR</span><span class="token punctuation">(</span>created_at<span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token number">2023</span><span class="token punctuation">;</span>
<span class="token comment">-- 优化后，可使用索引</span>
<span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> users <span class="token keyword">WHERE</span> created_at <span class="token operator">>=</span> <span class="token string">'2023-01-01'</span> <span class="token operator">AND</span> created_at <span class="token operator">&lt;</span> <span class="token string">'2024-01-01'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2">
<li>遵循最左前缀原则</li>
</ol>
<ul>
<li><strong>原理</strong>：对于复合索引（由多个列组成的索引），MySQL 会按照索引中列的顺序依次使用列进行查询匹配。如果查询条件中不包含复合索引的最左列，那么整个复合索引将无法使用。</li>
<li>示例及解决办法</li>
</ul>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token comment">-- 创建复合索引</span>
<span class="token keyword">CREATE</span> <span class="token keyword">INDEX</span> idx_name_age <span class="token keyword">ON</span> users <span class="token punctuation">(</span>name<span class="token punctuation">,</span> age<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">-- 可使用索引</span>
<span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> users <span class="token keyword">WHERE</span> name <span class="token operator">=</span> <span class="token string">'John'</span> <span class="token operator">AND</span> age <span class="token operator">=</span> <span class="token number">25</span><span class="token punctuation">;</span>
<span class="token comment">-- 可使用索引，部分匹配</span>
<span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> users <span class="token keyword">WHERE</span> name <span class="token operator">=</span> <span class="token string">'John'</span><span class="token punctuation">;</span>
<span class="token comment">-- 索引失效，未遵循最左前缀原则</span>
<span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> users <span class="token keyword">WHERE</span> age <span class="token operator">=</span> <span class="token number">25</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3">
<li>避免使用不等于（!= 或 &lt;&gt;）、IS NULL、IS NOT NULL</li>
</ol>
<ul>
<li><strong>原理</strong>：当使用不等于、IS NULL 或 IS NOT NULL 时，MySQL 无法有效利用索引进行范围扫描，可能会导致全表扫描。</li>
<li>示例及解决办法</li>
</ul>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token comment">-- 原查询，索引可能失效</span>
<span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> products <span class="token keyword">WHERE</span> price <span class="token operator">!=</span> <span class="token number">100</span><span class="token punctuation">;</span>
<span class="token comment">-- 优化思路，使用范围查询代替不等于</span>
<span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> products <span class="token keyword">WHERE</span> price <span class="token operator">&lt;</span> <span class="token number">100</span> <span class="token operator">OR</span> price <span class="token operator">></span> <span class="token number">100</span><span class="token punctuation">;</span>

<span class="token comment">-- 原查询，索引可能失效</span>
<span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> users <span class="token keyword">WHERE</span> email <span class="token operator">IS</span> <span class="token boolean">NULL</span><span class="token punctuation">;</span>
<span class="token comment">-- 如果业务允许，可给字段设置默认值，避免使用 IS NULL 查询</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="4">
<li>避免隐式类型转换</li>
</ol>
<ul>
<li><strong>原理</strong>：当查询条件中的数据类型与索引列的数据类型不一致时，MySQL 会进行隐式类型转换，这可能会导致索引失效。</li>
<li><strong>示例及解决办法</strong></li>
</ul>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token comment">-- 假设 id 是整数类型的索引列</span>
<span class="token comment">-- 原查询，存在隐式类型转换，索引失效</span>
<span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> orders <span class="token keyword">WHERE</span> id <span class="token operator">=</span> <span class="token string">'123'</span><span class="token punctuation">;</span>
<span class="token comment">-- 优化后，使用正确的数据类型</span>
<span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> orders <span class="token keyword">WHERE</span> id <span class="token operator">=</span> <span class="token number">123</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="5">
<li>避免使用 OR 连接条件</li>
</ol>
<ul>
<li><strong>原理</strong>：当使用 OR 连接多个条件时，如果其中一个条件不使用索引，那么整个查询可能会导致索引失效，进行全表扫描。</li>
<li><strong>示例及解决办法</strong></li>
</ul>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token comment">-- 原查询，索引可能失效</span>
<span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> users <span class="token keyword">WHERE</span> id <span class="token operator">=</span> <span class="token number">1</span> <span class="token operator">OR</span> name <span class="token operator">=</span> <span class="token string">'John'</span><span class="token punctuation">;</span>
<span class="token comment">-- 优化思路，使用 UNION ALL 代替 OR</span>
<span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> users <span class="token keyword">WHERE</span> id <span class="token operator">=</span> <span class="token number">1</span>
<span class="token keyword">UNION</span> <span class="token keyword">ALL</span>
<span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> users <span class="token keyword">WHERE</span> name <span class="token operator">=</span> <span class="token string">'John'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="6">
<li>保持索引列统计信息的准确性</li>
</ol>
<ul>
<li><strong>原理</strong>：MySQL 的查询优化器会根据索引列的统计信息来选择最优的查询执行计划。如果统计信息不准确，可能会导致优化器做出错误的决策，从而使索引失效。</li>
<li><strong>解决办法</strong>：定期使用 <code v-pre>ANALYZE TABLE</code> 语句来更新表的统计信息。</li>
</ul>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">ANALYZE</span> <span class="token keyword">TABLE</span> users<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="7">
<li>避免在模糊查询的开头使用通配符</li>
</ol>
<ul>
<li><strong>原理</strong>：当在模糊查询中使用 <code v-pre>LIKE</code> 操作符，且通配符 <code v-pre>%</code> 出现在字符串的开头时，MySQL 无法使用索引进行前缀匹配，会导致全表扫描。</li>
<li>**示例及解决办法</li>
</ul>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token comment">-- 原查询，索引失效</span>
<span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> products <span class="token keyword">WHERE</span> name <span class="token operator">LIKE</span> <span class="token string">'%apple%'</span><span class="token punctuation">;</span>
<span class="token comment">-- 优化后，可使用索引</span>
<span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> products <span class="token keyword">WHERE</span> name <span class="token operator">LIKE</span> <span class="token string">'apple%'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>5.6.41版本的 sql 执行的索引 type 情况</p>
<table>
<thead>
<tr>
<th>方式</th>
<th>索引</th>
<th>优化</th>
</tr>
</thead>
<tbody>
<tr>
<td>like ‘%name%’</td>
<td>all❌</td>
<td></td>
</tr>
<tr>
<td>like ‘name%’</td>
<td>range</td>
<td></td>
</tr>
<tr>
<td>like ‘%name’</td>
<td>All❌</td>
<td></td>
</tr>
<tr>
<td>in(‘name’)</td>
<td>数量少ref数量多range</td>
<td></td>
</tr>
<tr>
<td>not in (‘name’)</td>
<td>All</td>
<td></td>
</tr>
<tr>
<td>a = name or b = age</td>
<td>range</td>
<td></td>
</tr>
<tr>
<td>is not null</td>
<td>all❌</td>
<td></td>
</tr>
<tr>
<td>is null</td>
<td>ref</td>
<td></td>
</tr>
<tr>
<td>where concat(id, ‘1’)=10</td>
<td>All❌</td>
<td>给函数也加索引</td>
</tr>
<tr>
<td>where id = concat(‘2’, ‘1’)</td>
<td>ref</td>
<td></td>
</tr>
<tr>
<td>where id + 1 = 10</td>
<td>all❌</td>
<td></td>
</tr>
<tr>
<td>where id = 10 + 1</td>
<td>ref</td>
<td></td>
</tr>
<tr>
<td>隐式转换</td>
<td>all❌</td>
<td></td>
</tr>
</tbody>
</table>
<p>索引失效（6点）：非like前缀、not in、is not null、函数、计算、隐式转换</p>
<h2 id="六、优化器" tabindex="-1"><a class="header-anchor" href="#六、优化器" aria-hidden="true">#</a> 六、优化器</h2>
<p><strong>优化原则</strong></p>
<table>
<thead>
<tr>
<th>更小更好</th>
<th>选择最小的数据类型减少磁盘空间</th>
</tr>
</thead>
<tbody>
<tr>
<td>简单更好</td>
<td>尽量使用mysql存在的数据类型</td>
</tr>
<tr>
<td>尽量避免null</td>
<td>可为null的列需要更多的存储空间</td>
</tr>
</tbody>
</table>
<table>
<thead>
<tr>
<th>工具</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td>show profile</td>
<td>显示查询具体的执行情况</td>
</tr>
<tr>
<td>Performance schema</td>
<td>性能模块，可以用来做监控</td>
</tr>
<tr>
<td>show processlist</td>
<td>监控数据连接</td>
</tr>
</tbody>
</table>
<h3 id="_6-1-执行计划" tabindex="-1"><a class="header-anchor" href="#_6-1-执行计划" aria-hidden="true">#</a> 6.1  执行计划</h3>
<p>通常在优化查询时，我们希望 <code v-pre>type</code> 的值尽可能接近 <code v-pre>system</code>、<code v-pre>const</code>、<code v-pre>eq_ref</code> 等高效类型，避免出现 <code v-pre>ALL</code> 这种低效的全表扫描情况。</p>
<table>
<thead>
<tr>
<th>type 值</th>
<th>含义</th>
<th>性能说明</th>
<th>示例及解释</th>
</tr>
</thead>
<tbody>
<tr>
<td><code v-pre>system</code></td>
<td>表中只有一行记录，这是 <code v-pre>const</code> 类型的特例，通常出现在系统表中。</td>
<td>性能最佳，因为只需访问一行数据。</td>
<td>例如系统表中固定行数的情况，由于行数极少，查询可以瞬间完成。</td>
</tr>
<tr>
<td><code v-pre>const</code></td>
<td>通过索引一次就找到匹配的记录，常用于 <code v-pre>PRIMARY KEY</code> 或 <code v-pre>UNIQUE</code> 索引的等值查询。</td>
<td>性能非常好，因为直接通过索引定位到唯一行。</td>
<td><code v-pre>SELECT * FROM users WHERE user_id = 1;</code> 若 <code v-pre>user_id</code> 是主键，MySQL 可以通过主键索引直接定位到该记录。</td>
</tr>
<tr>
<td><code v-pre>eq_ref</code></td>
<td>对于每个来自前面表的行组合，从该表中读取一行。常用于连接操作中使用 <code v-pre>PRIMARY KEY</code> 或 <code v-pre>UNIQUE</code> 索引。</td>
<td>性能较好，在连接查询中能高效匹配。</td>
<td><code v-pre>sql&lt;br&gt;SELECT * FROM orders&lt;br&gt;JOIN customers ON orders.customer_id = customers.customer_id&lt;br&gt;WHERE orders.order_id = 1;&lt;br&gt;</code> 若 <code v-pre>customer_id</code> 在 <code v-pre>customers</code> 表是主键，对于 <code v-pre>orders</code> 表中每一行匹配的 <code v-pre>customer_id</code>，都能从 <code v-pre>customers</code> 表中快速找到对应的一行。</td>
</tr>
<tr>
<td><code v-pre>ref</code></td>
<td>使用非唯一索引或唯一索引的前缀扫描，返回匹配某个单独值的所有行。</td>
<td>性能不错，但可能返回多行数据。</td>
<td><code v-pre>SELECT * FROM products WHERE category_id = 2;</code> 若 <code v-pre>category_id</code> 有非唯一索引，MySQL 会通过该索引找出所有 <code v-pre>category_id</code> 为 2 的记录。</td>
</tr>
<tr>
<td><code v-pre>fulltext</code></td>
<td>使用全文索引进行查询。</td>
<td>适用于全文搜索场景，性能取决于全文索引的构建和数据量。</td>
<td><code v-pre>SELECT * FROM articles WHERE MATCH(content) AGAINST('keyword' IN NATURAL LANGUAGE MODE);</code> 若 <code v-pre>content</code> 列有全文索引，可使用全文搜索查找包含指定关键字的文章。</td>
</tr>
<tr>
<td><code v-pre>ref_or_null</code></td>
<td>与 <code v-pre>ref</code> 类似，但还会搜索包含 <code v-pre>NULL</code> 值的行。</td>
<td>性能稍逊于 <code v-pre>ref</code>，因为要额外处理 <code v-pre>NULL</code> 值。</td>
<td><code v-pre>SELECT * FROM users WHERE email = 'test@example.com' OR email IS NULL;</code> 若 <code v-pre>email</code> 有索引，查询时会查找匹配指定邮箱和 <code v-pre>NULL</code> 值的行。</td>
</tr>
<tr>
<td><code v-pre>index_merge</code></td>
<td>使用了索引合并优化，即同时使用多个索引来满足查询条件。</td>
<td>性能因具体情况而异，可能比单一索引查询更复杂。</td>
<td><code v-pre>sql&lt;br&gt;SELECT * FROM products&lt;br&gt;WHERE category_id = 2 OR price &gt; 100;&lt;br&gt;</code> 若 <code v-pre>category_id</code> 和 <code v-pre>price</code> 分别有索引，MySQL 可能会合并这两个索引来执行查询。</td>
</tr>
<tr>
<td><code v-pre>unique_subquery</code></td>
<td>该类型用于 <code v-pre>IN</code> 子查询，子查询使用 <code v-pre>UNIQUE</code> 索引。</td>
<td>性能较好，子查询能通过唯一索引高效查询。</td>
<td><code v-pre>SELECT * FROM products WHERE product_id IN (SELECT product_id FROM product_reviews WHERE rating = 5);</code> 若 <code v-pre>product_reviews</code> 表的 <code v-pre>product_id</code> 是唯一索引，子查询会更高效。</td>
</tr>
<tr>
<td><code v-pre>index_subquery</code></td>
<td>类似于 <code v-pre>unique_subquery</code>，但子查询使用的是非唯一索引。</td>
<td>性能不如 <code v-pre>unique_subquery</code>，因为非唯一索引可能返回多行。</td>
<td>与 <code v-pre>unique_subquery</code> 示例类似，只是子查询中的索引是非唯一的。</td>
</tr>
<tr>
<td><code v-pre>range</code></td>
<td>只检索给定范围的行，使用索引进行范围扫描，如 <code v-pre>WHERE</code> 子句中有 <code v-pre>BETWEEN</code>、<code v-pre>&gt;</code>、<code v-pre>&lt;</code> 等操作。</td>
<td>性能尚可，根据范围大小和数据分布而定。</td>
<td><code v-pre>SELECT * FROM orders WHERE order_date BETWEEN '2023-01-01' AND '2023-12-31';</code> 若 <code v-pre>order_date</code> 有索引，会使用该索引进行范围扫描。</td>
</tr>
<tr>
<td><code v-pre>index</code></td>
<td>全索引扫描，扫描整个索引树。</td>
<td>性能一般，虽然只扫描索引，但可能涉及大量索引项。</td>
<td><code v-pre>SELECT product_name FROM products;</code> 若 <code v-pre>product_name</code> 有索引，可能会进行全索引扫描。</td>
</tr>
<tr>
<td><code v-pre>ALL</code></td>
<td>全表扫描，需要逐行扫描表中的所有数据。</td>
<td>性能最差，尤其是对于大表，会消耗大量的时间和资源。</td>
<td><code v-pre>SELECT * FROM large_table;</code> 没有合适的索引时，MySQL 会进行全表扫描。</td>
</tr>
</tbody>
</table>
<h3 id="_6-2-成本计算" tabindex="-1"><a class="header-anchor" href="#_6-2-成本计算" aria-hidden="true">#</a> 6.2 成本计算</h3>
<p>在 MySQL 中，查询优化器会对不同的查询执行计划进行成本计算，从而选择成本最低的执行计划来执行查询。成本计算主要考虑两方面的成本：I/O 成本和 CPU 成本，下面详细介绍相关内容。</p>
<p>I/O 成本：I/O 成本主要涉及磁盘 I/O 操作，也就是从磁盘读取数据页的开销。因为磁盘的读写速度远低于内存，所以 I/O 成本在整体成本中占比较大。MySQL 会根据需要读取的数据页数量来估算 I/O 成本。例如，当需要从磁盘读取大量的数据页时，I/O 成本就会很高。</p>
<p>CPU 成本：CPU 成本是指在内存中对数据进行处理的开销，包括对数据进行排序、比较、过滤等操作。虽然 CPU 的处理速度很快，但当处理大量数据时，CPU 成本也会显著增加。</p>
<p>成本计算相关因素：</p>
<ol>
<li>表的统计信息：MySQL 会收集表的统计信息，如行数、数据页数量、索引分布等。这些统计信息是成本计算的重要依据。例如，查询优化器会根据表的行数来估算需要读取的数据量，进而计算 I/O 成本。可以使用 <code v-pre>ANALYZE TABLE</code> 语句来更新表的统计信息，以确保成本计算的准确性。</li>
</ol>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">ANALYZE</span> <span class="token keyword">TABLE</span> your_table_name<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="2">
<li>
<p>索引使用情况：使用索引可以减少需要读取的数据量，从而降低 I/O 成本。不同类型的索引在成本计算中的表现也不同。例如，覆盖索引可以直接从索引中获取所需的数据，避免了回表操作，从而显著降低成本；而全表扫描则需要读取表中的所有数据，成本较高。</p>
</li>
<li>
<p>查询条件：查询条件的复杂度和选择性也会影响成本计算。选择性是指查询条件能够过滤掉多少数据，选择性越高，需要处理的数据量就越少，成本也就越低。例如，<code v-pre>WHERE column = 'specific_value'</code> 的选择性通常比 <code v-pre>WHERE column LIKE '%pattern%'</code> 要高，因为前者能更精确地过滤数据。</p>
</li>
</ol>
<p>成本计算示例：</p>
<p>假设我们有一个 <code v-pre>orders</code> 表，包含 <code v-pre>order_id</code>、<code v-pre>customer_id</code>、<code v-pre>order_date</code> 等列，并且在 <code v-pre>order_date</code> 列上有索引。现在执行以下查询：</p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> orders <span class="token keyword">WHERE</span> order_date <span class="token operator">BETWEEN</span> <span class="token string">'2023-01-01'</span> <span class="token operator">AND</span> <span class="token string">'2023-12-31'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>查询优化器会考虑以下两种执行计划：</p>
<ul>
<li>使用索引扫描
<ul>
<li><strong>I/O 成本</strong>：通过索引定位到满足 <code v-pre>order_date</code> 范围条件的记录，只需要读取索引页和对应的少量数据页。假设索引页有 10 个，数据页有 20 个，每个数据页的 I/O 成本为 1，那么 I/O 成本大约为 10 + 20 = 30。</li>
<li><strong>CPU 成本</strong>：对索引和数据进行过滤和比较操作，假设 CPU 成本为 10。</li>
<li><strong>总成本</strong>：I/O 成本 + CPU 成本 = 30 + 10 = 40。</li>
</ul>
</li>
<li>全表扫描
<ul>
<li><strong>I/O 成本</strong>：需要读取表中的所有数据页，假设表共有 100 个数据页，每个数据页的 I/O 成本为 1，那么 I/O 成本为 100。</li>
<li><strong>CPU 成本</strong>：对所有数据进行过滤操作，假设 CPU 成本为 20。</li>
<li><strong>总成本</strong>：I/O 成本 + CPU 成本 = 100 + 20 = 120。</li>
</ul>
</li>
</ul>
<p>在这个例子中，使用索引扫描的成本明显低于全表扫描，所以查询优化器会选择使用索引扫描的执行计划。</p>
<p>可以通过 <code v-pre>EXPLAIN FORMAT=JSON</code> 语句查看查询的执行计划及相关成本信息。例如：</p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">EXPLAIN</span> FORMAT<span class="token operator">=</span>JSON <span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> orders <span class="token keyword">WHERE</span> order_date <span class="token operator">BETWEEN</span> <span class="token string">'2023-01-01'</span> <span class="token operator">AND</span> <span class="token string">'2023-12-31'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>返回结果中会包含 <code v-pre>cost_info</code> 部分，显示了不同操作的成本估算，帮助我们分析查询的性能。</p>
<h3 id="_6-3-优化慢sql" tabindex="-1"><a class="header-anchor" href="#_6-3-优化慢sql" aria-hidden="true">#</a> 6.3 优化慢SQL</h3>
<p>深入分析执行计划：EXPLAIN 是 SQL 优化的必备工具。</p>
<ul>
<li>检查查询条件看是否存在索引失效，索引失效想办法解决失效问题</li>
<li>检查查询条件看是否有索引，评估是否可为查询条件字段添加索引。评估方式看查询字段是否为常用字段，比如用户id 等
SQL 语句与表结构优化：避免复杂查询和大字段。
<ul>
<li>查看查询数据是否太多，通过业务逻辑优化查询范围。比如分批多查询几次
数据库配置调优：合理设置内存和线程参数。
架构扩展：缓存、读写分离、分库分表应对大数据量。</li>
<li>检查 mysql库看是不是数据量太大（单表大于 500w），通过归档或者分库分表等方案解决单表数据量太大问题</li>
</ul>
</li>
</ul>
<p>关键点记忆：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>SQL优化：explain + 索引失效 + 合理添加索引
表结构优化：避免大字段 + 适当冗余 + 表拆分 + 少嵌套
数据库配置：少日志 + 合理线程池 + 增加服务器资源
架构扩展：读写分离 + 分库分表 + 大数据查询
应用层面：批量 + 缓存 + 异步	
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="七、锁" tabindex="-1"><a class="header-anchor" href="#七、锁" aria-hidden="true">#</a> 七、锁</h2>
<h3 id="_7-1-分类" tabindex="-1"><a class="header-anchor" href="#_7-1-分类" aria-hidden="true">#</a> 7.1 分类</h3>
<table>
<thead>
<tr>
<th>属性</th>
<th>共享锁（读锁）、排他（写锁）</th>
</tr>
</thead>
<tbody>
<tr>
<td>粒度</td>
<td>表锁、行锁、记录锁（行锁）、间隙锁、临键锁</td>
</tr>
<tr>
<td>状态</td>
<td>意向共享锁、意向排它锁</td>
</tr>
</tbody>
</table>
<p>间隙锁: 解决RR级别下的当前读出现幻读的情况。在行锁的前后指针上都加锁</p>
<p>意向锁：都是innodb自动加的，不需要用户干预</p>
<p><strong>1.2 案例</strong></p>
<p>一张表t id(主键)、c(普通索引)、d 字段 插入数据(0,0,0),(5,5,5),(10,10,10),(15,15,15)</p>
<ul>
<li>update t set d=1 where id = 7 主键索引上的 (5,10)间隙锁</li>
<li>update t set d=1 where id = 5 主键索引上的 5行锁</li>
<li>update t set d=1 where c = 7 普通索引上的 (5,10)间隙锁</li>
<li>update t set d=1 where c = 5 普通索引上的 (0,5]临键锁 (5,10)间隙锁</li>
<li>update t set d=1 where c &lt;11 普通索引上的 (0,15]临键锁</li>
<li>update t set d=1 where c &gt;=10 普通索引上的 (5,10]临键锁 (10,~]的临键锁</li>
<li>update t set d=1 where c &gt;=10 and c &lt;11 普通索引上的 (5,15]临键锁</li>
<li>update t set d=1 where id &gt;=10 and id &lt;11 主键索引上的 10行锁 (10,15)间隙锁</li>
</ul>
<h3 id="_7-2-死锁检测" tabindex="-1"><a class="header-anchor" href="#_7-2-死锁检测" aria-hidden="true">#</a> 7.2 死锁检测</h3>
<p>原因: 多个事务争夺资源形成循环等待
检测机制: 事务视为节点，锁等待视为向边。图中存在环则为死锁</p>
<ul>
<li>后台线程定期扫描 或 配置有新事务立马扫描</li>
<li>回滚策略为事务代价最小的返回（量最小，undo 日志小）、选中的错误返回1213 DeadLock found.</li>
</ul>
<p>日志分析：SHOW ENGINE INNODB STATUS 查看锁日志
死锁优化：控制锁检查频率、减少锁冲突、业务层容错（重试机制、熔断降级）</p>
<h3 id="_7-3-表加字段" tabindex="-1"><a class="header-anchor" href="#_7-3-表加字段" aria-hidden="true">#</a> 7.3 表加字段</h3>
<p>一般线上加字段的时候数据库会给数据加锁，这种情况就会出现加锁耗时长影响业务的情况，那么mysql线上数据加字段如何解决</p>
<ul>
<li>MyIsam: 每次新增字段都会重建表，建立临时表。耗时长</li>
<li>Innodb（5.6 之后）：可以为空的字段直接修改表的元数据后异步填充数据、非空默认值不复杂可能原地修改数据、非空默认值复杂（如默认值是日期）可能重建表。 5.6 之前所有加字段操作都会重建表</li>
<li>建议大表用pt-online-schema-change 工具增加字段， 避免缩表</li>
</ul>
<table>
<thead>
<tr>
<th><strong>场景</strong></th>
<th><strong>InnoDB 行为</strong></th>
<th><strong>原因</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td>非空字段 + 简单默认值</td>
<td>原地修改，可能锁表</td>
<td>默认值可快速填充</td>
</tr>
<tr>
<td>非空字段 + 复杂默认值</td>
<td>临时表重建，锁表迁移</td>
<td>动态默认值需逐行计算，原地修改效率低</td>
</tr>
<tr>
<td>第三方工具（如 pt-osc）</td>
<td>强制临时表重建，无锁迁移</td>
<td>通过触发器异步同步数据</td>
</tr>
</tbody>
</table>
<p>数据迁移时，先关闭索引，数据迁移完成之后在打开索引。 这样效率高。</p>
<h2 id="八、中间件对比" tabindex="-1"><a class="header-anchor" href="#八、中间件对比" aria-hidden="true">#</a> 八、中间件对比</h2>
<p>核心机制对比</p>
<table>
<thead>
<tr>
<th>维度</th>
<th><strong>MySQL</strong></th>
<th><strong>Redis</strong></th>
<th><strong>Kafka</strong></th>
<th><strong>RocketMQ</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>复制方式</strong></td>
<td>异步复制（基于 binlog）</td>
<td>异步复制（全量 RDB + 增量命令流）</td>
<td>同步复制（基于 ISR 机制）</td>
<td>支持同步 / 异步复制（DLedger 架构）</td>
</tr>
<tr>
<td><strong>数据一致性</strong></td>
<td>最终一致（可能存在延迟）</td>
<td>最终一致（异步复制）</td>
<td>强一致（同步副本确认）</td>
<td>强一致（同步双写）/ 最终一致（异步）</td>
</tr>
<tr>
<td><strong>故障转移</strong></td>
<td>需手动或依赖工具（如 MHA）</td>
<td>手动切换或 Sentinel 自动切换</td>
<td>自动选举新 Leader（ZooKeeper 协调）</td>
<td>自动切换（DLedger + Raft 协议）</td>
</tr>
<tr>
<td><strong>复制粒度</strong></td>
<td>数据库级（所有库表）</td>
<td>实例级（所有数据）</td>
<td>分区级（每个分区独立复制）</td>
<td>消息日志文件（按 Topic/Queue 隔离）</td>
</tr>
<tr>
<td><strong>写性能影响</strong></td>
<td>低（异步复制）</td>
<td>低（异步复制）</td>
<td>较高（同步等待 ISR）</td>
<td>高（同步双写）/ 低（异步）</td>
</tr>
</tbody>
</table>
<p>部署模式</p>
<table>
<thead>
<tr>
<th><strong>模式</strong></th>
<th><strong>MySQL</strong></th>
<th><strong>Redis</strong></th>
<th><strong>Kafka</strong></th>
<th><strong>RocketMQ</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>典型架构</strong></td>
<td>一主多从</td>
<td>一主多从 / 级联复制</td>
<td>多 Broker（分区）</td>
<td>多 Master + Slave</td>
</tr>
<tr>
<td><strong>节点数量建议</strong></td>
<td>1 主 + 1 从（最低）</td>
<td>1 主 + 2 从（Sentinel）</td>
<td>3 节点以上</td>
<td>2 主 + 2 从（DLedger）</td>
</tr>
<tr>
<td><strong>自动故障转移</strong></td>
<td>需第三方工具</td>
<td>Sentinel 支持</td>
<td>自动（ZooKeeper）</td>
<td>自动（DLedger）</td>
</tr>
<tr>
<td><strong>读写分离</strong></td>
<td>主写从读</td>
<td>主写从读</td>
<td>Leader 写，Follower 读</td>
<td>Master 写，Slave 读</td>
</tr>
</tbody>
</table>
<table>
<thead>
<tr>
<th>名称</th>
<th>MySQL</th>
<th>Redis</th>
<th>Kafka</th>
<th>RocketMQ</th>
</tr>
</thead>
<tbody>
<tr>
<td>防断电方案</td>
<td><strong>redo log</strong>：InnoDB 存储引擎特有的日志机制，它记录了事务对数据页的物理修改操作。当数据库崩溃或异常关闭后，通过重放 <code v-pre>redo log</code> 可以将未持久化到磁盘的数据页修改操作重新应用，保证数据的一致性和事务的持久性。采用顺序追加写入磁盘，减少了随机 I/O 开销，提高了写入性能。</td>
<td><strong>AOF（Append - Only File）</strong>：以文本协议格式按顺序记录 Redis 服务器的所有写操作命令。在 Redis 重启时，通过重新执行 AOF 文件中的命令来恢复数据，确保数据的持久性。AOF 持久化可以通过配置不同的同步策略来平衡性能和数据安全性。</td>
<td><strong>Log（分区日志）</strong>：Kafka 将消息以日志的形式顺序写入磁盘的分区文件中。每个分区都是一个独立的日志文件，并且 Kafka 采用多副本机制，将日志数据复制到多个节点上。即使某个节点出现故障或断电，其他副本仍然可以提供数据，保证数据的安全性和可用性。</td>
<td><strong>CommitLog</strong>：RocketMQ 采用 <code v-pre>CommitLog</code> 来存储消息数据，所有主题的消息都顺序写入 <code v-pre>CommitLog</code> 文件中。同时，通过 <code v-pre>ConsumeQueue</code> 作为消息消费的索引，提高消息消费的效率。<code v-pre>CommitLog</code> 结合 <code v-pre>ConsumeQueue</code> 实现了消息的高可靠持久化，即使在断电等异常情况下，也能保证消息不丢失。</td>
</tr>
<tr>
<td>记录方式</td>
<td>顺序追加到 <code v-pre>redo log</code> 文件，记录的是事务对数据页的物理修改，属于物理日志。例如，记录某一行数据被更新后，数据页的具体修改内容以及数据在磁盘中的位置信息。</td>
<td>顺序追加到 AOF 文件，记录所有写操作命令，属于逻辑日志。如 <code v-pre>SET key value</code>、<code v-pre>INCR counter</code> 等命令，以文本形式存储，便于阅读和解析。</td>
<td>顺序追加到分区日志文件，每个分区独立进行顺序写入。消息以键值对的形式存储，并且每个分区可以分布在不同的磁盘上，提高了并发写入和读取的性能。</td>
<td>顺序追加到 <code v-pre>CommitLog</code> 文件，同时会为每个主题和队列生成对应的 <code v-pre>ConsumeQueue</code> 索引。消息的属性、内容等信息都会被完整记录在 <code v-pre>CommitLog</code> 中，而 <code v-pre>ConsumeQueue</code> 则记录了消息在 <code v-pre>CommitLog</code> 中的偏移量等信息，方便快速定位和消费消息。</td>
</tr>
<tr>
<td>存储内容</td>
<td>主要存储数据库中数据的增删改操作以及数据在磁盘中的位置。具体包括事务对数据页的修改信息，如插入新记录、更新已有记录、删除记录等操作对应的物理数据页变化，以及这些数据在磁盘上的存储位置，用于在恢复时准确找到并应用修改。</td>
<td>存储所有对 Redis 数据库进行的写操作命令。涵盖了对各种数据结构（如字符串、哈希表、列表、集合、有序集合等）的操作命令，这些命令可以在 Redis 重启时重新执行，以恢复数据库的状态。</td>
<td>存储消息的键（key）和值（value）。消息的键可以用于消息的分类和路由，值则是具体的消息内容。Kafka 还会存储一些元数据信息，如消息的偏移量、时间戳等，用于消息的管理和消费。</td>
<td>存储消息队列相关信息、消息属性以及消息内容。消息属性包括消息的主题、标签、优先级等，消息内容则是具体的业务数据。<code v-pre>ConsumeQueue</code> 存储了消息在 <code v-pre>CommitLog</code> 中的索引信息，方便消费者快速定位和消费消息。</td>
</tr>
<tr>
<td>文件太大方案</td>
<td>采用多个固定大小（通常为 48MB）的 <code v-pre>redo log</code> 文件进行循环使用。当一个 <code v-pre>redo log</code> 文件写满后，会自动切换到下一个文件继续写入。旧的 <code v-pre>redo log</code> 文件在事务提交完成且不再需要用于恢复时会被新的日志覆盖，避免了文件无限增大的问题。</td>
<td>一方面设置键值对的保留时间，过期的键值对会被自动删除，减少 AOF 文件中的冗余数据。另一方面，采用日志压缩技术，将多个对同一个键的操作合并为一个最终状态的操作。例如，将多次对一个计数器键的 <code v-pre>INCR</code> 操作合并为一个 <code v-pre>SET</code> 操作，从而减小 AOF 文件的大小。</td>
<td>定期进行日志文件重写，将多个命令汇总为一个，减少文件中的冗余信息。同时，设置日志的保留时间，过期的日志文件会被自动清理，以控制日志文件的总体大小，避免占用过多的磁盘空间。</td>
<td>设置消息的过期时间，当消息超过设定的过期时间后，会被自动删除。这样可以控制 <code v-pre>CommitLog</code> 文件的大小，同时也能保证系统中只保留有效的消息数据。</td>
</tr>
<tr>
<td>恢复方式</td>
<td>在数据库启动时，将 <code v-pre>redo log</code> 加载到内存，从上次的检查点（checkpoint）开始，通过重放 <code v-pre>redo log</code> 中记录的未完成的修改操作，将数据库状态恢复到崩溃前的一致状态。检查点记录了数据库在某个时间点的一致性状态，从检查点开始重放可以减少不必要的操作，提高恢复效率。</td>
<td>在 Redis 启动时，将 AOF 数据加载到内存，按顺序重新执行 AOF 文件中的命令，将数据库状态恢复到断电前的状态。在重放过程中，如果遇到错误命令，Redis 会根据配置进行相应处理，如跳过错误命令或停止恢复过程。</td>
<td>生产者将消息写入磁盘后向客户端响应，消费者从磁盘读取日志数据进行消费。在 Kafka 集群中，如果某个节点出现故障，消费者可以从其他副本节点继续读取消息，保证数据的连续性和可用性。</td>
<td>消息写入磁盘的 <code v-pre>CommitLog</code> 后向生产者响应，消费者根据 <code v-pre>ConsumeQueue</code> 索引从 <code v-pre>CommitLog</code> 中读取消息进行消费。在 RocketMQ 集群中，当某个 Broker 节点出现故障时，通过 <code v-pre>CommitLog</code> 和 <code v-pre>ConsumeQueue</code> 的副本机制，消费者可以从其他正常节点继续消费消息，确保消息不丢失。</td>
</tr>
<tr>
<td>应用场景</td>
<td>适用于对数据一致性、事务完整性要求高的关系型数据存储场景，如电商订单系统、金融交易系统等。这些场景需要保证数据的准确和可靠，支持复杂的事务处理和 ACID 特性。</td>
<td>适用于对读写速度要求极高、数据量相对较小的场景，如缓存数据存储、分布式锁、计数器、消息队列等。Redis 的高性能内存操作和丰富的数据结构使其能够很好地满足这些场景的需求。</td>
<td>适用于大规模数据的实时处理和流式计算场景，如实时日志处理、实时监控数据采集等。Kafka 的高吞吐量和分布式特性使其能够处理大量的消息数据，并且支持多个消费者同时消费。</td>
<td>适用于对消息可靠性、事务性、顺序性有严格要求的分布式事务消息、可靠消息投递、高并发消息处理场景，如电商中的分布式事务订单处理、金融系统的资金转账通知等。</td>
</tr>
<tr>
<td>性能特点</td>
<td>支持复杂的事务处理和 ACID 特性，保证数据的一致性和完整性，但写入性能相对较低，尤其是在高并发事务场景下。因为每次事务操作都需要写入 <code v-pre>redo log</code>，会有一定的磁盘 I/O 开销。</td>
<td>读写速度极快，基于内存操作，支持多种数据结构，能应对高并发的读写请求。但数据量过大时内存占用较高，AOF 持久化会带来一定的磁盘 I/O 开销，影响写入性能，尤其是在使用 <code v-pre>always</code> 同步策略时。</td>
<td>具有高吞吐量，能够处理大量的消息数据，适合分布式、高并发的场景。但消息的处理延迟相对较高，因为消息需要先写入磁盘，然后再由消费者读取。</td>
<td>具有高可靠性，保证消息不丢失、不重复，支持事务消息和顺序消息。性能较高，在高并发场景下仍能保持稳定的消息处理能力，通过顺序写入 <code v-pre>CommitLog</code> 和高效的 <code v-pre>ConsumeQueue</code> 索引机制提高了读写性能。</td>
</tr>
<tr>
<td>集群部署方式</td>
<td>常见的有主从复制、读写分离集群，通过复制机制实现数据同步，提升读取性能和数据冗余备份；也可采用 Galera Cluster 等多主集群，实现多节点同时读写，提高系统的并发处理能力。</td>
<td>Redis Cluster 集群通过分片机制将数据分布在多个节点上，实现高可用和水平扩展；哨兵模式用于监控主节点状态，在主节点故障时自动进行故障转移，保证系统的可用性。</td>
<td>采用多节点集群，通过分区和副本机制实现高可用和负载均衡。每个分区可以分布在不同的节点上，提高数据的可靠性和读写性能，多个副本保证了数据的冗余和容错能力。</td>
<td>NameServer 集群负责管理 Broker 节点信息和路由信息，Broker 集群负责存储和处理消息，通过多 Master 多 Slave 模式实现高可用和数据冗余。消费者可以根据 NameServer 提供的路由信息从 Broker 节点消费消息。</td>
</tr>
</tbody>
</table>
</div></template>


