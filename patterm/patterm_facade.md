---
title: 设计模式－适配器与外观模式
date: 2018-09-26 22:50:11
tags: java
categories: patterm
---
之前学习的是命令模式
### 对于命令模式的理解
命令模式就是将操作封装为一个类（一个命令）。在通过一个控制器把命令封装进去，就像一个遥控器，最后通过不同的命令就可以实现不同的操作

## 一、 对适配器模式和观察者模式的理解
适配器模式就是改变一个接口，实现不同的操作。就像插座转换头一样，将三孔插座转换为二孔插座。
外观模式字面上就是好的形象的意识。将一些操作集合在一起，统一调用，简单又方便。就像家里面的插头到处都是。我们可以把所有的插头都插在一个大插板上面。每次使用的时候，就可以只用开、关大插板就可以。不用每次都插很多插头。
## 二、代码实现

#### 适配器模式
三孔插座
```
// 三孔插座
public interface SocketThree {
	public void chargeThree();
}
class SocketThreeImpl implements SocketThree{

	@Override
	public void chargeThree() {
		System.out.println("三孔插座");
	}
}
```
两孔插座
```
// 两孔插座
public interface SocketTwo {
	public void chargeTwo();
}
class SocketTwoImpl implements SocketTwo{

	@Override
	public void chargeTwo() {
		System.out.println("两孔插座");
	}
	
}
```
插座适配器
```
// 插座适配器 将三孔插座转换为二孔插座， 看着像二孔，但是实际上还是三孔
public class SocketAdapter implements SocketTwo{
	SocketThree socketThree;
	public SocketAdapter(SocketThree socketThree) {
		this.socketThree = socketThree;
	}
	@Override
	public void chargeTwo() {
		System.out.println("转换后的两孔插座");
		this.socketThree.chargeThree();
	}
}
```
main方法运行

```
// 适配器模式
		SocketThree st = new SocketThreeImpl();
		st.chargeThree();
		// 通过转换器将三孔插座转换为两孔插座
		SocketTwo stwo = new SocketAdapter(st);
		stwo.chargeTwo();
```
运行结果
```
三孔插座
转换后的两孔插座
三孔插座
```

#### 外观模式

新建电视、电灯、烤火炉类
```
public class TV {
	public void on() {
		System.out.println("开电视");
	}
	public void off() {
		System.out.println("关电视");
	}
}

class Light{
	public void on() {
		System.out.println("开电灯");
	}
	public void off() {
		System.out.println("关电灯");
	}
}
class Stove{
	public void on() {
		System.out.println("开火炉");
	}
	public void off() {
		System.out.println("关火炉");
	}
}
```
大插板（不让插头凌乱，外观好看）
```
// 买了一个大插板，将电视、烤火炉、电灯的插头都插在这个大插板上面
public class FacadeSocket {
	TV tv;
	Light light;
	Stove stove;
	public FacadeSocket(TV tv,Light light,Stove stove) {
		this.tv = tv;
		this.light = light;
		this.stove = stove;
	}
	// 通过外观模式统一处理
	public void on() {
		this.tv.on();
		this.light.on();
		this.stove.on();
	}
	public void off() {
		this.tv.off();
		this.light.off();
		this.stove.off();
	}
}
```
main方法实现
```
public static void main(String srgs[]){
            // 外观模式
		TV tv = new TV();
		Light light = new Light();
		Stove stove = new Stove();
		// 创建大插板， 统一开关
		FacadeSocket fs = new FacadeSocket(tv, light,stove);
		fs.on();
		fs.off();
}
```
运行结果
```
开电视
开电灯
开火炉
关电视
关电灯
关火炉
```
## 三、UML类图
![适配器模式](https://upload-images.jianshu.io/upload_images/7172355-ab7dda572d8d2fc2.png)
![外观模式](https://upload-images.jianshu.io/upload_images/7172355-7239f21a7ac2477a.png)

## 四、笔记
oo设计原则

> 封装变化

> 依赖接口编程，不依赖实现编程

> 为交互对象之间的松耦合设计而努力

> 对修改关闭、对扩展开放

> 多用组合，少用继承

> 依赖抽象、不依赖具体类

> 只和朋友交谈

适配器模式定义：

> 将一个类的接口，转移成为可以期望的另一个接口。适配器让原本不兼容的两个类可以合作无间

外观模式定义：

> 提供类一个统一的接口，用来访问子系统中的一群接口。外观定义类一个高层接口，让子系统更容易使用。

github源码：[https://github.com/gaoqisen/java-pattern](https://github.com/gaoqisen/java-pattern) 








