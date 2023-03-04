---
title: 03_链表算法学习
date: 2023-01-14 20:43:40
tags: algorithm
categories: study
keywords: link
description: 学习算法的第二步，链表算法归纳总结。
---

## 一、快慢指针代码练习

求链表的中点值，慢指针步长是1，快指针的步长是2。快指针走完的时候，慢指针就是中点值。

```java
public static class FastSlowPointer{

        public Node root;
        public Node current;

        public FastSlowPointer() {
            this.root = new Node();
            this.current = root;

        }

        public void push(Node node) {
            this.current.next = node;
            this.current = node;
        }

        // 1）输入链表头节点，奇数长度返回中点，偶数长度返回上中点
        public Node getMiddle1() {
            if(this.root == null || this.root.next == null || this.root.next.next == null) {
                return null;
            }
            Node fast = this.root.next.next.next;
            Node slow = this.root.next.next;
            while ( fast.next != null && fast.next.next != null) {
                fast = fast.next.next;
                slow = slow.next;
            }
            return slow;
        }

        // 2）输入链表头节点，奇数长度返回中点，偶数长度返回下中点
        public Node getMiddle2() {
            if(this.root == null || this.root.next == null || this.root.next.next == null) {
                return null;
            }
            Node fast = this.root.next.next;
            Node slow = this.root.next.next;
            while ( fast.next != null && fast.next.next != null) {
                fast = fast.next.next;
                slow = slow.next;
            }
            return slow;
        }

        // 3) 输入链表头节点，奇数长度返回中点前一个，偶数长度返回上中点前一个
        public Node getMiddle3() {
            if(this.root == null || this.root.next == null || this.root.next.next == null) {
                return null;
            }
            Node fast = this.root.next.next.next;
            Node slow = this.root.next;
            while ( fast.next != null && fast.next.next != null) {
                fast = fast.next.next;
                slow = slow.next;
            }
            return slow;
        }

        // 4）输入链表头节点，奇数长度返回中点前一个，偶数长度返回下中点前一个
        public Node getMiddle4() {
            if(this.root == null || this.root.next == null || this.root.next.next == null) {
                return null;
            }
            Node fast = this.root.next.next;
            Node slow = this.root.next;
            while ( fast.next != null && fast.next.next != null) {
                fast = fast.next.next;
                slow = slow.next;
            }
            return slow;
        }
    }
```

## 二、给定链表判断是否为回文

### 1、利用栈额外空间复杂度为O(N)

```java
    // 用栈实现回文，先将节点放入栈中。之后弹出值与节点数据进行比较
    public static boolean isPalindromes(Node node) {
        Node current = node;
        Stack<Integer> stack = new Stack<>();
        while (current != null) {
            stack.push(current.val);
            current = current.next;
        }

        Node i = node;
        while (i != null) {
            if(i.val != stack.pop()) {
                return false;
            }
            i = i.next;

        }
        return true;
    }
```



### 2、利用栈额外空间复杂度为O(N/2)

```java

    // 利用快慢指针实现，空间复杂度小一半
    public static boolean isPalindromes1(Node node) {
        // 利用快慢指针获取节点的中间数，奇数获取中间值，偶数获取中下节点
        Node fast = node.next;
        Node slow = node.next;
        while (fast.next !=null && fast.next.next !=null) {
            fast = fast.next.next;
            slow = slow.next;
        }

        // 将中间值后面的元素放入栈中
        Stack<Integer> stack = new Stack<>();
        while (slow != null) {
            stack.push(slow.val);
            slow = slow.next;
        }

        // 对比栈里面抛出的元素和节点元素，不一样则不是回文
        Node current = node;
        while (!stack.isEmpty()) {
            if(current.val != stack.pop()) {
                return false;
            }
            current = current.next;
        }
        return true;
    }
```



### 3、额外空间复杂度O(1)

1、用快慢指针找到中点值

2、将中点值后面的值逆序

3、对比两边的值不相等则保存返回值

4、将之前的逆序值还原

