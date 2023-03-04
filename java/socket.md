---
title: JavaSocket
date: 2019-11-13 14:36:18
tags: java JavaSocket
categories: java
keywords: JavaSocket
description: 关于JavaSocket的一些学习整理
---
# <center>JavaSocket</center>

## 含义

> 解决网络通信问题。可以直接使用这些类和接口，来专注于解决问题，而不用关注通信细节。

### 百科定义

套接字（socket）是一个抽象层，应用程序可以通过它发送或接收数据，可对其进行像对文件一样的打开、读写和关闭等操作。套接字允许应用程序将I/O插入到网络中，并与网络中的其他应用程序进行通信。网络套接字是IP地址与端口的组合。

### 简单调用方式

- 客服端

```java
    /*
     * java.net.Socket
     * 封装了TCP协议
     * 使用它可以与远程计算机连接并进行
     * 数据交换,实现通讯的目的
     */
    public static void main(String[] args) {
        try {
            /*
             * 初始化Socket。初始化需要传入两个参数
             * 参数1:远端计算机IP地址
             * 参数2:远端计算机的服务端口
             * IP地址用来找到服务端所在的计算机端口用来连接上该计算机上的服务端应用程序
             * 实例化Socket的过程就是连接的过程若远端计算机没有响应会抛出异常
             */
            System.out.println("正在连接服务端...");
            Socket socket = new Socket(
                    "localhost",8088
            );
            System.out.println("与服务端建立连接!");
            /*
             * Socket的方法:
             * OutputStream getOutputStream()
             * 用于获取一个输出流,通过该输出流写出的字节会发送至远端计算机.而远端计算机可以通过
             * 输入流读取.
             */
            OutputStream out = socket.getOutputStream();
            OutputStreamWriter osw = new OutputStreamWriter(out,"UTF-8");
            PrintWriter pw = new PrintWriter(osw,true);
            pw.println("你好!服务端!");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
```

- 服务端

```java
    /*
     *	java.net.ServerSocket
     *  运行在服务端的ServerSocket的主要
     *  作用是:
     *  1:向OS申请服务端口(客户端通过该端口
     *    与服务端建立连接)
     *  2:监听服务端口,等待客户端连接,一旦一个
     *    客户端连接后,就会创建一个Socket实例
     *    与该客户端进行交互.
     */
    public static void main(String[] args) {
        try {
            /*
             * 初始化ServerSocket需要指定服务端口若该端口已经被其他应用程序占用则会
             * 抛出异常
             */
            ServerSocket server = new ServerSocket(8088);
            /*
             * ServerSocket的方法
             * Socket accept()该方法用来监听申请的服务端口,该方法是一个阻塞方法,直到一个
             * 客户端通过该端口与服务端建立连接,这里便会自动创建一个Socket
             * 并返回,通过该Socket可以与刚连接的客户端进行交互.
             */
            System.out.println("等待客户端连接...");
            Socket socket = server.accept();
            System.out.println("一个客户端连接了!");
            /*
             * Socket提供的方法:
             * InputStream getInputStream()
             * 通过获取的输入流可以读取远端计算机
             * 发送过来的数据
             */
            InputStream in = socket.getInputStream();
            InputStreamReader isr = new InputStreamReader(in,"UTF-8");
            BufferedReader br = new BufferedReader(isr);
            String message = br.readLine();
            System.out.println("客户端说:"+message);
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("服务端启动失败!");
        }
    }
```

## 简单聊天室

- 服务端

