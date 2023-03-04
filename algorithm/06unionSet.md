---
title: 06_并查集
date: 2023-02-14 23:35:40
tags: algorithm
categories: study
keywords: union lookup set
description: 并查集学习
---

## 一、并查集

```java
// 提供两个方法，在频繁的执行以下方法（执行次数超过样本数）的均摊时间复杂度是O(1)
boolean isSameSet(int[] a, int[] b);

void union(int[] a, int[] b);
```

### 思路

利用包装类+hashmap进行值与值之间的关联，如果有值合并在一起则形成类似树状的结构（树的深度使用路径压缩）。判断是否是一个集合时只需要判断两个值的祖先节点是否相同即可。合并节点也只需将节点相交即可（小节点指向大节点）

### 代码

```java
class UnionSet<V>{

    // 值对应自己的包装类
    private HashMap<V, Node<V>> nodes;
    // 节点于父亲节点的对应关系
    private HashMap<Node<V>, Node<V>> parents;
    // 集合中的数量
    private HashMap<Node<V>, Integer> counts;

    public UnionSet(List<V> list) {
        nodes = new HashMap<>();
        parents = new HashMap<>();
        counts = new HashMap<>();

        if(list == null || list.isEmpty()) {
            return;
        }
        for (V v : list) {
            Node<V> node = new Node<>(v);
            nodes.put(v, node);
            parents.put(node, node);
            counts.put(node, 1);
        }
    }

    // 查找是否相同的集合
    public boolean findSameSet(V a, V b){
        // 如果节点的祖先节点相等则是相同的集合
        return findAncestry(nodes.get(a)) == findAncestry(nodes.get(b));
    }

    // 合并两个节点
    public void union(V a, V b) {
        Node<V> aNode = findAncestry(nodes.get(a));
        Node<V> bNode = findAncestry(nodes.get(b));
        if(aNode == bNode) {
            return;
        }

        // 获取长度
        Integer aLength = counts.get(aNode);
        Integer bLength = counts.get(bNode);
        // 大小重定向
        Node<V> bigNode = aLength > bLength ? aNode : bNode;
        Node<V> smallNode = bigNode == bNode ? aNode : bNode;
        // 小的指向大的
        parents.put(smallNode, bigNode);
        // 大节点增加数量和删除小节点
        counts.put(bigNode, aLength + bLength);
        counts.remove(smallNode);
    }

    // 查找祖先
    private Node<V> findAncestry(Node<V> a) {
        Stack<Node<V>> stack = new Stack<>();
        // 将长集合放入栈中
        while (a != parents.get(a)) {
            stack.push(a);
            a = parents.get(a);
        }

        // 将长集合的每个集合指向祖先节点，优化树的高度
        while (!stack.isEmpty()) {
            parents.put(stack.pop(), a);
        }
        return a;
    }

    private static class Node<V>{
        V value;
        public Node(V v) {
            this.value = v;
        }

    }
}
```

## 二、朋友圈（省份）

有 n 个城市，其中一些彼此相连，另一些没有相连。如果城市 a 与城市 b 直接相连，且城市 b 与城市 c 直接相连，那么城市 a 与城市 c 间接相连。

省份 是一组直接或间接相连的城市，组内不含其他没有相连的城市。

给你一个 n x n 的矩阵 isConnected ，其中 isConnected[i][j] = 1 表示第 i 个城市和第 j 个城市直接相连，而 isConnected[i][j] = 0 表示二者不直接相连。

返回矩阵中 省份 的数量。
链接：https://leetcode.cn/problems/number-of-provinces

### 思路

1、用并查集实现，如果i和j=1. 则两个值关联上

2、获取集合的数量就是矩阵中的数量

### 代码

