<template><div><h2 id="一、对蝇量模式-享元模式-的理解" tabindex="-1"><a class="header-anchor" href="#一、对蝇量模式-享元模式-的理解" aria-hidden="true">#</a> 一、对蝇量模式（享元模式）的理解</h2>
<p>蝇量模式的作用就是减少对象的创建次数，比如相同的对象，总是需要实例化，而且量比较大这个时候就可以考虑使用蝇量模式了。它的实现方式就是创建Map去存储对象，每次需要新创建对象的时候，就可以在map中去判断是否存在，如果不存在则新创建，否则共享之前的对象。所有也称之为享元模式。</p>
<h2 id="二、代码实现" tabindex="-1"><a class="header-anchor" href="#二、代码实现" aria-hidden="true">#</a> 二、代码实现</h2>
<p>创建汽车类</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>public class Car {
	private String brand;
	public Car(String brand){
		System.out.println("___创建"+brand+"汽车");
		this.brand = brand;
	}
	
	public void drive() {
		System.out.println("开"+ brand + "车");
	}
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建汽车管理者</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>public class CarKeeper {
	private Map&lt;String, Car> map = new HashMap&lt;String, Car>();
	
	public Car getCar(String name) {
		Car car = this.map.get(name);
		if (car == null) {
			car = new Car(name);
			this.map.put(name, car);
			return car;
		}
		return car;
	}
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>main方法实现</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>public static void main(String[] args) {
		CarKeeper ck = new CarKeeper();
		Car car1 = ck.getCar("奥迪");
		car1.drive();
		Car car2 = ck.getCar("宝马");
		car2.drive();
		Car car3 = ck.getCar("雷克萨斯");
		car3.drive();
		Car car4 = ck.getCar("雷克萨斯");
		car4.drive();
		Car car5 = ck.getCar("宝马");
		car5.drive();
		Car car6 = ck.getCar("奥迪");
		car6.drive();
	}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行结果</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>___创建奥迪汽车
开奥迪车
___创建宝马汽车
开宝马车
___创建雷克萨斯汽车
开雷克萨斯车
开雷克萨斯车
开宝马车
开奥迪车

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="三、uml类图" tabindex="-1"><a class="header-anchor" href="#三、uml类图" aria-hidden="true">#</a> 三、UML类图</h2>
<p><img src="https://gaoqisen.github.io/GraphBed/201810/20181022222020.png" alt="享元模式"></p>
<h2 id="四、笔记" tabindex="-1"><a class="header-anchor" href="#四、笔记" aria-hidden="true">#</a> 四、笔记</h2>
<p>感觉这个模式的UML图是最简单的，和单例模式差不多。</p>
<p>蝇量模式的优点：</p>
<ul>
<li>
<p>减少运行时对象实例的个数，节省内存。</p>
</li>
<li>
<p>将许多“虚拟”对象的状态集中管理</p>
</li>
</ul>
<p>蝇量模式的用途和缺点:</p>
<ul>
<li>
<p>当一个类有许多的实例，而这些实例能被同一个方法控制的时候，就可以使用蝇量模式</p>
</li>
<li>
<p>一旦实现了蝇量模式，那么单个的逻辑实例将无法独立的实现不同的行为。</p>
</li>
</ul>
</div></template>


