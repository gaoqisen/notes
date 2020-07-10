---
title: hadoop学习笔记
date: 2019-1-26 20:10:11
tags: hadoop
categories: tool
keywords: hadoop
description: hadoop学习的一些笔记,还在记录中， 加油！
---

# 安装hadoop

- 在[apache官网](https://hadoop.apache.org/releases.html)下载.

- 找到发布版本通过wget下载.gz的安装包。

```
wget http://mirror.bit.edu.cn/apache/hadoop/common/hadoop-3.1.1/hadoop-3.1.1.tar.gz
```

- 解压安装包

```
tar zxvf hadoop-3.1.1.tar.gz
```

- hadoop环境变量

```
sudo vi ~/.bashrc  //  编辑环境变量的文件，并在最后追加如下内容。

#HADOOP VARIABLES START
export HADOOP_INSTALL=/usr/hadoop/hadoop-3.1.1   // hadoop解压路径
export PATH=$PATH:$HADOOP_INSTALL/bin
export PATH=$PATH:$HADOOP_INSTALL/sbin
export HADOOP_MAPRED_HOME=$HADOOP_INSTALL
export HADOOP_COMMON_HOME=$HADOOP_INSTALL
export HADOOP_HDFS_HOME=$HADOOP_INSTALL
export YARN_HOME=$HADOOP_INSTALL
export HADOOP_COMMON_LIB_NATIVE_DIR=$HADOOP_INSTALL/lib/native
export HADOOP_OPTS="-Djava.library.path=$HADOOP_INSTALL/lib"
#HADOOP VARIABLES END

source ~/.bashrc  //生效

hadoop version   // 验证是否生效，查看版本
```

- 编辑/etc/hadoop/hadoop-env.sh的默认jdk路径

```
JAVA_HOME=/usr/java-jdk   //添加JAVA_HOME路径。不知道路径可以用echo $JAVA_HOME查看
```

- 配置hadoop/etc/hadoop/core-site.xml文件

```
<configuration>
    <property>
        <name>hadoop.tmp.dir</name>
        <!-- hadoop数据存储路径 -->
        <value>file:/usr/hadoop/hadoop-3.1.1/tmp</value>  
        <description>Abase for other temporary directories.</description>
    </property>
    <property>
        <name>fs.defaultFS</name>
        <!-- hadoop访问路径 -->
        <value>hdfs://localhost:9000</value>
    </property>
</configuration>
```

- 配置hadoop/etc/hadoop/hdfs-site.xml文件

```
<configuration>
    <property>
        <name>dfs.replication</name>
        <!-- 副本份数 -->
        <value>1</value>
    </property>
    <property>
        <name>dfs.namenode.name.dir</name>
         <!-- namenode路径 -->
        <value>file:/usr/hadoop/hadoop-3.1.1/tmp/dfs/name</value>
    </property>
    <property>
        <name>dfs.datanode.data.dir</name>
         <!-- datanode路径 -->
        <value>file:/usr/hadoop/hadoop-3.1.1/tmp/dfs/data</value>
    </property>
</configuration>
```

- 配置hadoop/etc/hadoop/yarn-site.xml文件

```
<configuration>
  <property>
  <name>yarn.nodemanager.aux-services</name>
  <value>mapreduce_shuffle</value>
  </property>
  <property>
  <name>yarn.nodemanager.aux-services.mapreduce.shuffle.class</name>
  <value>org.apache.hadoop.mapred.ShuffleHandler</value>
  </property>
</configuration>
```

- 配置hadoop/etc/hadoop/mapred-site.xml文件

```
mv mapred-queues.xml.template mapred-queues.xml  // 重命名mapred-queues.xml.template文件

<configuration>
 <property>
 <name>mapred.job.tracker</name>
 <value>localhost:9001</value>
 </property>
</configuration>
```

- 格式化hadoop

```
cd hadoop/bin  ./hadoop  // 应该2.8版本前需要初始化，3.1.1直接格式化一下   
hadoop namenode -format
```

- 启动hadoop

```
在sbin文件夹下依次执行：
start-dfs.sh 
start-yarn.sh 

如果报错：ERROR: Attempting to launch hdfs namenode as root 需要在start-dfs.sh和sbin/stop-dfs.sh 顶部空白处添加内容：

HDFS_DATANODE_USER=root  
HDFS_DATANODE_SECURE_USER=hdfs  
HDFS_NAMENODE_USER=root  
HDFS_SECONDARYNAMENODE_USER=root 

```



