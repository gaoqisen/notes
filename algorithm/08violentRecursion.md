---
title: 08_暴力递归
date: 2023-03-20 19:54:40
tags: algorithm
categories: study
keywords: recursion
description: 暴力递归学习
---

## 一、递归基本概念

1. 暴力递归就是尝试
2. 把问题分解为同类问题的子问题
3. 有明确的退出递归的条件
4. 有得到子问题结果的决策过程
5. 不记录每一个子问题的解

## 二、递归题目

### 2.1 打印n层汉诺塔从最左边移动到最右边的全部过程

不能违反小压大原则

1、从左到右：从左到中，从中到左

2、从左到中：从左到右，从右到中

3、从右到中：从右到左，从左到中

4、从中到右：从中到左，从左到右

5、从中到左：从中到右，从右到左

6、从右到左：从右到中，从中到左

```java
public static void leftToRight(int n) {
        if(n == 1) {
            System.out.println("从左往右移动1");
            return;
        }
        leftToMid(n - 1);
        System.out.println("从左往右移动" + n);
        midToRight(n - 1);
    }

    public static void leftToMid(int n) {
        if(n == 1) {
            System.out.println("从左往中移动1");
            return;
        }
        leftToRight(n - 1);
        System.out.println("从左往中移动" + n);
        rightToMid(n - 1);
    }

    public static void midToRight(int n) {
        if(n == 1) {
            System.out.println("从中往右移动1");
            return;
        }
        midToLeft(n - 1);
        System.out.println("从中往左移动" + n);
        leftToRight(n - 1);
    }

    public static void midToLeft(int n) {
        if(n == 1) {
            System.out.println("从中往左移动1");
            return;
        }
        midToRight(n - 1);
        System.out.println("从中往左移动" + n);
        rightToLeft(n - 1);
    }

    public static void rightToMid(int n) {
        if(n == 1) {
            System.out.println("从右往中移动1");
            return;
        }
        rightToLeft(n - 1);
        System.out.println("从右往中移动" + n);
        leftToMid(n - 1);
    }

    public static void rightToLeft(int n) {
        if(n == 1) {
            System.out.println("从右往左移动1");
            return;
        }
        rightToMid(n - 1);
        System.out.println("从右往左移动" + n);
        midToLeft(n - 1);
    }

    public static void hanoi(int n) {
        leftToRight(n);
    }


    public static void main(String[] args) {
        hanoi(3);
        System.out.println("------------");
        hanoiPro(3);
    }

    public static void hanoiPro(int n) {
        common(n,"左", "右", "中");
    }

    // 优化的通用版本，将左右中变为参数
    public static void common(int n, String left, String right, String mid) {
        if(n == 1) {
            System.out.println("从" + left + "移动到" + right + "1");
            return;
        }
        common(n - 1, left, mid, right);
        System.out.println("从" + left + "移动到" + right + n);
        common(n - 1, mid, right, left);
    }
```

### 2.2 打印一个字符串的子序列

```java
		// 会出现重复的打印
    public static List<String> subs(String s) {
        char[] str = s.toCharArray();
        String path = "";
        List<String> ans = new ArrayList<>();
        // 从0开始
        execute(str, 0, ans, path);
        return ans;
    }

    public static void execute(char[] str, int index, Collection<String> ans, String path) {
        // index结束
        if(index == str.length) {
            ans.add(path);
            return;
        }
        // 下一个元素不放入ans
        execute(str, index + 1, ans, path);

        // 下一个元素放入ans
        execute(str, index + 1, ans, path + String.valueOf(str[index]));
    }

    // 不重复的大于
    public static List<String> subsNoRepeat(String s) {
        char[] chars = s.toCharArray();
        HashSet<String> ans = new HashSet<>();
        String path = "";
        execute(chars, 0, ans, path);
        return new ArrayList<>(ans);
    }
```

### 2.3 打印一个字符串的全部排列

