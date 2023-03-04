---
title: 正则
date: 2022-11-26 15:13:52
tags: regex
categories: regex
keywords: regex
description: 整理一下正则表达式，方便记忆
---

## 一、常用正则表达式

- 在线操作：https://www.bejson.com/othertools/regex/
- 在线解析：https://jex.im/regulex/#!flags=&re=%5E(%3F%3A(%3F%3A%5C%2B%7C00)86)%3F1%5Cd%7B10%7D%24

- js需要在正则前后加/，例：`/^(?:(?:\+|00)86)?1\d{10}$/`

```javascript
// 匹配手机手机号码 +8613000000000｜008613000000000｜13000000000000
^(?:(?:\+|00)86)?1\d{10}$

// 1～999
^([1-9][0-9]{0,2}|1000)$

// 两个以上的中文字符
^[\u4e00-\u9fa5]{2,}$
```

## 二、语法分类

### 2.1 数量表示

### 2.2 字符

### 2.3 锚点/边界

### 2.4 预查断言

### 2.5 分组引用

### 2.6 特殊标志



参考：https://www.r2coding.com/#/?id=%e6%ad%a3%e5%88%99%e8%a1%a8%e8%be%be%e5%bc%8f