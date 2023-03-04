<template><div><h2 id="一、进制" tabindex="-1"><a class="header-anchor" href="#一、进制" aria-hidden="true">#</a> 一、进制</h2>
<blockquote>
<p>进制的意思可以理解为用多少个字符去表示数字(10进制就是用10个阿拉伯数字去计数，2进制可以用0和1进行计数)，自己也可以创造出特殊的字符进行计数</p>
</blockquote>
<h3 id="_1-1-进制的计数" tabindex="-1"><a class="header-anchor" href="#_1-1-进制的计数" aria-hidden="true">#</a> 1.1 进制的计数</h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>一进制，逢1近1
二进制，逢2近1
...
十进制，逢10近1       (0,1,2,3,4,5,6,7,8,9)
...
十六进制，逢16近1 （0,1,2,3,4,5,6,7,8,9,a,b,c,d,e,f）

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>用1-4的进制去表示10进制</p>
</blockquote>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># 一进制表示（1）1，2，3，4</span>
<span class="token number">1</span>, <span class="token number">11</span>, <span class="token number">111</span>, <span class="token number">1111</span>
<span class="token comment"># 二进制表示（0，1）0，1，2，3，4, 5, 6, 7</span>
<span class="token number">0</span>, <span class="token number">1</span>, <span class="token number">10</span>, <span class="token number">11</span>, <span class="token number">100</span>, <span class="token number">101</span>, <span class="token number">110</span>, <span class="token number">111</span>
<span class="token comment"># 三进制表示(0，1，2) 0，1，2，3，4, 5, 6, 7, 8, 9</span>
<span class="token number">0</span>, <span class="token number">1</span>, <span class="token number">2</span>, <span class="token number">10</span>, <span class="token number">11</span>, <span class="token number">12</span>, <span class="token number">20</span>, <span class="token number">21</span>, <span class="token number">22</span>
<span class="token comment"># 四进制表示(0, 1, 2, 3)0，1，2，3，4, 5, 6, 7, 8, 9, 10</span>
<span class="token number">0</span>, <span class="token number">1</span>, <span class="token number">2</span>, <span class="token number">3</span>, <span class="token number">10</span>, <span class="token number">11</span>, <span class="token number">12</span>, <span class="token number">13</span>, <span class="token number">20</span>, <span class="token number">21</span>, <span class="token number">22</span>
<span class="token comment"># 六进制表示(0, 1, 2, 3, 4, 5 ... 16)</span>
<span class="token number">0</span>, <span class="token number">1</span>, <span class="token number">2</span>, <span class="token number">3</span>, <span class="token number">4</span>, <span class="token number">5</span>, <span class="token number">10</span>, <span class="token number">11</span>, <span class="token number">12</span>, <span class="token number">13</span>, <span class="token number">14</span>, <span class="token number">15</span>, <span class="token number">20</span>, <span class="token number">21</span>, <span class="token number">22</span>, <span class="token number">23</span>, <span class="token number">24</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-2-进制的运算" tabindex="-1"><a class="header-anchor" href="#_1-2-进制的运算" aria-hidden="true">#</a> 1.2 进制的运算</h3>
<h4 id="_1-2-1-8进制的加法表" tabindex="-1"><a class="header-anchor" href="#_1-2-1-8进制的加法表" aria-hidden="true">#</a> 1.2.1 8进制的加法表</h4>
<table>
<thead>
<tr>
<th>1+1=2</th>
<th></th>
<th></th>
<th></th>
<th></th>
<th></th>
<th></th>
</tr>
</thead>
<tbody>
<tr>
<td>1+2=3</td>
<td>2+2=4</td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
<tr>
<td>1+3=4</td>
<td>2+3=5</td>
<td>3+3=6</td>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
<tr>
<td>1+4=5</td>
<td>2+4=6</td>
<td>3+4=7</td>
<td>4+4=10</td>
<td></td>
<td></td>
<td></td>
</tr>
<tr>
<td>1+5=10</td>
<td>2+5=7</td>
<td>3+5=10</td>
<td>4+5=11</td>
<td>5+5=12</td>
<td></td>
<td></td>
</tr>
<tr>
<td>1+6=7</td>
<td>2+6=10</td>
<td>3+6=11</td>
<td>4+6=12</td>
<td>5+6=13</td>
<td>6+6=14</td>
<td></td>
</tr>
<tr>
<td>1+7=10</td>
<td>2+7=11</td>
<td>3+7=12</td>
<td>4+7=13</td>
<td>5+7=14</td>
<td>6+7=15</td>
<td>7+7=16</td>
</tr>
</tbody>
</table>
<h4 id="_1-2-2-8进制的乘法表" tabindex="-1"><a class="header-anchor" href="#_1-2-2-8进制的乘法表" aria-hidden="true">#</a> 1.2.2 8进制的乘法表</h4>
<table>
<thead>
<tr>
<th>1*1=1</th>
<th></th>
<th></th>
<th></th>
<th></th>
<th></th>
<th></th>
</tr>
</thead>
<tbody>
<tr>
<td>1*2=2</td>
<td>2*2=4</td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
<tr>
<td>1*3=3</td>
<td>2*3=6</td>
<td>3*3=11</td>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
<tr>
<td>1*4=4</td>
<td>2*4=10</td>
<td>3*4=14</td>
<td>4*4=20</td>
<td></td>
<td></td>
<td></td>
</tr>
<tr>
<td>1*5=5</td>
<td>2*5=12</td>
<td>3*5=17</td>
<td>4*5=24</td>
<td>5*5=31</td>
<td></td>
<td></td>
</tr>
<tr>
<td>1*6=6</td>
<td>2*6=14</td>
<td>3*6=22</td>
<td>4*6=30</td>
<td>5*6=36</td>
<td>6*6=44</td>
<td></td>
</tr>
<tr>
<td>1*7=7</td>
<td>2*7=16</td>
<td>3*7=5</td>
<td>4*7=34</td>
<td>5*7=43</td>
<td>6*7=52</td>
<td>7*7=61</td>
</tr>
</tbody>
</table>
<h4 id="_1-2-3-8进制的加法" tabindex="-1"><a class="header-anchor" href="#_1-2-3-8进制的加法" aria-hidden="true">#</a> 1.2.3 8进制的加法</h4>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code># 运算的本质就是计数
 236
