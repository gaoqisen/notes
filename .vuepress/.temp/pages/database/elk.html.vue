<template><div><h1 id="docker安装" tabindex="-1"><a class="header-anchor" href="#docker安装" aria-hidden="true">#</a> docker安装</h1>
<h2 id="一、elasticsearch" tabindex="-1"><a class="header-anchor" href="#一、elasticsearch" aria-hidden="true">#</a> 一、<a href="https://es.xiaoleilu.com/010_Intro/15_API.html" target="_blank" rel="noopener noreferrer">Elasticsearch<ExternalLinkIcon/></a></h2>
<h3 id="_1-1-简介" tabindex="-1"><a class="header-anchor" href="#_1-1-简介" aria-hidden="true">#</a> 1.1 简介</h3>
<p>ElasticSearch是一个基于Lucene构建的开源，分布式，RESTful搜索引擎。 设计用于云计算中，能够达到实时搜索，稳定，可靠，快速，安装使用方便。官方维护的docker镜像<a href="https://www.docker.elastic.co/" target="_blank" rel="noopener noreferrer">https://www.docker.elastic.co/<ExternalLinkIcon/></a></p>
<h3 id="_1-2-安装-lastic-需要-java-8-环境" tabindex="-1"><a class="header-anchor" href="#_1-2-安装-lastic-需要-java-8-环境" aria-hidden="true">#</a> 1.2 安装（lastic 需要 Java 8 环境）</h3>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">mac</span><span class="token punctuation">:</span>
    brew install elasticsearch   // 安装
    elasticsearch <span class="token punctuation">-</span><span class="token punctuation">-</span>version   //  查看版本号
    elasticsearch   // 启动后默认端口9200
<span class="token key atrule">linux</span><span class="token punctuation">:</span>
    wget https<span class="token punctuation">:</span>//artifacts.elastic.co/downloads/elasticsearch/elasticsearch<span class="token punctuation">-</span>7.3.1.zip
    unzip elasticsearch<span class="token punctuation">-</span>7.3.1.zip
    cd elasticsearch<span class="token punctuation">-</span>7.3.1/ 
    ./bin/elasticsearch     // 启动
<span class="token key atrule">docker</span><span class="token punctuation">:</span>
    docker pull docker.elastic.co/elasticsearch/elasticsearch<span class="token punctuation">:</span>7.3.1   // 拉取镜像
    docker tag docker.elastic.co/elasticsearch/elasticsearch<span class="token punctuation">:</span>7.3.1  elasticsearch 
    docker run <span class="token punctuation">-</span>d <span class="token punctuation">-</span><span class="token punctuation">-</span>name elasticsearch <span class="token punctuation">-</span>p 9200<span class="token punctuation">:</span>9200 <span class="token punctuation">-</span>p 9300<span class="token punctuation">:</span>9300 <span class="token punctuation">-</span>e "discovery.type=single<span class="token punctuation">-</span>node" elasticsearch    // 运行容器
    docker exec <span class="token punctuation">-</span>it es /bin/bash   // 进入容器
    vi elasticsearch.yml  // 添加如下配置解决跨域问题
        <span class="token key atrule">http.cors.enabled</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
        <span class="token key atrule">http.cors.allow-origin</span><span class="token punctuation">:</span> <span class="token string">"*"</span>
    docker restart es   // 重启
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="二、常用语法" tabindex="-1"><a class="header-anchor" href="#二、常用语法" aria-hidden="true">#</a> 二、常用语法</h2>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="二、kibana" tabindex="-1"><a class="header-anchor" href="#二、kibana" aria-hidden="true">#</a> 二、Kibana</h2>
<h3 id="_2-1-简介" tabindex="-1"><a class="header-anchor" href="#_2-1-简介" aria-hidden="true">#</a> 2.1 简介</h3>
<p>Kibana 是一款开源的数据分析和可视化平台，它是Elastic Stack 成员之一，设计用于和Elasticsearch 协作。 ... 它很简单，基于浏览器的界面便于您快速创建和分享动态数据仪表板来追踪Elasticsearch 的实时数据变化。 搭建Kibana 非常简单。</p>
<h3 id="_2-2-安装" tabindex="-1"><a class="header-anchor" href="#_2-2-安装" aria-hidden="true">#</a> 2.2 安装</h3>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">mac</span><span class="token punctuation">:</span> 
    brew install kibana   // 安装
    kibana   // 启动后默认端口5601
