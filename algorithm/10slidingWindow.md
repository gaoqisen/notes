---
title: 10_滑动窗口
date: 2023-04-27 22:16:40
tags: algorithm
categories: study
keywords: sliding window
description: 滑动窗口学习
---

## 一、基本概念

如果需要获取一个数组里面任意一个right下标和left下标中间值的最大值，right和left都是递增，left不会大于right，这个递增的过程就是窗口的滑动。

1、每次都遍历计算最大值

2、利用双端队列实现，更新时间复杂度O(n), 获取最大值时间复杂度O(1)

- 扩窗口（right++）：从大到小的双端队列，从尾部添加元素a，如果当前尾部元素b小于当前元素a则弹出当前尾部元素a后添加元素b
- 缩窗口（left++）：当前下标的值存在则弹出

## 二、固定窗口w划过arr

### 1、题目

假设一个固定大小为W的窗口，依次划过arr，返回每一次滑出状况的最大值

例如，arr = [4,3,5,4,3,3,6,7], W = 3

返回：[5,5,5,4,6,7]

### 2、代码

```java
    public static int[] getMaxWindowNum(int[] arr, int w) {
        if(arr == null || w < 1 || arr.length < w) {
            return null;
        }
        int n = arr.length;
        int[] res = new int[n - w + 1];
        // 存储最大值的下标
        LinkedList<Integer> doubleQueue = new LinkedList<>();
        int index = 0;
        for (int i = 0; i < n; i++) {
            // 弹出队列里面值小于等于当前值的元素
            while (!doubleQueue.isEmpty() && arr[doubleQueue.peekLast()] <= arr[i]) {
                doubleQueue.pollLast();
            }
            // 往双端队列后面添加值
            doubleQueue.addLast(i);

            // 窗口左边往右移动
            if(!doubleQueue.isEmpty() && doubleQueue.peekFirst() == i - w) {
                doubleQueue.pollFirst();
            }
            // 窗口滑动到w位置开始计数(窗口：0 ～ w)
            if(i >= w - 1 && !doubleQueue.isEmpty()) {
                res[index++] = arr[doubleQueue.peekFirst()];
            }
        }
        return res;
    }
```

## 三、

### 1、题目

给定一个整型数组arr，和一个整数num。

某个arr中的子数组sub，如果想达标，必须满足：sub中最大值 – sub中最小值 <= num

返回arr中达标子数组的数量

### 2、代码

1、如果l～r范围的值达标，则l～r范围上的子数组都达标

2、l～r范围不达标，则l往左，r往右的子数组都不达标

3、利用两个双端队列记录最大值和最小值，

```java
public static int num(int[] arr, int sum) {
        if(arr == null || arr.length < 1 || sum < 0) {
            return 0;
        }

        int n = arr.length;
        LinkedList<Integer> maxQueue = new LinkedList<>();
        LinkedList<Integer> minQueue = new LinkedList<>();
        // 记录总次数
        int count = 0;
        // 记录右边的下标
        int right = 0;
        for (int left = 0; left < n; left++) {
            // 右下标不能越界
            while (right < n) {
                // 弹出队列右边的值(队列中小于等于当前元素的值弹出)
                while (!maxQueue.isEmpty() && arr[maxQueue.peekLast()] <= arr[right]) {
                    maxQueue.pollLast();
                }
                maxQueue.addLast(right);
                // 弹出队列右边的值(队列中大于等于当前元素的值弹出)
                while (!minQueue.isEmpty() && arr[minQueue.peekLast()] >= arr[right]) {
                    minQueue.pollLast();
                }
                minQueue.addLast(right);
                
                // 判断当前窗口最大值-最小值 <= sum
                if(!maxQueue.isEmpty() && !minQueue.isEmpty()
                        && arr[maxQueue.peekFirst()] - arr[minQueue.peekFirst()] <= sum) {
                    right++;
                }
                // 不达标则结束遍历
                else {
                    break;
                }
            }
            // 计算当前窗口下面的所有子数组都达标
            count += right - left;
            // 左边的值往右移动（过期处理）
            if(!maxQueue.isEmpty() && maxQueue.peekFirst() == left) {
                maxQueue.pollFirst();
            }
            if(!minQueue.isEmpty() && minQueue.peekFirst() == left) {
                minQueue.pollFirst();
            }
        }
        return count;
    }
```

## 三、加油站的良好出发点问题

### 1、题目