```java
public static int findCircleNum(int[][] M) {
        int n = M.length;
        UnionFind unionFind = new UnionFind(n);
        // 遍历数组
        for (int i = 0; i < n; i++) {
            for (int j = i+1; j < n; j++) {
                // 如果i位置和j位置相连则合并
                if(M[i][j] == 1) {
                    unionFind.union(i, j);
                }
            }
        }

        return unionFind.sets;
    }
    public static class UnionFind{
        /**
         * 父亲节点
         * [0,1]： 代表下标为0节点的父节点为0，下标为1节点的父节点为1
         * [1,0]： 代表下标为0节点的父节点为1，下标为1节点的父节点为0
         */
        private int[] parent;
    
        /**
         * 存放大小
         */
        private int[] size;
    
        // 辅助数组，用来代替栈
        private int[] help;
    
        // 集合数量
        private int sets;
    
        public UnionFind(int n) {
            parent = new int[n];
            size = new int[n];
            help = new int[n];
            sets = n;
            for (int i = 0; i < n; i++) {
                parent[i] = i;
                size[i] = 1;
            }
        }
    
        // 查找祖先
        private int find(int n) {
            int i = 0;
            // 遍历如果n的父值不是n则往上赋值， help存父值
            while (n != parent[n]) {
                help[i++] = parent[n];
                n = parent[n];
            }
            // 路径压缩，将help里面的值都指向n
            for (i--; i>=0; i--) {
                parent[help[i]] = n;
            }
            return n;
        }
    
        private void union(int i, int j) {
            int i1 = find(i);
            int i2 = find(j);
            // 两个父节点不是一个则合并
            if(i1 != i2) {
                // 数量小的集合合并到数量大的集合
                if(size[i1] > size[i2]) {
                    parent[i2] = i1;
                    size[i1] += size[i2];
                } else {
                    parent[i1] = i2;
                    size[i2] += size[i1];
                }
                sets--;
            }
        }
    }
```

## 三、岛数量

给你一个由 '1'（陆地）和 '0'（水）组成的的二维网格，请你计算网格中岛屿的数量。

岛屿总是被水包围，并且每座岛屿只能由水平方向和/或竖直方向上相邻的陆地连接形成。

此外，你可以假设该网格的四条边均被水包围。

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/number-of-islands

### 递归方式

```java
    /**
     * 递归方式寻找岛
     * 遍历二维数组，遇到一个岛屿就进行递归找上下左右的岛屿
     */
    public static int numIslands(char[][] board) {
        int isLands = 0;
        for (int i = 0; i < board.length; i++) {
            for(int j = 0; j < board[0].length; j++) {
                if(board[i][j] == '1') {
                    isLands++;
                    infect(board, i, j);
                }
            }
        }
        return isLands;
    }

    // 找到岛屿之后就将岛屿改为0， 并递归寻找该岛上下左右是否是岛屿
    private static void infect(char[][] board, int i, int j) {
        if(i < 0 || i == board.length || j < 0 || j == board[0].length || board[i][j] != '1'){
            return;
        }
        board[i][j] = '0';
        infect(board, i - 1, j);
        infect(board, i + 1, j);
        infect(board, i, j - 1);
        infect(board, i, j + 1);
    }
```

### 并查集方式

#### 思路

1、将所有陆地初始化为list集合

2、判断每个值的左边和上边是否是陆地（每个值都判断左边和上边就不用判断左边和下边）

3、合并的集合数量就是岛的数量

