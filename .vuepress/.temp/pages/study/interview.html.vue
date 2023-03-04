<template><div><h2 id="一、索引问题" tabindex="-1"><a class="header-anchor" href="#一、索引问题" aria-hidden="true">#</a> 一、索引问题</h2>
<h3 id="_1-1-从数据结构角度" tabindex="-1"><a class="header-anchor" href="#_1-1-从数据结构角度" aria-hidden="true">#</a> 1.1 从数据结构角度</h3>
<ol>
<li>B+Tree索引: 适用于查找范围内的数据</li>
<li>hash索引: 适用于随机访问的场合，查找每条数据的时间都是一样的。</li>
<li>Fulltext索引: 查找文本中的关键字。</li>
<li>R-Tree索引: 查询比较接近的数据</li>
</ol>
<h3 id="_1-2-物理存储角度" tabindex="-1"><a class="header-anchor" href="#_1-2-物理存储角度" aria-hidden="true">#</a> 1.2 物理存储角度</h3>
<ol>
<li>
<p>聚集索引: 表数据按照索引的顺序来存储</p>
<p>InnoDB的主键使用的就是聚簇索引，MyISAM不管是主键还是二级索引都是使用的非聚簇索引。</p>
</li>
<li>
<p>非聚集索引: 表数据存储顺序与索引的顺序无关</p>
</li>
</ol>
<h3 id="_1-3-逻辑角度" tabindex="-1"><a class="header-anchor" href="#_1-3-逻辑角度" aria-hidden="true">#</a> 1.3 逻辑角度</h3>
<ol>
<li>普通索引和单列索引: 唯一的任务就是加快数据的访问速度</li>
<li>多列索引: 符合最左原则: key index(a,b,c)相当于创建了三个索引a,ab,abc。不支持bc索引。</li>
<li>唯一索引: 允许有空值，索引列的值必须唯一</li>
<li>空间索引</li>
</ol>
<table>
<thead>
<tr>
<th>区别</th>
<th>主键</th>
<th>唯一</th>
</tr>
</thead>
<tbody>
<tr>
<td>是否能为空</td>
<td>不能</td>
<td>能</td>
</tr>
<tr>
<td>是否能作为外键</td>
<td>能</td>
<td>不能</td>
</tr>
<tr>
<td>是否只能有一个</td>
<td>是</td>
<td>不是</td>
</tr>
<tr>
<td>包含关系</td>
<td>包含唯一索引</td>
<td>不一定是主键</td>
</tr>
</tbody>
</table>
<h3 id="_1-2-聚簇索引" tabindex="-1"><a class="header-anchor" href="#_1-2-聚簇索引" aria-hidden="true">#</a> 1.2 聚簇索引</h3>
<h2 id="二、mysql的引擎对比" tabindex="-1"><a class="header-anchor" href="#二、mysql的引擎对比" aria-hidden="true">#</a> 二、Mysql的引擎对比</h2>
<h3 id="_2-1-innodb" tabindex="-1"><a class="header-anchor" href="#_2-1-innodb" aria-hidden="true">#</a> 2.1 InnoDB</h3>
<p>支持事务、支持外键、支持崩溃修复能力和并发控制、支持行级锁和表级锁</p>
<h3 id="_2-2-myisam" tabindex="-1"><a class="header-anchor" href="#_2-2-myisam" aria-hidden="true">#</a> 2.2 MyISAM</h3>
<p>插入速度快、空间和内存使用比较低、只支持表级锁。不支持事务，安全性不高</p>
<h2 id="三、类加载器" tabindex="-1"><a class="header-anchor" href="#三、类加载器" aria-hidden="true">#</a> 三、类加载器</h2>
<p>单独学习: https://gaoqisen.github.io/java/classloader.html</p>
<h2 id="四、hashmap原理" tabindex="-1"><a class="header-anchor" href="#四、hashmap原理" aria-hidden="true">#</a> 四、HashMap原理</h2>
<ol>
<li>
<p>通过key的hashCode经过扰动函数处理过后得到hash值</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token comment">// 扰动函数: 使用扰动函数可以减少碰撞，防止不同的hashcode的高位不同但低位相同导致的hash冲突</span>
<span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">int</span> <span class="token function">hash</span><span class="token punctuation">(</span><span class="token class-name">Object</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// key.hashCode(): 返回的就是散列值就是hashcode</span>
  <span class="token comment">// ^: 的意思就是按位异或</span>
  <span class="token comment">// >>>: 无符号右移，忽略符号位，空位用0补齐</span>
  <span class="token keyword">int</span> h<span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token punctuation">(</span>key <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token operator">?</span> <span class="token number">0</span> <span class="token operator">:</span> <span class="token punctuation">(</span>h <span class="token operator">=</span> key<span class="token punctuation">.</span><span class="token function">hashCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">^</span> <span class="token punctuation">(</span>h <span class="token operator">>>></span> <span class="token number">16</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>通过(n-1)&amp;hash判断当前元素存在的位置，如果当前位置已经存在值则对比key是否一样，如果一样就替换值，如果不一样就通过拉链法解决冲突。</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code> 		<span class="token keyword">final</span> <span class="token class-name">V</span> <span class="token function">putVal</span><span class="token punctuation">(</span><span class="token keyword">int</span> hash<span class="token punctuation">,</span> <span class="token class-name">K</span> key<span class="token punctuation">,</span> <span class="token class-name">V</span> value<span class="token punctuation">,</span> <span class="token keyword">boolean</span> onlyIfAbsent<span class="token punctuation">,</span>
                   <span class="token keyword">boolean</span> evict<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span><span class="token class-name">V</span><span class="token punctuation">></span></span><span class="token punctuation">[</span><span class="token punctuation">]</span> tab<span class="token punctuation">;</span> <span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span><span class="token class-name">V</span><span class="token punctuation">></span></span> p<span class="token punctuation">;</span> <span class="token keyword">int</span> n<span class="token punctuation">,</span> i<span class="token punctuation">;</span>
   			<span class="token comment">// 判断键值对数组table[i]是否为空或为null，否则执行resize()进行扩容；</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>tab <span class="token operator">=</span> table<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">||</span> <span class="token punctuation">(</span>n <span class="token operator">=</span> tab<span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span>
            n <span class="token operator">=</span> <span class="token punctuation">(</span>tab <span class="token operator">=</span> <span class="token function">resize</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span>length<span class="token punctuation">;</span>
   			<span class="token comment">// 根据键值key计算hash值得到插入的数组索引i，如果table[i]==null，直接新建节点添加</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>p <span class="token operator">=</span> tab<span class="token punctuation">[</span>i <span class="token operator">=</span> <span class="token punctuation">(</span>n <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">&amp;</span> hash<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
            tab<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">newNode</span><span class="token punctuation">(</span>hash<span class="token punctuation">,</span> key<span class="token punctuation">,</span> value<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span><span class="token class-name">V</span><span class="token punctuation">></span></span> e<span class="token punctuation">;</span> <span class="token class-name">K</span> k<span class="token punctuation">;</span>
          	<span class="token comment">// 判断table[i]的首个元素是否和key一样，如果相同直接覆盖value，这里的相同指的是hashCode以及equals</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>p<span class="token punctuation">.</span>hash <span class="token operator">==</span> hash <span class="token operator">&amp;&amp;</span>
                <span class="token punctuation">(</span><span class="token punctuation">(</span>k <span class="token operator">=</span> p<span class="token punctuation">.</span>key<span class="token punctuation">)</span> <span class="token operator">==</span> key <span class="token operator">||</span> <span class="token punctuation">(</span>key <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> key<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>k<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                e <span class="token operator">=</span> p<span class="token punctuation">;</span>
          	<span class="token comment">// 判断table[i] 是否为treeNode，即table[i] 是否是红黑树，如果是红黑树，则直接在树中插入键值对</span>
            <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>p <span class="token keyword">instanceof</span> <span class="token class-name">TreeNode</span><span class="token punctuation">)</span>
                e <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token class-name">TreeNode</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span><span class="token class-name">V</span><span class="token punctuation">></span></span><span class="token punctuation">)</span>p<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">putTreeVal</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> tab<span class="token punctuation">,</span> hash<span class="token punctuation">,</span> key<span class="token punctuation">,</span> value<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">else</span> <span class="token punctuation">{</span>
              	<span class="token comment">// 遍历table[i]，判断链表长度是否大于8，大于8的话把链表转换为红黑树，在红黑树中执行插入操作，否则进行链表的插入操作；遍历过程中若发现key已经存在直接覆盖value即可</span>
                <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> binCount <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> <span class="token punctuation">;</span> <span class="token operator">++</span>binCount<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>e <span class="token operator">=</span> p<span class="token punctuation">.</span>next<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                        p<span class="token punctuation">.</span>next <span class="token operator">=</span> <span class="token function">newNode</span><span class="token punctuation">(</span>hash<span class="token punctuation">,</span> key<span class="token punctuation">,</span> value<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                        <span class="token comment">// 链表长度大于8转换为红黑树进行处理</span>
                      	<span class="token keyword">if</span> <span class="token punctuation">(</span>binCount <span class="token operator">>=</span> <span class="token constant">TREEIFY_THRESHOLD</span> <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token comment">// -1 for 1st</span>
                            <span class="token function">treeifyBin</span><span class="token punctuation">(</span>tab<span class="token punctuation">,</span> hash<span class="token punctuation">)</span><span class="token punctuation">;</span>
                        <span class="token keyword">break</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                  	<span class="token comment">// key已经存在直接覆盖value</span>
                    <span class="token keyword">if</span> <span class="token punctuation">(</span>e<span class="token punctuation">.</span>hash <span class="token operator">==</span> hash <span class="token operator">&amp;&amp;</span>
                        <span class="token punctuation">(</span><span class="token punctuation">(</span>k <span class="token operator">=</span> e<span class="token punctuation">.</span>key<span class="token punctuation">)</span> <span class="token operator">==</span> key <span class="token operator">||</span> <span class="token punctuation">(</span>key <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> key<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>k<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                        <span class="token keyword">break</span><span class="token punctuation">;</span>
                    p <span class="token operator">=</span> e<span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>e <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// existing mapping for key</span>
                <span class="token class-name">V</span> oldValue <span class="token operator">=</span> e<span class="token punctuation">.</span>value<span class="token punctuation">;</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>onlyIfAbsent <span class="token operator">||</span> oldValue <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
                    e<span class="token punctuation">.</span>value <span class="token operator">=</span> value<span class="token punctuation">;</span>
                <span class="token function">afterNodeAccess</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">return</span> oldValue<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token operator">++</span>modCount<span class="token punctuation">;</span>
   			<span class="token comment">// // 插入成功后，判断实际存在的键值对数量size是否超多了最大容量threshold，如果超过，进行扩容。</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">++</span>size <span class="token operator">></span> threshold<span class="token punctuation">)</span>
            <span class="token function">resize</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">afterNodeInsertion</span><span class="token punctuation">(</span>evict<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<blockquote>
<p>拉链法: 将链表和数组结合，如果遇到hash冲突就将值放到链表中</p>
<p>JDK1.8: 当链表的长度大于阀值(默认8)之后，将链表转为了红黑树减少搜索时间。</p>
</blockquote>
<h2 id="五、排序算法原理" tabindex="-1"><a class="header-anchor" href="#五、排序算法原理" aria-hidden="true">#</a> 五、排序算法原理</h2>
<p>Arrays.sort(list.toArray());源码</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">sort</span><span class="token punctuation">(</span><span class="token class-name">Object</span><span class="token punctuation">[</span><span class="token punctuation">]</span> a<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">LegacyMergeSort</span><span class="token punctuation">.</span>userRequested<span class="token punctuation">)</span>
    <span class="token comment">// 归并排序</span>
    <span class="token function">legacyMergeSort</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">else</span>
    <span class="token comment">// Tim优化后的归并排序</span>
    <span class="token class-name">ComparableTimSort</span><span class="token punctuation">.</span><span class="token function">sort</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> a<span class="token punctuation">.</span>length<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-1-legacymergesort-a-源码" tabindex="-1"><a class="header-anchor" href="#_5-1-legacymergesort-a-源码" aria-hidden="true">#</a> 5.1 legacyMergeSort(a)源码</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>		<span class="token doc-comment comment">/** To be removed in a future release. 在以后的版本中会删除*/</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">legacyMergeSort</span><span class="token punctuation">(</span><span class="token class-name">Object</span><span class="token punctuation">[</span><span class="token punctuation">]</span> a<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Object</span><span class="token punctuation">[</span><span class="token punctuation">]</span> aux <span class="token operator">=</span> a<span class="token punctuation">.</span><span class="token function">clone</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">mergeSort</span><span class="token punctuation">(</span>aux<span class="token punctuation">,</span> a<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> a<span class="token punctuation">.</span>length<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>mergeSort(aux, a, 0, a.length, 0);归并算法源码</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>		<span class="token annotation punctuation">@SuppressWarnings</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token string">"unchecked"</span><span class="token punctuation">,</span> <span class="token string">"rawtypes"</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">mergeSort</span><span class="token punctuation">(</span><span class="token class-name">Object</span><span class="token punctuation">[</span><span class="token punctuation">]</span> src<span class="token punctuation">,</span>
                                  <span class="token class-name">Object</span><span class="token punctuation">[</span><span class="token punctuation">]</span> dest<span class="token punctuation">,</span>
                                  <span class="token keyword">int</span> low<span class="token punctuation">,</span>
                                  <span class="token keyword">int</span> high<span class="token punctuation">,</span>
                                  <span class="token keyword">int</span> off<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> length <span class="token operator">=</span> high <span class="token operator">-</span> low<span class="token punctuation">;</span>

        <span class="token comment">// 如果数组长度小于INSERTIONSORT_THRESHOLD(7),直接用插入排序</span>
        <span class="token comment">// Insertion sort on smallest arrays</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>length <span class="token operator">&lt;</span> <span class="token constant">INSERTIONSORT_THRESHOLD</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i<span class="token operator">=</span>low<span class="token punctuation">;</span> i<span class="token operator">&lt;</span>high<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span>
                <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> j<span class="token operator">=</span>i<span class="token punctuation">;</span> j<span class="token operator">></span>low <span class="token operator">&amp;&amp;</span>
                         <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token class-name">Comparable</span><span class="token punctuation">)</span> dest<span class="token punctuation">[</span>j<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">compareTo</span><span class="token punctuation">(</span>dest<span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token operator">></span><span class="token number">0</span><span class="token punctuation">;</span> j<span class="token operator">--</span><span class="token punctuation">)</span>
                    <span class="token function">swap</span><span class="token punctuation">(</span>dest<span class="token punctuation">,</span> j<span class="token punctuation">,</span> j<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
				<span class="token comment">// 归并排序</span>
        <span class="token comment">// Recursively sort halves of dest into src</span>
        <span class="token keyword">int</span> destLow  <span class="token operator">=</span> low<span class="token punctuation">;</span>
        <span class="token keyword">int</span> destHigh <span class="token operator">=</span> high<span class="token punctuation">;</span>
        low  <span class="token operator">+=</span> off<span class="token punctuation">;</span>
        high <span class="token operator">+=</span> off<span class="token punctuation">;</span>
        <span class="token keyword">int</span> mid <span class="token operator">=</span> <span class="token punctuation">(</span>low <span class="token operator">+</span> high<span class="token punctuation">)</span> <span class="token operator">>>></span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token function">mergeSort</span><span class="token punctuation">(</span>dest<span class="token punctuation">,</span> src<span class="token punctuation">,</span> low<span class="token punctuation">,</span> mid<span class="token punctuation">,</span> <span class="token operator">-</span>off<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">mergeSort</span><span class="token punctuation">(</span>dest<span class="token punctuation">,</span> src<span class="token punctuation">,</span> mid<span class="token punctuation">,</span> high<span class="token punctuation">,</span> <span class="token operator">-</span>off<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// If list is already sorted, just copy from src to dest.  This is an</span>
        <span class="token comment">// optimization that results in faster sorts for nearly ordered lists.</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token class-name">Comparable</span><span class="token punctuation">)</span>src<span class="token punctuation">[</span>mid<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">compareTo</span><span class="token punctuation">(</span>src<span class="token punctuation">[</span>mid<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">&lt;=</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">arraycopy</span><span class="token punctuation">(</span>src<span class="token punctuation">,</span> low<span class="token punctuation">,</span> dest<span class="token punctuation">,</span> destLow<span class="token punctuation">,</span> length<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// Merge sorted halves (now in src) into dest</span>
        <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> destLow<span class="token punctuation">,</span> p <span class="token operator">=</span> low<span class="token punctuation">,</span> q <span class="token operator">=</span> mid<span class="token punctuation">;</span> i <span class="token operator">&lt;</span> destHigh<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>q <span class="token operator">>=</span> high <span class="token operator">||</span> p <span class="token operator">&lt;</span> mid <span class="token operator">&amp;&amp;</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token class-name">Comparable</span><span class="token punctuation">)</span>src<span class="token punctuation">[</span>p<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">compareTo</span><span class="token punctuation">(</span>src<span class="token punctuation">[</span>q<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token operator">&lt;=</span><span class="token number">0</span><span class="token punctuation">)</span>
                dest<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> src<span class="token punctuation">[</span>p<span class="token operator">++</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token keyword">else</span>
                dest<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> src<span class="token punctuation">[</span>q<span class="token operator">++</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-2-comparabletimsort-sort源码" tabindex="-1"><a class="header-anchor" href="#_5-2-comparabletimsort-sort源码" aria-hidden="true">#</a> 5.2 ComparableTimSort.sort源码</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>		<span class="token comment">// 本质是插入排序和归并排序的结合体</span>
    <span class="token comment">// 1.是稳定的排序算法，最坏时间复杂度为O(N*log(N))</span>
		<span class="token comment">// 2.对小块进行插入排序，然后进行归并排序</span>
		<span class="token comment">// TimSort算法是由Tim Peters在2002提出并首先实现在了phtyon中，是结合了合并排序（merge sort）和插入		排序（insertion sort）的一种高效稳定的算法。算法原理看这里 			https://blog.csdn.net/yangzhongblog/article/details/8184707</span>
		<span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">sort</span><span class="token punctuation">(</span><span class="token class-name">Object</span><span class="token punctuation">[</span><span class="token punctuation">]</span> a<span class="token punctuation">,</span> <span class="token keyword">int</span> lo<span class="token punctuation">,</span> <span class="token keyword">int</span> hi<span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">[</span><span class="token punctuation">]</span> work<span class="token punctuation">,</span> <span class="token keyword">int</span> workBase<span class="token punctuation">,</span> <span class="token keyword">int</span> workLen<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 保证数组的合法性</span>
  			<span class="token keyword">assert</span> a <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> lo <span class="token operator">>=</span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> lo <span class="token operator">&lt;=</span> hi <span class="token operator">&amp;&amp;</span> hi <span class="token operator">&lt;=</span> a<span class="token punctuation">.</span>length<span class="token punctuation">;</span>

        <span class="token keyword">int</span> nRemaining  <span class="token operator">=</span> hi <span class="token operator">-</span> lo<span class="token punctuation">;</span>
        <span class="token comment">// 对于只有0|1个元素的数组，不需要进行排序</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>nRemaining <span class="token operator">&lt;</span> <span class="token number">2</span><span class="token punctuation">)</span>
            <span class="token keyword">return</span><span class="token punctuation">;</span>  <span class="token comment">// Arrays of size 0 and 1 are always sorted</span>

        <span class="token comment">// If array is small, do a "mini-TimSort" with no merges</span>
  			<span class="token comment">// 如果数组长度小于32个则调用binarySort，二分插入排序</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>nRemaining <span class="token operator">&lt;</span> <span class="token constant">MIN_MERGE</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          	<span class="token comment">// 计算数组头部递增或递减的的序列长度，如果是递减，则翻转，保持升序</span>
            <span class="token keyword">int</span> initRunLen <span class="token operator">=</span> <span class="token function">countRunAndMakeAscending</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> lo<span class="token punctuation">,</span> hi<span class="token punctuation">)</span><span class="token punctuation">;</span>
          	<span class="token comment">// 使用二叉插入排序对在initRunLen后的元素进行排序</span>
            <span class="token function">binarySort</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> lo<span class="token punctuation">,</span> hi<span class="token punctuation">,</span> lo <span class="token operator">+</span> initRunLen<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token doc-comment comment">/**
         * March over the array once, left to right, finding natural runs,
         * extending short natural runs to minRun elements, and merging runs
         * to maintain stack invariant.
         */</span>
        <span class="token class-name">ComparableTimSort</span> ts <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ComparableTimSort</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> work<span class="token punctuation">,</span> workBase<span class="token punctuation">,</span> workLen<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 计算最小run的长度</span>
  			<span class="token keyword">int</span> minRun <span class="token operator">=</span> <span class="token function">minRunLength</span><span class="token punctuation">(</span>nRemaining<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">do</span> <span class="token punctuation">{</span>
            <span class="token comment">// Identify next run</span>
          	<span class="token comment">// 计算当前排序的run的长度，如果为递减数组则翻转</span>
            <span class="token keyword">int</span> runLen <span class="token operator">=</span> <span class="token function">countRunAndMakeAscending</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> lo<span class="token punctuation">,</span> hi<span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token comment">// If run is short, extend to min(minRun, nRemaining)</span>
          	<span class="token comment">// 如果当前run的长度小于minRun，则进行扩展，在扩展过程中使用二叉排序来排序扩展的的元素</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>runLen <span class="token operator">&lt;</span> minRun<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">int</span> force <span class="token operator">=</span> nRemaining <span class="token operator">&lt;=</span> minRun <span class="token operator">?</span> nRemaining <span class="token operator">:</span> minRun<span class="token punctuation">;</span>
                <span class="token function">binarySort</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> lo<span class="token punctuation">,</span> lo <span class="token operator">+</span> force<span class="token punctuation">,</span> lo <span class="token operator">+</span> runLen<span class="token punctuation">)</span><span class="token punctuation">;</span>
                runLen <span class="token operator">=</span> force<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>

            <span class="token comment">// Push run onto pending-run stack, and maybe merge</span>
            <span class="token comment">// 将此run放入栈中</span>
          	ts<span class="token punctuation">.</span><span class="token function">pushRun</span><span class="token punctuation">(</span>lo<span class="token punctuation">,</span> runLen<span class="token punctuation">)</span><span class="token punctuation">;</span>
          	<span class="token comment">// 执行合并逻辑，合并的时候也做了一些优化</span>
            ts<span class="token punctuation">.</span><span class="token function">mergeCollapse</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token comment">// Advance to find next run</span>
            lo <span class="token operator">+=</span> runLen<span class="token punctuation">;</span>
            nRemaining <span class="token operator">-=</span> runLen<span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">while</span> <span class="token punctuation">(</span>nRemaining <span class="token operator">!=</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// Merge all remaining runs to complete sort</span>
        <span class="token keyword">assert</span> lo <span class="token operator">==</span> hi<span class="token punctuation">;</span>
  			<span class="token comment">// 保证最后的run都被合并</span>
        ts<span class="token punctuation">.</span><span class="token function">mergeForceCollapse</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">assert</span> ts<span class="token punctuation">.</span>stackSize <span class="token operator">==</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>binarySort原码(二叉插入排序)</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>		<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">binarySort</span><span class="token punctuation">(</span><span class="token class-name">Object</span><span class="token punctuation">[</span><span class="token punctuation">]</span> a<span class="token punctuation">,</span> <span class="token keyword">int</span> lo<span class="token punctuation">,</span> <span class="token keyword">int</span> hi<span class="token punctuation">,</span> <span class="token keyword">int</span> start<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">assert</span> lo <span class="token operator">&lt;=</span> start <span class="token operator">&amp;&amp;</span> start <span class="token operator">&lt;=</span> hi<span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>start <span class="token operator">==</span> lo<span class="token punctuation">)</span>
            start<span class="token operator">++</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span> <span class="token punctuation">;</span> start <span class="token operator">&lt;</span> hi<span class="token punctuation">;</span> start<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">Comparable</span> pivot <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">Comparable</span><span class="token punctuation">)</span> a<span class="token punctuation">[</span>start<span class="token punctuation">]</span><span class="token punctuation">;</span>

            <span class="token comment">// Set left (and right) to the index where a[start] (pivot) belongs</span>
            <span class="token keyword">int</span> left <span class="token operator">=</span> lo<span class="token punctuation">;</span>
            <span class="token keyword">int</span> right <span class="token operator">=</span> start<span class="token punctuation">;</span>
            <span class="token keyword">assert</span> left <span class="token operator">&lt;=</span> right<span class="token punctuation">;</span>
            <span class="token comment">/*
             * Invariants:
             *   pivot >= all in [lo, left).
             *   pivot &lt;  all in [right, start).
             */</span>
            <span class="token keyword">while</span> <span class="token punctuation">(</span>left <span class="token operator">&lt;</span> right<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">int</span> mid <span class="token operator">=</span> <span class="token punctuation">(</span>left <span class="token operator">+</span> right<span class="token punctuation">)</span> <span class="token operator">>>></span> <span class="token number">1</span><span class="token punctuation">;</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>pivot<span class="token punctuation">.</span><span class="token function">compareTo</span><span class="token punctuation">(</span>a<span class="token punctuation">[</span>mid<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">)</span>
                    right <span class="token operator">=</span> mid<span class="token punctuation">;</span>
                <span class="token keyword">else</span>
                    left <span class="token operator">=</span> mid <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">assert</span> left <span class="token operator">==</span> right<span class="token punctuation">;</span>

            <span class="token comment">/*
             * The invariants still hold: pivot >= all in [lo, left) and
             * pivot &lt; all in [left, start), so pivot belongs at left.  Note
             * that if there are elements equal to pivot, left points to the
             * first slot after them -- that's why this sort is stable.
             * Slide elements over to make room for pivot.
             */</span>
            <span class="token keyword">int</span> n <span class="token operator">=</span> start <span class="token operator">-</span> left<span class="token punctuation">;</span>  <span class="token comment">// The number of elements to move</span>
            <span class="token comment">// Switch is just an optimization for arraycopy in default case</span>
            <span class="token keyword">switch</span> <span class="token punctuation">(</span>n<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">case</span> <span class="token number">2</span><span class="token operator">:</span>  a<span class="token punctuation">[</span>left <span class="token operator">+</span> <span class="token number">2</span><span class="token punctuation">]</span> <span class="token operator">=</span> a<span class="token punctuation">[</span>left <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
                <span class="token keyword">case</span> <span class="token number">1</span><span class="token operator">:</span>  a<span class="token punctuation">[</span>left <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> a<span class="token punctuation">[</span>left<span class="token punctuation">]</span><span class="token punctuation">;</span>
                         <span class="token keyword">break</span><span class="token punctuation">;</span>
                <span class="token keyword">default</span><span class="token operator">:</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">arraycopy</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> left<span class="token punctuation">,</span> a<span class="token punctuation">,</span> left <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">,</span> n<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            a<span class="token punctuation">[</span>left<span class="token punctuation">]</span> <span class="token operator">=</span> pivot<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="六、concurrenthashmap原理" tabindex="-1"><a class="header-anchor" href="#六、concurrenthashmap原理" aria-hidden="true">#</a> 六、ConcurrentHashMap原理</h2>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>		<span class="token keyword">public</span> <span class="token class-name">V</span> <span class="token function">put</span><span class="token punctuation">(</span><span class="token class-name">K</span> key<span class="token punctuation">,</span> <span class="token class-name">V</span> value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">putVal</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> value<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/** Implementation for put and putIfAbsent */</span>
    <span class="token keyword">final</span> <span class="token class-name">V</span> <span class="token function">putVal</span><span class="token punctuation">(</span><span class="token class-name">K</span> key<span class="token punctuation">,</span> <span class="token class-name">V</span> value<span class="token punctuation">,</span> <span class="token keyword">boolean</span> onlyIfAbsent<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 不允许插入空值，否则报错空指针</span>
      	<span class="token keyword">if</span> <span class="token punctuation">(</span>key <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">||</span> value <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">NullPointerException</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 计算key的hash值</span>
      	<span class="token keyword">int</span> hash <span class="token operator">=</span> <span class="token function">spread</span><span class="token punctuation">(</span>key<span class="token punctuation">.</span><span class="token function">hashCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> binCount <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
      	<span class="token comment">// 更新元素是使用的CAS机制，需要不断尝试，直到成功为止</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span><span class="token class-name">V</span><span class="token punctuation">></span></span><span class="token punctuation">[</span><span class="token punctuation">]</span> tab <span class="token operator">=</span> table<span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          	<span class="token comment">// f：链表或红黑二叉树头结点，向链表中添加元素时，需要synchronized获取f的锁。</span>
            <span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span><span class="token class-name">V</span><span class="token punctuation">></span></span> f<span class="token punctuation">;</span> <span class="token keyword">int</span> n<span class="token punctuation">,</span> i<span class="token punctuation">,</span> fh<span class="token punctuation">;</span>
          	<span class="token comment">// 判断Node[]数组是否初始化，没有则进行初始化操作</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>tab <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">||</span> <span class="token punctuation">(</span>n <span class="token operator">=</span> tab<span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span>
                tab <span class="token operator">=</span> <span class="token function">initTable</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
          	<span class="token comment">// 通过hash定位Node[]数组的索引坐标，是否有Node节点，如果没有则使用CAS进行添加（链表的头结点），添加失败则进入下次循环。</span>
            <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>f <span class="token operator">=</span> <span class="token function">tabAt</span><span class="token punctuation">(</span>tab<span class="token punctuation">,</span> i <span class="token operator">=</span> <span class="token punctuation">(</span>n <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">&amp;</span> hash<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">casTabAt</span><span class="token punctuation">(</span>tab<span class="token punctuation">,</span> i<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
                             <span class="token keyword">new</span> <span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span><span class="token class-name">V</span><span class="token punctuation">></span></span><span class="token punctuation">(</span>hash<span class="token punctuation">,</span> key<span class="token punctuation">,</span> value<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                    <span class="token keyword">break</span><span class="token punctuation">;</span>                   <span class="token comment">// no lock when adding to empty bin</span>
            <span class="token punctuation">}</span>
          	<span class="token comment">// 检查到内部正在移动元素（Node[] 数组扩容）</span>
            <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>fh <span class="token operator">=</span> f<span class="token punctuation">.</span>hash<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token constant">MOVED</span><span class="token punctuation">)</span>
              	<span class="token comment">// //帮助它扩容</span>
                tab <span class="token operator">=</span> <span class="token function">helpTransfer</span><span class="token punctuation">(</span>tab<span class="token punctuation">,</span> f<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">else</span> <span class="token punctuation">{</span>
                <span class="token class-name">V</span> oldVal <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
              	<span class="token comment">// 锁住链表或红黑二叉树的头结点</span>
                <span class="token keyword">synchronized</span> <span class="token punctuation">(</span>f<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                  	<span class="token comment">// 判断f是否是链表的头结点</span>
                    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">tabAt</span><span class="token punctuation">(</span>tab<span class="token punctuation">,</span> i<span class="token punctuation">)</span> <span class="token operator">==</span> f<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                      	<span class="token comment">// 如果fh>=0 是链表节点</span>
                        <span class="token keyword">if</span> <span class="token punctuation">(</span>fh <span class="token operator">>=</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                            binCount <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
                          	<span class="token comment">// 遍历链表所有节点</span>
                            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span><span class="token class-name">V</span><span class="token punctuation">></span></span> e <span class="token operator">=</span> f<span class="token punctuation">;</span><span class="token punctuation">;</span> <span class="token operator">++</span>binCount<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                                <span class="token class-name">K</span> ek<span class="token punctuation">;</span>
                              	<span class="token comment">// 如果节点存在，则更新value</span>
                                <span class="token keyword">if</span> <span class="token punctuation">(</span>e<span class="token punctuation">.</span>hash <span class="token operator">==</span> hash <span class="token operator">&amp;&amp;</span>
                                    <span class="token punctuation">(</span><span class="token punctuation">(</span>ek <span class="token operator">=</span> e<span class="token punctuation">.</span>key<span class="token punctuation">)</span> <span class="token operator">==</span> key <span class="token operator">||</span>
                                     <span class="token punctuation">(</span>ek <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> key<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>ek<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                                    oldVal <span class="token operator">=</span> e<span class="token punctuation">.</span>val<span class="token punctuation">;</span>
                                    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>onlyIfAbsent<span class="token punctuation">)</span>
                                        e<span class="token punctuation">.</span>val <span class="token operator">=</span> value<span class="token punctuation">;</span>
                                    <span class="token keyword">break</span><span class="token punctuation">;</span>
                                <span class="token punctuation">}</span>
                              	<span class="token comment">// 不存在则在链表尾部添加新节点。</span>
                                <span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span><span class="token class-name">V</span><span class="token punctuation">></span></span> pred <span class="token operator">=</span> e<span class="token punctuation">;</span>
                                <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>e <span class="token operator">=</span> e<span class="token punctuation">.</span>next<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                                    pred<span class="token punctuation">.</span>next <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span><span class="token class-name">V</span><span class="token punctuation">></span></span><span class="token punctuation">(</span>hash<span class="token punctuation">,</span> key<span class="token punctuation">,</span>
                                                              value<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                                    <span class="token keyword">break</span><span class="token punctuation">;</span>
                                <span class="token punctuation">}</span>
                            <span class="token punctuation">}</span>
                        <span class="token punctuation">}</span>
                      	<span class="token comment">// TreeBin是红黑二叉树节点</span>
                        <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>f <span class="token keyword">instanceof</span> <span class="token class-name">TreeBin</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                            <span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span><span class="token class-name">V</span><span class="token punctuation">></span></span> p<span class="token punctuation">;</span>
                            binCount <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
                          	<span class="token comment">// 添加树节点</span>
                            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>p <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token class-name">TreeBin</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span><span class="token class-name">V</span><span class="token punctuation">></span></span><span class="token punctuation">)</span>f<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">putTreeVal</span><span class="token punctuation">(</span>hash<span class="token punctuation">,</span> key<span class="token punctuation">,</span>
                                                           value<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                                oldVal <span class="token operator">=</span> p<span class="token punctuation">.</span>val<span class="token punctuation">;</span>
                                <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>onlyIfAbsent<span class="token punctuation">)</span>
                                    p<span class="token punctuation">.</span>val <span class="token operator">=</span> value<span class="token punctuation">;</span>
                            <span class="token punctuation">}</span>
                        <span class="token punctuation">}</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>binCount <span class="token operator">!=</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                  	<span class="token comment">// 如果链表长度已经达到临界值8 就需要把链表转换为树结构</span>
                    <span class="token keyword">if</span> <span class="token punctuation">(</span>binCount <span class="token operator">>=</span> <span class="token constant">TREEIFY_THRESHOLD</span><span class="token punctuation">)</span>
                        <span class="token function">treeifyBin</span><span class="token punctuation">(</span>tab<span class="token punctuation">,</span> i<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token keyword">if</span> <span class="token punctuation">(</span>oldVal <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
                        <span class="token keyword">return</span> oldVal<span class="token punctuation">;</span>
                    <span class="token keyword">break</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      	<span class="token comment">// 将当前ConcurrentHashMap的size数量+1</span>
        <span class="token function">addCount</span><span class="token punctuation">(</span><span class="token number">1L</span><span class="token punctuation">,</span> binCount<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol>
<li>
<p>判断Node[]数组是否初始化，没有则进行初始化操作</p>
</li>
<li>
<p>通过hash定位Node[]数组的索引坐标，是否有Node节点，如果没有则使用CAS进行添加（链表的头结点），添加失败则进入下次循环。</p>
</li>
<li>
<p>检查到内部正在扩容，如果正在扩容，就帮助它一块扩容。</p>
</li>
<li>
<p>如果f!=null，则使用synchronized锁住f元素（链表/红黑二叉树的头元素）
4.1 如果是Node(链表结构)则执行链表的添加操作。
4.2 如果是TreeNode(树型结果)则执行树添加操作。</p>
</li>
<li>
<p>判断链表长度已经达到临界值8 就需要把链表转换为树结构。</p>
</li>
</ol>
<h2 id="七、秒杀库存问题" tabindex="-1"><a class="header-anchor" href="#七、秒杀库存问题" aria-hidden="true">#</a> 七、秒杀库存问题</h2>
<ol>
<li>前端限制(防止普通用户): 用户只能请求一次，一次之后按钮变灰。限制用户只能在10分钟之内只能提交一次等，大概拦住了80%的请求。</li>
<li>防止接口重复调用(防止程序员写for循环): 同一个uid限制访问频度，60秒内请求的接口返回相同的页面(页面缓存)</li>
<li>后端限流: 异步处理、消息队列、并发限制.对于超过系统负载的请求，可以选择直接拒绝，以此来对系统进行保护，保证在极限压力的情况下，系统有合理范围内的处理能力</li>
<li>下单减库存: 用户下单的时候就减库存，这种情况会出现用户下单了但是不支付的情况</li>
<li>付款减库存: 用户支付之后减库存，这种情况会出现多个人下单了，但是付款的时候没有库存了。</li>
<li>预扣库存: 用户下单之后预先减去库存，之后提示用户2分钟之内进行付款，如果不支付就回滚数据不进行库存减少。</li>
<li>防止多并发时数据错误问题: 修改库存的时候，判断当前取回的库存在修改的时候是否一致。“Compare And Set”（CAS）</li>
</ol>
<h2 id="八、数据库锁" tabindex="-1"><a class="header-anchor" href="#八、数据库锁" aria-hidden="true">#</a> 八、数据库锁</h2>
<p>悲观锁: 认为别的线程会修改值</p>
<p>乐观锁: 认为别的线程不会修改值（cas）</p>
<p>如何防止锁表，数据库死锁问题</p>
<h2 id="九、如何自己实现削峰填谷、限流等" tabindex="-1"><a class="header-anchor" href="#九、如何自己实现削峰填谷、限流等" aria-hidden="true">#</a> 九、如何自己实现削峰填谷、限流等</h2>
<p>令牌桶算法</p>
<h2 id="十、事务级别" tabindex="-1"><a class="header-anchor" href="#十、事务级别" aria-hidden="true">#</a> 十、事务级别</h2>
<ol>
<li>未提交</li>
<li>已提交</li>
<li>可重复读</li>
<li>序列化</li>
</ol>
<h2 id="十一、消息队列积压500万条数据如何处理" tabindex="-1"><a class="header-anchor" href="#十一、消息队列积压500万条数据如何处理" aria-hidden="true">#</a> 十一、消息队列积压500万条数据如何处理</h2>
<p>只能操作临时扩容，以更快的速度去消费数据</p>
<h2 id="十二、方法重写的注解的区别" tabindex="-1"><a class="header-anchor" href="#十二、方法重写的注解的区别" aria-hidden="true">#</a> 十二、方法重写的注解的区别</h2>
<ol>
<li><em>一般来说，写与不写没什么区别，JVM可以自识别</em></li>
<li><em>写的情况下：即说明子类要覆盖基类的方法，基类必须存在方法 （控制类型public,protected，返回值，参数列表类型）与子类方法完成一致的方法，否则会报错（找不到被Override的方法）。</em></li>
<li><em>在不写@Override注解的情况下，当基类存在与子类各种条件都符合的方法时实现覆盖；如果条件不符合时，则是当成新定义的方法使用。</em></li>
<li><em>所以如果想覆盖基类方法时，最好还是写上@Override注解，这样有利于编译器帮助检查错误</em></li>
</ol>
<h2 id="十三、springboot和spring的区别" tabindex="-1"><a class="header-anchor" href="#十三、springboot和spring的区别" aria-hidden="true">#</a> 十三、Springboot和Spring的区别</h2>
<p>SpringBoot是在Spring上面封装的，简化了xml配置，使开发、测试、部署更加方便。SpringBoot有如下特点：</p>
<ol>
<li>嵌入式tomcat等</li>
<li>提供starters简化构建配置</li>
<li>尽可能自动化配置spring</li>
<li>使用java -jar 独立运行jar</li>
</ol>
<p>SpringBoot是基于Spring的一套快速开发整合包。</p>
<h2 id="十四、web攻击" tabindex="-1"><a class="header-anchor" href="#十四、web攻击" aria-hidden="true">#</a> 十四、Web攻击</h2>
<h3 id="_14-1-ddos" tabindex="-1"><a class="header-anchor" href="#_14-1-ddos" aria-hidden="true">#</a> 14.1 DDOS</h3>
<p>分布式拒绝服务攻击（distributed denial-of-service attack，DDoS）分布式拒绝服务攻击、 发送大量的正确请求到服务端，让服务端收到海量的数据后处理不过来导致服务无法使用。</p>
<h3 id="_14-2-csrf" tabindex="-1"><a class="header-anchor" href="#_14-2-csrf" aria-hidden="true">#</a> 14.2 CSRF</h3>
<p>跨站请求伪造（Cross-site request forgery，CSRF）。跨站点请求伪造。通过一些技术手段欺骗用户的浏览器去访问一个自己曾经认证过的网站并运行一些操作（如发邮件，发消息，甚至财产操作如转账和购买商品）。由于浏览器曾经认证过，所以被访问的网站会认为是真正的用户操作而去运行。这利用了web中用户身份验证的一个漏洞：<strong>简单的身份验证只能保证请求发自某个用户的浏览器，却不能保证请求本身是用户自愿发出的</strong>。</p>
<p>防范措施:</p>
<ol>
<li>检查referer首部字段，检查这个首部字段并要求请求来源的地址在同一个域名下</li>
<li>添加校验token，不通过cookie进行校验</li>
<li>输入验证码，重要接口增加验证码验证，用户输入正确验证码后方可操作，让用户明白自己当前的操作。</li>
</ol>
<h3 id="_14-3-xss攻击" tabindex="-1"><a class="header-anchor" href="#_14-3-xss攻击" aria-hidden="true">#</a> 14.3 XSS攻击</h3>
<p>跨站脚本攻击（Cross-Site Scripting, XSS），可以将代码注入到用户浏览的网页上，这种代码包括 HTML 和 JavaScript。是最普遍的Web应用安全漏洞。这类漏洞能够使得攻击者嵌入恶意脚本代码到正常用户会访问到的页面中，当正常用户访问该页面时，则可导致嵌入的恶意脚本代码的执行，从而达到恶意攻击用户的目的。</p>
<p>防范措施:</p>
<ol>
<li>将cookie设置为HttpOnly可以防止JavaScript脚本调用</li>
<li>过滤特殊字符,例如将script转为其它字符</li>
</ol>
<h3 id="_14-4-sql注入" tabindex="-1"><a class="header-anchor" href="#_14-4-sql注入" aria-hidden="true">#</a> 14.4 SQL注入</h3>
<p>服务器上的数据库运行非法的 SQL 语句，主要通过拼接来完成</p>
<p>防范措施:</p>
<ol>
<li>mysql关键字过滤，不允许用户输入sql关键字</li>
<li>使用预编译sql语句，没有拼接的过程</li>
<li>mybatis使用#{}传入数据</li>
</ol>
<h2 id="十五、redis的list是如何实现的" tabindex="-1"><a class="header-anchor" href="#十五、redis的list是如何实现的" aria-hidden="true">#</a> 十五、Redis的List是如何实现的</h2>
<p>是使用的链表数据结构存储的数据。</p>
<ul>
<li>版本3.2之前
<ul>
<li>压缩列表ziplist</li>
<li>双向列表linked list</li>
</ul>
</li>
<li>版本3.2之后
<ul>
<li>快速列表quicklist</li>
</ul>
</li>
</ul>
<h2 id="十六、程序运行慢生产如何调试" tabindex="-1"><a class="header-anchor" href="#十六、程序运行慢生产如何调试" aria-hidden="true">#</a> 十六、程序运行慢生产如何调试</h2>
<ol>
<li>查看数据库是否有锁表，如果有锁表排查是否是程序导致的，并kill掉锁表线程</li>
<li>查看服务器CPU是否过高，如果CPU过高可以通过jtask查看</li>
<li>判断程序是一直慢还是突然慢，通过nginx日志筛选是否有第三方恶意工具网站</li>
<li>排查程序是sql执行慢，还是程序逻辑处理太多。sql慢就进行sql优化，程序逻辑太多的话就进行缓存处理</li>
</ol>
<h2 id="十七、集群环境中功能session如何实现共享" tabindex="-1"><a class="header-anchor" href="#十七、集群环境中功能session如何实现共享" aria-hidden="true">#</a> 十七、集群环境中功能Session如何实现共享</h2>
<ol>
<li>利用公共的区域存储session例如用redis存储session实现sesison共享</li>
<li>多台服务器的sesison进行同步比如多台tomcat的session进行同步</li>
<li>利用新的机制鉴权，不用cookie-session机制。</li>
</ol>
<h2 id="十八、什么是线程安全-非线程安全" tabindex="-1"><a class="header-anchor" href="#十八、什么是线程安全-非线程安全" aria-hidden="true">#</a> 十八、什么是线程安全，非线程安全</h2>
<p>多个线程去操作同一个数据不会出现问题叫线程安全，会出现问题就是非线程安全</p>
<p>https://github.com/gaoqisen/notes/blob/master/java/threadSecurity.md</p>
<h2 id="十九、说一下观察者模式" tabindex="-1"><a class="header-anchor" href="#十九、说一下观察者模式" aria-hidden="true">#</a> 十九、说一下观察者模式</h2>
<p>https://github.com/gaoqisen/notes/blob/master/patterm/observe.md</p>
<h2 id="二十、vue原理" tabindex="-1"><a class="header-anchor" href="#二十、vue原理" aria-hidden="true">#</a> 二十、Vue原理</h2>
<p>双向数据绑定的mvvm模式</p>
<p>https://github.com/gaoqisen/notes/blob/master/web/vueBase.md</p>
<h2 id="二十一、范式" tabindex="-1"><a class="header-anchor" href="#二十一、范式" aria-hidden="true">#</a> 二十一、范式</h2>
<p>第一范式: 数据库表中的任何属性都是原子性的, 不可再分</p>
<p>第二范式:数据表里的非主属性都要和这个数据表的候选键有完全依赖关系.</p>
<p>第三范式: 在满足 2NF 的同时, 数据表中的非属性与候选键不存在传递依赖性.</p>
<h2 id="二十二、参考" tabindex="-1"><a class="header-anchor" href="#二十二、参考" aria-hidden="true">#</a> 二十二、参考</h2>
<ol>
<li>hashmap: https://zhuanlan.zhihu.com/p/21673805</li>
<li>Arrays.sort: https://my.oschina.net/u/3286119/blog/2055991</li>
<li>ConCurrentHashMap: https://www.jianshu.com/p/d10256f0ebea</li>
<li>redis list: https://zhuanlan.zhihu.com/p/102422311</li>
<li>范式: <a href="https://bigmorebig.github.io/2019/08/07/SQL%E8%BF%9B%E9%98%B6/" target="_blank" rel="noopener noreferrer">https://bigmorebig.github.io/2019/08/07/SQL%E8%BF%9B%E9%98%B6/<ExternalLinkIcon/></a></li>
<li>攻击: <a href="https://github.com/CyC2018/CS-Notes/blob/master/notes/%E6%94%BB%E5%87%BB%E6%8A%80%E6%9C%AF.md" target="_blank" rel="noopener noreferrer">https://github.com/CyC2018/CS-Notes/blob/master/notes/%E6%94%BB%E5%87%BB%E6%8A%80%E6%9C%AF.md<ExternalLinkIcon/></a></li>
</ol>
</div></template>


