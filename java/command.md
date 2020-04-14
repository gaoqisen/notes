---
title: java 的一些基础命令
date: 2020-04-13 20:50:11
tags: java base
categories: java
keywords: java base
description: 一些比较常用的java命令
---

```
// 查看java运行程序的端口
jps
// 查看java线程
jstack 23606 > test.txt
// java性能分析
jstat -gc 23606
// 查看java内存
jmap -dump:format=b,file=test.bin 23579
// 查看汇编指令
javap -c filename
// java控制台
jconsole
```