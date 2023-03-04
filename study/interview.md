---
title: 一些面试题
date: 2020-07-18 14:43:40
tags: study
categories: study
keywords: java interview
description: 最近面试了，遇到了好多不是很熟悉的面试题，故记录下来。
---

## 一、索引问题

### 1.1 从数据结构角度

1. B+Tree索引: 适用于查找范围内的数据
2. hash索引: 适用于随机访问的场合，查找每条数据的时间都是一样的。
3. Fulltext索引: 查找文本中的关键字。
4. R-Tree索引: 查询比较接近的数据

### 1.2 物理存储角度

1. 聚集索引: 表数据按照索引的顺序来存储

   InnoDB的主键使用的就是聚簇索引，MyISAM不管是主键还是二级索引都是使用的非聚簇索引。

2. 非聚集索引: 表数据存储顺序与索引的顺序无关

### 1.3 逻辑角度

1. 普通索引和单列索引: 唯一的任务就是加快数据的访问速度
3. 多列索引: 符合最左原则: key index(a,b,c)相当于创建了三个索引a,ab,abc。不支持bc索引。
4. 唯一索引: 允许有空值，索引列的值必须唯一
4. 空间索引

| 区别           | 主键         | 唯一         |
| -------------- | ------------ | ------------ |
| 是否能为空     | 不能         | 能           |
| 是否能作为外键 | 能           | 不能         |
| 是否只能有一个 | 是           | 不是         |
| 包含关系       | 包含唯一索引 | 不一定是主键 |

### 1.2 聚簇索引

## 二、Mysql的引擎对比

### 2.1 InnoDB

支持事务、支持外键、支持崩溃修复能力和并发控制、支持行级锁和表级锁

### 2.2 MyISAM

插入速度快、空间和内存使用比较低、只支持表级锁。不支持事务，安全性不高

## 三、类加载器

单独学习: https://gaoqisen.github.io/java/classloader.html

## 四、HashMap原理

1. 通过key的hashCode经过扰动函数处理过后得到hash值

   ```java
   // 扰动函数: 使用扰动函数可以减少碰撞，防止不同的hashcode的高位不同但低位相同导致的hash冲突
   static final int hash(Object key) {
     // key.hashCode(): 返回的就是散列值就是hashcode
     // ^: 的意思就是按位异或
     // >>>: 无符号右移，忽略符号位，空位用0补齐
     int h;
     return (key == null) ? 0 : (h = key.hashCode()) ^ (h >>> 16);
   }
   ```

   

2. 通过(n-1)&hash判断当前元素存在的位置，如果当前位置已经存在值则对比key是否一样，如果一样就替换值，如果不一样就通过拉链法解决冲突。

   ```java
    		final V putVal(int hash, K key, V value, boolean onlyIfAbsent,
                      boolean evict) {
           Node<K,V>[] tab; Node<K,V> p; int n, i;
      			// 判断键值对数组table[i]是否为空或为null，否则执行resize()进行扩容；
           if ((tab = table) == null || (n = tab.length) == 0)
               n = (tab = resize()).length;
      			// 根据键值key计算hash值得到插入的数组索引i，如果table[i]==null，直接新建节点添加
           if ((p = tab[i = (n - 1) & hash]) == null)
               tab[i] = newNode(hash, key, value, null);
           else {
               Node<K,V> e; K k;
             	// 判断table[i]的首个元素是否和key一样，如果相同直接覆盖value，这里的相同指的是hashCode以及equals
               if (p.hash == hash &&
                   ((k = p.key) == key || (key != null && key.equals(k))))
                   e = p;
             	// 判断table[i] 是否为treeNode，即table[i] 是否是红黑树，如果是红黑树，则直接在树中插入键值对
               else if (p instanceof TreeNode)
                   e = ((TreeNode<K,V>)p).putTreeVal(this, tab, hash, key, value);
               else {
                 	// 遍历table[i]，判断链表长度是否大于8，大于8的话把链表转换为红黑树，在红黑树中执行插入操作，否则进行链表的插入操作；遍历过程中若发现key已经存在直接覆盖value即可
                   for (int binCount = 0; ; ++binCount) {
                       if ((e = p.next) == null) {
                           p.next = newNode(hash, key, value, null);
                           // 链表长度大于8转换为红黑树进行处理
                         	if (binCount >= TREEIFY_THRESHOLD - 1) // -1 for 1st
                               treeifyBin(tab, hash);
                           break;
                       }
                     	// key已经存在直接覆盖value
                       if (e.hash == hash &&
                           ((k = e.key) == key || (key != null && key.equals(k))))
                           break;
                       p = e;
                   }
               }
               if (e != null) { // existing mapping for key
                   V oldValue = e.value;
                   if (!onlyIfAbsent || oldValue == null)
                       e.value = value;
                   afterNodeAccess(e);
                   return oldValue;
               }
           }
           ++modCount;
      			// // 插入成功后，判断实际存在的键值对数量size是否超多了最大容量threshold，如果超过，进行扩容。
           if (++size > threshold)
               resize();
           afterNodeInsertion(evict);
           return null;
       }
   
   ```

   

