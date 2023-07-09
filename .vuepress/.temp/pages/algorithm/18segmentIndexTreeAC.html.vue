<template><div><h2 id="一、segmenttree" tabindex="-1"><a class="header-anchor" href="#一、segmenttree" aria-hidden="true">#</a> 一、segmentTree</h2>
<h3 id="_1、介绍" tabindex="-1"><a class="header-anchor" href="#_1、介绍" aria-hidden="true">#</a> 1、介绍</h3>
<p>线段树是一种解决在区间内批量增加、更新、查询数组或列表里面的一种算法，主要方式是将数组转换成二叉树的结构后用懒更新的方式实现快速的更新和查询。如下是GPT的介绍</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>线段树（Segment Tree）是一种用于解决区间查询问题的数据结构。它主要被用于处理数组或者列表等数据结构的区间查询操作，例如求区间和、最大值、最小值等。

线段树的基本思想是将一个区间划分成若干个子区间，并为每个子区间维护一些预先计算好的信息。通过不断地二分递归地创建子节点，将整个区间划分成左右两部分，直到达到单个元素区间或者无法再进一步划分。

在线段树中，每个节点代表一个区间，根节点表示整个待查询的区间。每个节点保存着对应区间的相关信息，比如区间内元素之和、最大值、最小值等。通过对子区间合并（merge）这些信息，可以得到父节点的相关信息，最终得到根节点的信息，即整个区间的查询结果。

线段树的构建过程需要 O(n) 的时间复杂度，其中 n 是待查询区间的长度。一旦线段树构建完成，单次区间查询的时间复杂度为 O(logn)，非常高效。线段树还支持更新操作，即在某个位置上修改原始数据后，只需要更新对应节点及其祖先节点的信息即可，时间复杂度同样为 O(logn)。

