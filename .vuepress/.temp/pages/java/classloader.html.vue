<template><div><h2 id="一、概述" tabindex="-1"><a class="header-anchor" href="#一、概述" aria-hidden="true">#</a> 一、概述</h2>
<p>类加载过程</p>
<p><img src="https://gaoqisen.github.io/GraphBed/202007/20200710125152.png" alt="https://gaoqisen.github.io/GraphBed/202007/20200710125152.png"></p>
<ol>
<li>
<p>加载: 通过类加载器查找和导入Class文件</p>
</li>
<li>
<p>链接: 把类的二进制数据合并到JRE中</p>
<ul>
<li>验证：检查载入class文件数据的正确性，为了确保当前的Class文件符合java虚拟机的要求，并且不会危害虚拟机自身的安全（文件格式验证、元数据验证、字节码验证、符号引用验证）</li>
<li>准备：给类变量(被static修饰的变量)分配内存,实例变量在实例变量初始化的时候会随对象一起分配在堆中。</li>
<li>解析: 将符号引用(javap反编译的就是符号引用)转化为直接引用(是直接指向目标的指针、相对偏移量或是一个能间接定位到目标的句柄)的过程</li>
</ul>
</li>
<li>
<p>初始化: 类的静态变量，静态代码块等执行，类的构造器初始化操作等。虚拟机定义了5种会触发初始化的场景。</p>
<ul>
<li>
<p>遇到new、getstatic、putstatic或invokestatic这四条字节码指令时，如果类没有进行初始化，则要先触发初始化；</p>
</li>
<li>
<p>使用java.lang.reflect包中的方法对类进行反射调用的时候；</p>
</li>
<li>
<p>初始化类时，若发现其父类还没有初始化，则先触发父类的初始化；</p>
</li>
<li>
<p>虚拟机启动的时候，虚拟机会先初始化用户指定的包含main()方法的那个类</p>
</li>
<li>
<p>当使用JDK 1.7的动态语言支持时，如果一个java.lang.invoke.MethodHandle实例最后的解析结果REF_getStatic、REF_putStatic、REF_invokeStatic的方法句柄，并且这个方法句柄所对应的类没有进行过初始化，则需要先触发其初始化。</p>
</li>
</ul>
</li>
</ol>
<h2 id="二、类加载器" tabindex="-1"><a class="header-anchor" href="#二、类加载器" aria-hidden="true">#</a> 二、类加载器</h2>
<blockquote>
<p>加载阶段是开发期相对来说可控性比较强，该阶段既可以使用系统提供的类加载器完成，也可以由用户自定义的类加载器来完成，开发人员可以通过定义自己的类加载器去控制字节流的获取方式</p>
</blockquote>
<h3 id="_2-1-加载过程" tabindex="-1"><a class="header-anchor" href="#_2-1-加载过程" aria-hidden="true">#</a> 2.1 加载过程</h3>
<ol>
<li>通过全限定名称取此类的二进制字节流</li>
<li>将字节流的静态存储结构转换为方法区的运行时数据结构</li>
<li>在内存中生成这个class对象作为方法区数据的访问入口</li>
</ol>
<h3 id="_2-2-jvm内置的classloader" tabindex="-1"><a class="header-anchor" href="#_2-2-jvm内置的classloader" aria-hidden="true">#</a> 2.2 JVM内置的ClassLoader</h3>
<ul>
<li>BootstrpClassLoader: 启动类加载器，顶层的加载器，c++实现，负责加载JAVA_HOME/lib目录下面的jar包和类或者被 <code v-pre>-Xbootclasspath</code>参数指定路径下的类</li>
<li>ExtensionClassLoader: 扩展类加载器，主要加载JAVA_HOME/lib/ext目录下面的jar包和类或者<code v-pre>java.ext.dirs</code>系统变量指定的jar包</li>
<li>AppClassLoader: 应用程序类加载器，面向用户的加载器，加载当前应用的classpath下的所有jar包和类。</li>
</ul>
<h3 id="_2-3-双亲委派模型" tabindex="-1"><a class="header-anchor" href="#_2-3-双亲委派模型" aria-hidden="true">#</a> 2.3 双亲委派模型</h3>
<p>如果一个类加载器收到了类加载请求，它并不会自己先去加载，而是把这个请求委托给父类的加载器去执行，如果父类加载器还存在其父类加载器，则进一步向上委托，依次递归，请求最终将到达顶层的启动类加载器，如果父类加载器可以完成类加载任务，就成功返回，倘若父类加载器无法完成此加载任务，子加载器才会尝试自己去加载，这就是双亲委派模式，即每个儿子都不愿意干活，每次有活就丢给父亲去干，直到父亲说这件事我也干不了时，儿子自己想办法去完成，这就是传说中的双亲委派模式。</p>
<p><img src="https://gaoqisen.github.io/GraphBed/202007/20200710162520.png" alt="https://gaoqisen.github.io/GraphBed/202007/20200710162520.png"></p>
<ul>
<li>
<p>优势:</p>
<ol>
<li>避免重复的类加载，如果父类已经加载了子类就不会再次加载。</li>
<li>保证Java核心API不被篡改。比如黑客自定义了java.lang.String类，有了双亲委派模型后自定义的java.lang.String类就永远都不会被加载进内存。因为首先是最顶端的类加载器加载系统的java.lang.String类，最终自定义的类加载器无法加载java.lang.String类。</li>
</ol>
</li>
<li>
<p>源码:</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token comment">//双亲委派模型的工作过程源码</span>
<span class="token keyword">protected</span> <span class="token keyword">synchronized</span> <span class="token class-name">Class</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">></span></span> <span class="token function">loadClass</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token keyword">boolean</span> resolve<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">ClassNotFoundException</span><span class="token punctuation">{</span>
    <span class="token comment">// First, check if the class has already been loaded</span>
    <span class="token class-name">Class</span> c <span class="token operator">=</span> <span class="token function">findLoadedClass</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>c <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>parent <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                c <span class="token operator">=</span> parent<span class="token punctuation">.</span><span class="token function">loadClass</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                c <span class="token operator">=</span> <span class="token function">findBootstrapClassOrNull</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span> 
        <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">ClassNotFoundException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// ClassNotFoundException thrown if class not found</span>
            <span class="token comment">// from the non-null parent class loader</span>
            <span class="token comment">//父类加载器无法完成类加载请求</span>
        <span class="token punctuation">}</span>
 
        <span class="token keyword">if</span> <span class="token punctuation">(</span>c <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// If still not found, then invoke findClass in order to find the class</span>
            <span class="token comment">//子加载器进行类加载 </span>
            c <span class="token operator">=</span> <span class="token function">findClass</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
 
    <span class="token keyword">if</span> <span class="token punctuation">(</span>resolve<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">//判断是否需要链接过程，参数传入</span>
        <span class="token function">resolveClass</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
 
    <span class="token keyword">return</span> c<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h3 id="_2-4-破坏双亲委派模型-深入理解java虚拟机" tabindex="-1"><a class="header-anchor" href="#_2-4-破坏双亲委派模型-深入理解java虚拟机" aria-hidden="true">#</a> 2.4 破坏双亲委派模型(深入理解java虚拟机)</h3>
<ul>
<li>
<p>向前兼容:  由于双亲委派模型是在JDK1.2之后才被引入的，而类加载器和抽象类java.lang.ClassLoader则是JDK1.0时候就已经存在，面对已经存在的用户自定义类加载器的实现代码，Java设计者引入双亲委派模型时不得不做出一些妥协。为了向前兼容，JDK1.2之后的java.lang.ClassLoader添加了一个新的proceted方法findClass()，在此之前，用户去继承java.lang.ClassLoader的唯一目的就是重写loadClass()方法，因为虚拟在进行类加载的时候会调用加载器的私有方法loadClassInternal()，而这个方法的唯一逻辑就是去调用自己的loadClass()。JDK1.2之后已不再提倡用户再去覆盖loadClass()方法，应当把自己的类加载逻辑写到findClass()方法中，在loadClass()方法的逻辑里，如果父类加载器加载失败，则会调用自己的findClass()方法来完成加载，这样就可以保证新写出来的类加载器是符合双亲委派模型的。</p>
</li>
<li>
<p>基础类调用用户的代码: 双亲委派模型很好地解决了各个类加载器的基础类统一问题(越基础的类由越上层的加载器进行加载)，基础类之所以被称为“基础”，是因为它们总是作为被调用代码调用的API。但是，如果基础类又要调用用户的代码，那该怎么办呢? 这并非是不可能的事情，一个典型的例子便是JNDI服务，它的代码由启动类加载器去加载(在JDK1.3时放进rt.jar)，但JNDI的目的就是对资源进行集中管理和查找，它需要调用独立厂商实现部部署在应用程序的classpath下的JNDI接口提供者(SPI, Service Provider Interface)的代码，但启动类加载器不可能“认识”之些代码，该怎么办？为了解决这个困境，Java设计团队只好引入了一个不太优雅的设计：线程上下文件类加载器(Thread Context ClassLoader)。这个类加载器可以通过java.lang.Thread类的setContextClassLoader()方法进行设置，如果创建线程时还未设置，它将会从父线程中继承一个；如果在应用程序的全局范围内都没有设置过，那么这个类加载器默认就是应用程序类加载器。了有线程上下文类加载器，JNDI服务使用这个线程上下文类加载器去加载所需要的SPI代码，也就是父类加载器请求子类加载器去完成类加载动作，这种行为实际上就是打通了双亲委派模型的层次结构来逆向使用类加载器，已经违背了双亲委派模型，但这也是无可奈何的事情。Java中所有涉及SPI的加载动作基本上都采用这种方式，例如JNDI，JDBC，JCE，JAXB和JBI等。</p>
</li>
</ul>
<h2 id="三、自定义类加载器" tabindex="-1"><a class="header-anchor" href="#三、自定义类加载器" aria-hidden="true">#</a> 三、自定义类加载器</h2>
<h3 id="_3-1-什么时候会需要自定义类加载器" tabindex="-1"><a class="header-anchor" href="#_3-1-什么时候会需要自定义类加载器" aria-hidden="true">#</a> 3.1 什么时候会需要自定义类加载器</h3>
<ol>
<li>加密: 在类需要加密的时候可以自定义类加载器，这样就可以在读取到密文的类之后在解密之后进行类加载</li>
<li>非标准来源的类: 比如字节码是从网络获取，或者从数据库中读取，就可以指定来源加载类</li>
<li>动态创建: 根据实际的情况进行进行动态的创建类</li>
</ol>
<h3 id="_3-2-自定义类加载器" tabindex="-1"><a class="header-anchor" href="#_3-2-自定义类加载器" aria-hidden="true">#</a> 3.2 自定义类加载器</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * 自定义类加载器
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CustomClassLoader</span> <span class="token keyword">extends</span> <span class="token class-name">ClassLoader</span><span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token class-name">CustomClassLoader</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">CustomClassLoader</span><span class="token punctuation">(</span><span class="token class-name">ClassLoader</span> parent<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">(</span>parent<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 重写findClass方法</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">protected</span> <span class="token class-name">Class</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">></span></span> <span class="token function">findClass</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">ClassNotFoundException</span>
    <span class="token punctuation">{</span>
        <span class="token class-name">File</span> file <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">File</span><span class="token punctuation">(</span><span class="token string">"/Users/jasongao/Desktop/People.class"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">try</span><span class="token punctuation">{</span>
            <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> bytes <span class="token operator">=</span> <span class="token function">getClassBytes</span><span class="token punctuation">(</span>file<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//defineClass方法可以把二进制流字节组成的文件转换为一个java.lang.Class</span>
            <span class="token class-name">Class</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">></span></span> c <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">defineClass</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> bytes<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> bytes<span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> c<span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">findClass</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 通过File获取二进制流字节</span>
    <span class="token keyword">private</span> <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token function">getClassBytes</span><span class="token punctuation">(</span><span class="token class-name">File</span> file<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        <span class="token comment">// 这里要读入.class的字节，因此要使用字节流</span>
        <span class="token class-name">FileInputStream</span> fis <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FileInputStream</span><span class="token punctuation">(</span>file<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">FileChannel</span> fc <span class="token operator">=</span> fis<span class="token punctuation">.</span><span class="token function">getChannel</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">ByteArrayOutputStream</span> baos <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ByteArrayOutputStream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">WritableByteChannel</span> wbc <span class="token operator">=</span> <span class="token class-name">Channels</span><span class="token punctuation">.</span><span class="token function">newChannel</span><span class="token punctuation">(</span>baos<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">ByteBuffer</span> by <span class="token operator">=</span> <span class="token class-name">ByteBuffer</span><span class="token punctuation">.</span><span class="token function">allocate</span><span class="token punctuation">(</span><span class="token number">1024</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">int</span> i <span class="token operator">=</span> fc<span class="token punctuation">.</span><span class="token function">read</span><span class="token punctuation">(</span>by<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>i <span class="token operator">==</span> <span class="token number">0</span> <span class="token operator">||</span> i <span class="token operator">==</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">break</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            by<span class="token punctuation">.</span><span class="token function">flip</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            wbc<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span>by<span class="token punctuation">)</span><span class="token punctuation">;</span>
            by<span class="token punctuation">.</span><span class="token function">clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        fis<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> baos<span class="token punctuation">.</span><span class="token function">toByteArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">ClassNotFoundException</span><span class="token punctuation">,</span> <span class="token class-name">IllegalAccessException</span><span class="token punctuation">,</span> <span class="token class-name">InstantiationException</span> <span class="token punctuation">{</span>
        <span class="token class-name">CustomClassLoader</span> customClassLoader <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">CustomClassLoader</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Class</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">></span></span> clazz <span class="token operator">=</span> <span class="token class-name">Class</span><span class="token punctuation">.</span><span class="token function">forName</span><span class="token punctuation">(</span><span class="token string">"People"</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">,</span> customClassLoader<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Object</span> obj <span class="token operator">=</span> clazz<span class="token punctuation">.</span><span class="token function">newInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>obj<span class="token punctuation">.</span><span class="token function">getClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getClassLoader</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编写People类之后，用javac People.java即可生成class文件</p>
<h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考" aria-hidden="true">#</a> 参考</h2>
<ul>
<li>类加载: https://juejin.im/post/5a810b0e5188257a5c606a85</li>
<li>双亲委派模型优势: https://blog.csdn.net/weixin_38055381/article/details/80167881</li>
<li>破坏双亲委派模型: https://juejin.im/post/5d7bbea8e51d4561c541a74f</li>
<li>线程上下文: https://blog.csdn.net/yangcheng33/article/details/52631940</li>
</ul>
</div></template>


