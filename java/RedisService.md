```java

    private StringRedisTemplate stringRedisTemplate;

    /**
     * 保存对象
     * 
     * @param key
     * @param t
     * @return
     */
    public <T> boolean save(final String key, final T t) {
        return save(key, t, 0);
    }

    /**
     * 保存对象
     * 
     * @param key
     * @param t
     * @param seconds
     * @return
     */
    public <T> boolean save(final String key, final T t, final long seconds) {
        String tStr = JSON.toJSONString(t);
        return save(key, tStr, seconds);
    }

    /**
     * 获取对象
     * 
     * @param key
     * @param clazz
     * @return
     */
    public <T> T get(final String key, Class<T> clazz) {
        String tStr = get(key);
        return JSON.parseObject(tStr, clazz);
    }

    /**
     * 保存键值对
     * 
     * @param key
     * @param value
     * @return
     */
    public boolean save(final String key, final String value) {
        return save(key, value, 0);
    }

    /**
     * 保存键值对,如果存在的话，会被覆盖
     * 
     * @param key
     * @param value
     * @param seconds 过期时间(秒)
     * @return
     */
    public boolean save(final String key, final String value, final long seconds) {
        boolean result = stringRedisTemplate.execute(new RedisCallback<Boolean>() {

            @Override
            public Boolean doInRedis(RedisConnection connection) throws DataAccessException {
                byte[] keyByte = stringRedisTemplate.getStringSerializer().serialize(key);
                byte[] valueByte = stringRedisTemplate.getStringSerializer().serialize(value);
                if (seconds > 0) {
                    connection.setEx(keyByte, seconds, valueByte);
                } else {
                    connection.set(keyByte, valueByte);
                }

                return Boolean.TRUE;
            }
        });
        return result;
    }

    /**
     * 如果不存在则保存
     * 
     * @param key
     * @param value
     * @return
     */
    public boolean saveNX(final String key, final String value) {
        boolean result = stringRedisTemplate.execute(new RedisCallback<Boolean>() {

            @Override
            public Boolean doInRedis(RedisConnection connection) throws DataAccessException {
                byte[] keyByte = stringRedisTemplate.getStringSerializer().serialize(key);
                byte[] valueByte = stringRedisTemplate.getStringSerializer().serialize(value);
                return connection.setNX(keyByte, valueByte);
            }
        });
        return result;
    }

    /**
     * 保存键值对,如果不存在的话才可以设置成功
     *
     * @param key
     * @param value
     * @param seconds 过期时间(秒)
     * @return
     */
    public boolean saveNX(final String key, final String value, final long seconds) {
        boolean result = stringRedisTemplate.execute((RedisCallback<Boolean>) connection -> {
            byte[] keyByte = stringRedisTemplate.getStringSerializer().serialize(key);
            byte[] valueByte = stringRedisTemplate.getStringSerializer().serialize(value);
            if (seconds > 0) {
                return connection.set(keyByte, valueByte, Expiration.seconds(seconds), RedisStringCommands.SetOption.SET_IF_ABSENT);
            } else {
                return connection.set(keyByte, valueByte);
            }
        });
        return result;
    }

    /**
     * 获取key
     * 
     * @param key
     * @return
     */
    public String get(final String key) {
        String result = stringRedisTemplate.execute(new RedisCallback<String>() {

            @Override
            public String doInRedis(RedisConnection connection) throws DataAccessException {
                byte[] keyByte = stringRedisTemplate.getStringSerializer().serialize(key);
                byte[] valueByte = connection.get(keyByte);
                return stringRedisTemplate.getStringSerializer().deserialize(valueByte);
            }
        });
        return result;
    }

    public String getNotPrintLog(final String key) { // 不打印日志
        return get(key);
    }

    /**
     * 删除key
     * 
     * @param key
     * @return
     */
    public Long delete(final String key) {
        Long count = stringRedisTemplate.execute(new RedisCallback<Long>() {

            @Override
            public Long doInRedis(RedisConnection connection) throws DataAccessException {
                byte[] keyByte = stringRedisTemplate.getStringSerializer().serialize(key);
                return connection.del(keyByte);
            }
        });
        return count;
    }

    /**
     * 检查key是否存在
     * 
     * @param key
     * @return
     */
    public boolean exist(final String key) {
        boolean result = stringRedisTemplate.execute(new RedisCallback<Boolean>() {

            @Override
            public Boolean doInRedis(RedisConnection connection) throws DataAccessException {
                byte[] keyByte = stringRedisTemplate.getStringSerializer().serialize(key);
                return connection.exists(keyByte);
            }
        });
        return result;
    }

    /**
     * 设置过期时间
     * 
     * @param key
     * @param seconds 秒
     * @return key不存在时返回false
     */
    public boolean expire(final String key, final long seconds) {
        boolean result = stringRedisTemplate.execute(new RedisCallback<Boolean>() {

            @Override
            public Boolean doInRedis(RedisConnection connection) throws DataAccessException {
                byte[] keyByte = stringRedisTemplate.getStringSerializer().serialize(key);
                return connection.expire(keyByte, seconds);
            }
        });
        return result;
    }

    /**
     * 返回key的剩余生存时间，key不存在则返回-2,key存在但没有设置剩余时间则返回-1
     * 
     * @param key
     * @return 返回剩余生存时间(秒)
     */
    public long ttl(final String key) {
        long timeToLive = stringRedisTemplate.execute(new RedisCallback<Long>() {

            @Override
            public Long doInRedis(RedisConnection connection) throws DataAccessException {
                byte[] keyByte = stringRedisTemplate.getStringSerializer().serialize(key);
                return connection.ttl(keyByte);
            }
        });
        return timeToLive;
    }

    public List<String> list(final String key) {
        return stringRedisTemplate.opsForList().range(key, 0, -1);
    }

    /**
     * 从set中获取值
     * 
     * @param key
     * @return
     */
    public String popFromSet(String key) {
        return stringRedisTemplate.opsForSet().pop(key);
    }

    /**
     * 删除key
     */
    public Long removeKeyToSet(String key, String... values) {
       return stringRedisTemplate.opsForSet().remove(key, values);
    }


    /**
     * 保存列表(从左至右)
     * 
     * @param key
     * @param list
     * @param seconds 超时时间
     * @return
     */
    public <T> long addToSet(String key, long seconds, String... set) {
        long result = stringRedisTemplate.opsForSet().add(key, set);
        if (seconds > 0) {
            expire(key, seconds);
        }
        return result;
    }

    /**
     * 如果不存在，则添加到map
     * @param key
     * @param hashKey
     * @param value
     */
    public boolean addToMapIfAbsent(String key, String hashKey, String value) {
        return stringRedisTemplate.opsForHash().putIfAbsent(key, hashKey, value);
    }

    /**
     * 判断是否在map内
     */
    public boolean existInMap(String key, String hashKey) {
        return stringRedisTemplate.opsForHash().hasKey(key, hashKey);
    }

    /**
     * 判断是否在map内
     */
    public String getMapValueByKey(String key, String hashKey) {
        Object value = stringRedisTemplate.opsForHash().get(key, hashKey);
        return Objects.isNull(value) ? null : JSONObject.toJSONString(value);
    }

    public String getMapValueByKeyWhitOutJson(String key, String hashKey) {
        String value = (String)stringRedisTemplate.opsForHash().get(key, hashKey);
        return value;
    }

    /**
     * 获取map
     */
    public String getStringMapValueByKey(String key, String hashKey) {
        Object value = stringRedisTemplate.opsForHash().get(key, hashKey);
        return Objects.isNull(value) ? null : value.toString();
    }

    /**
     * 判断是否在map内
     */
    public void addToMap(String key, String hashKey, String value) {
        stringRedisTemplate.opsForHash().put(key, hashKey, value);
    }

    /**
     * 删除 可以 map
     */
    public void delToMap(String key, String hashKey) {
        stringRedisTemplate.opsForHash().delete(key, hashKey);
    }

    /**
     * 保存列表（从左至右）
     * 
     * @param key
     * @param set
     * @return
     */
    public long addToSet(String key, String... set) {
        return addToSet(key, -1, set);
    }

    /**
     * 是否存在
     * 
     * @param key
     * @param element
     * @return
     */
    public boolean existInSet(String key, String element) {
        return stringRedisTemplate.opsForSet().isMember(key, element);
    }


    public Set<String> getFromSet(String key) {
        return stringRedisTemplate.opsForSet().members(key);
    }

    /**
     * 自增计数器<br>
     * 如果key不存在,则会返回1(自动设置为0)
     * 
     * @param key
     * @param delta
     * @return
     */
    public long increment(String key, long delta) {
        return stringRedisTemplate.opsForValue().increment(key, delta);
    }

    public StringRedisTemplate getStringRedisTemplate() {
        return stringRedisTemplate;
    }

    public void setStringRedisTemplate(StringRedisTemplate stringRedisTemplate) {
        this.stringRedisTemplate = stringRedisTemplate;
    }

    /**
     * 获取map
     */
    public Map<Object, Object> getStringMapEntryByKey(String key) {
        return stringRedisTemplate.opsForHash().entries(key);
    }
}
```