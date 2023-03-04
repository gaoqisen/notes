<template><div><h2 id="一、对责任链模式的理解" tabindex="-1"><a class="header-anchor" href="#一、对责任链模式的理解" aria-hidden="true">#</a> 一、对责任链模式的理解</h2>
<p>一个请求需要由多个对象处理，这些对象可以链接成为一条链。具体由那个类处理，由判断条件决定，如果该对象不能处理，则传给下一个对象处理。责任链将请求和处理分开。责任链比较好的例子就向请假一样，你需要请假10天，需要由你的主管确认，经理确认，总经理确认，全部通过才可以休假。但是如果请假5天，可能总经理就不用审核了，经理直接就可以处理这件事情。还有Logger的异常处理也是这种方式。下面的代码就是基于日志实现的。</p>
<h2 id="二、代码实现" tabindex="-1"><a class="header-anchor" href="#二、代码实现" aria-hidden="true">#</a> 二、代码实现</h2>
<p>创建一个抽象日志类</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>// 抽象日志
public abstract class AbstractLogger {
	public static int INFO = 1;
	public static int DEBUG = 2;
	public static int ERROR = 3;
	
	public int level;
	
	public AbstractLogger nextLogger;
	// 下一个链条
	public void setNextLogger(AbstractLogger al) {
		this.nextLogger = al;
	}
	public void logMessage(int le, String message) {
		if (this.level&lt;=le) {
			write(message);
		}
		if (this.nextLogger != null) {
			this.nextLogger.logMessage(le, message);
		}
	}
	abstract public void write(String message);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建其他类继承抽象日志类</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>// 打印日志
public class ConsoleLogger extends AbstractLogger{
	public ConsoleLogger(int le) {
		this.level = le;
	}
	@Override
	public void write(String message) {
		System.out.println("打印日志:"+message);
	}
}

class ErrorLogger extends AbstractLogger{
	public ErrorLogger(int le) {
		this.level = le;
	}
	@Override
	public void write(String message) {
		System.out.println("异常日志:"+message);
	}
}
// 文件日志
class FileLogger extends AbstractLogger{
	public FileLogger(int le) {
		this.level = le;
	}
	@Override
	public void write(String message) {
		System.out.println("文件日志:" + message);
	}
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建责任链链条</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>public class Chain {
	public static AbstractLogger getChainOfLogger() {
		AbstractLogger el = new ErrorLogger(AbstractLogger.ERROR);
		AbstractLogger fl = new FileLogger(AbstractLogger.DEBUG);
		AbstractLogger cl = new ConsoleLogger(AbstractLogger.INFO);
		el.setNextLogger(fl);
		fl.setNextLogger(cl);
		return el;
	}
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>main方法实现</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>public static void main(String[] args) {
		AbstractLogger al = Chain.getChainOfLogger();
		al.logMessage(AbstractLogger.INFO, "文件信息");
		al.logMessage(AbstractLogger.DEBUG, "debug信息");
		al.logMessage(AbstractLogger.ERROR, "异常信息");
	
 }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行结果</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>打印日志:文件信息
文件日志:debug信息
打印日志:debug信息
异常日志:异常信息
文件日志:异常信息
打印日志:异常信息

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="三、uml类图" tabindex="-1"><a class="header-anchor" href="#三、uml类图" aria-hidden="true">#</a> 三、UML类图</h2>
<p><img src="https://gaoqisen.github.io/GraphBed/201810/20181019221342.png" alt="chainOfResponsibility"></p>
<h2 id="四、笔记" tabindex="-1"><a class="header-anchor" href="#四、笔记" aria-hidden="true">#</a> 四、笔记</h2>
<blockquote>
<p>责任链定义: 避免请求发送者和接收者耦合到一起，让多个对象都有可能接收请求，将这些对象连接成一条链，并且沿着这条链传递请求，直到有对象处理它为止。责任链模式是一种对象行为行模式。</p>
</blockquote>
<h4 id="责任链优点" tabindex="-1"><a class="header-anchor" href="#责任链优点" aria-hidden="true">#</a> 责任链优点</h4>
<ul>
<li>
<p>将请求的发送者和接收者解耦。</p>
</li>
<li>
<p>简化对象，它不需要知道链的结构。</p>
</li>
<li>
<p>通过改变或调用链内成员的次序，允许动态新增和删除责任</p>
</li>
</ul>
<h4 id="责任链的用途和缺点" tabindex="-1"><a class="header-anchor" href="#责任链的用途和缺点" aria-hidden="true">#</a> 责任链的用途和缺点</h4>
<ul>
<li>
<p>经常用到窗口系统中，处理鼠标键盘等事件。</p>
</li>
<li>
<p>并不保证请求一定会被执行，如果没有处理类去处理请求的话，可以会落到链尾之外。有好有坏</p>
</li>
<li>
<p>比较不容易观察运行特征，不好排除错误。</p>
</li>
</ul>
<p>github源码：<a href="https://github.com/gaoqisen/java-pattern" target="_blank" rel="noopener noreferrer">https://github.com/gaoqisen/java-pattern<ExternalLinkIcon/></a></p>
</div></template>