全排列：所有个体全部参与排列，考虑前后顺序

恢复现场：是一个很重要的技巧

利用递归进行所有字符的排序

```java
    // 全排序：利用剩余字符处理
    public static List<String> permutations(String s) {
        // 判空
        List<String> result = new ArrayList<>();
        if(s == null || s.length() < 1) {
            return result;
        }

        String path = "";
        char[] chars = s.toCharArray();
        List<Character> rest = new ArrayList<>();
        for (char aChar : chars) {
            rest.add(aChar);
        }
        execute(result, rest, path);
        return result;
    }

    public static void execute(List<String> result, List<Character> rest, String path) {
        if(rest.isEmpty()) {
            result.add(path);
            return;
        }

        int index = rest.size();
        for (int i = 0; i < index; i++) {
            Character character = rest.get(i);
            // 清除现场
            rest.remove(character);
            // 递归往后处理
            execute(result, rest, path + character);
            // 恢复现场，将前面删除的字符恢复
            rest.add(i, character);
        }
    }

    // 全排序优化版本：利用下标+元素交换处理
    public static List<String> permutations1(String s) {
        List<String> result = new ArrayList<>();
        if(s == null || s.length() < 1) {
            return result;
        }

        char[] chars = s.toCharArray();
        execute1(chars, result, 0);
        return result;
    }

    public static void execute1(char[] chars, List<String> res, int index){
        if(index == chars.length) {
            res.add(String.valueOf(chars));
            return;
        }
        // 从index开始遍历字符
        for (int i = index; i < chars.length; i++) {
            // index和后面的其他字符交换位置
            swap(chars, index, i);
            // 递归处理后面的字符
            execute1(chars, res, index + 1);
            // 恢复现场后其他元素继续遍历
            swap(chars, index, i);
        }
    }

    // 全排序优化版本（去除重复）：利用下标+元素交换处理
    public static List<String> permutations2(String s) {
        List<String> result = new ArrayList<>();
        if(s == null || s.length() < 1) {
            return result;
        }

        char[] chars = s.toCharArray();
        execute2(chars, result, 0);
        return result;
    }

    public static void execute2(char[] chars, List<String> res, int index){
        if(index == chars.length) {
            res.add(String.valueOf(chars));
            return;
        }
        // 从index开始遍历字符
        boolean[] visited = new boolean[256];
        for (int i = index; i < chars.length; i++) {
            // 剪枝方式判断字符如果已经匹配过则往后匹配
            if(visited[chars[i]]) {
                continue;
            }
            visited[chars[i]] = true;
            // index和后面的其他字符交换位置
            swap(chars, index, i);
            // 递归处理后面的字符
            execute1(chars, res, index + 1);
            // 恢复现场后其他元素继续遍历
            swap(chars, index, i);
        }
    }
    
    // 交换字符
    public static void swap(char[] chs, int i, int j) {
        char tmp = chs[i];
        chs[i] = chs[j];
        chs[j] = tmp;
    }
```

### 2.4 递归逆序栈

1、递归处理截取栈的最后一个元素返回

2、递归逆序栈,获取最后面的元素并放入栈中

```java
    // 逆序栈
    public static void reverse(Stack<Integer> stack) {
        // 如果栈空了就结束
        if(stack.isEmpty()) {
            return;
        }
        // 截取最后面的栈元素
        int i = splitLastElement(stack);
        // 递归处理处理剩余的元素
        reverse(stack);
        // 将截取的最后元素放入栈中
        stack.push(i);
    }

    // 截取栈最后的元素
    private static int splitLastElement(Stack<Integer> stack) {
        Integer pop = stack.pop();
        if(stack.isEmpty()) {
            return pop;
        }
        // 递归获取最后一个元素
        int last = splitLastElement(stack);
        // 将之前获取的元素放入栈
        stack.push(pop);
        return last;
    }
```

#### 















