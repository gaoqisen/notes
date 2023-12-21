---
title: 网络基础
date: 2019-11-16 13:38:10
tags: netword
categories: netword
keywords: base
description: 关于网络基础的一些学习整理
---
# <center>网络基础</center>

## 计算机网络的定义

> 计算机技术与通行技术的结合产生了计算机网络

## 协议三要素

- 语法：实体之间交换信息的格式和结构，或者定义实体之间传输信号的电平等
- 语义：定义实体之间交换的信息中需要发送那些控制信息、信息的含义、不同含义的控制信息、接收信息端如何响应等。
- 时序：定义实体之间交换信息的顺序以及如何匹配或适应彼此的速度

## 计算机网络分类

### 按照范围

- 个域网：个人设备通过无线通信技术构成小范围的网络。
- 局域网：办公室、办公楼、厂区、校园等局部区域内的网络。
- 城域网：覆盖一个城市的网络通常在5-10km。
- 广域网：范围几十到几千米，跨越很大的地理空间，可以实现异地城域网。

### 按拓扑结构分类

- 星形拓扑结构：一个中央点，主机通过点对点通信链路与中央节点链接。
    ![https://gaoqisen.github.io/GraphBed/201911/20191116135033.png](https://gaoqisen.github.io/GraphBed/201911/20191116135033.png)
- 总线型拓扑结构：一条广播信道作为公共传输介质（总线），所有节点与总线链接，节点之间的通信通过共享总线进行
    ![https://gaoqisen.github.io/GraphBed/201911/20191116135700.png](https://gaoqisen.github.io/GraphBed/201911/20191116135700.png) 
- 环形拓扑结构：通信链路将所有的节点连成一个闭合环。
    ![https://gaoqisen.github.io/GraphBed/201911/20191116135233.png](https://gaoqisen.github.io/GraphBed/201911/20191116135233.png) 
- 网状拓扑图：多条链路与不同的节点直接链接。
    ![https://gaoqisen.github.io/GraphBed/201911/20191116135413.png](https://gaoqisen.github.io/GraphBed/201911/20191116135413.png) 
- 树形拓扑图：是总线和星形拓扑网络的扩展。
    ![https://gaoqisen.github.io/GraphBed/201911/20191116140135.png](https://gaoqisen.github.io/GraphBed/201911/20191116140135.png)
- 混合拓扑图：由两种以上拓扑图混合链接而成的网络。

### 交换方式

- 电路交换网络
- 报文交换网络
- 分组交换网络

### 网络用户属性

- 共用网：国家或企业出资建设，面向公众提供免费或收费服务的网络
- 私有网：由某个组织（政府或者企业等）出资建设，专门面向组织内部业务提供的网络服务

## 网络结构

* 网络边缘: 链接到网络上的所有端系统构成了边缘网络
* 接入网络: 实现了网络边缘的端系统与网络核心链接与接入的网络
    - 电话拨号接入
    - 非对称数字用户线路ADSL
    - 混合光纤同轴电缆HFC接入网络
    - 局域网络
    - 移动接入网络
* 网络核心: 由通信链路互连的分组交换设备构成的网络，是实现网络边缘中主机之间的数据中继与转发。

## 数据交换

> 实现网络核心数据中继与转发的关键技术是数据交换

- 电路交
    - 建立电路
    - 传输数据
    - 拆除电路
- 报文交换: 发送方把要发送的消息加上一些接收主机的信息等，构成一个完整的报文，然后已报文为单位在交换网络的各个节点之间已存储/转发的方式传送到接收主机
- 分组交换：把报文分成较小的数据块传输，接收方接收后还原报文
    - 优点
        - 交换设备存储容量要求低
        - 交换速度快
        - 可靠传输效率高
        - 更加公平
    - 长度的确认：
        - 分组长度与延迟时间
        - 分组长度与误码率
        
## 网络性能

- 速率／带宽：网络单位时间内传送的数据量，传输的快慢就是传输速率又是也叫带宽。
- 时延：数据从网络中的一个节点到另一个节点所需要的时间，又叫延迟。
    - 节点处理时延
    - 排队时延
    - 传输时延
    - 传播时延
- 时延带宽积：物理链路传播时延与链路带宽的乘积
- 丢包率：网络拥塞是会造成丢包
- 吞吐量：在单位时间内原主机通过网络向目的主机实际送达的数据量

## 计算机网络分层体系结构

> 计算机网络所划分的层次以及各层协议的集合成为计算机网络体系结构。

- OSI参考模型
- TCP/IP参考模型
