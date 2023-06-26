---
title: 12_矩阵快速幂技巧
date: 2023-05-27 14:16:40
tags: algorithm
categories: study
keywords: fibonacci
description: 矩阵快速幂技巧学习
---

## 一、斐波那契数列矩阵

### 1、思路

1、根据严格递推公式计算出矩阵

2、根据矩阵计算出公式矩阵

3、计算矩阵的n次方时候进行优化

### 2、代码

```java
    /**
     * 普通的递归方式计算
     */
    public static int f(int n) {
        Integer x = baseCase(n);
        if (x != null) {
            return x;
        }
        return f(n - 1) + f(n - 2);
    }

    /**
     * 通过矩阵方式
     */
    public static int f1(int n) {
        // 基础条件判断
        Integer x = baseCase(n);
        if (x != null) {
            return x;
        }
        /**
         严格递推公式: F(n) = F(n-1) + F(n-2)， 减去值最多的值是2则改递推式为二阶递推
         线性代数就是为了解决严格递推式而出现的
         则得出行列式：|F3,F2| = |F2,F1| * {a,b}
                                        {c,d}
                    |F4,F3| = |F3,F2| * {a,b}
                                        {c,d}
         通过前几个简单的计算值（1，1，2，3，5，8）计算可得出基础矩阵
         则|F3,F2|：|2,1| = |1,1| * {a,b}
                                   {c,d}
         根据矩阵乘法求出： 1*a + 1*c = 2， 1*b + 1*d = 1
         则|F4,F3|：|3,2| = |2,1| * {a,b}
                                   {c,d}
         根据矩阵乘法求出： 2*a + 1*c = 3， 2*b + 1*d = 2
         则更具两个式子得出base矩阵值如下：
         */
        int[][] base = {
                {1, 1},
                {1, 0}
        };
        // 计算矩阵
        int[][] res = matrixPower(base, n - 2);
        // 公式：|Fn,Fn-1| = |F2,F1| * |base|^n-2
        // 替换F2和F1的值：|Fn,Fn-1| = |1,1| * |base|^n-2
        // 如果base矩阵计算得出{a,b}
        //                  {c,d}
        // 则：Fn = 1*a + 1*c = a + c
        return res[0][0] + res[1][0];
    }

    /**
     * 求出矩阵m的p次方
     */
    private static int[][] matrixPower(int[][] m, int p) {
        // 对角线的值为1，其他的值为0
        int[][] res = new int[m.length][m[0].length];
        for (int i = 0; i < res.length; i++) {
            res[i][i] = 1;
        }
        // 矩阵的1次方
        int[][] t = m;
        // 二进制右移
        for (;p != 0; p >>= 1) {
            // 判断二进制末尾是否为1
            if((p & 1) != 0) {
                res = muliMatrix(res, t);
            }
            // 每次和自己相乘2^ 4^ 8^ ...
            t = muliMatrix(t, t);
        }
        return res;
    }

    /**
     * 两个矩阵相乘
     */
    private static int[][] muliMatrix(int[][] a, int[][] b) {
        int n = a.length;
        int m = b[0].length;
        int k = a[0].length; // a的列数同时也是b的行数
        int[][] ans = new int[n][m];
        for(int i = 0 ; i < n; i++) {
            for(int j = 0 ; j < m;j++) {
                for(int c = 0; c < k; c++) {
                    ans[i][j] += a[i][c] * b[c][j];
                }
            }
        }
        return ans;
    }

    private static Integer baseCase(int n) {
        if(n < 1) {
            return 0;
        }
        if(n == 1 || n == 2) {
            return 1;
        }
        return null;
    }
```

### 3、结论

如果某个递归，除了初始项之外，具有如下的形式

F(N) = C1 * F(N) + C2 * F(N-1) + … + Ck * F(N-k) ( C1…Ck 和k都是常数)并且这个递归的表达式是严格的、不随条件转移的

那么都存在类似斐波那契数列的优化，时间复杂度都能优化成O(logN)

## 二、返回n年后牛的数量

### 1、题目

第一年农场有1只成熟的母牛A，往后的每年：

1）每一只成熟的母牛都会生一只母牛

2）每一只新出生的母牛都在出生的第三年成熟

3）每一只母牛永远不会死

返回N年后牛的数量

### 2、思路

1、将题目按照每年牛的数量进行整理，观察得出：F(n) = F(n-1)  + F(n-3)

2、近4年牛的数量分别为：1，2，3，4，6，9 ...。 

```
有行列式：|F4,F3,F2| = |F3,F2,F2| * |3*3|
    则：|4,3,2|=|3,2,1| * {a,b,c}
       									 {d,e,f}
       									 {g,h,i}
    计算行列式：3a+2d+g=4
    					3b+2e+h=3
    					3c+2f+i=2
    则：|6,4,3|=|4,3,2| * {a,b,c}
       									 {d,e,f}
       									 {g,h,i}
    计算行列式：4a+3d+2g=6
    					4b+3e+2h=4
    					4c+3f+2i=3
    ...
    往后计算则得出a=1,d=0,g=1,b=1,e=0,h=0,c=0,f=1,i=0
```

3、和之前的方式一样计算矩阵的n次方

4、则基础项F(n)=3a+2d+g

### 3、代码

```java
	  // 计算n年后牛的数量
    public static int countCowNum(int n) {
        if(n < 1) {
            return 0;
        }
        if(n == 1 || n == 2 || n == 3) {
            return n;
        }
        // 基础矩阵，通过计算数据后推演得出
        int[][] baseCase = {
                {1,1,0},
                {0,0,1},
                {1,0,0}
        };
        int[][] res = matrixPower(baseCase, n - 3);
        // 通过行列式计算得出
        return 3 * res[0][0] + 2 * res[1][0] + res[2][0];
    }
```

## 三、返回有多少达标的字符串

### 1、题目

给定一个数N，想象只由0和1两种字符，组成的所有长度为N的字符串如果某个字符串,任何0字符的左边都有1紧挨着,认为这个字符串达标返回有多少达标的字符串

### 2、思路

1、分析题目得出n=1存在1个达标，n=2存在2个达标，n=3存在3个达标，n=4时5个达标，通过观察往后就是F(n) = F(n-1) + F(n-2)，和第一题的矩阵都是一样的

### 3、代码

```java
	    public static int getNumber(int n) {
        if(n < 1) {
            return 0;
        }
        if(n == 1) {
            return 1;
        }

        int[][] base = {
                {1, 1},
                {1, 0}
        };
        // 计算矩阵
        int[][] res = matrixPower(base, n - 2);
        /**
         Fn = (Fn-1) + (Fn-2)
         |Fn,Fn-1| = |F2,F1| * {2*2}^n-2
         则：Fn = |2,1| * {2*2}^n-2
               = |2,1| * {a,b}
                         {c,d}
               = 2a + 1c
         */
        return 2 * res[0][0] + res[1][0];
    }
```

