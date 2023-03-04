---
title: Java线程实验程序
date: 2019-10-23 12:53:40
tags: Java
categories: study
keywords: java
description: Java线程实验程序，创建Thread实现对话框显示计算阶乘的结果。
---

## 实验一

### 目标

 1. 创建两个Thread的子类Thread_ 1、Thread 2, Thread 1类用来计算阶乘的结果，Thread 2类用来读取Thread 1中的结果并显示在窗体中，

 2. 创建一个Thread frame 类来创建窗体，在窗体上添加标签、文本域、文本框、进度条和按钮，其中，文本域显示阶乘的计算过程，文本框显示计算结果，进度条根据文本域来显示进度;

 3. 为按钮添加点击事件，使得点击按钮后，运行线程;

 4. 创建测试类testThread,测试程序。

### 代码

```java
import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

// 创建Thread的子类Thread_ 1,用来计算阶乘的结果
public class Thread_1 extends Thread{
    //存储阶乘和进度
    static String stringSum="";
    //存储阶乘和的字符串
    static String stringResult="";
    //存储阶乘结果的字符串
    static int i=0;
    //计算阶乘
    double sum=0;
    double method(int n){
        //阶乘结果
        double result=1;
        for(int i=1;i<=n;i++){
            result*=i;
        }
        return result;
    }
    @Override
    public void run() {
        while(i<30){
            //计算阶乘和
            i++;
            sum+=method(i);
            stringResult=String.valueOf(sum);
            //将阶乘和存储到字符串中
            if(i!=1){
                //显示阶乘和的过程：1！+2！+...+30！
                stringSum=stringSum+"+"+i+"!";
            }else{
                stringSum=i+"!";
            }
            try{
                //0.5-1秒读取一次线程
                Thread.sleep((int)(Math.random()*500+500));
            }catch(InterruptedException ex){
            }
        }
    }
}
// 创建Thread的子类Thread_ 2,用来读取Thread 1中的结果并显示在窗体中
class Thread_2 extends Thread{
    ThreadFrame tf;
    Thread_2(ThreadFrame tf){
        //初始化
        this.tf=tf;
    }
    @Override
    public void run() {
        while(true){
            tf.textArea.setText(Thread_1.stringSum);
            //将阶乘和的过程显示到文本域中
            tf.textFile.setText(Thread_1.stringResult);
            //将阶乘和结果显示到文本框中
            tf.jpb.setValue(Thread_1.i);
            //在面板上的进度条中显示计算进度
            try{
                Thread.sleep(100);
                //0.1秒读取一次线程
            }catch (Exception e) {
            }
        }
    }
}
// 创建一个Thread frame 类来创建窗体，在窗体上添加标签、文本域、文本框、进度条和按钮，其中，文本域显示阶乘的计算过程，文本框显示计算结果，进度条根据文本域来显示进度
class ThreadFrame implements ActionListener {
    //创建面板
    JFrame jframe;
    //创建窗体
    Panel panel;
    //创建面板
    Label label_title;
    //创建标签
    Label label_1;
    Label label_2;
    Label label_3;
    TextField textFile;
    //创建文本框
    TextArea textArea;
    //创建文本域
    Button btn;
    //创建按钮
    JProgressBar jpb;
    //创建进度条
    ThreadFrame(){
        //创建窗体
        jframe=new JFrame("线程");
        //设置窗体名称
        jframe.setBounds(600, 100, 400, 400);
        //设置大小
        jframe.setVisible(true);
        //设置课件
        jframe.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        //结束进程

        //创建面板
        panel=new Panel();
        panel.setBackground(Color.white);
        //设置背景颜色
        panel.setLayout(null);
        //取消默认布局
        jframe.add(panel);

        //创建标签
        label_title=new Label("多线程实验");
        label_1=new Label("计算线程：");
        label_2=new Label("计算进度：");
        label_3=new Label("计算读取：");
        label_title.setBounds(jframe.size().width/2-50, 10, 100, 50);
        label_1.setBounds(30, 100, 60, 20);
        label_2.setBounds(30, 160, 60, 20);
        label_3.setBounds(30, 220, 60, 20);
        label_title.setFont(new Font("宋体", 1, 16));//设置字体
        panel.add(label_title);
        panel.add(label_1);
        panel.add(label_2);
        panel.add(label_3);

        //创建文本域
        textArea=new TextArea();
        textArea.setBounds(100, 80, 200, 60);
        textArea.setEditable(false);//不可编辑
        panel.add(textArea);

        //创建单行文本框
        textFile=new TextField("0");
        textFile.setBounds(textArea.getX(), 220, textArea.size().width, 20);
        textFile.setEditable(false);//不可编辑
        panel.add(textFile);

        //创建按钮
        btn=new Button("开始计算");
        btn.setBounds(jframe.size().width/2-35, 270, 70, 30);
        panel.add(btn);
        btn.addActionListener(this);//添加监听器

        //创建进度条
        jpb=new JProgressBar();
        jpb.setBounds(textArea.getX(), textArea.getY()+textArea.size().height+10, textArea.size().width, 40);
        jpb.setMaximum(30);//设置最大值
        panel.add(jpb);
    }

    // 为按钮添加点击事件，使得点击按钮后，运行线程
    @Override
    public void actionPerformed(ActionEvent e) {
        //按钮点击事件
        //调用计算线程
        Thread_1 ct=new Thread_1();
        Thread tc=new Thread(ct);
        //调用读取线程
        Thread_2 rt=new Thread_2(this);
        Thread tr=new Thread(rt);
        //开始线程
        tc.start();
        tr.start();
    }
}
// 创建测试类testThread,测试程序。
class TestThread extends Thread{
    public static void main(String[] args) {
        ThreadFrame tf=new ThreadFrame();
    }
}
```

