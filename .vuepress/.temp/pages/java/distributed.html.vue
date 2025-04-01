<template><div><p>分布式系统的服务的特别多，会有如下问题</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>1、服务与服务之间如何通信
	- http、dubbo
2、其中一台服务挂了怎么办
	- 重试机制、心跳检测、降级、熔断 
3、这么多服务如何管理
	- 服务注册与发现、负载均衡
4、服务数据和接口的安全性问题
	- 网关、加解密
5、出现问题了如何排查问题
	- 链路追踪、ELK
6、其他单机不会有问题但是分布式需要考虑的问题
	- 分布式的事务问题
	- 分布式锁问题
	- 分布式 id 问题

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="一、服务与服务之间的通信问题" tabindex="-1"><a class="header-anchor" href="#一、服务与服务之间的通信问题" aria-hidden="true">#</a> 一、服务与服务之间的通信问题</h2>
<h2 id="二、服务挂了怎么办-注册与发现" tabindex="-1"><a class="header-anchor" href="#二、服务挂了怎么办-注册与发现" aria-hidden="true">#</a> 二、服务挂了怎么办（注册与发现）</h2>
<h2 id="三、服务之间的事务怎么处理" tabindex="-1"><a class="header-anchor" href="#三、服务之间的事务怎么处理" aria-hidden="true">#</a> 三、服务之间的事务怎么处理</h2>
<table>
<thead>
<tr>
<th><strong>维度</strong></th>
<th><strong>2PC</strong></th>
<th><strong>TCC</strong></th>
<th><strong>消息事务</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>阶段数</strong></td>
<td>两阶段（准备 + 提交 / 回滚）</td>
<td>三阶段（Try+Confirm+Cancel）</td>
<td>多阶段（半消息 + 本地事务 + 回查）</td>
</tr>
<tr>
<td><strong>实现依赖</strong></td>
<td>数据库 XA 协议、协调者</td>
<td>业务服务实现补偿逻辑</td>
<td>消息队列的半消息机制</td>
</tr>
<tr>
<td><strong>一致性</strong></td>
<td>强一致性</td>
<td>最终一致性（允许短暂不一致）</td>
<td>最终一致性</td>
</tr>
<tr>
<td><strong>性能</strong></td>
<td>较低（锁资源）</td>
<td>较高（无锁，但需业务改造）</td>
<td>较高（异步处理）</td>
</tr>
<tr>
<td><strong>适用场景</strong></td>
<td>银行转账等高一致性场景</td>
<td>电商订单、支付等业务场景</td>
<td>订单支付与库存异步扣减等场景</td>
</tr>
</tbody>
</table>
<ul>
<li><strong>阶段划分</strong>：2PC 是<strong>两阶段</strong>；TCC 是<strong>三阶段</strong>；消息事务包含半消息、本地事务和回查等步骤，但核心逻辑可简化为 “预提交→确认 / 回滚”。</li>
<li><strong>实现方式</strong>：2PC 依赖数据库和协调者，TCC 依赖业务服务的补偿逻辑，消息事务依赖 MQ 的半消息和回查机制。</li>
<li><strong>本质区别</strong>：2PC 通过数据库锁保证强一致性，TCC 通过业务补偿实现最终一致，消息事务通过异步消息和重试机制达成最终一致。</li>
</ul>
<h3 id="_2pc" tabindex="-1"><a class="header-anchor" href="#_2pc" aria-hidden="true">#</a> 2PC</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">ArrayList</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">List</span></span><span class="token punctuation">;</span>

