<template><div><h2 id="一、概述" tabindex="-1"><a class="header-anchor" href="#一、概述" aria-hidden="true">#</a> 一、概述</h2>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token comment">// ApplicationContext是高级形状的ioc容器，提供了BeanFactory不具备的特性</span>
<span class="token class-name">ApplicationContext</span> ctx <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ClassPathXmlApplicationContext</span><span class="token punctuation">(</span><span class="token string">"bean.xml"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">Person</span> p <span class="token operator">=</span> ctx<span class="token punctuation">.</span><span class="token function">getBean</span><span class="token punctuation">(</span><span class="token string">"person"</span><span class="token punctuation">,</span><span class="token class-name">Person</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>p<span class="token punctuation">.</span><span class="token function">getAge</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>	
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="二、-容器初始化" tabindex="-1"><a class="header-anchor" href="#二、-容器初始化" aria-hidden="true">#</a> 二、 容器初始化</h2>
<h3 id="_2-1-父类初始化" tabindex="-1"><a class="header-anchor" href="#_2-1-父类初始化" aria-hidden="true">#</a> 2.1 父类初始化</h3>
<ol>
<li>调用了很多歌super后初始化了PathMatchingResourcePatternResolver(路径匹配模式解析器)，</li>
<li>判断父容器上下文是否为空，不为空则进行环境数据合并</li>
</ol>
<h3 id="_2-2-本地配置设置" tabindex="-1"><a class="header-anchor" href="#_2-2-本地配置设置" aria-hidden="true">#</a> 2.2 本地配置设置</h3>
<p>多个文件路径的配置文件解析，递归处理${}的数据，处理规则调用的公用EL表达式解析工具类</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setConfigLocations</span><span class="token punctuation">(</span><span class="token annotation punctuation">@Nullable</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> locations<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span>locations <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token class-name">Assert</span><span class="token punctuation">.</span><span class="token function">noNullElements</span><span class="token punctuation">(</span>locations<span class="token punctuation">,</span> <span class="token string">"Config locations must not be null"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>configLocations <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">[</span>locations<span class="token punctuation">.</span>length<span class="token punctuation">]</span><span class="token punctuation">;</span>
			<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> locations<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
				<span class="token comment">// 解析配置文件的路径（逻辑多，会进行递归解析: ${}的解析规则是一样的）</span>
				<span class="token keyword">this</span><span class="token punctuation">.</span>configLocations<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">resolvePath</span><span class="token punctuation">(</span>locations<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">trim</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span>
		<span class="token keyword">else</span> <span class="token punctuation">{</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>configLocations <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>

<span class="token comment">// resolvePath方法里面最终的解析方法是parseStringValue，主要的调用链如下，</span>
resolvePath<span class="token operator">:</span><span class="token number">127</span><span class="token punctuation">,</span> <span class="token class-name">AbstractRefreshableConfigApplicationContext</span>
  resolveRequiredPlaceholders<span class="token operator">:</span><span class="token number">624</span><span class="token punctuation">,</span> <span class="token class-name">AbstractEnvironment</span>
    resolveRequiredPlaceholders<span class="token operator">:</span><span class="token number">210</span><span class="token punctuation">,</span> <span class="token class-name">AbstractPropertyResolver</span>
      doResolvePlaceholders<span class="token operator">:</span><span class="token number">240</span><span class="token punctuation">,</span> <span class="token class-name">AbstractPropertyResolver</span>
        replacePlaceholders<span class="token operator">:</span><span class="token number">126</span><span class="token punctuation">,</span> <span class="token class-name">PropertyPlaceholderHelper</span>
          parseStringValue<span class="token operator">:</span><span class="token number">134</span><span class="token punctuation">,</span> <span class="token class-name">PropertyPlaceholderHelper</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-3-刷新-refresh重要" tabindex="-1"><a class="header-anchor" href="#_2-3-刷新-refresh重要" aria-hidden="true">#</a> 2.3 刷新(refresh重要)</h3>
<p>刷新方法最重要的13个方法</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">refresh</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">BeansException</span><span class="token punctuation">,</span> <span class="token class-name">IllegalStateException</span> <span class="token punctuation">{</span>
		<span class="token keyword">synchronized</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>startupShutdownMonitor<span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token class-name">StartupStep</span> contextRefresh <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>applicationStartup<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token string">"spring.context.refresh"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token comment">// 1. 做容器刷新前的准备工作</span>
			<span class="token function">prepareRefresh</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token comment">// 2. 获取beanFactory【重要】（createBeanDefinition、解析xml）【调用getBean】</span>
			<span class="token class-name">ConfigurableListableBeanFactory</span> beanFactory <span class="token operator">=</span> <span class="token function">obtainFreshBeanFactory</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token comment">// 3. 准备bean工厂（将默认类初始化到ConfigurableListableBeanFactory）</span>
			<span class="token function">prepareBeanFactory</span><span class="token punctuation">(</span>beanFactory<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token keyword">try</span> <span class="token punctuation">{</span>
				<span class="token comment">// 4. 对工厂bean的后置处理，默认为空实现</span>
				<span class="token function">postProcessBeanFactory</span><span class="token punctuation">(</span>beanFactory<span class="token punctuation">)</span><span class="token punctuation">;</span>
				<span class="token class-name">StartupStep</span> beanPostProcess <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>applicationStartup<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token string">"spring.context.beans.post-process"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
				<span class="token comment">// 5. 调用BeanFactoryPostProcessors，优先级处理。逻辑处理复杂（beanFactory）</span>
				<span class="token function">invokeBeanFactoryPostProcessors</span><span class="token punctuation">(</span>beanFactory<span class="token punctuation">)</span><span class="token punctuation">;</span>
				<span class="token comment">// 6. 实例化和注册BeanPostProcessors(bean对象)</span>
				<span class="token function">registerBeanPostProcessors</span><span class="token punctuation">(</span>beanFactory<span class="token punctuation">)</span><span class="token punctuation">;</span>
				beanPostProcess<span class="token punctuation">.</span><span class="token function">end</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
				<span class="token comment">// 7. 初始化消息源，辅助i18n</span>
				<span class="token function">initMessageSource</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
				<span class="token comment">// 8. 初始化应用时间多播器</span>
				<span class="token function">initApplicationEventMulticaster</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
				<span class="token comment">// 9. 空实现</span>
				<span class="token function">onRefresh</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
				<span class="token comment">// 10. 注册监听器</span>
				<span class="token function">registerListeners</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
				<span class="token comment">// 11. 完成bean的创建，非懒加载 doGetBean【重要】</span>
				<span class="token function">finishBeanFactoryInitialization</span><span class="token punctuation">(</span>beanFactory<span class="token punctuation">)</span><span class="token punctuation">;</span>
				<span class="token comment">// 12. 完成刷新</span>
				<span class="token function">finishRefresh</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token punctuation">}</span><span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">BeansException</span> ex<span class="token punctuation">)</span> <span class="token punctuation">{</span>
				<span class="token function">destroyBeans</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
				<span class="token function">cancelRefresh</span><span class="token punctuation">(</span>ex<span class="token punctuation">)</span><span class="token punctuation">;</span>
				<span class="token keyword">throw</span> ex<span class="token punctuation">;</span>
			<span class="token punctuation">}</span><span class="token keyword">finally</span> <span class="token punctuation">{</span>
        <span class="token comment">// 13. 重置命令缓存</span>
				<span class="token function">resetCommonCaches</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
				contextRefresh<span class="token punctuation">.</span><span class="token function">end</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>比较重要的一些方法堆栈</p>
<h4 id="_2-3-1-obtainfreshbeanfactory" tabindex="-1"><a class="header-anchor" href="#_2-3-1-obtainfreshbeanfactory" aria-hidden="true">#</a> 2.3.1 obtainFreshBeanFactory</h4>
<p>主要堆栈（创建/注册BeanDefinition堆栈）</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>refresh<span class="token operator">:</span><span class="token number">561</span><span class="token punctuation">,</span> <span class="token class-name">AbstractApplicationContext</span>
  obtainFreshBeanFactory<span class="token operator">:</span><span class="token number">701</span><span class="token punctuation">,</span> <span class="token class-name">AbstractApplicationContext</span>
    refreshBeanFactory<span class="token operator">:</span><span class="token number">135</span><span class="token punctuation">,</span> <span class="token class-name">AbstractRefreshableApplicationContext</span>
      loadBeanDefinitions<span class="token operator">:</span><span class="token number">96</span><span class="token punctuation">,</span> <span class="token class-name">AbstractXmlApplicationContext</span> <span class="token comment">// 调用各种重载（xml结构处理），适配器模式</span>
        loadBeanDefinitions<span class="token operator">:</span><span class="token number">311</span><span class="token punctuation">,</span> <span class="token class-name">XmlBeanDefinitionReader</span>
          <span class="token comment">// 去解析xml（createDocumentBuilder）</span>
          doLoadDocument<span class="token operator">:</span><span class="token number">440</span><span class="token punctuation">,</span> <span class="token class-name">XmlBeanDefinitionReader</span>
            loadDocument<span class="token operator">:</span><span class="token number">77</span><span class="token punctuation">,</span> <span class="token class-name">DefaultDocumentLoader</span>
          <span class="token comment">// 去加载BeanDefinitions（重要）  </span>
          doLoadBeanDefinitions<span class="token operator">:</span><span class="token number">399</span><span class="token punctuation">,</span> <span class="token class-name">XmlBeanDefinitionReader</span>
            registerBeanDefinitions<span class="token operator">:</span><span class="token number">525</span><span class="token punctuation">,</span> <span class="token class-name">XmlBeanDefinitionReader</span>
              registerBeanDefinitions<span class="token operator">:</span><span class="token number">97</span><span class="token punctuation">,</span> <span class="token class-name">DefaultBeanDefinitionDocumentReader</span>
                doRegisterBeanDefinitions<span class="token operator">:</span><span class="token number">154</span><span class="token punctuation">,</span> <span class="token class-name">DefaultBeanDefinitionDocumentReader</span>
                  parseBeanDefinitions<span class="token operator">:</span><span class="token number">184</span><span class="token punctuation">,</span> <span class="token class-name">DefaultBeanDefinitionDocumentReader</span> <span class="token comment">// 前后过程处理（自定义）</span>
                    parseDefaultElement<span class="token operator">:</span><span class="token number">207</span><span class="token punctuation">,</span> <span class="token class-name">DefaultBeanDefinitionDocumentReader</span> <span class="token comment">// 解析默认元素</span>
                      processBeanDefinition<span class="token operator">:</span><span class="token number">316</span><span class="token punctuation">,</span> <span class="token class-name">DefaultBeanDefinitionDocumentReader</span>
                        <span class="token comment">// 创建BeanDefinition</span>
                        parseBeanDefinitionElement<span class="token operator">:</span><span class="token number">406</span><span class="token punctuation">,</span> <span class="token class-name">BeanDefinitionParserDelegate</span> <span class="token comment">// 调用各种重载，并解析xml元素</span>
                          createBeanDefinition<span class="token operator">:</span><span class="token number">643</span><span class="token punctuation">,</span> <span class="token class-name">BeanDefinitionParserDelegate</span>
                            createBeanDefinition<span class="token operator">:</span><span class="token number">60</span><span class="token punctuation">,</span> <span class="token class-name">BeanDefinitionReaderUtils</span> <span class="token comment">// 【进行new GenericBeanDefinition()】</span>
                        <span class="token comment">// 注册BeanDefinition      </span>
                        processBeanDefinition<span class="token operator">:</span><span class="token number">322</span><span class="token punctuation">,</span> <span class="token class-name">DefaultBeanDefinitionDocumentReader</span>
                          registerBeanDefinition<span class="token operator">:</span><span class="token number">165</span><span class="token punctuation">,</span> <span class="token class-name">BeanDefinitionReaderUtils</span>
                    parseCustomElement <span class="token comment">// 解析自定义元素      </span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-3-2-finishbeanfactoryinitialization" tabindex="-1"><a class="header-anchor" href="#_2-3-2-finishbeanfactoryinitialization" aria-hidden="true">#</a> 2.3.2 finishBeanFactoryInitialization</h4>
<p>主要堆栈（利用反射实例化bean）</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>refresh<span class="token operator">:</span><span class="token number">600</span><span class="token punctuation">,</span> <span class="token class-name">AbstractApplicationContext</span>
  finishBeanFactoryInitialization<span class="token operator">:</span><span class="token number">953</span><span class="token punctuation">,</span> <span class="token class-name">AbstractApplicationContext</span>
    preInstantiateSingletons<span class="token operator">:</span><span class="token number">949</span><span class="token punctuation">,</span> <span class="token class-name">DefaultListableBeanFactory</span>
      <span class="token comment">// BPP,BFPP都调用了getBean方法</span>
      getBean<span class="token operator">:</span><span class="token number">208</span><span class="token punctuation">,</span> <span class="token class-name">AbstractBeanFactory</span>
        doGetBean<span class="token operator">:</span><span class="token number">347</span><span class="token punctuation">,</span> <span class="token class-name">AbstractBeanFactory</span>
          getSingleton<span class="token operator">:</span><span class="token number">243</span><span class="token punctuation">,</span> <span class="token class-name">DefaultSingletonBeanRegistry</span>
            getObject<span class="token operator">:</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1764996806</span>
              lambda$doGetBean$<span class="token number">0</span><span class="token operator">:</span><span class="token number">349</span><span class="token punctuation">,</span> <span class="token class-name">AbstractBeanFactory</span>
                createBean<span class="token operator">:</span><span class="token number">548</span><span class="token punctuation">,</span> <span class="token class-name">AbstractAutowireCapableBeanFactory</span>
                  doCreateBean<span class="token operator">:</span><span class="token number">589</span><span class="token punctuation">,</span> <span class="token class-name">AbstractAutowireCapableBeanFactory</span>
                    <span class="token comment">// 创建bean实例化</span>
                    createBeanInstance<span class="token operator">:</span><span class="token number">1253</span><span class="token punctuation">,</span> <span class="token class-name">AbstractAutowireCapableBeanFactory</span>
                      instantiateBean<span class="token operator">:</span><span class="token number">1348</span><span class="token punctuation">,</span> <span class="token class-name">AbstractAutowireCapableBeanFactory</span>
                        instantiate<span class="token operator">:</span><span class="token number">88</span><span class="token punctuation">,</span> <span class="token class-name">SimpleInstantiationStrategy</span>
                          instantiateClass<span class="token operator">:</span><span class="token number">209</span><span class="token punctuation">,</span> <span class="token class-name">BeanUtils</span> <span class="token comment">// 【反射进行实例化】 ctor.newInstance(argsWithDefaultValues)</span>
                    <span class="token comment">// 应用合并的bean定义后置处理器        </span>
                    applyMergedBeanDefinitionPostProcessors<span class="token operator">:</span><span class="token number">1126</span><span class="token punctuation">,</span> <span class="token class-name">AbstractAutowireCapableBeanFactory</span>
                    <span class="token comment">// 【往三级缓存里面put值】</span>
                    addSingletonFactory<span class="token operator">:</span> <span class="token number">158</span><span class="token punctuation">,</span>   
                    <span class="token comment">// 准备bean</span>
                    populateBean<span class="token operator">:</span><span class="token number">1476</span><span class="token punctuation">,</span> <span class="token class-name">AbstractAutowireCapableBeanFactory</span>
                      applyPropertyValues<span class="token operator">:</span><span class="token number">1682</span><span class="token punctuation">,</span> <span class="token class-name">AbstractAutowireCapableBeanFactory</span>       
                    <span class="token comment">// 初始化bean</span>
                    initializeBean<span class="token operator">:</span><span class="token number">1822</span><span class="token punctuation">,</span> <span class="token class-name">AbstractAutowireCapableBeanFactory</span>
                      <span class="token comment">// 调用感知方法（BeanNameAware）</span>
                      invokeAwareMethods<span class="token operator">:</span><span class="token number">1845</span><span class="token punctuation">,</span> <span class="token class-name">AbstractAutowireCapableBeanFactory</span>
                      <span class="token comment">// 前置处理器初始化（BeanPostProcessor）</span>
                      applyBeanPostProcessorsBeforeInitialization<span class="token operator">:</span><span class="token number">436</span><span class="token punctuation">,</span><span class="token class-name">AbstractAutowireCapableBeanFactory</span>
                        postProcessBeforeInitialization<span class="token operator">:</span><span class="token number">102</span><span class="token punctuation">,</span> <span class="token class-name">ApplicationContextAwareProcessor</span>
                          invokeAwareInterfaces<span class="token operator">:</span><span class="token number">109</span><span class="token punctuation">,</span> <span class="token class-name">ApplicationContextAwareProcessor</span> <span class="token comment">//调用感知接口</span>
                      <span class="token comment">// 调用初始化方法</span>
                      invokeInitMethods
                      <span class="token comment">// 后置处理器初始化（BeanPostProcessor）</span>
                      applyBeanPostProcessorsAfterInitialization<span class="token operator">:</span><span class="token number">457</span><span class="token punctuation">,</span> <span class="token class-name">AbstractAutowireCapableBeanFactory</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-3-扩展点" tabindex="-1"><a class="header-anchor" href="#_2-3-扩展点" aria-hidden="true">#</a> 2.3 扩展点</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token class-name">ClassPathXmlApplicationContext</span> <span class="token comment">// 扩展对象是否被覆盖，是否循环依赖，beanFactory后处理</span>
  
<span class="token class-name">DefaultBeanDefinitionDocumentReader</span><span class="token punctuation">.</span>preProcessXml <span class="token comment">// xml解析的前置和后置</span>
  
<span class="token class-name">AbstractBeanDefinitionParser</span>  <span class="token comment">// 扩展自定义标签  </span>
<span class="token class-name">NamespaceHandlerSupport</span> <span class="token comment">// 扩展命名空间  </span>
  
<span class="token class-name">PropertyEditorRegistrar</span> <span class="token comment">// 自定义属性编辑器 </span>
  
<span class="token class-name">BeanDefinitionRegistryPostProcessor</span> <span class="token comment">// bean定义注册表处理器  </span>
  
<span class="token class-name">BeanFactoryPostProcesser</span> <span class="token comment">// bean工厂处理器  </span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="三、-获取bean" tabindex="-1"><a class="header-anchor" href="#三、-获取bean" aria-hidden="true">#</a> 三、 获取Bean</h2>
<p>获取bean的堆栈</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>getBean<span class="token operator">:</span><span class="token number">1195</span><span class="token punctuation">,</span> <span class="token class-name">AbstractApplicationContext</span>
  getBean<span class="token operator">:</span><span class="token number">213</span><span class="token punctuation">,</span> <span class="token class-name">AbstractBeanFactory</span>
    doGetBean<span class="token operator">:</span><span class="token number">275</span><span class="token punctuation">,</span> <span class="token class-name">AbstractBeanFactory</span>
      getSingleton<span class="token operator">:</span><span class="token number">172</span><span class="token punctuation">,</span> <span class="token class-name">DefaultSingletonBeanRegistry</span>
        <span class="token comment">// 判断一级缓存是否存在bean，判断二级缓存是否存在半成品bean，判断三级缓存是否存在ObjectFactory。如果第二级为空则加锁重新判断一级二级没有则获取三级调用getObject方法进行创建bean</span>
        getSingleton<span class="token operator">:</span><span class="token number">187</span><span class="token punctuation">,</span> <span class="token class-name">DefaultSingletonBeanRegistry</span>
      <span class="token comment">// 获取到了bean则进行实例化操作（FactoryBean的实例化，非FactoryBean则直接返回）    </span>
      getObjectForBeanInstance<span class="token operator">:</span><span class="token number">1305</span><span class="token punctuation">,</span> <span class="token class-name">AbstractAutowireCapableBeanFactory</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