+215  # 5+6等于13近1余3，3+4等于4加上之前的1为5，
-----
 453
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_1-2-4-8进制的减法" tabindex="-1"><a class="header-anchor" href="#_1-2-4-8进制的减法" aria-hidden="true">#</a> 1.2.4 8进制的减法</h4>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code> 325
-216  # 个位数5-6不够向前借1位就是15-6为7，十位数2被借了一位就是1-1位0，百位3-2位1
-----
 107
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_1-2-5-8进制的乘法" tabindex="-1"><a class="header-anchor" href="#_1-2-5-8进制的乘法" aria-hidden="true">#</a> 1.2.5 8进制的乘法</h4>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>   123
  *456  # 3*6为22进2余2，2*6为14加上之前的2为进1余6,1*6为6加上之前的1为7
------
   762  # 3*5为17进1余7，2*5为12加上之前的1为进1余3，1*5为5加上之前的1为6
  637   # 3*4为14近1余4，2*4为10加上之前的1为近1余1，1*4为4加上之前的1为5
 514    # 2+0为2，6+7为15进1余5，7+3+4+1为17近1余7，6+1+1为10近1余0，5+1为6
------
 60752
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_1-2-6-8进制的除法" tabindex="-1"><a class="header-anchor" href="#_1-2-6-8进制的除法" aria-hidden="true">#</a> 1.2.6 8进制的除法</h4>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code> 56
/12  # 除法就是要算乘法，最接近的数字。12*4为50不够，12*5为62多了。因此56/12为4还有余数
－－－
 4
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-3-二进制" tabindex="-1"><a class="header-anchor" href="#_1-3-二进制" aria-hidden="true">#</a> 1.3 二进制</h3>
<p>计算机使用的就是二进制进行计数的 , 晶体管有电表示1没电表示0。从硬件中看计算机的信号限制在0-2伏低电压(用0表示)和2-5伏高电压(用1表示)的范围。计算机的物理构成是数字电路, 数字电路的基本构成是逻辑门电路，逻辑门电路的理论基础是布尔逻辑运算，而布尔运算的结果只有两种，二进制每一位正好能表示两种布尔运算的结果。故计算机的计算都是二进制</p>
<p>1个16进制数得用 4个二进制数才能表示，因此32位的计算机的内存地址由8个16进制表示。</p>
<h3 id="_1-4-byte" tabindex="-1"><a class="header-anchor" href="#_1-4-byte" aria-hidden="true">#</a> 1.4 Byte</h3>
<p>二进制数系统中，每个0或1就是一个位(bit)。字节是常用的计算机存储空间的大小。1个字节(Byte)就等于8个位(bit)。于是在无符号的情况下(没有正负之分),1个字节最大的容量就是2^8-1＝255，00000000 就是0，也就是说一个字节能存0-255这256个数字。如果有符号的话8个位的第一个格子用来表示正号或是负号，那么11111111 就是-2^7=-128，01111111 就是127 。这样算下来也是存储了256位，这就是为什么java中一个字节的大小取值范围是-128~127了。以下计算了java中所有的基本数据类型大小的取值范围（其中浮点类型的e+38表示是乘以10的38次方，同样，e-45表示乘以10的负45次方）:</p>
<table>
<thead>
<tr>
<th>类型</th>
<th>长度字节</th>
<th>范围</th>
<th>存储位数</th>
</tr>
</thead>
<tbody>
<tr>
<td>byte(字节)</td>
<td>1</td>
<td>-128~127</td>
<td>2^8</td>
</tr>
<tr>
<td>short(短整型)</td>
<td>2</td>
<td>-32768~32767</td>
<td>2^16</td>
</tr>
<tr>
<td>int(整数)</td>
<td>4</td>
<td>-2147483648~2147483647</td>
<td>2^32</td>
</tr>
<tr>
<td>long(长整)</td>
<td>8</td>
<td>-9223372036854775808 ~ 9223372036854775807</td>
<td>2^64</td>
</tr>
<tr>
<td>char(字符)</td>
<td>2</td>
<td>0~65535</td>
<td>2^16</td>
</tr>
<tr>
<td>float(浮点)</td>
<td>4</td>
<td>3.402823e+38 ~ 1.401298e-45</td>
<td>2^32</td>
</tr>
<tr>
<td>double(双精度)</td>
<td>8</td>
<td>1.797693e+308~ 4.9000000e-324</td>
<td>2^64</td>
</tr>
<tr>
<td>boolean(布尔)</td>
<td>1</td>
<td>true~false</td>
<td>2^8</td>
</tr>
</tbody>
</table>
<p>l</p>
<p>上面的字节可以看出在计算机中用一个数的最高位来存储符号，正数为0，负数为1。</p>
<h2 id="二-原码、反码、补码" tabindex="-1"><a class="header-anchor" href="#二-原码、反码、补码" aria-hidden="true">#</a> 二 原码、反码、补码</h2>
<ul>
<li>原码：将一个整数转换为的二进制就是原码,如: 5的原码为：0000 0101；-5的原码为1000 0101</li>
<li>反码: 正数的反码就是原码，负数的符号位一定是1其余与原码取反。如：如单字节的5的反码为：0000 0101；-5的反码为1111 1010（为了解决原码做减法的问题, 出现了反码）。</li>
<li>补码：正数的补码就是原码，负数的符号位一定是1之后反码+1就是补码。如：字节的5的补码为：0000 0101；-5的原码为1111 1011（发现用反码计算减法, 结果的真值部分是正确的.，有问题的就出现在&quot;0&quot;这个特殊的数值上，为了解决这个问题就有了补码）。</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># 例子:1</span>
<span class="token comment"># 原码 0 0 0 0  0 0 0 1</span>
<span class="token comment"># 反码 0 0 0 0  0 0 0 1</span>
<span class="token comment"># 补码 0 0 0 0  0 0 0 1</span>

