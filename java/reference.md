---
title: 对象的引用学习笔记
date: 2020-06-27 10:31:19
tags: java reference
categories: java
keywords: reference
description: JDK1.2之前如果reference类型的数据存储的数值代表的是另一块内存的起始地址,就称这块内存代表一个引用。JDK1.2以后,Java对引用的概念进行了扩充,将引用分为强引用、软引用、弱引用、虚引用四种(引用 强度逐渐减弱)
---

## 一、对象的强、软、弱、虚引用

### 1.1 强引用

一个对象被强引用时（只要有引用指向就不会被回收），就算抛出OOM异常也不会被GC回收。

```java
public static void main(String[] args) throws Exception{
        // M写finalize方法，在垃圾回收的时候会被调用. 垃圾回收的线程和main主线程那个先执行，不可控。
        M m = new M();  // 强引用
        m = null;
        System.gc();  // 显示调用垃圾回收
        System.out.println(m);  // 输出 null
        System.in.read();  // 阻塞main线程，给垃圾回收线程时间去执行. 如果重写了finalize方法的话，就会执行该方法
    }
```

### 1.2 软引用

可用来实现内存敏感的高速缓存（堆空间不够的时候，gc会去回收）。

```java
public static void main(String[] args) throws Exception{
        // 在内存中，内存中开辟了一块10m的空间。m执行了SoftReference对象，SoftReference软引用指向了10m的内存数据
        SoftReference<byte[]> m = new SoftReference<byte[]>(new byte[1024*1024*10]);
        System.out.println (m.get());  // 获取对象地址

        System.gc();
        Thread.sleep(500);  // 给gc回收时间
        System.out.println(m.get());

        // 设置堆空间最大为20m的时候，前面m的软引用已经有10m的数据了。[-Xmx20M]
        // 这个时候在new一个硬引用的b有15m，这个时候堆空间不够20m，故gc会把软引用的数据清理掉。
        // 在输出m的对象地址就为空
        byte[] b = new byte[1024*1024*12];
        System.out.println(m.get());

        // 软引用特别适合作缓存
    }
```

### 1.3 弱引用

弱引用可以和一个引用队列(ReferenceQueue)联合使用,如果弱引用所引用的对象被垃圾回收,Java 虚拟机就会把这个弱引用加入到与之关联的引用队列中（只要执行gc就会被回收）。

```java
 public static void main(String[] args) {
        // 弱引用
        WeakReference<M> m = new WeakReference<>(new M());

        System.out.println(m.get());
        System.gc(); // gc回收时直接回收弱引用
        System.out.println(m.get());
    }
```

### 1.4 虚引用

虚引用主要用来跟踪对象被垃圾回收的活动（一直不会被引用，jvm会使用）

```java
public static void main(String[] args) {
        // 用来管理直接内存（在对象被垃圾回收之后会执行一些操作）
        // 看m对象有没有指向堆外内存(不归gc管理的)，如果后指向，则清理堆外内存。
        PhantomReference<M> m = new PhantomReference<>(new M(), QUEUE);
        System.out.println(m.get());

        new Thread( () -> {
            while(true) {
                list.add(new byte[1024*1024]);
                try {
                    Thread.sleep(1000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                    Thread.currentThread().interrupt();
                }
                System.out.println(m.get());
            }
        }).start();

        // 垃圾回收线程
        new Thread(()->{
            while (true) {
                Reference<? extends M> poll = QUEUE.poll();
                if(poll != null) {
                    System.out.println("虚引用被jvm回收" + poll);
                }
            }
        }).start();

    }
```

> 虚引用与软引用和弱引用的一个区别在于: 虚引用必须和引用队列(ReferenceQueue)联合使用。当垃圾回收器准备回收一个对象时,如果发现它还有虚引用,就会在回收对象的内存之前,把这个虚引用加入到与之关联的引用队列中。程序可以通过判断引用队列中是否已经加入了虚引用,来了解被引用的对象是否将要被垃圾回收。程序如果发现某个虚引用已经被加入到引用队列,那么就可以在所引用的对象的内存被回收之前采取必要的行动。

> 对象传值的三种方式：1. 通过方法的参数。2. 通过静态变量。3.通过ThreadLocal

学习网址: https://www.bilibili.com/video/BV1HD4y1Q71y?p=8