<template><div><h2 id="一、介绍" tabindex="-1"><a class="header-anchor" href="#一、介绍" aria-hidden="true">#</a> 一、介绍</h2>
<p>一种遍历二叉树的方式，并且时间复杂度O(N)，额外空间复杂度O(1) 通过利用原树中大量空闲指针的方式，达到节省空间的目的</p>
<h2 id="二、遍历细节" tabindex="-1"><a class="header-anchor" href="#二、遍历细节" aria-hidden="true">#</a> 二、遍历细节</h2>
<p>假设来到当前节点cur，开始时cur来到头节点位置</p>
<p>1）如果cur没有左孩子，cur向右移动(cur = cur.right)</p>
<p>2）如果cur有左孩子，找到左子树上最右的节点mostRight：</p>
<ul>
<li>
<p>如果mostRight的右指针指向空，让其指向cur，	然后cur向左移动(cur = cur.left)</p>
</li>
<li>
<p>如果mostRight的右指针指向cur，让其指向null，	然后cur向右移动(cur = cur.right)</p>
</li>
</ul>
<p>3）cur为空时遍历停止</p>
<h2 id="三、代码" tabindex="-1"><a class="header-anchor" href="#三、代码" aria-hidden="true">#</a> 三、代码</h2>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>    <span class="token comment">// 省空间的二叉树遍历时间负责度O(n),空间复杂度O(1)</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">morris</span><span class="token punctuation">(</span><span class="token class-name">Node</span> node<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>node <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token class-name">Node</span> cur <span class="token operator">=</span> node<span class="token punctuation">,</span> mostRight <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token comment">// 遍历头节点，如果头节点为空则结束遍历</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>cur <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            mostRight <span class="token operator">=</span> cur<span class="token punctuation">.</span>left<span class="token punctuation">;</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>mostRight <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">// 右节点不为空并且右节点没有指向当前节点时（没有改过指针）则最右指针往右移动</span>
                <span class="token keyword">while</span> <span class="token punctuation">(</span>mostRight<span class="token punctuation">.</span>right <span class="token operator">!=</span><span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> mostRight<span class="token punctuation">.</span>right <span class="token operator">!=</span> cur<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    mostRight <span class="token operator">=</span> mostRight<span class="token punctuation">.</span>right<span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                <span class="token comment">// 如果右边等于空，则最右指向cur，cur往左移动</span>
                <span class="token keyword">if</span><span class="token punctuation">(</span>mostRight<span class="token punctuation">.</span>right <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    mostRight<span class="token punctuation">.</span>right <span class="token operator">=</span> cur<span class="token punctuation">;</span>
                    cur <span class="token operator">=</span> cur<span class="token punctuation">.</span>left<span class="token punctuation">;</span>
                    <span class="token keyword">continue</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                <span class="token comment">// 否则最右指向空</span>
                <span class="token keyword">else</span> <span class="token punctuation">{</span>
                    mostRight<span class="token punctuation">.</span>right <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
            <span class="token comment">// 没有左节点则往右移动</span>
            cur <span class="token operator">=</span> cur<span class="token punctuation">.</span>right<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>	
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="四、先、中、后序遍历" tabindex="-1"><a class="header-anchor" href="#四、先、中、后序遍历" aria-hidden="true">#</a> 四、先、中、后序遍历</h2>
<h3 id="_1、先序" tabindex="-1"><a class="header-anchor" href="#_1、先序" aria-hidden="true">#</a> 1、先序</h3>
<p>当前节点处理2次的节点，第一次处理时输出。 当前节点处理1次节点时直接输出就是先序遍历</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>        <span class="token comment">// morris先序遍历</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">morrisPre</span><span class="token punctuation">(</span><span class="token class-name">Node</span> node<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>node <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token class-name">Node</span> cur <span class="token operator">=</span> node<span class="token punctuation">,</span> mostRight <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token comment">// 遍历头节点，如果头节点为空则结束遍历</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>cur <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            mostRight <span class="token operator">=</span> cur<span class="token punctuation">.</span>left<span class="token punctuation">;</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>mostRight <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">// 右节点不为空并且右节点没有指向当前节点时（没有改过指针）则最右指针往右移动</span>
                <span class="token keyword">while</span> <span class="token punctuation">(</span>mostRight<span class="token punctuation">.</span>right <span class="token operator">!=</span><span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> mostRight<span class="token punctuation">.</span>right <span class="token operator">!=</span> cur<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    mostRight <span class="token operator">=</span> mostRight<span class="token punctuation">.</span>right<span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                <span class="token comment">// 如果右边等于空，则最右指向cur，cur往左移动</span>
                <span class="token keyword">if</span><span class="token punctuation">(</span>mostRight<span class="token punctuation">.</span>right <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token comment">// 有两次处理，第一次输出就是先序遍历</span>
                    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span>cur<span class="token punctuation">.</span>value <span class="token operator">+</span> <span class="token string">" "</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    mostRight<span class="token punctuation">.</span>right <span class="token operator">=</span> cur<span class="token punctuation">;</span>
                    cur <span class="token operator">=</span> cur<span class="token punctuation">.</span>left<span class="token punctuation">;</span>
                    <span class="token keyword">continue</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                <span class="token comment">// 否则最右指向空</span>
                <span class="token keyword">else</span> <span class="token punctuation">{</span>
                    mostRight<span class="token punctuation">.</span>right <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                <span class="token comment">// 只有一次此处输出就是先序遍历</span>
                <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span>cur<span class="token punctuation">.</span>value <span class="token operator">+</span> <span class="token string">" "</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token comment">// 没有左节点则往右移动</span>
            cur <span class="token operator">=</span> cur<span class="token punctuation">.</span>right<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2、中序" tabindex="-1"><a class="header-anchor" href="#_2、中序" aria-hidden="true">#</a> 2、中序</h3>
<p>当前节点处理2次的节点，第二次处理时输出。 当前节点处理1次节点时直接输出就是先序遍历</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token comment">// morris中序遍历</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">morrisIn</span><span class="token punctuation">(</span><span class="token class-name">Node</span> node<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>node <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token class-name">Node</span> cur <span class="token operator">=</span> node<span class="token punctuation">,</span> mostRight <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token comment">// 遍历头节点，如果头节点为空则结束遍历</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>cur <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            mostRight <span class="token operator">=</span> cur<span class="token punctuation">.</span>left<span class="token punctuation">;</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>mostRight <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">// 右节点不为空并且右节点没有指向当前节点时（没有改过指针）则最右指针往右移动</span>
                <span class="token keyword">while</span> <span class="token punctuation">(</span>mostRight<span class="token punctuation">.</span>right <span class="token operator">!=</span><span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> mostRight<span class="token punctuation">.</span>right <span class="token operator">!=</span> cur<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    mostRight <span class="token operator">=</span> mostRight<span class="token punctuation">.</span>right<span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                <span class="token comment">// 如果右边等于空，则最右指向cur，cur往左移动</span>
                <span class="token keyword">if</span><span class="token punctuation">(</span>mostRight<span class="token punctuation">.</span>right <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    mostRight<span class="token punctuation">.</span>right <span class="token operator">=</span> cur<span class="token punctuation">;</span>
                    cur <span class="token operator">=</span> cur<span class="token punctuation">.</span>left<span class="token punctuation">;</span>
                    <span class="token keyword">continue</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                <span class="token comment">// 否则最右指向空</span>
                <span class="token keyword">else</span> <span class="token punctuation">{</span>
                    mostRight<span class="token punctuation">.</span>right <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
            <span class="token comment">// 两次和一次的情况都在此处输出就是中序遍历</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span>cur<span class="token punctuation">.</span>value <span class="token operator">+</span> <span class="token string">" "</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token comment">// 没有左节点则往右移动</span>
            cur <span class="token operator">=</span> cur<span class="token punctuation">.</span>right<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3、后序" tabindex="-1"><a class="header-anchor" href="#_3、后序" aria-hidden="true">#</a> 3、后序</h3>
<p>递归是在第3次处理时打印，但是morris只处理了两次。</p>
<p>则只处理两次的时机的节点a才进行后序输出，输出时逆序输出左树的右边界。跑完后单独打印整个树的右边界</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>	    <span class="token comment">// morris后序遍历</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">morrisPos</span><span class="token punctuation">(</span><span class="token class-name">Node</span> node<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>node <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token class-name">Node</span> cur <span class="token operator">=</span> node<span class="token punctuation">,</span> mostRight <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token comment">// 遍历头节点，如果头节点为空则结束遍历</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>cur <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            mostRight <span class="token operator">=</span> cur<span class="token punctuation">.</span>left<span class="token punctuation">;</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>mostRight <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">// 右节点不为空并且右节点没有指向当前节点时（没有改过指针）则最右指针往右移动</span>
                <span class="token keyword">while</span> <span class="token punctuation">(</span>mostRight<span class="token punctuation">.</span>right <span class="token operator">!=</span><span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> mostRight<span class="token punctuation">.</span>right <span class="token operator">!=</span> cur<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    mostRight <span class="token operator">=</span> mostRight<span class="token punctuation">.</span>right<span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                <span class="token comment">// 如果右边等于空，则最右指向cur，cur往左移动</span>
                <span class="token keyword">if</span><span class="token punctuation">(</span>mostRight<span class="token punctuation">.</span>right <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    mostRight<span class="token punctuation">.</span>right <span class="token operator">=</span> cur<span class="token punctuation">;</span>
                    cur <span class="token operator">=</span> cur<span class="token punctuation">.</span>left<span class="token punctuation">;</span>
                    <span class="token keyword">continue</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                <span class="token comment">// 否则最右指向空</span>
                <span class="token keyword">else</span> <span class="token punctuation">{</span>
                    mostRight<span class="token punctuation">.</span>right <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
                    <span class="token comment">// 只有第二次输出是才打印左树的右边界</span>
                    <span class="token function">printEdge</span><span class="token punctuation">(</span>cur<span class="token punctuation">.</span>left<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
            <span class="token comment">// 没有左节点则往右移动</span>
            cur <span class="token operator">=</span> cur<span class="token punctuation">.</span>right<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// 最后打印整棵树的右边界</span>
        <span class="token function">printEdge</span><span class="token punctuation">(</span>node<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 打印右边界</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">printEdge</span><span class="token punctuation">(</span><span class="token class-name">Node</span> node<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Node</span> tail <span class="token operator">=</span> <span class="token function">reverseEdge</span><span class="token punctuation">(</span>node<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Node</span> cur <span class="token operator">=</span> tail<span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>cur <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span>cur<span class="token punctuation">.</span>value <span class="token operator">+</span> <span class="token string">" "</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            cur <span class="token operator">=</span> cur<span class="token punctuation">.</span>right<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token function">reverseEdge</span><span class="token punctuation">(</span>tail<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 逆序树</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Node</span> <span class="token function">reverseEdge</span><span class="token punctuation">(</span><span class="token class-name">Node</span> from<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Node</span> pre <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token class-name">Node</span> next <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>from <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            next <span class="token operator">=</span> from<span class="token punctuation">.</span>right<span class="token punctuation">;</span>
            from<span class="token punctuation">.</span>right <span class="token operator">=</span> pre<span class="token punctuation">;</span>
            pre <span class="token operator">=</span> from<span class="token punctuation">;</span>
            from <span class="token operator">=</span> next<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> pre<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="五、获取数最小深度" tabindex="-1"><a class="header-anchor" href="#五、获取数最小深度" aria-hidden="true">#</a> 五、获取数最小深度</h2>
<p>本题测试链接 : https://leetcode-cn.com/problems/minimum-depth-of-binary-tree/</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">TreeNode</span> <span class="token punctuation">{</span>
        <span class="token keyword">public</span> <span class="token keyword">int</span> val<span class="token punctuation">;</span>
        <span class="token keyword">public</span> <span class="token class-name">TreeNode</span> left<span class="token punctuation">;</span>
        <span class="token keyword">public</span> <span class="token class-name">TreeNode</span> right<span class="token punctuation">;</span>

        <span class="token keyword">public</span> <span class="token class-name">TreeNode</span><span class="token punctuation">(</span><span class="token keyword">int</span> x<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            val <span class="token operator">=</span> x<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 获取最小深度</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">minDepth</span><span class="token punctuation">(</span><span class="token class-name">TreeNode</span> head<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>head <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token class-name">TreeNode</span> cur <span class="token operator">=</span> head<span class="token punctuation">;</span>
        <span class="token class-name">TreeNode</span> mostRight <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> curLevel <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> minHeight <span class="token operator">=</span> <span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token constant">MAX_VALUE</span><span class="token punctuation">;</span>
        <span class="token comment">// 遍历头节点，如果头节点为空则结束遍历</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>cur <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            mostRight <span class="token operator">=</span> cur<span class="token punctuation">.</span>left<span class="token punctuation">;</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>mostRight <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">int</span> rightBoardSize <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
                <span class="token comment">// 右节点不为空并且右节点没有指向当前节点时（没有改过指针）则最右指针往右移动</span>
                <span class="token keyword">while</span> <span class="token punctuation">(</span>mostRight<span class="token punctuation">.</span>right <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> mostRight<span class="token punctuation">.</span>right <span class="token operator">!=</span> cur<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    rightBoardSize<span class="token operator">++</span><span class="token punctuation">;</span>
                    mostRight <span class="token operator">=</span> mostRight<span class="token punctuation">.</span>right<span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                <span class="token comment">// 第一次到达。 如果右边等于空，则最右指向cur，cur往左移动</span>
                <span class="token keyword">if</span><span class="token punctuation">(</span>mostRight<span class="token punctuation">.</span>right <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    curLevel<span class="token operator">++</span><span class="token punctuation">;</span>
                    mostRight<span class="token punctuation">.</span>right <span class="token operator">=</span> cur<span class="token punctuation">;</span>
                    cur <span class="token operator">=</span> cur<span class="token punctuation">.</span>left<span class="token punctuation">;</span>
                    <span class="token keyword">continue</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>

                <span class="token comment">// 第二次到达</span>
                <span class="token keyword">else</span> <span class="token punctuation">{</span>
                    <span class="token keyword">if</span><span class="token punctuation">(</span>mostRight<span class="token punctuation">.</span>left <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                        minHeight <span class="token operator">=</span> <span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">min</span><span class="token punctuation">(</span>minHeight<span class="token punctuation">,</span> curLevel<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                    <span class="token comment">// 第二次到达时减去之前的右边界层数</span>
                    curLevel <span class="token operator">-=</span> rightBoardSize<span class="token punctuation">;</span>
                    mostRight<span class="token punctuation">.</span>right <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                <span class="token comment">// 只有一次达到</span>
                curLevel<span class="token operator">++</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            cur <span class="token operator">=</span> cur<span class="token punctuation">.</span>right<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// 单独遍历左树的最右节点，计算右深度</span>
        <span class="token keyword">int</span> finalRight <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
        cur <span class="token operator">=</span> head<span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>cur<span class="token punctuation">.</span>right <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            finalRight<span class="token operator">++</span><span class="token punctuation">;</span>
            cur <span class="token operator">=</span> cur<span class="token punctuation">.</span>right<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// 获取最小的高度</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>cur<span class="token punctuation">.</span>left <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> cur<span class="token punctuation">.</span>right <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            minHeight <span class="token operator">=</span> <span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">min</span><span class="token punctuation">(</span>minHeight<span class="token punctuation">,</span> finalRight<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> minHeight<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


