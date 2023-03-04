<template><div><p>title: centos7安装git服务器
date: 2018-09-20 22:50:11
tags: git
categories: linux</p>
<h2 id="常用git命令" tabindex="-1"><a class="header-anchor" href="#常用git命令" aria-hidden="true">#</a> 常用git命令</h2>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>  <span class="token function">git</span> status //查看git状态
  <span class="token function">git</span> remote <span class="token parameter variable">-v</span> //查看所有原点
  <span class="token function">git</span> stash  // 暂存，遇到pull代码冲突的时候，可以先暂存代码之后，在进行pull
  <span class="token function">git</span> stash pop // 返回到之前暂存的版本并删除之前的暂存版本
  <span class="token function">git</span> push origin master <span class="token parameter variable">--force</span>  //强制上传，将本地代码覆盖掉远程代码
  // 删除远程分支
  <span class="token function">git</span> push origin <span class="token parameter variable">--delete</span> BranchName 
  // 删除本地分支
  <span class="token function">git</span> branch <span class="token parameter variable">-d</span> BranchName
  // 报错：SSL_ERROR_SYSCALL <span class="token keyword">in</span> connection to github.com:443
  <span class="token function">git</span> config <span class="token parameter variable">--global</span> <span class="token parameter variable">--unset</span> http.proxy
  // 将某个提交记录代码合并到当前分支
  <span class="token function">git</span> cherry-pick <span class="token operator">&lt;</span>commitHash<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="linux安装git-并配置仓库" tabindex="-1"><a class="header-anchor" href="#linux安装git-并配置仓库" aria-hidden="true">#</a> linux安装git，并配置仓库</h2>
<h4 id="_1-安装git-查看版本号" tabindex="-1"><a class="header-anchor" href="#_1-安装git-查看版本号" aria-hidden="true">#</a> 1.安装git,查看版本号</h4>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>  yum <span class="token function">install</span> <span class="token parameter variable">-y</span> <span class="token function">git</span>
  <span class="token function">git</span> <span class="token parameter variable">--version</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-创建git用户" tabindex="-1"><a class="header-anchor" href="#_2-创建git用户" aria-hidden="true">#</a> 2.创建git用户</h4>
<pre><code>   useradd git //创建用户
   password git  //更改密码
</code></pre>
<h4 id="_3-初始化git仓库-并改变仓库权限" tabindex="-1"><a class="header-anchor" href="#_3-初始化git仓库-并改变仓库权限" aria-hidden="true">#</a> 3.初始化git仓库，并改变仓库权限</h4>
<pre><code>    cd /home/git
    mkdir -p test.git  //创建仓库
    git init --bare test.git  //初始化
    chown -R git:git test.git  //改变权限
</code></pre>
<h4 id="_4-克隆仓库到本地" tabindex="-1"><a class="header-anchor" href="#_4-克隆仓库到本地" aria-hidden="true">#</a> 4.克隆仓库到本地</h4>
<pre><code>  git clone git@119.10.15.56:/home/git/test.git
</code></pre>
<h2 id="本地git与远程git交互" tabindex="-1"><a class="header-anchor" href="#本地git与远程git交互" aria-hidden="true">#</a> 本地git与远程git交互</h2>
<h4 id="_1-本地初始化git-并上传" tabindex="-1"><a class="header-anchor" href="#_1-本地初始化git-并上传" aria-hidden="true">#</a> 1.本地初始化git，并上传</h4>
<pre><code>  git init //初始化
  git add test.txt  //增加文件到暂存区
  git commit -m '注释'  //提交文件到本地仓库
  git remote rm origin //删除之前的remote
  git remote add origin git@119.106.185.58:/home/test.git  //添加远程起源
  git push origin master  //通过origin原点添加master分支到远程git仓库
</code></pre>
<h4 id="_2-更新a" tabindex="-1"><a class="header-anchor" href="#_2-更新a" aria-hidden="true">#</a> 2.更新a</h4>
<pre><code>  git pull origin master  //取回origin主机的master分支，与本地当前分支合并
</code></pre>
<h4 id="_3-常用上传" tabindex="-1"><a class="header-anchor" href="#_3-常用上传" aria-hidden="true">#</a> 3.常用上传</h4>
<pre><code>  git add -A  //将所有的新文件添加到暂存区
  git add test.txt  //增加文件到暂存区
  git commit -m '注释'  //提交文件到本地仓库
  git commit  -a -m '注释'  //将所有的文件提交到本地仓库
  git push origin master  //通过origin原点添加master分支到远程git仓库
