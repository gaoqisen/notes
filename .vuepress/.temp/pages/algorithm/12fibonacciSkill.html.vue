<template><div><h2 id="一、斐波那契数列矩阵" tabindex="-1"><a class="header-anchor" href="#一、斐波那契数列矩阵" aria-hidden="true">#</a> 一、斐波那契数列矩阵</h2>
<h3 id="_1、思路" tabindex="-1"><a class="header-anchor" href="#_1、思路" aria-hidden="true">#</a> 1、思路</h3>
<p>1、根据严格递推公式计算出矩阵</p>
<p>2、根据矩阵计算出公式矩阵</p>
<p>3、计算矩阵的n次方时候进行优化</p>
<h3 id="_2、代码" tabindex="-1"><a class="header-anchor" href="#_2、代码" aria-hidden="true">#</a> 2、代码</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>    <span class="token doc-comment comment">/**
     * 普通的递归方式计算
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">f</span><span class="token punctuation">(</span><span class="token keyword">int</span> n<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Integer</span> x <span class="token operator">=</span> <span class="token function">baseCase</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>x <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> x<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token function">f</span><span class="token punctuation">(</span>n <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token function">f</span><span class="token punctuation">(</span>n <span class="token operator">-</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 通过矩阵方式
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">f1</span><span class="token punctuation">(</span><span class="token keyword">int</span> n<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 基础条件判断</span>
        <span class="token class-name">Integer</span> x <span class="token operator">=</span> <span class="token function">baseCase</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>x <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> x<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token doc-comment comment">/**
         严格递推公式: F(n) = F(n-1) + F(n-2)， 减去值最多的值是2则改递推式为二阶递推
         线性代数就是为了解决严格递推式而出现的
         则得出行列式：|F3,F2| = |F2,F1| * <span class="token punctuation">{</span>a,b<span class="token punctuation">}</span>
                                        <span class="token punctuation">{</span>c,d<span class="token punctuation">}</span>
                    |F4,F3| = |F3,F2| * <span class="token punctuation">{</span>a,b<span class="token punctuation">}</span>
                                        <span class="token punctuation">{</span>c,d<span class="token punctuation">}</span>
         通过前几个简单的计算值（1，1，2，3，5，8）计算可得出基础矩阵
         则|F3,F2|：|2,1| = |1,1| * <span class="token punctuation">{</span>a,b<span class="token punctuation">}</span>
                                   <span class="token punctuation">{</span>c,d<span class="token punctuation">}</span>
         根据矩阵乘法求出： 1*a + 1*c = 2， 1*b + 1*d = 1
         则|F4,F3|：|3,2| = |2,1| * <span class="token punctuation">{</span>a,b<span class="token punctuation">}</span>
                                   <span class="token punctuation">{</span>c,d<span class="token punctuation">}</span>
         根据矩阵乘法求出： 2*a + 1*c = 3， 2*b + 1*d = 2
         则更具两个式子得出base矩阵值如下：
         */</span>
        <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token punctuation">]</span> base <span class="token operator">=</span> <span class="token punctuation">{</span>
                <span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
                <span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">;</span>
        <span class="token comment">// 计算矩阵</span>
        <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token punctuation">]</span> res <span class="token operator">=</span> <span class="token function">matrixPower</span><span class="token punctuation">(</span>base<span class="token punctuation">,</span> n <span class="token operator">-</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 公式：|Fn,Fn-1| = |F2,F1| * |base|^n-2</span>
        <span class="token comment">// 替换F2和F1的值：|Fn,Fn-1| = |1,1| * |base|^n-2</span>
        <span class="token comment">// 如果base矩阵计算得出{a,b}</span>
        <span class="token comment">//                  {c,d}</span>
        <span class="token comment">// 则：Fn = 1*a + 1*c = a + c</span>
        <span class="token keyword">return</span> res<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">+</span> res<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 求出矩阵m的p次方
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token function">matrixPower</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token punctuation">]</span> m<span class="token punctuation">,</span> <span class="token keyword">int</span> p<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 对角线的值为1，其他的值为0</span>
        <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token punctuation">]</span> res <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span>m<span class="token punctuation">.</span>length<span class="token punctuation">]</span><span class="token punctuation">[</span>m<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>length<span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> res<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            res<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// 矩阵的1次方</span>
        <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token punctuation">]</span> t <span class="token operator">=</span> m<span class="token punctuation">;</span>
        <span class="token comment">// 二进制右移</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token punctuation">;</span>p <span class="token operator">!=</span> <span class="token number">0</span><span class="token punctuation">;</span> p <span class="token operator">>>=</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 判断二进制末尾是否为1</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token punctuation">(</span>p <span class="token operator">&amp;</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                res <span class="token operator">=</span> <span class="token function">muliMatrix</span><span class="token punctuation">(</span>res<span class="token punctuation">,</span> t<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token comment">// 每次和自己相乘2^ 4^ 8^ ...</span>
            t <span class="token operator">=</span> <span class="token function">muliMatrix</span><span class="token punctuation">(</span>t<span class="token punctuation">,</span> t<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> res<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 两个矩阵相乘
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token function">muliMatrix</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token punctuation">]</span> a<span class="token punctuation">,</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token punctuation">]</span> b<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> n <span class="token operator">=</span> a<span class="token punctuation">.</span>length<span class="token punctuation">;</span>
        <span class="token keyword">int</span> m <span class="token operator">=</span> b<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>length<span class="token punctuation">;</span>
        <span class="token keyword">int</span> k <span class="token operator">=</span> a<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>length<span class="token punctuation">;</span> <span class="token comment">// a的列数同时也是b的行数</span>
        <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token punctuation">]</span> ans <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span>n<span class="token punctuation">]</span><span class="token punctuation">[</span>m<span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span> <span class="token punctuation">;</span> i <span class="token operator">&lt;</span> n<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> j <span class="token operator">=</span> <span class="token number">0</span> <span class="token punctuation">;</span> j <span class="token operator">&lt;</span> m<span class="token punctuation">;</span>j<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> c <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> c <span class="token operator">&lt;</span> k<span class="token punctuation">;</span> c<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    ans<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">+=</span> a<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">[</span>c<span class="token punctuation">]</span> <span class="token operator">*</span> b<span class="token punctuation">[</span>c<span class="token punctuation">]</span><span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> ans<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">Integer</span> <span class="token function">baseCase</span><span class="token punctuation">(</span><span class="token keyword">int</span> n<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>n <span class="token operator">&lt;</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>n <span class="token operator">==</span> <span class="token number">1</span> <span class="token operator">||</span> n <span class="token operator">==</span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3、结论" tabindex="-1"><a class="header-anchor" href="#_3、结论" aria-hidden="true">#</a> 3、结论</h3>
<p>如果某个递归，除了初始项之外，具有如下的形式</p>
<p>F(N) = C1 * F(N) + C2 * F(N-1) + … + Ck * F(N-k) ( C1…Ck 和k都是常数)并且这个递归的表达式是严格的、不随条件转移的</p>
<p>那么都存在类似斐波那契数列的优化，时间复杂度都能优化成O(logN)</p>
<h2 id="二、返回n年后牛的数量" tabindex="-1"><a class="header-anchor" href="#二、返回n年后牛的数量" aria-hidden="true">#</a> 二、返回n年后牛的数量</h2>
<h3 id="_1、题目" tabindex="-1"><a class="header-anchor" href="#_1、题目" aria-hidden="true">#</a> 1、题目</h3>
<p>第一年农场有1只成熟的母牛A，往后的每年：</p>
<p>1）每一只成熟的母牛都会生一只母牛</p>
<p>2）每一只新出生的母牛都在出生的第三年成熟</p>
<p>3）每一只母牛永远不会死</p>
<p>返回N年后牛的数量</p>
<h3 id="_2、思路" tabindex="-1"><a class="header-anchor" href="#_2、思路" aria-hidden="true">#</a> 2、思路</h3>
<p>1、将题目按照每年牛的数量进行整理，观察得出：F(n) = F(n-1)  + F(n-3)</p>
<p>2、近4年牛的数量分别为：1，2，3，4，6，9 ...。</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>有行列式：|F4,F3,F2| = |F3,F2,F2| * |3*3|
    则：|4,3,2|=|3,2,1| * {a,b,c}
       									 {d,e,f}
       									 {g,h,i}
    计算行列式：3a+2d+g=4
    					3b+2e+h=3
    					3c+2f+i=2
    则：|6,4,3|=|4,3,2| * {a,b,c}
       									 {d,e,f}
       									 {g,h,i}
    计算行列式：4a+3d+2g=6
    					4b+3e+2h=4
    					4c+3f+2i=3
    ...
    往后计算则得出a=1,d=0,g=1,b=1,e=0,h=0,c=0,f=1,i=0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>3、和之前的方式一样计算矩阵的n次方</p>
<p>4、则基础项F(n)=3a+2d+g</p>
<h3 id="_3、代码" tabindex="-1"><a class="header-anchor" href="#_3、代码" aria-hidden="true">#</a> 3、代码</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>	  <span class="token comment">// 计算n年后牛的数量</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">countCowNum</span><span class="token punctuation">(</span><span class="token keyword">int</span> n<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>n <span class="token operator">&lt;</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>n <span class="token operator">==</span> <span class="token number">1</span> <span class="token operator">||</span> n <span class="token operator">==</span> <span class="token number">2</span> <span class="token operator">||</span> n <span class="token operator">==</span> <span class="token number">3</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> n<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// 基础矩阵，通过计算数据后推演得出</span>
        <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token punctuation">]</span> baseCase <span class="token operator">=</span> <span class="token punctuation">{</span>
                <span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
                <span class="token punctuation">{</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
                <span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token punctuation">]</span> res <span class="token operator">=</span> <span class="token function">matrixPower</span><span class="token punctuation">(</span>baseCase<span class="token punctuation">,</span> n <span class="token operator">-</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 通过行列式计算得出</span>
        <span class="token keyword">return</span> <span class="token number">3</span> <span class="token operator">*</span> res<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">+</span> <span class="token number">2</span> <span class="token operator">*</span> res<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">+</span> res<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="三、返回有多少达标的字符串" tabindex="-1"><a class="header-anchor" href="#三、返回有多少达标的字符串" aria-hidden="true">#</a> 三、返回有多少达标的字符串</h2>
<h3 id="_1、题目-1" tabindex="-1"><a class="header-anchor" href="#_1、题目-1" aria-hidden="true">#</a> 1、题目</h3>
<p>给定一个数N，想象只由0和1两种字符，组成的所有长度为N的字符串如果某个字符串,任何0字符的左边都有1紧挨着,认为这个字符串达标返回有多少达标的字符串</p>
<h3 id="_2、思路-1" tabindex="-1"><a class="header-anchor" href="#_2、思路-1" aria-hidden="true">#</a> 2、思路</h3>
<p>1、分析题目得出n=1存在1个达标，n=2存在2个达标，n=3存在3个达标，n=4时5个达标，通过观察往后就是F(n) = F(n-1) + F(n-2)，和第一题的矩阵都是一样的</p>
<h3 id="_3、代码-1" tabindex="-1"><a class="header-anchor" href="#_3、代码-1" aria-hidden="true">#</a> 3、代码</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>	    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">getNumber</span><span class="token punctuation">(</span><span class="token keyword">int</span> n<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>n <span class="token operator">&lt;</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>n <span class="token operator">==</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token punctuation">]</span> base <span class="token operator">=</span> <span class="token punctuation">{</span>
                <span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
                <span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">;</span>
        <span class="token comment">// 计算矩阵</span>
        <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token punctuation">]</span> res <span class="token operator">=</span> <span class="token function">matrixPower</span><span class="token punctuation">(</span>base<span class="token punctuation">,</span> n <span class="token operator">-</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token doc-comment comment">/**
         Fn = (Fn-1) + (Fn-2)
         |Fn,Fn-1| = |F2,F1| * <span class="token punctuation">{</span>2*2<span class="token punctuation">}</span>^n-2
         则：Fn = |2,1| * <span class="token punctuation">{</span>2*2<span class="token punctuation">}</span>^n-2
               = |2,1| * <span class="token punctuation">{</span>a,b<span class="token punctuation">}</span>
                         <span class="token punctuation">{</span>c,d<span class="token punctuation">}</span>
               = 2a + 1c
         */</span>
        <span class="token keyword">return</span> <span class="token number">2</span> <span class="token operator">*</span> res<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">+</span> res<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


