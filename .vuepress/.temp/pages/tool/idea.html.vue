<template><div><h2 id="快捷键" tabindex="-1"><a class="header-anchor" href="#快捷键" aria-hidden="true">#</a> 快捷键</h2>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>// 多行选中
Column Selection Mode
// 修改所有变量名
shift+F6
// 方法参数提示
Ctrl+L
// 查看类注释
Ctrl+Q
// 抽取方法
Fn+Ctrl+Alt+M
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="debug各个按钮的意思" tabindex="-1"><a class="header-anchor" href="#debug各个按钮的意思" aria-hidden="true">#</a> DeBug各个按钮的意思</h2>
<p><img src="https://gaoqisen.github.io/GraphBed/201911/20191107112132.png" alt="https://gaoqisen.github.io/GraphBed/201911/20191107112132.png"></p>
<h3 id="第一排-从左往右" tabindex="-1"><a class="header-anchor" href="#第一排-从左往右" aria-hidden="true">#</a> 第一排(从左往右)</h3>
<p><img src="https://gaoqisen.github.io/GraphBed/201911/20191107112555.png" alt="https://gaoqisen.github.io/GraphBed/201911/20191107112555.png"></p>
<ol>
<li>
<p>Show Execution Point (Alt + F10)：如果你的光标在其它行或其它页面，点击这个按钮可跳转到当前代码执行的行。</p>
</li>
<li>
<p>Step Over (F8)：步过，一行一行地往下走，如果这一行上有方法不会进入方法。</p>
</li>
<li>
<p>Step Into (F7)：步入，如果当前行有方法，可以进入方法内部，一般用于进入自定义方法内，不会进入官方类库的方法，如第25行的put方法。</p>
</li>
<li>
<p>Force Step Into (Alt + Shift + F7)：强制步入，能进入任何方法，查看底层源码的时候可以用这个进入官方类库的方法。</p>
</li>
<li>
<p>Step Out (Shift + F8)：步出，从步入的方法内退出到方法调用处，此时方法已执行完毕，只是还没有完成赋值。</p>
</li>
<li>
<p>Drop Frame (默认无)：回退断点。</p>
</li>
<li>
<p>Run to Cursor (Alt + F9)：运行到光标处，你可以将光标定位到你需要查看的那一行，然后使用这个功能，代码会运行至光标行，而不需要打断点。</p>
</li>
<li>
<p>Evaluate Expression (Alt + F8)：计算表达式。</p>
</li>
</ol>
<h3 id="第二排-从上往下" tabindex="-1"><a class="header-anchor" href="#第二排-从上往下" aria-hidden="true">#</a> 第二排（从上往下）</h3>
<p><img src="https://gaoqisen.github.io/GraphBed/201911/20191107112907.png" alt="https://gaoqisen.github.io/GraphBed/201911/20191107112907.png"></p>
<ol>
<li>
<p>Rerun 'xxxx'：重新运行程序，会关闭服务后重新启动程序。</p>
</li>
<li>
<p>Resume Program (F9)：恢复程序，比如，你在第20行和25行有两个断点，当前运行至第20行，按F9，则运行到下一个断点(即第25行)，再按F9，则运行完整个流程，因为后面已经没有断点了。</p>
</li>
<li>
<p>Pause Program：暂停程序，启用Debug。目前没发现具体用法。</p>
</li>
<li>
<p>Stop 'xxx' (Ctrl + F2)：连续按两下，关闭程序。有时候你会发现关闭服务再启动时，报端口被占用，这是因为没完全关闭服务的原因，你就需要查杀所有JVM进程了。</p>
</li>
<li>
<p>View Breakpoints (Ctrl + Shift + F8)：查看所有断点，后面章节会涉及到。</p>
</li>
<li>
<p>Mute Breakpoints：哑的断点，选择这个后，所有断点变为灰色，断点失效，按F9则可以直接运行完程序。再次点击，断点变为红色，有效。如果只想使某一个断点失效，可以在断点上右键取消Enabled，如图2.4，则该行断点失效。</p>
</li>
<li>
<p>查看线程的dump</p>
</li>
<li>
<p>设置。显示方法返回值等</p>
</li>
<li>
<p>锁定与取消选项卡</p>
</li>
</ol>
</div></template>


