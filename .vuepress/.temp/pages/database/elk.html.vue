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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-3-配置文件" tabindex="-1"><a class="header-anchor" href="#_1-3-配置文件" aria-hidden="true">#</a> 1.3 配置文件</h3>
<p><a href="https://blog.csdn.net/yjclsx/article/details/81319454" target="_blank" rel="noopener noreferrer">https://blog.csdn.net/yjclsx/article/details/81319454<ExternalLinkIcon/></a></p>
<h2 id="二、kibana" tabindex="-1"><a class="header-anchor" href="#二、kibana" aria-hidden="true">#</a> 二、Kibana</h2>
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


