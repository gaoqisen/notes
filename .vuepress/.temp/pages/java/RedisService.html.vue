<template><div><div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>
    <span class="token keyword">private</span> <span class="token class-name">StringRedisTemplate</span> stringRedisTemplate<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 保存对象
     * 
     * <span class="token keyword">@param</span> <span class="token parameter">key</span>
     * <span class="token keyword">@param</span> <span class="token parameter">t</span>
     * <span class="token keyword">@return</span>
     */</span>
    <span class="token keyword">public</span> <span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span> <span class="token keyword">boolean</span> <span class="token function">save</span><span class="token punctuation">(</span><span class="token keyword">final</span> <span class="token class-name">String</span> key<span class="token punctuation">,</span> <span class="token keyword">final</span> <span class="token class-name">T</span> t<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">save</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> t<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 保存对象
     * 
     * <span class="token keyword">@param</span> <span class="token parameter">key</span>
     * <span class="token keyword">@param</span> <span class="token parameter">t</span>
     * <span class="token keyword">@param</span> <span class="token parameter">seconds</span>
     * <span class="token keyword">@return</span>
     */</span>
    <span class="token keyword">public</span> <span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span> <span class="token keyword">boolean</span> <span class="token function">save</span><span class="token punctuation">(</span><span class="token keyword">final</span> <span class="token class-name">String</span> key<span class="token punctuation">,</span> <span class="token keyword">final</span> <span class="token class-name">T</span> t<span class="token punctuation">,</span> <span class="token keyword">final</span> <span class="token keyword">long</span> seconds<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> tStr <span class="token operator">=</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">toJSONString</span><span class="token punctuation">(</span>t<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token function">save</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> tStr<span class="token punctuation">,</span> seconds<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 获取对象
     * 
     * <span class="token keyword">@param</span> <span class="token parameter">key</span>
     * <span class="token keyword">@param</span> <span class="token parameter">clazz</span>
     * <span class="token keyword">@return</span>
     */</span>
    <span class="token keyword">public</span> <span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span> <span class="token class-name">T</span> <span class="token function">get</span><span class="token punctuation">(</span><span class="token keyword">final</span> <span class="token class-name">String</span> key<span class="token punctuation">,</span> <span class="token class-name">Class</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span> clazz<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> tStr <span class="token operator">=</span> <span class="token function">get</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">parseObject</span><span class="token punctuation">(</span>tStr<span class="token punctuation">,</span> clazz<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 保存键值对
     * 
     * <span class="token keyword">@param</span> <span class="token parameter">key</span>
     * <span class="token keyword">@param</span> <span class="token parameter">value</span>
     * <span class="token keyword">@return</span>
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">save</span><span class="token punctuation">(</span><span class="token keyword">final</span> <span class="token class-name">String</span> key<span class="token punctuation">,</span> <span class="token keyword">final</span> <span class="token class-name">String</span> value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">save</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> value<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 保存键值对,如果存在的话，会被覆盖
     * 
     * <span class="token keyword">@param</span> <span class="token parameter">key</span>
     * <span class="token keyword">@param</span> <span class="token parameter">value</span>
     * <span class="token keyword">@param</span> <span class="token parameter">seconds</span> 过期时间(秒)
     * <span class="token keyword">@return</span>
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">save</span><span class="token punctuation">(</span><span class="token keyword">final</span> <span class="token class-name">String</span> key<span class="token punctuation">,</span> <span class="token keyword">final</span> <span class="token class-name">String</span> value<span class="token punctuation">,</span> <span class="token keyword">final</span> <span class="token keyword">long</span> seconds<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">boolean</span> result <span class="token operator">=</span> stringRedisTemplate<span class="token punctuation">.</span><span class="token function">execute</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">RedisCallback</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Boolean</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

            <span class="token annotation punctuation">@Override</span>
            <span class="token keyword">public</span> <span class="token class-name">Boolean</span> <span class="token function">doInRedis</span><span class="token punctuation">(</span><span class="token class-name">RedisConnection</span> connection<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">DataAccessException</span> <span class="token punctuation">{</span>
                <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> keyByte <span class="token operator">=</span> stringRedisTemplate<span class="token punctuation">.</span><span class="token function">getStringSerializer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">serialize</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> valueByte <span class="token operator">=</span> stringRedisTemplate<span class="token punctuation">.</span><span class="token function">getStringSerializer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">serialize</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>seconds <span class="token operator">></span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    connection<span class="token punctuation">.</span><span class="token function">setEx</span><span class="token punctuation">(</span>keyByte<span class="token punctuation">,</span> seconds<span class="token punctuation">,</span> valueByte<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                    connection<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>keyByte<span class="token punctuation">,</span> valueByte<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>

                <span class="token keyword">return</span> <span class="token class-name">Boolean</span><span class="token punctuation">.</span><span class="token constant">TRUE</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> result<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 如果不存在则保存
     * 
     * <span class="token keyword">@param</span> <span class="token parameter">key</span>
     * <span class="token keyword">@param</span> <span class="token parameter">value</span>
     * <span class="token keyword">@return</span>
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">saveNX</span><span class="token punctuation">(</span><span class="token keyword">final</span> <span class="token class-name">String</span> key<span class="token punctuation">,</span> <span class="token keyword">final</span> <span class="token class-name">String</span> value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">boolean</span> result <span class="token operator">=</span> stringRedisTemplate<span class="token punctuation">.</span><span class="token function">execute</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">RedisCallback</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Boolean</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

            <span class="token annotation punctuation">@Override</span>
            <span class="token keyword">public</span> <span class="token class-name">Boolean</span> <span class="token function">doInRedis</span><span class="token punctuation">(</span><span class="token class-name">RedisConnection</span> connection<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">DataAccessException</span> <span class="token punctuation">{</span>
                <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> keyByte <span class="token operator">=</span> stringRedisTemplate<span class="token punctuation">.</span><span class="token function">getStringSerializer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">serialize</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> valueByte <span class="token operator">=</span> stringRedisTemplate<span class="token punctuation">.</span><span class="token function">getStringSerializer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">serialize</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">return</span> connection<span class="token punctuation">.</span><span class="token function">setNX</span><span class="token punctuation">(</span>keyByte<span class="token punctuation">,</span> valueByte<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> result<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 保存键值对,如果不存在的话才可以设置成功
     *
     * <span class="token keyword">@param</span> <span class="token parameter">key</span>
     * <span class="token keyword">@param</span> <span class="token parameter">value</span>
     * <span class="token keyword">@param</span> <span class="token parameter">seconds</span> 过期时间(秒)
     * <span class="token keyword">@return</span>
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">saveNX</span><span class="token punctuation">(</span><span class="token keyword">final</span> <span class="token class-name">String</span> key<span class="token punctuation">,</span> <span class="token keyword">final</span> <span class="token class-name">String</span> value<span class="token punctuation">,</span> <span class="token keyword">final</span> <span class="token keyword">long</span> seconds<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">boolean</span> result <span class="token operator">=</span> stringRedisTemplate<span class="token punctuation">.</span><span class="token function">execute</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token class-name">RedisCallback</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Boolean</span><span class="token punctuation">></span></span><span class="token punctuation">)</span> connection <span class="token operator">-></span> <span class="token punctuation">{</span>
            <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> keyByte <span class="token operator">=</span> stringRedisTemplate<span class="token punctuation">.</span><span class="token function">getStringSerializer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">serialize</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> valueByte <span class="token operator">=</span> stringRedisTemplate<span class="token punctuation">.</span><span class="token function">getStringSerializer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">serialize</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>seconds <span class="token operator">></span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">return</span> connection<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>keyByte<span class="token punctuation">,</span> valueByte<span class="token punctuation">,</span> <span class="token class-name">Expiration</span><span class="token punctuation">.</span><span class="token function">seconds</span><span class="token punctuation">(</span>seconds<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token class-name">RedisStringCommands<span class="token punctuation">.</span>SetOption</span><span class="token punctuation">.</span><span class="token constant">SET_IF_ABSENT</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                <span class="token keyword">return</span> connection<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>keyByte<span class="token punctuation">,</span> valueByte<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> result<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 获取key
     * 
     * <span class="token keyword">@param</span> <span class="token parameter">key</span>
     * <span class="token keyword">@return</span>
     */</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">get</span><span class="token punctuation">(</span><span class="token keyword">final</span> <span class="token class-name">String</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> result <span class="token operator">=</span> stringRedisTemplate<span class="token punctuation">.</span><span class="token function">execute</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">RedisCallback</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

            <span class="token annotation punctuation">@Override</span>
            <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">doInRedis</span><span class="token punctuation">(</span><span class="token class-name">RedisConnection</span> connection<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">DataAccessException</span> <span class="token punctuation">{</span>
                <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> keyByte <span class="token operator">=</span> stringRedisTemplate<span class="token punctuation">.</span><span class="token function">getStringSerializer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">serialize</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> valueByte <span class="token operator">=</span> connection<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>keyByte<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">return</span> stringRedisTemplate<span class="token punctuation">.</span><span class="token function">getStringSerializer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">deserialize</span><span class="token punctuation">(</span>valueByte<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> result<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getNotPrintLog</span><span class="token punctuation">(</span><span class="token keyword">final</span> <span class="token class-name">String</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 不打印日志</span>
        <span class="token keyword">return</span> <span class="token function">get</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 删除key
     * 
     * <span class="token keyword">@param</span> <span class="token parameter">key</span>
     * <span class="token keyword">@return</span>
     */</span>
    <span class="token keyword">public</span> <span class="token class-name">Long</span> <span class="token function">delete</span><span class="token punctuation">(</span><span class="token keyword">final</span> <span class="token class-name">String</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Long</span> count <span class="token operator">=</span> stringRedisTemplate<span class="token punctuation">.</span><span class="token function">execute</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">RedisCallback</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Long</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

            <span class="token annotation punctuation">@Override</span>
            <span class="token keyword">public</span> <span class="token class-name">Long</span> <span class="token function">doInRedis</span><span class="token punctuation">(</span><span class="token class-name">RedisConnection</span> connection<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">DataAccessException</span> <span class="token punctuation">{</span>
                <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> keyByte <span class="token operator">=</span> stringRedisTemplate<span class="token punctuation">.</span><span class="token function">getStringSerializer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">serialize</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">return</span> connection<span class="token punctuation">.</span><span class="token function">del</span><span class="token punctuation">(</span>keyByte<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> count<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 检查key是否存在
     * 
     * <span class="token keyword">@param</span> <span class="token parameter">key</span>
     * <span class="token keyword">@return</span>
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">exist</span><span class="token punctuation">(</span><span class="token keyword">final</span> <span class="token class-name">String</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">boolean</span> result <span class="token operator">=</span> stringRedisTemplate<span class="token punctuation">.</span><span class="token function">execute</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">RedisCallback</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Boolean</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

            <span class="token annotation punctuation">@Override</span>
            <span class="token keyword">public</span> <span class="token class-name">Boolean</span> <span class="token function">doInRedis</span><span class="token punctuation">(</span><span class="token class-name">RedisConnection</span> connection<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">DataAccessException</span> <span class="token punctuation">{</span>
                <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> keyByte <span class="token operator">=</span> stringRedisTemplate<span class="token punctuation">.</span><span class="token function">getStringSerializer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">serialize</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">return</span> connection<span class="token punctuation">.</span><span class="token function">exists</span><span class="token punctuation">(</span>keyByte<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> result<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 设置过期时间
     * 
     * <span class="token keyword">@param</span> <span class="token parameter">key</span>
     * <span class="token keyword">@param</span> <span class="token parameter">seconds</span> 秒
     * <span class="token keyword">@return</span> key不存在时返回false
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">expire</span><span class="token punctuation">(</span><span class="token keyword">final</span> <span class="token class-name">String</span> key<span class="token punctuation">,</span> <span class="token keyword">final</span> <span class="token keyword">long</span> seconds<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">boolean</span> result <span class="token operator">=</span> stringRedisTemplate<span class="token punctuation">.</span><span class="token function">execute</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">RedisCallback</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Boolean</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

            <span class="token annotation punctuation">@Override</span>
            <span class="token keyword">public</span> <span class="token class-name">Boolean</span> <span class="token function">doInRedis</span><span class="token punctuation">(</span><span class="token class-name">RedisConnection</span> connection<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">DataAccessException</span> <span class="token punctuation">{</span>
                <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> keyByte <span class="token operator">=</span> stringRedisTemplate<span class="token punctuation">.</span><span class="token function">getStringSerializer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">serialize</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">return</span> connection<span class="token punctuation">.</span><span class="token function">expire</span><span class="token punctuation">(</span>keyByte<span class="token punctuation">,</span> seconds<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> result<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 返回key的剩余生存时间，key不存在则返回-2,key存在但没有设置剩余时间则返回-1
     * 
     * <span class="token keyword">@param</span> <span class="token parameter">key</span>
     * <span class="token keyword">@return</span> 返回剩余生存时间(秒)
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">long</span> <span class="token function">ttl</span><span class="token punctuation">(</span><span class="token keyword">final</span> <span class="token class-name">String</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">long</span> timeToLive <span class="token operator">=</span> stringRedisTemplate<span class="token punctuation">.</span><span class="token function">execute</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">RedisCallback</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Long</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

            <span class="token annotation punctuation">@Override</span>
            <span class="token keyword">public</span> <span class="token class-name">Long</span> <span class="token function">doInRedis</span><span class="token punctuation">(</span><span class="token class-name">RedisConnection</span> connection<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">DataAccessException</span> <span class="token punctuation">{</span>
                <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> keyByte <span class="token operator">=</span> stringRedisTemplate<span class="token punctuation">.</span><span class="token function">getStringSerializer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">serialize</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">return</span> connection<span class="token punctuation">.</span><span class="token function">ttl</span><span class="token punctuation">(</span>keyByte<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> timeToLive<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">></span></span> <span class="token function">list</span><span class="token punctuation">(</span><span class="token keyword">final</span> <span class="token class-name">String</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> stringRedisTemplate<span class="token punctuation">.</span><span class="token function">opsForList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">range</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 从set中获取值
     * 
     * <span class="token keyword">@param</span> <span class="token parameter">key</span>
     * <span class="token keyword">@return</span>
     */</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">popFromSet</span><span class="token punctuation">(</span><span class="token class-name">String</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> stringRedisTemplate<span class="token punctuation">.</span><span class="token function">opsForSet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 删除key
     */</span>
    <span class="token keyword">public</span> <span class="token class-name">Long</span> <span class="token function">removeKeyToSet</span><span class="token punctuation">(</span><span class="token class-name">String</span> key<span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> values<span class="token punctuation">)</span> <span class="token punctuation">{</span>
       <span class="token keyword">return</span> stringRedisTemplate<span class="token punctuation">.</span><span class="token function">opsForSet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> values<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>


    <span class="token doc-comment comment">/**
     * 保存列表(从左至右)
     * 
     * <span class="token keyword">@param</span> <span class="token parameter">key</span>
     * <span class="token keyword">@param</span> <span class="token parameter">list</span>
     * <span class="token keyword">@param</span> <span class="token parameter">seconds</span> 超时时间
     * <span class="token keyword">@return</span>
     */</span>
    <span class="token keyword">public</span> <span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span> <span class="token keyword">long</span> <span class="token function">addToSet</span><span class="token punctuation">(</span><span class="token class-name">String</span> key<span class="token punctuation">,</span> <span class="token keyword">long</span> seconds<span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> set<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">long</span> result <span class="token operator">=</span> stringRedisTemplate<span class="token punctuation">.</span><span class="token function">opsForSet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> set<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>seconds <span class="token operator">></span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">expire</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> seconds<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> result<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 如果不存在，则添加到map
     * <span class="token keyword">@param</span> <span class="token parameter">key</span>
     * <span class="token keyword">@param</span> <span class="token parameter">hashKey</span>
     * <span class="token keyword">@param</span> <span class="token parameter">value</span>
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">addToMapIfAbsent</span><span class="token punctuation">(</span><span class="token class-name">String</span> key<span class="token punctuation">,</span> <span class="token class-name">String</span> hashKey<span class="token punctuation">,</span> <span class="token class-name">String</span> value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> stringRedisTemplate<span class="token punctuation">.</span><span class="token function">opsForHash</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">putIfAbsent</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> hashKey<span class="token punctuation">,</span> value<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 判断是否在map内
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">existInMap</span><span class="token punctuation">(</span><span class="token class-name">String</span> key<span class="token punctuation">,</span> <span class="token class-name">String</span> hashKey<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> stringRedisTemplate<span class="token punctuation">.</span><span class="token function">opsForHash</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">hasKey</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> hashKey<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 判断是否在map内
     */</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getMapValueByKey</span><span class="token punctuation">(</span><span class="token class-name">String</span> key<span class="token punctuation">,</span> <span class="token class-name">String</span> hashKey<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Object</span> value <span class="token operator">=</span> stringRedisTemplate<span class="token punctuation">.</span><span class="token function">opsForHash</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> hashKey<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token class-name">Objects</span><span class="token punctuation">.</span><span class="token function">isNull</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span> <span class="token operator">?</span> <span class="token keyword">null</span> <span class="token operator">:</span> <span class="token class-name">JSONObject</span><span class="token punctuation">.</span><span class="token function">toJSONString</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getMapValueByKeyWhitOutJson</span><span class="token punctuation">(</span><span class="token class-name">String</span> key<span class="token punctuation">,</span> <span class="token class-name">String</span> hashKey<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> value <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">)</span>stringRedisTemplate<span class="token punctuation">.</span><span class="token function">opsForHash</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> hashKey<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> value<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 获取map
     */</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getStringMapValueByKey</span><span class="token punctuation">(</span><span class="token class-name">String</span> key<span class="token punctuation">,</span> <span class="token class-name">String</span> hashKey<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Object</span> value <span class="token operator">=</span> stringRedisTemplate<span class="token punctuation">.</span><span class="token function">opsForHash</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> hashKey<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token class-name">Objects</span><span class="token punctuation">.</span><span class="token function">isNull</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span> <span class="token operator">?</span> <span class="token keyword">null</span> <span class="token operator">:</span> value<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 判断是否在map内
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">addToMap</span><span class="token punctuation">(</span><span class="token class-name">String</span> key<span class="token punctuation">,</span> <span class="token class-name">String</span> hashKey<span class="token punctuation">,</span> <span class="token class-name">String</span> value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        stringRedisTemplate<span class="token punctuation">.</span><span class="token function">opsForHash</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> hashKey<span class="token punctuation">,</span> value<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 删除 可以 map
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">delToMap</span><span class="token punctuation">(</span><span class="token class-name">String</span> key<span class="token punctuation">,</span> <span class="token class-name">String</span> hashKey<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        stringRedisTemplate<span class="token punctuation">.</span><span class="token function">opsForHash</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">delete</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> hashKey<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 保存列表（从左至右）
     * 
     * <span class="token keyword">@param</span> <span class="token parameter">key</span>
     * <span class="token keyword">@param</span> <span class="token parameter">set</span>
     * <span class="token keyword">@return</span>
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">long</span> <span class="token function">addToSet</span><span class="token punctuation">(</span><span class="token class-name">String</span> key<span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> set<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">addToSet</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span> set<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 是否存在
     * 
     * <span class="token keyword">@param</span> <span class="token parameter">key</span>
     * <span class="token keyword">@param</span> <span class="token parameter">element</span>
     * <span class="token keyword">@return</span>
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">existInSet</span><span class="token punctuation">(</span><span class="token class-name">String</span> key<span class="token punctuation">,</span> <span class="token class-name">String</span> element<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> stringRedisTemplate<span class="token punctuation">.</span><span class="token function">opsForSet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isMember</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> element<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>


    <span class="token keyword">public</span> <span class="token class-name">Set</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">></span></span> <span class="token function">getFromSet</span><span class="token punctuation">(</span><span class="token class-name">String</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> stringRedisTemplate<span class="token punctuation">.</span><span class="token function">opsForSet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">members</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 自增计数器<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>br</span><span class="token punctuation">></span></span>
     * 如果key不存在,则会返回1(自动设置为0)
     * 
     * <span class="token keyword">@param</span> <span class="token parameter">key</span>
     * <span class="token keyword">@param</span> <span class="token parameter">delta</span>
     * <span class="token keyword">@return</span>
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">long</span> <span class="token function">increment</span><span class="token punctuation">(</span><span class="token class-name">String</span> key<span class="token punctuation">,</span> <span class="token keyword">long</span> delta<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> stringRedisTemplate<span class="token punctuation">.</span><span class="token function">opsForValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">increment</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> delta<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">StringRedisTemplate</span> <span class="token function">getStringRedisTemplate</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> stringRedisTemplate<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setStringRedisTemplate</span><span class="token punctuation">(</span><span class="token class-name">StringRedisTemplate</span> stringRedisTemplate<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>stringRedisTemplate <span class="token operator">=</span> stringRedisTemplate<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 获取map
     */</span>
    <span class="token keyword">public</span> <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Object</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">></span></span> <span class="token function">getStringMapEntryByKey</span><span class="token punctuation">(</span><span class="token class-name">String</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> stringRedisTemplate<span class="token punctuation">.</span><span class="token function">opsForHash</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">entries</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


