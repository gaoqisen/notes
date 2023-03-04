<template><div><h2 id="第一章-创建和销毁对象" tabindex="-1"><a class="header-anchor" href="#第一章-创建和销毁对象" aria-hidden="true">#</a> 第一章 创建和销毁对象</h2>
<h3 id="_1-1-用静态工厂方法代替构造器" tabindex="-1"><a class="header-anchor" href="#_1-1-用静态工厂方法代替构造器" aria-hidden="true">#</a> 1.1 用静态工厂方法代替构造器</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token class-name">BigInteger</span> prime <span class="token operator">=</span> <span class="token class-name">BigInteger</span><span class="token punctuation">.</span><span class="token function">valueof</span><span class="token punctuation">(</span><span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token constant">MAX_VALUE</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>优点:</p>
<ol>
<li>静态工厂方法有名称</li>
<li>不用每次调用都new新的类</li>
<li>可以返回子类型对象</li>
<li>可以用参数控制返回不同的类</li>
<li>可以编写返回一个不存在的类</li>
</ol>
<p>缺点:</p>
<ol>
<li>不容易查明类是如何被实例化的</li>
<li>如果没有共有或受保护的构造器就不能被子类化</li>
</ol>
<h3 id="_1-2-遇到多个构造器参数时要考虑使用构建器" tabindex="-1"><a class="header-anchor" href="#_1-2-遇到多个构造器参数时要考虑使用构建器" aria-hidden="true">#</a> 1.2 遇到多个构造器参数时要考虑使用构建器</h3>
<p>优点:</p>
<p>多参数构造器的客户端代码很难阅读和编写</p>
<p>get/set方式赋值让类不可变变得不复存在</p>
<p>Builder模式适用于类层次结构</p>
<p>Builder模拟了具名的可选参数</p>
<p>缺点:</p>
<p>必须先创建构造器，在某些十分注重性能的情况下可能会有问题</p>
<p>比重叠构造器模式更冗长</p>
</div></template>


