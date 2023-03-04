<template><div><h2 id="一、简介" tabindex="-1"><a class="header-anchor" href="#一、简介" aria-hidden="true">#</a> 一、简介</h2>
<h3 id="_1-1-描述" tabindex="-1"><a class="header-anchor" href="#_1-1-描述" aria-hidden="true">#</a> 1.1 描述</h3>
<p>Logstash是用Ruby开发的软件，在配置文件中用{}定义作用域，处理数据的时候主要分3个方面去处理输入、过滤、输出。通过各种渠道去获取数据，在进行加工之后将数据输出的存储的容器。可以作为数据库之间的同步工具，最主要的作用是去获取日志文件结合elasticsearch去进行日志分析。内部主要的处理流程如下：</p>
<p><img src="https://gaoqisen.github.io/GraphBed/202006/20200623130056.png" alt="https://gaoqisen.github.io/GraphBed/202006/20200623130056.png"></p>
<h3 id="_1-2-官网介绍" tabindex="-1"><a class="header-anchor" href="#_1-2-官网介绍" aria-hidden="true">#</a> 1.2 官网介绍</h3>
<p>Logstash 是免费且开放的服务器端数据处理管道，能够从多个来源采集数据，转换数据，然后将数据发送到您最喜欢的“存储库”中。</p>
<h3 id="_1-3-实际应用" tabindex="-1"><a class="header-anchor" href="#_1-3-实际应用" aria-hidden="true">#</a> 1.3 实际应用</h3>
<ol>
<li>数据采集工具(主要用于日志采集)：最常用的就是ELK进行日志的收集，将各个服务中的日志采集后放入elasticsearch里面。之后用kibanna进行日志分析。</li>
<li>同步数据库(mysql/oracle)中的数据到elasticsearch里面进行快速的文档查找。一般mysql建议用阿里巴巴的canal进行数据同步，这种同步是通过binlog日志进行同步的，不会影响到数据库。如果同步周期比较大，也可以使用logstash进行同步，logstash是通过执行sql语句后将返回数据进行同步的。</li>
</ol>
<h2 id="二、安装" tabindex="-1"><a class="header-anchor" href="#二、安装" aria-hidden="true">#</a> 二、安装</h2>
<ul>
<li>
<p>下载安装包,地址: <a href="https://www.elastic.co/cn/downloads/logstash" target="_blank" rel="noopener noreferrer">https://www.elastic.co/cn/downloads/logstash<ExternalLinkIcon/></a></p>
</li>
<li>
<p>重要的就是配置文件，如下完成mysql到elasticserch的数据同步：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code># 输入
input {
  jdbc {
    jdbc_driver_library => "/home/mysql-connector-java-5.1.10.jar"
    jdbc_driver_class => "com.mysql.jdbc.Driver"
    jdbc_connection_string => "jdbc:mysql://localhost:3306/test?useUnicode=true&amp;characterEncoding=UTF-8&amp;useSSL=false"
    jdbc_user => "root"
    jdbc_password => "123456"
    # 设置监听间隔 各字段含义（从左至右）分、时、天、月、年，全为*默认含义为每分钟都更新
    schedule => "* * * * *"
    # 查询sql，可以通过更新字段来区分那些是需要更新的
    statement_filepath => "/home/logstash-7.8.0/config/complete.sql"
    # 记录最后的运行时间，注意目录需要创建好
    last_run_metadata_path => "/home/logstash-7.8.0/config/logstash_jdbc_last_run_oracle"
    use_column_value => false
    tracking_column => "update_time"
    # 分页处理数据
    jdbc_paging_enabled => "true"
    jdbc_page_size => "50000"
    # 类型，对象后面输出的类型
    type => "complete_corporate"
  }
}
# 过滤
filter {
  # 用ruby解决相差8小时的时区问题, update_time必须要通过statement_filepath配置的sql可以查询出来
  ruby { 
      code => "event.set('update_time', event.get('update_time').time.localtime + 8*60*60)"
  }
}
# 输出
output {
  if[type] == "complete_corporate"{
    elasticsearch {
      hosts => "localhost:9200"
      user => elastic                                                                                                                                                                                         
      password => elastic
      # 索引名
      index => "complete_corporate_index"
      # 文档名
      document_type => "complete_corporate"
      # 文档ID(主键)
      document_id => "%{body_card_no}" 
    }
  }
  # 将数据输出到控制台
  stdout {
      codec => json_lines
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>操作命令</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>// 解压缩
tar -zxf xxx.tar.gz
// 指定配置文件启动命令
./logstash -f jdbc_sync.conf
// 后台运行启动命令
nohup ./logstash -f jdbc_sync.conf &amp;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h2 id="三、配置" tabindex="-1"><a class="header-anchor" href="#三、配置" aria-hidden="true">#</a> 三、配置</h2>
<h3 id="_3-1-input-数据的来源" tabindex="-1"><a class="header-anchor" href="#_3-1-input-数据的来源" aria-hidden="true">#</a> 3.1 input，数据的来源</h3>
<ul>
<li>
<p>file: 输入为文件类型，通常可以去读取日志</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>input{
  file{
    #path属性接受的参数是一个数组，其含义是标明需要读取的文件位置
    path => [‘pathA’，‘pathB’]
    #表示多就去path路径下查看是够有新的文件产生。默认是15秒检查一次。
    discover_interval => 15
    #排除那些文件，也就是不去读取那些文件
    exclude => [‘fileName1’,‘fileNmae2’]
    #被监听的文件多久没更新后断开连接不在监听，默认是一个小时。
    close_older => 3600
    #在每次检查文件列 表的时候， 如果一个文件的最后 修改时间 超过这个值， 就忽略这个文件。 默认一天。
    ignore_older => 86400
    #logstash 每隔多 久检查一次被监听文件状态（ 是否有更新） ， 默认是 1 秒。
    stat_interval => 1
    #sincedb记录数据上一次的读取位置的一个index
    sincedb_path => ’$HOME/. sincedb‘
    #logstash 从什么 位置开始读取文件数据， 默认是结束位置 也可以设置为：beginning 从头开始
    start_position => ‘beginning’
    #注意：这里需要提醒大家的是，如果你需要每次都从同开始读取文件的话，关设置start_position => beginning是没有用的，你可以选择sincedb_path 定义为 /dev/null
  }            
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>jdbc: 输入为数据库，同步数据是可以使用</p>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code>input<span class="token punctuation">{</span>
  jdbc<span class="token punctuation">{</span>
    <span class="token comment">#jdbc sql server 驱动,各个数据库都有对应的驱动，需自己下载</span>
    jdbc_driver_library =<span class="token punctuation">></span> "/etc/logstash/driver.d/sqljdbc_2.0/enu/sqljdbc4.jar"
    <span class="token comment">#jdbc class 不同数据库有不同的 class 配置</span>
    jdbc_driver_class =<span class="token punctuation">></span> "com.microsoft.sqlserver.jdbc.SQLServerDriver"
    <span class="token comment">#配置数据库连接 ip 和端口，以及数据库    </span>
    jdbc_connection_string =<span class="token punctuation">></span> "jdbc<span class="token punctuation">:</span>sqlserver<span class="token punctuation">:</span>//200.200.0.18<span class="token punctuation">:</span>1433;databaseName=test_db"
    <span class="token comment">#配置数据库用户名</span>
    jdbc_user =<span class="token punctuation">></span>   
    <span class="token comment">#配置数据库密码</span>
    jdbc_password =<span class="token punctuation">></span>
    <span class="token comment">#上面这些都不重要，要是这些都看不懂的话，你的老板估计要考虑换人了。重要的是接下来的内容。</span>
    <span class="token comment"># 定时器 多久执行一次SQL，默认是一分钟</span>
    <span class="token comment"># schedule => 分 时 天 月 年  </span>
    <span class="token comment"># schedule => * 22  *  *  * 表示每天22点执行一次</span>
    schedule =<span class="token punctuation">></span> "* * * * <span class="token important">*"</span>
    <span class="token comment">#是否清除 last_run_metadata_path 的记录,如果为真那么每次都相当于从头开始查询所有的数据库记录</span>
    clean_run =<span class="token punctuation">></span> false
    <span class="token comment">#是否需要记录某个column 的值,如果 record_last_run 为真,可以自定义我们需要表的字段名称，</span>
    <span class="token comment">#此时该参数就要为 true. 否则默认 track 的是 timestamp 的值.</span>
    use_column_value =<span class="token punctuation">></span> true
    <span class="token comment">#如果 use_column_value 为真,需配置此参数. 这个参数就是数据库给出的一个字段名称。当然该字段必须是递增的，可以是 数据库的数据时间这类的</span>
    tracking_column =<span class="token punctuation">></span> create_time
    <span class="token comment">#是否记录上次执行结果, 如果为真,将会把上次执行到的 tracking_column 字段的值记录下来,保存到 last_run_metadata_path 指定的文件中</span>
    record_last_run =<span class="token punctuation">></span> true
    <span class="token comment">#们只需要在 SQL 语句中 WHERE MY_ID > :last_sql_value 即可. 其中 :last_sql_value 取得就是该文件中的值</span>
    last_run_metadata_path =<span class="token punctuation">></span> "/etc/logstash/run_metadata.d/my_info"
    <span class="token comment">#是否将字段名称转小写。</span>
    <span class="token comment">#这里有个小的提示，如果你这前就处理过一次数据，并且在Kibana中有对应的搜索需求的话，还是改为true，</span>
    <span class="token comment">#因为默认是true，并且Kibana是大小写区分的。准确的说应该是ES大小写区分</span>
    lowercase_column_names =<span class="token punctuation">></span> false
    <span class="token comment">#你的SQL的位置，当然，你的SQL也可以直接写在这里。</span>
    <span class="token comment">#statement => SELECT * FROM tabeName t WHERE  t.creat_time > :last_sql_value</span>
    statement_filepath =<span class="token punctuation">></span> "/etc/logstash/statement_file.d/my_info.sql"
    <span class="token comment">#数据类型，标明你属于那一方势力。单了ES哪里好给你安排不同的山头。</span>
    type =<span class="token punctuation">></span> "my_info"
  <span class="token punctuation">}</span>
  <span class="token comment">#注意：外载的SQL文件就是一个文本文件就可以了，还有需要注意的是，一个jdbc{}插件就只能处理一个SQL语句，</span>
  <span class="token comment">#如果你有多个SQL需要处理的话，只能在重新建立一个jdbc{}插件。</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>beats: 输入为接收端口</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>input {
  beats {
    #接受数据端口
    port => 5044
    #数据类型
    type => "logs"
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>redis: 输入为redis</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>input{
    redis {
        host =>"192.168.200.21"
        port =>" 6379"
        db =>"6"
        data_type =>"list"
        key="demo"
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h3 id="_3-2-filter-数据的处理" tabindex="-1"><a class="header-anchor" href="#_3-2-filter-数据的处理" aria-hidden="true">#</a> 3.2 filter，数据的处理</h3>
<ul>
<li>
<p>date: 处理时间格式</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>filter {
  date {
   # 解析名为logdate的字段以设置Logstash时间戳
    match => [ "logdate", "MMM dd yyyy HH:mm:ss" ]
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>grok: 将非结构化事件数据分析到字段中。 这个工具非常适用于系统日志</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>filter {
  grok {
    match => { "message" => "%{IP:client} %{WORD:method} %{URIPATHPARAM:request} %{NUMBER:bytes} %{NUMBER:duration}" }
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>dissect: 使用分隔符将非结构化事件数据提取到字段中。 解剖过滤器不使用正则表达式，速度非常快。</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>filter {
  dissect {
    mapping => { "message" => "%{ts} %{+ts} %{+ts} %{src} %{prog}[%{pid}]: %{msg}" }
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>mutate: 使用最频繁的操作，可以对字段进行各种操作，比如重命名、删除、替换、更新等</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>filter{
    mutate{
        convert => {"age" => "integer"}
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h3 id="_3-3-output-数据的输出" tabindex="-1"><a class="header-anchor" href="#_3-3-output-数据的输出" aria-hidden="true">#</a> 3.3 output，数据的输出</h3>
<ul>
<li>
<p>elasticsearch：将数据导入到elasticsearch</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code># 输出
output {
  if[type] == "complete_corporate"{
    elasticsearch {
      hosts => "localhost:9200"
      user => elastic                                                                                                                                                                                         
      password => elastic
      # 索引名 
      index => "complete_corporate_index"
      # 文档名
      document_type => "complete_corporate"
      # 文档ID(主键)
      document_id => "%{body_card_no}" 
    }
  }
  stdout {
      codec => json_lines
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>jdbc：将数据导入的数据库</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>output {
    jdbc {
        driver_jar_path => "/path/mysql-connector-java-5.1.40.jar"
        driver_class => "com.mysql.jdbc.Driver"
        connection_string => "jdbc:mysql://sss:8840/testcase"
        username => "root"
        password => "123456"
        statement => ["INSERT INTO test ( val, name_val, level_val, source_name, version ) VALUES (?,?,?,?,?)","code","name","level","source_name","current_version"]
    }
    stdout {}
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>redis：将数据导入到redis</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>output {
    redis {
        host =>"192.168.200.21"
        port =>" 6379"
        db =>"6"
        data_type =>"list"
        key="demo"
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>file：将数据生成文件</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>output{
    if  [type] != "file" { 
       file{
              path => "/home/app/logbak/%{+YYYY.MM.dd}-file.txt"
              # 设置根据原始数据格式保存，不会带Json格式
              codec => line {format => "%{[collectValue]}"}
       }
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>json: 将字段内容为json格式的数据进行解析</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>filter {
  json {
    source => "message"     #要解析的字段名
    target => "msg_json"    #解析后的存储字段，默认和message同级别
  }
}   
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>geoip: 根据ip地址提供对应的地域信息，比如经纬度、城市名等</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>filter {
  geoip {
    source => "clientip"
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>ruby: 最灵活的插件，可以以ruby语言来随心所欲的修改Logstash Event对象</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>filter{
    ruby{
        code => 'size = event.get("message").size;
                event.set("message_size",size)'
    }
}


ruby {
        code => "event.set('@read_timestamp',event.get('@timestamp'))"
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h2 id="四、遇到的问题" tabindex="-1"><a class="header-anchor" href="#四、遇到的问题" aria-hidden="true">#</a> 四、遇到的问题</h2>
<h3 id="_4-1-时区问题" tabindex="-1"><a class="header-anchor" href="#_4-1-时区问题" aria-hidden="true">#</a> 4.1 时区问题</h3>
<p>Elasticsearch 内部，对时间类型字段，是统一采用 UTC 时间，存成 long 长整形数据的！对日志统一采用 UTC 时间存储，是国际安全/运维界的一个通识——欧美公司的服务器普遍广泛分布在多个时区里。使用ruby过滤就可以了。</p>
<h3 id="_4-2-和filebeat的对比选择" tabindex="-1"><a class="header-anchor" href="#_4-2-和filebeat的对比选择" aria-hidden="true">#</a> 4.2 和filebeat的对比选择</h3>
<p>filebeat是一个轻量级的日志收集器，如果每台服务器上面都安装一个logstash的话会造成性能的浪费。常用的做法就是通过filebeat将日志收集起来发送给logstash，之后logstash将数据同步给elasticsearch或者数据库。</p>
<h2 id="五、参考" tabindex="-1"><a class="header-anchor" href="#五、参考" aria-hidden="true">#</a> 五、参考</h2>
<ul>
<li>输入(input): https://yq.aliyun.com/articles/152043?utm_content=m_27192</li>
<li>过滤(filter): https://blog.csdn.net/wfs1994/article/details/80862952</li>
<li>输出(output): https://www.cnblogs.com/niutao/p/10909461.html</li>
</ul>
</div></template>


