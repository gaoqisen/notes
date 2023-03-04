<template><div><h2 id="日志分析" tabindex="-1"><a class="header-anchor" href="#日志分析" aria-hidden="true">#</a> 日志分析</h2>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># 统计所有的PV数（页面浏览量）</span>
<span class="token function">cat</span> access.log <span class="token operator">|</span> <span class="token function">wc</span> <span class="token parameter variable">-l</span>
<span class="token comment"># 获取访问IP数</span>
<span class="token function">cat</span> access.log <span class="token operator">|</span> <span class="token function">awk</span> <span class="token string">'{print $1}'</span> <span class="token operator">|</span> <span class="token function">sort</span> <span class="token parameter variable">-k1</span> <span class="token parameter variable">-r</span> <span class="token operator">|</span> <span class="token function">uniq</span> <span class="token operator">|</span> <span class="token function">wc</span> <span class="token parameter variable">-l</span>
<span class="token comment"># 查看日志中访问次数最多的前10个IP</span>
<span class="token function">cat</span> access.log <span class="token operator">|</span><span class="token function">cut</span> <span class="token parameter variable">-d</span> <span class="token string">' '</span> <span class="token parameter variable">-f</span> <span class="token number">1</span> <span class="token operator">|</span> <span class="token function">sort</span> <span class="token operator">|</span><span class="token function">uniq</span> <span class="token parameter variable">-c</span> <span class="token operator">|</span> <span class="token function">sort</span> <span class="token parameter variable">-nr</span> <span class="token operator">|</span> <span class="token function">awk</span> <span class="token string">'{print $0 }'</span> <span class="token operator">|</span> <span class="token function">head</span> <span class="token parameter variable">-n</span> <span class="token number">10</span> <span class="token function">sed</span> <span class="token parameter variable">-n</span> <span class="token string">'/2019:21:[0-9][0-9]:[0-9][0-9]/,/2019:22:[0-9][0-9]:[0-9][0-9]/p'</span> access.log_2019-12-18 <span class="token operator">|</span><span class="token function">cut</span> <span class="token parameter variable">-d</span> <span class="token string">' '</span> <span class="token parameter variable">-f</span> <span class="token number">1</span> <span class="token operator">|</span> <span class="token function">sort</span> <span class="token operator">|</span><span class="token function">uniq</span> <span class="token parameter variable">-c</span> <span class="token operator">|</span> <span class="token function">sort</span> <span class="token parameter variable">-nr</span> <span class="token operator">|</span> <span class="token function">awk</span> <span class="token string">'{print $0 }'</span> <span class="token operator">|</span> <span class="token function">head</span> <span class="token parameter variable">-n</span> <span class="token number">10</span>
<span class="token comment"># 查看日志中访问次数超过1000次的前10个IP</span>
<span class="token function">cat</span> access.log <span class="token operator">|</span><span class="token function">cut</span> <span class="token parameter variable">-d</span> <span class="token string">' '</span> <span class="token parameter variable">-f</span> <span class="token number">1</span> <span class="token operator">|</span> <span class="token function">sort</span> <span class="token operator">|</span><span class="token function">uniq</span> <span class="token parameter variable">-c</span> <span class="token operator">|</span> <span class="token function">sort</span> <span class="token parameter variable">-nr</span> <span class="token operator">|</span> <span class="token function">awk</span> <span class="token string">'{if($1>1000) print $0 }'</span> <span class="token operator">|</span> <span class="token function">head</span> <span class="token parameter variable">-n</span> <span class="token number">10</span>
<span class="token comment"># 查看日志中访问url的次数</span>
<span class="token function">awk</span> <span class="token string">'{print $7}'</span> access.log_2019-12-25<span class="token operator">|</span><span class="token function">sort</span> <span class="token operator">|</span> <span class="token function">uniq</span> <span class="token parameter variable">-c</span> <span class="token operator">|</span><span class="token function">sort</span> <span class="token parameter variable">-n</span> <span class="token parameter variable">-k</span> <span class="token number">1</span> <span class="token parameter variable">-r</span> <span class="token operator">></span> test.txt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="常用命令" tabindex="-1"><a class="header-anchor" href="#常用命令" aria-hidden="true">#</a> 常用命令</h2>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># 重启nginx</span>
./nginx <span class="token parameter variable">-s</span> reload
<span class="token comment"># 启动nginx</span>
./nginx
<span class="token comment"># 关闭nginx</span>
./nginx <span class="token parameter variable">-s</span> stop
<span class="token comment"># 查看nginx并发连接数</span>
<span class="token comment"># TIME_WAIT表示处理完毕，等待超时结束的请求数 Linux默认的TIME_WAIT时长一般是60秒 TIME_WAIT数量较大时会出现访问很慢的情况，如网办</span>
<span class="token comment"># CLOSE-WAIT： 等待从本地用户发来的连接中断请求</span>
<span class="token comment"># SYN_SENT：应用已经开始，打开一个连接</span>
<span class="token comment"># FIN_WAIT1：应用说它已经完成</span>
<span class="token comment"># FIN_WAIT2：另一边已同意释放</span>
<span class="token comment"># ESTABLISHED：表示正常数据传输状态 or 当前并发连接数</span>
<span class="token comment"># SYN_RECV：表示正在等待处理的请求数</span>
<span class="token comment"># LAST_ACK：等待所有分组死掉</span>
<span class="token function">netstat</span> <span class="token parameter variable">-n</span> <span class="token operator">|</span> <span class="token function">awk</span> <span class="token string">'/^tcp/ {++S[$NF]} END {for(a in S) print a, S[a]}'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>nginx配置生成网站<a href="https://nginxconfig.io/" target="_blank" rel="noopener noreferrer">https://nginxconfig.io/<ExternalLinkIcon/></a></p>
</blockquote>
<h2 id="nginx-conf-配置详解" tabindex="-1"><a class="header-anchor" href="#nginx-conf-配置详解" aria-hidden="true">#</a> nginx.conf 配置详解</h2>
<div class="language-nginx line-numbers-mode" data-ext="nginx"><pre v-pre class="language-nginx"><code><span class="token comment">#nginx进程数</span>
<span class="token directive"><span class="token keyword">worker_processes</span>  <span class="token number">8</span></span><span class="token punctuation">;</span>
<span class="token comment"># 0001表示启用第一个CPU内核，0010表示启用第二个CPU内核，依此类推；worker_processes最多开启8个，8个以上性能提升不会再提升了，而且稳定性变得更低，所以8个进程够用了。</span>
<span class="token directive"><span class="token keyword">worker_cpu_affinity</span> <span class="token number">00000001</span> <span class="token number">00000010</span> <span class="token number">00000100</span> <span class="token number">00001000</span> <span class="token number">00010000</span> <span class="token number">00100000</span> <span class="token number">01000000</span> <span class="token number">10000000</span></span><span class="token punctuation">;</span>
<span class="token comment">#一个nginx进程打开的最多文件描述符数目，理论值应该是最多打开文件数（系统的值ulimit) 与nginx进程数相除，但是nginx分配请求并不均匀，所以建议与ulimit -n的值保持一致。</span>
<span class="token directive"><span class="token keyword">worker_rlimit_nofile</span> <span class="token number">655350</span></span><span class="token punctuation">;</span>
<span class="token comment">#制定日志路径，级别。这个设置可以放入全局块，http块，server块，级别以此为：debug|info|notice|warn|error|crit|alert|emerg</span>
<span class="token directive"><span class="token keyword">error_log</span> /home/log/nginx/nginx_error.log crit</span><span class="token punctuation">;</span>
 
