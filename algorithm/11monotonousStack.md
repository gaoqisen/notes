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

### 1、题目

测试链接 : https://leetcode.com/problems/maximum-subarray-min-product/

给定一个只包含正数的数组arr，arr中任何一个子数组sub，一定都可以算出(sub累加和 )* (sub中的最小值)是什么

那么所有子数组中，这个值最大是多少？

### 2、思路

1、计算数组的累加和，

2、利用单调栈找到当前值左边和右边的临近小于当前值的位置，两个位置中间的累加和就是当前子数组的累加和

3、累加和乘以当前值取最大值就是结果（不用考虑重复值的情况，出现重复值是最后一次正确的会覆盖之前的错误值）

### 3、代码实现

```java
public static int maxSumMinProduct(int[] arr) {
        if(arr == null || arr.length < 1) {
            return 0;
        }
        // 计算累加和
        int n = arr.length;
        int[] sums = new int[n];
        sums[0] = arr[0];
        for (int i = 1; i < n; i++) {
            sums[i] = sums[i - 1] + arr[i];
        }

        // 利用单调栈获取临近位置最小值
        int max = Integer.MIN_VALUE;
        Stack<Integer> stack = new Stack<>();
        for (int i = 0; i < n; i++) {
            while (!stack.isEmpty() && arr[stack.peek()] >= arr[i]) {
                Integer pop = stack.pop();
                max = Math.max(max,
                        (stack.isEmpty() ?
                            // 左边没有比当前值小的
                            sums[i - 1] :
                            // 左边由比当前值小的，则右边的累加和减去左边的累加和
                            sums[i - 1] - sums[stack.peek()])
                        // 乘以最小值
                        * arr[pop]);
            }
            stack.push(i);
        }
        // 栈里面存在值
        while (!stack.isEmpty()) {
            Integer pop = stack.pop();
            max = Math.max(max,
                    (stack.isEmpty() ?
                            // 左边没有比当前值小的
                            sums[n - 1] :
                            // 左边由比当前值小的，则右边的累加和减去左边的累加和
                            sums[n - 1] - sums[stack.peek()])
                            // 乘以最小值
                            * arr[pop]);
        }

        return max;
    }
```

系统的栈可以替换成自己实现的栈，可以提高性能

## 三、直方图最大长方形面积

### 1、题目

给定一个非负数组arr，代表直方图返回直方图的最大长方形面积

https://leetcode.cn/problems/largest-rectangle-in-histogram/submissions/

### 2、思路

1、遍历每一个数组元素，以当前值找到当前的最大面积，依次对比获取最大值即可

2、当前位置找到临近左边和临近右边第一个小于当前值的位置（单调栈）

3、中间的面积就是当前值的面积

4、重复值的面积也是相等的，会直接覆盖可以不用考虑

### 3、代码

```JAVA
		/**
     * 获取数组中最大矩形面积
     *
     * @param height 数组值
     * @return 最大的面积
     */
    public static int largestRectangleArea(int[] height) {
        if(height == null || height.length < 1){
            return 0;
        }
        int n = height.length;
        Stack<Integer> stack = new Stack<>();
        int max = Integer.MIN_VALUE;
        for (int i = 0; i < n; i++) {
            while (!stack.isEmpty() && height[stack.peek()] >= height[i]) {
                // 当前位置右边临近值下标
                Integer pop = stack.pop();
                // 当前位置左边临近值下标
                int leftLeftIndex = stack.isEmpty() ? -1 : stack.peek();
                // （右边下标-左边下标）* 当前高度，就是当前位置的最大面积
                int curArea = (i - leftLeftIndex - 1) * height[pop];
                max = Math.max(max, curArea);
            }
            stack.push(i);
        }

        while (!stack.isEmpty()) {
            // 当前位置右边临近值下标
            Integer pop = stack.pop();
            // 当前位置左边临近值下标
            int leftLeftIndex = stack.isEmpty() ? -1 : stack.peek();
            // （右边下标-左边下标）* 当前高度，就是当前位置的最大面积
            int curArea = (n - leftLeftIndex - 1) * height[pop];
            max = Math.max(max, curArea);
        }
        return max;
    }
```

## 四、全部由1组成的最大矩阵

### 1、题目

测试链接：https://leetcode.com/problems/maximal-rectangle/

