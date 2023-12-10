<template><div><p>内存中存储数据的两种方式：数组和链表，总结如下：</p>
<table>
<thead>
<tr>
<th>结构</th>
<th>功能</th>
</tr>
</thead>
<tbody>
<tr>
<td>单向链表</td>
<td>每个节点有引用指向下一个节点</td>
</tr>
<tr>
<td>双向链表</td>
<td>每个节点有指向上一个和下一个节点的引用</td>
</tr>
<tr>
<td>栈（弹夹）</td>
<td>先进后出</td>
</tr>
<tr>
<td>队列（排队）</td>
<td>先进先出</td>
</tr>
</tbody>
</table>
<table>
<thead>
<tr>
<th>常见实现方式</th>
<th>实现注意点</th>
</tr>
</thead>
<tbody>
<tr>
<td>数组实现栈和队列</td>
<td>数组存储数据下标记录位置，队列实现一个记录头一个记录尾即可。<br />循环队列两种方式: 牺牲一个位置判断，一种是利用数量标记区分</td>
</tr>
<tr>
<td>链表实现栈和队列</td>
<td>用头节点和尾节点记录即可实现</td>
</tr>
<tr>
<td>找出栈中最小值</td>
<td>利用两个栈，第二个栈一直存放最小的数据</td>
</tr>
<tr>
<td>队列实现栈</td>
<td>两个队列互相倒，最后一个就出栈</td>
</tr>
<tr>
<td>栈实现队列</td>
<td>将所有push栈里面的数据全部倒入到pop栈，pop栈为空时才倒</td>
</tr>
<tr>
<td>单链表和双链表反转</td>
<td></td>
</tr>
</tbody>
</table>
<h2 id="一、-链表" tabindex="-1"><a class="header-anchor" href="#一、-链表" aria-hidden="true">#</a> 一、 链表</h2>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token comment">// 单链表</span>
<span class="token keyword">class</span> <span class="token class-name">OnlyNode</span><span class="token punctuation">{</span>
	<span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>
	<span class="token keyword">private</span> <span class="token class-name">OnlyNode</span> next<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// 双链表</span>
<span class="token keyword">class</span> <span class="token class-name">DoubleNode</span><span class="token punctuation">{</span>
	<span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>
	<span class="token keyword">private</span> <span class="token class-name">DobleNode</span> next<span class="token punctuation">;</span>
	<span class="token keyword">private</span> <span class="token class-name">DoubleNode</span> prev<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="二、队列和栈" tabindex="-1"><a class="header-anchor" href="#二、队列和栈" aria-hidden="true">#</a> 二、队列和栈</h2>
<p>队列：先进先出，如排队</p>
<p>栈：先进后出，如弹夹</p>
<p>代码实现比较简单，如下：</p>
<h3 id="_1-链表实现队列" tabindex="-1"><a class="header-anchor" href="#_1-链表实现队列" aria-hidden="true">#</a> 1 链表实现队列</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">LinkedQueueNode</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token class-name">Node</span> head<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">Node</span> tail<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">Integer</span> size <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">push</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Node</span> node <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Node</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>head <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
           <span class="token keyword">this</span><span class="token punctuation">.</span>head <span class="token operator">=</span> node<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>tail <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>tail<span class="token punctuation">.</span><span class="token function">setNext</span><span class="token punctuation">(</span>node<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>tail <span class="token operator">=</span> node<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>size<span class="token operator">++</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">Node</span> <span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Node</span> head <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>head<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>head <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>head<span class="token punctuation">.</span><span class="token function">getNext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        head<span class="token punctuation">.</span><span class="token function">setNext</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> head<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-链表实现栈" tabindex="-1"><a class="header-anchor" href="#_2-链表实现栈" aria-hidden="true">#</a> 2 链表实现栈</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">LinkedStack</span><span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token class-name">Node</span> node<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">push</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Node</span> node <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Node</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>node <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>node <span class="token operator">=</span> node<span class="token punctuation">;</span>
            <span class="token keyword">return</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        node<span class="token punctuation">.</span><span class="token function">setNext</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>node<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>node <span class="token operator">=</span> node<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">Node</span> <span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>node <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token class-name">Node</span> next <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>node<span class="token punctuation">;</span>

        <span class="token keyword">this</span><span class="token punctuation">.</span>node <span class="token operator">=</span> next<span class="token punctuation">.</span><span class="token function">getNext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> next<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-数组实现栈" tabindex="-1"><a class="header-anchor" href="#_3-数组实现栈" aria-hidden="true">#</a> 3 数组实现栈</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Data</span>
<span class="token keyword">class</span> <span class="token class-name">ArrayStack</span><span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> stack<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token keyword">int</span> index<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">ArrayStack</span><span class="token punctuation">(</span><span class="token keyword">int</span> size<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>stack <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span>size<span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>index <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">push</span><span class="token punctuation">(</span><span class="token keyword">int</span> val<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>index <span class="token operator">==</span> stack<span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"满了"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">int</span> temp <span class="token operator">=</span> index<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>index<span class="token operator">++</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>stack<span class="token punctuation">[</span>temp<span class="token punctuation">]</span> <span class="token operator">=</span> val<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>index <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"没有数据了"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>index<span class="token operator">--</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>stack<span class="token punctuation">[</span><span class="token keyword">this</span><span class="token punctuation">.</span>index<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-数组实现队列" tabindex="-1"><a class="header-anchor" href="#_4-数组实现队列" aria-hidden="true">#</a> 4 数组实现队列</h3>
<h3 id="_5-循环队列数组" tabindex="-1"><a class="header-anchor" href="#_5-循环队列数组" aria-hidden="true">#</a> 5 循环队列数组</h3>
<p>循环数组队列：添加队列数组时只要存在空位置就可以往队列中添加元素。</p>
<p><img src="https://gaoqisen.github.io/GraphBed/202212/20221217134058.png" alt="循环数组队列"></p>
<h3 id="" tabindex="-1"><a class="header-anchor" href="#" aria-hidden="true">#</a> </h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * 循环队列数组
 * 
 * https://www.cnblogs.com/heliusKing/p/12326816.html
 */</span>
<span class="token keyword">class</span> <span class="token class-name">CycleQueueArray</span> <span class="token punctuation">{</span>

    <span class="token keyword">int</span> querySize <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> front <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> rear <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> query<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">CycleQueueArray</span><span class="token punctuation">(</span><span class="token keyword">int</span> querySize<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">// 牺牲一个位置用于标记</span>
        querySize<span class="token operator">++</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>querySize <span class="token operator">=</span> querySize<span class="token punctuation">;</span>
        query <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span>querySize<span class="token punctuation">]</span><span class="token punctuation">;</span>
        front <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        rear <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">// 当队尾和队头相等时，表明为空队列</span>
        <span class="token keyword">return</span> rear <span class="token operator">==</span> front<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 判断是否为满队列（当头和尾在同一个位置时，无法区分是空数组还是满了）
     * 一般有两种做法：
     * 1、用一个标记去记录
     * 2、牺牲一个位置用来标记
     *
     * <span class="token keyword">@return</span>  true：满
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">isFull</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">// 表明队尾和队头相邻 且队尾在左，队头在右</span>
        <span class="token keyword">return</span> <span class="token punctuation">(</span>rear <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">%</span> querySize <span class="token operator">==</span> front<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">push</span><span class="token punctuation">(</span><span class="token keyword">int</span> num<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isFull</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"队列已满 无法加入数据"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        query<span class="token punctuation">[</span>rear<span class="token punctuation">]</span> <span class="token operator">=</span> num<span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token punctuation">(</span>rear <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">%</span> querySize<span class="token punctuation">)</span><span class="token punctuation">;</span>
        rear <span class="token operator">=</span> <span class="token punctuation">(</span>rear <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">%</span> querySize<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span><span class="token string">"为空，不能取值"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">int</span> value <span class="token operator">=</span>  query<span class="token punctuation">[</span>front<span class="token punctuation">]</span><span class="token punctuation">;</span>
        front <span class="token operator">=</span> <span class="token punctuation">(</span>front <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">%</span> querySize<span class="token punctuation">;</span>
        <span class="token keyword">return</span> value<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">showQueue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
           <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"为空，不能遍历"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> front<span class="token punctuation">;</span> i <span class="token operator">&lt;</span> front <span class="token operator">+</span> <span class="token punctuation">(</span>rear <span class="token operator">+</span> querySize <span class="token operator">-</span> front<span class="token punctuation">)</span> <span class="token operator">%</span>querySize<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span> 
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span>query<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">+</span> <span class="token string">", "</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">""</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>另外一个利用字段标记实现</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Data</span>
<span class="token keyword">class</span> <span class="token class-name">ArrayQueue</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> queue<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token keyword">int</span> start<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token keyword">int</span> end<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token keyword">int</span> size<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">ArrayQueue</span><span class="token punctuation">(</span><span class="token keyword">int</span> size<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>start <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>end <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>queue <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span>size<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">push</span><span class="token punctuation">(</span><span class="token keyword">int</span> val<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>size <span class="token operator">==</span> queue<span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"满了"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>queue<span class="token punctuation">[</span>end<span class="token punctuation">]</span> <span class="token operator">=</span> val<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>end <span class="token operator">=</span> end <span class="token operator">&lt;</span> queue<span class="token punctuation">.</span>length<span class="token operator">-</span><span class="token number">1</span> <span class="token operator">?</span> end<span class="token operator">+</span><span class="token number">1</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>size<span class="token operator">++</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>size<span class="token operator">--</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>start <span class="token operator">=</span> start <span class="token operator">&lt;</span> queue<span class="token punctuation">.</span>length <span class="token operator">?</span> start<span class="token operator">++</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>queue<span class="token punctuation">[</span>start<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="三、其他数据结构整理" tabindex="-1"><a class="header-anchor" href="#三、其他数据结构整理" aria-hidden="true">#</a> 三、其他数据结构整理</h2>
<h3 id="_1-常见数据结构时间复杂度" tabindex="-1"><a class="header-anchor" href="#_1-常见数据结构时间复杂度" aria-hidden="true">#</a> 1. 常见数据结构时间复杂度</h3>
<p><img src="https://gaoqisen.github.io/GraphBed/202212/20221211201518.png" alt="数据结构时间复杂度"></p>
<h3 id="_2-常见数据结构" tabindex="-1"><a class="header-anchor" href="#_2-常见数据结构" aria-hidden="true">#</a> 2. 常见数据结构</h3>
<table>
<thead>
<tr>
<th>名称</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td>数组 array</td>
<td>[]</td>
</tr>
<tr>
<td>队列 queue</td>
<td>先进先出</td>
</tr>
<tr>
<td>hash散列</td>
<td></td>
</tr>
<tr>
<td>链表 link</td>
<td>前后节点关联</td>
</tr>
<tr>
<td>栈 stack</td>
<td>先进后出</td>
</tr>
<tr>
<td>树 tree</td>
<td></td>
</tr>
<tr>
<td>推 heap</td>
<td></td>
</tr>
<tr>
<td>图 graph</td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="_3-常见tree" tabindex="-1"><a class="header-anchor" href="#_3-常见tree" aria-hidden="true">#</a> 3. 常见Tree</h3>
<table>
<thead>
<tr>
<th>名称</th>
<th>解决什么问题</th>
<th>如何解决</th>
<th>缺点</th>
</tr>
</thead>
<tbody>
<tr>
<td>二叉树</td>
<td>解决链表深度问题</td>
<td>任意节点最多包含两个节点</td>
<td>可能出现斜树</td>
</tr>
<tr>
<td>平衡二叉树(AVL)</td>
<td>解决斜树</td>
<td>修改树平衡（左右树高度&lt;=1）,左旋/右旋</td>
<td>节点操作复杂，插入删除频繁不适合</td>
</tr>
<tr>
<td>红黑树</td>
<td>解决增删多问题</td>
<td>通过红黑节点处理</td>
<td>适合内存查询，不适合文件</td>
</tr>
<tr>
<td>B树</td>
<td>做文件系统的索引</td>
<td>多路存储，降低树的深度。</td>
<td>每个节点都有数据，磁盘io多</td>
</tr>
<tr>
<td>B+树</td>
<td>解决每个节点都有数据问题</td>
<td>叶子结点包含所有数据，双向链表</td>
<td></td>
</tr>
</tbody>
</table>
<h2 id="四、递归" tabindex="-1"><a class="header-anchor" href="#四、递归" aria-hidden="true">#</a> 四、递归</h2>
<ol>
<li>任何递归都可以用函数改为非递归</li>
<li>符合固定格式的递归</li>
</ol>
</div></template>


