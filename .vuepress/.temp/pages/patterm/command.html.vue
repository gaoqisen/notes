<template><div><p>之前学习的是单例模式。单例模式就是只有一个对象被实例化，如注册表等。单例模式有几种实现方式
一是用同步锁创建一个私有的构造器，和一个同步的公开的方法。这种方式简便，但是性能不是很好，使用的是同步锁（重量级的）。
二是创建一个静态产量直接new一个对象。也是有私有的构造器不让对象创建。通过公开的方法返回静态常量new的对象，保证对象只有一个。这种方法在jvm创建的时候就会产生对象，如果不使用该对象，则会产生浪费
三是用volatile创建静态属性。用私有构造器不让对象创建，通过公开的get方法获取对象，获取的时候判断对象是否存在，如果不存在则用同步锁防止多线程出现错误。最后返回对象。这种是常用的方法。</p>
<h2 id="一、对于命令模式的理解" tabindex="-1"><a class="header-anchor" href="#一、对于命令模式的理解" aria-hidden="true">#</a> 一、对于命令模式的理解</h2>
<p>一个命令执行一个操作。每个命令都是一个操作。不用去关心对象是怎么做的，只需要发送命令即可。就像传菜员一样。</p>
<h2 id="二、-代码实现" tabindex="-1"><a class="header-anchor" href="#二、-代码实现" aria-hidden="true">#</a> 二、 代码实现</h2>
<p>创建一个命令接口</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>// 命令接口
public interface Command {
	public void execute();  // 执行
	public void undo();   // 撤销
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在创建一个电视</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>// 电视
public class TV {
	public void on() {
		System.out.println("开电视");
	}
	public void off() {
		System.out.println("关电视");
	}
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建一个开电视命令</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>// 开电视
public class TVOnCommand implements Command{
	TV tv;
	public TVOnCommand(TV tv) {
		this.tv = tv;
	}
	@Override
	public void execute() {
		tv.on();
	}

