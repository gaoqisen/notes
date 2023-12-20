---
title: 设计模式－备忘录模式
date: 2018-10-25 21:30:11
tags: java memento
categories: patterm
keywords: memento
description: 备忘录模式又叫快照模式，主要就是在破坏对象封装的情况下，捕获一个类的内部状态，并在该对象之外报错这个状态。
---

## 一、对备忘录模式的理解

 备忘录就是备忘的意思，就像git一样，每个状态都记得，如果代码写错了，还可以回到历史版本。而且对现有版本不回产生影响，如果还需要回到现有版本也是可以的。可以实现撤销功能。实现的时候主要需要一个发起人、守护人、和一个备忘录类。

## 二、代码实现

创建备忘录类，用于存放数据

```java
 // 备忘录
public class Memento {
	private String state;
	
	public Memento(String state) {
		this.state = state;
	}
	public String getState() {
		return this.state;
	}
}

```

创建发起人类、用来设置状态，获取备忘录、设置备忘录等功能。

```java

// 发起人
public class Originator {
	private String state;
	public void setState(String state){
		this.state = state;
	}
	
	public String getState() {
		return this.state;
	}
	// 保存状态到备忘录
	public Memento saveStateToMemento(){
		return new Memento(state);
	}
	// 通过备忘录获取状态
	public void getStateFromMemento(Memento m) {
		state = m.getState();
	}
}

```

创建守护者类、用于存放历史备忘录、增加历史版本备忘录，通过下标获取备忘录等

```java
// 守护者
public class CareTaker {
	private List<Memento> list = new ArrayList<Memento>();
	
	public void add(Memento m) {
		list.add(m);
	}
	public Memento getMemento(int i) {
		return list.get(i);
	}
}
```

main 方法实现

```java
public static void main(String[] args) {
		Originator origin = new Originator();
		CareTaker ct = new CareTaker();
		origin.setState("状态1");
		origin.setState("状态2");
		ct.add(origin.saveStateToMemento());
		origin.setState("状态3");
		ct.add(origin.saveStateToMemento());
		origin.setState("状态4");
		
		System.out.println("当前状态为:"+ origin.getState());
		origin.getStateFromMemento(ct.getMemento(0));
		System.out.println("回到第一个状态为:"+ origin.getState());
		origin.getStateFromMemento(ct.getMemento(1));
		System.out.println("回到第二个状态为:"+ origin.getState());
		
	}
```

运行结果

```
当前状态为:状态4
回到第一个状态为:状态2
回到第二个状态为:状态3

```

## 三、UML类图

![备忘录模式](https://gaoqisen.github.io/GraphBed/201810/20181025225039.png)

## 四、笔记

定义：在不破坏封装的前提下，捕获一个对象的内部状态，并在该对象之外保存这个状态，这样可以在以后将对象恢复到原先保存的状态。

备忘录的优点：

- 将被存储的状态放在外面，不要和关键对象混在一起，这可以帮助维护内聚。

- 保持关键对象的数据封装

- 提供了容易实现的恢复能力

备忘录的用途和缺点：

- 备忘录用于存储状态

- 存储和恢复状态可能比较费时间

- java中可以考虑使用序列化机制存储系统的状态。