```java
    // 不用堆，直接找到中值后进行数字比较
    public static boolean isPalindromes2(Node node) {
        Node fast = node;
        Node slow = node;
        while (fast.next != null && fast.next.next != null) {
            fast = fast.next.next;
            slow = slow.next;
        }

        // 逆序后面的数据
        Node newHead = slow.next; // fast是中间数后面的值
        slow.next = null; // 从中间切断
        Node temp = null;
        while (newHead!= null) {
            temp = newHead.next;
            newHead.next = slow;
            slow = newHead;
            newHead = temp;
        }

        temp  = node;
        fast = slow;
        boolean res = true;
        while (temp != null && fast!=null) {
            if(temp.val != fast.val) {
                res = false;
                break;
            }
            temp = temp.next;
            fast = fast.next;
        }

        // 重新逆序还原
        temp = slow.next;
        slow.next = null;
        while (temp != null) {
            fast = temp.next;
            temp.next = slow;
            slow = temp;
            temp = fast;
        }

        return res;
    }
```



## 三、将链表区分为左边小中间等右边大

### 1、思路

- 创建6个变量小于指定数的头和尾节点、等于指定数的头和尾节点、大于指定数的头和尾节点

- 遍历链表，将各个区域的节点用头尾进行串联

- 将小于指定数的尾节点指向等于指定数的头节点，等于指定数的尾节点指向大于指定数的头节点

- 边界值处理。

### 2、代码

```java
    /**
     * 通过有限几个变量进行分区，额外空间复杂度低
     */
    public static Node partition(Node node, int pivot) {
        // 1、定义小于区域的头和尾节点，等于区域的头和尾节点，大于区域的头和尾节点
        Node smallHead = null, smallTail = null;
        Node equalHead = null, equalTail = null;
        Node bigHead = null, bigTail = null;

        // 2、遍历所有节点，将小于、等于、大于的区域通过头尾节点串连
        Node temp = null;
        while (node != null) {
            temp = node.next;
            node.next = null;
            if(node.val < pivot) {
                if(smallHead == null) {
                    smallHead = node;
                    smallTail = node;
                } else {
                    smallTail.next = node;
                    smallTail = node;
                }
            }

            if(node.val == pivot) {
                if(equalHead == null) {
                    equalHead = node;
                    equalTail = node;
                } else {
                    equalTail.next = node;
                    equalTail = node;
                }
            }

            if(node.val > pivot) {
                if(bigHead == null) {
                    bigHead = node;
                    bigTail = node;
                } else {
                    bigTail.next = node;
                    bigTail = node;
                }
            }
            node = temp;
        }

        // 3、将小于区域的尾节点连等于区域的头，等于区域的尾连大于区域的头
        if(smallHead != null) {
            // 小于区域存在值，则将小于区域的next指向等于区域的头
            smallTail.next = equalHead;
            // 等于区域有值则等于区域保持不变，否则等于区域的尾为小于区域的尾
            equalTail = equalTail == null ? smallTail : equalTail;
        }

        if(equalHead != null) {
            equalTail.next = bigHead;
        }

        if(smallHead != null) {
            return smallHead;
        }
        if(equalHead != null) {
            return equalHead;
        }

        return bigHead;
    }
```

## 四、复制存在指向任意节点的链表

可以利用hashmap实现，但是存在额外空间复杂度。如下代码：

```java
    public static Node copyWithHashMap(Node head) {
        // 将新旧节点都放到map容器中
        Map<Node, Node> map = new HashMap<>();
        Node index = head;
        while (index != null) {
            map.put(index, new Node(index.val));
            index = index.next;
        }

        // 将容器中新节点的下一个和随机元素指向新节点的位置
        index = head;
        while (index != null) {
            map.get(index).next = map.get(index.next);
            map.get(index).random = map.get(index.random);

            index = index.next;
        }

        return map.get(head);
    }
```

最理想的方案就是利用有限几个变量指针实现如下：

### 1、思路

- 创建克隆节点并将当前节点的next指向克隆节点，克隆节点的next指向当前节点的next(用node的结构去构建)

- 每次遍历一对，克隆节点的random就是遍历节点random的next

- 将结构分离出来