<span class="token comment"># 例子:-1</span>
<span class="token comment"># 原码: 1 0 0 0  0 0 0 1</span>
<span class="token comment"># 反码: 1 1 1 1  1 1 1 0</span>
<span class="token comment"># 补码: 1 1 1 1  1 1 1 1 </span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>真值：因为第一位是符号位，所以机器数的形式值就不等于真正的数值。例如上面的有符号数 10000011，其最高位1代表负，其真正数值是 -3 而不是形式值131（10000011转换成十进制等于131）。所以，为区别起见，将带符号位的机器数对应的真正数值称为机器数的真值。</li>
</ul>
<p>计算机中用加法代替了减法省去了减法器( 1-1 = 1+(-1) )，在<strong>计算机中负数的真值是用补码</strong>表示的。因为人脑可以知道第一位是符号位, 在计算的时候我们会根据符号位, 选择对真值区域的加减， 但是对于计算机, 加减乘数已经是最基础的运算, 要设计的尽量简单. 计算机辨别&quot;符号位&quot;显然会让计算机的基础电路设计变得十分复杂! 当需要一个减法时就等于加上它的相反数，既然其补码就是其相反数，我们加上其补码不就可以了。, 即: 1-1 = 1 + (-1) = 0 , 所以机器可以只有加法而没有减法, 这样计算机运算的设计就更简单了</p>
<h2 id="三、位运算" tabindex="-1"><a class="header-anchor" href="#三、位运算" aria-hidden="true">#</a> 三、位运算</h2>
<h3 id="_3-1-与运算-and" tabindex="-1"><a class="header-anchor" href="#_3-1-与运算-and" aria-hidden="true">#</a> 3.1 与运算(and &amp;)</h3>
<p>两个都为1才为1</p>
<p><img src="https://raw.githubusercontent.com/gaoqisen/GraphBed/master/202006/20200625163031.png" alt="https://raw.githubusercontent.com/gaoqisen/GraphBed/master/202006/20200625163031.png"></p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>1011 0001
0101 0010
----------
0001 0000
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-或运算-or" tabindex="-1"><a class="header-anchor" href="#_3-2-或运算-or" aria-hidden="true">#</a> 3.2 或运算(or |)</h3>
<p>其中一个为1就为1</p>
<p><img src="https://raw.githubusercontent.com/gaoqisen/GraphBed/master/202006/20200625163827.png" alt="https://raw.githubusercontent.com/gaoqisen/GraphBed/master/202006/20200625163827.png"></p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>0101 1101
1001 0001
----------
1101 1101
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-3-异或-xor" tabindex="-1"><a class="header-anchor" href="#_3-3-异或-xor" aria-hidden="true">#</a> 3.3 异或(xor ^)</h3>
<p>不相同为1</p>
<p><img src="https://gaoqisen.github.io/GraphBed/202006/20200625164434.png" alt="https://gaoqisen.github.io/GraphBed/202006/20200625164434.png"></p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>1101 0001
1010 0011
----------
0111 0010
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-4-非-not" tabindex="-1"><a class="header-anchor" href="#_3-4-非-not" aria-hidden="true">#</a> 3.4 非(not ~)</h3>
<p>0就是，1就是0，单目运算。反码的过程就是非运算</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>1110 0001
----------
0001 1110
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-5位运算-移动位" tabindex="-1"><a class="header-anchor" href="#_3-5位运算-移动位" aria-hidden="true">#</a> 3.5位运算（移动位）</h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>0000 0001 # 10进制数字为1
0000 0010 # 左移动一位，10进制数字为2 (shl &lt;&lt;)高位丢弃，地位补0
0000 0100 # 左移动一位，10进制数字为4 (shl &lt;&lt;)
0000 0010 # 右移动一位，10进制数字为2 (shr >>)地位丢弃，高位正数补0负数补1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>操作位的移动就可以让数字成倍增长。汇编语法: 左移 shl，右移 shr，与 and，或 or，非 not，异或 xor。汇编直接操作的是二进制数据。</p>
<blockquote>
<p>补充: 32位计算机和64位计算机的区别在于1. 处理数据的能力，理论上64位处理的数据要比32位高很多。2. 寻址能力。32位系统的最大寻址空间是2的32次方=4294967296（bit）= 4（GB）左右；而64位系统的最大寻址空间为2的64次方=4294967296（bit）的32次方，数值大于1亿GB。也就是意味着32位系统最多只能在4GB内存里找东西，64位系统就最大支持的内存高达亿位数，</p>
</blockquote>
<h2 id="四、位运行的加减乘除" tabindex="-1"><a class="header-anchor" href="#四、位运行的加减乘除" aria-hidden="true">#</a> 四、位运行的加减乘除</h2>
<p>4+5=?</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>0000 0100
0000 0101
---------- # 手动算的话0+0为0，1+1进1余0，0+1位1
0000 1001 

