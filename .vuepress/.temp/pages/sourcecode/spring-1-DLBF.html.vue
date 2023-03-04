<template><div><h2 id="一、流程" tabindex="-1"><a class="header-anchor" href="#一、流程" aria-hidden="true">#</a> 一、流程</h2>
<p>搭建源码阅读环境后写了一个test类和bean方法用main方法跑了一下流程如下：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token comment">// 加载xml</span>
<span class="token class-name">ClassPathResource</span> classPathResource <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ClassPathResource</span><span class="token punctuation">(</span><span class="token string">"bean.xml"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 原始方式：利用DefaultListableBeanFactory加载bean</span>
<span class="token class-name">DefaultListableBeanFactory</span> factory <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">DefaultListableBeanFactory</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">XmlBeanDefinitionReader</span> definitionReader <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">XmlBeanDefinitionReader</span><span class="token punctuation">(</span>factory<span class="token punctuation">)</span><span class="token punctuation">;</span>
definitionReader<span class="token punctuation">.</span><span class="token function">loadBeanDefinitions</span><span class="token punctuation">(</span>classPathResource<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>factory<span class="token punctuation">.</span><span class="token function">getBean</span><span class="token punctuation">(</span><span class="token string">"person"</span><span class="token punctuation">,</span> <span class="token class-name">Person</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getAge</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 利用xmlBeanFactory创建bean() xmlBeanFactory继承了DefaultListableBeanFactory</span>
<span class="token class-name">BeanFactory</span> bf <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">XmlBeanFactory</span><span class="token punctuation">(</span>classPathResource<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">Person</span> person <span class="token operator">=</span> bf<span class="token punctuation">.</span><span class="token function">getBean</span><span class="token punctuation">(</span><span class="token string">"person"</span><span class="token punctuation">,</span><span class="token class-name">Person</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>person<span class="token punctuation">.</span><span class="token function">getAge</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// ApplicationContext是高级形状的ioc容器，提供了BeanFactory不具备的特性</span>
<span class="token class-name">ApplicationContext</span> ctx <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ClassPathXmlApplicationContext</span><span class="token punctuation">(</span><span class="token string">"bean.xml"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">Person</span> p <span class="token operator">=</span> ctx<span class="token punctuation">.</span><span class="token function">getBean</span><span class="token punctuation">(</span><span class="token string">"person"</span><span class="token punctuation">,</span><span class="token class-name">Person</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>p<span class="token punctuation">.</span><span class="token function">getAge</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的test用例就是用3种方式去获取bean并执行bean的方法。在调用的时候大致分为3步（准备容器对象、加载配置文件、获取bean）。其中准备容器对象就是去new一个对象，下面主要跟一下加载配置文件和获取bean的大致脉络。</p>
<h3 id="_1-1-defaultlistablebeanfactory" tabindex="-1"><a class="header-anchor" href="#_1-1-defaultlistablebeanfactory" aria-hidden="true">#</a> 1.1 DefaultListableBeanFactory</h3>
<h4 id="_1-1-1-bean加载" tabindex="-1"><a class="header-anchor" href="#_1-1-1-bean加载" aria-hidden="true">#</a> 1.1.1 Bean加载</h4>
<h5 id="_1-加载xml文件" tabindex="-1"><a class="header-anchor" href="#_1-加载xml文件" aria-hidden="true">#</a> 1 加载xml文件</h5>
<p>加载xml文件的时候主要是调用的XmlBeanDefinitionReader.loadBeanDefinitions方法去执行逻辑，该方法将xml文件转为InputStream后去调用了doLoadBeanDefinitions方法。</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>	<span class="token keyword">protected</span> <span class="token keyword">int</span> <span class="token function">doLoadBeanDefinitions</span><span class="token punctuation">(</span><span class="token class-name">InputSource</span> inputSource<span class="token punctuation">,</span> <span class="token class-name">Resource</span> resource<span class="token punctuation">)</span>
			<span class="token keyword">throws</span> <span class="token class-name">BeanDefinitionStoreException</span> <span class="token punctuation">{</span>

		<span class="token keyword">try</span> <span class="token punctuation">{</span>
			<span class="token comment">// 获取xml的验证模式并加载xml并得到Document</span>
			<span class="token class-name">Document</span> doc <span class="token operator">=</span> <span class="token function">doLoadDocument</span><span class="token punctuation">(</span>inputSource<span class="token punctuation">,</span> resource<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token comment">// 注册bean信息</span>
			<span class="token keyword">int</span> count <span class="token operator">=</span> <span class="token function">registerBeanDefinitions</span><span class="token punctuation">(</span>doc<span class="token punctuation">,</span> resource<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token keyword">if</span> <span class="token punctuation">(</span>logger<span class="token punctuation">.</span><span class="token function">isDebugEnabled</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
				logger<span class="token punctuation">.</span><span class="token function">debug</span><span class="token punctuation">(</span><span class="token string">"Loaded "</span> <span class="token operator">+</span> count <span class="token operator">+</span> <span class="token string">" bean definitions from "</span> <span class="token operator">+</span> resource<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token punctuation">}</span>
			<span class="token keyword">return</span> count<span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
		<span class="token comment">// ... 大量的catch	</span>
	<span class="token punctuation">}</span>	
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里兵分两路，一个通过InputSource和Resource去加载Document，另一个通过Document和resource去注册bean定义信息。</p>
<h5 id="_2-加载document" tabindex="-1"><a class="header-anchor" href="#_2-加载document" aria-hidden="true">#</a> 2 加载Document</h5>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>	<span class="token keyword">public</span> <span class="token class-name">Document</span> <span class="token function">loadDocument</span><span class="token punctuation">(</span><span class="token class-name">InputSource</span> inputSource<span class="token punctuation">,</span> <span class="token class-name">EntityResolver</span> entityResolver<span class="token punctuation">,</span>
			<span class="token class-name">ErrorHandler</span> errorHandler<span class="token punctuation">,</span> <span class="token keyword">int</span> validationMode<span class="token punctuation">,</span> <span class="token keyword">boolean</span> namespaceAware<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
		<span class="token comment">// 创建DocumentBuilderFactory</span>
		<span class="token class-name">DocumentBuilderFactory</span> factory <span class="token operator">=</span> <span class="token function">createDocumentBuilderFactory</span><span class="token punctuation">(</span>validationMode<span class="token punctuation">,</span> namespaceAware<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span>logger<span class="token punctuation">.</span><span class="token function">isTraceEnabled</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			logger<span class="token punctuation">.</span><span class="token function">trace</span><span class="token punctuation">(</span><span class="token string">"Using JAXP provider ["</span> <span class="token operator">+</span> factory<span class="token punctuation">.</span><span class="token function">getClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">"]"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
		<span class="token comment">// 通过DocumentBuilderFactory创建DocumentBuilder</span>
		<span class="token class-name">DocumentBuilder</span> builder <span class="token operator">=</span> <span class="token function">createDocumentBuilder</span><span class="token punctuation">(</span>factory<span class="token punctuation">,</span> entityResolver<span class="token punctuation">,</span> errorHandler<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token comment">// 解析</span>
		<span class="token keyword">return</span> builder<span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span>inputSource<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>	
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里主要是利用java的DocumentBuilderFactory去构建了DocumentBuilder，最终利用DocumentBuilder去解析xml文件。</p>
<h5 id="_3-注册bean定义信息" tabindex="-1"><a class="header-anchor" href="#_3-注册bean定义信息" aria-hidden="true">#</a> 3 注册bean定义信息</h5>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>	<span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">registerBeanDefinitions</span><span class="token punctuation">(</span><span class="token class-name">Document</span> doc<span class="token punctuation">,</span> <span class="token class-name">Resource</span> resource<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">BeanDefinitionStoreException</span> <span class="token punctuation">{</span>
		<span class="token comment">// 使用DefaultBeanDefinitionDocumentReader实例化BeanDefinitionDocumentReader</span>
		<span class="token class-name">BeanDefinitionDocumentReader</span> documentReader <span class="token operator">=</span> <span class="token function">createBeanDefinitionDocumentReader</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token comment">// 记录bean加载的个数</span>
		<span class="token keyword">int</span> countBefore <span class="token operator">=</span> <span class="token function">getRegistry</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getBeanDefinitionCount</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token comment">// 注册及加载bean</span>
		documentReader<span class="token punctuation">.</span><span class="token function">registerBeanDefinitions</span><span class="token punctuation">(</span>doc<span class="token punctuation">,</span> <span class="token function">createReaderContext</span><span class="token punctuation">(</span>resource<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token comment">// 记录加载的格式</span>
		<span class="token keyword">return</span> <span class="token function">getRegistry</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getBeanDefinitionCount</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> countBefore<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>	
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>主要逻辑是创建BeanDefinitionDocumentReader和获取了bean的加载个数。其中比较重要的就是去注册bean定义信息，下面是该方法的调用栈</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>registerBeanDefinitions<span class="token operator">:</span><span class="token number">525</span><span class="token punctuation">,</span> <span class="token class-name">XmlBeanDefinitionReader</span>
  registerBeanDefinitions<span class="token operator">:</span><span class="token number">97</span><span class="token punctuation">,</span> <span class="token class-name">DefaultBeanDefinitionDocumentReader</span>
    doRegisterBeanDefinitions<span class="token operator">:</span><span class="token number">129</span><span class="token punctuation">,</span> <span class="token class-name">DefaultBeanDefinitionDocumentReader</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>之后就是doRegisterBeanDefinitions的主要注册逻辑</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>	<span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">doRegisterBeanDefinitions</span><span class="token punctuation">(</span><span class="token class-name">Element</span> root<span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token class-name">BeanDefinitionParserDelegate</span> parent <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>delegate<span class="token punctuation">;</span>
			<span class="token comment">// 创建委托</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>delegate <span class="token operator">=</span> <span class="token function">createDelegate</span><span class="token punctuation">(</span><span class="token function">getReaderContext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> root<span class="token punctuation">,</span> parent<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token comment">// 定义了namespace</span>
			<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>delegate<span class="token punctuation">.</span><span class="token function">isDefaultNamespace</span><span class="token punctuation">(</span>root<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
				<span class="token comment">// 处理配置文件属性</span>
				<span class="token class-name">String</span> profileSpec <span class="token operator">=</span> root<span class="token punctuation">.</span><span class="token function">getAttribute</span><span class="token punctuation">(</span><span class="token constant">PROFILE_ATTRIBUTE</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
				<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">StringUtils</span><span class="token punctuation">.</span><span class="token function">hasText</span><span class="token punctuation">(</span>profileSpec<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
					<span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> specifiedProfiles <span class="token operator">=</span> <span class="token class-name">StringUtils</span><span class="token punctuation">.</span><span class="token function">tokenizeToStringArray</span><span class="token punctuation">(</span>
							profileSpec<span class="token punctuation">,</span> <span class="token class-name">BeanDefinitionParserDelegate</span><span class="token punctuation">.</span><span class="token constant">MULTI_VALUE_ATTRIBUTE_DELIMITERS</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
					<span class="token comment">// We cannot use Profiles.of(...) since profile expressions are not supported</span>
					<span class="token comment">// in XML config. See SPR-12458 for details.</span>
					<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">getReaderContext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getEnvironment</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">acceptsProfiles</span><span class="token punctuation">(</span>specifiedProfiles<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
						<span class="token keyword">if</span> <span class="token punctuation">(</span>logger<span class="token punctuation">.</span><span class="token function">isDebugEnabled</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
							logger<span class="token punctuation">.</span><span class="token function">debug</span><span class="token punctuation">(</span><span class="token string">"Skipped XML bean definition file due to specified profiles ["</span> <span class="token operator">+</span> profileSpec <span class="token operator">+</span>
									<span class="token string">"] not matching: "</span> <span class="token operator">+</span> <span class="token function">getReaderContext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getResource</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
						<span class="token punctuation">}</span>
						<span class="token keyword">return</span><span class="token punctuation">;</span>
					<span class="token punctuation">}</span>
				<span class="token punctuation">}</span>
			<span class="token punctuation">}</span>
	
			<span class="token comment">// 解析前处理，子类实现（模版方法的钩子）,没有任何逻辑。用于子类自行实现</span>
			<span class="token function">preProcessXml</span><span class="token punctuation">(</span>root<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token comment">// 解析bean定义并注册</span>
			<span class="token function">parseBeanDefinitions</span><span class="token punctuation">(</span>root<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>delegate<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token comment">// 解析后处理，子类实现</span>
			<span class="token function">postProcessXml</span><span class="token punctuation">(</span>root<span class="token punctuation">)</span><span class="token punctuation">;</span>
	
			<span class="token keyword">this</span><span class="token punctuation">.</span>delegate <span class="token operator">=</span> parent<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中parseBeanDefinitions方法最终的逻辑就是将xml里面的bean信息解析为BeanDefitiation后put到DefaultListableBeanFactory类的beanDefinitionMap属性中。调用栈如下:</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>doRegisterBeanDefinitions<span class="token operator">:</span><span class="token number">153</span><span class="token punctuation">,</span> <span class="token class-name">DefaultBeanDefinitionDocumentReader</span>
  parseBeanDefinitions<span class="token operator">:</span><span class="token number">183</span><span class="token punctuation">,</span> <span class="token class-name">DefaultBeanDefinitionDocumentReader</span>
    parseDefaultElement<span class="token operator">:</span><span class="token number">205</span><span class="token punctuation">,</span> <span class="token class-name">DefaultBeanDefinitionDocumentReader</span>
      processBeanDefinition<span class="token operator">:</span><span class="token number">319</span><span class="token punctuation">,</span> <span class="token class-name">DefaultBeanDefinitionDocumentReader</span>
        registerBeanDefinition<span class="token operator">:</span><span class="token number">164</span><span class="token punctuation">,</span> <span class="token class-name">BeanDefinitionReaderUtils</span>
          registerBeanDefinition<span class="token operator">:</span><span class="token number">1025</span><span class="token punctuation">,</span> <span class="token class-name">DefaultListableBeanFactory</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最终将xml里面的所有配置的bean定义信息都存放在map中后加载过程结束。这个就是大致的xml加载过程。</p>
<h4 id="_1-2-获取bean" tabindex="-1"><a class="header-anchor" href="#_1-2-获取bean" aria-hidden="true">#</a> 1.2 获取bean</h4>
<h5 id="_1-dogetbean" tabindex="-1"><a class="header-anchor" href="#_1-dogetbean" aria-hidden="true">#</a> 1 doGetBean</h5>
<p>获取bean的时候是去调用的AbstractBeanFactory.doGetBean方法，下面删除了部分逻辑。</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">protected</span> <span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span> <span class="token class-name">T</span> <span class="token function">doGetBean</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token annotation punctuation">@Nullable</span> <span class="token class-name">Class</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span> requiredType<span class="token punctuation">,</span> <span class="token annotation punctuation">@Nullable</span> <span class="token class-name">Object</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">,</span> <span class="token keyword">boolean</span> typeCheckOnly<span class="token punctuation">)</span>
			<span class="token keyword">throws</span> <span class="token class-name">BeansException</span> <span class="token punctuation">{</span>

		<span class="token class-name">String</span> beanName <span class="token operator">=</span> <span class="token function">transformedBeanName</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token class-name">Object</span> beanInstance<span class="token punctuation">;</span>

		<span class="token comment">// Eagerly check singleton cache for manually registered singletons.</span>
		<span class="token comment">// 检查单例bean缓存已存在则直接获取</span>
		<span class="token class-name">Object</span> sharedInstance <span class="token operator">=</span> <span class="token function">getSingleton</span><span class="token punctuation">(</span>beanName<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span>sharedInstance <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> args <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
		<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
			<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isPrototypeCurrentlyInCreation</span><span class="token punctuation">(</span>beanName<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
				<span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">BeanCurrentlyInCreationException</span><span class="token punctuation">(</span>beanName<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token punctuation">}</span>
			<span class="token comment">// 检查bean工厂中是否存在bean定义信息</span>
			<span class="token class-name">BeanFactory</span> parentBeanFactory <span class="token operator">=</span> <span class="token function">getParentBeanFactory</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token keyword">if</span> <span class="token punctuation">(</span>parentBeanFactory <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span><span class="token function">containsBeanDefinition</span><span class="token punctuation">(</span>beanName<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
				<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
			<span class="token punctuation">}</span>
			<span class="token class-name">StartupStep</span> beanCreation <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>applicationStartup<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token string">"spring.beans.instantiate"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">tag</span><span class="token punctuation">(</span><span class="token string">"beanName"</span><span class="token punctuation">,</span> name<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token keyword">try</span> <span class="token punctuation">{</span>
				<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
				<span class="token class-name">RootBeanDefinition</span> mbd <span class="token operator">=</span> <span class="token function">getMergedLocalBeanDefinition</span><span class="token punctuation">(</span>beanName<span class="token punctuation">)</span><span class="token punctuation">;</span>
				<span class="token function">checkMergedBeanDefinition</span><span class="token punctuation">(</span>mbd<span class="token punctuation">,</span> beanName<span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span>
				<span class="token comment">// 依赖bean的处理</span>
				<span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> dependsOn <span class="token operator">=</span> mbd<span class="token punctuation">.</span><span class="token function">getDependsOn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
				<span class="token keyword">if</span> <span class="token punctuation">(</span>dependsOn <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
					<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">String</span> dep <span class="token operator">:</span> dependsOn<span class="token punctuation">)</span> <span class="token punctuation">{</span>
						<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
						<span class="token comment">// 注册依赖bean</span>
						<span class="token function">registerDependentBean</span><span class="token punctuation">(</span>dep<span class="token punctuation">,</span> beanName<span class="token punctuation">)</span><span class="token punctuation">;</span>
						<span class="token keyword">try</span> <span class="token punctuation">{</span>
							<span class="token function">getBean</span><span class="token punctuation">(</span>dep<span class="token punctuation">)</span><span class="token punctuation">;</span>
						<span class="token punctuation">}</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
					<span class="token punctuation">}</span>
				<span class="token punctuation">}</span>

				<span class="token comment">// Create bean instance.</span>
				<span class="token comment">// 单例模式（默认）</span>
				<span class="token keyword">if</span> <span class="token punctuation">(</span>mbd<span class="token punctuation">.</span><span class="token function">isSingleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
					<span class="token comment">// 获取单例bean</span>
					sharedInstance <span class="token operator">=</span> <span class="token function">getSingleton</span><span class="token punctuation">(</span>beanName<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-></span> <span class="token punctuation">{</span>
						<span class="token keyword">try</span> <span class="token punctuation">{</span>
              <span class="token comment">// AbstractAutowireCapableBeanFactory.createBean</span>
							<span class="token keyword">return</span> <span class="token function">createBean</span><span class="token punctuation">(</span>beanName<span class="token punctuation">,</span> mbd<span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span>
						<span class="token punctuation">}</span>
						<span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">BeansException</span> ex<span class="token punctuation">)</span> <span class="token punctuation">{</span>
              <span class="token comment">// 消费单例</span>
							<span class="token function">destroySingleton</span><span class="token punctuation">(</span>beanName<span class="token punctuation">)</span><span class="token punctuation">;</span>
							<span class="token keyword">throw</span> ex<span class="token punctuation">;</span>
						<span class="token punctuation">}</span>
					<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
					beanInstance <span class="token operator">=</span> <span class="token function">getObjectForBeanInstance</span><span class="token punctuation">(</span>sharedInstance<span class="token punctuation">,</span> name<span class="token punctuation">,</span> beanName<span class="token punctuation">,</span> mbd<span class="token punctuation">)</span><span class="token punctuation">;</span>
				<span class="token punctuation">}</span>

				<span class="token comment">// 原型模式</span>
				<span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>mbd<span class="token punctuation">.</span><span class="token function">isPrototype</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
					<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
				<span class="token punctuation">}</span>
				<span class="token comment">// 其他作用域</span>
				<span class="token keyword">else</span> <span class="token punctuation">{</span>
					<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
				<span class="token punctuation">}</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span>
		<span class="token comment">// 适配bean实例</span>
		<span class="token keyword">return</span> <span class="token function">adaptBeanInstance</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> beanInstance<span class="token punctuation">,</span> requiredType<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>spring中bean拥有5种模式（单例、原型、request、session、global session），该方法里面就通过getMergedLocalBeanDefinition方法整合数据后获取了bean的模式，之后通过不同的作用域去创建不同的bean。下面就是跟着默认的单例bean去走一下大致流程。AbstractBeanFactory的父类的父类就是DefaultSingletonBeanRegistry, getSingleton方法就是去获取单例bean。</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">Object</span> <span class="token function">getSingleton</span><span class="token punctuation">(</span><span class="token class-name">String</span> beanName<span class="token punctuation">,</span> <span class="token class-name">ObjectFactory</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">></span></span> singletonFactory<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token class-name">Assert</span><span class="token punctuation">.</span><span class="token function">notNull</span><span class="token punctuation">(</span>beanName<span class="token punctuation">,</span> <span class="token string">"Bean name must not be null"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">synchronized</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>singletonObjects<span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token class-name">Object</span> singletonObject <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>singletonObjects<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>beanName<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token comment">// 缓存单例bean中不存在则创建</span>
			<span class="token keyword">if</span> <span class="token punctuation">(</span>singletonObject <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
				<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
				<span class="token keyword">try</span> <span class="token punctuation">{</span>
					<span class="token comment">// 获取单例对象(最终是调用的AbstractAutowireCapableBeanFactory.createBean)</span>
					singletonObject <span class="token operator">=</span> singletonFactory<span class="token punctuation">.</span><span class="token function">getObject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
					newSingleton <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
				<span class="token punctuation">}</span>
				<span class="token keyword">catch</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
				<span class="token comment">// 如果是新的单例bean则添加bean到singletonObjects</span>
				<span class="token keyword">if</span> <span class="token punctuation">(</span>newSingleton<span class="token punctuation">)</span> <span class="token punctuation">{</span>
					<span class="token function">addSingleton</span><span class="token punctuation">(</span>beanName<span class="token punctuation">,</span> singletonObject<span class="token punctuation">)</span><span class="token punctuation">;</span>
				<span class="token punctuation">}</span>
			<span class="token punctuation">}</span>
			<span class="token keyword">return</span> singletonObject<span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://gaoqisen.github.io/GraphBed/202110/20211021112233.png" alt="DefaultListableBeanFactory"></p>
<p>现在就去调用AbstractAutowireCapableBeanFactory.createBean方法，整个的调用栈如下可以接口上面的图进行对比</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>main<span class="token operator">:</span><span class="token number">41</span><span class="token punctuation">,</span> <span class="token class-name">Test</span>
  getBean<span class="token operator">:</span><span class="token number">213</span><span class="token punctuation">,</span> <span class="token class-name">AbstractBeanFactory</span>
    doGetBean<span class="token operator">:</span><span class="token number">339</span><span class="token punctuation">,</span> <span class="token class-name">AbstractBeanFactory</span>
      getSingleton<span class="token operator">:</span><span class="token number">238</span><span class="token punctuation">,</span> <span class="token class-name">DefaultSingletonBeanRegistry</span>
        <span class="token comment">// 利用lambda表达式去查询</span>
        lambda$doGetBean$<span class="token number">0</span><span class="token operator">:</span><span class="token number">341</span><span class="token punctuation">,</span> <span class="token class-name">AbstractBeanFactory</span>
          createBean<span class="token operator">:</span><span class="token number">505</span><span class="token punctuation">,</span> <span class="token class-name">AbstractAutowireCapableBeanFactory</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="_2-createbean" tabindex="-1"><a class="header-anchor" href="#_2-createbean" aria-hidden="true">#</a> 2 createBean</h5>
<p>去创建bean的时候主要就是去实例化bean后初始化bean。部分代码如下</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">protected</span> <span class="token class-name">Object</span> <span class="token function">doCreateBean</span><span class="token punctuation">(</span><span class="token class-name">String</span> beanName<span class="token punctuation">,</span> <span class="token class-name">RootBeanDefinition</span> mbd<span class="token punctuation">,</span> <span class="token annotation punctuation">@Nullable</span> <span class="token class-name">Object</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span>
			<span class="token keyword">throws</span> <span class="token class-name">BeanCreationException</span> <span class="token punctuation">{</span>

		<span class="token comment">// Instantiate the bean.</span>
		<span class="token class-name">BeanWrapper</span> instanceWrapper <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span>mbd<span class="token punctuation">.</span><span class="token function">isSingleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			instanceWrapper <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>factoryBeanInstanceCache<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span>beanName<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span>instanceWrapper <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token comment">// 创建bean实例化</span>
			instanceWrapper <span class="token operator">=</span> <span class="token function">createBeanInstance</span><span class="token punctuation">(</span>beanName<span class="token punctuation">,</span> mbd<span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
    <span class="token comment">// 解析目标类型</span>
		<span class="token class-name">Object</span> bean <span class="token operator">=</span> instanceWrapper<span class="token punctuation">.</span><span class="token function">getWrappedInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token class-name">Class</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">></span></span> beanType <span class="token operator">=</span> instanceWrapper<span class="token punctuation">.</span><span class="token function">getWrappedClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span>beanType <span class="token operator">!=</span> <span class="token class-name">NullBean</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			mbd<span class="token punctuation">.</span>resolvedTargetType <span class="token operator">=</span> beanType<span class="token punctuation">;</span>
		<span class="token punctuation">}</span>

		<span class="token comment">// Allow post-processors to modify the merged bean definition.</span>
		<span class="token keyword">synchronized</span> <span class="token punctuation">(</span>mbd<span class="token punctuation">.</span>postProcessingLock<span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>mbd<span class="token punctuation">.</span>postProcessed<span class="token punctuation">)</span> <span class="token punctuation">{</span>
				<span class="token keyword">try</span> <span class="token punctuation">{</span>
					<span class="token comment">// 应用合并的bean定义后置处理器</span>
					<span class="token function">applyMergedBeanDefinitionPostProcessors</span><span class="token punctuation">(</span>mbd<span class="token punctuation">,</span> beanType<span class="token punctuation">,</span> beanName<span class="token punctuation">)</span><span class="token punctuation">;</span>
				<span class="token punctuation">}</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
				mbd<span class="token punctuation">.</span>postProcessed <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>

		<span class="token comment">// Initialize the bean instance.</span>
		<span class="token class-name">Object</span> exposedObject <span class="token operator">=</span> bean<span class="token punctuation">;</span>
		<span class="token keyword">try</span> <span class="token punctuation">{</span>
			<span class="token comment">// 准备bean</span>
			<span class="token function">populateBean</span><span class="token punctuation">(</span>beanName<span class="token punctuation">,</span> mbd<span class="token punctuation">,</span> instanceWrapper<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token comment">// 初始化bean</span>
			exposedObject <span class="token operator">=</span> <span class="token function">initializeBean</span><span class="token punctuation">(</span>beanName<span class="token punctuation">,</span> exposedObject<span class="token punctuation">,</span> mbd<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
	<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面也是分为两步，实例化和初始化。</p>
<h6 id="_1-2-1-实例化bean" tabindex="-1"><a class="header-anchor" href="#_1-2-1-实例化bean" aria-hidden="true">#</a> 1.2.1 实例化bean</h6>
<p>实例化bean执行的方法主要是createBeanInstance，主要逻辑是先去判断工厂方法是否为空，不为空则直接返回等逻辑。如果为空则去实例化对象</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">protected</span> <span class="token class-name">BeanWrapper</span> <span class="token function">createBeanInstance</span><span class="token punctuation">(</span><span class="token class-name">String</span> beanName<span class="token punctuation">,</span> <span class="token class-name">RootBeanDefinition</span> mbd<span class="token punctuation">,</span> <span class="token annotation punctuation">@Nullable</span> <span class="token class-name">Object</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token comment">// Make sure bean class is actually resolved at this point.</span>
		<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
		<span class="token comment">// 如果是提供商的bean则重提供商处获取</span>
		<span class="token class-name">Supplier</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">></span></span> instanceSupplier <span class="token operator">=</span> mbd<span class="token punctuation">.</span><span class="token function">getInstanceSupplier</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span>instanceSupplier <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token keyword">return</span> <span class="token function">obtainFromSupplier</span><span class="token punctuation">(</span>instanceSupplier<span class="token punctuation">,</span> beanName<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
		<span class="token comment">// 如果工厂方法名称存在则使用工厂处获取实例化</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span>mbd<span class="token punctuation">.</span><span class="token function">getFactoryMethodName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token keyword">return</span> <span class="token function">instantiateUsingFactoryMethod</span><span class="token punctuation">(</span>beanName<span class="token punctuation">,</span> mbd<span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>

		<span class="token comment">// Shortcut when re-creating the same bean...</span>
		<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span>resolved<span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token keyword">if</span> <span class="token punctuation">(</span>autowireNecessary<span class="token punctuation">)</span> <span class="token punctuation">{</span>
				<span class="token comment">// 自动装配构造函数</span>
				<span class="token keyword">return</span> <span class="token function">autowireConstructor</span><span class="token punctuation">(</span>beanName<span class="token punctuation">,</span> mbd<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token punctuation">}</span>
			<span class="token keyword">else</span> <span class="token punctuation">{</span>
				<span class="token comment">// 实例化bean</span>
				<span class="token keyword">return</span> <span class="token function">instantiateBean</span><span class="token punctuation">(</span>beanName<span class="token punctuation">,</span> mbd<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span>

		<span class="token comment">// Candidate constructors for autowiring?</span>
		<span class="token comment">// 重bean的后置处理起确定的构造函数不为空</span>
		<span class="token class-name">Constructor</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">></span></span><span class="token punctuation">[</span><span class="token punctuation">]</span> ctors <span class="token operator">=</span> <span class="token function">determineConstructorsFromBeanPostProcessors</span><span class="token punctuation">(</span>beanClass<span class="token punctuation">,</span> beanName<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span>ctors <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">||</span> mbd<span class="token punctuation">.</span><span class="token function">getResolvedAutowireMode</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token constant">AUTOWIRE_CONSTRUCTOR</span> <span class="token operator">||</span>
				mbd<span class="token punctuation">.</span><span class="token function">hasConstructorArgumentValues</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token operator">!</span><span class="token class-name">ObjectUtils</span><span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span>args<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token keyword">return</span> <span class="token function">autowireConstructor</span><span class="token punctuation">(</span>beanName<span class="token punctuation">,</span> mbd<span class="token punctuation">,</span> ctors<span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>

		<span class="token comment">// Preferred constructors for default construction?</span>
		<span class="token comment">// 首选构造函数不为空</span>
		ctors <span class="token operator">=</span> mbd<span class="token punctuation">.</span><span class="token function">getPreferredConstructors</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span>ctors <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token keyword">return</span> <span class="token function">autowireConstructor</span><span class="token punctuation">(</span>beanName<span class="token punctuation">,</span> mbd<span class="token punctuation">,</span> ctors<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>

		<span class="token comment">// No special handling: simply use no-arg constructor.</span>
		<span class="token comment">// 没有特殊需求，用无参构造器实例化bean</span>
		<span class="token keyword">return</span> <span class="token function">instantiateBean</span><span class="token punctuation">(</span>beanName<span class="token punctuation">,</span> mbd<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最终实例化是调用BeanUtils.instantiateClass方法去反射实例化的类。调用方法链路比较长，下面是调用栈：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>doCreateBean<span class="token operator">:</span><span class="token number">588</span><span class="token punctuation">,</span> <span class="token class-name">AbstractAutowireCapableBeanFactory</span>
	createBeanInstance<span class="token operator">:</span><span class="token number">1251</span><span class="token punctuation">,</span> <span class="token class-name">AbstractAutowireCapableBeanFactory</span>
    instantiateBean<span class="token operator">:</span><span class="token number">1346</span><span class="token punctuation">,</span> <span class="token class-name">AbstractAutowireCapableBeanFactory</span>
      instantiate<span class="token operator">:</span><span class="token number">88</span><span class="token punctuation">,</span> <span class="token class-name">SimpleInstantiationStrategy</span>
        instantiateClass<span class="token operator">:</span><span class="token number">209</span><span class="token punctuation">,</span> <span class="token class-name">BeanUtils</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h6 id="_1-2-2-初始化bean" tabindex="-1"><a class="header-anchor" href="#_1-2-2-初始化bean" aria-hidden="true">#</a> 1.2.2 初始化bean</h6>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token comment">// 初始化bean</span>
	<span class="token keyword">protected</span> <span class="token class-name">Object</span> <span class="token function">initializeBean</span><span class="token punctuation">(</span><span class="token class-name">String</span> beanName<span class="token punctuation">,</span> <span class="token class-name">Object</span> bean<span class="token punctuation">,</span> <span class="token annotation punctuation">@Nullable</span> <span class="token class-name">RootBeanDefinition</span> mbd<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">getSecurityManager</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token class-name">AccessController</span><span class="token punctuation">.</span><span class="token function">doPrivileged</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token class-name">PrivilegedAction</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Object</span><span class="token punctuation">></span></span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-></span> <span class="token punctuation">{</span>
				<span class="token comment">// 调用感知方法</span>
				<span class="token function">invokeAwareMethods</span><span class="token punctuation">(</span>beanName<span class="token punctuation">,</span> bean<span class="token punctuation">)</span><span class="token punctuation">;</span>
				<span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
			<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token function">getAccessControlContext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
		<span class="token keyword">else</span> <span class="token punctuation">{</span>
			<span class="token comment">// 调用感知方法</span>
			<span class="token function">invokeAwareMethods</span><span class="token punctuation">(</span>beanName<span class="token punctuation">,</span> bean<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>

		<span class="token class-name">Object</span> wrappedBean <span class="token operator">=</span> bean<span class="token punctuation">;</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span>mbd <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">||</span> <span class="token operator">!</span>mbd<span class="token punctuation">.</span><span class="token function">isSynthetic</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token comment">// 前置处理器初始化</span>
			wrappedBean <span class="token operator">=</span> <span class="token function">applyBeanPostProcessorsBeforeInitialization</span><span class="token punctuation">(</span>wrappedBean<span class="token punctuation">,</span> beanName<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>

		<span class="token keyword">try</span> <span class="token punctuation">{</span>
			<span class="token comment">// 调用初始化方法</span>
			<span class="token function">invokeInitMethods</span><span class="token punctuation">(</span>beanName<span class="token punctuation">,</span> wrappedBean<span class="token punctuation">,</span> mbd<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
		<span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Throwable</span> ex<span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">BeanCreationException</span><span class="token punctuation">(</span>
					<span class="token punctuation">(</span>mbd <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">?</span> mbd<span class="token punctuation">.</span><span class="token function">getResourceDescription</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
					beanName<span class="token punctuation">,</span> <span class="token string">"Invocation of init method failed"</span><span class="token punctuation">,</span> ex<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span>mbd <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">||</span> <span class="token operator">!</span>mbd<span class="token punctuation">.</span><span class="token function">isSynthetic</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token comment">// 后置处理器初始化</span>
			wrappedBean <span class="token operator">=</span> <span class="token function">applyBeanPostProcessorsAfterInitialization</span><span class="token punctuation">(</span>wrappedBean<span class="token punctuation">,</span> beanName<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>

		<span class="token keyword">return</span> wrappedBean<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>总结起来在getBean的时候最主要的步骤就是通过反射实例化bean后在给属性赋值最后在进行类的初始化操作。其中初始化又分为调用感知方法、调用感知接口、调用前置处理器初始化方法、调用初始化方法、调用后置初始化方法、最后在销毁对象的时候会调用销毁方法。伪代码如下：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token comment">//  bean的生命周期</span>
<span class="token comment">// 实例化</span>
createBeanInstance
<span class="token comment">// 属性赋值</span>
populateBean
<span class="token comment">// 初始化bean</span>
initializeBean
    <span class="token comment">// 调用感知方法（BeanNameAware）</span>
    invokeAwareMethods
    <span class="token comment">// 调用感知接口（ApplicationContextAware）</span>
    invokeAwareInterfaces
    <span class="token comment">// 前置处理器初始化（BeanPostProcessor）</span>
    postProcessBeforeInitialization
    <span class="token comment">// 调用初始化方法</span>
    invokeInitMethods
    <span class="token comment">// 后置处理器初始化（BeanPostProcessor）</span>
    postProcessAfterInitialization
		<span class="token comment">// 返回完整对象   </span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>SpringBean的生命周期: 实例化 &gt; 属性赋值 &gt; 初始化 &gt; 销毁</p>
<p>在调用前置处理器的时候，会遍历处理器列表（beanPostProcessors）进行依次执行。而自己写的类实现了BeanPostProcessor，也是会依次执行的。下面就是spring是如何将自定义的BeanPostProcessor如何放到bean后处理器列表中的大致逻辑。</p>
<ol>
<li>将bean定义信息的beanName分类存放到list里面</li>
<li>遍历后处理器名称区分优先排序后处理器、内部后处理器、有序的后处理器名称、非有序后处理器名称</li>
<li>将internalPostProcessors添加到beanPostProcessors的列表中</li>
</ol>
<h3 id="二、循环依赖" tabindex="-1"><a class="header-anchor" href="#二、循环依赖" aria-hidden="true">#</a> 二、循环依赖</h3>
<p>spring的循环依赖是大致使用三级缓存来解决的（构造器无法解决循环依赖，因为构造器每次都要new一个新的实例）。是定义在DefaultSingletonBeanRegistry类里面的三个map属性去进行相应的存储。循环依赖的关键点就是将实例化和初始化分开，在给其他对象赋值的时候不是把完整的bean赋值给对象，而是把半成品赋值给其他对象。</p>
<table>
<thead>
<tr>
<th>别名</th>
<th>属性名</th>
<th>存储数据</th>
</tr>
</thead>
<tbody>
<tr>
<td>一级缓存</td>
<td>singletonObjects</td>
<td>成品bean（实例化&amp;&amp;初始化的bean）</td>
</tr>
<tr>
<td>二级缓存</td>
<td>earlySingletonObjects</td>
<td>早期bean(半成品，实例化未初始化的bean)</td>
</tr>
<tr>
<td>三级缓存</td>
<td>singletonFactories</td>
<td>存储的一个lambda表达式(完成代理对象的覆盖过程)</td>
</tr>
</tbody>
</table>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/** Cache of singleton objects: bean name to bean instance. */</span>
	<span class="token comment">// 缓存的单例bean(一级缓存)</span>
	<span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">></span></span> singletonObjects <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ConcurrentHashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token number">256</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

	<span class="token comment">// 三级缓存（ObjectFactory是一个函数式接口，可以是匿名内部类。本质在于使用aop代理问题 ）</span>
	<span class="token doc-comment comment">/** Cache of singleton factories: bean name to ObjectFactory. */</span>
	<span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">ObjectFactory</span><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">></span><span class="token punctuation">></span></span> singletonFactories <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token number">16</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

	<span class="token comment">// 二级缓存</span>
	<span class="token doc-comment comment">/** Cache of early singleton objects: bean name to bean instance. */</span>
	<span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">></span></span> earlySingletonObjects <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ConcurrentHashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token number">16</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://gaoqisen.github.io/GraphBed/202110/20211024111529.png" alt="循环依赖"></p>
<p>流程：</p>
<ol>
<li>添加a到三级缓存(singletonFactories)</li>
<li>添加b到三级缓存(singletonFactories)</li>
<li>添加a到二级缓存(earlySingletonObjects)</li>
<li>添加b到一级缓存(singletonObjects)，删除二/三级缓存</li>
<li>添加a到一级缓存(singletonObjects)，删除二/三级缓存</li>
</ol>
</div></template>