给定加油站剩余的油数数组gas，以及到下一个加油站需要消耗油的数组cost。计算从每个节点出发是否能跑完所有加油站.

在一条环路上有 n 个加油站，其中第 i 个加油站有汽油 gas[i] 升。

你有一辆油箱容量无限的的汽车，从第 i 个加油站开往第 i+1 个加油站需要消耗汽油 cost[i] 升。你从其中的一个加油站出发，开始时油箱为空。

给定两个整数数组 gas 和 cost ，如果你可以绕环路行驶一周，则返回出发时加油站的编号，否则返回 -1 。如果存在解，则 保证 它是 唯一 的。

https://leetcode.cn/problems/gas-station/

### 2、代码

1、当前加油站gas-cost<0则没办法跑完，利用一个数组单独记录差集（简化）

2、从当前元素出发，往后跑时计算累加。 判断累加和小于0则无法跑完（环形方式计算累加和变为2倍数组）

- 当前元素往后的累加和就是2倍数组移动窗口值减去前一个数的值
- 主要值里面存在一个负数则无法跑完所有加油站

```java
    /**
     * 获取一种从当前路径出发能跑完所有加油站的节点
     *
     * @param gas  加油站里能加到的油
     * @param cost 到加油站需要消耗的油
     * @return 能跑完所有加油站的节点
     */
    public static int canCompleteCircuit(int[] gas, int[] cost) {
        boolean[] res = goodArray(gas, cost);
        // 直接获取第一个值返回
        for (int i = 0; i < gas.length; i++) {
            if(res[i]) {
                return i;
            }
        }
        return -1;
    }

    /**
     * 通过滑动窗口获取所有节点是否能跑完所有的加油站
     *
     * @param g 加油站能加到的油
     * @param c 到加油站需要消耗的油
     * @return 所有节点是否能跑完所有加油站
     */
    public static boolean[] goodArray(int[] g, int[] c) {
        int n = g.length;
        // 长度乘以2
        int m = n << 1;
        int[] arr = new int[m];

        // 初始化数组的值，当前能加到的油减去消耗的为负数则不可能跑完所有加油站
        for (int i = 0; i < n; i++) {
            arr[i] = g[i] - c[i];
            arr[i + n] = g[i] - c[i];
        }
        // 计算累加和并赋值
        for (int i = 1; i < m; i++) {
            arr[i] += arr[i - 1];
        }

        // 利用双端队列获取最小值
        LinkedList<Integer> w = new LinkedList<>();
        for (int i = 0; i < n; i++) {
            while (!w.isEmpty() && arr[w.peekLast()] >= arr[i]) {
                w.pollLast();
            }
            w.addLast(i);
        }

        boolean[] ans = new boolean[n];
        for (int offset = 0, i = 0, j = n; j < m; offset = arr[i++], j++) {
            // 蚝油不为0，最小的薄弱点不为负数则可以跑完
            if(arr[w.peekFirst()] - offset >= 0) {
                ans[i] = true;
            }
            // 窗口左边过期
            if(w.peekFirst() == i) {
                w.pollFirst();
            }
            // 窗口右边过期，队列里面不是最小的值则弹出
            while (!w.isEmpty() && arr[w.peekLast()] >= arr[j]) {
                w.pollLast();
            }
            // 往队列里面添加最小值下标
            w.addLast(j);
        }
        return ans;
    }
```

总结：判断求解行为和窗口行为相似则可以用滑动窗口方式求解。关键点是利用双倍前缀和来求解，求解过程就是相似

## 四、货币数组求aim

### 1、题目

arr是货币数组，其中的值都是正数。再给定一个正数aim。

每个值都认为是一张货币，返回组成aim的最少货币数

注意：因为是求最少货币数，所以每一张货币认为是相同或者不同就不重要了

### 2、代码

将货币数组转化为面值数组和张数数组（收集张数去重）后处理

