<template><div><h2 id="一、基本概念" tabindex="-1"><a class="header-anchor" href="#一、基本概念" aria-hidden="true">#</a> 一、基本概念</h2>
<ul>
<li>
<p>算法: 同一个问题的不同解决方法,算法往往是针对特定数据结构的</p>
</li>
<li>
<p>时间测量：计算算法时间差、幅度不够循环来凑(扩大数据量)</p>
</li>
<li>
<p>空间测算: 数据占用的空间越小越好</p>
</li>
<li>
<p>常数时间操作：执行时间固定的都是常数操作（算数运算、位运算、赋值、比较、数组寻址）。 反之执行时间不固定的操作都不是常数时间的操作（链表寻址去取数）</p>
</li>
<li>
<p>时间复杂度（最重要的指标）：算法的时间复杂度随着规模的增加，算法运行的时间增长率，通常用大O标记</p>
<ul>
<li>
<table>
<thead>
<tr>
<th>标记</th>
<th>解释</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td>O(1)</td>
<td>常数阶</td>
<td>算法的运行时间不随输入的规模增加而变化，例如查找数组中的第一个元素</td>
</tr>
<tr>
<td>O(logN)</td>
<td>对数阶</td>
<td>运行时间随着数据增加而相对较慢增长，例如二分查找。循环次数是n/2（从数组的中间选择一个随机点进行查找，然后重复这个过程）</td>
</tr>
<tr>
<td>O(n)</td>
<td>线性阶</td>
<td>时间随着n的变化而线性变化（随着处理数据量的增加，处理时间也会增加）。比如遍历数组中的所有元素</td>
</tr>
<tr>
<td>O(N*logN)</td>
<td>线性对数阶</td>
<td>算法的运行时间随着输入规模略微快于线性增长，如快速排序。将O(logN)循环n次</td>
</tr>
<tr>
<td>O(N^2)</td>
<td>平方阶</td>
<td>算法的运行时间随着输入规模呈平方级别增长，例如冒泡排序和插入排序。O(n)嵌套循环2次</td>
</tr>
<tr>
<td>O(N^3)</td>
<td>立方阶</td>
<td>嵌套3次循环n次</td>
</tr>
<tr>
<td>O(N^k)</td>
<td>K次方阶</td>
<td>嵌套n次循环</td>
</tr>
<tr>
<td>O(2^N)</td>
<td>指数阶</td>
<td>算法的运行时间随着输入规模呈指数级别增长，例如求解汉诺塔问题。时间根据数量指数增长</td>
</tr>
</tbody>
</table>
</li>
<li>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token comment">// O(n)</span>
<span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> i<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span> i<span class="token operator">&lt;</span><span class="token number">3</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// O(n^2)</span>
<span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> arr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> i<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span> i<span class="token operator">&lt;</span><span class="token number">3</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> j<span class="token punctuation">;</span> j <span class="token operator">&lt;</span> <span class="token number">3</span><span class="token punctuation">;</span> j<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>arr<span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
</li>
<li>
<p>额外空间复杂度：除开出参和入参的空间外，额外需要开辟空间去处理的称为额外空间</p>
<ul>
<li>
<table>
<thead>
<tr>
<th>标记</th>
<th>解释</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td>O(1)</td>
<td>常数阶</td>
<td>没有循环</td>
</tr>
<tr>
<td>O(n)</td>
<td>线性阶</td>
<td>时间随着n的变化而变化</td>
</tr>
<tr>
<td>O(n^2)</td>
<td>平方阶</td>
<td>嵌套O(n)</td>
</tr>
</tbody>
</table>
</li>
</ul>
</li>
<li>
<p>常数项：随机数数据直接测试</p>
</li>
<li>
<p>最优解：时间复杂度尽量低、空间复杂度尽量低。常数间操作优化不纳入最优解</p>
</li>
<li>
<p>对数器：用来验证自己的算法，对数器是特别重要的，写对数器的过程就是练习coding能力的时候。大样本随机测试，检查算法是否正确，用足够多的样本和正确的算法计算结果样本去对比被验证的算法结果(用已有的排序算法和自己写的排序算法都去处理数据，之后将处理的结果对比一下是否一致)</p>
</li>
<li>
<p>二分法：每次把数据分为两份处理。O(logn)</p>
</li>
</ul>
<h2 id="二、数据结构的三要素" tabindex="-1"><a class="header-anchor" href="#二、数据结构的三要素" aria-hidden="true">#</a> 二、数据结构的三要素</h2>
<p>1、数据的逻辑结构</p>
<p><img src="https://gaoqisen.github.io/GraphBed/202310/20231017230543.png" alt="数据的逻辑结构分类图"></p>
<p>集合、线性结构、树形结构、网状结构（图）</p>
<p>2、数据的存储结构</p>
<p>顺序存储：逻辑上相邻的结构在物理上也是相邻的</p>
<p>链式存储：通过元素指针表示程序的逻辑结构</p>
<p>散列表存储：顺序存储+散列（通过关键字计算hash值）</p>
<p>索引存储：顺序存储+索引（通过关键字建立索引表）</p>
<p>3、数据的运算</p>
<p>运算包括运算定义和实现： 定义针对逻辑结构，指出元算的功能。实现针对存储结构，指出运算的具体操作步骤。</p>
<h2 id="三、五个重要特性和好算法" tabindex="-1"><a class="header-anchor" href="#三、五个重要特性和好算法" aria-hidden="true">#</a> 三、五个重要特性和好算法</h2>
<p>1、有穷性：算法在又穷个步骤能执行完，每个步骤在有穷时间内执行完</p>
<p>2、确定性：每条指令都有确切的含义，相同的输入有相同的输出</p>
<p>3、可行性：可以通过已有的基本运算执行有限次完成</p>
<p>4、输入：有零个或多个输入</p>
<p>5、输出：有零个或多个输出</p>
<p>好的算法应该达到以下目标：</p>
<ol>
<li>正确：能够正确的解决问题</li>
<li>可读性：可以阅读，帮助人们理解</li>
<li>健壮性：非法数据输入时，能够做出反应而不致于产生莫名其妙的错误</li>
<li>高效率和低存储：执行时间（时间复杂度）和存储空间（空间复杂度）要尽可能小，一般都与数据规模有关</li>
</ol>
</div></template>