> 拉链法: 将链表和数组结合，如果遇到hash冲突就将值放到链表中
>
> JDK1.8: 当链表的长度大于阀值(默认8)之后，将链表转为了红黑树减少搜索时间。

## 五、排序算法原理

Arrays.sort(list.toArray());源码

```java
public static void sort(Object[] a) {
  if (LegacyMergeSort.userRequested)
    // 归并排序
    legacyMergeSort(a);
  else
    // Tim优化后的归并排序
    ComparableTimSort.sort(a, 0, a.length, null, 0, 0);
}
```

### 5.1 legacyMergeSort(a)源码

```java
		/** To be removed in a future release. 在以后的版本中会删除*/
    private static void legacyMergeSort(Object[] a) {
        Object[] aux = a.clone();
        mergeSort(aux, a, 0, a.length, 0);
    }
```

mergeSort(aux, a, 0, a.length, 0);归并算法源码

```java
		@SuppressWarnings({"unchecked", "rawtypes"})
    private static void mergeSort(Object[] src,
                                  Object[] dest,
                                  int low,
                                  int high,
                                  int off) {
        int length = high - low;

        // 如果数组长度小于INSERTIONSORT_THRESHOLD(7),直接用插入排序
        // Insertion sort on smallest arrays
        if (length < INSERTIONSORT_THRESHOLD) {
            for (int i=low; i<high; i++)
                for (int j=i; j>low &&
                         ((Comparable) dest[j-1]).compareTo(dest[j])>0; j--)
                    swap(dest, j, j-1);
            return;
        }
				// 归并排序
        // Recursively sort halves of dest into src
        int destLow  = low;
        int destHigh = high;
        low  += off;
        high += off;
        int mid = (low + high) >>> 1;
        mergeSort(dest, src, low, mid, -off);
        mergeSort(dest, src, mid, high, -off);

        // If list is already sorted, just copy from src to dest.  This is an
        // optimization that results in faster sorts for nearly ordered lists.
        if (((Comparable)src[mid-1]).compareTo(src[mid]) <= 0) {
            System.arraycopy(src, low, dest, destLow, length);
            return;
        }

        // Merge sorted halves (now in src) into dest
        for(int i = destLow, p = low, q = mid; i < destHigh; i++) {
            if (q >= high || p < mid && ((Comparable)src[p]).compareTo(src[q])<=0)
                dest[i] = src[p++];
            else
                dest[i] = src[q++];
        }
    }
```

### 5.2 ComparableTimSort.sort源码

```java
		// 本质是插入排序和归并排序的结合体
    // 1.是稳定的排序算法，最坏时间复杂度为O(N*log(N))
		// 2.对小块进行插入排序，然后进行归并排序
		// TimSort算法是由Tim Peters在2002提出并首先实现在了phtyon中，是结合了合并排序（merge sort）和插入		排序（insertion sort）的一种高效稳定的算法。算法原理看这里 			https://blog.csdn.net/yangzhongblog/article/details/8184707
		static void sort(Object[] a, int lo, int hi, Object[] work, int workBase, int workLen) {
        // 保证数组的合法性
  			assert a != null && lo >= 0 && lo <= hi && hi <= a.length;

        int nRemaining  = hi - lo;
        // 对于只有0|1个元素的数组，不需要进行排序
        if (nRemaining < 2)
            return;  // Arrays of size 0 and 1 are always sorted

        // If array is small, do a "mini-TimSort" with no merges
  			// 如果数组长度小于32个则调用binarySort，二分插入排序
        if (nRemaining < MIN_MERGE) {
          	// 计算数组头部递增或递减的的序列长度，如果是递减，则翻转，保持升序
            int initRunLen = countRunAndMakeAscending(a, lo, hi);
          	// 使用二叉插入排序对在initRunLen后的元素进行排序
            binarySort(a, lo, hi, lo + initRunLen);
            return;
        }

        /**
         * March over the array once, left to right, finding natural runs,
         * extending short natural runs to minRun elements, and merging runs
         * to maintain stack invariant.
         */
        ComparableTimSort ts = new ComparableTimSort(a, work, workBase, workLen);
        // 计算最小run的长度
  			int minRun = minRunLength(nRemaining);
        do {
            // Identify next run
          	// 计算当前排序的run的长度，如果为递减数组则翻转
            int runLen = countRunAndMakeAscending(a, lo, hi);

            // If run is short, extend to min(minRun, nRemaining)
          	// 如果当前run的长度小于minRun，则进行扩展，在扩展过程中使用二叉排序来排序扩展的的元素
            if (runLen < minRun) {
                int force = nRemaining <= minRun ? nRemaining : minRun;
                binarySort(a, lo, lo + force, lo + runLen);
                runLen = force;
            }

            // Push run onto pending-run stack, and maybe merge
            // 将此run放入栈中
          	ts.pushRun(lo, runLen);
          	// 执行合并逻辑，合并的时候也做了一些优化
            ts.mergeCollapse();

            // Advance to find next run
            lo += runLen;
            nRemaining -= runLen;
        } while (nRemaining != 0);

        // Merge all remaining runs to complete sort
        assert lo == hi;
  			// 保证最后的run都被合并
        ts.mergeForceCollapse();
        assert ts.stackSize == 1;
    }
```

