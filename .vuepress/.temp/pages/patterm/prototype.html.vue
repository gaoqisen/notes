<template><div><h2 id="一、对原型模式的理解" tabindex="-1"><a class="header-anchor" href="#一、对原型模式的理解" aria-hidden="true">#</a> 一、对原型模式的理解</h2>
<p>原型模式是创建模式的一种，主要通过复制一个实例来创建一个实例，而不是通过新建一个实例。被复制的实例，我们称之为原型，这个原型是可定制的。</p>
<h2 id="二、代码实现" tabindex="-1"><a class="header-anchor" href="#二、代码实现" aria-hidden="true">#</a> 二、代码实现</h2>
<p>创建原型类，实现原型接口</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>// 原型
public abstract class Prototype implements Cloneable{
	public Object clone() throws CloneNotSupportedException{
		return super.clone();
	}
}
class ConcretePrototype1 extends Prototype{
	public static int classFlay = 1;
	// 克隆自身方法
	public Object clone() throws CloneNotSupportedException{
		return (ConcretePrototype1)super.clone();
	}
}
class ConcretePrototype2 extends Prototype{
	public static int classFlay = 2;
	// 克隆自身方法
	public Object clone() throws CloneNotSupportedException{
		return (ConcretePrototype2)super.clone();
	}
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>main方法实现</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>	public static void main(String[] args) throws CloneNotSupportedException{
		Prototype pro = new ConcretePrototype1();
		ConcretePrototype1 cp = (ConcretePrototype1)pro.clone();
		System.out.println("标记："+ cp.classFlay);
		
		Prototype pro2 = new ConcretePrototype2();
		ConcretePrototype2 cps = (ConcretePrototype2)pro2.clone();
		System.out.println("标记："+ cps.classFlay);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行结果</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>标记：1
标记：2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="三、uml类图" tabindex="-1"><a class="header-anchor" href="#三、uml类图" aria-hidden="true">#</a> 三、UML类图</h2>
<p><img src="https://gaoqisen.github.io/GraphBed/201810/20181027132200.png" alt="原型模式"></p>
<h2 id="四、笔记" tabindex="-1"><a class="header-anchor" href="#四、笔记" aria-hidden="true">#</a> 四、笔记</h2>
<p>原型的优点:</p>
<ul>
<li>
<p>性能提高</p>
</li>
<li>
<p>避免构造函数的约束</p>
</li>
<li>
<p>让客户隐藏制造新实例的复杂性</p>
</li>
<li>
<p>提供然客户能够产生未知类型对象的选项</p>
</li>
<li>
<p>在有些时候，复制对象比创建对象更有效</p>
</li>
</ul>
<p>原型的用途和缺点</p>
<ul>
<li>
<p>在一个复杂类层次中，当系统需要许多类型创建新对象的时候，可以考虑使用原型模式</p>
</li>
<li>
<p>对象复制的时候，有些时候特别的复杂</p>
</li>
</ul>
</div></template>


