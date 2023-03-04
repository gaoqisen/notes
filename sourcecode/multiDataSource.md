---
title: 00_多数据源实现
date: 2021-08-28 20:43:40
tags: sourcecode
categories: sourcecode
keywords: sourcecode
description: Mybatis下载源码跟着debug一遍后记录一些比较重要的注释，便于以后回忆便于学习。

---

## 一、目标

为了实现动态的多数据源方案，将数据源存储在数据库中。通过传递数据源编号进行数据源的切换，实现数据隔离功能。例如开发一套程序访问多个数据库，不同的功能切换不同的数据库，默认数据库中保存数据源信息（数据源编号、驱动、url、用户名、密码、连接池信息）等字段。在接口调用的时候请求参数header里面传递数据源编号，之后通过aop进行数据源的切换，实现业务代码无感知数据源的切换。

## 二、背景知识

ThreadLocal在多线程保证了线程安全性，于是就用它来实现了多数据源的切换功能。但是在使用的时候也遇到了一些问题，比如在程序中使用异步程池，使用的时候逐步使用了TL、ITL、TTL。如果业务代码中每次请求都只是请求一个数据源的数据那么事务就没问题。但是在一个方法中请求不同的数据源就会产生多数据源的事务问题，这个业务中暂时没有遇到因此暂时未解决。下面就是这三种threadLocal的源码学习。

### 2.1 ThreadLocal

ThreadLocal是线程私有的，同时也保证了线程安全。可以在线程中进行参数传递。但是ThreadLocal只在当前线程有效，如果在新开的子线程则不继承。

#### 2.1.1 使用

``` java
// 定义ThreadLocal
private static ThreadLocal<String> TL = new ThreadLocal<>();

public static void main(String[] args) {
  TL.set("123");
  new Thread( () -> {
    // 无法获取TL里面的值
    System.out.println("子线程" + Thread.currentThread().getName() + "： " + TL.get());
  }).start();
  fun();
  // 使用完成之后一定要remove否则会内存泄漏
  TL.remove();
}

// 可以获取TL里面的值
public static void fun() {
  System.out.println("父线程："+ Thread.currentThread().getName() + "： " + TL.get());
}

// main方法运行后输出
父线程：main： 123
子线程Thread-0： null
```

#### 2.1.2 源码

