<template><div><h2 id="一、mysql的-akf-立方体" tabindex="-1"><a class="header-anchor" href="#一、mysql的-akf-立方体" aria-hidden="true">#</a> 一、Mysql的 AKF 立方体</h2>
<p>用 AKF 理解下 mysql为了确保数据库的高可用性在处理海量数据的时是如何实现的</p>
<p>![image-20241123234031462](/Users/gaoqisen/Library/Application Support/typora-user-images/image-20241123234031462.png)</p>
<p>X 轴：为了解决单点故障，mysql 可以用 <strong>主从复制</strong> 等方式进行副本扩展，这样在其中一台机器出现故障时。其他的机器也能正常提供服务</p>
<p>Y 轴：可以理解为数据的垂直拆分，比如当数据量太大的时候，单表的数据列太多，可以将表拆分为多张表。也可以将数据进行 <strong>分库</strong> 比如用户库、订单库等，这样可以避免单点故障用户库出现问题后订单库还是能提供服务的。</p>
<p>Z轴: 可以理解为数据的水平拆分，比如用户库里面的用户数据太多，单表查询很慢可以进行用户 ID 的取模 <strong>分表</strong> 操作，这种分表操作就是分区的效果（100 w的数据模 10，就是将数据分为 10 份每份 10w 的数据分区）。</p>
<p>上面每个轴的具体实现方式各有不同，关键点就是副本的扩展和分库分表。副本的扩展要考虑副本之间的数据如何同步，扩展的时候出现单点故障如何恢复等问题，下面先了解下副本扩展的各种架构演进</p>
<h3 id="_1-2-高可用" tabindex="-1"><a class="header-anchor" href="#_1-2-高可用" aria-hidden="true">#</a> 1.2 高可用</h3>
<p>常见的高可用架构方案，每种架构都是遇到问题后慢慢演进出来的，下面通过时间和版本梳理下。</p>
<table>
<thead>
<tr>
<th style="text-align:left">架构方式</th>
<th>年份</th>
<th>版本</th>
<th>解决问题</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">主从复制架构（Master - Slave Replication）</td>
<td>1999</td>
<td>3.23</td>
<td>官方提供的防止数据丢失、读写分离</td>
</tr>
<tr>
<td style="text-align:left">双主复制架构（Dual - Master Replication）</td>
<td>2005</td>
<td>5.0</td>
<td>官方提供的双向数据同步，异地容灾</td>
</tr>
<tr>
<td style="text-align:left">主主复制管理 MMM(Master-Master replication manager)</td>
<td>2007～2008</td>
<td>5.0+</td>
<td>Open Query公司开发的简化主主复制故障切换、提高可用性</td>
</tr>
<tr>
<td style="text-align:left">集群高可用 MHA<br />（MySQL Master High Availability）</td>
<td>2010～2011</td>
<td>5.1+</td>
<td>Yahoo公司开发的减少切换主从速度、自动修复复制关系</td>
</tr>
<tr>
<td style="text-align:left">半同步（半同步Semisynchronous replication）</td>
<td>2010</td>
<td>5.5+</td>
<td>官方数据一致性要求高</td>
</tr>
<tr>
<td style="text-align:left">ProxySql + 主从复制</td>
<td>2013</td>
<td>5.6+</td>
<td>ProxySQL开源社区提供的通过中间件实现读写分离和负载均衡</td>
</tr>
<tr>
<td style="text-align:left">分片 + 高可用</td>
<td>2013</td>
<td>5.6+</td>
<td>Google、Facebook等海量数据存储+超大规模系统</td>
</tr>
<tr>
<td style="text-align:left">Mysql组复制 MGR（MySQL Group Replication）</td>
<td>2016</td>
<td>5.7.17+</td>
<td>官方实现Paxos 保证数据一致性、高可用和自动故障处理</td>
</tr>
<tr>
<td style="text-align:left">InnoDB Cluster</td>
<td>2016</td>
<td>8.0+</td>
<td>官方一站式高可用方案</td>
</tr>
</tbody>
</table>
<p>各种架构的优缺点分析</p>
<table>
<thead>
<tr>
<th style="text-align:left">架构方式</th>
<th>优点</th>
<th>缺点</th>
<th>原理</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">主从复制架构MSR</td>
<td>简单易用，提供读写分离</td>
<td>单点故障风险高</td>
<td>主节点写入binlog日志，从节点同步数据</td>
</tr>
<tr>
<td style="text-align:left">双主复制架构</td>
<td>双主互相备份，实现高可用（不建议使用）</td>
<td>写入冲突更新丢失，切换复杂</td>
<td>两个主节点互相写入数据，互相复制对方的变更</td>
</tr>
<tr>
<td style="text-align:left">主主复制管理MMM</td>
<td>主主复制，避免单点故障</td>
<td>部署维护复杂</td>
<td>通过监视复制延迟实现自动故障切换</td>
</tr>
<tr>
<td style="text-align:left">集群高可用 MHA</td>
<td>主从自动化故障切换，快速故障恢复</td>
<td>部署和配置复杂</td>
<td>监控主节点状态和健康实现自动故障切换</td>
</tr>
<tr>
<td style="text-align:left">半同步</td>
<td>提供更高的数据一致性和可靠性</td>
<td>对网络延迟敏感</td>
<td>写入数据需要执至少一个从节点收到数据后提交事务</td>
</tr>
<tr>
<td style="text-align:left">ProxySql + 主从复制</td>
<td>提供负载均衡和故障转移</td>
<td>需要额外的中间件，增加复杂性</td>
<td>代理层进行路由监控节点状态实现故障转移</td>
</tr>
<tr>
<td style="text-align:left">分片 + 高可用</td>
<td>实现水平扩展，适用大规模数据</td>
<td>部署和管理复杂</td>
<td>数据进行水平分片后+MHA</td>
</tr>
<tr>
<td style="text-align:left">Mysql组复制MGR</td>
<td>提供高可用+数据一致性，支持自动故障转移</td>
<td>部署管理复杂</td>
<td>多个数据库节点形成组，通过组复制协议实现同步和故障处理</td>
</tr>
<tr>
<td style="text-align:left">InnoDB Cluster</td>
<td>集成高可用和灾难恢复方案，支持自动化管理和监控</td>
<td>需要MysqlRouter，引入额外组件</td>
<td>使用Mysql Shell+Group Replication组件实现自动故障转移、数据同步和管理，基于binlog和组复制协议实现高可用</td>
</tr>
</tbody>
</table>
<p>主从复制</p>
<p><img src="https://gaoqisen.github.io/GraphBed/202411/20241127225955.png" alt="image"></p>
<p>MMM</p>
<p><img src="https://gaoqisen.github.io/GraphBed/202411/20241127232754.png" alt="MMM"></p>
<p>MHA</p>
<p><img src="https://gaoqisen.github.io/GraphBed/202411/20241127232950.png" alt="MHA"></p>
<p>半同步</p>
<p><img src="https://gaoqisen.github.io/GraphBed/202411/20241127232950.png" alt="半同步"></p>
<p>MHA+半同步</p>
<p><img src="https://gaoqisen.github.io/GraphBed/202411/20241127234122.png" alt=""></p>
<p>MGR</p>
<p><img src="https://gaoqisen.github.io/GraphBed/202411/20241127234718.png" alt="MGR"></p>
<p>InnoDB Cluster</p>
<p><img src="https://gaoqisen.github.io/GraphBed/202411/20241127235148.png" alt=""></p>
<h3 id="_1-2-分库分表" tabindex="-1"><a class="header-anchor" href="#_1-2-分库分表" aria-hidden="true">#</a> 1.2 分库分表</h3>
<h2 id="二、mysql-语句执行过程" tabindex="-1"><a class="header-anchor" href="#二、mysql-语句执行过程" aria-hidden="true">#</a> 二、Mysql 语句执行过程</h2>
<h3 id="_2-1-查询语句" tabindex="-1"><a class="header-anchor" href="#_2-1-查询语句" aria-hidden="true">#</a> 2.1 查询语句</h3>
<h3 id="_2-2-增删改语句" tabindex="-1"><a class="header-anchor" href="#_2-2-增删改语句" aria-hidden="true">#</a> 2.2 增删改语句</h3>
<h2 id="三、事务" tabindex="-1"><a class="header-anchor" href="#三、事务" aria-hidden="true">#</a> 三、事务</h2>
<p>MVCC</p>
<p>Buffer Pool、自适应Hash索引、双写缓冲区。</p>
<h2 id="四、查询语句优化" tabindex="-1"><a class="header-anchor" href="#四、查询语句优化" aria-hidden="true">#</a> 四、查询语句优化</h2>
<p>索引</p>
<p>索引失效</p>
<p>执行计划</p>
<p>成本计算</p>
</div></template>


