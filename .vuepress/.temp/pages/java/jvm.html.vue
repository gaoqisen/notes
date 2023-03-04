<template><div><h2 id="一、jvm运行时数据区" tabindex="-1"><a class="header-anchor" href="#一、jvm运行时数据区" aria-hidden="true">#</a> 一、JVM运行时数据区</h2>
<p><img src="https://gaoqisen.github.io/GraphBed/202006/20200612094240.png" alt="https://gaoqisen.github.io/GraphBed/202006/20200612094240.png"></p>
<h3 id="_1-1-线程私有" tabindex="-1"><a class="header-anchor" href="#_1-1-线程私有" aria-hidden="true">#</a> 1.1 线程私有</h3>
<ul>
<li>程序计数器(Program Counter Register)</li>
<li>本地方法栈(Native Method Stack)</li>
<li>虚拟机栈(VM Stack)</li>
</ul>
<h3 id="_1-2-线程共享" tabindex="-1"><a class="header-anchor" href="#_1-2-线程共享" aria-hidden="true">#</a> 1.2 线程共享</h3>
<ul>
<li>堆(Heap)</li>
<li>方法区(Method Area)</li>
</ul>
<h2 id="二、名词解释" tabindex="-1"><a class="header-anchor" href="#二、名词解释" aria-hidden="true">#</a> 二、名词解释</h2>
<h3 id="_2-1-程序计数器" tabindex="-1"><a class="header-anchor" href="#_2-1-程序计数器" aria-hidden="true">#</a> 2.1 程序计数器</h3>
<p>指向当前线程所执行的字节码指令的行号(地址)，是一块较小的内存空间。是线程在让出时间片的时候记录的行号，下次线程获取到时间片之后就可以从程序计数器记录的行号处执行程序。各个线程之间的程序计数器独立存储互不影响，是唯一一个不会出现内存溢出的区域，字节码解释器通过改变程序计数器来依次读取指令,从而实现代码的流程控制。</p>
<h3 id="_2-2-本地方法栈" tabindex="-1"><a class="header-anchor" href="#_2-2-本地方法栈" aria-hidden="true">#</a> 2.2 本地方法栈</h3>
<p>和虚拟机栈类似，区别就是虚拟机栈执行的是java方法服务，本地方法栈执行的Native方法服务。</p>
<h3 id="_2-3-虚拟机栈" tabindex="-1"><a class="header-anchor" href="#_2-3-虚拟机栈" aria-hidden="true">#</a> 2.3 虚拟机栈</h3>
<p>也叫java栈，由多个栈帧组成。栈帧是虚拟机进行方法调用和执行的数据结构。一个方法从调用开始到执行完成，就是一个栈帧在虚拟机中的入栈到出栈的过程。每个栈帧都包含局部变量表、方法出口、操作数栈、动态链接。</p>
<ul>
<li>局部变量表: 存放方法参数和方法内部定义的局部变量</li>
<li>操作数栈：操作栈，后入先出栈。调用其他方法时通过操作数栈进行传递参数</li>
<li>动态链接：堆中的对象是指向方法区中的一个类元信息的，类元信息是指向具体的类的，通过动态链接，就可以让对象直接指向类</li>
<li>方法出口：方法结束的时候要进行当前栈帧出栈，方法正常返回或者出现异常返回数据是用来帮助恢复上层方法的执行状态。</li>
</ul>
<h3 id="_2-4-堆" tabindex="-1"><a class="header-anchor" href="#_2-4-堆" aria-hidden="true">#</a> 2.4 堆</h3>
<p>Java虚拟机中内存最大的一块，是垃圾回收最重要的区域也叫gc堆。用来存放对象实例，几乎所有的对象实例和数组都在这里分配内存。按照垃圾回收的分代垃圾回收算法可以分为新生代、老年代</p>
<ul>
<li>新生代：新生代又分为伊甸园和幸存区
<ul>
<li>伊甸园(eden)：新生的对象都存放到此区域，在进行一次垃圾回收(minor GC)之后就会将对象的年龄加1，并把对象移动到幸存区</li>
<li>幸存区有两个为了在进行一次垃圾清理之后把幸存的对象存放在另一块区域From Survivor、To Suvrivor。每次清理都会将对象的年龄加1，默认对象的年龄达到15岁(通过参数 - XX:MaxTenuringThreshold设置)之后就会把对象移动到老年代</li>
</ul>
</li>
<li>老年代：老年代中的对象生命周期长、存活率高、回收的速度就比较慢(major GC)。但是当老年代的内存满了之后就会出发一次完整的垃圾回收(full gc 新生代老年代的完整回收会造成STW)</li>
</ul>
<h3 id="_2-5-方法区" tabindex="-1"><a class="header-anchor" href="#_2-5-方法区" aria-hidden="true">#</a> 2.5 方法区</h3>
<h4 id="_2-5-1-永久代" tabindex="-1"><a class="header-anchor" href="#_2-5-1-永久代" aria-hidden="true">#</a> 2.5.1 永久代</h4>
<p>保存被加载过的每一个类的信息，这些信息由类加载器在加载类的时候，从类的源文件中抽取出来，static变量信息也保存在方法区中(类的元数据)。方法区是线程共享的如果多个线程使用一个类的时候如果这个类没有被加载，则只有一个线程去加载类信息，其他线程等待(永久代就是HotSpot虚拟机对虚拟机规范中方法区的一种实现方式java8之前)</p>
<h4 id="_2-5-2-元空间" tabindex="-1"><a class="header-anchor" href="#_2-5-2-元空间" aria-hidden="true">#</a> 2.5.2 元空间</h4>
<p>HotSpot虚拟机在java8之后已经取消了永久代，改为元空间，类的元信息被存储在元空间中。元空间没有使用堆内存，而是与堆不相连的本地内存区域。所以，理论上系统可以使用的内存有多大，元空间就有多大，所以不会出现永久代存在时的内存溢出问题。这项改造也是有必要的，永久代的调优是很困难的，虽然可以设置永久代的大小，但是很难确定一个合适的大小，因为其中的影响因素很多，比如类数量的多少、常量数量的多少等。永久代中的元数据的位置也会随着一次full GC发生移动，比较消耗虚拟机性能。同时，HotSpot虚拟机的每种类型的垃圾回收器都需要特殊处理永久代中的元数据。将元数据从永久代剥离出来，不仅实现了对元空间的无缝管理，还可以简化Full GC以及对以后的并发隔离类元数据等方面进行优化。</p>
<h4 id="_2-5-3-扩展" tabindex="-1"><a class="header-anchor" href="#_2-5-3-扩展" aria-hidden="true">#</a> 2.5.3 扩展</h4>
<table>
<thead>
<tr>
<th>JDK版本</th>
<th>方法区的实现</th>
<th>运行时常量池所在的位置</th>
</tr>
</thead>
<tbody>
<tr>
<td>JDK6</td>
<td>PermGen space（永久代）</td>
<td>PermGen space（永久代）</td>
</tr>
<tr>
<td>JDK7</td>
<td>PermGen space（永久代）</td>
<td>Heap（堆）</td>
</tr>
<tr>
<td>JDK8</td>
<td>Metaspace（元空间）</td>
<td>Heap（堆）</td>
</tr>
</tbody>
</table>
<ul>
<li>
<p>为什么java8要移除永久代</p>
<ol>
<li>字符串存在永久代中，容易出现性能问题和内存溢出</li>
<li>类及方法的信息等比较难确定其大小，因此对于永久代的大小指定比较困难，太小容易出现永久代溢出，太大则容易导致老年代溢出</li>
<li>永久代会为 GC 带来不必要的复杂度，并且回收效率偏低</li>
</ol>
</li>
</ul>
<h2 id="三、参考" tabindex="-1"><a class="header-anchor" href="#三、参考" aria-hidden="true">#</a> 三、参考</h2>
<ul>
<li>元空间： https://www.jianshu.com/p/66e4e64ff278</li>
<li>虚拟机栈：https://www.jianshu.com/p/ecfcc9fb1de7</li>
<li>永久代和元空间的区别：https://blog.csdn.net/xiaojin21cen/article/details/104267301</li>
<li>执行引擎：https://juejin.im/entry/589546638d6d8100583615ee</li>
</ul>
</div></template>


