---
title: 设计模式－蝇量模式
date: 2018-10-22 20:50:11
tags: java chainOfResponsibility
categories: patterm
keywords: chainOfResponsibility
description: 当对象向苍蝇一样量很多的时候就需要使用这个模式简称蝇量模式（享元模式，共享对象实例），享元是手段，蝇量是结果。通过减少不必要的对象实例以减小系统的负担。
---

## 一、对蝇量模式（享元模式）的理解

蝇量模式的作用就是减少对象的创建次数，比如相同的对象，总是需要实例化，而且量比较大这个时候就可以考虑使用蝇量模式了。它的实现方式就是创建Map去存储对象，每次需要新创建对象的时候，就可以在map中去判断是否存在，如果不存在则新创建，否则共享之前的对象。所有也称之为享元模式。

## 二、代码实现

创建汽车类


```
public class Car {
	private String brand;
	public Car(String brand){
		System.out.println("___创建"+brand+"汽车");
		this.brand = brand;
	}
	
	public void drive() {
		System.out.println("开"+ brand + "车");
	}
}
```

创建汽车管理者

```
public class CarKeeper {
	private Map<String, Car> map = new HashMap<String, Car>();
	
	public Car getCar(String name) {
		Car car = this.map.get(name);
		if (car == null) {
			car = new Car(name);
			this.map.put(name, car);
			return car;
		}
		return car;
	}
}

```

main方法实现

```
public static void main(String[] args) {
		CarKeeper ck = new CarKeeper();
		Car car1 = ck.getCar("奥迪");
		car1.drive();
		Car car2 = ck.getCar("宝马");
		car2.drive();
		Car car3 = ck.getCar("雷克萨斯");
		car3.drive();
		Car car4 = ck.getCar("雷克萨斯");
		car4.drive();
		Car car5 = ck.getCar("宝马");
		car5.drive();
		Car car6 = ck.getCar("奥迪");
		car6.drive();
	}
```

运行结果

```
___创建奥迪汽车
开奥迪车
___创建宝马汽车
开宝马车
___创建雷克萨斯汽车
开雷克萨斯车
开雷克萨斯车
开宝马车
开奥迪车

```

## 三、UML类图

![享元模式](https://gaoqisen.github.io/GraphBed/201810/20181022222020.png)

## 四、笔记

感觉这个模式的UML图是最简单的，和单例模式差不多。

蝇量模式的优点：

- 减少运行时对象实例的个数，节省内存。

- 将许多“虚拟”对象的状态集中管理

蝇量模式的用途和缺点:

-  当一个类有许多的实例，而这些实例能被同一个方法控制的时候，就可以使用蝇量模式

- 一旦实现了蝇量模式，那么单个的逻辑实例将无法独立的实现不同的行为。