# 计算机执行原理
# 一、4和5异或，不相同为1其他为0，如果不考虑近位，异或就可以计算出结果
0000 0100
0000 0101
---------
0000 0001

# 二、4和5与运算,两个都为1才为1(判断进位，如果运算结果为0则没有进位)
0000 0100
0000 0101
---------
0000 0100

# 三、将第二步与运算的结果左移一位
0000 1000

# 四、将第一步异或出来的结果和第三步左移的结果进行异或，不相同为1其他为0
0000 0001
0000 1000
---------
0000 1001

# 五，将第一步的结果和第三步的结果进行与运行，判断是否有进位(结果都为0则没有进位)
0000 0001
0000 1000
---------
0000 0000

# 最终的结果就是最后一个与运算为0的上一个异或运算的结果0000 1001
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>4-5 = 4 + (-5)</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>0000 0100
1111 1011
---------- # 手动算的话1+0为1，0+1也为1
1111 1111 

# 计算机执行原理
# 一、4 + (-5)异或，不相同为1其他为0，如果不考虑近位，异或就可以计算出结果
0000 0100
1111 1011
---------
1111 1111

# 二、4 + (-5)与运算,两个都为1才为1(判断进位，如果运算结果为0则没有进位)
0000 0100
1111 1011
---------
0000 0000

