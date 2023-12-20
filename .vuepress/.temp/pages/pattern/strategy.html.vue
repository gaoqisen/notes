<template><div><p>最近在读head frist 的设计模式。之前就了解过这本书的，感觉还不错，于是就在淘宝上购买了一本。书有500多页挺厚的一本，内容都是很容易上手的，当成漫画看就可以了。本着学习的态度，我想认认真真的把设计模式好好学习一下。设计模式很多，一个一个的学，学完一个，我就在这里纪录一下自己的学习成果、自己对设计模式的理解、以及一些笔记、代码就是自己想一个显示生活中的例子模拟实现。</p>
<h2 id="一、对策略模式的理解" tabindex="-1"><a class="header-anchor" href="#一、对策略模式的理解" aria-hidden="true">#</a> 一、对策略模式的理解</h2>
<p>  关于策略模式，我看完书之后回忆的起来的大概就是建立一个抽象类，抽象除类的不改变的属性，如动物的名字、年龄等这些都是每个动物都有的，不会改变的。</p>
<h2 id="二、代码实现" tabindex="-1"><a class="header-anchor" href="#二、代码实现" aria-hidden="true">#</a> 二、代码实现</h2>
<p>创建一个动物类</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>    <span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">class</span> animal <span class="token punctuation">{</span>
       <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>
       <span class="token keyword">private</span> <span class="token keyword">int</span> age<span class="token punctuation">;</span>
	｝
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后多个类继承该抽象类，如小猫、小狗等。</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code> <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Dog</span> <span class="token keyword">extends</span> animal<span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>之后就是动物有的会飞、会叫等。这些都是动物的行为。之后把动物的飞行、叫喊接口化。</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code> <span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">CallBehavior</span> <span class="token punctuation">{</span>   <span class="token comment">// 叫喊行为</span>
     <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">call</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 <span class="token punctuation">}</span>
 <span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">FlyBehavior</span> <span class="token punctuation">{</span>  <span class="token comment">// 飞行行为</span>
     <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">fly</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>会飞、会叫都可以是动物的行为。就可以将会飞、会叫的接口组合在动物类里面，当成动物的属性</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code> <span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">class</span> animal <span class="token punctuation">{</span>
     <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>
     <span class="token keyword">private</span> <span class="token keyword">int</span> age<span class="token punctuation">;</span>
     <span class="token class-name">FlyBehavior</span> flyBehavior<span class="token punctuation">;</span>  <span class="token comment">// 让所有的动物都继承这个行为</span>
     <span class="token class-name">CallBehavior</span> callBehavior<span class="token punctuation">;</span>
  <span class="token comment">// 添加方法，用于被继承的动物共用方法</span>
  <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">performFly</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>  <span class="token comment">// 执行飞行</span>
	 flyBehavior<span class="token punctuation">.</span><span class="token function">fly</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">performCall</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 执行叫喊</span>
     callBehavior<span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
  <span class="token punctuation">}</span>
  <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setFlyBehavior</span><span class="token punctuation">(</span><span class="token class-name">FlyBehavior</span> fly<span class="token punctuation">)</span><span class="token punctuation">{</span>   <span class="token comment">// 动态的设置飞行的实现类，可以在运行时改变动物的飞行方式</span>
	 <span class="token keyword">this</span><span class="token punctuation">.</span>flyBehavior <span class="token operator">=</span> fly<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setCallBehavior</span><span class="token punctuation">(</span><span class="token class-name">CallBehavior</span> call<span class="token punctuation">)</span><span class="token punctuation">{</span>
     <span class="token keyword">this</span><span class="token punctuation">.</span>callBehavior <span class="token operator">=</span> call<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
 ｝
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>之后就用不同的实现类实现会飞、会叫的接口</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token comment">// 叫喊接口实现</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CallBig</span> <span class="token keyword">implements</span> <span class="token class-name">CallBehavior</span><span class="token punctuation">{</span>
  <span class="token annotation punctuation">@Override</span>
  <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">call</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"特别大声的叫"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CallNoWay</span> <span class="token keyword">implements</span> <span class="token class-name">CallBehavior</span><span class="token punctuation">{</span>
  <span class="token annotation punctuation">@Override</span>
  <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">call</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"不会叫"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">// 飞行接口实现</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">FlyNoWay</span> <span class="token keyword">implements</span> <span class="token class-name">FlyBehavior</span><span class="token punctuation">{</span>
  <span class="token annotation punctuation">@Override</span>
  <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">fly</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"不会飞行"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">FlyWithWings</span> <span class="token keyword">implements</span> <span class="token class-name">FlyBehavior</span><span class="token punctuation">{</span>
  <span class="token annotation punctuation">@Override</span>
  <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">fly</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"我要飞的更高"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后就可以给小狗类添加默认的构造器。</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Dog</span> <span class="token keyword">extends</span> animal<span class="token punctuation">{</span>
  <span class="token keyword">public</span> <span class="token class-name">Dog</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>  <span class="token comment">// 小狗的构造器</span>
	callBehavior <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">CallBig</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>   <span class="token comment">// 大声叫callBehavior 使用的是父类的变量</span>
	flyBehavior <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FlyNoWay</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  
  <span class="token punctuation">}</span>  
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>调用</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span> args<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	animal dw <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">DogModle</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	dw<span class="token punctuation">.</span><span class="token function">performFly</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// 默认飞行</span>
	dw<span class="token punctuation">.</span><span class="token function">performCall</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// 默认叫喊</span>
	dw<span class="token punctuation">.</span><span class="token function">setFlyBehavior</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">FlyWithWings</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">//动态绑定飞行行为</span>
	dw<span class="token punctuation">.</span><span class="token function">performFly</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>   <span class="token comment">// 更改之后的飞行方式</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行结果</p>
<pre><code>不会飞行
特别大声的叫
我要飞的更高
</code></pre>
<p>这样就动态实现了数据的绑定，根据不同的策略，绑定不同的接口。动态的完成功能，后期添加其他动物，也不需要更改之前的代码。完全做到了，对新增开放、对修改闭合的开闭原则。</p>
<h2 id="三、uml类图" tabindex="-1"><a class="header-anchor" href="#三、uml类图" aria-hidden="true">#</a> 三、UML类图</h2>
<p>画的不正规的uml图
<img src="https://upload-images.jianshu.io/upload_images/7172355-0d16b6383d232c30.png" alt="策略模式-UML.png"></p>
<h2 id="四、笔记" tabindex="-1"><a class="header-anchor" href="#四、笔记" aria-hidden="true">#</a> 四、笔记</h2>
<h4 id="_1、学到的三个原则" tabindex="-1"><a class="header-anchor" href="#_1、学到的三个原则" aria-hidden="true">#</a> 1、学到的三个原则</h4>
<blockquote>
<p>将会变动的代码进行封装</p>
</blockquote>
<blockquote>
<p>针对接口编程，不针对实现编程</p>
</blockquote>
<blockquote>
<p>多用组合、少用继承</p>
</blockquote>
<p>####2、策略模式定义</p>
<blockquote>
<p>定义算法族，分别封装起来，让他们之间可以互相替换，此模式让算法的变化独立于使用算法的客户</p>
</blockquote>
<p>github源码：<a href="https://github.com/gaoqisen/java-pattern" target="_blank" rel="noopener noreferrer">https://github.com/gaoqisen/java-pattern<ExternalLinkIcon/></a></p>
</div></template>