```java
package study.base;

import java.io.*;
import java.net.InetAddress;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.ArrayList;
import java.util.List;

/**
 * @ClassName Server
 * @Author gaoqisen
 * @Date 2019-11-26
 * @Version 1.0
 */
public class Server {
    /*
     *	java.net.ServerSocket
     *  运行在服务端的ServerSocket的主要
     *  作用是:
     *  1:向OS申请服务端口(客户端通过该端口
     *    与服务端建立连接)
     *  2:监听服务端口,等待客户端连接,一旦一个
     *    客户端连接后,就会创建一个Socket实例
     *    与该客户端进行交互.
     */
    private ServerSocket server;
    /*
     * 共享集合,用于存放所有客户端的输出流
     * 以便广播消息
     */
    private List<PrintWriter> allOut;

    public Server() throws IOException{
        /*
         * 初始化ServerSocket需要指定服务端口
         * 若该端口已经被其他应用程序占用则会
         * 抛出异常
         */
        server = new ServerSocket(8088);
        allOut = new ArrayList<PrintWriter>();
    }
    /**
     * 将给定的输出流存入共享集合
     * @param out
     */
    public synchronized void addOut(PrintWriter out){
        allOut.add(out);
    }
    /**
     * 从共享集合中将给定输出流删除
     * @param out
     */
    public synchronized void removeOut(PrintWriter out){
        allOut.remove(out);
    }
    /**
     * 将给定的消息发送至所有客户端
     * @param message
     */
    public synchronized void sendMessage(String message){
        for (int i = 0; i< allOut.size(); i++) {
            allOut.get(i).println(message);
        }
    }
    public void start(){
        try {
            while(true){
                /*
                 * ServerSocket的方法
                 * Socket accept()
                 * 该方法用来监听申请的服务端口,
                 * 该方法是一个阻塞方法,直到一个
                 * 客户端通过该端口与服务端建立
                 * 连接,这里便会自动创建一个Socket
                 * 并返回,通过该Socket可以与刚连接
                 * 的客户端进行交互.
                 */
                System.out.println("等待客户端连接...");
                Socket socket = server.accept();
                System.out.println("一个客户端连接了!");
                //启动一个线程来处理该客户端的交互
                ClientHandler handler = new ClientHandler(socket);
                Thread t = new Thread(handler);
                t.start();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    /**
     * 该线程的任务是与指定的客户端进行交互
     * @author adminitartor
     *
     */
    class ClientHandler implements Runnable{
        //该线程通过该Socket与指定客户端交互
        private Socket socket;
        //客户端地址信息
        private String host;
        public ClientHandler(Socket socket){
            this.socket = socket;
            //获取该客户端的地址信息
            InetAddress address = socket.getInetAddress();
            //获取其IP地址的字符串形式
            host = address.getHostAddress();
        }
        @Override
        public void run(){
            PrintWriter pw = null;
            try {
                /*
                 * 获取输出流,用于将服务端的消息通过该流
                 * 发送给客户端
                 */
                OutputStream out = socket.getOutputStream();
                OutputStreamWriter osw = new OutputStreamWriter(out,"UTF-8");
                pw = new PrintWriter(osw,true);
                addOut(pw);
                /*
                 * Socket提供的方法:
                 * InputStream getInputStream()
                 * 通过获取的输入流可以读取远端计算机
                 * 发送过来的数据
                 */
                InputStream in = socket.getInputStream();
                InputStreamReader isr = new InputStreamReader(in,"UTF-8");
                BufferedReader br = new BufferedReader(isr);
                String message = null;
                /*
                 * 在读取客户端发送过来的消息这里,由于客户端
                 * 所在操作系统不同,当客户端断开连接时,这里
                 * br.readLine的反应也不同:
                 * linux的客户端断开时:
                 * 	br.readLine方法会返回null.
                 *
                 * windows的客户端断开连接时:
                 *  br.readLine方法会直接抛出异常
                 *
                 */
                while((message = br.readLine())!=null){
					// System.out.println(host+"说:"+message);
                    sendMessage(host+"说:"+message);
                }
            } catch (Exception e) {
            } finally{
                try {
                    //处理客户端断开连接后的操作
                    System.out.println(host+"下线了");
                    removeOut(pw);
                    //将Socket关闭
                    socket.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }
    public static void main(String[] args) {
        try {
            Server server = new Server();
            server.start();
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("服务端启动失败!");
        }
    }
}
```

- 客服端

```java
package study.base;

import java.io.*;
import java.net.Socket;
import java.net.UnknownHostException;
import java.util.Scanner;

/**
 * @ClassName Client
 * @Author gaoqisen
 * @Date 2019-11-26
 * @Version 1.0
 */
public class Client {
    /*
     * java.net.Socket
     * 封装了TCP协议
     * 使用它可以与远程计算机连接并进行
     * 数据交换,实现通讯的目的
     */
    private Socket socket;
    /**
     * 构造方法,用来初始化客户端
     * @throws IOException
     * @throws UnknownHostException
     */
    public Client() throws UnknownHostException, IOException{
        /*
         * 初始化Socket
         * 初始化需要传入两个参数
         * 参数1:远端计算机IP地址
         * 参数2:远端计算机的服务端口
         *
         * IP地址用来找到服务端所在的计算机
         * 端口用来连接上该计算机上的服务端
         * 应用程序
         *
         * 实例化Socket的过程就是连接的过程
         * 若远端计算机没有响应会抛出异常
         */
        System.out.println("正在连接服务端...");
        socket = new Socket("localhost",8088);
        System.out.println("与服务端建立连接!");
    }
    /**
     * 客户端开始工作的方法
     */
    public void start(){
        try {
            //启动读取服务端消息的线程
            ServerHandler handler = new ServerHandler();
            Thread t = new Thread(handler);
            t.start();
            Scanner scanner = new Scanner(System.in);
            /*
             * Socket的方法:
             * OutputStream getOutputStream()
             * 用于获取一个输出流,通过该输出流写出的字节
             * 会发送至远端计算机.而远端计算机可以通过
             * 输入流读取.
             */
            OutputStream out = socket.getOutputStream();
            OutputStreamWriter osw = new OutputStreamWriter(out,"UTF-8");
            PrintWriter pw = new PrintWriter(osw,true);
            String message = null;
            while(true){
                message = scanner.nextLine();
                pw.println(message);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void main(String[] args) {
        try {
            Client client = new Client();
            client.start();
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("客户端运行失败!");
        }
    }
    /**
     * 该线程的任务是读取服务端发送过来的
     * 每一条消息,并输出到控制台
     * @author adminitartor
     *
     */
    class ServerHandler implements Runnable{
        @Override
        public void run(){
            try {
                InputStream in
                        = socket.getInputStream();
                InputStreamReader isr
                        = new InputStreamReader(in,"UTF-8");
                BufferedReader br
                        = new BufferedReader(isr);
                String message = null;
                //读取服务端发送的每一条消息并输出
                while((message=br.readLine())!=null){
                    System.out.println(message);
                }
            } catch (Exception e) {
            }
        }
    }
}
```
