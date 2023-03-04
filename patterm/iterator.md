---
title: 设计模式－迭代器模式
date: 2018-09-26 22:50:11
tags: java
categories: patterm
---

昨天学习的是模版方法模式复习一下
#### 对于模版方法的理解：
模版方法模式就是创建一个模版类，并创建一个抽象方法，和调用方法。该方法（一般是静态方法，不能修改的）调用复用的模版类方法（实现通用的业务逻辑）和抽象方法。子类继承模版类之后，重写抽象方法（不同的业务逻辑）。模版类中可以设置钩子方法，用于控制模版类的通用方法是否调用。
这样做的好处就是可以子类可以调用很多通用的方法，减少大量的重复代码。抽象方法也可以实现子类独有的方法。钩子还可以控制通用方法。使方法调用更加的灵活。模版方法就是为类的方法创建特别灵活的模版。
## 一、对于迭代器的理解
通过看书之后，我觉得迭代器就是一个可以遍历所有不同集合类型对象的的一种方式。如用ArrayList, new [], HashMap等集合存储对象数据。如果要遍历就需要写三个for循环才可以完成遍历。但是有迭代器之后，就可以用一个迭代器完成三种不同类型的集合的遍历。总结出来就是：迭代器可以遍历所有实现了迭代器接口的不同类型的集合
## 二、代码实现
实现思路：创建一个宠物类，有动物的名字、年龄、简介等。动物生病了就会找医生。每个医生都有自己的笼子，张医生的笼子使用ArrayList制作的。李医生的笼子使用Animal[]制作的。两个医生都在同一个宠物店里面上班。医生太忙了，领导来医院视察的时候，需要服务员小花去给领导报告两位医生的宠物都叫什么名字，年龄多少、宠物具体的情况等。如果没有迭代器，小花就需要拿张医生的ArrayList笼子的钥匙去看，李医生的钥匙和张医生的钥匙又不一样，每次都要拿不同的钥匙看不同的笼子，特别麻烦。而且还要去每个医生的工作区域才可以。但是有了迭代器，小花就不用拿这个多钥匙了，只要一种钥匙，而且不用去两个工作区域查看，就感觉像迭代器将宠物汇总了。小花只要拿一种钥匙，不用知道医生使用什么笼子关宠物的，只需要在一个地方查看在记录好报告领导就可以了。下面看代码。
#### 1、 自己创建一个迭代器实现
创建一个动物类

```java
// 动物类
public class Animal {
	String name;
	int age;
	String description;
	public Animal(String name, int age, String des) {
		this.name = name;
		this.age = age;
		this.description = des;
	}
	public String getName() {
		return name;
	}
	public int getAge() {
		return age;
	}
	public String getDescription() {
		return description;
	}
}
```
创建张医生和李医生，用不同的笼子关动物

```java
// 张医生用ArrayList笼子关动物
public class DoctorZhang {
	ArrayList ans;
	public DoctorZhang() {
		ans = new ArrayList();
		addAnimal("小狗",8, "黄色的小狗");
		addAnimal("小猫",4, "黑色的小猫");
		addAnimal("小猪",4, "白色的小猪");
	}
	// 增加动物方法
	public void addAnimal(String name, int age, String des){
		Animal an = new Animal(name, age, des);
		this.ans.add(an);
	}
	public Iterator createIterator() {
		return new DoctorZhangIterator(this.ans);
	}
}
// 李医生用［］笼子关动物
class DoctorLi{
	static final int MAX=5;
	int number = 0;
	Animal[] animal;
	public DoctorLi() {
		animal =new Animal[MAX];
		addAnimal("小乌龟",8, "黄色的小乌龟");
		addAnimal("小猴",4, "黑色的小猴");
		addAnimal("大猪",4, "黄色的大猪");
	}
	// 增加动物方法
	public void addAnimal(String name, int age, String des){
		if (number>=MAX){
			return;
		}
		Animal an = new Animal(name, age, des);
		this.animal[number] = an;
		this.number++;
	}
	public Iterator createIterator() {
		return new DoctorLiIterator(this.animal);
	}
}
```
创建一个迭代器，并用张医生李医生去实现迭代器

