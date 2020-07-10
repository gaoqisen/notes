---
title: c++学习的一些记录
date: 2019-7-21 12:43:40
tags: c++
categories: study
keywords: c++基础
description: 自考本科的c++一些复习的资料整理和一些简单的实验程序。
---

## 实验程序

```c++
#include<stdio.h>
int main(void) {
    // 求出1~100之间所有每位数的乘积小于没位数的和的数。例如：13满足1*3＜1+3。
    {
        int i,m,n;
        for(i = 10;i<100;i++) {
            m = i/10;
            n = i%10;
            if(m*n < m +n) {
                printf("%d\n", i);
            }
        }
    }
    printf("+++++++++++++++++++");
    // 求出1~100之间每位数的乘积大于每位数的和的数。例如数字26，数位上数字的乘积12大于数字之和8
    {
        int n,k=1,s=0,m;
        for(n=1;n<=100;n++){ 
            k=1;
            s=0;
            // 1
            m = n;
            while( m > 0 ){ //2
                k*=m%10;
                s+=m%10;
                // 3
                m = m/10;
            }
            if(k>s)
            printf("%d\n",n);
        }
    }    
    return 0;
}
```

## 函数和对象

### 程序基本构成

```c++
// first.cpp  // 注释行
#include <iostream>  // 标准输入输出的预处理命令（将头文件iostream加入到程序中），以＃开头的都是预处理命令
using namespace std; // 使用所有标识符的命名空间
int main(){}   // 是开始执行程序的入口，不管main方法在程序的那个位置，总是先执行，一个程序中，只能有一个主程序。
```

### 指针、引用、常量

```c++
int *p = new int(10);  // 动态分配了一个int类型的变量，并将它赋值给了指针p
delelte p;  // 通过new分配的动态内存空间，必须通过delete运算符释放。
int& r = a;  // 引用，就是创建一个别名，对引用的操作就是对代表的数据对象的操作。不能引用null，引用是必须立即初始化。
const int * p;  // *p是常量，不能进行左值操作
int * const p = &a;   // p本身是常量，不能改变p的指向，内容可以改变
const int * const p = &a; // 指针p和p都不能作为左值。
```

### 析构函数

> 当对象消失时，应使用析构函数释放构造函数分配的内存。在对象的生存期结束时被自动调用。

```
~Point();  // 析构函数用～区分
// 一个类只能有一个析构函数且不能指明参数，不能返回任何类型，void也不行。
```

###  复制构造函数

```
Point(Point&);  //  复制构造函数
```

## 例子

### 友元

```c++
#include <iostream>
using namespace std;
class point{
    private:
        float x;
    public:
        void f(float a){x=a;}
        void f(){x=0;}
    friend float max(point&, point&);
};
float max (point& a, point& b){
    return a.x > b.x ? a.x:b.x;
}
int main(){
    point m, n;
    m.f(2);
    cout << max(m,n); // 异常max不是类的成员函数，是类的友元函数，不能用m.max(a,b)方式调用
    return 0;
}
```

### 指针

```c++
#include <iostream>
 
using namespace std;
 
int main ()
{
   // 指针演示
   int  var1;
   char var2[10];
 
   cout << "var1 变量的地址： ";
   cout << &var1 << endl;
   cout << var1 << endl;
   cout << var2 << endl;

   cout << "var2 变量的地址： ";
   cout << &var2 << endl;

   int *ch;

   cout << ch << endl;
 
   return 0;
}
```

###  形参交换

```c++
#include <iostream>
 using namespace std;
// 交换只是交换了形参的值，是无法达到交换值的效果 
 void swap1(int a, int b){
     int tmp;
     tmp = a;
     a = b;
     b = tmp;
 }
 int main(){
     int a = 1;
     int b = 2;
     swap1(a, b);
     cout<<"a = "<<a<<endl;
     cout<<"b = "<<b<<endl;
     system("pause");
     return 0;
}

```

### 地址传输

```c++
#include <iostream>
using namespace std;
// swap2接受的参数是地址，我们传入地址，就可以直接操作实参的值了
void swap2(int *a, int *b){
    int tmp;
    tmp = *a;
    *a = *b;
    *b = tmp;
}

int main(){
    int a = 1;
    int b = 2;
    swap2(&a, &b);
    cout<<"a = "<<a<<endl;
    cout<<"b = "<<b<<endl;
    system("pause");
    return 0;
}

```

### 指针

