---

title: 多线程复习
date: 2021-12-26 10:30:40
tags: pattern
categories: design pattern
keywords: design
description: java设计模式的复习，预习学习不复习，最终只会没出息。加油!
---

## 一、来源

### 1.1 演变

多线程是一步一步演变过来的，起初是单进程的人工切换(纸袋机)之后演变为多进程的批处理(多个任务批量处理)，之后就是多个进程并行处理(程序在不同内存之间来回切换)。当多进程并行处理还是不能满足需求时就出现了线程(一个程序内部的来回切换)，现在java就是在这个阶段。其他的一些语言比如go又演变出了钎程(协程)，大概就是线程里面的线程。java如果需要支持钎程的话需要引入第三方的jar来支持。

| 演变         | 方式                           |
| ------------ | ------------------------------ |
| 单进程       | 人工切换（纸袋机）             |
| 多进程批处理 | 多个任务批量处理               |
| 多进程并发   | 程序在内存中来回切换           |
| 线程         | 一个程序内部的来回切换(os管理) |
| 钎程         | 程序内部管理(非os管理)         |

进程: 资源分配的基本单位，一个运行的程序就是一个进程

线程：调度执行的基本单位，一个进程有多个线程，多个线程共享进程资源

### 1.2 JMM模型

Java内存模型(Java Memory Model简称JMM)：是一种抽象的概念，规范定义了程序中各个变量（包括实例字段，静态字段和构成数组对象的元素）的访问

JMM 是并发编程的基础，它屏蔽了硬件和系统造成的内存访问差异，保证了 一致性、原子性、并禁止指令重排保证了安全访问。通过总线嗅探机制使得缓存数据失效， 保证 volatile 内存可见性。

JMM 是一个抽象概念，由于 CPU 多核多级缓存、为了优化代码会发生指令重排的原因，JMM 为了屏蔽细节，定义了一套规范，保证最终的并发安全。它抽象出了工作内存于主内存的概念，并且通过八个原子操作以及内存屏障保证了原子性、内存可见性、防止指令重排，使得 volatile 能保证内存可见性并防止指令重排、synchronised 保证了内存可见性、原子性、防止指令重排导致的线程安全问题，JMM 是并发编程的基础。

