<template><div><div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>du -h // 查看当前文件夹的占用大小
df -h // 查看当前文件下所有的文件的大小
free -h // 查看磁盘使用情况 swap(交换空间：防止服务器出现内存溢出时无法操作系统。云服务器没有交换空间)
netstat -al // 显示网络状态信息
netstat -ltunp // 查看当前启动的服务
ps -A   // 显示所有的进程
ps -ef|grep tomcat  // 查看tomcat的端口
passwd  // 重置密码
reboot  // 重启（root用户才有权限）
sudo   // 临时获取root权限
tar -czvf file.tar.gz .  // 压缩当前文件夹
tar -xzvf file.tar.gz // 解压缩文件
apt-get  // ubuntu软件包管理  在/etc/apt/source.list可以更改数据源 apt-get update让数据源生效
lsb_release -a // 查看系统版本
// 查看文件， 不会加载整个文件 `/`向下搜索，`?`向上搜索文件 n重复前一个搜索
less
// 分页显示test.log日志里面包含debug的日志
cat -n test.log |grep "debug" |less
// 分页查看压缩包里面的文件
zcat -n app* |grep "debug" |less
// 查找当前目录下面文本中的内容
grep -rn "京ICP备12049100号" *
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="常用" tabindex="-1"><a class="header-anchor" href="#常用" aria-hidden="true">#</a> 常用</h2>
<h2 id="工具" tabindex="-1"><a class="header-anchor" href="#工具" aria-hidden="true">#</a> 工具</h2>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>htop 查看内存工具
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="系统信息" tabindex="-1"><a class="header-anchor" href="#系统信息" aria-hidden="true">#</a> 系统信息</h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>arch 显示机器的处理器架构(1) 
uname -m 显示机器的处理器架构(2) 
uname -r 显示正在使用的内核版本 
dmidecode -q 显示硬件系统部件 - (SMBIOS / DMI) 
hdparm -i /dev/hda 罗列一个磁盘的架构特性 
hdparm -tT /dev/sda 在磁盘上执行测试性读取操作 
cat /proc/cpuinfo 显示CPU info的信息 
cat /proc/interrupts 显示中断 
cat /proc/meminfo 校验内存使用 
cat /proc/swaps 显示哪些swap被使用 
cat /proc/version 显示内核的版本 
cat /proc/net/dev 显示网络适配器及统计 
cat /proc/mounts 显示已加载的文件系统 
lspci -tv 罗列 PCI 设备 
lsusb -tv 显示 USB 设备 
date 显示系统日期 
cal 2007 显示2007年的日历表 
date 041217002007.00 设置日期和时间 - 月日时分年.秒 
clock -w 将时间修改保存到 BIOS 

