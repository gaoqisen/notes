<template><div><h2 id="一、对于复合模式的理解" tabindex="-1"><a class="header-anchor" href="#一、对于复合模式的理解" aria-hidden="true">#</a> 一、对于复合模式的理解</h2>
<p>复合模式就是很多模式一起乱炖。工厂模式、抽象工厂模式、迭代器模式、组合模式、装饰模式、适配器模式、观察者模式，在一起使用。但是每次使用的时候都是在需要的时候使用。每个模式都有各自的作用，使用在一起就是会觉得代码非常的拥挤，很混乱。这个模式我是照搬书上的代码实现的。下面的代码就比较多了，书上面是循序渐进的讲解的，我是直接粘贴自己写的代码，不是很容易理解。可以先看看下面的类图。</p>
<h2 id="二、代码实现" tabindex="-1"><a class="header-anchor" href="#二、代码实现" aria-hidden="true">#</a> 二、代码实现</h2>
<p>创建鸭叫观察者，用于统计鸭子</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>// 鸭叫观察者接口
public interface QuackObservable {
	public void registerObserver(Observer observer);
	public void notifyObservers();
}
interface Observer {
	public void update(QuackObservable duck);
}
// 观察者辅助类
class Observable implements QuackObservable{
	ArrayList observers = new ArrayList();
	QuackObservable duck;
	public  Observable(QuackObservable q){
		this.duck = q;
	}
	@Override
	public void registerObserver(Observer observer) {
		this.observers.add(observer);
	}

	@Override
	public void notifyObservers() {
		Iterator it = this.observers.iterator();
		while (it.hasNext()) {
			Observer ob = (Observer)it.next();
			ob.update(duck);
		}
	}
	
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建鸭叫能力接口以及各种鸭子</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>// 鸭叫能力接口
public interface Quackable extends QuackObservable{
	public void quack();  // 呱呱叫
}
// 绿头鸭实现鸭叫能力接口
class MallardDurk implements Quackable{
	Observable ob;
	@Override
	public void quack() {
		System.out.println("绿头鸭嘎嘎叫");
		this.ob = new Observable(this);
	}
	@Override
	public void registerObserver(Observer observer) {
		this.ob.registerObserver(observer);
	}
	@Override
	public void notifyObservers() {
		this.ob.notifyObservers();
	}
}
// 红头鸭也实现鸭叫能力接口
class RedheadDuck implements Quackable{
	Observable ob;
	@Override
	public void quack() {
		System.out.println("红头鸭嘎嘎叫");
		this.ob = new Observable(this);
	}
	@Override
	public void registerObserver(Observer observer) {
		this.ob.registerObserver(observer);
	}
	@Override
	public void notifyObservers() {
		this.ob.notifyObservers();
	}
}
//鸭鸣器也实现了鸭叫能力接口
class DuckCall implements Quackable{
	Observable ob;
	@Override
	public void quack() {
		System.out.println("鸭鸣器嘎嘎叫");
		this.ob = new Observable(this);
	}

	@Override
	public void registerObserver(Observer observer) {
		this.ob.registerObserver(observer);
	}

