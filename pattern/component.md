---
title: 设计模式 - 组合模式
date: 2018-10-09 22:50:11
tags: java
categories: patterm
---

已经有一段时间没有写模式了，在把迭代器模式写了之后，本应该是写组合模式的，但是组合模式涉及到递归，感觉很麻烦，于是就跳跃了，没有及时写下来，之后看了代理模式，复合模式等。都没有记录下来。现在是时候好好理一下这些模式了，昨天复习了下之前的模式，特别感觉工厂方法和抽象工厂都有些模糊了。看来要努力了，加油！


## 一、对组合模式的理解
组合模式定义：允许你将对象组合成树形结构来表现“整体／部分”层次结构。组合能让客户以一致的方式处理个别对象以及对象集合。

个人理解就是处理树形结构集合的一种模式
就想树一样，是有根，有无数的树枝，无数的叶子，一成一层的，就像电脑文件夹一样

## 二、代码实现

实现抽象类
```
// 抽象组合类
public abstract class Component {
	String name;
	public Component(String name) {
		this.name = name;
	}
	public abstract void operation(int index); // 操作
}
```

实现叶子类,继承抽象组合类

```
// 叶子
public class Leaf extends Component{

	public Leaf(String name) {
		super(name);
		// TODO Auto-generated constructor stub
	}

	@Override
	public void operation(int index) {
		String str = "";
		for (int i=0; i<index; i++) {
			str = str+ "    ";
		}
		System.out.println(str + name);
	}
}
```

实现树枝类，继承抽象组合类

```
public class Composite extends Component{
	private LinkedList<Component> childer; 
	public Composite(String name) {
		super(name);
		this.childer = new LinkedList<>();
	}
	
	@Override
	public void operation(int index) {
		String str = "";
		for (int i=0; i<index; i++) {
			str = str+ "    ";
		}
		LinkedList<Component> list = this.getChilder();
		System.out.println(str + name);
		for (Component c : list) {
			c.operation(index+1);
		}
	}
	public void add(Component com) {
		this.childer.add(com);
	}
	public void remove(Component com) {
		this.childer.remove(com);
	}
	public LinkedList<Component> getChilder(){
		return this.childer;
	}
	
}
```

main方法实现

```
public static void main(String[] args) {
		Composite root = new Composite("root");
		
		Composite branch = new Composite("branch");
		Composite branch1 = new Composite("branch1");
		Composite branch2 = new Composite("branch2");
		Composite branch3 = new Composite("branch3");
		
		branch.add(new Leaf("leaf1"));
		branch.add(new Leaf("leaf2"));
		branch1.add(new Leaf("leaf3"));
		branch2.add(new Leaf("leaf4"));
		branch1.add(branch2);
		
		branch2.add(new Leaf("leaf5"));
		branch2.add(new Leaf("leaf6"));
		branch3.add(new Leaf("leaf7"));
		branch3.add(new Leaf("leaf8"));
		branch2.add(branch3);
		
		root.add(branch);
		root.add(branch1);
		root.operation(0);
	}
	```
	
	运行结果
	
	```
	root
     branch
        leaf1
        leaf2
     branch1
        leaf3
        branch2
            leaf4
            leaf5
            leaf6
            branch3
                leaf7
                leaf8
```
	
## 三、UML类图

![组合模式](https://gaoqisen.github.io/GraphBed/201810/20181010230245.png)

## 四、笔记

oo原则 

> 封装变化

> 多用组合，少用继承

> 针对接口编程，不针对实现编程

> 为交互对象之间的松耦合设计而努力

> 类应该对扩展开放，对修改关闭

> 依赖抽象，不依赖具体类

> 只和朋友交谈

> 别找我，我会找你

> 类应该只有一个改变的理由

组合模式：允许你将对象组成树形结构来表现“整体／部分”的层次结构，组合能让客户以一致的方式处理个别对象和对象组合。

组合也可以和迭代器一起使用

github源码：[https://github.com/gaoqisen/java-pattern](https://github.com/gaoqisen/java-pattern) 