# 最终的结果就是最后一个与运算为0的上一个异或运算的结果1111 1111
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>s</p>
<p>除法的本质就是减法，减法也是加法，故计算机只会加法。计算机语言的本质就是在进行位运算，都是通过电路实现的。</p>
<h2 id="五、汇编" tabindex="-1"><a class="header-anchor" href="#五、汇编" aria-hidden="true">#</a> 五、汇编</h2>
<p>通过指令来代替二进制的编码，用汇编指令就可以给计算机发送一些操作，之后计算机就进行操作。常用工具: Vc6（程序到汇编的理解）,OD，抓包工具，加解密工具</p>
<h3 id="_5-1-寄存器" tabindex="-1"><a class="header-anchor" href="#_5-1-寄存器" aria-hidden="true">#</a> 5.1 寄存器</h3>
<p>CPU 本身只负责运算，不负责储存数据。数据一般都储存在内存之中，CPU 要用的时候就去内存读写数据。但是，CPU 的运算速度远高于内存的读写速度，为了避免被拖慢，CPU 都自带一级缓存和二级缓存。基本上，CPU 缓存可以看作是读写速度较快的内存。但是，CPU 缓存还是不够快，另外数据在缓存里面的地址是不固定的，CPU 每次读写都要寻址也会拖慢速度。因此，除了缓存之外，CPU 还自带了寄存器（register），用来储存最常用的数据。也就是说，那些最频繁读写的数据（比如循环变量），都会放在寄存器里面，CPU 优先读写寄存器，再由寄存器跟内存交换数据。</p>
<p>早期的x86 CPU的8个寄存器: EAX,EBX,ECX,EDX,EDI,ESI,EBP,ESP</p>
<h3 id="_5-2-内存" tabindex="-1"><a class="header-anchor" href="#_5-2-内存" aria-hidden="true">#</a> 5.2 内存</h3>
<ul>
<li>
<p>堆(heap)</p>
<p>程序运行的时候，操作系统会给它分配一段内存，用来储存程序和运行产生的数据。这段内存有起始地址和结束地址，比如从<code v-pre>0x1000</code>到<code v-pre>0x8000</code>，起始地址是较小的那个地址，结束地址是较大的那个地址。程序运行过程中，对于动态的内存占用请求（比如新建对象，或者使用<code v-pre>malloc</code>命令），系统就会从预先分配好的那段内存之中，划出一部分给用户，具体规则是从起始地址开始划分（实际上，起始地址会有一段静态数据，这里忽略）。举例来说，用户要求得到10个字节内存，那么从起始地址<code v-pre>0x1000</code>开始给他分配，一直分配到地址<code v-pre>0x100A</code>，如果再要求得到22个字节，那么就分配到<code v-pre>0x1020</code>。这种因为用户主动请求而划分出来的内存区域，叫做 Heap（堆）。它由起始地址开始，从低位（地址）向高位（地址）增长。Heap 的一个重要特点就是不会自动消失，必须手动释放，或者由垃圾回收机制来回收。</p>
</li>
<li>
<p>栈(stack)</p>
<p>除了 Heap 以外，其他的内存占用叫做 Stack（栈）。简单说，Stack 是由于函数运行而临时占用的内存区域。栈里面通常存储函数里面的局部数据，每个函数被执行到都会新产生一个栈帧并压入到栈里面(入栈),程序执行完成之后就会释放栈帧。如果函数里面还有函数就会产生新的栈帧，指定里面的栈帧执行完成被释放之后，顶层的栈帧才会被释放，由此产生了先进后出的概念。</p>
</li>
</ul>
<h3 id="_5-3-汇编指令" tabindex="-1"><a class="header-anchor" href="#_5-3-汇编指令" aria-hidden="true">#</a> 5.3 汇编指令</h3>
<p>汇编指令是汇编语言中使用的一些操作符和<a href="https://baike.baidu.com/item/%E5%8A%A9%E8%AE%B0%E7%AC%A6/489287" target="_blank" rel="noopener noreferrer">助记符<ExternalLinkIcon/></a>，还包括一些<a href="https://baike.baidu.com/item/%E4%BC%AA%E6%8C%87%E4%BB%A4/4309381" target="_blank" rel="noopener noreferrer">伪指令<ExternalLinkIcon/></a>（如assume，end），汇编指令同机器指令一一对应。每一种CPU都有自己的汇编指令集。 计算机是通过执行指令来处理数据的，为了指出数据的来源、操作结果的去向及所执行的操作，一条指令一般包含操作码和操作数两部分。</p>
<p>加法指令<code v-pre>00000011</code>写成汇编语言就是 ADD。只要还原成二进制，汇编语言就可以被 CPU 直接执行，所以它是最底层的低级语言。</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>int add_a_and_b(int a, int b) {
   return a + b;
}