<span class="token comment">// 协调者类</span>
<span class="token keyword">class</span> <span class="token class-name">Coordinator</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Participant</span><span class="token punctuation">></span></span> participants<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">Coordinator</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>participants <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">addParticipant</span><span class="token punctuation">(</span><span class="token class-name">Participant</span> participant<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        participants<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>participant<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">twoPhaseCommit</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 准备阶段</span>
        <span class="token keyword">boolean</span> allPrepared <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Participant</span> participant <span class="token operator">:</span> participants<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>participant<span class="token punctuation">.</span><span class="token function">prepare</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                allPrepared <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
                <span class="token keyword">break</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// 提交阶段</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>allPrepared<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Participant</span> participant <span class="token operator">:</span> participants<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                participant<span class="token punctuation">.</span><span class="token function">commit</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Participant</span> participant <span class="token operator">:</span> participants<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                participant<span class="token punctuation">.</span><span class="token function">rollback</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 参与者类</span>
<span class="token keyword">class</span> <span class="token class-name">Participant</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">prepare</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 执行本地事务，但不提交</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Participant is preparing..."</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 模拟准备成功</span>
        <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">commit</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Participant is committing..."</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">rollback</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Participant is rolling back..."</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 测试类</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">TwoPhaseCommitExample</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Coordinator</span> coordinator <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Coordinator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Participant</span> participant1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Participant</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Participant</span> participant2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Participant</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        coordinator<span class="token punctuation">.</span><span class="token function">addParticipant</span><span class="token punctuation">(</span>participant1<span class="token punctuation">)</span><span class="token punctuation">;</span>
        coordinator<span class="token punctuation">.</span><span class="token function">addParticipant</span><span class="token punctuation">(</span>participant2<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">boolean</span> result <span class="token operator">=</span> coordinator<span class="token punctuation">.</span><span class="token function">twoPhaseCommit</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>result<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Transaction committed successfully."</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Transaction rolled back."</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="tcc" tabindex="-1"><a class="header-anchor" href="#tcc" aria-hidden="true">#</a> TCC</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token comment">// 库存服务接口</span>
<span class="token keyword">interface</span> <span class="token class-name">InventoryService</span> <span class="token punctuation">{</span>
    <span class="token keyword">boolean</span> <span class="token function">tryReduce</span><span class="token punctuation">(</span><span class="token keyword">int</span> productId<span class="token punctuation">,</span> <span class="token keyword">int</span> quantity<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">boolean</span> <span class="token function">confirmReduce</span><span class="token punctuation">(</span><span class="token keyword">int</span> productId<span class="token punctuation">,</span> <span class="token keyword">int</span> quantity<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">boolean</span> <span class="token function">cancelReduce</span><span class="token punctuation">(</span><span class="token keyword">int</span> productId<span class="token punctuation">,</span> <span class="token keyword">int</span> quantity<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 库存服务实现类</span>
<span class="token keyword">class</span> <span class="token class-name">InventoryServiceImpl</span> <span class="token keyword">implements</span> <span class="token class-name">InventoryService</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">tryReduce</span><span class="token punctuation">(</span><span class="token keyword">int</span> productId<span class="token punctuation">,</span> <span class="token keyword">int</span> quantity<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 尝试扣减库存，预留资源</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Trying to reduce inventory for product "</span> <span class="token operator">+</span> productId <span class="token operator">+</span> <span class="token string">" by "</span> <span class="token operator">+</span> quantity<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 模拟尝试成功</span>
        <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">confirmReduce</span><span class="token punctuation">(</span><span class="token keyword">int</span> productId<span class="token punctuation">,</span> <span class="token keyword">int</span> quantity<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 确认扣减库存</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Confirming inventory reduction for product "</span> <span class="token operator">+</span> productId <span class="token operator">+</span> <span class="token string">" by "</span> <span class="token operator">+</span> quantity<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">cancelReduce</span><span class="token punctuation">(</span><span class="token keyword">int</span> productId<span class="token punctuation">,</span> <span class="token keyword">int</span> quantity<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 取消扣减库存，释放资源</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Canceling inventory reduction for product "</span> <span class="token operator">+</span> productId <span class="token operator">+</span> <span class="token string">" by "</span> <span class="token operator">+</span> quantity<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 订单服务类</span>
<span class="token keyword">class</span> <span class="token class-name">OrderService</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">InventoryService</span> inventoryService<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">OrderService</span><span class="token punctuation">(</span><span class="token class-name">InventoryService</span> inventoryService<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>inventoryService <span class="token operator">=</span> inventoryService<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">createOrder</span><span class="token punctuation">(</span><span class="token keyword">int</span> productId<span class="token punctuation">,</span> <span class="token keyword">int</span> quantity<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// Try 阶段</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>inventoryService<span class="token punctuation">.</span><span class="token function">tryReduce</span><span class="token punctuation">(</span>productId<span class="token punctuation">,</span> quantity<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// Confirm 阶段</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>inventoryService<span class="token punctuation">.</span><span class="token function">confirmReduce</span><span class="token punctuation">(</span>productId<span class="token punctuation">,</span> quantity<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 执行 Cancel 阶段</span>
            inventoryService<span class="token punctuation">.</span><span class="token function">cancelReduce</span><span class="token punctuation">(</span>productId<span class="token punctuation">,</span> quantity<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 测试类</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">TCCExample</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">InventoryService</span> inventoryService <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">InventoryServiceImpl</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">OrderService</span> orderService <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">OrderService</span><span class="token punctuation">(</span>inventoryService<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">boolean</span> result <span class="token operator">=</span> orderService<span class="token punctuation">.</span><span class="token function">createOrder</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>result<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Order created successfully."</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Order creation failed."</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="事务消息" tabindex="-1"><a class="header-anchor" href="#事务消息" aria-hidden="true">#</a> 事务消息</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>apache<span class="token punctuation">.</span>rocketmq<span class="token punctuation">.</span>client<span class="token punctuation">.</span>exception<span class="token punctuation">.</span></span><span class="token class-name">MQClientException</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>apache<span class="token punctuation">.</span>rocketmq<span class="token punctuation">.</span>client<span class="token punctuation">.</span>producer<span class="token punctuation">.</span></span><span class="token operator">*</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>apache<span class="token punctuation">.</span>rocketmq<span class="token punctuation">.</span>common<span class="token punctuation">.</span>message<span class="token punctuation">.</span></span><span class="token class-name">Message</span></span><span class="token punctuation">;</span>

<span class="token comment">// 事务监听器</span>
<span class="token keyword">class</span> <span class="token class-name">TransactionListenerImpl</span> <span class="token keyword">implements</span> <span class="token class-name">TransactionListener</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">LocalTransactionState</span> <span class="token function">executeLocalTransaction</span><span class="token punctuation">(</span><span class="token class-name">Message</span> msg<span class="token punctuation">,</span> <span class="token class-name">Object</span> arg<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 执行本地事务，如处理支付</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Executing local transaction..."</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 模拟本地事务成功</span>
        <span class="token keyword">return</span> <span class="token class-name">LocalTransactionState</span><span class="token punctuation">.</span><span class="token constant">COMMIT_MESSAGE</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">LocalTransactionState</span> <span class="token function">checkLocalTransaction</span><span class="token punctuation">(</span><span class="token class-name">MessageExt</span> msg<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 检查本地事务状态</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Checking local transaction..."</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token class-name">LocalTransactionState</span><span class="token punctuation">.</span><span class="token constant">COMMIT_MESSAGE</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 消息生产者类</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MessageTransactionExample</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">MQClientException</span><span class="token punctuation">,</span> <span class="token class-name">InterruptedException</span> <span class="token punctuation">{</span>
        <span class="token comment">// 创建事务消息生产者</span>
        <span class="token class-name">TransactionMQProducer</span> producer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">TransactionMQProducer</span><span class="token punctuation">(</span><span class="token string">"transaction_producer_group"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 设置 NameServer 地址</span>
        producer<span class="token punctuation">.</span><span class="token function">setNamesrvAddr</span><span class="token punctuation">(</span><span class="token string">"localhost:9876"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 设置事务监听器</span>
        producer<span class="token punctuation">.</span><span class="token function">setTransactionListener</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">TransactionListenerImpl</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 启动生产者</span>
        producer<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 创建消息</span>
        <span class="token class-name">Message</span> message <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Message</span><span class="token punctuation">(</span><span class="token string">"TransactionTopic"</span><span class="token punctuation">,</span> <span class="token string">"TransactionTag"</span><span class="token punctuation">,</span> <span class="token string">"Hello, RocketMQ!"</span><span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 发送半事务消息</span>
        <span class="token class-name">SendResult</span> sendResult <span class="token operator">=</span> producer<span class="token punctuation">.</span><span class="token function">sendMessageInTransaction</span><span class="token punctuation">(</span>message<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Send result: "</span> <span class="token operator">+</span> sendResult<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 关闭生产者</span>
        producer<span class="token punctuation">.</span><span class="token function">shutdown</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="四、服务之间的缓存怎么处理" tabindex="-1"><a class="header-anchor" href="#四、服务之间的缓存怎么处理" aria-hidden="true">#</a> 四、服务之间的缓存怎么处理</h2>
<h2 id="五、服务之间的安全" tabindex="-1"><a class="header-anchor" href="#五、服务之间的安全" aria-hidden="true">#</a> 五、服务之间的安全</h2>
<h2 id="六、日志监控问题" tabindex="-1"><a class="header-anchor" href="#六、日志监控问题" aria-hidden="true">#</a> 六、日志监控问题</h2>
</div></template>