<span class="token key atrule">linux</span><span class="token punctuation">:</span>
    wget https<span class="token punctuation">:</span>//artifacts.elastic.co/downloads/beats/kibana/kibana<span class="token punctuation">-</span>7.3.1<span class="token punctuation">-</span>linux<span class="token punctuation">-</span>x86_64.tar.gz
    tar <span class="token punctuation">-</span>zxvf kibana<span class="token punctuation">-</span>7.3.1<span class="token punctuation">-</span>linux<span class="token punctuation">-</span>x86_64.tar.gz
    ./kibana    // 进入kibana的bin目录进行启动
    nohup ./kibana &amp;   // 后台启动
<span class="token key atrule">docker</span><span class="token punctuation">:</span>
    docker pull docker.elastic.co/kibana/kibana<span class="token punctuation">:</span>7.3.1
    docker tag docker.elastic.co/kibana/kibana<span class="token punctuation">:</span>7.3.1 kibana
    docker run <span class="token punctuation">-</span><span class="token punctuation">-</span>name kibana <span class="token punctuation">-</span>p 5601<span class="token punctuation">:</span>5601 <span class="token punctuation">-</span>d kibana
    docker run <span class="token punctuation">-</span>d <span class="token punctuation">-</span>p 5601<span class="token punctuation">:</span>5601 <span class="token punctuation">-</span><span class="token punctuation">-</span>link elasticsearch <span class="token punctuation">-</span>e ELASTICSEARCH_URL=http<span class="token punctuation">:</span>//elasticsearch<span class="token punctuation">:</span>9200 kibana   // 使用link参数，会在kibana容器hosts文件中加入elasticsearch ip地址，这样我们就直接通过定义的name来访问es服务了

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-3-配置文件" tabindex="-1"><a class="header-anchor" href="#_2-3-配置文件" aria-hidden="true">#</a> 2.3 配置文件</h3>
<p><a href="https://www.elastic.co/guide/cn/kibana/current/settings.html" target="_blank" rel="noopener noreferrer">https://www.elastic.co/guide/cn/kibana/current/settings.html<ExternalLinkIcon/></a></p>
<h2 id="三、logstash" tabindex="-1"><a class="header-anchor" href="#三、logstash" aria-hidden="true">#</a> 三、Logstash</h2>
<h3 id="_3-1-简介" tabindex="-1"><a class="header-anchor" href="#_3-1-简介" aria-hidden="true">#</a> 3.1 简介</h3>
<p>它一个有jruby语言编写的运行在java虚拟机上的具有收集
分析转发数据流功能的工具</p>
<h3 id="_3-2-安装" tabindex="-1"><a class="header-anchor" href="#_3-2-安装" aria-hidden="true">#</a> 3.2 安装</h3>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">mac</span><span class="token punctuation">:</span>
    brew install logstash
    logstash <span class="token punctuation">-</span><span class="token punctuation">-</span>version
<span class="token key atrule">linux</span><span class="token punctuation">:</span>
    wget https<span class="token punctuation">:</span>//artifacts.elastic.co/downloads/logstash/logstash<span class="token punctuation">-</span>7.3.1.tar.gz
    tar <span class="token punctuation">-</span>zxvf logstash<span class="token punctuation">-</span>7.3.1.tar.gz
    bin/logstash <span class="token punctuation">-</span>e 'input<span class="token punctuation">{</span>stdin<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">}</span>output<span class="token punctuation">{</span>stdout<span class="token punctuation">{</span>codec=<span class="token punctuation">></span>rubydebug<span class="token punctuation">}</span><span class="token punctuation">}</span>'
