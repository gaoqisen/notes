<template><div><p>之前学习是简单工厂模式、工厂方法模式、抽象工厂模式，复习一下</p>
<h2 id="简单工厂模式" tabindex="-1"><a class="header-anchor" href="#简单工厂模式" aria-hidden="true">#</a> 简单工厂模式</h2>
<p>简单工厂模式大概就是创建一个简单工厂类，由工厂类实例化对象。由参数决定实例化那个类</p>
<h2 id="工厂方法模式" tabindex="-1"><a class="header-anchor" href="#工厂方法模式" aria-hidden="true">#</a> 工厂方法模式</h2>
<p>创建一个抽象工厂类，里面包含一个抽象方法。由这个工厂去生产产品，具体的就是实现类实现工厂，并完成抽象方法的功能实现（如月饼抽象生产类，南方月饼类实现月饼抽象生产类，北方月饼实现月饼抽象生产类，等等）。调用不是由参数决定，是由创建者决定</p>
<h2 id="抽象工厂模式" tabindex="-1"><a class="header-anchor" href="#抽象工厂模式" aria-hidden="true">#</a> 抽象工厂模式</h2>
<p>创建抽象工厂类生产工厂，创建抽象产品类生产产品，并各自实现。形成产品族（一个大的家族）
对于之前的理解模糊可以看这个：<a href="https://www.zhihu.com/question/20367734" target="_blank" rel="noopener noreferrer">https://www.zhihu.com/question/20367734<ExternalLinkIcon/></a></p>
<h2 id="一、-对单例模式的理解" tabindex="-1"><a class="header-anchor" href="#一、-对单例模式的理解" aria-hidden="true">#</a> 一、 对单例模式的理解</h2>
<p>单例模式就像太阳一样，只有一个。在使用的时候，只能实例化一次。不能多次实例化。
二、代码实现</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token comment">// 单例模式  太阳（synchronized，重量级）</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> sun <span class="token punctuation">{</span>
	<span class="token keyword">private</span> <span class="token keyword">static</span> sun s <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
	
	<span class="token keyword">private</span> <span class="token function">sun</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
	<span class="token comment">// 单例模式  这种方式多线程时会出现混乱的情况，不建议使用</span>
	<span class="token keyword">public</span> <span class="token keyword">static</span> sun <span class="token function">getSun</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span>s <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			s <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token function">sun</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
		<span class="token keyword">return</span> s<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	<span class="token comment">// (同步方法)添加同步锁，在不考虑性能的时候可以使用该方法</span>
	<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">synchronized</span> sun <span class="token function">getSunSyn</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span>s <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			s <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token function">sun</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
		<span class="token keyword">return</span> s<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">// 月亮（双重检查加锁）</span>
<span class="token keyword">class</span> moon <span class="token punctuation">{</span>
	<span class="token comment">// volatile 当moon初始化为实例时，能保证多个线程正确的处理moon变量</span>
	<span class="token keyword">private</span> <span class="token keyword">volatile</span> <span class="token keyword">static</span> moon m<span class="token punctuation">;</span>
	
	<span class="token keyword">private</span> <span class="token function">moon</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
	<span class="token comment">//  减少synchronized的使用</span>
	<span class="token keyword">public</span> <span class="token keyword">static</span> moon <span class="token function">getMoon</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span>m <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token keyword">synchronized</span> <span class="token punctuation">(</span>moon<span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
				<span class="token keyword">if</span> <span class="token punctuation">(</span>m <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
					m <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token function">moon</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
				<span class="token punctuation">}</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span>
		<span class="token keyword">return</span> m<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">// 地球（急切）</span>
<span class="token keyword">class</span> earth<span class="token punctuation">{</span>
	<span class="token comment">// 在静态初始化器中创建单件，这段代码保证了线程安全</span>
	<span class="token keyword">private</span> <span class="token keyword">static</span> earth e <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token function">earth</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	
	<span class="token keyword">private</span> <span class="token function">earth</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
	<span class="token comment">// 在jvm 加载这个类的时候创建此唯一的单例模式。</span>
	<span class="token keyword">public</span> <span class="token keyword">static</span> earth <span class="token function">getEarth</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> e<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="三、uml类图" tabindex="-1"><a class="header-anchor" href="#三、uml类图" aria-hidden="true">#</a> 三、UML类图</h2>
<p><img src="https://upload-images.jianshu.io/upload_images/7172355-112d7b6958cc8047.png" alt="单例模式"></p>
<h2 id="四、笔记" tabindex="-1"><a class="header-anchor" href="#四、笔记" aria-hidden="true">#</a> 四、笔记</h2>
<p>oo设计原则</p>
<blockquote>
<p>封装变化</p>
</blockquote>
<blockquote>
<p>多用组合、少用继承</p>
</blockquote>
<blockquote>
<p>针对接口编程、不针对实现编程</p>
</blockquote>
<blockquote>
<p>为对象之间的松耦合设计而努力</p>
</blockquote>
<blockquote>
<p>类应该对扩展开发、修改关闭</p>
</blockquote>
<blockquote>
<p>依赖抽象、不要依赖具体类
单例模式定义：
确保一个类只有一个实例，并提供全局访问点</p>
</blockquote>
<p>github源码：<a href="https://github.com/gaoqisen/java-pattern" target="_blank" rel="noopener noreferrer">https://github.com/gaoqisen/java-pattern<ExternalLinkIcon/></a></p>
</div></template>