![jmm](https://gaoqisen.github.io/GraphBed/202204/20220406100601.png)

JMM八种原子操作：进行主内存到工作内存的数据拷贝。

| 操作指令    | 描述                                  |
| ----------- | ------------------------------------- |
| lock/unlock | 标记独占/非独占状态                   |
| read/write  | 主内存传到工作内存/工作内存传到主内存 |
| load/store  | 加载到工作内存副本/存储到主内存       |
| use/assign  | 传递给执行引擎/执行引擎赋值给工作引擎 |

https://zhuanlan.zhihu.com/p/435600960

1、线程对所有变量的操作必须在工作内存中进行，不能在内存中操作

2、工作线程中存储的是主内存中的变量副本拷贝

3、因此线程间的数据无法相互访问，线程之间的通信必须通过主内存

### 1.3 JMM模型产生的问题

|                                        | 描述                                        | 例子                                                  | 解决                        |
| -------------------------------------- | ------------------------------------------- | ----------------------------------------------------- | --------------------------- |
| 可见性 **Visibility**                  | 当前线程修改值，对其他线程可见              | volatile实现： 对值的修改立即刷新到主内存             | volatile/synchronized和Lock |
| 有序性 **Ordering** happens-before原则 | 执行指令的顺序，JVM保证了单线程的指令重排序 |                                                       | volatile/synchronized和Lock |
| 原子性 **Atomicity**                   | 操作要么执行完，要么没执行。                | i++操作(非原子)： 1、读取i 2、+1操作 3、将新值赋值给i | synchronized和Lock          |

happens-before 原则（先天有序性）：除了happens-before原则外，虚拟机可以随意对指令进行重排序

| 原则     | 描述 |
| -------- | ---- |
| 程序顺序 |      |
|          |      |
|          |      |
|          |      |
|          |      |
|          |      |
|          |      |
|          |      |

As-if-serial语义（单线程执行结果不被改变）: 存在数据依赖关系的不会进行重排序

volatile实现方式:  能保证可见性和有序性（禁止重新），不保证原子性

| 场景 | 实现方式                                         |
| ---- | ------------------------------------------------ |
| 读   | 把该线程对应的本地内存置为无效，线程主内存中读取 |
| 写   | 把修改的本地内存变量刷新到主内存                 |

Volatile实现机制：生成的汇编指令会多出一个lock前缀指令，相当于加了一个内存屏障

volatile使用场景：1、单例模式，懒汉式DCL双重检查锁。2、状态标记 flag标记

## 二、Java线程

java中的线程不是越多越好，每次线程的切换都是有系统的内核态切换到用户态过程，这个过程是很消耗资源的。创建的线程一定要用线程池管理起来，这样可以降低线程创建的开销。线程数量是根据cpu的核数进行计算的，一般给cpu预留20%的资源比如【32核*0.8】就可以设置为线程的数量。java并发编程实践里面是有一个计算公式的【32核 *  期望cpu利用率 * （1+等待时间/计算时间）】，线程数量设置好之后要用压测工具进行实际的性能压测具体的分析等待时间和计算时间。

### 2.1 创建方式

1. 继承Thread
2. 实现Runable
3. 利用ThreadPool
4. FutureTask

### 2.2 线程状态

| 状态                     | 描述                               |
| ------------------------ | ---------------------------------- |
| NEW(未启动)              | 线程刚刚创建，还没有启动的时候     |
| Runnable(运行中)         | 可运行状态，线程调度器可以安排执行 |
| Waiting                  | 自旋等待被唤醒                     |
| Time Waiting(无时限等待) | 带时间的自动唤醒                   |
| Blocking(阻塞中)         | 被阻塞，正在等待锁                 |
| Termainated(有时限等待)  | 线程结束                           |

Runnable又分为running正在运行状态和ready线程挂起状态

![status](https://gaoqisen.github.io/GraphBed/202204/20220406100941.png)

### 2.3  线程结束

1. interrupt(); 打断线程。isInterrupted(); 判断线程是否被打断过。可以用这个方法打断后结束线程
2. stop(); suspend(); resume();被废弃，结束锁后不释放锁容易造成死锁。
3. 最好的呃方式是自然结束。不打扰线程

## 三、线程池

有多线程就会面临多个线程操作同一份数据的情况。多个线程同时操作数据就会造成数据不一致。如下程序是多个线程同时对sum进行++操作，运行结果就是sum最终不会等于threadCount*forCount。

```java
    // 争抢的数据
    int sum = 0;

    // 循环的数量
    int forCount = 10;

    // 线程数量
    int threadCount = 1000;

    CountDownLatch count = new CountDownLatch(forCount * threadCount);
    ExecutorService executorService = Executors.newFixedThreadPool(100);
    
    @Test
    void testThread() throws InterruptedException {
        for (int i = 0; i < threadCount*forCount; i++) {
            executorService.submit(() -> {
                try {
                    Thread.sleep(10);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                sum++;
                count.countDown();
            });
        }
        count.await();
        Assertions.assertEquals(threadCount*forCount, sum);
    }
```

因此这个时候就需要一种机制去保障数据能够被正常的++, 这种机制就是锁。在多线程下实现锁就需要满足可见性、有序性、原子性三大特性。

|      |      |      |
| ---- | ---- | ---- |
|      |      |      |
|      |      |      |
|      |      |      |

## 四、并发容器



## 五、JUC

| Atomic(原子类)    | LongAdder、AtomicLong                              |
| ----------------- | -------------------------------------------------- |
| locks(锁)         | ReentrantLock、LockSupport、AQS                    |
| collections(集合) | DelayQueue、LinkedBlockingQueue、ConcurrentHashMap |
| tools(工具)       | Phaser、Semaphore、CountDownLatch                  |
| executor(执行器)  | Executors、ForkJoinPool、FutureTask                |
