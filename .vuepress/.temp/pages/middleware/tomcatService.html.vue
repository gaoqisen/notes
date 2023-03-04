<template><div><h2 id="service-xml" tabindex="-1"><a class="header-anchor" href="#service-xml" aria-hidden="true">#</a> service.xml</h2>
<div class="language-xml line-numbers-mode" data-ext="xml"><pre v-pre class="language-xml"><code><span class="token prolog">&lt;?xml version="1.0" encoding="UTF-8"?></span>
<span class="token comment">&lt;!-- 属性说明
port:指定一个端口，这个端口负责监听关闭Tomcat的请求
shutdown:向以上端口发送的关闭服务器的命令字符串
--></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Server</span> <span class="token attr-name">port</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>8005<span class="token punctuation">"</span></span> <span class="token attr-name">shutdown</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>SHUTDOWN<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token comment">&lt;!-- Listener监听器 --></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Listener</span> <span class="token attr-name">className</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>org.apache.catalina.startup.VersionLoggerListener<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Listener</span> <span class="token attr-name">className</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>org.apache.catalina.core.AprLifecycleListener<span class="token punctuation">"</span></span> <span class="token attr-name">SSLEngine</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>on<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Listener</span> <span class="token attr-name">className</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>org.apache.catalina.core.JreMemoryLeakPreventionListener<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Listener</span> <span class="token attr-name">className</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>org.apache.catalina.mbeans.GlobalResourcesLifecycleListener<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Listener</span> <span class="token attr-name">className</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>org.apache.catalina.core.ThreadLocalLeakPreventionListener<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
  <span class="token comment">&lt;!-- 全局资源 --></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>GlobalNamingResources</span><span class="token punctuation">></span></span>
    <span class="token comment">&lt;!-- 可编辑的用户数据库，也可供其使用
        UserDatabaseRealm 用于对用户进行身份验证
    --></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Resource</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>UserDatabase<span class="token punctuation">"</span></span> <span class="token attr-name">auth</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>Container<span class="token punctuation">"</span></span>
              <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>org.apache.catalina.UserDatabase<span class="token punctuation">"</span></span>
              <span class="token attr-name">description</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>User database that can be updated and saved<span class="token punctuation">"</span></span>
              <span class="token attr-name">factory</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>org.apache.catalina.users.MemoryUserDatabaseFactory<span class="token punctuation">"</span></span>
              <span class="token attr-name">pathname</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>conf/tomcat-users.xml<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>GlobalNamingResources</span><span class="token punctuation">></span></span>

  <span class="token comment">&lt;!-- Tomcat服务，name=Catalina，用于 绑定 连接器与 Engine --></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Service</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>Catalina<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
     <span class="token comment">&lt;!--
      Connector 元素:
      由 Connector 接口定义.&lt;Connector> 元素代表与客户程序实际交互的组件,它负责接收客户请求,以及向客户返回响应结果.

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
    --></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Connector</span> <span class="token attr-name">port</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>8080<span class="token punctuation">"</span></span> <span class="token attr-name">protocol</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>HTTP/1.1<span class="token punctuation">"</span></span>
               <span class="token attr-name">connectionTimeout</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>20000<span class="token punctuation">"</span></span>
               <span class="token attr-name">redirectPort</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>8443<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>

    <span class="token comment">&lt;!-- 负责和其他 HTTP 服务器建立连接。在把 Tomcat 与其他 HTTP 服务器集成时就需要用到这个连接器。 --></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Connector</span> <span class="token attr-name">port</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>8009<span class="token punctuation">"</span></span> <span class="token attr-name">protocol</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>AJP/1.3<span class="token punctuation">"</span></span> <span class="token attr-name">redirectPort</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>8443<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
    <span class="token comment">&lt;!-- 
      每个Service元素只能有一个Engine元素.元素处理在同一个&lt;Service>中所有&lt;Connector>元素接收到的客户请求
      属性说明:
        name:对应$CATALINA_HOME/config/Catalina 中的 Catalina ;
        defaultHost: 对应Host元素中的name属性,也就是和$CATALINA_HOME/config/Catalina/localhost中的localhost，缺省的处理请求的虚拟主机名，它至少与其中的一个Host元素的name属性值是一样的
        debug:日志等级
    --></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Engine</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>Catalina<span class="token punctuation">"</span></span> <span class="token attr-name">defaultHost</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>localhost<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
     <span class="token comment">&lt;!--
          Realm：领域
          UserDatabaseRealm将UserDatabase的数据注入到引擎中，便于引擎访问UserDatabase
     --></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Realm</span> <span class="token attr-name">className</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>org.apache.catalina.realm.LockOutRealm<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Realm</span> <span class="token attr-name">className</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>org.apache.catalina.realm.UserDatabaseRealm<span class="token punctuation">"</span></span>
               <span class="token attr-name">resourceName</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>UserDatabase<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Realm</span><span class="token punctuation">></span></span>
      <span class="token comment">&lt;!--
        由 Host 接口定义.一个 Engine 元素可以包含多个&lt;Host>元素.
        每个&lt;Host>的元素定义了一个虚拟主机.它包含了一个或多个Web应用.
        属性说明：
          name:在此例中一直被强调为$CATALINA_HOME/config/Catalina/localhost中的localhost虚拟主机名
          debug:是日志的调试等级 
          appBase:默认的应用路径,也就是把应用放在一个目录下,并在autoDeploy为true的情况下,可自动部署应用此路径相对于$CATALINA_HOME/ (web applications的基本目录)
          unpackWARs:设置为true,在Web应用为*.war是,解压此WAR文件. 如果为true,则tomcat会自动将WAR文件解压;否则不解压,直接从WAR文件中运行应用程序.
          autoDeploy:默认为true,表示如果有新的WEB应用放入appBase 并且Tomcat在运行的情况下,自动载入应用
      --></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Host</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>localhost<span class="token punctuation">"</span></span>  <span class="token attr-name">appBase</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>webapps<span class="token punctuation">"</span></span>
            <span class="token attr-name">unpackWARs</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>true<span class="token punctuation">"</span></span> <span class="token attr-name">autoDeploy</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>true<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token comment">&lt;!-- 
          属性说明：
            path:访问的URI,如:http://localhost/是我的应用的根目录,访问此应用将用:http://localhost/demm进行操作,此元素必须，
                表示此web application的URL的前缀，用来匹配一个Context。请求的URL形式为http://localhost:8080/path/*
            docBase:WEB应用的目录,此目录必须符合Java WEB应用的规范，web application的文件存放路径或者是WAR文件存放路径。
            debug:日志等级 
            reloadable:是否在程序有改动时重新载入,设置成true会影响性能,但可自动载入修改后的文件，
                如果为true，则Tomcat将支持热部署，会自动检测web application的/WEB-INF/lib和/WEB-INF/classes目录的变化，
                自动装载新的JSP和Servlet，我们可以在不重起Tomcat的情况下改变web application
        --></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Context</span> <span class="token attr-name">path</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>/demm<span class="token punctuation">"</span></span> <span class="token attr-name">docBase</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>E:\\projects\\demm\\WebRoot<span class="token punctuation">"</span></span> <span class="token attr-name">debug</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>0<span class="token punctuation">"</span></span> <span class="token attr-name">reloadable</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>true<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Context</span><span class="token punctuation">></span></span>
          <span class="token comment">&lt;!--
               Valve：阀门也可以理解为一个过滤器，放在了host里面则服务于整个host，放在Context内则只服务于那一个Context
               作用：打印请求日志，IP过滤，限流等	
               具体配置要基于具体的Valve 接口的子类。以下即为一个访问日志的Valve.
          --></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Valve</span> <span class="token attr-name">className</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>org.apache.catalina.valves.AccessLogValve<span class="token punctuation">"</span></span> <span class="token attr-name">directory</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>logs<span class="token punctuation">"</span></span>
               <span class="token attr-name">prefix</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>localhost_access_log<span class="token punctuation">"</span></span> <span class="token attr-name">suffix</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>.txt<span class="token punctuation">"</span></span>
               <span class="token attr-name">pattern</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>%h %l %u %t <span class="token entity named-entity" title="&quot;">&amp;quot;</span>%r<span class="token entity named-entity" title="&quot;">&amp;quot;</span> %s %b<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>

      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Host</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Engine</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Service</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Server</span><span class="token punctuation">></span></span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


