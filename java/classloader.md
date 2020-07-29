---
title: Java类加载的学习
date: 2020-07-10 16:22:26
tags: java
categories: java
keywords: java classloader
description: 关于类加载的一些学习。
---



## 一、概述

类加载过程

![https://gaoqisen.github.io/GraphBed/202007/20200710125152.png](https://gaoqisen.github.io/GraphBed/202007/20200710125152.png)

1. 加载: 通过类加载器查找和导入Class文件

2. 链接: 把类的二进制数据合并到JRE中

   - 验证：检查载入class文件数据的正确性，为了确保当前的Class文件符合java虚拟机的要求，并且不会危害虚拟机自身的安全（文件格式验证、元数据验证、字节码验证、符号引用验证）
   - 准备：给类变量(被static修饰的变量)分配内存,实例变量在实例变量初始化的时候会随对象一起分配在堆中。
   - 解析: 将符号引用(javap反编译的就是符号引用)转化为直接引用(是直接指向目标的指针、相对偏移量或是一个能间接定位到目标的句柄)的过程

3. 初始化: 类的静态变量，静态代码块等执行，类的构造器初始化操作等。虚拟机定义了5种会触发初始化的场景。

   - 遇到new、getstatic、putstatic或invokestatic这四条字节码指令时，如果类没有进行初始化，则要先触发初始化；    

   - 使用java.lang.reflect包中的方法对类进行反射调用的时候；

   - 初始化类时，若发现其父类还没有初始化，则先触发父类的初始化；

   - 虚拟机启动的时候，虚拟机会先初始化用户指定的包含main()方法的那个类 

   - 当使用JDK 1.7的动态语言支持时，如果一个java.lang.invoke.MethodHandle实例最后的解析结果REF_getStatic、REF_putStatic、REF_invokeStatic的方法句柄，并且这个方法句柄所对应的类没有进行过初始化，则需要先触发其初始化。

## 二、类加载器

> 加载阶段是开发期相对来说可控性比较强，该阶段既可以使用系统提供的类加载器完成，也可以由用户自定义的类加载器来完成，开发人员可以通过定义自己的类加载器去控制字节流的获取方式

### 2.1 加载过程

1. 通过全限定名称取此类的二进制字节流
2. 将字节流的静态存储结构转换为方法区的运行时数据结构
3. 在内存中生成这个class对象作为方法区数据的访问入口

### 2.2 JVM内置的ClassLoader

- BootstrpClassLoader: 启动类加载器，顶层的加载器，c++实现，负责加载JAVA_HOME/lib目录下面的jar包和类或者被 ``-Xbootclasspath``参数指定路径下的类
- ExtensionClassLoader: 扩展类加载器，主要加载JAVA_HOME/lib/ext目录下面的jar包和类或者``java.ext.dirs``系统变量指定的jar包
- AppClassLoader: 应用程序类加载器，面向用户的加载器，加载当前应用的classpath下的所有jar包和类。

### 2.3 双亲委派模型

如果一个类加载器收到了类加载请求，它并不会自己先去加载，而是把这个请求委托给父类的加载器去执行，如果父类加载器还存在其父类加载器，则进一步向上委托，依次递归，请求最终将到达顶层的启动类加载器，如果父类加载器可以完成类加载任务，就成功返回，倘若父类加载器无法完成此加载任务，子加载器才会尝试自己去加载，这就是双亲委派模式，即每个儿子都不愿意干活，每次有活就丢给父亲去干，直到父亲说这件事我也干不了时，儿子自己想办法去完成，这就是传说中的双亲委派模式。

![https://gaoqisen.github.io/GraphBed/202007/20200710162520.png](https://gaoqisen.github.io/GraphBed/202007/20200710162520.png)

- 优势:
  1. 避免重复的类加载，如果父类已经加载了子类就不会再次加载。
  2. 保证Java核心API不被篡改。比如黑客自定义了java.lang.String类，有了双亲委派模型后自定义的java.lang.String类就永远都不会被加载进内存。因为首先是最顶端的类加载器加载系统的java.lang.String类，最终自定义的类加载器无法加载java.lang.String类。
  
- 源码:

  ```java
  //双亲委派模型的工作过程源码
  protected synchronized Class<?> loadClass(String name, boolean resolve) throws ClassNotFoundException{
      // First, check if the class has already been loaded
      Class c = findLoadedClass(name);
      if (c == null) {
          try {
              if (parent != null) {
                  c = parent.loadClass(name, false);
              } else {
                  c = findBootstrapClassOrNull(name);
              }
          } 
          catch (ClassNotFoundException e) {
              // ClassNotFoundException thrown if class not found
              // from the non-null parent class loader
              //父类加载器无法完成类加载请求
          }
   
          if (c == null) {
              // If still not found, then invoke findClass in order to find the class
              //子加载器进行类加载 
              c = findClass(name);
          }
      }
   
      if (resolve) {
          //判断是否需要链接过程，参数传入
          resolveClass(c);
      }
   
      return c;
  }
  ```

  

### 2.4 破坏双亲委派模型(深入理解java虚拟机)

- 向前兼容:  由于双亲委派模型是在JDK1.2之后才被引入的，而类加载器和抽象类java.lang.ClassLoader则是JDK1.0时候就已经存在，面对已经存在的用户自定义类加载器的实现代码，Java设计者引入双亲委派模型时不得不做出一些妥协。为了向前兼容，JDK1.2之后的java.lang.ClassLoader添加了一个新的proceted方法findClass()，在此之前，用户去继承java.lang.ClassLoader的唯一目的就是重写loadClass()方法，因为虚拟在进行类加载的时候会调用加载器的私有方法loadClassInternal()，而这个方法的唯一逻辑就是去调用自己的loadClass()。JDK1.2之后已不再提倡用户再去覆盖loadClass()方法，应当把自己的类加载逻辑写到findClass()方法中，在loadClass()方法的逻辑里，如果父类加载器加载失败，则会调用自己的findClass()方法来完成加载，这样就可以保证新写出来的类加载器是符合双亲委派模型的。

- 基础类调用用户的代码: 双亲委派模型很好地解决了各个类加载器的基础类统一问题(越基础的类由越上层的加载器进行加载)，基础类之所以被称为“基础”，是因为它们总是作为被调用代码调用的API。但是，如果基础类又要调用用户的代码，那该怎么办呢? 这并非是不可能的事情，一个典型的例子便是JNDI服务，它的代码由启动类加载器去加载(在JDK1.3时放进rt.jar)，但JNDI的目的就是对资源进行集中管理和查找，它需要调用独立厂商实现部部署在应用程序的classpath下的JNDI接口提供者(SPI, Service Provider Interface)的代码，但启动类加载器不可能“认识”之些代码，该怎么办？为了解决这个困境，Java设计团队只好引入了一个不太优雅的设计：线程上下文件类加载器(Thread Context ClassLoader)。这个类加载器可以通过java.lang.Thread类的setContextClassLoader()方法进行设置，如果创建线程时还未设置，它将会从父线程中继承一个；如果在应用程序的全局范围内都没有设置过，那么这个类加载器默认就是应用程序类加载器。了有线程上下文类加载器，JNDI服务使用这个线程上下文类加载器去加载所需要的SPI代码，也就是父类加载器请求子类加载器去完成类加载动作，这种行为实际上就是打通了双亲委派模型的层次结构来逆向使用类加载器，已经违背了双亲委派模型，但这也是无可奈何的事情。Java中所有涉及SPI的加载动作基本上都采用这种方式，例如JNDI，JDBC，JCE，JAXB和JBI等。


## 三、自定义类加载器

### 3.1 什么时候会需要自定义类加载器

1. 加密: 在类需要加密的时候可以自定义类加载器，这样就可以在读取到密文的类之后在解密之后进行类加载
2. 非标准来源的类: 比如字节码是从网络获取，或者从数据库中读取，就可以指定来源加载类
3. 动态创建: 根据实际的情况进行进行动态的创建类

### 3.2 自定义类加载器

```java
/**
 * 自定义类加载器
 */
public class CustomClassLoader extends ClassLoader{

    public CustomClassLoader() {
    }

    public CustomClassLoader(ClassLoader parent)
    {
        super(parent);
    }

    // 重写findClass方法
    @Override
    protected Class<?> findClass(String name) throws ClassNotFoundException
    {
        File file = new File("/Users/jasongao/Desktop/People.class");
        try{
            byte[] bytes = getClassBytes(file);
            //defineClass方法可以把二进制流字节组成的文件转换为一个java.lang.Class
            Class<?> c = this.defineClass(name, bytes, 0, bytes.length);
            return c;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return super.findClass(name);
    }

    // 通过File获取二进制流字节
    private byte[] getClassBytes(File file) throws Exception {
        // 这里要读入.class的字节，因此要使用字节流
        FileInputStream fis = new FileInputStream(file);
        FileChannel fc = fis.getChannel();
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        WritableByteChannel wbc = Channels.newChannel(baos);
        ByteBuffer by = ByteBuffer.allocate(1024);

        while (true){
            int i = fc.read(by);
            if (i == 0 || i == -1) {
                break;
            }
            by.flip();
            wbc.write(by);
            by.clear();
        }
        fis.close();
        return baos.toByteArray();
    }

    public static void main(String[] args) throws ClassNotFoundException, IllegalAccessException, InstantiationException {
        CustomClassLoader customClassLoader = new CustomClassLoader();
        Class<?> clazz = Class.forName("People", true, customClassLoader);
        Object obj = clazz.newInstance();

        System.out.println(obj);
        System.out.println(obj.getClass().getClassLoader());
    }
}
```

编写People类之后，用javac People.java即可生成class文件

## 参考

- 类加载: https://juejin.im/post/5a810b0e5188257a5c606a85
- 双亲委派模型优势: https://blog.csdn.net/weixin_38055381/article/details/80167881
- 破坏双亲委派模型: https://juejin.im/post/5d7bbea8e51d4561c541a74f
- 线程上下文: https://blog.csdn.net/yangcheng33/article/details/52631940