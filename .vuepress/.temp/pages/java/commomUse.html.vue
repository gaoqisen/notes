<template><div><h2 id="一、小工具" tabindex="-1"><a class="header-anchor" href="#一、小工具" aria-hidden="true">#</a> 一、小工具</h2>
<h3 id="_1-1-beancopier" tabindex="-1"><a class="header-anchor" href="#_1-1-beancopier" aria-hidden="true">#</a> 1.1 BeanCopier</h3>
<p>拷贝两个对象,网上资料显示: BeanCopier的性能是PropertyUtils (apache-common)的504倍。PropertyUtils的性能是BeanUtils(apache-common)的1.71倍,因此对象的拷贝尽量使用BeanCopier。注意属性没有提供set方法，只是提供了get方法是会报错的，无法复制属性</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token comment">// 拷贝对象， 在create对象的时候会出现性能瓶颈，可以将创建的过程放在缓存中，方便直接获取</span>
<span class="token class-name">BeanCopier</span> copier <span class="token operator">=</span> <span class="token class-name">BeanCopier</span><span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token class-name">FromEntity</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token class-name">ToEntity</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  
<span class="token class-name">ToEntity</span> <span class="token keyword">to</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ToEntity</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  
copier<span class="token punctuation">.</span><span class="token function">copy</span><span class="token punctuation">(</span>from<span class="token punctuation">,</span> <span class="token keyword">to</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-2-内存分页" tabindex="-1"><a class="header-anchor" href="#_1-2-内存分页" aria-hidden="true">#</a> 1.2 内存分页</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token comment">// 总条数</span>
<span class="token keyword">int</span> totalRow <span class="token operator">=</span> <span class="token number">101</span><span class="token punctuation">;</span>
<span class="token comment">// 每页记录数</span>
<span class="token keyword">int</span> pageSize <span class="token operator">=</span> <span class="token number">20</span><span class="token punctuation">;</span>
<span class="token comment">// 总页数</span>
<span class="token keyword">int</span> totalPage <span class="token operator">=</span> <span class="token punctuation">(</span>totalRow <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">/</span> pageSize <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>

<span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i<span class="token operator">&lt;</span> totalPage<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">int</span> start <span class="token operator">=</span> i <span class="token operator">*</span> pageSize<span class="token punctuation">;</span>
	<span class="token keyword">int</span> end <span class="token operator">=</span> <span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">min</span><span class="token punctuation">(</span><span class="token punctuation">(</span>i <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">*</span> pageSize<span class="token punctuation">,</span> totalRow<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-3-分页助手" tabindex="-1"><a class="header-anchor" href="#_1-3-分页助手" aria-hidden="true">#</a> 1.3 分页助手</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@FunctionalInterface</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">PageTemplateHelper</span> <span class="token punctuation">{</span>

    <span class="token doc-comment comment">/**
     * 初始化模版
     * <span class="token keyword">@param</span> <span class="token parameter">pageTemplateHelper</span> 分页模版
     */</span>
    <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">init</span><span class="token punctuation">(</span><span class="token class-name">PageTemplateHelper</span> pageTemplateHelper<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        pageTemplateHelper<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 执行分页逻辑
     */</span>
    <span class="token keyword">default</span> <span class="token keyword">void</span> <span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 总条数</span>
        <span class="token keyword">int</span> totalRow <span class="token operator">=</span> <span class="token number">50</span><span class="token punctuation">;</span>
        <span class="token comment">// 每页记录数</span>
        <span class="token keyword">int</span> pageSize <span class="token operator">=</span> <span class="token number">20</span><span class="token punctuation">;</span>
        <span class="token comment">// 总页数</span>
        <span class="token keyword">int</span> totalPage <span class="token operator">=</span> <span class="token punctuation">(</span>totalRow <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">/</span> pageSize <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i<span class="token operator">&lt;</span> totalPage<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">int</span> total <span class="token operator">=</span> <span class="token function">execute</span><span class="token punctuation">(</span>i <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">,</span> pageSize<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>total <span class="token operator">!=</span> totalRow<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                totalRow <span class="token operator">=</span> total<span class="token punctuation">;</span>
                totalPage <span class="token operator">=</span> <span class="token punctuation">(</span>totalRow <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">/</span> pageSize <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 执行分页后的业务逻辑
     *
     * <span class="token keyword">@param</span> <span class="token parameter">page</span> 当前页
     * <span class="token keyword">@param</span> <span class="token parameter">pageSize</span> 页面数量
     * <span class="token keyword">@return</span> 总页数
     */</span>
    <span class="token keyword">abstract</span> <span class="token keyword">int</span> <span class="token function">execute</span><span class="token punctuation">(</span><span class="token keyword">int</span> page<span class="token punctuation">,</span> <span class="token keyword">int</span> pageSize<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token punctuation">}</span>

<span class="token comment">// 使用方法,引入函数式方法</span>
<span class="token class-name">PageTemplateHelper</span><span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">(</span>start<span class="token punctuation">,</span> end<span class="token punctuation">)</span> <span class="token operator">-></span> <span class="token punctuation">{</span>
  <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>start <span class="token operator">+</span> <span class="token string">", "</span> <span class="token operator">+</span> end<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token number">100</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-4-分表任务执行助手" tabindex="-1"><a class="header-anchor" href="#_1-4-分表任务执行助手" aria-hidden="true">#</a> 1.4 分表任务执行助手</h3>
<p>配置</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Slf4j</span>
<span class="token annotation punctuation">@Component</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SlaveDbConfig</span> <span class="token keyword">implements</span> <span class="token class-name">InitializingBean</span> <span class="token punctuation">{</span>
    
    <span class="token keyword">public</span> <span class="token keyword">final</span> <span class="token keyword">static</span> <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">SqlSessionFactory</span><span class="token punctuation">></span></span> <span class="token constant">SLAVE_DS_FACTORY_MAP</span> <span class="token operator">=</span> <span class="token class-name">Maps</span><span class="token punctuation">.</span><span class="token function">newHashMap</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    
    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">AbstractDataSourceAdapter</span> abstractDataSourceAdapter<span class="token punctuation">;</span>
    
    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">SpringBootShardingRuleConfigurationProperties</span> shardingRule<span class="token punctuation">;</span>
    
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">afterPropertiesSet</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        <span class="token function">initSlaveDsFactoryMap</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">initSlaveDsFactoryMap</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"init slave SqlSessionFactory begin"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 通过配置文件获取从库配置名</span>
        <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">></span></span> slaveDsNames <span class="token operator">=</span> <span class="token function">getSlaveDsNames</span><span class="token punctuation">(</span>shardingRule<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 获取所有数据库连接配置</span>
        <span class="token keyword">final</span> <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">DataSource</span><span class="token punctuation">></span></span> dataSourceMap <span class="token operator">=</span> abstractDataSourceAdapter<span class="token punctuation">.</span><span class="token function">getDataSourceMap</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Set</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Entry</span><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">DataSource</span><span class="token punctuation">></span><span class="token punctuation">></span></span> entries <span class="token operator">=</span> dataSourceMap<span class="token punctuation">.</span><span class="token function">entrySet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Entry</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">DataSource</span><span class="token punctuation">></span></span> entry <span class="token operator">:</span> entries<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">final</span> <span class="token class-name">String</span> dsName <span class="token operator">=</span> entry<span class="token punctuation">.</span><span class="token function">getKey</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// 从库配置不为空，并且不在从库里则不处理</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">CollectionUtils</span><span class="token punctuation">.</span><span class="token function">isNotEmpty</span><span class="token punctuation">(</span>slaveDsNames<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>slaveDsNames<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span>dsName<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token keyword">continue</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
            <span class="token class-name">SqlSessionFactoryBean</span> sqlSessionFactoryBean <span class="token operator">=</span> <span class="token function">getSqlSessionFactoryBean</span><span class="token punctuation">(</span>entry<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">try</span> <span class="token punctuation">{</span>
                <span class="token constant">SLAVE_DS_FACTORY_MAP</span><span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>dsName<span class="token punctuation">,</span> sqlSessionFactoryBean<span class="token punctuation">.</span><span class="token function">getObject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                log<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">"init slave SqlSessionFactory exception, dsName={}"</span><span class="token punctuation">,</span> dsName<span class="token punctuation">,</span> e<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"init slave SqlSessionFactory ok {}"</span><span class="token punctuation">,</span> dsName<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"init slave SqlSessionFactory end"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
    <span class="token keyword">private</span> <span class="token class-name">SqlSessionFactoryBean</span> <span class="token function">getSqlSessionFactoryBean</span><span class="token punctuation">(</span><span class="token class-name">Entry</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">DataSource</span><span class="token punctuation">></span></span> entry<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">final</span> <span class="token class-name">DataSource</span> dataSource <span class="token operator">=</span> entry<span class="token punctuation">.</span><span class="token function">getValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 必须为每个数据源创建不同的SqlSessionFactory,不能移到for循环外</span>
        <span class="token class-name">SqlSessionFactoryBean</span> sqlSessionFactoryBean <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SqlSessionFactoryBean</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        sqlSessionFactoryBean<span class="token punctuation">.</span><span class="token function">setDataSource</span><span class="token punctuation">(</span>dataSource<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">PathMatchingResourcePatternResolver</span> resolver <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PathMatchingResourcePatternResolver</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        sqlSessionFactoryBean<span class="token punctuation">.</span><span class="token function">setConfigLocation</span><span class="token punctuation">(</span>resolver<span class="token punctuation">.</span><span class="token function">getResource</span><span class="token punctuation">(</span><span class="token string">"classpath:/META-INF/mybatis/mybatis-config.xml"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 添加xml路径</span>
        <span class="token class-name">Resource</span><span class="token punctuation">[</span><span class="token punctuation">]</span> resources <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Resource</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">{</span>resolver<span class="token punctuation">.</span><span class="token function">getResource</span><span class="token punctuation">(</span><span class="token string">"classpath:/sql/CreditApplyMapper.xml"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                resolver<span class="token punctuation">.</span><span class="token function">getResource</span><span class="token punctuation">(</span><span class="token string">"classpath:/sql/TestMapper.xml"</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
        sqlSessionFactoryBean<span class="token punctuation">.</span><span class="token function">setMapperLocations</span><span class="token punctuation">(</span>resources<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> sqlSessionFactoryBean<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
    <span class="token doc-comment comment">/**
     * 获取所有从库的 ds name
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">></span></span> <span class="token function">getSlaveDsNames</span><span class="token punctuation">(</span><span class="token class-name">SpringBootShardingRuleConfigurationProperties</span> shardingRule<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">></span></span> slaveDsNames <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">null</span> <span class="token operator">==</span> shardingRule<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> slaveDsNames<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">YamlMasterSlaveRuleConfiguration</span><span class="token punctuation">></span></span> masterSlaveRules <span class="token operator">=</span> shardingRule<span class="token punctuation">.</span><span class="token function">getMasterSlaveRules</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">MapUtils</span><span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span>masterSlaveRules<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> slaveDsNames<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token class-name">Set</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Entry</span><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">YamlMasterSlaveRuleConfiguration</span><span class="token punctuation">></span><span class="token punctuation">></span></span> entries <span class="token operator">=</span> masterSlaveRules<span class="token punctuation">.</span><span class="token function">entrySet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Entry</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">YamlMasterSlaveRuleConfiguration</span><span class="token punctuation">></span></span> entry <span class="token operator">:</span> entries<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">final</span> <span class="token class-name">YamlMasterSlaveRuleConfiguration</span> yamlMasterSlaveRuleConfiguration <span class="token operator">=</span> entry<span class="token punctuation">.</span><span class="token function">getValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            slaveDsNames<span class="token punctuation">.</span><span class="token function">addAll</span><span class="token punctuation">(</span>yamlMasterSlaveRuleConfiguration<span class="token punctuation">.</span><span class="token function">getSlaveDataSourceNames</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> slaveDsNames<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>模板</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Slf4j</span>
<span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">BatchTaskSplitHandleTemplate</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">SqlSessionFactory</span><span class="token punctuation">></span></span> factoryMap<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 分表数量
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token keyword">int</span> tableNum<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">Class</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span> type<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">BatchTaskSplitHandleTemplate</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>factoryMap <span class="token operator">=</span> <span class="token class-name">SlaveDbConfig</span><span class="token punctuation">.</span><span class="token constant">SLAVE_DS_FACTORY_MAP</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>tableNum <span class="token operator">=</span> <span class="token number">128</span><span class="token punctuation">;</span>

        <span class="token class-name">Type</span> superClass <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getGenericSuperclass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>superClass <span class="token keyword">instanceof</span> <span class="token class-name">ParameterizedType</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">ParameterizedType</span> parameterizedType <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">ParameterizedType</span><span class="token punctuation">)</span> superClass<span class="token punctuation">;</span>
            <span class="token class-name">Type</span><span class="token punctuation">[</span><span class="token punctuation">]</span> actualTypeArguments <span class="token operator">=</span> parameterizedType<span class="token punctuation">.</span><span class="token function">getActualTypeArguments</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>actualTypeArguments<span class="token punctuation">.</span>length <span class="token operator">></span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">this</span><span class="token punctuation">.</span>type <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">Class</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span><span class="token punctuation">)</span>actualTypeArguments<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 执行任务
     *
     * <span class="token keyword">@param</span> <span class="token parameter">begin</span> 开始时间
     * <span class="token keyword">@param</span> <span class="token parameter">end</span> 结束时间
     * <span class="token keyword">@param</span> <span class="token parameter">database</span> 数据库名
     * <span class="token keyword">@param</span> <span class="token parameter">batchNum</span> 批次处理数量
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">executeTake</span><span class="token punctuation">(</span><span class="token class-name">Date</span> begin<span class="token punctuation">,</span> <span class="token class-name">Date</span> end<span class="token punctuation">,</span> <span class="token class-name">String</span> database<span class="token punctuation">,</span> <span class="token class-name">Integer</span> batchNum<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">final</span> <span class="token class-name">Set</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Map<span class="token punctuation">.</span>Entry</span><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">SqlSessionFactory</span><span class="token punctuation">></span><span class="token punctuation">></span></span> entries <span class="token operator">=</span> factoryMap<span class="token punctuation">.</span><span class="token function">entrySet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">T</span> dynamicMapper<span class="token punctuation">;</span>
        <span class="token class-name">SqlSessionFactory</span> sqlSessionFactory<span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Map<span class="token punctuation">.</span>Entry</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">SqlSessionFactory</span><span class="token punctuation">></span></span> entry <span class="token operator">:</span> entries<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">final</span> <span class="token class-name">String</span> dsName <span class="token operator">=</span> entry<span class="token punctuation">.</span><span class="token function">getKey</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">StringUtils</span><span class="token punctuation">.</span><span class="token function">isNotBlank</span><span class="token punctuation">(</span>database<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span><span class="token class-name">StringUtils</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>database<span class="token punctuation">,</span> dsName<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">continue</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            sqlSessionFactory <span class="token operator">=</span> factoryMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>dsName<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">Objects</span><span class="token punctuation">.</span><span class="token function">isNull</span><span class="token punctuation">(</span>sqlSessionFactory<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"执行任务 break:{}"</span><span class="token punctuation">,</span> dsName<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">continue</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            dynamicMapper <span class="token operator">=</span> <span class="token class-name">SqlSessionManager</span><span class="token punctuation">.</span><span class="token function">newInstance</span><span class="token punctuation">(</span>sqlSessionFactory<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getMapper</span><span class="token punctuation">(</span>type<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">Long</span> maxId <span class="token operator">=</span> <span class="token number">0L</span><span class="token punctuation">;</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Integer</span> tableIndex <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> tableIndex <span class="token operator">&lt;</span> tableNum<span class="token punctuation">;</span> tableIndex<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"datasource={} tableIndex={} maxId={} begin"</span><span class="token punctuation">,</span> dsName<span class="token punctuation">,</span> tableIndex<span class="token punctuation">,</span> maxId<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token class-name">Long</span> id <span class="token operator">=</span> <span class="token function">businessHandle</span><span class="token punctuation">(</span>batchNum<span class="token punctuation">,</span> tableIndex<span class="token punctuation">,</span> maxId<span class="token punctuation">,</span> dynamicMapper<span class="token punctuation">,</span> begin<span class="token punctuation">,</span> end<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    maxId <span class="token operator">=</span> <span class="token class-name">Objects</span><span class="token punctuation">.</span><span class="token function">isNull</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span> <span class="token operator">?</span> <span class="token number">0L</span> <span class="token operator">:</span> id<span class="token punctuation">;</span>
                    <span class="token keyword">if</span> <span class="token punctuation">(</span>maxId <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"datasource={} tableIndex={} end"</span><span class="token punctuation">,</span> dsName<span class="token punctuation">,</span> tableIndex<span class="token punctuation">)</span><span class="token punctuation">;</span>
                        <span class="token keyword">break</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                    log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"datasource={} tableIndex={} maxId={} processing"</span><span class="token punctuation">,</span> dsName<span class="token punctuation">,</span> tableIndex<span class="token punctuation">,</span> maxId<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 业务处理抽象方法
     *
     * <span class="token keyword">@param</span> <span class="token parameter">batchNum</span> 限制数量
     * <span class="token keyword">@param</span> <span class="token parameter">tableIndex</span> 表索引
     * <span class="token keyword">@param</span> <span class="token parameter">maxId</span> 当前处理最大业务ID
     * <span class="token keyword">@param</span> <span class="token parameter">mapper</span> 表mapper
     * <span class="token keyword">@param</span> <span class="token parameter">begin</span> 开始时间
     * <span class="token keyword">@param</span> <span class="token parameter">end</span> 结束时间
     * <span class="token keyword">@return</span> 下一次处理的业务ID
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token class-name">Long</span> <span class="token function">businessHandle</span><span class="token punctuation">(</span><span class="token class-name">Integer</span> batchNum<span class="token punctuation">,</span> <span class="token class-name">Integer</span> tableIndex<span class="token punctuation">,</span> <span class="token class-name">Long</span> maxId<span class="token punctuation">,</span> <span class="token class-name">T</span> mapper<span class="token punctuation">,</span> <span class="token class-name">Date</span> begin<span class="token punctuation">,</span> <span class="token class-name">Date</span> end<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用样例</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>
<span class="token operator">&lt;</span>select id<span class="token operator">=</span><span class="token string">"selectByTableIndexAndExample"</span> parameterType<span class="token operator">=</span><span class="token string">"map"</span>
        resultMap<span class="token operator">=</span><span class="token string">"com.oppo.finance.pandora.admin.dao.mysql.mapper.TestMapper.BaseResultMap"</span><span class="token operator">></span>
    select
        <span class="token operator">*</span>
    from loan_apply_$<span class="token punctuation">{</span>tableIndex<span class="token punctuation">}</span> limit $<span class="token punctuation">{</span>example<span class="token punctuation">.</span>startIndex<span class="token punctuation">}</span> <span class="token punctuation">,</span> $<span class="token punctuation">{</span>example<span class="token punctuation">.</span>pageSize<span class="token punctuation">}</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>select<span class="token operator">></span>


<span class="token annotation punctuation">@Slf4j</span>
<span class="token annotation punctuation">@Component</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DemoService</span> <span class="token keyword">extends</span> <span class="token class-name">BatchTaskSplitHandleTemplate</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">TestExpandMapper</span><span class="token punctuation">></span></span> <span class="token punctuation">{</span>


    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">Long</span> <span class="token function">businessHandle</span><span class="token punctuation">(</span><span class="token class-name">Integer</span> batchNum<span class="token punctuation">,</span> <span class="token class-name">Integer</span> tableIndex<span class="token punctuation">,</span> <span class="token class-name">Long</span> maxId<span class="token punctuation">,</span>
                               <span class="token class-name">TestExpandMapper</span> mapper<span class="token punctuation">,</span> <span class="token class-name">Date</span> begin<span class="token punctuation">,</span> <span class="token class-name">Date</span> end<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">DzTestExample</span> example <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">DzTestExample</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        example<span class="token punctuation">.</span><span class="token function">createCriteria</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">andIdGreaterThan</span><span class="token punctuation">(</span>maxId<span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">andCreateTimeBetween</span><span class="token punctuation">(</span>begin<span class="token punctuation">,</span> end<span class="token punctuation">)</span><span class="token punctuation">;</span>
        example<span class="token punctuation">.</span><span class="token function">limit</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> batchNum<span class="token punctuation">)</span><span class="token punctuation">;</span>
        example<span class="token punctuation">.</span><span class="token function">setOrderByClause</span><span class="token punctuation">(</span><span class="token string">"id ASC"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Test</span><span class="token punctuation">></span></span> <span class="token class-name">TestList</span> <span class="token operator">=</span> mapper<span class="token punctuation">.</span><span class="token function">selectByTableIndexAndExample</span><span class="token punctuation">(</span>tableIndex<span class="token punctuation">,</span> example<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">CollectionUtils</span><span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token class-name">TestList</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token number">0L</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>


        <span class="token keyword">return</span> <span class="token class-name">TestList</span><span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">max</span><span class="token punctuation">(</span><span class="token class-name">Comparator</span><span class="token punctuation">.</span><span class="token function">comparing</span><span class="token punctuation">(</span><span class="token class-name">Test</span><span class="token operator">::</span><span class="token function">getId</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">orElse</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Test</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>


<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DemoServiceTest</span> <span class="token keyword">extends</span> <span class="token class-name">BaseTest</span> <span class="token punctuation">{</span>
    
    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">DemoService</span> demoService<span class="token punctuation">;</span>
    
    <span class="token annotation punctuation">@Test</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">DateTime</span> now <span class="token operator">=</span> <span class="token class-name">DateTime</span><span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Date</span> yesterday <span class="token operator">=</span> now<span class="token punctuation">.</span><span class="token function">minusDays</span><span class="token punctuation">(</span><span class="token number">50</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toDate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Date</span> today <span class="token operator">=</span> now<span class="token punctuation">.</span><span class="token function">toDate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        demoService<span class="token punctuation">.</span><span class="token function">executeTake</span><span class="token punctuation">(</span>yesterday<span class="token punctuation">,</span> today<span class="token punctuation">,</span> <span class="token string">"database"</span><span class="token punctuation">,</span><span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="二、字符处理" tabindex="-1"><a class="header-anchor" href="#二、字符处理" aria-hidden="true">#</a> 二、字符处理</h2>
<h3 id="_2-1-字符替换" tabindex="-1"><a class="header-anchor" href="#_2-1-字符替换" aria-hidden="true">#</a> 2.1 字符替换</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token comment">// Hi,666</span>
<span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span><span class="token string">"Hi,%s"</span><span class="token punctuation">,</span> <span class="token string">"666"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//f的使用  </span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">"年-月-日 时:分:秒  %tF%n %tT%n"</span><span class="token punctuation">,</span><span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-忽略全角半角方法" tabindex="-1"><a class="header-anchor" href="#_2-2-忽略全角半角方法" aria-hidden="true">#</a> 2.2 忽略全角半角方法</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>   <span class="token doc-comment comment">/**
     转半角的函数(DBC case)<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>br</span><span class="token punctuation">/></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>br</span><span class="token punctuation">/></span></span>
     全角空格为12288，半角空格为32
     其他字符半角(33-126)与全角(65281-65374)的对应关系是：均相差65248
     * <span class="token keyword">@param</span> <span class="token parameter">input</span> 任意字符串
     * <span class="token keyword">@return</span> 半角字符串
     *
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">String</span> <span class="token function">toDbc</span><span class="token punctuation">(</span><span class="token class-name">String</span> input<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token class-name">UT<span class="token punctuation">.</span>Str</span><span class="token punctuation">.</span><span class="token function">isNullOrEmpty</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">char</span><span class="token punctuation">[</span><span class="token punctuation">]</span> c <span class="token operator">=</span> input<span class="token punctuation">.</span><span class="token function">toCharArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> c<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>c<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token number">12288</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">//全角空格为12288，半角空格为32</span>
                c<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">char</span><span class="token punctuation">)</span> <span class="token number">32</span><span class="token punctuation">;</span>
                <span class="token keyword">continue</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>c<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">></span> <span class="token number">65280</span> <span class="token operator">&amp;&amp;</span> c<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">&lt;</span> <span class="token number">65375</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">//其他字符半角(33-126)与全角(65281-65374)的对应关系是：均相差65248</span>
                c<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">char</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>c<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">-</span> <span class="token number">65248</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-3-获取小数位数" tabindex="-1"><a class="header-anchor" href="#_2-3-获取小数位数" aria-hidden="true">#</a> 2.3 获取小数位数</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token class-name">BigDecimal</span> bd <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BigDecimal</span><span class="token punctuation">(</span><span class="token string">"3.1002000"</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
bd <span class="token operator">=</span> <span class="token class-name">BigDecimal</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span>bd<span class="token punctuation">.</span><span class="token function">doubleValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>bd<span class="token punctuation">.</span><span class="token function">scale</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-4-将指定数据放到第一位" tabindex="-1"><a class="header-anchor" href="#_2-4-将指定数据放到第一位" aria-hidden="true">#</a> 2.4 将指定数据放到第一位</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">specifyChannelFirst</span><span class="token punctuation">(</span><span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">InfoDto</span><span class="token punctuation">></span></span> list<span class="token punctuation">,</span> <span class="token class-name">String</span> channelCode<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        list<span class="token punctuation">.</span><span class="token function">sort</span><span class="token punctuation">(</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">)</span> <span class="token operator">-></span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>a<span class="token punctuation">.</span><span class="token function">getChannelCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>channelCode<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>b<span class="token punctuation">.</span><span class="token function">getChannelCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>channelCode<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">return</span> <span class="token number">1</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-5-一些技巧" tabindex="-1"><a class="header-anchor" href="#_2-5-一些技巧" aria-hidden="true">#</a> 2.5 一些技巧</h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>1、分库分表场景，定时任务需要扫数据：获取从库的所有数据源（table_1, table_2...）,遍历数据源用id + limit查询并处理数据（limit 0, 10; limit 10, 10）
2、测试环境不够，本地环境启动联调方案：
 - 每个服务添加route-tag（local，test1，test2等）
 - http接口header传递route-tag=local
 - 网关根据header=local路由到对应服务
 - dubbo接口根据route-tag路由：服务提供者将标签写到zookeeper，消费者调用时根据标签过滤提供者进行路由，没找到路由到就降级使用没有tag的路由
 - rocketMq根据route-tag路由：tag方式、不同环境使用不同topic（SendMessageHook改写topic）、不同环境不同集群、同一个topci不同的ConsumerGroup、自定义AllocateMessageQueueStrategy实现灰度队列和正式队列的区分(将灰度label标记在灰度实例的ClientID中，并在分配队列时，将每个Broker的指定比例的前N个队列用于所有灰度消费者来进行分配)
 https://github.com/apache/rocketmq/issues/3265


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="三、一些命令" tabindex="-1"><a class="header-anchor" href="#三、一些命令" aria-hidden="true">#</a> 三、一些命令</h2>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>// 查看java运行程序的端口
jps
// 查看java线程
jstack <span class="token number">23606</span> <span class="token operator">></span> test.txt
// java性能分析
jstat <span class="token parameter variable">-gc</span> <span class="token number">23606</span>
// 查看java内存
jmap <span class="token parameter variable">-dump:format</span><span class="token operator">=</span>b,file<span class="token operator">=</span>test.bin <span class="token number">23579</span>
// 查看汇编指令
javap <span class="token parameter variable">-c</span> filename
// java控制台
jconsole
// 查看jvm
jvisualvm
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="四、基础" tabindex="-1"><a class="header-anchor" href="#四、基础" aria-hidden="true">#</a> 四、基础</h2>
<h3 id="_4-1-java方法中参数的传递-java中只有值传递" tabindex="-1"><a class="header-anchor" href="#_4-1-java方法中参数的传递-java中只有值传递" aria-hidden="true">#</a> 4.1 java方法中参数的传递(java中只有值传递)：</h3>
<ul>
<li>
<p>一个方法不能修改一个基本数据类型的参数（即数值型或布尔型)(方法中改变基本类型数据，不会影响到之前的数据。相当于拷贝数据)</p>
</li>
<li>
<p>一个方法可以改变一个对象参数的状态。(对象: 方法中改变对象的数据，原始的对象的值会跟着改变。)</p>
</li>
<li>
<p>一个方法不能让对象参数引用一个新的对象</p>
</li>
</ul>
<h3 id="_4-2-与equals的区别" tabindex="-1"><a class="header-anchor" href="#_4-2-与equals的区别" aria-hidden="true">#</a> 4.2 ==与equals的区别</h3>
<p>== 判断的是是否是对象的地址，即判断连个对象是不是同一个地址。（基本数据类型对比的是值，引用数据类型对比的是对象地址）</p>
<p>equals 判断的是值是否相同（对象没有覆盖equals方法相当于== ，否则通过覆盖的equals判断对象的值是否相等）</p>
<ul>
<li>
<p>如果对象需要用equals对比，需要重写equals方法。</p>
</li>
<li>
<p>String 对象是重写过equals方法的，所有string的equals对比的是值。</p>
</li>
<li>
<p>当创建string类型对象的时候，虚拟机会在常量池中找是否有相同的对象，如果有就把它赋给当前引用，否则就新创建对象</p>
</li>
</ul>
<h3 id="_4-3-hashcode与equals" tabindex="-1"><a class="header-anchor" href="#_4-3-hashcode与equals" aria-hidden="true">#</a> 4.3 hashCode与equals</h3>
<ul>
<li>
<p>hashCode的作用就是获取哈西码。它实际返回的是一个int整数。这个哈西码的作用就是确定索引的位置（可以快速找到所需要的对象）。</p>
</li>
<li>
<p>hashCode在map中的作用就是为了减少equals的执行次数,相应就提高了执行速度。</p>
</li>
<li>
<p>如果不同的对象拥有相同的hashCode值，他们也不一定是相等的。如果相同的情况下，就像HashSet一样，会使用equals去对比值是否相同。</p>
</li>
</ul>
<h2 id="五、事务" tabindex="-1"><a class="header-anchor" href="#五、事务" aria-hidden="true">#</a> 五、事务</h2>
<h3 id="_5-1-transactional注解在什么情况下会失效" tabindex="-1"><a class="header-anchor" href="#_5-1-transactional注解在什么情况下会失效" aria-hidden="true">#</a> 5.1 @transactional注解在什么情况下会失效</h3>
<ol>
<li>只能应用到public修饰符上，其它修饰符不起作用，但不报错</li>
<li>数据库引擎不支持事务(Mysql的MyISAM不支持事务)</li>
<li>没有被 Spring 管理</li>
<li>数据源没有配置事务管理器</li>
<li>异常捕获之后不抛出。try{}catch(Exception e){}</li>
<li>@Transactional 注解属性 propagation 设置错误，如：<code v-pre>TransactionDefinition.PROPAGATION_SUPPORTS</code>：如果当前存在事务，则加入该事务；如果当前没有事务，则以非事务的方式继续运行。 <code v-pre>TransactionDefinition.PROPAGATION_NOT_SUPPORTED</code>：以非事务方式运行，如果当前存在事务，则把当前事务挂起。 <code v-pre>TransactionDefinition.PROPAGATION_NEVER</code>：以非事务方式运行，如果当前存在事务，则抛出异常。这3种设置都会滚。</li>
<li>@Transactional 注解属性 rollbackFor 设置错误（抛出异常如果不是运行时异常需要添加注解@Transactional(rollbackFor = Exception.class)）</li>
<li>同一个类中方法调用，导致@Transactional失效。比如有一个类Test，它的一个方法A，A再调用本类的方法B（不论方法B是用public还是private修饰），但方法A没有声明注解事务，而B方法有。则外部调用方法A之后，方法B的事务是不会起作用的（只有当事务方法被当前类以外的代码调用时，才会由<code v-pre>Spring</code>生成的代理对象来管理）</li>
</ol>
</div></template>


