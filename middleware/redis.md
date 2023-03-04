---
title: Redis学习
date: 2018-08-30 22:50:11
tags: redis
categories: tool
---

## 一、简介

### 1.1 优势

1. 单点吞吐量特别高单点TPS(服务器每秒处理的事务数)达到8万/秒，QPS(对一个特定的查询服务器在规定时间内所处理流量多少的衡量标准)达到10万/秒(数据都在内存中)。

2. 存储类型多: string、map、list、set、stored-set

### 1.2 命令整理

| string            |                                | hash                 |                        |
| ----------------- | ------------------------------ | -------------------- | ---------------------- |
| bitcount          | Bit设置为1的数量               | hdel                 | 删除一个/多个字段      |
| bitfield          | 字符串变为数组后寻址操作       | hexists              | 确定字段是否存在       |
| bitop             | 对二进制字符串进行元操作       | hget/hset            | 获取/设置值            |
| bitpos            | 返回第一个被设置为0/1的bit     | hgetall              | 获取所有字段           |
| append            | 追加                           | hincrby/hincrbyfloat | 给value增加数字/小数   |
| decr/incr         | 数值减/加1                     | hkeys/hvals          | 获取map里面的key/value |
| decrby/incrby     | 数值减/加指定数字              | hlen                 | 获取key的数量          |
| get/set           | 获取/设置字符串                | hmget/hmset          | get/set多个字段        |
| getbit/setbit     | 获取/设置指定偏移量上的位(bit) | hrandfield           | 获取随机字段           |
| getdel            | 获取key后删除key               | hscan                | 迭代获取数据           |
| setex/getex       | 设置/获取后设过期时间(秒)      | hsetnx               | 字段不存在时set        |
| getrange/setrange | 获取/设置指定下标数据          | hstrlen              | 获取字段value的长度    |
| getset            | 设置新值返回旧值               |                      |                        |
| incrbyfloat       | 数值加指定小数                 |                      |                        |
| mset/mget         | 同时设置/获取多个key           |                      |                        |
| msetnx            | 给多个key不存在时set           |                      |                        |
| psetex            | 设置过期时间(毫秒)             |                      |                        |
| setnx             | Key不存在时set，不覆盖         |                      |                        |
| stralgo           | 使用LCS算法                    |                      |                        |
| strlen            | 字符串长度                     |                      |                        |

| list          |                                         | set                  |                          |
| ------------- | --------------------------------------- | -------------------- | ------------------------ |
| blmove        | 移动元素                                | sadd/srem            | 添加/删除一个/多个元素   |
| blpop/brpop   | 移出获取第一个/最后一个元素，没有则等待 | scard                | 获取成员数               |
| brpoplpush    | 弹出元素并插入到其他表后返回            | sdiff/sdiffstore     | 获取list集合差异（存储） |
| lindex        | 通过索引获取数据                        | sinter/sinterstore   | 获取集合交集（存储）     |
| linsert       | 列表前或后插入元素                      | sismember/smismember | 一个/多个是否集合成员    |
| llen          | 列表长度                                | smembers             | 获取所有成员             |
| lmove         | 移动元素到另一个list中                  | smove                | 移动元素                 |
| lpop/rpop     | 从左/右移出获取第一个元素               | spop                 | 移除返回一个随机元素     |
| lpos/rpos     | 从左/右获取元素的索引                   | srandmember          | 返回一个或多个随机数     |
| lpush/rpush   | 从左/右push元素                         | sscan                | 迭代集合中的元素         |
| lpushx/rpushx | 从左/右添加元素到存在列表               | sunion/sunionstore   | 获取并集(存储)           |
| lrange        | 获取指定范围的元素                      |                      |                          |
| lrem          | 删除元素                                |                      |                          |
| lset          | 通过索引set值                           |                      |                          |
| ltrim         | 修建列表，保留范围内元素                |                      |                          |
| rpoplpush     | 将弹出元素push到指定list                |                      |                          |

| sorted_set         |                         |                                                          |                                      |
| ------------------ | ----------------------- | -------------------------------------------------------- | ------------------------------------ |
| bzpopmax/bzpopmin  | 弹出最大/最小分数的元素 | zrange/zrangestore                                       | 获取范围成员（存储）                 |
| zadd/zrem          | 增加/删除元素           | zrangebylex/zrangebyscore                                | 通过字典/分数范围获取元素            |
| zcard              | 获取成员数量            | zrank                                                    | 通过元素确定下标                     |
| zcount             | 获取指定区间分数成员数  | zremrangebylex/zremrangebyrank<br />/zremrangebyscore    | 删除所有元素通过字典/下标/分数区间   |
| zdiff/zdiffstore   | 差集(存储)              | zrevrange/zrevrangebylex/<br />zrevrangebyscore/zrevrank | 通过范围/字典/分数获取一个范围的元素 |
| zincrby            | 指定成员分数增加        | zscan                                                    | 迭代返回元素                         |
| zinter/zinterstore | 交集（存储）            | zscore                                                   | 返回成员的分数                       |
| zlexcount          | 指定区间内成员数量      | zunion/zunionstore                                       | 并集（存储）                         |
| zmscore            | 获取指定成员分数        |                                                          |                                      |
| zpopmax/zpopmin    | 弹出最大/最小           |                                                          |                                      |
| zrandmember        | 获取一个/多个随机元素   |                                                          |                                      |



