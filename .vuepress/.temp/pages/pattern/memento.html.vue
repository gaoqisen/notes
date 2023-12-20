<template><div><h2 id="一、对备忘录模式的理解" tabindex="-1"><a class="header-anchor" href="#一、对备忘录模式的理解" aria-hidden="true">#</a> 一、对备忘录模式的理解</h2>
<p>备忘录就是备忘的意思，就像git一样，每个状态都记得，如果代码写错了，还可以回到历史版本。而且对现有版本不回产生影响，如果还需要回到现有版本也是可以的。可以实现撤销功能。实现的时候主要需要一个发起人、守护人、和一个备忘录类。</p>
<h2 id="二、代码实现" tabindex="-1"><a class="header-anchor" href="#二、代码实现" aria-hidden="true">#</a> 二、代码实现</h2>
<p>创建备忘录类，用于存放数据</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code> <span class="token comment">// 备忘录</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Memento</span> <span class="token punctuation">{</span>
	<span class="token keyword">private</span> <span class="token class-name">String</span> state<span class="token punctuation">;</span>
	
	<span class="token keyword">public</span> <span class="token class-name">Memento</span><span class="token punctuation">(</span><span class="token class-name">String</span> state<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> state<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getState</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>state<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建发起人类、用来设置状态，获取备忘录、设置备忘录等功能。</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>
<span class="token comment">// 发起人</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Originator</span> <span class="token punctuation">{</span>
	<span class="token keyword">private</span> <span class="token class-name">String</span> state<span class="token punctuation">;</span>
	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setState</span><span class="token punctuation">(</span><span class="token class-name">String</span> state<span class="token punctuation">)</span><span class="token punctuation">{</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> state<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	
	<span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getState</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>state<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	<span class="token comment">// 保存状态到备忘录</span>
	<span class="token keyword">public</span> <span class="token class-name">Memento</span> <span class="token function">saveStateToMemento</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Memento</span><span class="token punctuation">(</span>state<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	<span class="token comment">// 通过备忘录获取状态</span>
	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">getStateFromMemento</span><span class="token punctuation">(</span><span class="token class-name">Memento</span> m<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		state <span class="token operator">=</span> m<span class="token punctuation">.</span><span class="token function">getState</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建守护者类、用于存放历史备忘录、增加历史版本备忘录，通过下标获取备忘录等</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token comment">// 守护者</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CareTaker</span> <span class="token punctuation">{</span>
	<span class="token keyword">private</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Memento</span><span class="token punctuation">></span></span> list <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Memento</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	
	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token class-name">Memento</span> m<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		list<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>m<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">public</span> <span class="token class-name">Memento</span> <span class="token function">getMemento</span><span class="token punctuation">(</span><span class="token keyword">int</span> i<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> list<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>main 方法实现</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token class-name">Originator</span> origin <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Originator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token class-name">CareTaker</span> ct <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">CareTaker</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		origin<span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span><span class="token string">"状态1"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		origin<span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span><span class="token string">"状态2"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		ct<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>origin<span class="token punctuation">.</span><span class="token function">saveStateToMemento</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		origin<span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span><span class="token string">"状态3"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		ct<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>origin<span class="token punctuation">.</span><span class="token function">saveStateToMemento</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		origin<span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span><span class="token string">"状态4"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"当前状态为:"</span><span class="token operator">+</span> origin<span class="token punctuation">.</span><span class="token function">getState</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		origin<span class="token punctuation">.</span><span class="token function">getStateFromMemento</span><span class="token punctuation">(</span>ct<span class="token punctuation">.</span><span class="token function">getMemento</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"回到第一个状态为:"</span><span class="token operator">+</span> origin<span class="token punctuation">.</span><span class="token function">getState</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		origin<span class="token punctuation">.</span><span class="token function">getStateFromMemento</span><span class="token punctuation">(</span>ct<span class="token punctuation">.</span><span class="token function">getMemento</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"回到第二个状态为:"</span><span class="token operator">+</span> origin<span class="token punctuation">.</span><span class="token function">getState</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		
	<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行结果</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>当前状态为:状态4
回到第一个状态为:状态2
回到第二个状态为:状态3

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="三、uml类图" tabindex="-1"><a class="header-anchor" href="#三、uml类图" aria-hidden="true">#</a> 三、UML类图</h2>
<p><img src="https://gaoqisen.github.io/GraphBed/201810/20181025225039.png" alt="备忘录模式"></p>
<h2 id="四、笔记" tabindex="-1"><a class="header-anchor" href="#四、笔记" aria-hidden="true">#</a> 四、笔记</h2>
<p>定义：在不破坏封装的前提下，捕获一个对象的内部状态，并在该对象之外保存这个状态，这样可以在以后将对象恢复到原先保存的状态。</p>
<p>备忘录的优点：</p>
<ul>
<li>
<p>将被存储的状态放在外面，不要和关键对象混在一起，这可以帮助维护内聚。</p>
</li>
<li>
<p>保持关键对象的数据封装</p>
</li>
<li>
<p>提供了容易实现的恢复能力</p>
</li>
</ul>
<p>备忘录的用途和缺点：</p>
<ul>
<li>
<p>备忘录用于存储状态</p>
</li>
<li>
<p>存储和恢复状态可能比较费时间</p>
</li>
<li>
<p>java中可以考虑使用序列化机制存储系统的状态。</p>
</li>
</ul>
</div></template>


