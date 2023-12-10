---
title: 15_bfprt
date: 2023-06-04 21:10:12
tags: algorithm
categories: study
keywords: bfprt
description: bfprt学习
---

GPT: 

 BFPRT是一种快速选择算法，可以在无序数组中寻找第 K 小的数。它的时间复杂度为 O(n)，比一般的排序算法效率高，因为它不需要对整个数组进行排序。

具体实现流程如下：首先将数组按照五个一组进行分组，对于每组内部进行插入排序，然后取出每组的中位数，将这些中位数再递归地求出中位数的中位数 medianOfMedia，最后以 medianOfMedia 作为划分元素，在数组中进行划分，将小于或等于 medianOfMedia 的数放到左边，大于 medianOfMedia 的数放到右边。若划分位置恰好为 k，则第 k 小的元素即为 medianOfMedia；若划分位置小于 k，则在划分点右侧继续查找第 (k-m) 小的元素，其中 m 为左侧已有的元素个数；若划分位置大于 k，则在划分点左侧继续查找第 k 小的元素。

BFPRT算法主要用于解决 Top K 问题和中位数问题，是在大数据处理中非常有实际意义的算法之一。

## 一、在无序数组中求第k小的数

### 1、思路

快排方式：

1、利用随机数随机出中间值

2、利用荷兰国旗方式将数据分为左中右3部分数据，返回中间数据的起至位置（都是等于中间值的数）。

2、递归找到中间值，每部分数据不用排序，只需要分区

bfprt方式：

快排的方式最主要就是随机中间值不确定，bfprt是利用将数据切分为5个组的方式找到中间值

1、没5个数一组，将数组逻辑切分O(1)

2、将小组里面的数据进行排序，并找到中位数O(n)

3、将每个小组里面的中位数拿出来组成m数组O(n)

4、递归调用bfprt(m),  T(n/5)的复杂度（找到中位数的中位数）

5、在进行荷兰国旗问题处理O(n)，快排逻辑

6、命中就停止，没命中最差时间复杂度T(7/10n)

则得出时间复杂度公式：T(n) = T(7/10n) + T(n/5) + O(n), 得出结论 能淘汰出特定比例的数据进而能缩小数据范围规避最差情况使得算法有严格的优秀复杂度。

### 2、代码

快排方式

```java
    public static int minKth(int[] array, int k) {
        // copy一下数据，后面对比时使用
        int[] arr = copyArray(array);
        return process(arr, 0, arr.length - 1, k - 1);
    }

    public static int[] copyArray(int[] arr) {
        int[] ans = new int[arr.length];
        for (int i = 0; i != ans.length; i++) {
            ans[i] = arr[i];
        }
        return ans;
    }

    private static int process(int[] arr, int l, int r, int index){
        // 左边和右边的下标相等的时候，下标就是index
        if(l == r) {
            return arr[l];
        }

        // 随机一个值用于中间数字
        int pivot = arr[l + (int) Math.random() * (r - l + 1)];
        // 荷兰国旗问题， 获取数组pivot的左边界和右边界的值
        int[] range = partition(arr, l, r, pivot);
        // 当前值就在中间，直接返回当前值
        if(index >= range[0] && index <= range[1]) {
            return arr[index];
        }
        // 当前值在左边
        else if(index < range[0]){
            return process(arr, l, range[0] - 1, index);
        }
        // 当前值在右边
        else {
            return process(arr, range[1] + 1, r, index);
        }
    }

    // 进行分区，小于m的值放左边，大于m的值放右边，等于的放中间。 返回中间值的左右边界
    private static int[] partition(int[] arr, int l, int r, int m) {
        int less = l - 1;
        int more = r + 1;
        int cur = l;
        // 从左往右比较，左下标和右下标遇上是结束
        while (cur < more) {
            if(arr[cur] < m) {
                // 当前值小于中间值则当前值替换后往后扩
                swap(arr, cur++, ++less);
            } else if(arr[cur] > m) {
                swap(arr, cur, --more);
            } else {
                cur++;
            }
        }
        return new int[]{less + 1, more - 1};
    }

    public static void swap(int[] arr, int i1, int i2) {
        int tmp = arr[i1];
        arr[i1] = arr[i2];
        arr[i2] = tmp;
    }

```

