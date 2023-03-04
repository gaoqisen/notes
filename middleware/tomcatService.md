---
title: tomcat-service.xml标签含义
date: 2019-5-31 14:23:52
tags: tomcat service.xml
categories: tomcat
keywords: tomcat service.xml
description: tomcat-service.xml标签含义，方便自己理解和配置tomcat。
---

## service.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!-- 属性说明
port:指定一个端口，这个端口负责监听关闭Tomcat的请求
shutdown:向以上端口发送的关闭服务器的命令字符串
-->
<Server port="8005" shutdown="SHUTDOWN">
  <!-- Listener监听器 -->
  <Listener className="org.apache.catalina.startup.VersionLoggerListener" />
  <Listener className="org.apache.catalina.core.AprLifecycleListener" SSLEngine="on" />
  <Listener className="org.apache.catalina.core.JreMemoryLeakPreventionListener" />
  <Listener className="org.apache.catalina.mbeans.GlobalResourcesLifecycleListener" />
  <Listener className="org.apache.catalina.core.ThreadLocalLeakPreventionListener" />
  <!-- 全局资源 -->
  <GlobalNamingResources>
    <!-- 可编辑的用户数据库，也可供其使用
        UserDatabaseRealm 用于对用户进行身份验证
    -->
    <Resource name="UserDatabase" auth="Container"
              type="org.apache.catalina.UserDatabase"
              description="User database that can be updated and saved"
              factory="org.apache.catalina.users.MemoryUserDatabaseFactory"
              pathname="conf/tomcat-users.xml" />
  </GlobalNamingResources>

  <!-- Tomcat服务，name=Catalina，用于 绑定 连接器与 Engine -->
  <Service name="Catalina">
     <!--
      Connector 元素:
      由 Connector 接口定义.<Connector> 元素代表与客户程序实际交互的组件,它负责接收客户请求,以及向客户返回响应结果.

      属性说明:
        port:服务器连接器的端口号,该连接器将在指定端口侦听来自客户端的请求。
        enableLookups:如果为 true，则可以通过调用 request.getRemoteHost() 进行 DNS 查询来得到远程客户端的实际主机名；若为 false 则不进行DNS查询，而是返回其ip地址。
        redirectPort:服务器正在处理http请求时收到了一个SSL传输请求后重定向的端口号。
        acceptCount:当所有可以使用的处理请求的线程都被用光时,可以放到处理队列中的请求数,超过这个数的请求将不予处理，而返回Connection refused错误。
        connectionTimeout:等待超时的时间数（以毫秒为单位）。
        maxThreads:设定在监听端口的线程的最大数目,这个值也决定了服务器可以同时响应客户请求的最大数目.默认值为200。
        protocol:必须设定为AJP/1.3协议。
        address:如果服务器有两个以上IP地址,该属性可以设定端口监听的IP地址,默认情况下,端口会监听服务器上所有IP地址。
        minProcessors:服务器启动时创建的处理请求的线程数，每个请求由一个线程负责。
        maxProcessors:最多可以创建的处理请求的线程数。
        minSpareThreads:最小备用线程 。
        maxSpareThreads:最大备用线程。
        debug:日志等级。
        disableUploadTimeout:禁用上传超时,主要用于大数据上传时。
    -->
    <Connector port="8080" protocol="HTTP/1.1"
               connectionTimeout="20000"
               redirectPort="8443" />

    <!-- 负责和其他 HTTP 服务器建立连接。在把 Tomcat 与其他 HTTP 服务器集成时就需要用到这个连接器。 -->
    <Connector port="8009" protocol="AJP/1.3" redirectPort="8443" />
    <!-- 
      每个Service元素只能有一个Engine元素.元素处理在同一个<Service>中所有<Connector>元素接收到的客户请求
      属性说明:
        name:对应$CATALINA_HOME/config/Catalina 中的 Catalina ;
        defaultHost: 对应Host元素中的name属性,也就是和$CATALINA_HOME/config/Catalina/localhost中的localhost，缺省的处理请求的虚拟主机名，它至少与其中的一个Host元素的name属性值是一样的
        debug:日志等级
    -->
    <Engine name="Catalina" defaultHost="localhost">
     <!--
          Realm：领域
          UserDatabaseRealm将UserDatabase的数据注入到引擎中，便于引擎访问UserDatabase
     -->
      <Realm className="org.apache.catalina.realm.LockOutRealm">
        <Realm className="org.apache.catalina.realm.UserDatabaseRealm"
               resourceName="UserDatabase"/>
      </Realm>
      <!--
        由 Host 接口定义.一个 Engine 元素可以包含多个<Host>元素.
        每个<Host>的元素定义了一个虚拟主机.它包含了一个或多个Web应用.
        属性说明：
          name:在此例中一直被强调为$CATALINA_HOME/config/Catalina/localhost中的localhost虚拟主机名
          debug:是日志的调试等级 
          appBase:默认的应用路径,也就是把应用放在一个目录下,并在autoDeploy为true的情况下,可自动部署应用此路径相对于$CATALINA_HOME/ (web applications的基本目录)
          unpackWARs:设置为true,在Web应用为*.war是,解压此WAR文件. 如果为true,则tomcat会自动将WAR文件解压;否则不解压,直接从WAR文件中运行应用程序.
          autoDeploy:默认为true,表示如果有新的WEB应用放入appBase 并且Tomcat在运行的情况下,自动载入应用
      -->
      <Host name="localhost"  appBase="webapps"
            unpackWARs="true" autoDeploy="true">
        <!-- 
          属性说明：
            path:访问的URI,如:http://localhost/是我的应用的根目录,访问此应用将用:http://localhost/demm进行操作,此元素必须，
                表示此web application的URL的前缀，用来匹配一个Context。请求的URL形式为http://localhost:8080/path/*
            docBase:WEB应用的目录,此目录必须符合Java WEB应用的规范，web application的文件存放路径或者是WAR文件存放路径。
            debug:日志等级 
            reloadable:是否在程序有改动时重新载入,设置成true会影响性能,但可自动载入修改后的文件，
                如果为true，则Tomcat将支持热部署，会自动检测web application的/WEB-INF/lib和/WEB-INF/classes目录的变化，
                自动装载新的JSP和Servlet，我们可以在不重起Tomcat的情况下改变web application
        -->
        <Context path="/demm" docBase="E:\\projects\\demm\\WebRoot" debug="0" reloadable="true"></Context>
          <!--
               Valve：阀门也可以理解为一个过滤器，放在了host里面则服务于整个host，放在Context内则只服务于那一个Context
               作用：打印请求日志，IP过滤，限流等	
               具体配置要基于具体的Valve 接口的子类。以下即为一个访问日志的Valve.
          -->
        <Valve className="org.apache.catalina.valves.AccessLogValve" directory="logs"
               prefix="localhost_access_log" suffix=".txt"
               pattern="%h %l %u %t &quot;%r&quot; %s %b" />

      </Host>
    </Engine>
  </Service>
</Server>

```

