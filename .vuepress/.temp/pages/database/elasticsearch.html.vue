<template><div><h2 id="一、安装" tabindex="-1"><a class="header-anchor" href="#一、安装" aria-hidden="true">#</a> 一、安装</h2>
<h2 id="_1-1-下载安装" tabindex="-1"><a class="header-anchor" href="#_1-1-下载安装" aria-hidden="true">#</a> 1.1 下载安装</h2>
<ul>
<li>
<p>下载安装包地址: <a href="https://www.elastic.co/cn/downloads/elasticsearch" target="_blank" rel="noopener noreferrer">https://www.elastic.co/cn/downloads/elasticsearch<ExternalLinkIcon/></a></p>
</li>
<li>
<p>修改config/elasticsearch.yml配置</p>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token comment"># 集群名称</span>
<span class="token key atrule">cluster.name</span><span class="token punctuation">:</span> web<span class="token punctuation">-</span>application
<span class="token comment"># ------------------------------------ Node ------------------------------------</span>
<span class="token comment"># 节点名称</span>
<span class="token key atrule">node.name</span><span class="token punctuation">:</span> node<span class="token punctuation">-</span><span class="token number">1</span>
<span class="token comment"># 增加一个自定义属性</span>
<span class="token comment">#node.attr.rack: r1</span>
<span class="token comment"># ----------------------------------- Paths ------------------------------------</span>
<span class="token comment"># 存储数据的目录(用逗号分隔)</span>
<span class="token comment">#path.data: /path/to/data</span>
<span class="token comment"># 日志路径</span>
<span class="token comment">#path.logs: /path/to/logs</span>
<span class="token comment"># ----------------------------------- Memory -----------------------------------</span>
<span class="token comment"># 启动时锁定内存:</span>
<span class="token comment">#bootstrap.memory_lock: true</span>
<span class="token key atrule">bootstrap.memory_lock</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
<span class="token key atrule">bootstrap.system_call_filter</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
<span class="token comment"># ---------------------------------- Network -----------------------------------</span>
<span class="token comment"># 设置外网可以访问</span>
<span class="token key atrule">network.host</span><span class="token punctuation">:</span> 0.0.0.0
<span class="token comment"># 自定义端口</span>
<span class="token comment">#http.port: 9200</span>
<span class="token comment"># --------------------------------- Discovery ----------------------------------</span>
<span class="token comment">#</span>
<span class="token comment"># 启动后去发现list里面主机节点是否启动 默认列表["127.0.0.1", "[::1]"]</span>
<span class="token comment">#discovery.seed_hosts: ["host1", "host2"]</span>
<span class="token comment"># 初始化主节点</span>
<span class="token key atrule">cluster.initial_master_nodes</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">"node-1"</span><span class="token punctuation">]</span>
<span class="token comment"># ---------------------------------- Gateway -----------------------------------</span>
<span class="token comment"># 整个集群启动之后</span>
<span class="token comment">#gateway.recover_after_nodes: 3</span>
<span class="token comment"># ---------------------------------- Various -----------------------------------</span>
<span class="token comment"># 删除索引时需要显示名称</span>
<span class="token comment">#action.destructive_requires_name: true</span>
<span class="token comment"># 启动输入密码访问</span>
<span class="token key atrule">xpack.security.transport.ssl.enabled</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
<span class="token key atrule">xpack.security.enabled</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>操作命令</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>// 增加elasticsearch用户
adduser elasticsearch
// 设置密码
<span class="token function">passwd</span> elasticsearch
// 更改文件的所属用户
<span class="token function">chown</span> <span class="token parameter variable">-R</span> elasticsearch filename
// 切换用户
<span class="token function">su</span> elasticsearch
// 解压
<span class="token function">tar</span> <span class="token parameter variable">-zxf</span> XXX.tar.gz
// 后台启动
./elasticsearch <span class="token parameter variable">-d</span>
// 修改密码，为多个用户分别设置密码
bin/elasticsearch-setup-passwords interactive
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>验证:，浏览器访问http://ip:9200输入帐号密码后返回json串表示启动成功。</p>
</li>
</ul>
<h3 id="_1-2-安装遇到的问题" tabindex="-1"><a class="header-anchor" href="#_1-2-安装遇到的问题" aria-hidden="true">#</a> 1.2 安装遇到的问题</h3>
<h4 id="_1-2-1-外网无法访问" tabindex="-1"><a class="header-anchor" href="#_1-2-1-外网无法访问" aria-hidden="true">#</a> 1.2.1 外网无法访问</h4>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>vim config/elasticsearch.yml
// 增加下面配置
network.host: 0.0.0.0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_1-2-2-启动报错" tabindex="-1"><a class="header-anchor" href="#_1-2-2-启动报错" aria-hidden="true">#</a> 1.2.2 启动报错</h4>
<ul>
<li>
<p>system call filters failed to install; check the logs and fix your configuration or disable system call filters at your own risk。 因为Centos6不支持SecComp，而ES5.2.1默认bootstrap.system_call_filter为true进行检测，所以导致检测失败，失败后直接导致ES不能启动。解决方法：在elasticsearch.yml中配置bootstrap.system_call_filter为false，注意要在Memory下面:</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>bootstrap.memory_lock: false
bootstrap.system_call_filter: false
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>max number of threads [1024] for user [elasticsearch] is too low, increase to at least [4096] 最大线程数[1024]太低，至少增加到[4096]。 修改/etc/security/limits.d/90-nproc.conf文件里面1024为4096</p>
</li>
<li>
<p>max virtual memory areas vm.max_map_count [65530] is too low, increase to at least [262144] 最大虚拟内存区域vm.max_map_count [65530]太低，至少增加到[262144]</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>vim /etc/sysctl.conf
// 增加下面配置
vm.max_map_count=655360
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>max file descriptors [65535] for elasticsearch process is too low, increase to at least[65536]。由于给帐号的最大打开文件个数或者最大打开线程数的限制，一直会报错，因此改一下限制(/etc/security/limits.conf)即可</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>// 增加下面配置
* soft nofile 65536
* hard nofile 131072
* soft nproc 2048
* hard nproc 4096
// 退出帐号重新登录(退出重新登录生效)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h2 id="二、常用语法" tabindex="-1"><a class="header-anchor" href="#二、常用语法" aria-hidden="true">#</a> 二、常用语法</h2>
<h3 id="_2-1-基本操作" tabindex="-1"><a class="header-anchor" href="#_2-1-基本操作" aria-hidden="true">#</a> 2.1 基本操作</h3>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token comment"># &lt;REST Verb> http://localhost:9200/&lt;Index>/&lt;Type>/&lt;ID></span>
<span class="token comment"># &lt;請求類型>   &lt;请求地址>/&lt;索引名>/&lt;文档类型>/&lt;文档ID></span>
<span class="token comment"># 数据库：数据库  表   行    列</span>
<span class="token comment"># el：   索引    类型 文档  字段</span>
<span class="token comment"># 检查集群的健康 Authorization 從/獲取</span>
GET /_cat/health<span class="token punctuation">?</span>v
<span class="token comment"># 查看索引返回：health status index uuid pri rep docs.count docs.deleted store.size pri.store.size 表明我们还没有索引在集群中</span>
GET /_cat/indices<span class="token punctuation">?</span>v
<span class="token comment"># 集群中的节点列表</span>
GET /_cat/nodes<span class="token punctuation">?</span>v
<span class="token comment"># 创建一个索引叫做"customer"</span>
PUT /customer<span class="token punctuation">?</span>pretty
<span class="token comment"># 索引一个简单的customer文档到customer索引，external类型，ID是1</span>
PUT /customer/external/1<span class="token punctuation">?</span>pretty
<span class="token punctuation">{</span>
  <span class="token key atrule">"name"</span><span class="token punctuation">:</span> <span class="token string">"John Doe"</span>
<span class="token punctuation">}</span>
<span class="token comment"># 删除一个索引</span>
DELETE /customer<span class="token punctuation">?</span>pretty
<span class="token comment"># 删除全部索引</span>
DELETE /_all
<span class="token comment"># 删除 多个索引</span>
DELETE /customer<span class="token punctuation">,</span>customer1<span class="token punctuation">,</span>customer2
<span class="token comment"># 删除 模糊匹配</span>
DELETE /customer*
<span class="token comment"># 删除一个文档</span>
DELETE /customer/external/2<span class="token punctuation">?</span>pretty
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-search查询条件详解" tabindex="-1"><a class="header-anchor" href="#_2-2-search查询条件详解" aria-hidden="true">#</a> 2.2 search查询条件详解</h3>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token comment"># 查询出所有问题文档匹配某个查询</span>
GET /centent/_search<span class="token punctuation">?</span>q=title<span class="token punctuation">:</span><span class="token number">123</span>
<span class="token comment"># 有多少文档匹配某个查询</span>
GET /centent/_search<span class="token punctuation">?</span>q=title<span class="token punctuation">:</span>123<span class="token important">*&amp;size=0</span>
<span class="token comment"># 有没有文档匹配某个查询(terminated_early)</span>
GET /centent/_search<span class="token punctuation">?</span>q=title<span class="token punctuation">:</span>1234<span class="token important">*&amp;size=0&amp;terminate_after=1</span>
<span class="token comment"># match和term的区别：match查询的时候,elasticsearch会根据你给定的字段提供合适的分析器,而term查询不会有分析器分析的过程，match查询相当于模糊匹配,只包含其中一部分关键词就行</span>
GET /_search
<span class="token punctuation">{</span>
    <span class="token key atrule">"_source"</span><span class="token punctuation">:</span> <span class="token boolean important">false</span><span class="token punctuation">,</span>
    <span class="token key atrule">"query"</span> <span class="token punctuation">:</span> <span class="token punctuation">{</span>
        <span class="token key atrule">"term"</span> <span class="token punctuation">:</span> <span class="token punctuation">{</span> <span class="token key atrule">"title"</span> <span class="token punctuation">:</span> <span class="token string">"123"</span> <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment"># 查询全部</span>
GET /book/_search
<span class="token punctuation">{</span>
  <span class="token key atrule">"query"</span><span class="token punctuation">:</span> <span class="token punctuation">{</span> <span class="token key atrule">"match_all"</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment"># 排序</span>
GET /book/_search 
<span class="token punctuation">{</span><span class="token key atrule">"query"</span> <span class="token punctuation">:</span> <span class="token punctuation">{</span>
        <span class="token key atrule">"match"</span> <span class="token punctuation">:</span> <span class="token punctuation">{</span>
            <span class="token key atrule">"name"</span> <span class="token punctuation">:</span> <span class="token string">" java"</span>
        <span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token key atrule">"sort"</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span> <span class="token key atrule">"price"</span><span class="token punctuation">:</span> <span class="token string">"desc"</span> <span class="token punctuation">}</span>
    <span class="token punctuation">]</span><span class="token punctuation">}</span>
<span class="token comment"># 分页</span>
GET  /book/_search 
<span class="token punctuation">{</span>
  <span class="token key atrule">"query"</span><span class="token punctuation">:</span> <span class="token punctuation">{</span> <span class="token key atrule">"match_all"</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token key atrule">"from"</span><span class="token punctuation">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token key atrule">"size"</span><span class="token punctuation">:</span> <span class="token number">1</span>
<span class="token punctuation">}</span>
<span class="token comment"># 指定返回的字段</span>
GET /book/_search 
<span class="token punctuation">{</span>
  <span class="token key atrule">"query"</span><span class="token punctuation">:</span> <span class="token punctuation">{</span> <span class="token key atrule">"match_all"</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token key atrule">"_source"</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">"name"</span><span class="token punctuation">,</span> <span class="token string">"studymodel"</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>
<span class="token comment"># 匹配指定条件查询</span>
GET /test_index/_search 
<span class="token punctuation">{</span>
  <span class="token key atrule">"query"</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>
    <span class="token key atrule">"match"</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>
      <span class="token key atrule">"test_field"</span><span class="token punctuation">:</span> <span class="token string">"test"</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-3-返回数据详解" tabindex="-1"><a class="header-anchor" href="#_2-3-返回数据详解" aria-hidden="true">#</a> 2.3 返回数据详解</h3>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token punctuation">{</span>
  <span class="token key atrule">"took"</span> <span class="token punctuation">:</span> <span class="token number">97</span><span class="token punctuation">,</span> <span class="token comment">#请求耗时多少毫秒</span>
  <span class="token key atrule">"timed_out"</span> <span class="token punctuation">:</span> <span class="token boolean important">false</span><span class="token punctuation">,</span> <span class="token comment">#是否超时。默认情况下没有超时机制，也就是客户端等待Elasticsearch搜索结束（无论执行多久），提供超时机制的话，Elasticsearch则在指定时长内处理搜索，在指定时长结束的时候，将搜索的结果直接返回（无论是否搜索结束）。指定超时的方式是传递参数，参数单位是：毫秒-ms。秒-s。分钟-m。</span>
  <span class="token key atrule">"_shards"</span> <span class="token punctuation">:</span> <span class="token punctuation">{</span> <span class="token comment"># 分片</span>
    <span class="token key atrule">"total"</span> <span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token comment">#请求发送到多少个shard上</span>
    <span class="token key atrule">"successful"</span> <span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token comment">#成功返回搜索结果的shard</span>
    <span class="token key atrule">"skipped"</span> <span class="token punctuation">:</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token comment">#停止服务的shard</span>
    <span class="token key atrule">"failed"</span> <span class="token punctuation">:</span> <span class="token number">0</span> <span class="token comment">#失败的shard</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token key atrule">"hits"</span> <span class="token punctuation">:</span> <span class="token punctuation">{</span> <span class="token comment">#匹配记录数</span>
    <span class="token key atrule">"total"</span> <span class="token punctuation">:</span> <span class="token punctuation">{</span> <span class="token comment">#返回了多少结果</span>
      <span class="token key atrule">"value"</span> <span class="token punctuation">:</span> <span class="token number">3</span><span class="token punctuation">,</span>
      <span class="token key atrule">"relation"</span> <span class="token punctuation">:</span> <span class="token string">"eq"</span> <span class="token comment"># 关系</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token key atrule">"max_score"</span> <span class="token punctuation">:</span> <span class="token number">1.0</span><span class="token punctuation">,</span> <span class="token comment">#搜索结果中，最大的相关度分数，相关度越大分数越高，_score越大，排位越靠前</span>
    <span class="token key atrule">"hits"</span> <span class="token punctuation">:</span> <span class="token punctuation">[</span> <span class="token comment">#搜索到的结果集合，默认查询前10条数据。</span>
      <span class="token punctuation">{</span>
        <span class="token key atrule">"_index"</span> <span class="token punctuation">:</span> <span class="token string">"centent"</span><span class="token punctuation">,</span> <span class="token comment">#数据所在索引</span>
        <span class="token key atrule">"_type"</span> <span class="token punctuation">:</span> <span class="token string">"centent"</span><span class="token punctuation">,</span> <span class="token comment">#数据所在类型</span>
        <span class="token key atrule">"_id"</span> <span class="token punctuation">:</span> <span class="token string">"4"</span><span class="token punctuation">,</span> <span class="token comment">#数据的id</span>
        <span class="token key atrule">"_score"</span> <span class="token punctuation">:</span> <span class="token number">1.0</span><span class="token punctuation">,</span> <span class="token comment">#数据的搜索相关度分数</span>
        <span class="token key atrule">"_source"</span> <span class="token punctuation">:</span> <span class="token punctuation">{</span> <span class="token comment"># 数据的具体内容。</span>
          <span class="token key atrule">"id"</span> <span class="token punctuation">:</span> <span class="token number">4</span><span class="token punctuation">,</span>
          <span class="token key atrule">"title"</span> <span class="token punctuation">:</span> <span class="token string">"***"</span><span class="token punctuation">,</span>
          <span class="token key atrule">"content"</span> <span class="token punctuation">:</span> <span class="token string">"***"</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


