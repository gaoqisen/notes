<template><div><blockquote>
<p>官网：https://rocketmq.apache.org/</p>
</blockquote>
<h2 id="消息队列简介" tabindex="-1"><a class="header-anchor" href="#消息队列简介" aria-hidden="true">#</a> 消息队列简介</h2>
<ul>
<li>可以把消息队列比作是一个存放消息的容器，当我们需要使用消息的时候可以取出消息供自己使用。消息队列是分布式系统中重要的组件，使用消息队列主要是为了通过异步处理提高系统性能和削峰、降低系统耦合性。目前使用较多的消息队列有ActiveMQ，RabbitMQ，Kafka，RocketMQ</li>
<li>消息队列的优点：
<ul>
<li>通过异步处理提高系统性能（削峰、减少响应所需时间）;</li>
<li>降低系统耦合性。</li>
</ul>
</li>
<li>消息队列缺点:
<ul>
<li>系统可用性降低: 要担心MQ队列挂掉和消息丢失</li>
<li>系统复杂性提高：需要保证消息没有被重复消费、处理消息丢失的情况、保证消息传递的顺序性等等问题</li>
<li>一致性问题：消息的真正消费者没有正确消费消息，导致数据不一致。</li>
</ul>
</li>
<li>名词解释：
<ul>
<li>Topic:  主题（Topic）作为消息通信载体，类似于广播模式；发布者发布一条消息，该消息通过主题传递给所有的订阅者，在一条消息广播之后才订阅的用户则是收不到该条消息的。</li>
<li>生产者（消息发布者）：负责生产消息并发送消息到Topic</li>
<li>消费者（消息订阅者）: 负责从Topic接收消息并消费</li>
<li>消息：生产者向消息到Topic，消费者接受到的数据</li>
<li>消息属性： 生产者给消息定义的属性，包含Message Key 和 Tag</li>
<li>Group:  给一类生产者和消费者分一个组，消息发布或订阅的逻辑一致</li>
</ul>
</li>
<li>应用场景:削峰填谷、异步解耦、顺序收发、分布式事务一致性、大数据分析、分布式缓存同步</li>
<li>RocketMQ特色功能：消息查询、消息轨迹、集群消费、广播消费、重置消费位点、死信队列、全球消息路由、资源报表、监控报警</li>
<li>消息类型：普通消息、事务消息、延时消息、顺序消息</li>
</ul>
<h2 id="mac安装" tabindex="-1"><a class="header-anchor" href="#mac安装" aria-hidden="true">#</a> MAC安装</h2>
<h3 id="下载链接" tabindex="-1"><a class="header-anchor" href="#下载链接" aria-hidden="true">#</a> 下载链接</h3>
<p>https://www.apache.org/dyn/closer.cgi?path=rocketmq/4.1.0-incubating/rocketmq-all-4.1.0-incubating-source-release.zip</p>
<h3 id="命令行安装" tabindex="-1"><a class="header-anchor" href="#命令行安装" aria-hidden="true">#</a> 命令行安装</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token builtin class-name">cd</span>  rocketmq-all-4.1.0-incubating
mvn -Prelease-all <span class="token parameter variable">-DskipTests</span> clean <span class="token function">install</span> <span class="token parameter variable">-U</span>    // maven依赖
<span class="token builtin class-name">cd</span> distribution/target/apache-rocketmq
<span class="token function">sh</span> bin/mqnamesrv <span class="token operator">&amp;</span>  // 启动 Name Server服务
<span class="token function">sh</span> bin/mqbroker <span class="token parameter variable">-n</span> localhost:9876 <span class="token assign-left variable">autoCreateTopicEnable</span><span class="token operator">=</span>true <span class="token operator">&amp;</span> // 启动 broker
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="docker-compose安装" tabindex="-1"><a class="header-anchor" href="#docker-compose安装" aria-hidden="true">#</a> docker-compose安装</h2>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">'3.5'</span>
<span class="token key atrule">services</span><span class="token punctuation">:</span>
  <span class="token key atrule">rmqnamesrv</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> foxiswho/rocketmq<span class="token punctuation">:</span>server
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> rmqnamesrv
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> 9876<span class="token punctuation">:</span><span class="token number">9876</span>
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> ./data/logs<span class="token punctuation">:</span>/opt/logs
      <span class="token punctuation">-</span> ./data/store<span class="token punctuation">:</span>/opt/store
    <span class="token key atrule">networks</span><span class="token punctuation">:</span>
        <span class="token key atrule">rmq</span><span class="token punctuation">:</span>
          <span class="token key atrule">aliases</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> rmqnamesrv

  <span class="token key atrule">rmqbroker</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> foxiswho/rocketmq<span class="token punctuation">:</span>broker
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> rmqbroker
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> 10909<span class="token punctuation">:</span><span class="token number">10909</span>
      <span class="token punctuation">-</span> 10911<span class="token punctuation">:</span><span class="token number">10911</span>
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> ./data/logs<span class="token punctuation">:</span>/opt/logs
      <span class="token punctuation">-</span> ./data/store<span class="token punctuation">:</span>/opt/store
      <span class="token punctuation">-</span> ./data/brokerconf/broker.conf<span class="token punctuation">:</span>/etc/rocketmq/broker.conf
    <span class="token key atrule">environment</span><span class="token punctuation">:</span>
        <span class="token key atrule">NAMESRV_ADDR</span><span class="token punctuation">:</span> <span class="token string">"rmqnamesrv:9876"</span>
        <span class="token key atrule">JAVA_OPTS</span><span class="token punctuation">:</span> <span class="token string">" -Duser.home=/opt"</span>
        <span class="token key atrule">JAVA_OPT_EXT</span><span class="token punctuation">:</span> <span class="token string">"-server -Xms128m -Xmx128m -Xmn128m"</span>
    <span class="token key atrule">command</span><span class="token punctuation">:</span> mqbroker <span class="token punctuation">-</span>c /etc/rocketmq/broker.conf
    <span class="token key atrule">depends_on</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> rmqnamesrv
    <span class="token key atrule">networks</span><span class="token punctuation">:</span>
      <span class="token key atrule">rmq</span><span class="token punctuation">:</span>
        <span class="token key atrule">aliases</span><span class="token punctuation">:</span>
          <span class="token punctuation">-</span> rmqbroker

  <span class="token key atrule">rmqconsole</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> styletang/rocketmq<span class="token punctuation">-</span>console<span class="token punctuation">-</span>ng
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> rmqconsole
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> 8080<span class="token punctuation">:</span><span class="token number">8080</span>
    <span class="token key atrule">environment</span><span class="token punctuation">:</span>
        <span class="token key atrule">JAVA_OPTS</span><span class="token punctuation">:</span> <span class="token string">"-Drocketmq.namesrv.addr=rmqnamesrv:9876 -Dcom.rocketmq.sendMessageWithVIPChannel=false"</span>
    <span class="token key atrule">depends_on</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> rmqnamesrv
    <span class="token key atrule">networks</span><span class="token punctuation">:</span>
      <span class="token key atrule">rmq</span><span class="token punctuation">:</span>
        <span class="token key atrule">aliases</span><span class="token punctuation">:</span>
          <span class="token punctuation">-</span> rmqconsole

