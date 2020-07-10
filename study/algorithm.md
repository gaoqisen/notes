---
title: 算法学习
date: 2020-06-30 20:43:40
tags: algorithm
categories: study
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

- O(1): 表示操作一次之后就可以获取目标元素

- O(n): 表示要检查n个元素来搜索目标

- O(log n): 从数组的中间选择一个随机点进行查找，然后重复这个过程

- O(n ^2^ ):  

   



## 二、排序算法

### 2.1 选择排序O(n2)

先找到最小的数字然后把它放在列表的最前面。最简单最没用的排序算法，有优化空间,不稳定(没用)。原理是找到最小的数把它放在最前面。

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

### 2.2 冒泡排序

从无序序列头部开始，进行两两比较，根据大小交换位置，直到最后将最大（小）的数据元素交换到了无序队列的队尾，从而成为有序序列的一部分；下一次继续这个过程，直到所有数据元素都排好序

```java
public class BubbleSort {

    public static void main(String[] args) {
        int[] a = {9,6,5,2,3,4,80,7,1,10};
        for (int i = 0; i < a.length; i++) {
            for (int j = 1; j < a.length; j++) {
                int index = j-1;
                if(a[index] > a[j]) {
                    swap(a, index, j);
                }
            }
        }

        // 输出
        for (int i = 0; i < a.length; i++) {
            if(i == (a.length - 1)){
                System.out.print(a[i]);
                break;
            }
            System.out.print(a[i]+ ", ");
        }
        System.out.println("");
    }

    static void swap(int[] a, int start, int end) {
        int temp = a[start];
        a[start] = a[end];
        a[end] = temp;
    }
}
```

### 2.3 插入排序

插入排序是一种简单直观的排序算法。它的基本思想是拿到当前值之后往前面的正确位置移动。

```java
// 插入排序
public class InsertionSort {

    public static void main(String[] args) {
        int[] a = {9,6,5,2,3,4,80,7,1,10};

        for (int i = 0; i < a.length; i++) {
            // 通过当前值和前面的值比较，并把当前值放到恰当的位置
            for (int j = i; j > 0; j--) {
                if(a[j] < a[j-1]) {
                    swap(a, j, j-1);
                }
            }
        }

        print(a);

    }
    // 替换
    static void swap(int[] a, int start, int end) {
        int temp = a[start];
        a[start] = a[end];
        a[end] = temp;
    }
    static void print(int[] a) {
        // 输出
        for (int i = 0; i < a.length; i++) {
            if(i == (a.length - 1)){
                System.out.print(a[i]);
                break;
            }
            System.out.print(a[i]+ ", ");
        }
        System.out.println("");
    }

}
```

### 2.4 希尔排序

将数组分为几段处理，不如15个数组元素分为每4个一组进行插入排序，之后在进行2个一组插入排序，之后在进行1个一组进行插入排序就可以了。这样缩短了数字之间的插入排序。希尔排序是不常用的排序方法。

```java
// 希尔排序
public class ShellSort {

    public static void main(String[] args) {
        int[] a = {9,6,5,2,3,4,80,7,1,10};

        // knuth序列
        int h = 1;
        while( h <= a.length / 3) {
            h = h*3 +1;
        }

        for (int gap = h; gap > 0; gap = (gap -1)/3) {
            for (int i = gap; i < a.length; i++) {
                for (int j = i; j > gap -1 ; j-=gap) {
                    if(a[j] < a[j-gap]) {
                        swap(a, j, j-gap);
                    }
                }
            }
        }

        print(a);

    }

    static void swap(int[] a, int start, int end) {
        int temp = a[start];
        a[start] = a[end];
        a[end] = temp;
    }
    static void print(int[] a) {
        // 输出
        for (int i = 0; i < a.length; i++) {
            if(i == (a.length - 1)){
                System.out.print(a[i]);
                break;
            }
            System.out.print(a[i]+ ", ");
        }
        System.out.println("");
    }

}
```

### 2.5 快速排序

- 单轴排序

  ```java
  // 快速排序: 采用不断的比较和移动来实现排序
  // 对于给定的一组记录，选择一个基准元素,通常选择第一个元素或者最后一个元素,通过一趟扫描，
  // 将待排序列分成两部分,一部分比基准元素小,一部分大于等于基准元素,此时基准元素在其排好序
  // 后的正确位置,然后再用同样的方法递归地排序划分的两部分，直到序列中的所有记录均有序为止。
  public class QuickSort {
  
      public static void main(String[] args) {
          int[] arr = { 6, 5, 9, 8, 3, 2, 1, 7, 10};
          sort(arr);
          print(arr);
      }
  
      // 排序
      static void sort(int[] arr) {
          partition(arr, 0, arr.length-1);
      }
  
      // 分区
      static void partition(int[] arr, int left, int right){
          if(left >= right) {
              return;
          }
          // 指针指向左边的第一个值
          int i = left;
          // 已右边的数为基数(轴)
          int temp = arr[right];
          // 右边的指针就是right-1
          int j = right;
  
          // 当左边的值小于右边值的时候
          while (i < j) {
              // 从左往右找大于或者基数的数字，并移动到arr.length-1的位置
              while (i<j && arr[i] <= temp) {
                  i++;
              }
              if(i < j) {
                  arr[j--] = arr[i];
              }
              // 从有右往左找小于或者等于基数的数字，并移动数字到i++的位置
              while (i<j && arr[j] > temp){
                  j--;
              }
              if(i < j) {
                  arr[i++] = arr[j];
              }
          }
          // 将基数放在i的位置
          arr[i] = temp;
          // 递归循环轴左边的值
          partition(arr, left, i-1);
          // 递归循环轴右边的值
          partition(arr, i+1, right);
      }
  
  
  
      static void swap(int[] a, int start, int end) {
          int temp = a[start];
          a[start] = a[end];
          a[end] = temp;
      }
      static void print(int[] a) {
          // 输出
          for (int i = 0; i < a.length; i++) {
              if(i == (a.length - 1)){
                  System.out.print(a[i]);
                  break;
              }
              System.out.print(a[i]+ ", ");
          }
          System.out.println("");
      }
  }
  ```

  

- 双轴快排

从两边同时查找

### 2.6 计数排序

用于统计有特别多的重复数据的时候，比如2万个学生的年龄分布等。非比较排序。 

### 2.7 基数排序

通过每个数字的个位、十位、百位等进行计数排序之后就可以了



