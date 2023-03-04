<template><div><table>
<thead>
<tr>
<th>描述</th>
<th>Netflix</th>
<th>Alibaba</th>
</tr>
</thead>
<tbody>
<tr>
<td>注册中心</td>
<td>Eureka</td>
<td>Nacos</td>
</tr>
<tr>
<td>负载均衡</td>
<td>Ribbon</td>
<td>Dubbo LB</td>
</tr>
<tr>
<td>通信</td>
<td>Feign</td>
<td>Dubbo RPC</td>
</tr>
<tr>
<td>熔断降级</td>
<td>Hystrix</td>
<td>Sentinel</td>
</tr>
<tr>
<td>网关</td>
<td>Zuul</td>
<td>Dubbo PROXY/Gateway</td>
</tr>
<tr>
<td>配置管理</td>
<td>config</td>
<td>Nacos</td>
</tr>
<tr>
<td>广播系统消息</td>
<td>bus</td>
<td>Bus</td>
</tr>
<tr>
<td>分布式事务</td>
<td></td>
<td>Seata</td>
</tr>
<tr>
<td>链路追踪</td>
<td>ZipKin</td>
<td>**SkyWalking/**鹰眼</td>
</tr>
</tbody>
</table>
<h2 id="模式" tabindex="-1"><a class="header-anchor" href="#模式" aria-hidden="true">#</a> 模式</h2>
<p>B2B2C(如：耐克入住淘宝卖鞋子给用户)</p>
<p>C2C(如: 耐克的官网直接卖鞋子给用户)</p>
<h3 id="微服务需要满足的三个指标" tabindex="-1"><a class="header-anchor" href="#微服务需要满足的三个指标" aria-hidden="true">#</a> 微服务需要满足的三个指标</h3>
<ol>
<li>
<p>高可用（服务一直可以用，n个9，6个9 99.9999%也就是一年以内允许宕机的时间为31.536秒）、</p>
</li>
<li>
<p>高性能（响应速度，3s以内）</p>
</li>
<li>
<p>高并发（系统的承载能力，用户同时访问的系统）</p>
<ol>
<li>垂直扩展：升级配置，有性能瓶颈</li>
<li>水平扩张：添加服务器进行负载均衡（轮询、权重、hash一致）</li>
</ol>
</li>
</ol>
<h2 id="微服务需要解决的四个问题" tabindex="-1"><a class="header-anchor" href="#微服务需要解决的四个问题" aria-hidden="true">#</a> 微服务需要解决的四个问题</h2>
<ol>
<li>服务与服务之间如何访问</li>
<li>服务与服务之间如何通信</li>
<li>服务挂了怎么办</li>
<li>服务如何治理</li>
</ol>
<h2 id="cap定理" tabindex="-1"><a class="header-anchor" href="#cap定理" aria-hidden="true">#</a> CAP定理</h2>
<p>C: 一致性（强一致性）: 要么都成功，要么都失败，事务的原子性。（弱一致：顺序一致、最终一致）</p>
<p>A: 可用性：高可用、高性能，服务一致可以使用，正常的响应时间</p>
<p>P: 分区容错性：如果其中一个服务出现了故障，仍然可以提供服务</p>
<p>如mysql服务进行了分区之后有多个服务，如果一台出现了故障，则转移到其它的备用服务进行数据处理。但是这样的话就无法保证数据的强一致性，即要么是强一致系统，要么是分区容错的系统。</p>
<p>故CAP定理三个要素最多只能同时实现两点，不可能三者兼顾。然而分布式系统已经保重了分区容错性，因此只有两种系统:</p>
<p>CP系统：强一致系统，金融系统</p>
<p>AP系统: 高可用系统，互联网系统</p>
<h2 id="base理论" tabindex="-1"><a class="header-anchor" href="#base理论" aria-hidden="true">#</a> BASE理论</h2>
<p>因为无法达到强一致性，故可以采用适当的方法达到最终一致性。</p>
<p>基本可用（保证核心可以用）、软状态（等待同步的过程）、最终一致性（最终达到一致）</p>
<h2 id="微服务的拆分" tabindex="-1"><a class="header-anchor" href="#微服务的拆分" aria-hidden="true">#</a> 微服务的拆分</h2>
<p>为了解耦</p>
<p>领域驱动设计</p>
<p>spring Cloud 是一种编程模型，微服务开发的一种标准，一系列的接口。</p>
<p>spring Cloud Netflix, spring Cloud Alibaba都是springCloud模型的的一种具体实现。</p>
<h2 id="一、版本对应" tabindex="-1"><a class="header-anchor" href="#一、版本对应" aria-hidden="true">#</a> 一、版本对应</h2>
<table>
<thead>
<tr>
<th>Spring Boot</th>
<th>Spring Cloud</th>
<th>Spring Cloud Alibaba</th>
</tr>
</thead>
<tbody>
<tr>
<td>2.1.x</td>
<td>Greenwich</td>
<td>0.9.x</td>
</tr>
<tr>
<td>2.0.x</td>
<td>Finchley</td>
<td>0.2.x</td>
</tr>
<tr>
<td>1.5.x</td>
<td>Edgware</td>
<td>0.1.x</td>
</tr>
<tr>
<td>1.5.x</td>
<td>Dalston</td>
<td>0.1.x</td>
</tr>
</tbody>
</table>
<h2 id="二、springcloud-vs-springcloudalibaba" tabindex="-1"><a class="header-anchor" href="#二、springcloud-vs-springcloudalibaba" aria-hidden="true">#</a> 二、SpringCloud vs SpringCloudAlibaba</h2>
<p>| 基于SpringBoot  2.x | Finchley | SpringCloudAlibaba |
| --- |--- | --- | --- |
| 版本 | Finchley  | 2.x |
| 服务注册与发现  | Eureka  | Nacos |
| 路由网关 | Gateway(zuul-Dalston版本)  | Gateway |
| 配置中心 | config |  Nacos  |
| 熔断机制(限流、 降级、重试)  | Hystix |Sentinel  |
| 消息总线  | Bus | Bus |
| 链路追踪  | Sleuth | Sleuth |
| 聚合监控  | Turbine  | Turbine |
| 服务消费 | Feign/Ribbon  | Nacos |
|负载均衡| Feign/Ribbon| Dubbo|</p>
<h2 id="三、启动顺序" tabindex="-1"><a class="header-anchor" href="#三、启动顺序" aria-hidden="true">#</a> 三、启动顺序</h2>
<p>dependences(依赖管理) &gt; config(配置中心) &gt; eureka(服务注册与发现) &gt; zipkin(链路追踪) &gt;</p>
<p>分布式配置中心 &gt; 服务注册中心  &gt; 服务提供者 &gt; 服务消费者 &gt; API网关</p>
<h2 id="四、服务注册中心-eureka" tabindex="-1"><a class="header-anchor" href="#四、服务注册中心-eureka" aria-hidden="true">#</a> 四、服务注册中心(Eureka)</h2>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>// pom.xml 配置
&lt;dependency>
  &lt;groupId>org.springframework.cloud&lt;/groupId>
  &lt;artifactId>spring-cloud-starter-netflix-eureka-server&lt;/artifactId>
&lt;/dependency>
    
// yml 配置
spring:
 application:
   name: hello-spring-cloud-eureka
server:
 port: 8761
eureka:
 instance:
   hostname: localhost
 client:
   registerWithEureka: false
   fetchRegistry: false
   serviceUrl:
     defaultZone: http://${eureka.instance.hostname}:${server.port}/eureka/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="五、分布式配置中心" tabindex="-1"><a class="header-anchor" href="#五、分布式配置中心" aria-hidden="true">#</a> 五、分布式配置中心</h2>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>// 服务端pom.xml配置
&lt;dependency>
  &lt;groupId>org.springframework.cloud&lt;/groupId>
  &lt;artifactId>spring-cloud-config-server&lt;/artifactId>
&lt;/dependency>
// 客户端pom.xml配置
&lt;dependency>
    &lt;groupId>org.springframework.cloud&lt;/groupId>
    &lt;artifactId>spring-cloud-starter-config&lt;/artifactId>
&lt;/dependency>

// 配置服务端yml配置
spring:
  application:
    name: hello-spring-cloud-config
  cloud:
    config:
      label: master
      server:
        git:
          uri: https://github.com/topsale/spring-cloud-config
          search-paths: respo
          username:
          password:
// 客户端yml配置
spring:
  application:
    name: hello-spring-cloud-config-client
  cloud:
    config:
      uri: http://localhost:8888
      name: config-client
      label: master
      profile: dev
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="六、服务提供者" tabindex="-1"><a class="header-anchor" href="#六、服务提供者" aria-hidden="true">#</a> 六、服务提供者</h2>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>// ribbon服务提供者
&lt;dependency>
  &lt;groupId>org.springframework.cloud&lt;/groupId>
  &lt;artifactId>spring-cloud-starter-netflix-eureka-server&lt;/artifactId>
&lt;/dependency>
// yml配置
eureka:
  client:
    serviceUrl:
      defaultZone: http://localhost:8761/eureka/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="七、服务消费者" tabindex="-1"><a class="header-anchor" href="#七、服务消费者" aria-hidden="true">#</a> 七、服务消费者</h2>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>// ribbon服务消费
&lt;dependency>
    &lt;groupId>org.springframework.cloud&lt;/groupId>
    &lt;artifactId>spring-cloud-starter-netflix-ribbon&lt;/artifactId>
&lt;/dependency>
//Feign服务消费
&lt;dependency>
    &lt;groupId>org.springframework.cloud&lt;/groupId>
    &lt;artifactId>spring-cloud-starter-openfeign&lt;/artifactId>
&lt;/dependency>
// yml配置
eureka:
  client:
    serviceUrl:
      defaultZone: http://localhost:8761/eureka/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="八、api网关" tabindex="-1"><a class="header-anchor" href="#八、api网关" aria-hidden="true">#</a> 八、API网关</h2>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>// zuul配置
&lt;dependency>
    &lt;groupId>org.springframework.cloud&lt;/groupId>
    &lt;artifactId>spring-cloud-starter-netflix-zuul&lt;/artifactId>
&lt;/dependency>

// yum 配置
zuul:
  routes:
    api-a:
      path: /api/a/**
      serviceId: hello-spring-cloud-web-admin-ribbon
    api-b:
      path: /api/b/**
      serviceId: hello-spring-cloud-web-admin-feign
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="九、熔断器防止服务雪崩" tabindex="-1"><a class="header-anchor" href="#九、熔断器防止服务雪崩" aria-hidden="true">#</a> 九、熔断器防止服务雪崩</h2>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>// pom 配置
&lt;dependency>
    &lt;groupId>org.springframework.cloud&lt;/groupId>
    &lt;artifactId>spring-cloud-starter-netflix-hystrix&lt;/artifactId>
&lt;/dependency>
// yum配置
feign:
  hystrix:
    enabled: true
// application里面添加@EnableHystrix注解，调用方法上面增加@HystrixCommand(fallbackMethod = "hiError")注解
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="十、熔断器仪表盘监控" tabindex="-1"><a class="header-anchor" href="#十、熔断器仪表盘监控" aria-hidden="true">#</a> 十、熔断器仪表盘监控</h2>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>// pom.xml配置
&lt;dependency>
    &lt;groupId>org.springframework.cloud&lt;/groupId>
    &lt;artifactId>spring-cloud-starter-netflix-hystrix-dashboard&lt;/artifactId>
&lt;/dependency>
// application中添加@EnableHystrixDashboard注解
//创建 hystrix.stream 的 Servlet 配置
@Configuration
public class HystrixDashboardConfiguration {

    @Bean
    public ServletRegistrationBean getServlet() {
        HystrixMetricsStreamServlet streamServlet = new HystrixMetricsStreamServlet();
        ServletRegistrationBean registrationBean = new ServletRegistrationBean(streamServlet);
        registrationBean.setLoadOnStartup(1);
        registrationBean.addUrlMappings("/hystrix.stream");
        registrationBean.setName("HystrixMetricsStreamServlet");
        return registrationBean;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="十一、服务链路追踪" tabindex="-1"><a class="header-anchor" href="#十一、服务链路追踪" aria-hidden="true">#</a> 十一、服务链路追踪</h2>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>// pom.xml 配置
&lt;dependency>
    &lt;groupId>io.zipkin.java&lt;/groupId>
    &lt;artifactId>zipkin&lt;/artifactId>
&lt;/dependency>
&lt;dependency>
    &lt;groupId>io.zipkin.java&lt;/groupId>
    &lt;artifactId>zipkin-server&lt;/artifactId>
&lt;/dependency>
&lt;dependency>
    &lt;groupId>io.zipkin.java&lt;/groupId>
    &lt;artifactId>zipkin-autoconfigure-ui&lt;/artifactId>
&lt;/dependency>
// aplication添加@EnableZipkinServer注解
// yml配置
management:
  metrics:
    web:
      server:
        auto-time-requests: false
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="十二、spring-boot-admin" tabindex="-1"><a class="header-anchor" href="#十二、spring-boot-admin" aria-hidden="true">#</a> 十二、Spring Boot Admin</h2>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>// 服务端pom.xml依赖
&lt;dependency>
    &lt;groupId>org.jolokia&lt;/groupId>
    &lt;artifactId>jolokia-core&lt;/artifactId>
&lt;/dependency>
&lt;dependency>
    &lt;groupId>de.codecentric&lt;/groupId>
    &lt;artifactId>spring-boot-admin-starter-server&lt;/artifactId>
&lt;/dependency>
// 客户端pom.xml依赖
&lt;dependency>
    &lt;groupId>org.jolokia&lt;/groupId>
    &lt;artifactId>jolokia-core&lt;/artifactId>
&lt;/dependency>
&lt;dependency>
    &lt;groupId>de.codecentric&lt;/groupId>
    &lt;artifactId>spring-boot-admin-starter-client&lt;/artifactId>
&lt;/dependency>
// application添加@EnableAdminServer依赖
// 服务端yml配置
management:
  endpoint:
    health:
      show-details: always
  endpoints:
    web:
      exposure:
        include: health,info
// 客户端yml配置
spring:
  boot:
    admin:
      client:
        url: http://localhost:8084
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="十三、其他" tabindex="-1"><a class="header-anchor" href="#十三、其他" aria-hidden="true">#</a> 十三、其他</h2>
<ul>
<li>
<p>Spring Cloud Bus：事件、消息总线，用于在集群（例如，配置变化事件）中传播状态变化，可与Spring Cloud Config联合实现热部署。</p>
</li>
<li>
<p>Spring Cloud Netflix：针对多种Netflix组件提供的开发工具包，其中包括Eureka、Hystrix、Zuul、Archaius等。</p>
</li>
<li>
<p>Netflix Eureka：云端负载均衡，一个基于REST 的服务，用于定位服务，以实现云端的负载均衡和中间层服务器的故障转移。</p>
</li>
<li>
<p>Netflix Hystrix：容错管理工具，旨在通过控制服务和第三方库的节点,从而对延迟和故障提供更强大的容错能力。</p>
</li>
<li>
<p>Netflix Zuul：边缘服务工具，是提供动态路由，监控，弹性，安全等的边缘服务。</p>
</li>
<li>
<p>Netflix Archaius：配置管理API，包含一系列配置管理API，提供动态类型化属性、线程安全配置操作、轮询框架、回调机制等功能。</p>
</li>
<li>
<p>Spring Cloud for Cloud Foundry：通过Oauth2协议绑定服务到CloudFoundry，CloudFoundry是VMware推出的开源PaaS云平台。</p>
</li>
<li>
<p>Spring Cloud Sleuth：日志收集工具包，封装了Dapper,Zipkin和HTrace操作。</p>
</li>
<li>
<p>Spring Cloud Data Flow：大数据操作工具，通过命令行方式操作数据流。</p>
</li>
<li>
<p>Spring Cloud Security：安全工具包，为你的应用程序添加安全控制，主要是指OAuth2。</p>
</li>
<li>
<p>Spring Cloud Consul：封装了Consul操作，consul是一个服务发现与配置工具，与Docker容器可以无缝集成。</p>
</li>
<li>
<p>Spring Cloud Zookeeper：操作Zookeeper的工具包，用于使用zookeeper方式的服务注册和发现。</p>
</li>
<li>
<p>Spring Cloud Stream：数据流操作开发包，封装了与Redis,Rabbit、Kafka等发送接收消息。</p>
</li>
<li>
<p>Spring Cloud CLI：基于 SpringBoot CLI，可以让你以命令行方式快速建立云组件。</p>
</li>
</ul>
</div></template>


