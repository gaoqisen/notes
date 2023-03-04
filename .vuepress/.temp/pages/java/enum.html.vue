<template><div><h2 id="原理" tabindex="-1"><a class="header-anchor" href="#原理" aria-hidden="true">#</a> 原理</h2>
<blockquote>
<p>枚举本质上是通过普通的类来实现的，只是编译器为我们进行了处理。每个枚举类型都继承自java.lang.Enum， 并自动添加了values和valueOf方法。而每个枚举常量是一个静态常量字段，使用内部类实现，该内部类继承了枚举类。所有枚举常量都通过静态代码块来进行初始化，即在类加载期间就初始化。另外通过把clone、readObject、writeObject这三个方法定义为final的，同时实现是抛出相应的异常。这样保证了每个枚举类型及枚举常量都是不可变的。可以利用枚举的这两个特性来实现线程安全的单例。（来源：https://blog.csdn.net/u010142437/article/details/80498020）</p>
</blockquote>
<h2 id="作用" tabindex="-1"><a class="header-anchor" href="#作用" aria-hidden="true">#</a> 作用</h2>
<ol>
<li>枚举可以代替常量，枚举提供了比常量更多的方法。</li>
<li>使用枚举，能让我们的代码可读性更强。</li>
</ol>
<h2 id="注意事项" tabindex="-1"><a class="header-anchor" href="#注意事项" aria-hidden="true">#</a> 注意事项</h2>
<ol>
<li>枚举类名建议带上Enum后缀</li>
<li>枚举成员名称需要全部大写</li>
<li>单词间用下划线分割</li>
<li>阿里规约【强制】：所有的枚举类型字段必须要有注释，说明每个数据项的用途。</li>
<li>枚举类型对象之间的值比较，是可以使用==，直接来比较值，是否相等，不是必须使用equals方法</li>
</ol>
<h2 id="特性" tabindex="-1"><a class="header-anchor" href="#特性" aria-hidden="true">#</a> 特性</h2>
<ol>
<li>它不能有public的构造函数，这样做可以保证客户代码没有办法新建一个enum的实例。</li>
<li>所有枚举值都是public , static , final的。注意这一点只是针对于枚举值，我们可以和在普通类里面定义</li>
<li>变量一样定义其它任何类型的非枚举变量，这些变量可以用任何你想用的修饰符。</li>
<li>Enum默认实现了java.lang.Comparable接口。</li>
<li>Enum覆载了了toString方法，因此我们如果调用Color.Blue.toString()默认返回字符串”Blue”.</li>
<li>Enum提供了一个valueOf方法，这个方法和toString方法是相对应的。调用valueOf(“Blue”)将返回Color.Blue.</li>
<li>因此我们在自己重写toString方法的时候就要注意到这一点，一把来说应该相对应地重写valueOf方法。</li>
<li>Enum还提供了values方法，这个方法使你能够方便的遍历所有的枚举值。</li>
<li>Enum还有一个oridinal的方法，这个方法返回枚举值在枚举类种的顺序，这个顺序根据枚举值声明的顺序而定，这里Color.Red.ordinal()返回0。</li>
</ol>
<h2 id="常用方法" tabindex="-1"><a class="header-anchor" href="#常用方法" aria-hidden="true">#</a> 常用方法</h2>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>test<span class="token punctuation">.</span>utils</span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * @ClassName EnumExample
 */</span>
<span class="token keyword">public</span> <span class="token keyword">enum</span>  <span class="token class-name">EnumExample</span> <span class="token punctuation">{</span>
    <span class="token comment">// 红色</span>
    <span class="token function">RED</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token string">"红色"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token comment">// 蓝色</span>
    <span class="token function">BLUE</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token string">"蓝色"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token comment">// 黑色</span>
    <span class="token function">BLACK</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token string">"黑色"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token keyword">int</span> index<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>

    <span class="token comment">// 添加普通方法</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">String</span> <span class="token function">getName</span><span class="token punctuation">(</span><span class="token keyword">int</span> index<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token class-name">EnumExample</span> e <span class="token operator">:</span> <span class="token class-name">EnumExample</span><span class="token punctuation">.</span><span class="token function">values</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>index <span class="token operator">==</span> index<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">return</span> e<span class="token punctuation">.</span>name<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token class-name">EnumExample</span><span class="token punctuation">(</span><span class="token keyword">int</span> i<span class="token punctuation">,</span> <span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>index <span class="token operator">=</span> i<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">getIndex</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> index<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setIndex</span><span class="token punctuation">(</span><span class="token keyword">int</span> index<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>index <span class="token operator">=</span> index<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> name<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setName</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token class-name">EnumExample</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// 蓝色</span>
        <span class="token class-name">EnumExample</span> enumExample <span class="token operator">=</span> <span class="token class-name">EnumExample</span><span class="token punctuation">.</span><span class="token constant">BLACK</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>enumExample<span class="token punctuation">.</span>index <span class="token operator">+</span> <span class="token string">":"</span> <span class="token operator">+</span> enumExample<span class="token punctuation">.</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// 3:黑色</span>
        <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token class-name">EnumExample</span> e <span class="token operator">:</span> <span class="token class-name">EnumExample</span><span class="token punctuation">.</span><span class="token function">values</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>  <span class="token comment">// 遍历枚举</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>index <span class="token operator">+</span> <span class="token string">":"</span> <span class="token operator">+</span> e<span class="token punctuation">.</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