bfprt方式

```java
    // 获取数组第k小的数
    public static int minKth(int[] arr, int k) {
        // 下标从0开始则第k小的是k-1
        return bfprt(arr, 0, arr.length - 1, k-1);
    }

    /**
     * bfprt算法
     *
     * @param arr 数组
     * @param l 左边值下标
     * @param r 右边值下标
     * @param index 需要找的第几小的数
     * @return
     */
    private static int bfprt(int[] arr, int l, int r, int index) {
        if(l == r) {
            return arr[l];
        }

        // 获取中位数的中位数
        int pivot = medianOfMedians(arr, l, r);
        // 进行排序分区（左中右）
        int[] range = T001_FindMinKth.partition(arr, l, r, pivot);
        // 中位数刚好在中间
        if(index >= range[0] && index <= range[1]) {
            return arr[index];
        }
        // 中位数在左边
        else if(index < range[0]) {
            return bfprt(arr, 0, range[0] - 1, index);
        }
        // 中位数在右边
        else {
            return bfprt(arr, range[1] + 1, r, index);
        }
    }

    /**
     * 获取数组中位数的中位数
     * 1、每5个一组
     * 2、小组内部排序
     * 3、获取每个小组的中位数组成mArr
     * 4、获取mArr的中位数
     *
     * @param arr 数组
     * @param l 左边界值下标
     * @param r 右边界值下标
     * @return
     */
    private static int medianOfMedians(int[] arr, int l, int r) {
        int size = r - l + 1;
        int offset = size % 5 == 0 ? 0 : 1;
        // 中位数的数组
        int[] mArr = new int[size / 5 + offset];
        // 每5个为一组，进行遍历获取中位数
        for (int team = 0; team < mArr.length; team++) {
            // 当前组的开始位置
            int first = l + team * 5;
            // 获取中位数
            mArr[team] = getMedian(arr, first, Math.min(r, first + 4));
        }

        // 获取中位数的中间值
        return bfprt(mArr, 0, mArr.length - 1, mArr.length / 2);
    }

    // 获取中位数
    private static int getMedian(int[] arr, int l, int r) {
        // 先快速排序
        for (int i = l + 1; i <= r; i++) {
            for (int j = i - 1; j >= l && arr[j] > arr[j + 1]; j--) {
                swap(arr, j, j + 1);
            }
        }
        // 获取中位数
        return arr[(l + r) / 2];
    }
    public static void swap(int[] arr, int i1, int i2) {
        int tmp = arr[i1];
        arr[i1] = arr[i2];
        arr[i2] = tmp;
    }
```

## 二、返回数组中top k

### 1、题目

给定一个无序数组arr中，长度为N，给定一个正数k，返回top k个最大的数不同时间复杂度三个方法：

1）O(N*logN)*

暴力排序：将整个数组排序，之后返回k个最大的数

2）O(N + K*logN)*

大根堆方式：整个数组调整成大根堆（从下往上  O(n)）,依次弹出k个元素并放到最后 大根堆调整O(logn)，之后返回后面的值即可

3）O(n + k*logk)

bfprt：先求第n-k小的数m是多少O(n)，之后用k大的数组遍历整个数组，找到所有大于在m的数，针对k数组进行排序就可以k*logk。 k是小于n的则当前方式最优解 

### 2、代码

