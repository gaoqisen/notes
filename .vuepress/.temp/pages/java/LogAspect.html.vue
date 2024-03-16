<template><div><div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Aspect</span>
<span class="token annotation punctuation">@Component</span>
<span class="token annotation punctuation">@Slf4j</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">LogAspect</span> <span class="token keyword">implements</span> <span class="token class-name">Ordered</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">HttpServletRequest</span> request<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 切点配置
     */</span>
    <span class="token annotation punctuation">@Pointcut</span><span class="token punctuation">(</span><span class="token string">"@annotation(org.springframework.web.bind.annotation.RequestMapping)"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">logMethodPointcut</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Pointcut</span><span class="token punctuation">(</span><span class="token string">"@annotation(org.springframework.web.bind.annotation.PostMapping)"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">logMethodPointcut2</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Around</span><span class="token punctuation">(</span><span class="token string">"logMethodPointcut() || logMethodPointcut2() "</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">Object</span> <span class="token function">interceptor</span><span class="token punctuation">(</span><span class="token class-name">ProceedingJoinPoint</span> joinPoint<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Throwable</span> <span class="token punctuation">{</span>

        <span class="token comment">// 切面打印日志</span>
        <span class="token keyword">long</span> startTime <span class="token operator">=</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">currentTimeMillis</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Object</span> result <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token keyword">long</span> costTime <span class="token operator">=</span> <span class="token number">0L</span><span class="token punctuation">;</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            result <span class="token operator">=</span> joinPoint<span class="token punctuation">.</span><span class="token function">proceed</span><span class="token punctuation">(</span>joinPoint<span class="token punctuation">.</span><span class="token function">getArgs</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            costTime <span class="token operator">=</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">currentTimeMillis</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> startTime<span class="token punctuation">;</span>
            <span class="token keyword">return</span> result<span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Throwable</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> e<span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
            <span class="token function">log</span><span class="token punctuation">(</span>joinPoint<span class="token punctuation">,</span> result<span class="token punctuation">,</span> costTime<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">// 记录响应日志</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 记录日志
     * 
     * <span class="token keyword">@param</span> <span class="token parameter">result</span> 方法返回值
     * <span class="token keyword">@param</span> <span class="token parameter">costTime</span> 方法耗时(ms)
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">log</span><span class="token punctuation">(</span><span class="token class-name">ProceedingJoinPoint</span> joinPoint<span class="token punctuation">,</span> <span class="token class-name">Object</span> result<span class="token punctuation">,</span> <span class="token keyword">long</span> costTime<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token comment">// 当前执行方法参数</span>
            <span class="token class-name">String</span> methodName <span class="token operator">=</span> joinPoint<span class="token punctuation">.</span><span class="token function">getSignature</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">String</span> className <span class="token operator">=</span> joinPoint<span class="token punctuation">.</span><span class="token function">getTarget</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">String</span> url <span class="token operator">=</span> request<span class="token punctuation">.</span><span class="token function">getRequestURI</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"url:{}, method:{}.{}() header:{},param:{},return:{},cost:{} ms"</span><span class="token punctuation">,</span> url<span class="token punctuation">,</span> className<span class="token punctuation">,</span> methodName<span class="token punctuation">,</span> <span class="token class-name">HeaderThreadLocal</span><span class="token punctuation">.</span><span class="token function">getHeader</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> joinPoint<span class="token punctuation">.</span><span class="token function">getArgs</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> result<span class="token punctuation">,</span> costTime<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            log<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">""</span><span class="token punctuation">,</span> e<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">getOrder</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


