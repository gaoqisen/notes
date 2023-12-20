---
title: 设计模式－单例模式
date: 2018-09-29 22:50:11
tags: java
categories: patterm
---
之前学习是简单工厂模式、工厂方法模式、抽象工厂模式，复习一下
## 简单工厂模式
简单工厂模式大概就是创建一个简单工厂类，由工厂类实例化对象。由参数决定实例化那个类
## 工厂方法模式
创建一个抽象工厂类，里面包含一个抽象方法。由这个工厂去生产产品，具体的就是实现类实现工厂，并完成抽象方法的功能实现（如月饼抽象生产类，南方月饼类实现月饼抽象生产类，北方月饼实现月饼抽象生产类，等等）。调用不是由参数决定，是由创建者决定
## 抽象工厂模式
创建抽象工厂类生产工厂，创建抽象产品类生产产品，并各自实现。形成产品族（一个大的家族）
对于之前的理解模糊可以看这个：[https://www.zhihu.com/question/20367734](https://www.zhihu.com/question/20367734)
## 一、 对单例模式的理解
单例模式就像太阳一样，只有一个。在使用的时候，只能实例化一次。不能多次实例化。
二、代码实现
```java
// 单例模式  太阳（synchronized，重量级）
public class sun {
	private static sun s = null;
	
	private sun() {}
	// 单例模式  这种方式多线程时会出现混乱的情况，不建议使用
	public static sun getSun() {
		if (s == null) {
			s = new sun();
		}
		return s;
	}
	// (同步方法)添加同步锁，在不考虑性能的时候可以使用该方法
	public static synchronized sun getSunSyn() {
		if (s == null) {
			s = new sun();
		}
		return s;
	}
}
// 月亮（双重检查加锁）
class moon {
	// volatile 当moon初始化为实例时，能保证多个线程正确的处理moon变量
	private volatile static moon m;
	
	private moon() {};
	//  减少synchronized的使用
	public static moon getMoon() {
		if (m == null) {
			synchronized (moon.class) {
				if (m == null) {
					m = new moon();
				}
			}
		}
		return m;
	}
}
// 地球（急切）
class earth{
	// 在静态初始化器中创建单件，这段代码保证了线程安全
	private static earth e = new earth();
	
	private earth(){};
	// 在jvm 加载这个类的时候创建此唯一的单例模式。
	public static earth getEarth() {
		return e;
	}
}
```
## 三、UML类图
![单例模式](https://upload-images.jianshu.io/upload_images/7172355-112d7b6958cc8047.png)

## 四、笔记
oo设计原则

> 封装变化

>  多用组合、少用继承

> 针对接口编程、不针对实现编程

> 为对象之间的松耦合设计而努力

> 类应该对扩展开发、修改关闭

> 依赖抽象、不要依赖具体类
单例模式定义：
> 确保一个类只有一个实例，并提供全局访问点

github源码：[https://github.com/gaoqisen/java-pattern](https://github.com/gaoqisen/java-pattern) 

