---
title: 设计模式－中介者模式
date: 2018-10-24 21:30:11
tags: java mediator
categories: patterm
keywords: mediator
description: 当类与类之间耦合太多的时候，可以考虑中介者模式。比如5个类都互相耦合，改动一个类都会动到其他的类，中介者模式利用星形结构改善这种情况。
---

## 一、对中介者模式的理解

中介者就是处理很多类与类之前耦合太多的的一种方式。比如5个类都互相耦合，改动一个类都会动到其他的类，中介者模式利用星形结构改善这种情况。

![中介者](https://gaoqisen.github.io/GraphBed/201810/20181024225217.png)

## 二、 代码实现

中介类

```
// 抽象中介者
public abstract class AbstractMediator {
	public AbstractColleague A;
	public AbstractColleague B;
	public AbstractMediator(AbstractColleague A, AbstractColleague B){
		this.A = A;
		this.B =B;
	}
	public abstract void AaffectB();  // a转b
	public abstract void BaffectA();  // b转a
}
// 中介者
class Mediator extends AbstractMediator{

	public Mediator(AbstractColleague A, AbstractColleague B) {
		super(A, B);
	}

	@Override
	public void AaffectB() {
		int i = A.getNumber();
		B.setNumber(i*1000);
	}

	@Override
	public void BaffectA() {
		int i = B.getNumber();
		A.setNumber(i/1000);
	}
	
}
```

同事类

```
// 抽象中介者
public abstract class AbstractMediator {
	public AbstractColleague A;
	public AbstractColleague B;
	public AbstractMediator(AbstractColleague A, AbstractColleague B){
		this.A = A;
		this.B =B;
	}
	public abstract void AaffectB();  // a转b
	public abstract void BaffectA();  // b转a
}
// 中介者
class Mediator extends AbstractMediator{

	public Mediator(AbstractColleague A, AbstractColleague B) {
		super(A, B);
	}

	@Override
	public void AaffectB() {
		int i = A.getNumber();
		B.setNumber(i*1000);
	}

	@Override
	public void BaffectA() {
		int i = B.getNumber();
		A.setNumber(i/1000);
	}
	
}
```

main方法运行

```
public static void main(String[] args) {
		AbstractColleague collA = new ColleagueA();
		AbstractColleague collB = new ColleagueB();
		
		AbstractMediator am = new Mediator(collA, collB);
		collA.setNumber(1000, am);
		System.out.println("collA:"+collA.getNumber());
		System.out.println("collB:"+collB.getNumber());
		
		System.out.println("-------");
		collB.setNumber(1000, am);
		System.out.println("collA:"+collA.getNumber());
		System.out.println("collB:"+collB.getNumber());
	}
	
```
	
运行结果
	
```
collA:1000
collB:1000000
----
collA:1
collB:1000

```

## 三、UML类图

![中介者模式](https://gaoqisen.github.io/GraphBed/201810/20181024230518.png)

## 四、笔记

中介者模式定义: 用一个中介者对象封装一系列的对象交互，中介者使各对象不需要显示的相互作用，从而使耦合松散，而且可以独立的改变它们之间的交互。


中介者模式的优点：

- 将对象解耦之后，可以增加对象的互用

- 通过将控制逻辑集中，可以简化系统维护

- 可以让对象之间传递的消息变的简单，而且大幅度减少

中介者模式用途和缺点

- 中介者模式常常被用来协调相关的GUI组件

- 如果设计不当，中介者对象本身会变的过于复杂