binarySort原码(二叉插入排序)

```java
		private static void binarySort(Object[] a, int lo, int hi, int start) {
        assert lo <= start && start <= hi;
        if (start == lo)
            start++;
        for ( ; start < hi; start++) {
            Comparable pivot = (Comparable) a[start];

            // Set left (and right) to the index where a[start] (pivot) belongs
            int left = lo;
            int right = start;
            assert left <= right;
            /*
             * Invariants:
             *   pivot >= all in [lo, left).
             *   pivot <  all in [right, start).
             */
            while (left < right) {
                int mid = (left + right) >>> 1;
                if (pivot.compareTo(a[mid]) < 0)
                    right = mid;
                else
                    left = mid + 1;
            }
            assert left == right;

            /*
             * The invariants still hold: pivot >= all in [lo, left) and
             * pivot < all in [left, start), so pivot belongs at left.  Note
             * that if there are elements equal to pivot, left points to the
             * first slot after them -- that's why this sort is stable.
             * Slide elements over to make room for pivot.
             */
            int n = start - left;  // The number of elements to move
            // Switch is just an optimization for arraycopy in default case
            switch (n) {
                case 2:  a[left + 2] = a[left + 1];
                case 1:  a[left + 1] = a[left];
                         break;
                default: System.arraycopy(a, left, a, left + 1, n);
            }
            a[left] = pivot;
        }
    }
```



## 六、ConcurrentHashMap原理

```java
		public V put(K key, V value) {
        return putVal(key, value, false);
    }

    /** Implementation for put and putIfAbsent */
    final V putVal(K key, V value, boolean onlyIfAbsent) {
        // 不允许插入空值，否则报错空指针
      	if (key == null || value == null) throw new NullPointerException();
        // 计算key的hash值
      	int hash = spread(key.hashCode());
        int binCount = 0;
      	// 更新元素是使用的CAS机制，需要不断尝试，直到成功为止
        for (Node<K,V>[] tab = table;;) {
          	// f：链表或红黑二叉树头结点，向链表中添加元素时，需要synchronized获取f的锁。
            Node<K,V> f; int n, i, fh;
          	// 判断Node[]数组是否初始化，没有则进行初始化操作
            if (tab == null || (n = tab.length) == 0)
                tab = initTable();
          	// 通过hash定位Node[]数组的索引坐标，是否有Node节点，如果没有则使用CAS进行添加（链表的头结点），添加失败则进入下次循环。
            else if ((f = tabAt(tab, i = (n - 1) & hash)) == null) {
                if (casTabAt(tab, i, null,
                             new Node<K,V>(hash, key, value, null)))
                    break;                   // no lock when adding to empty bin
            }
          	// 检查到内部正在移动元素（Node[] 数组扩容）
            else if ((fh = f.hash) == MOVED)
              	// //帮助它扩容
                tab = helpTransfer(tab, f);
            else {
                V oldVal = null;
              	// 锁住链表或红黑二叉树的头结点
                synchronized (f) {
                  	// 判断f是否是链表的头结点
                    if (tabAt(tab, i) == f) {
                      	// 如果fh>=0 是链表节点
                        if (fh >= 0) {
                            binCount = 1;
                          	// 遍历链表所有节点
                            for (Node<K,V> e = f;; ++binCount) {
                                K ek;
                              	// 如果节点存在，则更新value
                                if (e.hash == hash &&
                                    ((ek = e.key) == key ||
                                     (ek != null && key.equals(ek)))) {
                                    oldVal = e.val;
                                    if (!onlyIfAbsent)
                                        e.val = value;
                                    break;
                                }
                              	// 不存在则在链表尾部添加新节点。
                                Node<K,V> pred = e;
                                if ((e = e.next) == null) {
                                    pred.next = new Node<K,V>(hash, key,
                                                              value, null);
                                    break;
                                }
                            }
                        }
                      	// TreeBin是红黑二叉树节点
                        else if (f instanceof TreeBin) {
                            Node<K,V> p;
                            binCount = 2;
                          	// 添加树节点
                            if ((p = ((TreeBin<K,V>)f).putTreeVal(hash, key,
                                                           value)) != null) {
                                oldVal = p.val;
                                if (!onlyIfAbsent)
                                    p.val = value;
                            }
                        }
                    }
                }
                if (binCount != 0) {
                  	// 如果链表长度已经达到临界值8 就需要把链表转换为树结构
                    if (binCount >= TREEIFY_THRESHOLD)
                        treeifyBin(tab, i);
                    if (oldVal != null)
                        return oldVal;
                    break;
                }
            }
        }
      	// 将当前ConcurrentHashMap的size数量+1
        addCount(1L, binCount);
        return null;
    }
```

