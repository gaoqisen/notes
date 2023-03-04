<template><div><blockquote>
<p>多个服务器同步的需求，利用rsync就可以实现。线上正式环境中无法进行测试，因此只能在本地进行测试，测试通过之后才可以在线上进行运行。虚拟机和docker我就不犹豫的选择了docker。看了下docker的文档，pull了ubuntu的进行模拟测试。</p>
</blockquote>
<h2 id="docker" tabindex="-1"><a class="header-anchor" href="#docker" aria-hidden="true">#</a> docker</h2>
<h3 id="docker-toolbox-更改镜像源" tabindex="-1"><a class="header-anchor" href="#docker-toolbox-更改镜像源" aria-hidden="true">#</a> docker Toolbox 更改镜像源</h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>// 临时处理
docker-machine ssh default // 先进入虚拟机，default 是默认的虚拟机名称
sudo vi /var/lib/boot2docker/profile // 编辑这个文件，添加镜像源 --registry-mirror https://registry.docker-cn.com
sudo /etc/init.d/docker restart // 重启 docker 进程
exit // 退出虚拟机
docker info // 看一下镜像源是否设置成功（是否有刚刚设置的 --registry-mirror 这一行）
docker pull nginx // 现在可以愉快地拉取`nginx`镜像了

// 永久解决修改启动脚本 start.sh 注释掉 yes | "${DOCKER_MACHINE}" regenerate-certs "${VM}"
if [ "${VM_STATUS}" != "Running" ]; then
  "${DOCKER_MACHINE}" start "${VM}"
  # yes | "${DOCKER_MACHINE}" regenerate-certs "${VM}"
fi
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="docker-构建脚本" tabindex="-1"><a class="header-anchor" href="#docker-构建脚本" aria-hidden="true">#</a> docker 构建脚本</h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>FROM ubuntu:18.04
# 签名
MAINTAINER ln "1073825890@qq.com"
# 添加本地jdk到服务器
ADD jdk-8u191-linux-x64.tar /usr/local
# 添加本地tomcat到服务器
ADD apache-tomcat-8.5.37.tar.gz /usr/local
# 添加项目到tomcat的webapps文件中
ADD dpm.war /usr/local/apache-tomcat-8.5.37/webapps
# ADD时自动解压了，否则需要解压
#RUN tar -xzvf /usr/local/jdk-8u191
#RUN rm /usr/local/jdk-8u191-linux-x64.tar
#环境变量
ENV JAVA_HOME /usr/lib/jvm/java-8-oracle/
ENV CLASSPATH $JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar
ENV PATH $PATH:$JAVA_HOME/bin
# 设置中文
ENV LANG C.UTF-8
RUN mkdir -p /usr/lib/jvm \
        &amp;&amp;  mv /usr/local/jdk1.8.0_191/  /usr/lib/jvm/java-8-oracle/ \
        &amp;&amp; apt-get update \
        &amp;&amp; apt-get install net-tools -y \
        &amp;&amp; apt-get install curl -y \
        &amp;&amp; apt-get install vim -y \
        &amp;&amp; apt-get install rsync -y \
        &amp;&amp; apt-get install openssh-server -y \
        &amp;&amp; echo "PermitRootLogin yes" >> /etc/ssh/sshd_config \
        &amp;&amp; echo "Port 8000" >> /etc/ssh/sshd_config \
#       &amp;&amp; sudo /etc/init.d/ssh stop &amp;&amp; sudo /etc/init.d/ssh start
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="docker常用命令" tabindex="-1"><a class="header-anchor" href="#docker常用命令" aria-hidden="true">#</a> docker常用命令</h4>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>docker build -t java:image .  // 用docker脚本进行构建项目
docker image ls  // 查看镜像
docker run --name=application001 -p 8888:8080 -itd ab  // 将本地的8888端口映射到docker应用的8080端口以交互模式重新分配一个伪输入终端在后台运行容器
docker exec -it ab /bin/bash  // 进入应用的命令行页面

