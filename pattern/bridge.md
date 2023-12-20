---
title: 设计模式－桥接模式
date: 2018-10-18 22:50:11
tags: java
categories: patterm
---

## 一、对桥接模式的理解

在很多个网站都看到了桥接模式的定义，最直观的理解就是要画正方形、圆形、长方形，画笔有红色、蓝色、紫色。当出现了两个以上的类别(形状、颜色。一个类出现了两个独立的变化的维度，且这两个维度都需要进行扩展)的时候，就可以考虑使用桥接模式了。

> 桥接模式定义:将抽象部分与实现部分分离，使他们都可以独立的变化。它是一种对象结构型模式，又称为柄体模式或接口模式。
  
## 二、 代码实现

创建颜色和形状的api接口，并创建红色、绿色、圆形、正方形等实现各自的接口。

```
// 颜色api
public interface ColorAPI {
	// 画
	public void Draw();
}
// 红色
class Red implements ColorAPI{
	@Override
	public void Draw() {
		System.out.println("用红色的笔" );
	}
}
// 绿色
class Green implements ColorAPI{
	@Override
	public void Draw() {
		System.out.println("用绿色的笔");
	}
	
}
// 形状api
interface ShapeAPI {
	// 画
	public void Draw();
}
// 圆形
class Circle implements ShapeAPI{
	@Override
	public void Draw() {
		System.out.println("画圆形");
	}
	
}
class Square implements ShapeAPI{
	@Override
	public void Draw() {
		System.out.println("画正方形");
	}
	
}
```

创建形状的抽象类，与抽象类的实现类

```
// 形状抽象类
public abstract class Shape {
	ColorAPI colorAPI;
	ShapeAPI shapeAPI;
	Shape(ColorAPI ca ,ShapeAPI sa) {
		this.colorAPI = ca;
		this.shapeAPI = sa;
	}
	// 画的抽象方法
	public abstract void draw();
}
// 形状实现
class ShapeImpl extends Shape{
	
	ShapeImpl(ColorAPI ca, ShapeAPI sa) {
		super(ca, sa);
		// TODO Auto-generated constructor stub
	}
	@Override
	public void draw() {
		this.colorAPI.Draw();
		this.shapeAPI.Draw();
	}
}
```

main方法运行

```
public static void main(String[] args) {
		Shape redCircle = new ShapeImpl(new Red(), new Circle());
		Shape greenSquare = new ShapeImpl(new Green(), new Square());
		Shape greenCircle = new ShapeImpl(new Green(), new Circle());
		redCircle.draw();
		greenSquare.draw();
		greenCircle.draw();
	}
	```
	
运行结果

```
用红色的笔
画圆形
用绿色的笔
画正方形
用绿色的笔
画圆形
```

## 三、UML类图

  ![Bridge](https://gaoqisen.github.io/GraphBed/201810/20181018205248.png)

## 四、 笔记

> 桥接模式定义: 将抽象个部分与它的实现部分分离，使他们可以独立的变化。它是一种对象结构型模式。

00原则

> 封装变化

> 针对接口编程，不针对实现编程

> 对增加开放，对修改关闭

> 不要来找我，我来找你

> 只对朋友交谈

> 为交互对象之间的松耦合设计而努力

> 多用组合，少用继承

> 类应该只有一个被改变的理由

> 依赖抽象，不依赖具体实现类

github源码：[https://github.com/gaoqisen/java-pattern](https://github.com/gaoqisen/java-pattern) 

