---
title: JavaNIO
date: 2019-11-13 14:36:18
tags: java JavaNIO
categories: java
keywords: JavaNIO
description: 关于JavaNIO的一些学习整理
---

# <center>JavaNIO</center>

## 简介

- 在高并发的环境下，线程数量会比较多，System load也会比较高，于是就有了NIO

- Java NIO 是 java 1.4 之后新出的一套IO接口，这里的的新是相对于原有标准的Java IO和Java Networking接口。NIO提供了一种完全不同的操作方式。NIO中的N可以理解为Non-blocking，不单纯是New。

- 它支持面向缓冲的，基于通道的I/O操作方法。 随着JDK 7的推出，NIO系统得到了扩展，为文件系统功能和文件处理提供了增强的支持。 由于NIO文件类支持的这些新的功能，NIO被广泛应用于文件处理。

## 对比

> 传统IO流想要处理多个客户端的Socket请求，它必须要不断的创建新的线程来专门为连入的Socket请求进行处理，如果连入的Socket请求很多，并且来自不同的IP或者端口就必须要不断的创建线程，对系统资源会造成很大的占用。

### IO

```java
package study.base;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.net.ServerSocket;
import java.net.Socket;

public class SocketCaseIO {
    public static ServerSocket server = null;
    public static void main(String[] args) throws IOException {
        // TODO Auto-generated method stub
        init();
        System.out.println("Finish init!");
        while (true) {
            Socket socket = server.accept();
            System.out.println("Client connected!" + socket.getPort());
            try {
                SocketProcess socketProcess = new SocketProcess(socket);
                System.out.println("Start thread!");
                Thread thread = new Thread(socketProcess);
                thread.start();
            } catch (Exception e) {
                e.printStackTrace();
            }

        }

    }

    private static void init() throws IOException {
        server = new ServerSocket();
        server.setSoTimeout(0);
        server.setReuseAddress(true);
        server.bind(new InetSocketAddress(4495));

    }

}
class SocketProcess implements Runnable {

    private static Socket socket = null;

    public SocketProcess(Socket socket) {
        SocketProcess.socket = socket;
    }
    @Override
    public void run() {
        InputStream rd = null;
        OutputStream bw = null;
        try {
            rd = socket.getInputStream();
            bw = socket.getOutputStream();
            byte[] ReqBuff = new byte[1000];
            System.out.println("Ready receive the request message!");
            while (rd.read(ReqBuff) > 0) {
                System.out.println("start");
                System.out.println(new String(ReqBuff));
                System.out.println("finish");
            }
        } catch (Exception e) {
            e.printStackTrace();
            try {
                rd.close();
                bw.close();
                socket.close();
            } catch (IOException e1) {
                // TODO Auto-generated catch block
                e1.printStackTrace();
            }
        }
    }
}
```

### NIO

```java

package study.base;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.nio.ByteBuffer;
import java.nio.channels.SelectionKey;
import java.nio.channels.Selector;
import java.nio.channels.ServerSocketChannel;
import java.nio.channels.SocketChannel;
import java.util.Iterator;

public class SocketCaseNIO {
    // 通道管理器
    private Selector selector;

    /**
     * 获得一个ServerSocket通道，并对该通道做一些初始化的工作
     * @param port 绑定的端口号
     * @throws IOException
     */
    public void initServer(int port) throws IOException {
        // 获得一个ServerSocket通道
        ServerSocketChannel serverChannel = ServerSocketChannel.open();
        // 设置通道为非阻塞
        serverChannel.configureBlocking(false);
        // 将该通道对应的ServerSocket绑定到port端口
        serverChannel.socket().bind(new InetSocketAddress(port));
        // 获得一个通道管理器
        this.selector = Selector.open();
        // 将通道管理器和该通道绑定，并为该通道注册SelectionKey.OP_ACCEPT事件,注册该事件后，
        // 当该事件到达时，selector.select()会返回，如果该事件没到达selector.select()会一直阻塞。
        serverChannel.register(selector, SelectionKey.OP_ACCEPT);
        System.out.println("OP_ACCEPT");
    }

    /**
     * 采用轮询的方式监听selector上是否有需要处理的事件，如果有，则进行处理
     * @throws IOException
     */
    public void listen() {
        System.out.println("服务端启动成功！");
        // 轮询访问selector
        while (true) {
            // 当注册的事件到达时，方法返回；否则,该方法会一直阻塞
            try {
                selector.select();
                // 获得selector中选中的项的迭代器，选中的项为注册的事件
                Iterator<SelectionKey> ite = this.selector.selectedKeys().iterator();
                while (ite.hasNext()) {
                    SelectionKey key = (SelectionKey) ite.next();
                    // 删除已选的key,以防重复处理
                    ite.remove();
                    // 客户端请求连接事件
                    if (key.isAcceptable()) {
                        ServerSocketChannel server = (ServerSocketChannel) key.channel();
                        // 获得和客户端连接的通道
                        SocketChannel channel = server.accept();
                        // 设置成非阻塞
                        channel.configureBlocking(false);

                        // 在这里可以给客户端发送信息哦
                        channel.write(ByteBuffer.wrap(new String("向客户端发送了一条信息").getBytes()));
                        // 在和客户端连接成功之后，为了可以接收到客户端的信息，需要给通道设置读的权限。
                        channel.register(this.selector, SelectionKey.OP_READ);

                        // 获得了可读的事件
                    } else if (key.isReadable()) {
                        read(key);
                    }

                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
    /**
     * 处理读取客户端发来的信息 的事件
     *
     * @param key
     * @throws IOException
     */
    public void read(SelectionKey key) throws IOException {
        try {
            // 服务器可读取消息:得到事件发生的Socket通道
            SocketChannel channel = (SocketChannel) key.channel();
            // 创建读取的缓冲区
            ByteBuffer buffer = ByteBuffer.allocate(100);
            int statusCode = channel.read(buffer);
            // System.out.println("length:" + statusCode);
            if (statusCode != -1) {
                byte[] data = buffer.array();
                String msg = new String(data).trim();
                System.out.println("服务端收到信息：" + msg);
                ByteBuffer outBuffer = ByteBuffer.wrap(msg.getBytes());
                channel.write(outBuffer);// 将消息回送给客户端
            } else {
                channel.close();
            }
        } catch (Exception e) {

        }
    }

    /**
     * 启动服务端测试
     *
     * @throws IOException
     */
    public static void main(String[] args) throws IOException {
        SocketCaseNIO server = new SocketCaseNIO();
        server.initServer(4496);
        server.listen();
    }
}

```