</code></pre>
<h4 id="分支" tabindex="-1"><a class="header-anchor" href="#分支" aria-hidden="true">#</a> 分支</h4>
<div class="language-o line-numbers-mode" data-ext="o"><pre v-pre class="language-o"><code>  git branch //看看分支 
  git checkout aaa //切换分支aaa 
  git branch aaa //创建aaa分支 
  git checkout -b aaa //本地创建 aaa分支，同时切换到aaa分支。只有提交的时候才会在服务端上创建一个分支
  git pull origin master //更新指定分支
  git branch -vv // 查看分支跟踪的远程分支
  git branch -v  // 分支信息
  git branch --no-merged // 查看尚未合并的工作
  git merge iss53  // 将iss53合并到当前分支
  
  
  // 创建自己的分支并切换到自己的分支
  git checkout -b Branch.gaoqisen.20200825
  // 更新dev分支代码到自己的分支
  git pull origin dev
  // 冲突解决
  git checkout bbb
  git merge aaa
  git push origin bbb
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a href="https://git-scm.com/book/zh/v1/Git-%E5%88%86%E6%94%AF-%E5%88%86%E6%94%AF%E7%9A%84%E6%96%B0%E5%BB%BA%E4%B8%8E%E5%90%88%E5%B9%B6" target="_blank" rel="noopener noreferrer">更详细的解释<ExternalLinkIcon/></a>
​</p>
<h2 id="问题解决" tabindex="-1"><a class="header-anchor" href="#问题解决" aria-hidden="true">#</a> 问题解决</h2>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>// 冲突问题Merging is not possible because you have unmerged files
git add -u
git commit -m ''
git pull origin dev
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="git钩子自动执行更新" tabindex="-1"><a class="header-anchor" href="#git钩子自动执行更新" aria-hidden="true">#</a> git钩子自动执行更新</h2>
<h4 id="_1-在初始化git仓库里面找到hooks文件夹-并在里面创建钩子文件" tabindex="-1"><a class="header-anchor" href="#_1-在初始化git仓库里面找到hooks文件夹-并在里面创建钩子文件" aria-hidden="true">#</a> 1.在初始化git仓库里面找到hooks文件夹，并在里面创建钩子文件</h4>
<pre><code>  vim post-receive //用vim创建文件
  chmod 755 post-receive  // 更改执行权限
</code></pre>
<h4 id="_2-编辑自动执行脚本" tabindex="-1"><a class="header-anchor" href="#_2-编辑自动执行脚本" aria-hidden="true">#</a> 2.编辑自动执行脚本</h4>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code> <span class="token comment">#!/bin/sh</span>
 <span class="token comment">## 你需要部署的项目路径。注意文件夹的权限问题</span>
 <span class="token assign-left variable"><span class="token environment constant">PATH</span></span><span class="token operator">=</span>/home/fileDir/   
 <span class="token builtin class-name">cd</span> <span class="token environment constant">$PATH</span> 
 <span class="token comment">## git的hooks里面默认有一些环境变量,导致无论在哪个语句之后执行git命令都会有默认环境路径,直接unset掉默认的环境变量就好</span>
 <span class="token builtin class-name">unset</span> <span class="token variable"><span class="token variable">$(</span><span class="token function">git</span> rev-parse --local-env-vars<span class="token variable">)</span></span>  
 <span class="token comment">## 更新项目</span>
 /usr/bin/git pull   
 <span class="token comment">## 切换到root用户身份执行自己的脚本</span>
 <span class="token function">sudo</span> /home/sh/git_hook.sh   
 
 
 <span class="token comment">## 注意：该命令需要在/etc/sudoers 大概91行左右的root ... （添加是需要改变文件的写权限，否则无法添加）下面添加：</span>
 <span class="token function">git</span>   <span class="token assign-left variable">ALL</span><span class="token operator">=</span><span class="token punctuation">(</span>ALL<span class="token punctuation">)</span>  NOPASSWD:/home/sh/git_hook.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-服务器克隆本地git仓库代码" tabindex="-1"><a class="header-anchor" href="#_3-服务器克隆本地git仓库代码" aria-hidden="true">#</a> 3.服务器克隆本地git仓库代码</h4>
<pre><code> ```
 git clone /home/test.git  
 ```
</code></pre>
<p>暂时需要使用到的命令就这些。以后遇到了在增加</p>
</div></template>


