---
title: Netty
date: 2019-11-13 14:36:18
tags: java Netty
categories: java
keywords: Netty
description: 关于Netty的一些学习整理
---
# <center>Netty</center>

> 官网[https://netty.io/](https://netty.io/)

## 技术来源

### 解决什么问题

- 原生的Java NIO使用起来没那么方便，而且还有很多bug，Netty把它封装之后，提供了一个易于操作的使用模式和接口，方便用户使用起。

- 可以实现自己的HTTP服务器，FTP服务器，UDP服务器，RPC服务器，WebSocket服务器，Redis的Proxy服务器，MySQL的Proxy服务器等等

## 含义

### 百科定义

- Netty是由JBOSS提供的一个java开源框架，现为 Github上的独立项目。Netty提供异步的、事件驱动的网络应用程序框架和工具，用以快速开发高性能、高可靠性的网络服务器和客户端程序。


- 也就是说，Netty 是一个基于NIO的客户、服务器端编程框架，使用Netty 可以确保你快速和简单的开发出一个网络应用，例如实现了某种协议的客户、服务端应用。Netty相当于简化和流线化了网络应用的编程开发过程，例如：基于TCP和UDP的socket服务开发。


- “快速”和“简单”并不用产生维护性或性能上的问题。Netty 是一个吸收了多种协议（包括FTP、SMTP、HTTP等各种二进制文本协议）的实现经验，并经过相当精心设计的项目。最终，Netty 成功的找到了一种方式，在保证易于开发的同时还保证了其应用的性能，稳定性和伸缩性。

未完待续