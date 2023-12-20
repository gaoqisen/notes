---
title: 设计模式 - 代理模式
date: 2018-10-11 22:50:11
tags: java
categories: patterm
---
昨天将组合模式完成了，组合模式可以遍历树状的集合。迭代器模式可以遍历不同类型的集合。如果有树状结构的集合，可以优先考虑使用组合模式。

## 一、对于代理模式的理解

定义：给目标对象提供一个代理对象，并由代理对象控制对目标对象的引用。
就想黄牛一样，委托代买票业务给黄牛，黄牛收钱买票，我不知道黄牛是如何买票的，卖票的人不知道是谁买票的，便于保护真实用户。代理模式也经常用于远程代理，和虚拟代理等

## 二、代码实现

创建一个主题，用于黄牛和真实的我继承。
```
// 创建主题接口
public interface Subject {
	//  买票
	public void buyTicket();
}
```
创建一个真的我，买票.实现主题

```
// 真实主题（我）
public class RealSubject implements Subject{
	@Override
	public void buyTicket() {
		System.out.println("我要买票回家");
	}
}
```
创建代理类，实现主题

```
// 代理买票（黄牛）
public class Proxy implements Subject{

	@Override
	public void buyTicket() {
		RealSubject rs = new RealSubject();
		rs.buyTicket();
		this.compterTicket();
	}
	// 不公开的买票方式，通过电脑买票
	private void compterTicket() {
		System.out.println("黄牛进行买票");
	}
}
```

mian方法运行

```
public static void main(String[] args) {
		// 调用者完全不知道是谁买票，只知道是一个黄牛保护目标
		Subject sb =new Proxy();
		sb.buyTicket();
	}
```

运行结果

```
我要买票回家
黄牛进行买票
```

## 三、UML类图

![代理模式](https://gaoqisen.github.io/GraphBed/201810/20181011211920.png)

## 四、笔记

> 封装变化

> 针对接口编程，不针对实现编程

> 对修改关闭，对扩展开放

> 多用组合，少用继承

> 为交互对象之间的松耦合设计而努力

> 依赖抽象，不依赖具体类

> 只和朋友交谈

> 别找我，我会找你

> 类应该只有一个改变的理由

> 定义: 为另一个对象提供一个替身或占位符以访问这个对象

github源码：[https://github.com/gaoqisen/java-pattern](https://github.com/gaoqisen/java-pattern) 