1. 判断Node[]数组是否初始化，没有则进行初始化操作

2. 通过hash定位Node[]数组的索引坐标，是否有Node节点，如果没有则使用CAS进行添加（链表的头结点），添加失败则进入下次循环。

3. 检查到内部正在扩容，如果正在扩容，就帮助它一块扩容。

4. 如果f!=null，则使用synchronized锁住f元素（链表/红黑二叉树的头元素）
    4.1 如果是Node(链表结构)则执行链表的添加操作。
    4.2 如果是TreeNode(树型结果)则执行树添加操作。

5. 判断链表长度已经达到临界值8 就需要把链表转换为树结构。

## 七、秒杀库存问题

1. 前端限制(防止普通用户): 用户只能请求一次，一次之后按钮变灰。限制用户只能在10分钟之内只能提交一次等，大概拦住了80%的请求。
2. 防止接口重复调用(防止程序员写for循环): 同一个uid限制访问频度，60秒内请求的接口返回相同的页面(页面缓存)
3. 后端限流: 异步处理、消息队列、并发限制.对于超过系统负载的请求，可以选择直接拒绝，以此来对系统进行保护，保证在极限压力的情况下，系统有合理范围内的处理能力
4. 下单减库存: 用户下单的时候就减库存，这种情况会出现用户下单了但是不支付的情况
5. 付款减库存: 用户支付之后减库存，这种情况会出现多个人下单了，但是付款的时候没有库存了。
6. 预扣库存: 用户下单之后预先减去库存，之后提示用户2分钟之内进行付款，如果不支付就回滚数据不进行库存减少。
7. 防止多并发时数据错误问题: 修改库存的时候，判断当前取回的库存在修改的时候是否一致。“Compare And Set”（CAS）

## 八、数据库锁

悲观锁: 认为别的线程会修改值

乐观锁: 认为别的线程不会修改值（cas）

如何防止锁表，数据库死锁问题

## 九、如何自己实现削峰填谷、限流等

令牌桶算法

## 十、事务级别

1. 未提交
2. 已提交
3. 可重复读
4. 序列化


## 十一、消息队列积压500万条数据如何处理

只能操作临时扩容，以更快的速度去消费数据

## 十二、方法重写的注解的区别

1. *一般来说，写与不写没什么区别，JVM可以自识别* 
2. *写的情况下：即说明子类要覆盖基类的方法，基类必须存在方法 （控制类型public,protected，返回值，参数列表类型）与子类方法完成一致的方法，否则会报错（找不到被Override的方法）。*  
3. *在不写@Override注解的情况下，当基类存在与子类各种条件都符合的方法时实现覆盖；如果条件不符合时，则是当成新定义的方法使用。* 
4. *所以如果想覆盖基类方法时，最好还是写上@Override注解，这样有利于编译器帮助检查错误*

## 十三、Springboot和Spring的区别

SpringBoot是在Spring上面封装的，简化了xml配置，使开发、测试、部署更加方便。SpringBoot有如下特点：

1. 嵌入式tomcat等
2. 提供starters简化构建配置
3. 尽可能自动化配置spring
4. 使用java -jar 独立运行jar

SpringBoot是基于Spring的一套快速开发整合包。

