<template><div><h2 id="一、链表递归实现先序、中序、后序" tabindex="-1"><a class="header-anchor" href="#一、链表递归实现先序、中序、后序" aria-hidden="true">#</a> 一、链表递归实现先序、中序、后序</h2>
<p><img src="https://gaoqisen.github.io/GraphBed/202301/20230128105146.png" alt=""></p>
<blockquote>
<p>遍历的先序中序后序是按照头节点在前面、中间、后面区分的。分别为：</p>
<p>先序：头、左、右，上图遍历顺序ABDECF</p>
<p>中序：左、头、右，上图遍历顺序DBEAFC</p>
<p>后序：左、右、头，上图遍历顺序DEBFCA</p>
</blockquote>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>	<span class="token comment">// 先序打印所有节点</span>
	<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">pre</span><span class="token punctuation">(</span><span class="token class-name">Node</span> head<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span>head <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token keyword">return</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>head<span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token function">pre</span><span class="token punctuation">(</span>head<span class="token punctuation">.</span>left<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token function">pre</span><span class="token punctuation">(</span>head<span class="token punctuation">.</span>right<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">in</span><span class="token punctuation">(</span><span class="token class-name">Node</span> head<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span>head <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token keyword">return</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
		<span class="token function">in</span><span class="token punctuation">(</span>head<span class="token punctuation">.</span>left<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>head<span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token function">in</span><span class="token punctuation">(</span>head<span class="token punctuation">.</span>right<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">pos</span><span class="token punctuation">(</span><span class="token class-name">Node</span> head<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span>head <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token keyword">return</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
		<span class="token function">pos</span><span class="token punctuation">(</span>head<span class="token punctuation">.</span>left<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token function">pos</span><span class="token punctuation">(</span>head<span class="token punctuation">.</span>right<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>head<span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="二、链表非递归实现先序、中序、后序" tabindex="-1"><a class="header-anchor" href="#二、链表非递归实现先序、中序、后序" aria-hidden="true">#</a> 二、链表非递归实现先序、中序、后序</h2>
<h3 id="先序" tabindex="-1"><a class="header-anchor" href="#先序" aria-hidden="true">#</a> 先序</h3>
<p>1、利用栈实现将头、右、左(元素不为空)依次push到栈中</p>
<p>2、循环弹出的值就是先序</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>    <span class="token comment">// 先序遍历打印</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">pre</span><span class="token punctuation">(</span><span class="token class-name">Node</span> node<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>node <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token class-name">Stack</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Node</span><span class="token punctuation">></span></span> stack <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Stack</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        stack<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>node<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token operator">!</span>stack<span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">Node</span> pop <span class="token operator">=</span> stack<span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span>pop<span class="token punctuation">.</span>val<span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token keyword">if</span><span class="token punctuation">(</span>pop<span class="token punctuation">.</span>right <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                stack<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>pop<span class="token punctuation">.</span>right<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>

            <span class="token keyword">if</span><span class="token punctuation">(</span>pop<span class="token punctuation">.</span>left <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                stack<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>pop<span class="token punctuation">.</span>left<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="中序" tabindex="-1"><a class="header-anchor" href="#中序" aria-hidden="true">#</a> 中序</h3>
<p>1、先将所有的左子节点入栈，到null为止</p>
<p>2、从栈中弹出节点，并将弹出节点的右子节点作为头重复步骤1. 弹出的节点就是中序</p>
<p>3、栈为空停止遍历</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>    <span class="token comment">// 中序遍历打印</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">in</span><span class="token punctuation">(</span><span class="token class-name">Node</span> node<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>node <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token class-name">Stack</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Node</span><span class="token punctuation">></span></span> stack <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Stack</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token operator">!</span>stack<span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">||</span> node <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>node <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                stack<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>node<span class="token punctuation">)</span><span class="token punctuation">;</span>
                node <span class="token operator">=</span> node<span class="token punctuation">.</span>left<span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                node <span class="token operator">=</span> stack<span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>val<span class="token punctuation">)</span><span class="token punctuation">;</span>
                node <span class="token operator">=</span> node<span class="token punctuation">.</span>right<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="后序" tabindex="-1"><a class="header-anchor" href="#后序" aria-hidden="true">#</a> 后序</h3>
<p>1、利用栈实现先左后右(元素不为空)的push到栈中</p>
<p>2、循环加入到另外一个栈中</p>
<p>3、循环弹出第二个栈的值就是后序</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>    <span class="token comment">// 后序遍历打印(和先序不同的就是先左在右，之后逆序输出即可)</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">pos</span><span class="token punctuation">(</span><span class="token class-name">Node</span> node<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>node <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token class-name">Stack</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Node</span><span class="token punctuation">></span></span> stack <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Stack</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Stack</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Node</span><span class="token punctuation">></span></span> pos <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Stack</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        stack<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>node<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token operator">!</span>stack<span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">Node</span> pop <span class="token operator">=</span> stack<span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            pos<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>pop<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>pop<span class="token punctuation">.</span>left <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                stack<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>pop<span class="token punctuation">.</span>left<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>pop<span class="token punctuation">.</span>right <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                stack<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>pop<span class="token punctuation">.</span>right<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token operator">!</span>pos<span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">Node</span> pop <span class="token operator">=</span> pos<span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span>pop<span class="token punctuation">.</span>val<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>不用两个栈的方式实现后序，极客写法</p>
<h2 id="三、二叉树按层遍历" tabindex="-1"><a class="header-anchor" href="#三、二叉树按层遍历" aria-hidden="true">#</a> 三、二叉树按层遍历</h2>
<p><img src="https://gaoqisen.github.io/GraphBed/202301/20230128105146.png" alt=""></p>
<blockquote>
<p>按层遍历后: ABCDEF</p>
</blockquote>
<p>1、利用队列(先进先出)，将二叉树数据add到队列中，并遍历队列到队列为空为止</p>
<p>2、二叉树的左边存在数据就先放左边的值</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>    <span class="token comment">// 按层遍历</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">level</span><span class="token punctuation">(</span><span class="token class-name">Node</span> node<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>node <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token class-name">Queue</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Node</span><span class="token punctuation">></span></span> queue <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LinkedList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        queue<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>node<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token operator">!</span>queue<span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 弹出队列里面的值打印</span>
            <span class="token class-name">Node</span> poll <span class="token operator">=</span> queue<span class="token punctuation">.</span><span class="token function">poll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span>poll<span class="token punctuation">.</span>val<span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token comment">// 队列里面的存在left｜right则放入队列中</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>poll<span class="token punctuation">.</span>left <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                queue<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>poll<span class="token punctuation">.</span>left<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>

            <span class="token keyword">if</span><span class="token punctuation">(</span>poll<span class="token punctuation">.</span>right <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                queue<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>poll<span class="token punctuation">.</span>right<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="四、二叉树的序列化和反序列化" tabindex="-1"><a class="header-anchor" href="#四、二叉树的序列化和反序列化" aria-hidden="true">#</a> 四、二叉树的序列化和反序列化</h2>
<p>将二叉树按照节点转换成字符串，不忽视空节点。以及通过字符串转换成二叉树。</p>
<h3 id="先序序列" tabindex="-1"><a class="header-anchor" href="#先序序列" aria-hidden="true">#</a> 先序序列</h3>
<p>利用先序遍历的方式序列化</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>    <span class="token comment">// 先序序列化</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Queue</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">></span></span> <span class="token function">preSerialize</span><span class="token punctuation">(</span><span class="token class-name">Node</span> node<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>node <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token class-name">Queue</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">></span></span> queue <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LinkedList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">pre</span><span class="token punctuation">(</span>node<span class="token punctuation">,</span> queue<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> queue<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">pre</span><span class="token punctuation">(</span><span class="token class-name">Node</span> node<span class="token punctuation">,</span> <span class="token class-name">Queue</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">></span></span> queue<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>node <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            queue<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        queue<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>val<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">pre</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>left<span class="token punctuation">,</span> queue<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">pre</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>right<span class="token punctuation">,</span> queue<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 先序反序列化</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Node</span> <span class="token function">preUnSerialize</span><span class="token punctuation">(</span><span class="token class-name">Queue</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">></span></span> queue<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>queue <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">||</span> queue<span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token function">pre</span><span class="token punctuation">(</span>queue<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">Node</span> <span class="token function">pre</span><span class="token punctuation">(</span><span class="token class-name">Queue</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">></span></span> queue<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> poll <span class="token operator">=</span> queue<span class="token punctuation">.</span><span class="token function">poll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>poll <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token class-name">Node</span> node <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Node</span><span class="token punctuation">(</span>poll<span class="token punctuation">)</span><span class="token punctuation">;</span>
        node<span class="token punctuation">.</span>left <span class="token operator">=</span> <span class="token function">pre</span><span class="token punctuation">(</span>queue<span class="token punctuation">)</span><span class="token punctuation">;</span>
        node<span class="token punctuation">.</span>right <span class="token operator">=</span> <span class="token function">pre</span><span class="token punctuation">(</span>queue<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> node<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="后序序列" tabindex="-1"><a class="header-anchor" href="#后序序列" aria-hidden="true">#</a> 后序序列</h3>
<p>利用后序遍历的方式序列化</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>    <span class="token comment">// 后序序列化</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Queue</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">></span></span> <span class="token function">posSerialize</span><span class="token punctuation">(</span><span class="token class-name">Node</span> node<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>node <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token class-name">Queue</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">></span></span> queue <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LinkedList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">pos</span><span class="token punctuation">(</span>node<span class="token punctuation">,</span> queue<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> queue<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">pos</span><span class="token punctuation">(</span><span class="token class-name">Node</span> node<span class="token punctuation">,</span> <span class="token class-name">Queue</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">></span></span> queue<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>node <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            queue<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token function">pos</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>left<span class="token punctuation">,</span> queue<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">pos</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>right<span class="token punctuation">,</span> queue<span class="token punctuation">)</span><span class="token punctuation">;</span>
        queue<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>val<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 后序反序列化</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Node</span> <span class="token function">posUnSerialize</span><span class="token punctuation">(</span><span class="token class-name">Queue</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">></span></span> queue<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>queue <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">||</span> queue<span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token class-name">Stack</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">></span></span> stack <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Stack</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token operator">!</span>queue<span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            stack<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>queue<span class="token punctuation">.</span><span class="token function">poll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token function">pos</span><span class="token punctuation">(</span>stack<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Node</span> <span class="token function">pos</span><span class="token punctuation">(</span><span class="token class-name">Stack</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">></span></span> stack<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> pop <span class="token operator">=</span> stack<span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>pop <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token class-name">Node</span> node <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Node</span><span class="token punctuation">(</span>pop<span class="token punctuation">)</span><span class="token punctuation">;</span>
        node<span class="token punctuation">.</span>right <span class="token operator">=</span> <span class="token function">pos</span><span class="token punctuation">(</span>stack<span class="token punctuation">)</span><span class="token punctuation">;</span>
        node<span class="token punctuation">.</span>left <span class="token operator">=</span> <span class="token function">pos</span><span class="token punctuation">(</span>stack<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> node<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="按层序列" tabindex="-1"><a class="header-anchor" href="#按层序列" aria-hidden="true">#</a> 按层序列</h3>
<p>利用按层遍历的方式序列化</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>    <span class="token comment">// 按层序列化</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Queue</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">></span></span> <span class="token function">levelSerialize</span><span class="token punctuation">(</span><span class="token class-name">Node</span> node<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Queue</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">></span></span> res <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LinkedList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>node <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            res<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> res<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token class-name">Queue</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Node</span><span class="token punctuation">></span></span> queue <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LinkedList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        queue<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>node<span class="token punctuation">)</span><span class="token punctuation">;</span>
        res<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>val<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token operator">!</span>queue<span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">Node</span> poll <span class="token operator">=</span> queue<span class="token punctuation">.</span><span class="token function">poll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>poll<span class="token punctuation">.</span>left <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                queue<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>poll<span class="token punctuation">.</span>left<span class="token punctuation">)</span><span class="token punctuation">;</span>
                res<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>poll<span class="token punctuation">.</span>left<span class="token punctuation">.</span>val<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                res<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>

            <span class="token keyword">if</span><span class="token punctuation">(</span>poll<span class="token punctuation">.</span>right <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                queue<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>poll<span class="token punctuation">.</span>right<span class="token punctuation">)</span><span class="token punctuation">;</span>
                res<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>poll<span class="token punctuation">.</span>right<span class="token punctuation">.</span>val<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                res<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> res<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 按层反序列化</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Node</span> <span class="token function">levelUnSerialize</span><span class="token punctuation">(</span><span class="token class-name">Queue</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">></span></span> queue<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>queue <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">||</span> queue<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&lt;</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token class-name">Node</span> head <span class="token operator">=</span> <span class="token function">generateNode</span><span class="token punctuation">(</span>queue<span class="token punctuation">.</span><span class="token function">poll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Queue</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Node</span><span class="token punctuation">></span></span> nodeQueue <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LinkedList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>head <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            nodeQueue<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>head<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token class-name">Node</span> node <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token operator">!</span>nodeQueue<span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            node <span class="token operator">=</span> nodeQueue<span class="token punctuation">.</span><span class="token function">poll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            node<span class="token punctuation">.</span>left <span class="token operator">=</span> <span class="token function">generateNode</span><span class="token punctuation">(</span>queue<span class="token punctuation">.</span><span class="token function">poll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            node<span class="token punctuation">.</span>right <span class="token operator">=</span> <span class="token function">generateNode</span><span class="token punctuation">(</span>queue<span class="token punctuation">.</span><span class="token function">poll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>left <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                nodeQueue<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>left<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>right <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                nodeQueue<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>right<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> node<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">Node</span> <span class="token function">generateNode</span><span class="token punctuation">(</span><span class="token class-name">String</span> val<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>val <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Node</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="五、多叉树和二叉树互转" tabindex="-1"><a class="header-anchor" href="#五、多叉树和二叉树互转" aria-hidden="true">#</a> 五、多叉树和二叉树互转</h2>
<p>leetcode 431题  https://leetcode.com/problems/encode-n-ary-tree-to-binary-tree</p>
<p>一颗多叉树转为二叉树(所有的子节点都放在二叉树的左树的右边界上面)，之后将二叉树转为之前的多叉树</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token comment">// 将多叉数转尾二叉树</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">TreeNode</span> <span class="token function">encode</span><span class="token punctuation">(</span><span class="token class-name">Node</span> node<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>node <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        
        <span class="token class-name">TreeNode</span> treeNode <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">TreeNode</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>val<span class="token punctuation">)</span><span class="token punctuation">;</span>
        treeNode<span class="token punctuation">.</span>left <span class="token operator">=</span> <span class="token function">en</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>children<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> treeNode<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">TreeNode</span> <span class="token function">en</span><span class="token punctuation">(</span><span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Node</span><span class="token punctuation">></span></span> nodes<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>nodes <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">||</span> nodes<span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token class-name">TreeNode</span> head <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">,</span> current <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Node</span> node <span class="token operator">:</span> nodes<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">TreeNode</span> treeNode <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">TreeNode</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>val<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// 记录头节点用于返回</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>head <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                head <span class="token operator">=</span> treeNode<span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                <span class="token comment">// 将多叉节点一直往右放</span>
                current<span class="token punctuation">.</span>right <span class="token operator">=</span> treeNode<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            current <span class="token operator">=</span> treeNode<span class="token punctuation">;</span>
            <span class="token comment">// 将子多节点放到左边</span>
            current<span class="token punctuation">.</span>left <span class="token operator">=</span> <span class="token function">en</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>children<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> head<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 将二叉树转为多叉树</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Node</span> <span class="token function">decode</span><span class="token punctuation">(</span><span class="token class-name">TreeNode</span> treeNode<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>treeNode <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Node</span><span class="token punctuation">(</span>treeNode<span class="token punctuation">.</span>val<span class="token punctuation">,</span> <span class="token function">de</span><span class="token punctuation">(</span>treeNode<span class="token punctuation">.</span>left<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Node</span><span class="token punctuation">></span></span> <span class="token function">de</span><span class="token punctuation">(</span><span class="token class-name">TreeNode</span> treeNode<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>treeNode <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Node</span><span class="token punctuation">></span></span> list <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>treeNode <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 创建节点，children就是所有的左子节点</span>
            <span class="token class-name">Node</span> current <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Node</span><span class="token punctuation">(</span>treeNode<span class="token punctuation">.</span>val<span class="token punctuation">,</span> <span class="token function">de</span><span class="token punctuation">(</span>treeNode<span class="token punctuation">.</span>left<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// 将所有的左节点放到list里面</span>
            list<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>current<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// 处理下一个节点</span>
            treeNode <span class="token operator">=</span> treeNode<span class="token punctuation">.</span>right<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> list<span class="token punctuation">;</span>
    <span class="token punctuation">}</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="六、设计一个打印整棵树的函数" tabindex="-1"><a class="header-anchor" href="#六、设计一个打印整棵树的函数" aria-hidden="true">#</a> 六、设计一个打印整棵树的函数</h2>
<p>跳过，可以自行实现</p>
<h2 id="七、求二叉树最宽的层有多少个节点" tabindex="-1"><a class="header-anchor" href="#七、求二叉树最宽的层有多少个节点" aria-hidden="true">#</a> 七、求二叉树最宽的层有多少个节点</h2>
<p>按层遍历时，记录当前层的结束节点currentEnd, 下一层结束节点nextEnd。</p>
<h3 id="使用map" tabindex="-1"><a class="header-anchor" href="#使用map" aria-hidden="true">#</a> 使用Map</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">maxWidthUseMap</span><span class="token punctuation">(</span><span class="token class-name">Node</span> head<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>head <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token class-name">Queue</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Node</span><span class="token punctuation">></span></span> queue <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LinkedList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        queue<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>head<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 记录所有节点的当前层数</span>
        <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Node</span><span class="token punctuation">,</span> <span class="token class-name">Integer</span><span class="token punctuation">></span></span> map <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        map<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>head<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> currentLevel <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> levelNumber <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> max <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token operator">!</span>queue<span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">Node</span> poll <span class="token operator">=</span> queue<span class="token punctuation">.</span><span class="token function">poll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// 获取当前节点的层数</span>
            <span class="token class-name">Integer</span> level <span class="token operator">=</span> map<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>poll<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>poll<span class="token punctuation">.</span>left <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                queue<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>poll<span class="token punctuation">.</span>left<span class="token punctuation">)</span><span class="token punctuation">;</span>
                map<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>poll<span class="token punctuation">.</span>left<span class="token punctuation">,</span> level <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>poll<span class="token punctuation">.</span>right <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                queue<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>poll<span class="token punctuation">.</span>right<span class="token punctuation">)</span><span class="token punctuation">;</span>
                map<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>poll<span class="token punctuation">.</span>right<span class="token punctuation">,</span> level <span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token comment">// 如果是同一个层级则增加当前层数数量</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>level <span class="token operator">==</span> currentLevel<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                levelNumber<span class="token operator">++</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span> 
            <span class="token comment">// 非同一个层级则遍历到了下一个层级，层级+1和获取最大层级数量</span>
            <span class="token keyword">else</span> <span class="token punctuation">{</span>
                currentLevel<span class="token operator">++</span><span class="token punctuation">;</span>
                max <span class="token operator">=</span> <span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">max</span><span class="token punctuation">(</span>max<span class="token punctuation">,</span> levelNumber<span class="token punctuation">)</span><span class="token punctuation">;</span>
                levelNumber <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">max</span><span class="token punctuation">(</span>levelNumber<span class="token punctuation">,</span> max<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="不使用map" tabindex="-1"><a class="header-anchor" href="#不使用map" aria-hidden="true">#</a> 不使用Map</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">maxWidth</span><span class="token punctuation">(</span><span class="token class-name">Node</span> node<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>node <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token class-name">Queue</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Node</span><span class="token punctuation">></span></span> queue <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LinkedList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        queue<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>node<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">int</span> max <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> currentLevelNumber <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>

        <span class="token class-name">Node</span> currentRight <span class="token operator">=</span> node<span class="token punctuation">;</span>
        <span class="token class-name">Node</span> nextRight <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token operator">!</span>queue<span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">Node</span> poll <span class="token operator">=</span> queue<span class="token punctuation">.</span><span class="token function">poll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// 将左右节点放入队列，并赋值最右边的节点</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>poll<span class="token punctuation">.</span>left <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                queue<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>poll<span class="token punctuation">.</span>left<span class="token punctuation">)</span><span class="token punctuation">;</span>
                nextRight <span class="token operator">=</span> poll<span class="token punctuation">.</span>left<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>

            <span class="token keyword">if</span><span class="token punctuation">(</span>poll<span class="token punctuation">.</span>right <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                queue<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>poll<span class="token punctuation">.</span>right<span class="token punctuation">)</span><span class="token punctuation">;</span>
                nextRight <span class="token operator">=</span> poll<span class="token punctuation">.</span>right<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            currentLevelNumber<span class="token operator">++</span><span class="token punctuation">;</span>
            <span class="token comment">// 如果弹出的节点是下一个节点的最右节点，则初始化数据后进行下一层数量统计</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>poll <span class="token operator">==</span> currentRight<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                max <span class="token operator">=</span> <span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">max</span><span class="token punctuation">(</span>max<span class="token punctuation">,</span> currentLevelNumber<span class="token punctuation">)</span><span class="token punctuation">;</span>
                currentLevelNumber <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
                currentRight <span class="token operator">=</span> nextRight<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>

        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> max<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="八、找到节点的后继节点" tabindex="-1"><a class="header-anchor" href="#八、找到节点的后继节点" aria-hidden="true">#</a> 八、找到节点的后继节点</h2>
<p>在中序遍历中，当前节点x的下一个节点就是后继节点</p>
<p>1、如果x存在右节点，那么x的后继节点就是右节点的最左节点。（右树上的最左）</p>
<p>2、如果x不存在右节点，则x不断往上找父节点，直到找到存在左孩子，则左孩子就是x的后继节点。（当前节点是父节点的左孩子）</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Node</span> <span class="token function">getSuccessorNode</span><span class="token punctuation">(</span><span class="token class-name">Node</span> node<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>node <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> node<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">if</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>right <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">Node</span> right <span class="token operator">=</span> node<span class="token punctuation">.</span>right<span class="token punctuation">;</span>
            <span class="token keyword">while</span> <span class="token punctuation">(</span>right<span class="token punctuation">.</span>left <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                right <span class="token operator">=</span> right<span class="token punctuation">.</span>left<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">return</span> right<span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token class-name">Node</span> parent <span class="token operator">=</span> node<span class="token punctuation">.</span>parent<span class="token punctuation">;</span>
            <span class="token comment">// 当前节点是其父节点的右孩子</span>
            <span class="token keyword">while</span> <span class="token punctuation">(</span>parent <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> parent<span class="token punctuation">.</span>right <span class="token operator">==</span> node<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                node <span class="token operator">=</span> parent<span class="token punctuation">;</span>
                parent <span class="token operator">=</span> parent<span class="token punctuation">.</span>parent<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">return</span> parent<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="九、二叉树折纸问题" tabindex="-1"><a class="header-anchor" href="#九、二叉树折纸问题" aria-hidden="true">#</a> 九、二叉树折纸问题</h2>
<p><img src="https://gaoqisen.github.io/GraphBed/202302/20230208234220.png" alt="折纸"></p>
<p>1、头节点是凹的</p>
<p>2、所有左节点是凹，右节点是凸</p>
<p>3、打印按照层数打印就是中序遍历</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">paperFolding</span><span class="token punctuation">(</span><span class="token keyword">int</span> n<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">process</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> n<span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * true: down
     * false：up
     * i: 当前层数
     * n：所有层数
     * 中序遍历整棵树
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">process</span><span class="token punctuation">(</span><span class="token keyword">int</span> i<span class="token punctuation">,</span> <span class="token keyword">int</span> n<span class="token punctuation">,</span> <span class="token keyword">boolean</span> down<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>i <span class="token operator">></span> n<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token function">process</span><span class="token punctuation">(</span>i <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">,</span> n<span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>down <span class="token operator">?</span> <span class="token string">"down"</span> <span class="token operator">:</span> <span class="token string">"up"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">process</span><span class="token punctuation">(</span>i <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">,</span> n<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="九、判断是否为完全二叉树" tabindex="-1"><a class="header-anchor" href="#九、判断是否为完全二叉树" aria-hidden="true">#</a> 九、判断是否为完全二叉树</h2>
<p>1、按层遍历，有右无左则返回false。</p>
<p>2、当第一次遇到没有左右子节点时，剩余节点也必须没有左右子节点</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>		<span class="token doc-comment comment">/**
     * 判断是否为满二叉树，非递归版
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">boolean</span> <span class="token function">isFull</span><span class="token punctuation">(</span><span class="token class-name">Node</span> node<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>node <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token class-name">Queue</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Node</span><span class="token punctuation">></span></span> queue <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LinkedList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        queue<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>node<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">boolean</span> exist <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token operator">!</span>queue<span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">Node</span> poll <span class="token operator">=</span> queue<span class="token punctuation">.</span><span class="token function">poll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">Node</span> l <span class="token operator">=</span> poll<span class="token punctuation">.</span>left<span class="token punctuation">;</span>
            <span class="token class-name">Node</span> r <span class="token operator">=</span> poll<span class="token punctuation">.</span>right<span class="token punctuation">;</span>
            <span class="token comment">// 左孩子为空，右孩子不为空则不是</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>l <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> r <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>

            <span class="token comment">// 第二次遇到还有null的子节点</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>exist <span class="token operator">&amp;&amp;</span> <span class="token punctuation">(</span>l <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">||</span> r <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>

            <span class="token keyword">if</span><span class="token punctuation">(</span>l <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                queue<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>l<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>r <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                queue<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>r<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token comment">// 第一次遇到没有子节点</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>l <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">||</span> r <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                exist <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="十、判断是否为平衡树" tabindex="-1"><a class="header-anchor" href="#十、判断是否为平衡树" aria-hidden="true">#</a> 十、判断是否为平衡树</h2>
<h3 id="所有会出现的情况" tabindex="-1"><a class="header-anchor" href="#所有会出现的情况" aria-hidden="true">#</a> 所有会出现的情况</h3>
<p>1、每一颗子树的左右高度相差的绝对值不超过1</p>
<p>2、左树、右树都必须是平衡二叉树</p>
<h3 id="代码实现" tabindex="-1"><a class="header-anchor" href="#代码实现" aria-hidden="true">#</a> 代码实现</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>    <span class="token comment">// 判断是否为平衡二叉树</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">boolean</span> <span class="token function">isBalanced</span><span class="token punctuation">(</span><span class="token class-name">Node</span> node<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">process</span><span class="token punctuation">(</span>node<span class="token punctuation">)</span><span class="token punctuation">.</span>isBalanced<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Info</span> <span class="token function">process</span><span class="token punctuation">(</span><span class="token class-name">Node</span> node<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>node <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Info</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token class-name">Info</span> l <span class="token operator">=</span> <span class="token function">process</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>left<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Info</span> r <span class="token operator">=</span> <span class="token function">process</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>right<span class="token punctuation">)</span><span class="token punctuation">;</span>
        
        <span class="token comment">// 计算当前层数</span>
        <span class="token keyword">int</span> max <span class="token operator">=</span> <span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">max</span><span class="token punctuation">(</span>l<span class="token punctuation">.</span>height<span class="token punctuation">,</span> r<span class="token punctuation">.</span>height<span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>

        <span class="token comment">// 其中一个子节点不是平衡二叉树则当前数不是平衡二叉树</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>l<span class="token punctuation">.</span>isBalanced <span class="token operator">||</span> <span class="token operator">!</span>r<span class="token punctuation">.</span>isBalanced<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Info</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">,</span> max<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// 左右子节点高度相差超过1</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">abs</span><span class="token punctuation">(</span>l<span class="token punctuation">.</span>height <span class="token operator">-</span> r<span class="token punctuation">.</span>height<span class="token punctuation">)</span> <span class="token operator">></span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Info</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">,</span> max<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Info</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">,</span> max<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="十一、判断是否为搜索二叉树" tabindex="-1"><a class="header-anchor" href="#十一、判断是否为搜索二叉树" aria-hidden="true">#</a> 十一、判断是否为搜索二叉树</h2>
<h3 id="所有会出现的情况-1" tabindex="-1"><a class="header-anchor" href="#所有会出现的情况-1" aria-hidden="true">#</a> 所有会出现的情况</h3>
<p>1、头节点左子节点的值都比它小，右子节点的值都比它大</p>
<p>2、左树、右树都必须是搜索二叉树</p>
<p>3、经典二叉树没有重复值</p>
<h3 id="代码实现-1" tabindex="-1"><a class="header-anchor" href="#代码实现-1" aria-hidden="true">#</a> 代码实现</h3>
<p>方式一：将二叉树用中序遍历，之后判断是否为逆序即可</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">boolean</span> <span class="token function">isSearchIn</span><span class="token punctuation">(</span><span class="token class-name">Node</span> node<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>node <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Node</span><span class="token punctuation">></span></span> list <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LinkedList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 利用中序将数据放到list里面</span>
        <span class="token function">in</span><span class="token punctuation">(</span>node<span class="token punctuation">,</span> list<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> list<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 如果存在前面的数大于后面的数则非搜索树</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>list<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">.</span>value <span class="token operator">&lt;=</span> list<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>i <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">.</span>value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">in</span><span class="token punctuation">(</span><span class="token class-name">Node</span> node<span class="token punctuation">,</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Node</span><span class="token punctuation">></span></span> list<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>node <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token function">in</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>left<span class="token punctuation">,</span> list<span class="token punctuation">)</span><span class="token punctuation">;</span>
        list<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>node<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">in</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>right<span class="token punctuation">,</span> list<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>方式二：利用递归判断</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">boolean</span> <span class="token function">isSearch</span><span class="token punctuation">(</span><span class="token class-name">Node</span> node<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>node <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token function">process</span><span class="token punctuation">(</span>node<span class="token punctuation">)</span><span class="token punctuation">.</span>isSearch<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Info</span> <span class="token function">process</span><span class="token punctuation">(</span><span class="token class-name">Node</span> node<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>node <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token class-name">Info</span> l <span class="token operator">=</span> <span class="token function">process</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>left<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Info</span> r <span class="token operator">=</span> <span class="token function">process</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>right<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 获取左右孩子的最大最小值</span>
        <span class="token keyword">int</span> max <span class="token operator">=</span> node<span class="token punctuation">.</span>value<span class="token punctuation">;</span>
        <span class="token keyword">int</span> min <span class="token operator">=</span> node<span class="token punctuation">.</span>value<span class="token punctuation">;</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>l <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            max <span class="token operator">=</span> <span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">max</span><span class="token punctuation">(</span>max<span class="token punctuation">,</span> l<span class="token punctuation">.</span>max<span class="token punctuation">)</span><span class="token punctuation">;</span>
            min <span class="token operator">=</span> <span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">min</span><span class="token punctuation">(</span>min<span class="token punctuation">,</span> l<span class="token punctuation">.</span>min<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>r <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            max <span class="token operator">=</span> <span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">max</span><span class="token punctuation">(</span>max<span class="token punctuation">,</span> r<span class="token punctuation">.</span>max<span class="token punctuation">)</span><span class="token punctuation">;</span>
            min <span class="token operator">=</span> <span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">min</span><span class="token punctuation">(</span>min<span class="token punctuation">,</span> r<span class="token punctuation">.</span>min<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// 左右孩子其中一个非搜索</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token punctuation">(</span>l <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>l<span class="token punctuation">.</span>isSearch<span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token punctuation">(</span>r <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>r<span class="token punctuation">.</span>isSearch<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Info</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">,</span> max<span class="token punctuation">,</span> min<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// 左边的值大于等于当前值 或者 右边的值小于当前值</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token punctuation">(</span>l <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> l<span class="token punctuation">.</span>max <span class="token operator">>=</span> node<span class="token punctuation">.</span>value<span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token punctuation">(</span>r <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> r<span class="token punctuation">.</span>min <span class="token operator">&lt;=</span> node<span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Info</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">,</span> max<span class="token punctuation">,</span> min<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Info</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">,</span> max<span class="token punctuation">,</span> min<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">Info</span><span class="token punctuation">{</span>
        <span class="token keyword">public</span> <span class="token keyword">boolean</span> isSearch<span class="token punctuation">;</span>
        <span class="token keyword">public</span> <span class="token keyword">int</span> max<span class="token punctuation">;</span>
        <span class="token keyword">public</span> <span class="token keyword">int</span> min<span class="token punctuation">;</span>

        <span class="token keyword">public</span> <span class="token class-name">Info</span><span class="token punctuation">(</span><span class="token keyword">boolean</span> isSearch<span class="token punctuation">,</span> <span class="token keyword">int</span> max<span class="token punctuation">,</span> <span class="token keyword">int</span> min<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>isSearch <span class="token operator">=</span> isSearch<span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>max <span class="token operator">=</span> max<span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>min <span class="token operator">=</span> min<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="十二、返回整颗二叉树节点与节点间的最大距离" tabindex="-1"><a class="header-anchor" href="#十二、返回整颗二叉树节点与节点间的最大距离" aria-hidden="true">#</a> 十二、返回整颗二叉树节点与节点间的最大距离</h2>
<h3 id="所有会出现的情况-2" tabindex="-1"><a class="header-anchor" href="#所有会出现的情况-2" aria-hidden="true">#</a> 所有会出现的情况</h3>
<p>1、节点可能不经过头节点</p>
<ul>
<li>二叉树左树和右树的最大的距离</li>
</ul>
<p>2、会经过头节点的最大距离</p>
<ul>
<li>左树最远（左高）+右树最远（右高）+1</li>
</ul>
<h3 id="代码实现-2" tabindex="-1"><a class="header-anchor" href="#代码实现-2" aria-hidden="true">#</a> 代码实现</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">getMaxDistance</span><span class="token punctuation">(</span><span class="token class-name">Node</span> node<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>node <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token function">process</span><span class="token punctuation">(</span>node<span class="token punctuation">)</span><span class="token punctuation">.</span>maxDistance<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">Info</span> <span class="token function">process</span><span class="token punctuation">(</span><span class="token class-name">Node</span> node<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>node <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Info</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token class-name">Info</span> l <span class="token operator">=</span> <span class="token function">process</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>left<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Info</span> r <span class="token operator">=</span> <span class="token function">process</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>right<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 获取最孩子和右孩子的最大高度</span>
        <span class="token keyword">int</span> height <span class="token operator">=</span> <span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">max</span><span class="token punctuation">(</span>l<span class="token punctuation">.</span>height<span class="token punctuation">,</span> r<span class="token punctuation">.</span>height<span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token comment">// 最孩子的高度+右孩子的高度就是头节点最大距离</span>
        <span class="token keyword">int</span> headDistance <span class="token operator">=</span> l<span class="token punctuation">.</span>height <span class="token operator">+</span> r<span class="token punctuation">.</span>height <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token comment">// 头节点、左孩子最大距离、右孩子最大距离的最大距离</span>
        <span class="token keyword">int</span> maxDistance <span class="token operator">=</span> <span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">max</span><span class="token punctuation">(</span>l<span class="token punctuation">.</span>maxDistance<span class="token punctuation">,</span> <span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">max</span><span class="token punctuation">(</span>r<span class="token punctuation">.</span>maxDistance<span class="token punctuation">,</span> headDistance<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Info</span><span class="token punctuation">(</span>maxDistance<span class="token punctuation">,</span> height<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="十三、满二叉树" tabindex="-1"><a class="header-anchor" href="#十三、满二叉树" aria-hidden="true">#</a> 十三、满二叉树</h2>
<p>数的高度是h， 那2^h -1 = 节点数</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">boolean</span> <span class="token function">isFull</span><span class="token punctuation">(</span><span class="token class-name">Node</span> node<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>node <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token class-name">Info</span> info <span class="token operator">=</span> <span class="token function">process</span><span class="token punctuation">(</span>node<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token number">1</span> <span class="token operator">&lt;&lt;</span> info<span class="token punctuation">.</span>height<span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token number">1</span> <span class="token operator">==</span> info<span class="token punctuation">.</span>nodeSize<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>


    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">Info</span> <span class="token function">process</span><span class="token punctuation">(</span><span class="token class-name">Node</span> node<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>node <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Info</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token class-name">Info</span> l <span class="token operator">=</span> <span class="token function">process</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>left<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Info</span> r <span class="token operator">=</span> <span class="token function">process</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>right<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> height <span class="token operator">=</span> <span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">max</span><span class="token punctuation">(</span>l<span class="token punctuation">.</span>height<span class="token punctuation">,</span> r<span class="token punctuation">.</span>height<span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> nodes <span class="token operator">=</span> l<span class="token punctuation">.</span>nodeSize <span class="token operator">+</span> r<span class="token punctuation">.</span>nodeSize <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Info</span><span class="token punctuation">(</span>height<span class="token punctuation">,</span> nodes<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>


    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">Info</span><span class="token punctuation">{</span>

        <span class="token keyword">public</span> <span class="token keyword">int</span> height<span class="token punctuation">;</span>

        <span class="token keyword">public</span> <span class="token keyword">int</span> nodeSize<span class="token punctuation">;</span>

        <span class="token keyword">public</span> <span class="token class-name">Info</span><span class="token punctuation">(</span><span class="token keyword">int</span> h<span class="token punctuation">,</span> <span class="token keyword">int</span> n<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>height <span class="token operator">=</span> h<span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>nodeSize <span class="token operator">=</span> n<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
 
    <span class="token comment">// 第二种方法</span>
    <span class="token comment">// 收集子树是否是满二叉树</span>
    <span class="token comment">// 收集子树的高度</span>
    <span class="token comment">// 左树满 &amp;&amp; 右树满 &amp;&amp; 左右树高度一样 -> 整棵树是满的</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">Info2</span> <span class="token punctuation">{</span>
        <span class="token keyword">public</span> <span class="token keyword">boolean</span> isFull<span class="token punctuation">;</span>
        <span class="token keyword">public</span> <span class="token keyword">int</span> height<span class="token punctuation">;</span>

        <span class="token keyword">public</span> <span class="token class-name">Info2</span><span class="token punctuation">(</span><span class="token keyword">boolean</span> f<span class="token punctuation">,</span> <span class="token keyword">int</span> h<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            isFull <span class="token operator">=</span> f<span class="token punctuation">;</span>
            height <span class="token operator">=</span> h<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="十四、找到二叉树中最大的搜索二叉树" tabindex="-1"><a class="header-anchor" href="#十四、找到二叉树中最大的搜索二叉树" aria-hidden="true">#</a> 十四、找到二叉树中最大的搜索二叉树</h2>
<p>给定二叉树的子树是搜索二叉树的节点数最大值是多少，子二叉树必须是整棵树。</p>
<h3 id="所有会出现的情况-3" tabindex="-1"><a class="header-anchor" href="#所有会出现的情况-3" aria-hidden="true">#</a> 所有会出现的情况</h3>
<p>1、头节点不是搜索二叉树</p>
<ul>
<li>左树上的搜索二叉树的最多节点数</li>
<li>右树上的搜索二叉树的最多节点数</li>
</ul>
<p>2、头节点是搜索二叉树</p>
<ul>
<li>整个树的节点数</li>
</ul>
<h3 id="代码实现-3" tabindex="-1"><a class="header-anchor" href="#代码实现-3" aria-hidden="true">#</a> 代码实现</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">getLargestBSTSubtree</span><span class="token punctuation">(</span><span class="token class-name">TreeNode</span> node<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>node <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token function">process</span><span class="token punctuation">(</span>node<span class="token punctuation">)</span><span class="token punctuation">.</span>maxSubtreeSize<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Info</span> <span class="token function">process</span><span class="token punctuation">(</span><span class="token class-name">TreeNode</span> node<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>node <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token class-name">Info</span> l <span class="token operator">=</span> <span class="token function">process</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>left<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Info</span> r <span class="token operator">=</span> <span class="token function">process</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>right<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> allSize <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> max <span class="token operator">=</span> node<span class="token punctuation">.</span>val<span class="token punctuation">;</span>
        <span class="token keyword">int</span> min <span class="token operator">=</span> node<span class="token punctuation">.</span>val<span class="token punctuation">;</span>

        <span class="token comment">// 左节点不为空，则获取所有节点数量、最大值、最小值</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>l <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            allSize <span class="token operator">+=</span> l<span class="token punctuation">.</span>allSize<span class="token punctuation">;</span>
            max <span class="token operator">=</span> <span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">max</span><span class="token punctuation">(</span>max<span class="token punctuation">,</span> l<span class="token punctuation">.</span>max<span class="token punctuation">)</span><span class="token punctuation">;</span>
            min <span class="token operator">=</span> <span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">min</span><span class="token punctuation">(</span>min<span class="token punctuation">,</span> l<span class="token punctuation">.</span>min<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// 右节点不为空，则获取所有节点数量、最大值、最小值</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>r <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            allSize <span class="token operator">+=</span> r<span class="token punctuation">.</span>allSize<span class="token punctuation">;</span>
            max <span class="token operator">=</span> <span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">max</span><span class="token punctuation">(</span>max<span class="token punctuation">,</span> r<span class="token punctuation">.</span>max<span class="token punctuation">)</span><span class="token punctuation">;</span>
            min <span class="token operator">=</span> <span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">min</span><span class="token punctuation">(</span>min<span class="token punctuation">,</span> r<span class="token punctuation">.</span>min<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// 获取左节点是否为搜索树、左节点最大搜索树节点数</span>
        <span class="token keyword">int</span> p1 <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token keyword">boolean</span> leftBST <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>l <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            p1 <span class="token operator">=</span> l<span class="token punctuation">.</span>maxSubtreeSize<span class="token punctuation">;</span>
            leftBST <span class="token operator">=</span> l<span class="token punctuation">.</span>maxSubtreeSize <span class="token operator">==</span> l<span class="token punctuation">.</span>allSize<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// 获取右节点是否为搜索树、右节点最大搜索树节点数</span>
        <span class="token keyword">int</span> p2 <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token keyword">boolean</span> rightBST <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>r <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            p2 <span class="token operator">=</span> r<span class="token punctuation">.</span>maxSubtreeSize<span class="token punctuation">;</span>
            rightBST <span class="token operator">=</span> r<span class="token punctuation">.</span>maxSubtreeSize <span class="token operator">==</span> r<span class="token punctuation">.</span>allSize<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// 如果左右两边都是搜索树</span>
        <span class="token keyword">int</span> p3 <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>leftBST <span class="token operator">&amp;&amp;</span> rightBST<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">int</span> leftMax <span class="token operator">=</span> l <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">?</span> <span class="token number">0</span> <span class="token operator">:</span> l<span class="token punctuation">.</span>max<span class="token punctuation">;</span>
            <span class="token keyword">int</span> rightMin <span class="token operator">=</span> r <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">?</span> <span class="token number">0</span> <span class="token operator">:</span> r<span class="token punctuation">.</span>min<span class="token punctuation">;</span>
            <span class="token comment">// 如果整颗树都是搜索二叉树，则最大搜索树的节点树=左树节点树+右树节点树+1</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>leftMax <span class="token operator">&lt;</span> node<span class="token punctuation">.</span>val <span class="token operator">&amp;&amp;</span> rightMin <span class="token operator">></span> node<span class="token punctuation">.</span>val<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                p3 <span class="token operator">=</span><span class="token punctuation">(</span>r<span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">?</span> <span class="token number">0</span> <span class="token operator">:</span> r<span class="token punctuation">.</span>maxSubtreeSize<span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token punctuation">(</span>l <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">?</span> <span class="token number">0</span> <span class="token operator">:</span> l<span class="token punctuation">.</span>maxSubtreeSize<span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Info</span><span class="token punctuation">(</span><span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">max</span><span class="token punctuation">(</span>p1<span class="token punctuation">,</span> <span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">max</span><span class="token punctuation">(</span>p2<span class="token punctuation">,</span> p3<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span> allSize<span class="token punctuation">,</span> max<span class="token punctuation">,</span> min<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>


    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">Info</span><span class="token punctuation">{</span>

        <span class="token keyword">public</span> <span class="token keyword">int</span> maxSubtreeSize<span class="token punctuation">;</span>
        <span class="token keyword">public</span> <span class="token keyword">int</span> allSize<span class="token punctuation">;</span>
        <span class="token keyword">public</span> <span class="token keyword">int</span> max<span class="token punctuation">;</span>
        <span class="token keyword">public</span> <span class="token keyword">int</span> min<span class="token punctuation">;</span>

        <span class="token keyword">public</span> <span class="token class-name">Info</span><span class="token punctuation">(</span><span class="token keyword">int</span> maxSubtreeSize<span class="token punctuation">,</span> <span class="token keyword">int</span> allSize<span class="token punctuation">,</span> <span class="token keyword">int</span> max<span class="token punctuation">,</span> <span class="token keyword">int</span> min<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>maxSubtreeSize <span class="token operator">=</span> maxSubtreeSize<span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>allSize <span class="token operator">=</span> allSize<span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>max <span class="token operator">=</span> max<span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>min <span class="token operator">=</span> min<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 提交时不要提交这个类</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">TreeNode</span> <span class="token punctuation">{</span>
        <span class="token keyword">public</span> <span class="token keyword">int</span> val<span class="token punctuation">;</span>
        <span class="token keyword">public</span> <span class="token class-name">TreeNode</span> left<span class="token punctuation">;</span>
        <span class="token keyword">public</span> <span class="token class-name">TreeNode</span> right<span class="token punctuation">;</span>

        <span class="token keyword">public</span> <span class="token class-name">TreeNode</span><span class="token punctuation">(</span><span class="token keyword">int</span> value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            val <span class="token operator">=</span> value<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>另外一题是返回头节点，其他条件一样</p>
<h2 id="十五、给定头节点和ab两个节点求ab两个最初公共祖先" tabindex="-1"><a class="header-anchor" href="#十五、给定头节点和ab两个节点求ab两个最初公共祖先" aria-hidden="true">#</a> 十五、给定头节点和AB两个节点求AB两个最初公共祖先</h2>
<p>a节点和b接口往上找汇聚的第一个节点</p>
<h3 id="所有会出现的情况-4" tabindex="-1"><a class="header-anchor" href="#所有会出现的情况-4" aria-hidden="true">#</a> 所有会出现的情况</h3>
<p>1、汇聚的节点不是头节点</p>
<ul>
<li>已经在左树上汇聚了</li>
<li>已经在右树上汇聚了</li>
<li>a和b都没有找全</li>
</ul>
<p>2、汇聚的节点是头节点</p>
<ul>
<li>左树发现一个、右树发现另一个</li>
<li>头节点本身就是a节点，左树右树发现了节点b</li>
<li>头节点本省就是b节点，左树右树发现了节点a</li>
</ul>
<p>3、上面的情况都没有匹配上则没有公共祖先</p>
<blockquote>
<p>每个数需要的信息</p>
<p>1、树上有没有发现a</p>
<p>2、树上有没有发现b</p>
<p>3、树上发现的最低公共祖先（答案）</p>
</blockquote>
<h3 id="代码实现-4" tabindex="-1"><a class="header-anchor" href="#代码实现-4" aria-hidden="true">#</a> 代码实现</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">Info</span> <span class="token function">process</span><span class="token punctuation">(</span><span class="token class-name">Node</span> head<span class="token punctuation">,</span> <span class="token class-name">Node</span> a<span class="token punctuation">,</span> <span class="token class-name">Node</span> b<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>head <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Info</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token class-name">Info</span> l <span class="token operator">=</span> <span class="token function">process</span><span class="token punctuation">(</span>head<span class="token punctuation">.</span>left<span class="token punctuation">,</span> a<span class="token punctuation">,</span> b<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Info</span> r <span class="token operator">=</span> <span class="token function">process</span><span class="token punctuation">(</span>head<span class="token punctuation">.</span>right<span class="token punctuation">,</span> a<span class="token punctuation">,</span> b<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 头节点是a 或者 左右节点找到a</span>
        <span class="token keyword">boolean</span> findA <span class="token operator">=</span> <span class="token punctuation">(</span>head <span class="token operator">==</span> a<span class="token punctuation">)</span> <span class="token operator">||</span> l<span class="token punctuation">.</span>findA <span class="token operator">||</span> r<span class="token punctuation">.</span>findA<span class="token punctuation">;</span>
        <span class="token comment">// 头节点是b 或者 左右节点找到b</span>
        <span class="token keyword">boolean</span> findB <span class="token operator">=</span> <span class="token punctuation">(</span>head <span class="token operator">==</span> b<span class="token punctuation">)</span> <span class="token operator">||</span> l<span class="token punctuation">.</span>findB <span class="token operator">||</span> r<span class="token punctuation">.</span>findB<span class="token punctuation">;</span>
        <span class="token class-name">Node</span> ans <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>l<span class="token punctuation">.</span>ans <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            ans <span class="token operator">=</span> l<span class="token punctuation">.</span>ans<span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span><span class="token punctuation">(</span>r<span class="token punctuation">.</span>ans <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            ans <span class="token operator">=</span> r<span class="token punctuation">.</span>ans<span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token comment">// 左右都没有找到汇聚节点，但是左边和右边都找到了值，则头节点就是汇聚节点</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>findA <span class="token operator">&amp;&amp;</span> findB<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                ans <span class="token operator">=</span> head<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Info</span><span class="token punctuation">(</span>findA<span class="token punctuation">,</span> findB<span class="token punctuation">,</span> ans<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">Info</span><span class="token punctuation">{</span>

        <span class="token keyword">private</span> <span class="token keyword">boolean</span> findA<span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token keyword">boolean</span> findB<span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token class-name">Node</span> ans<span class="token punctuation">;</span>

        <span class="token keyword">public</span> <span class="token class-name">Info</span><span class="token punctuation">(</span><span class="token keyword">boolean</span> findA<span class="token punctuation">,</span> <span class="token keyword">boolean</span> findB<span class="token punctuation">,</span> <span class="token class-name">Node</span> ans<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>findA <span class="token operator">=</span> findA<span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>findB <span class="token operator">=</span> findB<span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>ans <span class="token operator">=</span> ans<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="十六、派对的最大快乐值" tabindex="-1"><a class="header-anchor" href="#十六、派对的最大快乐值" aria-hidden="true">#</a> 十六、派对的最大快乐值</h2>
<p>公司现在要办party，你可以决定哪些员工来，哪些员工不来，规则：</p>
<ol>
<li>
<p>如果某个员工来了，那么这个员工的所有直接下级都不能来</p>
</li>
<li>
<p>派对的整体快乐值是所有到场员工快乐值的累加</p>
</li>
<li>
<p>你的目标是让派对的整体快乐值尽量大给定一棵多叉树的头节点boss，请返回派对的最大快乐值。</p>
</li>
</ol>
<h3 id="所有会出现的情况-5" tabindex="-1"><a class="header-anchor" href="#所有会出现的情况-5" aria-hidden="true">#</a> 所有会出现的情况</h3>
<p>1、 当前节点参加派对</p>
<ul>
<li>当前节点的快乐值+sum（子节点不参加派对的快乐值）</li>
</ul>
<p>2、当前节点不参加派对</p>
<ul>
<li>sum（max（子节点参加派对的快乐值， 子节点不参加派对的快乐值））</li>
</ul>
<blockquote>
<p>需要的参数：参加派对的快乐值、不参加派对的快乐值</p>
</blockquote>
<h3 id="代码实现-5" tabindex="-1"><a class="header-anchor" href="#代码实现-5" aria-hidden="true">#</a> 代码实现</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">Info</span> <span class="token function">process</span><span class="token punctuation">(</span><span class="token class-name">Employee</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>e <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Info</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">int</span> yes <span class="token operator">=</span> e<span class="token punctuation">.</span>happy<span class="token punctuation">;</span>
        <span class="token keyword">int</span> no <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Employee</span> next <span class="token operator">:</span> e<span class="token punctuation">.</span>nexts<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">Info</span> process <span class="token operator">=</span> <span class="token function">process</span><span class="token punctuation">(</span>next<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// 当前节点不参加 = sum（max（yes，no））</span>
            no <span class="token operator">+=</span> <span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">max</span><span class="token punctuation">(</span>process<span class="token punctuation">.</span>yes<span class="token punctuation">,</span> process<span class="token punctuation">.</span>no<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// 当前节点参加=sum（子节点不参加的快乐值）</span>
            yes <span class="token operator">+=</span> process<span class="token punctuation">.</span>no<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Info</span><span class="token punctuation">(</span>yes<span class="token punctuation">,</span> no<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">Info</span><span class="token punctuation">{</span>

        <span class="token keyword">public</span> <span class="token keyword">int</span> yes<span class="token punctuation">;</span>
        <span class="token keyword">public</span> <span class="token keyword">int</span> no<span class="token punctuation">;</span>

        <span class="token keyword">public</span> <span class="token class-name">Info</span><span class="token punctuation">(</span><span class="token keyword">int</span> yes<span class="token punctuation">,</span> <span class="token keyword">int</span> no<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>yes <span class="token operator">=</span> yes<span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>no <span class="token operator">=</span> no<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


