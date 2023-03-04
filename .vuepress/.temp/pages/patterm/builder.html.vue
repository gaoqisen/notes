<template><div><h2 id="一、对建造者模式的理解" tabindex="-1"><a class="header-anchor" href="#一、对建造者模式的理解" aria-hidden="true">#</a> 一、对建造者模式的理解</h2>
<p>就是将多个简单的对象一步一步构建为一个复杂的对象。主要解决软件开发中的一个复杂对象的创建。代码就实现汉堡和饮料的点餐功能。
我们创建包装接口，由瓶子装饮料，包装纸包装汉堡的实现类去实现包装接口。在创建一个项目接口，由汉堡和冷饮的抽象类去实现，之后创建各自的实现类去实现，汉堡有蔬菜汉堡和鸡肉汉堡，冷饮后百事可乐和可口可乐。在然后创建用餐的类采用list存放项目。最后创建一个用餐建造类来建造蔬菜餐和非蔬菜餐。</p>
<h2 id="二、代码实现" tabindex="-1"><a class="header-anchor" href="#二、代码实现" aria-hidden="true">#</a> 二、代码实现</h2>
<p>创建包装接口和各自的实现类</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>package study.builder;
// 装食物的填料接口
public interface Packing {
	public String pack();  // 大包
}

// 包装纸材料
class Wrapper implements Packing{
	@Override
	public String pack() {
		return "包装材料";
	}
}
// 瓶子包装
class Bottle implements Packing{
	@Override
	public String pack() {
		return "瓶子包装";
	}
	
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建项目接口，汉堡、冷饮接口以及各自的实现类</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>// 项目接口
public interface Item {
	public String name();
	public Packing packing();
	public float price();
}
// 汉堡使用包装纸包装抽象类
abstract class Burger implements Item{
	public Packing packing(){
		return new Wrapper();
	};
	public abstract float price(); 
}
// 冷饮抽象类
abstract class ColdDrink implements Item{
	public Packing packing() {
		return new Bottle();
	}
	public abstract float price();
}
// 蔬菜汉堡
class VegBurger extends Burger{
	@Override
	public String name() {
		return "蔬菜汉堡";
	}
	@Override
	public float price() {
		return 18.8f;
	}
}
// 鸡肉汉堡
class ChickenBurger extends Burger{
	@Override
	public String name() {
		return "鸡肉汉堡";
	}
	@Override
	public float price() {
		return 28.8f;
	}
}
// 可口可乐
class Coke extends ColdDrink{
	@Override
	public String name() {
		return "可口可乐";
	}
	@Override
	public float price() {
		return 5.5f;
	}
}
// 百事可乐
class Pepsi extends ColdDrink{
	@Override
	public String name() {
		return "百事可乐";
	}
	@Override
	public float price() {
		return 5.6f;
	}
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建用餐类</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>// 餐
public class Meal {
	private List&lt;Item> items = new ArrayList&lt;Item>();
	public void add(Item it ){
		this.items.add(it);
	}
	public float getCost() {
		float cost = 0.0f;
		for(Item it : items) {
			cost += it.price();
		}
		return cost;
	}
	public void showItem(){
		for(Item it : items) {
			System.out.print("项目："+it.name());
			System.out.print(", " +it.packing().pack());
			System.out.println(", 价格" + it.price());
		}
	}
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建构造餐类</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>// 建造餐
public class MealBuilder {
	// 准备蔬菜餐
	public Meal prepareVegMeal() {
		Meal meal =  new Meal();
		meal.add(new VegBurger());
		meal.add(new Coke());
		return meal;
	}
	public Meal prepareNonVegMeal() {
		Meal meal = new Meal();
		meal.add(new ChickenBurger());
		meal.add(new Pepsi());
		return meal;
	}
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>main方法实现</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>public static void main(String[] args) {
		MealBuilder mb = new MealBuilder();
		Meal vegMeal = mb.prepareVegMeal();
		vegMeal.showItem();
		System.out.println("蔬菜餐的总价："+ vegMeal.getCost());
		
		Meal nonvegMeal = mb.prepareNonVegMeal();
		nonvegMeal.showItem();
		System.out.println("肉类餐的总价："+ nonvegMeal.getCost());
	}
	
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行结果</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>项目：蔬菜汉堡, 包装材料, 价格18.8
项目：可口可乐, 瓶子包装, 价格5.5
蔬菜餐的总价：24.3
项目：鸡肉汉堡, 包装材料, 价格28.8
项目：百事可乐, 瓶子包装, 价格5.6
肉类餐的总价：34.399998

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="三、-uml类图" tabindex="-1"><a class="header-anchor" href="#三、-uml类图" aria-hidden="true">#</a> 三、 UML类图</h2>
<p><img src="https://gaoqisen.github.io/GraphBed/201810/20181018231414.png" alt="builder"></p>
<h2 id="四、-笔记" tabindex="-1"><a class="header-anchor" href="#四、-笔记" aria-hidden="true">#</a> 四、 笔记</h2>
<blockquote>
<p>定义: 将一个复杂的对象的构建与它的表示分离，使得同样的构建过程可以创建不同的表示。</p>
</blockquote>
<p>github源码：<a href="https://github.com/gaoqisen/java-pattern" target="_blank" rel="noopener noreferrer">https://github.com/gaoqisen/java-pattern<ExternalLinkIcon/></a></p>
</div></template>