```java
    public static void main(String[] args) {
        char[][] list = new char[][]{"11110".toCharArray(),"11010".toCharArray(),"11000".toCharArray(),"00000".toCharArray()};
        System.out.print(numIslands1(list));
    }

    private static class Dot{}

    // 利用空对象判断，null表示水，对象表示陆地
    public static int numIslands(char[][] board) {
        int row = board.length;
        int col = board[0].length;
        Dot[][] dots = new Dot[row][col];
        // 将char二维数组以dot二维素组形式组装，路径就是dot对象，水为null。并将dot放到list里面
        List<Dot> dotList = new ArrayList<>();
        for (int i = 0; i < row; i++) {
            for(int j = 0; j < col; j++) {
                if(board[i][j] == '1') {
                    dots[i][j] = new Dot();
                    dotList.add(dots[i][j]);
                }
            }
        }

        // 先遍历列，判断是陆地则进行合并操作
        UnionHashMap<Dot> unionHashMap = new UnionHashMap<>(dotList);
        for (int i = 1; i < col; i++) {
            if(board[0][i-1] == '1' && board[0][i] == '1') {
                unionHashMap.union(dots[0][i-1], dots[0][i]);
            }
        }

        // 遍历行，判断是陆地则进行合并操作
        for (int i = 1; i < row; i++) {
            if(board[i - 1][0] == '1' && board[i][0] == '1') {
                unionHashMap.union(dots[i - 1][0], dots[i][0]);
            }
        }

        // 遍历中间的其他水和陆地，是陆地则进行合并操作
        for (int i = 1; i < row; i++) {
            for (int j = 1; j < col; j++) {
                if(board[i][j] == '1') {
                    // 判断上边是陆地则合并
                    if(board[i][j-1] == '1') {
                        unionHashMap.union(dots[i][j], dots[i][j-1]);
                    }
                    // 判断左边是陆地则合并
                    if(board[i-1][j] == '1') {
                        unionHashMap.union(dots[i][j], dots[i-1][j]);
                    }
                }
            }
        }
        // 合并后的集合就是陆地的数量
        return unionHashMap.getSize();
    }

    private static class UnionHashMap<V>{

        private HashMap<V, Node<V>> nodes;
        private HashMap<Node<V>, Node<V>> parents;
        private HashMap<Node<V>, Integer> sizes;

        public UnionHashMap(List<V> list) {
            nodes = new HashMap<>();
            parents = new HashMap<>();
            sizes = new HashMap<>();
            for (V v : list) {
                Node node = new Node(v);
                nodes.put(v, node);
                parents.put(node, node);
                sizes.put(node, 1);
            }
        }

        public int getSize() {
            return sizes.size();
        }

        // 合并两个元素
        public void union(V a, V b) {
            Node<V> aNode = findAncestor(nodes.get(a));
            Node<V> bNode = findAncestor(nodes.get(b));
            if(aNode != bNode) {
                int aLength = sizes.get(aNode);
                int bLength = sizes.get(bNode);
                Node maxNode = aLength > bLength ? aNode : bNode;
                Node minNode = maxNode == aNode ? bNode : aNode;
                parents.put(minNode, maxNode);
                sizes.put(maxNode, aLength + bLength);
                sizes.remove(minNode);
            }
        }

        // 获取祖先节点
        private Node<V> findAncestor(Node<V> node){
            Stack<Node<V>> stack = new Stack<>();
            while (node != parents.get(node)) {
                stack.push(node);
                node = parents.get(node);
            }

            // 路径压缩，将所有的
            while (!stack.isEmpty()) {
                Node<V> pop = stack.pop();
                parents.put(pop, node);
            }
            return node;
        }
    }
    private static class Node<T>{
        private T val;

        public Node(T val) {
            this.val = val;
        }
    }
```



#### 优化思路

上面是利用空对象和空+hashmap实现的，可以进行优化，用数组的方式代替hashmap。

将二维数组转换为一维数组（i，j 对应 i*列数+j）

```java
public static int numIslands(char[][] board) {
        int row = board.length;
        int col = board[0].length;
        UnionArray unionArray = new UnionArray(board);
        // 遍历列board[0][i]
        for (int i = 1; i < col; i++) {
            if(board[0][i-1] == '1' && board[0][i] == '1') {
                unionArray.union(0, i, 0, i-1);
            }
        }

        // 遍历行board[i][0]
        for (int i = 1; i < row; i++) {
            if(board[i -1][0] == '1' && board[i][0] == '1') {
                unionArray.union(i-1, 0, i, 0);
            }
        }
        for (int i = 1; i < row; i++) {
            for (int j = 1; j < col; j++) {
                if(board[i][j] == '1') {
                    if(board[i][j-1] == '1') {
                        unionArray.union(i, j, i, j-1);
                    }
                    if(board[i-1][j] == '1') {
                        unionArray.union(i, j, i-1, j);
                    }
                }
            }
        }
        return unionArray.getSize();
    }


        // 数组的方式实现并查集
    private static class UnionArray{

        // 节点的父节点
        private int[] parent;
        // 节点的数量
        private int[] sizes;
        // 辅助数组用于代替栈作路径压缩
        private int[] help;
        // 列数
        private int col;
        // 岛数量
        private int size;

        public UnionArray(char[][] board) {
            this.col = board[0].length;
            int row = board.length;
            int length = col * row;
            parent = new int[length];
            sizes = new int[length];
            this.size = 0;
            help = new int[length];
            for (int i = 0; i < row; i++) {
                for (int j = 0; j < col; j++) {
                    if(board[i][j] == '1') {
                        int index = index(i, j);
                        this.parent[index] = index;
                        this.sizes[index] = 1;
                        this.size++;
                    }
                }
            }
        }

        public void union(int ra, int ca, int rb, int cb) {
            int aIndex = index(ra, ca);
            int bIndex = index(rb, cb);
            // 获取祖先的下标
            int aAncestor = findAncestor(aIndex);
            int bAncestor = findAncestor(bIndex);
            if(aAncestor != bAncestor) {
                // 将短的集合指向长集合，并合并数量
                if(this.sizes[aAncestor] > this.sizes[bAncestor]) {
                    this.parent[bAncestor] = aAncestor;
                    this.sizes[aAncestor] += sizes[bAncestor];
                } else {
                    this.parent[aAncestor] = bAncestor;
                    this.sizes[bAncestor] += sizes[aAncestor];
                }
                this.size--;
            }
        }

        private int findAncestor(int val) {
            int i = 0;
            while (val != parent[val]) {
                help[i++] = val;
                val = parent[val];
            }

            // 路径压缩，将help里面的下标都指向祖先
            for (i--; i >= 0; i--) {
                parent[help[i]] = val;
            }
            return val;
        }

        // 获取数组的下标，行数从0开始*列总数+当前行位置
        private int index(int r, int c) {
            return r * col + c;
        }

        public int getSize() {
            return this.size;
        }
    }
```

