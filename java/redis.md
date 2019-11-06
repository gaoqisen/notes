---
title: java实现redis缓存功能
date: 2018-08-30 22:50:11
tags: redis
categories: java
---
## 一、安装redis
### 1.mac安装，如果有安装brew  可以直接快捷安装：
    brew install redis
### 2.linux下载安装
     wget http://download.redis.io/releases/redis-2.8.17.tar.gz
     tar xzf redis-2.8.17.tar.gz
     cd redis-2.8.17
     make
## 二、redis常用命令
    redis-cli  // 进入命令行
    /usr/local/bin/redis-server /usr/local/etc/redis.conf // 启动  找到你的redis-server、redis-server路径
    quit   // 退出
    keys * // 查询所有的key
    set a 123  //创建字符串key（a）, value(123)  
    get a   // 查看字符串key为a的value
    del a  //删除字符串key为a的数据
    hmset key name "a" description "123" // hashmap的创建
    hgetall a  //hashmap通过key获取
    lpush a 123  // list创建
    lrange a 0 10  //list 获取
    sadd a 123  // 集合set创建
    smembers a  // 集合set 获取
    zadd a 123  // 有序集合set创建
    zrange a 1 10 smembers  // 集合set 获取
注：初期使用的命令，后期遇到之后在进行添加
## 三、spring boot集成redis
### 1.项目基于spring boot创建的，eclipse 集成spring boot 后，可以选择redis，之后自动生成如下代码（pom.xml）:
    <dependency>
	 <groupId>org.springframework.boot</groupId>
	 <artifactId>spring-boot-starter-data-redis</artifactId>
    </dependency>
### 2.配置redis，在application.propertise 的文件里面添加如下：
    spring.redis.database=0
    spring.redis.host=localhost    
    spring.redis.port=6379     // 端口号
    spring.redis.password=redispass  // 密码
    spring.redis.pool.max-active=8
    spring.redis.pool.max-wait=-1
    spring.redis.pool.max-idle=8
    spring.redis.pool.min-idle=0
    spring.redis.timeout=5000   // 链接超时时间，可以设置大一些
### 3.创建一个service接口（redisService）：
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

### 4.在PifajiaOfficialApplicationTests里面进行测试
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

#### end