ThreadLocal的get和set方法实际就是去操作ThreadLocal里面的静态内部类ThreadLocalMap，而Thread里面的属性就是ThreadLocal.ThreadLocalMap。ThreadLocalMap利用弱引用解决了使用TL不当造成的内存泄漏问题(内存泄露如果在线程不停止时还是会有泄露情况，每次使用时候还是需要remove[引用](https://blog.csdn.net/zhipengfang/article/details/117455761))。ThreadLocalMap源码如下：

```java
static class ThreadLocalMap {
  // 静态内部类继承了弱引用，利用弱引用的特性解决TL在失去了强引用的时候不至于造成OOM.
  // 弱引用失效k就为null
  static class Entry extends WeakReference<ThreadLocal<?>> {
    /** The value associated with this ThreadLocal. */
    Object value;

    Entry(ThreadLocal<?> k, Object v) {
      super(k);
      value = v;
    }
  }
  
  // 构造器初始化
  ThreadLocalMap(ThreadLocal<?> firstKey, Object firstValue) {
    // 初始化数组默认16
    table = new Entry[INITIAL_CAPACITY];
    // 计算初始位置
    int i = firstKey.threadLocalHashCode & (INITIAL_CAPACITY - 1);
    // 初始化不存在冲突直接new
    table[i] = new Entry(firstKey, firstValue);
    size = 1;
    // 给阀值赋值(大长度 * 2 /3)
    setThreshold(INITIAL_CAPACITY);
  }
  
	private void set(ThreadLocal<?> key, Object value) {
    // 获取存储k，v对象的数组
    Entry[] tab = table;
    int len = tab.length;
    // 通过TL对象的hashcode获取下标
    int i = key.threadLocalHashCode & (len-1);
		
    // 遍历散列表，处理之前key存在的情况
    for (Entry e = tab[i];
         e != null;
         e = tab[i = nextIndex(i, len)]) {
      ThreadLocal<?> k = e.get();
			// 发现k就是当前TL对象，则直接赋值
      if (k == key) {
        e.value = value;
        return;
      }
			// 如果为空则认为是可回收的，则用当前k、v去替换掉空值（弱引用失效后）
      if (k == null) {
        replaceStaleEntry(key, value, i);
        return;
      }
    }
		// 遇到了空槽则直接给散列表赋值
    tab[i] = new Entry(key, value);
    int sz = ++size;
    // 清理为null的数据
    if (!cleanSomeSlots(i, sz) && sz >= threshold)
      // 如果超过阀值扩容
      rehash();
  }
  
  private Entry getEntry(ThreadLocal<?> key) {
      // 计算下标值
      int i = key.threadLocalHashCode & (table.length - 1);
      Entry e = table[i];
      // entry不为空与引用相同则直接返回entry
      if (e != null && e.get() == key)
        return e;
      // 下标冲突时，通过线性探查法解决（通过下标累加的方式查找）
      else
        return getEntryAfterMiss(key, i, e);
    }

    private Entry getEntryAfterMiss(ThreadLocal<?> key, int i, Entry e) {
      Entry[] tab = table;
      int len = tab.length;

      while (e != null) {
        ThreadLocal<?> k = e.get();
        // 获取ThreadLocal的引用相同则直接返回
        if (k == key)
          return e;
        // 弱引用被清理后为空的情况则删除过期k
        if (k == null)
          expungeStaleEntry(i);
        // 不为空则累加下标后处理
        else
          i = nextIndex(i, len);
        e = tab[i];
      }
      return null;
    }

    private T setInitialValue() {
      	// 初始值null
        T value = initialValue();
        Thread t = Thread.currentThread();
        ThreadLocalMap map = getMap(t);
      	// ThreadLocalMap不为空则set空值
        if (map != null)
            map.set(this, value);
        // 为空则创建ThreadLocalMap
        else
            createMap(t, value);
        // 返回null
        return value;
    }
  	
    // 删除ThreadLocal
    private void remove(ThreadLocal<?> key) {
      Entry[] tab = table;
      int len = tab.length;
      // 计算下标
      int i = key.threadLocalHashCode & (len-1);
      for (Entry e = tab[i];
           e != null;
           e = tab[i = nextIndex(i, len)]) {
        if (e.get() == key) {
          // 清除弱引用
          e.clear();
          // 删除过期entry
          expungeStaleEntry(i);
          return;
        }
      }
    }

		// 清理过期entry
    private int expungeStaleEntry(int staleSlot) {
      Entry[] tab = table;
      int len = tab.length;

      // 清除目标value
      tab[staleSlot].value = null;
      tab[staleSlot] = null;
      size--;

      // Rehash until we encounter null
      Entry e;
      int i;
      // 往后查找
      for (i = nextIndex(staleSlot, len);
           (e = tab[i]) != null;
           i = nextIndex(i, len)) {
        ThreadLocal<?> k = e.get();
        // 散列表里面的ThreadLocal为空则进行清理
        if (k == null) {
          e.value = null;
          tab[i] = null;
          size--;
        } 
        // 不为空则计算下标重新处理
        else {
          int h = k.threadLocalHashCode & (len - 1);
          if (h != i) {
            tab[i] = null;

            // Unlike Knuth 6.4 Algorithm R, we must scan until
            // null because multiple entries could have been stale.
            while (tab[h] != null)
              h = nextIndex(h, len);
            tab[h] = e;
          }
        }
      }
      return i;
    }
  	// ...
  
}
```

##### set方法

主要就是调用了ThreadLocalMap里面的set方法，去判断之前的散列表里面是否存在ThreadLocal如果存在则直接赋值，不过不存在则判断是否为null如果为nul则说明之前的弱引用对象被清理了则直接用当前值替换null，如果散列表里面不存在并且key也不等于空则直接赋值后判断是否需要进行扩容

```java
    public void set(T value) {
    		// 通过当前线程获取ThreadLocalMap
        Thread t = Thread.currentThread();
        ThreadLocalMap map = getMap(t);
        // map不为空则set值
        if (map != null)
            map.set(this, value);
        // 为空则创建ThreadLocalMap后赋值
        else
            createMap(t, value);
    }

    ThreadLocalMap getMap(Thread t) {
      // 每个线程都有一个ThreadLocalMap，key为TL的hash值，value为设置的值
      return t.threadLocals;
    }

    void createMap(Thread t, T firstValue) {
        // 创建一个map并赋值
        t.threadLocals = new ThreadLocalMap(this, firstValue);
    }
```

##### get方法

 获取ThreadLocalMap里面的值时候如果key的引用相同则直接返回，如果不相同则线性查找数据并判断进行清理操作

```java
public T get() {
  // 获取线程里面的ThreadLocalMap
  Thread t = Thread.currentThread();
  ThreadLocalMap map = getMap(t);
  if (map != null) {
    // map不为空则通过TL获取Entry（ThreadLocalMap里面的方法）
    ThreadLocalMap.Entry e = map.getEntry(this);
    // Entry不为空则获取value并返回
    if (e != null) {
      @SuppressWarnings("unchecked")
      T result = (T)e.value;
      return result;
    }
  }
  // 设置初始值并返回
  return setInitialValue();
}
```

##### remove方法

清理弱引用并删除过期entry

```java
public void remove() {
  // 获取ThreadLocalMap，如果不为空则调用ThreadLocalMap的remove方法进行删除
  ThreadLocalMap m = getMap(Thread.currentThread());
  if (m != null)
    // ThreadLocalMap里面的remove方法
    m.remove(this);
}
```

### 2.2 InherbritableThreadLocal

为了解决子线程继承ThreadLocal问题出现了InherbritableThreadLocal

#### 2.2.1 使用

```java
public class InheritableThreadLocalTest {

  public static void main(String[] args) throws InterruptedException {
    InheritableVal.set("123");

    new Thread( () -> {
      // 修改对象引用里面的值即可共享父子线程的值，如果是基本类型则无法共享
      InheritableVal.Hello hello = InheritableVal.getHello();
      hello.setName("456465");
      // 可以获取TL里面的值
      System.out.println("线程执行完毕获取" + InheritableVal.get());
    }).start();

    System.out.println("睡眠前再次获取" + InheritableVal.get());
    Thread.sleep(1000L);
    System.out.println("睡眠后再次获取" + InheritableVal.get());

    // 使用完成之后一定要remove否则会内存泄漏
    InheritableVal.clear();
  }

}

class InheritableVal {

    private static ThreadLocal<Hello> ITL = new InheritableThreadLocal<>();

    public static void set(String val) {
        Hello hello = new Hello();
        hello.setName(val);
        ITL.set(hello);
    }

    public static Hello getHello() {
        return ITL.get();
    }

    public static String get(){
        return ITL.get().getName();
    }

    public static void clear() {
        ITL.remove();
    }
    
    static class Hello{
        private String name;
      	// ...
    }

}

    
// main方法运行后输出
线程执行完毕获取456465
睡眠前再次获取456465
睡眠后再次获取456465
```

#### 2.2.2 源码

在创建线程的时候会判断父线程的inheritableThreadLocal是否为空，如果不为空则赋值给子线程的inheritableThreadLocal。

```java
// 创建线程的时候会调用init这个方法
private void init(ThreadGroup g, Runnable target, String name,
                      long stackSize, AccessControlContext acc,
                      boolean inheritThreadLocals) {
        // ...
        setPriority(priority);
  			// 在这里判断后给inheritableThreadLocals赋值,赋值是是引用（父子线程指向的是同一个对象，任意线程修改该值，则其他线程可见）
        if (inheritThreadLocals && parent.inheritableThreadLocals != null)
            this.inheritableThreadLocals =
                ThreadLocal.createInheritedMap(parent.inheritableThreadLocals);
        this.stackSize = stackSize;
        tid = nextThreadID();
    }
```

而InheritableThreadLocal是继承了ThreadLocal类并重写了三个方法

```java
public class InheritableThreadLocal<T> extends ThreadLocal<T> {
    
    // 返回parentValue
    protected T childValue(T parentValue) {
        return parentValue;
    }

    // 获取inheritableThreadLocals
    ThreadLocalMap getMap(Thread t) {
       return t.inheritableThreadLocals;
    }

    // 创建ThreadLocalMap时候给inheritableThreadLocals赋值
    void createMap(Thread t, T firstValue) {
        t.inheritableThreadLocals = new ThreadLocalMap(this, firstValue);
    }
}
```

这样调用InheritableThreadLocal.set方法时就给父线程的inheritableThreadLocals赋值了，之后在new线程init的时候就给子线程的inheritableThreadLocals也赋值了。这样就实现了子线程的ThreadLocal传递。通过InheritableThreadLocal给子线程传递值是在线程初始化的时候进行赋值的，这样使用线程池就无法进行值传递。

### 2.3 TransmittableThreadLocal

为了解决InheritableThreadLocal线程池无法传递值的问题alibaba开发了TransmittableThreadLocal，使用的时候需要引入相关的jar包。github地址：https://github.com/alibaba/transmittable-thread-local

#### 2.3.1 使用

```java
public class TransmittableThreadLocalTest {

    // 1. 线程池创建两个线程(TTL进行包装)
    private static ExecutorService executorService = TtlExecutors.getTtlExecutorService(Executors.newFixedThreadPool(2));

    public static void main(String[] args) throws InterruptedException {
        // 初始化hodler并将值set到TL
        TransmittableThreadLocalValue.set("123");

        for (int i = 0; i < 10; i++) {
            // 5. submitTtlRunnableToThreadPool
            executorService.execute(TransmittableThreadLocalTest::sleepPrint);
        }

        sleepPrint();
        TransmittableThreadLocalValue.set("456");
        new Thread( () -> {
            for (int i = 0; i < 10; i++) {
                executorService.execute(TransmittableThreadLocalTest::sleepPrint);
            }
        }).start();

        // 使用完成之后一定要remove否则会内存泄漏。线程池需要注意remove的执行时间
        Thread.sleep(11000L);
        TransmittableThreadLocalValue.clear();
        executorService.shutdown();
    }

    public static void sleepPrint() {
        try {
            Thread.sleep(1000L);
            System.out.println(Thread.currentThread().getName() + ", 线程执行完毕获取" + TransmittableThreadLocalValue.get());
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

}
// 支持线程池的ThreadLocal,同时支持非线程池
class TransmittableThreadLocalValue {

    // 1. createTtl
    private static ThreadLocal<Hello> TTL = new TransmittableThreadLocal<>();

    public static void set(String val) {
        Hello hello = new Hello();
        hello.setName(val);
        // 2. setTtlValue
        TTL.set(hello);
    }

    public static Hello getHello() {
        return TTL.get();
    }

    public static String get(){
        return TTL.get().getName();
    }

    public static void clear() {
        System.out.println("执行结束！");
        TTL.remove();
    }

    static class Hello{
        private String name;

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }
    }
}
```

#### 2.3.2 源码

按照使用流程的调用流程梳理了一下，通过线程池创建TTL > 调用set方法设置父线程的值 > 线程池执行异步程序 > 线程内部获取存储在TTL里面的值

1. 通过线程池创建TTL

首先是通过TtlExecutors.getTtlExecutorService去给执行器进行包装，之后定义一个TransmittableThreadLocalValue存储值，代码如下：

```java
    // 线程池创建两个线程(TTL进行包装)
    private static ExecutorService executorService = TtlExecutors.getTtlExecutorService(Executors.newFixedThreadPool(2));

// 支持线程池的ThreadLocal,同时支持非线程池
class TransmittableThreadLocalValue {
    private static ThreadLocal<Hello> TTL = new TransmittableThreadLocal<>();
    public static void set(String val) {
        Hello hello = new Hello();
        hello.setName(val);
        // 2. setTtlValue
        TTL.set(hello);
    }

    public static Hello getHello() {
        return TTL.get();
    }

    public static String get(){
        return TTL.get().getName();
    }

    public static void clear() {
        System.out.println("执行结束！");
        TTL.remove();
    }

    static class Hello{
        private String name;
				// ...
    }
}
```

执行器包装的时候使用了ExecutorServiceTtlWrapper去包装ExecutorService,ExecutorServiceTtlWrapper继承了ExecutorTtlWrapper。

```java
    // 获取TTL执行器服务
    @Nullable
    public static ExecutorService getTtlExecutorService(@Nullable ExecutorService executorService) {
        // 如果本身就是TTL则直接返回
        if (TtlAgent.isTtlAgentLoaded() || executorService == null || executorService instanceof TtlEnhanced) {
            return executorService;
        }
        // 创建执行器服务的包装类并返回
        return new ExecutorServiceTtlWrapper(executorService, true);
    }
    
// ExecutorServiceTtlWrapper类的构造器，执行器服务包装类
class ExecutorServiceTtlWrapper extends ExecutorTtlWrapper implements ExecutorService, TtlEnhanced {

    // 被包装对象
    private final ExecutorService executorService;

    ExecutorServiceTtlWrapper(@NonNull ExecutorService executorService, boolean idempotent) {
        super(executorService, idempotent);
        this.executorService = executorService;
    }
    // ...
  }  
    
```

到这里TTL的线程池包装类就初始化好了，一共涉及3个类TtlExecutors、ExecutorServiceTtlWrapper、ExecutorTtlWrapper。TtlExecutors里面提供了获取各种执行器的方法和获取InheritableThreadFactory的方法。ExecutorServiceTtlWrapper实现了ExecutorService接口主要逻辑就是去调用被包装的执行器的方法同时实现了TtlEnhanced（接口没有方法）。ExecutorTtlWrapper 实现了 Executor（只有一个execute方法）, TtlWrapper`<Executor>`（只有一个unwrap方法）, TtlEnhanced，里面的execute方法利用TtlRunnable去包装了Runnable之后在执行异步程序的时候会调用。

2. 调用set方法设置父线程的值

调用set方法去设置值的时候是调用的TransmittableThreadLocal的set方法。`TransmittableThreadLocal<T>` 继承了 `InheritableThreadLocal<T>` 并且实现了 `TtlCopier<T>`接口，那么TTL就拥有了ITL的方法。TTL里面重写了get/set/remove方法。下面阅读一下TTL类的源码

```java
// ##### 类里面的属性 #####
    // 是否禁用忽略空值语义
    private final boolean disableIgnoreNullValueSemantics;
    // 持有者重写类InheritableThreadLocal的initialValue和childValue，利用弱hashmap保存TTL(WeakHashMap充当一个set，value一直为空)
    private static final InheritableThreadLocal<WeakHashMap<TransmittableThreadLocal<Object>, ?>> holder =
            new InheritableThreadLocal<WeakHashMap<TransmittableThreadLocal<Object>, ?>>() {
                @Override
                // set值时会调用
                protected WeakHashMap<TransmittableThreadLocal<Object>, ?> initialValue() {
                    return new WeakHashMap<TransmittableThreadLocal<Object>, Object>();
                }

                @Override
                // 创建线程时会调用
                protected WeakHashMap<TransmittableThreadLocal<Object>, ?> childValue(WeakHashMap<TransmittableThreadLocal<Object>, ?> parentValue) {
                    return new WeakHashMap<TransmittableThreadLocal<Object>, Object>(parentValue);
                }
            };
// ##### 主要的方法 #####
    public final void set(T value) {
        if (!disableIgnoreNullValueSemantics && null == value) {
            // may set null to remove value
            remove();
        } else {
            // 给TL设置值
            super.set(value);
            // 添加到holder
            addThisToHolder();
        }
    }
    private void addThisToHolder() {
        // 如果holder里面不存在，则puth
        if (!holder.get().containsKey(this)) {
            // key为this，value为null
            holder.get().put((TransmittableThreadLocal<Object>) this, null);
        }
    }
		// 删除holder的值后调用ITL的remove方法
    public final void remove() {
        removeThisFromHolder();
        super.remove();
    }
    private void removeThisFromHolder() {
        holder.get().remove(this);
    }
		// ... 其余方法用时写上来


// ##### 静态内部类 #####
public static class Transmitter {}
```

TTL类有两个属性和一个静态内部类，之后就是各种方法比较重要的就是get/set/remove方法。禁止忽略空值disableIgnoreNullValueSemantics默认为false，在无参构造器里面初始化的，在set方法里面有判断如果是kong值则直接调用remove方法删除this。另外一个holder属性存放了
```java
InheritableThreadLocal<WeakHashMap<TransmittableThreadLocal<Object>, ?>>
```
，利用ITL存放了弱hashmap（没有强引用之后就会被gc回收防止oom），WeakHashMap里面key存放了TTL value一直存放的都是null。源码也注释说明了WeakHashMap只是作为一个Set使用。Transmitter主要就是对holder进行操作，后面使用到的时候在来。

3. 线程池执行异步程序

在执行线程池的execute方法的时候就调用了ExecutorTtlWrapper.execute方法。

```java
public void execute(@NonNull Runnable command) {    
  // 调用执行方法的时候给Runnable添加包装类   
  executor.execute(TtlRunnable.get(command, false, idempotent));
}
```

execute方法里面用TtlRunnable.get方法对Runnable进行了包装。TtlRunnable 实现了 Runnable, TtlWrapper`<Runnable>`（打开方法）, TtlEnhanced, TtlAttachments（附属方法）接口。实现源码如下：

```java
public final class TtlRunnable implements Runnable, TtlWrapper<Runnable>, TtlEnhanced, TtlAttachments {
    // 存放了捕获的快照数据（Transmitter.capture获取的Snapshot）
    private final AtomicReference<Object> capturedRef;
    // 被包装的类
    private final Runnable runnable;
    // 释放Ttl值引用后运行默认false
    private final boolean releaseTtlValueReferenceAfterRun;

    private TtlRunnable(@NonNull Runnable runnable, boolean releaseTtlValueReferenceAfterRun) {
        // 初始化数据并捕获数据获取TTL和TL数据
        // 4. captureAllTtlValues
        this.capturedRef = new AtomicReference<Object>(capture());
        this.runnable = runnable;
        this.releaseTtlValueReferenceAfterRun = releaseTtlValueReferenceAfterRun;
    }

    /**
     * wrap method {@link Runnable#run()}.
     */
    // 执行线程前将父线程的值赋给当前线程，线程执行完毕归还线程池时则恢复原来的值
    // 6 run()
    @Override
    public void run() {
        final Object captured = capturedRef.get();
        if (captured == null || releaseTtlValueReferenceAfterRun && !capturedRef.compareAndSet(captured, null)) {
            throw new IllegalStateException("TTL value reference is released after run!");
        }

        // 用来给当前子线程赋值本地变量，返回的backup是子线程原来的本地变量
        // 6.1 beforeExecute
        final Object backup = replay(captured);
        try {
            // 调用被包装类的run方法
            // 6.3 runnable.run()
            runnable.run();
        } finally {
            // 恢复原来的值
            // 6.5 afterExecute
            restore(backup);
        }
    }
    // 获取Runnable的包装类TtlRunnable
    public static TtlRunnable get(@Nullable Runnable runnable, boolean releaseTtlValueReferenceAfterRun, boolean idempotent) {
        if (null == runnable) return null;
        // 如果已经是包装类并且idempotent=true则直接返回
        if (runnable instanceof TtlEnhanced) {
            // avoid redundant decoration, and ensure idempotency
            if (idempotent) return (TtlRunnable) runnable;
            else throw new IllegalStateException("Already TtlRunnable!");
        }
        // 创建包装类并返回
        return new TtlRunnable(runnable, releaseTtlValueReferenceAfterRun);
    }
  	// ... 之后就是一些附属方法
}
```

在用TtlRunnable初始化Runnable的时候调用了TransmittableThreadLocal.Transmitter#capture方法去捕获数据并存放数据到Snapshot后赋值给capturedRef。主要是将父线程存储的是复制出来。

```java
// 捕获数据
public static Object capture() {
    // 静态类调用并通过Snapshot的构造器初始化对象
    return new Snapshot(captureTtlValues(), captureThreadLocalValues());
}

// 捕获TTL值（主线程的值）
private static HashMap<TransmittableThreadLocal<Object>, Object> captureTtlValues() {
    // 遍历holder的值（父线程set的TransmittableThreadLocal<Object>）并将TTL存入ttl2Value
    HashMap<TransmittableThreadLocal<Object>, Object> ttl2Value = new HashMap<TransmittableThreadLocal<Object>, Object>();
    for (TransmittableThreadLocal<Object> threadLocal : holder.get().keySet()) {
        // key为TransmittableThreadLocal<Object>，value为设置的值
        ttl2Value.put(threadLocal, threadLocal.copyValue());
    }
    return ttl2Value;
}

// 捕获TL值
private static HashMap<ThreadLocal<Object>, Object> captureThreadLocalValues() {
    final HashMap<ThreadLocal<Object>, Object> threadLocal2Value = new HashMap<ThreadLocal<Object>, Object();
    // 遍历TL，并将TL存入threadLocal2Value
    for (Map.Entry<ThreadLocal<Object>, TtlCopier<Object>> entry : threadLocalHolder.entrySet()) {
        final ThreadLocal<Object> threadLocal = entry.getKey();
        final TtlCopier<Object> copier = entry.getValue();
        // key为ThreadLocal<Object> value为设置值的copy
        threadLocal2Value.put(threadLocal, copier.copy(threadLocal.get()));
    }
    return threadLocal2Value;
}
```

这样TtlRunnable里面就获得了父线程设置的值和当前线程里面的值，之后线程池里面在执行run方法的后就会调用包装器TtlRunnable的run方法。包装器run方法里面在调用被包装类之前执行了replay(入参为初始化捕获数据)方法并返回backup数据，被包装类run方法执行完后finally执行restore(入参为backup数据)方法。replay方法主要是进行备份TTL/TL数据和清理TLL/TL。源码如下：

```java
// 重放（备份TTL/TL数据和清理TLL/TL）
@NonNull
public static Object replay(@NonNull Object captured) {
    final Snapshot capturedSnapshot = (Snapshot) captured;
    // 6.2 replayCapturedTtlValues
    return new Snapshot(replayTtlValues(capturedSnapshot.ttl2Value), replayThreadLocalValues(capturedSnapshot.threadLocal2Value));
}

@NonNull
// 当前子线程的holder值，并判断holder里面的TTL是否在captured里面，不存在则删除掉。（备份数据包含删除数据）
private static HashMap<TransmittableThreadLocal<Object>, Object> replayTtlValues(@NonNull HashMap<TransmittableThreadLocal<Object>, Object> captured) {
    HashMap<TransmittableThreadLocal<Object>, Object> backup = new HashMap<TransmittableThreadLocal<Object>, Object>();
    // 遍历父线程的值
    for (final Iterator<TransmittableThreadLocal<Object>> iterator = holder.get().keySet().iterator(); iterator.hasNext(); ) {
        // 父线程获取值
        TransmittableThreadLocal<Object> threadLocal = iterator.next();

        // 将原生的本地变量进行备份
        backup.put(threadLocal, threadLocal.get());

        // clear the TTL values that is not in captured
        // avoid the extra TTL values after replay when run task
        // 如果捕获的变量不包含本地原生变量，则删除当前原生变量，本地TL里面也删除（清楚原生的本地变量）
        if (!captured.containsKey(threadLocal)) {
            iterator.remove();
            threadLocal.superRemove();
        }
    }

    // set TTL values to captured
    // 将父线程的变量赋值给当前线程（刷新holder里面的值）
    setTtlValuesTo(captured);

    // call beforeExecute callback
    // 去执行beforeExecute或afterExecute扩展方法
    doExecuteCallback(true);

    return backup;
}

// 备份captured数据，判断如果标记删除则删除
private static HashMap<ThreadLocal<Object>, Object> replayThreadLocalValues(@NonNull HashMap<ThreadLocal<Object>, Object> captured) {
    final HashMap<ThreadLocal<Object>, Object> backup = new HashMap<ThreadLocal<Object>, Object>();

    for (Map.Entry<ThreadLocal<Object>, Object> entry : captured.entrySet()) {
        final ThreadLocal<Object> threadLocal = entry.getKey();
        backup.put(threadLocal, threadLocal.get());

        final Object value = entry.getValue();
        // 如果标记过清理则删除
        if (value == threadLocalClearMark) threadLocal.remove();
        else threadLocal.set(value);
    }

    return backup;
}
```

restore方法主要是删除holder在备份数据里不存在的值，并将值赋给value

```java
// 原生变量恢复备份数据（删除holder在备份数据里不存在的值，并将值赋给value）
public static void restore(@NonNull Object backup) {    
  final Snapshot backupSnapshot = (Snapshot) backup;    
  restoreTtlValues(backupSnapshot.ttl2Value);    
  // 设置线程本地的值    
  restoreThreadLocalValues(backupSnapshot.threadLocal2Value);
}
private static void restoreTtlValues(@NonNull HashMap<TransmittableThreadLocal<Object>, Object> backup) {   
  // 去执行afterExecute方法    
  doExecuteCallback(false);    
  // 遍历holder判断备份数据脸是否存在holder里值，没有则删除    
  for (final Iterator<TransmittableThreadLocal<Object>> iterator = holder.get().keySet().iterator(); 
       iterator.hasNext(); ) {        
    TransmittableThreadLocal<Object> threadLocal = iterator.next();        
    // clear the TTL values that is not in backup        
    // avoid the extra TTL values after restore        
    //  备份数据不存在则清理数据        
    if (!backup.containsKey(threadLocal)) {            
      iterator.remove();            
      threadLocal.superRemove();        
    }    
  }    
  // 设置TTL的值    
  setTtlValuesTo(backup);
}
```

在初始化线程的的时候和ITL的源码一致，也会判断后给inheritableThreadLocals赋值。这样子线程和父线程都存在TTL的引用。

4. 线程内部获取存储在TTL里面的值

TTL的get方法就是去调用父方法的ITL的值，之前初始化线程的时候已经将inheritableThreadLocals赋值，这里直接获取就可以了。

```java
// 获取值    
public final T get() {        
  T value = super.get();        
  if (disableIgnoreNullValueSemantics || null != value) addThisToHolder();        
  return value;    
}    
private void addThisToHolder() {        
  // 如果holder里面不存在，则puth        
  if (!holder.get().containsKey(this)) {            
    // key为this，value为null           
    holder.get().put((TransmittableThreadLocal<Object>) this, null);        
  }    
}
```

总结起来TTL就是利用包装类去包装ExecuteServcie和Runnable，ExecuteServcie在分配线程的时候就是分配的TtlRunnable。TtlRunnable里面保存了父线程捕获的数据，并在Runnable.run方法的前后进行数据备份并实现了数据恢复的功能。底层还是使用的ThreadLocal进行的值存储。

### 2.4 AbstractRoutingDataSource

抽象路由数据源AbstractRoutingDataSource主要的作用就是去动态的切换数据源。AbstractRoutingDataSource部分代码如下：

```java
protected DataSource determineTargetDataSource() {
   Assert.notNull(this.resolvedDataSources, "DataSource router not initialized");
   // 通过key获取数据源
   Object lookupKey = determineCurrentLookupKey();
   DataSource dataSource = this.resolvedDataSources.get(lookupKey);
   // 如果没有获取到key则使用默认数据源
   if (dataSource == null && (this.lenientFallback || lookupKey == null)) {
      dataSource = this.resolvedDefaultDataSource;
   }
   if (dataSource == null) {
      throw new IllegalStateException("Cannot determine target DataSource for lookup key [" + lookupKey + "]");
   }
   return dataSource;
}
// 动态数据源只需要实现该方法后确定当前查找key接即可
@Nullable
protected abstract Object determineCurrentLookupKey();
```

## 三、代码实现

代码实现起来就比较简单了，下面是一些关键的代码逻辑

#### 3.1 创建springBoot并引入jar

```xml
<dependencies>
<!--        spring boot -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter</artifactId>
        </dependency>
<!--        mybatis -->
        <dependency>
            <groupId>org.mybatis.spring.boot</groupId>
            <artifactId>mybatis-spring-boot-starter</artifactId>
            <version>2.1.1</version>
        </dependency>
<!--        spring boot web -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
            <version>2.5.4</version>
        </dependency>
<!--        mysql-->
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <version>5.1.48</version>
        </dependency>
<!--        ttl -->
        <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>transmittable-thread-local</artifactId>
            <version>2.12.1</version>
        </dependency>
<!--        aop -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-aop</artifactId>
            <version>2.5.4</version>
        </dependency>
<!--        druid -->
        <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>druid</artifactId>
            <version>1.2.6</version>
        </dependency>
<!--        test-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>
```

#### 3.2 数据库相关

```mysql
create table sys_data_source
(
    id               bigint auto_increment
        primary key,
    data_source_no             varchar(20)  not null comment '数据源编码',
    username             varchar(20)  not null comment '用户名',
    password             varchar(20)  not null comment '密码',
    name             varchar(20)  not null comment '名称',
    driver_class_name           varchar(500) null comment '驱动名称',
    url           varchar(500) null comment '驱动名称',
    create_time      datetime     null comment '创建时间',
    status             varchar(2)  not null comment '状态'
) comment '数据源';
    
```

application.yml

```yaml
server:
  port: 8000
spring:
  datasource:
    username: root
    password: 123456
    driver-class-name: com.mysql.jdbc.Driver
    jdbc-url: jdbc:mysql://localhost:3306/test?characterEncoding=utf8&useSSL=false
  redis:
    host: localhost
    password: 123456
    port: 6379
    timeout: 60000
mybatis:
  mapper-locations: classpath:mapper/*.xml
  type-aliases-package: com.mds.entity
```

#### 3.3 config代码

##### TTL线程

```java
 
// TransmittableThreadLocal的底层是ThreadLocal(TL),是线程私有的。 * 在接口数据请求的时候是一个独立的线程，在线程里面用TL切换数据源是线程安全的  		
public class DbContextHolder {    
  
  private static final TransmittableThreadLocal<String> TTL = new TransmittableThreadLocal<>();    
  
  public static void setVal(String val) {        
    TTL.set(val);    
  }    
  public static String getVal() {        
    return TTL.get();    
  }    
  public static void clear() {        
    TTL.remove();    
  }
}
```

##### 动态数据源

```java
/**
 * 动态数据源，用于将dataSource提供给spring
 * 由于AbstractRoutingDataSource没有set单个数据源和获取全部数据源的方法
 * 因此只能在自己实现的DynamicDataSource里面存储所有的数据源，每次set单个数据源的时候就汇总后赋值
 */
public class DynamicDataSource extends AbstractRoutingDataSource {

    private final Map<Object, Object> dynamicDataSources = new HashMap<>();

    /**
     * 获取数据源编号用TransmittableThreadLocal实现，可以在线程池里面动态切换数据源
     */
    @Override
    protected Object determineCurrentLookupKey() {
        return DbContextHolder.getVal();
    }

    /**
     * 设置目标数据源，为了解决AbstractRoutingDataSource没有汇总数据源的问题
     */
    @Override
    public void setTargetDataSources(Map<Object, Object> targetDataSources) {
        Set<Map.Entry<Object, Object>> entries = targetDataSources.entrySet();
        for (Map.Entry<Object, Object> map : entries) {
            if(dynamicDataSources.containsKey(map.getKey())) {
                continue;
            }
            dynamicDataSources.put(map.getKey(), map.getValue());
        }
        super.setTargetDataSources(dynamicDataSources);
        super.afterPropertiesSet();
    }

    /**
     * 提供了一个设置单个数据源的方法，简化调用方
     */
    public void setDataSource(String dataSourceNo, SysDataSource dataSource) {
        Map<Object, Object> map = new HashMap<>();
        map.put(dataSourceNo, getDruidDataSource(dataSource));
        setTargetDataSources(map);
    }

    /**
     * 阿里druid数据源的转换，转换的时候测试数据源是否正常使用，还有很多的参数可以在这里设置
     */
    public static DruidDataSource getDruidDataSource(SysDataSource source) {
        DruidDataSource druidDataSource = new DruidDataSource();
        druidDataSource.setUrl(source.getUrl());
        druidDataSource.setUsername(source.getUsername());
        druidDataSource.setPassword(source.getPassword());
        druidDataSource.setDriverClassName(source.getDriverClassName());
        try{
            druidDataSource.getConnection();
        } catch (Exception e) {
            throw new RuntimeException("数据库连接异常", e);
        }
        return druidDataSource;
    }
}
```

##### 动态数据源配置

```java
@Configurable
@Component
public class DataSourceConfig {

    private DataSource dataSource;

    private DynamicDataSource dynamicDataSource;

    /**
     * 默认数据源,用来获取配置在yml上面的数据
     */
    @Primary
    @Bean("dataSource")
    @ConfigurationProperties("spring.datasource")
    public DataSource getDataSource(){
        dataSource = DataSourceBuilder.create().build();
        return dataSource;
    }

    /**
     * 将DynamicDataSource交给spring管理，用于在其他地方也可以方便的set数据源
     */
    @Bean
    @DependsOn("dataSource")
    public DynamicDataSource dynamicDataSource(){
        DynamicDataSource dds= new DynamicDataSource();
        dds.setDefaultTargetDataSource(dataSource);
        Map<Object, Object> map = new HashMap<>();
        map.put("default", dataSource);
        dds.setTargetDataSources(map);
        dds.afterPropertiesSet();
        dynamicDataSource = dds;
        return dds;
    }

    /**
     * 实例化myBatis的SqlSessionFactor，在这里去解析mapper的xml文件
     */
    @Bean
    @DependsOn("dynamicDataSource")
    public SqlSessionFactory sqlSessionFactory() throws Exception {
        SqlSessionFactoryBean sqlSessionFactoryBean = new SqlSessionFactoryBean();
        sqlSessionFactoryBean.setDataSource(dynamicDataSource);
        sqlSessionFactoryBean.setMapperLocations(
                new PathMatchingResourcePatternResolver().getResources("classpath*:mapper/*.xml"));
        return sqlSessionFactoryBean.getObject();
    }

    @Bean
    public DataSourceTransactionManager transactionManager() {
        return new DataSourceTransactionManager(dynamicDataSource);
    }

}
```

##### 动态数据源数据初始化

```java
@Component
public class DataSourceInitialize implements CommandLineRunner {

    @Resource
    private DynamicDataSource dynamicDataSource;

    @Resource
    private SysDataSourceDao sysDataSourceDao;

    /**
     * 有效标识
     */
    private final static String VALID_TAG_STATUS = "1";

    /**
     * 在初始化项目的时候将数据库里面的数据源加载到动态数据源里面
     */
    @Override
    public void run(String... args) throws Exception {
        SysDataSource param = new SysDataSource();
        param.setStatus(VALID_TAG_STATUS);
        List<SysDataSource> sysDataSources = sysDataSourceDao.queryAll(param);

        Map<Object, Object> map = new HashMap<>(sysDataSources.size());
        for (SysDataSource source : sysDataSources) {
            if(map.containsKey(source.getDataSourceNo())) {
                continue;
            }
            DruidDataSource druidDataSource = DynamicDataSource.getDruidDataSource(source);
            map.put(source.getDataSourceNo(), druidDataSource);
        }

        dynamicDataSource.setTargetDataSources(map);
    }
}
```

##### 数据源切面

```java
@Aspect
@Component
public class DataSourceAspect {

    @Pointcut("execution(public * com.gqs.mds.controller.*.*(..))")
    public void switchDataSource(){}

    /**
     * 切面所有的controller，通过header里面的dataSourceNo去进行数据源切换，如果没有获取到则使用默认数据源
     */
    @Before("switchDataSource()")
    public void doBefore(JoinPoint joinPoint) {
        //获取请求报文头部元数据
        ServletRequestAttributes requestAttributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        //获取请求对象
        assert requestAttributes != null;
        HttpServletRequest request=requestAttributes.getRequest();
        String dataSourceNo = request.getHeader("dataSourceNo");
        if(dataSourceNo == null || dataSourceNo.isEmpty()) {
            DbContextHolder.setVal("default");
        } else {
            DbContextHolder.setVal(dataSourceNo);
        }
    }

}
```

##### 线程池配置

```java
@Configuration
@EnableAsync
public class TaskPoolConfig {

    /**
     * 利用TtlExecutors装饰线程池
     */
    @Bean("taskExecutor")
    public ExecutorService taskExecutro(){
        ThreadPoolTaskExecutor taskExecutor = new ThreadPoolTaskExecutor();
        taskExecutor.setCorePoolSize(10);
        taskExecutor.setMaxPoolSize(20);
        taskExecutor.initialize();
        return TtlExecutors.getTtlExecutorService(taskExecutor.getThreadPoolExecutor());
    }

}
```

#### 3.4 使用

##### 插入数据方法

```java
/**
 * 新增数据
 *
 * @param sysDataSource 实例对象
 * @return 实例对象
 */
@Override
public SysDataSource insert(SysDataSource sysDataSource) {
    // Todo 通过数据源编号判断数据库是否存在
    
    // 入库后设置数据源
    this.sysDataSourceDao.insert(sysDataSource);
    dynamicDataSource.setDataSource(sysDataSource.getDataSourceNo(), sysDataSource);

    // 测试TTL
    DbContextHolder.setVal("945645456");
    executorService.submit(() -> {
        System.out.println("异步执行！" + DbContextHolder.getVal());
    });
    return sysDataSource;
}
```

##### http调用

```http
POST http://localhost:8000/sysDataSource/insert
Content-Type: application/json
dataSourceNo: 123456

{
  "username": "root",
  "password": "123456",
  "url": "jdbc:mysql://localhost:3306/test?characterEncoding=utf8&useSSL=false",
  "dataSourceNo": "666",
  "driverClassName": "com.mysql.jdbc.Driver",
  "status": "1",
  "name": "qerq"
}
```

## 四、总结

首先在springBoot启动的时候先通过DataSourceConfig去初始化了SqlSessionFactory、DataSource、动态数据源bean。

之后调用了DataSourceInitialize（实现了CommandLineRunner接口）去将所有的生效数据源初始化到动态数据源中。初始化的时候调用了动态数据源类（DynamicDataSource实现了spring的AbstractRoutingDataSource接口，其中determineCurrentLookupKey方法是为了获取当前数据源的key也就是代码中的dataSourceNo）将动态的多个数据源初始化到spring的数据源中。

在http请求rest接口的时候会进入到DataSourceAspect切面里面进行数据源的切换。切换操作特别简单就是对DbContextHolder进行get/set操作，最终在执行mybatis的insert方法时会调用动态数据源类的determineCurrentLookupKey去获取当前数据源的key。因为在DataSourceConfig里面已经实例化动态数据源的bean了，因此在spring管理的类里面都可以进行bena的注入。那么在insert的时候也可以调用DynamicDataSource的setDataSource方法进行数据源的设置。这样就实现了在添加新数据源时实时的将数据源put到spring的多数据源map中。

最后通过TaskPoolConfig配置了TTL的线程池，这样在线程池里面使用数据源也是线程安全的。不会出现线程池获取的数据源不正确的情况。

通过这次的动态数据源的源码学习，详细的了解了TL、ITL、TTL的原理，明白了TTL存在的意义。并且也清楚了动态数据源的调用时机。现在不是很了解的就是spring是如何实现动态数据源的功能的。后面多加努力学习源码吧！加油^_^

