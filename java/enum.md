---
title: 枚举学习
date: 2019-10-21 10:10:05
tags: enum
categories: java
keywords: enum学习
description: 一些简单的枚举使用，以及一些主意事项。并创建了EnumExample类，简单试用了下。
---

## 原理

> 枚举本质上是通过普通的类来实现的，只是编译器为我们进行了处理。每个枚举类型都继承自java.lang.Enum， 并自动添加了values和valueOf方法。而每个枚举常量是一个静态常量字段，使用内部类实现，该内部类继承了枚举类。所有枚举常量都通过静态代码块来进行初始化，即在类加载期间就初始化。另外通过把clone、readObject、writeObject这三个方法定义为final的，同时实现是抛出相应的异常。这样保证了每个枚举类型及枚举常量都是不可变的。可以利用枚举的这两个特性来实现线程安全的单例。（来源：https://blog.csdn.net/u010142437/article/details/80498020）

## 作用

 1. 枚举可以代替常量，枚举提供了比常量更多的方法。
 2. 使用枚举，能让我们的代码可读性更强。

## 注意事项

 1. 枚举类名建议带上Enum后缀
 2. 枚举成员名称需要全部大写
 3. 单词间用下划线分割
 4. 阿里规约【强制】：所有的枚举类型字段必须要有注释，说明每个数据项的用途。
 5. 枚举类型对象之间的值比较，是可以使用==，直接来比较值，是否相等，不是必须使用equals方法

## 特性

 1. 它不能有public的构造函数，这样做可以保证客户代码没有办法新建一个enum的实例。
2. 所有枚举值都是public , static , final的。注意这一点只是针对于枚举值，我们可以和在普通类里面定义
3. 变量一样定义其它任何类型的非枚举变量，这些变量可以用任何你想用的修饰符。
4.  Enum默认实现了java.lang.Comparable接口。
5. Enum覆载了了toString方法，因此我们如果调用Color.Blue.toString()默认返回字符串”Blue”.
6.  Enum提供了一个valueOf方法，这个方法和toString方法是相对应的。调用valueOf(“Blue”)将返回Color.Blue.
7.  因此我们在自己重写toString方法的时候就要注意到这一点，一把来说应该相对应地重写valueOf方法。
8. Enum还提供了values方法，这个方法使你能够方便的遍历所有的枚举值。
9. Enum还有一个oridinal的方法，这个方法返回枚举值在枚举类种的顺序，这个顺序根据枚举值声明的顺序而定，这里Color.Red.ordinal()返回0。


## 常用方法

```java
package com.test.utils;

/**
 * @ClassName EnumExample
 */
public enum  EnumExample {
    // 红色
    RED(1,"红色"),
    // 蓝色
    BLUE(2, "蓝色"),
    // 黑色
    BLACK(3, "黑色");

    private int index;
    private String name;

    // 添加普通方法
    public static String getName(int index){
        for(EnumExample e : EnumExample.values()) {
            if(e.index == index) {
                return e.name;
            }
        }
        return null;
    }

    EnumExample(int i, String name) {
        this.index = i;
        this.name = name;
    }

    public int getIndex() {
        return index;
    }

    public void setIndex(int index) {
        this.index = index;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public static void main(String[] args) {
        System.out.println(EnumExample.getName(2));  // 蓝色
        EnumExample enumExample = EnumExample.BLACK;
        System.out.println(enumExample.index + ":" + enumExample.name);  // 3:黑色
        for(EnumExample e : EnumExample.values()) {  // 遍历枚举
            System.out.println(e.index + ":" + e.name);
        }
    }
}

```