```java
// 迭代器接口
public interface Iterator {
	boolean hasNext();
	Object next();
}
// 李医生迭代器实现迭代器接口
class DoctorZhangIterator implements Iterator{
	ArrayList ans;
	int index = 0;
	public DoctorZhangIterator(ArrayList ans) {
		this.ans = ans;
	}
	@Override
	public boolean hasNext() {
		if (index >= ans.size() || ans.get(index) == null) {
			return false;
		} else {
			return true;
		}
	}

	@Override
	public Object next() {
		Animal animal = (Animal) ans.get(index);
		index ++;
		return animal;
	}
	
}
//张医生迭代器实现迭代器接口
class DoctorLiIterator implements Iterator{
	Animal[] animal;
	int index = 0;
	public DoctorLiIterator(Animal[] animal) {
		this.animal = animal;
	}
	@Override
	public boolean hasNext() {
		if (index >= animal.length || animal[index] == null) {
			return false;
		} else {
			return true;
		}
	}

	@Override
	public Object next() {
		Animal an = animal[index];
		index ++;
		return an;
	}
	
}
```
创建一个宠物店类

```java
// 宠物店
public class PetShop {
	DoctorZhang zhang;
	DoctorLi li;
	public PetShop(DoctorZhang zhang,DoctorLi li) {
		this.zhang = zhang;
		this.li = li;
	}
	// 小花就用这个方法统计宠物
	public void printAnimal() {
		Iterator it = zhang.createIterator();
		Iterator its = li.createIterator();
		
		System.out.println("张医生的宠物");
		printAnimal(it);
		System.out.println("李医生的宠物");
		printAnimal(its);
	}
	private void printAnimal(Iterator it) {
		while(it.hasNext()) {
			Animal an = (Animal)it.next();
			System.out.println("名字为："+an.getName()+"   年龄为："+an.getAge() + "  介绍："+an.getDescription());
		}
	}
}
```
main方法实现－－ 领导来视察了，小花就去统计

```java
public static void main(String args[]) {
		DoctorZhang zhang =new DoctorZhang();
		DoctorLi li = new DoctorLi();
		PetShop ps =new PetShop(zhang, li);
		ps.printAnimal();
}
```
运行结果

```java
张医生的宠物
名字为：小狗   年龄为：8  介绍：黄色的小狗
名字为：小猫   年龄为：4  介绍：黑色的小猫
名字为：小猪   年龄为：4  介绍：白色的小猪
李医生的宠物
名字为：小乌龟   年龄为：8  介绍：黄色的小乌龟
名字为：小猴   年龄为：4  介绍：黑色的小猴
名字为：大猪   年龄为：4  介绍：黄色的大猪
```
#### 2、用上面的代码重构为java util 类里面的迭代器实现

动物类不变动，改动两个医生的代码迭代器为。注意迭代器换为了import java.util.Iterator;

```java
// 张医生实现java util里面的迭代器
public class DoctorZhangIteratorJavaUtil implements Iterator{
	Animal[] ans;
	int index = 0;
	public DoctorZhangIteratorJavaUtil(Animal[] ans) {
		this.ans = ans;
	}
	@Override
	public boolean hasNext() {
		if (index >= ans.length || ans[index] == null) {
			return false;
		} else {
			return true;
		}
	}
	@Override
	public Object next() {
		Animal animal = (Animal) ans[index];
		index ++;
		return animal;
	}
	public void remove() {
		if (index <=0) {
			throw new IllegalStateException("没有可以删除的了");
		}
		if(ans[index-1] !=null) {
			for(int i = index-1; i<(ans.length -1); i++) {
				ans[i] = ans[i+1];
			}
			ans[ans.length - 1] = null;
		}
	}
}
class DoctorLiIteratorJavaUtil implements Iterator{
	ArrayList ans;
	int index = 0;
	public DoctorLiIteratorJavaUtil(ArrayList ans) {
		this.ans = ans;
	}
	@Override
	public boolean hasNext() {
		if (index >= ans.size() || ans.get(index) == null) {
			return false;
		} else {
			return true;
		}
	}
	@Override
	public Object next() {
		Animal animal = (Animal) ans.get(index);
		index ++;
		return animal;
	}
}
```
改动两个医生的代码为。注意迭代器换为了import java.util.Iterator;

