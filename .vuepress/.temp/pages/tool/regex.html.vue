<template><div><h2 id="一、常用正则表达式" tabindex="-1"><a class="header-anchor" href="#一、常用正则表达式" aria-hidden="true">#</a> 一、常用正则表达式</h2>
<ul>
<li>
<p>在线操作：https://www.bejson.com/othertools/regex/</p>
</li>
<li>
<p>在线解析：https://jex.im/regulex/#!flags=&amp;re=%5E(%3F%3A(%3F%3A%5C%2B%7C00)86)%3F1%5Cd%7B10%7D%24</p>
</li>
<li>
<p>js需要在正则前后加/，例：<code v-pre>/^(?:(?:\+|00)86)?1\d{10}$/</code></p>
</li>
</ul>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// 匹配手机手机号码 +8613000000000｜008613000000000｜13000000000000</span>
<span class="token operator">^</span><span class="token punctuation">(</span><span class="token operator">?</span><span class="token operator">:</span><span class="token punctuation">(</span><span class="token operator">?</span><span class="token operator">:</span>\<span class="token operator">+</span><span class="token operator">|</span><span class="token number">00</span><span class="token punctuation">)</span><span class="token number">86</span><span class="token punctuation">)</span><span class="token operator">?</span><span class="token number">1</span>\d<span class="token punctuation">{</span><span class="token number">10</span><span class="token punctuation">}</span>$

<span class="token comment">// 1～999</span>
<span class="token operator">^</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token operator">-</span><span class="token number">9</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token operator">-</span><span class="token number">9</span><span class="token punctuation">]</span><span class="token punctuation">{</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">}</span><span class="token operator">|</span><span class="token number">1000</span><span class="token punctuation">)</span>$

<span class="token comment">// 两个以上的中文字符</span>
<span class="token operator">^</span><span class="token punctuation">[</span>\u4e00<span class="token operator">-</span>\u9fa5<span class="token punctuation">]</span><span class="token punctuation">{</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token punctuation">}</span>$
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="二、语法分类" tabindex="-1"><a class="header-anchor" href="#二、语法分类" aria-hidden="true">#</a> 二、语法分类</h2>
<h3 id="_2-1-数量表示" tabindex="-1"><a class="header-anchor" href="#_2-1-数量表示" aria-hidden="true">#</a> 2.1 数量表示</h3>
<h3 id="_2-2-字符" tabindex="-1"><a class="header-anchor" href="#_2-2-字符" aria-hidden="true">#</a> 2.2 字符</h3>
<h3 id="_2-3-锚点-边界" tabindex="-1"><a class="header-anchor" href="#_2-3-锚点-边界" aria-hidden="true">#</a> 2.3 锚点/边界</h3>
<h3 id="_2-4-预查断言" tabindex="-1"><a class="header-anchor" href="#_2-4-预查断言" aria-hidden="true">#</a> 2.4 预查断言</h3>
<h3 id="_2-5-分组引用" tabindex="-1"><a class="header-anchor" href="#_2-5-分组引用" aria-hidden="true">#</a> 2.5 分组引用</h3>
<h3 id="_2-6-特殊标志" tabindex="-1"><a class="header-anchor" href="#_2-6-特殊标志" aria-hidden="true">#</a> 2.6 特殊标志</h3>
<p>参考：https://www.r2coding.com/#/?id=%e6%ad%a3%e5%88%99%e8%a1%a8%e8%be%be%e5%bc%8f</p>
</div></template>


