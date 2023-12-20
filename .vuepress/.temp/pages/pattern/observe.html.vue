<template><div><p>之前学习的是策略模式，复习一下之前的策略模式</p>
<h3 id="策略模式一般在哪方面使用" tabindex="-1"><a class="header-anchor" href="#策略模式一般在哪方面使用" aria-hidden="true">#</a> 策略模式一般在哪方面使用</h3>
<p>“策略”百科中指[计策]。一般是指：</p>
<ol>
<li>
<p>可以实现目标的方案集合；</p>
</li>
<li>
<p>根据形势发展而制定的行动方针和斗争方法；</p>
</li>
<li>
<p>有斗争艺术，能注意方式方法。</p>
</li>
</ol>
<p>用不同的策略解决不同的问题如出门的方式有自驾、火车、飞机等。选择不同的出行方式就是不同的策略,程序就是对各个算法的封装。让客服端非常方便的可以调用。就是在一个类中属性有相同的地方,但是行为方法不同，为了以后添加类特别方便，就可以考虑使用策略模式。</p>
<h3 id="使用策略模式有什么好处" tabindex="-1"><a class="header-anchor" href="#使用策略模式有什么好处" aria-hidden="true">#</a> 使用策略模式有什么好处</h3>
<ul>
<li>策略模式提供了对“开闭原则”的完美支持，用户可以在不修改原有系统的基础上选择算法或行为，也可以灵活地增加新的算法或行为。</li>
<li>策略模式提供了管理相关的算法族的办法。</li>
<li>策略模式提供了可以替换继承关系的办法。</li>
<li>使用策略模式可以避免使用多重条件转移语句。</li>
</ul>
<h2 id="一、对观察者模式的理解" tabindex="-1"><a class="header-anchor" href="#一、对观察者模式的理解" aria-hidden="true">#</a> 一、对观察者模式的理解：</h2>
<p>观察者模式可以理解为很多人去观察一个事物。比如微信的公众号，公众号可以经常给用户推送信息（一周可以给每个用户推送4篇文章）。用户可以取消关注，取消之后，公众号就无法给该用户发送消息了。当用户关注该公众号之后，就可以每月接收文章了。观察者模式可以很好的实现这种功能。</p>
<h2 id="二、代码实现" tabindex="-1"><a class="header-anchor" href="#二、代码实现" aria-hidden="true">#</a> 二、代码实现</h2>
<p>观察者模式在java中有两种实现，一种是自己实现，还有一种就是java自带的jdk中已经写好的</p>
<h4 id="_1、自己用代码实现观察者模式" tabindex="-1"><a class="header-anchor" href="#_1、自己用代码实现观察者模式" aria-hidden="true">#</a> 1、自己用代码实现观察者模式</h4>
<p>创建公众号接口，用于其他公众号实现</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">OfficialAccounts</span> <span class="token punctuation">{</span>
 <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">follow</span><span class="token punctuation">(</span><span class="token class-name">User</span> user<span class="token punctuation">)</span><span class="token punctuation">;</span>   <span class="token comment">// 关注公众号</span>
 <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">unfollow</span><span class="token punctuation">(</span><span class="token class-name">User</span> user<span class="token punctuation">)</span><span class="token punctuation">;</span>	<span class="token comment">// 取消关注</span>
 <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">sendMessageAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// 给所有的用户发送消息</span>
