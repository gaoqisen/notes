---
title: Maven学习记录
date: 2019-09-19 14:32:23
tags: Maven
categories: java
keywords: Maven
description: Maven的一些简单打包，简单快速项目创建。
---

## 一、war包部署

### 1. 打包

 * eclipse打包
   ![打包war.png](https://upload-images.jianshu.io/upload_images/7172355-63099a395fe193c5.png)
* 选择路径，点击finish即可

### 2.将war包移动到tomcat的webapps目录下面

    通过ftp或者scp可以直接将本地的代码放到linux服务器上面
    scp命令：scp 文件名 root@地址:/root   （scp test.war root@107.1.0.1:/root）

### 3.启动tomcat

会出现地址被占用

* 可以用命令：netstat -ltunp    。查看所有的端口号使用情况
* 如果有（tomcat默认使用8080、8009、8005）端口运行；直接用命令：kill -9 端口号
* 重启

### 4.安装nginx-1.12.1

* 安装的sh脚本如下


```shell

    !/bin/sh
    yum install pcre-devel -y
    yum install openssl-devel -y
    yum install zlib-devel -y
    wget http://nginx.org/download/nginx-1.12.1.tar.gz
    tar -zvxf nginx-1.12.1.tar.gz
    cd nginx-1.12.1
    ./configure
    make
    make install
    cd /usr/local/nginx/sbin/
    ./nginx -t
    /usr/local/nginx/sbin/nginx -c /usr/local/nginx/conf/nginx.conf
    
    详情：https://www.jianshu.com/p/73efd33b9da4
```

* 配置nginx.conf文件
       
      

      server_name  自己的域名
      
      location ^~ /自己的项目 {
              proxy_pass http://localhost:8080;
      }

### 5.重启nginx服务器

如果使用的上面的脚本安装的可以使用以下方式停止nginx，和启动nginx

* 停止nginx: /usr/local/nginx/sbin/nginx -s stop
* 启动nginx: /usr/local/nginx/sbin/nginx -c /usr/local/nginx/conf/nginx.conf

### 6.开放nginx默认的80端口

阿里云服务器可以直接在配置安全组里面配置

## 二、mvn命令行新建spingboot项目

- 命令行创建

    ```
    mvn archetype:generate -DinteractiveMode=false -DgroupId=com.gqs -DartifactId=springboot -Dversion=1.0.0-SNAPSHOT
    -DgroupId  //包名
    -DartifactId  //项目名
    -DarchetypeArtifactId  //类型maven-archetype-quickstart,创建一个Java Project,maven-archetype-webapp,创建一个Web Project
    -DinteractiveMode  //是否使用交互模式,如果为false,非交互式的命令后直接创建,否则会有控制台提示输入操作
    ```
    
- idea导入项目

    ![https://gaoqisen.github.io/GraphBed/201909/20190919125705.png](https://gaoqisen.github.io/GraphBed/201909/20190919125705.png)

-  常用目录结构

    ```
    │── src
    │   └── main
    │       ├── java
    │       │   └── com
    │       │       └── gqs
    │       │           └── dir
    │       │               ├── config  // 配置
    │       │               ├── constant  // 常量
    │       │               ├── controller  // 控制层
    │       │               ├── exception  // 异常处理
    │       │               ├── mapper  // 数据层
    │       │               ├── pojo  // 实体类
    │       │               ├── service  // 服务层
    │       │               └── utils  // 工具类
    │       ├── resources
    │       │   ├── application.yml
    │       │   ├── image
    │       │   ├── lib   // 第三方jar
    │       │   ├── mapper  // mapper.xml文件
    │       │   ├── static  // 静态文件
    │       │   └── templates  // html文件
    │       └── test
    │── pom.xml
    ```

- pom.xml配置

 ```xml
 //  对于SpingBoot测试Junit至少是4.1-4.2以上的版本,所以把版本号删除默认的就行, 可以直接替换以下配置
 <?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.1.3.RELEASE</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>
    <groupId>com.abc.test</groupId>
    <artifactId>test</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>test</name>
    <description>Demo project for Spring Boot</description>
    <packaging>jar</packaging>
    <properties>
        <java.version>1.8</java.version>
    </properties>

    <dependencies>
        <dependency>
          <groupId>org.springframework.boot</groupId>
          <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
          <groupId>junit</groupId>
          <artifactId>junit</artifactId>
          <version>3.8.1</version>
          <scope>test</scope>
        </dependency>
    </dependencies>
</project>
 ```

- main配置

 ```java
 // 添加@SpringBootApplication注释和pringApplication.run(App.class);
    @SpringBootApplication
    public class App {
        public static void main( String[] args ){
            SpringApplication.run(App.class, args);
            System.out.println( "Hello World!" );
        }
    }
 ```

- 创建controller/Test.java

 ```java
 // 必须要写在App启动类一个包下才能够扫描到
@RestController    // @RestController注解相当于@ResponseBody ＋ @Controller合在一起的作用。
@RequestMapping("/app")
public class Test {
       @GetMapping("start")
        public String test() {
            return "ok";
        }
}
 ```

- 在main文件夹下面创建配置文件的目录resources/application.yml
``` yml
// 更改端口号
server:
   port: 8889
```
- 启动服务成功后访问链接http://localhost:8889/app/start， 返回OK表示成功

![https://gaoqisen.github.io/GraphBed/201909/20190920120134.png](https://gaoqisen.github.io/GraphBed/201909/20190920120134.png)

- 脚手架创建的项目也可以自己手动创建目录

## 三、maven常用命令

```shell
    mvn release:prepare   // 准备发布
    mvn release:prepare -Dusername=myuser -Dpassword=mypassword // 准备命令
    mvn release:preform  // 发布到nexus
    mvn clean package -D maven.test.skip=true  打包命令
    mvn -v 显示版本 
    mvn help:describe -Dplugin=help 使用 help 插件的  describe 目标来输出 Maven Help 插件的信息。 
    mvn help:describe -Dplugin=help -Dfull 使用Help 插件输出完整的带有参数的目标列 
    mvn help:describe -Dplugin=compiler -Dmojo=compile -Dfull 获取单个目标的信息,设置  mojo 参数和  plugin 参数。此命令列出了Compiler 插件的compile 目标的所有信息 
    mvn help:describe -Dplugin=exec -Dfull 列出所有 Maven Exec 插件可用的目标 
    mvn help:effective-pom 看这个“有效的 (effective)”POM，它暴露了 Maven的默认设置 
    
    mvn archetype:create -DgroupId=org.sonatype.mavenbook.ch03 -DartifactId=simple -DpackageName=org.sonatype.mavenbook 创建Maven的普通java项目，在命令行使用Maven Archetype 插件 
    mvn exec:java -Dexec.mainClass=org.sonatype.mavenbook.weather.Main Exec 插件让我们能够在不往 classpath 载入适当的依赖的情况下，运行这个程序 
    mvn dependency:resolve 打印出已解决依赖的列表 
    mvn dependency:sources 下载源码
    mvn dependency:tree 打印整个依赖树 
    
    mvn install -X 想要查看完整的依赖踪迹，包含那些因为冲突或者其它原因而被拒绝引入的构件，打开 Maven 的调试标记运行 
    mvn install -Dmaven.test.skip=true 给任何目标添加maven.test.skip 属性就能跳过测试 
    mvn install assembly:assembly 构建装配Maven Assembly 插件是一个用来创建你应用程序特有分发包的插件 
    
    mvn jetty:run 调用 Jetty 插件的 Run 目标在 Jetty Servlet 容器中启动 web 应用 
    mvn compile 编译你的项目 
    mvn test-compile 编译测试代码
    mvn test 运行测试
    mvn package 打包，根据pom.xml打成war或jar
    mvn -Dtest package 打包但不测试
    mvn clean 清除产生的项目
    mvn idea:idea 生成idea项目
    mvn eclipse:eclipse 生成eclipse项目
    mvn clean install 删除再编译 
    
    mvn hibernate3:hbm2ddl 使用 Hibernate3 插件构造数据库
```

## 四、maven 打包war

### 4.1 pom.xml 

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>
  <parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>2.1.3.RELEASE</version>
    <relativePath/> <!-- lookup parent from repository -->
  </parent>
  <groupId>com.abc.test</groupId>
  <artifactId>test</artifactId>
  <version>0.0.1-SNAPSHOT</version>
  <name>test</name>
  <description>Demo project for Spring Boot</description>
  <packaging>war</packaging>
  <properties>
    <java.version>1.8</java.version>
  </properties>

  <dependencies>
      <dependency>
          <groupId>org.springframework.boot</groupId>
          <artifactId>spring-boot-starter-tomcat</artifactId>
          <scope>provided</scope>
      </dependency>

      <dependency>
          <groupId>org.springframework.boot</groupId>
          <artifactId>spring-boot-starter-web</artifactId>
          <exclusions>
              <exclusion>
                  <groupId>org.springframework.boot</groupId>
                  <artifactId>spring-boot-starter-tomcat</artifactId>
              </exclusion>
          </exclusions>
      </dependency>
  </dependencies>
  <build>
           <plugins>
               <plugin>
                   <groupId>org.apache.maven.plugins</groupId>
                   <artifactId>maven-war-plugin</artifactId>
               </plugin>
           </plugins>
       </build>
</project>
```

### 4.2 main

```java
@ServletComponentScan
@SpringBootApplication
public class App extends SpringBootServletInitializer {
    public static void main(String[] args) {
        System.out.println("Hello World!");
        SpringApplication.run(App.class, args);
    }

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
        return builder.sources(App.class);
    }
}
```

## 五、maven 打包运行jar

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>1.5.17.RELEASE</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>
    <groupId>com.inspur.serverMonitoring</groupId>
    <artifactId>ServerMonitoring</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>ServerMonitoring</name>
    <description>a server monitoring application</description>
    <packaging>jar</packaging>
    <properties>
        <java.version>1.7</java.version>
    </properties>

    <dependencies>
        <dependency>
          <groupId>org.springframework.boot</groupId>
          <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
    </dependencies>
    <build>
        <finalName>monitor-1.0</finalName>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
        <resources>
            <resource>
                <directory>src/main/resources/lib</directory>
                <targetPath>BOOT-INF/lib</targetPath>
                <includes>
                    <include>**/*.jar</include>
                </includes>
            </resource>
            <resource>
                <directory>src/main/resources</directory>
                <targetPath>BOOT-INF/classes</targetPath>
            </resource>
            <resource>
                <directory>src/main/java</directory>
                <includes>
                    <include>**/*.*</include>
                </includes>
            </resource>
            <resource>
                <directory>src/main/resources</directory>
                <includes>
                    <include>**/*.*</include>
                </includes>
            </resource>
        </resources>
    </build>
</project>
```

## 六、maven打包自己的工具jar

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.test</groupId>
    <artifactId>first</artifactId>
    <version>1.0-SNAPSHOT</version>
    <packaging>jar</packaging>
    <build>
        <finalName>firstmaven1</finalName>
        <plugins>
            <plugin>
                <artifactId>maven-assembly-plugin</artifactId>
                <configuration>
                    <appendAssemblyId>true</appendAssemblyId>
                    <descriptorRefs>
                        <descriptorRef>jar-with-dependencies</descriptorRef>
                    </descriptorRefs>
                    <archive>
                    </archive>
                </configuration>
                <executions>
                    <execution>
                        <id>make-assembly</id>
                        <phase>package</phase>
                        <goals>
                            <goal>assembly</goal>
                        </goals>
                    </execution>
                </executions>
            </plugin>
        </plugins>
    </build>
</project>
```