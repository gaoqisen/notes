<template><div><h2 id="一、介绍" tabindex="-1"><a class="header-anchor" href="#一、介绍" aria-hidden="true">#</a> 一、介绍</h2>
<p>蓄水池算法是一种从一个很长的数据流中随机选择固定数量的样本的方法，而不需要事先知道数据流的总大小。</p>
<p>想象一下你正在建造一个容量有限的蓄水池（比如有k个位置），并且有一根水管连接到一个持续不断地提供数据的源头。你需要从源头中选取k个样本放入蓄水池中，并且保证每个样本都有被选到的机会。</p>
<p>初始时，蓄水池是空的。当第一个元素经过水管时，你将它放入蓄水池中，因为还没有其他选择。接下来，第二个元素来了。现在你必须决定是否将它放入蓄水池内。</p>
<p>这里的关键是要保证每个元素被选中的概率相等。所以，对于第i个元素（i &gt; k），你以1/i的概率选择该元素留下，并且以k/i的概率选择替换掉蓄水池中的任意一个已有样本。</p>
<p>这个过程重复进行，直到所有元素都通过水管。最终，蓄水池中的k个样本就是从整个数据流中随机选择的样本。</p>
<p>蓄水池算法的优点在于它能够高效地处理大规模数据流，只需要遍历一次而不需要保存整个数据流。它适用于需要随机采样的场景，例如从海量用户中选择样本、从大型日志中找出随机条目等。</p>
<p>解决的问题：</p>
<p>假设有一个源源吐出不同球的机器，只有装下10个球的袋子，每一个吐出的球，要么放入袋子，要么永远扔掉如何做到机器吐出每一个球之后，所有吐出的球都等概率被放进袋子里</p>
<h2 id="二、思路" tabindex="-1"><a class="header-anchor" href="#二、思路" aria-hidden="true">#</a> 二、思路</h2>
<p>1、蓄水池有多大初始就装多大，入蓄水池10个位置。先出来的10个球都入水池</p>
<p>2、之后大样本出来的球就以10/i的概率入蓄水池</p>
<p>3、蓄水池里面的10个球等概率丢掉一个球</p>
<p>例子,球的数量为n，求3号球存活下来的概率：</p>
<p>当第11号球入池3号球出池概率是10/11 * 1/10 = 1/11则存活的概率是10/11</p>
<p>当第12号球入池3号球出池概率是10/12 * 1/10 = 1/12则存活的概率是11/12</p>
<p>则3号球存活的概率为1 * 10/11 * 11/12 * n-1/n = 10/n</p>
<h2 id="三、代码" tabindex="-1"><a class="header-anchor" href="#三、代码" aria-hidden="true">#</a> 三、代码</h2>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>    <span class="token comment">// 随机球</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">RandomBox</span><span class="token punctuation">{</span>

        <span class="token comment">// 蓄水池</span>
        <span class="token keyword">private</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> bag<span class="token punctuation">;</span>

        <span class="token comment">// 水池大小</span>
        <span class="token keyword">private</span> <span class="token keyword">int</span> <span class="token class-name">N</span><span class="token punctuation">;</span>

        <span class="token comment">// 当前球的数量</span>
        <span class="token keyword">private</span> <span class="token keyword">int</span> count<span class="token punctuation">;</span>

        <span class="token keyword">public</span> <span class="token class-name">RandomBox</span><span class="token punctuation">(</span><span class="token keyword">int</span> capacity<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            bag <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span>capacity<span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token class-name">N</span> <span class="token operator">=</span> capacity<span class="token punctuation">;</span>
            count <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// 随机获取数字</span>
        <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">random</span><span class="token punctuation">(</span><span class="token keyword">int</span> max<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span> max<span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">int</span> num<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 球数量增加</span>
            count<span class="token operator">++</span><span class="token punctuation">;</span>
            <span class="token comment">// 如果球数量小于等于池子大小则直接入池</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>count <span class="token operator">&lt;=</span> <span class="token class-name">N</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                bag<span class="token punctuation">[</span>count <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> num<span class="token punctuation">;</span>
                <span class="token keyword">return</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>

            <span class="token comment">// 等概率随机当前数量的值，如果刚好随机到池子里则入池</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token function">random</span><span class="token punctuation">(</span>count<span class="token punctuation">)</span> <span class="token operator">&lt;=</span> <span class="token class-name">N</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">// 随机将池子里面值丢到（直接覆盖掉）</span>
                bag<span class="token punctuation">[</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token class-name">N</span><span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> num<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// 等概率选中的球</span>
        <span class="token keyword">public</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token function">choices</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> ans <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token class-name">N</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token class-name">N</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                ans<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> bag<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">return</span> ans<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="四、实际应用" tabindex="-1"><a class="header-anchor" href="#四、实际应用" aria-hidden="true">#</a> 四、实际应用</h2>
<p>1、全球前一天登陆的用户的里面取100个中奖者发奖，如果不用蓄水池算法则需要获取到所有登陆的用户，如果使用蓄水池算法则可以实时取出中奖者</p>
<p>2、大样本数据随机取值作为抽样处理数据</p>
</div></template>


