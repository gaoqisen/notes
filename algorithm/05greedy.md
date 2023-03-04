---
title: 05_贪心算法
date: 2023-02-11 23:33:40
tags: algorithm
categories: study
keywords: greedy
description: 贪心算法学习
---

> 用一种局部最功利的标准，做出当前看起来最好的选择。
>
> 难点在于证明局部最功利的标准可以获得全局最优解。
>
> 可以用暴力法+大样本数据检验贪心算法，策略证明很难。

## 一、给定字符串数组获取字典序最小的结果

```java
    /**
     * 获取最低字典序
     */
    public static String getLowestLexicography(String[] arr) {
        if(arr == null || arr.length < 1) {
            return "";
        }
      
        // (a+b).compareTo(b+a)可以， (a.compareTo(b)不可以
        Arrays.sort(arr, (a, b) -> (a+b).compareTo(b+a));

        StringBuilder builder = new StringBuilder();
        for (String s : arr) {
            builder.append(s);
        }
        return builder.toString();
    }
```

每个字典序排序之后就是全局的最优解。 用暴力+大样本检测

## 二、会议室最大宣讲次数

### 题目

一些项目要占用一个会议室宣讲，会议室不能同时容纳两个项目的宣讲。给你每一个项目开始的时间和结束的时间你来安排宣讲的日程，要求会议室进行的宣讲的场次最多。返回最多的宣讲场次。

### 思路

贪心策略：每次都选择结束时间最小的会议

1、根据结束时间排序（谁结束时间早谁排在前面）

2、判断第一个会议结束后那个会议的开始时间可以立马开始的就开始。

### 代码

```java
    public static class Program {
        public int start;
        public int end;

        public Program(int start, int end) {
            this.start = start;
            this.end = end;
        }
    }
    
    public static int getBestArrange(Program[] programs){
        Arrays.sort(programs, (a, b) -> a.end - b.end);
        
        int sum = 0;
        int currentEnd = 0;
        for (Program program : programs) {
            if(currentEnd <= program.start) {
                sum++;
                currentEnd = program.end;
            }
        }
        return sum;
    }
```



## 三、金条分割的最小代价

### 题目

一块金条切成两半，是需要花费和长度数值一样的铜板的。

比如长度为20的金条，不管怎么切，都要花费20个铜板。 一群人想整分整块金条，怎么分最省铜板? 

例如,给定数组{10,20,30}，代表一共三个人，整块金条长度为60，金条要分成10，20，30三个部分。

如果先把长度60的金条分成10和50，花费60; 再把长度50的金条分成20和30，花费50;一共花费110铜板。但如果先把长度60的金条分成30和30，花费60;再把长度30金条分成10和20， 花费30;一共花费90铜板。

输入一个数组，返回分割的最小代价。 

### 思路

1、准备一个小根堆，将数据放入

2、每次弹出两个数，累加后放回。所有两个数累加的和就是最小分割代价

### 代码

```java
    public static int getLessMoneySplitGold(int[] arr) {
        PriorityQueue<Integer> queue = new PriorityQueue<>();
        for (int i : arr) {
            queue.add(i);
        }

        int sum = 0;
        while (queue.size() > 1) {
            int val = queue.poll() + queue.poll();
            queue.add(val);
            sum += val;
        }
        return sum;
    }
```



## 四、最大项目收益

### 题目

输入: 正数数组costs、正数数组profits、正数K、正数M

costs[i]表示i号项目的花费

profits[i]表示i号项目在扣除花费之后还能挣到的钱(利润)

K表示你只能串行的最多做k个项目

M表示你初始的资金

说明: 每做完一个项目，马上获得的收益，可以支持你去做下一个项目。不能并行的做项目。

输出：你最后获得的最大钱数。

### 思路

初始资金符合最大收益的项目先做即可

1、将项目按照花费组成小根堆（全部）、大根堆按照利润区分

2、判断小根堆里符合初始资金的，放入大根堆

3、项目最大收益就是大根堆的第一个项目

### 代码

```java
    /**
     * 获取项目最大收益
     *
     * @param k 项目次数
     * @param w 初始资金
     * @param profits 利润
     * @param capital 资金
     * @return 最大项目收益
     */
    public static int getMaximizedCapital(int k, int w, int[] profits, int[] capital) {
        // 将项目放入小根堆，按照资金从小到大
        PriorityQueue<Program> capitalQueueMin = new PriorityQueue<>((a, b) -> a.c - b.c);

        for (int i = 0; i < profits.length; i++) {
            capitalQueueMin.add(new Program(profits[i], capital[i]));
        }

        // 大根堆放利润，从大到小
        PriorityQueue<Program> profitsQueueMax = new PriorityQueue<>((a, b) -> b.p - a.p);
        for(int i = 0; i < k; i++) {
            // 有项目并且资金小于等于当前资金时，则将项目放入大根堆
            while (!capitalQueueMin.isEmpty() && capitalQueueMin.peek().c <= w) {
                profitsQueueMax.add(capitalQueueMin.poll());
            }

            // 无项目可做
            if(profitsQueueMax.isEmpty()) {
                break;
            }

            // 最大收益的项目就是第一个大根堆弹出的项目
            w += profitsQueueMax.poll().c;
        }
        return w;
    }


    public static class Program {
        public int p;
        public int c;

        public Program(int p, int c) {
            this.p = p;
            this.c = c;
        }
    }
```

## 五、墙和街道的最少放灯数量

### 题目

给定一个字符串str，只由‘X’和‘.’两种字符构成。‘X’表示墙，不能放灯，也不需要点亮‘.’表示居民点，可以放灯，需要点亮如果灯放在i位置，可以让i-1，i和i+1三个位置被点亮返回如果点亮str中所有需要点亮的位置，至少需要几盏灯。

### 思路

1、遍历字符串，如果当前字符是墙（x）

- 则跳转到i+1位置

2、遍历字符串，如果当前字符是街道（.）

- 如果i+1位置是墙（x），则i位置必须放灯。如果不放灯i后面是墙那么当前位置就无法照亮（灯+1，i+2）
- 如果i+1位置是街道（.）,在进行细分，i+2是墙（x），则i+1或者i位置上必须放灯（灯+1， i+3）
- 如果i+1位置是街道（.）,在进行细分，i+2也是墙街道（.），则在i+1上面放灯，i和i+2都照亮了（灯+1，i+3）

### 代码

```java
    public static int getMinLight(String str) {
        if(str == null || str.isEmpty()) {
            return 0;
        }

        char[] chars = str.toCharArray();
        int light = 0;
        for (int i = 0; i < chars.length; i++) {
            if(chars[i] == 'X') {
                continue;
            } else {
                light++;
                if(i + 1 == chars.length) {
                    break;
                }
                if (chars[i + 1] == 'X') {
                    i += 1;
                } else {
                    i += 2;
                }
            }
        }
        return light;
    }
```

总结：遇到贪心题目用排序、堆或者其他数据结构实现，用暴力+大样本验证即可