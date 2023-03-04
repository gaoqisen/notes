<template><div><h2 id="实验程序" tabindex="-1"><a class="header-anchor" href="#实验程序" aria-hidden="true">#</a> 实验程序</h2>
<div class="language-c++ line-numbers-mode" data-ext="c++"><pre v-pre class="language-c++"><code>#include&lt;stdio.h&gt;
int main(void) {
    // 求出1~100之间所有每位数的乘积小于没位数的和的数。例如：13满足1*3＜1+3。
    {
        int i,m,n;
        for(i = 10;i&lt;100;i++) {
            m = i/10;
            n = i%10;
            if(m*n &lt; m +n) {
                printf(&quot;%d\n&quot;, i);
            }
        }
    }
    printf(&quot;+++++++++++++++++++&quot;);
    // 求出1~100之间每位数的乘积大于每位数的和的数。例如数字26，数位上数字的乘积12大于数字之和8
    {
        int n,k=1,s=0,m;
        for(n=1;n&lt;=100;n++){ 
            k=1;
            s=0;
            // 1
            m = n;
            while( m &gt; 0 ){ //2
                k*=m%10;
                s+=m%10;
                // 3
                m = m/10;
            }
            if(k&gt;s)
            printf(&quot;%d\n&quot;,n);
        }
    }    
    return 0;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="函数和对象" tabindex="-1"><a class="header-anchor" href="#函数和对象" aria-hidden="true">#</a> 函数和对象</h2>
<h3 id="程序基本构成" tabindex="-1"><a class="header-anchor" href="#程序基本构成" aria-hidden="true">#</a> 程序基本构成</h3>
<div class="language-c++ line-numbers-mode" data-ext="c++"><pre v-pre class="language-c++"><code>// first.cpp  // 注释行
#include &lt;iostream&gt;  // 标准输入输出的预处理命令（将头文件iostream加入到程序中），以＃开头的都是预处理命令
using namespace std; // 使用所有标识符的命名空间
int main(){}   // 是开始执行程序的入口，不管main方法在程序的那个位置，总是先执行，一个程序中，只能有一个主程序。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="指针、引用、常量" tabindex="-1"><a class="header-anchor" href="#指针、引用、常量" aria-hidden="true">#</a> 指针、引用、常量</h3>
<div class="language-c++ line-numbers-mode" data-ext="c++"><pre v-pre class="language-c++"><code>int *p = new int(10);  // 动态分配了一个int类型的变量，并将它赋值给了指针p
delelte p;  // 通过new分配的动态内存空间，必须通过delete运算符释放。
int&amp; r = a;  // 引用，就是创建一个别名，对引用的操作就是对代表的数据对象的操作。不能引用null，引用是必须立即初始化。
const int * p;  // *p是常量，不能进行左值操作
int * const p = &amp;a;   // p本身是常量，不能改变p的指向，内容可以改变
const int * const p = &amp;a; // 指针p和p都不能作为左值。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="析构函数" tabindex="-1"><a class="header-anchor" href="#析构函数" aria-hidden="true">#</a> 析构函数</h3>
<blockquote>
<p>当对象消失时，应使用析构函数释放构造函数分配的内存。在对象的生存期结束时被自动调用。</p>
</blockquote>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>~Point();  // 析构函数用～区分
// 一个类只能有一个析构函数且不能指明参数，不能返回任何类型，void也不行。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="复制构造函数" tabindex="-1"><a class="header-anchor" href="#复制构造函数" aria-hidden="true">#</a> 复制构造函数</h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>Point(Point&amp;);  //  复制构造函数
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="例子" tabindex="-1"><a class="header-anchor" href="#例子" aria-hidden="true">#</a> 例子</h2>
<h3 id="友元" tabindex="-1"><a class="header-anchor" href="#友元" aria-hidden="true">#</a> 友元</h3>
<div class="language-c++ line-numbers-mode" data-ext="c++"><pre v-pre class="language-c++"><code>#include &lt;iostream&gt;
using namespace std;
class point{
    private:
        float x;
    public:
        void f(float a){x=a;}
        void f(){x=0;}
    friend float max(point&amp;, point&amp;);
};
float max (point&amp; a, point&amp; b){
    return a.x &gt; b.x ? a.x:b.x;
}
int main(){
    point m, n;
    m.f(2);
    cout &lt;&lt; max(m,n); // 异常max不是类的成员函数，是类的友元函数，不能用m.max(a,b)方式调用
    return 0;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="指针" tabindex="-1"><a class="header-anchor" href="#指针" aria-hidden="true">#</a> 指针</h3>
<div class="language-c++ line-numbers-mode" data-ext="c++"><pre v-pre class="language-c++"><code>#include &lt;iostream&gt;
 
using namespace std;
 
int main ()
{
   // 指针演示
   int  var1;
   char var2[10];
 
   cout &lt;&lt; &quot;var1 变量的地址： &quot;;
   cout &lt;&lt; &amp;var1 &lt;&lt; endl;
   cout &lt;&lt; var1 &lt;&lt; endl;
   cout &lt;&lt; var2 &lt;&lt; endl;

   cout &lt;&lt; &quot;var2 变量的地址： &quot;;
   cout &lt;&lt; &amp;var2 &lt;&lt; endl;

   int *ch;

   cout &lt;&lt; ch &lt;&lt; endl;
 
   return 0;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="形参交换" tabindex="-1"><a class="header-anchor" href="#形参交换" aria-hidden="true">#</a> 形参交换</h3>
<div class="language-c++ line-numbers-mode" data-ext="c++"><pre v-pre class="language-c++"><code>#include &lt;iostream&gt;
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
     cout&lt;&lt;&quot;a = &quot;&lt;&lt;a&lt;&lt;endl;
     cout&lt;&lt;&quot;b = &quot;&lt;&lt;b&lt;&lt;endl;
     system(&quot;pause&quot;);
     return 0;
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="地址传输" tabindex="-1"><a class="header-anchor" href="#地址传输" aria-hidden="true">#</a> 地址传输</h3>
<div class="language-c++ line-numbers-mode" data-ext="c++"><pre v-pre class="language-c++"><code>#include &lt;iostream&gt;
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
    swap2(&amp;a, &amp;b);
    cout&lt;&lt;&quot;a = &quot;&lt;&lt;a&lt;&lt;endl;
    cout&lt;&lt;&quot;b = &quot;&lt;&lt;b&lt;&lt;endl;
    system(&quot;pause&quot;);
    return 0;
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="指针-1" tabindex="-1"><a class="header-anchor" href="#指针-1" aria-hidden="true">#</a> 指针</h3>
<div class="language-c++ line-numbers-mode" data-ext="c++"><pre v-pre class="language-c++"><code>#include &lt;iostream&gt;
 using namespace std;
// int **value， 最接近value的是*，说明value是一个指针，在前一个是*，说明是一个指向指针的指针，这样是合法的，那么如何访问value代表的实际参数的值呢？很简单，用**value就可以了，记住*是一个操作符，如同&amp;一样，不过&amp;是取地址操作符，而*是取值操作符 
 void swap6(int **a, int **b){
     int tmp;
     tmp = **a;
     **a = **b;
     **b = tmp;
 }
 
 int main(){
     int a = 1;
     int b = 2;
     int *aPtr = &amp;a;//指向数据的指针
     int *bPtr = &amp;b;//指向数据的指针
     int **aaPtr = &amp;aPtr;//指向指针的地址的指针
     int **bbPtr = &amp;bPtr;//指向指针的地址的指针
     swap6(aaPtr, bbPtr);
     cout&lt;&lt;&quot;a = &quot;&lt;&lt;a&lt;&lt;endl;
     cout&lt;&lt;&quot;b = &quot;&lt;&lt;b&lt;&lt;endl;
     system(&quot;pause&quot;);
     return 0;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="引用" tabindex="-1"><a class="header-anchor" href="#引用" aria-hidden="true">#</a> 引用</h3>
<div class="language-c++ line-numbers-mode" data-ext="c++"><pre v-pre class="language-c++"><code>#include &lt;iostream&gt;
 using namespace std;
// int*&amp;  value这样一个声明，我们从最接近value的符号看起，是个&amp;，说明value是一个引用，它是一个什么引用呢？再看*，它是一个指针的引用，即指针的别名，我们用*value就可以访问到实参的值了。所以，其交换函数的内部逻辑跟int *是一样的 
 void swap5(int *&amp;a, int *&amp;b){
     int tem = *a;
     *a = *b;
     *b = tem;
 }
 
 int main(){
     int a = 1;
     int b = 2;
 
     int *aPtr = &amp;a;
     int *bPtr = &amp;b;
     int *&amp;arPtr = aPtr;
     int *&amp;brPtr = bPtr;
 
     swap5(arPtr, brPtr);
 
     cout&lt;&lt;&quot;a = &quot;&lt;&lt;a&lt;&lt;endl;
     cout&lt;&lt;&quot;b = &quot;&lt;&lt;b&lt;&lt;endl;
     system(&quot;pause&quot;);
     return 0;
}


#include &lt;iostream&gt;
using namespace std;
// 引用即别名，通过引用也是可以直接访问到实参和控制实参的
void swap3(int&amp; a, int&amp; b){
    int tmp;
    tmp = a;
    a = b;
    b = tmp;
}

int main(){
    int a = 1;
    int b = 2;
    swap3(a, b);    
        cout&lt;&lt;&quot;a = &quot;&lt;&lt;a&lt;&lt;endl;
    cout&lt;&lt;&quot;b = &quot;&lt;&lt;b&lt;&lt;endl;
    system(&quot;pause&quot;);
    return 0;
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="析构函数用例" tabindex="-1"><a class="header-anchor" href="#析构函数用例" aria-hidden="true">#</a> 析构函数用例</h3>
<div class="language-c++ line-numbers-mode" data-ext="c++"><pre v-pre class="language-c++"><code>#include &lt;iostream&gt;
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
    cout &lt;&lt; &quot;默认&quot; &lt;&lt; x &lt;&lt; &quot;,&quot; &lt;&lt; y &lt;&lt; endl;
};
// 定义带两个参数的构造函数 :x(a),y(b)等同于x=a,y=b
Point::Point(int a, int b):x(a),y(b){
    cout &lt;&lt; &quot;赋值&quot; &lt;&lt; a &lt;&lt; &quot;,&quot; &lt;&lt; b &lt;&lt; endl;
};
Point:: ~Point(void) {
    cout &lt;&lt; &quot;析构函数&quot; &lt;&lt; endl;
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="构造器的初始化" tabindex="-1"><a class="header-anchor" href="#构造器的初始化" aria-hidden="true">#</a> 构造器的初始化</h3>
<div class="language-c++ line-numbers-mode" data-ext="c++"><pre v-pre class="language-c++"><code>#include&lt;iostream&gt;
using namespace std;
class object{
    private:
        int val;
    public:
        object():val(0){
            cout &lt;&lt; &quot;object的默认构造器&quot; &lt;&lt; endl;
        }
        object(int i) : val(i){
            cout &lt;&lt; &quot;object的带参构造器&quot; &lt;&lt; val &lt;&lt; endl;
        }
        ~object() {
            cout &lt;&lt; &quot;objecd的析构函数&quot; &lt;&lt; val &lt;&lt; endl;
        }
};
class container{
    private:
        object one;
        object two;
        int data;
    public:
        container(): data(0){
            cout &lt;&lt; &quot;container的默认构造器&quot; &lt;&lt; endl;
        }
        container(int i, int j,int k);
        ~container() {
            cout &lt;&lt; &quot;container的析构函数&quot; &lt;&lt; data &lt;&lt; endl;
        }
};
container::container(int i, int j, int k):two(i), one(j) {
    data = k;
    cout &lt;&lt; &quot;container的带参构造器&quot; &lt;&lt; data &lt;&lt; endl;
}
int main() {
    container obj, anObj(5,6,10);
    return 0;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="虚函数" tabindex="-1"><a class="header-anchor" href="#虚函数" aria-hidden="true">#</a> 虚函数</h3>
<div class="language-c++ line-numbers-mode" data-ext="c++"><pre v-pre class="language-c++"><code>#include &lt;iostream&gt;
using namespace std;
class A{
    public:
        A(){
            cout &lt;&lt; &quot;A的构造函数&quot; &lt;&lt; endl;
        }
        virtual void func(){
            cout &lt;&lt; &quot;类A的虚函数&quot; &lt;&lt; endl;
        }
        ~A(){}
        virtual void fund(){
            cout &lt;&lt; &quot;类A的析构函数&quot; &lt;&lt; endl;
        }
};
class B : public A{
    public:
        B(){
            cout &lt;&lt; &quot;B的构造函数&quot; &lt;&lt; endl;
            func();
        }
        void fun() {
            cout &lt;&lt; &quot;类B的函数,开始了：&quot;;
            func();
        }
        ~B(){
            fund();
        }
};
class C : public B{
    public:
        C(){
            cout &lt;&lt; &quot;类C的函数,开始了：&quot;;
        }
        void func() {
            cout &lt;&lt; &quot;类C的fun函数&quot; &lt;&lt; endl;
        }
        ~C(){
            fund();
        }
        void fund(){
            cout &lt;&lt; &quot;类C的fund函数&quot; &lt;&lt; endl;
        }
};
int main() {
    C c;
    c.fun();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