yum install gcc gcc-c++  安装gcc和g++（centos下）
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="关机-系统的关机、重启以及登出" tabindex="-1"><a class="header-anchor" href="#关机-系统的关机、重启以及登出" aria-hidden="true">#</a> 关机 (系统的关机、重启以及登出 )</h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>shutdown -h now 关闭系统(1) 
init 0 关闭系统(2) 
telinit 0 关闭系统(3) 
shutdown -h hours:minutes &amp; 按预定时间关闭系统 
shutdown -c 取消按预定时间关闭系统 
shutdown -r now 重启(1) 
reboot 重启(2) 
logout 注销 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="文件和目录" tabindex="-1"><a class="header-anchor" href="#文件和目录" aria-hidden="true">#</a> 文件和目录</h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>cd /home 进入 '/ home' 目录' 
cd .. 返回上一级目录 
cd ../.. 返回上两级目录 
cd 进入个人的主目录 
cd ~user1 进入个人的主目录 
cd - 返回上次所在的目录 
pwd 显示工作路径 
ls 查看目录中的文件 
ls -F 查看目录中的文件 
ls -l 显示文件和目录的详细资料 
ls -a 显示隐藏文件 
ls *[0-9]* 显示包含数字的文件名和目录名 
tree 显示文件和目录由根目录开始的树形结构(1) 
lstree 显示文件和目录由根目录开始的树形结构(2) 
mkdir dir1 创建一个叫做 'dir1' 的目录' 
mkdir dir1 dir2 同时创建两个目录 
mkdir -p /tmp/dir1/dir2 创建一个目录树 
rm -f file1 删除一个叫做 'file1' 的文件' 
rmdir dir1 删除一个叫做 'dir1' 的目录' 
rm -rf dir1 删除一个叫做 'dir1' 的目录并同时删除其内容 
rm -rf dir1 dir2 同时删除两个目录及它们的内容 
mv dir1 new_dir 重命名/移动 一个目录 
cp file1 file2 复制一个文件 
cp dir/* . 复制一个目录下的所有文件到当前工作目录 
cp -a /tmp/dir1 . 复制一个目录到当前工作目录 
cp -a dir1 dir2 复制一个目录 
ln -s file1 lnk1 创建一个指向文件或目录的软链接 
ln file1 lnk1 创建一个指向文件或目录的物理链接 
touch -t 0712250000 file1 修改一个文件或目录的时间戳 - (YYMMDDhhmm) 
file file1 outputs the mime type of the file as text 
iconv -l 列出已知的编码 
iconv -f fromEncoding -t toEncoding inputFile > outputFile creates a new from the given input file by assuming it is encoded in fromEncoding and converting it to toEncoding. 
find . -maxdepth 1 -name *.jpg -print -exec convert "{}" -resize 80x60 "thumbs/{}" \; batch resize files in the current directory and send them to a thumbnails directory (requires convert from Imagemagick) 


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="文件搜索" tabindex="-1"><a class="header-anchor" href="#文件搜索" aria-hidden="true">#</a> 文件搜索</h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>find / -name file1 从 '/' 开始进入根文件系统搜索文件和目录 
find / -user user1 搜索属于用户 'user1' 的文件和目录 
find /home/user1 -name \*.bin 在目录 '/ home/user1' 中搜索带有'.bin' 结尾的文件 
find /usr/bin -type f -atime +100 搜索在过去100天内未被使用过的执行文件 
find /usr/bin -type f -mtime -10 搜索在10天内被创建或者修改过的文件 
find / -name \*.rpm -exec chmod 755 '{}' \; 搜索以 '.rpm' 结尾的文件并定义其权限 
find / -xdev -name \*.rpm 搜索以 '.rpm' 结尾的文件，忽略光驱、捷盘等可移动设备 
locate \*.ps 寻找以 '.ps' 结尾的文件 - 先运行 'updatedb' 命令 
whereis halt 显示一个二进制文件、源码或man的位置 
which halt 显示一个二进制文件或可执行文件的完整路径 


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="挂载一个文件系统" tabindex="-1"><a class="header-anchor" href="#挂载一个文件系统" aria-hidden="true">#</a> 挂载一个文件系统</h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>mount /dev/hda2 /mnt/hda2 挂载一个叫做hda2的盘 - 确定目录 '/ mnt/hda2' 已经存在 
umount /dev/hda2 卸载一个叫做hda2的盘 - 先从挂载点 '/ mnt/hda2' 退出 
fuser -km /mnt/hda2 当设备繁忙时强制卸载 
umount -n /mnt/hda2 运行卸载操作而不写入 /etc/mtab 文件- 当文件为只读或当磁盘写满时非常有用 
mount /dev/fd0 /mnt/floppy 挂载一个软盘 
mount /dev/cdrom /mnt/cdrom 挂载一个cdrom或dvdrom 
mount /dev/hdc /mnt/cdrecorder 挂载一个cdrw或dvdrom 
mount /dev/hdb /mnt/cdrecorder 挂载一个cdrw或dvdrom 
mount -o loop file.iso /mnt/cdrom 挂载一个文件或ISO镜像文件 
mount -t vfat /dev/hda5 /mnt/hda5 挂载一个Windows FAT32文件系统 
mount /dev/sda1 /mnt/usbdisk 挂载一个usb 捷盘或闪存设备 
mount -t smbfs -o username=user,password=pass //WinClient/share /mnt/share 挂载一个windows网络共享 


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="磁盘空间" tabindex="-1"><a class="header-anchor" href="#磁盘空间" aria-hidden="true">#</a> 磁盘空间</h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>df -h 显示已经挂载的分区列表 
ls -lSr |more 以尺寸大小排列文件和目录 
du -sh dir1 估算目录 'dir1' 已经使用的磁盘空间' 
du -sk * | sort -rn 以容量大小为依据依次显示文件和目录的大小 
rpm -q -a --qf '%10{SIZE}t%{NAME}n' | sort -k1,1n 以大小为依据依次显示已安装的rpm包所使用的空间 (fedora, redhat类系统) 
dpkg-query -W -f='${Installed-Size;10}t${Package}n' | sort -k1,1n 以大小为依据显示已安装的deb包所使用的空间 (ubuntu, debian类系统) 

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="用户和群组" tabindex="-1"><a class="header-anchor" href="#用户和群组" aria-hidden="true">#</a> 用户和群组</h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>groupadd group_name 创建一个新用户组 
groupdel group_name 删除一个用户组 
groupmod -n new_group_name old_group_name 重命名一个用户组 
useradd -c "Name Surname " -g admin -d /home/user1 -s /bin/bash user1 创建一个属于 "admin" 用户组的用户 
useradd user1 创建一个新用户 
userdel -r user1 删除一个用户 ( '-r' 排除主目录) 
usermod -c "User FTP" -g system -d /ftp/user1 -s /bin/nologin user1 修改用户属性 
passwd 修改口令 
passwd user1 修改一个用户的口令 (只允许root执行) 
chage -E 2005-12-31 user1 设置用户口令的失效期限 
pwck 检查 '/etc/passwd' 的文件格式和语法修正以及存在的用户 
grpck 检查 '/etc/passwd' 的文件格式和语法修正以及存在的群组 
newgrp group_name 登陆进一个新的群组以改变新创建文件的预设群组 

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="文件的权限" tabindex="-1"><a class="header-anchor" href="#文件的权限" aria-hidden="true">#</a> 文件的权限</h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code> - 使用 "+" 设置权限，使用 "-" 用于取消 
ls -lh 显示权限 
ls /tmp | pr -T5 -W$COLUMNS 将终端划分成5栏显示 
chmod ugo+rwx directory1 设置目录的所有人(u)、群组(g)以及其他人(o)以读（r ）、写(w)和执行(x)的权限 
chmod go-rwx directory1 删除群组(g)与其他人(o)对目录的读写执行权限 
chown user1 file1 改变一个文件的所有人属性 
chown -R user1 directory1 改变一个目录的所有人属性并同时改变改目录下所有文件的属性 
chgrp group1 file1 改变文件的群组 
chown user1:group1 file1 改变一个文件的所有人和群组属性 
find / -perm -u+s 罗列一个系统中所有使用了SUID控制的文件 
chmod u+s /bin/file1 设置一个二进制文件的 SUID 位 - 运行该文件的用户也被赋予和所有者同样的权限 
chmod u-s /bin/file1 禁用一个二进制文件的 SUID位 
chmod g+s /home/public 设置一个目录的SGID 位 - 类似SUID ，不过这是针对目录的 
chmod g-s /home/public 禁用一个目录的 SGID 位 
chmod o+t /home/public 设置一个文件的 STIKY 位 - 只允许合法所有人删除文件 
chmod o-t /home/public 禁用一个目录的 STIKY 位 

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="文件的特殊属性" tabindex="-1"><a class="header-anchor" href="#文件的特殊属性" aria-hidden="true">#</a> 文件的特殊属性</h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>- 使用 "+" 设置权限，使用 "-" 用于取消 
chattr +a file1 只允许以追加方式读写文件 
chattr +c file1 允许这个文件能被内核自动压缩/解压 
chattr +d file1 在进行文件系统备份时，dump程序将忽略这个文件 
chattr +i file1 设置成不可变的文件，不能被删除、修改、重命名或者链接 
chattr +s file1 允许一个文件被安全地删除 
chattr +S file1 一旦应用程序对这个文件执行了写操作，使系统立刻把修改的结果写到磁盘 
chattr +u file1 若文件被删除，系统会允许你在以后恢复这个被删除的文件 
lsattr 显示特殊的属性 

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="打包和压缩文件" tabindex="-1"><a class="header-anchor" href="#打包和压缩文件" aria-hidden="true">#</a> 打包和压缩文件</h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>压缩当前的文件夹 zip -r ./xahot.zip ./* -r表示递归

bunzip2 file1.bz2 解压一个叫做 'file1.bz2'的文件 
bzip2 file1 压缩一个叫做 'file1' 的文件 
gunzip file1.gz 解压一个叫做 'file1.gz'的文件 
gzip file1 压缩一个叫做 'file1'的文件 
gzip -9 file1 最大程度压缩 
rar a file1.rar test_file 创建一个叫做 'file1.rar' 的包 
rar a file1.rar file1 file2 dir1 同时压缩 'file1', 'file2' 以及目录 'dir1' 
rar x file1.rar 解压rar包 
unrar x file1.rar 解压rar包 
tar -cvf archive.tar file1 创建一个非压缩的 tarball 
tar -cvf archive.tar file1 file2 dir1 创建一个包含了 'file1', 'file2' 以及 'dir1'的档案文件 
tar -tf archive.tar 显示一个包中的内容 
tar -xvf archive.tar 释放一个包 
tar -xvf archive.tar -C /tmp 将压缩包释放到 /tmp目录下 
tar -cvfj archive.tar.bz2 dir1 创建一个bzip2格式的压缩包 
tar -xvfj archive.tar.bz2 解压一个bzip2格式的压缩包 
tar -cvfz archive.tar.gz dir1 创建一个gzip格式的压缩包 
tar -xvf archive.tar.gz 解压一个gzip格式的压缩包 
zip file1.zip file1 创建一个zip格式的压缩包 
zip -r file1.zip file1 file2 dir1 将几个文件和目录同时压缩成一个zip格式的压缩包 
unzip file1.zip 解压一个zip格式压缩包 

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="rpm" tabindex="-1"><a class="header-anchor" href="#rpm" aria-hidden="true">#</a> rpm</h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>
RPM 包 - （Fedora, Redhat及类似系统） 
rpm -ivh package.rpm 安装一个rpm包 
rpm -ivh --nodeeps package.rpm 安装一个rpm包而忽略依赖关系警告 
rpm -U package.rpm 更新一个rpm包但不改变其配置文件 
rpm -F package.rpm 更新一个确定已经安装的rpm包 
rpm -e package_name.rpm 删除一个rpm包 
rpm -qa 显示系统中所有已经安装的rpm包 
rpm -qa | grep httpd 显示所有名称中包含 "httpd" 字样的rpm包 
rpm -qi package_name 获取一个已安装包的特殊信息 
rpm -qg "System Environment/Daemons" 显示一个组件的rpm包 
rpm -ql package_name 显示一个已经安装的rpm包提供的文件列表 
rpm -qc package_name 显示一个已经安装的rpm包提供的配置文件列表 
rpm -q package_name --whatrequires 显示与一个rpm包存在依赖关系的列表 
rpm -q package_name --whatprovides 显示一个rpm包所占的体积 
rpm -q package_name --scripts 显示在安装/删除期间所执行的脚本l 
rpm -q package_name --changelog 显示一个rpm包的修改历史 
rpm -qf /etc/httpd/conf/httpd.conf 确认所给的文件由哪个rpm包所提供 
rpm -qp package.rpm -l 显示由一个尚未安装的rpm包提供的文件列表 
rpm --import /media/cdrom/RPM-GPG-KEY 导入公钥数字证书 
rpm --checksig package.rpm 确认一个rpm包的完整性 
rpm -qa gpg-pubkey 确认已安装的所有rpm包的完整性 
rpm -V package_name 检查文件尺寸、 许可、类型、所有者、群组、MD5检查以及最后修改时间 
rpm -Va 检查系统中所有已安装的rpm包- 小心使用 
rpm -Vp package.rpm 确认一个rpm包还未安装 
rpm2cpio package.rpm | cpio --extract --make-directories *bin* 从一个rpm包运行可执行文件 
rpm -ivh /usr/src/redhat/RPMS/`arch`/package.rpm 从一个rpm源码安装一个构建好的包 
rpmbuild --rebuild package_name.src.rpm 从一个rpm源码构建一个 rpm 包 

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="yum" tabindex="-1"><a class="header-anchor" href="#yum" aria-hidden="true">#</a> YUM</h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>
YUM 软件包升级器 - （Fedora, RedHat及类似系统） 
yum install package_name 下载并安装一个rpm包 
yum localinstall package_name.rpm 将安装一个rpm包，使用你自己的软件仓库为你解决所有依赖关系 
yum update package_name.rpm 更新当前系统中所有安装的rpm包 
yum update package_name 更新一个rpm包 
yum remove package_name 删除一个rpm包 
yum list 列出当前系统中安装的所有包 
yum search package_name 在rpm仓库中搜寻软件包 
yum clean packages 清理rpm缓存删除下载的包 
yum clean headers 删除所有头文件 
yum clean all 删除所有缓存的包和头文件 

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="dpkg" tabindex="-1"><a class="header-anchor" href="#dpkg" aria-hidden="true">#</a> dpkg</h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>
DEB 包 (Debian, Ubuntu 以及类似系统) 
dpkg -i package.deb 安装/更新一个 deb 包 
dpkg -r package_name 从系统删除一个 deb 包 
dpkg -l 显示系统中所有已经安装的 deb 包 
dpkg -l | grep httpd 显示所有名称中包含 "httpd" 字样的deb包 
dpkg -s package_name 获得已经安装在系统中一个特殊包的信息 
dpkg -L package_name 显示系统中已经安装的一个deb包所提供的文件列表 
dpkg --contents package.deb 显示尚未安装的一个包所提供的文件列表 
dpkg -S /bin/ping 确认所给的文件由哪个deb包提供 

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="apt-get" tabindex="-1"><a class="header-anchor" href="#apt-get" aria-hidden="true">#</a> apt-get</h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>
APT 软件工具 (Debian, Ubuntu 以及类似系统) 
apt-get install package_name 安装/更新一个 deb 包 
apt-cdrom install package_name 从光盘安装/更新一个 deb 包 
apt-get update 升级列表中的软件包 
apt-get upgrade 升级所有已安装的软件 
apt-get remove package_name 从系统删除一个deb包 
apt-get check 确认依赖的软件仓库正确 
apt-get clean 从下载的软件包中清理缓存 
apt-cache search searched-package 返回包含所要搜索字符串的软件包名称 

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="查看文件内容" tabindex="-1"><a class="header-anchor" href="#查看文件内容" aria-hidden="true">#</a> 查看文件内容</h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>cat file1 从第一个字节开始正向查看文件的内容 
tac file1 从最后一行开始反向查看一个文件的内容 
more file1 查看一个长文件的内容 
less file1 类似于 'more' 命令，但是它允许在文件中和正向操作一样的反向操作 
head -2 file1 查看一个文件的前两行 
tail -2 file1 查看一个文件的最后两行 
tail -f /var/log/messages 实时查看被添加到一个文件中的内容 

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="文本处理" tabindex="-1"><a class="header-anchor" href="#文本处理" aria-hidden="true">#</a> 文本处理</h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>cat file1 file2 ... | command &lt;> file1_in.txt_or_file1_out.txt general syntax for text manipulation using PIPE, STDIN and STDOUT 
cat file1 | command( sed, grep, awk, grep, etc...) > result.txt 合并一个文件的详细说明文本，并将简介写入一个新文件中 
cat file1 | command( sed, grep, awk, grep, etc...) >> result.txt 合并一个文件的详细说明文本，并将简介写入一个已有的文件中 
grep Aug /var/log/messages 在文件 '/var/log/messages'中查找关键词"Aug" 
grep ^Aug /var/log/messages 在文件 '/var/log/messages'中查找以"Aug"开始的词汇 
grep [0-9] /var/log/messages 选择 '/var/log/messages' 文件中所有包含数字的行 
grep Aug -R /var/log/* 在目录 '/var/log' 及随后的目录中搜索字符串"Aug" 
sed 's/stringa1/stringa2/g' example.txt 将example.txt文件中的 "string1" 替换成 "string2" 
sed '/^$/d' example.txt 从example.txt文件中删除所有空白行 
sed '/ *#/d; /^$/d' example.txt 从example.txt文件中删除所有注释和空白行 
echo 'esempio' | tr '[:lower:]' '[:upper:]' 合并上下单元格内容 
sed -e '1d' result.txt 从文件example.txt 中排除第一行 
sed -n '/stringa1/p' 查看只包含词汇 "string1"的行 
sed -e 's/ *$//' example.txt 删除每一行最后的空白字符 
sed -e 's/stringa1//g' example.txt 从文档中只删除词汇 "string1" 并保留剩余全部 
sed -n '1,5p;5q' example.txt 查看从第一行到第5行内容 
sed -n '5p;5q' example.txt 查看第5行 
sed -e 's/00*/0/g' example.txt 用单个零替换多个零 
cat -n file1 标示文件的行数 
cat example.txt | awk 'NR%2==1' 删除example.txt文件中的所有偶数行 
echo a b c | awk '{print $1}' 查看一行第一栏 
echo a b c | awk '{print $1,$3}' 查看一行的第一和第三栏 
paste file1 file2 合并两个文件或两栏的内容 
paste -d '+' file1 file2 合并两个文件或两栏的内容，中间用"+"区分 
sort file1 file2 排序两个文件的内容 
sort file1 file2 | uniq 取出两个文件的并集(重复的行只保留一份) 
sort file1 file2 | uniq -u 删除交集，留下其他的行 
sort file1 file2 | uniq -d 取出两个文件的交集(只留下同时存在于两个文件中的文件) 
comm -1 file1 file2 比较两个文件的内容只删除 'file1' 所包含的内容 
comm -2 file1 file2 比较两个文件的内容只删除 'file2' 所包含的内容 
comm -3 file1 file2 比较两个文件的内容只删除两个文件共有的部分 

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="字符设置和文件格式转换" tabindex="-1"><a class="header-anchor" href="#字符设置和文件格式转换" aria-hidden="true">#</a> 字符设置和文件格式转换</h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>dos2unix filedos.txt fileunix.txt 将一个文本文件的格式从MSDOS转换成UNIX 
unix2dos fileunix.txt filedos.txt 将一个文本文件的格式从UNIX转换成MSDOS 
recode ..HTML &lt; page.txt > page.html 将一个文本文件转换成html 
recode -l | more 显示所有允许的转换格式 

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="文件系统分析" tabindex="-1"><a class="header-anchor" href="#文件系统分析" aria-hidden="true">#</a> 文件系统分析</h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>badblocks -v /dev/hda1 检查磁盘hda1上的坏磁块 
fsck /dev/hda1 修复/检查hda1磁盘上linux文件系统的完整性 
fsck.ext2 /dev/hda1 修复/检查hda1磁盘上ext2文件系统的完整性 
e2fsck /dev/hda1 修复/检查hda1磁盘上ext2文件系统的完整性 
e2fsck -j /dev/hda1 修复/检查hda1磁盘上ext3文件系统的完整性 
fsck.ext3 /dev/hda1 修复/检查hda1磁盘上ext3文件系统的完整性 
fsck.vfat /dev/hda1 修复/检查hda1磁盘上fat文件系统的完整性 
fsck.msdos /dev/hda1 修复/检查hda1磁盘上dos文件系统的完整性 
dosfsck /dev/hda1 修复/检查hda1磁盘上dos文件系统的完整性 

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="初始化一个文件系统" tabindex="-1"><a class="header-anchor" href="#初始化一个文件系统" aria-hidden="true">#</a> 初始化一个文件系统</h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>mkfs /dev/hda1 在hda1分区创建一个文件系统 
mke2fs /dev/hda1 在hda1分区创建一个linux ext2的文件系统 
mke2fs -j /dev/hda1 在hda1分区创建一个linux ext3(日志型)的文件系统 
mkfs -t vfat 32 -F /dev/hda1 创建一个 FAT32 文件系统 
fdformat -n /dev/fd0 格式化一个软盘 
mkswap /dev/hda3 创建一个swap文件系统 

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="swap文件系统" tabindex="-1"><a class="header-anchor" href="#swap文件系统" aria-hidden="true">#</a> SWAP文件系统</h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>mkswap /dev/hda3 创建一个swap文件系统 
swapon /dev/hda3 启用一个新的swap文件系统 
swapon /dev/hda2 /dev/hdb3 启用两个swap分区 

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="备份" tabindex="-1"><a class="header-anchor" href="#备份" aria-hidden="true">#</a> 备份</h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>dump -0aj -f /tmp/home0.bak /home 制作一个 '/home' 目录的完整备份 
dump -1aj -f /tmp/home0.bak /home 制作一个 '/home' 目录的交互式备份 
restore -if /tmp/home0.bak 还原一个交互式备份 
rsync -rogpav --delete /home /tmp 同步两边的目录 
rsync -rogpav -e ssh --delete /home ip_address:/tmp 通过SSH通道rsync 
rsync -az -e ssh --delete ip_addr:/home/public /home/local 通过ssh和压缩将一个远程目录同步到本地目录 
rsync -az -e ssh --delete /home/local ip_addr:/home/public 通过ssh和压缩将本地目录同步到远程目录 
dd bs=1M if=/dev/hda | gzip | ssh user@ip_addr 'dd of=hda.gz' 通过ssh在远程主机上执行一次备份本地磁盘的操作 
dd if=/dev/sda of=/tmp/file1 备份磁盘内容到一个文件 
tar -Puf backup.tar /home/user 执行一次对 '/home/user' 目录的交互式备份操作 
( cd /tmp/local/ &amp;&amp; tar c . ) | ssh -C user@ip_addr 'cd /home/share/ &amp;&amp; tar x -p' 通过ssh在远程目录中复制一个目录内容 
( tar c /home ) | ssh -C user@ip_addr 'cd /home/backup-home &amp;&amp; tar x -p' 通过ssh在远程目录中复制一个本地目录 
tar cf - . | (cd /tmp/backup ; tar xf - ) 本地将一个目录复制到另一个地方，保留原有权限及链接 
find /home/user1 -name '*.txt' | xargs cp -av --target-directory=/home/backup/ --parents 从一个目录查找并复制所有以 '.txt' 结尾的文件到另一个目录 
find /var/log -name '*.log' | tar cv --files-from=- | bzip2 > log.tar.bz2 查找所有以 '.log' 结尾的文件并做成一个bzip包 
dd if=/dev/hda of=/dev/fd0 bs=512 count=1 做一个将 MBR (Master Boot Record)内容复制到软盘的动作 
dd if=/dev/fd0 of=/dev/hda bs=512 count=1 从已经保存到软盘的备份中恢复MBR内容 

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="光盘" tabindex="-1"><a class="header-anchor" href="#光盘" aria-hidden="true">#</a> 光盘</h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code> 
cdrecord -v gracetime=2 dev=/dev/cdrom -eject blank=fast -force 清空一个可复写的光盘内容 
mkisofs /dev/cdrom > cd.iso 在磁盘上创建一个光盘的iso镜像文件 
mkisofs /dev/cdrom | gzip > cd_iso.gz 在磁盘上创建一个压缩了的光盘iso镜像文件 
mkisofs -J -allow-leading-dots -R -V "Label CD" -iso-level 4 -o ./cd.iso data_cd 创建一个目录的iso镜像文件 
cdrecord -v dev=/dev/cdrom cd.iso 刻录一个ISO镜像文件 
gzip -dc cd_iso.gz | cdrecord dev=/dev/cdrom - 刻录一个压缩了的ISO镜像文件 
mount -o loop cd.iso /mnt/iso 挂载一个ISO镜像文件 
cd-paranoia -B 从一个CD光盘转录音轨到 wav 文件中 
cd-paranoia -- "-3" 从一个CD光盘转录音轨到 wav 文件中（参数-3） 
cdrecord --scanbus 扫描总线以识别scsi通道 
dd if=/dev/hdc | md5sum 校验一个设备的md5sum编码，例如一张 CD 

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="网络" tabindex="-1"><a class="header-anchor" href="#网络" aria-hidden="true">#</a> 网络</h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>- （以太网和WIFI无线） 
ifconfig eth0 显示一个以太网卡的配置 
ifup eth0 启用一个 'eth0' 网络设备 
ifdown eth0 禁用一个 'eth0' 网络设备 
ifconfig eth0 192.168.1.1 netmask 255.255.255.0 控制IP地址 	
ifconfig eth0 promisc 设置 'eth0' 成混杂模式以嗅探数据包 (sniffing) 
dhclient eth0 以dhcp模式启用 'eth0' 
route -n show routing table 
route add -net 0/0 gw IP_Gateway configura default gateway 
route add -net 192.168.0.0 netmask 255.255.0.0 gw 192.168.1.1 configure static route to reach network '192.168.0.0/16' 
route del 0/0 gw IP_gateway remove static route 
echo "1" > /proc/sys/net/ipv4/ip_forward activate ip routing 
hostname show hostname of system 
host www.example.com lookup hostname to resolve name to ip address and viceversa(1) 
nslookup www.example.com lookup hostname to resolve name to ip address and viceversa(2) 
ip link show show link status of all interfaces 
mii-tool eth0 show link status of 'eth0' 
ethtool eth0 show statistics of network card 'eth0' 
netstat -tup show all active network connections and their PID 
netstat -tupl show all network services listening on the system and their PID 
tcpdump tcp port 80 show all HTTP traffic 
iwlist scan show wireless networks 
iwconfig eth1 show configuration of a wireless network card 
hostname show hostname 
host www.example.com lookup hostname to resolve name to ip address and viceversa 
nslookup www.example.com lookup hostname to resolve name to ip address and viceversa 
whois www.example.com lookup on Whois database 

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="microsoft-windows-networks-samba" tabindex="-1"><a class="header-anchor" href="#microsoft-windows-networks-samba" aria-hidden="true">#</a> Microsoft Windows networks (SAMBA)</h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>nbtscan ip_addr netbios name resolution 
nmblookup -A ip_addr netbios name resolution 
smbclient -L ip_addr/hostname show remote shares of a windows host 
smbget -Rr smb://ip_addr/share like wget can download files from a host windows via smb 
mount -t smbfs -o username=user,password=pass //WinClient/share /mnt/share mount a windows network share
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="命令详细解释" tabindex="-1"><a class="header-anchor" href="#命令详细解释" aria-hidden="true">#</a> 命令详细解释</h2>
<h3 id="ls" tabindex="-1"><a class="header-anchor" href="#ls" aria-hidden="true">#</a> ls</h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code> ls     (list 显示当前目录下文件和目录 ls -l 详细显示 ll )
 
