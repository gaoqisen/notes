---
title: java一些常用的工具
date: 2020-08-16 20:50:11
tags: java base
categories: java
keywords: java base
description: 记录一些新的语法和自己不经常使用的方法，方便自己以后使用
---

## 一、小工具

### 1.1 BeanCopier

拷贝两个对象,网上资料显示: BeanCopier的性能是PropertyUtils (apache-common)的504倍。PropertyUtils的性能是BeanUtils(apache-common)的1.71倍,因此对象的拷贝尽量使用BeanCopier。注意属性没有提供set方法，只是提供了get方法是会报错的，无法复制属性

```java
// 拷贝对象， 在create对象的时候会出现性能瓶颈，可以将创建的过程放在缓存中，方便直接获取
BeanCopier copier = BeanCopier.create(FromEntity.class, ToEntity.class, false);  
ToEntity to = new ToEntity();  
copier.copy(from, to, null);  
```

### 1.2 内存分页

```java
// 总条数
int totalRow = 101;
// 每页记录数
int pageSize = 20;
// 总页数
int totalPage = (totalRow - 1) / pageSize + 1;

for(int i = 0; i< totalPage; i++) {
	int start = i * pageSize;
	int end = Math.min((i + 1) * pageSize, totalRow);
}
```

### 1.3 分页助手

```java
@FunctionalInterface
public interface PageTemplateHelper {

    /**
     * 初始化模版
     * @param pageTemplateHelper 分页模版
     */
    static void init(PageTemplateHelper pageTemplateHelper) {
        pageTemplateHelper.start();
    }

    /**
     * 执行分页逻辑
     */
    default void start() {
        // 总条数
        int totalRow = 50;
        // 每页记录数
        int pageSize = 20;
        // 总页数
        int totalPage = (totalRow - 1) / pageSize + 1;
        for(int i = 0; i< totalPage; i++) {
            int total = execute(i + 1, pageSize);
            if(total != totalRow) {
                totalRow = total;
                totalPage = (totalRow - 1) / pageSize + 1;
            }
        }
    }

    /**
     * 执行分页后的业务逻辑
     *
     * @param page 当前页
     * @param pageSize 页面数量
     * @return 总页数
     */
    abstract int execute(int page, int pageSize);

}

// 使用方法,引入函数式方法
PageTemplateHelper.init((start, end) -> {
  System.out.println(start + ", " + end);
  return 100;
});
```

## 二、字符处理

### 2.1 字符替换

```java
// Hi,666
String.format("Hi,%s", "666");
//f的使用  
System.out.printf("年-月-日 时:分:秒  %tF%n %tT%n",new Date());  
```

### 2.2 忽略全角半角方法

```java
   /**
     转半角的函数(DBC case)<br/><br/>
     全角空格为12288，半角空格为32
     其他字符半角(33-126)与全角(65281-65374)的对应关系是：均相差65248
     * @param input 任意字符串
     * @return 半角字符串
     *
     */
    public static String toDbc(String input) {
        if(UT.Str.isNullOrEmpty(input)) {
            return null;
        }
        char[] c = input.toCharArray();
        for (int i = 0; i < c.length; i++) {
            if (c[i] == 12288) {
                //全角空格为12288，半角空格为32
                c[i] = (char) 32;
                continue;
            }
            if (c[i] > 65280 && c[i] < 65375) {
                //其他字符半角(33-126)与全角(65281-65374)的对应关系是：均相差65248
                c[i] = (char) (c[i] - 65248);
            }
        }
        return new String(c);
    }
```

### 2.3 获取小数位数

```java
BigDecimal bd = new BigDecimal("3.1002000"); 
bd = BigDecimal.valueOf(bd.doubleValue()); 
System.out.println(bd.scale());
```

### 2.4 将指定数据放到第一位

```java
    private static void specifyChannelFirst(List<InfoDto> list, String channelCode) {
        list.sort((a, b) -> {
            if (a.getChannelCode().equals(channelCode)) {
                return -1;
            } else if (b.getChannelCode().equals(channelCode)) {
                return 1;
            } else {
                return 0;
            }
        });
    }
```

