<template><div><h2 id="实验一" tabindex="-1"><a class="header-anchor" href="#实验一" aria-hidden="true">#</a> 实验一</h2>
<h3 id="目标" tabindex="-1"><a class="header-anchor" href="#目标" aria-hidden="true">#</a> 目标</h3>
<ol>
<li>
<p>创建两个Thread的子类Thread_ 1、Thread 2, Thread 1类用来计算阶乘的结果，Thread 2类用来读取Thread 1中的结果并显示在窗体中，</p>
</li>
<li>
<p>创建一个Thread frame 类来创建窗体，在窗体上添加标签、文本域、文本框、进度条和按钮，其中，文本域显示阶乘的计算过程，文本框显示计算结果，进度条根据文本域来显示进度;</p>
</li>
<li>
<p>为按钮添加点击事件，使得点击按钮后，运行线程;</p>
</li>
<li>
<p>创建测试类testThread,测试程序。</p>
</li>
</ol>
<h3 id="代码" tabindex="-1"><a class="header-anchor" href="#代码" aria-hidden="true">#</a> 代码</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">javax<span class="token punctuation">.</span>swing<span class="token punctuation">.</span></span><span class="token operator">*</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>awt<span class="token punctuation">.</span></span><span class="token operator">*</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>awt<span class="token punctuation">.</span>event<span class="token punctuation">.</span></span><span class="token class-name">ActionEvent</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>awt<span class="token punctuation">.</span>event<span class="token punctuation">.</span></span><span class="token class-name">ActionListener</span></span><span class="token punctuation">;</span>