ls [-aAdfFhilRS] 目录名称 
ls [--color={none,auto,always}] 目录名称 
ls [--full-time] 目录名称 
参数： 
-a ：全部的档案，连同隐藏档( 开头为 . 的档案) 一起列出来～ 
-A ：全部的档案，连同隐藏档，但不包括 . 与 .. 这两个目录，一起列出来～ 
-d ：仅列出目录本身，而不是列出目录内的档案数据 
-f ：直接列出结果，而不进行排序 (ls 预设会以档名排序！) 
-F ：根据档案、目录等信息，给予附加数据结构，例如： 
*：代表可执行档； /：代表目录； =：代表 socket 档案； |：代表 FIFO 档案； 
-h ：将档案容量以人类较易读的方式(例如 GB, KB 等等)列出来； 
-i ：列出 inode 位置，而非列出档案属性； 
-l ：长数据串行出，包含档案的属性等等数据； 
-n ：列出 UID 与 GID 而非使用者与群组的名称 (UID与GID会在账号管理提到！) 
-r ：将排序结果反向输出，例如：原本档名由小到大，反向则为由大到小； 
-R ：连同子目录内容一起列出来； 
-S ：以档案容量大小排序！ 
-t ：依时间排序 
--color=never ：不要依据档案特性给予颜色显示； 
--color=always ：显示颜色 
--color=auto ：让系统自行依据设定来判断是否给予颜色 
--full-time ：以完整时间模式 (包含年、月、日、时、分) 输出 
--time={atime,ctime} ：输出 access 时间或 改变权限属性时间 (ctime) 
而非内容变更时间 (modification time)      

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="cat-tac" tabindex="-1"><a class="header-anchor" href="#cat-tac" aria-hidden="true">#</a> cat/tac</h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>cat 由第一行开始显示档案内容 
 
