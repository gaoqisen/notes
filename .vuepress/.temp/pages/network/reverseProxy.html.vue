<template><div><h2 id="反向代理-负载均衡-百度百科" tabindex="-1"><a class="header-anchor" href="#反向代理-负载均衡-百度百科" aria-hidden="true">#</a> 反向代理(负载均衡)百度百科</h2>
<p>反向代理服务器位于用户与目标服务器之间，但是对于用户而言，反向代理服务器就相当于目标服务器，即用户直接访问反向代理服务器就可以获得目标服务器的资源。同时，用户不需要知道目标服务器的地址，也无须在用户端作任何设定。反向代理服务器通常可用来作为Web加速，即使用反向代理作为Web服务器的前置机来降低网络和服务器的负载，提高访问效率</p>
<ul>
<li>反向代理的用途是将防火墙后面的服务器提供给internet用户访问。同时还可以完成诸如负载均衡等功能</li>
<li>对外是透明的，访问者并不知道自己访问的是代理。对访问者而言，他以为访问的就是原始服务器</li>
<li></li>
</ul>
<p><img src="https://gaoqisen.github.io/GraphBed/202002/20200217174152.png" alt="https://gaoqisen.github.io/GraphBed/202002/20200217174152.png"></p>
<h2 id="对比正向代理-翻墙" tabindex="-1"><a class="header-anchor" href="#对比正向代理-翻墙" aria-hidden="true">#</a> 对比正向代理(翻墙)</h2>
<ul>
<li>正向代理用途是为了在防火墙内的局域网提供访问internet的途径。另外还可以使用缓冲特性减少网络使用率</li>
<li>正向代理允许客户端通过它访问任意网站并且隐蔽客户端自身，因此你必须采取安全措施来确保仅为经过授权的客户端提供服务</li>
</ul>
<p><img src="https://gaoqisen.github.io/GraphBed/202002/20200217174328.png" alt="https://gaoqisen.github.io/GraphBed/202002/20200217174328.png"></p>
<p>两者的区别在于代理的对象不一样：正向代理代理的对象是客户端，反向代理代理的对象是服务端</p>
<h2 id="安装nginx" tabindex="-1"><a class="header-anchor" href="#安装nginx" aria-hidden="true">#</a> 安装nginx</h2>
<div class="language-docker line-numbers-mode" data-ext="docker"><pre v-pre class="language-docker"><code>version: '3.1'
services:
  nginx:
    restart: always
    image: nginx
    container_name: nginx
    ports:
      - 8080:80
      - 8081:8081
    volumes:
      - ./conf/nginx.conf:/etc/nginx/nginx.conf
      - ./conf/test.conf:/etc/nginx/test.conf
      - ./html:/usr/share/nginx/html
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="创建文件夹" tabindex="-1"><a class="header-anchor" href="#创建文件夹" aria-hidden="true">#</a> 创建文件夹</h2>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>conf   // 文件夹下放nginx.conf和test.conf
html // 文件夹下面放html80/index.html文件
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="nginx-conf" tabindex="-1"><a class="header-anchor" href="#nginx-conf" aria-hidden="true">#</a> nginx.conf</h2>
<div class="language-nginx line-numbers-mode" data-ext="nginx"><pre v-pre class="language-nginx"><code><span class="token comment"># 启动进程,通常设置成和 CPU 的数量相等</span>
<span class="token directive"><span class="token keyword">worker_processes</span>  <span class="token number">1</span></span><span class="token punctuation">;</span>
<span class="token directive"><span class="token keyword">events</span></span> <span class="token punctuation">{</span>
    <span class="token comment"># epoll 是多路复用 IO(I/O Multiplexing) 中的一种方式</span>
    <span class="token comment"># 但是仅用于 linux2.6 以上内核,可以大大提高 nginx 的性能</span>
    <span class="token directive"><span class="token keyword">use</span> epoll</span><span class="token punctuation">;</span>
    <span class="token comment"># 单个后台 worker process 进程的最大并发链接数</span>
    <span class="token directive"><span class="token keyword">worker_connections</span>  <span class="token number">1024</span></span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token directive"><span class="token keyword">http</span></span> <span class="token punctuation">{</span>
    <span class="token comment"># 设定 mime 类型,类型由 mime.type 文件定义</span>
    <span class="token directive"><span class="token keyword">include</span>       mime.types</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">default_type</span>  application/octet-stream</span><span class="token punctuation">;</span>
    <span class="token comment"># sendfile 指令指定 nginx 是否调用 sendfile 函数（zero copy 方式）来输出文件，对于普通应用，</span>
    <span class="token comment"># 必须设为 on，如果用来进行下载等应用磁盘 IO 重负载应用，可设置为 off，以平衡磁盘与网络 I/O 处理速度，降低系统的 uptime.</span>
    <span class="token directive"><span class="token keyword">sendfile</span>        <span class="token boolean">on</span></span><span class="token punctuation">;</span>
    <span class="token comment"># 连接超时时间</span>
    <span class="token directive"><span class="token keyword">keepalive_timeout</span>  <span class="token number">65</span></span><span class="token punctuation">;</span>
    <span class="token comment"># 设定请求缓冲</span>
    <span class="token directive"><span class="token keyword">client_header_buffer_size</span> <span class="token number">2k</span></span><span class="token punctuation">;</span>
    <span class="token comment"># 配置虚拟主机 192.168.141.121</span>
    <span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
    <span class="token comment"># 监听的 IP 和端口，配置 192.168.141.121:80</span>
        <span class="token directive"><span class="token keyword">listen</span>       <span class="token number">80</span></span><span class="token punctuation">;</span>
    <span class="token comment"># 虚拟主机名称这里配置 IP 地址</span>
        <span class="token directive"><span class="token keyword">server_name</span>  192.168.141.121</span><span class="token punctuation">;</span>
    <span class="token comment"># 所有的请求都以 / 开始，所有的请求都可以匹配此 location</span>
        <span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span>
        <span class="token comment"># 使用 root 指令指定虚拟主机目录即网页存放目录</span>
        <span class="token comment"># 比如访问 http://ip/index.html 将找到 /usr/local/docker/nginx/html/html80/index.html</span>
        <span class="token comment"># 比如访问 http://ip/item/index.html 将找到 /usr/local/docker/nginx/html/html80/item/index.html</span>
            <span class="token directive"><span class="token keyword">root</span>   /usr/share/nginx/html/html80</span><span class="token punctuation">;</span>
        <span class="token comment"># 指定欢迎页面，按从左到右顺序查找</span>
            <span class="token directive"><span class="token keyword">index</span>  index.html index.htm</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token comment"># 引入其他配置</span>
    <span class="token directive"><span class="token keyword">include</span> test.conf</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="test-conf" tabindex="-1"><a class="header-anchor" href="#test-conf" aria-hidden="true">#</a> test.conf</h2>
<div class="language-nginx line-numbers-mode" data-ext="nginx"><pre v-pre class="language-nginx"><code><span class="token comment">## Basic reverse proxy server ##</span>
<span class="token comment">## backend for 16.32  ##</span>
<span class="token directive"><span class="token keyword">upstream</span> uicps</span>  <span class="token punctuation">{</span>
<span class="token comment">#    server 192.168.16.32:59002 weight=1;</span>
     <span class="token directive"><span class="token keyword">server</span> www.baidu.com</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
 
<span class="token comment">## Start 16.32 ##</span>
<span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
    <span class="token directive"><span class="token keyword">listen</span> <span class="token number">8081</span></span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">server_name</span>  localhost</span><span class="token punctuation">;</span>
 
<span class="token comment">#    access_log  logs/proxy34.access.log  main;</span>
<span class="token comment">#    error_log  logs/proxy34.error.log;</span>
    <span class="token directive"><span class="token keyword">root</span>   html</span><span class="token punctuation">;</span>
    <span class="token directive"><span class="token keyword">index</span>  index.html index.htm index.php</span><span class="token punctuation">;</span>
 
    <span class="token comment">## send request back to 16.32 ##</span>
    <span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span>
        <span class="token directive"><span class="token keyword">proxy_pass</span>  http://uicps</span><span class="token punctuation">;</span>
 
        <span class="token comment">#Proxy Settings</span>
        <span class="token directive"><span class="token keyword">proxy_redirect</span>     <span class="token boolean">off</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">proxy_set_header</span>   Host     www.baidu.com</span><span class="token punctuation">;</span>  <span class="token comment">#           $host;不能使用$host变量</span>
        <span class="token directive"><span class="token keyword">proxy_set_header</span>   X-Real-IP        <span class="token variable">$remote_addr</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">proxy_set_header</span>   X-Forwarded-For  <span class="token variable">$proxy_add_x_forwarded_for</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">proxy_next_upstream</span> error timeout invalid_header http_500 http_502 http_503 http_504</span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">proxy_max_temp_file_size</span> <span class="token number">0</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">proxy_connect_timeout</span>      <span class="token number">90</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">proxy_send_timeout</span>         <span class="token number">90</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">proxy_read_timeout</span>         <span class="token number">90</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">proxy_buffer_size</span>          <span class="token number">4k</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">proxy_buffers</span>              <span class="token number">4</span> <span class="token number">32k</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">proxy_busy_buffers_size</span>    <span class="token number">64k</span></span><span class="token punctuation">;</span>
        <span class="token directive"><span class="token keyword">proxy_temp_file_write_size</span> <span class="token number">64k</span></span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="使用" tabindex="-1"><a class="header-anchor" href="#使用" aria-hidden="true">#</a> 使用</h2>
<p>docker-compose up启动之后访问http://localhost:8081/，访问到如下页面表示成功。</p>
<p><img src="https://gaoqisen.github.io/GraphBed/202002/20200217165051.png" alt="https://gaoqisen.github.io/GraphBed/202002/20200217165051.png"></p>
</div></template>


