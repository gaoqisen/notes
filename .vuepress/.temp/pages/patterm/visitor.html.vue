<template><div><h2 id="一、理解访问者模式" tabindex="-1"><a class="header-anchor" href="#一、理解访问者模式" aria-hidden="true">#</a> 一、理解访问者模式</h2>
<p>访问者模式定义:封装某些作用于某种数据结构中各元素的操作，它可以在不改变数据结构的前提下定义作用于这些元素的新的操作。</p>
<p>个人理解访问者模式就是让不同的访问者可以访问不同的操作。访问者模式在实现过程中可以在不改变数据结构的情况下，添加新的操作，实现开闭原则。</p>
<h2 id="二、代码实现" tabindex="-1"><a class="header-anchor" href="#二、代码实现" aria-hidden="true">#</a> 二、代码实现</h2>
<p>创建电脑访问者</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>// 电脑组件访问者
public interface ComputerPartVisitor {
	public void visit(Keyboard k);  // 访问键盘
	public void visit(Mouse mouse); // 访问鼠标
}

class ComputerPartDisplayVisitor implements ComputerPartVisitor{

	@Override
	public void visit(Keyboard k) {
		System.out.println("键盘");
	}

	@Override
	public void visit(Mouse mouse) {
		System.out.println("鼠标");
	}
	
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建电脑</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>// 电脑组件
public interface ComputerPart {
	public void accept(ComputerPartVisitor cpv);  // 接受方法
}
// 键盘
class Keyboard implements ComputerPart{
	@Override
	public void accept(ComputerPartVisitor cpv) {
		cpv.visit(this);
	}
}
// 鼠标
class Mouse implements ComputerPart{

	@Override
	public void accept(ComputerPartVisitor cpv) {
		cpv.visit(this);
	}
}
// 电脑
class Computer implements ComputerPart{
	ComputerPart[] parts;
	
	public Computer() {  // 构造器给parts赋值
		parts = new ComputerPart[]{new Mouse(), new Keyboard()};
	}
	@Override
	public void accept(ComputerPartVisitor cpv) {
		for(ComputerPart cp : parts) {
			cp.accept(cpv);
		}
	}
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>main 方法实现</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>public static void main(String[] args) {
		ComputerPart cp = new Computer();
		cp.accept(new ComputerPartDisplayVisitor());
	}
	
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行结果</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>鼠标
键盘

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="三、uml类图" tabindex="-1"><a class="header-anchor" href="#三、uml类图" aria-hidden="true">#</a> 三、UML类图</h2>
<p><img src="https://gaoqisen.github.io/GraphBed/201810/20181028201822.png" alt="访问者模式"></p>
<h2 id="四、笔记" tabindex="-1"><a class="header-anchor" href="#四、笔记" aria-hidden="true">#</a> 四、笔记</h2>
<p>当你想要为一个对象的组合添加新的能力的时候，而且感觉封装不是很重要的时候，就可以使用访问者模式。</p>
<p>访问者模式的优点：</p>
<ul>
<li>
<p>允许你对组合结构加入新的操作，而无需改变结构本身。</p>
</li>
<li>
<p>想要加入新的操作，相对容易</p>
</li>
<li>
<p>访问者所进行的操作，其代码是集中在一起的。</p>
</li>
</ul>
<p>访问者的用途和缺点</p>
<ul>
<li>
<p>在使用访问者模式的时候，会打破组合类的封装。</p>
</li>
<li>
<p>因为经常性的新增操作，所以对组合结构的改变就更加困难</p>
</li>
</ul>
</div></template>