```java
    // 一、先排序，之后获取前第k的数组
    public static int[] maxTopk1(int[] arr, int k) {
        if(arr == null || arr.length < 1 || k < 1){
            return new int[0];
        }
        int n = arr.length;
        k = Math.min(k, n);
        Arrays.sort(arr);

        int[] result = new int[k];
        for (int i = 0, j = n - 1; i < k; i++, j--) {
            result[i] = arr[j];
        }
        return result;
    }

    // 二、大根堆方式
    public static int[] maxTopk2(int[] arr, int k) {
        if (arr == null || arr.length < 1 || k < 1) {
            return new int[0];
        }
        int n = arr.length;
        k = Math.min(k, n);

        // 建堆，从下往上
        for (int i = n - 1; i >= 0; i--) {
            heapify(arr, i, n);
        }

        // 弹出大根堆并将值放到最后面
        int heapSize = n;
        swap(arr, 0, --heapSize);
        int count = 1;
        while (heapSize > 0 && count < k) {
            // 弹出值后重新调整堆
            heapify(arr, 0, heapSize);
            // 弹出值并放到最后
            swap(arr, 0, --heapSize);
            count++;
        }

        // 将arr从后往前取k个数
        int[] result = new int[k];
        for (int i = n - 1, j = 0; j < k; i--, j++) {
            result[j] = arr[i];
        }
        return result;
    }

    private static void heapify(int[] arr, int index, int heapSize) {
        // 左孩子的下标
        int left = index * 2 + 1;

        while (left < heapSize) {
            // 右孩子存在与左孩子比较，去最大值的下标
            int largest = left + 1 < heapSize && arr[left + 1] > arr[left] ? left + 1 : left;
            // 和当前值比，那个大取那个值的下标
            largest = arr[largest] > arr[index] ? largest : index;
            // 没办法往上走则结束流程
            if(largest == index) {
                break;
            }
            // 大的值往前调整
            swap(arr, largest, index);
            // 下标往上移动
            index = largest;
            // 重新计算左孩子下标
            left = index * 2 + 1;
        }

    }

    // 通过下标交换值
    public static void swap(int[] arr, int i, int j) {
        int tmp = arr[i];
        arr[i] = arr[j];
        arr[j] = tmp;
    }


    // 三、通过荷兰国旗方式，找到top最大的值
    public static int[] maxTopk3(int[] arr, int k) {
        if (arr == null || arr.length < 1 || k < 1) {
            return new int[0];
        }
        int n = arr.length;
        k = Math.min(k, n);

        // 找到第n-k小的数
        int num = minKth(arr, n - k);
        int index = 0;
        int[] result = new int[k];
        // 将所有大于num的值放到result里面
        for (int i = 0; i < n; i++) {
            if(arr[i] > num) {
                result[index++] = arr[i];
            }
        }

        // result剩余没有填的则等于当前最小值
        for (; index < k; index++) {
            result[index] = num;
        }
        Arrays.sort(result);

        // 逆序
        for (int i = 0, j = k - 1; i < j; i++, j--) {
            swap(result, i, j);
        }

        return result;
    }

    // 找到第i小的数
    private static int minKth(int[] arr, int i) {
        int l = 0, r = arr.length - 1, pivot = 0;
        int[] range = null;

        // 左边的值没有抵达到右边时
        while (l < r) {
            // 随机获取中位数
            pivot = arr[l + (int)(Math.random() * (r - l + 1))];
            range = partition(arr, l, r, pivot);
            // 第i小的数在左边则右下标移动到中间值下标的左边
            if(i < range[0]) {
                r = range[0] - 1;
            }
            // 第i小的数在右边则左下标移动到中间值下标的右边
            else if(i > range[1]) {
                l = range[1] + 1;
            }
            // 刚好就是中间值
            else {
                return pivot;
            }
        }
        // 返回最小的数
        return arr[l];
    }

    // 分区获取中间值的左右边界
    private static int[] partition(int[] arr, int l, int r, int pivot) {
        int less = l - 1, more = r + 1, cur = l;
        while (cur < more) {
            // 当前值小于中间值，小于区域往后移，当前下标往后移
            if (arr[cur] < pivot) {
                swap(arr, ++less, cur++);
            } 
            // 当前值大于中间值，当前值和右边的值替换后移动下标
            else if (arr[cur] > pivot) {
                swap(arr, cur, --more);
            } 
            // 等于则当前下标往后移
            else {
                cur++;
            }
        }
        // 返回左边和右边的区域下标
        return new int[] { less + 1, more - 1 };
    }	
```

