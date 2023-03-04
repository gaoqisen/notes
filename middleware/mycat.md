---
title: MyCat－学习笔记
date: 2019-2-24 20:10:11
tags: MyCat
categories: tool
keywords: MyCat
description: MyCat的一些学习笔记
---

# MyCat－学习笔记

## 一、安装

### 1.1 下载

- 在[MyCat官网:http://dl.mycat.io/1.6.6.1/](http://dl.mycat.io/1.6.6.1/)下载并解压。

### 1.2 MyCat配置

- schema.xml配置

 > 管理着 MyCat 的逻辑库、表、分片规则、 DataNode 以及 DataSource

 ```xml
   <!-- 定义逻辑库，MyCat可以有多个逻辑库，每个逻辑库都有自己的相关配置。用schema 标签划分不同的逻辑库，checkSQLschema：否去掉表前面的数据库的名称，缺省未false，db1的名称不是schema的名称则不会去掉，官方不建议设置为true。sqlMaxLimit：每次执行语句，如果没有加上 limit 语句，mycat自动加。-->
   <schema name="db1" checkSQLschema="false" sqlMaxLimit="100">
       <!--  定义逻辑表，所有需要拆分的表都需要在这个标签中定义。具体含义相见表1-1
       <table name="travelrecord" dataNode="dn1,dn2,dn3" rule="auto-sharding-long" >
           <!-- 定义 E-R 分片的子表。通过标签上的属性与父表进行关联。 具体含义相见表1-2-->
           <childTable name="c_a" primaryKey="ID" joinKey="customer_id" parentKey="id" />
       </table>
   </schema>
   <!--  定义了 MyCat 中的数据节点，也就是我们通常说所的数据分片。一个 dataNode 标签就是一个独立的数据分片。具体含义相见表1-3-->
   <dataNode name="dNode1"  dataHost="dHost128"  database="db1" ></dataNode>
   <!--  具体的数据库实例、读写分离配置和心跳语句.具体含义相见表1-4-->
   <dataHost name="localhost1" maxCon="1000" minCon="10" balance="0"  writeType="0" dbType="mysql" dbDriver="native">
       <!--这个标签内指明用于和后端数据库进行心跳检查的语句。 例如：MYSQL 可以使用 select user()，Oracle 可以使用 select 1 from dual 等。-->
       <heartbeat>select user()</heartbeat>
       <!-- writeHost /readHost:这两个标签都指定后端数据库的相关配置，用于实例化后端连接池。唯一不同的是，writeHost 指定写实例、readHost 指定读实例。 在一个 dataHost 内可以定义多个 writeHost 和 readHost。但是，如果 writeHost 指定的后端数据库宕机，那么这个 writeHost 绑定的所有 readHost 都将不可用。另一方面，由于这个 writeHost 宕机，系统会自动的检测到，并切换到备用的 writeHost 上去. 具体含义相见表1-5-->
       <writeHost  host="hostM1"  url="localhost:3306"  user="root" password="123456">
       </writeHost>
   </dataHost>
 ```

    <center>table标签：1-1</center>
    ![1-1:table](https://gaoqisen.github.io/GraphBed/201902/20190224153934.png)
    
    <center>childTable标签：1-2</center>
    ![1-2:childTable](https://gaoqisen.github.io/GraphBed/201902/20190224154621.png)
    
    <center>dataNode标签：1-3</center>
    ![1-3:dataNode](https://gaoqisen.github.io/GraphBed/201902/20190224154857.png)
    
    <center>dataHost标签：1-4</center>
    ![1-4:dataHost](https://gaoqisen.github.io/GraphBed/201902/20190224153702.png)
    
    <center>writeHost/readHost标签：1-5</center>
    ![1-5:writeHost](https://gaoqisen.github.io/GraphBed/201902/20190224155816.png)

详细注释

```xml
<?xml version="1.0"?>
<!DOCTYPE mycat:schema SYSTEM "schema.dtd">
<mycat:schema xmlns:mycat="http://io.mycat/">
	<!--
	schema	数据库设置，此数据库为逻辑数据库，name与server.xml中schema对应
    dataNode	分片信息，也就是分库相关配置
    dataHost	物理数据库，真正存储数据的数据库
    命令行连接mycat: mysql -uroot -p123456 -h127.0.0.1 -P8066 -DTESTDB
	-->

	<!-- schema标签用来定义mycat实例中的逻辑库，mycat可以有多个逻辑库，每个逻辑库都有自己的相关配置。可以使用schema标签来划分这些不同的逻辑库
如果不配置schema标签，所有表的配置会属于同一个默认的逻辑库。逻辑库的概念和MySql的database的概念一样，我们在查询两个不同逻辑库中的表的时候，需要切换到该逻辑库下进行查询。
	 name:				逻辑数据库名，与server.xml中的schema对应
	 checkSQLschema：	描述的是当前的连接是否需要检测数据库的模式
	 sqlMaxLimit：		表示返回的最大的数据量的行数 (sqlMaxLimit="100")  暂时不加limit限制
	 dataNode="dn1"：	该操作使用的数据节点是dn1的逻辑名称
	-->
	<schema name="TESTDB" checkSQLschema="false" dataNode="dn1">
		<!-- name	表名，物理数据库中表名
			dataNode	表存储到哪些节点，多个节点用逗号分隔。节点为下文dataNode设置的name
			primaryKey	主键字段名，自动生成主键时需要设置
			autoIncrement	是否自增
			rule	分片规则名，具体规则下文rule详细介绍
			type 该属性定义了逻辑表的类型，目前逻辑表只有全局表和普通表。全局表： global 普通表：无
			注：全局表查询任意节点，普通表查询所有节点效率低
			autoIncrement mysql对非自增长主键，使用last_insert_id() 是不会返回结果的，只会返回0.所以，只有定义了自增长主键的表，才可以用last_insert_id()返回主键值。
			mycat提供了自增长主键功能，但是对应的mysql节点上数据表，没有auto_increment,那么在mycat层调用last_insert_id()也是不会返回结果的。
			needAddLimit 指定表是否需要自动的在每个语句后面加上limit限制，由于使用了分库分表，数据量有时候会特别庞大，这时候执行查询语句，
			忘记加上limt就会等好久，所以mycat自动为我们加上了limit 100，这个属性默认为true，可以自己设置为false禁用。如果使用这个功能，最好配合使用数据库模式的全局序列。
			subTables	分表，分表目前不支持Join。-->
		<table name="pub_corporate" dataNode="dn1" type="global"></table>
		<!-- childTable 标签用于定义 E-R 分片的子表。通过标签上的属性与父表进行关联。
			name	子表的名称
			joinKey	子表中字段的名称
			parentKey	父表中字段名称
			primaryKey	同Table
			needAddLimit	同Table -->
		<!-- <childTable name="c_a" primaryKey="ID" joinKey="customer_id" parentKey="id" /> -->

	</schema>
	<!-- datanode标签定义了mycat中的数据节点，也就是我们所说的数据分片。一个datanode标签就是一个独立的数据分片。
	例子中的表述的意思为，使用名字为localhost1数据库实例上的db1物理数据库，这就组成一个数据分片，最后我们用dn1来标示这个分片。
	name	定义数据节点的名字，这个名字需要唯一。我们在table标签上用这个名字来建立表与分片对应的关系
	dataHost	用于定义该分片属于哪个数据库实例，属性与datahost标签上定义的name对应
	database	用于定义该分片属于数据库实例上的具体库。
	-->
	<dataNode name="dn1" dataHost="TESTLOCALHOST" database="test" />
	<!--
	name	唯一标示dataHost标签，供上层使用
	maxCon	指定每个读写实例连接池的最大连接。
	minCon	指定每个读写实例连接池的最小连接，初始化连接池的大小
	balance	负载均称类型
	balance="0"：不开启读写分离机制，所有读操作都发送到当前可用的writeHost上
	balance="1"：全部的readHost与stand by writeHost参与select语句的负载均衡，简单的说，当双主双从模式（M1-S1，M2-S2 并且M1 M2互为主备），正常情况下，M2,S1,S2都参与select语句的负载均衡。
	balance="2"：所有读操作都随机的在writeHost、readHost上分发
	balance="3"：所有读请求随机的分发到writeHst对应的readHost执行，writeHost不负担读写压力。（1.4之后版本有）
	writeType	负载均衡类型。
	writeType="0", 所有写操作发送到配置的第一个 writeHost，第一个挂了切到还生存的第二个writeHost，重新启动后已切换后的为准，切换记录在配置文件中:dnindex.properties .
	writeType="1"，所有写操作都随机的发送到配置的 writeHost。1.5以后版本废弃不推荐。
	switchType	-1不自动切换
	1 默认值 自动切换
	2 基于MySql主从同步的状态决定是否切换心跳语句为 show slave status
	3 基于mysql galary cluster 的切换机制（适合集群）1.4.1 心跳语句为 show status like 'wsrep%'
	dbType	指定后端链接的数据库类型目前支持二进制的mysql协议，还有其他使用jdbc链接的数据库，例如：mongodb，oracle，spark等
	dbDriver	指定连接后段数据库使用的driver，目前可选的值有native和JDBC。使用native的话，因为这个值执行的是二进制的mysql协议，所以可以使用mysql和maridb，其他类型的则需要使用JDBC驱动来支持。
	如果使用JDBC的话需要符合JDBC4标准的驱动jar 放到mycat\lib目录下，并检查驱动jar包中包括如下目录结构文件 META-INF\services\java.sql.Driver。 在这个文件写上具体的driver类名，例如com.mysql.jdbc.Driver
	writeHost readHost指定后端数据库的相关配置给mycat，用于实例化后端连接池。
	tempReadHostAvailable
	如果配置了这个属性 writeHost 下面的 readHost 仍旧可用，默认 0 可配置（0、1）。
	mysql: dbType="mysql" dbDriver="native"
	oracle: dbType="oracle" dbDriver="jdbc" -->
	<dataHost name="TESTLOCALHOST" maxCon="1000" minCon="10" balance="0"
			  writeType="0" dbType="oracle" dbDriver="jdbc" switchType="1"  slaveThreshold="100">
		<!--mysql心跳检查的语句
		oracle: select 1 from dual
		mysql: select user()-->
		<heartbeat>select 1 from dual</heartbeat>
		<!-- writeHost /readHost 标签
		这两个标签都指定后端数据库的相关配置，用于实例化后端连接池。唯一不同的是，writeHost 指定写实例、readHost 指定读实例。
		在一个 dataHost 内可以定义多个 writeHost 和 readHost。但是，如果 writeHost 指定的后端数据库宕机，那么这个 writeHost 绑定的所有 readHost 都将不可用。
		另一方面，由于这个 writeHost 宕机，系统会自动的检测到，并切换到备用的 writeHost 上去。这两个标签的属性相同，这里就一起介绍。

		host	用于标识不同实例，一般 writeHost 我们使用*M1，readHost 我们用*S1。
		url	后端实例连接地址。Native：地址：端口 JDBC：jdbc的url
		password	后端存储实例需要的密码
		user	后端存储实例需要的用户名字
		weight	权重 配置在 readhost 中作为读节点的权重
		usingDecrypt	是否对密码加密，默认0。具体加密方法看官方文档。-->
		<!--<writeHost host="hostM1" url="localhost:3306" user="root"-->
				   <!--password="123456">-->
		<!--</writeHost>-->
		<!--<writeHost host="hostM1" url="localhost:3306" user="root" password=123456i">-->
		<!--</writeHost>-->
		<!--oracle:   jdbc:oracle:thin:@IP地址:1521:orcl
			mysql:    localhost:3306 -->
		<writeHost host="hostM1" url="jdbc:oracle:thin:@localhost:1521:orcl" user="tysp" password="123456">
		</writeHost>
	</dataHost>
</mycat:schema>

```

- Server.xml的配置

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mycat:server SYSTEM "server.dtd">
<mycat:server xmlns:mycat="http://io.mycat/">
	<system>
		<property name="charset">utf8</property>
		<property name="nonePasswordLogin">0</property> <!-- 0为需要密码登陆、1为不需要密码登陆 ,默认为0，设置为1则需要指定默认账户-->
		<property name="useHandshakeV10">1</property>
		<property name="useSqlStat">0</property>  <!-- 1为开启实时统计、0为关闭 -->
		<property name="useGlobleTableCheck">0</property>  <!-- 1为开启全加班一致性检测、0为关闭 -->
		<property name="sequnceHandlerType">2</property>
		<property name="subqueryRelationshipCheck">false</property> <!-- 子查询中存在关联查询的情况下,检查关联字段中是否有分片字段 .默认 false -->
	    <!--
	    <property name="useCompression">1</property>--> <!--1为开启mysql压缩协议-->
		<!--  <property name="fakeMySQLVersion">5.6.20</property>--> <!--设置模拟的MySQL版本号-->
		<!-- <property name="processorBufferChunk">40960</property> -->
		<!--
		<property name="processors">1</property>
		<property name="processorExecutor">32</property>
		 -->
        <!--默认为type 0: DirectByteBufferPool | type 1 ByteBufferArena | type 2 NettyBufferPool -->
		<property name="processorBufferPoolType">0</property>
		<!--默认是65535 64K 用于sql解析时最大文本长度 -->
		<!--<property name="maxStringLiteralLength">65535</property>-->
		<!--<property name="sequnceHandlerType">0</property>-->
		<!--<property name="backSocketNoDelay">1</property>-->
		<!--<property name="frontSocketNoDelay">1</property>-->
		<!--<property name="processorExecutor">16</property>-->
		<!--
		<property name="serverPort">8066</property> <property name="managerPort">9066</property>
		<property name="idleTimeout">300000</property> <property name="bindIp">0.0.0.0</property>
		<property name="frontWriteQueueSize">4096</property> <property name="processors">32</property> -->
		<!--分布式事务开关，0为不过滤分布式事务，1为过滤分布式事务（如果分布式事务内只涉及全局表，则不过滤），2为不过滤分布式事务,但是记录分布式事务日志-->
		<property name="handleDistributedTransactions">0</property>
		<property name="useOffHeapForMerge">1</property><!--off heap for merge/order/group/limit      1开启   0关闭-->
        <property name="memoryPageSize">64k</property> <!--单位为m-->
		<property name="spillsFileBufferSize">1k</property><!--单位为k-->
		<property name="useStreamOutput">0</property>
		<property name="systemReserveMemorySize">384m</property><!--单位为m-->
		<property name="useZKSwitch">false</property><!--是否采用zookeeper协调切换  -->
		<!-- XA Recovery Log日志路径 -->
		<!--<property name="XARecoveryLogBaseDir">./</property>-->
		<!-- XA Recovery Log日志名称 -->
		<!--<property name="XARecoveryLogBaseName">tmlog</property>-->
		<!--如果为 true的话 严格遵守隔离级别,不会在仅仅只有select语句的时候在事务中切换连接-->
		<property name="strictTxIsolation">false</property>
		<property name="useZKSwitch">true</property>
	</system>
	
	<!-- 全局SQL防火墙设置 -->
	<!--白名单可以使用通配符%或着*-->
	<!--例如<host host="127.0.0.*" user="root"/>-->
	<!--例如<host host="127.0.*" user="root"/>-->
	<!--例如<host host="127.*" user="root"/>-->
	<!--例如<host host="1*7.*" user="root"/>-->
	<!--这些配置情况下对于127.0.0.1都能以root账户登录-->
	<!--
	<firewall>
	   <whitehost>
	      <host host="1*7.0.0.*" user="root"/>
	   </whitehost>
       <blacklist check="false">
       </blacklist>
	</firewall>
	-->
	<!--name登录的用户名，也就是连接Mycat的用户名-->
	<user name="root" defaultAccount="true">
		<!--password 登录的密码，也就是连接Mycat的密码-->
		<property name="password">123456</property>
		<!--schemas	数据库名，这里会和schema.xml中的配置关联，多个用逗号分开，例如需要这个用户需要管理两个数据库db1,db2，则配置db1,dbs-->
		<property name="schemas">TESTDB</property>
		
		<!-- 表级 DML 权限设置 对用户的 schema以及表进行精细化的DML权限控制
		 check	表示是否开启DML权限检查。默认是关闭。server.dtd文件中 <!ELEMENT privileges (schema)*> 说明可以有多个schema的配置。
 		 dml	顺序说明：insert,update,select,delete
 		 db1的权限是update,select。
		tb01的权限是啥都不能干。
		tb02的权限是insert,update,select,delete。
		其他表默认是udpate,select。
		-->
		<!-- 		
		<privileges check="false">
			<schema name="TESTDB" dml="0110" >
				<table name="tb01" dml="0000"></table>
				<table name="tb02" dml="1111"></table>
			</schema>
		</privileges>		
		 -->
	</user>
	<user name="user">
		<property name="password">user</property>
		<property name="schemas">TESTDB</property>
		<property name="readOnly">true</property>
	</user>
</mycat:server>

```

- rule.xml配置

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mycat:rule SYSTEM "rule.dtd">
<mycat:rule xmlns:mycat="http://io.mycat/">
	<!--对表进行拆分所涉及到的规则定义。我们可以灵活的对表使用不同的分片算法，或者对表使用相同的算法但具体的参数不同。
	name 属性指定唯一的名字，用于标识不同的表规则。 内嵌的 rule 标签则指定对物理表中的哪一列进行拆分和使用什么路由算法。
	columns 内指定要拆分的列名字。
	algorithm 使用 function 标签中的 name 属性。连接表规则和具体路由算法。当然，多个表规则可以连接到 同一个路由算法上。table 标签内使用。让逻辑表使用这个规则进行分片。	-->
	<tableRule name="rule1">
		<rule>
			<columns>id</columns>
			<algorithm>func1</algorithm>
		</rule>
	</tableRule>

	<tableRule name="rule2">
		<rule>
			<columns>user_id</columns>
			<algorithm>func1</algorithm>
		</rule>
	</tableRule>

	<tableRule name="sharding-by-intfile">
		<rule>
			<columns>sharding_id</columns>
			<algorithm>hash-int</algorithm>
		</rule>
	</tableRule>
	<tableRule name="auto-sharding-long">
		<rule>
			<columns>id</columns>
			<algorithm>rang-long</algorithm>
		</rule>
	</tableRule>
	<tableRule name="mod-long">
		<rule>
			<columns>id</columns>
			<algorithm>mod-long</algorithm>
		</rule>
	</tableRule>
	<tableRule name="sharding-by-murmur">
		<rule>
			<columns>id</columns>
			<algorithm>murmur</algorithm>
		</rule>
	</tableRule>
	<tableRule name="crc32slot">
		<rule>
			<columns>id</columns>
			<algorithm>crc32slot</algorithm>
		</rule>
	</tableRule>
	<tableRule name="sharding-by-month">
		<rule>
			<columns>create_time</columns>
			<algorithm>partbymonth</algorithm>
		</rule>
	</tableRule>
	<tableRule name="latest-month-calldate">
		<rule>
			<columns>calldate</columns>
			<algorithm>latestMonth</algorithm>
		</rule>
	</tableRule>
	
	<tableRule name="auto-sharding-rang-mod">
		<rule>
			<columns>id</columns>
			<algorithm>rang-mod</algorithm>
		</rule>
	</tableRule>
	
	<tableRule name="jch">
		<rule>
			<columns>id</columns>
			<algorithm>jump-consistent-hash</algorithm>
		</rule>
	</tableRule>
	<!--
	name 指定算法的名字。
	class 制定路由算法具体的类名字。
	property 为具体算法需要用到的一些属性。-->
	<function name="murmur"
		class="io.mycat.route.function.PartitionByMurmurHash">
		<property name="seed">0</property><!-- 默认是0 -->
		<property name="count">2</property><!-- 要分片的数据库节点数量，必须指定，否则没法分片 -->
		<property name="virtualBucketTimes">160</property><!-- 一个实际的数据库节点被映射为这么多虚拟节点，默认是160倍，也就是虚拟节点数是物理节点数的160倍 -->
		<!-- <property name="weightMapFile">weightMapFile</property> 节点的权重，没有指定权重的节点默认是1。以properties文件的格式填写，以从0开始到count-1的整数值也就是节点索引为key，以节点权重值为值。所有权重值必须是正整数，否则以1代替 -->
		<!-- <property name="bucketMapPath">/etc/mycat/bucketMapPath</property> 
			用于测试时观察各物理节点与虚拟节点的分布情况，如果指定了这个属性，会把虚拟节点的murmur hash值与物理节点的映射按行输出到这个文件，没有默认值，如果不指定，就不会输出任何东西 -->
	</function>

	<function name="crc32slot"
			  class="io.mycat.route.function.PartitionByCRC32PreSlot">
	</function>
	<function name="hash-int"
		class="io.mycat.route.function.PartitionByFileMap">
		<property name="mapFile">partition-hash-int.txt</property>
	</function>
	<function name="rang-long"
		class="io.mycat.route.function.AutoPartitionByLong">
		<property name="mapFile">autopartition-long.txt</property>
	</function>
	<function name="mod-long" class="io.mycat.route.function.PartitionByMod">
		<!-- how many data nodes -->
		<property name="count">3</property>
	</function>

	<function name="func1" class="io.mycat.route.function.PartitionByLong">
		<property name="partitionCount">8</property>
		<property name="partitionLength">128</property>
	</function>
	<function name="latestMonth"
		class="io.mycat.route.function.LatestMonthPartion">
		<property name="splitOneDay">24</property>
	</function>
	<function name="partbymonth"
		class="io.mycat.route.function.PartitionByMonth">
		<property name="dateFormat">yyyy-MM-dd</property>
		<property name="sBeginDate">2015-01-01</property>
	</function>
	
	<function name="rang-mod" class="io.mycat.route.function.PartitionByRangeMod">
        	<property name="mapFile">partition-range-mod.txt</property>
	</function>
	
	<function name="jump-consistent-hash" class="io.mycat.route.function.PartitionByJumpConsistentHash">
		<property name="totalBuckets">3</property>
	</function>
</mycat:rule>

```

> 暂时在mysql测试是可以的。 oracle链接的时候，jdbc一直无法链接。后期在正式环境使用的时候，在记录吧！  

> mycat的权威指南链接： http://www.mycat.io/document/Mycat_V1.6.0.pdf





[MyCat权威指南](http://www.mycat.io/document/Mycat_V1.6.0.pdf)

## 二、[拆表学习](https://www.kancloud.cn/thinkphp/mysql-design-optimalize/39326)

> 当一张表的数量达到千万数据量以上的时候，加了索引可以正常查询， 但是在往上增加的话，可能就会出现查询速度慢的情况， 所有需要一些解决方案防止这种情况的发生。我暂时知道的解决方案如下：

- 数据读写分离：将应用的读写请求分到多个服务器上面，降低服务器访问压力。（适用于并发量大的情况下）
- 归档：将历史不用的数据进行归档处理，将数据压缩存放至硬盘、云盘等地方。
- 页面限制：用户查询时限制用户查询时间点，用户查询历史数据需求量大的话，可以单独做一个历史归档数据查询功能等。
- 拆库、拆表：同一个库里面的数据量太多，将数据拆分到多个表，多个库提高查询效率。解决表过大导致的访问出现卡顿现象。


   *&nbsp;&nbsp;读写分离的情况， 在并发量特别大的情况下很适用， 这种方法后期研究。 归档功能本公司已经在处理， 但是归档之后数据量还是特别大，这个时候就要拆库、拆表，拆库拆表之后对应用是有影响的，有两种情况， 一种就是改动应用的源代码，工作量就很大了，再有一种就是利用数据库中间件做一个数据库的代理。各种查询通过走中间件的方式进行，中间件负责分发查询请求到多个表，并汇总数据反馈给查询调用方。经过对比，最终选择了MyCat作为数据库中间件。由于数据库是oracle，MyCay对oracle的兼容性不是很好。后期可能调试的地方就比较多了。*

#### 2.1 水平拆表

##### 摘要

> 水平拆分是指数据表行的拆分，表的行数超过200万行时，就会变慢，这时可以把一张表的数据拆成多张表来存放(数据结构一样，每个表存放不同的数据按时间存放、ID取模的方法等)。
> 水平分库需要对系统做大的改造;

##### 方式

- 部分业务逻辑也可以通过地区，年份等字段来进行归档拆分;
- 进行拆分后的表，只能满足部分查询的高效查询需求，这时我们可以从界面上约束用户查询行为。比如我们是按年来进行归档拆分的,这个时候在页面设计上就约束用户必须要先选择年,然后才能进行查询;
- 在做分析或者统计时，由于是自己人的需求,多点等待其实是没关系的,并且并发很低,这个时候可以用union把所有表都组合成一张视图来然后再进行查询;

#### 2.2 垂直拆表

##### 摘要

> 垂直拆分是指数据表列的拆分，把一张列比较多的表拆分为多张表; 
> 垂直拆分更多时候就应该在数据表设计之初就执行的步骤，然后查询的时候用jion关联起来即可;
> 数据库里的表太多，拿出部分到新的库里，一般是根据业务划分表，关系密切的表放同一数据库，应用修改数据库连接即可;

##### 方式

- 把不常用的字段单独放在一张表;
- 把text，blob等大字段拆分出来放在附表中;
- 经常组合查询的列放在一张表中;

#### 2.3 拆表需要注意

- 跨节点join的问题、跨节点合并、排序、分页等处理数据的问题。

