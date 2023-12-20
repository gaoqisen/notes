---
title: 设计模式－责任链模式
date: 2018-10-19 20:50:11
tags: java chainOfResponsibility
categories: patterm
keywords: chainOfResponsibility
description: 当你有一个以上对象有机会处理某个请求的时候，就使用责任链模式。
---

## 一、对责任链模式的理解 

一个请求需要由多个对象处理，这些对象可以链接成为一条链。具体由那个类处理，由判断条件决定，如果该对象不能处理，则传给下一个对象处理。责任链将请求和处理分开。责任链比较好的例子就向请假一样，你需要请假10天，需要由你的主管确认，经理确认，总经理确认，全部通过才可以休假。但是如果请假5天，可能总经理就不用审核了，经理直接就可以处理这件事情。还有Logger的异常处理也是这种方式。下面的代码就是基于日志实现的。

## 二、代码实现

创建一个抽象日志类

```
// 抽象日志
public abstract class AbstractLogger {
	public static int INFO = 1;
	public static int DEBUG = 2;
	public static int ERROR = 3;
	
	public int level;
	
	public AbstractLogger nextLogger;
	// 下一个链条
	public void setNextLogger(AbstractLogger al) {
		this.nextLogger = al;
	}
	public void logMessage(int le, String message) {
		if (this.level<=le) {
			write(message);
		}
		if (this.nextLogger != null) {
			this.nextLogger.logMessage(le, message);
		}
	}
	abstract public void write(String message);
}
```

创建其他类继承抽象日志类

```
// 打印日志
public class ConsoleLogger extends AbstractLogger{
	public ConsoleLogger(int le) {
		this.level = le;
	}
	@Override
	public void write(String message) {
		System.out.println("打印日志:"+message);
	}
}

class ErrorLogger extends AbstractLogger{
	public ErrorLogger(int le) {
		this.level = le;
	}
	@Override
	public void write(String message) {
		System.out.println("异常日志:"+message);
	}
}
// 文件日志
class FileLogger extends AbstractLogger{
	public FileLogger(int le) {
		this.level = le;
	}
	@Override
	public void write(String message) {
		System.out.println("文件日志:" + message);
	}
}
```

创建责任链链条

```
public class Chain {
	public static AbstractLogger getChainOfLogger() {
		AbstractLogger el = new ErrorLogger(AbstractLogger.ERROR);
		AbstractLogger fl = new FileLogger(AbstractLogger.DEBUG);
		AbstractLogger cl = new ConsoleLogger(AbstractLogger.INFO);
		el.setNextLogger(fl);
		fl.setNextLogger(cl);
		return el;
	}
}
```

main方法实现

```
public static void main(String[] args) {
		AbstractLogger al = Chain.getChainOfLogger();
		al.logMessage(AbstractLogger.INFO, "文件信息");
		al.logMessage(AbstractLogger.DEBUG, "debug信息");
		al.logMessage(AbstractLogger.ERROR, "异常信息");
	
 }
```

执行结果

```
打印日志:文件信息
文件日志:debug信息
打印日志:debug信息
异常日志:异常信息
文件日志:异常信息
打印日志:异常信息

```

## 三、UML类图

![chainOfResponsibility](https://gaoqisen.github.io/GraphBed/201810/20181019221342.png)

## 四、笔记

> 责任链定义: 避免请求发送者和接收者耦合到一起，让多个对象都有可能接收请求，将这些对象连接成一条链，并且沿着这条链传递请求，直到有对象处理它为止。责任链模式是一种对象行为行模式。

#### 责任链优点

- 将请求的发送者和接收者解耦。

- 简化对象，它不需要知道链的结构。

- 通过改变或调用链内成员的次序，允许动态新增和删除责任

#### 责任链的用途和缺点

- 经常用到窗口系统中，处理鼠标键盘等事件。

- 并不保证请求一定会被执行，如果没有处理类去处理请求的话，可以会落到链尾之外。有好有坏

- 比较不容易观察运行特征，不好排除错误。 


github源码：[https://github.com/gaoqisen/java-pattern](https://github.com/gaoqisen/java-pattern) 