### 2、代码

 ```java
 public static Node copyRandomNode(Node head) {
         if(head == null) {
             return null;
         }
         // 1、创建克隆节点并将当前节点的next指向克隆节点，克隆节点的next指向当前节点的next(用node的结构去构建)
         Node current = head, next = null;
         while (current != null) {
             next = current.next;
             Node node = new Node(current.val);
             node.next = next;
             current.next = node;
             current = next;
         }
 
         // 2、每次遍历一对，克隆节点的random就是遍历节点random的next
         current = head;
         Node copy = null;
         while (current != null) {
             copy = current.next;
             copy.random = current.random == null ? null : current.random.next;
             current = current.next.next;
         }
 
         // 3、将结构分离出来
         Node res = head.next;
         current = head;
         while (current != null) {
             next = current.next.next;
             copy = current.next;
             copy.next = next == null ? null : next.next;
             current.next = next;
             current = next;
         }
         return res;
     }
 ```

## 五、两个有环或无环列表获取相交节点

https://leetcode.cn/problems/3u1WK4/submissions/

### 1、思路

- 给定一个单链表，如果无环则返回null(无环则一定会走到null)，有环则返回第一个入环节点。得到loop1和loop2
  - 用容器：用hashSet获取闭合处节点，遍历链表，如果在hashSet里面存在则返回节点，不存在则返回null
  - 不用容器：利用快慢指针（快2慢1），快指针如果走到null则是无环直接返回null，如果有环则快指针和慢指针会相遇。相遇后快指针返回头节点后两个指针步长都为1。之后的相遇节点就是入环节点。
