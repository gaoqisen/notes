---
title: 设计模式－原型模式
date: 2018-10-26 21:30:11
tags: java prototype
categories: patterm
keywords: prototype
description: 原型模式是简单容易使用的创建型模式，用复制这个原型对象的办法创建出更多同类型的对象。
---

## 一、对原型模式的理解

原型模式是创建模式的一种，主要通过复制一个实例来创建一个实例，而不是通过新建一个实例。被复制的实例，我们称之为原型，这个原型是可定制的。

## 二、代码实现

创建原型类，实现原型接口

```
// 原型
public abstract class Prototype implements Cloneable{
	public Object clone() throws CloneNotSupportedException{
		return super.clone();
	}
}
class ConcretePrototype1 extends Prototype{
	public static int classFlay = 1;
	// 克隆自身方法
	public Object clone() throws CloneNotSupportedException{
		return (ConcretePrototype1)super.clone();
	}
}
class ConcretePrototype2 extends Prototype{
	public static int classFlay = 2;
	// 克隆自身方法
	public Object clone() throws CloneNotSupportedException{
		return (ConcretePrototype2)super.clone();
	}
}
```

main方法实现 

```
	public static void main(String[] args) throws CloneNotSupportedException{
		Prototype pro = new ConcretePrototype1();
		ConcretePrototype1 cp = (ConcretePrototype1)pro.clone();
		System.out.println("标记："+ cp.classFlay);
		
		Prototype pro2 = new ConcretePrototype2();
		ConcretePrototype2 cps = (ConcretePrototype2)pro2.clone();
		System.out.println("标记："+ cps.classFlay);
```

运行结果

```
标记：1
标记：2
```

## 三、UML类图

![原型模式](https://gaoqisen.github.io/GraphBed/201810/20181027132200.png)

## 四、笔记

原型的优点:

- 性能提高

- 避免构造函数的约束

- 让客户隐藏制造新实例的复杂性

- 提供然客户能够产生未知类型对象的选项

- 在有些时候，复制对象比创建对象更有效

原型的用途和缺点

- 在一个复杂类层次中，当系统需要许多类型创建新对象的时候，可以考虑使用原型模式

- 对象复制的时候，有些时候特别的复杂

