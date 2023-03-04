<template><div><blockquote>
<p>前言：</p>
</blockquote>
<ul>
<li>
<p>由于是前后端分离的项目，API是前后端最重要的沟通工具，用一个好的在线文档管理系统代替FTP等文本传输API是一个很不错的选择。在线文档比较好的开源文档系统就是wiki。MediaWiki是基于wiki用PHP开发的，配置起来比较复杂。后来发现一个MinDoc使用go语言开发的，特别方便。我将两种配置方式都记录一下。两种方式都需要安装mysql，CentOS7 的yum里面没有mysql，需要手动下载。</p>
</li>
<li>
<p>需要准备的就是配置外网可以访问的端口号，mindoc默认8181，可以先去配置好，阿里云的ECS服务器可以直接在安全组里面配置。</p>
</li>
<li>
<p>没有安装mysql的可以先安装mysql</p>
</li>
</ul>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>
wget http://repo.mysql.com/mysql-community-release-el7-5.noarch.rpm   //下载mysql的repo源

sudo rpm -ivh mysql-community-release-el7-5.noarch.rpm // 安装mysql-community-release-el7-5.noarch.rpm包

sudo yum install mysql-server // 安装mysql

mysql -u root  // 重置mysql密码

// 出现ERROR 2002 (HY000): Can‘t connect to local MySQL server through socket ‘/var/lib/mysql/mysql.sock‘ (2)

sudo chown -R root:root /var/lib/mysql

service mysqld restart  // 重启mysql

mysql  //直接回车进入mysql控制台
mysql > use mysql;   // 使用mysql数据库
mysql > update user set password=password('123456') where user='root';  // 更改密码
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="一、mindoc" tabindex="-1"><a class="header-anchor" href="#一、mindoc" aria-hidden="true">#</a> 一、MinDoc</h2>
<h4 id="_1-下载mindoc" tabindex="-1"><a class="header-anchor" href="#_1-下载mindoc" aria-hidden="true">#</a> 1. 下载MinDoc</h4>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>mkdir mindoc &amp;&amp; cd mindoc  //创建一个目录

wget https://github.com/lifei6671/mindoc/releases/download/v0.9/mindoc_linux_amd64.zip  //下载二进制包

unzip mindoc_linux_amd64.zip  // 解压

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-修改conf-app-conf-文件-打开文件注释" tabindex="-1"><a class="header-anchor" href="#_2-修改conf-app-conf-文件-打开文件注释" aria-hidden="true">#</a> 2. 修改conf/app.conf 文件，打开文件注释</h4>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>db_adapter=mysql
db_host=127.0.0.1
db_port=3306
db_database=mindoc_db
db_username=root
db_password=123456

adb_adapter=sqlite3
db_database=./database/mindoc.db
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-当前目录进行安装" tabindex="-1"><a class="header-anchor" href="#_3-当前目录进行安装" aria-hidden="true">#</a> 3. 当前目录进行安装</h4>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>./mindoc_linux_amd64 install
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="_4-出现install-successfully-之后就可以运行并访问" tabindex="-1"><a class="header-anchor" href="#_4-出现install-successfully-之后就可以运行并访问" aria-hidden="true">#</a> 4. 出现Install Successfully! 之后就可以运行并访问</h4>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>./mindoc_linux_amd64   // 在线运行，不能退出

nohup ./mindoc_linux_amd64 &amp; // 后台运行

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>访问http://IP:8181 即可，帐号admin 密码123456</p>
<p><img src="https://gaoqisen.github.io/GraphBed/201810/20181018093114.png" alt="MinDoc"></p>
<p>end</p>
<h2 id="二、mediawiki" tabindex="-1"><a class="header-anchor" href="#二、mediawiki" aria-hidden="true">#</a> 二、mediawiki</h2>
<h4 id="_1-安装需要的一些配置" tabindex="-1"><a class="header-anchor" href="#_1-安装需要的一些配置" aria-hidden="true">#</a> 1. 安装需要的一些配置</h4>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>yum install httpd php php-mysql php-gd php-xml mysql-server mysql libxml2

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-在mysql启动的状态下配置mysql" tabindex="-1"><a class="header-anchor" href="#_2-在mysql启动的状态下配置mysql" aria-hidden="true">#</a> 2. 在mysql启动的状态下配置mysql</h4>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>mysql_secure_installation
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="_3-在mysql里面配置项目" tabindex="-1"><a class="header-anchor" href="#_3-在mysql里面配置项目" aria-hidden="true">#</a> 3. 在mysql里面配置项目</h4>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>
create database wikidb;  
grant all on wikidb.* to root;  
grant all on wikidb.* to root@localhost;  
grant all on wikidb.* to wikiuser;  
grant all on wikidb.* to wikiuser@localhost;  
set password for wikiuser@localhost=password('wikipw');
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_4-修改httpd配置" tabindex="-1"><a class="header-anchor" href="#_4-修改httpd配置" aria-hidden="true">#</a> 4.修改httpd配置</h4>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>vim /etc/httpd/conf/httpd.conf

#ServerName www.example.com:80 // 前面的#去掉(去掉注释)

vim /etc/hosts 

127.0.0.1 localhost localhost.localadmin xxhost  // 添加hostname

service httpd restart  // 启动网络服务
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_5-mediawiki的手动安装" tabindex="-1"><a class="header-anchor" href="#_5-mediawiki的手动安装" aria-hidden="true">#</a> 5.Mediawiki的手动安装</h4>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>wget http://releases.wikimedia.org/mediawiki/1.22/mediawiki-1.22.5.tar.gz

tar -xvf mediawiki-1.22.5.tar.gz  // 解压

mv mediawiki-1.22.5 /var/www/html/w  // 将解压后的文件夹移动到httpd.conf中DocumentRoot指定的文件夹中，默认是"var/www/html"

chown -R 777 /var/www/html/w/
chmod 777 /var/www/html/w/mw-config   // 改变权限

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过http://ip/w/index.php访问，出现下面标志表示成功</p>
<p><img src="https://gaoqisen.github.io/GraphBed/201810/20181018100047.png" alt="mediawike"></p>
<blockquote>
<p>两种方式都实现了，最后就需要自己去配置个性化的设置。这两个都有自己不同的展示方式，个人偏好与第一种页面风格很友好。功能也更加完善，编辑器也是基于Markdown的。</p>
</blockquote>
</div></template>