```java
    /**
     * 获取面值数组到目标值的最小张数
     *
     * 方案一：动态规划
     *
     * @param arr 面值数组
     * @param aim 目标值
     * @return 最小张数
     */
    public static int getMinZhangDp(int[] arr, int aim) {
        if(aim < 1) {
            return 0;
        }
        // 去重
        Info info = getInfo(arr);
        int[] coins = info.coins;
        int[] zhangs = info.zhangs;
        int n = coins.length;
        int[][] dp = new int[n + 1][aim + 1];

        // 基础条件赋值
        dp[n][0] = 0;
        for (int i = 1; i <= aim; i++) {
            dp[n][i] = Integer.MAX_VALUE;
        }
        // 遍历下标
        for (int index = n - 1; index >= 0 ; index--) {
            // 遍历剩余钱数
            for (int rest = 0; rest <= aim; rest++) {
                dp[index][rest] = dp[index + 1][rest];
                // 遍历张数一直到不超过目标值，以及达到张数最大值
                for (int zhang = 1; zhang * coins[index] <= aim && zhang <= zhangs[index]; zhang++) {
                    // 剩余的钱不够了
                    if(rest - zhang * coins[index] < 0) {
                        continue;
                    }
                    // 值无效
                    if(dp[index + 1][rest - zhang * coins[index]] == Integer.MAX_VALUE) {
                        continue;
                    }
                    // 取最小值进行赋值
                    dp[index][rest] = Math.min(dp[index][rest],  zhang + dp[index + 1][rest - zhang * coins[index]]);
                }
            }
        }
        return dp[0][aim];
    }

    /**
     * 获取面值数组到目标值的最小张数
     *
     * 方案二：优化版本动态规划+滑动窗口（解决枚举行为）
     *
     * @param arr 面值数组
     * @param aim 目标值
     * @return 最小张数
     */
    public static int getMinZhangDpWindow(int[] arr, int aim) {
        if(aim < 1) {
            return 0;
        }
        // 去重
        Info info = getInfo(arr);
        int[] coins = info.coins;
        int[] zhangs = info.zhangs;
        int n = coins.length;
        int[][] dp = new int[n + 1][aim + 1];

        // 基础条件赋值
        dp[n][0] = 0;
        for (int i = 1; i <= aim; i++) {
            dp[n][i] = Integer.MAX_VALUE;
        }

        // 利用窗口内最小值更新结构
        for (int i = n - 1; i >= 0; i--) {
            // 分组遍历面值
            for (int mod = 0; mod < Math.min(aim + 1, coins[i]); mod++) {
                LinkedList<Integer> w = new LinkedList<>();
                w.add(mod);
                dp[i][mod] = dp[i + 1][mod];

                // 面值累加往后（例：当前面值3，则3，6，9）
                // 当前面值x： r = mod + x， mod + 2*x， mod + 3*x
                for (int r = mod + coins[i]; r <= aim ; r += coins[i]) {
                    // 最小值的窗口更新结构, 右边的值往后走
                    while (!w.isEmpty() && (
                            // 无效值
                            dp[i + 1][w.peekLast()] == Integer.MAX_VALUE ||
                            // 有效则加上补偿值后大于等于后面的值
                            dp[i + 1][w.peekLast()] + compensate(w.peekLast(), r, coins[i]) >= dp[i + 1][r]
                            )) {
                        w.pollLast();
                    }
                    w.addLast(r);

                    // 过期的数据左边的值往后走
                    int overdue = r - coins[i] * (zhangs[i] + 1);
                    if(overdue == w.peekFirst()) {
                        w.pollFirst();
                    }
                    // 赋值
                    dp[i][r] = dp[i + 1][w.peekFirst()] + compensate(w.peekFirst(), r, coins[i]);
                }
            }
        }

        return dp[0][aim];
    }

    // 补偿
    public static int compensate(int pre, int cur, int coin) {
        return (cur - pre) / coin;
    }


        /**
         * 通过面值数组去重，获取info信息
         *
         * @param arr 面值数组
         * @return info数据
         */
    private static Info getInfo(int[] arr) {
        // 用map存放数量以及面值
        HashMap<Integer, Integer> counts = new HashMap<>();
        for (int value : arr) {
            if (!counts.containsKey(value)) {
                counts.put(value, 1);
            } else {
                counts.put(value, counts.get(value) + 1);
            }
        }
        // 遍历map将面值和数量拆分数组里面
        int N = counts.size();
        int[] coins = new int[N];
        int[] zhangs = new int[N];
        int index = 0;
        for (Map.Entry<Integer, Integer> entry : counts.entrySet()) {
            coins[index] = entry.getKey();
            zhangs[index++] = entry.getValue();
        }
        return new Info(coins, zhangs);
    }

    private static class Info{
        private int[] coins;
        private int[] zhangs;

        public Info(int[] coins, int[] zhangs) {
            this.coins = coins;
            this.zhangs = zhangs;
        }
    }
```