cat [-AEnTv] 
参数： 
-A ：相当于 -vET 的整合参数，可列出一些特殊字符～ 
-E ：将结尾的断行字符 $ 显示出来； 
-n ：打印出行号； 
-T ：将 [tab] 按键以 ^I 显示出来； 
-v ：列出一些看不出来的特殊字符      

tac 从最后一行开始显示，可以看出 tac 是 cat 的倒着写！
nl 显示的时候，顺道输出行号！ 
 
nl [-bnw] 档案 
参数： 
-b ：指定行号指定的方式，主要有两种： 
-b a ：表示不论是否为空行，也同样列出行号； 
-b t ：如果有空行，空的那一行不要列出行号； 
-n ：列出行号表示的方法，主要有三种： 
-n ln ：行号在屏幕的最左方显示； 
-n rn ：行号在自己字段的最右方显示，且不加 0 ； 
-n rz ：行号在自己字段的最右方显示，且加 0 ； 
-w ：行号字段的占用的位数。      
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="more-head" tabindex="-1"><a class="header-anchor" href="#more-head" aria-hidden="true">#</a> more/head</h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>more 一页一页的显示档案内容 
  空格键 (space)：代表向下翻一页；
 Enter ：代表向下翻『一行』；
 /字符串 ：代表在这个显示的内容当中，向下搜寻『字符串』；
 :f ：立刻显示出文件名以及目前显示的行数；
 q ：代表立刻离开 more ，不再显示该档案内容。 