### 2.5 一些技巧
```
1、分库分表场景，定时任务需要扫数据：获取从库的所有数据源（table_1, table_2...）,遍历数据源用id + limit查询并处理数据（limit 0, 10; limit 10, 10）
2、测试环境不够，本地环境启动联调方案：
 - 每个服务添加route-tag（local，test1，test2等）
 - http接口header传递route-tag=local
 - 网关根据header=local路由到对应服务
 - dubbo接口根据route-tag路由：服务提供者将标签写到zookeeper，消费者调用时根据标签过滤提供者进行路由，没找到路由到就降级使用没有tag的路由
 - rocketMq根据route-tag路由：tag方式、不同环境使用不同topic（SendMessageHook改写topic）、不同环境不同集群、同一个topci不同的ConsumerGroup、自定义AllocateMessageQueueStrategy实现灰度队列和正式队列的区分(将灰度label标记在灰度实例的ClientID中，并在分配队列时，将每个Broker的指定比例的前N个队列用于所有灰度消费者来进行分配)
 https://github.com/apache/rocketmq/issues/3265


```

## 三、一些命令

```shell
// 查看java运行程序的端口
jps
// 查看java线程
jstack 23606 > test.txt
// java性能分析
jstat -gc 23606
// 查看java内存
jmap -dump:format=b,file=test.bin 23579
// 查看汇编指令
javap -c filename
// java控制台
jconsole
// 查看jvm
jvisualvm
```

## 四、基础

### 4.1 java方法中参数的传递(java中只有值传递)：

- 一个方法不能修改一个基本数据类型的参数（即数值型或布尔型)(方法中改变基本类型数据，不会影响到之前的数据。相当于拷贝数据)

- 一个方法可以改变一个对象参数的状态。(对象: 方法中改变对象的数据，原始的对象的值会跟着改变。)

- 一个方法不能让对象参数引用一个新的对象

### 4.2 ==与equals的区别

== 判断的是是否是对象的地址，即判断连个对象是不是同一个地址。（基本数据类型对比的是值，引用数据类型对比的是对象地址）

equals 判断的是值是否相同（对象没有覆盖equals方法相当于== ，否则通过覆盖的equals判断对象的值是否相等）

- 如果对象需要用equals对比，需要重写equals方法。

- String 对象是重写过equals方法的，所有string的equals对比的是值。

- 当创建string类型对象的时候，虚拟机会在常量池中找是否有相同的对象，如果有就把它赋给当前引用，否则就新创建对象

### 4.3 hashCode与equals

- hashCode的作用就是获取哈西码。它实际返回的是一个int整数。这个哈西码的作用就是确定索引的位置（可以快速找到所需要的对象）。

- hashCode在map中的作用就是为了减少equals的执行次数,相应就提高了执行速度。

- 如果不同的对象拥有相同的hashCode值，他们也不一定是相等的。如果相同的情况下，就像HashSet一样，会使用equals去对比值是否相同。

## 五、事务

### 5.1 @transactional注解在什么情况下会失效

1. 只能应用到public修饰符上，其它修饰符不起作用，但不报错
2. 数据库引擎不支持事务(Mysql的MyISAM不支持事务)
3. 没有被 Spring 管理
4. 数据源没有配置事务管理器
5. 异常捕获之后不抛出。try{}catch(Exception e){}
6. @Transactional 注解属性 propagation 设置错误，如：`TransactionDefinition.PROPAGATION_SUPPORTS`：如果当前存在事务，则加入该事务；如果当前没有事务，则以非事务的方式继续运行。 `TransactionDefinition.PROPAGATION_NOT_SUPPORTED`：以非事务方式运行，如果当前存在事务，则把当前事务挂起。 `TransactionDefinition.PROPAGATION_NEVER`：以非事务方式运行，如果当前存在事务，则抛出异常。这3种设置都会滚。
7. @Transactional 注解属性 rollbackFor 设置错误（抛出异常如果不是运行时异常需要添加注解@Transactional(rollbackFor = Exception.class)）
8. 同一个类中方法调用，导致@Transactional失效。比如有一个类Test，它的一个方法A，A再调用本类的方法B（不论方法B是用public还是private修饰），但方法A没有声明注解事务，而B方法有。则外部调用方法A之后，方法B的事务是不会起作用的（只有当事务方法被当前类以外的代码调用时，才会由`Spring`生成的代理对象来管理）
