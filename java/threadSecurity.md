---
title: 线程安全的学习
date: 2020-07-01 18:22:26
tags: thread
categories: Lock thread
keywords: Lock thread
description: 关于线程安全的一些学习。
---

## 一、线程安全与非线程安全

非线程安全: ArrayList、HashMap、StringBuilder。

线程安全: ~~Vector~~、~~HashTable~~(ConcurrentHashMap)、StringBuffer

- HashMap与ConcurrentHashMap的区别
  1. ConcurrentHashMap是线程安全的，HashMap不是线程安全的
  2. ConcurrentHashMap对桶数组进行了分段，HashMap没有。
  3. ConcurrentHashMap在每个分段上都用锁进行保护，从而让锁更精细一些，并发性能要好一些。HashMap没有锁机制。

>  在主线程中new了一个非线程安全的ArrayList，然后开1000个线程分别向这个ArrayList里面添加元素，每个线程添加100个元素，等所有线程执行完成后查看list的总数。之后又new一个Vector用同样的方法查看数量，对比结果。例子:

```java
// ArrayList与Vector测试
public class ListThread {

    static final int count = 1000;

    public static void main(String[] args) throws InterruptedException {

        // 线程不安全
        for (int i = 0; i < 10; i++) {
            threadHandleArrayList();
        }

        // 线程安全
        for (int i = 0; i < 10; i++) {
            threadHandleVector();
        }

    }
    static void threadHandleVector() throws InterruptedException {
        List<Integer> list = new Vector();
        // 用来让主线程等待threadCount个子线程执行完毕
        CountDownLatch countDownLatch = new CountDownLatch(count);

        for (int i = 0; i < count; i++) {
            new Thread("线程"+ (i+1)){
                @Override
                public void run() {
                    for (int j = 0; j < 100; j++) {
                        list.add(1);
                    }
                }
            }.start();
        }
        Thread.sleep(100);
        System.out.println(list.size());
    }

    static void threadHandleArrayList() throws InterruptedException {
        List<Integer> list = new ArrayList();
        // 用来让主线程等待threadCount个子线程执行完毕
        CountDownLatch countDownLatch = new CountDownLatch(count);

        for (int i = 0; i < count; i++) {
            new Thread("线程"+ (i+1)){
                @Override
                public void run() {
                    for (int j = 0; j < 100; j++) {
                        list.add(1);
                    }
                }
            }.start();
        }
        Thread.sleep(100);
        System.out.println(list.size());
    }

}
```

多个线程操作同一个对象的话就需要使用线程安全的对象，如果在线程内部new的对象则完全没必要使用线程安全的，如果使用了反而会造成性能影响因为线程安全的加了锁的。



## 二、 死锁

### 2.1 什么是线程死锁

定义: 如果多个线程在操作同一个对象的时候相互等待，在没有人为干预的情况下无法打破这种僵局。这种情况就是死锁。例如，某计算机系统中只有一台打印机和一台输入设备，进程P1正占用输入设备，同时又提出使用打印机的请求，但此时打印机正被进程P2 所占用，而P2在未释放打印机之前，又提出请求使用正被P1占用着的输入设备。这样两个进程相互无休止地等待下去，均无法继续执行，此时两个进程陷入死锁状态如：

```java
public static void main(String[] args) {
        Object a = new Object();
        Object b = new Object();

        new Thread("线程1"){
            @Override
            public void run() {
                synchronized (a) {
                    try {
                        System.out.println("给对象a加锁并访问对象b");
                        Thread.sleep(500);
                        synchronized (b) {
                            System.out.println("获取对象b");
                        }
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }
            }
        }.start();

        new Thread("线程2"){
            @Override
            public void run() {
                synchronized (b) {
                    try {
                        System.out.println("给对象b加锁并访问对象a");
                        Thread.sleep(500);
                        synchronized (a) {
                            System.out.println("获取对象a");
                        }
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }
            }
        }.start();
    }
```



