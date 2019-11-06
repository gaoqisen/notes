---
title: 设计模式 - 状态模式
date: 2018-10-05 22:50:11
tags: java
categories: patterm
---
之前学习的是组合模式和迭代器模式，迭代器模式已经实现了，但是组合模式，涉及到递归，没怎么理解透彻，因此准备最后攻克难关
## 一、对于状态模式的理解
状态就像初中学习的物理一样（水），水是液态的、加热之后就变成了蒸汽就是雾态、结冰了就是固态。我们就可以描述水的不同状态。
例如经常在公共场所会遇到自动售货机，没有用户投币的时候就可以理解为一种状态，投币之后是一种投币状态、用户选择产品就是一种选择状态、售货机从货架推出产品就是一种出售状态、产品卖空了就是一种售罄状态。如果我们只写一个类用if else去实现这种功能，就会有很多重复的代码。后期添加新的功能也特别不方便，需要改动的源代码也特别多。但是用状态模式去管理这些状态的话，后期添加新的功能，就会是一件很轻松的事情。而且对于后期的维护，也会大有裨益。状态模式就是将所有不同的状态都封装成类，最后通过一个展示的类去调用这些状态类，当然所有的状态类都实现了一个状态接口，方便利用多态在展示的类中去调用。
最后实现，通过同一种调用方式，可以改变不同的状态。在不同的状态下，同一个方法，可以实现不同的业务逻辑。
状态模式的定义：允许对象在内部状态改变时改变它的行为，对象看起来像是修改了它的类

## 二、代码实现

创建状态接口，并创建通用的投币、退币、选择产品、出货等方法

```
// 状态接口
public interface State {
	public void insertMoney();   //  投币
	public void exitMoney();   // 退币
	public void selectProduct();  // 选择产品
	public void dispense(); //  发放产品
}
```

创建自动售货机类

```
public class AutoSales {
    State soldOutState;
	State noMoneyState;
	State hasMoneyState;
	State soldState;
}

```

创建售罄类实现状态接口

```
// 售謦状态
public class SoldOutState implements State{
	AutoSales autoSales;
	
	public SoldOutState() {
		super();
	}
	public SoldOutState(AutoSales as) {
		this.autoSales = as;
	}
	@Override
	public void insertMoney() {
		System.out.println("以售罄，请不要投币");
		this.autoSales.setState(this.autoSales.getSoldOutState());  // 将状态改为售罄
	}

	@Override
	public void exitMoney() {
		System.out.println("以售罄，无法退币");
	}

	@Override
	public void selectProduct() {
		System.out.println("以售罄，无法选择产品");
	}

	@Override
	public void dispense() {
		System.out.println("以售罄，无法获得产品");
	}

}

```
待投币状态实现状态接口

```
// 没有投币的状态
public class NoMoneyState implements State{
	AutoSales as;
	
	public NoMoneyState() {
		super();
	}
	public NoMoneyState(AutoSales as) {
		this.as = as;
	}
	@Override
	public void insertMoney() {
		System.out.println("投币了");
		this.as.setState(this.as.getHasMoneyState());  // 将状态改为以投币
	}

	@Override
	public void exitMoney() {
		System.out.println("没有投币，无法退币");
	}

	@Override
	public void selectProduct() {
		System.out.println("没有投币，无法选择产品");
	}

	@Override
	public void dispense() {
		System.out.println("没有投币，无法出货");
	}
	
}
```

已投币状态也实现状态接口

```
// 已投币
public class HasMoneyState implements State{
	AutoSales as;
	
	public HasMoneyState() {
		super();
	}
	public HasMoneyState(AutoSales as) {
		this.as = as;
	}
	@Override
	public void insertMoney() {
		System.out.println("又投币了");
	}

	@Override
	public void exitMoney() {
		System.out.println("开始退币了");
		this.as.setState(this.as.getNoMoneyState());
	}

	@Override
	public void selectProduct() {
		System.out.println("选择产品");
	}

	@Override
	public void dispense() {
		System.out.println("发放产品");
		this.as.setState(this.as.getSoldState());
	}
	
}

```

已售出状态实现状态接口

