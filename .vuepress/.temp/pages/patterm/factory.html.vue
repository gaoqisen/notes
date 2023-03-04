<template><div><h2 id="一、复习" tabindex="-1"><a class="header-anchor" href="#一、复习" aria-hidden="true">#</a> 一、复习</h2>
<h3 id="_1-1-装饰者模式的优点" tabindex="-1"><a class="header-anchor" href="#_1-1-装饰者模式的优点" aria-hidden="true">#</a> 1.1 装饰者模式的优点</h3>
<p>动态地为对象增加新的功能或者撤销功能（继承就不能做到这一点）</p>
<h3 id="_1-2-装饰者模式的缺点" tabindex="-1"><a class="header-anchor" href="#_1-2-装饰者模式的缺点" aria-hidden="true">#</a> 1.2 装饰者模式的缺点</h3>
<p>会产生过多的相似的对象！</p>
<h2 id="二、对工厂模式的理解" tabindex="-1"><a class="header-anchor" href="#二、对工厂模式的理解" aria-hidden="true">#</a> 二、对工厂模式的理解</h2>
<p>简单工厂：通过工厂类生成不同的类。工厂类返回一个父类型的类，通过if或者switch判断用户给的数据，通过不同的数据返回不同的类。
工厂方法：比较重要的就是抽象类里面的一个抽象方法，所有继承了抽象类的类都必须实现该方法，之后在调用的时候利用多态动态的调用实现类的方法。抽象的方法里面就可以用简单工厂模式实现不同的类</p>
<h2 id="三、代码实现-简单工厂、工厂方法、抽象工厂" tabindex="-1"><a class="header-anchor" href="#三、代码实现-简单工厂、工厂方法、抽象工厂" aria-hidden="true">#</a> 三、代码实现(简单工厂、工厂方法、抽象工厂)</h2>
<h3 id="_3-1、简单工厂" tabindex="-1"><a class="header-anchor" href="#_3-1、简单工厂" aria-hidden="true">#</a> 3.1、简单工厂</h3>
<p>创建月饼类</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MoonCake</span> <span class="token punctuation">{</span>
	<span class="token keyword">public</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>
	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">kenad</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"揉面粉"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> name<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">// 糖陷月饼</span>
<span class="token keyword">class</span> sugar <span class="token keyword">extends</span> <span class="token class-name">MoonCake</span><span class="token punctuation">{</span>
	<span class="token keyword">public</span> <span class="token function">sugar</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"糖陷"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">// 肉陷月饼</span>
<span class="token keyword">class</span> meat <span class="token keyword">extends</span> <span class="token class-name">MoonCake</span> <span class="token punctuation">{</span>
	<span class="token keyword">public</span> <span class="token function">meat</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"肉馅"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建简单月饼工厂</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SimpleFactory</span> <span class="token punctuation">{</span>
	<span class="token keyword">public</span> <span class="token class-name">MoonCake</span> <span class="token function">createProduct</span><span class="token punctuation">(</span><span class="token class-name">String</span> type<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token class-name">MoonCake</span> product <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span>type<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token string">"meat"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
			product <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token function">meat</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>type<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token string">"sugar"</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			product <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token function">sugar</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
		<span class="token keyword">return</span> product<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建月饼工厂</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MoonCakeFactory</span> <span class="token punctuation">{</span>
	<span class="token class-name">SimpleFactory</span> factory<span class="token punctuation">;</span>
	<span class="token keyword">public</span> <span class="token class-name">MoonCakeFactory</span><span class="token punctuation">(</span><span class="token class-name">SimpleFactory</span> factory<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>factory <span class="token operator">=</span> factory<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">public</span> <span class="token class-name">MoonCake</span> <span class="token function">orderMoonCake</span><span class="token punctuation">(</span><span class="token class-name">String</span> type<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token class-name">MoonCake</span> product <span class="token operator">=</span> factory<span class="token punctuation">.</span><span class="token function">createProduct</span><span class="token punctuation">(</span>type<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">return</span> product<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>main方法实现</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> run <span class="token punctuation">{</span>
	<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span> args<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token comment">// 简单工厂模式 生产月饼</span>
		<span class="token class-name">SimpleFactory</span> simpleFactory <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SimpleFactory</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">new</span> <span class="token class-name">MoonCakeFactory</span><span class="token punctuation">(</span>simpleFactory<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">orderMoonCake</span><span class="token punctuation">(</span><span class="token string">"meat"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行结果</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>肉馅
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_3-2、工厂方法" tabindex="-1"><a class="header-anchor" href="#_3-2、工厂方法" aria-hidden="true">#</a> 3.2、工厂方法</h3>
<p>月饼店抽象类</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token comment">// 月饼店</span>
<span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">MoonCakeStore</span> <span class="token punctuation">{</span>
	<span class="token keyword">public</span> <span class="token class-name">MoonCake</span> <span class="token function">orderMoonCake</span><span class="token punctuation">(</span><span class="token class-name">String</span> type<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token class-name">MoonCake</span> mc<span class="token punctuation">;</span>
		mc <span class="token operator">=</span> <span class="token function">createMoonCake</span><span class="token punctuation">(</span>type<span class="token punctuation">)</span><span class="token punctuation">;</span>
		mc<span class="token punctuation">.</span><span class="token function">kenad</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">return</span> mc<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	<span class="token comment">// 抽象的工厂方法</span>
	<span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token class-name">MoonCake</span> <span class="token function">createMoonCake</span><span class="token punctuation">(</span><span class="token class-name">String</span> type<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>北方月饼店和南方月饼店</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token comment">// 北方月饼店</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">NorthMoonCakeStore</span> <span class="token keyword">extends</span> <span class="token class-name">MoonCakeStore</span><span class="token punctuation">{</span>

	<span class="token annotation punctuation">@Override</span>
	<span class="token keyword">public</span> <span class="token class-name">MoonCake</span> <span class="token function">createMoonCake</span><span class="token punctuation">(</span><span class="token class-name">String</span> type<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span>type<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token string">"meat"</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">NorthSytleMeatMoonCake</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>type<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token string">"sugar"</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">NorthSytleSugarMoonCake</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
		<span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 南方月饼店</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SouthMoonCakeStroe</span> <span class="token keyword">extends</span> <span class="token class-name">MoonCakeStore</span><span class="token punctuation">{</span>

	<span class="token annotation punctuation">@Override</span>
	<span class="token keyword">public</span> <span class="token class-name">MoonCake</span> <span class="token function">createMoonCake</span><span class="token punctuation">(</span><span class="token class-name">String</span> type<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span>type<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token string">"meat"</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">SouthSytleMeatMoonCake</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>type<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token string">"sugar"</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">SouthSytleSugarMoonCake</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
		<span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>月饼父类</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MoonCake</span> <span class="token punctuation">{</span>
	<span class="token keyword">public</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>
	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">kenad</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"揉面粉"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> name<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>北方月饼和南方月饼</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">SouthSytleMeatMoonCake</span> <span class="token keyword">extends</span> <span class="token class-name">MoonCake</span><span class="token punctuation">{</span>
	<span class="token keyword">public</span> <span class="token class-name">SouthSytleMeatMoonCake</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		name <span class="token operator">=</span><span class="token string">"南方风格的肉馅月饼"</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">SouthSytleSugarMoonCake</span> <span class="token keyword">extends</span> <span class="token class-name">MoonCake</span><span class="token punctuation">{</span>
	<span class="token keyword">public</span> <span class="token class-name">SouthSytleSugarMoonCake</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		name <span class="token operator">=</span> <span class="token string">"南方风格的糖陷月饼"</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>main方法实现</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> run <span class="token punctuation">{</span>
	<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span> args<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token comment">// 工厂方法模式 生产月饼</span>
		<span class="token class-name">MoonCakeStore</span> mcs <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SouthMoonCakeStroe</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token class-name">MoonCakeStore</span> smcs <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">NorthMoonCakeStore</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		
		<span class="token class-name">MoonCake</span> mc <span class="token operator">=</span> mcs<span class="token punctuation">.</span><span class="token function">orderMoonCake</span><span class="token punctuation">(</span><span class="token string">"meat"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>mc<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		
		<span class="token class-name">MoonCake</span> mc1 <span class="token operator">=</span> smcs<span class="token punctuation">.</span><span class="token function">orderMoonCake</span><span class="token punctuation">(</span><span class="token string">"meat"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>mc1<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行结果</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>揉面粉
南方风格的肉馅月饼
揉面粉
北方风格的肉馅月饼
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-3、抽象工厂" tabindex="-1"><a class="header-anchor" href="#_3-3、抽象工厂" aria-hidden="true">#</a> 3.3、抽象工厂</h3>
<p>创建一个抽象月饼类</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token comment">// 面粉基类</span>
<span class="token keyword">class</span> flour <span class="token punctuation">{</span>
	
<span class="token punctuation">}</span>

<span class="token comment">// 芝麻基类</span>
<span class="token keyword">class</span> sesame<span class="token punctuation">{</span>
	
<span class="token punctuation">}</span>
<span class="token comment">// 重构之前的抽象月饼类</span>
<span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">MoonCake1</span> <span class="token punctuation">{</span>
	<span class="token class-name">String</span> name<span class="token punctuation">;</span>
	flour flour<span class="token punctuation">;</span>
	sesame sesame<span class="token punctuation">;</span>
	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">kenad</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"揉面粉"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> name<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	<span class="token comment">// 准备</span>
	<span class="token keyword">abstract</span> <span class="token keyword">void</span> <span class="token function">prepare</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">//糖陷月饼</span>
<span class="token keyword">class</span> sugar1 <span class="token keyword">extends</span> <span class="token class-name">MoonCake1</span><span class="token punctuation">{</span>
	<span class="token class-name">MaterailFactory</span> materailFactory<span class="token punctuation">;</span>
	<span class="token keyword">public</span> <span class="token function">sugar1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"糖陷"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">public</span> <span class="token function">sugar1</span><span class="token punctuation">(</span><span class="token class-name">MaterailFactory</span> materailFactory<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		name <span class="token operator">=</span> <span class="token string">"糖陷月饼"</span><span class="token punctuation">;</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>materailFactory <span class="token operator">=</span> materailFactory<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	<span class="token annotation punctuation">@Override</span>
	<span class="token keyword">void</span> <span class="token function">prepare</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"准备制作月饼了"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		flour <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>materailFactory<span class="token punctuation">.</span><span class="token function">createFlour</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		sesame <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>materailFactory<span class="token punctuation">.</span><span class="token function">createSesame</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">//肉陷月饼</span>
<span class="token keyword">class</span> meat1 <span class="token keyword">extends</span> <span class="token class-name">MoonCake1</span> <span class="token punctuation">{</span>
	<span class="token class-name">MaterailFactory</span> materailFactory<span class="token punctuation">;</span>
	<span class="token keyword">public</span> <span class="token function">meat1</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"肉馅"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">public</span> <span class="token function">meat1</span><span class="token punctuation">(</span><span class="token class-name">MaterailFactory</span> materail<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>materailFactory <span class="token operator">=</span> materail<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	<span class="token annotation punctuation">@Override</span>
	<span class="token keyword">void</span> <span class="token function">prepare</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		flour <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>materailFactory<span class="token punctuation">.</span><span class="token function">createFlour</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		sesame <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>materailFactory<span class="token punctuation">.</span><span class="token function">createSesame</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>抽象月饼店</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token comment">// 月饼店抽象类	</span>
<span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">MoonCakeStore1</span> <span class="token punctuation">{</span>
	<span class="token keyword">public</span> <span class="token class-name">MoonCake1</span> <span class="token function">orderMoonCake</span><span class="token punctuation">(</span><span class="token class-name">String</span> type<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token class-name">MoonCake1</span> mc<span class="token punctuation">;</span>
		mc <span class="token operator">=</span> <span class="token function">createMoonCake</span><span class="token punctuation">(</span>type<span class="token punctuation">)</span><span class="token punctuation">;</span>
		mc<span class="token punctuation">.</span><span class="token function">kenad</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		mc<span class="token punctuation">.</span><span class="token function">prepare</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">return</span> mc<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	<span class="token comment">// 抽象的工厂方法</span>
	<span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token class-name">MoonCake1</span> <span class="token function">createMoonCake</span><span class="token punctuation">(</span><span class="token class-name">String</span> type<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>材料接口</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token comment">// 材料工厂接口</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">MaterailFactory</span> <span class="token punctuation">{</span>
	<span class="token keyword">public</span> flour <span class="token function">createFlour</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">public</span> sesame <span class="token function">createSesame</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>南方材料工厂实现材料接口</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token comment">// 南方材料工厂</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SouthMaterailFactory</span> <span class="token keyword">implements</span> <span class="token class-name">MaterailFactory</span><span class="token punctuation">{</span>

	<span class="token annotation punctuation">@Override</span>
	<span class="token keyword">public</span> flour <span class="token function">createFlour</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">SouthFlour</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token annotation punctuation">@Override</span>
	<span class="token keyword">public</span> sesame <span class="token function">createSesame</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">SouthSesame</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">// 南方面粉</span>
<span class="token keyword">class</span> <span class="token class-name">SouthFlour</span> <span class="token keyword">extends</span> flour<span class="token punctuation">{</span>
	<span class="token keyword">public</span> <span class="token class-name">SouthFlour</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"南方的独特制作的面粉"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">// 南方芝麻</span>
<span class="token keyword">class</span> <span class="token class-name">SouthSesame</span> <span class="token keyword">extends</span> sesame<span class="token punctuation">{</span>
	<span class="token keyword">public</span> <span class="token class-name">SouthSesame</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"南方的独特制作的芝麻"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>南方月饼店继承抽象月饼店</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token comment">// 南方月饼店</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SouthMoonCakeStroe1</span> <span class="token keyword">extends</span> <span class="token class-name">MoonCakeStore1</span><span class="token punctuation">{</span>

	<span class="token annotation punctuation">@Override</span>
	<span class="token keyword">public</span> <span class="token class-name">MoonCake1</span> <span class="token function">createMoonCake</span><span class="token punctuation">(</span><span class="token class-name">String</span> type<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token class-name">MaterailFactory</span> mf <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SouthMaterailFactory</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span>type<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token string">"meat"</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token function">sugar1</span><span class="token punctuation">(</span>mf<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>type<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token string">"sugar"</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token function">meat1</span><span class="token punctuation">(</span>mf<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
		<span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行代码</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> run <span class="token punctuation">{</span>
	<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span> args<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
		<span class="token class-name">MoonCakeStore1</span> mcs1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SouthMoonCakeStroe1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		
		<span class="token class-name">MoonCake1</span> mc12 <span class="token operator">=</span> mcs1<span class="token punctuation">.</span><span class="token function">orderMoonCake</span><span class="token punctuation">(</span><span class="token string">"meat"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>mc12<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token class-name">MoonCake1</span> mc11 <span class="token operator">=</span> mcs1<span class="token punctuation">.</span><span class="token function">orderMoonCake</span><span class="token punctuation">(</span><span class="token string">"meat"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>mc11<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行结果</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>揉面粉
准备制作月饼了
南方的独特制作的面粉
南方的独特制作的芝麻
糖陷月饼
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="四、uml类图" tabindex="-1"><a class="header-anchor" href="#四、uml类图" aria-hidden="true">#</a> 四、UML类图</h2>
<p><img src="https://upload-images.jianshu.io/upload_images/7172355-e25809d542ed6799.png" alt="简单工厂模式      "></p>
<p><img src="https://upload-images.jianshu.io/upload_images/7172355-5937266ecfea4c1b.png" alt="工厂方法模式"></p>
<p><img src="https://upload-images.jianshu.io/upload_images/7172355-af03f70212447f70.png" alt="抽象工厂模式"></p>
<p>注：抽象工厂模式的代码比较复杂，只是做材料的UML类图</p>
<h2 id="五、笔记" tabindex="-1"><a class="header-anchor" href="#五、笔记" aria-hidden="true">#</a> 五、笔记</h2>
<h3 id="_5-1-面向对象原则" tabindex="-1"><a class="header-anchor" href="#_5-1-面向对象原则" aria-hidden="true">#</a> 5.1 面向对象原则</h3>
<ol>
<li>多用组合，少用继承</li>
<li>针对接口编程、不针对实现编程</li>
<li>为交互之间的松耦合设计而努力</li>
<li>类应该对扩展开发、修改关闭《开闭原则》</li>
<li>依赖抽象、不要依赖具体类《依赖倒置原则》</li>
</ol>
<h3 id="_5-2-定义" tabindex="-1"><a class="header-anchor" href="#_5-2-定义" aria-hidden="true">#</a> 5.2 定义</h3>
<p>工厂方法模式：定义了一个创建对象的接口，但由于之类子类要决定要实例化哪一个。工厂方法让类的实例推迟到子类</p>
<p>抽象工厂模式：提供了一个接口，用于创建相关或依赖对象的家族，而不需要明确指定具体类</p>
<p>github源码：<a href="https://github.com/gaoqisen/java-pattern" target="_blank" rel="noopener noreferrer">https://github.com/gaoqisen/java-pattern<ExternalLinkIcon/></a></p>
<p>对比: https://cloud.tencent.com/developer/article/1523363</p>
</div></template>