less 与 more 类似，但是比 more 更好的是，他可以往前翻页！
空格键 ：向下翻动一页； 
[pagedown]：向下翻动一页； 
[pageup] ：向上翻动一页； 
/字符串 ：向下搜寻『字符串』的功能； 
?字符串 ：向上搜寻『字符串』的功能； 
n ：重复前一个搜寻 (与 / 或 ? 有关！) 
N ：反向的重复前一个搜寻 (与 / 或 ? 有关！) 
q ：离开 less 这个程序； 

head 只看头几行 
 
head [-n number] 档案 
参数： 
-n ：后面接数字，代表显示几行的意思      
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="tail" tabindex="-1"><a class="header-anchor" href="#tail" aria-hidden="true">#</a> tail</h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>
tail 只看尾巴几行   tail -200f logfile2 ( 显示日志最后 200 行 )
od 以二进制的方式读取档案内容！ 
 
od [-t TYPE] 档案 
参数： 
-t ：后面可以接各种『类型 (TYPE)』的输出，例如： 
a ：利用预设的字符来输出； 
c ：使用 ASCII 字符来输出 
d[size] ：利用十进制(decimal)来输出数据，每个整数占用 size bytes ； 
f[size] ：利用浮点数值(floating)来输出数据，每个数占用 size bytes ； 
o[size] ：利用八进位(octal)来输出数据，每个整数占用 size bytes ； 
x[size] ：利用十六进制(hexadecimal)来输出数据，每个整数占用 size bytes ；      

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="chmod-chown-chgrp" tabindex="-1"><a class="header-anchor" href="#chmod-chown-chgrp" aria-hidden="true">#</a> chmod/chown/chgrp</h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code> chmod  ( chmod +R filename增加文件读写执行权限,+R 可读,+W 可写,+X 可执行
        ( chmod 777 filename 增加文件读写执行权限的另一种方式,
                             7=> 对应8进制的 111 可读可写可执行)
        
 chown  ( chown -R haowen .将当前目录下所有文件和目录权限赋给 haowen 
          ,-R 包括子目录)
 chgrp -R mysql . (把当前文件夹变更到mysql群组,mysql是已经有的群组)变更文件或目录的所属群组。

 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="find" tabindex="-1"><a class="header-anchor" href="#find" aria-hidden="true">#</a> find</h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>find ./ -name index.jsp 查找当前目录下名称为index.jsp的文件
find   ( find ./ -name file1 -print ,从当前目录向下查找名为 file1 的文件)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="mkdir" tabindex="-1"><a class="header-anchor" href="#mkdir" aria-hidden="true">#</a> mkdir</h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>mkdir  ( mkdir  dir1 ,新建目录 dir1 ) 
 
mkdir [-mp] 目录名称 
参数： 
-m ：设定档案的权限喔！直接设定，不需要看预设权限 (umask) 的脸色～ 
-p ：帮助你直接将所需要的目录递归建立起来！      
  
rmdir [-p] 目录名称 
参数： 
-p ：连同上层『空的』目录也一起删除      

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="pwd" tabindex="-1"><a class="header-anchor" href="#pwd" aria-hidden="true">#</a> pwd</h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>
 pwd   Print Working Directory  ( pwd  ,显示当前路径 ) pwd -P 显示出确实的路径,而非使用连接(link)路径

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="cd" tabindex="-1"><a class="header-anchor" href="#cd" aria-hidden="true">#</a> cd</h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code> cd     ( cd /usr/local/   进入目录 /usr/local/ , cd ../ 返回到上一级目录  
                           ./ 当前目录 ../父目录 - 代表前一个工作目录 ~代表[目前使用者身份]所在的家目录  ~account代表account这个使用者的家目录)针对 cd 的使用方法，如果仅输入 cd 时，代表的就是『 cd           ~ 』 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="mv" tabindex="-1"><a class="header-anchor" href="#mv" aria-hidden="true">#</a> mv</h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code> mv     ( mv file1  /home/haowen/ ,将文件移动到目录 /home/haowen/下 
                                  ,相当于 window 剪切 )
        ( mv file1 filenew1 ,将文件名改为 filenew1 )
 
mv [-fiu] source destination 
mv [options] source1 source2 source3 .... directory 
参数： 
-f ：force 强制的意思，强制直接移动而不询问； 
-i ：若目标档案 (destination) 已经存在时，就会询问是否覆盖！ 
-u ：若目标档案已经存在，且 source 比较新，才会更新 (update)      

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="cp" tabindex="-1"><a class="header-anchor" href="#cp" aria-hidden="true">#</a> cp</h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code> cp     ( cp file1 /home/haowen/  ,将文件复制copy到目录 /home/haowen/下  
          cp -r dir1 /home/haowen/ 
          cp file1 ./file2 复制文件并改名)
 
