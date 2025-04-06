<template><div><h2 id="一、优化方法" tabindex="-1"><a class="header-anchor" href="#一、优化方法" aria-hidden="true">#</a> 一、优化方法</h2>
<h3 id="_1-1-sql优化" tabindex="-1"><a class="header-anchor" href="#_1-1-sql优化" aria-hidden="true">#</a> 1.1. sql优化</h3>
<h4 id="_1-1-1-索引优化" tabindex="-1"><a class="header-anchor" href="#_1-1-1-索引优化" aria-hidden="true">#</a> 1.1.1 索引优化</h4>
<ol>
<li>重复索引: MySQL需要单独维护重复的索引，并且优化器在优化查询的时候也需要逐个地进行考虑，这会影响性能,建议删除多余索引</li>
<li>联合索引符合最左原则: key index(a,b,c)相当于创建了三个索引a,ab,abc。不支持bc索引</li>
<li>索引失效场景
<ul>
<li>索引不会包含有NULL值的列: 只要列中包含有NULL值都将不会被包含在索引中，复合索引中只要有一列含有NULL值，那么这一列对于此复合索引就是无效的。所以我们在数据库设计时不要让字段的默认值为NULL</li>
<li>条件中有or: 要想使用or，又想让索引生效，只能将or条件中的每个列都加上索引</li>
<li>like查询是以%开头</li>
<li>存在索引列的数据类型隐形转换: 如列类型是字符串，那一定要在条件中将数据使用引号引用起来,否则不使用索引</li>
<li>where 子句里对索引列上有数学运算，用不上索引</li>
<li>where 子句里对有索引列使用函数</li>
<li>数据量极少: 如果mysql估计使用全表扫描要比使用索引快</li>
<li>Join的字段类型不相同: 如果你要把DECIMAL字段和一个INT字段Join在一起，MySQL就无法使用它们的索引。</li>
</ul>
</li>
<li>不推荐使用索引
<ul>
<li>数据唯一性差（一个字段的取值只有几种时）的字段不要使用索引</li>
<li>频繁更新的字段不要使用索引</li>
<li>字段不在where语句出现时不要添加索引,如果where后含IS NULL /IS NOT NULL/ like ‘%输入符%’等条件，不建议使用索引</li>
<li>where 子句里对索引列使用不等于（&lt;&gt;），使用索引效果一般</li>
</ul>
</li>
</ol>
<h4 id="_1-1-2-慢查询优化" tabindex="-1"><a class="header-anchor" href="#_1-1-2-慢查询优化" aria-hidden="true">#</a> 1.1.2 慢查询优化</h4>
<p>通过记录慢查询日志，找到查询慢的sql进行优化(增加索引等)</p>
<div class="language-mysql line-numbers-mode" data-ext="mysql"><pre v-pre class="language-mysql"><code>-- 慢查询报表生成工具
pt-query-digest slow-log &gt; text.log
-- 索引维护工具
pt-duplicate-key-checker  -u root -p '123456'
-- 查询不使用的索引
pt-index-usage -uroot -p '123456' mysql-slow.log
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_1-1-3-语句优化" tabindex="-1"><a class="header-anchor" href="#_1-1-3-语句优化" aria-hidden="true">#</a> 1.1.3 语句优化</h4>
<ul>
<li>避免 SELECT *，(1)，读出越多的数据，那么查询就会变得越慢。(2)，加网络传输的负载</li>
<li>不使用ORDER BY RAND()，MySQL会去执行RAND()函数（很耗CPU时间），而且这是为了每一行记录去记行，然后再对其排序</li>
<li>使用ENUM而不是VARCHAR： ENUM保存的是TINYINT，但其外表上显示为字符串。这样一来，用这个字段来做一些选项列表变得相当的完美。如果你有一个字段，比如“性别”，“国家”，“民族”，“状态”或“部门”，你知道这些字段的取值是有限而且固定的，那么，你应该使用ENUM而不是VARCHAR</li>
<li>拆分大的DELETE或INSERT语句： DELETE和INSERT会进行锁表，如果生产环境操作的话，可能会造成服务无法使用的情况。建议使用limit 1000循环删除数据，删除的时候也sleep一下。</li>
<li>当只需要一条数据时使用<strong>LIMIT 1</strong>：这样MySQL数据库引擎会在找到一条数据后停止搜索，而不是继续往后查少下一条符合记录的数据</li>
</ul>
<h4 id="_1-1-4-explain" tabindex="-1"><a class="header-anchor" href="#_1-1-4-explain" aria-hidden="true">#</a> 1.1.4 <strong>EXPLAIN</strong></h4>
<p>explain不会考虑的情况: 触发器、存储过程的信息或用户自定义函数对查询的影响情况、各种Cache、显示MySQL在执行查询时所作的优化工作、部分统计信息是估算的，并非精确值、只能解释SELECT操作，其他操作要重写为SELECT后查看执行计划</p>
<div class="language-mysql line-numbers-mode" data-ext="mysql"><pre v-pre class="language-mysql"><code>-- mysql执行计划
mysql&gt; explain select * from servers;
+----+-------------+---------+------+---------------+------+---------+------+------+-------+
| id | select_type | table   | type | possible_keys | key  | key_len | ref  | rows | Extra |
+----+-------------+---------+------+---------------+------+---------+------+------+-------+
|  1 | SIMPLE      | servers | ALL  | NULL          | NULL | NULL    | NULL |    1 | NULL  |
+----+-------------+---------+------+---------------+------+---------+------+------+-------+
1 row in set (0.03 sec)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>
<p>id: 执行编号，标识select所属的行。如果在语句中没子查询或关联查询，只有唯一的select，每行都将显示1。否则，内层的select语句一般会顺序编号，对应于其在原始语句中的位置</p>
</li>
<li>
<p>select_type: 显示本行是简单或复杂select。</p>
<table>
<thead>
<tr>
<th>查询类型</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td>SIMPLE</td>
<td>简单SELECT,不使用UNION或子查询等</td>
</tr>
<tr>
<td>PRIMARY</td>
<td>查询中若包含任何复杂的子部分,最外层的select被标记为PRIMARY</td>
</tr>
<tr>
<td>UNION</td>
<td>UNION中的第二个或后面的SELECT语句</td>
</tr>
<tr>
<td>DEPENDENT UNION</td>
<td>UNION中的第二个或后面的SELECT语句，取决于外面的查询</td>
</tr>
<tr>
<td>UNION RESULT</td>
<td>UNION的结果</td>
</tr>
<tr>
<td>SUBQUERY</td>
<td>子查询中的第一个SELECT</td>
</tr>
<tr>
<td>DEPENDENT SUBQUERY</td>
<td>子查询中的第一个SELECT，取决于外面的查询</td>
</tr>
<tr>
<td>DERIVED</td>
<td>派生表的SELECT, FROM子句的子查询</td>
</tr>
<tr>
<td>UNCACHEABLE SUBQUERY</td>
<td>一个子查询的结果不能被缓存，必须重新评估外链接的第一行</td>
</tr>
</tbody>
</table>
</li>
<li>
<p>table: 显示这一行的数据是关于哪张表的，有时不是真实的表名字,看到的是derivedx(x为数字，应该是第几步的意思)</p>
</li>
<li>
<p>type: 数据访问/读取操作类型(<strong>从上到下，性能从差到好</strong>)</p>
<p><code v-pre>const</code>（通过唯一索引或者主键直接定位一条记录）、<code v-pre>eq_ref</code>（对于前面表中的每一行，在当前表中通过唯一索引查找一行匹配数据）、<code v-pre>ref</code>（通过普通索引查找数据，可能返回多条匹配记录）、<code v-pre>range</code>（对索引进行范围查询，如使用<code v-pre>BETWEEN</code>、<code v-pre>&gt;</code>、<code v-pre>&lt;</code>等操作符）、<code v-pre>index</code>（全索引扫描，遍历整个索引来查找匹配数据）、<code v-pre>ALL</code>（全表扫描，性能最差，需要遍历整个表来查找数据）</p>
<table>
<thead>
<tr>
<th>类型</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td>ALL</td>
<td>Full Table Scan， MySQL将遍历全表以找到匹配的行</td>
</tr>
<tr>
<td>index</td>
<td>Full Index Scan，index与ALL区别为index类型只遍历索引树</td>
</tr>
<tr>
<td>range</td>
<td>只检索给定范围的行，使用一个索引来选择行</td>
</tr>
<tr>
<td>ref</td>
<td>表示上述表的连接匹配条件，即哪些列或常量被用于查找索引列上的值</td>
</tr>
<tr>
<td>eq_ref</td>
<td>使用的索引是唯一索引，对于每个索引键值，表中只有一条记录匹配，简单来说，就是多表连接中使用primary key或者 unique key作为关联条件</td>
</tr>
<tr>
<td>const、system</td>
<td>当MySQL对查询某部分进行优化，并转换为一个常量时，使用这些类型访问。如将主键置于where列表中，MySQL就能将该查询转换为一个常量,system是const类型的特例，当查询的表只有一行的情况下，使用system</td>
</tr>
<tr>
<td>NULL</td>
<td>MySQL在优化过程中分解语句，执行时甚至不用访问表或索引，例如从一个索引列里选取最小值可以通过单独索引查找完成</td>
</tr>
</tbody>
</table>
</li>
<li>
<p>possible_keys: MySQL能使用哪个索引在表中找到记录，查询涉及到的字段上若存在索引，则该索引将被列出，但不一定被查询使用</p>
</li>
<li>
<p>key: 显示mysql决定采用哪个索引来优化查询</p>
</li>
<li>
<p>key_len: 表示索引中使用的字节数，可通过该列计算查询中使用的索引的长度（key_len显示的值为索引字段的最大可能长度，并非实际使用长度，即key_len是根据表定义计算而得，不是通过表内检索出的）</p>
</li>
<li>
<p>ref: 显示了之前的表在key列记录的索引中查找值所用的列或常量</p>
</li>
<li>
<p>rows: 为了找到所需的行而需要读取的行数，估算值，不精确。通过把所有rows列值相乘，可粗略估算整个查询会检查的行数</p>
</li>
<li>
<p>Extra: 包含MySQL解决查询的详细信息</p>
<ul>
<li>
<p>Using where:列数据是从仅仅使用了索引中的信息而没有读取实际的行动的表返回的，这发生在对表的全部的请求列都是同一个索引的部分的时候，表示mysql服务器将在存储引擎检索行后再进行过滤</p>
</li>
<li>
<p>Using temporary：表示MySQL需要使用临时表来存储结果集，常见于排序和分组查询</p>
</li>
<li>
<p>Using filesort：MySQL中无法利用索引完成的排序操作称为“文件排序”</p>
</li>
<li>
<p>Using join buffer：改值强调了在获取连接条件时没有使用索引，并且需要连接缓冲区来存储中间结果。如果出现了这个值，那应该注意，根据查询的具体情况可能需要添加索引来改进能。</p>
</li>
<li>
<p>Impossible where：这个值强调了where语句会导致没有符合条件的行。</p>
</li>
<li>
<p>Select tables optimized away：这个值意味着仅通过使用索引，优化器可能仅从聚合函数结果中返回一行</p>
</li>
</ul>
</li>
</ul>
<h3 id="_1-2-表结构优化" tabindex="-1"><a class="header-anchor" href="#_1-2-表结构优化" aria-hidden="true">#</a> 1.2. 表结构优化</h3>
<ol>
<li>类型选择: 尽量设置小的类型, 数据库90%以上的时间都是在IO上，尽量少的IO读写就会提高数据库性能。时间类型尽量使用TIMESTAMP类型，只需要精确到某一天的数据类型，建议使用DATE(3个字节)类型 。数字类型尽量不要使用DOUBLE(长度问题和精度问题)。字符串类型尽量不要用TEXT类型，建议使用 CHAR 类型，不定长字段尽量使用 VARCHAR。反对在数据库中使用 LOB 类型数据，应该使用其他工具存储大数据。</li>
<li>能增加not null约束的一定要加上：NULL 类型比较特殊，SQL 难优化。虽然 MySQL NULL类型和 Oracle 的NULL 有差异，会进入索引中，但如果是一个组合索引，那么这个NULL 类型的字段会极大影响整个索引的效率。此外，NULL 在索引中的处理也是特殊的，也会占用额外的存放空间</li>
<li>日期类型或者存储ip字段优化：把IP地址存成UNSIGNED INT</li>
</ol>
<h3 id="_1-3-服务器优化" tabindex="-1"><a class="header-anchor" href="#_1-3-服务器优化" aria-hidden="true">#</a> 1.3 服务器优化</h3>
<ol>
<li>
<p>mysql配置优化</p>
<ul>
<li><strong>存储引擎</strong>: InnoDB(<strong>支持事务，行锁,支持外键</strong>)，MyISAM(<strong>表级锁、不支持事务和全文索引</strong>)</li>
<li><strong>back_log</strong>:  MySql的连接数据达到max_connections时，新来的请求将会被存在堆栈中，
以等待某一连接释放资源，该堆栈的数量即back_log，如果等待连接的数量超过back_log，
将不不被授予连接资源。查看mysql 当前系统默认back_log值，
命令：show variables like 'back_log’;</li>
<li><strong>wait_timeout</strong>: 可以减少wait的连接数(wait_timeout=1800) show variables like 'wait_timeout';</li>
<li><strong>max_connections</strong>: 最大链接数，show variables like 'max_connections';</li>
<li><strong>thread_concurrency</strong>: 目前默认的8，可以修改为thread_concurrency=64，thread_concurrency应设为CPU核数的2倍，比如有1个双核的CPU，那thread_concurrency 的应该为4，2个双核的cpu thread_concurrency的值应为8。show variables like 'thread_concurrency';</li>
<li><strong>max_connect_errors</strong>: 这个参数负责阻止客户端尝试暴力破解密码，当某台主机错误连接次数达到该值时，该主机无法再尝试登陆。解决方法是重启mysql，或者把该值改大一点</li>
<li><strong>query_cache_type</strong>: query_cache_type=1 开启缓存，显示为ON。大多数的MySQL服务器都开启了查询缓存。利用变量代替函数去执行sql，CURDATE(),NOW(),RAND()这些时间函数都不会开启查询缓存。</li>
</ul>
</li>
<li>
<p>硬件优化</p>
<ol>
<li>配置较大的内存。足够大的内存,是提高 MYSQL数据库性能的方法之一。内存的速度 比磁盘I/O快得多,可以通过增加系统的缓冲区容量,使数据在内存停留的时间更长,以减少磁盘I/O。</li>
<li>配置高速磁盘系统,以减少读盘的等待时间,提高响应速度</li>
<li>合理分布磁盘I/O,把磁盘IO分散在多个设备上,以减少资源竞争,提高并行操作能力</li>
<li>配置多处理器, MYSQL是多线程的数据库,多处理器可同时执行多个线程。</li>
<li>cpu并不是越多越好,mysql5.5是的服务器不要超过32核,偏向选择单核频率更快的cpu;</li>
</ol>
</li>
</ol>
<h2 id="二、常用sql" tabindex="-1"><a class="header-anchor" href="#二、常用sql" aria-hidden="true">#</a> 二、常用SQL</h2>
<div class="language-mysql line-numbers-mode" data-ext="mysql"><pre v-pre class="language-mysql"><code>-- 查看mysql锁表信息
show status like '%lock%';
show OPEN TABLES where In_use &gt; 0;
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
-- 增加唯一索引
alter table tablename add unique index uniq_name(filedName);

