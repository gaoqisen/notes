---
title: SpringCloud学习
date: 2019-3-15 15:13:52
tags: SpringCloud
categories: cloud
keywords: SpringCloud
description: SpringCloud学习

---



| 描述         | Netflix | Alibaba             |
| ------------ | ------- | ------------------- |
| 注册中心     | Eureka  | Nacos               |
| 负载均衡     | Ribbon  | Dubbo LB            |
| 通信         | Feign   | Dubbo RPC           |
| 熔断降级     | Hystrix | Sentinel            |
| 网关         | Zuul    | Dubbo PROXY/Gateway |
| 配置管理     | config  | Nacos               |
| 广播系统消息 | bus     | Bus                 |
| 分布式事务   |         | Seata               |
| 链路追踪     | ZipKin  | **SkyWalking/**鹰眼 |

## 模式

B2B2C(如：耐克入住淘宝卖鞋子给用户)

C2C(如: 耐克的官网直接卖鞋子给用户)

### 微服务需要满足的三个指标

1. 高可用（服务一直可以用，n个9，6个9 99.9999%也就是一年以内允许宕机的时间为31.536秒）、

2. 高性能（响应速度，3s以内）

3. 高并发（系统的承载能力，用户同时访问的系统）
   1. 垂直扩展：升级配置，有性能瓶颈
   2. 水平扩张：添加服务器进行负载均衡（轮询、权重、hash一致）

## 微服务需要解决的四个问题

1. 服务与服务之间如何访问
2. 服务与服务之间如何通信
3. 服务挂了怎么办
4. 服务如何治理

## CAP定理

C: 一致性（强一致性）: 要么都成功，要么都失败，事务的原子性。（弱一致：顺序一致、最终一致）

A: 可用性：高可用、高性能，服务一致可以使用，正常的响应时间

P: 分区容错性：如果其中一个服务出现了故障，仍然可以提供服务

如mysql服务进行了分区之后有多个服务，如果一台出现了故障，则转移到其它的备用服务进行数据处理。但是这样的话就无法保证数据的强一致性，即要么是强一致系统，要么是分区容错的系统。

故CAP定理三个要素最多只能同时实现两点，不可能三者兼顾。然而分布式系统已经保重了分区容错性，因此只有两种系统:

CP系统：强一致系统，金融系统

AP系统: 高可用系统，互联网系统



## BASE理论

因为无法达到强一致性，故可以采用适当的方法达到最终一致性。

基本可用（保证核心可以用）、软状态（等待同步的过程）、最终一致性（最终达到一致）



## 微服务的拆分

为了解耦

领域驱动设计





spring Cloud 是一种编程模型，微服务开发的一种标准，一系列的接口。

spring Cloud Netflix, spring Cloud Alibaba都是springCloud模型的的一种具体实现。

## 一、版本对应

| Spring Boot|	Spring Cloud	| Spring Cloud Alibaba|
| --- | --- | --- |
|2.1.x	| Greenwich |	0.9.x|
|2.0.x | Finchley	| 0.2.x|
|1.5.x	| Edgware	 | 0.1.x|
|1.5.x	| Dalston	 | 0.1.x|

## 二、SpringCloud vs SpringCloudAlibaba


| 基于SpringBoot  2.x | Finchley | SpringCloudAlibaba |
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
|负载均衡| Feign/Ribbon| Dubbo|

## 三、启动顺序

dependences(依赖管理) > config(配置中心) > eureka(服务注册与发现) > zipkin(链路追踪) > 

分布式配置中心 > 服务注册中心  > 服务提供者 > 服务消费者 > API网关

## 四、服务注册中心(Eureka)

```
// pom.xml 配置
<dependency>
  <groupId>org.springframework.cloud</groupId>
  <artifactId>spring-cloud-starter-netflix-eureka-server</artifactId>
</dependency>
    
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
```

## 五、分布式配置中心

```
// 服务端pom.xml配置
<dependency>
  <groupId>org.springframework.cloud</groupId>
  <artifactId>spring-cloud-config-server</artifactId>
</dependency>
// 客户端pom.xml配置
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-config</artifactId>
</dependency>

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
```

## 六、服务提供者

```
// ribbon服务提供者
<dependency>
  <groupId>org.springframework.cloud</groupId>
  <artifactId>spring-cloud-starter-netflix-eureka-server</artifactId>
</dependency>
// yml配置
eureka:
  client:
    serviceUrl:
      defaultZone: http://localhost:8761/eureka/
```

## 七、服务消费者

```
// ribbon服务消费
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-ribbon</artifactId>
</dependency>
//Feign服务消费
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-openfeign</artifactId>
</dependency>
// yml配置
eureka:
  client:
    serviceUrl:
      defaultZone: http://localhost:8761/eureka/
```

## 八、API网关

```
// zuul配置
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-zuul</artifactId>
</dependency>

// yum 配置
zuul:
  routes:
    api-a:
      path: /api/a/**
      serviceId: hello-spring-cloud-web-admin-ribbon
    api-b:
      path: /api/b/**
      serviceId: hello-spring-cloud-web-admin-feign
```

## 九、熔断器防止服务雪崩

```
// pom 配置
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-hystrix</artifactId>
</dependency>
// yum配置
feign:
  hystrix:
    enabled: true
// application里面添加@EnableHystrix注解，调用方法上面增加@HystrixCommand(fallbackMethod = "hiError")注解
```

## 十、熔断器仪表盘监控

```
// pom.xml配置
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-hystrix-dashboard</artifactId>
</dependency>
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
```

## 十一、服务链路追踪

```
// pom.xml 配置
<dependency>
    <groupId>io.zipkin.java</groupId>
    <artifactId>zipkin</artifactId>
</dependency>
<dependency>
    <groupId>io.zipkin.java</groupId>
    <artifactId>zipkin-server</artifactId>
</dependency>
<dependency>
    <groupId>io.zipkin.java</groupId>
    <artifactId>zipkin-autoconfigure-ui</artifactId>
</dependency>
// aplication添加@EnableZipkinServer注解
// yml配置
management:
  metrics:
    web:
      server:
        auto-time-requests: false
```

## 十二、Spring Boot Admin

```
// 服务端pom.xml依赖
<dependency>
    <groupId>org.jolokia</groupId>
    <artifactId>jolokia-core</artifactId>
</dependency>
<dependency>
    <groupId>de.codecentric</groupId>
    <artifactId>spring-boot-admin-starter-server</artifactId>
</dependency>
// 客户端pom.xml依赖
<dependency>
    <groupId>org.jolokia</groupId>
    <artifactId>jolokia-core</artifactId>
</dependency>
<dependency>
    <groupId>de.codecentric</groupId>
    <artifactId>spring-boot-admin-starter-client</artifactId>
</dependency>
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
```

## 十三、其他

- Spring Cloud Bus：事件、消息总线，用于在集群（例如，配置变化事件）中传播状态变化，可与Spring Cloud Config联合实现热部署。


- Spring Cloud Netflix：针对多种Netflix组件提供的开发工具包，其中包括Eureka、Hystrix、Zuul、Archaius等。


- Netflix Eureka：云端负载均衡，一个基于REST 的服务，用于定位服务，以实现云端的负载均衡和中间层服务器的故障转移。

- Netflix Hystrix：容错管理工具，旨在通过控制服务和第三方库的节点,从而对延迟和故障提供更强大的容错能力。

- Netflix Zuul：边缘服务工具，是提供动态路由，监控，弹性，安全等的边缘服务。

- Netflix Archaius：配置管理API，包含一系列配置管理API，提供动态类型化属性、线程安全配置操作、轮询框架、回调机制等功能。

- Spring Cloud for Cloud Foundry：通过Oauth2协议绑定服务到CloudFoundry，CloudFoundry是VMware推出的开源PaaS云平台。

- Spring Cloud Sleuth：日志收集工具包，封装了Dapper,Zipkin和HTrace操作。 

- Spring Cloud Data Flow：大数据操作工具，通过命令行方式操作数据流。

- Spring Cloud Security：安全工具包，为你的应用程序添加安全控制，主要是指OAuth2。

- Spring Cloud Consul：封装了Consul操作，consul是一个服务发现与配置工具，与Docker容器可以无缝集成。

- Spring Cloud Zookeeper：操作Zookeeper的工具包，用于使用zookeeper方式的服务注册和发现。

- Spring Cloud Stream：数据流操作开发包，封装了与Redis,Rabbit、Kafka等发送接收消息。

- Spring Cloud CLI：基于 SpringBoot CLI，可以让你以命令行方式快速建立云组件。