<span class="token key atrule">networks</span><span class="token punctuation">:</span>
  <span class="token key atrule">rmq</span><span class="token punctuation">:</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> rmq
    <span class="token key atrule">driver</span><span class="token punctuation">:</span> bridge
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>docker-compose安装成功后，springboot链接的时候一直报错无法正常链接，网上说系统物理内存需要空闲20G，因为安装了rmqconsole可能导致内存不够，故单独安装了RrocketMQ。</p>
</blockquote>
<h2 id="springboot简单集成" tabindex="-1"><a class="header-anchor" href="#springboot简单集成" aria-hidden="true">#</a> SpringBoot简单集成</h2>
<h3 id="配置文件" tabindex="-1"><a class="header-anchor" href="#配置文件" aria-hidden="true">#</a> 配置文件</h3>
<div class="language-properties line-numbers-mode" data-ext="properties"><pre v-pre class="language-properties"><code><span class="token key attr-name">server.port</span><span class="token punctuation">=</span><span class="token value attr-value">8081</span>
<span class="token key attr-name">apache.rocketmq.consumer.PushConsumer</span><span class="token punctuation">=</span><span class="token value attr-value">PushConsumer</span>
<span class="token key attr-name">apache.rocketmq.producer.producerGroup</span><span class="token punctuation">=</span><span class="token value attr-value">Producer</span>
<span class="token key attr-name">apache.rocketmq.namesrvAddr</span><span class="token punctuation">=</span><span class="token value attr-value">localhost:9876</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="pom-xml依赖" tabindex="-1"><a class="header-anchor" href="#pom-xml依赖" aria-hidden="true">#</a> pom.xml依赖</h3>
<div class="language-xml line-numbers-mode" data-ext="xml"><pre v-pre class="language-xml"><code>  <span class="token comment">&lt;!-- https://mvnrepository.com/artifact/org.apache.rocketmq/rocketmq-client --></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.apache.rocketmq<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>rocketmq-client<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>4.1.0-incubating<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token comment">&lt;!-- https://mvnrepository.com/artifact/org.apache.rocketmq/rocketmq-common --></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.apache.rocketmq<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>rocketmq-common<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>4.1.0-incubating<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>com.alibaba<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>fastjson<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>1.2.13<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="生产者服务" tabindex="-1"><a class="header-anchor" href="#生产者服务" aria-hidden="true">#</a> 生产者服务</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>example<span class="token punctuation">.</span>roketmq<span class="token punctuation">.</span>server</span><span class="token punctuation">;</span>


