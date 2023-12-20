<template><div><h2 id="一、对中介者模式的理解" tabindex="-1"><a class="header-anchor" href="#一、对中介者模式的理解" aria-hidden="true">#</a> 一、对中介者模式的理解</h2>
<p>中介者就是处理很多类与类之前耦合太多的的一种方式。比如5个类都互相耦合，改动一个类都会动到其他的类，中介者模式利用星形结构改善这种情况。</p>
<p><img src="https://gaoqisen.github.io/GraphBed/201810/20181024225217.png" alt="中介者"></p>
<h2 id="二、-代码实现" tabindex="-1"><a class="header-anchor" href="#二、-代码实现" aria-hidden="true">#</a> 二、 代码实现</h2>
<p>中介类</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>// 抽象中介者
public abstract class AbstractMediator {
	public AbstractColleague A;
	public AbstractColleague B;
	public AbstractMediator(AbstractColleague A, AbstractColleague B){
		this.A = A;
		this.B =B;
	}
	public abstract void AaffectB();  // a转b
	public abstract void BaffectA();  // b转a
}
// 中介者
class Mediator extends AbstractMediator{

	public Mediator(AbstractColleague A, AbstractColleague B) {
		super(A, B);
	}

	@Override
	public void AaffectB() {
		int i = A.getNumber();
		B.setNumber(i*1000);
	}

	@Override
	public void BaffectA() {
		int i = B.getNumber();
		A.setNumber(i/1000);
	}
	
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同事类</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>// 抽象中介者
public abstract class AbstractMediator {
	public AbstractColleague A;
	public AbstractColleague B;
	public AbstractMediator(AbstractColleague A, AbstractColleague B){
		this.A = A;
		this.B =B;
	}
	public abstract void AaffectB();  // a转b
	public abstract void BaffectA();  // b转a
}
// 中介者
class Mediator extends AbstractMediator{

	public Mediator(AbstractColleague A, AbstractColleague B) {
		super(A, B);
	}

	@Override
	public void AaffectB() {
		int i = A.getNumber();
		B.setNumber(i*1000);
	}

	@Override
	public void BaffectA() {
		int i = B.getNumber();
		A.setNumber(i/1000);
	}
	
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>main方法运行</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>public static void main(String[] args) {
		AbstractColleague collA = new ColleagueA();
		AbstractColleague collB = new ColleagueB();
		
		AbstractMediator am = new Mediator(collA, collB);
		collA.setNumber(1000, am);
		System.out.println("collA:"+collA.getNumber());
		System.out.println("collB:"+collB.getNumber());
		
		System.out.println("-------");
		collB.setNumber(1000, am);
		System.out.println("collA:"+collA.getNumber());
		System.out.println("collB:"+collB.getNumber());
	}
	
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行结果</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>collA:1000
collB:1000000
----
collA:1
collB:1000

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="三、uml类图" tabindex="-1"><a class="header-anchor" href="#三、uml类图" aria-hidden="true">#</a> 三、UML类图</h2>
<p><img src="https://gaoqisen.github.io/GraphBed/201810/20181024230518.png" alt="中介者模式"></p>
<h2 id="四、笔记" tabindex="-1"><a class="header-anchor" href="#四、笔记" aria-hidden="true">#</a> 四、笔记</h2>
<p>中介者模式定义: 用一个中介者对象封装一系列的对象交互，中介者使各对象不需要显示的相互作用，从而使耦合松散，而且可以独立的改变它们之间的交互。</p>
<p>中介者模式的优点：</p>
<ul>
<li>
<p>将对象解耦之后，可以增加对象的互用</p>
</li>
<li>
<p>通过将控制逻辑集中，可以简化系统维护</p>
</li>
<li>
<p>可以让对象之间传递的消息变的简单，而且大幅度减少</p>
</li>
</ul>
<p>中介者模式用途和缺点</p>
<ul>
<li>
<p>中介者模式常常被用来协调相关的GUI组件</p>
</li>
<li>
<p>如果设计不当，中介者对象本身会变的过于复杂</p>
</li>
</ul>
</div></template>