<span class="token comment">// 创建Thread的子类Thread_ 1,用来计算阶乘的结果</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Thread_1</span> <span class="token keyword">extends</span> <span class="token class-name">Thread</span><span class="token punctuation">{</span>
    <span class="token comment">//存储阶乘和进度</span>
    <span class="token keyword">static</span> <span class="token class-name">String</span> stringSum<span class="token operator">=</span><span class="token string">""</span><span class="token punctuation">;</span>
    <span class="token comment">//存储阶乘和的字符串</span>
    <span class="token keyword">static</span> <span class="token class-name">String</span> stringResult<span class="token operator">=</span><span class="token string">""</span><span class="token punctuation">;</span>
    <span class="token comment">//存储阶乘结果的字符串</span>
    <span class="token keyword">static</span> <span class="token keyword">int</span> i<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token comment">//计算阶乘</span>
    <span class="token keyword">double</span> sum<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">double</span> <span class="token function">method</span><span class="token punctuation">(</span><span class="token keyword">int</span> n<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">//阶乘结果</span>
        <span class="token keyword">double</span> result<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> i<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">;</span>i<span class="token operator">&lt;=</span>n<span class="token punctuation">;</span>i<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            result<span class="token operator">*=</span>i<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> result<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">while</span><span class="token punctuation">(</span>i<span class="token operator">&lt;</span><span class="token number">30</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token comment">//计算阶乘和</span>
            i<span class="token operator">++</span><span class="token punctuation">;</span>
            sum<span class="token operator">+=</span><span class="token function">method</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
            stringResult<span class="token operator">=</span><span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span>sum<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//将阶乘和存储到字符串中</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>i<span class="token operator">!=</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                <span class="token comment">//显示阶乘和的过程：1！+2！+...+30！</span>
                stringSum<span class="token operator">=</span>stringSum<span class="token operator">+</span><span class="token string">"+"</span><span class="token operator">+</span>i<span class="token operator">+</span><span class="token string">"!"</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
                stringSum<span class="token operator">=</span>i<span class="token operator">+</span><span class="token string">"!"</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">try</span><span class="token punctuation">{</span>
                <span class="token comment">//0.5-1秒读取一次线程</span>
                <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">*</span><span class="token number">500</span><span class="token operator">+</span><span class="token number">500</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token keyword">catch</span><span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> ex<span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">// 创建Thread的子类Thread_ 2,用来读取Thread 1中的结果并显示在窗体中</span>
<span class="token keyword">class</span> <span class="token class-name">Thread_2</span> <span class="token keyword">extends</span> <span class="token class-name">Thread</span><span class="token punctuation">{</span>
    <span class="token class-name">ThreadFrame</span> tf<span class="token punctuation">;</span>
    <span class="token class-name">Thread_2</span><span class="token punctuation">(</span><span class="token class-name">ThreadFrame</span> tf<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">//初始化</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>tf<span class="token operator">=</span>tf<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">while</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            tf<span class="token punctuation">.</span>textArea<span class="token punctuation">.</span><span class="token function">setText</span><span class="token punctuation">(</span><span class="token class-name">Thread_1</span><span class="token punctuation">.</span>stringSum<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//将阶乘和的过程显示到文本域中</span>
            tf<span class="token punctuation">.</span>textFile<span class="token punctuation">.</span><span class="token function">setText</span><span class="token punctuation">(</span><span class="token class-name">Thread_1</span><span class="token punctuation">.</span>stringResult<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//将阶乘和结果显示到文本框中</span>
            tf<span class="token punctuation">.</span>jpb<span class="token punctuation">.</span><span class="token function">setValue</span><span class="token punctuation">(</span><span class="token class-name">Thread_1</span><span class="token punctuation">.</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//在面板上的进度条中显示计算进度</span>
            <span class="token keyword">try</span><span class="token punctuation">{</span>
                <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token comment">//0.1秒读取一次线程</span>
            <span class="token punctuation">}</span><span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">// 创建一个Thread frame 类来创建窗体，在窗体上添加标签、文本域、文本框、进度条和按钮，其中，文本域显示阶乘的计算过程，文本框显示计算结果，进度条根据文本域来显示进度</span>
<span class="token keyword">class</span> <span class="token class-name">ThreadFrame</span> <span class="token keyword">implements</span> <span class="token class-name">ActionListener</span> <span class="token punctuation">{</span>
    <span class="token comment">//创建面板</span>
    <span class="token class-name">JFrame</span> jframe<span class="token punctuation">;</span>
    <span class="token comment">//创建窗体</span>
    <span class="token class-name">Panel</span> panel<span class="token punctuation">;</span>
    <span class="token comment">//创建面板</span>
    <span class="token class-name">Label</span> label_title<span class="token punctuation">;</span>
    <span class="token comment">//创建标签</span>
    <span class="token class-name">Label</span> label_1<span class="token punctuation">;</span>
    <span class="token class-name">Label</span> label_2<span class="token punctuation">;</span>
    <span class="token class-name">Label</span> label_3<span class="token punctuation">;</span>
    <span class="token class-name">TextField</span> textFile<span class="token punctuation">;</span>
    <span class="token comment">//创建文本框</span>
    <span class="token class-name">TextArea</span> textArea<span class="token punctuation">;</span>
    <span class="token comment">//创建文本域</span>
    <span class="token class-name">Button</span> btn<span class="token punctuation">;</span>
    <span class="token comment">//创建按钮</span>
    <span class="token class-name">JProgressBar</span> jpb<span class="token punctuation">;</span>
    <span class="token comment">//创建进度条</span>
    <span class="token class-name">ThreadFrame</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">//创建窗体</span>
        jframe<span class="token operator">=</span><span class="token keyword">new</span> <span class="token class-name">JFrame</span><span class="token punctuation">(</span><span class="token string">"线程"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//设置窗体名称</span>
        jframe<span class="token punctuation">.</span><span class="token function">setBounds</span><span class="token punctuation">(</span><span class="token number">600</span><span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">,</span> <span class="token number">400</span><span class="token punctuation">,</span> <span class="token number">400</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//设置大小</span>
        jframe<span class="token punctuation">.</span><span class="token function">setVisible</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//设置课件</span>
        jframe<span class="token punctuation">.</span><span class="token function">setDefaultCloseOperation</span><span class="token punctuation">(</span><span class="token class-name">JFrame</span><span class="token punctuation">.</span><span class="token constant">EXIT_ON_CLOSE</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//结束进程</span>

        <span class="token comment">//创建面板</span>
        panel<span class="token operator">=</span><span class="token keyword">new</span> <span class="token class-name">Panel</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        panel<span class="token punctuation">.</span><span class="token function">setBackground</span><span class="token punctuation">(</span><span class="token class-name">Color</span><span class="token punctuation">.</span>white<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//设置背景颜色</span>
        panel<span class="token punctuation">.</span><span class="token function">setLayout</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//取消默认布局</span>
        jframe<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>panel<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">//创建标签</span>
        label_title<span class="token operator">=</span><span class="token keyword">new</span> <span class="token class-name">Label</span><span class="token punctuation">(</span><span class="token string">"多线程实验"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        label_1<span class="token operator">=</span><span class="token keyword">new</span> <span class="token class-name">Label</span><span class="token punctuation">(</span><span class="token string">"计算线程："</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        label_2<span class="token operator">=</span><span class="token keyword">new</span> <span class="token class-name">Label</span><span class="token punctuation">(</span><span class="token string">"计算进度："</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        label_3<span class="token operator">=</span><span class="token keyword">new</span> <span class="token class-name">Label</span><span class="token punctuation">(</span><span class="token string">"计算读取："</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        label_title<span class="token punctuation">.</span><span class="token function">setBounds</span><span class="token punctuation">(</span>jframe<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>width<span class="token operator">/</span><span class="token number">2</span><span class="token operator">-</span><span class="token number">50</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">,</span> <span class="token number">50</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        label_1<span class="token punctuation">.</span><span class="token function">setBounds</span><span class="token punctuation">(</span><span class="token number">30</span><span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">,</span> <span class="token number">60</span><span class="token punctuation">,</span> <span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        label_2<span class="token punctuation">.</span><span class="token function">setBounds</span><span class="token punctuation">(</span><span class="token number">30</span><span class="token punctuation">,</span> <span class="token number">160</span><span class="token punctuation">,</span> <span class="token number">60</span><span class="token punctuation">,</span> <span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        label_3<span class="token punctuation">.</span><span class="token function">setBounds</span><span class="token punctuation">(</span><span class="token number">30</span><span class="token punctuation">,</span> <span class="token number">220</span><span class="token punctuation">,</span> <span class="token number">60</span><span class="token punctuation">,</span> <span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        label_title<span class="token punctuation">.</span><span class="token function">setFont</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Font</span><span class="token punctuation">(</span><span class="token string">"宋体"</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">16</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//设置字体</span>
        panel<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>label_title<span class="token punctuation">)</span><span class="token punctuation">;</span>
        panel<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>label_1<span class="token punctuation">)</span><span class="token punctuation">;</span>
        panel<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>label_2<span class="token punctuation">)</span><span class="token punctuation">;</span>
        panel<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>label_3<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">//创建文本域</span>
        textArea<span class="token operator">=</span><span class="token keyword">new</span> <span class="token class-name">TextArea</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        textArea<span class="token punctuation">.</span><span class="token function">setBounds</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">,</span> <span class="token number">80</span><span class="token punctuation">,</span> <span class="token number">200</span><span class="token punctuation">,</span> <span class="token number">60</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        textArea<span class="token punctuation">.</span><span class="token function">setEditable</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//不可编辑</span>
        panel<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>textArea<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">//创建单行文本框</span>
        textFile<span class="token operator">=</span><span class="token keyword">new</span> <span class="token class-name">TextField</span><span class="token punctuation">(</span><span class="token string">"0"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        textFile<span class="token punctuation">.</span><span class="token function">setBounds</span><span class="token punctuation">(</span>textArea<span class="token punctuation">.</span><span class="token function">getX</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">220</span><span class="token punctuation">,</span> textArea<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>width<span class="token punctuation">,</span> <span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        textFile<span class="token punctuation">.</span><span class="token function">setEditable</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//不可编辑</span>
        panel<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>textFile<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">//创建按钮</span>
        btn<span class="token operator">=</span><span class="token keyword">new</span> <span class="token class-name">Button</span><span class="token punctuation">(</span><span class="token string">"开始计算"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        btn<span class="token punctuation">.</span><span class="token function">setBounds</span><span class="token punctuation">(</span>jframe<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>width<span class="token operator">/</span><span class="token number">2</span><span class="token operator">-</span><span class="token number">35</span><span class="token punctuation">,</span> <span class="token number">270</span><span class="token punctuation">,</span> <span class="token number">70</span><span class="token punctuation">,</span> <span class="token number">30</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        panel<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>btn<span class="token punctuation">)</span><span class="token punctuation">;</span>
        btn<span class="token punctuation">.</span><span class="token function">addActionListener</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//添加监听器</span>

        <span class="token comment">//创建进度条</span>
        jpb<span class="token operator">=</span><span class="token keyword">new</span> <span class="token class-name">JProgressBar</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        jpb<span class="token punctuation">.</span><span class="token function">setBounds</span><span class="token punctuation">(</span>textArea<span class="token punctuation">.</span><span class="token function">getX</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> textArea<span class="token punctuation">.</span><span class="token function">getY</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">+</span>textArea<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>height<span class="token operator">+</span><span class="token number">10</span><span class="token punctuation">,</span> textArea<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>width<span class="token punctuation">,</span> <span class="token number">40</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        jpb<span class="token punctuation">.</span><span class="token function">setMaximum</span><span class="token punctuation">(</span><span class="token number">30</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//设置最大值</span>
        panel<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>jpb<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 为按钮添加点击事件，使得点击按钮后，运行线程</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">actionPerformed</span><span class="token punctuation">(</span><span class="token class-name">ActionEvent</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">//按钮点击事件</span>
        <span class="token comment">//调用计算线程</span>
        <span class="token class-name">Thread_1</span> ct<span class="token operator">=</span><span class="token keyword">new</span> <span class="token class-name">Thread_1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Thread</span> tc<span class="token operator">=</span><span class="token keyword">new</span> <span class="token class-name">Thread</span><span class="token punctuation">(</span>ct<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//调用读取线程</span>
        <span class="token class-name">Thread_2</span> rt<span class="token operator">=</span><span class="token keyword">new</span> <span class="token class-name">Thread_2</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Thread</span> tr<span class="token operator">=</span><span class="token keyword">new</span> <span class="token class-name">Thread</span><span class="token punctuation">(</span>rt<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//开始线程</span>
        tc<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        tr<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">// 创建测试类testThread,测试程序。</span>
<span class="token keyword">class</span> <span class="token class-name">TestThread</span> <span class="token keyword">extends</span> <span class="token class-name">Thread</span><span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">ThreadFrame</span> tf<span class="token operator">=</span><span class="token keyword">new</span> <span class="token class-name">ThreadFrame</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="实验二" tabindex="-1"><a class="header-anchor" href="#实验二" aria-hidden="true">#</a> 实验二</h2>
<h3 id="目标-1" tabindex="-1"><a class="header-anchor" href="#目标-1" aria-hidden="true">#</a> 目标</h3>
<ol>
<li>
<p>创建两个实现Runnable接口的类MyThread1、MyThread2,在里面重写run方法:</p>
</li>
<li>
<p>创建MyThread1的子类ComputeThread和MyThread2的子类ReadThread,其中，ComputeThread类用来计算阶乘的结果, ReadThread类用来读取Compute Thread中的结果并显示在窗体中</p>
</li>
<li>
<p>创建一个MyFrame类来创建窗体，在窗体上添加标签、文本域、文本框、进度条和按钮，其中，文本域显示阶乘的计算过程，文本框显示计算结果，进度条根据文本域来显示进度;</p>
</li>
<li>
<p>为按钮添加点击事件，使得点击按钮后，运行线程，</p>
</li>
<li>
<p>创建测试类TestThread,测试程序。</p>
</li>
</ol>
<h3 id="代码-1" tabindex="-1"><a class="header-anchor" href="#代码-1" aria-hidden="true">#</a> 代码</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">javax<span class="token punctuation">.</span>swing<span class="token punctuation">.</span></span><span class="token operator">*</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>awt<span class="token punctuation">.</span></span><span class="token operator">*</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>awt<span class="token punctuation">.</span>event<span class="token punctuation">.</span></span><span class="token class-name">ActionEvent</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>awt<span class="token punctuation">.</span>event<span class="token punctuation">.</span></span><span class="token class-name">ActionListener</span></span><span class="token punctuation">;</span>
<span class="token comment">// ComputeThread类用来计算阶乘的结果</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyThread1</span> <span class="token keyword">implements</span> <span class="token class-name">Runnable</span><span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">ComputeThread</span> <span class="token keyword">extends</span> <span class="token class-name">MyThread1</span><span class="token punctuation">{</span>
    <span class="token comment">//存储阶乘和进度</span>
    <span class="token keyword">static</span> <span class="token class-name">String</span> stringSum<span class="token operator">=</span><span class="token string">""</span><span class="token punctuation">;</span>
    <span class="token comment">//存储阶乘和的字符串</span>
    <span class="token keyword">static</span> <span class="token class-name">String</span> stringResult<span class="token operator">=</span><span class="token string">""</span><span class="token punctuation">;</span>
    <span class="token comment">//存储阶乘结果的字符串</span>
    <span class="token keyword">static</span> <span class="token keyword">int</span> i<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token comment">//计算阶乘</span>
    <span class="token keyword">double</span> sum<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">double</span> <span class="token function">method</span><span class="token punctuation">(</span><span class="token keyword">int</span> n<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">//阶乘结果</span>
        <span class="token keyword">double</span> result<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> i<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">;</span>i<span class="token operator">&lt;=</span>n<span class="token punctuation">;</span>i<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            result<span class="token operator">*=</span>i<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> result<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">while</span><span class="token punctuation">(</span>i<span class="token operator">&lt;</span><span class="token number">30</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token comment">//计算阶乘和</span>
            i<span class="token operator">++</span><span class="token punctuation">;</span>
            sum<span class="token operator">+=</span><span class="token function">method</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
            stringResult<span class="token operator">=</span><span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span>sum<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//将阶乘和存储到字符串中</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>i<span class="token operator">!=</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                <span class="token comment">//显示阶乘和的过程：1！+2！+...+30！</span>
                stringSum<span class="token operator">=</span>stringSum<span class="token operator">+</span><span class="token string">"+"</span><span class="token operator">+</span>i<span class="token operator">+</span><span class="token string">"!"</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
                stringSum<span class="token operator">=</span>i<span class="token operator">+</span><span class="token string">"!"</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">try</span><span class="token punctuation">{</span>
                <span class="token comment">//0.5-1秒读取一次线程</span>
                <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">*</span><span class="token number">500</span><span class="token operator">+</span><span class="token number">500</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token keyword">catch</span><span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> ex<span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">MyThread2</span> <span class="token keyword">implements</span> <span class="token class-name">Runnable</span><span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">ReadThread</span> <span class="token keyword">extends</span> <span class="token class-name">MyThread2</span><span class="token punctuation">{</span>
    <span class="token class-name">RunnableFrame</span> tf<span class="token punctuation">;</span>
    <span class="token class-name">ReadThread</span><span class="token punctuation">(</span><span class="token class-name">RunnableFrame</span> tf<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">//初始化</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>tf<span class="token operator">=</span>tf<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">while</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            tf<span class="token punctuation">.</span>textArea<span class="token punctuation">.</span><span class="token function">setText</span><span class="token punctuation">(</span><span class="token class-name">ComputeThread</span><span class="token punctuation">.</span>stringSum<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//将阶乘和的过程显示到文本域中</span>
            tf<span class="token punctuation">.</span>textFile<span class="token punctuation">.</span><span class="token function">setText</span><span class="token punctuation">(</span><span class="token class-name">ComputeThread</span><span class="token punctuation">.</span>stringResult<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//将阶乘和结果显示到文本框中</span>
            tf<span class="token punctuation">.</span>jpb<span class="token punctuation">.</span><span class="token function">setValue</span><span class="token punctuation">(</span><span class="token class-name">ComputeThread</span><span class="token punctuation">.</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//在面板上的进度条中显示计算进度</span>
            <span class="token keyword">try</span><span class="token punctuation">{</span>
                <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token comment">//0.1秒读取一次线程</span>
            <span class="token punctuation">}</span><span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">// 创建一个Thread frame 类来创建窗体，在窗体上添加标签、文本域、文本框、进度条和按钮，其中，文本域显示阶乘的计算过程，文本框显示计算结果，进度条根据文本域来显示进度</span>
<span class="token keyword">class</span> <span class="token class-name">RunnableFrame</span> <span class="token keyword">implements</span> <span class="token class-name">ActionListener</span> <span class="token punctuation">{</span>
    <span class="token comment">//创建面板</span>
    <span class="token class-name">JFrame</span> jframe<span class="token punctuation">;</span>
    <span class="token comment">//创建窗体</span>
    <span class="token class-name">Panel</span> panel<span class="token punctuation">;</span>
    <span class="token comment">//创建面板</span>
    <span class="token class-name">Label</span> label_title<span class="token punctuation">;</span>
    <span class="token comment">//创建标签</span>
    <span class="token class-name">Label</span> label_1<span class="token punctuation">;</span>
    <span class="token class-name">Label</span> label_2<span class="token punctuation">;</span>
    <span class="token class-name">Label</span> label_3<span class="token punctuation">;</span>
    <span class="token class-name">TextField</span> textFile<span class="token punctuation">;</span>
    <span class="token comment">//创建文本框</span>
    <span class="token class-name">TextArea</span> textArea<span class="token punctuation">;</span>
    <span class="token comment">//创建文本域</span>
    <span class="token class-name">Button</span> btn<span class="token punctuation">;</span>
    <span class="token comment">//创建按钮</span>
    <span class="token class-name">JProgressBar</span> jpb<span class="token punctuation">;</span>
    <span class="token comment">//创建进度条</span>
    <span class="token class-name">RunnableFrame</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">//创建窗体</span>
        jframe<span class="token operator">=</span><span class="token keyword">new</span> <span class="token class-name">JFrame</span><span class="token punctuation">(</span><span class="token string">"线程"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//设置窗体名称</span>
        jframe<span class="token punctuation">.</span><span class="token function">setBounds</span><span class="token punctuation">(</span><span class="token number">600</span><span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">,</span> <span class="token number">400</span><span class="token punctuation">,</span> <span class="token number">400</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//设置大小</span>
        jframe<span class="token punctuation">.</span><span class="token function">setVisible</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//设置课件</span>
        jframe<span class="token punctuation">.</span><span class="token function">setDefaultCloseOperation</span><span class="token punctuation">(</span><span class="token class-name">JFrame</span><span class="token punctuation">.</span><span class="token constant">EXIT_ON_CLOSE</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//结束进程</span>

        <span class="token comment">//创建面板</span>
        panel<span class="token operator">=</span><span class="token keyword">new</span> <span class="token class-name">Panel</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        panel<span class="token punctuation">.</span><span class="token function">setBackground</span><span class="token punctuation">(</span><span class="token class-name">Color</span><span class="token punctuation">.</span>white<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//设置背景颜色</span>
        panel<span class="token punctuation">.</span><span class="token function">setLayout</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//取消默认布局</span>
        jframe<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>panel<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">//创建标签</span>
        label_title<span class="token operator">=</span><span class="token keyword">new</span> <span class="token class-name">Label</span><span class="token punctuation">(</span><span class="token string">"多线程实验"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        label_1<span class="token operator">=</span><span class="token keyword">new</span> <span class="token class-name">Label</span><span class="token punctuation">(</span><span class="token string">"计算线程："</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        label_2<span class="token operator">=</span><span class="token keyword">new</span> <span class="token class-name">Label</span><span class="token punctuation">(</span><span class="token string">"计算进度："</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        label_3<span class="token operator">=</span><span class="token keyword">new</span> <span class="token class-name">Label</span><span class="token punctuation">(</span><span class="token string">"计算读取："</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        label_title<span class="token punctuation">.</span><span class="token function">setBounds</span><span class="token punctuation">(</span>jframe<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>width<span class="token operator">/</span><span class="token number">2</span><span class="token operator">-</span><span class="token number">50</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">,</span> <span class="token number">50</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        label_1<span class="token punctuation">.</span><span class="token function">setBounds</span><span class="token punctuation">(</span><span class="token number">30</span><span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">,</span> <span class="token number">60</span><span class="token punctuation">,</span> <span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        label_2<span class="token punctuation">.</span><span class="token function">setBounds</span><span class="token punctuation">(</span><span class="token number">30</span><span class="token punctuation">,</span> <span class="token number">160</span><span class="token punctuation">,</span> <span class="token number">60</span><span class="token punctuation">,</span> <span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        label_3<span class="token punctuation">.</span><span class="token function">setBounds</span><span class="token punctuation">(</span><span class="token number">30</span><span class="token punctuation">,</span> <span class="token number">220</span><span class="token punctuation">,</span> <span class="token number">60</span><span class="token punctuation">,</span> <span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        label_title<span class="token punctuation">.</span><span class="token function">setFont</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Font</span><span class="token punctuation">(</span><span class="token string">"宋体"</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">16</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//设置字体</span>
        panel<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>label_title<span class="token punctuation">)</span><span class="token punctuation">;</span>
        panel<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>label_1<span class="token punctuation">)</span><span class="token punctuation">;</span>
        panel<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>label_2<span class="token punctuation">)</span><span class="token punctuation">;</span>
        panel<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>label_3<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">//创建文本域</span>
        textArea<span class="token operator">=</span><span class="token keyword">new</span> <span class="token class-name">TextArea</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        textArea<span class="token punctuation">.</span><span class="token function">setBounds</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">,</span> <span class="token number">80</span><span class="token punctuation">,</span> <span class="token number">200</span><span class="token punctuation">,</span> <span class="token number">60</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        textArea<span class="token punctuation">.</span><span class="token function">setEditable</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//不可编辑</span>
        panel<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>textArea<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">//创建单行文本框</span>
        textFile<span class="token operator">=</span><span class="token keyword">new</span> <span class="token class-name">TextField</span><span class="token punctuation">(</span><span class="token string">"0"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        textFile<span class="token punctuation">.</span><span class="token function">setBounds</span><span class="token punctuation">(</span>textArea<span class="token punctuation">.</span><span class="token function">getX</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">220</span><span class="token punctuation">,</span> textArea<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>width<span class="token punctuation">,</span> <span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        textFile<span class="token punctuation">.</span><span class="token function">setEditable</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//不可编辑</span>
        panel<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>textFile<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">//创建按钮</span>
        btn<span class="token operator">=</span><span class="token keyword">new</span> <span class="token class-name">Button</span><span class="token punctuation">(</span><span class="token string">"开始计算"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        btn<span class="token punctuation">.</span><span class="token function">setBounds</span><span class="token punctuation">(</span>jframe<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>width<span class="token operator">/</span><span class="token number">2</span><span class="token operator">-</span><span class="token number">35</span><span class="token punctuation">,</span> <span class="token number">270</span><span class="token punctuation">,</span> <span class="token number">70</span><span class="token punctuation">,</span> <span class="token number">30</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        panel<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>btn<span class="token punctuation">)</span><span class="token punctuation">;</span>
        btn<span class="token punctuation">.</span><span class="token function">addActionListener</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//添加监听器</span>

        <span class="token comment">//创建进度条</span>
        jpb<span class="token operator">=</span><span class="token keyword">new</span> <span class="token class-name">JProgressBar</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        jpb<span class="token punctuation">.</span><span class="token function">setBounds</span><span class="token punctuation">(</span>textArea<span class="token punctuation">.</span><span class="token function">getX</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> textArea<span class="token punctuation">.</span><span class="token function">getY</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">+</span>textArea<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>height<span class="token operator">+</span><span class="token number">10</span><span class="token punctuation">,</span> textArea<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>width<span class="token punctuation">,</span> <span class="token number">40</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        jpb<span class="token punctuation">.</span><span class="token function">setMaximum</span><span class="token punctuation">(</span><span class="token number">30</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//设置最大值</span>
        panel<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>jpb<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 为按钮添加点击事件，使得点击按钮后，运行线程</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">actionPerformed</span><span class="token punctuation">(</span><span class="token class-name">ActionEvent</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">//按钮点击事件</span>
        <span class="token comment">//调用计算线程</span>
        <span class="token class-name">ComputeThread</span> ct<span class="token operator">=</span><span class="token keyword">new</span> <span class="token class-name">ComputeThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Thread</span> tc<span class="token operator">=</span><span class="token keyword">new</span> <span class="token class-name">Thread</span><span class="token punctuation">(</span>ct<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//调用读取线程</span>
        <span class="token class-name">ReadThread</span> rt<span class="token operator">=</span><span class="token keyword">new</span> <span class="token class-name">ReadThread</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Thread</span> tr<span class="token operator">=</span><span class="token keyword">new</span> <span class="token class-name">Thread</span><span class="token punctuation">(</span>rt<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//开始线程</span>
        tc<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        tr<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">// 创建测试类testThread,测试程序。</span>
<span class="token keyword">class</span> <span class="token class-name">TestRunnable</span><span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">RunnableFrame</span> tf<span class="token operator">=</span><span class="token keyword">new</span> <span class="token class-name">RunnableFrame</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


