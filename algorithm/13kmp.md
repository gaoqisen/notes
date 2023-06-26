---
title: 13_KMP
date: 2023-05-28 14:16:40
tags: algorithm
categories: study
keywords: KMP
description: KMP学习
---

GPT生成：

KMP算法（Knuth-Morris-Pratt算法）是计算机科学中用于在一个文本串S内查找一个模式串P出现位置的字符串匹配算法。它利用了已经部分匹配这个有效信息，通过一个失配数组记录模式串中前缀和后缀的最长公共元素长度，减少了模式串与文本串的匹配次数，从而达到快速匹配的目的。KMP算法的发明人分别为Donald E. Knuth、Vaughan R. Pratt和James H. Morris，因此该算法也被称作KMP算法或者Morris-Pratt算法。

失配数组，也叫部分匹配表（Partial Match Table），是KMP算法中的一种重要数据结构。它能够记录每个模式串位置前缀与后缀中最长的相同的元素长度。具体来说，当我们在文本串S中遇到了某个字符与模式串P不匹配时，根据失配数组可以指导我们如何跳过一些不必要的比较。即将下一个要比较的模式串字符向右移动尽量小的距离，从而减少了字符串之间的比较次数，在实际应用中提高了查找的效率。可以说，失配数组是KMP算法的关键所在。

## 一、获取子字符串的第一个位置

### 1、思路

1、生成next失配数组O(n)

2、利用next数组匹配字符找到第一个出现子字符的位置

3、每次都生成next数组，如果数据量小的时候还不如暴力匹配快因此jdk没有使用kmp来实现indexOf函数（jdk作者认为在一般场景使用中都是少量的字符匹配），如果数据量大的时则可以考虑使用kmp算法

### 2、代码

```java
    public static int getIndexOf(String a, String b) {
        if(a == null || b == null || b.length() < 1 || a.length() < b.length()) {
            return -1;
        }
        char[] str1 = a.toCharArray();
        char[] str2 = b.toCharArray();
        // 记录当前str1和str2比对到的位置
        int x = 0, y = 0;
        // 获取next数组
        int[] next = getNextArray(str2);
        while (x < str1.length && y < str2.length){
            // 如果字符串相等
            if(str1[x] == str2[y]) {
                x++;
                y++;
            }
            // y等于0时（在str2中只有0位置的值是-1），不能往左走了
            else if (next[y] == -1) {
                x++;
            }
            // 能往左走时，跳过不必要多余的比较
            else {
               y = next[y];
            }
        }
        // str2对比的位置越界则表示找到了匹配的字符串，否则没有
        return y == str2.length ? x - y : -1;
    }

    /**
     * 获取字符串的next数组（失配数组）
     */
    private static int[] getNextArray(char[] str) {
        if(str.length == 1) {
            return new int[]{-1};
        }
        int[] next = new int[str.length];
        // 初始化默认值
        next[0] = -1;
        next[1] = 0;

        // 当前求next值位置，从2开始
        int i = 2;
        // 当前位置在和i-1的位置进行比较
        int n = 0;
        while (i < str.length) {
            // 匹配上的时候
            if(str[i - 1] == str[n]) {
                /*
                 匹配上则i位置的数量+1后，后面值比较时直接使用
                 next[i] = n + 1;
                 i++;n++;
                 */
                next[i++] = ++n;
            }
            // 能往左走则一只往左走
            else if (n > 0) {
                n = next[n];
            }
            // 不能往左走了则没有匹配上
            else {
                next[i++] = 0;
            }
        }
        return next;
    }
```

## 二、判断字符串是否为旋转字符串

### 1、题目

判断字符串1的旋转字符串是否为字符串2，例子：

23451是12345的旋转字符串

34512是12345的旋转字符串

...

### 2、思路

1、长度不一样则返回false

2、将字符串1和字符串1拼接在一起形成新的字符串a(字符串a的任意一个长度和字符串1相等的区域都是字符串1的旋转串)

3、利用kmp判断字符串2是否为a的子串，是子串则是旋转字符串

### 3、代码

