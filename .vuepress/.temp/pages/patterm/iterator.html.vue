<template><div><p>昨天学习的是模版方法模式复习一下</p>
<h4 id="对于模版方法的理解" tabindex="-1"><a class="header-anchor" href="#对于模版方法的理解" aria-hidden="true">#</a> 对于模版方法的理解：</h4>
<p>模版方法模式就是创建一个模版类，并创建一个抽象方法，和调用方法。该方法（一般是静态方法，不能修改的）调用复用的模版类方法（实现通用的业务逻辑）和抽象方法。子类继承模版类之后，重写抽象方法（不同的业务逻辑）。模版类中可以设置钩子方法，用于控制模版类的通用方法是否调用。
这样做的好处就是可以子类可以调用很多通用的方法，减少大量的重复代码。抽象方法也可以实现子类独有的方法。钩子还可以控制通用方法。使方法调用更加的灵活。模版方法就是为类的方法创建特别灵活的模版。</p>
<h2 id="一、对于迭代器的理解" tabindex="-1"><a class="header-anchor" href="#一、对于迭代器的理解" aria-hidden="true">#</a> 一、对于迭代器的理解</h2>
<p>通过看书之后，我觉得迭代器就是一个可以遍历所有不同集合类型对象的的一种方式。如用ArrayList, new [], HashMap等集合存储对象数据。如果要遍历就需要写三个for循环才可以完成遍历。但是有迭代器之后，就可以用一个迭代器完成三种不同类型的集合的遍历。总结出来就是：迭代器可以遍历所有实现了迭代器接口的不同类型的集合</p>
<h2 id="二、代码实现" tabindex="-1"><a class="header-anchor" href="#二、代码实现" aria-hidden="true">#</a> 二、代码实现</h2>
<p>实现思路：创建一个宠物类，有动物的名字、年龄、简介等。动物生病了就会找医生。每个医生都有自己的笼子，张医生的笼子使用ArrayList制作的。李医生的笼子使用Animal[]制作的。两个医生都在同一个宠物店里面上班。医生太忙了，领导来医院视察的时候，需要服务员小花去给领导报告两位医生的宠物都叫什么名字，年龄多少、宠物具体的情况等。如果没有迭代器，小花就需要拿张医生的ArrayList笼子的钥匙去看，李医生的钥匙和张医生的钥匙又不一样，每次都要拿不同的钥匙看不同的笼子，特别麻烦。而且还要去每个医生的工作区域才可以。但是有了迭代器，小花就不用拿这个多钥匙了，只要一种钥匙，而且不用去两个工作区域查看，就感觉像迭代器将宠物汇总了。小花只要拿一种钥匙，不用知道医生使用什么笼子关宠物的，只需要在一个地方查看在记录好报告领导就可以了。下面看代码。</p>
<h4 id="_1、-自己创建一个迭代器实现" tabindex="-1"><a class="header-anchor" href="#_1、-自己创建一个迭代器实现" aria-hidden="true">#</a> 1、 自己创建一个迭代器实现</h4>
<p>创建一个动物类</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token comment">// 动物类</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Animal</span> <span class="token punctuation">{</span>
	<span class="token class-name">String</span> name<span class="token punctuation">;</span>
	<span class="token keyword">int</span> age<span class="token punctuation">;</span>
	<span class="token class-name">String</span> description<span class="token punctuation">;</span>
	<span class="token keyword">public</span> <span class="token class-name">Animal</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token keyword">int</span> age<span class="token punctuation">,</span> <span class="token class-name">String</span> des<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>age <span class="token operator">=</span> age<span class="token punctuation">;</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>description <span class="token operator">=</span> des<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> name<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">getAge</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> age<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getDescription</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> description<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建张医生和李医生，用不同的笼子关动物</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token comment">// 张医生用ArrayList笼子关动物</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DoctorZhang</span> <span class="token punctuation">{</span>
	<span class="token class-name">ArrayList</span> ans<span class="token punctuation">;</span>
	<span class="token keyword">public</span> <span class="token class-name">DoctorZhang</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		ans <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token function">addAnimal</span><span class="token punctuation">(</span><span class="token string">"小狗"</span><span class="token punctuation">,</span><span class="token number">8</span><span class="token punctuation">,</span> <span class="token string">"黄色的小狗"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token function">addAnimal</span><span class="token punctuation">(</span><span class="token string">"小猫"</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">,</span> <span class="token string">"黑色的小猫"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token function">addAnimal</span><span class="token punctuation">(</span><span class="token string">"小猪"</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">,</span> <span class="token string">"白色的小猪"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	<span class="token comment">// 增加动物方法</span>
	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">addAnimal</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token keyword">int</span> age<span class="token punctuation">,</span> <span class="token class-name">String</span> des<span class="token punctuation">)</span><span class="token punctuation">{</span>
		<span class="token class-name">Animal</span> an <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Animal</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> age<span class="token punctuation">,</span> des<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>ans<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>an<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">public</span> <span class="token class-name">Iterator</span> <span class="token function">createIterator</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">DoctorZhangIterator</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>ans<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">// 李医生用［］笼子关动物</span>
<span class="token keyword">class</span> <span class="token class-name">DoctorLi</span><span class="token punctuation">{</span>
	<span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">int</span> <span class="token constant">MAX</span><span class="token operator">=</span><span class="token number">5</span><span class="token punctuation">;</span>
	<span class="token keyword">int</span> number <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
	<span class="token class-name">Animal</span><span class="token punctuation">[</span><span class="token punctuation">]</span> animal<span class="token punctuation">;</span>
	<span class="token keyword">public</span> <span class="token class-name">DoctorLi</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		animal <span class="token operator">=</span><span class="token keyword">new</span> <span class="token class-name">Animal</span><span class="token punctuation">[</span><span class="token constant">MAX</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
		<span class="token function">addAnimal</span><span class="token punctuation">(</span><span class="token string">"小乌龟"</span><span class="token punctuation">,</span><span class="token number">8</span><span class="token punctuation">,</span> <span class="token string">"黄色的小乌龟"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token function">addAnimal</span><span class="token punctuation">(</span><span class="token string">"小猴"</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">,</span> <span class="token string">"黑色的小猴"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token function">addAnimal</span><span class="token punctuation">(</span><span class="token string">"大猪"</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">,</span> <span class="token string">"黄色的大猪"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	<span class="token comment">// 增加动物方法</span>
	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">addAnimal</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token keyword">int</span> age<span class="token punctuation">,</span> <span class="token class-name">String</span> des<span class="token punctuation">)</span><span class="token punctuation">{</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span>number<span class="token operator">>=</span><span class="token constant">MAX</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
			<span class="token keyword">return</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
		<span class="token class-name">Animal</span> an <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Animal</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> age<span class="token punctuation">,</span> des<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>animal<span class="token punctuation">[</span>number<span class="token punctuation">]</span> <span class="token operator">=</span> an<span class="token punctuation">;</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>number<span class="token operator">++</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">public</span> <span class="token class-name">Iterator</span> <span class="token function">createIterator</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">DoctorLiIterator</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>animal<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建一个迭代器，并用张医生李医生去实现迭代器</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token comment">// 迭代器接口</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">Iterator</span> <span class="token punctuation">{</span>
	<span class="token keyword">boolean</span> <span class="token function">hasNext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token class-name">Object</span> <span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// 李医生迭代器实现迭代器接口</span>
<span class="token keyword">class</span> <span class="token class-name">DoctorZhangIterator</span> <span class="token keyword">implements</span> <span class="token class-name">Iterator</span><span class="token punctuation">{</span>
	<span class="token class-name">ArrayList</span> ans<span class="token punctuation">;</span>
	<span class="token keyword">int</span> index <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
	<span class="token keyword">public</span> <span class="token class-name">DoctorZhangIterator</span><span class="token punctuation">(</span><span class="token class-name">ArrayList</span> ans<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>ans <span class="token operator">=</span> ans<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	<span class="token annotation punctuation">@Override</span>
	<span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">hasNext</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span>index <span class="token operator">>=</span> ans<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">||</span> ans<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>index<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
			<span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>

	<span class="token annotation punctuation">@Override</span>
	<span class="token keyword">public</span> <span class="token class-name">Object</span> <span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token class-name">Animal</span> animal <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">Animal</span><span class="token punctuation">)</span> ans<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>index<span class="token punctuation">)</span><span class="token punctuation">;</span>
		index <span class="token operator">++</span><span class="token punctuation">;</span>
		<span class="token keyword">return</span> animal<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	
<span class="token punctuation">}</span>
<span class="token comment">//张医生迭代器实现迭代器接口</span>
<span class="token keyword">class</span> <span class="token class-name">DoctorLiIterator</span> <span class="token keyword">implements</span> <span class="token class-name">Iterator</span><span class="token punctuation">{</span>
	<span class="token class-name">Animal</span><span class="token punctuation">[</span><span class="token punctuation">]</span> animal<span class="token punctuation">;</span>
	<span class="token keyword">int</span> index <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
	<span class="token keyword">public</span> <span class="token class-name">DoctorLiIterator</span><span class="token punctuation">(</span><span class="token class-name">Animal</span><span class="token punctuation">[</span><span class="token punctuation">]</span> animal<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>animal <span class="token operator">=</span> animal<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	<span class="token annotation punctuation">@Override</span>
	<span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">hasNext</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span>index <span class="token operator">>=</span> animal<span class="token punctuation">.</span>length <span class="token operator">||</span> animal<span class="token punctuation">[</span>index<span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
			<span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>

	<span class="token annotation punctuation">@Override</span>
	<span class="token keyword">public</span> <span class="token class-name">Object</span> <span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token class-name">Animal</span> an <span class="token operator">=</span> animal<span class="token punctuation">[</span>index<span class="token punctuation">]</span><span class="token punctuation">;</span>
		index <span class="token operator">++</span><span class="token punctuation">;</span>
		<span class="token keyword">return</span> an<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建一个宠物店类</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token comment">// 宠物店</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">PetShop</span> <span class="token punctuation">{</span>
	<span class="token class-name">DoctorZhang</span> zhang<span class="token punctuation">;</span>
	<span class="token class-name">DoctorLi</span> li<span class="token punctuation">;</span>
	<span class="token keyword">public</span> <span class="token class-name">PetShop</span><span class="token punctuation">(</span><span class="token class-name">DoctorZhang</span> zhang<span class="token punctuation">,</span><span class="token class-name">DoctorLi</span> li<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>zhang <span class="token operator">=</span> zhang<span class="token punctuation">;</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>li <span class="token operator">=</span> li<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	<span class="token comment">// 小花就用这个方法统计宠物</span>
	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">printAnimal</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token class-name">Iterator</span> it <span class="token operator">=</span> zhang<span class="token punctuation">.</span><span class="token function">createIterator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token class-name">Iterator</span> its <span class="token operator">=</span> li<span class="token punctuation">.</span><span class="token function">createIterator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"张医生的宠物"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token function">printAnimal</span><span class="token punctuation">(</span>it<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"李医生的宠物"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token function">printAnimal</span><span class="token punctuation">(</span>its<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">printAnimal</span><span class="token punctuation">(</span><span class="token class-name">Iterator</span> it<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">while</span><span class="token punctuation">(</span>it<span class="token punctuation">.</span><span class="token function">hasNext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token class-name">Animal</span> an <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">Animal</span><span class="token punctuation">)</span>it<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"名字为："</span><span class="token operator">+</span>an<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">+</span><span class="token string">"   年龄为："</span><span class="token operator">+</span>an<span class="token punctuation">.</span><span class="token function">getAge</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">"  介绍："</span><span class="token operator">+</span>an<span class="token punctuation">.</span><span class="token function">getDescription</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>main方法实现－－ 领导来视察了，小花就去统计</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span> args<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token class-name">DoctorZhang</span> zhang <span class="token operator">=</span><span class="token keyword">new</span> <span class="token class-name">DoctorZhang</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token class-name">DoctorLi</span> li <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">DoctorLi</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token class-name">PetShop</span> ps <span class="token operator">=</span><span class="token keyword">new</span> <span class="token class-name">PetShop</span><span class="token punctuation">(</span>zhang<span class="token punctuation">,</span> li<span class="token punctuation">)</span><span class="token punctuation">;</span>
		ps<span class="token punctuation">.</span><span class="token function">printAnimal</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行结果</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>张医生的宠物
名字为：小狗   年龄为：<span class="token number">8</span>  介绍：黄色的小狗
名字为：小猫   年龄为：<span class="token number">4</span>  介绍：黑色的小猫
名字为：小猪   年龄为：<span class="token number">4</span>  介绍：白色的小猪
李医生的宠物
名字为：小乌龟   年龄为：<span class="token number">8</span>  介绍：黄色的小乌龟
名字为：小猴   年龄为：<span class="token number">4</span>  介绍：黑色的小猴
名字为：大猪   年龄为：<span class="token number">4</span>  介绍：黄色的大猪
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2、用上面的代码重构为java-util-类里面的迭代器实现" tabindex="-1"><a class="header-anchor" href="#_2、用上面的代码重构为java-util-类里面的迭代器实现" aria-hidden="true">#</a> 2、用上面的代码重构为java util 类里面的迭代器实现</h4>
<p>动物类不变动，改动两个医生的代码迭代器为。注意迭代器换为了import java.util.Iterator;</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token comment">// 张医生实现java util里面的迭代器</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DoctorZhangIteratorJavaUtil</span> <span class="token keyword">implements</span> <span class="token class-name">Iterator</span><span class="token punctuation">{</span>
	<span class="token class-name">Animal</span><span class="token punctuation">[</span><span class="token punctuation">]</span> ans<span class="token punctuation">;</span>
	<span class="token keyword">int</span> index <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
	<span class="token keyword">public</span> <span class="token class-name">DoctorZhangIteratorJavaUtil</span><span class="token punctuation">(</span><span class="token class-name">Animal</span><span class="token punctuation">[</span><span class="token punctuation">]</span> ans<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>ans <span class="token operator">=</span> ans<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	<span class="token annotation punctuation">@Override</span>
	<span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">hasNext</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span>index <span class="token operator">>=</span> ans<span class="token punctuation">.</span>length <span class="token operator">||</span> ans<span class="token punctuation">[</span>index<span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
			<span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
	<span class="token annotation punctuation">@Override</span>
	<span class="token keyword">public</span> <span class="token class-name">Object</span> <span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token class-name">Animal</span> animal <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">Animal</span><span class="token punctuation">)</span> ans<span class="token punctuation">[</span>index<span class="token punctuation">]</span><span class="token punctuation">;</span>
		index <span class="token operator">++</span><span class="token punctuation">;</span>
		<span class="token keyword">return</span> animal<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">remove</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span>index <span class="token operator">&lt;=</span><span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">IllegalStateException</span><span class="token punctuation">(</span><span class="token string">"没有可以删除的了"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
		<span class="token keyword">if</span><span class="token punctuation">(</span>ans<span class="token punctuation">[</span>index<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">!=</span><span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> index<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span> i<span class="token operator">&lt;</span><span class="token punctuation">(</span>ans<span class="token punctuation">.</span>length <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
				ans<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> ans<span class="token punctuation">[</span>i<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
			<span class="token punctuation">}</span>
			ans<span class="token punctuation">[</span>ans<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">DoctorLiIteratorJavaUtil</span> <span class="token keyword">implements</span> <span class="token class-name">Iterator</span><span class="token punctuation">{</span>
	<span class="token class-name">ArrayList</span> ans<span class="token punctuation">;</span>
	<span class="token keyword">int</span> index <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
	<span class="token keyword">public</span> <span class="token class-name">DoctorLiIteratorJavaUtil</span><span class="token punctuation">(</span><span class="token class-name">ArrayList</span> ans<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>ans <span class="token operator">=</span> ans<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	<span class="token annotation punctuation">@Override</span>
	<span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">hasNext</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span>index <span class="token operator">>=</span> ans<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">||</span> ans<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>index<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
			<span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
	<span class="token annotation punctuation">@Override</span>
	<span class="token keyword">public</span> <span class="token class-name">Object</span> <span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token class-name">Animal</span> animal <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">Animal</span><span class="token punctuation">)</span> ans<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>index<span class="token punctuation">)</span><span class="token punctuation">;</span>
		index <span class="token operator">++</span><span class="token punctuation">;</span>
		<span class="token keyword">return</span> animal<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>改动两个医生的代码为。注意迭代器换为了import java.util.Iterator;</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token comment">// 张医生用ArrayList区分动物</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DoctorLiJavaUtil</span> <span class="token keyword">implements</span> <span class="token class-name">Doctor</span><span class="token punctuation">{</span>
	<span class="token class-name">ArrayList</span> ans<span class="token punctuation">;</span>
	<span class="token keyword">public</span> <span class="token class-name">DoctorLiJavaUtil</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		ans <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token function">addAnimal</span><span class="token punctuation">(</span><span class="token string">"小狗"</span><span class="token punctuation">,</span><span class="token number">8</span><span class="token punctuation">,</span> <span class="token string">"黄色的小狗"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token function">addAnimal</span><span class="token punctuation">(</span><span class="token string">"小猫"</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">,</span> <span class="token string">"黑色的小猫"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token function">addAnimal</span><span class="token punctuation">(</span><span class="token string">"小猪"</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">,</span> <span class="token string">"白色的小猪"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	<span class="token comment">// 增加动物方法</span>
	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">addAnimal</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token keyword">int</span> age<span class="token punctuation">,</span> <span class="token class-name">String</span> des<span class="token punctuation">)</span><span class="token punctuation">{</span>
		<span class="token class-name">Animal</span> an <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Animal</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> age<span class="token punctuation">,</span> des<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>ans<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>an<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">public</span> <span class="token class-name">Iterator</span> <span class="token function">createIterator</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	   <span class="token comment">// 直接使用ArrayList的迭代器</span>
		<span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>ans<span class="token punctuation">.</span><span class="token function">iterator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">// 李医生用［］区分动物</span>
<span class="token keyword">class</span> <span class="token class-name">DoctorZhangJavaUtil</span> <span class="token keyword">implements</span> <span class="token class-name">Doctor</span><span class="token punctuation">{</span>
	<span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">int</span> <span class="token constant">MAX</span><span class="token operator">=</span><span class="token number">5</span><span class="token punctuation">;</span>
	<span class="token keyword">int</span> number <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
	<span class="token class-name">Animal</span><span class="token punctuation">[</span><span class="token punctuation">]</span> animal<span class="token punctuation">;</span>
	<span class="token keyword">public</span> <span class="token class-name">DoctorZhangJavaUtil</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		animal <span class="token operator">=</span><span class="token keyword">new</span> <span class="token class-name">Animal</span><span class="token punctuation">[</span><span class="token constant">MAX</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
		<span class="token function">addAnimal</span><span class="token punctuation">(</span><span class="token string">"小乌龟"</span><span class="token punctuation">,</span><span class="token number">8</span><span class="token punctuation">,</span> <span class="token string">"黄色的小乌龟"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token function">addAnimal</span><span class="token punctuation">(</span><span class="token string">"小猴"</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">,</span> <span class="token string">"黑色的小猴"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token function">addAnimal</span><span class="token punctuation">(</span><span class="token string">"大猪"</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">,</span> <span class="token string">"黄色的大猪"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	<span class="token comment">// 增加动物方法</span>
	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">addAnimal</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token keyword">int</span> age<span class="token punctuation">,</span> <span class="token class-name">String</span> des<span class="token punctuation">)</span><span class="token punctuation">{</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span>number<span class="token operator">>=</span><span class="token constant">MAX</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
			<span class="token keyword">return</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
		<span class="token class-name">Animal</span> an <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Animal</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> age<span class="token punctuation">,</span> des<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>animal<span class="token punctuation">[</span>number<span class="token punctuation">]</span> <span class="token operator">=</span> an<span class="token punctuation">;</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>number<span class="token operator">++</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">public</span> <span class="token class-name">Iterator</span> <span class="token function">createIterator</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">DoctorZhangIteratorJavaUtil</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>animal<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">// 新增的医生接口</span>
<span class="token keyword">interface</span> <span class="token class-name">Doctor</span> <span class="token punctuation">{</span>
	<span class="token keyword">public</span> <span class="token class-name">Iterator</span> <span class="token function">createIterator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>更改宠物店的代码</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>	<span class="token comment">// 宠物店</span>
	<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">Iterator</span></span><span class="token punctuation">;</span>
	<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">PetShopJavaUtil</span> <span class="token punctuation">{</span>
		<span class="token class-name">Doctor</span> zhang<span class="token punctuation">;</span>
		<span class="token class-name">Doctor</span> li<span class="token punctuation">;</span>
		<span class="token keyword">public</span> <span class="token class-name">PetShopJavaUtil</span><span class="token punctuation">(</span><span class="token class-name">Doctor</span> zhang<span class="token punctuation">,</span><span class="token class-name">Doctor</span> li<span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>zhang <span class="token operator">=</span> zhang<span class="token punctuation">;</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>li <span class="token operator">=</span> li<span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
		<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">printAnimal</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token class-name">Iterator</span> it <span class="token operator">=</span> zhang<span class="token punctuation">.</span><span class="token function">createIterator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token class-name">Iterator</span> its <span class="token operator">=</span> li<span class="token punctuation">.</span><span class="token function">createIterator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"张医生的宠物"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token function">printAnimal</span><span class="token punctuation">(</span>it<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"李医生的宠物"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token function">printAnimal</span><span class="token punctuation">(</span>its<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">printAnimal</span><span class="token punctuation">(</span><span class="token class-name">Iterator</span> it<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span>it <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token keyword">return</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
		<span class="token keyword">while</span><span class="token punctuation">(</span>it<span class="token punctuation">.</span><span class="token function">hasNext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token class-name">Animal</span> an <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">Animal</span><span class="token punctuation">)</span>it<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"名字为："</span><span class="token operator">+</span>an<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">+</span><span class="token string">"   年龄为："</span><span class="token operator">+</span>an<span class="token punctuation">.</span><span class="token function">getAge</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">"  介绍："</span><span class="token operator">+</span>an<span class="token punctuation">.</span><span class="token function">getDescription</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>main方法运行</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span> args<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		
		<span class="token comment">// java.util 迭代器使用</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"++++++++++++++++java.util 迭代器 "</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token class-name">DoctorZhangJavaUtil</span> zhangJavaUtil <span class="token operator">=</span><span class="token keyword">new</span> <span class="token class-name">DoctorZhangJavaUtil</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token class-name">DoctorLiJavaUtil</span> liJavaUtil <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">DoctorLiJavaUtil</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token class-name">PetShopJavaUtil</span> psJavaUtil <span class="token operator">=</span><span class="token keyword">new</span> <span class="token class-name">PetShopJavaUtil</span><span class="token punctuation">(</span>zhangJavaUtil<span class="token punctuation">,</span> liJavaUtil<span class="token punctuation">)</span><span class="token punctuation">;</span>
		psJavaUtil<span class="token punctuation">.</span><span class="token function">printAnimal</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行结果</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token operator">++</span><span class="token operator">++</span><span class="token operator">++</span><span class="token operator">++</span><span class="token operator">++</span><span class="token operator">++</span><span class="token operator">++</span><span class="token operator">++</span>java<span class="token punctuation">.</span>util 迭代器 
张医生的宠物
名字为：小乌龟   年龄为：<span class="token number">8</span>  介绍：黄色的小乌龟
名字为：小猴   年龄为：<span class="token number">4</span>  介绍：黑色的小猴
名字为：大猪   年龄为：<span class="token number">4</span>  介绍：黄色的大猪
李医生的宠物
名字为：小狗   年龄为：<span class="token number">8</span>  介绍：黄色的小狗
名字为：小猫   年龄为：<span class="token number">4</span>  介绍：黑色的小猫
名字为：小猪   年龄为：<span class="token number">4</span>  介绍：白色的小猪
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="三、uml类图" tabindex="-1"><a class="header-anchor" href="#三、uml类图" aria-hidden="true">#</a> 三、UML类图</h2>
<p><img src="https://gaoqisen.github.io/GraphBed/2018/patterm/iterator.png" alt="Screen Shot 2018-09-28 at 11.10.03 P"></p>
<h2 id="四、笔记" tabindex="-1"><a class="header-anchor" href="#四、笔记" aria-hidden="true">#</a> 四、笔记</h2>
<blockquote>
<p>封装变化</p>
</blockquote>
<blockquote>
<p>多用组合,少用继承</p>
</blockquote>
<blockquote>
<p>面向接口编程，不面向实现编程</p>
</blockquote>
<blockquote>
<p>为交互对象之间的松耦合设计而努力</p>
</blockquote>
<blockquote>
<p>对扩展开放，对修改关闭</p>
</blockquote>
<blockquote>
<p>只跟朋友交谈</p>
</blockquote>
<blockquote>
<p>依赖抽象不要依赖具体类</p>
</blockquote>
<blockquote>
<p>别找我，我会找你</p>
</blockquote>
<blockquote>
<p>类应该只有一个被改变的理由</p>
</blockquote>
<p>迭代器模式定义：</p>
<blockquote>
<p>提供一种方法顺序访问一个聚合对象中的各个元素，而又不暴其露内部的表示</p>
</blockquote>
<p>github源码：<a href="https://github.com/gaoqisen/java-pattern" target="_blank" rel="noopener noreferrer">https://github.com/gaoqisen/java-pattern<ExternalLinkIcon/></a></p>
</div></template>