### 2.2 产生的原因

- 系统资源的竞争: 系统中有一些资源有限，多线程去处理的时候经常处理资源不够的情况。在线程的运行中，会因为争抢资源而陷入僵局，只有对不可剥夺的资源进行竞争才可能产生死锁。
- 线程顺序不对: 在运行的线程中由于顺序不对也会造成死锁。如: 线程1和2同时使用资源1和2，线程1在没有释放的情况下去获取资源2，线程2在没有释放的情况下去获取资源1。就会造成死锁。或者进程A等待进程B发的消息，进程B又在等待进程A 发的消息，可以看出进程A和B不是因为竞争同一资源，而是在等待对方的资源导致死锁。

### 2.3 必要条件

1. **互斥条件**：一个资源，或者说一个锁只能被一个线程所占用，当一个线程首先获取到这个锁之后，在该线程释放这个锁之前，其它线程均是无法获取到这个锁。
2. **占有且等待**：一个线程已经获取到一个锁，再获取另一个锁的过程中，即使获取不到也不会释放已经获得的锁。
3. **不可剥夺条件**：任何一个线程都无法强制获取别的线程已经占有的锁
4. **循环等待条件**：线程A拿着线程B的锁，线程B拿着线程A的锁

### 2.3 如何避免

死锁必须满足以上的4个条件，只要其中一个条件不满足就不好产生死锁。

- 加锁顺序: 线程按照相同的顺序加锁。
- 加锁时限: 线程获取锁的过程中限制一定的时间，如果给定时间内获取不到，就算了，别勉强自己。这需要用到Lock的一些API
- 死锁检测: 死锁检测是一个更好的死锁预防机制，它主要是针对那些不可能实现按序加锁并且锁超时也不可行的场景。每当一个线程获得了锁，就在一个数据结构中记录一下如：线程A请求锁7，但是锁7这个时候被线程B持有，这时线程A就可以检查一下线程B是否已经请求了线程A当前所持有的锁。如果线程B确实有这样的请求，那么就是发生了死锁（线程A拥有锁1，请求锁7；线程B拥有锁7，请求锁1）
  - 一个可行的做法是释放所有锁，回退，并且等待一段随机的时间后重试。这个和简单的加锁超时类似，不一样的是只有死锁已经发生了才回退，而不会是因为加锁的请求超时了。虽然有回退和等待，但是如果有大量的线程竞争同一批锁，它们还是会重复地死锁（编者注：原因同超时类似，不能从根本上减轻竞争）。
  - 一个更好的方案是给这些线程设置优先级，让一个（或几个）线程回退，剩下的线程就像没发生死锁一样继续保持着它们需要的锁。如果赋予这些线程的优先级是固定不变的，同一批线程总是会拥有更高的优先级。为避免这个问题，可以在死锁发生的时候设置随机的优先级。

### 2.4 死锁检测