```java
public static boolean isRotation(String str1,String str2) {
        if(str1.length() != str2.length()) {
            return false;
        }
        return getIndexOf(str1 + str1, str2) != -1;
    }


    /**
     * 在a字符串中获取b字符串第一次出现的下标位置
     * @param a
     * @param b
     * @return
     */
    public static int getIndexOf(String a, String b) {
        if(a == null || b == null || b.length() < 1 || a.length() < b.length()) {
            return -1;
        }
        char[] str1 = a.toCharArray();
        char[] str2 = b.toCharArray();
        // 记录当前str1和str2比对到的位置
        int x = 0, y = 0;
        // 获取next数组
        int[] next = getNextArray(str2);
        while (x < str1.length && y < str2.length){
            // 如果字符串相等
            if(str1[x] == str2[y]) {
                x++;
                y++;
            }
            // y等于0时（在str2中只有0位置的值是-1），不能往左走了
            else if (next[y] == -1) {
                x++;
            }
            // 能往左走时，跳过不必要多余的比较
            else {
               y = next[y];
            }
        }
        // str2对比的位置越界则表示找到了匹配的字符串，否则没有
        return y == str2.length ? x - y : -1;
    }

    /**
     * 获取字符串的next数组（失配数组）
     */
    private static int[] getNextArray(char[] str) {
        if(str.length == 1) {
            return new int[]{-1};
        }
        int[] next = new int[str.length];
        // 初始化默认值
        next[0] = -1;
        next[1] = 0;

        // 当前求next值位置，从2开始
        int i = 2;
        // 当前位置在和i-1的位置进行比较
        int n = 0;
        while (i < str.length) {
            // 匹配上的时候
            if(str[i - 1] == str[n]) {
                /*
                 匹配上则i位置的数量+1后，后面值比较时直接使用
                 next[i] = n + 1;
                 i++;n++;
                 */
                next[i++] = ++n;
            }
            // 能往左走则一只往左走
            else if (n > 0) {
                n = next[n];
            }
            // 不能往左走了则没有匹配上
            else {
                next[i++] = 0;
            }
        }
        return next;
    }
```

## 三、判断二叉树2是否是二叉树1的子树

子树从头节点出发后面的左右子节点都需要算上

### 1、思路

1、将二叉树1和二叉树2各自序列化为字符串，如果字符串2时字符串1的子串，则二叉树2时二叉树1的子树

### 2、代码

```java
/**
     * 判断两个二叉树是否是包含关系
     * 
     * @param node1 主树
     * @param node2 被包含的树
     * @return 是否包含
     */
    public static boolean isContains(Node node1, Node node2) {
        if(node2 == null) {
            return true;
        }
        if(node1 == null) {
            return false;
        }
        // 将树序列化
        List<String> list1 = preSerial(node1);
        List<String> list2 = preSerial(node2);
        // 通过kmp判断是否包含子串
        return getIndexOf(getArr(list1), getArr(list2)) != -1;
    }

    // 将list转化数组
    private static String[] getArr(List<String> list) {
        String[] str = new String[list.size()];
        for (int i = 0; i < str.length; i++) {
            str[i] = list.get(i);
        }
        return str;
    }

    // 先序遍历
    private static List<String> preSerial(Node node) {
        List<String> list = new ArrayList<>();
        pre(node, list);
        return list;
    }

    // 递归先序遍历
    private static void pre(Node node, List<String> list) {
        if(node == null) {
            list.add(null);
        } else {
            list.add(String.valueOf(node.value));
            pre(node.left, list);
            pre(node.right, list);
        }
    }

    // 获取两个数组是否包含并返回包含的下标
    public static int getIndexOf(String[] str1, String[] str2) {
        if (str1 == null || str2 == null || str1.length < 1 || str1.length < str2.length) {
            return -1;
        }
        int x = 0;
        int y = 0;
        int[] next = getNextArray(str2);
        while (x < str1.length && y < str2.length) {
            if (isEqual(str1[x], str2[y])) {
                x++;
                y++;
            } else if (next[y] == -1) {
                x++;
            } else {
                y = next[y];
            }
        }
        return y == str2.length ? x - y : -1;
    }

    /// 判断两个字符串是否相等
    public static boolean isEqual(String a, String b) {
        if (a == null && b == null) {
            return true;
        } else {
            if (a == null || b == null) {
                return false;
            } else {
                return a.equals(b);
            }
        }
    }

    // 获取next数组
    public static int[] getNextArray(String[] ms) {
        if (ms.length == 1) {
            return new int[] { -1 };
        }
        int[] next = new int[ms.length];
        next[0] = -1;
        next[1] = 0;
        int i = 2;
        int cn = 0;
        while (i < next.length) {
            if (isEqual(ms[i - 1], ms[cn])) {
                next[i++] = ++cn;
            } else if (cn > 0) {
                cn = next[cn];
            } else {
                next[i++] = 0;
            }
        }
        return next;
    }

    public static class Node {
        public int value;
        public Node left;
        public Node right;

        public Node(int v) {
            value = v;
        }
    }
```





