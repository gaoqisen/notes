---
title: 算法学习
date: 2020-06-30 20:43:40
tags: algorithm
categories: algorithm
keywords: algorithm
description: 一些algorithm学习，后期自己努力的方向。
---

## 一、基本概念



- 数据结构: 存储数据的不同方式如：数组、链表、
- 算法: 同一个问题的不同解决方法,算法往往是针对特定数据结构的

- 时间测量：计算算法时间差、幅度不够循环来凑(扩大数据量)
- 空间测算: 数据占用的空间越小越好
- 时间复杂度(Big O): 时间复杂度为O(n)随着处理数据量的增加，处理时间也会增加。时间复杂度为O(1)表示随着处理数据的规模增大但是处理的时间没有变化。
- 对数器: 检查算法是否正确，用足够多的样本和正确的算法计算结果样本去对比被验证的算法结果(用已有的排序算法和自己写的排序算法都去处理数据，之后将处理的结果对比一下是否一致)



## 二、排序算法

### 2.1 选择排序O(n2)

最简单最没用的排序算法，有优化空间,不稳定(没用)。原理是找到最小的数把它放在最前面。

```java
public static void main(String[] args) {
        int[] arr = {8,6,5,4,7,1,2,3,2};

        // 排序算法，每次找到最小的数字放在最前面
        for (int i = 0; i< arr.length - 1; i++) {
            int minVal = i;
            // 找到最小数字的下标
            for(int j = i+1; j < arr.length; j++) {
                if(arr[j] < arr[minVal]) {
                    minVal = j;
                }
            }

            // 将最小的数字放在最前面
            int tmp = arr[minVal];
            arr[minVal] = arr[i];
            arr[i] = tmp;
        }

        // 遍历数组
        for (int i = 0; i< arr.length; i++) {
            System.out.println(arr[i]);
        }
    }
```

