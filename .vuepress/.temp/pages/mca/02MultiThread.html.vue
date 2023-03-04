<template><div><h2 id="一、来源" tabindex="-1"><a class="header-anchor" href="#一、来源" aria-hidden="true">#</a> 一、来源</h2>
<h3 id="_1-1-演变" tabindex="-1"><a class="header-anchor" href="#_1-1-演变" aria-hidden="true">#</a> 1.1 演变</h3>
<p>多线程是一步一步演变过来的，起初是单进程的人工切换(纸袋机)之后演变为多进程的批处理(多个任务批量处理)，之后就是多个进程并行处理(程序在不同内存之间来回切换)。当多进程并行处理还是不能满足需求时就出现了线程(一个程序内部的来回切换)，现在java就是在这个阶段。其他的一些语言比如go又演变出了钎程(协程)，大概就是线程里面的线程。java如果需要支持钎程的话需要引入第三方的jar来支持。</p>
<table>
<thead>
<tr>
<th>演变</th>
<th>方式</th>
</tr>
</thead>
<tbody>
<tr>
<td>单进程</td>
<td>人工切换（纸袋机）</td>
</tr>
<tr>
<td>多进程批处理</td>
<td>多个任务批量处理</td>
</tr>
<tr>
<td>多进程并发</td>
<td>程序在内存中来回切换</td>
</tr>
<tr>
<td>线程</td>
<td>一个程序内部的来回切换(os管理)</td>
</tr>
<tr>
<td>钎程</td>
<td>程序内部管理(非os管理)</td>
</tr>
</tbody>
</table>
<p>进程: 资源分配的基本单位，一个运行的程序就是一个进程</p>
<p>线程：调度执行的基本单位，一个进程有多个线程，多个线程共享进程资源</p>
<h3 id="_1-2-jmm模型" tabindex="-1"><a class="header-anchor" href="#_1-2-jmm模型" aria-hidden="true">#</a> 1.2 JMM模型</h3>
<p>Java内存模型(Java Memory Model简称JMM)：是一种抽象的概念，规范定义了程序中各个变量（包括实例字段，静态字段和构成数组对象的元素）的访问</p>
<p>JMM 是并发编程的基础，它屏蔽了硬件和系统造成的内存访问差异，保证了 一致性、原子性、并禁止指令重排保证了安全访问。通过总线嗅探机制使得缓存数据失效， 保证 volatile 内存可见性。</p>
<p>JMM 是一个抽象概念，由于 CPU 多核多级缓存、为了优化代码会发生指令重排的原因，JMM 为了屏蔽细节，定义了一套规范，保证最终的并发安全。它抽象出了工作内存于主内存的概念，并且通过八个原子操作以及内存屏障保证了原子性、内存可见性、防止指令重排，使得 volatile 能保证内存可见性并防止指令重排、synchronised 保证了内存可见性、原子性、防止指令重排导致的线程安全问题，JMM 是并发编程的基础。</p>
<p><img src="https://gaoqisen.github.io/GraphBed/202204/20220406100601.png" alt="jmm"></p>
<p>JMM八种原子操作：进行主内存到工作内存的数据拷贝。</p>
<table>
<thead>
<tr>
<th>操作指令</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td>lock/unlock</td>
<td>标记独占/非独占状态</td>
</tr>
<tr>
<td>read/write</td>
<td>主内存传到工作内存/工作内存传到主内存</td>
</tr>
<tr>
<td>load/store</td>
<td>加载到工作内存副本/存储到主内存</td>
</tr>
<tr>
<td>use/assign</td>
<td>传递给执行引擎/执行引擎赋值给工作引擎</td>
</tr>
</tbody>
</table>
<p>https://zhuanlan.zhihu.com/p/435600960</p>
<p>1、线程对所有变量的操作必须在工作内存中进行，不能在内存中操作</p>
<p>2、工作线程中存储的是主内存中的变量副本拷贝</p>
<p>3、因此线程间的数据无法相互访问，线程之间的通信必须通过主内存</p>
<h3 id="_1-3-jmm模型产生的问题" tabindex="-1"><a class="header-anchor" href="#_1-3-jmm模型产生的问题" aria-hidden="true">#</a> 1.3 JMM模型产生的问题</h3>
<table>
<thead>
<tr>
<th></th>
<th>描述</th>
<th>例子</th>
<th>解决</th>
</tr>
</thead>
<tbody>
<tr>
<td>可见性 <strong>Visibility</strong></td>
<td>当前线程修改值，对其他线程可见</td>
<td>volatile实现： 对值的修改立即刷新到主内存</td>
<td>volatile/synchronized和Lock</td>
</tr>
<tr>
<td>有序性 <strong>Ordering</strong> happens-before原则</td>
<td>执行指令的顺序，JVM保证了单线程的指令重排序</td>
<td></td>
<td>volatile/synchronized和Lock</td>
</tr>
<tr>
<td>原子性 <strong>Atomicity</strong></td>
<td>操作要么执行完，要么没执行。</td>
<td>i++操作(非原子)： 1、读取i 2、+1操作 3、将新值赋值给i</td>
<td>synchronized和Lock</td>
</tr>
</tbody>
</table>
<p>happens-before 原则（先天有序性）：除了happens-before原则外，虚拟机可以随意对指令进行重排序</p>
<table>
<thead>
<tr>
<th>原则</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td>程序顺序</td>
<td></td>
</tr>
<tr>
<td></td>
<td></td>
</tr>
<tr>
<td></td>
<td></td>
</tr>
<tr>
<td></td>
<td></td>
</tr>
<tr>
<td></td>
<td></td>
</tr>
<tr>
<td></td>
<td></td>
</tr>
<tr>
<td></td>
<td></td>
</tr>
<tr>
<td></td>
<td></td>
</tr>
</tbody>
</table>
<p>As-if-serial语义（单线程执行结果不被改变）: 存在数据依赖关系的不会进行重排序</p>
<p>volatile实现方式:  能保证可见性和有序性（禁止重新），不保证原子性</p>
<table>
<thead>
<tr>
<th>场景</th>
<th>实现方式</th>
</tr>
</thead>
<tbody>
<tr>
<td>读</td>
<td>把该线程对应的本地内存置为无效，线程主内存中读取</td>
</tr>
<tr>
<td>写</td>
<td>把修改的本地内存变量刷新到主内存</td>
</tr>
</tbody>
</table>
<p>Volatile实现机制：生成的汇编指令会多出一个lock前缀指令，相当于加了一个内存屏障</p>
<p>volatile使用场景：1、单例模式，懒汉式DCL双重检查锁。2、状态标记 flag标记</p>
<h2 id="二、java线程" tabindex="-1"><a class="header-anchor" href="#二、java线程" aria-hidden="true">#</a> 二、Java线程</h2>
<p>java中的线程不是越多越好，每次线程的切换都是有系统的内核态切换到用户态过程，这个过程是很消耗资源的。创建的线程一定要用线程池管理起来，这样可以降低线程创建的开销。线程数量是根据cpu的核数进行计算的，一般给cpu预留20%的资源比如【32核*0.8】就可以设置为线程的数量。java并发编程实践里面是有一个计算公式的【32核 *  期望cpu利用率 * （1+等待时间/计算时间）】，线程数量设置好之后要用压测工具进行实际的性能压测具体的分析等待时间和计算时间。</p>
<h3 id="_2-1-创建方式" tabindex="-1"><a class="header-anchor" href="#_2-1-创建方式" aria-hidden="true">#</a> 2.1 创建方式</h3>
<ol>
<li>继承Thread</li>
<li>实现Runable</li>
<li>利用ThreadPool</li>
<li>FutureTask</li>
</ol>
<h3 id="_2-2-线程状态" tabindex="-1"><a class="header-anchor" href="#_2-2-线程状态" aria-hidden="true">#</a> 2.2 线程状态</h3>
<table>
<thead>
<tr>
<th>状态</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td>NEW(未启动)</td>
<td>线程刚刚创建，还没有启动的时候</td>
</tr>
<tr>
<td>Runnable(运行中)</td>
<td>可运行状态，线程调度器可以安排执行</td>
</tr>
<tr>
<td>Waiting</td>
<td>自旋等待被唤醒</td>
</tr>
<tr>
<td>Time Waiting(无时限等待)</td>
<td>带时间的自动唤醒</td>
</tr>
<tr>
<td>Blocking(阻塞中)</td>
<td>被阻塞，正在等待锁</td>
</tr>
<tr>
<td>Termainated(有时限等待)</td>
<td>线程结束</td>
</tr>
</tbody>
</table>
<p>Runnable又分为running正在运行状态和ready线程挂起状态</p>
<p><img src="https://gaoqisen.github.io/GraphBed/202204/20220406100941.png" alt="status"></p>
<h3 id="_2-3-线程结束" tabindex="-1"><a class="header-anchor" href="#_2-3-线程结束" aria-hidden="true">#</a> 2.3  线程结束</h3>
<ol>
<li>interrupt(); 打断线程。isInterrupted(); 判断线程是否被打断过。可以用这个方法打断后结束线程</li>
<li>stop(); suspend(); resume();被废弃，结束锁后不释放锁容易造成死锁。</li>
<li>最好的呃方式是自然结束。不打扰线程</li>
</ol>
<h2 id="三、线程池" tabindex="-1"><a class="header-anchor" href="#三、线程池" aria-hidden="true">#</a> 三、线程池</h2>
<p>有多线程就会面临多个线程操作同一份数据的情况。多个线程同时操作数据就会造成数据不一致。如下程序是多个线程同时对sum进行++操作，运行结果就是sum最终不会等于threadCount*forCount。</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>    <span class="token comment">// 争抢的数据</span>
    <span class="token keyword">int</span> sum <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

    <span class="token comment">// 循环的数量</span>
    <span class="token keyword">int</span> forCount <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span>

    <span class="token comment">// 线程数量</span>
    <span class="token keyword">int</span> threadCount <span class="token operator">=</span> <span class="token number">1000</span><span class="token punctuation">;</span>

    <span class="token class-name">CountDownLatch</span> count <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">CountDownLatch</span><span class="token punctuation">(</span>forCount <span class="token operator">*</span> threadCount<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">ExecutorService</span> executorService <span class="token operator">=</span> <span class="token class-name">Executors</span><span class="token punctuation">.</span><span class="token function">newFixedThreadPool</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    
    <span class="token annotation punctuation">@Test</span>
    <span class="token keyword">void</span> <span class="token function">testThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">InterruptedException</span> <span class="token punctuation">{</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> threadCount<span class="token operator">*</span>forCount<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            executorService<span class="token punctuation">.</span><span class="token function">submit</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-></span> <span class="token punctuation">{</span>
                <span class="token keyword">try</span> <span class="token punctuation">{</span>
                    <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                sum<span class="token operator">++</span><span class="token punctuation">;</span>
                count<span class="token punctuation">.</span><span class="token function">countDown</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        count<span class="token punctuation">.</span><span class="token function">await</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Assertions</span><span class="token punctuation">.</span><span class="token function">assertEquals</span><span class="token punctuation">(</span>threadCount<span class="token operator">*</span>forCount<span class="token punctuation">,</span> sum<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因此这个时候就需要一种机制去保障数据能够被正常的++, 这种机制就是锁。在多线程下实现锁就需要满足可见性、有序性、原子性三大特性。</p>
<table>
<thead>
<tr>
<th></th>
<th></th>
<th></th>
</tr>
</thead>
<tbody>
<tr>
<td></td>
<td></td>
<td></td>
</tr>
<tr>
<td></td>
<td></td>
<td></td>
</tr>
<tr>
<td></td>
<td></td>
<td></td>
</tr>
</tbody>
</table>
<h2 id="四、并发容器" tabindex="-1"><a class="header-anchor" href="#四、并发容器" aria-hidden="true">#</a> 四、并发容器</h2>
<h2 id="五、juc" tabindex="-1"><a class="header-anchor" href="#五、juc" aria-hidden="true">#</a> 五、JUC</h2>
<table>
<thead>
<tr>
<th>Atomic(原子类)</th>
<th>LongAdder、AtomicLong</th>
</tr>
</thead>
<tbody>
<tr>
<td>locks(锁)</td>
<td>ReentrantLock、LockSupport、AQS</td>
</tr>
<tr>
<td>collections(集合)</td>
<td>DelayQueue、LinkedBlockingQueue、ConcurrentHashMap</td>
</tr>
<tr>
<td>tools(工具)</td>
<td>Phaser、Semaphore、CountDownLatch</td>
</tr>
<tr>
<td>executor(执行器)</td>
<td>Executors、ForkJoinPool、FutureTask</td>
</tr>
</tbody>
</table>
</div></template>


