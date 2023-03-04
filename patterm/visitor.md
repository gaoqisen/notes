---
title: 设计模式－访问者模式
date: 2018-10-27 20:10:11
tags: java visitor
categories: patterm
keywords: visitor
description: 访问者模式是由被访问者和访问者组成的，访问者模式可以让不同的访问者访问不同的操作。
---

## 一、理解访问者模式

访问者模式定义:封装某些作用于某种数据结构中各元素的操作，它可以在不改变数据结构的前提下定义作用于这些元素的新的操作。

个人理解访问者模式就是让不同的访问者可以访问不同的操作。访问者模式在实现过程中可以在不改变数据结构的情况下，添加新的操作，实现开闭原则。

## 二、代码实现

创建电脑访问者

```
// 电脑组件访问者
public interface ComputerPartVisitor {
	public void visit(Keyboard k);  // 访问键盘
	public void visit(Mouse mouse); // 访问鼠标
}

class ComputerPartDisplayVisitor implements ComputerPartVisitor{

	@Override
	public void visit(Keyboard k) {
		System.out.println("键盘");
	}

	@Override
	public void visit(Mouse mouse) {
		System.out.println("鼠标");
	}
	
}
```

创建电脑

```
// 电脑组件
public interface ComputerPart {
	public void accept(ComputerPartVisitor cpv);  // 接受方法
}
// 键盘
class Keyboard implements ComputerPart{
	@Override
	public void accept(ComputerPartVisitor cpv) {
		cpv.visit(this);
	}
}
// 鼠标
class Mouse implements ComputerPart{

	@Override
	public void accept(ComputerPartVisitor cpv) {
		cpv.visit(this);
	}
}
// 电脑
class Computer implements ComputerPart{
	ComputerPart[] parts;
	
	public Computer() {  // 构造器给parts赋值
		parts = new ComputerPart[]{new Mouse(), new Keyboard()};
	}
	@Override
	public void accept(ComputerPartVisitor cpv) {
		for(ComputerPart cp : parts) {
			cp.accept(cpv);
		}
	}
}
```

main 方法实现

```
public static void main(String[] args) {
		ComputerPart cp = new Computer();
		cp.accept(new ComputerPartDisplayVisitor());
	}
	
```
	
运行结果
	
```
鼠标
键盘

```


## 三、UML类图

![访问者模式](https://gaoqisen.github.io/GraphBed/201810/20181028201822.png)

## 四、笔记

当你想要为一个对象的组合添加新的能力的时候，而且感觉封装不是很重要的时候，就可以使用访问者模式。

访问者模式的优点：

- 允许你对组合结构加入新的操作，而无需改变结构本身。

- 想要加入新的操作，相对容易

- 访问者所进行的操作，其代码是集中在一起的。

访问者的用途和缺点

- 在使用访问者模式的时候，会打破组合类的封装。

- 因为经常性的新增操作，所以对组合结构的改变就更加困难

