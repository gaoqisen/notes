<template><div><h1 id="javaio" tabindex="-1"><a class="header-anchor" href="#javaio" aria-hidden="true">#</a> <center>JavaIO</center></h1>
<p>##简介</p>
<p>IO操作面临很多问题，信息量的巨大，网络的环境等等，因为IO不仅仅是对本地文件、目录的操作，有时对二进制流、还有一部分是网络方面的资源，所以多种原因直接造成IO操作无疑是耗时且复杂多变的。Java对IO的支持是个不断的演变过程，经过了很多的优化，直到JDK1.4以后，才趋于稳定，在JDK1.4中，加入了nio类，解决了很多性能问题。</p>
<h2 id="含义" tabindex="-1"><a class="header-anchor" href="#含义" aria-hidden="true">#</a> 含义</h2>
<h3 id="百科定义" tabindex="-1"><a class="header-anchor" href="#百科定义" aria-hidden="true">#</a> 百科定义</h3>
<p>Java的核心库java.io提供了全面的IO接口。包括：文件读写、标准设备输出等。Java中IO是以流为基础进行输入输出的，所有数据被串行化写入输出流，或者从输入流读入。</p>
<h3 id="组成" tabindex="-1"><a class="header-anchor" href="#组成" aria-hidden="true">#</a> 组成</h3>
<p>1、基于字节操作的I/O接口：InputStream和OutputStream（在java.io包下）</p>
<p>2、基于字符操作的I/O接口：Writer和Reader（在java.io包下）</p>
<p>3、基于磁盘操作的I/O接口：File（在java.io包下）</p>
<p>4、基于网络操作的I/O接口：Socket（不在java.io包下）</p>
<h3 id="分类" tabindex="-1"><a class="header-anchor" href="#分类" aria-hidden="true">#</a> 分类</h3>
<h4 id="数据来源" tabindex="-1"><a class="header-anchor" href="#数据来源" aria-hidden="true">#</a> 数据来源</h4>
<p><img src="https://gaoqisen.github.io/GraphBed/201911/20191118141423.png" alt="https://gaoqisen.github.io/GraphBed/201911/20191118141423.png"></p>
<ul>
<li>文件（file）：FileInputStream、FileOutputStream、FileReader、FileWriter</li>
<li>数组（[]）：
<ul>
<li>字节数组（byte[]）：ByteArrayInputStream、ByteArrayOutputStream</li>
<li>字符数组（char[]）：CharArrayReader、CharArrayWriter</li>
</ul>
</li>
<li>管道操作：PipedInputStream、PipedOutputStream、PipedReader、PipedWriter</li>
<li>基本数据类型：DataInputStream、DataOutputStream</li>
<li>缓冲操作：BufferedInputStream、BufferedOutputStream、BufferedReader、BufferedWriter</li>
<li>打印：PrintStream、PrintWriter</li>
<li>对象序列化反序列化：ObjectInputStream、ObjectOutputStream</li>
<li>转换：InputStreamReader、OutputStreWriter</li>
</ul>
<h4 id="数据传输方式" tabindex="-1"><a class="header-anchor" href="#数据传输方式" aria-hidden="true">#</a> 数据传输方式</h4>
<p><img src="https://gaoqisen.github.io/GraphBed/201911/20191114130011.png" alt="https://gaoqisen.github.io/GraphBed/201911/20191114130011.png"></p>
<h3 id="区别" tabindex="-1"><a class="header-anchor" href="#区别" aria-hidden="true">#</a> 区别</h3>
<ul>
<li>读写单位不同，字节流以字节为单位（一个字节为8bit位），字符流以字符为单位</li>
<li>操作对象不同，字节流可以处理任何数据    字符流只能处理字符相关类型数据</li>
<li>字节流在操作的时候本身是不会用到缓冲区(内存)的，是与文件本身直接操作的，而字符流在操作的时候是使用到缓冲区的</li>
<li>在所有的硬盘上保存文件或是进行传输的时候都是以字节的方式进行的，包括图片也是按照字节完成，而字符是只有在内存中才会形成的，所以使用字节操作是最多的。</li>
</ul>
<h2 id="实战" tabindex="-1"><a class="header-anchor" href="#实战" aria-hidden="true">#</a> 实战</h2>
<h3 id="字节操作i-o" tabindex="-1"><a class="header-anchor" href="#字节操作i-o" aria-hidden="true">#</a> 字节操作I/O</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span><span class="token punctuation">{</span>

        <span class="token comment">//—————————— OutputStream, write输出byte[]</span>
        <span class="token comment">// 文件本身不存在，则会为用户自动创建新文件</span>
        <span class="token class-name">File</span> f<span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">File</span><span class="token punctuation">(</span><span class="token string">"/Users/jasongao/Desktop/test.txt"</span><span class="token punctuation">)</span> <span class="token punctuation">;</span>
        <span class="token comment">// 通过子类实例化父类对象, 通过对象多态性，进行实例化。</span>
        <span class="token comment">// new FileOutputStream(f,true)  ;	// 此处表示在文件末尾追加内容</span>
        <span class="token class-name">OutputStream</span> out <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FileOutputStream</span><span class="token punctuation">(</span>f<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">String</span> str <span class="token operator">=</span> <span class="token string">"Hello World!!!"</span> <span class="token punctuation">;</span>
        <span class="token comment">// 只能输出byte数组，所以将字符串变为byte数组</span>
        <span class="token keyword">byte</span> b<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> str<span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">;</span>
        <span class="token comment">// 将内容输出，保存文件</span>
        out<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span> <span class="token punctuation">;</span>

        <span class="token comment">//—————————— OutputStream, write输出byte</span>
        <span class="token class-name">String</span> str2 <span class="token operator">=</span> <span class="token string">"\r\nHello World2!!!"</span> <span class="token punctuation">;</span>
        <span class="token keyword">byte</span> c<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> str2<span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">;</span>
        <span class="token comment">// 采用循环方式写入,每次只写入一个内容</span>
        <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> i<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span>i<span class="token operator">&lt;</span>c<span class="token punctuation">.</span>length<span class="token punctuation">;</span>i<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            out<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span>c<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        out<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">;</span>

        <span class="token comment">//—————————— InputStream, read输入byte[]</span>
        <span class="token class-name">InputStream</span> input <span class="token operator">=</span>  <span class="token keyword">new</span> <span class="token class-name">FileInputStream</span><span class="token punctuation">(</span>f<span class="token punctuation">)</span>  <span class="token punctuation">;</span>
        <span class="token comment">// 所有的内容都读到此数组之中</span>
        <span class="token keyword">byte</span> d<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token number">1024</span><span class="token punctuation">]</span> <span class="token punctuation">;</span>
        <span class="token comment">// 读取内容,可以 返回长度、byte等</span>
        <span class="token keyword">int</span> len <span class="token operator">=</span>input<span class="token punctuation">.</span><span class="token function">read</span><span class="token punctuation">(</span>d<span class="token punctuation">)</span> <span class="token punctuation">;</span>
        input<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"读入数据的长度："</span> <span class="token operator">+</span> len<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"内容为："</span> <span class="token operator">+</span> <span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">(</span>d<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"内容为："</span> <span class="token operator">+</span> <span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">(</span>d<span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">,</span>len<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">;</span>

    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://gaoqisen.github.io/GraphBed/201911/20191118114649.png" alt="https://gaoqisen.github.io/GraphBed/201911/20191118114649.png"></p>
<h3 id="字符操作i-o" tabindex="-1"><a class="header-anchor" href="#字符操作i-o" aria-hidden="true">#</a> 字符操作I/O</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">character</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span><span class="token punctuation">{</span>
        <span class="token comment">//—————————— Writer, write输出byte[]</span>
        <span class="token class-name">File</span> f<span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">File</span><span class="token punctuation">(</span><span class="token string">"/Users/jasongao/Desktop/test.txt"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">Writer</span> out <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FileWriter</span><span class="token punctuation">(</span>f<span class="token punctuation">)</span>  <span class="token punctuation">;</span>	<span class="token comment">// 通过对象多态性，进行实例化</span>
        <span class="token comment">// 第3步、进行写操作</span>
        <span class="token class-name">String</span> str <span class="token operator">=</span> <span class="token string">"Hello World!!!666"</span> <span class="token punctuation">;</span>		<span class="token comment">// 准备一个字符串</span>
        out<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span>str<span class="token punctuation">)</span><span class="token punctuation">;</span>
        out<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">//—————————— Reader, write输出byte[]</span>
        <span class="token class-name">Reader</span> input <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FileReader</span><span class="token punctuation">(</span>f<span class="token punctuation">)</span> <span class="token punctuation">;</span>
        <span class="token comment">// 所有的内容都读到此数组之中</span>
        <span class="token keyword">char</span> c<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">char</span><span class="token punctuation">[</span><span class="token number">1024</span><span class="token punctuation">]</span> <span class="token punctuation">;</span>
        <span class="token keyword">int</span> len <span class="token operator">=</span> input<span class="token punctuation">.</span><span class="token function">read</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span> <span class="token punctuation">;</span>
        input<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"内容为："</span> <span class="token operator">+</span> <span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">(</span>c<span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">,</span>len<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://gaoqisen.github.io/GraphBed/201911/20191118115334.png" alt="https://gaoqisen.github.io/GraphBed/201911/20191118115334.png"></p>
<h3 id="磁盘操作i-o" tabindex="-1"><a class="header-anchor" href="#磁盘操作i-o" aria-hidden="true">#</a> 磁盘操作I/O</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">file</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span><span class="token punctuation">{</span>
        <span class="token class-name">String</span> path <span class="token operator">=</span> <span class="token string">"/Users/jasongao/Desktop/test.txt"</span><span class="token punctuation">;</span>
        <span class="token class-name">File</span> myFile <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">File</span><span class="token punctuation">(</span>path<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//判断文件是否存在 </span>
       <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>myFile<span class="token punctuation">.</span><span class="token function">exists</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 创建文件夹， mkdir()只会建立一级的文件夹</span>
            myFile<span class="token punctuation">.</span><span class="token function">mkdir</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// mkdirs()可以建立多级文件夹</span>
            myFile<span class="token punctuation">.</span><span class="token function">mkdirs</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// 创建新文件</span>
            myFile<span class="token punctuation">.</span><span class="token function">createNewFile</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// 删除文件夹</span>
            myFile<span class="token punctuation">.</span><span class="token function">delete</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//读取文件名称  </span>
            myFile<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//读取文件路径(相对路径)  </span>
            myFile<span class="token punctuation">.</span><span class="token function">getPath</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//读取文件绝对路径  </span>
            myFile<span class="token punctuation">.</span><span class="token function">getAbsolutePath</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//读取文件的父级路径  </span>
            <span class="token keyword">new</span> <span class="token class-name">File</span><span class="token punctuation">(</span>myFile<span class="token punctuation">.</span><span class="token function">getAbsolutePath</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getParent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//读取文件的大小  </span>
            myFile<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//判断文件是否被隐藏  </span>
            myFile<span class="token punctuation">.</span><span class="token function">isHidden</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//判断文件是否可读  </span>
            myFile<span class="token punctuation">.</span><span class="token function">canRead</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//判断文件是否可写  </span>
            myFile<span class="token punctuation">.</span><span class="token function">canWrite</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//判断文件是否为文件夹  </span>
            myFile<span class="token punctuation">.</span><span class="token function">isDirectory</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="各种转换" tabindex="-1"><a class="header-anchor" href="#各种转换" aria-hidden="true">#</a> 各种转换</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>        <span class="token doc-comment comment">/**
         * 将str转换为inputStream
         * <span class="token keyword">@param</span> <span class="token parameter">str</span>
         * <span class="token keyword">@return</span>
         */</span>
        <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">InputStream</span> <span class="token function">strConvertInputStream</span><span class="token punctuation">(</span><span class="token class-name">String</span> str<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">ByteArrayInputStream</span> is <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ByteArrayInputStream</span><span class="token punctuation">(</span>str<span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> is<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token doc-comment comment">/**
         * 将inputStream转换为str
         * <span class="token keyword">@param</span> <span class="token parameter">is</span>
         * <span class="token keyword">@return</span>
         * <span class="token keyword">@throws</span> <span class="token reference"><span class="token class-name">IOException</span></span>
         */</span>
        <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">String</span> <span class="token function">inputStreamConvertStr</span><span class="token punctuation">(</span><span class="token class-name">InputStream</span> is<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
            <span class="token class-name">StringBuffer</span> sb<span class="token punctuation">;</span>
            <span class="token class-name">BufferedReader</span> br <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
            <span class="token keyword">try</span> <span class="token punctuation">{</span>
                br <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BufferedReader</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">InputStreamReader</span><span class="token punctuation">(</span>is<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    
                sb <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StringBuffer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    
                <span class="token class-name">String</span> data<span class="token punctuation">;</span>
                <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>data <span class="token operator">=</span> br<span class="token punctuation">.</span><span class="token function">readLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    sb<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
                br<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
    
            <span class="token keyword">return</span> sb<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token doc-comment comment">/**
         * 将file转换为inputStream
         * <span class="token keyword">@param</span> <span class="token parameter">file</span>
         * <span class="token keyword">@return</span>
         * <span class="token keyword">@throws</span> <span class="token reference"><span class="token class-name">FileNotFoundException</span></span>
         */</span>
        <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">InputStream</span> <span class="token function">fileConvertInputStream</span><span class="token punctuation">(</span><span class="token class-name">File</span> file<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">FileNotFoundException</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">FileInputStream</span><span class="token punctuation">(</span>file<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token doc-comment comment">/**
         * 将inputStream转化为file
         * <span class="token keyword">@param</span> <span class="token parameter">is</span>
         * <span class="token keyword">@param</span> <span class="token parameter">file</span> 要输出的文件目录
         */</span>
        <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">inputStreamConvertFile</span><span class="token punctuation">(</span><span class="token class-name">InputStream</span> is<span class="token punctuation">,</span> <span class="token class-name">File</span> file<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
            <span class="token class-name">OutputStream</span> os <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
            <span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">OutputStream</span> os <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FileOutputStream</span><span class="token punctuation">(</span>file<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                <span class="token keyword">int</span> len <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
                <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> buffer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token number">8192</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    
                <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>len <span class="token operator">=</span> is<span class="token punctuation">.</span><span class="token function">read</span><span class="token punctuation">(</span>buffer<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    os<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span>buffer<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> len<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
                is<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>    
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