## 二、redis常见问题

### 2.1 数据的过期时间到了如何处理

1. 定期删除: 默认100ms就随机抽取一些过期的key(如果没隔100秒就是遍历所有过期key进行删除的话，cpu的负载就很大)；
2. 惰性删除: 定期删除可能有一些数据过期了但是没有被删除掉。惰性删除就是等系统查询过数据之后在进行数据删除。

### 2.2 内存淘汰机制

1. volatile-lru：从已设置过期时间的数据集（server.db[i].expires）中挑选最近最少使用的数据淘汰
2. volatile-ttl：从已设置过期时间的数据集（server.db[i].expires）中挑选将要过期的数据淘汰
3. volatile-random：从已设置过期时间的数据集（server.db[i].expires）中任意选择数据淘汰
4. allkeys-lru：当内存不足以容纳新写入数据时，在键空间中，移除最近最少使用的key（这个是最常用的）
5. allkeys-random：从数据集（server.db[i].dict）中任意选择数据淘汰
6. no-eviction：禁止驱逐数据，也就是说当内存不足以容纳新写入数据时，新写入操作会报错。这个应该没人使用吧！
7. volatile-lfu（4.0版本后）：从已设置过期时间的数据集(server.db[i].expires)中挑选最不经常使用的数据淘汰
8. allkeys-lfu（4.0版本后）：当内存不足以容纳新写入数据时，在键空间中，移除最不经常使用的key

### 2.3 持久化机制

- RDB(快照): 快照持久化是redis默认的方式，如配置：save 900 1 表示在900秒(15分钟)之后，如果至少有1个key发生变化，Redis就会自动触发BGSAVE命令创建快照。 
- AOF: AOF的持久化的实时性更好，已经成为了主流的持久化方案，默认没有开启(appendonly yes开启),有三种持久化方式：
  1. appendfsync always每次修改数据都会写入aof文件,这种方式严重降低redis的速度。
  2. appendfsync everysec每秒同步一次。
  3. appendfsync no让操作系统决定

### 2.4 如何实现事务

　redis通过MULTI、EXEC、WATCH实现事务功能，是一组命令的集合。如果这组命令中有语法错误，或者命令不存在。那么整组的命令都不会执行。redis保证一个事务中的所有命令要么都执行、要么都不执行。

### 2.5 缓存雪崩、缓存穿透如何解决

- 缓存雪崩: 缓存在同一时间大面积失效，导致数据库负载的压力过大而跌机
  1. 保证整个redis的高可用集群，发现宕机尽快补上。
  2. 本地ehcache缓存+限量&降级，避免数据库挂掉
  3. 利用redis持久化机制保存的数据尽快恢复缓存
- 缓存穿透: 大量的请求是没有缓存过的，导致大量的数据直接从数据库查询(一般3000个并发就会打垮大部分数据库)
  1. 做好参数校验，不合法的参数直接抛出异常。
  2. 利用缓存无效key的方法解决变化不频繁的key
  3. 布隆过滤器：判断给定的key是否是存在于海量数据中，如果不存在，直接返回异常。

### 2.6 解决并发竞争key的问题

如果多个系统同时操作一个key，并发处理数据导致结果和我们想的不一样，就会出现这个问题。这种情况可以利用分布式锁解决这个问题,但是这样性能不好(慎用)。

### 2.7 如何保证缓存和数据库双写时的数据一致性

在使用redis作为缓存的时候，就会出现缓存和数据库的双写和双存储问题。先存储数据库之后，在存储缓存。 修改数据也是同样的情况，都要同时操作。如果数据库保存成功了，但是在存入redis的时候报错了，就会导致数据不一致。如果要求必须一致的话，可以进行读请求和写请求的串行化，串到一个内存队列中去，但是这样会导致系统的吞吐量大幅度降低，用比正常多几倍的机器去支撑请求。

### 2.8 节省空间

1. 精简键名和键值: 将长键名改为短键名如vip:20等。
2. 内部编码优化: redis为每种数据类型都提供了两种内部编码方式，当存储的元素变多时，redis会自动将该健的内部编码方式转换为散列表。

## 三、常用命令

### 3.1 字符串

> 将数据以字符串方式存储。

```
　// 自增数字
　incr num
　// 获取字符串长度
　strlen key
　// 向尾部增加字符串a
　append key 'a'
　// 获取多个key
　mget a b c
```

### 3.2 散列

```
　// 散列类型赋值
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
```

### 3.3 列表

```
　// 向列表的两端添加元素
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
　
```

### 3.4 集合

```
　// 增加元素
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
```

### 3.5 有序集合

```
　// 增加元素 sadd key 78 tom 89 cat
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
```