-- 修改唯一索引
alter table tablename drop key uniq_name;
alter table tablename add unique index uniq_name(filedName);

-- 在MYSQL里，不能先select一个表的记录，在按此条件进行更新和删除同一个表的记录。解决办法是，将select得到的结果，再通过中间表select一遍
update tablename set status = 1 where id in (select id from (select id from tablename where name &lt;&gt; 1));

-- 增加字段
alter table tablename add column `fieldName` varcher(200) null comment '字段名称' after `id`;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="三、库操作sql" tabindex="-1"><a class="header-anchor" href="#三、库操作sql" aria-hidden="true">#</a> 三、库操作SQL</h2>
<div class="language-mysql line-numbers-mode" data-ext="mysql"><pre v-pre class="language-mysql"><code>-- 查看当前数据库
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="四、事务" tabindex="-1"><a class="header-anchor" href="#四、事务" aria-hidden="true">#</a> 四、事务</h2>
<p>事务的隔离级别: read uncommitted, read committed, repeatable read, serialize.</p>
<table>
<thead>
<tr>
<th>隔离级别</th>
<th>脏读</th>
<th>不可重复读</th>
<th>幻读</th>
</tr>
</thead>
<tbody>
<tr>
<td>读未提交</td>
<td>true</td>
<td>true</td>
<td>true</td>
</tr>
<tr>
<td>读已提交</td>
<td></td>
<td>true</td>
<td>true</td>
</tr>
<tr>
<td>可重复读</td>
<td></td>
<td></td>
<td>true</td>
</tr>
<tr>
<td>可序列化</td>
<td></td>
<td></td>
<td></td>
</tr>
</tbody>
</table>
<p>read uncommitted：可以读未提交的数据。</p>
<p>脏读: 事务A执行了更新语句未提交事务,事务B获取数据的时候将未提交的数据获取了。之后事务A回滚了，那事务B就读到了脏数据</p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">set</span> <span class="token keyword">session</span> <span class="token keyword">transaction</span> <span class="token keyword">isolation</span> <span class="token keyword">level</span> <span class="token keyword">read</span> <span class="token keyword">uncommitted</span><span class="token punctuation">;</span>
A:<span class="token keyword">start</span> <span class="token keyword">transaction</span><span class="token punctuation">;</span>
A:<span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> psn<span class="token punctuation">;</span>
B:<span class="token keyword">start</span> <span class="token keyword">transaction</span><span class="token punctuation">;</span>
B:<span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> psn<span class="token punctuation">;</span>
A:<span class="token keyword">update</span> psn <span class="token keyword">set</span> name<span class="token operator">=</span><span class="token string">'msb'</span><span class="token punctuation">;</span>
A:selecet <span class="token operator">*</span> <span class="token keyword">from</span> psn
<span class="token comment">-- 读取的结果msb。产生脏读，因为A事务并没有commit，读取到了不存在的数据</span>
B:<span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> psn<span class="token punctuation">;</span>  
A:<span class="token keyword">commit</span><span class="token punctuation">;</span>
<span class="token comment">-- 读取的数据是msb,因为A事务已经commit，数据永久的被修改</span>
B:<span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> psn<span class="token punctuation">;</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>read committed: 可以读提交后的数据。</p>
<p>不可重复读: 事务A修改数据后未提交，事务B事务开启进行数据查询，事务A提交事务，事务B再次查询则事务B出现了两次读取数据不一致的情况</p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">set</span> <span class="token keyword">session</span> <span class="token keyword">transaction</span> <span class="token keyword">isolation</span> <span class="token keyword">level</span> <span class="token keyword">read</span> <span class="token keyword">committed</span><span class="token punctuation">;</span>
A:<span class="token keyword">start</span> <span class="token keyword">transaction</span><span class="token punctuation">;</span>
A:<span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> psn<span class="token punctuation">;</span>
B:<span class="token keyword">start</span> <span class="token keyword">transaction</span><span class="token punctuation">;</span>
B:<span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> psn<span class="token punctuation">;</span>
<span class="token comment">-- 执行到此处的时候发现，两个窗口读取的数据是一致的</span>
A:<span class="token keyword">update</span> psn <span class="token keyword">set</span> name <span class="token operator">=</span><span class="token string">'zhangsan'</span> <span class="token keyword">where</span> id <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
A:<span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> psn<span class="token punctuation">;</span>
B:<span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> psn<span class="token punctuation">;</span>
<span class="token comment">-- 执行到此处发现两个窗口读取的数据不一致，B窗口中读取不到更新的数据</span>
A:<span class="token keyword">commit</span><span class="token punctuation">;</span>
<span class="token comment">-- 读取到更新的数据(事务B第二次select和本次select的值不一致，则不可重复读)</span>
A:<span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> psn<span class="token punctuation">;</span>
<span class="token comment">-- 也读取到更新的数据</span>
B:<span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> psn<span class="token punctuation">;</span>
<span class="token comment">-- 发现同一个事务中多次读取数据出现不一致的情况</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>repeatable read(msql默认隔离级别): 可以重复读。</p>
<p>幻读:事务B查询数据后，事务A插入数据，之后事务B再次获取数据，导致事务B两次获取数据的情况不一样就像出现了幻觉一样。</p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">set</span> <span class="token keyword">session</span> <span class="token keyword">transaction</span> <span class="token keyword">isolation</span> <span class="token keyword">level</span> <span class="token keyword">repeatable</span> <span class="token keyword">read</span><span class="token punctuation">;</span>
A:<span class="token keyword">start</span> <span class="token keyword">transaction</span><span class="token punctuation">;</span>
A:<span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> psn<span class="token punctuation">;</span>
B:<span class="token keyword">start</span> <span class="token keyword">transaction</span><span class="token punctuation">;</span>
B:<span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> psn<span class="token punctuation">;</span>
<span class="token comment">-- 此时两个窗口读取的数据是一致的</span>
A:<span class="token keyword">insert</span> <span class="token keyword">into</span> psn <span class="token keyword">values</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">,</span><span class="token string">'sisi'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
A:<span class="token keyword">commit</span><span class="token punctuation">;</span>
<span class="token comment">-- 读取到添加的数据</span>
A:<span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> psn<span class="token punctuation">;</span>
<span class="token comment">-- 读取不到添加的数据</span>
B:<span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> psn<span class="token punctuation">;</span>
<span class="token comment">-- 报错，无法插入数据</span>
B:<span class="token keyword">insert</span> <span class="token keyword">into</span> psn <span class="token keyword">values</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">,</span><span class="token string">'sisi'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">-- 此时发现读取不到数据，但是在插入的时候不允许插入，出现了幻读，设置更高级别的隔离级别即可解决</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="六、建表规范" tabindex="-1"><a class="header-anchor" href="#六、建表规范" aria-hidden="true">#</a> 六、建表规范</h2>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>    -- Normal Format, NF
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="七、sql实战" tabindex="-1"><a class="header-anchor" href="#七、sql实战" aria-hidden="true">#</a> 七、SQL实战</h2>
<ol>
<li>
<p>有个部门表如下，写出不同部门之间平均工资高于2000的部门</p>
<p><img src="https://gaoqisen.github.io/GraphBed/202007/20200701153343.png" alt="https://gaoqisen.github.io/GraphBed/202007/20200701153343.png"></p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">select</span> <span class="token keyword">type</span><span class="token punctuation">,</span> <span class="token function">avg</span><span class="token punctuation">(</span>salary<span class="token punctuation">)</span> sa <span class="token keyword">from</span> dept <span class="token keyword">group</span> <span class="token keyword">by</span> <span class="token keyword">type</span> <span class="token keyword">having</span> sa <span class="token operator">></span> <span class="token number">2000</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>编写一个 SQL 查询，满足条件：无论 person 是否有地址信息，都需要基于上述两表提供 person 的以下信息：FirstName, LastName, City, State</p>
<div class="language-mysql line-numbers-mode" data-ext="mysql"><pre v-pre class="language-mysql"><code># Person
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
select Person.FirstName, Person.LastName, Address.City, Address.State from Person left join Address on Person.PersonId = Address.PersonId
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<h2 id="八、锁" tabindex="-1"><a class="header-anchor" href="#八、锁" aria-hidden="true">#</a> 八、锁</h2>
<h3 id="_8-1-悲观锁" tabindex="-1"><a class="header-anchor" href="#_8-1-悲观锁" aria-hidden="true">#</a> 8.1 悲观锁</h3>
<p>认为别的线程会修改值。在操作数据的时候，直接给数据加锁不让其他的线程修改，当前线程修改成功之后其他线程才可以修改。实现方式就是加锁(如: Java的synchronized)。</p>
<h3 id="_8-2-乐观锁" tabindex="-1"><a class="header-anchor" href="#_8-2-乐观锁" aria-hidden="true">#</a> 8.2 乐观锁</h3>
<p>认为别的线程不会修改值。在操作数据的时候不对数据上锁，执行操作的时候判断一下数据是否被修改，如果被修改就放弃操作。实现方式有两种，CAS和版本号机制。</p>
<ul>
<li>
<p>CAS(Compare And Swap)</p>
<p>在修改的时候判断查出来的数据是否被修改过，如果没有则进行修改，如果被修改了可以进行自旋操作。这种情况有可能出现ABA问题(多线程的时候如果当前线程为A,线程B把num加1，线程C把num减1期间线程A查询出数据还未进行操作，当BC线程执行完成之后A线程在此执行的时候就会认为数据没有修改，但是实际上数据被修改过)，用版本号机制就不会出现这个问题。</p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token comment"># 查询产品数量和ID</span>
<span class="token keyword">select</span> num<span class="token punctuation">,</span>id <span class="token keyword">from</span> product<span class="token punctuation">;</span>
<span class="token comment"># subNum为查出来的num-1, id和num都为查出来的数据。</span>
<span class="token keyword">update</span> product <span class="token keyword">set</span> num <span class="token operator">=</span> <span class="token comment">#{subNum} where id = #{id} and num = #{num}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当竞争不激烈 (出现并发冲突的概率小)时，乐观锁更有优势，因为悲观锁会锁住代码块或数据，其他线程无法同时访问，影响并发，而且加锁和释放锁都需要消耗额外的资源。</p>
</li>
<li>
<p>版本号机制</p>
<p>在字段中增加一个版本号用来判断当前数据是否被修改过</p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token comment"># 查询产品数量、ID和版本号</span>
<span class="token keyword">select</span> num<span class="token punctuation">,</span>id<span class="token punctuation">,</span>version <span class="token keyword">from</span> product<span class="token punctuation">;</span>
<span class="token comment"># 通过版本号判断数据是否被修改,subNum是通过计算过后的库存数量, id和version都为查出来的数据</span>
<span class="token keyword">update</span> product <span class="token keyword">set</span> num <span class="token operator">=</span> <span class="token comment">#{subNum}, version = version + 1 where id = #{id} and version = #{version}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当竞争激烈(出现并发冲突的概率大)时，悲观锁更有优势，因为乐观锁在执行更新时频繁失败，需要不断重试，浪费CPU资源。</p>
</li>
</ul>
<h2 id="九、存储过程" tabindex="-1"><a class="header-anchor" href="#九、存储过程" aria-hidden="true">#</a> 九、存储过程</h2>
<p>启动服务器后或者第一次执行后(可以设置)就可以把存储过程加载到高速缓存中,这样以后调用起来就不用再通过编译，执行效率当然就高。另外执行存储过程只需要传递几个参数，用语句就需要传递整个sql语句，有效减少网络数据的传递.</p>
<h3 id="_9-1-存储过程" tabindex="-1"><a class="header-anchor" href="#_9-1-存储过程" aria-hidden="true">#</a> 9.1 存储过程</h3>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token comment">-- 创建测试表</span>
<span class="token keyword">create</span> <span class="token keyword">table</span> admin_user_1
<span class="token punctuation">(</span>
    id   <span class="token keyword">int</span> <span class="token boolean">null</span><span class="token punctuation">,</span>
    role <span class="token keyword">int</span> <span class="token boolean">null</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">-- 查看视图</span>
<span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">from</span> information_schema<span class="token punctuation">.</span>VIEWS<span class="token punctuation">;</span>
<span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">from</span> information_schema<span class="token punctuation">.</span><span class="token keyword">TABLES</span><span class="token punctuation">;</span>
<span class="token keyword">show</span> <span class="token keyword">procedure</span> <span class="token keyword">status</span> <span class="token keyword">where</span> db<span class="token operator">=</span><span class="token string">'gqs_1'</span><span class="token punctuation">;</span>
<span class="token keyword">show</span> <span class="token keyword">create</span> <span class="token keyword">procedure</span> gqs_1<span class="token punctuation">.</span>test<span class="token punctuation">;</span>
<span class="token keyword">DROP</span> <span class="token keyword">PROCEDURE</span> gqs_1<span class="token punctuation">.</span>test<span class="token punctuation">;</span>
<span class="token comment">-- 存储过程 创建一个通过ID删除数据的过程</span>
<span class="token keyword">CREATE</span> <span class="token keyword">PROCEDURE</span> delete_matches<span class="token punctuation">(</span><span class="token operator">IN</span> a_id <span class="token keyword">INTEGER</span><span class="token punctuation">)</span>
TEST1:<span class="token keyword">BEGIN</span>
    <span class="token keyword">DELETE</span> <span class="token keyword">FROM</span> admin_user_0
    <span class="token keyword">WHERE</span> id <span class="token operator">=</span> a_id<span class="token punctuation">;</span>
<span class="token keyword">END</span> TEST1<span class="token punctuation">;</span>
<span class="token comment">-- 查看存储过程</span>
<span class="token keyword">show</span> <span class="token keyword">create</span> <span class="token keyword">procedure</span> delete_matches<span class="token punctuation">;</span>
<span class="token comment">-- 调用过程</span>
<span class="token keyword">call</span> delete_matches<span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">-- 定义变量1、用户变量名一般以@开头。2、滥用用户变量会导致程序难以理解及管理</span>
<span class="token keyword">select</span> <span class="token string">'123'</span> <span class="token keyword">into</span> <span class="token variable">@a</span><span class="token punctuation">;</span>
<span class="token keyword">select</span> <span class="token variable">@a</span><span class="token punctuation">;</span>
<span class="token keyword">set</span> <span class="token variable">@a</span> <span class="token operator">=</span> <span class="token string">'456'</span><span class="token punctuation">;</span>
<span class="token keyword">set</span> <span class="token variable">@a</span> <span class="token operator">=</span> <span class="token number">1</span><span class="token operator">+</span><span class="token number">1</span><span class="token operator">+</span><span class="token number">3</span><span class="token punctuation">;</span>
<span class="token comment">-- 在存储过程中使用用户变量</span>
<span class="token keyword">CREATE</span> <span class="token keyword">PROCEDURE</span> test<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">select</span> concat<span class="token punctuation">(</span><span class="token variable">@add</span><span class="token punctuation">,</span> <span class="token string">'success'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">set</span> <span class="token variable">@add</span> <span class="token operator">=</span> <span class="token string">'ok'</span><span class="token punctuation">;</span>
<span class="token keyword">call</span> test<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">-- if else</span>
<span class="token keyword">create</span> <span class="token keyword">procedure</span> test1<span class="token punctuation">(</span><span class="token operator">in</span> args <span class="token keyword">int</span><span class="token punctuation">)</span>
<span class="token keyword">begin</span>
    <span class="token keyword">declare</span> a <span class="token keyword">int</span><span class="token punctuation">;</span>
    <span class="token keyword">set</span> a <span class="token operator">=</span> args <span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> a <span class="token operator">=</span> <span class="token number">2</span> <span class="token keyword">then</span>
        <span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> gqs_1<span class="token punctuation">.</span>admin_user_1 <span class="token punctuation">(</span>id<span class="token punctuation">,</span> role<span class="token punctuation">)</span> <span class="token keyword">VALUES</span> <span class="token punctuation">(</span><span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">end</span> <span class="token keyword">if</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> args <span class="token operator">=</span> <span class="token number">0</span> <span class="token keyword">then</span>
        <span class="token keyword">update</span> gqs_1<span class="token punctuation">.</span>admin_user_1 <span class="token keyword">set</span> role  <span class="token operator">=</span> <span class="token number">6</span> <span class="token keyword">where</span> id <span class="token operator">=</span> <span class="token number">8</span><span class="token punctuation">;</span>
        <span class="token keyword">else</span>
        <span class="token keyword">update</span> gqs_1<span class="token punctuation">.</span>admin_user_1 <span class="token keyword">set</span> role  <span class="token operator">=</span> <span class="token number">5</span> <span class="token keyword">where</span> id <span class="token operator">=</span> <span class="token number">8</span><span class="token punctuation">;</span>
    <span class="token keyword">end</span> <span class="token keyword">if</span><span class="token punctuation">;</span>
<span class="token keyword">end</span><span class="token punctuation">;</span>
<span class="token keyword">call</span> test1<span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">-- case</span>
<span class="token keyword">create</span> <span class="token keyword">procedure</span> test2<span class="token punctuation">(</span><span class="token operator">in</span> args <span class="token keyword">int</span><span class="token punctuation">)</span>
<span class="token keyword">begin</span>
    <span class="token keyword">declare</span> a <span class="token keyword">int</span><span class="token punctuation">;</span>
    <span class="token keyword">set</span> a <span class="token operator">=</span> args <span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token keyword">case</span> a
        <span class="token keyword">when</span> <span class="token number">0</span> <span class="token keyword">then</span>
            <span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> gqs_1<span class="token punctuation">.</span>admin_user_1 <span class="token punctuation">(</span>id<span class="token punctuation">,</span> role<span class="token punctuation">)</span> <span class="token keyword">VALUES</span> <span class="token punctuation">(</span><span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">when</span> <span class="token number">1</span> <span class="token keyword">then</span>
            <span class="token keyword">update</span> gqs_1<span class="token punctuation">.</span>admin_user_1 <span class="token keyword">set</span> role  <span class="token operator">=</span> <span class="token number">8</span> <span class="token keyword">where</span> id <span class="token operator">=</span> <span class="token number">8</span><span class="token punctuation">;</span>
        <span class="token keyword">else</span>
            <span class="token keyword">update</span> gqs_1<span class="token punctuation">.</span>admin_user_1 <span class="token keyword">set</span> role  <span class="token operator">=</span> <span class="token number">5</span> <span class="token keyword">where</span> id <span class="token operator">=</span> <span class="token number">8</span><span class="token punctuation">;</span>
    <span class="token keyword">end</span> <span class="token keyword">case</span><span class="token punctuation">;</span>
<span class="token keyword">end</span><span class="token punctuation">;</span>
<span class="token keyword">call</span> test1<span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">-- for 在操作钱检查结果</span>
<span class="token keyword">create</span> <span class="token keyword">procedure</span> test3<span class="token punctuation">(</span><span class="token operator">in</span> args <span class="token keyword">int</span><span class="token punctuation">)</span>
<span class="token keyword">begin</span>
    <span class="token keyword">declare</span> a <span class="token keyword">int</span><span class="token punctuation">;</span>
    <span class="token keyword">set</span> a <span class="token operator">=</span> args <span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token keyword">while</span> a <span class="token operator">&lt;</span><span class="token number">6</span> <span class="token keyword">do</span>
        <span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> gqs_1<span class="token punctuation">.</span>admin_user_1 <span class="token punctuation">(</span>id<span class="token punctuation">,</span> role<span class="token punctuation">)</span> <span class="token keyword">VALUES</span> <span class="token punctuation">(</span>a<span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">set</span> a<span class="token operator">=</span>a<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token keyword">end</span> <span class="token keyword">while</span><span class="token punctuation">;</span>
<span class="token keyword">end</span><span class="token punctuation">;</span>
<span class="token keyword">call</span> test3<span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">-- repeat···· end repea  在操作后检查结果</span>
<span class="token keyword">create</span> <span class="token keyword">procedure</span> test4<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">begin</span>
    <span class="token keyword">declare</span> a <span class="token keyword">int</span><span class="token punctuation">;</span>
    <span class="token keyword">set</span> a <span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">repeat</span>
        <span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> gqs_1<span class="token punctuation">.</span>admin_user_1 <span class="token punctuation">(</span>id<span class="token punctuation">,</span> role<span class="token punctuation">)</span> <span class="token keyword">VALUES</span> <span class="token punctuation">(</span>a<span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">set</span> a<span class="token operator">=</span>a<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">;</span>
        until a <span class="token operator">>=</span> <span class="token number">5</span>
        <span class="token keyword">end</span> <span class="token keyword">repeat</span><span class="token punctuation">;</span>
<span class="token keyword">end</span><span class="token punctuation">;</span>
<span class="token keyword">call</span> test4<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">-- loop ·····endloop</span>
<span class="token keyword">create</span> <span class="token keyword">procedure</span> test5<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">begin</span>
    <span class="token keyword">declare</span> a <span class="token keyword">int</span><span class="token punctuation">;</span>
    <span class="token keyword">set</span> a <span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span>
    l:<span class="token keyword">loop</span>
        <span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> gqs_1<span class="token punctuation">.</span>admin_user_1 <span class="token punctuation">(</span>id<span class="token punctuation">,</span> role<span class="token punctuation">)</span> <span class="token keyword">VALUES</span> <span class="token punctuation">(</span>a<span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">set</span> a<span class="token operator">=</span>a<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> a <span class="token operator">>=</span><span class="token number">5</span> <span class="token keyword">then</span>
            <span class="token keyword">leave</span> l<span class="token punctuation">;</span>
        <span class="token keyword">end</span> <span class="token keyword">if</span><span class="token punctuation">;</span>
    <span class="token keyword">end</span> <span class="token keyword">loop</span><span class="token punctuation">;</span>
<span class="token keyword">end</span><span class="token punctuation">;</span>
<span class="token keyword">call</span> test5<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_9-2-事件调度器" tabindex="-1"><a class="header-anchor" href="#_9-2-事件调度器" aria-hidden="true">#</a> 9.2  事件调度器</h3>
<ol>
<li>语法</li>
</ol>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code> <span class="token comment">## []: 表示可选，[|]: 单选</span>
  <span class="token keyword">create</span>
   <span class="token punctuation">[</span><span class="token keyword">definer</span> <span class="token operator">=</span> { <span class="token keyword">user</span> <span class="token operator">|</span> <span class="token keyword">current_user</span> }<span class="token punctuation">]</span>  <span class="token comment">//  定义者</span>
   event
   <span class="token punctuation">[</span><span class="token keyword">if</span> <span class="token operator">not</span> <span class="token keyword">exists</span><span class="token punctuation">]</span>
   event_name  <span class="token comment">// 时间名</span>
   <span class="token keyword">on</span> schedule schedule   <span class="token comment">// 调度规则</span>
   <span class="token comment">## on schedule子句</span>
   <span class="token comment">## 1. at timestamp用于创建单次执行的事件，timestamp执行事件执行的时间(如果指定的时间是过去的时间，则会产生一个warning)，时间可以是具体的时间字符串或者是一个datetime类型的表达式(如current_timestamp)：</span>
   <span class="token comment">##   如果要指定将来某个时间，直接使用at timestamp，例：at '2017-08-08 08:08:08'；</span>
   <span class="token comment">##   如果要指定将来某个时间间隔，可利用interval关键字(interval关键字可以进行组合，at timestamp + INTERVAL 2 HOUR、 + INTERVAL 30 MINUTE)</span>
   <span class="token comment">## 2. every子句用于创建重复执行的事件，如果每分钟执行一次，则可以：EVERY 1 MINUTE。</span>
   <span class="token comment">##   当然，every子句可以指定一个开始事件和结束时间，通过STARTS和ENDS关键字来表示，具体语法与前面类似</span>
   <span class="token comment">##   例如：EVERY 12 HOUR STARTS CURRENT_TIMESTAMP + INTERVAL 30 MINUTE ENDS CURRENT_TIMESTAMP + INTERVAL 4 WEEK。</span>
   <span class="token punctuation">[</span><span class="token keyword">on</span> completion <span class="token punctuation">[</span><span class="token operator">not</span><span class="token punctuation">]</span> preserve<span class="token punctuation">]</span>  <span class="token comment">//注意特定时间执行的事件，如果设置了该参数，执行完毕后，事件将被删除，不想删除的话可以设置成on completion preserve</span>
   <span class="token punctuation">[</span><span class="token keyword">enable</span> <span class="token operator">|</span> <span class="token keyword">disable</span> <span class="token operator">|</span> <span class="token keyword">disable</span> <span class="token keyword">on</span> slave<span class="token punctuation">]</span>  <span class="token comment">// 系统将执行这个事件</span>
   <span class="token punctuation">[</span><span class="token keyword">comment</span> <span class="token string">'comment'</span><span class="token punctuation">]</span>  <span class="token comment">// 描述</span>
   <span class="token keyword">do</span> event_body<span class="token punctuation">;</span>  <span class="token comment">// 事件体，可以是单行 SQL 语法，或是 BEGIN……END 语句块</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2">
<li>例子</li>
</ol>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token comment">-- 查看事件调度器是否开启</span>
<span class="token keyword">SHOW</span> VARIABLES <span class="token operator">LIKE</span> <span class="token string">'event_scheduler'</span><span class="token punctuation">;</span>
<span class="token keyword">SELECT</span> @<span class="token variable">@event_scheduler</span><span class="token punctuation">;</span>
<span class="token comment">-- 开启事件触发器</span>
<span class="token keyword">SET</span> <span class="token keyword">GLOBAL</span> event_scheduler <span class="token operator">=</span> <span class="token keyword">ON</span><span class="token punctuation">;</span>
<span class="token comment">-- 创建一个事件，并调用存储过程</span>
<span class="token keyword">CREATE</span> <span class="token keyword">DEFINER</span><span class="token operator">=</span><span class="token identifier"><span class="token punctuation">`</span>root<span class="token punctuation">`</span></span><span class="token variable">@`localhost`</span> EVENT <span class="token identifier"><span class="token punctuation">`</span>test_sche_event<span class="token punctuation">`</span></span>
    <span class="token keyword">ON</span> SCHEDULE EVERY <span class="token number">5</span> <span class="token keyword">SECOND</span> STARTS <span class="token string">'2016-07-12 22:11:50'</span>
    <span class="token keyword">ON</span> COMPLETION <span class="token operator">NOT</span> PRESERVE <span class="token keyword">ENABLE</span>
    <span class="token keyword">DO</span> <span class="token keyword">CALL</span> <span class="token identifier"><span class="token punctuation">`</span>add<span class="token punctuation">`</span></span><span class="token punctuation">;</span>
<span class="token comment">-- 每秒插入一条数据</span>
<span class="token keyword">CREATE</span> EVENT e_test
    <span class="token keyword">ON</span> SCHEDULE EVERY <span class="token number">1</span> <span class="token keyword">SECOND</span>
    <span class="token keyword">DO</span> <span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> gqs_1<span class="token punctuation">.</span>admin_user_1 <span class="token punctuation">(</span>id<span class="token punctuation">,</span> role<span class="token punctuation">)</span> <span class="token keyword">VALUES</span> <span class="token punctuation">(</span><span class="token number">8</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">-- 每秒插入一条数据通过存储过程</span>
<span class="token keyword">CREATE</span> EVENT e_test1
    <span class="token keyword">ON</span> SCHEDULE EVERY <span class="token number">1</span> <span class="token keyword">SECOND</span>
    <span class="token keyword">DO</span> <span class="token keyword">CALL</span> test<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">-- 临时关闭事件</span>
<span class="token keyword">ALTER</span> EVENT e_test1 <span class="token keyword">DISABLE</span><span class="token punctuation">;</span>
<span class="token comment">-- 开启事件</span>
<span class="token keyword">ALTER</span> EVENT e_test1 <span class="token keyword">ENABLE</span><span class="token punctuation">;</span>
<span class="token comment">-- 删除事件</span>
<span class="token keyword">DROP</span> EVENT <span class="token keyword">IF</span> <span class="token keyword">EXISTS</span> e_test1<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_9-3-springboot调用存储过程" tabindex="-1"><a class="header-anchor" href="#_9-3-springboot调用存储过程" aria-hidden="true">#</a> 9.3 springBoot调用存储过程</h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>@Query(value = "call test(?1) ", nativeQuery = true)
int selectdByLike(@Param("pname") String pname);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="十、参考" tabindex="-1"><a class="header-anchor" href="#十、参考" aria-hidden="true">#</a> 十、参考</h2>
<ul>
<li>索引: https://blog.csdn.net/kaka1121/article/details/53395587</li>
<li>explain: https://www.cnblogs.com/xuanzhi201111/p/4175635.html</li>
<li>锁: https://www.cnblogs.com/kismetv/p/10787228.html#t1</li>
</ul>
</div></template>