```java
// 张医生用ArrayList区分动物
public class DoctorLiJavaUtil implements Doctor{
	ArrayList ans;
	public DoctorLiJavaUtil() {
		ans = new ArrayList();
		addAnimal("小狗",8, "黄色的小狗");
		addAnimal("小猫",4, "黑色的小猫");
		addAnimal("小猪",4, "白色的小猪");
	}
	// 增加动物方法
	public void addAnimal(String name, int age, String des){
		Animal an = new Animal(name, age, des);
		this.ans.add(an);
	}
	public Iterator createIterator() {
	   // 直接使用ArrayList的迭代器
		return this.ans.iterator();
	}
}
// 李医生用［］区分动物
class DoctorZhangJavaUtil implements Doctor{
	static final int MAX=5;
	int number = 0;
	Animal[] animal;
	public DoctorZhangJavaUtil() {
		animal =new Animal[MAX];
		addAnimal("小乌龟",8, "黄色的小乌龟");
		addAnimal("小猴",4, "黑色的小猴");
		addAnimal("大猪",4, "黄色的大猪");
	}
	// 增加动物方法
	public void addAnimal(String name, int age, String des){
		if (number>=MAX){
			return;
		}
		Animal an = new Animal(name, age, des);
		this.animal[number] = an;
		this.number++;
	}
	public Iterator createIterator() {
		return new DoctorZhangIteratorJavaUtil(this.animal);
	}
}
// 新增的医生接口
interface Doctor {
	public Iterator createIterator();
}
```

更改宠物店的代码
		
```java
	// 宠物店
	import java.util.Iterator;
	public class PetShopJavaUtil {
		Doctor zhang;
		Doctor li;
		public PetShopJavaUtil(Doctor zhang,Doctor li) {
			this.zhang = zhang;
			this.li = li;
		}
		public void printAnimal() {
			Iterator it = zhang.createIterator();
			Iterator its = li.createIterator();
		System.out.println("张医生的宠物");
		printAnimal(it);
		System.out.println("李医生的宠物");
		printAnimal(its);
	}
	private void printAnimal(Iterator it) {
		if (it == null) {
			return;
		}
		while(it.hasNext()) {
			Animal an = (Animal)it.next();
			System.out.println("名字为："+an.getName()+"   年龄为："+an.getAge() + "  介绍："+an.getDescription());
		}
	}
}

```
main方法运行

```java
public static void main(String args[]) {
		
		// java.util 迭代器使用
		System.out.println("++++++++++++++++java.util 迭代器 ");
		DoctorZhangJavaUtil zhangJavaUtil =new DoctorZhangJavaUtil();
		DoctorLiJavaUtil liJavaUtil = new DoctorLiJavaUtil();
		PetShopJavaUtil psJavaUtil =new PetShopJavaUtil(zhangJavaUtil, liJavaUtil);
		psJavaUtil.printAnimal();
	}

```

运行结果

```java
++++++++++++++++java.util 迭代器 
张医生的宠物
名字为：小乌龟   年龄为：8  介绍：黄色的小乌龟
名字为：小猴   年龄为：4  介绍：黑色的小猴
名字为：大猪   年龄为：4  介绍：黄色的大猪
李医生的宠物
名字为：小狗   年龄为：8  介绍：黄色的小狗
名字为：小猫   年龄为：4  介绍：黑色的小猫
名字为：小猪   年龄为：4  介绍：白色的小猪
```
## 三、UML类图
![Screen Shot 2018-09-28 at 11.10.03 P](https://gaoqisen.github.io/GraphBed/2018/patterm/iterator.png)

## 四、笔记   

> 封装变化

> 多用组合,少用继承

> 面向接口编程，不面向实现编程

> 为交互对象之间的松耦合设计而努力

> 对扩展开放，对修改关闭

> 只跟朋友交谈

> 依赖抽象不要依赖具体类

> 别找我，我会找你

> 类应该只有一个被改变的理由

迭代器模式定义：

> 提供一种方法顺序访问一个聚合对象中的各个元素，而又不暴其露内部的表示

github源码：[https://github.com/gaoqisen/java-pattern](https://github.com/gaoqisen/java-pattern) 

