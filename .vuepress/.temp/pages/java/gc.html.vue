<template><div><p><img src="https://gaoqisen.github.io/GraphBed/202006/20200627172523.png" alt="https://gaoqisen.github.io/GraphBed/202006/20200627172523.png"></p>
<h2 id="一、简介" tabindex="-1"><a class="header-anchor" href="#一、简介" aria-hidden="true">#</a> 一、简介</h2>
<ol>
<li>serial(新): 一个CPU或一条GC线程进行垃圾回收,会出现STW。采用复制算法</li>
<li>parNew(新): serial的多线程版本,多条gc线程去回收(降低gc时间)。采用复制算法</li>
<li>parallel shavenge(新): 并行的多线程(追求CPU吞吐量)。采用复制算法</li>
<li>serial old(老): 单线程收集。标记-整理算法</li>
<li>parallel old(老): 多线程回收(追求CPU吞吐量)。标记-整理算法</li>
<li>CMS(老): 多线程回收(追求最短停顿时间)。标记-清除算法</li>
<li>G1(java9默认): 没有分代概念，将java堆分为相同的Region，回收最多垃圾数据的Regio</li>
<li>ZGC: java11, 暂停时间不超过10ms,支持 4TB,JDK13 到了 16TB!</li>
</ol>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># JDK版本默认垃圾收集器</span>
<span class="token comment"># jdk1.7 默认垃圾收集器Parallel Scavenge（新生代）+Serial Old（老年代）</span>
<span class="token comment"># jdk1.8 默认垃圾收集器Parallel Scavenge（新生代）+Serial Old（老年代）</span>
<span class="token comment"># jdk1.9 默认垃圾收集器G1</span>
<span class="token comment"># jdk10 默认垃圾收集器G1</span>
<span class="token comment"># 查看当前使用的是哪种回收策略，-XX:+Use后面的就是 -XX:+PrintGCDetails 亦可通过打印的GC日志的新生代、老年代名称判断</span>
<span class="token function">java</span> <span class="token parameter variable">-XX:+PrintCommandLineFlags</span> <span class="token parameter variable">-version</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="二、垃圾回收算法" tabindex="-1"><a class="header-anchor" href="#二、垃圾回收算法" aria-hidden="true">#</a> 二、垃圾回收算法</h2>
<h3 id="_2-1-标记-清除" tabindex="-1"><a class="header-anchor" href="#_2-1-标记-清除" aria-hidden="true">#</a> 2.1 标记-清除</h3>
<p>首先标记出所有需要回收的对象,在标记完成后统一回收所有被标记的 对象。它是最基础的收集算法,后续的算法都是对其不足进行改进得到。这种垃圾收集算法会带来两个明显的问题: 1. 效率问题。2. 空间问题(标记清除后会产生大量不连续的碎片)</p>
<p><img src="https://gaoqisen.github.io/GraphBed/202006/20200627174125.png" alt="https://gaoqisen.github.io/GraphBed/202006/20200627174125.png"></p>
<h3 id="_2-2-标记-整理" tabindex="-1"><a class="header-anchor" href="#_2-2-标记-整理" aria-hidden="true">#</a> 2.2 标记-整理</h3>
<p>根据老年代的特点特出的一种标记算法,标记过程仍然与“标记-清除”算法一样,但后续步骤不是直接
对可回收对象回收,而是让所有存活的对象向一端移动,然后直接清理掉端边界以外的内存</p>
<p><img src="https://gaoqisen.github.io/GraphBed/202006/20200627173653.png" alt="https://gaoqisen.github.io/GraphBed/202006/20200627173653.png"></p>
<h3 id="_2-3-复制" tabindex="-1"><a class="header-anchor" href="#_2-3-复制" aria-hidden="true">#</a> 2.3 复制</h3>
<p>为了解决效率问题,“复制”收集算法出现了。它可以将内存分为大小相同的两块,每次使用其中的一 块。当这一块的内存使用完后,就将还存活的对象复制到另一块去,然后再把使用的空间一次清理掉。 这样就使每次的内存回收都是对内存区间的一半进行回收。</p>
<p><img src="https://gaoqisen.github.io/GraphBed/202006/20200627174302.png" alt="https://gaoqisen.github.io/GraphBed/202006/20200627174302.png"></p>
<h3 id="_2-4-分代收集" tabindex="-1"><a class="header-anchor" href="#_2-4-分代收集" aria-hidden="true">#</a> 2.4 分代收集</h3>
<p>当前虚拟机的垃圾收集都采用分代收集算法,只是根据对象存活周期的不 同将内存分为几块。一般将java堆分为新生代和老年代,这样我们就可以根据各个年代的特点选择合适的垃圾收集算法。比如在新生代中,每次收集都会有大量对象死去,所以可以选择复制算法,只需要付出少量对象的复制 成本就可以完成每次垃圾收集。而老年代的对象存活几率是比较高的,而且没有额外的空间对它进行分配担保,所以我们必须选择“标记-清除”或“标记-整理”算法进行垃圾收集。</p>
<h2 id="三、垃圾收集器详解" tabindex="-1"><a class="header-anchor" href="#三、垃圾收集器详解" aria-hidden="true">#</a> 三、垃圾收集器详解</h2>
<h3 id="_3-1-serial" tabindex="-1"><a class="header-anchor" href="#_3-1-serial" aria-hidden="true">#</a> 3.1 serial</h3>
<p>Serial(串行新生代)，serial old(老年代)收集器收集器是最基本、历史最悠久的垃圾收集器了。大家看名字就知道这个收集器是 一个单线程收集器了。它的 “单线程” 的意义不仅仅意味着它只会使用一条垃圾收集线程去完成垃圾收 集工作,更重要的是它在进行垃圾收集工作的时候必须暂停其他所有的工作线程( &quot;Stop The World&quot; ),直到它收集结束。</p>
<p><img src="https://gaoqisen.github.io/GraphBed/202006/20200630101205.png" alt="https://gaoqisen.github.io/GraphBed/202006/20200630101205.png"></p>
<p>Serial收集器由于没有线程交互的开销,可以获得很高的单线程收集效率。Serial收集器对于运行在Client模式下的虚拟机来说是个不错的选择,简单而且高效。</p>
<h3 id="_3-2-parnew" tabindex="-1"><a class="header-anchor" href="#_3-2-parnew" aria-hidden="true">#</a> 3.2 parNew</h3>
<p>ParNew收集器其实就是Serial收集器的多线程版本,除了使用多线程进行垃圾收集外,其余行为(控制参数、收集算法、回收策略等等)和Serial收集器完全一样。新生代采用复制算法,老年代采用标记-整理算法。它是许多运行在Server模式下的虚拟机的首要选择,除了Serial收集器外,只有它能与CMS收集器(真 正意义上的并发收集器,后面会介绍到)配合工作。新生代采用复制算法,老年代采用标记-整理算法。</p>
<p><img src="https://gaoqisen.github.io/GraphBed/202006/20200630101848.png" alt="https://gaoqisen.github.io/GraphBed/202006/20200630101848.png"></p>
<h3 id="_3-3-parallel-scavenge" tabindex="-1"><a class="header-anchor" href="#_3-3-parallel-scavenge" aria-hidden="true">#</a> 3.3 Parallel Scavenge</h3>
<p>Parallel Scavenge 收集器类似于ParNew 收集器。Parallel Scavenge收集器关注点是吞吐量(高效率的利用CPU)。CMS等垃圾收集器的关注点更多的是 用户线程的停顿时间(提高用户体验)。所谓吞吐量就是CPU中用于运行用户代码的时间与CPU总消耗时 间的比值。 Parallel Scavenge收集器提供了很多参数供用户找到最合适的停顿时间或最大吞吐量,如 果对于收集器运作不太了解的话,手工优化存在的话可以选择把内存管理优化交给虚拟机去完成也是一 个不错的选择。</p>
<p><img src="https://gaoqisen.github.io/GraphBed/202006/20200630101848.png" alt="https://gaoqisen.github.io/GraphBed/202006/20200630101848.png"></p>
<h3 id="_3-4-serial-old" tabindex="-1"><a class="header-anchor" href="#_3-4-serial-old" aria-hidden="true">#</a> 3.4 Serial Old</h3>
<p>Serial收集器的老年代版本,它同样是一个单线程收集器。它主要有两大用途:一种用途是在JDK1.5以
及以前的版本中与Parallel Scavenge收集器搭配使用,另一种用途是作为CMS收集器的后备方案。</p>
<h3 id="_3-5-parallel-old" tabindex="-1"><a class="header-anchor" href="#_3-5-parallel-old" aria-hidden="true">#</a> 3.5 Parallel Old</h3>
<p>Parallel Scavenge收集器的老年代版本。使用多线程和“标记-整理”算法。在注重吞吐量以及CPU资源 的场合,都可以优先考虑 Parallel Scavenge收集器和Parallel Old收集器。</p>
<h3 id="_3-6-cms" tabindex="-1"><a class="header-anchor" href="#_3-6-cms" aria-hidden="true">#</a> 3.6 CMS</h3>
<p>Concurrent Mark Sweep 收集器是一种以获取最短回收停顿时间为目标的收集器。它而非常符合
在注重用户体验的应用上使用。是HotSpot虚拟机第一款真正意义上的并发收集器,它第一次实 现了让垃圾收集线程与用户线程(基本上)同时工作， “标记-清除”算法实现。运行分为四个步骤初始标记、并发标记、重新标记、并发清除:</p>
<p><img src="https://gaoqisen.github.io/GraphBed/202006/20200630103223.png" alt="https://gaoqisen.github.io/GraphBed/202006/20200630103223.png"></p>
<ul>
<li>
<p>初始标记: 暂停所有线程，记录所有与根(root)对象相连的对象，速度特别快</p>
</li>
<li>
<p>并发标记: 同时开启GC和用户线程,用一个闭包结构去记录可达对象。但在这个阶段结束,这个闭包结构并不能保证包含当前所有的可达对象。因为用户线程可能会不断的更新引用域,所以 GC线程无法保证可达性分析的实时性。所以这个算法里会跟踪记录这些发生引用更新的地方。</p>
</li>
<li>
<p>重新标记: 重新标记阶段就是为了修正并发标记期间因为用户程序继续运行而导致标记产生变 动的那一部分对象的标记记录,这个阶段的停顿时间一般会比初始标记阶段的时间稍⻓,远远比 并发标记阶段时间短</p>
</li>
<li>
<p>并发清除: 开启用户线程,同时GC线程开始对为标记的区域做清扫。</p>
<p>优点: 并发收集，低停顿。</p>
<p>缺点: 对CPU资源敏感，无法处理浮动垃圾，标记清除算法会导致大量空间碎片。</p>
</li>
</ul>
<h3 id="_3-7-g1" tabindex="-1"><a class="header-anchor" href="#_3-7-g1" aria-hidden="true">#</a> 3.7 G1</h3>
<p>java9默认的收集器是一款面向服务器的垃圾收集器,主要针对配备多颗处理器及大容量内存的机器.
以极高概率满足GC停顿时间要求的同时,还具备高吞吐量性能特征。筛选回收进化特征：</p>
<ul>
<li>并行与并发:G1能充分利用CPU、多核环境下的硬件优势,使用多个CPU(CPU或者CPU核心)来缩 短Stop-The-World停顿时间。部分其他收集器原本需要停顿Java线程执行的GC动作,G1收集器仍 然可以通过并发的方式让java程序继续执行。</li>
<li>分代收集:虽然G1可以不需要其他收集器配合就能独立管理整个GC堆,但是还是保留了分代的概 念。</li>
<li>空间整合:与CMS的“标记--清理”算法不同,G1从整体来看是基于“标记整理”算法实现的收集 器;从局部上来看是基于“复制”算法实现的。</li>
<li>可预测的停顿:这是G1相对于CMS的另一个大优势,降低停顿时间是G1 和 CMS 共同的关注点, 但G1 除了追求低停顿外,还能建立可预测的停顿时间模型,能让使用者明确指定在一个⻓度为M 毫秒的时间片段内。</li>
</ul>
<p>G1收集器在后台维护了一个优先列表,每次根据允许的收集时间,优先选择回收价值最大的Region(这 也就是它的名字Garbage-First的由来)。这种使用Region划分内存空间以及有优先级的区域回收方式, 保证了GF收集器在有限时间内可以尽可能高的收集效率(把内存化整为零)，G1收集过程。</p>
<ul>
<li>初始标记 标记与GC Roots直接关联的对象,停止所有用户线程,只启动一条初始标记线程,这个过程很快.</li>
<li>并发标记 进行全面的可达性分析,开启一条并发标记线程与用户线程并行执行.这个过程比较长.</li>
<li>最终标记 标记出并发标记过程中用户线程新产生的垃圾.停止所有用户线程,并使用多条最终标记线程并行执行.</li>
<li>筛选回收 回收废弃的对象.此时也需要停止一切用户线程,并使用多条筛选回收线程并行执行.</li>
</ul>
<h3 id="_3-8-zgc" tabindex="-1"><a class="header-anchor" href="#_3-8-zgc" aria-hidden="true">#</a> 3.8 ZGC</h3>
<p>ZGC是从JDK11中引入的一种新的<strong>支持弹性伸缩</strong>和<strong>低延迟</strong>垃圾收集器，ZGC可以工作在KB~TB的内存之下，作为一种并发的垃圾收集器，ZGC保证应用延迟不会超过10毫秒(即便在堆内存很大的情况下)，在JDK11中是以实验阶段的特性被发布出来的，到JDK13时，ZGC可以支持到16TB的堆内存，并且可以将<strong>未提交的内存归还给操作系统</strong>。</p>
<h2 id="四、参考" tabindex="-1"><a class="header-anchor" href="#四、参考" aria-hidden="true">#</a> 四、参考</h2>
<ul>
<li>垃圾回收算法: https://www.jianshu.com/p/114bf4d9e59e</li>
<li>垃圾收集器: https://cloud.tencent.com/developer/article/163396</li>
<li>ZGC: https://zhuanlan.zhihu.com/p/43608166</li>
</ul>
</div></template>


