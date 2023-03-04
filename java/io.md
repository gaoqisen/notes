---
title: JavaIO
date: 2019-11-14 14:36:18
tags: java io
categories: java
keywords: JavaIO
description: 关于JavaIO的一些学习整理
---
# <center>JavaIO</center>

##简介

IO操作面临很多问题，信息量的巨大，网络的环境等等，因为IO不仅仅是对本地文件、目录的操作，有时对二进制流、还有一部分是网络方面的资源，所以多种原因直接造成IO操作无疑是耗时且复杂多变的。Java对IO的支持是个不断的演变过程，经过了很多的优化，直到JDK1.4以后，才趋于稳定，在JDK1.4中，加入了nio类，解决了很多性能问题。

## 含义

### 百科定义

Java的核心库java.io提供了全面的IO接口。包括：文件读写、标准设备输出等。Java中IO是以流为基础进行输入输出的，所有数据被串行化写入输出流，或者从输入流读入。

### 组成

1、基于字节操作的I/O接口：InputStream和OutputStream（在java.io包下）

2、基于字符操作的I/O接口：Writer和Reader（在java.io包下）

3、基于磁盘操作的I/O接口：File（在java.io包下）

4、基于网络操作的I/O接口：Socket（不在java.io包下）

### 分类

####  数据来源

