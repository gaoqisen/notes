---
title: 设计模式－观察者模式
date: 2018-09-16 22:50:11
tags: java
categories: patterm
---
之前学习的是策略模式，复习一下之前的策略模式

### 策略模式一般在哪方面使用

“策略”百科中指[计策]。一般是指：

1. 可以实现目标的方案集合；

2. 根据形势发展而制定的行动方针和斗争方法；

3. 有斗争艺术，能注意方式方法。

用不同的策略解决不同的问题如出门的方式有自驾、火车、飞机等。选择不同的出行方式就是不同的策略,程序就是对各个算法的封装。让客服端非常方便的可以调用。就是在一个类中属性有相同的地方,但是行为方法不同，为了以后添加类特别方便，就可以考虑使用策略模式。

### 使用策略模式有什么好处

- 策略模式提供了对“开闭原则”的完美支持，用户可以在不修改原有系统的基础上选择算法或行为，也可以灵活地增加新的算法或行为。
- 策略模式提供了管理相关的算法族的办法。
- 策略模式提供了可以替换继承关系的办法。
- 使用策略模式可以避免使用多重条件转移语句。

## 一、对观察者模式的理解：
 观察者模式可以理解为很多人去观察一个事物。比如微信的公众号，公众号可以经常给用户推送信息（一周可以给每个用户推送4篇文章）。用户可以取消关注，取消之后，公众号就无法给该用户发送消息了。当用户关注该公众号之后，就可以每月接收文章了。观察者模式可以很好的实现这种功能。


## 二、代码实现

观察者模式在java中有两种实现，一种是自己实现，还有一种就是java自带的jdk中已经写好的

#### 1、自己用代码实现观察者模式

创建公众号接口，用于其他公众号实现
```java
public interface OfficialAccounts {
 public void follow(User user);   // 关注公众号
 public void unfollow(User user);	// 取消关注
 public void sendMessageAll();  // 给所有的用户发送消息
}   
```

创建一个新闻的公众号用于实现公众号接口，新增其它公众号，直接实现OfficialAccounts就好了

```java
// 新闻公众号
public class NewsOfficialAccounts implements OfficialAccounts{
 private ArrayList users;
 private String content;

public NewsOfficialAccounts () {
	users = new ArrayList();
}
@Override
public void follow(User user) {  // 关注该公众号
	users.add(user);
}

@Override
public void unfollow(User user) {  // 取消关注
	int i = users.indexOf(user);
	if(i>=0) {
		users.remove(i);
	}
}
@Override
public void sendMessageAll() {  //  给所有用户发送文章
	for(int i = 0; i<users.size();i++) {
		User user = (User) users.get(i);
		user.acceptMessage(content);
	}
}
public void setContent(String content){// 设置消息自动给所有用户发送文章
	this.content = content;
	sendMessageAll();
}
}
```

创建用户类接口，用于接受公众号文章

```java
public interface User {
 	 public void acceptMessage(String content);  // 接收消息
}
```
 创建用户实现用户接口。创建其它用户也只需要实现User接口

```java
// 用户jason
public class UserJason implements User{
 private String name = "jason";
 private String message;
 private OfficialAccounts os;
@Override
public void acceptMessage(String content) {
	System.out.println(name+"接收到了"+content);
	this.message = content;
}
public UserJason(OfficialAccounts os) {  // 构造器作为关注公众号用
	this.os = os;
	os.follow(this);
}
public void unfollow(){  // 取消关注
	os.unfollow(this);
}
}
// 用户tom
public class UserTom implements User{
 private String name = "tom";
 private String message;
 private OfficialAccounts os;
@Override
public void acceptMessage(String content) {
	System.out.println(name+"接收到了"+content);
	this.message = content;
}
public UserTom(OfficialAccounts os) {  // 构造器作为关注公众号用
	this.os = os;
	os.follow(this);
}
}
```
main方法运行

```java
public static void main(String args[]) {
	// 创建一个新闻的公众号
	NewsOfficialAccounts noa = new NewsOfficialAccounts();
	// 创建用户
	UserTom tom = new UserTom(noa);
	UserJason jason = new UserJason(noa);
	// 公众号发送消息
	noa.setContent("新闻消息1");
	noa.setContent("新闻消息2");
	jason.unfollow();   // 取消关注，jason无法接收消息3
	noa.setContent("新闻消息3");
    }
```

运行结果：实现类发现消息之后只要所有关注了新闻公众号的用户可以接受消息，没有关注的就没有接收到

```java
jason接收到了新闻消息1
tom接收到了新闻消息2
jason接收到了新闻消息2
tom接收到了新闻消息3
```

#### 2、用java jdk 自带的Observable、Observer实现

创建公众号

```java
public class BankOffcialAccounts extends Observable{ // 实现java自带的可观察者接口
	 private String content;  // 接受的消息
	 public BankOffcialAccounts(){};  // 构造器
	 public void changed() {    // 消息变化方法
		setChanged();
		notifyObservers();   // 通知所有观察者
	 }
	public void sendMessage(String content) {  // 发送消息
		this.content = content;
		changed();
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {   // 写入公众号内容
		this.content = content;
	}	
} 
```

创建一个用java自带的观察者用户（同上面的UserJason、UserTom）

```java
public class UserJDK implements Observer{  // 实现java自带的观察者
 Observable observable;
 private String name = "jdk";
 private String content;

@Override
public void update(Observable o, Object arg) {
	if (o instanceof BankOffcialAccounts) {
		BankOffcialAccounts boa = (BankOffcialAccounts)o;
		this.content = boa.getContent();
		System.out.println(name+"接收到了"+content);
	}
}
public UserJDK(Observable o) {
	this.observable = o;
	observable.addObserver(this);
}	
}
```
和之前自己写的观察者模式一起运行

```java
public static void main(String args[]) {
	// 创建一个新闻的公众号
	NewsOfficialAccounts noa = new NewsOfficialAccounts();
	// 创建用户
	UserTom tom = new UserTom(noa);
	UserJason jason = new UserJason(noa);
	BankOffcialAccounts bank = new BankOffcialAccounts();
	UserJDK jdk = new UserJDK(bank);
	// 发送消息
	noa.setContent("新闻消息1");
	noa.setContent("新闻消息2");
	jason.unfollow();   // 取消关注，jason无法接收消息3
	noa.setContent("新闻消息3");
	bank.sendMessage("发送消息4");
}
```

运行结果

    tom接收到了新闻消息1
    jason接收到了新闻消息1
    tom接收到了新闻消息2
    jason接收到了新闻消息2
    tom接收到了新闻消息3
    jdk接收到了发送消息4
需要注意的是Observable是一个类，必须要写一个类基础他。限制类Observable的复用潜力

## 三、UML类图

![自己实现的观察模式](https://upload-images.jianshu.io/upload_images/7172355-d7da88a3cf293893.png)

![java jdk自带的](https://upload-images.jianshu.io/upload_images/7172355-0d648cd23685d4a3.png)
Observable、Observer 是java jdk自带的

## 四、笔记

1、面向对象原则
> 封装变化

>多用组合、少用继承

>针对接口编程、不针对实现编程

>为交互对象之间的松耦合而努力

2、观察模式定义
在对象之间定义一对多的依赖、这样一来，当一个对象改变状态，依赖它的对象都会收到通知，并自动更新


github源码：[https://github.com/gaoqisen/java-pattern](https://github.com/gaoqisen/java-pattern)



