<template><div><h1 id="网络基础" tabindex="-1"><a class="header-anchor" href="#网络基础" aria-hidden="true">#</a> <center>网络基础</center></h1>
<h2 id="计算机网络的定义" tabindex="-1"><a class="header-anchor" href="#计算机网络的定义" aria-hidden="true">#</a> 计算机网络的定义</h2>
<blockquote>
<p>计算机技术与通行技术的结合产生了计算机网络</p>
</blockquote>
<h2 id="协议三要素" tabindex="-1"><a class="header-anchor" href="#协议三要素" aria-hidden="true">#</a> 协议三要素</h2>
<ul>
<li>语法：实体之间交换信息的格式和结构，或者定义实体之间传输信号的电平等</li>
<li>语义：定义实体之间交换的信息中需要发送那些控制信息、信息的含义、不同含义的控制信息、接收信息端如何响应等。</li>
<li>时序：定义实体之间交换信息的顺序以及如何匹配或适应彼此的速度</li>
</ul>
<h2 id="计算机网络分类" tabindex="-1"><a class="header-anchor" href="#计算机网络分类" aria-hidden="true">#</a> 计算机网络分类</h2>
<h3 id="按照范围" tabindex="-1"><a class="header-anchor" href="#按照范围" aria-hidden="true">#</a> 按照范围</h3>
<ul>
<li>个域网：个人设备通过无线通信技术构成小范围的网络。</li>
<li>局域网：办公室、办公楼、厂区、校园等局部区域内的网络。</li>
<li>城域网：覆盖一个城市的网络通常在5-10km。</li>
<li>广域网：范围几十到几千米，跨越很大的地理空间，可以实现异地城域网。</li>
</ul>
<h3 id="按拓扑结构分类" tabindex="-1"><a class="header-anchor" href="#按拓扑结构分类" aria-hidden="true">#</a> 按拓扑结构分类</h3>
<ul>
<li>星形拓扑结构：一个中央点，主机通过点对点通信链路与中央节点链接。
<img src="https://gaoqisen.github.io/GraphBed/201911/20191116135033.png" alt="https://gaoqisen.github.io/GraphBed/201911/20191116135033.png"></li>
<li>总线型拓扑结构：一条广播信道作为公共传输介质（总线），所有节点与总线链接，节点之间的通信通过共享总线进行
<img src="https://gaoqisen.github.io/GraphBed/201911/20191116135700.png" alt="https://gaoqisen.github.io/GraphBed/201911/20191116135700.png"></li>
<li>环形拓扑结构：通信链路将所有的节点连成一个闭合环。
<img src="https://gaoqisen.github.io/GraphBed/201911/20191116135233.png" alt="https://gaoqisen.github.io/GraphBed/201911/20191116135233.png"></li>
<li>网状拓扑图：多条链路与不同的节点直接链接。
<img src="https://gaoqisen.github.io/GraphBed/201911/20191116135413.png" alt="https://gaoqisen.github.io/GraphBed/201911/20191116135413.png"></li>
<li>树形拓扑图：是总线和星形拓扑网络的扩展。
<img src="https://gaoqisen.github.io/GraphBed/201911/20191116140135.png" alt="https://gaoqisen.github.io/GraphBed/201911/20191116140135.png"></li>
<li>混合拓扑图：由两种以上拓扑图混合链接而成的网络。</li>
</ul>
<h3 id="交换方式" tabindex="-1"><a class="header-anchor" href="#交换方式" aria-hidden="true">#</a> 交换方式</h3>
<ul>
<li>电路交换网络</li>
<li>报文交换网络</li>
<li>分组交换网络</li>
</ul>
<h3 id="网络用户属性" tabindex="-1"><a class="header-anchor" href="#网络用户属性" aria-hidden="true">#</a> 网络用户属性</h3>
<ul>
<li>共用网：国家或企业出资建设，面向公众提供免费或收费服务的网络</li>
<li>私有网：由某个组织（政府或者企业等）出资建设，专门面向组织内部业务提供的网络服务</li>
</ul>
<h2 id="网络结构" tabindex="-1"><a class="header-anchor" href="#网络结构" aria-hidden="true">#</a> 网络结构</h2>
<ul>
<li>网络边缘: 链接到网络上的所有端系统构成了边缘网络</li>
<li>接入网络: 实现了网络边缘的端系统与网络核心链接与接入的网络
<ul>
<li>电话拨号接入</li>
<li>非对称数字用户线路ADSL</li>
<li>混合光纤同轴电缆HFC接入网络</li>
<li>局域网络</li>
<li>移动接入网络</li>
</ul>
</li>
<li>网络核心: 由通信链路互连的分组交换设备构成的网络，是实现网络边缘中主机之间的数据中继与转发。</li>
</ul>
<h2 id="数据交换" tabindex="-1"><a class="header-anchor" href="#数据交换" aria-hidden="true">#</a> 数据交换</h2>
<blockquote>
<p>实现网络核心数据中继与转发的关键技术是数据交换</p>
</blockquote>
<ul>
<li>电路交
<ul>
<li>建立电路</li>
<li>传输数据</li>
<li>拆除电路</li>
</ul>
</li>
<li>报文交换: 发送方把要发送的消息加上一些接收主机的信息等，构成一个完整的报文，然后已报文为单位在交换网络的各个节点之间已存储/转发的方式传送到接收主机</li>
<li>分组交换：把报文分成较小的数据块传输，接收方接收后还原报文
<ul>
<li>优点
<ul>
<li>交换设备存储容量要求低</li>
<li>交换速度快</li>
<li>可靠传输效率高</li>
<li>更加公平</li>
</ul>
</li>
<li>长度的确认：
<ul>
<li>分组长度与延迟时间</li>
<li>分组长度与误码率</li>
</ul>
</li>
</ul>
</li>
</ul>
<h2 id="网络性能" tabindex="-1"><a class="header-anchor" href="#网络性能" aria-hidden="true">#</a> 网络性能</h2>
<ul>
<li>速率／带宽：网络单位时间内传送的数据量，传输的快慢就是传输速率又是也叫带宽。</li>
<li>时延：数据从网络中的一个节点到另一个节点所需要的时间，又叫延迟。
<ul>
<li>节点处理时延</li>
<li>排队时延</li>
<li>传输时延</li>
<li>传播时延</li>
</ul>
</li>
<li>时延带宽积：物理链路传播时延与链路带宽的乘积</li>
<li>丢包率：网络拥塞是会造成丢包</li>
<li>吞吐量：在单位时间内原主机通过网络向目的主机实际送达的数据量</li>
</ul>
<h2 id="计算机网络分层体系结构" tabindex="-1"><a class="header-anchor" href="#计算机网络分层体系结构" aria-hidden="true">#</a> 计算机网络分层体系结构</h2>
<blockquote>
<p>计算机网络所划分的层次以及各层协议的集合成为计算机网络体系结构。</p>
</blockquote>
<ul>
<li>OSI参考模型</li>
<li>TCP/IP参考模型</li>
</ul>
</div></template>