## 十四、Web攻击

### 14.1 DDOS

分布式拒绝服务攻击（distributed denial-of-service attack，DDoS）分布式拒绝服务攻击、 发送大量的正确请求到服务端，让服务端收到海量的数据后处理不过来导致服务无法使用。

### 14.2 CSRF

跨站请求伪造（Cross-site request forgery，CSRF）。跨站点请求伪造。通过一些技术手段欺骗用户的浏览器去访问一个自己曾经认证过的网站并运行一些操作（如发邮件，发消息，甚至财产操作如转账和购买商品）。由于浏览器曾经认证过，所以被访问的网站会认为是真正的用户操作而去运行。这利用了web中用户身份验证的一个漏洞：**简单的身份验证只能保证请求发自某个用户的浏览器，却不能保证请求本身是用户自愿发出的**。

防范措施: 

1. 检查referer首部字段，检查这个首部字段并要求请求来源的地址在同一个域名下
2. 添加校验token，不通过cookie进行校验
3. 输入验证码，重要接口增加验证码验证，用户输入正确验证码后方可操作，让用户明白自己当前的操作。

### 14.3 XSS攻击

跨站脚本攻击（Cross-Site Scripting, XSS），可以将代码注入到用户浏览的网页上，这种代码包括 HTML 和 JavaScript。是最普遍的Web应用安全漏洞。这类漏洞能够使得攻击者嵌入恶意脚本代码到正常用户会访问到的页面中，当正常用户访问该页面时，则可导致嵌入的恶意脚本代码的执行，从而达到恶意攻击用户的目的。

防范措施: 

1. 将cookie设置为HttpOnly可以防止JavaScript脚本调用
2. 过滤特殊字符,例如将script转为其它字符

### 14.4 SQL注入

服务器上的数据库运行非法的 SQL 语句，主要通过拼接来完成

防范措施: 

1. mysql关键字过滤，不允许用户输入sql关键字
2. 使用预编译sql语句，没有拼接的过程
3. mybatis使用#{}传入数据

## 十五、Redis的List是如何实现的

是使用的链表数据结构存储的数据。

- 版本3.2之前
  - 压缩列表ziplist
  - 双向列表linked list
- 版本3.2之后
  - 快速列表quicklist

## 十六、程序运行慢生产如何调试

1. 查看数据库是否有锁表，如果有锁表排查是否是程序导致的，并kill掉锁表线程
2. 查看服务器CPU是否过高，如果CPU过高可以通过jtask查看
3. 判断程序是一直慢还是突然慢，通过nginx日志筛选是否有第三方恶意工具网站
4. 排查程序是sql执行慢，还是程序逻辑处理太多。sql慢就进行sql优化，程序逻辑太多的话就进行缓存处理

## 十七、集群环境中功能Session如何实现共享

1. 利用公共的区域存储session例如用redis存储session实现sesison共享
2. 多台服务器的sesison进行同步比如多台tomcat的session进行同步
3. 利用新的机制鉴权，不用cookie-session机制。

## 十八、什么是线程安全，非线程安全

多个线程去操作同一个数据不会出现问题叫线程安全，会出现问题就是非线程安全

https://github.com/gaoqisen/notes/blob/master/java/threadSecurity.md

##  十九、说一下观察者模式

https://github.com/gaoqisen/notes/blob/master/patterm/observe.md

## 二十、Vue原理

双向数据绑定的mvvm模式

https://github.com/gaoqisen/notes/blob/master/web/vueBase.md

## 二十一、范式

第一范式: 数据库表中的任何属性都是原子性的, 不可再分

第二范式:数据表里的非主属性都要和这个数据表的候选键有完全依赖关系. 

第三范式: 在满足 2NF 的同时, 数据表中的非属性与候选键不存在传递依赖性.

## 二十二、参考

1. hashmap: https://zhuanlan.zhihu.com/p/21673805
2. Arrays.sort: https://my.oschina.net/u/3286119/blog/2055991
3. ConCurrentHashMap: https://www.jianshu.com/p/d10256f0ebea
4. redis list: https://zhuanlan.zhihu.com/p/102422311
5. 范式: [https://bigmorebig.github.io/2019/08/07/SQL%E8%BF%9B%E9%98%B6/](https://bigmorebig.github.io/2019/08/07/SQL进阶/)
6. 攻击: [https://github.com/CyC2018/CS-Notes/blob/master/notes/%E6%94%BB%E5%87%BB%E6%8A%80%E6%9C%AF.md](https://github.com/CyC2018/CS-Notes/blob/master/notes/攻击技术.md)

