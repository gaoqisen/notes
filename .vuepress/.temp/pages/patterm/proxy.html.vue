<template><div><p>昨天将组合模式完成了，组合模式可以遍历树状的集合。迭代器模式可以遍历不同类型的集合。如果有树状结构的集合，可以优先考虑使用组合模式。</p>
<h2 id="一、对于代理模式的理解" tabindex="-1"><a class="header-anchor" href="#一、对于代理模式的理解" aria-hidden="true">#</a> 一、对于代理模式的理解</h2>
<p>定义：给目标对象提供一个代理对象，并由代理对象控制对目标对象的引用。
就想黄牛一样，委托代买票业务给黄牛，黄牛收钱买票，我不知道黄牛是如何买票的，卖票的人不知道是谁买票的，便于保护真实用户。代理模式也经常用于远程代理，和虚拟代理等</p>
<h2 id="二、代码实现" tabindex="-1"><a class="header-anchor" href="#二、代码实现" aria-hidden="true">#</a> 二、代码实现</h2>
<p>创建一个主题，用于黄牛和真实的我继承。</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>// 创建主题接口
public interface Subject {
	//  买票
	public void buyTicket();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建一个真的我，买票.实现主题</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>// 真实主题（我）
public class RealSubject implements Subject{
	@Override
	public void buyTicket() {
		System.out.println("我要买票回家");
	}
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建代理类，实现主题</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>// 代理买票（黄牛）
public class Proxy implements Subject{

	@Override
	public void buyTicket() {
		RealSubject rs = new RealSubject();
		rs.buyTicket();
		this.compterTicket();
	}
	// 不公开的买票方式，通过电脑买票
	private void compterTicket() {
		System.out.println("黄牛进行买票");
	}
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>mian方法运行</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>public static void main(String[] args) {
		// 调用者完全不知道是谁买票，只知道是一个黄牛保护目标
		Subject sb =new Proxy();
		sb.buyTicket();
	}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行结果</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>我要买票回家
黄牛进行买票
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="三、uml类图" tabindex="-1"><a class="header-anchor" href="#三、uml类图" aria-hidden="true">#</a> 三、UML类图</h2>
<p><img src="https://gaoqisen.github.io/GraphBed/201810/20181011211920.png" alt="代理模式"></p>
<h2 id="四、笔记" tabindex="-1"><a class="header-anchor" href="#四、笔记" aria-hidden="true">#</a> 四、笔记</h2>
<blockquote>
<p>封装变化</p>
</blockquote>
<blockquote>
<p>针对接口编程，不针对实现编程</p>
</blockquote>
<blockquote>
<p>对修改关闭，对扩展开放</p>
</blockquote>
<blockquote>
<p>多用组合，少用继承</p>
</blockquote>
<blockquote>
<p>为交互对象之间的松耦合设计而努力</p>
</blockquote>
<blockquote>
<p>依赖抽象，不依赖具体类</p>
</blockquote>
<blockquote>
<p>只和朋友交谈</p>
</blockquote>
<blockquote>
<p>别找我，我会找你</p>
</blockquote>
<blockquote>
<p>类应该只有一个改变的理由</p>
</blockquote>
<blockquote>
<p>定义: 为另一个对象提供一个替身或占位符以访问这个对象</p>
</blockquote>
<p>github源码：<a href="https://github.com/gaoqisen/java-pattern" target="_blank" rel="noopener noreferrer">https://github.com/gaoqisen/java-pattern<ExternalLinkIcon/></a></p>
</div></template>