docker stop ab  // 停止应用  ab为ID或名词
docker start ab  // 启动应用
docker rm ab   // 删除未运行的应用
docker image rm ab  // 删除镜像， 删除镜像时需要删除应用，删除应用时需要停止应用
docker inspect mycat  // 检查docker运行的容器
iptables -t nat -A docker -p tcp --dport 2222 -j DNAT --to-destination 172.17.0.2:22  // 把本地的2222映射到172.17.0.2的22端口上面。
docker port id // 查看映射端口，  映射的端口直接用127.0.0.1访问
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>通过构建docker &gt; 查看镜像 &gt; 运行应用 &gt; 进入ubuntu命令行完成整个构建过程。强大的docker使用就这么简单的几步就把应用启动起来了。运行的时候可以用不同的端口运行多个应用。</li>
</ul>
<h2 id="rsync同步代码" tabindex="-1"><a class="header-anchor" href="#rsync同步代码" aria-hidden="true">#</a> rsync同步代码</h2>
<blockquote>
<p>rsync服务端需要安装sshpass、ssh、rsync才能进行同步</p>
</blockquote>
<ul>
<li>脚本</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment">#/bin/bash</span>
<span class="token comment"># 当前服务器项目绝对路径</span>
<span class="token assign-left variable">fromPath</span><span class="token operator">=</span>/usr/local/apache-tomcat-8.5.37/webapps/dpm/WEB-INF/classes/templates/
<span class="token comment"># tomcat里面的相对路径</span>
<span class="token assign-left variable">toPath</span><span class="token operator">=</span>/webapps/dpm/WEB-INF/classes/templates
<span class="token comment"># 依次为：IP 端口号 TOMCAT路径 SSH密码 登陆用户名。 多个服务器用如：("172.17.0.2 8000 /usr/local/apache-tomcat-8.5.37 123456" "172.17.0.2 8000 /usr/local/apache-tomcat-8.5.37 123456")注意中间空格隔开。 创建</span>
的是一个shell的二维数组
<span class="token assign-left variable">servers</span><span class="token operator">=</span><span class="token punctuation">(</span><span class="token string">"172.17.0.2 8000 /usr/local/apache-tomcat-8.5.37 123456 root"</span><span class="token punctuation">)</span>
<span class="token assign-left variable">currentDate</span><span class="token operator">=</span><span class="token variable"><span class="token variable">`</span><span class="token function">date</span> <span class="token string">"+%Y-%m-%d %H:%M:%S"</span><span class="token variable">`</span></span>
<span class="token assign-left variable">input</span><span class="token operator">=</span><span class="token variable">$1</span>
<span class="token function-name function">rsyncFun</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token builtin class-name">echo</span> <span class="token string">"<span class="token variable">${currentDate}</span> INFO:rsync start !!!"</span>
        <span class="token keyword">for</span> <span class="token for-or-select variable">key</span> <span class="token keyword">in</span> <span class="token variable">${<span class="token operator">!</span>servers<span class="token punctuation">[</span>@<span class="token punctuation">]</span>}</span>
        <span class="token keyword">do</span>
                <span class="token assign-left variable">server</span><span class="token operator">=</span><span class="token punctuation">(</span><span class="token variable">${servers<span class="token punctuation">[</span>$key<span class="token punctuation">]</span>}</span><span class="token punctuation">)</span>
                <span class="token function">rsync</span> <span class="token parameter variable">-e</span> <span class="token string">"sshpass -p <span class="token variable">${server<span class="token punctuation">[</span>3<span class="token punctuation">]</span>}</span> ssh -p <span class="token variable">${server<span class="token punctuation">[</span>1<span class="token punctuation">]</span>}</span>"</span> <span class="token parameter variable">-avH</span> <span class="token variable">${fromPath}</span> <span class="token variable">${server<span class="token punctuation">[</span>4<span class="token punctuation">]</span>}</span>@<span class="token variable">${server<span class="token punctuation">[</span>0<span class="token punctuation">]</span>}</span><span class="token builtin class-name">:</span><span class="token variable">${server<span class="token punctuation">[</span>2<span class="token punctuation">]</span>}</span><span class="token variable">${toPath}</span>
                <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-n</span> <span class="token string">"<span class="token variable">${input}</span>"</span> <span class="token punctuation">]</span>
                <span class="token keyword">then</span>
                        <span class="token comment"># 注意tomcat的bin目录下setclasspath.sh文件里面的JAVA_HOME和JRE_HOME是否正常.如>果报错需要在if上方增加JAVA_HOME=/usr/lib/jvm/java-8-oracle和JRE_HOME=/usr/lib/jvm/java-8-oracle/jre</span>
                        sshpass <span class="token parameter variable">-p</span> <span class="token variable">${server<span class="token punctuation">[</span>3<span class="token punctuation">]</span>}</span> <span class="token function">ssh</span> <span class="token parameter variable">-p</span> <span class="token variable">${server<span class="token punctuation">[</span>1<span class="token punctuation">]</span>}</span> <span class="token variable">${server<span class="token punctuation">[</span>4<span class="token punctuation">]</span>}</span>@<span class="token variable">${server<span class="token punctuation">[</span>0<span class="token punctuation">]</span>}</span> <span class="token string">"sh <span class="token variable">${server<span class="token punctuation">[</span>2<span class="token punctuation">]</span>}</span>/bin/shutdown.sh"</span>
                        sshpass <span class="token parameter variable">-p</span> <span class="token variable">${server<span class="token punctuation">[</span>3<span class="token punctuation">]</span>}</span> <span class="token function">ssh</span> <span class="token parameter variable">-p</span> <span class="token variable">${server<span class="token punctuation">[</span>1<span class="token punctuation">]</span>}</span> <span class="token variable">${server<span class="token punctuation">[</span>4<span class="token punctuation">]</span>}</span>@<span class="token variable">${server<span class="token punctuation">[</span>0<span class="token punctuation">]</span>}</span> <span class="token string">"sh <span class="token variable">${server<span class="token punctuation">[</span>2<span class="token punctuation">]</span>}</span>/bin/startup.sh"</span>
                <span class="token keyword">fi</span>
        <span class="token keyword">done</span>