- 分情况处理两个环的入环节点
  - loop1和loop2都为空，则两个无环链表相交
    - 用容器：利用hashSet将第一个环存入，之后用第二环判断元素存在返回存在的元素节点，不存在则返回null
    - 不用容器：遍历两个链表如果最后一个节点的地址相同则相交。长的链表先走两个节点的长度差后在判断两个节点地址是否相同，第一个相等的节点就是相交节点。
  - 两个链表其中一个有环，不可能相交
  - 两个链表都有环
    - ![](https://gaoqisen.github.io/GraphBed/202301/20230127183904.png)
    - loop1和loop2的地址相等，就是两个无环链表求第一个相交节点
    - loop1和loop2的地址不相等，遍历链表一如果在链表中没遇到loop2则无相交节点，遇到loop2则存在相交节点返回loop1或loop2都可以。

### 2、实现

```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) {
 *         val = x;
 *         next = null;
 *     }
 * }
 */
public class Solution {
    public static ListNode getIntersectionNode(ListNode listNode1, ListNode listNode2) {
        if(listNode1 == null || listNode2 == null) {
            return null;
        }

        ListNode loop1 = findFirstInputLoopNode(listNode1);
        ListNode loop2 = findFirstInputLoopNode(listNode2);

        // 两个无环链表相交
        if(loop1 == null && loop2 == null) {
            return notLoopNodeIntersect(listNode1, listNode2);
        }

        // 两个链表都有环
        if(loop1 != null && loop2 != null) {
            return loopNodeIntersect(listNode1, loop1, listNode2, loop2);
        }

        // 两个链表其中一个有环，不可能相交
        return null;
    }

    /**
     * 两个有环单链表
     * - loop1和loop2的地址相等，就是两个无环链表求第一个相交节点
     * - loop1和loop2的地址不相等，遍历链表一如果在链表中没遇到loop2则无相交节点，遇到loop2则存在相交节点返回loop1或loop2都可以。
     */
    public static ListNode loopNodeIntersect(ListNode listNodeOne, ListNode loopOne, ListNode listNodeTwo, ListNode loopTwo) {
        ListNode currentOne = null;
        ListNode currentTwo = null;
        if(loopOne == loopTwo){
            currentOne = listNodeOne;
            currentTwo = listNodeTwo;
            int i = 0;
            while (currentOne != loopOne) {
                currentOne = currentOne.next;
                i++;
            }

            while (currentTwo != loopTwo) {
                currentTwo = currentTwo.next;
                i--;
            }

            // 将长的赋值给lastNodeOne, 短的赋值给lastNodeTwo
            currentOne = i > 0 ? listNodeOne : listNodeTwo;
            currentTwo = currentOne == listNodeOne ? listNodeTwo : listNodeOne;

            i = Math.abs(i);
            while (i != 0) {
                currentOne = currentOne.next;
                i--;
            }
            while (currentOne != currentTwo) {
                currentOne = currentOne.next;
                currentTwo = currentTwo.next;
            }
            return currentOne;
        }

        // loop1和loop2的地址不相等，遍历链表一如果在链表中没遇到loop2则无相交节点，遇到loop2则存在相交节点返回loop1或loop2都可以。
        else {
            currentOne = listNodeOne.next;
            while (currentOne != loopOne) {
                if(currentOne == loopTwo) {
                    return loopTwo;
                }
                currentOne = currentOne.next;
            }
            return null;
        }
    }


    /**
     * 两个无环单链表
     *
     * 遍历两个链表如果最后一个节点的地址相同则相交。
     * 长的链表先走 两个节点的长度差 后在判断两个节点地址是否相同，第一个相等的节点就是相交节点。
     */
    public static ListNode notLoopNodeIntersect(ListNode listNodeOne, ListNode listNodeTwo) {
        ListNode lastListNodeOne = listNodeOne;
        int nodeLength = 0;
        while (lastListNodeOne.next != null) {
            lastListNodeOne = lastListNodeOne.next;
            nodeLength++;
        }

        ListNode lastListNodeTwo = listNodeTwo;
        while (lastListNodeTwo.next != null) {
            lastListNodeTwo = lastListNodeTwo.next;
            nodeLength--;
        }
        // 最后一个节点的地址不相同则不会相交
        if(lastListNodeOne != lastListNodeTwo) {
            return null;
        }

        // 将长的赋值给lastNodeOne, 短的赋值给lastNodeTwo
        lastListNodeOne = nodeLength > 0 ? listNodeOne : listNodeTwo;
        lastListNodeTwo = lastListNodeOne == listNodeOne ? listNodeTwo : listNodeOne;

        // 长的节点先走掉差值
        int abs = Math.abs(nodeLength);
        while (abs != 0) {
            lastListNodeOne = lastListNodeOne.next;
            abs--;
        }

        // 走到相等为止
        while (lastListNodeOne != lastListNodeTwo) {
            lastListNodeOne = lastListNodeOne.next;
            lastListNodeTwo = lastListNodeTwo.next;
        }
        return lastListNodeOne;
    }

    /**
     * 获取第一个入环节点，没有入环节点则返回null
     *
     * 实现方式：利用快慢指针(快2慢1)，走到相交节点时快指针回到头，之后快指针步长改为1，
     * 重新相遇后的第一个节点就是入环的第一个的节点，快指针遇到null则链表节点无入环节点
     */
    public static ListNode findFirstInputLoopNode(ListNode head) {
        if(head == null || head.next == null || head.next.next == null) {
            return null;
        }
        ListNode fast = head.next.next, slow = head.next;
        boolean isIntersect = false, firstHead = true;
        while (fast != null) {
            if(fast == slow) {
                // 第二次相遇的节点直接返回
                if(isIntersect) {
                    return slow;
                }
                isIntersect = true;
            }
            slow = slow.next;
            if(fast.next == null) {
                return null;
            }
            if(isIntersect) {
                if(firstHead) {
                    firstHead = false;
                    fast = head;
                }
                fast = fast.next;
            } else {
                fast = fast.next.next;
            }
        }
        return null;
    }
}
```



## 六、单链表删除节点

思路：遇到当前节点是删除节点时，将当前节点置为下一个节点，并将当前节点的下一个节点置为下下一个节点。

```java
    /**
     * 1、删除节点返回必须是节点，可能删除的就是头节点
     * 2、只是给删除的节点，不给头节点。只能往后遍历，获取不到前面的节点。 无法删除最后一个节点
     */
    public static Node level(Node node, Node level) {
        if(node == null || level == null) {
            return node;
        }
        Node current = node;
        // 只删除单链表无环
        while (true) {
            if(current == level) {
                current.val = current.next.val;
                current.next =  current.next.next;
                break;
            } else if(current.next.next == null) {
                current.next = null;
                break;
            }
            current = current.next;
        }
        return node;
    }
```