	@Override
	public void undo() {
		System.out.println("开电视撤销准备。。。");
		tv.off();
	}

}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建一个关电视命令</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>public class TVOffCommand implements Command{
	TV tv;
	public TVOffCommand(TV tv) {
		this.tv = tv;
	}
	@Override
	public void execute() {
		tv.off();
	}

	@Override
	public void undo() {
		System.out.println("关电视撤销准备。。。");
		tv.on();
	}

}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建一个简单的远程控制器（遥控器）</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>// 简单远程控制
public class SimpleRemoteController {
	Command command;
	Command undoCommand;
	public SimpleRemoteController(){};
	// 利用有参构造器初始化命令
	public void setCommand(Command command) {
		this.command = command;
	}
	public void start() {
		command.execute();
		this.undoCommand = this.command;
	}
	public void undo() {
		this.undoCommand.undo();
	}
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>main方法实现</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>public static void main(String args[]) {
		// 创建远程控制器
		SimpleRemoteController simpleRemoteController = new SimpleRemoteController();
		TV tv = new TV();  // 创建电视
		
		TVOnCommand tvon = new TVOnCommand(tv);  // 创建关电视命令
		simpleRemoteController.setCommand(tvon);  // 通过远程控制器设置关电视的命令
		simpleRemoteController.start();  // 按开始按钮
		simpleRemoteController.undo();
		
		TVOffCommand tvoff = new TVOffCommand(tv);  // 创建关电视命令
		simpleRemoteController.setCommand(tvoff);  // 通过远程控制器设置关电视的命令
		simpleRemoteController.start();  // 按开始按钮
		simpleRemoteController.undo();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行结果</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>开电视
开电视撤销准备。。。
关电视
关电视
关电视撤销准备。。。
开电视
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="实现宏命令-实现一组命令" tabindex="-1"><a class="header-anchor" href="#实现宏命令-实现一组命令" aria-hidden="true">#</a> 实现宏命令（实现一组命令）</h4>
<p>创建宏命令</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>// 宏命令
public class MacroCommand implements Command{
	Command[] commands;
	public MacroCommand(Command[] command){
		this.commands = command;
	}
	@Override
	public void execute() {
		for(Command c : this.commands ){
			c.execute();
		}
	}

	@Override
	public void undo() {
		for(Command c : this.commands ){
			c.undo();
		}
	}

}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建宏的远程控制</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>// 遥控器
public class RemoteController {
	Command[] onCommands;
	Command[] offCommands;
	public RemoteController () {
		this.onCommands = new Command[2];
		this.offCommands = new Command[2];
	}
	public void setCommand(int index, Command on,Command off) {
		this.onCommands[index] = on;
		this.offCommands[index] = off;
	}
	public void on(int index) {
		this.onCommands[index].execute();
	}
	public void off(int index) {
		this.offCommands[index].execute();
	}
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建一个电脑操作类</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>public class Computer {
	public void on() {
		System.out.println("开电脑");
	}
	public void off() {
		System.out.println("关电脑");
	}
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>关电脑命令</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>public class ComputerOffCommand implements Command{
	Computer computer;
	public ComputerOffCommand(Computer com) {
		this.computer = com;
	}
	@Override
	public void execute() {
		this.computer.off();
	}

	@Override
	public void undo() {
		System.out.println("关电脑撤销准备。。。");
		this.computer.on();
	}

}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>开电脑命令</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>public class ComputerOnCommand implements Command{
	Computer computer;
	public ComputerOnCommand(Computer computer) {
		this.computer = computer;
	}
	@Override
	public void execute() {
		this.computer.on();
	}

	@Override
	public void undo() {
		System.out.println("开电脑撤销准备。。。");
		this.computer.off();
	}

}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>main方法运行</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>		Computer computer = new Computer();
		RemoteController remoteController = new RemoteController();
		ComputerOffCommand coffc = new ComputerOffCommand(computer);
		ComputerOnCommand conc = new ComputerOnCommand(computer);
		// 实现宏命令
		Command[] on = {tvon, conc};
		Command[] off = {tvoff,coffc};
		MacroCommand onmc = new MacroCommand(on);
		MacroCommand offmc = new MacroCommand(off);
		remoteController.setCommand(0, onmc, offmc);
		System.out.println("宏命令结束");
		remoteController.on(0);
		System.out.println("单独执行");
		remoteController.off(0);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行结果</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>宏命令结束
开电视
开电脑
单独执行
关电视
关电脑
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="三、uml类图" tabindex="-1"><a class="header-anchor" href="#三、uml类图" aria-hidden="true">#</a> 三、UML类图</h2>
<p><img src="https://upload-images.jianshu.io/upload_images/7172355-69b0cc0e0dd2b6a9.png" alt="命令模式"></p>
<p><img src="https://upload-images.jianshu.io/upload_images/7172355-441fd56b90632ea8.png" alt="命令模式+run"></p>
<h2 id="四、笔记" tabindex="-1"><a class="header-anchor" href="#四、笔记" aria-hidden="true">#</a> 四、笔记</h2>
<blockquote>
<p>封装变化</p>
</blockquote>
<blockquote>
<p>多用组合少用继承</p>
</blockquote>
<blockquote>
<p>针对接口编程，不针对实现编程</p>
</blockquote>
<blockquote>
<p>为交互对象之间的松耦合设计而努力</p>
</blockquote>
<blockquote>
<p>对扩展开放、对修改关闭</p>
</blockquote>
<blockquote>
<p>依赖抽象，不依赖具体类</p>
</blockquote>
<p>命令模式定义：</p>
<blockquote>
<p>将请求封装成对象，这可以让你使用不同的请求、队列，或者日志请求来参数化其它对象。命令模式也可以支持撤销操作。</p>
</blockquote>
<p>github源码：<a href="https://github.com/gaoqisen/java-pattern" target="_blank" rel="noopener noreferrer">https://github.com/gaoqisen/java-pattern<ExternalLinkIcon/></a></p>
</div></template>


