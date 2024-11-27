<template><div><p>mvcc：多并发版本控制，为了解决多并发加锁太重的一个方式。做到读写冲突时，不加锁也不阻塞</p>
<p>当前读：读取当前最新的数据（需要加锁）select lock in share mode(共享锁), select for update ; update, insert ,delete(排他锁)</p>
<p>快照读：不加锁的select</p>
<p>mysql可见性算法伪代码</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token comment">// 快照读</span>
<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">ReadView</span><span class="token punctuation">{</span>
    <span class="token comment">// 当前事务ID</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> current_trx_id<span class="token punctuation">;</span>
    <span class="token comment">// 正在活跃的事务id（未提交的事务）</span>
    <span class="token keyword">public</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">></span></span> alive_list<span class="token punctuation">;</span>
    <span class="token comment">// 最小事务id</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> low_limit_id<span class="token punctuation">;</span>
    <span class="token comment">// 目前已出现的事务ID的最大值 + 1</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> up_limit_id<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">UndoLog</span><span class="token punctuation">{</span>
    <span class="token comment">// 当前指针</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> roll_ptr<span class="token punctuation">;</span>
    <span class="token comment">// 隐含的自增ID</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> db_row_id<span class="token punctuation">;</span>
    <span class="token comment">// 事务ID</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> trx_id<span class="token punctuation">;</span>
    <span class="token comment">// 回滚指针</span>
    <span class="token keyword">public</span> <span class="token class-name">UndoLog</span> db_roll_ptr<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 快照读</span>
<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">UndoLog</span> <span class="token function">readData</span><span class="token punctuation">(</span><span class="token class-name">UndoLog</span> chain<span class="token punctuation">,</span> <span class="token class-name">ReadView</span> readView<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">UndoLog</span> current <span class="token operator">=</span> chain<span class="token punctuation">;</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token function">visibility</span><span class="token punctuation">(</span>chain<span class="token punctuation">,</span> readView<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> current<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        current <span class="token operator">=</span> chain<span class="token punctuation">.</span>db_roll_ptr<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">boolean</span> <span class="token function">visibility</span><span class="token punctuation">(</span><span class="token class-name">UndoLog</span> undoLog<span class="token punctuation">,</span> <span class="token class-name">ReadView</span> readView<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 事务已提交或当前事务 可见</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>undoLog<span class="token punctuation">.</span>trx_id <span class="token operator">&lt;</span> readView<span class="token punctuation">.</span>low_limit_id <span class="token operator">||</span> undoLog<span class="token punctuation">.</span>trx_id <span class="token operator">==</span> readView<span class="token punctuation">.</span>current_trx_id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 当前事务在活跃事务后查询 不可见</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>readView<span class="token punctuation">.</span>current_trx_id <span class="token operator">></span> undoLog<span class="token punctuation">.</span>trx_id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 活跃事务id里面包含当前事务不可见</span>
    <span class="token keyword">return</span> <span class="token operator">!</span>readView<span class="token punctuation">.</span>alive_list<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span>undoLog<span class="token punctuation">.</span>trx_id<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


