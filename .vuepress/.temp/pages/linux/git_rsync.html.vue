<template><div><h2 id="原因" tabindex="-1"><a class="header-anchor" href="#原因" aria-hidden="true">#</a> 原因</h2>
<p>项目是一个分布式集群的项目，一个项目运行在多个tomcat服务器上面。功能需要改动，如果手动管理代码，是一件很容易出现操作失误导致项目代码同步不一致的情况。</p>
<h2 id="实现目标" tabindex="-1"><a class="header-anchor" href="#实现目标" aria-hidden="true">#</a> 实现目标</h2>
<ol>
<li>
<p>在一个地方操作，其余服务器中的代码自动同步。</p>
</li>
<li>
<p>支持回滚操作，如果同步之后的代码有问题，立马回滚到之前的版本（不影响线上操作）。</p>
</li>
</ol>
<h2 id="实现思路" tabindex="-1"><a class="header-anchor" href="#实现思路" aria-hidden="true">#</a> 实现思路</h2>
<h3 id="方案一-git-shell-svn和git的部署方式思路一致" tabindex="-1"><a class="header-anchor" href="#方案一-git-shell-svn和git的部署方式思路一致" aria-hidden="true">#</a> 方案一：git ＋ shell（svn和git的部署方式思路一致）</h3>
<blockquote>
<p>git是程序员常用的代码版本控制工具，比较重要的功能就是分支和版本，回退到之前的版本是一件很很容易的事情。第一种方式可以利用git的版本机制。</p>
</blockquote>
<ul>
<li>
<p>用一台服务器A专门管理代码，并创建git仓库。</p>
</li>
<li>
<p>在这台服务器A上面用maven进行代码编译生成.class文件。（非maven管理的项目，可以在本地编译成功后上传到git仓库）</p>
</li>
<li>
<p>在其他需要同步的服务器上面clone服务器A上面的代码。</p>
</li>
<li>
<p>在其他服务器上面创建同步脚本和回退脚本。</p>
<p>同步脚本：</p>
<ol>
<li>拉取最新代码</li>
<li>关闭tomcat服务器</li>
<li>启动tomcat服务器</li>
</ol>
<p>如果代码出现问题的回退脚本:</p>
<ol>
<li>关闭tomcat服务器</li>
<li>代码回退</li>
<li>启动tomcat</li>
</ol>
</li>
<li>
<p>用工具远程执行脚本。如果配置了ssh免密码登陆，可以用：ssh user@remoteNode &quot;sh /home/sync.sh&quot; 来执行远程脚本。也可以在服务器A上面写一个执行多个服务器远程命令的命令脚本。</p>
</li>
<li>
<p>缺点：每台子服务器都要部署svn或git</p>
</li>
</ul>
<h3 id="方案二-jenkins-rsync-git-svn" tabindex="-1"><a class="header-anchor" href="#方案二-jenkins-rsync-git-svn" aria-hidden="true">#</a> 方案二: jenkins + rsync + git/svn</h3>
<ul>
<li>
<p>环境: ssh, rsync, git/svn</p>
</li>
<li>
<p>安装ssh： apt-get install openssh-server rsync -y</p>
</li>
<li>
<p>ssh启动：/etc/init.d/ssh start</p>
</li>
<li>
<p>直接用rsync的ssh命令同步： rsync -e &quot;ssh -p 8000&quot; -avH /home root@172.17.0.2:/home</p>
</li>
<li>
<p>每次执行的时候都需要输入密码， 可以安装sshpass在脚本中写入密码实现不输入密码自动同步（在执行的命令前加sshpass -p password即可）。或者让两台服务器的ssh互信，实现免密码远程执行ssh命令（）。</p>
</li>
</ul>
<blockquote>
<p>还有一种通过daemon方式通过tcp同步的，需要写配置文件，没有实现出来。</p>
</blockquote>
<ul>
<li></li>
</ul>
<p><a href="https://blog.csdn.net/mlx212/article/details/80918843" target="_blank" rel="noopener noreferrer">jenkins+svn+rsync+php_一键自动化部署可持续化集成服务器集群项目_支持回滚<ExternalLinkIcon/></a>  这个写的比较详细，只是语言是php的，换成java的语言应该影响不大。</p>
<h3 id="方案三-rsync-svn-git-svn上传class文件" tabindex="-1"><a class="header-anchor" href="#方案三-rsync-svn-git-svn上传class文件" aria-hidden="true">#</a> 方案三：rsync + svn/git + svn上传class文件</h3>
<ul>
<li>思路：找一台分发服务器（安装svn，rsync）或者本地电脑代替分发服务器，开发者将代码提交至svn之后，分发服务器进行拉取代码之后，即进行测试环境和生产环境的代码的发布（利用rsync写脚本进行代码增量同步，可同步至多台服务器）。需要注意的就是非maven环境的代码编译（如果svn上传class文件，负担就是svn占用空间大）。</li>
</ul>
</div></template>


