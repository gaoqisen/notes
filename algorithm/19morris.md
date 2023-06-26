---
title: 17-morris
date: 2023-06-24 20:10:12
tags: algorithm
categories: study
keywords: morris
description: morris算法学习
---

## 一、介绍

一种遍历二叉树的方式，并且时间复杂度O(N)，额外空间复杂度O(1) 通过利用原树中大量空闲指针的方式，达到节省空间的目的

## 二、遍历细节

假设来到当前节点cur，开始时cur来到头节点位置

1）如果cur没有左孩子，cur向右移动(cur = cur.right)

2）如果cur有左孩子，找到左子树上最右的节点mostRight：	

- 如果mostRight的右指针指向空，让其指向cur，	然后cur向左移动(cur = cur.left)	

- 如果mostRight的右指针指向cur，让其指向null，	然后cur向右移动(cur = cur.right)

3）cur为空时遍历停止

## 三、代码

```java
    // 省空间的二叉树遍历时间负责度O(n),空间复杂度O(1)
    public static void morris(Node node) {
        if(node == null) {
            return;
        }

        Node cur = node, mostRight = null;
        // 遍历头节点，如果头节点为空则结束遍历
        while (cur != null) {
            mostRight = cur.left;
            if(mostRight != null) {
                // 右节点不为空并且右节点没有指向当前节点时（没有改过指针）则最右指针往右移动
                while (mostRight.right !=null && mostRight.right != cur) {
                    mostRight = mostRight.right;
                }
                // 如果右边等于空，则最右指向cur，cur往左移动
                if(mostRight.right == null) {
                    mostRight.right = cur;
                    cur = cur.left;
                    continue;
                }
                // 否则最右指向空
                else {
                    mostRight.right = null;
                }
            }
            // 没有左节点则往右移动
            cur = cur.right;
        }
    }	
```



## 四、先、中、后序遍历

### 1、先序

当前节点处理2次的节点，第一次处理时输出。 当前节点处理1次节点时直接输出就是先序遍历

```java
        // morris先序遍历
    public static void morrisPre(Node node) {
        if(node == null) {
            return;
        }

        Node cur = node, mostRight = null;
        // 遍历头节点，如果头节点为空则结束遍历
        while (cur != null) {
            mostRight = cur.left;
            if(mostRight != null) {
                // 右节点不为空并且右节点没有指向当前节点时（没有改过指针）则最右指针往右移动
                while (mostRight.right !=null && mostRight.right != cur) {
                    mostRight = mostRight.right;
                }
                // 如果右边等于空，则最右指向cur，cur往左移动
                if(mostRight.right == null) {
                    // 有两次处理，第一次输出就是先序遍历
                    System.out.print(cur.value + " ");
                    mostRight.right = cur;
                    cur = cur.left;
                    continue;
                }
                // 否则最右指向空
                else {
                    mostRight.right = null;
                }
            } else {
                // 只有一次此处输出就是先序遍历
                System.out.print(cur.value + " ");
            }
            // 没有左节点则往右移动
            cur = cur.right;
        }
        System.out.println();
    }
```

### 2、中序

当前节点处理2次的节点，第二次处理时输出。 当前节点处理1次节点时直接输出就是先序遍历

```java
// morris中序遍历
    public static void morrisIn(Node node) {
        if(node == null) {
            return;
        }

        Node cur = node, mostRight = null;
        // 遍历头节点，如果头节点为空则结束遍历
        while (cur != null) {
            mostRight = cur.left;
            if(mostRight != null) {
                // 右节点不为空并且右节点没有指向当前节点时（没有改过指针）则最右指针往右移动
                while (mostRight.right !=null && mostRight.right != cur) {
                    mostRight = mostRight.right;
                }
                // 如果右边等于空，则最右指向cur，cur往左移动
                if(mostRight.right == null) {
                    mostRight.right = cur;
                    cur = cur.left;
                    continue;
                }
                // 否则最右指向空
                else {
                    mostRight.right = null;
                }
            }
            // 两次和一次的情况都在此处输出就是中序遍历
            System.out.print(cur.value + " ");

            // 没有左节点则往右移动
            cur = cur.right;
        }
        System.out.println();
    }
```

