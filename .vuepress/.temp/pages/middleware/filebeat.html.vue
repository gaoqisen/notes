<template><div><h2 id="一、概述" tabindex="-1"><a class="header-anchor" href="#一、概述" aria-hidden="true">#</a> 一、概述</h2>
<p>Filebeat是一个日志文件托运工具，在你的服务器上安装客户端后，filebeat会监控日志目录或者指定的日志文件，追踪读取这些文件（追踪文件的变化，不停的读），并且转发这些信息到elasticsearch或者logstarsh中存放。filebeat是一个轻量级的logstash，当你需要收集信息的机器配置或资源并不是特别多时，使用filebeat来收集日志。日常使用中，filebeat十分稳定。</p>
<p>logstash 功能虽然强大，但是基于ruby的配置语法、依赖jdk、消耗系统资源等弊端，使得考虑其他方式来替换logstash，filebeat则是一个完美的替代者</p>
<h2 id="二、安装" tabindex="-1"><a class="header-anchor" href="#二、安装" aria-hidden="true">#</a> 二、安装</h2>
<ul>
<li>
<p>最新下载地址: https://www.elastic.co/cn/downloads/beats/filebeat</p>
</li>
<li>
<p>解压文件夹：</p>
</li>
<li>
<p>启动: sudo ./filebeat -e -c filebeat.yml</p>
</li>
<li>
<p>docker安装</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>mac:
    brew install filebeat
linux:
    wget https://artifacts.elastic.co/downloads/beats/filebeat/filebeat-7.3.1-linux-x86_64.tar.gz
    tar -zxvf filebeat-7.3.1-linux-x86_64.tar.gz
    nohup ./filebeat -e -c filebeat.yml >/dev/null 2>&amp;1 &amp;  // 后台启动将所有标准输出及标准错误输出到/dev/null空设备，即没有任何输出
docker:
    docker pull docker.elastic.co/beats/filebeat:7.3.1
    docker tag docker.elastic.co/beats/filebeat:7.3.1 filebeat
    docker run -d --name logstash 10.45.53.221:5000/filebeat 
    docker run --name filebeat -d --link logstash -v ~/elk/yaml/filebeat.yml:/usr/share/filebeat/filebeat.yml -v ~/elk/logs/:/home/logs/ filebeat   // 启动filebeat并关联logstash
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h2 id="三、配置文件" tabindex="-1"><a class="header-anchor" href="#三、配置文件" aria-hidden="true">#</a> 三、配置文件</h2>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>filebeat.yml
filebeat.prospectors:
- paths:
    - /home/user/elk/logs/order/*.log
  multiline:
      pattern: ^\d{4}
      negate: true
      match: after
  fields:
    doc_type: order
- paths:
    - /home/user/elk/logs/customer/*.log
  multiline:
      pattern: ^\d{4}
      negate: true
      match: after
  fields:
    doc_type: customer
output.logstash: # 输出地址
  hosts: ["logstash:5043"]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