- jstack: 是java虚拟机自带的一种堆栈跟踪工具。jstack用于打印出给定的java进程ID或core file或远程调试服务的Java堆栈信息。 Jstack工具可以用于生成java虚拟机当前时刻的线程快照。**线程快照**是当前java虚拟机内每一条线程**正在执行**的**方法堆栈**的集合，生成线程快照的主要目的是定位线程出现长时间停顿的原因，如`线程间死锁`、`死循环`、`请求外部资源导致的长时间等待`等。 线程出现停顿的时候通过jstack来查看各个线程的调用堆栈，就可以知道没有响应的线程到底在后台做什么事情，或者等待什么资源。

  ```shell
  JasonGaodeMacBook-Air:~ jasongao$ jps  // 找到当前执行任务的进程号
  2770 App
  67397 DeathLock
  67396 Launcher
  65497 KotlinCompileDaemon
  64299
  67434 Jps
  64463 RemoteMavenServer36
  JasonGaodeMacBook-Air:~ jasongao$ jstack 67397  // 执行jstack命令查看当前进程堆栈信息
  2020-07-01 14:54:34
  Full thread dump Java HotSpot(TM) 64-Bit Server VM (25.211-b12 mixed mode):
  
  "Attach Listener" #15 daemon prio=9 os_prio=31 tid=0x00007fc13b802000 nid=0x360b waiting on condition [0x0000000000000000]
     java.lang.Thread.State: RUNNABLE
  
  "DestroyJavaVM" #14 prio=5 os_prio=31 tid=0x00007fc13b8e9800 nid=0x1003 waiting on condition [0x0000000000000000]
     java.lang.Thread.State: RUNNABLE
  
  "线程2" #13 prio=5 os_prio=31 tid=0x00007fc13b8e9000 nid=0x5503 waiting for monitor entry [0x0000700001555000]
     java.lang.Thread.State: BLOCKED (on object monitor)
  	at com.gaoqisen.threadcecurity.DeathLock$2.run(DeathLock.java:34)
  	- waiting to lock <0x00000007aad54eb0> (a java.lang.Object)
  	- locked <0x00000007aad54ec0> (a java.lang.Object)
  
  "线程1" #12 prio=5 os_prio=31 tid=0x00007fc13a050800 nid=0x5303 waiting for monitor entry [0x0000700001452000]
     java.lang.Thread.State: BLOCKED (on object monitor)
  	at com.gaoqisen.threadcecurity.DeathLock$1.run(DeathLock.java:17)
  	- waiting to lock <0x00000007aad54ec0> (a java.lang.Object)
  	- locked <0x00000007aad54eb0> (a java.lang.Object)
  
  ......
  
  JNI global references: 1432
  
  // 线程死锁信息
  Found one Java-level deadlock:
  =============================
  "线程2":
    waiting to lock monitor 0x00007fc13b83dca8 (object 0x00000007aad54eb0, a java.lang.Object),
    which is held by "线程1"
  "线程1":
    waiting to lock monitor 0x00007fc13b839c08 (object 0x00000007aad54ec0, a java.lang.Object),
    which is held by "线程2"
  
  Java stack information for the threads listed above:
  ===================================================
  "线程2":
  	at com.gaoqisen.threadcecurity.DeathLock$2.run(DeathLock.java:34)
  	- waiting to lock <0x00000007aad54eb0> (a java.lang.Object)
  	- locked <0x00000007aad54ec0> (a java.lang.Object)
  "线程1":
  	at com.gaoqisen.threadcecurity.DeathLock$1.run(DeathLock.java:17)
  	- waiting to lock <0x00000007aad54ec0> (a java.lang.Object)
  	- locked <0x00000007aad54eb0> (a java.lang.Object)
  
  Found 1 deadlock.
  ```

- jconsole: 是JDK自带的监控工具，在JDK/bin目录下可以找到。它用于连接正在运行的本地或者远程的JVM，对运行在Java应用程序的资源消耗和性能进行监控，并画出大量的图表，提供强大的可视化界面。而且本身占用的服务器内存很小，甚至可以说几乎不消耗。在命令行中敲入jconsole命令，会自动弹出以下对话框，选择进程67397，并点击“Connect”。

  ![https://gaoqisen.github.io/GraphBed/202007/20200701150151.png](https://gaoqisen.github.io/GraphBed/202007/20200701150151.png)

  

  点击Threads后再点击Detect Deadlock

  ![https://gaoqisen.github.io/GraphBed/202007/20200701150311.png](https://gaoqisen.github.io/GraphBed/202007/20200701150311.png)

之后就可以查看死锁信息了。

![https://gaoqisen.github.io/GraphBed/202007/20200701150506.png](https://gaoqisen.github.io/GraphBed/202007/20200701150506.png)



## 三、参考

- 死锁： https://www.cnblogs.com/sthu/p/9660914.html
- 线程安全：https://blog.csdn.net/xiao__gui/article/details/8934832
- 死锁的4个必要条件: https://blog.csdn.net/rabbit_in_android/article/details/50530960