### 3、后序

递归是在第3次处理时打印，但是morris只处理了两次。 

则只处理两次的时机的节点a才进行后序输出，输出时逆序输出左树的右边界。跑完后单独打印整个树的右边界

```java
	    // morris后序遍历
    public static void morrisPos(Node node) {
        if(node == null) {
            return;
        }

        Node cur = node, mostRight = null;
        // 遍历头节点，如果头节点为空则结束遍历
        while (cur != null) {
            mostRight = cur.left;
            if(mostRight != null) {
                // 右节点不为空并且右节点没有指向当前节点时（没有改过指针）则最右指针往右移动
                while (mostRight.right !=null && mostRight.right != cur) {
                    mostRight = mostRight.right;
                }
                // 如果右边等于空，则最右指向cur，cur往左移动
                if(mostRight.right == null) {
                    mostRight.right = cur;
                    cur = cur.left;
                    continue;
                }
                // 否则最右指向空
                else {
                    mostRight.right = null;
                    // 只有第二次输出是才打印左树的右边界
                    printEdge(cur.left);
                }
            }
            // 没有左节点则往右移动
            cur = cur.right;
        }
        // 最后打印整棵树的右边界
        printEdge(node);
    }

    // 打印右边界
    private static void printEdge(Node node) {
        Node tail = reverseEdge(node);
        Node cur = tail;
        while (cur != null) {
            System.out.print(cur.value + " ");
            cur = cur.right;
        }
        reverseEdge(tail);
    }

    // 逆序树
    public static Node reverseEdge(Node from) {
        Node pre = null;
        Node next = null;
        while (from != null) {
            next = from.right;
            from.right = pre;
            pre = from;
            from = next;
        }
        return pre;
    }
```

## 五、获取数最小深度

本题测试链接 : https://leetcode-cn.com/problems/minimum-depth-of-binary-tree/

```java
    public static class TreeNode {
        public int val;
        public TreeNode left;
        public TreeNode right;

        public TreeNode(int x) {
            val = x;
        }
    }

    // 获取最小深度
    public static int minDepth(TreeNode head) {
        if(head == null) {
            return 0;
        }
        TreeNode cur = head;
        TreeNode mostRight = null;
        int curLevel = 0;
        int minHeight = Integer.MAX_VALUE;
        // 遍历头节点，如果头节点为空则结束遍历
        while (cur != null) {
            mostRight = cur.left;
            if(mostRight != null) {
                int rightBoardSize = 1;
                // 右节点不为空并且右节点没有指向当前节点时（没有改过指针）则最右指针往右移动
                while (mostRight.right != null && mostRight.right != cur) {
                    rightBoardSize++;
                    mostRight = mostRight.right;
                }
                // 第一次到达。 如果右边等于空，则最右指向cur，cur往左移动
                if(mostRight.right == null) {
                    curLevel++;
                    mostRight.right = cur;
                    cur = cur.left;
                    continue;
                }

                // 第二次到达
                else {
                    if(mostRight.left == null) {
                        minHeight = Math.min(minHeight, curLevel);
                    }
                    // 第二次到达时减去之前的右边界层数
                    curLevel -= rightBoardSize;
                    mostRight.right = null;
                }
            } else {
                // 只有一次达到
                curLevel++;
            }
            cur = cur.right;
        }

        // 单独遍历左树的最右节点，计算右深度
        int finalRight = 1;
        cur = head;
        while (cur.right != null) {
            finalRight++;
            cur = cur.right;
        }

        // 获取最小的高度
        if(cur.left == null && cur.right == null) {
            minHeight = Math.min(minHeight, finalRight);
        }
        return minHeight;
    }
```