![https://gaoqisen.github.io/GraphBed/201911/20191118141423.png](https://gaoqisen.github.io/GraphBed/201911/20191118141423.png)
- 文件（file）：FileInputStream、FileOutputStream、FileReader、FileWriter
- 数组（[]）：
  - 字节数组（byte[]）：ByteArrayInputStream、ByteArrayOutputStream
  - 字符数组（char[]）：CharArrayReader、CharArrayWriter
- 管道操作：PipedInputStream、PipedOutputStream、PipedReader、PipedWriter
- 基本数据类型：DataInputStream、DataOutputStream
- 缓冲操作：BufferedInputStream、BufferedOutputStream、BufferedReader、BufferedWriter
- 打印：PrintStream、PrintWriter
- 对象序列化反序列化：ObjectInputStream、ObjectOutputStream
- 转换：InputStreamReader、OutputStreWriter

#### 数据传输方式
![https://gaoqisen.github.io/GraphBed/201911/20191114130011.png](https://gaoqisen.github.io/GraphBed/201911/20191114130011.png)

### 区别

- 读写单位不同，字节流以字节为单位（一个字节为8bit位），字符流以字符为单位
- 操作对象不同，字节流可以处理任何数据    字符流只能处理字符相关类型数据
- 字节流在操作的时候本身是不会用到缓冲区(内存)的，是与文件本身直接操作的，而字符流在操作的时候是使用到缓冲区的
-  在所有的硬盘上保存文件或是进行传输的时候都是以字节的方式进行的，包括图片也是按照字节完成，而字符是只有在内存中才会形成的，所以使用字节操作是最多的。


## 实战

### 字节操作I/O

```java
    public static void main(String[] args) throws Exception{

        //—————————— OutputStream, write输出byte[]
        // 文件本身不存在，则会为用户自动创建新文件
        File f= new File("/Users/jasongao/Desktop/test.txt") ;
        // 通过子类实例化父类对象, 通过对象多态性，进行实例化。
        // new FileOutputStream(f,true)  ;	// 此处表示在文件末尾追加内容
        OutputStream out = new FileOutputStream(f);
        String str = "Hello World!!!" ;
        // 只能输出byte数组，所以将字符串变为byte数组
        byte b[] = str.getBytes() ;
        // 将内容输出，保存文件
        out.write(b) ;

        //—————————— OutputStream, write输出byte
        String str2 = "\r\nHello World2!!!" ;
        byte c[] = str2.getBytes() ;
        // 采用循环方式写入,每次只写入一个内容
        for(int i=0;i<c.length;i++){
            out.write(c[i]) ;
        }
        out.close() ;

        //—————————— InputStream, read输入byte[]
        InputStream input =  new FileInputStream(f)  ;
        // 所有的内容都读到此数组之中
        byte d[] = new byte[1024] ;
        // 读取内容,可以 返回长度、byte等
        int len =input.read(d) ;
        input.close() ;
        System.out.println("读入数据的长度：" + len);
        System.out.println("内容为：" + new String(d)) ;
        System.out.println("内容为：" + new String(d,0,len)) ;

    }
```

![https://gaoqisen.github.io/GraphBed/201911/20191118114649.png](https://gaoqisen.github.io/GraphBed/201911/20191118114649.png)

### 字符操作I/O

```java
private static void character() throws IOException{
        //—————————— Writer, write输出byte[]
        File f= new File("/Users/jasongao/Desktop/test.txt");

        Writer out = new FileWriter(f)  ;	// 通过对象多态性，进行实例化
        // 第3步、进行写操作
        String str = "Hello World!!!666" ;		// 准备一个字符串
        out.write(str);
        out.close();

        //—————————— Reader, write输出byte[]
        Reader input = new FileReader(f) ;
        // 所有的内容都读到此数组之中
        char c[] = new char[1024] ;
        int len = input.read(c) ;
        input.close() ;
        System.out.println("内容为：" + new String(c,0,len));
    }
```

![https://gaoqisen.github.io/GraphBed/201911/20191118115334.png](https://gaoqisen.github.io/GraphBed/201911/20191118115334.png)

### 磁盘操作I/O

``` java
private static void file() throws IOException{
        String path = "/Users/jasongao/Desktop/test.txt";
        File myFile = new File(path);
        //判断文件是否存在 
       if (!myFile.exists()) {
            // 创建文件夹， mkdir()只会建立一级的文件夹
            myFile.mkdir();
            // mkdirs()可以建立多级文件夹
            myFile.mkdirs();
            // 创建新文件
            myFile.createNewFile();
            // 删除文件夹
            myFile.delete();
            //读取文件名称  
            myFile.getName();
            //读取文件路径(相对路径)  
            myFile.getPath();
            //读取文件绝对路径  
            myFile.getAbsolutePath();
            //读取文件的父级路径  
            new File(myFile.getAbsolutePath()).getParent();
            //读取文件的大小  
            myFile.length();
            //判断文件是否被隐藏  
            myFile.isHidden();
            //判断文件是否可读  
            myFile.canRead();
            //判断文件是否可写  
            myFile.canWrite();
            //判断文件是否为文件夹  
            myFile.isDirectory();
        }
    }
```

### 各种转换

```java
        /**
         * 将str转换为inputStream
         * @param str
         * @return
         */
        public static InputStream strConvertInputStream(String str) {
            ByteArrayInputStream is = new ByteArrayInputStream(str.getBytes());
            return is;
        }
        /**
         * 将inputStream转换为str
         * @param is
         * @return
         * @throws IOException
         */
        public static String inputStreamConvertStr(InputStream is) throws IOException {
            StringBuffer sb;
            BufferedReader br = null;
            try {
                br = new BufferedReader(new InputStreamReader(is));
    
                sb = new StringBuffer();
    
                String data;
                while ((data = br.readLine()) != null) {
                    sb.append(data);
                }
            } finally {
                br.close();
            }
    
            return sb.toString();
        }
        /**
         * 将file转换为inputStream
         * @param file
         * @return
         * @throws FileNotFoundException
         */
        public static InputStream fileConvertInputStream(File file) throws FileNotFoundException {
            return new FileInputStream(file);
        }
        /**
         * 将inputStream转化为file
         * @param is
         * @param file 要输出的文件目录
         */
        public static void inputStreamConvertFile(InputStream is, File file) throws IOException {
            OutputStream os = null;
            try (OutputStream os = new FileOutputStream(file)){
                int len = 0;
                byte[] buffer = new byte[8192];
    
                while ((len = is.read(buffer)) != -1) {
                    os.write(buffer, 0, len);
                }
            } finally {
                is.close();
            }
        }    
```