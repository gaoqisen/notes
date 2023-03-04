<template><div><p>之前学习的是适配器模式与外观模式。</p>
<h4 id="对外观模式与适配器模式的理解" tabindex="-1"><a class="header-anchor" href="#对外观模式与适配器模式的理解" aria-hidden="true">#</a> 对外观模式与适配器模式的理解</h4>
<p>适配器模式的意思就是适配，将三孔插座转换为二孔插座的转换头。通过适配器可以将两个不一样的接口（有共同点）适配在一起。
外观模式就是统一接口，将很多方法，统一在一个类里面实现。让使用者不会感觉方法太多杂乱。就像一个开关控制所有电器，和每个电器单独使用的一样。如果使用一个开关控制所有，就会特别方便。但是之前的开关也存在，如果需要单独使用，也是可以的。</p>
<p>先看下定义</p>
<blockquote>
<p>模版方法：在一个方法中定义一个算法的骨架，而将一些步骤延伸到子类中。模版方法使得子类可以在不改变算法结构的情况下，重新定义算法中的某些步骤</p>
</blockquote>
<h2 id="一、-对模版方法的理解" tabindex="-1"><a class="header-anchor" href="#一、-对模版方法的理解" aria-hidden="true">#</a> 一、 对模版方法的理解</h2>
<p>模版方法就是将重复的方法封装在一个类中，变动的方法就用抽象方法抽象出来。将方法模版化，其它子类使用的时候，公用的方法就不用再次实现类，只需要实现抽象方法。大大的降低类代码的重复。比较好玩的就是钩子方法，可以通过子类控制父类的通用方法，很方便。</p>
<h2 id="二、-代码实现" tabindex="-1"><a class="header-anchor" href="#二、-代码实现" aria-hidden="true">#</a> 二、 代码实现</h2>
<p>创建烹饪抽象类</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>public abstract class Cooking {
	// 准备烹饪
	public void prepareCooking() {
		WashingVegetables();
		addVegetables();
		addSalt();
		// 根据菜的样式判断是否加辣椒
		if (isChiliHooks()) {
			addChili();
		}
	}
	// 洗菜
	public void WashingVegetables() {
		System.out.println("洗菜");
	}
	// 加盐
	public void addSalt(){
		System.out.println("加盐");
	}
	// 加辣椒
	public void addChili() {
		System.out.println("加辣椒");
	}
	// 是否加辣椒钩子
	public boolean isChiliHooks() {
		return true;
	}
	// 放菜进锅炒，根据不同的实现，炒不同的菜
	abstract void addVegetables();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建大白菜类，大白菜重构类模版方法的抽象方法，放入类大白菜</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>// 大白菜
public class ChineseCabbage extends Cooking{

	@Override
	void addVegetables() {
		System.out.println("放入大白菜");
	}

}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建生菜类，也实现类抽象方法。最后重写类父类的钩子，实现类不加辣椒</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>// 炒生菜
public class lettuce extends Cooking{

	@Override
	void addVegetables() {
		System.out.println("放入生菜");
	}
	// 不放辣椒
	public boolean isChiliHooks() {
		return false;
	}
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>main方法实现</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>public static void main(String agrs[]) {
		ChineseCabbage cc = new ChineseCabbage();
		cc.prepareCooking();
		System.out.println("+++++++++");
		lettuce lt = new lettuce();
		lt.prepareCooking();
	}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行结果</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>洗菜
放入大白菜
加盐
加辣椒
+++++++++
洗菜
放入生菜
加盐
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="三、uml类图" tabindex="-1"><a class="header-anchor" href="#三、uml类图" aria-hidden="true">#</a> 三、UML类图</h2>
<p><img src="https://upload-images.jianshu.io/upload_images/7172355-2b166f930c4b510e.png" alt="模版方法模式"></p>
<h2 id="四、笔记" tabindex="-1"><a class="header-anchor" href="#四、笔记" aria-hidden="true">#</a> 四、笔记</h2>
<blockquote>
<p>封装变化</p>
</blockquote>
<blockquote>
<p>多用组合、少用继承</p>
</blockquote>
<blockquote>
<p>面向接口编程、不面向实现编程</p>
</blockquote>
<blockquote>
<p>只和朋友交谈</p>
</blockquote>
<blockquote>
<p>对修改关闭、对扩展开放</p>
</blockquote>
<blockquote>
<p>为交互对象之间的松耦合设计而努力</p>
</blockquote>
<blockquote>
<p>别找我、我会找你（好莱坞原则）</p>
</blockquote>
<blockquote>
<p>依赖抽象、不要依赖具体类</p>
</blockquote>
<p>巩固模版方法定义:</p>
<blockquote>
<p>在一个方法中定义一个算法的骨架，而将一些步骤延伸到子类中。模版方法使得子类可以在不改变算法结构的情况下，重新定义算法中的某些步骤</p>
</blockquote>
<p>github源码：<a href="https://github.com/gaoqisen/java-pattern" target="_blank" rel="noopener noreferrer">https://github.com/gaoqisen/java-pattern<ExternalLinkIcon/></a></p>
</div></template>