<span class="token comment">#单个进程最大连接数</span>
<span class="token directive"><span class="token keyword">events</span></span> <span class="token punctuation">{</span>
    <span class="token comment">#参考事件模型，use [ kqueue | rtsig | epoll | /dev/poll | select | poll ]; epoll模型是Linux 2.6以上版本内核中的高性能网络I/O模型，如果跑在FreeBSD上面，就用kqueue模型。</span>
    <span class="token directive"><span class="token keyword">use</span> epoll</span><span class="token punctuation">;</span>
    <span class="token comment">#单个worker进程允许客户端最大连接数，这个数值一般根据服务器性能和内存来制定，实际最大值就是worker进程数乘以work_connections实际我们填入一个65535，足够了，这些都算并发值</span>
    <span class="token directive"><span class="token keyword">worker_connections</span> <span class="token number">40960</span></span><span class="token punctuation">;</span>
    <span class="token comment">#告诉nginx收到一个新连接通知后接受尽可能多的连接，默认是on，设置为on后，多个worker按串行方式来处理连接，也就是一个连接只有一个worker被唤醒，其他的处于休眠状态，设置为off后，多个worker按并行方式来处理连接，也就是一个连接会唤醒所有的worker，直到连接分配完毕，没有取得连接的继续休眠。当你的服务器连接数不多时，开启这个参数会让负载有一定的降低，但是当服务器的吞吐量很大时，为了效率，可以关闭这个参数。</span>
    <span class="token directive"><span class="token keyword">multi_accept</span> <span class="token boolean">on</span></span><span class="token punctuation">;</span>
    <span class="token comment">#最大连接数，默认为512</span>
    <span class="token comment">#worker_connections  1024;</span>
<span class="token punctuation">}</span>
<span class="token comment">#http服务器配置</span>
<span class="token directive"><span class="token keyword">http</span></span> <span class="token punctuation">{</span>
    <span class="token comment">#文件扩展名与文件类型映射表</span>
    <span class="token directive"><span class="token keyword">include</span>       mime.types</span><span class="token punctuation">;</span>
    <span class="token comment">#默认文件类型，默认为text/plain</span>
    <span class="token directive"><span class="token keyword">default_type</span>  application/octet-stream</span><span class="token punctuation">;</span>
    <span class="token comment">#允许sendfile方式传输文件，默认为off，可以在http块，server块，location块。</span>
    <span class="token directive"><span class="token keyword">sendfile</span>        <span class="token boolean">on</span></span><span class="token punctuation">;</span>
	<span class="token comment">#长连接超时时间，单位是秒</span>
    <span class="token directive"><span class="token keyword">keepalive_timeout</span>  <span class="token number">65</span></span><span class="token punctuation">;</span>
    <span class="token comment">#防止网络阻塞</span>
    <span class="token directive"><span class="token keyword">tcp_nopush</span> <span class="token boolean">on</span></span><span class="token punctuation">;</span>
    <span class="token comment">#防止网络阻塞</span>
    <span class="token directive"><span class="token keyword">tcp_nodelay</span> <span class="token boolean">on</span></span><span class="token punctuation">;</span>
    <span class="token comment">#隐藏版本号</span>
    <span class="token directive"><span class="token keyword">server_tokens</span> <span class="token boolean">off</span></span><span class="token punctuation">;</span>
    <span class="token comment">#设定服务器名称（即server_name指令所设置）哈希表的框大小，值越大能设置的server_name可以越多。参数哈希框大小总是等于哈希表的大小，即处理器高速缓存区（32）的倍数，这将加速处理器中key的搜索速度，减少内存的存取数。</span>
    <span class="token directive"><span class="token keyword">server_names_hash_bucket_size</span> <span class="token number">128</span></span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">server_names_hash_max_size</span> <span class="token number">512</span></span><span class="token punctuation">;</span>
    <span class="token comment">#客户端请求头部的缓冲区大小</span>
    <span class="token directive"><span class="token keyword">client_header_buffer_size</span> <span class="token number">2k</span></span><span class="token punctuation">;</span>
    <span class="token comment">#设置客户端请求的Header头缓冲区大小，默认为4K。客户端请求行不能超过设置的第一个数，请求的Header头信息不能大于设置的第二个数，否则会报"Request URI too large"(414)或“Bad request”(400)错误。如果客户端的Cookie信息较大，则需增加缓冲区大小</span>
    <span class="token directive"><span class="token keyword">large_client_header_buffers</span> <span class="token number">4</span> <span class="token number">4k</span></span><span class="token punctuation">;</span>
    <span class="token comment">#设置nginx允许接收的客户端请求内容的最大值，及客户端请求Header头信息中设置的Content-Lenth大最大值。如果超出该指令设置的最大值，nginx将返回“Request Entity Too Large”的错误信息(HTTP的413错误码)</span>
    <span class="token directive"><span class="token keyword">client_max_body_size</span> <span class="token number">500m</span></span><span class="token punctuation">;</span>
    <span class="token comment">#这个将为打开文件指定缓存，默认是没有启用的，max指定缓存数量，建议和打开文件数一致，inactive是指经过多长时间文件没被请求后***缓存。</span>
    <span class="token directive"><span class="token keyword">open_file_cache</span> max=655350 inactive=20s</span><span class="token punctuation">;</span>
    <span class="token comment">#open_file_cache指令中的inactive参数时间内文件的最少使用次数，如果超过这个数字，文件描述符一直是在缓存中打开的，如上例，如果有一个文件在inactive时间内一次没被使用，它将被移除。</span>
    <span class="token directive"><span class="token keyword">open_file_cache_min_uses</span> <span class="token number">1</span></span><span class="token punctuation">;</span>
    <span class="token comment">#这个是指多长时间检查一次缓存的有效信息。</span>
    <span class="token directive"><span class="token keyword">open_file_cache_valid</span> <span class="token number">30s</span></span><span class="token punctuation">;</span>
    <span class="token comment">#设置nginx读取客户端请求Header头信息的超时时间，如果超过该指令设置的时间，nginx将返回"Requet time out"错误信息（HTTP的408错误码）</span>
    <span class="token directive"><span class="token keyword">client_header_timeout</span> <span class="token number">15s</span></span><span class="token punctuation">;</span>
    <span class="token comment">#设定nginx读取客户端请求内容的超时时间，如果超过该指令设置的时间，nginx将返回"Request time out"错误信息(HTTP状态码408)</span>
    <span class="token directive"><span class="token keyword">client_body_timeout</span> <span class="token number">15s</span></span><span class="token punctuation">;</span>
    <span class="token comment">#设置发送给客户端的应答超时时间。指两次tcp握手，还没有转为established状态的时间。如果这个时间，客户端没有响应，Nginx则关闭连接</span>
    <span class="token directive"><span class="token keyword">send_timeout</span> <span class="token number">60s</span></span><span class="token punctuation">;</span>
    <span class="token comment">#开启gzip压缩功能，对用户请求的页面进行压缩处理，以达到节省网络带宽，提高网站速度的作用。</span>
    <span class="token directive"><span class="token keyword">gzip</span> <span class="token boolean">on</span></span><span class="token punctuation">;</span>
    <span class="token comment">#允许压缩的页面最小字节数。建议值为大于1024字节，小于1K的压缩可能无效果</span>
    <span class="token directive"><span class="token keyword">gzip_min_length</span>   <span class="token number">1k</span></span><span class="token punctuation">;</span>
    <span class="token comment">#设置系统获取几个单位的缓存用于存储gzip压缩结果数据流。此设置为：按照原始数据大小以16K为单位的4倍大小申请内存空间。如果不设置的话，默认值是申请跟原始数据相同大小的内存空间去存储gzip压缩的结果。</span>
    <span class="token directive"><span class="token keyword">gzip_buffers</span>     <span class="token number">4</span> <span class="token number">16k</span></span><span class="token punctuation">;</span>
    <span class="token comment">#识别http协议的版本,只有1.1版本的压缩，因为可能早期的浏览器或http客户端可能不支持gzip压缩</span>
    <span class="token directive"><span class="token keyword">gzip_http_version</span> 1.0</span><span class="token punctuation">;</span>
    <span class="token comment">#设置压缩比，值为1-9，压缩比最大，处理速度会越慢</span>
    <span class="token directive"><span class="token keyword">gzip_comp_level</span> <span class="token number">2</span></span><span class="token punctuation">;</span>
    <span class="token comment">#指定需要被压缩的文件媒体类型</span>
    <span class="token directive"><span class="token keyword">gzip_types</span>     text/plain text/javascript application/x-javascript application/json application/javascript text/css application/xml</span><span class="token punctuation">;</span>
    <span class="token comment">#gzip_vary的作用是在http响应中增加一行“Vary: Accept-Encoding”，目的是改变反向代理服务器的缓存策略，反向代理服务器会根据后端服务器是否带Vary头采用不同的缓存策略。   </span>
    <span class="token directive"><span class="token keyword">gzip_vary</span> <span class="token boolean">on</span></span><span class="token punctuation">;</span>
    <span class="token comment">#log日志配置</span>
    <span class="token directive"><span class="token keyword">log_format</span>  access   <span class="token string">'<span class="token variable">$remote_addr</span> - <span class="token variable">$remote_user</span> [<span class="token variable">$time_local]</span> "<span class="token variable">$request</span>" '</span>
                      <span class="token string">'<span class="token variable">$status</span> <span class="token variable">$body_bytes_sent</span> "<span class="token variable">$http_referer</span>" '</span>
                      <span class="token string">'"<span class="token variable">$http_user_agent</span>" "<span class="token variable">$http_x_forwarded_for</span>"'</span></span><span class="token punctuation">;</span>
    <span class="token comment">#用来设置日志格式                  </span>
    <span class="token directive"><span class="token keyword">access_log</span>   /home/log/nginx/access.log   access</span><span class="token punctuation">;</span>
	<span class="token comment">#虚拟主机的配置</span>
    <span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
	<span class="token comment">#监听端口</span>
        <span class="token directive"><span class="token keyword">listen</span>       <span class="token number">80</span></span><span class="token punctuation">;</span>
        <span class="token comment">#域名可以有多个，用空格隔开</span>
        <span class="token directive"><span class="token keyword">server_name</span>  test</span><span class="token punctuation">;</span>
        <span class="token comment">#rewrite ^ https://$http_host$request_uri? permanent;</span>
        <span class="token comment"># proxy_redirect功能比较强大,其作用是对发送给客户端的URL进行修改</span>
        <span class="token directive"><span class="token keyword">proxy_redirect</span> <span class="token boolean">off</span></span><span class="token punctuation">;</span>
        <span class="token comment"># 问产生405 503的时候给用户的返回状态是200,设置一个@405，在里边做对应的处理</span>
        <span class="token directive"><span class="token keyword">error_page</span> <span class="token number">405</span> <span class="token number">503</span> =200 @405</span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">location</span> @405</span><span class="token punctuation">{</span>
            <span class="token directive"><span class="token keyword">root</span>  /opt/htdocs</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>            
        <span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span>
            <span class="token comment">#禁止某个ip或者一个ip段访问.如果指定unix:,那将禁止socket的访问.注意：unix在1.5.1中新加入的功能，如果你的版本比这个低，请不要使用这个方法。</span>
            <span class="token directive"><span class="token keyword">deny</span> 127.0.0.1</span><span class="token punctuation">;</span>
            <span class="token directive"><span class="token keyword">deny</span> 127.0.0.2</span><span class="token punctuation">;</span>
            <span class="token comment"># 客户端主动断掉连接之后，Nginx 会等待后端处理完(或者超时)，然后 记录 「后端的返回信息」 到日志。所以，如果后端 返回 200， 就记录 200 ；如果后端放回 5XX ，那么就记录 5XX 。</span>
            <span class="token directive"><span class="token keyword">proxy_ignore_client_abort</span> <span class="token boolean">on</span></span><span class="token punctuation">;</span>
            <span class="token comment"># 代理转发</span>
            <span class="token directive"><span class="token keyword">proxy_pass</span> http://inspur</span><span class="token punctuation">;</span>
            <span class="token comment"># 定项目的根目录，适用与server和location。可以指定多个，如果locaiton没有指定，会往其外层的server或http中寻找继承。</span>
            <span class="token directive"><span class="token keyword">root</span>   html</span><span class="token punctuation">;</span>
            <span class="token comment"># 在前后端分离的基础上，通过Nginx配置，指定网站初始页</span>
            <span class="token directive"><span class="token keyword">index</span>  index.html index.htm</span><span class="token punctuation">;</span>
            <span class="token comment"># 允许重新定义或添加字段传递给代理服务器的请求头</span>
            <span class="token directive"><span class="token keyword">proxy_set_header</span>    X-Real-IP   <span class="token variable">$remote_addr</span></span><span class="token punctuation">;</span>
            <span class="token directive"><span class="token keyword">proxy_set_header</span> Host <span class="token variable">$host</span>:<span class="token variable">$server_port</span></span><span class="token punctuation">;</span>
            <span class="token directive"><span class="token keyword">proxy_set_header</span> X-Forwarded-For <span class="token variable">$proxy_add_x_forwarded_for</span></span><span class="token punctuation">;</span>
            <span class="token comment"># 客服端最大上传文件大小</span>
            <span class="token directive"><span class="token keyword">client_max_body_size</span>    <span class="token number">100m</span></span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token comment">#upstream负载均衡配置，配置路由到tomcat的服务地址以及权重</span>
    <span class="token directive"><span class="token keyword">upstream</span> test</span><span class="token punctuation">{</span>
        <span class="token comment">#每个请求按访问ip的hash结果分配，这样每个访客固定访问一个后端服务器，可以解决session的问题</span>
        <span class="token directive"><span class="token keyword">ip_hash</span></span><span class="token punctuation">;</span>
        <span class="token comment"># weight设置权重，多个服务器ip进行负载均衡分发</span>
        <span class="token directive"><span class="token keyword">server</span> 192.168.0.1:80 weight=5</span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">server</span> 192.168.0.2:80 weight=10</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