### 3.6 其他

```
 // redis事务
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
    
```

## 四、java stringRedisTemplate常用

```java
//向redis里存入数据和设置缓存时间  
stringRedisTemplate.opsForValue().set("baike", "100", 60 * 10, TimeUnit.SECONDS);
//val做-1操作  
stringRedisTemplate.boundValueOps("baike").increment(-1);
//根据key获取缓存中的val  
stringRedisTemplate.opsForValue().get("baike")
//val +1  
stringRedisTemplate.boundValueOps("baike").increment(1);
//根据key获取过期时间  
stringRedisTemplate.getExpire("baike");
//根据key获取过期时间并换算成指定单位  
stringRedisTemplate.getExpire("baike",TimeUnit.SECONDS);
//根据key删除缓存  
stringRedisTemplate.delete("baike");
//检查key是否存在，返回boolean值  
stringRedisTemplate.hasKey("baike");
//向指定key中存放set集合  
stringRedisTemplate.opsForSet().add("baike", "1","2","3");
//设置过期时间  
stringRedisTemplate.expire("baike",1000 , TimeUnit.MILLISECONDS);
//根据key查看集合中是否存在指定数据  
stringRedisTemplate.opsForSet().isMember("baike", "1");
//根据key获取set集合  
stringRedisTemplate.opsForSet().members("baike");
//验证有效时间
Long expire = redisTemplate.boundHashOps("baike").getExpire();
System.out.println("redis有效时间："+expire+"S");
```

https://developer.aliyun.com/article/705832

## 五、安装redis

### 5.1 mac brew安装

```
brew install redis
```

### 5.2 linux下载安装

```
wget http://download.redis.io/releases/redis-2.8.17.tar.gz
tar xzf redis-2.8.17.tar.gz
cd redis-2.8.17
make
```

## 六、spring boot集成redis

### 6.1 Maven引入

```xml
<dependency>
     <groupId>org.springframework.boot</groupId>
     <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
```

### 6.2 配置文件

```properties
    spring.redis.database=0
    spring.redis.host=localhost    
    spring.redis.port=6379     // 端口号
    spring.redis.password=redispass  // 密码
    spring.redis.pool.max-active=8
    spring.redis.pool.max-wait=-1
    spring.redis.pool.max-idle=8
    spring.redis.pool.min-idle=0
    spring.redis.timeout=5000   // 链接超时时间，可以设置大一些
```

### 6.3 Service接口

```java
    @Service
    public class RedisService {
	@Autowired
    private StringRedisTemplate redisTemplate;
    /**
     * 一周有多少秒
     */
    private static final long WEEK_SECONDS = 7 * 24 * 60 * 60;
    /**
     * 将 key，value 存放到redis数据库中，默认设置过期时间为一周
     * @param key
     * @param value
     */
    public void set(String key, Object value) {
        redisTemplate.opsForValue().set(key, JsonUtil.convertObj2String(value), WEEK_SECONDS, TimeUnit.SECONDS);
    }
    
    /**
     * 将 key，value 存放到redis数据库中，设置过期时间单位是秒
     *
     * @param key
     * @param value
     * @param expireTime
     */
    public void set(String key, Object value, long expireTime) {
        redisTemplate.opsForValue().set(key, JsonUtil.convertObj2String(value), expireTime, TimeUnit.SECONDS);
    }

    /**
     * 判断 key 是否在 redis 数据库中
     *
     * @param key
     * @return
     */
    public boolean exists(final String key) {
        return redisTemplate.hasKey(key);
    }

    /**
     * 获取与 key 对应的对象
     * @param key
     * @param clazz 目标对象类型
     * @param <T>
     * @return
     */
    public <T> T get(String key, Class<T> clazz) {
        String s = get(key);
        if (s == null) {
            return null;
        }
        return JsonUtil.convertString2Obj(s, clazz);
    }

    /**
     * 获取 key 对应的字符串
     * @param key
     * @return
     */
    public String get(String key) {
        return redisTemplate.opsForValue().get(key);
    }

    /**
     * 删除 key 对应的 value
     * @param key
     */
    public void delete(String key) {
        redisTemplate.delete(key);
    }
    }
```

### 6.4 测试

```java
    @Test
	public void redisService(){
		String str = "test";
		String retStr = this.redisService.get("test");
		if(retStr == null) {
			this.redisService.set("test", str);
			retStr = str;
		}
		System.out.println(":::"+retStr);
	}
```

## 七、延迟队列

在需要异步处理数据的时候，进行延迟一定的时间进行处理。可以用Redisson实现。Redission的延迟队列可以解决RabbitMQ死信队列处理不同TTL消息产生的缺陷。

## 八、分布式锁

比如在注册逻辑中需要先去判断用户名是否已经存在，如果不存在则进行注册。这种情况如果不使用锁来进行控制的话，就会出现注册时出现插入的数据没有入库而其它线程确查询到用户名不存在进行重复注册的问题。需要把查询和插入实现在分布式锁中就可以解决这个问题。