int main() {
   return add_a_and_b(2, 3);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>gcc -S example.c 之后</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>_add_a_and_b:
   push   %ebx  # 将 EBX 寄存器里面的值，写入_add_a_and_b这个帧
   mov    %eax, [%esp+8]  # 将 ESP 寄存器里面的地址加上8个字节，得到一个新的地址，然后按照这个地址在 Stack 取出数据。根据前面的步骤，可以推算出这里取出的是2，再将2写入 EAX 寄存器
   mov    %ebx, [%esp+12] # 将 ESP 寄存器的值加12个字节，再按照这个地址在 Stack 取出数据，这次取出的是3，将其写入 EBX 寄存器。
   add    %eax, %ebx   # 将 EAX 寄存器的值（即2）加上 EBX 寄存器的值（即3），得到结果5，再将这个结果写入第一个运算子 EAX 寄存器。
   pop    %ebx  # 取出 Stack 最近写入的值（即 EBX 寄存器的原始值），再将这个值写回 EBX 寄存器（因为加法已经做完了，EBX 寄存器用不到了）
   ret  # 用于终止当前函数的执行，将运行权交还给上层函数。也就是，当前函数的帧将被回收。

_main:  # 从_main标签开始执行，会在 Stack 上为main建立一个帧
   push   3  # 将运算子放入 Stack，这里就是将3写入main这个帧
   push   2  # 将2写入main这个帧
   call   _add_a_and_b  # 表示调用add_a_and_b函数。这时，程序就会去找_add_a_and_b标签，并为该函数建立一个新的帧。
   add    %esp, 8  # 将 ESP 寄存器里面的地址，手动加上8个字节，再写回 ESP 寄存器。这是因为 ESP 寄存器的是 Stack 的写入开始地址，前面的pop操作已经回收了4个字节，这里再回收8个字节，等于全部回收。
   ret  # main函数运行结束，ret指令退出程序执行
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-4-内存复制" tabindex="-1"><a class="header-anchor" href="#_5-4-内存复制" aria-hidden="true">#</a> 5.4 内存复制</h3>
<p>在汇编中，当我们需要把内存中的数据从一个地方复制到另一个地方的时候就会用到
EDI和ESI</p>
<p>MOVS指令：移动数据 内存-内存</p>
<h3 id="_5-5-堆栈的指令" tabindex="-1"><a class="header-anchor" href="#_5-5-堆栈的指令" aria-hidden="true">#</a> 5.5 堆栈的指令</h3>
<p>汇编里把一段内存空间定义为一个栈，栈总是先进后出，栈的最大空间为 64K。由于 &quot;栈&quot; 是由高到低使用的，所以新压入的数据的位置更低，ESP 中的指针将一直指向这个新位置，所以 ESP 中的地址数据是动态的。</p>
<h3 id="_5-6-汇编函数" tabindex="-1"><a class="header-anchor" href="#_5-6-汇编函数" aria-hidden="true">#</a> 5.6 汇编函数</h3>
<p>当应用程序需要相同代码时，不必多次重新编写代码，有时候最好创建包含代码的单一函数（function），然后可以在程序中的任何位置调用这个函数。函数包含完成特定例程所需的所有代码，而且不需要主程序中任何代码的帮助。数据从主程序传递给函数，然后结果返回给主程序。</p>
<h3 id="_5-7-堆栈传参" tabindex="-1"><a class="header-anchor" href="#_5-7-堆栈传参" aria-hidden="true">#</a> 5.7 堆栈传参</h3>
<p>主程序在调用子程序之前，将需要传递的参数依次压入堆栈，子程序从堆栈中取入口参数；子程序调用结束之前，将需要返回的参数依次压入堆栈，主程序在堆栈中取出参数</p>
<h3 id="_5-8-堆栈平衡" tabindex="-1"><a class="header-anchor" href="#_5-8-堆栈平衡" aria-hidden="true">#</a> 5.8 堆栈平衡</h3>
<ul>
<li>
<p>如果要返回父程序，则当我们在堆栈中进行堆栈操作的时候，一定要保证在RET这条指令之前，ESP指向的是压入的我们压入的地址</p>
</li>
<li>
<p>如果通过堆栈传递参数了。那么在程序执行完毕后，要平衡因参数导致的堆栈变化</p>
</li>
</ul>
<h2 id="六、-参考" tabindex="-1"><a class="header-anchor" href="#六、-参考" aria-hidden="true">#</a> 六、 参考</h2>
<ul>
<li>汇编语言基础: http://c.biancheng.net/view/3534.html</li>
<li>原码、反码、补码: https://www.cnblogs.com/zhangziqiu/archive/2011/03/30/ComputerCode.html</li>
<li>汇编: https://www.bilibili.com/video/BV1ni4y1G7B9?p=8</li>
<li>入门: https://www.ruanyifeng.com/blog/2018/01/assembly-language-primer.html</li>
<li>32位计算机和64位计算机的区别: https://www.jianshu.com/p/d0e95bed5b60</li>
<li>内存复制指令: https://www.jianshu.com/p/bd0db6f54d81</li>
<li>参数传递：https://blog.csdn.net/u011640816/article/details/35981783</li>
<li>堆栈平衡：https://blog.csdn.net/qq_43573676/article/details/104376354</li>
<li>汇编函数：https://my.oschina.net/u/2537915/blog/698182</li>
</ul>
</div></template>


