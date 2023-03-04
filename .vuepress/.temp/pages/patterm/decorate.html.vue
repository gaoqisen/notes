<template><div><p>之前学习的是观察模式，复习观察者模式</p>
<h2 id="观察者模式一般在那些地方使用" tabindex="-1"><a class="header-anchor" href="#观察者模式一般在那些地方使用" aria-hidden="true">#</a> 观察者模式一般在那些地方使用：</h2>
<p>比如我们有两个对象，一个对象依赖于另一个对象的变化而变化，此时我们可以将这两个对象抽象出来，做成接口，利用观察者模式来进行解耦，又或者，当一个对象发生变化的时候，需要通知别的对象来做出改变，但又不知道这样的对象有多少个，此时利用观察者模式非常合适。</p>
<h2 id="使用观察者模式的好处" tabindex="-1"><a class="header-anchor" href="#使用观察者模式的好处" aria-hidden="true">#</a> 使用观察者模式的好处：</h2>
<p>第一、观察者模式在被观察者和观察者之间建立一个抽象的耦合。被观察者角色所知道的只是一个具体观察者列表，每一个具体观察者都符合一个抽象观察者的接口。被观察者并不认识任何一个具体观察者，它只知道它们都有一个共同的接口。由于被观察者和观察者没有紧密地耦合在一起，因此它们可以属于不同的抽象化层次。如果被观察者和观察者都被扔到一起，那么这个对象必然跨越抽象化和具体化层次。</p>
<p>第二、观察者模式支持广播通讯。被观察者会向所有的登记过的观察者发出通知，</p>
<h2 id="观察者模式有下面的缺点" tabindex="-1"><a class="header-anchor" href="#观察者模式有下面的缺点" aria-hidden="true">#</a> 观察者模式有下面的缺点：</h2>
<p>第一、如果一个被观察者对象有很多的直接和间接的观察者的话，将所有的观察者都通知到会花费很多时间。
第二、如果在被观察者之间有循环依赖的话，被观察者会触发它们之间进行循环调用，导致系统崩溃。在使用观察者模式是要特别注意这一点。
第三、如果对观察者的通知是通过另外的线程进行异步投递的话，系统必须保证投递是以自恰的方式进行的。
第四、虽然观察者模式可以随时使观察者知道所观察的对象发生了变化，但是观察者模式没有相应的机制使观察者知道所观察的对象是怎么发生变化的。</p>
<h2 id="一、对装饰者模式的理解" tabindex="-1"><a class="header-anchor" href="#一、对装饰者模式的理解" aria-hidden="true">#</a> 一、对装饰者模式的理解</h2>
<p>可以想象为给房子装修，有英式风格的房子、中式风格的房子，英式风格有英式风格的桌子、椅子，中式风格有中式风格的桌子椅子、等等。但是我们在装修房子的时候会自己去找材料，椅子有不同的风格、不同的厂家等。最后我们用这些不同的材料来装饰自己的房子。
我们可以建立一个房子的抽象类，用材料去实现房子的抽象类。中式风格的房子、英式风格的房子都去实现房子的抽象类。之后用桌子、椅子具体的实现去继承材料抽象类。这样就可以用多态（父类的引用指向自类的对象），具体的看下面的代码</p>
<h2 id="二、代码实现" tabindex="-1"><a class="header-anchor" href="#二、代码实现" aria-hidden="true">#</a> 二、代码实现</h2>
<p>创建房子抽象类</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>// 房子抽象类
public abstract class House {
	String description = "毛坯房";  // 房子的描述
	public String getDescription() {
		return this.description;
	}
	public abstract double cost();   // 房子的成本成本
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建材料抽象类、继承房子类</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>// 装修材料
public abstract class Material extends House{
	public abstract String getDescription();  // 重写获取房子描述的方法
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>中式风格的房子类、中式风格椅子类、中式风格桌子类</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>// 中式风格的房子
public class ChineseStyle extends House{
	public ChineseStyle() {
		description = "中式风格的房子";
	}
	@Override
	public double cost() {
		return 888;
	}

}
// 中式风格的椅子
class ChineseChair extends Material{
	House house;
	public ChineseChair(House house){
		this.house = house;
	}
	public String getDescription() {
		return house.getDescription() + "＊＊＊中式风格的椅子";
	}
	public double cost () {
		return 20 + house.cost();
	}
}
// 中式风格的桌子
class ChineseDesk extends Material{
	House house;
	public ChineseDesk(House house){
		this.house = house;
	}
	public String getDescription() {
		return house.getDescription() + "***中式风格的桌子";
	}
	public double cost () {
		return 50 + house.cost();
	}
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>英式风格的房子、英式风格的桌子、英式风格的椅子</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>// 英式风格
public class EnglandStyle extends House{
	public EnglandStyle() {
		description = "英式风格的房子";
	}
	@Override
	public double cost() {
		return 666;
	}

}
class EnglandChair extends Material{
	House house;
	public EnglandChair(House house){
		this.house = house;
	}
	public String getDescription() {
		return house.getDescription() + "＊＊＊英式风格的椅子";
	}
	public double cost () {
		return 20 + house.cost();
	}
}
class EnglandDesk extends Material{
	House house;
	public EnglandDesk(House house){
		this.house = house;
	}
	public String getDescription() {
		return house.getDescription() + "***英式风格的桌子";
	}
	public double cost () {
		return 50 + house.cost();
	}
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>代码运行</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>public static void main(String args[]) {
		House house  = new ChineseStyle();
		System.out.println(house.getDescription() + "***" +house.cost());
		// 英式风格的房子用 一张中式风格的桌子，和两把椅子，一把中式风格的，一把英式风格的椅子
		House house1 = new EnglandStyle();  // 英式风格的房子
		house1 = new ChineseDesk(house1);  
		house1 = new ChineseChair(house1);  
		house1 = new EnglandChair(house1);  
		System.out.println(house1.getDescription() + "***" +house1.cost());
		// 中式风格的房子用 一张中式风格的桌子，和两把椅子，一把中式风格的，一把英式风格的椅子
		House house2 = new ChineseStyle();  // 中式风格的房子
		house2 = new ChineseDesk(house2);  
		house2 = new ChineseChair(house2);  
		house2 = new EnglandChair(house2);  
		System.out.println(house2.getDescription() + "***" +house2.cost());
		// 后面就可以按照自己的喜欢装修自己的房子了
		// 其它的家具也可以更加灵活的添加了
	}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行结果</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>中式风格的房子***888.0
英式风格的房子***中式风格的桌子＊＊＊中式风格的椅子＊＊＊英式风格的椅子***756.0
中式风格的房子***中式风格的桌子＊＊＊中式风格的椅子＊＊＊英式风格的椅子***978.0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="三、uml类图" tabindex="-1"><a class="header-anchor" href="#三、uml类图" aria-hidden="true">#</a> 三、UML类图</h2>
<p><img src="https://upload-images.jianshu.io/upload_images/7172355-b1d5a3e45c75fd9b.png" alt="装饰者模式－UML"></p>
<h2 id="四、笔记" tabindex="-1"><a class="header-anchor" href="#四、笔记" aria-hidden="true">#</a> 四、笔记</h2>
<p>面向对象原则</p>
<blockquote>
<p>封装变化</p>
</blockquote>
<blockquote>
<p>多用组合、少用继承</p>
</blockquote>
<blockquote>
<p>针对接口编程、不针对实现编程</p>
</blockquote>
<blockquote>
<p>为交互对象之间的松耦合设计而努力</p>
</blockquote>
<blockquote>
<p>对扩展开发、对修改关闭</p>
</blockquote>
<p>装饰者模式的定义</p>
<blockquote>
<p>动态的将责任附加到对象上。想要扩展功能，装饰折提供有别于继承的另一种选择</p>
</blockquote>
<p>java 的 io流就是用装饰者模式实现的</p>
<p>github源码：<a href="https://github.com/gaoqisen/java-pattern" target="_blank" rel="noopener noreferrer">https://github.com/gaoqisen/java-pattern<ExternalLinkIcon/></a></p>
</div></template>


