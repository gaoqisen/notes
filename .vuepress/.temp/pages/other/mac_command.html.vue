<template><div><h2 id="常用" tabindex="-1"><a class="header-anchor" href="#常用" aria-hidden="true">#</a> 常用</h2>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>lsof -i:8886  // 查看端口号
opne . // 打开终端下的目录
touch aaa  // 在当前目录下创建一个aaa名字的文件
diskutil list  // 查看磁盘分区表
// 在当前文件夹以及当前文件夹的子文件夹中找到所有的.DS_Store文件，并将找到的文件通过管道传给xargs来处理。
find . -name .DS_Store -print0 | xargs -0 git rm -f --ignore-unmatch
// 批量删除同名文件
sudo find "需要删除的目录" -name ".DS_Store" -depth -exec rm {} \;
// 查看路由表
netstat -rn
// 增加路由
sudo route -n add -host 192.168.1.0 192.168.1.0
// 删除路由
sudo route -v delete -net 172.0.53.1 -gateway 172.0.53.1
// 下载brew
/bin/zsh -c "$(curl -fsSL https://gitee.com/cunkai/HomebrewCN/raw/master/Homebrew.sh)"
// 删除注释
grep '^[^#|;]' 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="git" tabindex="-1"><a class="header-anchor" href="#git" aria-hidden="true">#</a> git</h2>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>// 清除git信息
sudo git config --system --unset credential.helper
// 重新生成git的id_rsa.pub, 之后一直enter，设置密码即可
ssh-keygen -t rsa -b 4096 -C 'yourmail@qq.com'
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="iterm2" tabindex="-1"><a class="header-anchor" href="#iterm2" aria-hidden="true">#</a> iterm2</h2>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>command + t	  //新建标签
command + w	  //关闭标签
command + 数字 / command + 左右方向键  //切换标签
command + enter	  //切换全屏
command + f	  //查找
command + d	  //垂直分屏
command + shift + d	  //水平分屏
command + ;	  //查看历史命令
command + shift + h	  //查看剪贴板历史
ctrl + u	  //清除当前行
ctrl + l / command + r	  //清屏
ctrl + a	  //到行首
ctrl + e	  //到行尾
ctrl + f/b	  //前进后退 (相当于左右方向键)
ctrl + p	  //上一条命令
ctrl + r	  //搜索命令历史
ctrl + d   //删除当前光标的字符
ctrl + h	  //删除光标之前的字符
ctrl + w	  //删除光标之前的单词
ctrl + k	  //删除到文本末尾
ctrl + t	  //交换光标处文本
Command + /	  //查看当前终端中光标的位置
command+f + tab  // 选中即复制
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="tree" tabindex="-1"><a class="header-anchor" href="#tree" aria-hidden="true">#</a> tree</h2>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>-a 显示所有文件和目录。
-A 使用ASNI绘图字符显示树状图而非以ASCII字符组合。
-C 在文件和目录清单加上色彩，便于区分各种类型。
-d 显示目录名称而非内容。
-D 列出文件或目录的更改时间。
-f 在每个文件或目录之前，显示完整的相对路径名称。
-F 在执行文件，目录，Socket，符号连接，管道名称名称，各自加上"*","/","=","@","|"号。
-g 列出文件或目录的所属群组名称，没有对应的名称时，则显示群组识别码。
-i 不以阶梯状列出文件或目录名称。
-I 不显示符合范本样式的文件或目录名称。
-l 如遇到性质为符号连接的目录，直接列出该连接所指向的原始目录。
-n 不在文件和目录清单加上色彩。
-N 直接列出文件和目录名称，包括控制字符。
-p 列出权限标示。
-P 只显示符合范本样式的文件或目录名称。
-q 用"?"号取代控制字符，列出文件和目录名称。
-s 列出文件或目录大小。
-t 用文件和目录的更改时间排序。
-u 列出文件或目录的拥有者名称，没有对应的名称时，则显示用户识别码。
-x 将范围局限在现行的文件系统中，若指定目录下的某些子目录，其存放于另一个文件系统上，则将该子目录予以排除在寻找范围外。

tree -L 1  // 显示一层目录结构
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


