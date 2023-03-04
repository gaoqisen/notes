<template><div><h2 id="一、安装skywalking" tabindex="-1"><a class="header-anchor" href="#一、安装skywalking" aria-hidden="true">#</a> 一、安装SkyWalking</h2>
<h3 id="安装elasticsearch" tabindex="-1"><a class="header-anchor" href="#安装elasticsearch" aria-hidden="true">#</a> 安装ElasticSearch</h3>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">'3.3'</span>
<span class="token key atrule">services</span><span class="token punctuation">:</span>
  <span class="token key atrule">elasticsearch</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> wutang/elasticsearch<span class="token punctuation">-</span>shanghai<span class="token punctuation">-</span>zone<span class="token punctuation">:</span>6.3.2
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> elasticsearch
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> always
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> 9200<span class="token punctuation">:</span><span class="token number">9200</span>
      <span class="token punctuation">-</span> 9300<span class="token punctuation">:</span><span class="token number">9300</span>
    <span class="token key atrule">environment</span><span class="token punctuation">:</span>
      <span class="token key atrule">cluster.name</span><span class="token punctuation">:</span> elasticsearch
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>需要用docker的地址（docker inspect id）获取docker容器的ip。如果填写localhost会出现com.netflix.zuul.exception.ZuulException: Forwarding error的报错信息。（花了2个小时解决问题）</p>
</blockquote>
<p>访问http://localhost:9200/出现json字符串表示安装并启动成功。</p>
<h3 id="下载skywalking" tabindex="-1"><a class="header-anchor" href="#下载skywalking" aria-hidden="true">#</a> 下载SkyWalking</h3>
<p>下载地址: <a href="http://skywalking.apache.org/zh/downloads/" target="_blank" rel="noopener noreferrer">http://skywalking.apache.org/zh/downloads/<ExternalLinkIcon/></a></p>
<h3 id="更改配置" tabindex="-1"><a class="header-anchor" href="#更改配置" aria-hidden="true">#</a> 更改配置</h3>
<p>下载的gz包解压之后，在根目录的config目录里面找到application.yml并修改配置</p>
<p><img src="https://gaoqisen.github.io/GraphBed/202002/20200202132006.png" alt="https://gaoqisen.github.io/GraphBed/202002/20200202132006.png"></p>
<h3 id="启动" tabindex="-1"><a class="header-anchor" href="#启动" aria-hidden="true">#</a> 启动</h3>
<p>在根目录的bin目录里面执行startup.sh或者startup.bat启动程序。启动程序成功之后，访问http://localhost:8080/出现以下页面表示成功。
<img src="https://gaoqisen.github.io/GraphBed/202002/20200202132603.png" alt="https://gaoqisen.github.io/GraphBed/202002/20200202132603.png"></p>
<h2 id="二、使用skywalking" tabindex="-1"><a class="header-anchor" href="#二、使用skywalking" aria-hidden="true">#</a> 二、使用SkyWalking</h2>
<h3 id="idea启动方式" tabindex="-1"><a class="header-anchor" href="#idea启动方式" aria-hidden="true">#</a> idea启动方式</h3>
<p>在此处添加以下内容</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>-javaagent:D:\Workspace\Others\hello-spring-cloud-alibaba\hello-spring-cloud-external-skywalking\agent\skywalking-agent.jar
-Dskywalking.agent.service_name=nacos-provider
-Dskywalking.collector.backend_service=localhost:11800
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://gaoqisen.github.io/GraphBed/202002/20200202134128.png" alt="https://gaoqisen.github.io/GraphBed/202002/20200202134128.png"></p>
<blockquote>
<p>只需要添加环境变量即可，之后启动程序会自动实现链路追踪</p>
</blockquote>
<h3 id="java启动方式" tabindex="-1"><a class="header-anchor" href="#java启动方式" aria-hidden="true">#</a> java启动方式</h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>java -javaagent:/path/to/skywalking-agent/skywalking-agent.jar -Dskywalking.agent.service_name=nacos-provider -Dskywalking.collector.backend_service=localhost:11800 -jar yourApp.jar
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="链路追踪之后" tabindex="-1"><a class="header-anchor" href="#链路追踪之后" aria-hidden="true">#</a> 链路追踪之后</h3>
<p><img src="https://gaoqisen.github.io/GraphBed/202002/20200202135135.png" alt="https://gaoqisen.github.io/GraphBed/202002/20200202135135.png"></p>
</div></template>