给定一个二维数组matrix，其中的值不是0就是1

返回全部由1组成的最大子矩形，内部有多少个1

### 2、思路

> 压缩数组+单调栈

将二维数组转换为直方图，每次求最大值面积即可（求最大面积的方式和前一题一样）

### 3、代码

```java
public static int maximalRectangle(char[][] map){
        if (map == null || map.length == 0 || map[0].length == 0) {
            return 0;
        }
        int maxArea = 0;
        // 定义直方图
        int[] height = new int[map[0].length];
        // 遍历二维数组
        for (int i = 0; i < map.length; i++) {
            for (int j = 0; j < map[0].length; j++) {
                // 判断当前位置是0则值为0，否则增加直方图高度
                height[j] = map[i][j] == '0' ? 0 : height[j] + 1;
            }
            // 获取当前最大直方图长度，和上一题一样
            maxArea = Math.max(maxArea, largestRectangleArea(height));
        }
        return maxArea;
    }

    /**
     * 获取数组中最大矩形面积
     *
     * @param height 数组值
     * @return 最大的面积
     */
    public static int largestRectangleArea(int[] height) {
        if(height == null || height.length < 1){
            return 0;
        }
        int n = height.length;
        Stack<Integer> stack = new Stack<>();
        int max = Integer.MIN_VALUE;
        for (int i = 0; i < n; i++) {
            while (!stack.isEmpty() && height[stack.peek()] >= height[i]) {
                // 当前位置右边临近值下标
                Integer pop = stack.pop();
                // 当前位置左边临近值下标
                int leftLeftIndex = stack.isEmpty() ? -1 : stack.peek();
                // （右边下标-左边下标）* 当前高度，就是当前位置的最大面积
                int curArea = (i - leftLeftIndex - 1) * height[pop];
                max = Math.max(max, curArea);
            }
            stack.push(i);
        }

        while (!stack.isEmpty()) {
            // 当前位置右边临近值下标
            Integer pop = stack.pop();
            // 当前位置左边临近值下标
            int leftLeftIndex = stack.isEmpty() ? -1 : stack.peek();
            // （右边下标-左边下标）* 当前高度，就是当前位置的最大面积
            int curArea = (n - leftLeftIndex - 1) * height[pop];
            max = Math.max(max, curArea);
        }
        return max;
    }
```

## 五、全部由1组成的子矩阵数量

### 1、题目

测试链接：https://leetcode.com/problems/count-submatrices-with-all-ones

给定一个二维数组matrix，其中的值不是0就是1，返回全部由1组成的子矩形数量

### 2、思路

1、在上面一题的基础上，每次获取当前行的所有矩阵数量。之后汇总即可

- 每次求当前行的所有矩形数量是不会存在重复值和漏值的情况，每行的矩形都不一样

2、求每行的直方图所有矩阵数量

- 当前行左边离自己最小，右边离自己最小区间的所有矩形数量
- 一个矩形里面的所有矩形数量（大矩形）公式为：(n*n-1)/2
- 计算其他高度的所有矩形数量，到相邻最小值为止（防止重复计算）
- 有重复值则计算最后一个值的所有矩形数量

### 3、代码

