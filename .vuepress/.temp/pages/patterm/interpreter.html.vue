<template><div><h2 id="一、对解释器的理解" tabindex="-1"><a class="header-anchor" href="#一、对解释器的理解" aria-hidden="true">#</a> 一、对解释器的理解</h2>
<p>解释器就像翻译一样，将我们不认识的语言（简化的语言如o2o）翻译为我们认识的普通的语言。如果事物频繁的出现，但是比较复杂，不容易看懂。我们就可以把它表述为一个简单的事物，最用用一个解释器去解释简单的事物就可以了。</p>
<h2 id="二、代码实现" tabindex="-1"><a class="header-anchor" href="#二、代码实现" aria-hidden="true">#</a> 二、代码实现</h2>
<p>创建表达式接口</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>// 创建一个表达式接口
public interface Expression {
	public boolean interpret(String content);  // 解释
}
        
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>终端表达式</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>// 终端表达式
public class TerminalExpression implements Expression{
	private String data;
	public TerminalExpression(String data){
		this.data = data;
	}
	@Override
	public boolean interpret(String content) {
		if (content.contains(data)) {  // 包含
			return true;
		}
		return false;
	}
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>与表达式</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>// 与表达式
public class OrExpression implements Expression{
	private Expression ex1;
	private Expression ex2;
	public OrExpression (Expression ex1, Expression ex2) {
		this.ex1 = ex1;
		this.ex2 = ex2;
	}
	@Override
	public boolean interpret(String content) {
		return this.ex1.interpret(content) || this.ex2.interpret(content);
	}
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>和表达式</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>// 和表达式
public class AndExpression implements Expression{
	private Expression ex1;
	private Expression ex2;
	public AndExpression(Expression ex1, Expression ex2) {
		this.ex1 = ex1;
		this.ex2 = ex2;
	}
	@Override
	public boolean interpret(String content) {
		return ex1.interpret(content) &amp;&amp; ex2.interpret(content);
	}
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>解析器</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>// 解析器
public class Interpreter {
	// 获取男性表达式
	public static Expression getMaleExpression(){
		Expression wang = new TerminalExpression("小王");
		Expression zhang = new TerminalExpression("小张");
		return new OrExpression(wang,zhang);
	}
	// 获取女性表达式
	public static Expression getWomanExpression() {
		Expression wu = new TerminalExpression("小吴");
		Expression li = new TerminalExpression("小李");
		return new OrExpression(wu,li);
	}
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>main方法实现</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>public static void main(String[] args) {
		Expression isMale = Interpreter.getMaleExpression();
		Expression isWoman = Interpreter.getWomanExpression();
		System.out.println("小李是女的"+ isWoman.interpret("小李"));
		System.out.println("小王是男的"+ isMale.interpret("小王"));
		System.out.println("小王是男的"+ isMale.interpret("小李"));
	}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行结果</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>小李是女的true
小王是男的true
小王是男的false

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="三、uml类图" tabindex="-1"><a class="header-anchor" href="#三、uml类图" aria-hidden="true">#</a> 三、UML类图</h2>
<p><img src="https://gaoqisen.github.io/GraphBed/201810/20181023231153.png" alt="interpreter"></p>
<h2 id="四、笔记" tabindex="-1"><a class="header-anchor" href="#四、笔记" aria-hidden="true">#</a> 四、笔记</h2>
<p>解释器模式的优点:</p>
<ul>
<li>
<p>将每一个语法规则表示成一个类，方便与实现语言.</p>
</li>
<li>
<p>因为语法由多个类组成，因此你可以轻易的扩张语言.</p>
</li>
<li>
<p>可以在新的类中增加新的方法，可以在解释的同时增加新的行为。</p>
</li>
</ul>
<p>解释器的用途和缺点:</p>
<ul>
<li>
<p>当需要实现一个简单的语言的时候，可以使用解释器。</p>
</li>
<li>
<p>当有一个简单的语法，简单比效率更重要是，使用解释器。</p>
</li>
<li>
<p>可以处理脚本语言和编程语言</p>
</li>
<li>
<p>如果语法规则数量太多，使用解释器模式可能会很复杂。这个时候可以使用解析器／编译器的产生器更合适。</p>
</li>
</ul>
</div></template>


