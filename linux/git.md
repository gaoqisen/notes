title: centos7安装git服务器
date: 2018-09-20 22:50:11
tags: git
categories: linux

## 常用git命令

```shell
  git status //查看git状态
  git remote -v //查看所有原点
  git stash  // 暂存，遇到pull代码冲突的时候，可以先暂存代码之后，在进行pull
  git stash pop // 返回到之前暂存的版本并删除之前的暂存版本
  git push origin master --force  //强制上传，将本地代码覆盖掉远程代码
  // 删除远程分支
  git push origin --delete BranchName 
  // 删除本地分支
  git branch -d BranchName
  // 报错：SSL_ERROR_SYSCALL in connection to github.com:443
  git config --global --unset http.proxy
  // 将某个提交记录代码合并到当前分支
  git cherry-pick <commitHash>
```

## linux安装git，并配置仓库

#### 1.安装git,查看版本号
```sh
  yum install -y git
  git --version
```
#### 2.创建git用户
       useradd git //创建用户
       password git  //更改密码
#### 3.初始化git仓库，并改变仓库权限
        cd /home/git
        mkdir -p test.git  //创建仓库
        git init --bare test.git  //初始化
        chown -R git:git test.git  //改变权限
#### 4.克隆仓库到本地
      git clone git@119.10.15.56:/home/git/test.git

## 本地git与远程git交互

#### 1.本地初始化git，并上传
      git init //初始化
      git add test.txt  //增加文件到暂存区
      git commit -m '注释'  //提交文件到本地仓库
      git remote rm origin //删除之前的remote
      git remote add origin git@119.106.185.58:/home/test.git  //添加远程起源
      git push origin master  //通过origin原点添加master分支到远程git仓库

#### 2.更新a
      git pull origin master  //取回origin主机的master分支，与本地当前分支合并
#### 3.常用上传
      git add -A  //将所有的新文件添加到暂存区
      git add test.txt  //增加文件到暂存区
      git commit -m '注释'  //提交文件到本地仓库
      git commit  -a -m '注释'  //将所有的文件提交到本地仓库
      git push origin master  //通过origin原点添加master分支到远程git仓库

#### 分支 

```o
  git branch //看看分支 
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
```

[更详细的解释](https://git-scm.com/book/zh/v1/Git-%E5%88%86%E6%94%AF-%E5%88%86%E6%94%AF%E7%9A%84%E6%96%B0%E5%BB%BA%E4%B8%8E%E5%90%88%E5%B9%B6)
​      

## 问题解决

```
// 冲突问题Merging is not possible because you have unmerged files
git add -u
git commit -m ''
git pull origin dev
```



## git钩子自动执行更新

#### 1.在初始化git仓库里面找到hooks文件夹，并在里面创建钩子文件
      vim post-receive //用vim创建文件
      chmod 755 post-receive  // 更改执行权限
#### 2.编辑自动执行脚本
```shell
 #!/bin/sh
 ## 你需要部署的项目路径。注意文件夹的权限问题
 PATH=/home/fileDir/   
 cd $PATH 
 ## git的hooks里面默认有一些环境变量,导致无论在哪个语句之后执行git命令都会有默认环境路径,直接unset掉默认的环境变量就好
 unset $(git rev-parse --local-env-vars)  
 ## 更新项目
 /usr/bin/git pull   
 ## 切换到root用户身份执行自己的脚本
 sudo /home/sh/git_hook.sh   
 
 
 ## 注意：该命令需要在/etc/sudoers 大概91行左右的root ... （添加是需要改变文件的写权限，否则无法添加）下面添加：
 git   ALL=(ALL)  NOPASSWD:/home/sh/git_hook.sh
```
#### 3.服务器克隆本地git仓库代码

     ```
     git clone /home/test.git  
     ```



暂时需要使用到的命令就这些。以后遇到了在增加



