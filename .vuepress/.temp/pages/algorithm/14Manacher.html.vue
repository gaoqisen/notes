<template><div><p>GPT生成：</p>
<p>Manacher算法，也称为马拉车算法，是一种用来查找一个字符串中的最长回文子串的线性时间复杂度算法。与其他常规方法不同的是，Manacher算法通过对已匹配部分的信息进行利用而非重新比较，从而达到线性时间的效果。</p>
<p>它实现步骤如下：</p>
<ol>
<li>首先，在字符串的首尾以及每个字符之间插入一个特殊字符，通常情况下选择为“#”，这样可以保证字符串奇偶性的一致性;</li>
<li>计算出一个数组P，记录以每个字符为中心的最长回文子串长度（包括该字符本身）;</li>
<li>遍历填充数组P的过程中，顺便更新当前最长回文串的位置和长度。</li>
</ol>
<p>Manacher算法时间复杂度为O(n)，具有实现简单、效率高的优点。</p>
<h2 id="一、找到最长回文子串" tabindex="-1"><a class="header-anchor" href="#一、找到最长回文子串" aria-hidden="true">#</a> 一、找到最长回文子串</h2>
<p>回文半径：回文一半的数量，如12321的回文半径为3</p>
<p>回文直径：回文的长度，如12321的回文直径为5</p>
<p>回文半径数组：每个字符的当前回文半径数组</p>
<p>最右回文右边界(R)：只要取得了最大的右边界则R往最右边移动</p>
<p>当前右边界中心点(C): 当前最右回文右边界R的回文中心点</p>
<p>最左回文左边界(L): R关于C的对称值就是L</p>
<h3 id="_1、思路" tabindex="-1"><a class="header-anchor" href="#_1、思路" aria-hidden="true">#</a> 1、思路</h3>
<p>1、将字符串用特殊字符将每个字符隔开（字符无特殊要求，不会处理到特殊字符上）</p>
<p>2、判断当前值(i)有没有被最右回文右边界(R)包含，没有包含则使用暴力对比方法</p>
<p>3、如果当前值(i)被最右回文右边界(R)包含则存在优化空间</p>
<ul>
<li>当前值(i)的对称值在回文区域在L~R里面，则i的回文区域和对称值的回文区域一致</li>
<li>当前值(i)的对称值在L~R外， 则当前值(i)的回文半径就是i～R的长度</li>
<li>当前值(i)的对称值的左边界等于L，当前值(i)的回文半径 &gt;= 对称值的回文半径。只需要再往后验证往左和往后的值是否相等即可(有可能更远)</li>
</ul>
<h3 id="_2、代码" tabindex="-1"><a class="header-anchor" href="#_2、代码" aria-hidden="true">#</a> 2、代码</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>    <span class="token doc-comment comment">/**
     * 获取最大回文子串长度
     *
     * <span class="token keyword">@param</span> <span class="token parameter">s</span> 字符串
     * <span class="token keyword">@return</span> 最大回文子串
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">manacher</span><span class="token punctuation">(</span><span class="token class-name">String</span> s<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>s <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">||</span> s<span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// 1、将字符串转化为用特殊字符隔开，任何字符都可以，在处理字符的时候不会处理到特殊字符</span>
        <span class="token keyword">char</span><span class="token punctuation">[</span><span class="token punctuation">]</span> str <span class="token operator">=</span> <span class="token function">getChars</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 回文半径数组（回文半径中的最大值/2就是返回结果）</span>
        <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> pArr <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span>str<span class="token punctuation">.</span>length<span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token comment">// 当前最右回文右边界R的回文中心点</span>
        <span class="token keyword">int</span> <span class="token class-name">C</span> <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token comment">// 最右回文右边界(R)：只要取得了最大的右边界则R往最右边移动</span>
        <span class="token keyword">int</span> <span class="token class-name">R</span> <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> max <span class="token operator">=</span> <span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token constant">MIN_VALUE</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> str<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">/*
            R > i: i在R内，则获取最小的不用验证的区域。  否则第二种情况。 否则i在R外的最少回文半径是1
            2 * C - i: i对称值的回文半径
            R -i： 当前值(i)的对称值在L~R外， 则当前值(i)的回文半径就是i～R的长度
             */</span>
            pArr<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token class-name">R</span> <span class="token operator">></span> i <span class="token operator">?</span> <span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">min</span><span class="token punctuation">(</span>pArr<span class="token punctuation">[</span><span class="token number">2</span> <span class="token operator">*</span> <span class="token class-name">C</span> <span class="token operator">-</span>  i<span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token class-name">R</span> <span class="token operator">-</span>i<span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">;</span>
            <span class="token comment">// 对比后面的值(当前i的回文数据左右两边都存在值时)</span>
            <span class="token keyword">while</span> <span class="token punctuation">(</span>i <span class="token operator">+</span> pArr<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">&lt;</span> str<span class="token punctuation">.</span>length <span class="token operator">&amp;&amp;</span> i <span class="token operator">-</span> pArr<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">></span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">// 如果左边和右边的值相等，则回文半径往后扩展，否则结束扩展</span>
                <span class="token keyword">if</span><span class="token punctuation">(</span>str<span class="token punctuation">[</span>i <span class="token operator">+</span> pArr<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">]</span> <span class="token operator">==</span> str<span class="token punctuation">[</span>i <span class="token operator">-</span> pArr<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    pArr<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token operator">++</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                    <span class="token keyword">break</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>

            <span class="token comment">// R的值往后扩</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>i <span class="token operator">+</span> pArr<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">></span> <span class="token class-name">R</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token class-name">R</span> <span class="token operator">=</span> i <span class="token operator">+</span> pArr<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
                <span class="token class-name">C</span> <span class="token operator">=</span> i<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token comment">// 获取最大的回文半径</span>
            max <span class="token operator">=</span> <span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">max</span><span class="token punctuation">(</span>max<span class="token punctuation">,</span> pArr<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// 回文半径-1就是最大回文长度(字符用特殊字符处理过)</span>
        <span class="token keyword">return</span> max <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">char</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token function">getChars</span><span class="token punctuation">(</span><span class="token class-name">String</span> str<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">char</span><span class="token punctuation">[</span><span class="token punctuation">]</span> mStr <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">char</span><span class="token punctuation">[</span>str<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">2</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token keyword">char</span><span class="token punctuation">[</span><span class="token punctuation">]</span> chars <span class="token operator">=</span> str<span class="token punctuation">.</span><span class="token function">toCharArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> index <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">!=</span> mStr<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 奇数&amp;1为1，偶数&amp;1为0</span>
            mStr<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">(</span>i <span class="token operator">&amp;</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0</span> <span class="token operator">?</span> <span class="token char">'#'</span> <span class="token operator">:</span> chars<span class="token punctuation">[</span>index<span class="token operator">++</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> mStr<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="二、字符串后添加最少字符返回组成回文" tabindex="-1"><a class="header-anchor" href="#二、字符串后添加最少字符返回组成回文" aria-hidden="true">#</a> 二、字符串后添加最少字符返回组成回文</h2>
<h3 id="_1、思路-1" tabindex="-1"><a class="header-anchor" href="#_1、思路-1" aria-hidden="true">#</a> 1、思路</h3>
<p>manacher中进行改进， 当R刚好包含所有数据时停止处理，则当前字符i就是整个字符的中心。则找到了最长回文中心点</p>
<h3 id="_2、代码-1" tabindex="-1"><a class="header-anchor" href="#_2、代码-1" aria-hidden="true">#</a> 2、代码</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>    <span class="token doc-comment comment">/**
     * 获取最大回文子串长度
     *
     * <span class="token keyword">@param</span> <span class="token parameter">s</span> 字符串
     * <span class="token keyword">@return</span> 最大回文子串
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">String</span> <span class="token function">manacher</span><span class="token punctuation">(</span><span class="token class-name">String</span> s<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>s <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">||</span> s<span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token string">""</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// 1、将字符串转化为用特殊字符隔开，任何字符都可以，在处理字符的时候不会处理到特殊字符</span>
        <span class="token keyword">char</span><span class="token punctuation">[</span><span class="token punctuation">]</span> str <span class="token operator">=</span> <span class="token function">getChars</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 回文半径数组（回文半径中的最大值/2就是返回结果）</span>
        <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> pArr <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span>str<span class="token punctuation">.</span>length<span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token comment">// 当前最右回文右边界R的回文中心点</span>
        <span class="token keyword">int</span> <span class="token class-name">C</span> <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token comment">// 最右回文右边界(R)：只要取得了最大的右边界则R往最右边移动</span>
        <span class="token keyword">int</span> <span class="token class-name">R</span> <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token comment">// 最长包含结束位置</span>
        <span class="token keyword">int</span> maxContainsEnd <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> str<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">/*
            R > i: i在R内，则获取最小的不用验证的区域。  否则第二种情况。 否则i在R外的最少回文半径是1
            2 * C - i: i对称值的回文半径
            R -i： 当前值(i)的对称值在L~R外， 则当前值(i)的回文半径就是i～R的长度
             */</span>
            pArr<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token class-name">R</span> <span class="token operator">></span> i <span class="token operator">?</span> <span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">min</span><span class="token punctuation">(</span>pArr<span class="token punctuation">[</span><span class="token number">2</span> <span class="token operator">*</span> <span class="token class-name">C</span> <span class="token operator">-</span>  i<span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token class-name">R</span> <span class="token operator">-</span>i<span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">;</span>
            <span class="token comment">// 对比后面的值(当前i的回文数据左右两边都存在值时)</span>
            <span class="token keyword">while</span> <span class="token punctuation">(</span>i <span class="token operator">+</span> pArr<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">&lt;</span> str<span class="token punctuation">.</span>length <span class="token operator">&amp;&amp;</span> i <span class="token operator">-</span> pArr<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">></span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">// 如果左边和右边的值相等，则回文半径往后扩展，否则结束扩展</span>
                <span class="token keyword">if</span><span class="token punctuation">(</span>str<span class="token punctuation">[</span>i <span class="token operator">+</span> pArr<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">]</span> <span class="token operator">==</span> str<span class="token punctuation">[</span>i <span class="token operator">-</span> pArr<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    pArr<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token operator">++</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                    <span class="token keyword">break</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>

            <span class="token comment">// R的值往后扩</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>i <span class="token operator">+</span> pArr<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">></span> <span class="token class-name">R</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token class-name">R</span> <span class="token operator">=</span> i <span class="token operator">+</span> pArr<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
                <span class="token class-name">C</span> <span class="token operator">=</span> i<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token class-name">R</span> <span class="token operator">==</span> str<span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                maxContainsEnd <span class="token operator">=</span> pArr<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
                <span class="token keyword">break</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// 将结束位置前面的字符逆序就是需要添加的字符</span>
        <span class="token keyword">char</span><span class="token punctuation">[</span><span class="token punctuation">]</span> res <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">char</span><span class="token punctuation">[</span>s<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> maxContainsEnd <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> res<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            res<span class="token punctuation">[</span>res<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span> <span class="token operator">-</span> i<span class="token punctuation">]</span> <span class="token operator">=</span> str<span class="token punctuation">[</span>i <span class="token operator">*</span> <span class="token number">2</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">char</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token function">getChars</span><span class="token punctuation">(</span><span class="token class-name">String</span> str<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">char</span><span class="token punctuation">[</span><span class="token punctuation">]</span> mStr <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">char</span><span class="token punctuation">[</span>str<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">2</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token keyword">char</span><span class="token punctuation">[</span><span class="token punctuation">]</span> chars <span class="token operator">=</span> str<span class="token punctuation">.</span><span class="token function">toCharArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> index <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">!=</span> mStr<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 奇数&amp;1为1，偶数&amp;1为0</span>
            mStr<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">(</span>i <span class="token operator">&amp;</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0</span> <span class="token operator">?</span> <span class="token char">'#'</span> <span class="token operator">:</span> chars<span class="token punctuation">[</span>index<span class="token operator">++</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> mStr<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