	@Override
	public void notifyObservers() {
		this.ob.notifyObservers();
	}
}
// 橡皮鸭也实现了鸭叫能力接口
class RubberDuck implements Quackable{
	Observable ob;
	@Override
	public void quack() {
		System.out.println("橡皮鸭嘎嘎叫");
		this.ob = new Observable(this);
	}
	@Override
	public void registerObserver(Observer observer) {
		this.ob.registerObserver(observer);
	}
	@Override
	public void notifyObservers() {
		this.ob.notifyObservers();
	}
}

// 鹅
class Goose{
	public void honk() {
		System.out.println("鹅咯咯叫");
	}
}
// 用适配器模式将鹅适配为鸭子
class GooseAdapter implements Quackable{
	Observable ob;
	Goose goose;
	public GooseAdapter(Goose goose) {
		this.ob = new Observable(this);
		this.goose = goose;
	}
	@Override
	public void quack() {
		this.goose.honk();
	}
	@Override
	public void registerObserver(Observer observer) {
		this.ob.registerObserver(observer);
	}
	@Override
	public void notifyObservers() {
		this.ob.notifyObservers();
	}
}
// 利用装饰者模式，在不改变原来鸭子类的情况下给鸭子添加计数功能
class QuackCounter implements Quackable{
	Observable ob;
	Quackable duck;
	static int num;
	public QuackCounter (Quackable quack) {
		this.ob = new Observable(quack);
		this.duck = quack;
	}
	@Override
	public void quack() {
		this.duck.quack();
		num++;
	}
	public static int getNum() {
		return num;
	}
	@Override
	public void registerObserver(Observer observer) {
		this.ob.registerObserver(observer);
	}
	@Override
	public void notifyObservers() {
		this.ob.notifyObservers();
	}
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建鸭叫的各种工厂</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>// 鸭叫抽象工厂
public abstract class AbstractDuckFactory {
	public abstract Quackable createMallardDuck();
	public abstract Quackable createRedheadDuck();
	public abstract Quackable createDuckCall();
	public abstract Quackable createRubberDuck();
}

// 鸭叫工厂实现鸭叫抽象工厂
class DuckFactory extends AbstractDuckFactory{
	@Override
	public Quackable createMallardDuck() {
		return new MallardDurk();
	}
	@Override
	public Quackable createRedheadDuck() {
		return new RedheadDuck();
	}
	@Override
	public Quackable createDuckCall() {
		return new DuckCall();
	}
	@Override
	public Quackable createRubberDuck() {
		return new RubberDuck();
	}
}

// 统计鸭子工厂继承鸭子抽象工厂
class CountingDuckFactory extends AbstractDuckFactory{
	@Override
	public Quackable createMallardDuck() {
		// 先用叫声计数装饰着将quackable装饰起来
		return new QuackCounter(new MallardDurk());
	}
	@Override
	public Quackable createRedheadDuck() {
		return new QuackCounter(new RedheadDuck());
	}
	@Override
	public Quackable createDuckCall() {
		return new QuackCounter(new DuckCall());
	}
	@Override
	public Quackable createRubberDuck() {
		return new QuackCounter(new RubberDuck());
	}
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建一群鸭子</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>// 用组合模式实现一群鸭子
public class Flock implements Quackable{
	Observable ob;
	ArrayList list = new ArrayList();
	public Flock() {
		this.ob = new Observable(this);
	}
	@Override
	public void quack() {
		Iterator it = list.iterator();  // 迭代器模式
		while(it.hasNext()) {
			Quackable q = (Quackable)it.next();
			q.quack();
		}
	}
	public void add(Quackable q) {
		list.add(q);
	}
	@Override
	public void registerObserver(Observer observer) {
		this.ob.registerObserver(observer);
	}
	@Override
	public void notifyObservers() {
		this.ob.notifyObservers();
	}
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建呱呱叫学家</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>public class Quackologist implements Observer{

	@Override
	public void update(QuackObservable duck) {
		System.out.println("呱呱叫学家："+duck);
	}

}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建鸭子模拟器</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>// 鸭子模拟器
public class DuckSimulator {
	public void simulate() {  // 模拟
		Quackable mallardDuck =new QuackCounter( new MallardDurk());
		Quackable redheadDuck = new QuackCounter(new RedheadDuck());
		Quackable duckCall = new QuackCounter(new DuckCall());
		Quackable rubberDuck = new QuackCounter(new RubberDuck());
		Quackable goose = new GooseAdapter(new Goose());  // 一只鹅
		sumulate(mallardDuck);
		sumulate(redheadDuck);
		sumulate(duckCall);
		sumulate(rubberDuck);
		sumulate(goose);
		System.out.println("鸭子的数量为:"+QuackCounter.getNum());
	}
	private void sumulate(Quackable qa) {
		qa.quack();
	}
	// 重写构造方法
	public void simulate(AbstractDuckFactory adf) {
		Quackable mallardDuck =adf.createMallardDuck();
		Quackable redheadDuck = adf.createRedheadDuck();
		Quackable duckCall = adf.createDuckCall();
		Quackable rubberDuck = adf.createRubberDuck();
		Quackable goose = new GooseAdapter(new Goose());  // 一只鹅
		
		Flock fock = new Flock();  // 一群乱七八糟的鸭子
		fock.add(redheadDuck);
		fock.add(rubberDuck);
		fock.add(duckCall);
		fock.add(mallardDuck);
		
		Flock focks = new Flock();
		Quackable redheadDuck1 = adf.createRedheadDuck();  //一群红头鸭子
		Quackable redheadDuck2 = adf.createRedheadDuck();
		Quackable redheadDuck3 = adf.createRedheadDuck();
		Quackable redheadDuck4 = adf.createRedheadDuck();
		
		focks.add(redheadDuck4);
		focks.add(redheadDuck3);
		focks.add(redheadDuck2);
		focks.add(redheadDuck1);
		
		System.out.println("红头鸭子打头");
		sumulate(focks);
		System.out.println("乱七八糟的鸭子来了");
		sumulate(fock);
		System.out.println("鸭子的数量为:"+QuackCounter.getNum());
		
		Quackologist ql = new Quackologist();
		fock.registerObserver(ql);
		sumulate(fock);
		System.out.println("鸭子的数量为:"+QuackCounter.getNum());
	}
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>main方法运行</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>public static void main(String[] args) {
		DuckSimulator ds1 = new DuckSimulator();
		ds1.simulate();
		
		DuckSimulator ds = new DuckSimulator();
		AbstractDuckFactory adf = new CountingDuckFactory();
		ds.simulate(adf);
	}
	
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>实现结果</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>红头鸭子打头
红头鸭嘎嘎叫
红头鸭嘎嘎叫
红头鸭嘎嘎叫
红头鸭嘎嘎叫
乱七八糟的鸭子来了
红头鸭嘎嘎叫
橡皮鸭嘎嘎叫
鸭鸣器嘎嘎叫
绿头鸭嘎嘎叫
鸭子的数量为:8
红头鸭嘎嘎叫
橡皮鸭嘎嘎叫
鸭鸣器嘎嘎叫
绿头鸭嘎嘎叫
鸭子的数量为:12

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="三、uml类图" tabindex="-1"><a class="header-anchor" href="#三、uml类图" aria-hidden="true">#</a> 三、UML类图</h2>
<p><img src="https://gaoqisen.github.io/GraphBed/201810/20181016221106.png" alt="组合模式"></p>
<p>这个复合模式很复杂，需要掌握的技巧特别多，需要反复学习。后面就要学习mvc模式了，也是属于复合模式。</p>
<p>github源码：<a href="https://github.com/gaoqisen/java-pattern" target="_blank" rel="noopener noreferrer">https://github.com/gaoqisen/java-pattern<ExternalLinkIcon/></a></p>
</div></template>


