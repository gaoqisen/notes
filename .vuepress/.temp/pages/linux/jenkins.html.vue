<template><div><p>要将项目发布到通过外网访问，就需要将jar或者war通过scp传到服务器，在启动项目。如果项目中更改了一行代码，那么就需要进行一下步骤：</p>
<ol>
<li>本地将项目打包为war或者jar包</li>
<li>将打包后的文件传到服务器</li>
<li>将之前项目kill掉</li>
<li>将新项目移动到指定位置启动</li>
</ol>
<p>但有了jenkins后我们就可以只需要将代码提交到git或者svn上面就可以了，其它的事情全部交给jenkins去完成。
要实现这个功能大概的思路如下：</p>
<h3 id="_1、安装jenkins-自动化配置" tabindex="-1"><a class="header-anchor" href="#_1、安装jenkins-自动化配置" aria-hidden="true">#</a> 1、安装jenkins（自动化配置）</h3>
<h3 id="_2、安装git-管理项目" tabindex="-1"><a class="header-anchor" href="#_2、安装git-管理项目" aria-hidden="true">#</a> 2、安装git（管理项目）</h3>
<h3 id="_3、安装maven-编译项目" tabindex="-1"><a class="header-anchor" href="#_3、安装maven-编译项目" aria-hidden="true">#</a> 3、安装maven(编译项目)</h3>
<h3 id="_4、配置jenkins如下" tabindex="-1"><a class="header-anchor" href="#_4、配置jenkins如下" aria-hidden="true">#</a> 4、配置jenkins如下</h3>
<ul>
<li>安装插件 （jenkins集成tomcat、svn、git等的插件）</li>
<li>全局工具配置（让jenkins找到jdk,maven,git的环境变量等）</li>
<li>创建任务</li>
</ul>
<h2 id="一、安装jenkins" tabindex="-1"><a class="header-anchor" href="#一、安装jenkins" aria-hidden="true">#</a> 一、安装jenkins</h2>
<p>由于yum的repo里面没有jenkins,先配置yum</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>sudo wget -O /etc/yum.repos.d/jenkins.repo https://pkg.jenkins.io/redhat-stable/jenkins.repo
sudo rpm --import https://pkg.jenkins.io/redhat-stable/jenkins.io.key
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>yum安装</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>yum -y install jenkins
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>更改jenkins配置</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>vi /etc/sysconfig/jenkins    
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>将JENKINS_NAME改为root,JENKINS_PORT改为8081</p>
<p>启动jenkins</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>service jenkins start
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>开通8081的端口号之后，通过在外网用http://ip地址:8081 访问出现如下页面即可：
<img src="https://upload-images.jianshu.io/upload_images/7172355-94f52d212942da67.png" alt="Screen Shot 2018-09-28 at 11.40.06 AM.png"></p>
<p>根据提示，在/var/lib/jenkins/secrets/initialAdminPassword中找到密码复制进去点击继续，不要着急稍微等待一会之后即可看到如下页面
<img src="https://upload-images.jianshu.io/upload_images/7172355-56400f88e17f8e14.png" alt="Screen Shot 2018-09-28 at 11.51.35 AM.png"></p>
<p>之后点击第一个默认配置，右边的是自定义配置，不熟悉的可以选择第一个（左边的那个）之后就是漫长的等待，等jenkins下载基础插件
<img src="https://upload-images.jianshu.io/upload_images/7172355-3f1e8b681f8ec0aa.png" alt="Screen Shot 2018-09-28 at 11.53.46 AM.png"></p>
<p>安装完成之后就创建自己的账号和密码吧！
<img src="https://upload-images.jianshu.io/upload_images/7172355-03531f545de1a6be.png" alt="Screen Shot 2018-09-28 at 11.55.40 AM.png"></p>
<p>之后点击继续后出现下面这个页面就安装完成了
<img src="https://upload-images.jianshu.io/upload_images/7172355-6ac8274b849c4ab6.png" alt="Screen Shot 2018-09-28 at 11.57.43 AM.png"></p>
<h2 id="二、安装maven" tabindex="-1"><a class="header-anchor" href="#二、安装maven" aria-hidden="true">#</a> 二、安装maven</h2>
<p>配置yum</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>wget http://repos.fedorapeople.org/repos/dchen/apache-maven/epel-apache-maven.repo -O /etc/yum.repos.d/epel-apache-maven.repo

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>yum安装</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>yum -y install apache-maven
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>查看是否安装成功</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>mvn -v
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="三、安装git" tabindex="-1"><a class="header-anchor" href="#三、安装git" aria-hidden="true">#</a> 三、安装git</h2>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code> yum -y  install git
 git --version   // 查看git版本号
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="四、配置jenkins" tabindex="-1"><a class="header-anchor" href="#四、配置jenkins" aria-hidden="true">#</a> 四、配置jenkins</h2>
<h4 id="_1、安装插件" tabindex="-1"><a class="header-anchor" href="#_1、安装插件" aria-hidden="true">#</a> 1、安装插件</h4>
<p>maven integration 插件：用于maven集成jenkins，如果不安装就不会有“构建一个maven”项目选项
<img src="https://upload-images.jianshu.io/upload_images/7172355-7bc48dc8e26005c3.png" alt="Screen Shot 2018-09-28 at 1.52.52 PM.png"></p>
<h4 id="_2、全局工具配置-让jenkins找到jdk-maven-git等" tabindex="-1"><a class="header-anchor" href="#_2、全局工具配置-让jenkins找到jdk-maven-git等" aria-hidden="true">#</a> 2、全局工具配置（让jenkins找到jdk,maven,git等）</h4>
<h4 id="_3、新建任务" tabindex="-1"><a class="header-anchor" href="#_3、新建任务" aria-hidden="true">#</a> 3、新建任务</h4>
<p>遇到的坑：
1、配置git出现如下错误
<img src="https://upload-images.jianshu.io/upload_images/7172355-d942152e96871a33.png" alt="Screen Shot 2018-09-28 at 2.15.07 PM.png"></p>
<p>因为此仓库为我的私有仓库，需要配置Credentials，点开add， Add Credentials的 Kind选择SSH Username with private key，Username选择之前在github上传的公钥用户的用户名，此次为root，Private Key为jenkins服务器登录github的本地私钥，查看私钥cat /root/.ssh/id_rsa （如果没有这个文件则生成命令为：ssh-keygen -t rsa）复制粘贴到Key区域，完成添加。此时可以发现报错已经消失。
构建的时候可能会遇到git超时可以安装这个处理[https://www.jianshu.com/p/264772bb9264]
(https://www.jianshu.com/p/264772bb9264)
要这个页面将超时时间设置长一些，我设置的是260分钟。默认是10分钟，由于项目比较大，通过git将项目迁到服务器总是超时。设置这个就好了
<img src="https://upload-images.jianshu.io/upload_images/7172355-32371bea9a3ee3aa.png" alt="Screen Shot 2018-09-29 at 12.59.39 PM.png"></p>
<p>2、构建触发器，就是设置何时开始启动build，运行程序。选这里选默认
<img src="https://upload-images.jianshu.io/upload_images/7172355-c7b08050fdf477a8.png" alt="Screen Shot 2018-09-28 at 2.18.24 PM.png">
3、其它的先不动将build改为如下：
<img src="https://upload-images.jianshu.io/upload_images/7172355-5ed23615d1c30b3e.png" alt="Screen Shot 2018-09-29 at 3.40.05 PM.png"></p>
<p>4.在写sh脚本的时候要加 BUILD_ID=dontKillMe 否则项目不会启动</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>#!/bin/bash
port=8098
echo "check $port"
grep_port=`netstat -tlpn | grep "\b$port\b"`
echo "grep port is $grep_port"
if [ -n "$grep_port" ]
then
  echo "端口 $port 在使用"
  netstat -nlp |grep :8098 |grep -v grep|awk '{print $7}' |awk -F '/' '{print $1}' |xargs kill -9
  echo "kill 掉$port 端口"
else
  echo "端口没有被使用"
fi
echo "开始重启"
# 此处要注意加BUILD_ID=dontKillMe 否则jenkins不会将项目启动下去
BUILD_ID=dontKillMe nohup java -jar /var/lib/jenkins/workspace/projectName/target/projectName-0.0.1-SNAPSHOT.jar &amp;
echo "jenkins 自动化部署成功"
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后在控制台查看jenkins部署日志，项目需要用maven可以编译通过
<img src="https://upload-images.jianshu.io/upload_images/7172355-4f7fb05ab2b74afc.png" alt="Screen Shot 2018-09-29 at 3.41.18 PM.png"></p>
<h2 id="五、配置git钩子触发jenkins构建" tabindex="-1"><a class="header-anchor" href="#五、配置git钩子触发jenkins构建" aria-hidden="true">#</a> 五、配置git钩子触发jenkins构建</h2>
</div></template>


