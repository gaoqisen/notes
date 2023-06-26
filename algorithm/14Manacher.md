---
title: 14_Manacher
date: 2023-05-28 14:16:40
tags: algorithm
categories: study
keywords: Manacher
description: Manacher学习
---

GPT生成：

Manacher算法，也称为马拉车算法，是一种用来查找一个字符串中的最长回文子串的线性时间复杂度算法。与其他常规方法不同的是，Manacher算法通过对已匹配部分的信息进行利用而非重新比较，从而达到线性时间的效果。

它实现步骤如下：

1. 首先，在字符串的首尾以及每个字符之间插入一个特殊字符，通常情况下选择为“#”，这样可以保证字符串奇偶性的一致性;
2. 计算出一个数组P，记录以每个字符为中心的最长回文子串长度（包括该字符本身）;
3. 遍历填充数组P的过程中，顺便更新当前最长回文串的位置和长度。

Manacher算法时间复杂度为O(n)，具有实现简单、效率高的优点。

## 一、找到最长回文子串

回文半径：回文一半的数量，如12321的回文半径为3

回文直径：回文的长度，如12321的回文直径为5

回文半径数组：每个字符的当前回文半径数组

最右回文右边界(R)：只要取得了最大的右边界则R往最右边移动

当前右边界中心点(C): 当前最右回文右边界R的回文中心点

最左回文左边界(L): R关于C的对称值就是L

### 1、思路

1、将字符串用特殊字符将每个字符隔开（字符无特殊要求，不会处理到特殊字符上）

2、判断当前值(i)有没有被最右回文右边界(R)包含，没有包含则使用暴力对比方法

3、如果当前值(i)被最右回文右边界(R)包含则存在优化空间

- 当前值(i)的对称值在回文区域在L~R里面，则i的回文区域和对称值的回文区域一致
- 当前值(i)的对称值在L~R外， 则当前值(i)的回文半径就是i～R的长度
- 当前值(i)的对称值的左边界等于L，当前值(i)的回文半径 >= 对称值的回文半径。只需要再往后验证往左和往后的值是否相等即可(有可能更远)

### 2、代码

```java
    /**
     * 获取最大回文子串长度
     *
     * @param s 字符串
     * @return 最大回文子串
     */
    public static int manacher(String s) {
        if(s == null || s.isEmpty()) {
            return 0;
        }

        // 1、将字符串转化为用特殊字符隔开，任何字符都可以，在处理字符的时候不会处理到特殊字符
        char[] str = getChars(s);

        // 回文半径数组（回文半径中的最大值/2就是返回结果）
        int[] pArr = new int[str.length];
        // 当前最右回文右边界R的回文中心点
        int C = -1;
        // 最右回文右边界(R)：只要取得了最大的右边界则R往最右边移动
        int R = -1;
        int max = Integer.MIN_VALUE;
        for (int i = 0; i < str.length; i++) {
            /*
            R > i: i在R内，则获取最小的不用验证的区域。  否则第二种情况。 否则i在R外的最少回文半径是1
            2 * C - i: i对称值的回文半径
            R -i： 当前值(i)的对称值在L~R外， 则当前值(i)的回文半径就是i～R的长度
             */
            pArr[i] = R > i ? Math.min(pArr[2 * C -  i], R -i) : 1;
            // 对比后面的值(当前i的回文数据左右两边都存在值时)
            while (i + pArr[i] < str.length && i - pArr[i] > -1) {
                // 如果左边和右边的值相等，则回文半径往后扩展，否则结束扩展
                if(str[i + pArr[i]] == str[i - pArr[i]]) {
                    pArr[i]++;
                } else {
                    break;
                }
            }

            // R的值往后扩
            if(i + pArr[i] > R) {
                R = i + pArr[i];
                C = i;
            }
            // 获取最大的回文半径
            max = Math.max(max, pArr[i]);
        }
        // 回文半径-1就是最大回文长度(字符用特殊字符处理过)
        return max -1;
    }

    private static char[] getChars(String str) {
        char[] mStr = new char[str.length() * 2 + 1];
        char[] chars = str.toCharArray();
        int index = 0;
        for (int i = 0; i != mStr.length; i++) {
            // 奇数&1为1，偶数&1为0
            mStr[i] = (i & 1) == 0 ? '#' : chars[index++];
        }
        return mStr;
    }
```

## 二、字符串后添加最少字符返回组成回文

### 1、思路

manacher中进行改进， 当R刚好包含所有数据时停止处理，则当前字符i就是整个字符的中心。则找到了最长回文中心点

### 2、代码

```java
    /**
     * 获取最大回文子串长度
     *
     * @param s 字符串
     * @return 最大回文子串
     */
    public static String manacher(String s) {
        if(s == null || s.isEmpty()) {
            return "";
        }

        // 1、将字符串转化为用特殊字符隔开，任何字符都可以，在处理字符的时候不会处理到特殊字符
        char[] str = getChars(s);

        // 回文半径数组（回文半径中的最大值/2就是返回结果）
        int[] pArr = new int[str.length];
        // 当前最右回文右边界R的回文中心点
        int C = -1;
        // 最右回文右边界(R)：只要取得了最大的右边界则R往最右边移动
        int R = -1;
        // 最长包含结束位置
        int maxContainsEnd = -1;
        for (int i = 0; i < str.length; i++) {
            /*
            R > i: i在R内，则获取最小的不用验证的区域。  否则第二种情况。 否则i在R外的最少回文半径是1
            2 * C - i: i对称值的回文半径
            R -i： 当前值(i)的对称值在L~R外， 则当前值(i)的回文半径就是i～R的长度
             */
            pArr[i] = R > i ? Math.min(pArr[2 * C -  i], R -i) : 1;
            // 对比后面的值(当前i的回文数据左右两边都存在值时)
            while (i + pArr[i] < str.length && i - pArr[i] > -1) {
                // 如果左边和右边的值相等，则回文半径往后扩展，否则结束扩展
                if(str[i + pArr[i]] == str[i - pArr[i]]) {
                    pArr[i]++;
                } else {
                    break;
                }
            }

            // R的值往后扩
            if(i + pArr[i] > R) {
                R = i + pArr[i];
                C = i;
            }
            if(R == str.length) {
                maxContainsEnd = pArr[i];
                break;
            }
        }
        // 将结束位置前面的字符逆序就是需要添加的字符
        char[] res = new char[s.length() - maxContainsEnd + 1];
        for (int i = 0; i < res.length; i++) {
            res[res.length - 1 - i] = str[i * 2 + 1];
        }
        return String.valueOf(res);
    }

    private static char[] getChars(String str) {
        char[] mStr = new char[str.length() * 2 + 1];
        char[] chars = str.toCharArray();
        int index = 0;
        for (int i = 0; i != mStr.length; i++) {
            // 奇数&1为1，偶数&1为0
            mStr[i] = (i & 1) == 0 ? '#' : chars[index++];
        }
        return mStr;
    }
```