## 四、获取每一步岛数量

### 思路

先将二维数组初始化后，在并查集中新增一个链接方法，用来将给定的合并到并查集数组中（新加的值和前后左右的值进行对比），每次链接时返回岛数量。收集岛数量返回即可。

### 代码

```java
// 给定二维数组和指定的岛数量，获取每多一个值的岛数量
    public static List<Integer> numIslands21(int m, int n, int[][] positions) {
        // 先初始化数组
        UnionArray unionArray = new UnionArray(m, n);
        List<Integer> result = new ArrayList<>();
        for (int[] position : positions) {
            // 每个点进行链接合并后获取岛数量
            result.add(unionArray.connect(position[0], position[1]));
        }
        return result;
    }
    
    private static class UnionArray{

        private int[] parent;
        // 通过sizes[i]是否等于0标记是否初始化过
        private int[] sizes;
        private int[] help;
        private int size;
        private int row;
        private int col;
        
        public UnionArray(int r, int c) {
            col = c;
            row = r;
            int length = r * c;
            parent = new int[length];
            sizes = new int[length];
            help = new int[length];
            size = 0;
        }

        public int connect(int r, int c) {
            // 判断当前位置已经合并过则直接返回数量
            int index = getIndex(r, c);
            if(sizes[index] == 0) {
                // 给当前值赋值
                parent[index] = index;
                sizes[index] = 1;
                size++;
                // 当前值 的前后左右进行合并
                union(r -1, c, r, c);
                union(r + 1, c, r, c);
                union(r, c - 1, r, c);
                union(r, c + 1, r, c);
            }
            return size;
        }

        // 并查集的合并操作
        private void union(int ar, int ac, int br, int bc) {
            if(ar < 0 || ar == row || ac < 0 || ac == col || br < 0 || br == row || bc < 0 || bc == col) {
                return;
            }
            int ai = getIndex(ar, ac);
            int bi = getIndex(br, bc);
            if(sizes[ai] == 0 || sizes[bi] == 0) {
                return;
            }
            int af = findAncestor(ai);
            int bf = findAncestor(bi);
            if(af != bf) {
                int aLength = sizes[af];
                int bLength = sizes[bf];
                if(aLength > bLength) {
                    parent[bf] = af;
                    sizes[af] += sizes[bf];
                } else {
                    parent[af] = bf;
                    sizes[bf] += sizes[af];
                }
                size--;
            }
        }

        // 获取下标
        private int getIndex(int r, int c) {
            return r * col + c;
        }

        // 获取祖先节点
        private int findAncestor(int val) {
            int i = 0;
            while (val != parent[val]) {
                help[i++] = val;
                val = parent[val];
            }
            for(i--; i>=0; i--) {
                parent[help[i]] = val;
            }
            return val;
        }
    }
```

每次都先初始化数组，如果矩阵特别大，但是给定的值很少。就会浪费空间，可以用hashmap + String.valueOf(row + "_" + col)实现。