<span class="token punctuation">}</span>   
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建一个新闻的公众号用于实现公众号接口，新增其它公众号，直接实现OfficialAccounts就好了</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token comment">// 新闻公众号</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">NewsOfficialAccounts</span> <span class="token keyword">implements</span> <span class="token class-name">OfficialAccounts</span><span class="token punctuation">{</span>
 <span class="token keyword">private</span> <span class="token class-name">ArrayList</span> users<span class="token punctuation">;</span>
 <span class="token keyword">private</span> <span class="token class-name">String</span> content<span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token class-name">NewsOfficialAccounts</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	users <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token annotation punctuation">@Override</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">follow</span><span class="token punctuation">(</span><span class="token class-name">User</span> user<span class="token punctuation">)</span> <span class="token punctuation">{</span>  <span class="token comment">// 关注该公众号</span>
	users<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token annotation punctuation">@Override</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">unfollow</span><span class="token punctuation">(</span><span class="token class-name">User</span> user<span class="token punctuation">)</span> <span class="token punctuation">{</span>  <span class="token comment">// 取消关注</span>
	<span class="token keyword">int</span> i <span class="token operator">=</span> users<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">if</span><span class="token punctuation">(</span>i<span class="token operator">>=</span><span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		users<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token annotation punctuation">@Override</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">sendMessageAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>  <span class="token comment">//  给所有用户发送文章</span>
	<span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i<span class="token operator">&lt;</span>users<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token class-name">User</span> user <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">User</span><span class="token punctuation">)</span> users<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
		user<span class="token punctuation">.</span><span class="token function">acceptMessage</span><span class="token punctuation">(</span>content<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setContent</span><span class="token punctuation">(</span><span class="token class-name">String</span> content<span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token comment">// 设置消息自动给所有用户发送文章</span>
	<span class="token keyword">this</span><span class="token punctuation">.</span>content <span class="token operator">=</span> content<span class="token punctuation">;</span>
	<span class="token function">sendMessageAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建用户类接口，用于接受公众号文章</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">User</span> <span class="token punctuation">{</span>
 	 <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">acceptMessage</span><span class="token punctuation">(</span><span class="token class-name">String</span> content<span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// 接收消息</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建用户实现用户接口。创建其它用户也只需要实现User接口</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token comment">// 用户jason</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">UserJason</span> <span class="token keyword">implements</span> <span class="token class-name">User</span><span class="token punctuation">{</span>
 <span class="token keyword">private</span> <span class="token class-name">String</span> name <span class="token operator">=</span> <span class="token string">"jason"</span><span class="token punctuation">;</span>
 <span class="token keyword">private</span> <span class="token class-name">String</span> message<span class="token punctuation">;</span>
 <span class="token keyword">private</span> <span class="token class-name">OfficialAccounts</span> os<span class="token punctuation">;</span>
<span class="token annotation punctuation">@Override</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">acceptMessage</span><span class="token punctuation">(</span><span class="token class-name">String</span> content<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>name<span class="token operator">+</span><span class="token string">"接收到了"</span><span class="token operator">+</span>content<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">this</span><span class="token punctuation">.</span>message <span class="token operator">=</span> content<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">public</span> <span class="token class-name">UserJason</span><span class="token punctuation">(</span><span class="token class-name">OfficialAccounts</span> os<span class="token punctuation">)</span> <span class="token punctuation">{</span>  <span class="token comment">// 构造器作为关注公众号用</span>
	<span class="token keyword">this</span><span class="token punctuation">.</span>os <span class="token operator">=</span> os<span class="token punctuation">;</span>
	os<span class="token punctuation">.</span><span class="token function">follow</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">unfollow</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>  <span class="token comment">// 取消关注</span>
	os<span class="token punctuation">.</span><span class="token function">unfollow</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">// 用户tom</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">UserTom</span> <span class="token keyword">implements</span> <span class="token class-name">User</span><span class="token punctuation">{</span>
 <span class="token keyword">private</span> <span class="token class-name">String</span> name <span class="token operator">=</span> <span class="token string">"tom"</span><span class="token punctuation">;</span>
 <span class="token keyword">private</span> <span class="token class-name">String</span> message<span class="token punctuation">;</span>
 <span class="token keyword">private</span> <span class="token class-name">OfficialAccounts</span> os<span class="token punctuation">;</span>
<span class="token annotation punctuation">@Override</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">acceptMessage</span><span class="token punctuation">(</span><span class="token class-name">String</span> content<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>name<span class="token operator">+</span><span class="token string">"接收到了"</span><span class="token operator">+</span>content<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">this</span><span class="token punctuation">.</span>message <span class="token operator">=</span> content<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">public</span> <span class="token class-name">UserTom</span><span class="token punctuation">(</span><span class="token class-name">OfficialAccounts</span> os<span class="token punctuation">)</span> <span class="token punctuation">{</span>  <span class="token comment">// 构造器作为关注公众号用</span>
	<span class="token keyword">this</span><span class="token punctuation">.</span>os <span class="token operator">=</span> os<span class="token punctuation">;</span>
	os<span class="token punctuation">.</span><span class="token function">follow</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>main方法运行</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span> args<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 创建一个新闻的公众号</span>
	<span class="token class-name">NewsOfficialAccounts</span> noa <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">NewsOfficialAccounts</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token comment">// 创建用户</span>
	<span class="token class-name">UserTom</span> tom <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">UserTom</span><span class="token punctuation">(</span>noa<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token class-name">UserJason</span> jason <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">UserJason</span><span class="token punctuation">(</span>noa<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token comment">// 公众号发送消息</span>
	noa<span class="token punctuation">.</span><span class="token function">setContent</span><span class="token punctuation">(</span><span class="token string">"新闻消息1"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	noa<span class="token punctuation">.</span><span class="token function">setContent</span><span class="token punctuation">(</span><span class="token string">"新闻消息2"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	jason<span class="token punctuation">.</span><span class="token function">unfollow</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>   <span class="token comment">// 取消关注，jason无法接收消息3</span>
	noa<span class="token punctuation">.</span><span class="token function">setContent</span><span class="token punctuation">(</span><span class="token string">"新闻消息3"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行结果：实现类发现消息之后只要所有关注了新闻公众号的用户可以接受消息，没有关注的就没有接收到</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>jason接收到了新闻消息<span class="token number">1</span>
tom接收到了新闻消息<span class="token number">2</span>
jason接收到了新闻消息<span class="token number">2</span>
tom接收到了新闻消息<span class="token number">3</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2、用java-jdk-自带的observable、observer实现" tabindex="-1"><a class="header-anchor" href="#_2、用java-jdk-自带的observable、observer实现" aria-hidden="true">#</a> 2、用java jdk 自带的Observable、Observer实现</h4>
<p>创建公众号</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">BankOffcialAccounts</span> <span class="token keyword">extends</span> <span class="token class-name">Observable</span><span class="token punctuation">{</span> <span class="token comment">// 实现java自带的可观察者接口</span>
	 <span class="token keyword">private</span> <span class="token class-name">String</span> content<span class="token punctuation">;</span>  <span class="token comment">// 接受的消息</span>
	 <span class="token keyword">public</span> <span class="token class-name">BankOffcialAccounts</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>  <span class="token comment">// 构造器</span>
	 <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">changed</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>    <span class="token comment">// 消息变化方法</span>
		<span class="token function">setChanged</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token function">notifyObservers</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>   <span class="token comment">// 通知所有观察者</span>
	 <span class="token punctuation">}</span>
	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">sendMessage</span><span class="token punctuation">(</span><span class="token class-name">String</span> content<span class="token punctuation">)</span> <span class="token punctuation">{</span>  <span class="token comment">// 发送消息</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>content <span class="token operator">=</span> content<span class="token punctuation">;</span>
		<span class="token function">changed</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getContent</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> content<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setContent</span><span class="token punctuation">(</span><span class="token class-name">String</span> content<span class="token punctuation">)</span> <span class="token punctuation">{</span>   <span class="token comment">// 写入公众号内容</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>content <span class="token operator">=</span> content<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>	
<span class="token punctuation">}</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建一个用java自带的观察者用户（同上面的UserJason、UserTom）</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">UserJDK</span> <span class="token keyword">implements</span> <span class="token class-name">Observer</span><span class="token punctuation">{</span>  <span class="token comment">// 实现java自带的观察者</span>
 <span class="token class-name">Observable</span> observable<span class="token punctuation">;</span>
 <span class="token keyword">private</span> <span class="token class-name">String</span> name <span class="token operator">=</span> <span class="token string">"jdk"</span><span class="token punctuation">;</span>
 <span class="token keyword">private</span> <span class="token class-name">String</span> content<span class="token punctuation">;</span>

<span class="token annotation punctuation">@Override</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">update</span><span class="token punctuation">(</span><span class="token class-name">Observable</span> o<span class="token punctuation">,</span> <span class="token class-name">Object</span> arg<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">if</span> <span class="token punctuation">(</span>o <span class="token keyword">instanceof</span> <span class="token class-name">BankOffcialAccounts</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token class-name">BankOffcialAccounts</span> boa <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">BankOffcialAccounts</span><span class="token punctuation">)</span>o<span class="token punctuation">;</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>content <span class="token operator">=</span> boa<span class="token punctuation">.</span><span class="token function">getContent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>name<span class="token operator">+</span><span class="token string">"接收到了"</span><span class="token operator">+</span>content<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">public</span> <span class="token class-name">UserJDK</span><span class="token punctuation">(</span><span class="token class-name">Observable</span> o<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">this</span><span class="token punctuation">.</span>observable <span class="token operator">=</span> o<span class="token punctuation">;</span>
	observable<span class="token punctuation">.</span><span class="token function">addObserver</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>	
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>和之前自己写的观察者模式一起运行</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span> args<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 创建一个新闻的公众号</span>
	<span class="token class-name">NewsOfficialAccounts</span> noa <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">NewsOfficialAccounts</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token comment">// 创建用户</span>
	<span class="token class-name">UserTom</span> tom <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">UserTom</span><span class="token punctuation">(</span>noa<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token class-name">UserJason</span> jason <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">UserJason</span><span class="token punctuation">(</span>noa<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token class-name">BankOffcialAccounts</span> bank <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BankOffcialAccounts</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token class-name">UserJDK</span> jdk <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">UserJDK</span><span class="token punctuation">(</span>bank<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token comment">// 发送消息</span>
	noa<span class="token punctuation">.</span><span class="token function">setContent</span><span class="token punctuation">(</span><span class="token string">"新闻消息1"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	noa<span class="token punctuation">.</span><span class="token function">setContent</span><span class="token punctuation">(</span><span class="token string">"新闻消息2"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	jason<span class="token punctuation">.</span><span class="token function">unfollow</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>   <span class="token comment">// 取消关注，jason无法接收消息3</span>
	noa<span class="token punctuation">.</span><span class="token function">setContent</span><span class="token punctuation">(</span><span class="token string">"新闻消息3"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	bank<span class="token punctuation">.</span><span class="token function">sendMessage</span><span class="token punctuation">(</span><span class="token string">"发送消息4"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行结果</p>
<pre><code>tom接收到了新闻消息1
jason接收到了新闻消息1
tom接收到了新闻消息2
jason接收到了新闻消息2
tom接收到了新闻消息3
jdk接收到了发送消息4
</code></pre>
<p>需要注意的是Observable是一个类，必须要写一个类基础他。限制类Observable的复用潜力</p>
<h2 id="三、uml类图" tabindex="-1"><a class="header-anchor" href="#三、uml类图" aria-hidden="true">#</a> 三、UML类图</h2>
<p><img src="https://upload-images.jianshu.io/upload_images/7172355-d7da88a3cf293893.png" alt="自己实现的观察模式"></p>
<p><img src="https://upload-images.jianshu.io/upload_images/7172355-0d648cd23685d4a3.png" alt="java jdk自带的">
Observable、Observer 是java jdk自带的</p>
<h2 id="四、笔记" tabindex="-1"><a class="header-anchor" href="#四、笔记" aria-hidden="true">#</a> 四、笔记</h2>
<p>1、面向对象原则</p>
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
<p>为交互对象之间的松耦合而努力</p>
</blockquote>
<p>2、观察模式定义
在对象之间定义一对多的依赖、这样一来，当一个对象改变状态，依赖它的对象都会收到通知，并自动更新</p>
<p>github源码：<a href="https://github.com/gaoqisen/java-pattern" target="_blank" rel="noopener noreferrer">https://github.com/gaoqisen/java-pattern<ExternalLinkIcon/></a></p>
</div></template>