<span class="token punctuation">}</span>
<span class="token assign-left variable">endDate</span><span class="token operator">=</span><span class="token variable"><span class="token variable">`</span><span class="token function">date</span> <span class="token string">"+%Y-%m-%d %H:%M:%S"</span><span class="token variable">`</span></span>
<span class="token function-name function">timeFun</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token assign-left variable">startTime</span><span class="token operator">=</span><span class="token variable"><span class="token variable">`</span><span class="token function">date</span> <span class="token parameter variable">-d</span> <span class="token string">"<span class="token variable">$currentDate</span>"</span> +%s<span class="token variable">`</span></span>
        <span class="token assign-left variable">entTime</span><span class="token operator">=</span><span class="token variable"><span class="token variable">`</span><span class="token function">date</span> <span class="token parameter variable">-d</span> <span class="token string">"<span class="token variable">$endDate</span>"</span> +%s<span class="token variable">`</span></span>
        <span class="token builtin class-name">return</span> <span class="token variable"><span class="token variable">$((</span>$entTime<span class="token operator">-</span>$startTime<span class="token variable">))</span></span>
<span class="token punctuation">}</span>
rsyncFun
timeFun
<span class="token builtin class-name">echo</span> <span class="token string">"<span class="token variable">${endDate}</span> INFO:rsync success!!! <span class="token variable">$?</span>"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>运行的时候直接用bash fileName.sh进行启动，如果用sh fileName.sh启动的话，会报错。</p>
</blockquote>
</div></template>