<span class="token key atrule">docker</span><span class="token punctuation">:</span>
    docker pull docker.elastic.co/logstash/logstash<span class="token punctuation">:</span>7.3.1
    docker tag docker.elastic.co/logstash/logstash<span class="token punctuation">:</span>7.3.1 logstash
    docker run <span class="token punctuation">-</span>d <span class="token punctuation">-</span><span class="token punctuation">-</span>name logstash 10.45.53.221<span class="token punctuation">:</span>5000/logstash 
    docker run <span class="token punctuation">-</span><span class="token punctuation">-</span>rm <span class="token punctuation">-</span>it <span class="token punctuation">-</span><span class="token punctuation">-</span>name logstash <span class="token punctuation">-</span><span class="token punctuation">-</span>link elasticsearch <span class="token punctuation">-</span>d <span class="token punctuation">-</span>v ~/elk/yaml/logstash.conf<span class="token punctuation">:</span>/usr/share/logstash/pipeline/logstash.conf logstash  // 启动logstash并关联elasticsearch
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-3-配置文件" tabindex="-1"><a class="header-anchor" href="#_3-3-配置文件" aria-hidden="true">#</a> 3.3 配置文件</h3>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code>logstash.conf
input <span class="token punctuation">{</span>
  beats <span class="token punctuation">{</span>
    host =<span class="token punctuation">></span> "localhost"
    port =<span class="token punctuation">></span> "5043"
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
filter <span class="token punctuation">{</span>
   if <span class="token punctuation">[</span>fields<span class="token punctuation">]</span><span class="token punctuation">[</span>doc_type<span class="token punctuation">]</span> == 'order' <span class="token punctuation">{</span>
    grok <span class="token punctuation">{</span>
            match =<span class="token punctuation">></span> <span class="token punctuation">{</span> "message" =<span class="token punctuation">></span> "%<span class="token punctuation">{</span>TIMESTAMP_ISO8601<span class="token punctuation">:</span>timestamp<span class="token punctuation">}</span> %<span class="token punctuation">{</span>LOGLEVEL<span class="token punctuation">:</span>level<span class="token punctuation">}</span> %<span class="token punctuation">{</span>JAVALOGMESSAGE<span class="token punctuation">:</span>msg<span class="token punctuation">}</span>" <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
   <span class="token punctuation">}</span>

   if <span class="token punctuation">[</span>fields<span class="token punctuation">]</span><span class="token punctuation">[</span>doc_type<span class="token punctuation">]</span> == 'customer' <span class="token punctuation">{</span> <span class="token comment"># 这里写两个一样的grok，实际上可能出现多种不同的日志格式，这里做个提示而已,当然如果是相同的格式，这里可以不写的</span>
    grok <span class="token punctuation">{</span>
            match =<span class="token punctuation">></span> <span class="token punctuation">{</span> "message" =<span class="token punctuation">></span> "%<span class="token punctuation">{</span>TIMESTAMP_ISO8601<span class="token punctuation">:</span>timestamp<span class="token punctuation">}</span> %<span class="token punctuation">{</span>LOGLEVEL<span class="token punctuation">:</span>level<span class="token punctuation">}</span> %<span class="token punctuation">{</span>JAVALOGMESSAGE<span class="token punctuation">:</span>msg<span class="token punctuation">}</span>" <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

output <span class="token punctuation">{</span>
  stdout <span class="token punctuation">{</span> codec =<span class="token punctuation">></span> rubydebug <span class="token punctuation">}</span>
  elasticsearch <span class="token punctuation">{</span>
        hosts =<span class="token punctuation">></span> <span class="token punctuation">[</span> <span class="token string">"localhost:9200"</span> <span class="token punctuation">]</span>
        index =<span class="token punctuation">></span> "%<span class="token punctuation">{</span><span class="token punctuation">[</span>fields<span class="token punctuation">]</span><span class="token punctuation">[</span>doc_type<span class="token punctuation">]</span><span class="token punctuation">}</span><span class="token punctuation">-</span>%<span class="token punctuation">{</span>+YYYY.MM.dd<span class="token punctuation">}</span>"
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="单独安装" tabindex="-1"><a class="header-anchor" href="#单独安装" aria-hidden="true">#</a> 单独安装</h1>
<h2 id="一、安装elasticsearch" tabindex="-1"><a class="header-anchor" href="#一、安装elasticsearch" aria-hidden="true">#</a> 一、安装elasticsearch</h2>
<p>作用：将数据放到elasticsearch进行搜索</p>
<h3 id="_1-1-配置elasticsearch的yum源" tabindex="-1"><a class="header-anchor" href="#_1-1-配置elasticsearch的yum源" aria-hidden="true">#</a> 1.1 配置elasticsearch的yum源</h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>vim /etc/yum.repos.d/elasticsearch.repo   // 配置yum源

// 在elasticsearch.repo（如果没有就新建） 中加入一下内容6.x版本以上，将6改为2即可变更为2.x版本
[elasticsearch-6.x]
name=Elasticsearch repository for 6.x packages
baseurl=https://artifacts.elastic.co/packages/6.x/yum
gpgcheck=1
gpgkey=https://artifacts.elastic.co/GPG-KEY-elasticsearch
enabled=1
autorefresh=1
type=rpm-md
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-2-yum安装" tabindex="-1"><a class="header-anchor" href="#_1-2-yum安装" aria-hidden="true">#</a> 1.2 yum安装</h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>yum -y install elasticsearch
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_1-3-启动" tabindex="-1"><a class="header-anchor" href="#_1-3-启动" aria-hidden="true">#</a> 1.3 启动</h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>service elasticsearch start   // 启动命令
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote>
<p>Starting elasticsearch (via systemctl):                    [  确定  ]  // 出现这个表示启动成功</p>
</blockquote>
<h3 id="_1-3-配置" tabindex="-1"><a class="header-anchor" href="#_1-3-配置" aria-hidden="true">#</a> 1.3 配置</h3>
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
<h3 id="_1-4-安装遇到的问题" tabindex="-1"><a class="header-anchor" href="#_1-4-安装遇到的问题" aria-hidden="true">#</a> 1.4 安装遇到的问题</h3>
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
<h2 id="" tabindex="-1"><a class="header-anchor" href="#" aria-hidden="true">#</a> </h2>
<h2 id="二、安装logstash" tabindex="-1"><a class="header-anchor" href="#二、安装logstash" aria-hidden="true">#</a> 二、安装logstash</h2>
<h3 id="_2-1-用于将mysql里面的数据同步到elasticsearch" tabindex="-1"><a class="header-anchor" href="#_2-1-用于将mysql里面的数据同步到elasticsearch" aria-hidden="true">#</a> 2.1 用于将mysql里面的数据同步到elasticsearch</h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>wget https://artifacts.elastic.co/downloads/logstash/logstash-6.4.1.zip  // 下载到目录解压文件
cd logstash-6.4.1   // 进入logstash文件夹
vim mysql.conf   // 新建mysql.conf文件
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-在mysql-conf文件中配置如下信息" tabindex="-1"><a class="header-anchor" href="#_2-2-在mysql-conf文件中配置如下信息" aria-hidden="true">#</a> 2.2 在mysql.conf文件中配置如下信息：</h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>input {
     stdin {
     }
     jdbc {
       # mysql数据库连接
       jdbc_connection_string => "jdbc:mysql://localhost/basesdataName?characterEncoding=utf-8&amp;useSSL=false&amp;serverTimezone=UTC"
       # mysqly用户名和密码
       jdbc_user => "root"
       jdbc_password => "password"
       # 驱动配置(可以自己下载mysql-connector-java-6.0.5.jar，填写路径即可)
       jdbc_driver_library => "./lib/mysql-connector-java-6.0.5.jar"
       # 驱动类名
       jdbc_driver_class => "com.mysql.cj.jdbc.Driver"
       jdbc_paging_enabled => "true"
       jdbc_page_size => "50000"
       # 执行指定的sql文件
       statement_filepath => "./data.sql"
       # 设置监听 各字段含义 分 时 天 月  年 ，默认全部为*代表含义：每分钟都更新
       schedule => "* * * * *"
       # 索引类型
       type => "product"
     }
 }

 filter {
     json {
         source => "message"
         remove_field => ["message"]
     }
 }

 output {

     elasticsearch {
         #es服务器
         hosts => ["localhost:9200"]
         #ES索引名称
         index => "sl_product"
         #自增ID
         document_id => "%{id}"
     }


     stdout {
         codec => json_lines
     }
 ｝
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-3-新建data-sql" tabindex="-1"><a class="header-anchor" href="#_2-3-新建data-sql" aria-hidden="true">#</a> 2.3 新建data.sql</h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>vim data.sql     // 新建

写入如下内容
SELECT * FROM tableName   // 查询语句
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-4-启动logstash" tabindex="-1"><a class="header-anchor" href="#_2-4-启动logstash" aria-hidden="true">#</a> 2.4 启动logstash</h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>bin/logstash -f mysql.conf   // 在logstash-6.4.1目录启动，如果其它目录，需要更改路径
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="三、测试是否安装成功" tabindex="-1"><a class="header-anchor" href="#三、测试是否安装成功" aria-hidden="true">#</a> 三、测试是否安装成功</h2>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>curl 'http://127.0.0.1:9200/_search?pretty'  // 返回json串表示成功
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></div></template>


