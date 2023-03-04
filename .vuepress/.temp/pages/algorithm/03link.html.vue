<template><div><h2 id="一、快慢指针代码练习" tabindex="-1"><a class="header-anchor" href="#一、快慢指针代码练习" aria-hidden="true">#</a> 一、快慢指针代码练习</h2>
<p>求链表的中点值，慢指针步长是1，快指针的步长是2。快指针走完的时候，慢指针就是中点值。</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">FastSlowPointer</span><span class="token punctuation">{</span>

        <span class="token keyword">public</span> <span class="token class-name">Node</span> root<span class="token punctuation">;</span>
        <span class="token keyword">public</span> <span class="token class-name">Node</span> current<span class="token punctuation">;</span>

        <span class="token keyword">public</span> <span class="token class-name">FastSlowPointer</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>root <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Node</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>current <span class="token operator">=</span> root<span class="token punctuation">;</span>

        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">push</span><span class="token punctuation">(</span><span class="token class-name">Node</span> node<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>current<span class="token punctuation">.</span>next <span class="token operator">=</span> node<span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>current <span class="token operator">=</span> node<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// 1）输入链表头节点，奇数长度返回中点，偶数长度返回上中点</span>
        <span class="token keyword">public</span> <span class="token class-name">Node</span> <span class="token function">getMiddle1</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>root <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">||</span> <span class="token keyword">this</span><span class="token punctuation">.</span>root<span class="token punctuation">.</span>next <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">||</span> <span class="token keyword">this</span><span class="token punctuation">.</span>root<span class="token punctuation">.</span>next<span class="token punctuation">.</span>next <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token class-name">Node</span> fast <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>root<span class="token punctuation">.</span>next<span class="token punctuation">.</span>next<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
            <span class="token class-name">Node</span> slow <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>root<span class="token punctuation">.</span>next<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
            <span class="token keyword">while</span> <span class="token punctuation">(</span> fast<span class="token punctuation">.</span>next <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> fast<span class="token punctuation">.</span>next<span class="token punctuation">.</span>next <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                fast <span class="token operator">=</span> fast<span class="token punctuation">.</span>next<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
                slow <span class="token operator">=</span> slow<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">return</span> slow<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// 2）输入链表头节点，奇数长度返回中点，偶数长度返回下中点</span>
        <span class="token keyword">public</span> <span class="token class-name">Node</span> <span class="token function">getMiddle2</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>root <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">||</span> <span class="token keyword">this</span><span class="token punctuation">.</span>root<span class="token punctuation">.</span>next <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">||</span> <span class="token keyword">this</span><span class="token punctuation">.</span>root<span class="token punctuation">.</span>next<span class="token punctuation">.</span>next <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token class-name">Node</span> fast <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>root<span class="token punctuation">.</span>next<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
            <span class="token class-name">Node</span> slow <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>root<span class="token punctuation">.</span>next<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
            <span class="token keyword">while</span> <span class="token punctuation">(</span> fast<span class="token punctuation">.</span>next <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> fast<span class="token punctuation">.</span>next<span class="token punctuation">.</span>next <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                fast <span class="token operator">=</span> fast<span class="token punctuation">.</span>next<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
                slow <span class="token operator">=</span> slow<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">return</span> slow<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// 3) 输入链表头节点，奇数长度返回中点前一个，偶数长度返回上中点前一个</span>
        <span class="token keyword">public</span> <span class="token class-name">Node</span> <span class="token function">getMiddle3</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>root <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">||</span> <span class="token keyword">this</span><span class="token punctuation">.</span>root<span class="token punctuation">.</span>next <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">||</span> <span class="token keyword">this</span><span class="token punctuation">.</span>root<span class="token punctuation">.</span>next<span class="token punctuation">.</span>next <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token class-name">Node</span> fast <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>root<span class="token punctuation">.</span>next<span class="token punctuation">.</span>next<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
            <span class="token class-name">Node</span> slow <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>root<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
            <span class="token keyword">while</span> <span class="token punctuation">(</span> fast<span class="token punctuation">.</span>next <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> fast<span class="token punctuation">.</span>next<span class="token punctuation">.</span>next <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                fast <span class="token operator">=</span> fast<span class="token punctuation">.</span>next<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
                slow <span class="token operator">=</span> slow<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">return</span> slow<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// 4）输入链表头节点，奇数长度返回中点前一个，偶数长度返回下中点前一个</span>
        <span class="token keyword">public</span> <span class="token class-name">Node</span> <span class="token function">getMiddle4</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>root <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">||</span> <span class="token keyword">this</span><span class="token punctuation">.</span>root<span class="token punctuation">.</span>next <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">||</span> <span class="token keyword">this</span><span class="token punctuation">.</span>root<span class="token punctuation">.</span>next<span class="token punctuation">.</span>next <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token class-name">Node</span> fast <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>root<span class="token punctuation">.</span>next<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
            <span class="token class-name">Node</span> slow <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>root<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
            <span class="token keyword">while</span> <span class="token punctuation">(</span> fast<span class="token punctuation">.</span>next <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> fast<span class="token punctuation">.</span>next<span class="token punctuation">.</span>next <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                fast <span class="token operator">=</span> fast<span class="token punctuation">.</span>next<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
                slow <span class="token operator">=</span> slow<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">return</span> slow<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="二、给定链表判断是否为回文" tabindex="-1"><a class="header-anchor" href="#二、给定链表判断是否为回文" aria-hidden="true">#</a> 二、给定链表判断是否为回文</h2>
<h3 id="_1、利用栈额外空间复杂度为o-n" tabindex="-1"><a class="header-anchor" href="#_1、利用栈额外空间复杂度为o-n" aria-hidden="true">#</a> 1、利用栈额外空间复杂度为O(N)</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>    <span class="token comment">// 用栈实现回文，先将节点放入栈中。之后弹出值与节点数据进行比较</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">boolean</span> <span class="token function">isPalindromes</span><span class="token punctuation">(</span><span class="token class-name">Node</span> node<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Node</span> current <span class="token operator">=</span> node<span class="token punctuation">;</span>
        <span class="token class-name">Stack</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">></span></span> stack <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Stack</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>current <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            stack<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>current<span class="token punctuation">.</span>val<span class="token punctuation">)</span><span class="token punctuation">;</span>
            current <span class="token operator">=</span> current<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token class-name">Node</span> i <span class="token operator">=</span> node<span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>i <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>i<span class="token punctuation">.</span>val <span class="token operator">!=</span> stack<span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            i <span class="token operator">=</span> i<span class="token punctuation">.</span>next<span class="token punctuation">;</span>

        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2、利用栈额外空间复杂度为o-n-2" tabindex="-1"><a class="header-anchor" href="#_2、利用栈额外空间复杂度为o-n-2" aria-hidden="true">#</a> 2、利用栈额外空间复杂度为O(N/2)</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>
    <span class="token comment">// 利用快慢指针实现，空间复杂度小一半</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">boolean</span> <span class="token function">isPalindromes1</span><span class="token punctuation">(</span><span class="token class-name">Node</span> node<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 利用快慢指针获取节点的中间数，奇数获取中间值，偶数获取中下节点</span>
        <span class="token class-name">Node</span> fast <span class="token operator">=</span> node<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
        <span class="token class-name">Node</span> slow <span class="token operator">=</span> node<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>fast<span class="token punctuation">.</span>next <span class="token operator">!=</span><span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> fast<span class="token punctuation">.</span>next<span class="token punctuation">.</span>next <span class="token operator">!=</span><span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            fast <span class="token operator">=</span> fast<span class="token punctuation">.</span>next<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
            slow <span class="token operator">=</span> slow<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// 将中间值后面的元素放入栈中</span>
        <span class="token class-name">Stack</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">></span></span> stack <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Stack</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>slow <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            stack<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>slow<span class="token punctuation">.</span>val<span class="token punctuation">)</span><span class="token punctuation">;</span>
            slow <span class="token operator">=</span> slow<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// 对比栈里面抛出的元素和节点元素，不一样则不是回文</span>
        <span class="token class-name">Node</span> current <span class="token operator">=</span> node<span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token operator">!</span>stack<span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>current<span class="token punctuation">.</span>val <span class="token operator">!=</span> stack<span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            current <span class="token operator">=</span> current<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3、额外空间复杂度o-1" tabindex="-1"><a class="header-anchor" href="#_3、额外空间复杂度o-1" aria-hidden="true">#</a> 3、额外空间复杂度O(1)</h3>
<p>1、用快慢指针找到中点值</p>
<p>2、将中点值后面的值逆序</p>
<p>3、对比两边的值不相等则保存返回值</p>
<p>4、将之前的逆序值还原</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>    <span class="token comment">// 不用堆，直接找到中值后进行数字比较</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">boolean</span> <span class="token function">isPalindromes2</span><span class="token punctuation">(</span><span class="token class-name">Node</span> node<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Node</span> fast <span class="token operator">=</span> node<span class="token punctuation">;</span>
        <span class="token class-name">Node</span> slow <span class="token operator">=</span> node<span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>fast<span class="token punctuation">.</span>next <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> fast<span class="token punctuation">.</span>next<span class="token punctuation">.</span>next <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            fast <span class="token operator">=</span> fast<span class="token punctuation">.</span>next<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
            slow <span class="token operator">=</span> slow<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// 逆序后面的数据</span>
        <span class="token class-name">Node</span> newHead <span class="token operator">=</span> slow<span class="token punctuation">.</span>next<span class="token punctuation">;</span> <span class="token comment">// fast是中间数后面的值</span>
        slow<span class="token punctuation">.</span>next <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span> <span class="token comment">// 从中间切断</span>
        <span class="token class-name">Node</span> temp <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>newHead<span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            temp <span class="token operator">=</span> newHead<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
            newHead<span class="token punctuation">.</span>next <span class="token operator">=</span> slow<span class="token punctuation">;</span>
            slow <span class="token operator">=</span> newHead<span class="token punctuation">;</span>
            newHead <span class="token operator">=</span> temp<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        temp  <span class="token operator">=</span> node<span class="token punctuation">;</span>
        fast <span class="token operator">=</span> slow<span class="token punctuation">;</span>
        <span class="token keyword">boolean</span> res <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>temp <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> fast<span class="token operator">!=</span><span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>temp<span class="token punctuation">.</span>val <span class="token operator">!=</span> fast<span class="token punctuation">.</span>val<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                res <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
                <span class="token keyword">break</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            temp <span class="token operator">=</span> temp<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
            fast <span class="token operator">=</span> fast<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// 重新逆序还原</span>
        temp <span class="token operator">=</span> slow<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
        slow<span class="token punctuation">.</span>next <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>temp <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            fast <span class="token operator">=</span> temp<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
            temp<span class="token punctuation">.</span>next <span class="token operator">=</span> slow<span class="token punctuation">;</span>
            slow <span class="token operator">=</span> temp<span class="token punctuation">;</span>
            temp <span class="token operator">=</span> fast<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">return</span> res<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="三、将链表区分为左边小中间等右边大" tabindex="-1"><a class="header-anchor" href="#三、将链表区分为左边小中间等右边大" aria-hidden="true">#</a> 三、将链表区分为左边小中间等右边大</h2>
<h3 id="_1、思路" tabindex="-1"><a class="header-anchor" href="#_1、思路" aria-hidden="true">#</a> 1、思路</h3>
<ul>
<li>
<p>创建6个变量小于指定数的头和尾节点、等于指定数的头和尾节点、大于指定数的头和尾节点</p>
</li>
<li>
<p>遍历链表，将各个区域的节点用头尾进行串联</p>
</li>
<li>
<p>将小于指定数的尾节点指向等于指定数的头节点，等于指定数的尾节点指向大于指定数的头节点</p>
</li>
<li>
<p>边界值处理。</p>
</li>
</ul>
<h3 id="_2、代码" tabindex="-1"><a class="header-anchor" href="#_2、代码" aria-hidden="true">#</a> 2、代码</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>    <span class="token doc-comment comment">/**
     * 通过有限几个变量进行分区，额外空间复杂度低
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Node</span> <span class="token function">partition</span><span class="token punctuation">(</span><span class="token class-name">Node</span> node<span class="token punctuation">,</span> <span class="token keyword">int</span> pivot<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 1、定义小于区域的头和尾节点，等于区域的头和尾节点，大于区域的头和尾节点</span>
        <span class="token class-name">Node</span> smallHead <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">,</span> smallTail <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token class-name">Node</span> equalHead <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">,</span> equalTail <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token class-name">Node</span> bigHead <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">,</span> bigTail <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

        <span class="token comment">// 2、遍历所有节点，将小于、等于、大于的区域通过头尾节点串连</span>
        <span class="token class-name">Node</span> temp <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>node <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            temp <span class="token operator">=</span> node<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
            node<span class="token punctuation">.</span>next <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>val <span class="token operator">&lt;</span> pivot<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">if</span><span class="token punctuation">(</span>smallHead <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    smallHead <span class="token operator">=</span> node<span class="token punctuation">;</span>
                    smallTail <span class="token operator">=</span> node<span class="token punctuation">;</span>
                <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                    smallTail<span class="token punctuation">.</span>next <span class="token operator">=</span> node<span class="token punctuation">;</span>
                    smallTail <span class="token operator">=</span> node<span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>

            <span class="token keyword">if</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>val <span class="token operator">==</span> pivot<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">if</span><span class="token punctuation">(</span>equalHead <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    equalHead <span class="token operator">=</span> node<span class="token punctuation">;</span>
                    equalTail <span class="token operator">=</span> node<span class="token punctuation">;</span>
                <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                    equalTail<span class="token punctuation">.</span>next <span class="token operator">=</span> node<span class="token punctuation">;</span>
                    equalTail <span class="token operator">=</span> node<span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>

            <span class="token keyword">if</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>val <span class="token operator">></span> pivot<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">if</span><span class="token punctuation">(</span>bigHead <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    bigHead <span class="token operator">=</span> node<span class="token punctuation">;</span>
                    bigTail <span class="token operator">=</span> node<span class="token punctuation">;</span>
                <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                    bigTail<span class="token punctuation">.</span>next <span class="token operator">=</span> node<span class="token punctuation">;</span>
                    bigTail <span class="token operator">=</span> node<span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
            node <span class="token operator">=</span> temp<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// 3、将小于区域的尾节点连等于区域的头，等于区域的尾连大于区域的头</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>smallHead <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 小于区域存在值，则将小于区域的next指向等于区域的头</span>
            smallTail<span class="token punctuation">.</span>next <span class="token operator">=</span> equalHead<span class="token punctuation">;</span>
            <span class="token comment">// 等于区域有值则等于区域保持不变，否则等于区域的尾为小于区域的尾</span>
            equalTail <span class="token operator">=</span> equalTail <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">?</span> smallTail <span class="token operator">:</span> equalTail<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">if</span><span class="token punctuation">(</span>equalHead <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            equalTail<span class="token punctuation">.</span>next <span class="token operator">=</span> bigHead<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">if</span><span class="token punctuation">(</span>smallHead <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> smallHead<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>equalHead <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> equalHead<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">return</span> bigHead<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="四、复制存在指向任意节点的链表" tabindex="-1"><a class="header-anchor" href="#四、复制存在指向任意节点的链表" aria-hidden="true">#</a> 四、复制存在指向任意节点的链表</h2>
<p>可以利用hashmap实现，但是存在额外空间复杂度。如下代码：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Node</span> <span class="token function">copyWithHashMap</span><span class="token punctuation">(</span><span class="token class-name">Node</span> head<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 将新旧节点都放到map容器中</span>
        <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Node</span><span class="token punctuation">,</span> <span class="token class-name">Node</span><span class="token punctuation">></span></span> map <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Node</span> index <span class="token operator">=</span> head<span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>index <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            map<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>index<span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">Node</span><span class="token punctuation">(</span>index<span class="token punctuation">.</span>val<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            index <span class="token operator">=</span> index<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// 将容器中新节点的下一个和随机元素指向新节点的位置</span>
        index <span class="token operator">=</span> head<span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>index <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            map<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>index<span class="token punctuation">)</span><span class="token punctuation">.</span>next <span class="token operator">=</span> map<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>index<span class="token punctuation">.</span>next<span class="token punctuation">)</span><span class="token punctuation">;</span>
            map<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>index<span class="token punctuation">)</span><span class="token punctuation">.</span>random <span class="token operator">=</span> map<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>index<span class="token punctuation">.</span>random<span class="token punctuation">)</span><span class="token punctuation">;</span>

            index <span class="token operator">=</span> index<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">return</span> map<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>head<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最理想的方案就是利用有限几个变量指针实现如下：</p>
<h3 id="_1、思路-1" tabindex="-1"><a class="header-anchor" href="#_1、思路-1" aria-hidden="true">#</a> 1、思路</h3>
<ul>
<li>
<p>创建克隆节点并将当前节点的next指向克隆节点，克隆节点的next指向当前节点的next(用node的结构去构建)</p>
</li>
<li>
<p>每次遍历一对，克隆节点的random就是遍历节点random的next</p>
</li>
<li>
<p>将结构分离出来</p>
</li>
</ul>
<h3 id="_2、代码-1" tabindex="-1"><a class="header-anchor" href="#_2、代码-1" aria-hidden="true">#</a> 2、代码</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Node</span> <span class="token function">copyRandomNode</span><span class="token punctuation">(</span><span class="token class-name">Node</span> head<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>head <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// 1、创建克隆节点并将当前节点的next指向克隆节点，克隆节点的next指向当前节点的next(用node的结构去构建)</span>
        <span class="token class-name">Node</span> current <span class="token operator">=</span> head<span class="token punctuation">,</span> next <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>current <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            next <span class="token operator">=</span> current<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
            <span class="token class-name">Node</span> node <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Node</span><span class="token punctuation">(</span>current<span class="token punctuation">.</span>val<span class="token punctuation">)</span><span class="token punctuation">;</span>
            node<span class="token punctuation">.</span>next <span class="token operator">=</span> next<span class="token punctuation">;</span>
            current<span class="token punctuation">.</span>next <span class="token operator">=</span> node<span class="token punctuation">;</span>
            current <span class="token operator">=</span> next<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// 2、每次遍历一对，克隆节点的random就是遍历节点random的next</span>
        current <span class="token operator">=</span> head<span class="token punctuation">;</span>
        <span class="token class-name">Node</span> copy <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>current <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            copy <span class="token operator">=</span> current<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
            copy<span class="token punctuation">.</span>random <span class="token operator">=</span> current<span class="token punctuation">.</span>random <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">?</span> <span class="token keyword">null</span> <span class="token operator">:</span> current<span class="token punctuation">.</span>random<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
            current <span class="token operator">=</span> current<span class="token punctuation">.</span>next<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// 3、将结构分离出来</span>
        <span class="token class-name">Node</span> res <span class="token operator">=</span> head<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
        current <span class="token operator">=</span> head<span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>current <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            next <span class="token operator">=</span> current<span class="token punctuation">.</span>next<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
            copy <span class="token operator">=</span> current<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
            copy<span class="token punctuation">.</span>next <span class="token operator">=</span> next <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">?</span> <span class="token keyword">null</span> <span class="token operator">:</span> next<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
            current<span class="token punctuation">.</span>next <span class="token operator">=</span> next<span class="token punctuation">;</span>
            current <span class="token operator">=</span> next<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> res<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="五、两个有环或无环列表获取相交节点" tabindex="-1"><a class="header-anchor" href="#五、两个有环或无环列表获取相交节点" aria-hidden="true">#</a> 五、两个有环或无环列表获取相交节点</h2>
<p>https://leetcode.cn/problems/3u1WK4/submissions/</p>
<h3 id="_1、思路-2" tabindex="-1"><a class="header-anchor" href="#_1、思路-2" aria-hidden="true">#</a> 1、思路</h3>
<ul>
<li>给定一个单链表，如果无环则返回null(无环则一定会走到null)，有环则返回第一个入环节点。得到loop1和loop2
<ul>
<li>用容器：用hashSet获取闭合处节点，遍历链表，如果在hashSet里面存在则返回节点，不存在则返回null</li>
<li>不用容器：利用快慢指针（快2慢1），快指针如果走到null则是无环直接返回null，如果有环则快指针和慢指针会相遇。相遇后快指针返回头节点后两个指针步长都为1。之后的相遇节点就是入环节点。</li>
</ul>
</li>
<li>分情况处理两个环的入环节点
<ul>
<li>loop1和loop2都为空，则两个无环链表相交
<ul>
<li>用容器：利用hashSet将第一个环存入，之后用第二环判断元素存在返回存在的元素节点，不存在则返回null</li>
<li>不用容器：遍历两个链表如果最后一个节点的地址相同则相交。长的链表先走两个节点的长度差后在判断两个节点地址是否相同，第一个相等的节点就是相交节点。</li>
</ul>
</li>
<li>两个链表其中一个有环，不可能相交</li>
<li>两个链表都有环
<ul>
<li><img src="https://gaoqisen.github.io/GraphBed/202301/20230127183904.png" alt=""></li>
<li>loop1和loop2的地址相等，就是两个无环链表求第一个相交节点</li>
<li>loop1和loop2的地址不相等，遍历链表一如果在链表中没遇到loop2则无相交节点，遇到loop2则存在相交节点返回loop1或loop2都可以。</li>
</ul>
</li>
</ul>
</li>
</ul>
<h3 id="_2、实现" tabindex="-1"><a class="header-anchor" href="#_2、实现" aria-hidden="true">#</a> 2、实现</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * Definition for singly-linked list.
 * public class ListNode <span class="token punctuation">{</span>
 *     int val;
 *     ListNode next;
 *     ListNode(int x) <span class="token punctuation">{</span>
 *         val = x;
 *         next = null;
 *     <span class="token punctuation">}</span>
 * <span class="token punctuation">}</span>
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Solution</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">ListNode</span> <span class="token function">getIntersectionNode</span><span class="token punctuation">(</span><span class="token class-name">ListNode</span> listNode1<span class="token punctuation">,</span> <span class="token class-name">ListNode</span> listNode2<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>listNode1 <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">||</span> listNode2 <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token class-name">ListNode</span> loop1 <span class="token operator">=</span> <span class="token function">findFirstInputLoopNode</span><span class="token punctuation">(</span>listNode1<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">ListNode</span> loop2 <span class="token operator">=</span> <span class="token function">findFirstInputLoopNode</span><span class="token punctuation">(</span>listNode2<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 两个无环链表相交</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>loop1 <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> loop2 <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token function">notLoopNodeIntersect</span><span class="token punctuation">(</span>listNode1<span class="token punctuation">,</span> listNode2<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// 两个链表都有环</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>loop1 <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> loop2 <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token function">loopNodeIntersect</span><span class="token punctuation">(</span>listNode1<span class="token punctuation">,</span> loop1<span class="token punctuation">,</span> listNode2<span class="token punctuation">,</span> loop2<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// 两个链表其中一个有环，不可能相交</span>
        <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 两个有环单链表
     * - loop1和loop2的地址相等，就是两个无环链表求第一个相交节点
     * - loop1和loop2的地址不相等，遍历链表一如果在链表中没遇到loop2则无相交节点，遇到loop2则存在相交节点返回loop1或loop2都可以。
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">ListNode</span> <span class="token function">loopNodeIntersect</span><span class="token punctuation">(</span><span class="token class-name">ListNode</span> listNodeOne<span class="token punctuation">,</span> <span class="token class-name">ListNode</span> loopOne<span class="token punctuation">,</span> <span class="token class-name">ListNode</span> listNodeTwo<span class="token punctuation">,</span> <span class="token class-name">ListNode</span> loopTwo<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">ListNode</span> currentOne <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token class-name">ListNode</span> currentTwo <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>loopOne <span class="token operator">==</span> loopTwo<span class="token punctuation">)</span><span class="token punctuation">{</span>
            currentOne <span class="token operator">=</span> listNodeOne<span class="token punctuation">;</span>
            currentTwo <span class="token operator">=</span> listNodeTwo<span class="token punctuation">;</span>
            <span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
            <span class="token keyword">while</span> <span class="token punctuation">(</span>currentOne <span class="token operator">!=</span> loopOne<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                currentOne <span class="token operator">=</span> currentOne<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
                i<span class="token operator">++</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>

            <span class="token keyword">while</span> <span class="token punctuation">(</span>currentTwo <span class="token operator">!=</span> loopTwo<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                currentTwo <span class="token operator">=</span> currentTwo<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
                i<span class="token operator">--</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>

            <span class="token comment">// 将长的赋值给lastNodeOne, 短的赋值给lastNodeTwo</span>
            currentOne <span class="token operator">=</span> i <span class="token operator">></span> <span class="token number">0</span> <span class="token operator">?</span> listNodeOne <span class="token operator">:</span> listNodeTwo<span class="token punctuation">;</span>
            currentTwo <span class="token operator">=</span> currentOne <span class="token operator">==</span> listNodeOne <span class="token operator">?</span> listNodeTwo <span class="token operator">:</span> listNodeOne<span class="token punctuation">;</span>

            i <span class="token operator">=</span> <span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">abs</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">while</span> <span class="token punctuation">(</span>i <span class="token operator">!=</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                currentOne <span class="token operator">=</span> currentOne<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
                i<span class="token operator">--</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">while</span> <span class="token punctuation">(</span>currentOne <span class="token operator">!=</span> currentTwo<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                currentOne <span class="token operator">=</span> currentOne<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
                currentTwo <span class="token operator">=</span> currentTwo<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">return</span> currentOne<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// loop1和loop2的地址不相等，遍历链表一如果在链表中没遇到loop2则无相交节点，遇到loop2则存在相交节点返回loop1或loop2都可以。</span>
        <span class="token keyword">else</span> <span class="token punctuation">{</span>
            currentOne <span class="token operator">=</span> listNodeOne<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
            <span class="token keyword">while</span> <span class="token punctuation">(</span>currentOne <span class="token operator">!=</span> loopOne<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">if</span><span class="token punctuation">(</span>currentOne <span class="token operator">==</span> loopTwo<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token keyword">return</span> loopTwo<span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                currentOne <span class="token operator">=</span> currentOne<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>


    <span class="token doc-comment comment">/**
     * 两个无环单链表
     *
     * 遍历两个链表如果最后一个节点的地址相同则相交。
     * 长的链表先走 两个节点的长度差 后在判断两个节点地址是否相同，第一个相等的节点就是相交节点。
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">ListNode</span> <span class="token function">notLoopNodeIntersect</span><span class="token punctuation">(</span><span class="token class-name">ListNode</span> listNodeOne<span class="token punctuation">,</span> <span class="token class-name">ListNode</span> listNodeTwo<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">ListNode</span> lastListNodeOne <span class="token operator">=</span> listNodeOne<span class="token punctuation">;</span>
        <span class="token keyword">int</span> nodeLength <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>lastListNodeOne<span class="token punctuation">.</span>next <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            lastListNodeOne <span class="token operator">=</span> lastListNodeOne<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
            nodeLength<span class="token operator">++</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token class-name">ListNode</span> lastListNodeTwo <span class="token operator">=</span> listNodeTwo<span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>lastListNodeTwo<span class="token punctuation">.</span>next <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            lastListNodeTwo <span class="token operator">=</span> lastListNodeTwo<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
            nodeLength<span class="token operator">--</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// 最后一个节点的地址不相同则不会相交</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>lastListNodeOne <span class="token operator">!=</span> lastListNodeTwo<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// 将长的赋值给lastNodeOne, 短的赋值给lastNodeTwo</span>
        lastListNodeOne <span class="token operator">=</span> nodeLength <span class="token operator">></span> <span class="token number">0</span> <span class="token operator">?</span> listNodeOne <span class="token operator">:</span> listNodeTwo<span class="token punctuation">;</span>
        lastListNodeTwo <span class="token operator">=</span> lastListNodeOne <span class="token operator">==</span> listNodeOne <span class="token operator">?</span> listNodeTwo <span class="token operator">:</span> listNodeOne<span class="token punctuation">;</span>

        <span class="token comment">// 长的节点先走掉差值</span>
        <span class="token keyword">int</span> abs <span class="token operator">=</span> <span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">abs</span><span class="token punctuation">(</span>nodeLength<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>abs <span class="token operator">!=</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            lastListNodeOne <span class="token operator">=</span> lastListNodeOne<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
            abs<span class="token operator">--</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// 走到相等为止</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>lastListNodeOne <span class="token operator">!=</span> lastListNodeTwo<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            lastListNodeOne <span class="token operator">=</span> lastListNodeOne<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
            lastListNodeTwo <span class="token operator">=</span> lastListNodeTwo<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> lastListNodeOne<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 获取第一个入环节点，没有入环节点则返回null
     *
     * 实现方式：利用快慢指针(快2慢1)，走到相交节点时快指针回到头，之后快指针步长改为1，
     * 重新相遇后的第一个节点就是入环的第一个的节点，快指针遇到null则链表节点无入环节点
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">ListNode</span> <span class="token function">findFirstInputLoopNode</span><span class="token punctuation">(</span><span class="token class-name">ListNode</span> head<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>head <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">||</span> head<span class="token punctuation">.</span>next <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">||</span> head<span class="token punctuation">.</span>next<span class="token punctuation">.</span>next <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token class-name">ListNode</span> fast <span class="token operator">=</span> head<span class="token punctuation">.</span>next<span class="token punctuation">.</span>next<span class="token punctuation">,</span> slow <span class="token operator">=</span> head<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
        <span class="token keyword">boolean</span> isIntersect <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">,</span> firstHead <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>fast <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>fast <span class="token operator">==</span> slow<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">// 第二次相遇的节点直接返回</span>
                <span class="token keyword">if</span><span class="token punctuation">(</span>isIntersect<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token keyword">return</span> slow<span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                isIntersect <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            slow <span class="token operator">=</span> slow<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>fast<span class="token punctuation">.</span>next <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>isIntersect<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">if</span><span class="token punctuation">(</span>firstHead<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    firstHead <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
                    fast <span class="token operator">=</span> head<span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                fast <span class="token operator">=</span> fast<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                fast <span class="token operator">=</span> fast<span class="token punctuation">.</span>next<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="六、单链表删除节点" tabindex="-1"><a class="header-anchor" href="#六、单链表删除节点" aria-hidden="true">#</a> 六、单链表删除节点</h2>
<p>思路：遇到当前节点是删除节点时，将当前节点置为下一个节点，并将当前节点的下一个节点置为下下一个节点。</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>    <span class="token doc-comment comment">/**
     * 1、删除节点返回必须是节点，可能删除的就是头节点
     * 2、只是给删除的节点，不给头节点。只能往后遍历，获取不到前面的节点。 无法删除最后一个节点
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Node</span> <span class="token function">level</span><span class="token punctuation">(</span><span class="token class-name">Node</span> node<span class="token punctuation">,</span> <span class="token class-name">Node</span> level<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>node <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">||</span> level <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> node<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token class-name">Node</span> current <span class="token operator">=</span> node<span class="token punctuation">;</span>
        <span class="token comment">// 只删除单链表无环</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>current <span class="token operator">==</span> level<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                current<span class="token punctuation">.</span>val <span class="token operator">=</span> current<span class="token punctuation">.</span>next<span class="token punctuation">.</span>val<span class="token punctuation">;</span>
                current<span class="token punctuation">.</span>next <span class="token operator">=</span>  current<span class="token punctuation">.</span>next<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
                <span class="token keyword">break</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span><span class="token punctuation">(</span>current<span class="token punctuation">.</span>next<span class="token punctuation">.</span>next <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                current<span class="token punctuation">.</span>next <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
                <span class="token keyword">break</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            current <span class="token operator">=</span> current<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> node<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


