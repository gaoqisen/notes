---
title: 16_蓄水池算法
date: 2023-06-20 21:10:12
tags: algorithm
categories: study
keywords: reservoir smpling
description: 蓄水池算法学习
---

## 一、介绍

蓄水池算法是一种从一个很长的数据流中随机选择固定数量的样本的方法，而不需要事先知道数据流的总大小。

想象一下你正在建造一个容量有限的蓄水池（比如有k个位置），并且有一根水管连接到一个持续不断地提供数据的源头。你需要从源头中选取k个样本放入蓄水池中，并且保证每个样本都有被选到的机会。

初始时，蓄水池是空的。当第一个元素经过水管时，你将它放入蓄水池中，因为还没有其他选择。接下来，第二个元素来了。现在你必须决定是否将它放入蓄水池内。

这里的关键是要保证每个元素被选中的概率相等。所以，对于第i个元素（i > k），你以1/i的概率选择该元素留下，并且以k/i的概率选择替换掉蓄水池中的任意一个已有样本。

这个过程重复进行，直到所有元素都通过水管。最终，蓄水池中的k个样本就是从整个数据流中随机选择的样本。

蓄水池算法的优点在于它能够高效地处理大规模数据流，只需要遍历一次而不需要保存整个数据流。它适用于需要随机采样的场景，例如从海量用户中选择样本、从大型日志中找出随机条目等。

解决的问题：

假设有一个源源吐出不同球的机器，只有装下10个球的袋子，每一个吐出的球，要么放入袋子，要么永远扔掉如何做到机器吐出每一个球之后，所有吐出的球都等概率被放进袋子里 

## 二、思路

1、蓄水池有多大初始就装多大，入蓄水池10个位置。先出来的10个球都入水池

2、之后大样本出来的球就以10/i的概率入蓄水池

3、蓄水池里面的10个球等概率丢掉一个球

例子,球的数量为n，求3号球存活下来的概率：

当第11号球入池3号球出池概率是10/11 * 1/10 = 1/11则存活的概率是10/11

当第12号球入池3号球出池概率是10/12 * 1/10 = 1/12则存活的概率是11/12

则3号球存活的概率为1 * 10/11 * 11/12 * n-1/n = 10/n

## 三、代码

```java
    // 随机球
    public static class RandomBox{

        // 蓄水池
        private int[] bag;

        // 水池大小
        private int N;

        // 当前球的数量
        private int count;

        public RandomBox(int capacity) {
            bag = new int[capacity];
            N = capacity;
            count = 0;
        }

        // 随机获取数字
        private static int random(int max) {
            return (int)(Math.random() * max) + 1;
        }

        public void add(int num) {
            // 球数量增加
            count++;
            // 如果球数量小于等于池子大小则直接入池
            if(count <= N) {
                bag[count - 1] = num;
                return;
            }

            // 等概率随机当前数量的值，如果刚好随机到池子里则入池
            if(random(count) <= N) {
                // 随机将池子里面值丢到（直接覆盖掉）
                bag[random(N) - 1] = num;
            }
        }

        // 等概率选中的球
        public int[] choices() {
            int[] ans = new int[N];
            for (int i = 0; i < N; i++) {
                ans[i] = bag[i];
            }
            return ans;
        }
    }
```

## 四、实际应用

1、全球前一天登陆的用户的里面取100个中奖者发奖，如果不用蓄水池算法则需要获取到所有登陆的用户，如果使用蓄水池算法则可以实时取出中奖者

2、大样本数据随机取值作为抽样处理数据