<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>apache<span class="token punctuation">.</span>rocketmq<span class="token punctuation">.</span>client<span class="token punctuation">.</span>producer<span class="token punctuation">.</span></span><span class="token class-name">DefaultMQProducer</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>apache<span class="token punctuation">.</span>rocketmq<span class="token punctuation">.</span>client<span class="token punctuation">.</span>producer<span class="token punctuation">.</span></span><span class="token class-name">SendResult</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>apache<span class="token punctuation">.</span>rocketmq<span class="token punctuation">.</span>common<span class="token punctuation">.</span>message<span class="token punctuation">.</span></span><span class="token class-name">Message</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>apache<span class="token punctuation">.</span>rocketmq<span class="token punctuation">.</span>remoting<span class="token punctuation">.</span>common<span class="token punctuation">.</span></span><span class="token class-name">RemotingHelper</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>beans<span class="token punctuation">.</span>factory<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">Value</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>stereotype<span class="token punctuation">.</span></span><span class="token class-name">Service</span></span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">javax<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">PostConstruct</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">javax<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">PreDestroy</span></span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * @ClassName ProducerService
 * @Author gaoqisen
 * @Date 2019-10-31
 * @Version 1.0
 */</span>
<span class="token annotation punctuation">@Service</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ProducerService</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Value</span><span class="token punctuation">(</span><span class="token string">"${apache.rocketmq.producer.producerGroup}"</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> producerGroup<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Value</span><span class="token punctuation">(</span><span class="token string">"${apache.rocketmq.namesrvAddr}"</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> namesrvAddr<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">DefaultMQProducer</span> producer<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@PostConstruct</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">initProducer</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        producer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">DefaultMQProducer</span><span class="token punctuation">(</span>producerGroup<span class="token punctuation">)</span><span class="token punctuation">;</span>
        producer<span class="token punctuation">.</span><span class="token function">setNamesrvAddr</span><span class="token punctuation">(</span>namesrvAddr<span class="token punctuation">)</span><span class="token punctuation">;</span>
        producer<span class="token punctuation">.</span><span class="token function">setRetryTimesWhenSendFailed</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            producer<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"[Producer 已启动]"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">send</span><span class="token punctuation">(</span><span class="token class-name">String</span> topic<span class="token punctuation">,</span> <span class="token class-name">String</span> tags<span class="token punctuation">,</span> <span class="token class-name">String</span> msg<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">SendResult</span> result <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token class-name">Message</span> message <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Message</span><span class="token punctuation">(</span>topic<span class="token punctuation">,</span> tags<span class="token punctuation">,</span> msg<span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token class-name">RemotingHelper</span><span class="token punctuation">.</span><span class="token constant">DEFAULT_CHARSET</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            result <span class="token operator">=</span> producer<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span>message<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"[生产者：] msgID("</span> <span class="token operator">+</span> result<span class="token punctuation">.</span><span class="token function">getMsgId</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">") "</span> <span class="token operator">+</span> result<span class="token punctuation">.</span><span class="token function">getSendStatus</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token string">"{\"MsgId\":\""</span> <span class="token operator">+</span> result<span class="token punctuation">.</span><span class="token function">getMsgId</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">"\"}"</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@PreDestroy</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">shutDownProducer</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>producer <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            producer<span class="token punctuation">.</span><span class="token function">shutdown</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="消费者" tabindex="-1"><a class="header-anchor" href="#消费者" aria-hidden="true">#</a> 消费者</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>example<span class="token punctuation">.</span>roketmq<span class="token punctuation">.</span>server</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>apache<span class="token punctuation">.</span>rocketmq<span class="token punctuation">.</span>client<span class="token punctuation">.</span>consumer<span class="token punctuation">.</span></span><span class="token class-name">DefaultMQPushConsumer</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>apache<span class="token punctuation">.</span>rocketmq<span class="token punctuation">.</span>client<span class="token punctuation">.</span>consumer<span class="token punctuation">.</span>listener<span class="token punctuation">.</span></span><span class="token class-name">ConsumeConcurrentlyStatus</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>apache<span class="token punctuation">.</span>rocketmq<span class="token punctuation">.</span>client<span class="token punctuation">.</span>consumer<span class="token punctuation">.</span>listener<span class="token punctuation">.</span></span><span class="token class-name">MessageListenerConcurrently</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>apache<span class="token punctuation">.</span>rocketmq<span class="token punctuation">.</span>common<span class="token punctuation">.</span>consumer<span class="token punctuation">.</span></span><span class="token class-name">ConsumeFromWhere</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>apache<span class="token punctuation">.</span>rocketmq<span class="token punctuation">.</span>common<span class="token punctuation">.</span>message<span class="token punctuation">.</span></span><span class="token class-name">MessageExt</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>apache<span class="token punctuation">.</span>rocketmq<span class="token punctuation">.</span>remoting<span class="token punctuation">.</span>common<span class="token punctuation">.</span></span><span class="token class-name">RemotingHelper</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>beans<span class="token punctuation">.</span>factory<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">Value</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>stereotype<span class="token punctuation">.</span></span><span class="token class-name">Component</span></span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">javax<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">PostConstruct</span></span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * @ClassName ConsumerService
 * @Author gaoqisen
 * @Date 2019-10-31
 * @Version 1.0
 */</span>
<span class="token annotation punctuation">@Component</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ConsumerService</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Value</span><span class="token punctuation">(</span><span class="token string">"${apache.rocketmq.consumer.PushConsumer}"</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> consumerGroup<span class="token punctuation">;</span>
    <span class="token annotation punctuation">@Value</span><span class="token punctuation">(</span><span class="token string">"${apache.rocketmq.namesrvAddr}"</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> namesrvAddr<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@PostConstruct</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">defaultMQPushConsumer</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">DefaultMQPushConsumer</span> consumer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">DefaultMQPushConsumer</span><span class="token punctuation">(</span>consumerGroup<span class="token punctuation">)</span><span class="token punctuation">;</span>
        consumer<span class="token punctuation">.</span><span class="token function">setNamesrvAddr</span><span class="token punctuation">(</span>namesrvAddr<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            consumer<span class="token punctuation">.</span><span class="token function">subscribe</span><span class="token punctuation">(</span><span class="token string">"test1"</span><span class="token punctuation">,</span> <span class="token string">"push"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token comment">// 如果是第一次启动，从队列头部开始消费</span>
            <span class="token comment">// 如果不是第一次启动，从上次消费的位置继续消费</span>
            consumer<span class="token punctuation">.</span><span class="token function">setConsumeFromWhere</span><span class="token punctuation">(</span><span class="token class-name">ConsumeFromWhere</span><span class="token punctuation">.</span><span class="token constant">CONSUME_FROM_FIRST_OFFSET</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            consumer<span class="token punctuation">.</span><span class="token function">registerMessageListener</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token class-name">MessageListenerConcurrently</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>list<span class="token punctuation">,</span> context<span class="token punctuation">)</span> <span class="token operator">-></span> <span class="token punctuation">{</span>
                <span class="token keyword">try</span> <span class="token punctuation">{</span>
                    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">MessageExt</span> messageExt <span class="token operator">:</span> list<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                        <span class="token class-name">String</span> messageBody <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">(</span>messageExt<span class="token punctuation">.</span><span class="token function">getBody</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token class-name">RemotingHelper</span><span class="token punctuation">.</span><span class="token constant">DEFAULT_CHARSET</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"[消费者] msgID("</span> <span class="token operator">+</span> messageExt<span class="token punctuation">.</span><span class="token function">getMsgId</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">") msgBody : "</span> <span class="token operator">+</span> messageBody<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token keyword">return</span> <span class="token class-name">ConsumeConcurrentlyStatus</span><span class="token punctuation">.</span><span class="token constant">RECONSUME_LATER</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                <span class="token keyword">return</span> <span class="token class-name">ConsumeConcurrentlyStatus</span><span class="token punctuation">.</span><span class="token constant">CONSUME_SUCCESS</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            consumer<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"[Consumer 已启动]"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="测试controller" tabindex="-1"><a class="header-anchor" href="#测试controller" aria-hidden="true">#</a> 测试Controller</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>example<span class="token punctuation">.</span>roketmq<span class="token punctuation">.</span>server</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>beans<span class="token punctuation">.</span>factory<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">Autowired</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>web<span class="token punctuation">.</span>bind<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">RequestMapping</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>web<span class="token punctuation">.</span>bind<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">RestController</span></span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * @ClassName TestController
 * @Author gaoqisen
 * @Date 2019-10-31
 * @Version 1.0
 */</span>
<span class="token annotation punctuation">@RestController</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">TestController</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">ProducerService</span> producer<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span><span class="token string">"/push"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">pushMsg</span><span class="token punctuation">(</span><span class="token class-name">String</span> msg<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> producer<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token string">"test1"</span><span class="token punctuation">,</span> <span class="token string">"push"</span><span class="token punctuation">,</span> msg<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="如果报错no-route-info-of-this-topic" tabindex="-1"><a class="header-anchor" href="#如果报错no-route-info-of-this-topic" aria-hidden="true">#</a> 如果报错No route info of this topic</h3>
<ul>
<li>更改启动方式为：sh bin/mqbroker -n localhost:9876 autoCreateTopicEnable=true &amp;</li>
<li>jar包的版本要对应上，如rocketmq的版本为4.1.0-incubating，那么jar包的版本也应该为4.1.0-incubating（按照这种方法以解决）。</li>
</ul>
</div></template>