## 实验二

### 目标

 1. 创建两个实现Runnable接口的类MyThread1、MyThread2,在里面重写run方法:

 2. 创建MyThread1的子类ComputeThread和MyThread2的子类ReadThread,其中，ComputeThread类用来计算阶乘的结果, ReadThread类用来读取Compute Thread中的结果并显示在窗体中

 3. 创建一个MyFrame类来创建窗体，在窗体上添加标签、文本域、文本框、进度条和按钮，其中，文本域显示阶乘的计算过程，文本框显示计算结果，进度条根据文本域来显示进度;

 4. 为按钮添加点击事件，使得点击按钮后，运行线程，

 5. 创建测试类TestThread,测试程序。

### 代码

```java
import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
// ComputeThread类用来计算阶乘的结果
public class MyThread1 implements Runnable{
    @Override
    public void run() {
    }
}

class ComputeThread extends MyThread1{
    //存储阶乘和进度
    static String stringSum="";
    //存储阶乘和的字符串
    static String stringResult="";
    //存储阶乘结果的字符串
    static int i=0;
    //计算阶乘
    double sum=0;
    double method(int n){
        //阶乘结果
        double result=1;
        for(int i=1;i<=n;i++){
            result*=i;
        }
        return result;
    }
    public void run() {
        while(i<30){
            //计算阶乘和
            i++;
            sum+=method(i);
            stringResult=String.valueOf(sum);
            //将阶乘和存储到字符串中
            if(i!=1){
                //显示阶乘和的过程：1！+2！+...+30！
                stringSum=stringSum+"+"+i+"!";
            }else{
                stringSum=i+"!";
            }
            try{
                //0.5-1秒读取一次线程
                Thread.sleep((int)(Math.random()*500+500));
            }catch(InterruptedException ex){
            }
        }
    }
}
class MyThread2 implements Runnable{

    @Override
    public void run() {
    }
}
class ReadThread extends MyThread2{
    RunnableFrame tf;
    ReadThread(RunnableFrame tf){
        //初始化
        this.tf=tf;
    }
    public void run() {
        while(true){
            tf.textArea.setText(ComputeThread.stringSum);
            //将阶乘和的过程显示到文本域中
            tf.textFile.setText(ComputeThread.stringResult);
            //将阶乘和结果显示到文本框中
            tf.jpb.setValue(ComputeThread.i);
            //在面板上的进度条中显示计算进度
            try{
                Thread.sleep(100);
                //0.1秒读取一次线程
            }catch (Exception e) {
            }
        }
    }
}
// 创建一个Thread frame 类来创建窗体，在窗体上添加标签、文本域、文本框、进度条和按钮，其中，文本域显示阶乘的计算过程，文本框显示计算结果，进度条根据文本域来显示进度
class RunnableFrame implements ActionListener {
    //创建面板
    JFrame jframe;
    //创建窗体
    Panel panel;
    //创建面板
    Label label_title;
    //创建标签
    Label label_1;
    Label label_2;
    Label label_3;
    TextField textFile;
    //创建文本框
    TextArea textArea;
    //创建文本域
    Button btn;
    //创建按钮
    JProgressBar jpb;
    //创建进度条
    RunnableFrame(){
        //创建窗体
        jframe=new JFrame("线程");
        //设置窗体名称
        jframe.setBounds(600, 100, 400, 400);
        //设置大小
        jframe.setVisible(true);
        //设置课件
        jframe.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        //结束进程

        //创建面板
        panel=new Panel();
        panel.setBackground(Color.white);
        //设置背景颜色
        panel.setLayout(null);
        //取消默认布局
        jframe.add(panel);

        //创建标签
        label_title=new Label("多线程实验");
        label_1=new Label("计算线程：");
        label_2=new Label("计算进度：");
        label_3=new Label("计算读取：");
        label_title.setBounds(jframe.size().width/2-50, 10, 100, 50);
        label_1.setBounds(30, 100, 60, 20);
        label_2.setBounds(30, 160, 60, 20);
        label_3.setBounds(30, 220, 60, 20);
        label_title.setFont(new Font("宋体", 1, 16));//设置字体
        panel.add(label_title);
        panel.add(label_1);
        panel.add(label_2);
        panel.add(label_3);

        //创建文本域
        textArea=new TextArea();
        textArea.setBounds(100, 80, 200, 60);
        textArea.setEditable(false);//不可编辑
        panel.add(textArea);

        //创建单行文本框
        textFile=new TextField("0");
        textFile.setBounds(textArea.getX(), 220, textArea.size().width, 20);
        textFile.setEditable(false);//不可编辑
        panel.add(textFile);

        //创建按钮
        btn=new Button("开始计算");
        btn.setBounds(jframe.size().width/2-35, 270, 70, 30);
        panel.add(btn);
        btn.addActionListener(this);//添加监听器

        //创建进度条
        jpb=new JProgressBar();
        jpb.setBounds(textArea.getX(), textArea.getY()+textArea.size().height+10, textArea.size().width, 40);
        jpb.setMaximum(30);//设置最大值
        panel.add(jpb);
    }

    // 为按钮添加点击事件，使得点击按钮后，运行线程
    @Override
    public void actionPerformed(ActionEvent e) {
        //按钮点击事件
        //调用计算线程
        ComputeThread ct=new ComputeThread();
        Thread tc=new Thread(ct);
        //调用读取线程
        ReadThread rt=new ReadThread(this);
        Thread tr=new Thread(rt);
        //开始线程
        tc.start();
        tr.start();
    }
}
// 创建测试类testThread,测试程序。
class TestRunnable{
    public static void main(String[] args) {
        RunnableFrame tf=new RunnableFrame();
    }
}
```
