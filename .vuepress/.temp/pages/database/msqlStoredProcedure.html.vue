<template><div><h2 id="一、优势" tabindex="-1"><a class="header-anchor" href="#一、优势" aria-hidden="true">#</a> 一、优势</h2>
<p>启动服务器后或者第一次执行后(可以设置)就可以把存储过程加载到高速缓存中,这样以后调用起来就不用再通过编译，执行效率当然就高。另外执行存储过程只需要传递几个参数，用语句就需要传递整个sql语句，有效减少网络数据的传递.</p>
<h2 id="二、存储过程" tabindex="-1"><a class="header-anchor" href="#二、存储过程" aria-hidden="true">#</a> 二、存储过程</h2>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token comment">-- 创建测试表</span>
<span class="token keyword">create</span> <span class="token keyword">table</span> admin_user_1
<span class="token punctuation">(</span>
    id   <span class="token keyword">int</span> <span class="token boolean">null</span><span class="token punctuation">,</span>
    role <span class="token keyword">int</span> <span class="token boolean">null</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">-- 查看视图</span>
<span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">from</span> information_schema<span class="token punctuation">.</span>VIEWS<span class="token punctuation">;</span>
<span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">from</span> information_schema<span class="token punctuation">.</span><span class="token keyword">TABLES</span><span class="token punctuation">;</span>
<span class="token keyword">show</span> <span class="token keyword">procedure</span> <span class="token keyword">status</span> <span class="token keyword">where</span> db<span class="token operator">=</span><span class="token string">'gqs_1'</span><span class="token punctuation">;</span>
<span class="token keyword">show</span> <span class="token keyword">create</span> <span class="token keyword">procedure</span> gqs_1<span class="token punctuation">.</span>test<span class="token punctuation">;</span>
<span class="token keyword">DROP</span> <span class="token keyword">PROCEDURE</span> gqs_1<span class="token punctuation">.</span>test<span class="token punctuation">;</span>
<span class="token comment">-- 存储过程 创建一个通过ID删除数据的过程</span>
<span class="token keyword">CREATE</span> <span class="token keyword">PROCEDURE</span> delete_matches<span class="token punctuation">(</span><span class="token operator">IN</span> a_id <span class="token keyword">INTEGER</span><span class="token punctuation">)</span>
TEST1:<span class="token keyword">BEGIN</span>
    <span class="token keyword">DELETE</span> <span class="token keyword">FROM</span> admin_user_0
    <span class="token keyword">WHERE</span> id <span class="token operator">=</span> a_id<span class="token punctuation">;</span>
<span class="token keyword">END</span> TEST1<span class="token punctuation">;</span>
<span class="token comment">-- 查看存储过程</span>
<span class="token keyword">show</span> <span class="token keyword">create</span> <span class="token keyword">procedure</span> delete_matches<span class="token punctuation">;</span>
<span class="token comment">-- 调用过程</span>
<span class="token keyword">call</span> delete_matches<span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">-- 定义变量1、用户变量名一般以@开头。2、滥用用户变量会导致程序难以理解及管理</span>
<span class="token keyword">select</span> <span class="token string">'123'</span> <span class="token keyword">into</span> <span class="token variable">@a</span><span class="token punctuation">;</span>
<span class="token keyword">select</span> <span class="token variable">@a</span><span class="token punctuation">;</span>
<span class="token keyword">set</span> <span class="token variable">@a</span> <span class="token operator">=</span> <span class="token string">'456'</span><span class="token punctuation">;</span>
<span class="token keyword">set</span> <span class="token variable">@a</span> <span class="token operator">=</span> <span class="token number">1</span><span class="token operator">+</span><span class="token number">1</span><span class="token operator">+</span><span class="token number">3</span><span class="token punctuation">;</span>
<span class="token comment">-- 在存储过程中使用用户变量</span>
<span class="token keyword">CREATE</span> <span class="token keyword">PROCEDURE</span> test<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">select</span> concat<span class="token punctuation">(</span><span class="token variable">@add</span><span class="token punctuation">,</span> <span class="token string">'success'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">set</span> <span class="token variable">@add</span> <span class="token operator">=</span> <span class="token string">'ok'</span><span class="token punctuation">;</span>
<span class="token keyword">call</span> test<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">-- if else</span>
<span class="token keyword">create</span> <span class="token keyword">procedure</span> test1<span class="token punctuation">(</span><span class="token operator">in</span> args <span class="token keyword">int</span><span class="token punctuation">)</span>
<span class="token keyword">begin</span>
    <span class="token keyword">declare</span> a <span class="token keyword">int</span><span class="token punctuation">;</span>
    <span class="token keyword">set</span> a <span class="token operator">=</span> args <span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> a <span class="token operator">=</span> <span class="token number">2</span> <span class="token keyword">then</span>
        <span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> gqs_1<span class="token punctuation">.</span>admin_user_1 <span class="token punctuation">(</span>id<span class="token punctuation">,</span> role<span class="token punctuation">)</span> <span class="token keyword">VALUES</span> <span class="token punctuation">(</span><span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">end</span> <span class="token keyword">if</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> args <span class="token operator">=</span> <span class="token number">0</span> <span class="token keyword">then</span>
        <span class="token keyword">update</span> gqs_1<span class="token punctuation">.</span>admin_user_1 <span class="token keyword">set</span> role  <span class="token operator">=</span> <span class="token number">6</span> <span class="token keyword">where</span> id <span class="token operator">=</span> <span class="token number">8</span><span class="token punctuation">;</span>
        <span class="token keyword">else</span>
        <span class="token keyword">update</span> gqs_1<span class="token punctuation">.</span>admin_user_1 <span class="token keyword">set</span> role  <span class="token operator">=</span> <span class="token number">5</span> <span class="token keyword">where</span> id <span class="token operator">=</span> <span class="token number">8</span><span class="token punctuation">;</span>
    <span class="token keyword">end</span> <span class="token keyword">if</span><span class="token punctuation">;</span>
<span class="token keyword">end</span><span class="token punctuation">;</span>
<span class="token keyword">call</span> test1<span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">-- case</span>
<span class="token keyword">create</span> <span class="token keyword">procedure</span> test2<span class="token punctuation">(</span><span class="token operator">in</span> args <span class="token keyword">int</span><span class="token punctuation">)</span>
<span class="token keyword">begin</span>
    <span class="token keyword">declare</span> a <span class="token keyword">int</span><span class="token punctuation">;</span>
    <span class="token keyword">set</span> a <span class="token operator">=</span> args <span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token keyword">case</span> a
        <span class="token keyword">when</span> <span class="token number">0</span> <span class="token keyword">then</span>
            <span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> gqs_1<span class="token punctuation">.</span>admin_user_1 <span class="token punctuation">(</span>id<span class="token punctuation">,</span> role<span class="token punctuation">)</span> <span class="token keyword">VALUES</span> <span class="token punctuation">(</span><span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">when</span> <span class="token number">1</span> <span class="token keyword">then</span>
            <span class="token keyword">update</span> gqs_1<span class="token punctuation">.</span>admin_user_1 <span class="token keyword">set</span> role  <span class="token operator">=</span> <span class="token number">8</span> <span class="token keyword">where</span> id <span class="token operator">=</span> <span class="token number">8</span><span class="token punctuation">;</span>
        <span class="token keyword">else</span>
            <span class="token keyword">update</span> gqs_1<span class="token punctuation">.</span>admin_user_1 <span class="token keyword">set</span> role  <span class="token operator">=</span> <span class="token number">5</span> <span class="token keyword">where</span> id <span class="token operator">=</span> <span class="token number">8</span><span class="token punctuation">;</span>
    <span class="token keyword">end</span> <span class="token keyword">case</span><span class="token punctuation">;</span>
<span class="token keyword">end</span><span class="token punctuation">;</span>
<span class="token keyword">call</span> test1<span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">-- for 在操作钱检查结果</span>
<span class="token keyword">create</span> <span class="token keyword">procedure</span> test3<span class="token punctuation">(</span><span class="token operator">in</span> args <span class="token keyword">int</span><span class="token punctuation">)</span>
<span class="token keyword">begin</span>
    <span class="token keyword">declare</span> a <span class="token keyword">int</span><span class="token punctuation">;</span>
    <span class="token keyword">set</span> a <span class="token operator">=</span> args <span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token keyword">while</span> a <span class="token operator">&lt;</span><span class="token number">6</span> <span class="token keyword">do</span>
        <span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> gqs_1<span class="token punctuation">.</span>admin_user_1 <span class="token punctuation">(</span>id<span class="token punctuation">,</span> role<span class="token punctuation">)</span> <span class="token keyword">VALUES</span> <span class="token punctuation">(</span>a<span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">set</span> a<span class="token operator">=</span>a<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token keyword">end</span> <span class="token keyword">while</span><span class="token punctuation">;</span>
<span class="token keyword">end</span><span class="token punctuation">;</span>
<span class="token keyword">call</span> test3<span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">-- repeat···· end repea  在操作后检查结果</span>
<span class="token keyword">create</span> <span class="token keyword">procedure</span> test4<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">begin</span>
    <span class="token keyword">declare</span> a <span class="token keyword">int</span><span class="token punctuation">;</span>
    <span class="token keyword">set</span> a <span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">repeat</span>
        <span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> gqs_1<span class="token punctuation">.</span>admin_user_1 <span class="token punctuation">(</span>id<span class="token punctuation">,</span> role<span class="token punctuation">)</span> <span class="token keyword">VALUES</span> <span class="token punctuation">(</span>a<span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">set</span> a<span class="token operator">=</span>a<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">;</span>
        until a <span class="token operator">>=</span> <span class="token number">5</span>
        <span class="token keyword">end</span> <span class="token keyword">repeat</span><span class="token punctuation">;</span>
<span class="token keyword">end</span><span class="token punctuation">;</span>
<span class="token keyword">call</span> test4<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">-- loop ·····endloop</span>
<span class="token keyword">create</span> <span class="token keyword">procedure</span> test5<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">begin</span>
    <span class="token keyword">declare</span> a <span class="token keyword">int</span><span class="token punctuation">;</span>
    <span class="token keyword">set</span> a <span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span>
    l:<span class="token keyword">loop</span>
        <span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> gqs_1<span class="token punctuation">.</span>admin_user_1 <span class="token punctuation">(</span>id<span class="token punctuation">,</span> role<span class="token punctuation">)</span> <span class="token keyword">VALUES</span> <span class="token punctuation">(</span>a<span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">set</span> a<span class="token operator">=</span>a<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> a <span class="token operator">>=</span><span class="token number">5</span> <span class="token keyword">then</span>
            <span class="token keyword">leave</span> l<span class="token punctuation">;</span>
        <span class="token keyword">end</span> <span class="token keyword">if</span><span class="token punctuation">;</span>
    <span class="token keyword">end</span> <span class="token keyword">loop</span><span class="token punctuation">;</span>
<span class="token keyword">end</span><span class="token punctuation">;</span>
<span class="token keyword">call</span> test5<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="三、事件调度器event-scheduler" tabindex="-1"><a class="header-anchor" href="#三、事件调度器event-scheduler" aria-hidden="true">#</a> 三、事件调度器Event Scheduler</h2>
<ol>
<li>语法</li>
</ol>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token comment">-- []: 表示可选，[|]: 单选</span>
<span class="token keyword">create</span>
<span class="token punctuation">[</span><span class="token keyword">definer</span> <span class="token operator">=</span> { <span class="token keyword">user</span> <span class="token operator">|</span> <span class="token keyword">current_user</span> }<span class="token punctuation">]</span>  <span class="token comment">//  定义者</span>
event
<span class="token punctuation">[</span><span class="token keyword">if</span> <span class="token operator">not</span> <span class="token keyword">exists</span><span class="token punctuation">]</span>
event_name  <span class="token comment">// 时间名</span>
<span class="token keyword">on</span> schedule schedule   <span class="token comment">// 调度规则</span>
<span class="token comment">// on schedule子句</span>
<span class="token comment">// 1. at timestamp用于创建单次执行的事件，timestamp执行事件执行的时间(如果指定的时间是过去的时间，则会产生一个warning)，时间可以是具体的时间字符串或者是一个datetime类型的表达式(如current_timestamp)：</span>
<span class="token comment">//   如果要指定将来某个时间，直接使用at timestamp，例：at '2017-08-08 08:08:08'；</span>
<span class="token comment">//   如果要指定将来某个时间间隔，可利用interval关键字(interval关键字可以进行组合，at timestamp + INTERVAL 2 HOUR、 + INTERVAL 30 MINUTE)</span>
<span class="token comment">// 2. every子句用于创建重复执行的事件，如果每分钟执行一次，则可以：EVERY 1 MINUTE。</span>
<span class="token comment">//   当然，every子句可以指定一个开始事件和结束时间，通过STARTS和ENDS关键字来表示，具体语法与前面类似</span>
<span class="token comment">//   例如：EVERY 12 HOUR STARTS CURRENT_TIMESTAMP + INTERVAL 30 MINUTE ENDS CURRENT_TIMESTAMP + INTERVAL 4 WEEK。</span>
<span class="token punctuation">[</span><span class="token keyword">on</span> completion <span class="token punctuation">[</span><span class="token operator">not</span><span class="token punctuation">]</span> preserve<span class="token punctuation">]</span>  <span class="token comment">//注意特定时间执行的事件，如果设置了该参数，执行完毕后，事件将被删除，不想删除的话可以设置成on completion preserve</span>
<span class="token punctuation">[</span><span class="token keyword">enable</span> <span class="token operator">|</span> <span class="token keyword">disable</span> <span class="token operator">|</span> <span class="token keyword">disable</span> <span class="token keyword">on</span> slave<span class="token punctuation">]</span>  <span class="token comment">// 系统将执行这个事件</span>
<span class="token punctuation">[</span><span class="token keyword">comment</span> <span class="token string">'comment'</span><span class="token punctuation">]</span>  <span class="token comment">// 描述</span>
<span class="token keyword">do</span> event_body<span class="token punctuation">;</span>  <span class="token comment">// 事件体，可以是单行 SQL 语法，或是 BEGIN……END 语句块</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2">
<li>例子</li>
</ol>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token comment">-- 查看事件调度器是否开启</span>
<span class="token keyword">SHOW</span> VARIABLES <span class="token operator">LIKE</span> <span class="token string">'event_scheduler'</span><span class="token punctuation">;</span>
<span class="token keyword">SELECT</span> @<span class="token variable">@event_scheduler</span><span class="token punctuation">;</span>
<span class="token comment">-- 开启事件触发器</span>
<span class="token keyword">SET</span> <span class="token keyword">GLOBAL</span> event_scheduler <span class="token operator">=</span> <span class="token keyword">ON</span><span class="token punctuation">;</span>
<span class="token comment">-- 创建一个事件，并调用存储过程</span>
<span class="token keyword">CREATE</span> <span class="token keyword">DEFINER</span><span class="token operator">=</span><span class="token identifier"><span class="token punctuation">`</span>root<span class="token punctuation">`</span></span><span class="token variable">@`localhost`</span> EVENT <span class="token identifier"><span class="token punctuation">`</span>test_sche_event<span class="token punctuation">`</span></span>
    <span class="token keyword">ON</span> SCHEDULE EVERY <span class="token number">5</span> <span class="token keyword">SECOND</span> STARTS <span class="token string">'2016-07-12 22:11:50'</span>
    <span class="token keyword">ON</span> COMPLETION <span class="token operator">NOT</span> PRESERVE <span class="token keyword">ENABLE</span>
    <span class="token keyword">DO</span> <span class="token keyword">CALL</span> <span class="token identifier"><span class="token punctuation">`</span>add<span class="token punctuation">`</span></span><span class="token punctuation">;</span>
<span class="token comment">-- 每秒插入一条数据</span>
<span class="token keyword">CREATE</span> EVENT e_test
    <span class="token keyword">ON</span> SCHEDULE EVERY <span class="token number">1</span> <span class="token keyword">SECOND</span>
    <span class="token keyword">DO</span> <span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> gqs_1<span class="token punctuation">.</span>admin_user_1 <span class="token punctuation">(</span>id<span class="token punctuation">,</span> role<span class="token punctuation">)</span> <span class="token keyword">VALUES</span> <span class="token punctuation">(</span><span class="token number">8</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">-- 每秒插入一条数据通过存储过程</span>
<span class="token keyword">CREATE</span> EVENT e_test1
    <span class="token keyword">ON</span> SCHEDULE EVERY <span class="token number">1</span> <span class="token keyword">SECOND</span>
    <span class="token keyword">DO</span> <span class="token keyword">CALL</span> test<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">-- 临时关闭事件</span>
<span class="token keyword">ALTER</span> EVENT e_test1 <span class="token keyword">DISABLE</span><span class="token punctuation">;</span>
<span class="token comment">-- 开启事件</span>
<span class="token keyword">ALTER</span> EVENT e_test1 <span class="token keyword">ENABLE</span><span class="token punctuation">;</span>
<span class="token comment">-- 删除事件</span>
<span class="token keyword">DROP</span> EVENT <span class="token keyword">IF</span> <span class="token keyword">EXISTS</span> e_test1<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="四、springboot调用存储过程" tabindex="-1"><a class="header-anchor" href="#四、springboot调用存储过程" aria-hidden="true">#</a> 四、springBoot调用存储过程</h2>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>@Query(value = "call test(?1) ", nativeQuery = true)
int selectdByLike(@Param("pname") String pname);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