线段树广泛应用于各种需要高效处理区间查询的算法和问题，例如计算机图形学中的区域填充、区间覆盖等。它提供了一种有效的数据结构来解决这类问题，大大降低了时间复杂度并提高了算法的效率。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2、增加、更新、查询的线段树思路" tabindex="-1"><a class="header-anchor" href="#_2、增加、更新、查询的线段树思路" aria-hidden="true">#</a> 2、增加、更新、查询的线段树思路</h3>
<p>1、初始化懒更新的数组，大小为原始数组的4倍，用于记录整棵树</p>
<p>2、递归将累加和构建成一棵树sum，参数为左下标l、右下标r、树的开始节点下标root</p>
<ul>
<li>如果左小标等于右下标则说明是叶子节点，累加和直接返回当前左下标的值</li>
<li>获取l～r的中间数后，递归处理每个节点的累加和。 左节点=root*2，右节点=root*2+1</li>
<li>汇总当前root的累加和</li>
</ul>
<p>3、在给定l～r范围内所有的值都增加c</p>
<ul>
<li>判断当前范围是否在目标范围内，在范围内则直接进行懒更新。将值存放到lazy里面，并计算新的累加和后更新。不更新范围里面的其他值</li>
<li>如果不在范围内则判断当前root是否存在懒更新数据，存在则将懒更新数据更新到左右节点上面</li>
<li>判断左右两边如果需要处理则递归处理范围数据（获取中间值后左右两边进行判断）</li>
<li>汇总累加和即可</li>
</ul>
<h3 id="_3、代码" tabindex="-1"><a class="header-anchor" href="#_3、代码" aria-hidden="true">#</a> 3、代码</h3>
<p>给定一个数组arr，用户希望你实现如下三个方法</p>
<p>1）void add(int L, int R, int V) :  让数组arr[L…R]上每个数都加上V</p>
<p>2）void update(int L, int R, int V) :  让数组arr[L…R]上每个数都变成V</p>
<p>3）int sum(int L, int R) :让返回arr[L…R]这个范围整体的累加和怎么让这三个方法，时间复杂度都是O(logN)</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">SegmentTree</span><span class="token punctuation">{</span>

        <span class="token keyword">private</span> <span class="token keyword">int</span> maxn<span class="token punctuation">;</span>

        <span class="token comment">// 从1开始的数组</span>
        <span class="token keyword">private</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> arr<span class="token punctuation">;</span>
        <span class="token comment">// 线段树区间和,范围累加和信息</span>
        <span class="token keyword">private</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> sum<span class="token punctuation">;</span>
        <span class="token comment">// 线段树懒加载标记， 懒更新数据</span>
        <span class="token keyword">private</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> lazy<span class="token punctuation">;</span>

        <span class="token comment">// 记录范围内有所有值都更新为一个值update</span>
        <span class="token keyword">private</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> change<span class="token punctuation">;</span>
        <span class="token comment">// 更新的懒加载标记，记录更新的操作方式，解决相同值歧义问题</span>
        <span class="token comment">// false表示值无效0则表示没有update信息，true表示有效0则表示将所有值更新为0</span>
        <span class="token keyword">private</span> <span class="token keyword">boolean</span><span class="token punctuation">[</span><span class="token punctuation">]</span> updateLazy<span class="token punctuation">;</span>

        <span class="token comment">// 初始化线段树</span>
        <span class="token keyword">public</span> <span class="token class-name">SegmentTree</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> origin<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            maxn <span class="token operator">=</span> origin<span class="token punctuation">.</span>length <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
            <span class="token comment">// 将原始数据放到arr里面</span>
            arr <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span>maxn<span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> maxn<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> origin<span class="token punctuation">[</span>i <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>

            sum <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span>maxn <span class="token operator">*</span> <span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
            lazy <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span>maxn <span class="token operator">*</span> <span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
            change <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span>maxn <span class="token operator">*</span> <span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
            updateLazy <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">boolean</span><span class="token punctuation">[</span>maxn <span class="token operator">*</span> <span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// 累加和build： 原始数据arr的下标l～r范围的数据，build到sum数组从rt位置开始</span>
        <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">build</span><span class="token punctuation">(</span><span class="token keyword">int</span> l<span class="token punctuation">,</span> <span class="token keyword">int</span> r<span class="token punctuation">,</span> <span class="token keyword">int</span> root<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 叶子节点</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>l <span class="token operator">==</span> r<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                sum<span class="token punctuation">[</span>root<span class="token punctuation">]</span> <span class="token operator">=</span> arr<span class="token punctuation">[</span>l<span class="token punctuation">]</span><span class="token punctuation">;</span>
                <span class="token keyword">return</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>

            <span class="token keyword">int</span> mid <span class="token operator">=</span> <span class="token punctuation">(</span>l <span class="token operator">+</span> r<span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">;</span>
            <span class="token comment">// 左边的值build</span>
            <span class="token function">build</span><span class="token punctuation">(</span>l<span class="token punctuation">,</span> mid<span class="token punctuation">,</span> root <span class="token operator">*</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// 右边的值build</span>
            <span class="token function">build</span><span class="token punctuation">(</span>mid <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">,</span> r<span class="token punctuation">,</span> root <span class="token operator">*</span> <span class="token number">2</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// 计算当前值的累加和</span>
            <span class="token function">pushUp</span><span class="token punctuation">(</span>root<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// 获取当前节点的累加和（左孩子+右孩子）</span>
        <span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">pushUp</span><span class="token punctuation">(</span><span class="token keyword">int</span> rt<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 左孩子下标=i*2，  右孩子下标i*2+1</span>
            sum<span class="token punctuation">[</span>rt<span class="token punctuation">]</span> <span class="token operator">=</span> sum<span class="token punctuation">[</span>rt <span class="token operator">*</span> <span class="token number">2</span><span class="token punctuation">]</span> <span class="token operator">+</span> sum<span class="token punctuation">[</span>rt <span class="token operator">*</span> <span class="token number">2</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token doc-comment comment">/**
         * 线段内的值都增加c，例子：
         * 在1～1000的元素数组里面，3（l）～385（r）范围的值都增加c。树拆分的时候
         * 1（left）～500（right）构建到sum的1（rt）下标里
         * 501（left）～1000（right）构建到sum的2（rt）下标里
         * <span class="token keyword">@param</span> <span class="token parameter">l</span> 当前线段的左边  （任务）
         * <span class="token keyword">@param</span> <span class="token parameter">r</span> 当前线段的右边  （任务）
         * <span class="token keyword">@param</span> <span class="token parameter">C</span> 线段里面的数需要累加的值  （任务）
         * <span class="token keyword">@param</span> <span class="token parameter">left</span>  当前处理的左下标 (范围)
         * <span class="token keyword">@param</span> <span class="token parameter">right</span> 当前处理的右下标 (范围)
         * <span class="token keyword">@param</span> <span class="token parameter">rt</span>  sum的根下标 (范围)
         */</span>
        <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">int</span> l<span class="token punctuation">,</span> <span class="token keyword">int</span> r<span class="token punctuation">,</span> <span class="token keyword">int</span> <span class="token class-name">C</span><span class="token punctuation">,</span> <span class="token keyword">int</span> left<span class="token punctuation">,</span> <span class="token keyword">int</span> right<span class="token punctuation">,</span> <span class="token keyword">int</span> rt<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 可以懒更新时, 如当前处理范围是3～385， 目标是1～500范围上都加上5。 范围的值全部在任务里面</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>l <span class="token operator">&lt;=</span> left <span class="token operator">&amp;&amp;</span> right <span class="token operator">&lt;=</span> r<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">// 所有值的累加和汇总赋值</span>
                sum<span class="token punctuation">[</span>rt<span class="token punctuation">]</span> <span class="token operator">+=</span> <span class="token class-name">C</span> <span class="token operator">*</span> <span class="token punctuation">(</span>right <span class="token operator">-</span> left <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token comment">// 进行懒更新</span>
                lazy<span class="token punctuation">[</span>rt<span class="token punctuation">]</span> <span class="token operator">+=</span> <span class="token class-name">C</span><span class="token punctuation">;</span>
                <span class="token keyword">return</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>

            <span class="token comment">// 如果不能懒更新时，则获取当前值的中间值，并往下一层进行懒更新</span>
            <span class="token keyword">int</span> mid <span class="token operator">=</span> <span class="token punctuation">(</span>left <span class="token operator">+</span> right<span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">;</span>
            <span class="token comment">// 结清之前的任务</span>
            <span class="token function">pushDown</span><span class="token punctuation">(</span>rt<span class="token punctuation">,</span> mid <span class="token operator">-</span> left <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token punctuation">(</span>right <span class="token operator">-</span> mid<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// 左边的新任务下发</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>l <span class="token operator">&lt;=</span> mid<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token function">add</span><span class="token punctuation">(</span>l<span class="token punctuation">,</span> r<span class="token punctuation">,</span> <span class="token class-name">C</span><span class="token punctuation">,</span> left<span class="token punctuation">,</span> mid<span class="token punctuation">,</span> rt <span class="token operator">*</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token comment">// 右边的新任务下发</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>r <span class="token operator">></span> mid<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token function">add</span><span class="token punctuation">(</span>l<span class="token punctuation">,</span> r<span class="token punctuation">,</span> <span class="token class-name">C</span><span class="token punctuation">,</span> mid <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">,</span> right<span class="token punctuation">,</span> rt <span class="token operator">*</span> <span class="token number">2</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token comment">// 汇总当前值的累加和</span>
            <span class="token function">pushUp</span><span class="token punctuation">(</span>rt<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>


        <span class="token doc-comment comment">/**
         * 往下面更新一层，当前层的懒更新放到左右两个子节点去进行懒更新
         *
         * <span class="token keyword">@param</span> <span class="token parameter">root</span> 当前处理的根节点
         * <span class="token keyword">@param</span> <span class="token parameter">ln</span> 左边值的数量
         * <span class="token keyword">@param</span> <span class="token parameter">rn</span> 右边值的数量
         */</span>
        <span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">pushDown</span><span class="token punctuation">(</span><span class="token keyword">int</span> root<span class="token punctuation">,</span> <span class="token keyword">int</span> ln<span class="token punctuation">,</span> <span class="token keyword">int</span> rn<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">int</span> leftIndex <span class="token operator">=</span> root <span class="token operator">*</span> <span class="token number">2</span><span class="token punctuation">;</span>
            <span class="token keyword">int</span> rightIndex <span class="token operator">=</span> root <span class="token operator">*</span> <span class="token number">2</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
            <span class="token comment">// root节点存在更新信息。 更新节点必须在前</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>updateLazy<span class="token punctuation">[</span>root<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">// 先将左右节点的懒加载标记为ture</span>
                updateLazy<span class="token punctuation">[</span>leftIndex<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
                updateLazy<span class="token punctuation">[</span>rightIndex<span class="token punctuation">]</span><span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
                <span class="token comment">// 将左右节点的更新数据改为root的值</span>
                change<span class="token punctuation">[</span>leftIndex<span class="token punctuation">]</span> <span class="token operator">=</span> change<span class="token punctuation">[</span>root<span class="token punctuation">]</span><span class="token punctuation">;</span>
                change<span class="token punctuation">[</span>rightIndex<span class="token punctuation">]</span> <span class="token operator">=</span> change<span class="token punctuation">[</span>root<span class="token punctuation">]</span><span class="token punctuation">;</span>
                <span class="token comment">// 左右两个懒累加和的值清空</span>
                lazy<span class="token punctuation">[</span>leftIndex<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
                lazy<span class="token punctuation">[</span>rightIndex<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
                <span class="token comment">// 累加值的值重新赋值</span>
                sum<span class="token punctuation">[</span>leftIndex<span class="token punctuation">]</span> <span class="token operator">=</span> change<span class="token punctuation">[</span>root<span class="token punctuation">]</span> <span class="token operator">*</span> ln<span class="token punctuation">;</span>
                sum<span class="token punctuation">[</span>rightIndex<span class="token punctuation">]</span> <span class="token operator">=</span> change<span class="token punctuation">[</span>root<span class="token punctuation">]</span> <span class="token operator">*</span> rn<span class="token punctuation">;</span>
                <span class="token comment">// root节点的懒加载数据标记为false</span>
                updateLazy<span class="token punctuation">[</span>root<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>

            <span class="token comment">// 当前节点存在懒数据时</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>lazy<span class="token punctuation">[</span>root<span class="token punctuation">]</span> <span class="token operator">!=</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">// 左孩子更新</span>
                lazy<span class="token punctuation">[</span>leftIndex<span class="token punctuation">]</span> <span class="token operator">+=</span> lazy<span class="token punctuation">[</span>root<span class="token punctuation">]</span><span class="token punctuation">;</span>
                sum<span class="token punctuation">[</span>leftIndex<span class="token punctuation">]</span> <span class="token operator">+=</span> lazy<span class="token punctuation">[</span>root<span class="token punctuation">]</span> <span class="token operator">*</span> ln<span class="token punctuation">;</span>

                <span class="token comment">// 右孩子更新</span>
                lazy<span class="token punctuation">[</span>rightIndex<span class="token punctuation">]</span> <span class="token operator">+=</span> lazy<span class="token punctuation">[</span>root<span class="token punctuation">]</span><span class="token punctuation">;</span>
                sum<span class="token punctuation">[</span>rightIndex<span class="token punctuation">]</span> <span class="token operator">+=</span> lazy<span class="token punctuation">[</span>root<span class="token punctuation">]</span> <span class="token operator">*</span> rn<span class="token punctuation">;</span>
                <span class="token comment">// 当前位置清空</span>
                lazy<span class="token punctuation">[</span>root<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token doc-comment comment">/**
         * 线段内的所有值都更新为c，例子：
         * 在1～1000的元素数组里面，3（l）～385（r）范围的值都更新为c。
         * <span class="token keyword">@param</span> <span class="token parameter">l</span> 当前线段的左边  （任务）
         * <span class="token keyword">@param</span> <span class="token parameter">r</span> 当前线段的右边  （任务）
         * <span class="token keyword">@param</span> <span class="token parameter">c</span> 线段里面的数需要累加的值  （任务）
         * <span class="token keyword">@param</span> <span class="token parameter">left</span>  当前处理的左下标 (范围)
         * <span class="token keyword">@param</span> <span class="token parameter">right</span> 当前处理的右下标 (范围)
         * <span class="token keyword">@param</span> <span class="token parameter">root</span>  sum的根下标 (范围)
         */</span>
        <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">update</span><span class="token punctuation">(</span><span class="token keyword">int</span> l<span class="token punctuation">,</span> <span class="token keyword">int</span> r<span class="token punctuation">,</span> <span class="token keyword">int</span> c<span class="token punctuation">,</span> <span class="token keyword">int</span> left<span class="token punctuation">,</span> <span class="token keyword">int</span> right<span class="token punctuation">,</span> <span class="token keyword">int</span> root<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 范围都包含，懒更新</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>l <span class="token operator">&lt;=</span> left <span class="token operator">&amp;&amp;</span> right <span class="token operator">&lt;=</span> r<span class="token punctuation">)</span><span class="token punctuation">{</span>
                updateLazy<span class="token punctuation">[</span>root<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
                change<span class="token punctuation">[</span>root<span class="token punctuation">]</span> <span class="token operator">=</span> c<span class="token punctuation">;</span>
                sum<span class="token punctuation">[</span>root<span class="token punctuation">]</span> <span class="token operator">=</span> c <span class="token operator">*</span> <span class="token punctuation">(</span>right <span class="token operator">-</span> left <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                lazy<span class="token punctuation">[</span>root<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
                <span class="token keyword">return</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">int</span> mid <span class="token operator">=</span> <span class="token punctuation">(</span>right <span class="token operator">+</span> left<span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">;</span>
            <span class="token function">pushDown</span><span class="token punctuation">(</span>root<span class="token punctuation">,</span> mid <span class="token operator">-</span> left <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">,</span> right <span class="token operator">-</span> mid<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>l <span class="token operator">&lt;=</span> mid<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token function">update</span><span class="token punctuation">(</span>l<span class="token punctuation">,</span> r<span class="token punctuation">,</span> c<span class="token punctuation">,</span> left<span class="token punctuation">,</span> mid<span class="token punctuation">,</span> root <span class="token operator">*</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>r <span class="token operator">></span> mid<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token function">update</span><span class="token punctuation">(</span>l<span class="token punctuation">,</span> r<span class="token punctuation">,</span> c<span class="token punctuation">,</span> mid <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">,</span> right<span class="token punctuation">,</span> root <span class="token operator">*</span> <span class="token number">2</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token function">pushUp</span><span class="token punctuation">(</span>root<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// 获取线段之内的累加和</span>
        <span class="token keyword">public</span> <span class="token keyword">long</span> <span class="token function">query</span><span class="token punctuation">(</span><span class="token keyword">int</span> l<span class="token punctuation">,</span> <span class="token keyword">int</span> r<span class="token punctuation">,</span> <span class="token keyword">int</span> left<span class="token punctuation">,</span> <span class="token keyword">int</span> right<span class="token punctuation">,</span> <span class="token keyword">int</span> root<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>l <span class="token operator">&lt;=</span> left <span class="token operator">&amp;&amp;</span> right <span class="token operator">&lt;=</span> r<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">return</span> sum<span class="token punctuation">[</span>root<span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">int</span> mid <span class="token operator">=</span> <span class="token punctuation">(</span>left <span class="token operator">+</span> right<span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">;</span>
            <span class="token function">pushDown</span><span class="token punctuation">(</span>root<span class="token punctuation">,</span> mid <span class="token operator">-</span> left <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">,</span> right <span class="token operator">-</span> mid<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">long</span> ans <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>l <span class="token operator">&lt;=</span> mid<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                ans <span class="token operator">+=</span> <span class="token function">query</span><span class="token punctuation">(</span>l<span class="token punctuation">,</span> r<span class="token punctuation">,</span> left<span class="token punctuation">,</span> mid<span class="token punctuation">,</span> root <span class="token operator">*</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>r <span class="token operator">></span> mid<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                ans <span class="token operator">+=</span> <span class="token function">query</span><span class="token punctuation">(</span>l<span class="token punctuation">,</span> r<span class="token punctuation">,</span> mid <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">,</span> right<span class="token punctuation">,</span> root <span class="token operator">*</span> <span class="token number">2</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">return</span> ans<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4、俄罗斯方块游戏" tabindex="-1"><a class="header-anchor" href="#_4、俄罗斯方块游戏" aria-hidden="true">#</a> 4、俄罗斯方块游戏</h3>
<h4 id="_1、题目" tabindex="-1"><a class="header-anchor" href="#_1、题目" aria-hidden="true">#</a> 1、题目</h4>
<p>想象一下标准的俄罗斯方块游戏，X轴是积木最终下落到底的轴线。下面是这个游戏的简化版：</p>
<p>1）只会下落正方形积木</p>
<p>2）[a,b] -&gt; 代表一个边长为b的正方形积木，积木左边缘沿着X = a这条线从上方掉落</p>
<p>3）认为整个X轴都可能接住积木，也就是说简化版游戏是没有整体的左右边界的</p>
<p>4）没有整体的左右边界，所以简化版游戏不会消除积木，因为不会有哪一层被填满。</p>
<p>给定一个N*2的二维数组matrix，可以代表N个积木依次掉落，返回每一次掉落之后的最大高度</p>
<p>https://leetcode.com/problems/falling-squares/</p>
<h4 id="_2、思路" tabindex="-1"><a class="header-anchor" href="#_2、思路" aria-hidden="true">#</a> 2、思路</h4>
<p>1、利用线段树的更新机制每次落下一个方块都更新最大值（修改线段树的机制为最大值）</p>
<p>2、每次查询当前落下方块区域的最大值后加上当前方块的值更新线段树</p>
<p>3、落下方块时为了保证不会出现相邻两个方块重叠，则右边界-1</p>
<h4 id="_3、代码-1" tabindex="-1"><a class="header-anchor" href="#_3、代码-1" aria-hidden="true">#</a> 3、代码</h4>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">SegmentTree</span><span class="token punctuation">{</span>

        <span class="token keyword">private</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> max<span class="token punctuation">;</span>

        <span class="token keyword">private</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> change<span class="token punctuation">;</span>

        <span class="token keyword">public</span> <span class="token keyword">boolean</span><span class="token punctuation">[</span><span class="token punctuation">]</span> update<span class="token punctuation">;</span>

        <span class="token comment">// 初始化数据，没有原始数据，直接初始化大小</span>
        <span class="token keyword">public</span> <span class="token class-name">SegmentTree</span><span class="token punctuation">(</span><span class="token keyword">int</span> size<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">int</span> n <span class="token operator">=</span> size <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
            max <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span>n <span class="token operator">*</span> <span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
            change <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span>n <span class="token operator">*</span> <span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
            update <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">boolean</span><span class="token punctuation">[</span>n <span class="token operator">*</span> <span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// 更新操作</span>
        <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">update</span><span class="token punctuation">(</span><span class="token keyword">int</span> l<span class="token punctuation">,</span> <span class="token keyword">int</span> r<span class="token punctuation">,</span> <span class="token keyword">int</span> c<span class="token punctuation">,</span> <span class="token keyword">int</span> left<span class="token punctuation">,</span> <span class="token keyword">int</span> right<span class="token punctuation">,</span> <span class="token keyword">int</span> root<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 进行懒更新</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>l <span class="token operator">&lt;=</span> left <span class="token operator">&amp;&amp;</span> right <span class="token operator">&lt;=</span> r<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                update<span class="token punctuation">[</span>root<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
                change<span class="token punctuation">[</span>root<span class="token punctuation">]</span> <span class="token operator">=</span> c<span class="token punctuation">;</span>
                max<span class="token punctuation">[</span>root<span class="token punctuation">]</span> <span class="token operator">=</span> c<span class="token punctuation">;</span>
                <span class="token keyword">return</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>

            <span class="token comment">// 获取中点下标</span>
            <span class="token keyword">int</span> mid <span class="token operator">=</span> <span class="token punctuation">(</span>left <span class="token operator">+</span> right<span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">;</span>
            <span class="token comment">// 将懒更新往下移</span>
            <span class="token function">pushDown</span><span class="token punctuation">(</span>root<span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token comment">// 左边往下递归更新</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>l <span class="token operator">&lt;=</span> mid<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token function">update</span><span class="token punctuation">(</span>l<span class="token punctuation">,</span> r<span class="token punctuation">,</span> c<span class="token punctuation">,</span> left<span class="token punctuation">,</span> mid<span class="token punctuation">,</span> root <span class="token operator">*</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token comment">// 右边往下递归更新</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>r <span class="token operator">></span> mid<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token function">update</span><span class="token punctuation">(</span>l<span class="token punctuation">,</span> r<span class="token punctuation">,</span> c<span class="token punctuation">,</span> mid <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">,</span> right<span class="token punctuation">,</span> root <span class="token operator">*</span> <span class="token number">2</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token comment">// 计算当前值最大值</span>
            <span class="token function">pushUp</span><span class="token punctuation">(</span>root<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// 获取当前值最大值，通过左右子节点</span>
        <span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">pushUp</span><span class="token punctuation">(</span><span class="token keyword">int</span> root<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            max<span class="token punctuation">[</span>root<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">max</span><span class="token punctuation">(</span>max<span class="token punctuation">[</span>root <span class="token operator">*</span> <span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">,</span> max<span class="token punctuation">[</span>root <span class="token operator">*</span> <span class="token number">2</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// 将懒更新数据下移到左右节点</span>
        <span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">pushDown</span><span class="token punctuation">(</span><span class="token keyword">int</span> root<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>update<span class="token punctuation">[</span>root<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">return</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">int</span> leftIndex <span class="token operator">=</span> root <span class="token operator">*</span> <span class="token number">2</span><span class="token punctuation">;</span>
            <span class="token keyword">int</span> rightIndex <span class="token operator">=</span> leftIndex <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
            <span class="token comment">// 左右节点更新标记为true</span>
            update<span class="token punctuation">[</span>leftIndex<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
            update<span class="token punctuation">[</span>rightIndex<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>

            <span class="token comment">// 左右更新为父节点的值</span>
            change<span class="token punctuation">[</span>leftIndex<span class="token punctuation">]</span> <span class="token operator">=</span> change<span class="token punctuation">[</span>root<span class="token punctuation">]</span><span class="token punctuation">;</span>
            change<span class="token punctuation">[</span>rightIndex<span class="token punctuation">]</span> <span class="token operator">=</span> change<span class="token punctuation">[</span>root<span class="token punctuation">]</span><span class="token punctuation">;</span>

            max<span class="token punctuation">[</span>leftIndex<span class="token punctuation">]</span> <span class="token operator">=</span> change<span class="token punctuation">[</span>root<span class="token punctuation">]</span><span class="token punctuation">;</span>
            max<span class="token punctuation">[</span>rightIndex<span class="token punctuation">]</span> <span class="token operator">=</span> change<span class="token punctuation">[</span>root<span class="token punctuation">]</span><span class="token punctuation">;</span>

            update<span class="token punctuation">[</span>root<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// 查询最大值</span>
        <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">query</span><span class="token punctuation">(</span><span class="token keyword">int</span> l<span class="token punctuation">,</span> <span class="token keyword">int</span> r<span class="token punctuation">,</span> <span class="token keyword">int</span> left<span class="token punctuation">,</span> <span class="token keyword">int</span> right<span class="token punctuation">,</span> <span class="token keyword">int</span> root<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>l <span class="token operator">&lt;=</span> left <span class="token operator">&amp;&amp;</span> right <span class="token operator">&lt;=</span> r<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">return</span> max<span class="token punctuation">[</span>root<span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>

            <span class="token keyword">int</span> mid <span class="token operator">=</span> <span class="token punctuation">(</span>left <span class="token operator">+</span> right<span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">;</span>
            <span class="token function">pushDown</span><span class="token punctuation">(</span>root<span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token keyword">int</span> result <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>l <span class="token operator">&lt;=</span> mid<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                result <span class="token operator">=</span> <span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">max</span><span class="token punctuation">(</span>result<span class="token punctuation">,</span> <span class="token function">query</span><span class="token punctuation">(</span>l<span class="token punctuation">,</span> r<span class="token punctuation">,</span> left<span class="token punctuation">,</span> mid<span class="token punctuation">,</span> root <span class="token operator">*</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>

            <span class="token keyword">if</span><span class="token punctuation">(</span>r <span class="token operator">></span> mid<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                result <span class="token operator">=</span> <span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">max</span><span class="token punctuation">(</span>result<span class="token punctuation">,</span> <span class="token function">query</span><span class="token punctuation">(</span>l<span class="token punctuation">,</span> r<span class="token punctuation">,</span> mid <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">,</span> right<span class="token punctuation">,</span> root <span class="token operator">*</span> <span class="token number">2</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">return</span> result<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 获取每一步下降的正方形的最高点</span>
    <span class="token keyword">public</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">></span></span> <span class="token function">fallingSquares</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token punctuation">]</span> positions<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">></span></span> result <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 将边界方块值压缩，减少线段树长度</span>
        <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">,</span> <span class="token class-name">Integer</span><span class="token punctuation">></span></span> map <span class="token operator">=</span> <span class="token function">index</span><span class="token punctuation">(</span>positions<span class="token punctuation">)</span><span class="token punctuation">;</span>
        
        <span class="token comment">// 初始化线段树</span>
        <span class="token keyword">int</span> n <span class="token operator">=</span> map<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">SegmentTree</span> segmentTree <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SegmentTree</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> max <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> position <span class="token operator">:</span> positions<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 获取左边界</span>
            <span class="token keyword">int</span> l <span class="token operator">=</span> map<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>position<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// 获取右边界</span>
            <span class="token keyword">int</span> r <span class="token operator">=</span> map<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>position<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">+</span> position<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// 获取l～r范围上面的最大值高度： 查询当前方块位置的高度并加上当前方块的高度</span>
            <span class="token keyword">int</span> height <span class="token operator">=</span> segmentTree<span class="token punctuation">.</span><span class="token function">query</span><span class="token punctuation">(</span>l<span class="token punctuation">,</span> r<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> n<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">+</span> position<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token comment">// 获取最大的方块高度</span>
            max <span class="token operator">=</span> <span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">max</span><span class="token punctuation">(</span>max<span class="token punctuation">,</span> height<span class="token punctuation">)</span><span class="token punctuation">;</span>
            result<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>max<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// 将l～r范围的高度全部都更新为height</span>
            segmentTree<span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span>l<span class="token punctuation">,</span> r<span class="token punctuation">,</span> height<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> n<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> result<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">,</span> <span class="token class-name">Integer</span><span class="token punctuation">></span></span> <span class="token function">index</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token punctuation">]</span> positions<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 有序存入方块的左边边界和右边界的值</span>
        <span class="token class-name">TreeSet</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">></span></span> pos <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">TreeSet</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> arr <span class="token operator">:</span> positions<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            pos<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>arr<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            pos<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>arr<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">+</span> arr<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">,</span> <span class="token class-name">Integer</span><span class="token punctuation">></span></span> map <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> count <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Integer</span> index <span class="token operator">:</span> pos<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            map<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>index<span class="token punctuation">,</span> <span class="token operator">++</span>count<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> map<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>总结：线段树主要是解决数组区域字段批量更新的场景，遇到这种场景就可以考虑使用线段树。先忙的indexTree也是批量更新区间值和查询的方式，区别点在于indexTree在解决二维或三维数组的区间更新和查询的效率要好很多。</p>
<h2 id="二、indextree" tabindex="-1"><a class="header-anchor" href="#二、indextree" aria-hidden="true">#</a> 二、indexTree</h2>
<h3 id="_1、介绍-1" tabindex="-1"><a class="header-anchor" href="#_1、介绍-1" aria-hidden="true">#</a> 1、介绍</h3>
<p>indexTree是一种利用二进制位数的计算从而找到一种能快速支持数组区间更新和查询数组一种方式，GPT介绍如下：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>"indexTree" 是指索引树（Index Tree）的一种数据结构，也称为树状数组（Binary Indexed Tree）。

索引树是一种可以高效支持区间修改和区间查询操作的数据结构。它主要用于解决频繁更新某个序列中元素值，并需要快速计算区间和的问题。

索引树的基本思想是利用二进制的特性来维护区间和。对于一个长度为 n 的序列，索引树使用一个长度为 n+1 的数组来存储元素，并利用数组下标与二进制表示进行映射关系。

索引树的每个节点代表一段连续的元素区间，如节点 i 表示区间 [i-k+1, i]，其中 k 是 i 的最低有效位所包含的连续 0 的个数。每个节点上存储了区间内元素的累加和，即从下标 i-k+1 到 i 的所有元素之和。

索引树的构建过程需要 O(nlogn) 的时间复杂度，其中 n 是序列的长度。但一旦构建完成后，单次区间查询的时间复杂度为 O(logn)，单次区间修改的时间复杂度同样为 O(logn)。

索引树广泛应用于各种需要高效计算区间和的场景，例如范围求和查询、逆序对计数等。由于其较低的时间复杂度以及相对简单的实现，索引树成为了一种非常有用的数据结构。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2、代码" tabindex="-1"><a class="header-anchor" href="#_2、代码" aria-hidden="true">#</a> 2、代码</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">IndexTree</span><span class="token punctuation">{</span>

        <span class="token keyword">private</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> tree<span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token keyword">int</span> n<span class="token punctuation">;</span>

        <span class="token comment">// 0位置不使用</span>
        <span class="token keyword">public</span> <span class="token class-name">IndexTree</span><span class="token punctuation">(</span><span class="token keyword">int</span> size<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            n <span class="token operator">=</span> size<span class="token punctuation">;</span>
            tree <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span>n <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token doc-comment comment">/**
         * 计算当前位置的累加和
         *
         * <span class="token keyword">@param</span> <span class="token parameter">index</span> 需要累加的位置
         * <span class="token keyword">@return</span> 累加值
         */</span>
        <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">sum</span><span class="token punctuation">(</span><span class="token keyword">int</span> index<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">int</span> result <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
            <span class="token keyword">while</span> <span class="token punctuation">(</span>index <span class="token operator">></span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                result <span class="token operator">+=</span> tree<span class="token punctuation">[</span>index<span class="token punctuation">]</span><span class="token punctuation">;</span>
                <span class="token comment">// 将二进制的1去掉</span>
                index <span class="token operator">-=</span> index <span class="token operator">&amp;</span> <span class="token operator">-</span>index<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">return</span> result<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token doc-comment comment">/**
         * 在index位置上加上指定值
         *
         * <span class="token keyword">@param</span> <span class="token parameter">index</span> 指定下标位置上
         * <span class="token keyword">@param</span> <span class="token parameter">d</span> 需要增加的值
         */</span>
        <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">int</span> index<span class="token punctuation">,</span> <span class="token keyword">int</span> d<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">while</span> <span class="token punctuation">(</span>index <span class="token operator">&lt;=</span> n<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">// 依次更新受影响的数据</span>
                tree<span class="token punctuation">[</span>index<span class="token punctuation">]</span> <span class="token operator">+=</span> d<span class="token punctuation">;</span>
                <span class="token comment">// 计算出需要同步更新数据的位置，将index位置二进制的1依次加进去</span>
                index <span class="token operator">+=</span> index <span class="token operator">&amp;</span> <span class="token operator">-</span>index<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3、二维数组的累加和计算" tabindex="-1"><a class="header-anchor" href="#_3、二维数组的累加和计算" aria-hidden="true">#</a> 3、二维数组的累加和计算</h3>
<p>https://leetcode.com/problems/range-sum-query-2d-mutable</p>
<p>只是把代码copy过来，没有仔细理解。二进制替换找位置的方式只是记忆，没有搞清楚前因后果</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">NumMatrix</span><span class="token punctuation">{</span>

        <span class="token keyword">private</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token punctuation">]</span> tree<span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token punctuation">]</span> nums<span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token keyword">int</span> <span class="token class-name">N</span><span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token keyword">int</span> <span class="token class-name">M</span><span class="token punctuation">;</span>

        <span class="token comment">// 初始化二维数组</span>
        <span class="token keyword">public</span> <span class="token class-name">NumMatrix</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token punctuation">]</span> matrix<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>matrix<span class="token punctuation">.</span>length <span class="token operator">==</span> <span class="token number">0</span> <span class="token operator">||</span> matrix<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>length <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">return</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token class-name">N</span> <span class="token operator">=</span> matrix<span class="token punctuation">.</span>length<span class="token punctuation">;</span>
            <span class="token class-name">M</span> <span class="token operator">=</span> matrix<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>length<span class="token punctuation">;</span>
            tree <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token class-name">N</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token class-name">M</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
            nums <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token class-name">N</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token class-name">M</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token class-name">N</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> j <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> j <span class="token operator">&lt;</span> <span class="token class-name">M</span><span class="token punctuation">;</span> j<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token function">update</span><span class="token punctuation">(</span>i<span class="token punctuation">,</span> j<span class="token punctuation">,</span> matrix<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// 计算累加和</span>
        <span class="token keyword">private</span> <span class="token keyword">int</span> <span class="token function">sum</span><span class="token punctuation">(</span><span class="token keyword">int</span> row<span class="token punctuation">,</span> <span class="token keyword">int</span> col<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">int</span> sum <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> row <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">></span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">-=</span> i <span class="token operator">&amp;</span> <span class="token punctuation">(</span><span class="token operator">-</span>i<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> j <span class="token operator">=</span> col <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span> j <span class="token operator">></span> <span class="token number">0</span><span class="token punctuation">;</span> j <span class="token operator">-=</span> j <span class="token operator">&amp;</span> <span class="token punctuation">(</span><span class="token operator">-</span>j<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    sum <span class="token operator">+=</span> tree<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">return</span> sum<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// 更新二维数组里面的值</span>
        <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">update</span><span class="token punctuation">(</span><span class="token keyword">int</span> row<span class="token punctuation">,</span> <span class="token keyword">int</span> col<span class="token punctuation">,</span> <span class="token keyword">int</span> val<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">N</span> <span class="token operator">==</span> <span class="token number">0</span> <span class="token operator">||</span> <span class="token class-name">M</span> <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">return</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">int</span> add <span class="token operator">=</span> val <span class="token operator">-</span> nums<span class="token punctuation">[</span>row<span class="token punctuation">]</span><span class="token punctuation">[</span>col<span class="token punctuation">]</span><span class="token punctuation">;</span>
            nums<span class="token punctuation">[</span>row<span class="token punctuation">]</span><span class="token punctuation">[</span>col<span class="token punctuation">]</span> <span class="token operator">=</span> val<span class="token punctuation">;</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> row <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> <span class="token class-name">N</span><span class="token punctuation">;</span> i <span class="token operator">+=</span> i <span class="token operator">&amp;</span> <span class="token punctuation">(</span><span class="token operator">-</span>i<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> j <span class="token operator">=</span> col <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span> j <span class="token operator">&lt;=</span> <span class="token class-name">M</span><span class="token punctuation">;</span> j <span class="token operator">+=</span> j <span class="token operator">&amp;</span> <span class="token punctuation">(</span><span class="token operator">-</span>j<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    tree<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">+=</span> add<span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// 计算两个坐标之间的累加和</span>
        <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">sumRegion</span><span class="token punctuation">(</span><span class="token keyword">int</span> row1<span class="token punctuation">,</span> <span class="token keyword">int</span> col1<span class="token punctuation">,</span> <span class="token keyword">int</span> row2<span class="token punctuation">,</span> <span class="token keyword">int</span> col2<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">N</span> <span class="token operator">==</span> <span class="token number">0</span> <span class="token operator">||</span> <span class="token class-name">M</span> <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">return</span> <span class="token function">sum</span><span class="token punctuation">(</span>row2<span class="token punctuation">,</span> col2<span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token function">sum</span><span class="token punctuation">(</span>row1 <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">,</span> col1 <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token function">sum</span><span class="token punctuation">(</span>row1 <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">,</span> col2<span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token function">sum</span><span class="token punctuation">(</span>row2<span class="token punctuation">,</span> col1 <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="三、ac自动机" tabindex="-1"><a class="header-anchor" href="#三、ac自动机" aria-hidden="true">#</a> 三、AC自动机</h2>
<h3 id="_1、介绍-2" tabindex="-1"><a class="header-anchor" href="#_1、介绍-2" aria-hidden="true">#</a> 1、介绍</h3>
<p>AC自动机是一种高效寻找关键字的一种算法，主要逻辑是将关键组组装成前缀树，之后通过自动跳转到下一个可能出现的关键字节点从而实现快速匹配的效果.</p>
<p><img src="https://gaoqisen.github.io/GraphBed/202307/20230707225629.png" alt="image"></p>
<p>GPT介绍:</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>AC自动机（Aho-Corasick Automaton）是一种用于多模式匹配的字符串匹配算法。它可以高效地在一个文本中同时匹配多个模式串，并找到所有的匹配结果。

AC自动机的基本思想是构建一个有限状态自动机，在该自动机中每个节点表示已经匹配的模式串前缀，边表示字符转移。通过使用一些特定的数据结构和算法，AC自动机可以在匹配过程中自动跳转到下一个可能的状态，从而实现高效的多模式匹配。

AC自动机的构建过程大致可以分为以下几个步骤：

构建Trie树：将所有模式串构建成一棵Trie树，使得每个节点表示一个模式串的前缀，从根节点开始的路径表示模式串的匹配过程。

添加失败指针（Failure Pointer）：对每个节点设置一个失败指针，指向在Trie树中与当前节点相匹配且长度更短的字符串的最长后缀节点。

添加输出指针（Output Pointer）：对每个节点设置一个输出指针，指向与当前节点匹配的模式串列表。当匹配到某个节点时，依次沿着输出指针找到所有匹配的模式串。

进行状态转移：遍历文本字符序列，根据当前字符以及自动机的状态转移规则进行状态转移，并输出匹配的结果。

AC自动机可以应用于许多字符串处理问题，如关键词过滤、字典匹配、DNA序列分析等。它具有快速匹配、高效利用内存和线性时间复杂度的特点。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2、思路-1" tabindex="-1"><a class="header-anchor" href="#_2、思路-1" aria-hidden="true">#</a> 2、思路</h3>
<p>1、将每个关键字单独组装成前缀树</p>
<p>2、利用endUse字段标记字段是否使用过，end字段便于收集关键字返回</p>
<p>3、最主要的逻辑是fail指针</p>
<h3 id="_3、代码-2" tabindex="-1"><a class="header-anchor" href="#_3、代码-2" aria-hidden="true">#</a> 3、代码</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>      <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">ACAutomation</span><span class="token punctuation">{</span>

        <span class="token keyword">private</span> <span class="token class-name">Node</span> root<span class="token punctuation">;</span>

        <span class="token keyword">public</span> <span class="token class-name">ACAutomation</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            root <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Node</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token doc-comment comment">/**
         * 插入关键字,建立前缀树
         *
         * <span class="token keyword">@param</span> <span class="token parameter">s</span> 关键字字符串
         */</span>
        <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">insert</span><span class="token punctuation">(</span><span class="token class-name">String</span> s<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">char</span><span class="token punctuation">[</span><span class="token punctuation">]</span> chars <span class="token operator">=</span> s<span class="token punctuation">.</span><span class="token function">toCharArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">Node</span> cur <span class="token operator">=</span> root<span class="token punctuation">;</span>
            <span class="token keyword">int</span> index <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
            <span class="token comment">// 遍历字符</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> chars<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">// 计算出当前字符的位置</span>
                index <span class="token operator">=</span> chars<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">-</span> <span class="token char">'a'</span><span class="token punctuation">;</span>
                <span class="token comment">// 如果位置上面的值为空则创建节点</span>
                <span class="token keyword">if</span><span class="token punctuation">(</span>cur<span class="token punctuation">.</span>nexts<span class="token punctuation">[</span>index<span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    cur<span class="token punctuation">.</span>nexts<span class="token punctuation">[</span>index<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Node</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                <span class="token comment">// 当前节点赋值为index位置</span>
                cur <span class="token operator">=</span> cur<span class="token punctuation">.</span>nexts<span class="token punctuation">[</span>index<span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            cur<span class="token punctuation">.</span>end <span class="token operator">=</span> s<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token doc-comment comment">/**
         * 构建fail指向
         */</span>
        <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 宽度优先遍历</span>
            <span class="token class-name">Queue</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Node</span><span class="token punctuation">></span></span> queue <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LinkedList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            queue<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>root<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">Node</span> cur <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
            <span class="token class-name">Node</span> currentFail <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
            <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token operator">!</span>queue<span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">// 弹出父节点并获取它的子指针并指向cur（父找子）</span>
                cur <span class="token operator">=</span> queue<span class="token punctuation">.</span><span class="token function">poll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token comment">// 遍历26个字母</span>
                <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">26</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token comment">// i不存在则往后寻找</span>
                    <span class="token keyword">if</span><span class="token punctuation">(</span>cur<span class="token punctuation">.</span>nexts<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                        <span class="token keyword">continue</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                    <span class="token comment">// 将fail先指向root，找到fail则指向</span>
                    cur<span class="token punctuation">.</span>nexts<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>fail <span class="token operator">=</span> root<span class="token punctuation">;</span>
                    <span class="token comment">// 当前父节点的fail指针赋值给currentFail</span>
                    currentFail <span class="token operator">=</span> cur<span class="token punctuation">.</span>fail<span class="token punctuation">;</span>
                    <span class="token comment">// 当前父指针不为空</span>
                    <span class="token keyword">while</span> <span class="token punctuation">(</span>currentFail <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                        <span class="token comment">// 当前父指针的子节点存在i字符</span>
                        <span class="token keyword">if</span><span class="token punctuation">(</span>currentFail<span class="token punctuation">.</span>nexts<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                            <span class="token comment">// 将当前子节点的i位置的fail指针指向 当前父指针子节点的i字符</span>
                            cur<span class="token punctuation">.</span>nexts<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>fail <span class="token operator">=</span> currentFail<span class="token punctuation">.</span>nexts<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
                            <span class="token keyword">break</span><span class="token punctuation">;</span>
                        <span class="token punctuation">}</span>
                        <span class="token comment">// 一直往fail指针循环找</span>
                        currentFail <span class="token operator">=</span> currentFail<span class="token punctuation">.</span>fail<span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                    queue<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>cur<span class="token punctuation">.</span>nexts<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// 查找字符串context的关键字</span>
        <span class="token keyword">public</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">></span></span> <span class="token function">containWords</span><span class="token punctuation">(</span><span class="token class-name">String</span> content<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">char</span><span class="token punctuation">[</span><span class="token punctuation">]</span> chars <span class="token operator">=</span> content<span class="token punctuation">.</span><span class="token function">toCharArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">Node</span> cur <span class="token operator">=</span> root<span class="token punctuation">,</span> follow <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
            <span class="token keyword">int</span> index <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
            <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">></span></span> result <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// 遍历content字符</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> chars<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">// 获取字符的路</span>
                index <span class="token operator">=</span> chars<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">-</span> <span class="token char">'a'</span><span class="token punctuation">;</span>
                <span class="token comment">// 通过tail指针往后寻找如果一直没有找到关键字则cur指向fail</span>
                <span class="token keyword">while</span> <span class="token punctuation">(</span>cur<span class="token punctuation">.</span>nexts<span class="token punctuation">[</span>index<span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> cur <span class="token operator">!=</span> root<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token comment">// 赋值为fail指针</span>
                    cur <span class="token operator">=</span> cur<span class="token punctuation">.</span>fail<span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                <span class="token comment">// 当前节点没有找到路则指向root</span>
                cur <span class="token operator">=</span> cur<span class="token punctuation">.</span>nexts<span class="token punctuation">[</span>index<span class="token punctuation">]</span> <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">?</span> cur<span class="token punctuation">.</span>nexts<span class="token punctuation">[</span>index<span class="token punctuation">]</span> <span class="token operator">:</span> root<span class="token punctuation">;</span>
                <span class="token comment">// 通过fail指针往后遍历查找关键字</span>
                follow <span class="token operator">=</span> cur<span class="token punctuation">;</span>
                <span class="token keyword">while</span> <span class="token punctuation">(</span>follow <span class="token operator">!=</span> root<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token comment">// 使用过则往后执行</span>
                    <span class="token keyword">if</span><span class="token punctuation">(</span>follow<span class="token punctuation">.</span>endUse<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                        <span class="token keyword">break</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                    <span class="token comment">// 如果当前节点的end值不为空则命中关键字</span>
                    <span class="token keyword">if</span><span class="token punctuation">(</span>follow<span class="token punctuation">.</span>end <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                        result<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>follow<span class="token punctuation">.</span>end<span class="token punctuation">)</span><span class="token punctuation">;</span>
                        <span class="token comment">// 标记以获取</span>
                        follow<span class="token punctuation">.</span>endUse <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                    <span class="token comment">// 往后寻找其他关键字</span>
                    follow <span class="token operator">=</span> follow<span class="token punctuation">.</span>fail<span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">return</span> result<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">Node</span><span class="token punctuation">{</span>
        <span class="token comment">// 某个字符串的结尾，值就是字符串</span>
        <span class="token keyword">private</span> <span class="token class-name">String</span> end<span class="token punctuation">;</span>
        <span class="token comment">// 记录这个节点之前有没有使用过</span>
        <span class="token keyword">private</span> <span class="token class-name">Boolean</span> endUse<span class="token punctuation">;</span>
        <span class="token comment">// 指向相同节点的指针，没有则指向头节点</span>
        <span class="token keyword">private</span> <span class="token class-name">Node</span> fail<span class="token punctuation">;</span>
        <span class="token comment">// 下一个节点列表</span>
        <span class="token keyword">private</span> <span class="token class-name">Node</span><span class="token punctuation">[</span><span class="token punctuation">]</span> nexts<span class="token punctuation">;</span>

        <span class="token keyword">public</span> <span class="token class-name">Node</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            endUse <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
            end <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
            fail <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
            nexts <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Node</span><span class="token punctuation">[</span><span class="token number">26</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


