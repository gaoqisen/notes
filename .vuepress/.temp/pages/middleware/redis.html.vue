<template><div><h2 id="一、简介" tabindex="-1"><a class="header-anchor" href="#一、简介" aria-hidden="true">#</a> 一、简介</h2>
<h3 id="_1-1-优势" tabindex="-1"><a class="header-anchor" href="#_1-1-优势" aria-hidden="true">#</a> 1.1 优势</h3>
<ol>
<li>
<p>单点吞吐量特别高单点TPS(服务器每秒处理的事务数)达到8万/秒，QPS(对一个特定的查询服务器在规定时间内所处理流量多少的衡量标准)达到10万/秒(数据都在内存中)。</p>
</li>
<li>
<p>存储类型多: string、map、list、set、stored-set</p>
</li>
</ol>
<h3 id="_1-2-命令整理" tabindex="-1"><a class="header-anchor" href="#_1-2-命令整理" aria-hidden="true">#</a> 1.2 命令整理</h3>
<table>
<thead>
<tr>
<th>string</th>
<th></th>
<th>hash</th>
<th></th>
</tr>
</thead>
<tbody>
<tr>
<td>bitcount</td>
<td>Bit设置为1的数量</td>
<td>hdel</td>
<td>删除一个/多个字段</td>
</tr>
<tr>
<td>bitfield</td>
<td>字符串变为数组后寻址操作</td>
<td>hexists</td>
<td>确定字段是否存在</td>
</tr>
<tr>
<td>bitop</td>
<td>对二进制字符串进行元操作</td>
<td>hget/hset</td>
<td>获取/设置值</td>
</tr>
<tr>
<td>bitpos</td>
<td>返回第一个被设置为0/1的bit</td>
<td>hgetall</td>
<td>获取所有字段</td>
</tr>
<tr>
<td>append</td>
<td>追加</td>
<td>hincrby/hincrbyfloat</td>
<td>给value增加数字/小数</td>
</tr>
<tr>
<td>decr/incr</td>
<td>数值减/加1</td>
<td>hkeys/hvals</td>
<td>获取map里面的key/value</td>
</tr>
<tr>
<td>decrby/incrby</td>
<td>数值减/加指定数字</td>
<td>hlen</td>
<td>获取key的数量</td>
</tr>
<tr>
<td>get/set</td>
<td>获取/设置字符串</td>
<td>hmget/hmset</td>
<td>get/set多个字段</td>
</tr>
<tr>
<td>getbit/setbit</td>
<td>获取/设置指定偏移量上的位(bit)</td>
<td>hrandfield</td>
<td>获取随机字段</td>
</tr>
<tr>
<td>getdel</td>
<td>获取key后删除key</td>
<td>hscan</td>
<td>迭代获取数据</td>
</tr>
<tr>
<td>setex/getex</td>
<td>设置/获取后设过期时间(秒)</td>
<td>hsetnx</td>
<td>字段不存在时set</td>
</tr>
<tr>
<td>getrange/setrange</td>
<td>获取/设置指定下标数据</td>
<td>hstrlen</td>
<td>获取字段value的长度</td>
</tr>
<tr>
<td>getset</td>
<td>设置新值返回旧值</td>
<td></td>
<td></td>
</tr>
<tr>
<td>incrbyfloat</td>
<td>数值加指定小数</td>
<td></td>
<td></td>
</tr>
<tr>
<td>mset/mget</td>
<td>同时设置/获取多个key</td>
<td></td>
<td></td>
</tr>
<tr>
<td>msetnx</td>
<td>给多个key不存在时set</td>
<td></td>
<td></td>
</tr>
<tr>
<td>psetex</td>
<td>设置过期时间(毫秒)</td>
<td></td>
<td></td>
</tr>
<tr>
<td>setnx</td>
<td>Key不存在时set，不覆盖</td>
<td></td>
<td></td>
</tr>
<tr>
<td>stralgo</td>
<td>使用LCS算法</td>
<td></td>
<td></td>
</tr>
<tr>
<td>strlen</td>
<td>字符串长度</td>
<td></td>
<td></td>
</tr>
</tbody>
</table>
<table>
<thead>
<tr>
<th>list</th>
<th></th>
<th>set</th>
<th></th>
</tr>
</thead>
<tbody>
<tr>
<td>blmove</td>
<td>移动元素</td>
<td>sadd/srem</td>
<td>添加/删除一个/多个元素</td>
</tr>
<tr>
<td>blpop/brpop</td>
<td>移出获取第一个/最后一个元素，没有则等待</td>
<td>scard</td>
<td>获取成员数</td>
</tr>
<tr>
<td>brpoplpush</td>
<td>弹出元素并插入到其他表后返回</td>
<td>sdiff/sdiffstore</td>
<td>获取list集合差异（存储）</td>
</tr>
<tr>
<td>lindex</td>
<td>通过索引获取数据</td>
<td>sinter/sinterstore</td>
<td>获取集合交集（存储）</td>
</tr>
<tr>
<td>linsert</td>
<td>列表前或后插入元素</td>
<td>sismember/smismember</td>
<td>一个/多个是否集合成员</td>
</tr>
<tr>
<td>llen</td>
<td>列表长度</td>
<td>smembers</td>
<td>获取所有成员</td>
</tr>
<tr>
<td>lmove</td>
<td>移动元素到另一个list中</td>
<td>smove</td>
<td>移动元素</td>
</tr>
<tr>
<td>lpop/rpop</td>
<td>从左/右移出获取第一个元素</td>
<td>spop</td>
<td>移除返回一个随机元素</td>
</tr>
<tr>
<td>lpos/rpos</td>
<td>从左/右获取元素的索引</td>
<td>srandmember</td>
<td>返回一个或多个随机数</td>
</tr>
<tr>
<td>lpush/rpush</td>
<td>从左/右push元素</td>
<td>sscan</td>
<td>迭代集合中的元素</td>
</tr>
<tr>
<td>lpushx/rpushx</td>
<td>从左/右添加元素到存在列表</td>
<td>sunion/sunionstore</td>
<td>获取并集(存储)</td>
</tr>
<tr>
<td>lrange</td>
<td>获取指定范围的元素</td>
<td></td>
<td></td>
</tr>
<tr>
<td>lrem</td>
<td>删除元素</td>
<td></td>
<td></td>
</tr>
<tr>
<td>lset</td>
<td>通过索引set值</td>
<td></td>
<td></td>
</tr>
<tr>
<td>ltrim</td>
<td>修建列表，保留范围内元素</td>
<td></td>
<td></td>
</tr>
<tr>
<td>rpoplpush</td>
<td>将弹出元素push到指定list</td>
<td></td>
<td></td>
</tr>
</tbody>
</table>
<table>
<thead>
<tr>
<th>sorted_set</th>
<th></th>
<th></th>
<th></th>
</tr>
</thead>
<tbody>
<tr>
<td>bzpopmax/bzpopmin</td>
<td>弹出最大/最小分数的元素</td>
<td>zrange/zrangestore</td>
<td>获取范围成员（存储）</td>
</tr>
<tr>
<td>zadd/zrem</td>
<td>增加/删除元素</td>
<td>zrangebylex/zrangebyscore</td>
<td>通过字典/分数范围获取元素</td>
</tr>
<tr>
<td>zcard</td>
<td>获取成员数量</td>
<td>zrank</td>
<td>通过元素确定下标</td>
</tr>
<tr>
<td>zcount</td>
<td>获取指定区间分数成员数</td>
<td>zremrangebylex/zremrangebyrank<br />/zremrangebyscore</td>
<td>删除所有元素通过字典/下标/分数区间</td>
</tr>
<tr>
<td>zdiff/zdiffstore</td>
<td>差集(存储)</td>
<td>zrevrange/zrevrangebylex/<br />zrevrangebyscore/zrevrank</td>
<td>通过范围/字典/分数获取一个范围的元素</td>
</tr>
<tr>
<td>zincrby</td>
<td>指定成员分数增加</td>
<td>zscan</td>
<td>迭代返回元素</td>
</tr>
<tr>
<td>zinter/zinterstore</td>
<td>交集（存储）</td>
<td>zscore</td>
<td>返回成员的分数</td>
</tr>
<tr>
<td>zlexcount</td>
<td>指定区间内成员数量</td>
<td>zunion/zunionstore</td>
<td>并集（存储）</td>
</tr>
<tr>
<td>zmscore</td>
<td>获取指定成员分数</td>
<td></td>
<td></td>
</tr>
<tr>
<td>zpopmax/zpopmin</td>
<td>弹出最大/最小</td>
<td></td>
<td></td>
</tr>
<tr>
<td>zrandmember</td>
<td>获取一个/多个随机元素</td>
<td></td>
<td></td>
</tr>
</tbody>
</table>
<h2 id="二、redis常见问题" tabindex="-1"><a class="header-anchor" href="#二、redis常见问题" aria-hidden="true">#</a> 二、redis常见问题</h2>
<h3 id="_2-1-数据的过期时间到了如何处理" tabindex="-1"><a class="header-anchor" href="#_2-1-数据的过期时间到了如何处理" aria-hidden="true">#</a> 2.1 数据的过期时间到了如何处理</h3>
<ol>
<li>定期删除: 默认100ms就随机抽取一些过期的key(如果没隔100秒就是遍历所有过期key进行删除的话，cpu的负载就很大)；</li>
<li>惰性删除: 定期删除可能有一些数据过期了但是没有被删除掉。惰性删除就是等系统查询过数据之后在进行数据删除。</li>
</ol>
<h3 id="_2-2-内存淘汰机制" tabindex="-1"><a class="header-anchor" href="#_2-2-内存淘汰机制" aria-hidden="true">#</a> 2.2 内存淘汰机制</h3>
<ol>
<li>volatile-lru：从已设置过期时间的数据集（server.db[i].expires）中挑选最近最少使用的数据淘汰</li>
<li>volatile-ttl：从已设置过期时间的数据集（server.db[i].expires）中挑选将要过期的数据淘汰</li>
<li>volatile-random：从已设置过期时间的数据集（server.db[i].expires）中任意选择数据淘汰</li>
<li>allkeys-lru：当内存不足以容纳新写入数据时，在键空间中，移除最近最少使用的key（这个是最常用的）</li>
<li>allkeys-random：从数据集（server.db[i].dict）中任意选择数据淘汰</li>
<li>no-eviction：禁止驱逐数据，也就是说当内存不足以容纳新写入数据时，新写入操作会报错。这个应该没人使用吧！</li>
<li>volatile-lfu（4.0版本后）：从已设置过期时间的数据集(server.db[i].expires)中挑选最不经常使用的数据淘汰</li>
<li>allkeys-lfu（4.0版本后）：当内存不足以容纳新写入数据时，在键空间中，移除最不经常使用的key</li>
</ol>
<h3 id="_2-3-持久化机制" tabindex="-1"><a class="header-anchor" href="#_2-3-持久化机制" aria-hidden="true">#</a> 2.3 持久化机制</h3>
<ul>
<li>RDB(快照): 快照持久化是redis默认的方式，如配置：save 900 1 表示在900秒(15分钟)之后，如果至少有1个key发生变化，Redis就会自动触发BGSAVE命令创建快照。</li>
<li>AOF: AOF的持久化的实时性更好，已经成为了主流的持久化方案，默认没有开启(appendonly yes开启),有三种持久化方式：
<ol>
<li>appendfsync always每次修改数据都会写入aof文件,这种方式严重降低redis的速度。</li>
<li>appendfsync everysec每秒同步一次。</li>
<li>appendfsync no让操作系统决定</li>
</ol>
</li>
</ul>
<h3 id="_2-4-如何实现事务" tabindex="-1"><a class="header-anchor" href="#_2-4-如何实现事务" aria-hidden="true">#</a> 2.4 如何实现事务</h3>
<p>redis通过MULTI、EXEC、WATCH实现事务功能，是一组命令的集合。如果这组命令中有语法错误，或者命令不存在。那么整组的命令都不会执行。redis保证一个事务中的所有命令要么都执行、要么都不执行。</p>
<h3 id="_2-5-缓存雪崩、缓存穿透如何解决" tabindex="-1"><a class="header-anchor" href="#_2-5-缓存雪崩、缓存穿透如何解决" aria-hidden="true">#</a> 2.5 缓存雪崩、缓存穿透如何解决</h3>
<ul>
<li>缓存雪崩: 缓存在同一时间大面积失效，导致数据库负载的压力过大而跌机
<ol>
<li>保证整个redis的高可用集群，发现宕机尽快补上。</li>
<li>本地ehcache缓存+限量&amp;降级，避免数据库挂掉</li>
<li>利用redis持久化机制保存的数据尽快恢复缓存</li>
</ol>
</li>
<li>缓存穿透: 大量的请求是没有缓存过的，导致大量的数据直接从数据库查询(一般3000个并发就会打垮大部分数据库)
<ol>
<li>做好参数校验，不合法的参数直接抛出异常。</li>
<li>利用缓存无效key的方法解决变化不频繁的key</li>
<li>布隆过滤器：判断给定的key是否是存在于海量数据中，如果不存在，直接返回异常。</li>
</ol>
</li>
</ul>
<h3 id="_2-6-解决并发竞争key的问题" tabindex="-1"><a class="header-anchor" href="#_2-6-解决并发竞争key的问题" aria-hidden="true">#</a> 2.6 解决并发竞争key的问题</h3>
<p>如果多个系统同时操作一个key，并发处理数据导致结果和我们想的不一样，就会出现这个问题。这种情况可以利用分布式锁解决这个问题,但是这样性能不好(慎用)。</p>
<h3 id="_2-7-如何保证缓存和数据库双写时的数据一致性" tabindex="-1"><a class="header-anchor" href="#_2-7-如何保证缓存和数据库双写时的数据一致性" aria-hidden="true">#</a> 2.7 如何保证缓存和数据库双写时的数据一致性</h3>
<p>在使用redis作为缓存的时候，就会出现缓存和数据库的双写和双存储问题。先存储数据库之后，在存储缓存。 修改数据也是同样的情况，都要同时操作。如果数据库保存成功了，但是在存入redis的时候报错了，就会导致数据不一致。如果要求必须一致的话，可以进行读请求和写请求的串行化，串到一个内存队列中去，但是这样会导致系统的吞吐量大幅度降低，用比正常多几倍的机器去支撑请求。</p>
<h3 id="_2-8-节省空间" tabindex="-1"><a class="header-anchor" href="#_2-8-节省空间" aria-hidden="true">#</a> 2.8 节省空间</h3>
<ol>
<li>精简键名和键值: 将长键名改为短键名如vip:20等。</li>
<li>内部编码优化: redis为每种数据类型都提供了两种内部编码方式，当存储的元素变多时，redis会自动将该健的内部编码方式转换为散列表。</li>
</ol>
<h2 id="三、常用命令" tabindex="-1"><a class="header-anchor" href="#三、常用命令" aria-hidden="true">#</a> 三、常用命令</h2>
<h3 id="_3-1-字符串" tabindex="-1"><a class="header-anchor" href="#_3-1-字符串" aria-hidden="true">#</a> 3.1 字符串</h3>
<blockquote>
<p>将数据以字符串方式存储。</p>
</blockquote>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>　// 自增数字
　incr num
　// 获取字符串长度
　strlen key
　// 向尾部增加字符串a
　append key 'a'
　// 获取多个key
　mget a b c
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-散列" tabindex="-1"><a class="header-anchor" href="#_3-2-散列" aria-hidden="true">#</a> 3.2 散列</h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>　// 散列类型赋值
　hset car name bwm
　// 获取散列类型的值
　hget car name
　// 设置多个字段
　hmset car name bwm color red price 100
　// 获取所有的字段
　hgetall car
　// 判断字段是否存在
　hexists car name
　// 删除散列值
　hdel car price
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-3-列表" tabindex="-1"><a class="header-anchor" href="#_3-3-列表" aria-hidden="true">#</a> 3.3 列表</h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>　// 向列表的两端添加元素
　lpush key value
　rpush key value
　// 向两边弹出元素
　lpop key
　rpop key
　// 查看列表的长度
　llen key
　// 获取列表片段中的值(lrange test 0 2)
　lrange key start stop
　// 通过索引获取数据
　lindex key index
　// 删除指定片段之外的数据
　ltrim key start end
　// 讲元素从一个列表转移到另一个列表
　rpoplpush source destination
　
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-4-集合" tabindex="-1"><a class="header-anchor" href="#_3-4-集合" aria-hidden="true">#</a> 3.4 集合</h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>　// 增加元素
　sadd key member
　// 删除元素
　trem key member
　// 获取所有元素
　smembers key
　// 判断元素是否在集合中
　smembers key member
　// 属于A不属于B的数据
　sdiff set1 set2
　// 交集
　sinter set1 set2 
　// 并集
　sunion set1 set2
　// 获取元素的个数
　scard key
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-5-有序集合" tabindex="-1"><a class="header-anchor" href="#_3-5-有序集合" aria-hidden="true">#</a> 3.5 有序集合</h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>　// 增加元素 sadd key 78 tom 89 cat
　sadd key score number
　// 获取存的值
　zscore key tom
　// 按照分数从大到小的顺序返回
　zrange key start stop
　// 增加分数
　zincrby sss 6 tom
　// 获取元素的个数
　zcard sss
　// 删除元素
　zrem sss tom
　// 获取元素的排名
　zrank sss cat
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-6-其他" tabindex="-1"><a class="header-anchor" href="#_3-6-其他" aria-hidden="true">#</a> 3.6 其他</h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code> // redis事务
　multi
　exec
　// 监控值,防止事务中的值被改掉
　watch key
　// 设置key15分钟之后过期
　expire key 900
　// 查看key的过期时间(s)
　ttl key
　// 设置不过期
　persist key
    // redis最复杂的命令排序
    sort key
    sort key by field 
    
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="四、java-stringredistemplate常用" tabindex="-1"><a class="header-anchor" href="#四、java-stringredistemplate常用" aria-hidden="true">#</a> 四、java stringRedisTemplate常用</h2>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token comment">//向redis里存入数据和设置缓存时间  </span>
stringRedisTemplate<span class="token punctuation">.</span><span class="token function">opsForValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token string">"baike"</span><span class="token punctuation">,</span> <span class="token string">"100"</span><span class="token punctuation">,</span> <span class="token number">60</span> <span class="token operator">*</span> <span class="token number">10</span><span class="token punctuation">,</span> <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span><span class="token constant">SECONDS</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//val做-1操作  </span>
stringRedisTemplate<span class="token punctuation">.</span><span class="token function">boundValueOps</span><span class="token punctuation">(</span><span class="token string">"baike"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">increment</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//根据key获取缓存中的val  </span>
stringRedisTemplate<span class="token punctuation">.</span><span class="token function">opsForValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">"baike"</span><span class="token punctuation">)</span>
<span class="token comment">//val +1  </span>
stringRedisTemplate<span class="token punctuation">.</span><span class="token function">boundValueOps</span><span class="token punctuation">(</span><span class="token string">"baike"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">increment</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//根据key获取过期时间  </span>
stringRedisTemplate<span class="token punctuation">.</span><span class="token function">getExpire</span><span class="token punctuation">(</span><span class="token string">"baike"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//根据key获取过期时间并换算成指定单位  </span>
stringRedisTemplate<span class="token punctuation">.</span><span class="token function">getExpire</span><span class="token punctuation">(</span><span class="token string">"baike"</span><span class="token punctuation">,</span><span class="token class-name">TimeUnit</span><span class="token punctuation">.</span><span class="token constant">SECONDS</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//根据key删除缓存  </span>
stringRedisTemplate<span class="token punctuation">.</span><span class="token function">delete</span><span class="token punctuation">(</span><span class="token string">"baike"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//检查key是否存在，返回boolean值  </span>
stringRedisTemplate<span class="token punctuation">.</span><span class="token function">hasKey</span><span class="token punctuation">(</span><span class="token string">"baike"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//向指定key中存放set集合  </span>
stringRedisTemplate<span class="token punctuation">.</span><span class="token function">opsForSet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">"baike"</span><span class="token punctuation">,</span> <span class="token string">"1"</span><span class="token punctuation">,</span><span class="token string">"2"</span><span class="token punctuation">,</span><span class="token string">"3"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//设置过期时间  </span>
stringRedisTemplate<span class="token punctuation">.</span><span class="token function">expire</span><span class="token punctuation">(</span><span class="token string">"baike"</span><span class="token punctuation">,</span><span class="token number">1000</span> <span class="token punctuation">,</span> <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span><span class="token constant">MILLISECONDS</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//根据key查看集合中是否存在指定数据  </span>
stringRedisTemplate<span class="token punctuation">.</span><span class="token function">opsForSet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isMember</span><span class="token punctuation">(</span><span class="token string">"baike"</span><span class="token punctuation">,</span> <span class="token string">"1"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//根据key获取set集合  </span>
stringRedisTemplate<span class="token punctuation">.</span><span class="token function">opsForSet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">members</span><span class="token punctuation">(</span><span class="token string">"baike"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//验证有效时间</span>
<span class="token class-name">Long</span> expire <span class="token operator">=</span> redisTemplate<span class="token punctuation">.</span><span class="token function">boundHashOps</span><span class="token punctuation">(</span><span class="token string">"baike"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getExpire</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"redis有效时间："</span><span class="token operator">+</span>expire<span class="token operator">+</span><span class="token string">"S"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>https://developer.aliyun.com/article/705832</p>
<h2 id="五、安装redis" tabindex="-1"><a class="header-anchor" href="#五、安装redis" aria-hidden="true">#</a> 五、安装redis</h2>
<h3 id="_5-1-mac-brew安装" tabindex="-1"><a class="header-anchor" href="#_5-1-mac-brew安装" aria-hidden="true">#</a> 5.1 mac brew安装</h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>brew install redis
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_5-2-linux下载安装" tabindex="-1"><a class="header-anchor" href="#_5-2-linux下载安装" aria-hidden="true">#</a> 5.2 linux下载安装</h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>wget http://download.redis.io/releases/redis-2.8.17.tar.gz
tar xzf redis-2.8.17.tar.gz
cd redis-2.8.17
make
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="六、spring-boot集成redis" tabindex="-1"><a class="header-anchor" href="#六、spring-boot集成redis" aria-hidden="true">#</a> 六、spring boot集成redis</h2>
<h3 id="_6-1-maven引入" tabindex="-1"><a class="header-anchor" href="#_6-1-maven引入" aria-hidden="true">#</a> 6.1 Maven引入</h3>
<div class="language-xml line-numbers-mode" data-ext="xml"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
     <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
     <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-data-redis<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-2-配置文件" tabindex="-1"><a class="header-anchor" href="#_6-2-配置文件" aria-hidden="true">#</a> 6.2 配置文件</h3>
<div class="language-properties line-numbers-mode" data-ext="properties"><pre v-pre class="language-properties"><code><span class="token key attr-name">    spring.redis.database</span><span class="token punctuation">=</span><span class="token value attr-value">0</span>
<span class="token key attr-name">    spring.redis.host</span><span class="token punctuation">=</span><span class="token value attr-value">localhost    </span>
<span class="token key attr-name">    spring.redis.port</span><span class="token punctuation">=</span><span class="token value attr-value">6379     // 端口号</span>
<span class="token key attr-name">    spring.redis.password</span><span class="token punctuation">=</span><span class="token value attr-value">redispass  // 密码</span>
<span class="token key attr-name">    spring.redis.pool.max-active</span><span class="token punctuation">=</span><span class="token value attr-value">8</span>
<span class="token key attr-name">    spring.redis.pool.max-wait</span><span class="token punctuation">=</span><span class="token value attr-value">-1</span>
<span class="token key attr-name">    spring.redis.pool.max-idle</span><span class="token punctuation">=</span><span class="token value attr-value">8</span>
<span class="token key attr-name">    spring.redis.pool.min-idle</span><span class="token punctuation">=</span><span class="token value attr-value">0</span>
<span class="token key attr-name">    spring.redis.timeout</span><span class="token punctuation">=</span><span class="token value attr-value">5000   // 链接超时时间，可以设置大一些</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-3-service接口" tabindex="-1"><a class="header-anchor" href="#_6-3-service接口" aria-hidden="true">#</a> 6.3 Service接口</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>    <span class="token annotation punctuation">@Service</span>
    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">RedisService</span> <span class="token punctuation">{</span>
	<span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">StringRedisTemplate</span> redisTemplate<span class="token punctuation">;</span>
    <span class="token doc-comment comment">/**
     * 一周有多少秒
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">long</span> <span class="token constant">WEEK_SECONDS</span> <span class="token operator">=</span> <span class="token number">7</span> <span class="token operator">*</span> <span class="token number">24</span> <span class="token operator">*</span> <span class="token number">60</span> <span class="token operator">*</span> <span class="token number">60</span><span class="token punctuation">;</span>
    <span class="token doc-comment comment">/**
     * 将 key，value 存放到redis数据库中，默认设置过期时间为一周
     * <span class="token keyword">@param</span> <span class="token parameter">key</span>
     * <span class="token keyword">@param</span> <span class="token parameter">value</span>
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">set</span><span class="token punctuation">(</span><span class="token class-name">String</span> key<span class="token punctuation">,</span> <span class="token class-name">Object</span> value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        redisTemplate<span class="token punctuation">.</span><span class="token function">opsForValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> <span class="token class-name">JsonUtil</span><span class="token punctuation">.</span><span class="token function">convertObj2String</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token constant">WEEK_SECONDS</span><span class="token punctuation">,</span> <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span><span class="token constant">SECONDS</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
    <span class="token doc-comment comment">/**
     * 将 key，value 存放到redis数据库中，设置过期时间单位是秒
     *
     * <span class="token keyword">@param</span> <span class="token parameter">key</span>
     * <span class="token keyword">@param</span> <span class="token parameter">value</span>
     * <span class="token keyword">@param</span> <span class="token parameter">expireTime</span>
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">set</span><span class="token punctuation">(</span><span class="token class-name">String</span> key<span class="token punctuation">,</span> <span class="token class-name">Object</span> value<span class="token punctuation">,</span> <span class="token keyword">long</span> expireTime<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        redisTemplate<span class="token punctuation">.</span><span class="token function">opsForValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> <span class="token class-name">JsonUtil</span><span class="token punctuation">.</span><span class="token function">convertObj2String</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">,</span> expireTime<span class="token punctuation">,</span> <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span><span class="token constant">SECONDS</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 判断 key 是否在 redis 数据库中
     *
     * <span class="token keyword">@param</span> <span class="token parameter">key</span>
     * <span class="token keyword">@return</span>
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">exists</span><span class="token punctuation">(</span><span class="token keyword">final</span> <span class="token class-name">String</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> redisTemplate<span class="token punctuation">.</span><span class="token function">hasKey</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 获取与 key 对应的对象
     * <span class="token keyword">@param</span> <span class="token parameter">key</span>
     * <span class="token keyword">@param</span> <span class="token parameter">clazz</span> 目标对象类型
     * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">&lt;</span>T<span class="token punctuation">></span></span>
     * <span class="token keyword">@return</span>
     */</span>
    <span class="token keyword">public</span> <span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span> <span class="token class-name">T</span> <span class="token function">get</span><span class="token punctuation">(</span><span class="token class-name">String</span> key<span class="token punctuation">,</span> <span class="token class-name">Class</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span> clazz<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> s <span class="token operator">=</span> <span class="token function">get</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>s <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token class-name">JsonUtil</span><span class="token punctuation">.</span><span class="token function">convertString2Obj</span><span class="token punctuation">(</span>s<span class="token punctuation">,</span> clazz<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 获取 key 对应的字符串
     * <span class="token keyword">@param</span> <span class="token parameter">key</span>
     * <span class="token keyword">@return</span>
     */</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">get</span><span class="token punctuation">(</span><span class="token class-name">String</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> redisTemplate<span class="token punctuation">.</span><span class="token function">opsForValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 删除 key 对应的 value
     * <span class="token keyword">@param</span> <span class="token parameter">key</span>
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">delete</span><span class="token punctuation">(</span><span class="token class-name">String</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        redisTemplate<span class="token punctuation">.</span><span class="token function">delete</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-4-测试" tabindex="-1"><a class="header-anchor" href="#_6-4-测试" aria-hidden="true">#</a> 6.4 测试</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>    <span class="token annotation punctuation">@Test</span>
	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">redisService</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
		<span class="token class-name">String</span> str <span class="token operator">=</span> <span class="token string">"test"</span><span class="token punctuation">;</span>
		<span class="token class-name">String</span> retStr <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>redisService<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">"test"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">if</span><span class="token punctuation">(</span>retStr <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>redisService<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token string">"test"</span><span class="token punctuation">,</span> str<span class="token punctuation">)</span><span class="token punctuation">;</span>
			retStr <span class="token operator">=</span> str<span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">":::"</span><span class="token operator">+</span>retStr<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="七、延迟队列" tabindex="-1"><a class="header-anchor" href="#七、延迟队列" aria-hidden="true">#</a> 七、延迟队列</h2>
<p>在需要异步处理数据的时候，进行延迟一定的时间进行处理。可以用Redisson实现。Redission的延迟队列可以解决RabbitMQ死信队列处理不同TTL消息产生的缺陷。</p>
<h2 id="八、分布式锁" tabindex="-1"><a class="header-anchor" href="#八、分布式锁" aria-hidden="true">#</a> 八、分布式锁</h2>
<p>比如在注册逻辑中需要先去判断用户名是否已经存在，如果不存在则进行注册。这种情况如果不使用锁来进行控制的话，就会出现注册时出现插入的数据没有入库而其它线程确查询到用户名不存在进行重复注册的问题。需要把查询和插入实现在分布式锁中就可以解决这个问题。</p>
</div></template>