```
// 售出状态
public class SoldState implements State{
	AutoSales as;
	
	public SoldState(AutoSales as) {
		this.as = as;
	}

	@Override
	public void insertMoney() {
		System.out.println("又投币了");
	}

	@Override
	public void exitMoney() {
		System.out.println("产品已售出,无法退币");
	}

	@Override
	public void selectProduct() {
		System.out.println("选择产品");
	}

	@Override
	public void dispense() {
		System.out.println("出货");
		if (this.as.getCount() >0 ) {
			this.as.setState(as.getNoMoneyState());  // 将状态变为没投币之前
		} else {
			System.out.println("产品卖完了");
			this.as.setState(as.getSoldOutState());  // 将状态变为售罄
		}
	}

}

```

完善自动售货机

```
// 自动售货机
public class AutoSales {
	State soldOutState;
	State noMoneyState;
	State hasMoneyState;
	State soldState;

	State state = soldState;
	int  count = 0;
	
	public AutoSales(int num) {
		this.count = num;
		soldOutState = new SoldOutState(this);
		noMoneyState = new NoMoneyState(this);
		hasMoneyState = new HasMoneyState(this);
		soldState = new SoldState(this);
		if (num>0) {
			state = noMoneyState;
		}
	}
	//  投币
	public void insertMoney(){
		state.insertMoney();
	};  
	// 退币
	public void exitMoney(){
		this.state.exitMoney();
	};  
	// 选择产品
	public void selectProduct(){
		this.state.selectProduct();
	};  
	//  发放产品
	public void dispense(){
		this.state.dispense();
	}; 
	public void setState(State state) {
		this.state = state;
	}
	public State getSoldOutState() {
		return soldOutState;
	}
	public State getNoMoneyState() {
		return noMoneyState;
	}
	public State getHasMoneyState() {
		return hasMoneyState;
	}
	public State getSoldState() {
		return soldState;
	}
	public State getState() {
		return state;
	}
	public int getCount() {
		return count;
	}
	@Override
	public String toString() {
		return "AutoSales [售罄=" + soldOutState.getClass() + ", 待投币=" + noMoneyState.getClass() + ", 已投币="
				+ hasMoneyState.getClass() + ", 出售=" + soldState.getClass() + ", state状态=" + state.getClass() + ", count=" + count + "]";
	}
}
```

main方法运行

```
public static void main(String args[]) {
		// 给自动售货机装5个产品
		AutoSales as = new AutoSales(5);  
		System.out.println("--当前状态：" +as.getState().getClass());
		
		as.insertMoney();
		System.out.println("--当前状态：" +as.getState().getClass());
		as.selectProduct();
		as.dispense();
		
		System.out.println("--当前状态：" +as.getState().getClass());
		as.exitMoney();
		System.out.println("--当前状态：" +as.getState().getClass());
		as.insertMoney();
		as.selectProduct();
		as.insertMoney();
		as.selectProduct();
		as.dispense();
		System.out.println("--当前状态：" +as.getState().getClass());
	}
	
```
	
	运行结果
	
```
--当前状态：class study.state.NoMoneyState
投币了
--当前状态：class study.state.HasMoneyState
选择产品
发放产品
--当前状态：class study.state.SoldState
产品已售出,无法退币
--当前状态：class study.state.SoldState
又投币了
选择产品
又投币了
选择产品
出货
--当前状态：class study.state.NoMoneyState

```


## 三、UML类图

![https://gaoqisen.github.io/GraphBed/201810/20181004235352.png](https://gaoqisen.github.io/GraphBed/201810/20181004235352.png)

## 四、笔记

oo原则

> 封装变化
 
> 多用组合、少用继承

> 针对接口编程，不针对实现编程

> 对修改关闭，对增加开放

> 你不要来找我，我来找你

> 为交互之间的松耦合设计而努力

> 依赖抽象，不依赖具体类

> 只和朋友交谈

> 类应该只有一个被改变的理由

状态模式定义：

> 允许对象在内部状态改变时改变它的行为，对象看起来好像修改了它的类。

github源码：[https://github.com/gaoqisen/java-pattern](https://github.com/gaoqisen/java-pattern) 