cp [-adfilprsu] 来源档(source) 目的檔(destination) 
cp [options] source1 source2 source3 .... directory 
参数： 
-a ：相当于 -pdr 的意思； 
-d ：若来源文件为连结文件的属性(link file)，则复制连结文件属性而非档案本身； 
-f ：为强制 (force) 的意思，若有重复或其它疑问时，不会询问使用者，而强制复制； 
-i ：若目的檔(destination)已经存在时，在覆盖时会先询问是否真的动作！ 
-l ：进行硬式连结 (hard link) 的连结档建立，而非复制档案本身； 
-p ：连同档案的属性一起复制过去，而非使用预设属性； 
-r ：递归持续复制，用于目录的复制行为； 
-s ：复制成为符号连结文件 (symbolic link)，亦即『快捷方式』档案； 
-u ：若 destination 比 source 旧才更新 destination ！      

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="rm" tabindex="-1"><a class="header-anchor" href="#rm" aria-hidden="true">#</a> rm</h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>
 rm     ( rm file1 ,rm -r dir1,rm -rf dir2 删除文件或目录, f不提示输入y 
 
rm [-fir] 档案或目录 
参数： 
-f ：就是 force 的意思，强制移除； 
-i ：互动模式，在删除前会询问使用者是否动作 
-r ：递归删除啊！最常用在目录的删除了      


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="touch" tabindex="-1"><a class="header-anchor" href="#touch" aria-hidden="true">#</a> touch</h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>
touch 建立一个空的档案,将某个档案日期修订为目前 (mtime 与 atime) 
 
touch [-acdmt] 档案 
参数： 
-a ：仅修订 access time； 
-c ：仅修改时间，而不建立档案；
-d ：后面可以接日期，也可以使用 --date="日期或时间" 
-m ：仅修改 mtime ； 
-t ：后面可以接时间，格式为[YYMMDDhhmm]      
  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="file" tabindex="-1"><a class="header-anchor" href="#file" aria-hidden="true">#</a> file</h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>    
file 如果你想要知道某个档案的基本数据，例如是属于 ASCII 或者是 data 档案，或者是 binary ， 且其中有没有使用到动态函式库 (share library) 等等的信息，就可以利用 file 这个指令来检阅喔！ 

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="which" tabindex="-1"><a class="header-anchor" href="#which" aria-hidden="true">#</a> which</h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>
which (寻找『执行档』) 这个指令是根据『PATH』这个环境变量所规范的路径，去搜寻『执行档』的档名
 
which [-a] command 
参数： 
-a ：将所有可以找到的指令均列出，而不止第一个被找到的指令名称      

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="whereis" tabindex="-1"><a class="header-anchor" href="#whereis" aria-hidden="true">#</a> whereis</h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>
whereis (从数据库寻找特定档案)
 
whereis [-bmsu] 档案或目录名 
参数： 
-b :只找 binary 的档案 
-m :只找在说明文件 manual 路径下的档案 
-s :只找 source 来源档案 
-u :没有说明档的档案！      

功能说明：计算字数。
语 　 法：wc [-clw][--help][--version][文件名]
补充说明：利用wc指令我们可以计算文件的Byte数、字数、或是列数，若不指定任何文件名称，或是所给予的文件名为"-"，则wc指令会从标准输入设备读取数据。假设不给予其参数，wc指令会一并显示列数、字数和Byte数
参 　 数：
-c 只显示Byte数，亦即字符数；
-l 只显示列数；
-w 只显示字数；
-m 同样显示字符数
--help 在线帮助；
--version 显示此软件的版本信息。

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="locate" tabindex="-1"><a class="header-anchor" href="#locate" aria-hidden="true">#</a> locate</h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>
locate 从数据库列出某个档案的完整档名

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="grep" tabindex="-1"><a class="header-anchor" href="#grep" aria-hidden="true">#</a> grep</h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>
 grep   ( grep "mobile=13712345678"  logfile1 ,在logfile1中 
          搜索查找内容 "mobile=13712345678" )
 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="ping-ifconfig" tabindex="-1"><a class="header-anchor" href="#ping-ifconfig" aria-hidden="true">#</a> ping／ifconfig</h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code> ping   ( ping 61.129.78.9 ,ping www.163.com ,测试网络连接是否正常 )
 ifconfig  ( ifconfig ,查看本机 IP地址，子网掩码等 )
 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="ps-kill" tabindex="-1"><a class="header-anchor" href="#ps-kill" aria-hidden="true">#</a> ps／kill</h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code> ps    ( ps aux 查看系统中已经启动的进程, ps aux | grep programe1 ,
         查看程序1是否正在运行
 kill  ( kill -9  2325 ,杀死进程号为 2325的进程, 
         killall  programe1 ,杀死programe1进程 )

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="init-reboot" tabindex="-1"><a class="header-anchor" href="#init-reboot" aria-hidden="true">#</a> init／reboot</h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>
 reboot ( 重启系统 )
 init 0 ( 关机 ,仅 root 用户有权操作 )
 init 6 ( 重启系统 ,仅 root 用户有权操作 )
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="gzip-gunzip-tar" tabindex="-1"><a class="header-anchor" href="#gzip-gunzip-tar" aria-hidden="true">#</a> gzip／gunzip／tar</h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code> gzip   ( gzip file1 ,压缩文件 file1 )
 gunzip ( gunzip file1.gz  解压缩文件 file1.gz )
 
 tar -zcvf ( tar -zcvf  dir1.tar.gz ./dir1  ,将当前目录下 dir1目录所有内容
           压缩打包,包名dir1.tar.gz )
 tar -zxvf ( tar -zxvf  dir1.tar.gz ,解开压缩包 )
  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="echo-vi" tabindex="-1"><a class="header-anchor" href="#echo-vi" aria-hidden="true">#</a> echo／vi</h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>  
 echo "hello!" >> file1  ( 将 "hello" 添加到文件 file1后面, 
                           当 file1 不存在就创建 file1
 
 vi file2       ( vi 编即器新建文件 file2)
                ...输入内容 welcome..
                ( 按 i 进入 insert 状态 即插入模式 ,按 Esc 退出插入模式
                  在非插入模式下按 dd 删除光标当前行,按 x 删除当前字,
                  按 j,n,l移动光标 )
 :wq  ( 保存退出 ) :q! (不保存退出) 
 
增加环境变量
 
echo $PATH        
PATH="$PATH":/root      
 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="env-set" tabindex="-1"><a class="header-anchor" href="#env-set" aria-hidden="true">#</a> env／set</h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>env  显示系统的一些环境变量 
set  显示系统的所有变量 

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="chmod" tabindex="-1"><a class="header-anchor" href="#chmod" aria-hidden="true">#</a> chmod</h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code> chmod:
 Linux/Unix 的档案调用权限分为三级 : 档案拥有者、群组、其他。
 利用 chmod 可以藉以控制档案如何被他人所调用。   
 + 表示增加权限、- 表示取消权限、= 表示唯一设定权限。 
　 r 表示可读取，w 表示可写入，x 表示可执行，
 
 1. 将档案 file1.txt 设为所有人皆可读取 : 
　　 chmod ugo+r file1.txt   或  chmod 444 file1.txt
 
 2. 将文件 file2 设为属主可读写执行,Group,other ,只能读
   chmod 744 file2   ( 7=> "111" ,4=>"100" 二进制 )
   
 3. 将文件 file3 设为属主可读写执行,Group,other ,无权限操作不能读写执行)
   chmod 700 file3   ( 7=> "111" ,0=>"000"  )
   
   其中a,b,c各为一个数字，分别表示User、Group、及Other的权限。 
　 
　 r=4，w=2，x=1 若要rwx属性则4+2+1=7； 若要rw-属性则4+2=6；
                  若要r-x属性则4+1=5
　 　
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="tar" tabindex="-1"><a class="header-anchor" href="#tar" aria-hidden="true">#</a> tar</h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>  tar:
  tar 调用gzip
　　gzip是GNU组织开发的一个压缩程序，.gz结尾的文件就是gzip压缩的结果。
    与gzip相对的解压程序是gunzip。tar中使用-z这个参数来调用gzip。
　　# tar -czf all.tar.gz *.jpg
    
　　这条命令是将所有.jpg的文件打成一个tar包，并且将其用gzip压缩，生成一个
    gzip压缩过的包，包名为all.tar.gz
    
　　# tar -xzf all.tar.gz   这条命令是将上面产生的包解开。

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="date-cal-bc" tabindex="-1"><a class="header-anchor" href="#date-cal-bc" aria-hidden="true">#</a> date／cal／bc</h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>　　
date 显示日期的指令： 

cal 显示日历的指令： 

bc 简单好用的计算器： 

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="info-who-finger-man" tabindex="-1"><a class="header-anchor" href="#info-who-finger-man" aria-hidden="true">#</a> info／who／finger／man</h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>
info 在线求助  :  
    
who 要看目前有谁在在线:  
    
finger 显示关于系统用户的信息

man 命令:查看该命令的基础用法 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="netstat-ntsysv-shutdown" tabindex="-1"><a class="header-anchor" href="#netstat-ntsysv-shutdown" aria-hidden="true">#</a> netstat／ntsysv／shutdown</h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>netstat -a     看网络的联机状态: 

ntsysv 设置服务随系统启动时同时启动
    
shutdown  ,shutdown -h now  惯用的关机指令： 


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="dmesg-df-du-free-top-hostname" tabindex="-1"><a class="header-anchor" href="#dmesg-df-du-free-top-hostname" aria-hidden="true">#</a> dmesg／df／du／free／top／hostname</h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code> dmesg : 例如 dmesg | more  显示系统的诊断信息,操作系统版本号,物理内及其它信息
 df : 例如 df -h 显示硬盘空间
 du :   查看目录中各级子目录使用的硬盘空间
 free:  查看系统内存,虚拟内存(交换空间)的大小占用情况
 top: 动态实时查看系统内存,CPU,进程

 hostname 查看主机名:
 
 hostname 新主机名 修改主机名(临时的,重启就没了):

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="type" tabindex="-1"><a class="header-anchor" href="#type" aria-hidden="true">#</a> type</h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>type 查询某个指令是来自于外部指令(指的是其它非 bash 套件所提供的指令) 或是内建在 bash 当中的指令
 
type [-tpa] name 
参数： 
：不加任何参数时，则 type 会显示出那个 name 是外部指令还是 bash 内建的指令！ 
-t ：当加入 -t 参数时，type 会将 name 以底下这些字眼显示出他的意义： 
file ：表示为外部指令； 
alias ：表示该指令为命令别名所设定的名称； 
builtin ：表示该指令为 bash 内建的指令功能； 
-p ：如果后面接的 name 为指令时，会显示完整文件名(外部指令)或显示为内建指令； 
-a ：会将由 PATH 变量定义的路径中，将所有含有 name 的指令都列出来，包含 alias      

myname=pqb 变量的设定
PATH="$PATH":/home/dmtsai/bin  变量的累加
echo $myname 变量的查看
unset myname 变量的取消

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="shutdown" tabindex="-1"><a class="header-anchor" href="#shutdown" aria-hidden="true">#</a> Shutdown</h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>关闭系统使用Shutdown命令，确保用户和系统的资料完整。只有root用户才能使用这个命令。
一般的用户是不允许执行这个命令的。
我们先看看showdown语法：
shutdown [options] when [message]
options:　-r 表示重启，-h表示系统服务停滞(halt)后，立刻关机，-f表示快速重启
when：　为shutdown指定时间。hh:mm：绝对时间，hh指小时，mm指分钟；如08:30，+m:m分钟后执行，
now=+0，也就是立刻执行
message：表示系统的广播信息，一般提示各个用户系统关机或重启，要求用户保存资料后退出。
我们来看看几个例子：
shutdown -h now 立刻关机
shutdown -h 21:30 今天21：30关机
shutdown -h +10 十分钟后关机
shutdown -r now 立刻重启
shutdown -r +10 ‘the system will reboot’ 10分钟后重启，管理员提示用户系统要重启了，便于用户保存工
作中的资料。只有root用户才能使用这个命令。

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="fdisk-mount-eject" tabindex="-1"><a class="header-anchor" href="#fdisk-mount-eject" aria-hidden="true">#</a> fdisk／mount／eject</h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>fdisk -l命令

使用“vfat”文件系统类型表示所有的fat文件系统类型，包括fat16和fat32，ntfs还是使用ntfs表示。
u盘的挂载方法
mount -t vfat /dev/sdb1 /mnt/
mount -t ntfs /dev/sdb1 /mnt/

umount命令用于卸载已经挂载的文件系统，基本格式如：umount dir device

对于光盘文件系统的卸载可以使用，以下两条命令中的任意一条
umount /dev/cdrom
umount /media/cdrom

u盘的卸载
umount /dev/sdb1

eject命令
eject 弹出光盘命令
eject -t 光盘驱动器自动回收

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="ln" tabindex="-1"><a class="header-anchor" href="#ln" aria-hidden="true">#</a> ln</h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>

指令名称:ln 
　　使用权限:所有使用者 
　　使用方式:ln [options] source dist,其中 option 的格式为:
　　[-bdfinsvF] [-S backup-suffix] [-V {numbered,existing,simple}] 
　　[--help] [--version] [--] 

　　说明:Linux/Unix 档案系统中,有所谓的连结(link),我们可以将其视为档案的别名,而连结又可分为两种:硬连结(hard link)与软连结(symbolic link),硬连结的意思是一个档案可以有多个名称,而软连结的方式则是产生一个特殊的档案,该档案的内容是指向另一个档案的位置。硬连结是存在同一个档案系统中,而软连结却可以跨越不同的档案系统。 

　　ln source dist 是产生一个连结(dist)到 source,至于使用硬连结或软链结则由参数决定。 

　　不论是硬连结或软链结都不会将原本的档案复制一份,只会占用非常少量的磁碟空间。

　　-f:链结时先将与 dist 同档名的档案删除-d:允许系统管理者硬链结自己的目录-i:在删除与 dist 同档名的档案时先进行询问-n:在进行软连结时,将 dist 视为一般的档案-s:进行软链结(symbolic link)-v:在连结之前显示其档名-b:将在链结时会被覆写或删除的档案进行备份-S SUFFIX:将备份的档案都加上 SUFFIX 的字尾-V METHOD:指定备份的方式--help:显示辅助说明--version:显示版本 
　　范例:
　　将档案 yy 产生一个 symbolic link:zz 
　　ln -s yy zz 
　　将档案 yy 产生一个 hard link:zz 
　　ln yy xx 

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="at" tabindex="-1"><a class="header-anchor" href="#at" aria-hidden="true">#</a> at</h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>　　使用权限:所有使用者 
　　使用方式:at -V [-q queue] [-f file] [-mldbv] TIME 
　　说明:at 可以让使用者指定在 TIME 这个特定时刻执行某个程式或指令,TIME 的格式是 HH:MM其中的 HH 为小时,MM 为分钟,甚至你也可以指定 am, pm, midnight, noon, teatime(就是下午 4 点锺)等口语词。 
　　如果想要指定超过一天内的时间,则可以用 MMDDYY 或者 MM/DD/YY 的格式,其中 MM 是分钟,DD 是第几日,YY 是指年份。另外,使用者甚至也可以使用像是 now + 时间间隔来弹性指定时间,其中的时间间隔可以是 minutes, hours, days, weeks 
　　另外,使用者也可指定 today 或 tomorrow 来表示今天或明天。当指定了时间并按下 enter 之后,at 会进入交谈模式并要求输入指令或程式,当你输入完后按下 ctrl+D 即可完成所有动作,至于执行的结果将会寄回你的帐号中。
　　把计:
　　-V:印出版本编号 
　　-q:使用指定的伫列(Queue)来储存,at 的资料是存放在所谓的 queue 中,使用者可以同时使用多个 queue,而 queue 的编号为 a, b, c... z 以及 A, B, ... Z 共 52 个 
　　-m:即使程式/指令执行完成后没有输出结果, 也要寄封信给使用者 
　　-f file:读入预先写好的命令档。使用者不一定要使用交谈模式来输入,可以先将所有的指定先写入档案后再一次读入 
　　-l:列出所有的指定 (使用者也可以直接使用 atq 而不用 at -l) 
　　-d:删除指定 (使用者也可以直接使用 atrm 而不用 at -d) 
　　-v:列出所有已经完成但尚未删除的指定 
　　例子:
　　三天后的下午 5 点锺执行 /bin/ls:
　　at 5pm + 3 days /bin/ls 

　　三个星期后的下午 5 点锺执行 /bin/ls:
　　at 5pm + 2 weeks /bin/ls 

　　明天的 17:20 执行 /bin/date:
　　at 17:20 tomorrow /bin/date 
　　1999 年的最后一天的最后一分钟印出 the end of world ! 
　　at 23:59 12/31/1999 echo the end of world ! 

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="cal" tabindex="-1"><a class="header-anchor" href="#cal" aria-hidden="true">#</a> cal</h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>　　使用权限：所有使用者 
　　使用方式：cal [-mjy] [month [year]] 
　　说明： 
　　显示日历。若只有一个参数,则代表年份(1-9999),显示该年的年历。年份必须全部写出：``cal 89\ 将不会是显示 1989 年的年历。使用两个参数,则表示月份及年份。若没有参数则显示这个月的月历。 
　　1752 年 9 月第 3 日起改用西洋新历,因这时大部份的国家都采用新历,有 10 天被去除,所以该月份的月历有些不同。在此之前为西洋旧历。 
　　匡兜: 
　　-m:以星期一为每周的第一天方式显示。 
　　-j:以凯撒历显示,即以一月一日起的天数显示。 
　　-y:显示今年年历。 
　　范例： 
　　cal:显示本月的月历。
　　[root@mylinux /root]# date 
　　Tue Aug 15 08:00:18 CST 2000 
　　[root@mylinux /root]# cal 
　　...

　　cal 2001:显示公元 2001 年年历。
　　[root@mylinux /root]# cal 2001 
　　...

    cal 5 2001:显示公元 2001 年 5 月月历。
　　[root@mylinux /root]# cal 5 2001 

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="crontab" tabindex="-1"><a class="header-anchor" href="#crontab" aria-hidden="true">#</a> crontab</h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>　　使用权限:所有使用者 
　　使用方式:
　　crontab [ -u user ] filecrontab [ -u user ] { -l | -r | -e } 
　　说明:
　　crontab 是用来让使用者在固定时间或固定间隔执行程式之用,换句话说,也就是类似使用者的时程表。-u user 是指设定指定 user 的时程表,这个前提是你必须要有其权限(比如说是 root)才能够指定他人的时程表。如果不使用 -u user 的话,就是表示设定自己的时程表。 
　　参数:

　　-e:执行文字编辑器来设定时程表,内定的文字编辑器是 VI,如果你想用别的文字编辑器,则请先设定 VISUAL 环境变数来指定使用那个文字编辑器(比如说 setenv VISUAL joe) 
　　-r:删除目前的时程表 
　　-l:列出目前的时程表 

　　时程表的格式如下:
　　f1 f2 f3 f4 f5 program 

　　其中 f1 是表示分钟,f2 表示小时,f3 表示一个月份中的第几日,f4 表示月份,f5 表示一个星期中的第几天。program 表示要执行的程式。 
　　当 f1 为 * 时表示每分钟都要执行 program,f2 为 * 时表示每小时都要执行程式,其余类推 
　　当 f1 为 a-b 时表示从第 a 分钟到第 b 分钟这段时间内要执行,f2 为 a-b 时表示从第 a 到第 b 小时都要执行,其余类推 
　　当 f1 为 */n 时表示每 n 分钟个时间间隔执行一次,f2 为 */n 表示每 n 小时个时间间隔执行一次,其余类推 
　　当 f1 为 a, b, c,... 时表示第 a, b, c,... 分钟要执行,f2 为 a, b, c,... 时表示第 a, b, c...个小时要执行,其余类推 
　　使用者也可以将所有的设定先存放在档案 file 中,用 crontab file 的方式来设定时程表。 
　　例子:
　　每月每天每小时的第 0 分钟执行一次 /bin/ls:
　　0 7 * * * /bin/ls 

　　在 12 月内, 每天的早上 6 点到 12 点中,每隔 20 分钟执行一次 /usr/bin/backup:
　　0 6-12/3 * 12 * /usr/bin/backup 

　　周一到周五每天下午 5:00 寄一封信给 alex@domain.name:
　　0 17 * * 1-5 mail -s "hi" alex@domain.name &lt; /tmp/maildata 

　　每月每天的午夜 0 点 20 分, 2 点 20 分, 4 点 20 分....执行 echo "haha" 
　　20 0-23/2 * * * echo "haha" 

　　注意:
　　当程式在你所指定的时间执行后,系统会寄一封信给你,显示该程式执行的内容,若是你不希望收到这样的信,请在每一行空一格之后加上 > /dev/null 2>&amp;1 即可。

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="sleep" tabindex="-1"><a class="header-anchor" href="#sleep" aria-hidden="true">#</a> sleep</h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>　　使用权限:所有使用者 
　　使用方式:sleep [--help] [--version] number[smhd] 
　　说明:sleep 可以用来将目前动作延迟一段时间 
　　参数说明:
　　--help:显示辅助讯息 
　　--version:显示版本编号 
　　number:时间长度,后面可接 s,m,h 或 d 
　　其中 s 为秒,m 为 分钟,h 为小时,d 为日数 
　　例子:
　　显示目前时间后延迟 1 分钟,之后再次显示时间:
　　date;sleep 1m;date 


　　名称： finger 
　　使用权限： 所有使用者 
　　使用方式： finger [options] user[@address] 
　　说明：finger 可以让使用者查询一些其他使用者的资料。
    范例：下列指令可以查询本机管理员的资料： 
　　finger root 

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="last" tabindex="-1"><a class="header-anchor" href="#last" aria-hidden="true">#</a> last</h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>　　使用权限：所有使用者 
　　使用方式：shell>> last [options] 
　　说明：显示系统开机以来获是从每月初登入者的讯息 
　　把计: 
　　-R 省略 hostname 的栏位 
　　-num 展示前 num 个 
　　username 展示 username 的登入讯息 
　　tty 限制登入讯息包含终端机代号 
　　范例： 

　　shell>> last -R -2 

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="write" tabindex="-1"><a class="header-anchor" href="#write" aria-hidden="true">#</a> write</h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>　　使用权限:所有使用者 
　　使用方式:
　　write user [ttyname] 
　　说明:传讯息给其他使用者 
　　把计:
　　user:预备传讯息的使用者帐号 
　　ttyname:如果使用者同时有两个以上的 tty 连线,可以自行选择合适的 tty 传讯息 
　　例子.1:
　　传讯息给 Rollaend,此时 Rollaend 只有一个连线:
　　write Rollaend 
    接下来就是将讯息打上去,结束请按 ctrl+c 

　　例子.2 :传讯息给 Rollaend,Rollaend 的连线有 pts/2,pts/3:
　　write Rollaend pts/2

　　接下来就是将讯息打上去,结束请按 ctrl+c 
　　注意:若对方设定 mesg n,则此时讯席将无法传给对方 

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="expr" tabindex="-1"><a class="header-anchor" href="#expr" aria-hidden="true">#</a> expr</h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>　　使用权限：所有使用者 
　　### 字串长度 
　　shell>> expr length "this is a test" 
　　14 

　　### 数字商数 
　　shell>> expr 14 % 9 
　　5 

　　### 从位置处抓取字串 
　　shell>> expr substr "this is a test" 3 5 
　　is is 

　　### 数字串 only the first character 

　　shell>> expr index "testforthegame" e 
　　2 

　　### 字串真实重现 
　　shell>> expr quote thisisatestformela 
　　thisisatestformela 

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="clear" tabindex="-1"><a class="header-anchor" href="#clear" aria-hidden="true">#</a> clear</h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>　　用途：清除萤幕用。 
　　使用方法：在 console 上输入 clear。 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


