---
title: 11_单调栈
date: 2023-05-03 14:16:40
tags: algorithm
categories: study
keywords: monotoonous stack
description: 单调栈学习
---

## 一、单调栈

主要解决获取数组中左边最近的小于（或大于）当前值的元素和获取右边最近的小于（或大于）当前值的元素

### 1、思路

1、利用栈实现，将元素放入栈中（从小到大）。

2、放入的的时候判断放入值和顶部值，当前值小于顶部值则弹出顶部值。弹出的值则记录，弹出值最近的左边的值就是弹出后的最大值，右边值就是当前值放入的值

3、处理完成后在遍历栈里剩余的值。由于是单独弹出的，没有放入的值则右边的最小值没有，左边的值就是栈里面剩余最大值

### 2、代码实现

```java
    /**
     * 获取临近位置最小的值（没有重复值）
     *
     * @param arr 原始数组
     * @return 数组左右临近最小的值
     */
    public static int[][] getNearLessNoRepeat(int[] arr) {
        if(arr == null || arr.length < 1) {
            return null;
        }
        int n = arr.length;
        int[][] res = new int[n][2];

        // 创建栈，由小到大
        Stack<Integer> stack = new Stack<>();
        for (int i = 0; i < n; i++) {
            // 放入的值大于栈里面最大值则弹出，弹出时候记录弹出值的左右最小值
            while (!stack.isEmpty() && arr[stack.peek()] > arr[i]) {
                int val = stack.pop();
                // 左边值就是弹出后栈里面最大的值
                int leftLessIndex = stack.isEmpty() ? -1 : stack.peek();
                res[val][0] = leftLessIndex;
                // 右边值就是当前放入的值
                res[val][1] = i;
            }
            stack.push(i);
        }
        // 将栈里面的值
        while (!stack.isEmpty()) {
            // 弹出当前值
            int val = stack.pop();
            // 左边的值就是栈里面的最大值
            int leftLessIndex = stack.isEmpty() ? -1 : stack.peek();
            res[val][0] = leftLessIndex;
            // 没有放入的值，则右边的值没有
            res[val][1] = -1;
        }
        return res;
    }

    /**
     * 获取临近位置最小的值（有重复值）
     *
     * @param arr 原始数组
     * @return 数组左右临近最小的值
     */
    public static int[][] getNearLessRepeat(int[] arr) {
        if (arr == null || arr.length < 1) {
            return null;
        }
        int n = arr.length;
        int[][] res = new int[n][2];
        // 创建栈，由小到大.重复值则放到list里面
        Stack<List<Integer>> stack = new Stack<>();

        for (int i = 0; i < n; i++) {
            // 如果当前值小于栈顶值，则弹出值并记录弹出值的左右临近最小位置
            while (!stack.isEmpty() && arr[stack.peek().get(0)] > arr[i]) {
                List<Integer> pop = stack.pop();
                // 左边的值就是数组最后面的值
                int leftLessIndex = stack.isEmpty() ? -1 : stack.peek().get(stack.peek().size() - 1);
                for (Integer val : pop) {
                    // 重复值左边临近位置最小的值都是相同的
                    res[val][0] = leftLessIndex;
                    // 右边的临近位置最小值就是当前放入值
                    res[val][1] = i;
                }
            }

            // 判断如果当前值和栈里面的元素相同则放到当前栈里，否则在栈里面添加值
            if(!stack.isEmpty() && arr[stack.peek().get(0)] == arr[i]) {
                stack.peek().add(i);
            } else {
                List<Integer> list = new ArrayList<>();
                list.add(i);
                stack.push(list);
            }
        }
        // 处理栈里面剩余的值
        while (!stack.isEmpty()) {
            List<Integer> pop = stack.pop();
            // 左边的值就是数组最后面的值
            int leftLeftIndex = stack.isEmpty() ? -1 : stack.peek().get(stack.peek().size() - 1);
            for (Integer val : pop) {
                res[val][0] = leftLeftIndex;
                res[val][1] = -1;
            }
        }
        return res;
    }
```

## 二、子数组最大值

### 1、思路

1、

### 2、代码实现