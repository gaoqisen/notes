<template><div><blockquote>
<p>用一种局部最功利的标准，做出当前看起来最好的选择。</p>
<p>难点在于证明局部最功利的标准可以获得全局最优解。</p>
<p>可以用暴力法+大样本数据检验贪心算法，策略证明很难。</p>
</blockquote>
<h2 id="一、给定字符串数组获取字典序最小的结果" tabindex="-1"><a class="header-anchor" href="#一、给定字符串数组获取字典序最小的结果" aria-hidden="true">#</a> 一、给定字符串数组获取字典序最小的结果</h2>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>    <span class="token doc-comment comment">/**
     * 获取最低字典序
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">String</span> <span class="token function">getLowestLexicography</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> arr<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>arr <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">||</span> arr<span class="token punctuation">.</span>length <span class="token operator">&lt;</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token string">""</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
      
        <span class="token comment">// (a+b).compareTo(b+a)可以， (a.compareTo(b)不可以</span>
        <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">sort</span><span class="token punctuation">(</span>arr<span class="token punctuation">,</span> <span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">)</span> <span class="token operator">-></span> <span class="token punctuation">(</span>a<span class="token operator">+</span>b<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">compareTo</span><span class="token punctuation">(</span>b<span class="token operator">+</span>a<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">StringBuilder</span> builder <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StringBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">String</span> s <span class="token operator">:</span> arr<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            builder<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> builder<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>每个字典序排序之后就是全局的最优解。 用暴力+大样本检测</p>
<h2 id="二、会议室最大宣讲次数" tabindex="-1"><a class="header-anchor" href="#二、会议室最大宣讲次数" aria-hidden="true">#</a> 二、会议室最大宣讲次数</h2>
<h3 id="题目" tabindex="-1"><a class="header-anchor" href="#题目" aria-hidden="true">#</a> 题目</h3>
<p>一些项目要占用一个会议室宣讲，会议室不能同时容纳两个项目的宣讲。给你每一个项目开始的时间和结束的时间你来安排宣讲的日程，要求会议室进行的宣讲的场次最多。返回最多的宣讲场次。</p>
<h3 id="思路" tabindex="-1"><a class="header-anchor" href="#思路" aria-hidden="true">#</a> 思路</h3>
<p>贪心策略：每次都选择结束时间最小的会议</p>
<p>1、根据结束时间排序（谁结束时间早谁排在前面）</p>
<p>2、判断第一个会议结束后那个会议的开始时间可以立马开始的就开始。</p>
<h3 id="代码" tabindex="-1"><a class="header-anchor" href="#代码" aria-hidden="true">#</a> 代码</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">Program</span> <span class="token punctuation">{</span>
        <span class="token keyword">public</span> <span class="token keyword">int</span> start<span class="token punctuation">;</span>
        <span class="token keyword">public</span> <span class="token keyword">int</span> end<span class="token punctuation">;</span>

        <span class="token keyword">public</span> <span class="token class-name">Program</span><span class="token punctuation">(</span><span class="token keyword">int</span> start<span class="token punctuation">,</span> <span class="token keyword">int</span> end<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>start <span class="token operator">=</span> start<span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>end <span class="token operator">=</span> end<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">getBestArrange</span><span class="token punctuation">(</span><span class="token class-name">Program</span><span class="token punctuation">[</span><span class="token punctuation">]</span> programs<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">sort</span><span class="token punctuation">(</span>programs<span class="token punctuation">,</span> <span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">)</span> <span class="token operator">-></span> a<span class="token punctuation">.</span>end <span class="token operator">-</span> b<span class="token punctuation">.</span>end<span class="token punctuation">)</span><span class="token punctuation">;</span>
        
        <span class="token keyword">int</span> sum <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> currentEnd <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Program</span> program <span class="token operator">:</span> programs<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>currentEnd <span class="token operator">&lt;=</span> program<span class="token punctuation">.</span>start<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                sum<span class="token operator">++</span><span class="token punctuation">;</span>
                currentEnd <span class="token operator">=</span> program<span class="token punctuation">.</span>end<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> sum<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="三、金条分割的最小代价" tabindex="-1"><a class="header-anchor" href="#三、金条分割的最小代价" aria-hidden="true">#</a> 三、金条分割的最小代价</h2>
<h3 id="题目-1" tabindex="-1"><a class="header-anchor" href="#题目-1" aria-hidden="true">#</a> 题目</h3>
<p>一块金条切成两半，是需要花费和长度数值一样的铜板的。</p>
<p>比如长度为20的金条，不管怎么切，都要花费20个铜板。 一群人想整分整块金条，怎么分最省铜板?</p>
<p>例如,给定数组{10,20,30}，代表一共三个人，整块金条长度为60，金条要分成10，20，30三个部分。</p>
<p>如果先把长度60的金条分成10和50，花费60; 再把长度50的金条分成20和30，花费50;一共花费110铜板。但如果先把长度60的金条分成30和30，花费60;再把长度30金条分成10和20， 花费30;一共花费90铜板。</p>
<p>输入一个数组，返回分割的最小代价。</p>
<h3 id="思路-1" tabindex="-1"><a class="header-anchor" href="#思路-1" aria-hidden="true">#</a> 思路</h3>
<p>1、准备一个小根堆，将数据放入</p>
<p>2、每次弹出两个数，累加后放回。所有两个数累加的和就是最小分割代价</p>
<h3 id="代码-1" tabindex="-1"><a class="header-anchor" href="#代码-1" aria-hidden="true">#</a> 代码</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">getLessMoneySplitGold</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> arr<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">PriorityQueue</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">></span></span> queue <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PriorityQueue</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">:</span> arr<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            queue<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">int</span> sum <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>queue<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">></span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">int</span> val <span class="token operator">=</span> queue<span class="token punctuation">.</span><span class="token function">poll</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> queue<span class="token punctuation">.</span><span class="token function">poll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            queue<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span><span class="token punctuation">;</span>
            sum <span class="token operator">+=</span> val<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> sum<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="四、最大项目收益" tabindex="-1"><a class="header-anchor" href="#四、最大项目收益" aria-hidden="true">#</a> 四、最大项目收益</h2>
<h3 id="题目-2" tabindex="-1"><a class="header-anchor" href="#题目-2" aria-hidden="true">#</a> 题目</h3>
<p>输入: 正数数组costs、正数数组profits、正数K、正数M</p>
<p>costs[i]表示i号项目的花费</p>
<p>profits[i]表示i号项目在扣除花费之后还能挣到的钱(利润)</p>
<p>K表示你只能串行的最多做k个项目</p>
<p>M表示你初始的资金</p>
<p>说明: 每做完一个项目，马上获得的收益，可以支持你去做下一个项目。不能并行的做项目。</p>
<p>输出：你最后获得的最大钱数。</p>
<h3 id="思路-2" tabindex="-1"><a class="header-anchor" href="#思路-2" aria-hidden="true">#</a> 思路</h3>
<p>初始资金符合最大收益的项目先做即可</p>
<p>1、将项目按照花费组成小根堆（全部）、大根堆按照利润区分</p>
<p>2、判断小根堆里符合初始资金的，放入大根堆</p>
<p>3、项目最大收益就是大根堆的第一个项目</p>
<h3 id="代码-2" tabindex="-1"><a class="header-anchor" href="#代码-2" aria-hidden="true">#</a> 代码</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>    <span class="token doc-comment comment">/**
     * 获取项目最大收益
     *
     * <span class="token keyword">@param</span> <span class="token parameter">k</span> 项目次数
     * <span class="token keyword">@param</span> <span class="token parameter">w</span> 初始资金
     * <span class="token keyword">@param</span> <span class="token parameter">profits</span> 利润
     * <span class="token keyword">@param</span> <span class="token parameter">capital</span> 资金
     * <span class="token keyword">@return</span> 最大项目收益
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">getMaximizedCapital</span><span class="token punctuation">(</span><span class="token keyword">int</span> k<span class="token punctuation">,</span> <span class="token keyword">int</span> w<span class="token punctuation">,</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> profits<span class="token punctuation">,</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> capital<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 将项目放入小根堆，按照资金从小到大</span>
        <span class="token class-name">PriorityQueue</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Program</span><span class="token punctuation">></span></span> capitalQueueMin <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PriorityQueue</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">)</span> <span class="token operator">-></span> a<span class="token punctuation">.</span>c <span class="token operator">-</span> b<span class="token punctuation">.</span>c<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> profits<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            capitalQueueMin<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Program</span><span class="token punctuation">(</span>profits<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">,</span> capital<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// 大根堆放利润，从大到小</span>
        <span class="token class-name">PriorityQueue</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Program</span><span class="token punctuation">></span></span> profitsQueueMax <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PriorityQueue</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">)</span> <span class="token operator">-></span> b<span class="token punctuation">.</span>p <span class="token operator">-</span> a<span class="token punctuation">.</span>p<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> k<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 有项目并且资金小于等于当前资金时，则将项目放入大根堆</span>
            <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token operator">!</span>capitalQueueMin<span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> capitalQueueMin<span class="token punctuation">.</span><span class="token function">peek</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>c <span class="token operator">&lt;=</span> w<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                profitsQueueMax<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>capitalQueueMin<span class="token punctuation">.</span><span class="token function">poll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>

            <span class="token comment">// 无项目可做</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>profitsQueueMax<span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">break</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>

            <span class="token comment">// 最大收益的项目就是第一个大根堆弹出的项目</span>
            w <span class="token operator">+=</span> profitsQueueMax<span class="token punctuation">.</span><span class="token function">poll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>c<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> w<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>


    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">Program</span> <span class="token punctuation">{</span>
        <span class="token keyword">public</span> <span class="token keyword">int</span> p<span class="token punctuation">;</span>
        <span class="token keyword">public</span> <span class="token keyword">int</span> c<span class="token punctuation">;</span>

        <span class="token keyword">public</span> <span class="token class-name">Program</span><span class="token punctuation">(</span><span class="token keyword">int</span> p<span class="token punctuation">,</span> <span class="token keyword">int</span> c<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>p <span class="token operator">=</span> p<span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>c <span class="token operator">=</span> c<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="五、墙和街道的最少放灯数量" tabindex="-1"><a class="header-anchor" href="#五、墙和街道的最少放灯数量" aria-hidden="true">#</a> 五、墙和街道的最少放灯数量</h2>
<h3 id="题目-3" tabindex="-1"><a class="header-anchor" href="#题目-3" aria-hidden="true">#</a> 题目</h3>
<p>给定一个字符串str，只由‘X’和‘.’两种字符构成。‘X’表示墙，不能放灯，也不需要点亮‘.’表示居民点，可以放灯，需要点亮如果灯放在i位置，可以让i-1，i和i+1三个位置被点亮返回如果点亮str中所有需要点亮的位置，至少需要几盏灯。</p>
<h3 id="思路-3" tabindex="-1"><a class="header-anchor" href="#思路-3" aria-hidden="true">#</a> 思路</h3>
<p>1、遍历字符串，如果当前字符是墙（x）</p>
<ul>
<li>则跳转到i+1位置</li>
</ul>
<p>2、遍历字符串，如果当前字符是街道（.）</p>
<ul>
<li>如果i+1位置是墙（x），则i位置必须放灯。如果不放灯i后面是墙那么当前位置就无法照亮（灯+1，i+2）</li>
<li>如果i+1位置是街道（.）,在进行细分，i+2是墙（x），则i+1或者i位置上必须放灯（灯+1， i+3）</li>
<li>如果i+1位置是街道（.）,在进行细分，i+2也是墙街道（.），则在i+1上面放灯，i和i+2都照亮了（灯+1，i+3）</li>
</ul>
<h3 id="代码-3" tabindex="-1"><a class="header-anchor" href="#代码-3" aria-hidden="true">#</a> 代码</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">getMinLight</span><span class="token punctuation">(</span><span class="token class-name">String</span> str<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>str <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">||</span> str<span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">char</span><span class="token punctuation">[</span><span class="token punctuation">]</span> chars <span class="token operator">=</span> str<span class="token punctuation">.</span><span class="token function">toCharArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> light <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> chars<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>chars<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token char">'X'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">continue</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                light<span class="token operator">++</span><span class="token punctuation">;</span>
                <span class="token keyword">if</span><span class="token punctuation">(</span>i <span class="token operator">+</span> <span class="token number">1</span> <span class="token operator">==</span> chars<span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token keyword">break</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>chars<span class="token punctuation">[</span>i <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token char">'X'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    i <span class="token operator">+=</span> <span class="token number">1</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                    i <span class="token operator">+=</span> <span class="token number">2</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> light<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>总结：遇到贪心题目用排序、堆或者其他数据结构实现，用暴力+大样本验证即可</p>
</div></template>