```c++
#include <iostream>
 using namespace std;
// int **value， 最接近value的是*，说明value是一个指针，在前一个是*，说明是一个指向指针的指针，这样是合法的，那么如何访问value代表的实际参数的值呢？很简单，用**value就可以了，记住*是一个操作符，如同&一样，不过&是取地址操作符，而*是取值操作符 
 void swap6(int **a, int **b){
     int tmp;
     tmp = **a;
     **a = **b;
     **b = tmp;
 }
 
 int main(){
     int a = 1;
     int b = 2;
     int *aPtr = &a;//指向数据的指针
     int *bPtr = &b;//指向数据的指针
     int **aaPtr = &aPtr;//指向指针的地址的指针
     int **bbPtr = &bPtr;//指向指针的地址的指针
     swap6(aaPtr, bbPtr);
     cout<<"a = "<<a<<endl;
     cout<<"b = "<<b<<endl;
     system("pause");
     return 0;
}
```

### 引用

```c++
#include <iostream>
 using namespace std;
// int*&  value这样一个声明，我们从最接近value的符号看起，是个&，说明value是一个引用，它是一个什么引用呢？再看*，它是一个指针的引用，即指针的别名，我们用*value就可以访问到实参的值了。所以，其交换函数的内部逻辑跟int *是一样的 
 void swap5(int *&a, int *&b){
     int tem = *a;
     *a = *b;
     *b = tem;
 }
 
 int main(){
     int a = 1;
     int b = 2;
 
     int *aPtr = &a;
     int *bPtr = &b;
     int *&arPtr = aPtr;
     int *&brPtr = bPtr;
 
     swap5(arPtr, brPtr);
 
     cout<<"a = "<<a<<endl;
     cout<<"b = "<<b<<endl;
     system("pause");
     return 0;
}


#include <iostream>
using namespace std;
// 引用即别名，通过引用也是可以直接访问到实参和控制实参的
void swap3(int& a, int& b){
    int tmp;
    tmp = a;
    a = b;
    b = tmp;
}

int main(){
    int a = 1;
    int b = 2;
    swap3(a, b);    
        cout<<"a = "<<a<<endl;
    cout<<"b = "<<b<<endl;
    system("pause");
    return 0;
}

```

###  析构函数用例

```c++
#include <iostream>
using namespace std;
class Point{
    private:
        int x,y;
    // 定义一个函数时，必须先要声明    
    public:
        Point();
        Point(int, int);
        ~Point();
};
// 定义不带参数的构造函数
Point::Point():x(0),y(0){
    cout << "默认" << x << "," << y << endl;
};
// 定义带两个参数的构造函数 :x(a),y(b)等同于x=a,y=b
Point::Point(int a, int b):x(a),y(b){
    cout << "赋值" << a << "," << b << endl;
};
Point:: ~Point(void) {
    cout << "析构函数" << endl;
};
int main() {
    // 构造器产生对象
    Point A;
    Point B(15, 16);
    // 数组对象
    Point C[2];
    Point D[2] = {
        Point(5,7), Point(8, 12)
    };

    Point *ptr1 = new Point;
    Point *ptr = new Point(10,23);
    // 删除内存空间中的对象
    delete ptr1;
    delete ptr;

    Point *po = new Point[2];
    delete []po;
};
```

### 构造器的初始化

```c++
#include<iostream>
using namespace std;
class object{
    private:
        int val;
    public:
        object():val(0){
            cout << "object的默认构造器" << endl;
        }
        object(int i) : val(i){
            cout << "object的带参构造器" << val << endl;
        }
        ~object() {
            cout << "objecd的析构函数" << val << endl;
        }
};
class container{
    private:
        object one;
        object two;
        int data;
    public:
        container(): data(0){
            cout << "container的默认构造器" << endl;
        }
        container(int i, int j,int k);
        ~container() {
            cout << "container的析构函数" << data << endl;
        }
};
container::container(int i, int j, int k):two(i), one(j) {
    data = k;
    cout << "container的带参构造器" << data << endl;
}
int main() {
    container obj, anObj(5,6,10);
    return 0;
}
```

### 虚函数

```c++
#include <iostream>
using namespace std;
class A{
    public:
        A(){
            cout << "A的构造函数" << endl;
        }
        virtual void func(){
            cout << "类A的虚函数" << endl;
        }
        ~A(){}
        virtual void fund(){
            cout << "类A的析构函数" << endl;
        }
};
class B : public A{
    public:
        B(){
            cout << "B的构造函数" << endl;
            func();
        }
        void fun() {
            cout << "类B的函数,开始了：";
            func();
        }
        ~B(){
            fund();
        }
};
class C : public B{
    public:
        C(){
            cout << "类C的函数,开始了：";
        }
        void func() {
            cout << "类C的fun函数" << endl;
        }
        ~C(){
            fund();
        }
        void fund(){
            cout << "类C的fund函数" << endl;
        }
};
int main() {
    C c;
    c.fun();
}
```