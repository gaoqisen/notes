---
title: 设计模式－策略模式
date: 2018-9-10 22:50:11
tags: java
categories: patterm
---
最近在读head frist 的设计模式。之前就了解过这本书的，感觉还不错，于是就在淘宝上购买了一本。书有500多页挺厚的一本，内容都是很容易上手的，当成漫画看就可以了。本着学习的态度，我想认认真真的把设计模式好好学习一下。设计模式很多，一个一个的学，学完一个，我就在这里纪录一下自己的学习成果、自己对设计模式的理解、以及一些笔记、代码就是自己想一个显示生活中的例子模拟实现。
## 一、对策略模式的理解
&emsp;&emsp;关于策略模式，我看完书之后回忆的起来的大概就是建立一个抽象类，抽象除类的不改变的属性，如动物的名字、年龄等这些都是每个动物都有的，不会改变的。
## 二、代码实现
创建一个动物类
```java
    public abstract class animal {
       private String name;
       private int age;
	｝
```
然后多个类继承该抽象类，如小猫、小狗等。

```java
 public class Dog extends animal{}
```

之后就是动物有的会飞、会叫等。这些都是动物的行为。之后把动物的飞行、叫喊接口化。

```java
 public interface CallBehavior {   // 叫喊行为
     public void call();
 }
 public interface FlyBehavior {  // 飞行行为
     public void fly();
 }
```
会飞、会叫都可以是动物的行为。就可以将会飞、会叫的接口组合在动物类里面，当成动物的属性

```java
 public abstract class animal {
     private String name;
     private int age;
     FlyBehavior flyBehavior;  // 让所有的动物都继承这个行为
     CallBehavior callBehavior;
  // 添加方法，用于被继承的动物共用方法
  public void performFly() {  // 执行飞行
	 flyBehavior.fly();
  }
  public void performCall() { // 执行叫喊
     callBehavior.call(); 
  }
  public void setFlyBehavior(FlyBehavior fly){   // 动态的设置飞行的实现类，可以在运行时改变动物的飞行方式
	 this.flyBehavior = fly;
  }
  public void setCallBehavior(CallBehavior call){
     this.callBehavior = call;
  }
 ｝
```
之后就用不同的实现类实现会飞、会叫的接口

```java
// 叫喊接口实现
public class CallBig implements CallBehavior{
  @Override
  public void call() {
	System.out.println("特别大声的叫");
  }
}

public class CallNoWay implements CallBehavior{
  @Override
  public void call() {
	System.out.println("不会叫");
  }
}
// 飞行接口实现
public class FlyNoWay implements FlyBehavior{
  @Override
  public void fly() {
	System.out.println("不会飞行");
  }
}
public class FlyWithWings implements FlyBehavior{
  @Override
  public void fly() {
	System.out.println("我要飞的更高");
  }
}
```
然后就可以给小狗类添加默认的构造器。

```java
public class Dog extends animal{
  public Dog() {  // 小狗的构造器
	callBehavior = new CallBig();   // 大声叫callBehavior 使用的是父类的变量
	flyBehavior = new FlyNoWay();  
  }  
}
```

调用

```java
public static void main(String args[]) {
	animal dw = new DogModle();
	dw.performFly();  // 默认飞行
	dw.performCall();  // 默认叫喊
	dw.setFlyBehavior(new FlyWithWings());  //动态绑定飞行行为
	dw.performFly();   // 更改之后的飞行方式
}
```
执行结果

    不会飞行
    特别大声的叫
    我要飞的更高

这样就动态实现了数据的绑定，根据不同的策略，绑定不同的接口。动态的完成功能，后期添加其他动物，也不需要更改之前的代码。完全做到了，对新增开放、对修改闭合的开闭原则。
## 三、UML类图
画的不正规的uml图
![策略模式-UML.png](https://upload-images.jianshu.io/upload_images/7172355-0d16b6383d232c30.png)
## 四、笔记
  #### 1、学到的三个原则
>将会变动的代码进行封装

>针对接口编程，不针对实现编程

>多用组合、少用继承

####2、策略模式定义
> 定义算法族，分别封装起来，让他们之间可以互相替换，此模式让算法的变化独立于使用算法的客户



github源码：[https://github.com/gaoqisen/java-pattern](https://github.com/gaoqisen/java-pattern)