```java
	 public static int numSubmat(int[][] mat) {
        if (mat == null || mat.length == 0 || mat[0].length == 0) {
            return 0;
        }
        int nums = 0;
        // 定义直方图
        int[] height = new int[mat[0].length];
        // 遍历二维数组
        for (int i = 0; i < mat.length; i++) {
            for (int j = 0; j < mat[0].length; j++) {
                // 判断当前位置是0则值为0，否则增加直方图高度
                height[j] = mat[i][j] == 0 ? 0 : height[j] + 1;
            }
            // 获取当前行的所有矩形数量进行累加
            nums += countFromBottom(height);
        }
        return nums;
    }

    /**
     * 获取arr直方图里面的所有矩形数量
     *
     *
     * @param height 直方图数组
     * @return 直方图里面的所有矩形数量
     */
    private static int countFromBottom(int[] height) {
        if(height == null || height.length < 1) {
            return 0;
        }
        int nums = 0;
        // 数组栈，替代系统栈，性能好. 记录直方图下标
        int[] stack = new int[height.length];
        // 栈里面的数量
        int si = -1;
        for (int i = 0; i < height.length; i++) {
            // 当栈不为空，并且栈里面的值大于等于当前值。则弹出栈
            while (si != -1 && height[stack[si]] >= height[i]) {
                // 弹出当前元素
                int pop = stack[si--];
                // 只处理栈里面的值大于当前值的数据，相等的数据不用处理，最后一次处理即可（忽略相等）
                if(height[pop] > height[i]) {
                    // 左边的最小值就是弹出后栈里面的最大值
                    int left = si == -1 ? -1 : stack[si];
                    // 需要计算矩形数据的长度
                    int n = i - left - 1;
                    // 获取左右两边临近位置相对大的值
                    int down = Math.max(left == -1 ? 0 : height[left], height[i]);
                    // 从上往下计算到当前能处理的位置
                    int h = height[pop] - down;
                    // 累加高度乘以大区域里面的所有矩形数量
                    nums += h * num(n);
                }
            }
            // 入栈
            stack[++si] = i;
        }

        // 处理栈里面剩余的值
        while (si != -1) {
            int pop = stack[si--];
            // 左边的最小值就是弹出后栈里面的最大值
            int left = si == -1 ? -1 : stack[si];
            // 需要计算矩形数据的边长
            int n = height.length - left - 1;
            // 根据公式计算所有的矩形面积
            int down = left == -1 ? 0 : height[left];
            nums += (height[pop] - down) * num(n);
        }

        return nums;
    }

    // 以一列为一个大区域的有n列产生的矩形
    public static int num(int n) {
        return ((n * (1 + n)) >> 1);
    }
```

## 六、获取所有子数组最小值的累加和

### 1、题目

https://leetcode.com/problems/sum-of-subarray-minimums/

给定一个数组arr，返回所有子数组最小值的累加和

### 2、思路

1、当前位置为i，左边临近最小位置是x，右边临近最小位置y。则以当前位置为最小值的累加和为：

- 左边位置：（i-(k+1) +1）= i - k,  右边位置：（j-i）
- 则累加和为：(i-k) * (j-i) * arr[i]

2、计算每个以当前位置为最小值的累加和，然后相加就是所有子数组最小值的累加和

3、有重复值时，则计算到相等位置则结束。解决重复计算问题

### 3、代码

```java
    /**
     * 获取所有子数组最小值的累加和
     *
     * @param arr
     * @return
     */
    public int sumSubarrayMins(int[] arr) {
        int[] stack = new int[arr.length];
        // i位置左边临近最小值位置
        int[] left = nearLessLeft(arr, stack);
        // i位置右边临近最小值位置
        int[] right = nearLessRight(arr, stack);
        long num = 0;
        for (int i = 0; i < arr.length; i++) {
            // 左边的位置数量
            int start = i - left[i];
            // 右边的位置数量
            int end = right[i] - i;
            // 累加当前位置所有子数组最小值
            num += start * end * (long)arr[i];
            num %= 1000000007;
        }
        return (int)num;
    }

    // 用同等长度的数组记录每个位置右边临近最小值的位置
    private static int[] nearLessRight(int[] arr, int[] stack) {
        int n = arr.length;
        int[] right = new int[n];
        int size = 0;
        for (int i = 0; i < n; i++) {
            while (size != 0 && arr[i] < arr[stack[size - 1]]) {
                right[stack[--size]] = i;
            }
            // 将当前值放入栈
            stack[size++] = i;
        }
        // 最小值就是最右边的值
        while (size != 0) {
            right[stack[--size]] = n;
        }
        return right;
    }

    // 用同等长度的数组记录每个位置左边临近最小值的位置
    private static int[] nearLessLeft(int[] arr, int[] stack) {
        int n = arr.length;
        int[] left = new int[n];
        int size = 0;
        // 从右往左进行对比
        for (int i = n - 1; i >= 0; i--) {
            // 当前位置不对比，当前位置小于等于前一个位置的值，则前一个位置最小值就是当前位置。
            while (size !=0 && arr[i] <= arr[stack[size - 1]]) {
                left[stack[--size]] = i;
            }
            // 将当前值放入栈
            stack[size++] = i;
        }
        // 左边没有最小值
        while (size != 0) {
            left[stack[--size]] = -1;
        }
        return left;
    }

```

