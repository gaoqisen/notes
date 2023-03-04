---
title: 01_Mybatis源码-初探流程
date: 2021-07-28 20:43:40
tags: sourcecode
categories: sourcecode
keywords: sourcecode
description: 《通用源码阅读指导书：mybatis源码详解》阅读后的读书笔记。Mybatis下载源码跟着debug一遍后记录一些比较重要的注释，便于以后回忆便于学习。
---

主要是阅读了《通用源码阅读指导书：mybatis源码详解》后想要自己做一些笔记方便后期自己可以随时查找，参考书目录大致分5个大的方向去了解mybatis，大致流程>基础包>解析包>核心包>总结。后面的有部分源码和这里的会重复，是为了单独包的完整性，也添加了一些注释。

## 一、源码阅读

```java
// 串流程  
public static void main(String[] args) throws IOException {
    // 1. mybatis加载 （解析的时候报错Could not find resource mybatis-config.xml，这是idea不会编译src下的xml文件，选中resource后将文件夹设置为资源目录即可）
    String resource = "mybatis/mybatis-config.xml";
    InputStream inputStream = Resources.getResourceAsStream(resource);
    SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);

    // 2. 创建一个默认DefaultSession
    SqlSession sqlSession = sqlSessionFactory.openSession();

    // 3. 通过JDK的动态代理创建一个代理类。
    UserInfoMapper userInfoMapper = sqlSession.getMapper(UserInfoMapper.class);
		
    // 4. 调用代理类去执行sql
    List<UserInfo> info = userInfoMapper.getUserInfoByLessDate(LocalDate.now());
    info.forEach((s) -> {
      System.out.println(s.toString());
    });
  }
```

上述代码就是通过mybatis去加载xml文件后访问数据库后返回查询结果的逻辑。首先是通过SqlSessionFactoryBuilder.build方法去解析mybagis-config.xml和mapper.xml，在创建出sqlSession后用动态代理方式获取UserInfoMapper的代理类，最后用代理类去执行sql并返回结果。这样的好处是将sql和java方法隔离开，让方法调用者不用关心sql的逻辑。缺点就是需要写大量的sql语句，其实很多数据库的操作都是单表操作通过反射实体类属性就可以拼接成sql语句之后就可以直接执行，tk-mybatis、mybatis-plus都是对mybaits的增强为了减少sql语句的编写。下面是伪代码的大致流程:

```java
// 大致的调试方向
解析xml
		mybatis-config.xml解析过程
		SqlMapper.xml解析过程
		BaseBuilder建造器
创建sqlSession
创建代理类
执行sql
		动态代理执行的invoke方法
		执行返回多个结果的sql
		进行selectList
		执行器执行查询sql
		处理结果集
```

### 1.1 解析xml

主要逻辑是将Mybatis-config.xml和各种Mapper.xml解析为Configuration对象。执行逻辑的接口调用流程如下：

```java
org.apache.ibatis.session.SqlSessionFactoryBuilder#build()
	org.apache.ibatis.builder.xml.XMLConfigBuilder#XMLConfigBuilder()
		org.apache.ibatis.parsing.XPathParser#XPathParser()
			org.apache.ibatis.parsing.XPathParser#commonConstructor
  			// 利用DocumentBuilderFactory设置参数将InputSource转为Document（将xml文件转为Document）
				org.apache.ibatis.parsing.XPathParser#createDocument
  				com.sun.org.apache.xerces.internal.jaxp.DocumentBuilderImpl#parse
  // 将Document转为Configuration对象，(利用建造者设计模式)
	org.apache.ibatis.builder.xml.XMLConfigBuilder#parse
  	parseConfiguration // 获取configuration节点
		org.apache.ibatis.builder.xml.XMLConfigBuilder#parseConfiguration
  		propertiesElement // 获取properties节点
  		settingsAsProperties // 获取settings节点
  		... // 解析其他节点数据
  // 初始化DefaultSqlSessionFactory后完成mybagis-config.xml加载
  org.apache.ibatis.session.defaults.DefaultSqlSessionFactory#DefaultSqlSessionFactory
```

通过XMLConfigBuilder利用XPathParser把配置文件从inputStream转化为w3c的Document对象。之后XMLConfigBuilder.parse方法解析Document对象为Configuration对象。解析的时候XMLConfigBuilder是用的建造器模式

#### 1.1.1 mybatis-config.xml解析过程

```java
  // 解析配置
  private void parseConfiguration(XNode root) {
    try {
      // 官方链接：https://mybatis.org/mybatis-3/zh/configuration.html
      // issue #117 read properties first
      // 属性
      propertiesElement(root.evalNode("properties"));
      // 全局设置
      Properties settings = settingsAsProperties(root.evalNode("settings"));
      loadCustomVfs(settings);
      loadCustomLogImpl(settings);

      // typeAliases类型别名
      typeAliasesElement(root.evalNode("typeAliases"));
      // plugins插件: 在映射语句执行过程中的某一点进行拦截调用
      pluginElement(root.evalNode("plugins"));
      // objectFactory对象工厂:如果想覆盖对象工厂的默认行为，可以通过创建自己的对象工厂来实现
      objectFactoryElement(root.evalNode("objectFactory"));
      // objectWrapperFactory对象包装器工厂
      objectWrapperFactoryElement(root.evalNode("objectWrapperFactory"));
      // 反射工厂
      reflectorFactoryElement(root.evalNode("reflectorFactory"));
      // settings数据映射
      settingsElement(settings);

      // read it after objectFactory and objectWrapperFactory issue #631
      // 环境数据: 配置成适应多种环境, 每个数据库对应一个 SqlSessionFactory 实例
      environmentsElement(root.evalNode("environments"));
      // 数据库厂商标识
      databaseIdProviderElement(root.evalNode("databaseIdProvider"));
      // 类型处理器 在设置预处理语句（PreparedStatement）中的参数或从结果集中取出一个值时， 都会用类型处理器将获取到的值以合适的方式转换成 Java 类型
      typeHandlerElement(root.evalNode("typeHandlers"));
      // 映射文件处理
      mapperElement(root.evalNode("mappers"));
    } catch (Exception e) {
      throw new BuilderException("Error parsing SQL Mapper Configuration. Cause: " + e, e);
    }
  }
```

下面是每个标签的具体解析，configuration标签下面的子标签。

```xml
<!ELEMENT configuration (properties?, settings?, typeAliases?, typeHandlers?, objectFactory?, objectWrapperFactory?, reflectorFactory?, plugins?, environments?, databaseIdProvider?, mappers?)>
```

parseConfiguration方法作为一个方法解析的入口去进行各个标签的解析，每个方法进行自己的解析逻辑，这样按照标签拆分的代码更容易理解和维护。下面是每个方法里面的具体解析逻辑：

##### 1. 属性获取propertiesElement

```java
  private void propertiesElement(XNode context) throws Exception {
    if (context != null) {
      Properties defaults = context.getChildrenAsProperties();

      // 如果resource和url不为空则通过url获取外部数据
      String resource = context.getStringAttribute("resource");
      String url = context.getStringAttribute("url");
      if (resource != null && url != null) {
        throw new BuilderException("The properties element cannot specify both a URL and a resource based property file reference.  Please specify one or the other.");
      }
      if (resource != null) {
        defaults.putAll(Resources.getResourceAsProperties(resource));
      } else if (url != null) {
        defaults.putAll(Resources.getUrlAsProperties(url));
      }
      // 将之前的配置和现在获取的数据汇总
      Properties vars = configuration.getVariables();
      if (vars != null) {
        defaults.putAll(vars);
      }

      // 将属性设置到配置里面
      parser.setVariables(defaults);
      configuration.setVariables(defaults);
    }
  }
```

##### 2 设置配置获取settingsAsProperties

```java
// 将xml节点数据转换为Properties  
private Properties settingsAsProperties(XNode context) {
    if (context == null) {
      return new Properties();
    }
    Properties props = context.getChildrenAsProperties();
    // 检查配置类是否有这些配置
    MetaClass metaConfig = MetaClass.forClass(Configuration.class, localReflectorFactory);
    for (Object key : props.keySet()) {
      if (!metaConfig.hasSetter(String.valueOf(key))) {
        throw new BuilderException("The setting " + key + " is not known.  Make sure you spelled it correctly (case sensitive).");
      }
    }
    return props;
  }

// 指定 MyBatis 所用日志的具体实现，未指定时将自动查找。
private void loadCustomVfs(Properties props) throws ClassNotFoundException {
  String value = props.getProperty("vfsImpl");
  if (value != null) {
    String[] clazzes = value.split(",");
    for (String clazz : clazzes) {
      if (!clazz.isEmpty()) {
        @SuppressWarnings("unchecked")
        Class<? extends VFS> vfsImpl = (Class<? extends VFS>)Resources.classForName(clazz);
        configuration.setVfsImpl(vfsImpl);
      }
    }
  }
}
// 自定义 VFS 的实现的类全限定名，以逗号分隔。
private void loadCustomLogImpl(Properties props) {
  Class<? extends Log> logImpl = resolveClass(props.getProperty("logImpl"));
  configuration.setLogImpl(logImpl);
}
// 进行数据映射，没有的则获取默认值
settingsElement(Paroperties props);
```

##### 3. 类型别名typeAliases

```java
  private void typeAliasesElement(XNode parent) {
    if (parent != null) {
      for (XNode child : parent.getChildren()) {
        // 指定一个包名，MyBatis 会在包名下面搜索需要的 Java Bean
        if ("package".equals(child.getName())) {
          String typeAliasPackage = child.getStringAttribute("name");
          configuration.getTypeAliasRegistry().registerAliases(typeAliasPackage);
        } 
        // 设置别名
        else {
          String alias = child.getStringAttribute("alias");
          String type = child.getStringAttribute("type");
          try {
            Class<?> clazz = Resources.classForName(type);
            if (alias == null) {
              typeAliasRegistry.registerAlias(clazz);
            } else {
              typeAliasRegistry.registerAlias(alias, clazz);
            }
          } catch (ClassNotFoundException e) {
            throw new BuilderException("Error registering typeAlias for '" + alias + "'. Cause: " + e, e);
          }
        }
      }
    }
  }
```

##### 4. 插件pluginElement

```java
  private void pluginElement(XNode parent) throws Exception {
    if (parent != null) {
      for (XNode child : parent.getChildren()) {
        String interceptor = child.getStringAttribute("interceptor");
        Properties properties = child.getChildrenAsProperties();
        // 拦截器定义
        Interceptor interceptorInstance = (Interceptor) resolveClass(interceptor).getDeclaredConstructor().newInstance();
        interceptorInstance.setProperties(properties);
        // 将拦截器放入InterceptorChain
        configuration.addInterceptor(interceptorInstance);
      }
    }
  }
```

##### 5.  对象工厂objectFactory

```java
  private void objectFactoryElement(XNode context) throws Exception {
    if (context != null) {
      String type = context.getStringAttribute("type");
      Properties properties = context.getChildrenAsProperties();
      // 通过类名加载类
      ObjectFactory factory = (ObjectFactory) resolveClass(type).getDeclaredConstructor().newInstance();
      factory.setProperties(properties);
      configuration.setObjectFactory(factory);
    }
  }
```

##### 6. 对象包装器工厂objectWrapperFactory

```java
  private void objectWrapperFactoryElement(XNode context) throws Exception {
    if (context != null) {
      String type = context.getStringAttribute("type");
      ObjectWrapperFactory factory = (ObjectWrapperFactory) resolveClass(type).getDeclaredConstructor().newInstance();
      configuration.setObjectWrapperFactory(factory);
    }
  }
```

##### 7. 反射工厂reflectorFactoryElement

```java
  private void reflectorFactoryElement(XNode context) throws Exception {
    if (context != null) {
      String type = context.getStringAttribute("type");
      ReflectorFactory factory = (ReflectorFactory) resolveClass(type).getDeclaredConstructor().newInstance();
      configuration.setReflectorFactory(factory);
    }
  }
```

##### 8. 环境数据environmentsElement

```java
// 环境配置
private void environmentsElement(XNode context) throws Exception {
    if (context != null) {
      if (environment == null) {
        environment = context.getStringAttribute("default");
      }
      // 支持配置多个环境
      for (XNode child : context.getChildren()) {
        String id = child.getStringAttribute("id");
        if (isSpecifiedEnvironment(id)) {
          TransactionFactory txFactory = transactionManagerElement(child.evalNode("transactionManager"));
          // 数据库处理
          DataSourceFactory dsFactory = dataSourceElement(child.evalNode("dataSource"));
          DataSource dataSource = dsFactory.getDataSource();
          // 构建数据库环境数据并set到配置对象
          Environment.Builder environmentBuilder = new Environment.Builder(id)
              .transactionFactory(txFactory)
              .dataSource(dataSource);
          configuration.setEnvironment(environmentBuilder.build());
          break;
        }
      }
    }
  }
  
    // 配置数据库消息
  private DataSourceFactory dataSourceElement(XNode context) throws Exception {
    if (context != null) {
      // 通过type获取数据源工厂类
      String type = context.getStringAttribute("type");
      DataSourceFactory factory = (DataSourceFactory) resolveClass(type).getDeclaredConstructor().newInstance();
      
      // 将数据源配置set到数据源工厂类
      Properties props = context.getChildrenAsProperties();
      factory.setProperties(props);
      return factory;
    }
    throw new BuilderException("Environment declaration requires a DataSourceFactory.");
  }
```

##### 9. 数据库厂商标识databaseIdProviderElement

```java
  private void databaseIdProviderElement(XNode context) throws Exception {
    // 通过type获取数据库上商实现类并set属性
    DatabaseIdProvider databaseIdProvider = null;
    if (context != null) {
      String type = context.getStringAttribute("type");
      // awful patch to keep backward compatibility
      if ("VENDOR".equals(type)) {
        type = "DB_VENDOR";
      }
      Properties properties = context.getChildrenAsProperties();
      databaseIdProvider = (DatabaseIdProvider) resolveClass(type).getDeclaredConstructor().newInstance();
      databaseIdProvider.setProperties(properties);
    }
    
    // 设置数据库ID
    Environment environment = configuration.getEnvironment();
    if (environment != null && databaseIdProvider != null) {
      String databaseId = databaseIdProvider.getDatabaseId(environment.getDataSource());
      configuration.setDatabaseId(databaseId);
    }
  }
```

##### 10. 类型处理器typeHandlerElement

```java
  private void typeHandlerElement(XNode parent) {
    if (parent != null) {
      for (XNode child : parent.getChildren()) {
        // 遇到package标签则 MyBatis 帮你查找类型处理器
        if ("package".equals(child.getName())) {
          String typeHandlerPackage = child.getStringAttribute("name");
          typeHandlerRegistry.register(typeHandlerPackage);
        }
        // 其他标签则注册到TypeHandlerRegistry
        else {
          String javaTypeName = child.getStringAttribute("javaType");
          String jdbcTypeName = child.getStringAttribute("jdbcType");
          String handlerTypeName = child.getStringAttribute("handler");
          Class<?> javaTypeClass = resolveClass(javaTypeName);
          JdbcType jdbcType = resolveJdbcType(jdbcTypeName);
          Class<?> typeHandlerClass = resolveClass(handlerTypeName);
          if (javaTypeClass != null) {
            if (jdbcType == null) {
              typeHandlerRegistry.register(javaTypeClass, typeHandlerClass);
            } else {
              typeHandlerRegistry.register(javaTypeClass, jdbcType, typeHandlerClass);
            }
          } else {
            typeHandlerRegistry.register(typeHandlerClass);
          }
        }
      }
    }
  }
```

##### 11. 映射文件mapperElement

```java
  private void mapperElement(XNode parent) throws Exception {
    if (parent != null) {
      for (XNode child : parent.getChildren()) {
        // 标签为package则获取包下面的所有类，并解析为Class后通过addMapper添加到配置里面
        if ("package".equals(child.getName())) {
          String mapperPackage = child.getStringAttribute("name");
          configuration.addMappers(mapperPackage);
        } else {
          // 获取相关数据
          String resource = child.getStringAttribute("resource");
          String url = child.getStringAttribute("url");
          String mapperClass = child.getStringAttribute("class");

          // resource有值则解析该xml
          if (resource != null && url == null && mapperClass == null) {
            ErrorContext.instance().resource(resource);
            try(InputStream inputStream = Resources.getResourceAsStream(resource)) {
              XMLMapperBuilder mapperParser = new XMLMapperBuilder(inputStream, configuration, resource, configuration.getSqlFragments());
              // sql的解析过程，下面单独写一下
              mapperParser.parse();
            }
          }
          // url有值则使用完全限定资源定位符解析xml数据
          else if (resource == null && url != null && mapperClass == null) {
            ErrorContext.instance().resource(url);
            try(InputStream inputStream = Resources.getUrlAsStream(url)){
              XMLMapperBuilder mapperParser = new XMLMapperBuilder(inputStream, configuration, url, configuration.getSqlFragments());
              // SqlMapper.xml的解析过程
              mapperParser.parse();
            }
          } 
          // class值则将类添加到Map<Class<?>, MapperProxyFactory<?>>里面
          else if (resource == null && url == null && mapperClass != null) {
            Class<?> mapperInterface = Resources.classForName(mapperClass);
            configuration.addMapper(mapperInterface);
          } else {
            throw new BuilderException("A mapper element may only specify a url, resource or class, but not more than one.");
          }
        }
      }
    }
  }
```

#### 1.1.3 SqlMapper.xml解析过程

在解析完mybatis-config.xml后获取到了mapper.xml路径后就去解析了mapper.xml里面的标签。解析的过程就是将标签解析为mapper包里面的对象，后面用于java方法和xml语句的绑定。下面的解析过程也和mybatis-config.xml解析过程一样，每个方法去解析不同的标签

```java
// ##### 解析sql #####
  public void parse() {
    // 加载的数据没有加载过则加载
    if (!configuration.isResourceLoaded(resource)) {
      // 配置处理
      configurationElement(parser.evalNode("/mapper"));
      configuration.addLoadedResource(resource);
      // 命名空间映射绑定
      bindMapperForNamespace();
    }
    // 下面的方法是为了解决标签不是顺序编写的问题
    // 解析resultMap
    parsePendingResultMaps();
    // 解析引用其它命名空间的缓存配置
    parsePendingCacheRefs();
    // 解析语句
    parsePendingStatements();
  }
```

之后就是每个方法的具体解析逻辑

##### 1. 配置处理configurationElement

```java
  private void configurationElement(XNode context) {
    try {
      // 设置命名空间
      String namespace = context.getStringAttribute("namespace");
      if (namespace == null || namespace.isEmpty()) {
        throw new BuilderException("Mapper's namespace cannot be empty");
      }
      builderAssistant.setCurrentNamespace(namespace);
      // 缓存处理
      cacheRefElement(context.evalNode("cache-ref"));
      cacheElement(context.evalNode("cache"));
      // 参数处理<parameterMap/>
      parameterMapElement(context.evalNodes("/mapper/parameterMap"));
      // 返回结果处理<resultMap/>
      resultMapElements(context.evalNodes("/mapper/resultMap"));
      // 处理sql<sql/>
      sqlElement(context.evalNodes("/mapper/sql"));
      // 通过上下文构建声明<select/>
      buildStatementFromContext(context.evalNodes("select|insert|update|delete"));
    } catch (Exception e) {
      throw new BuilderException("Error parsing Mapper XML. The XML location is '" + resource + "'. Cause: " + e, e);
    }
  }

  // 构建声明（sql语句）
  private void buildStatementFromContext(List<XNode> list, String requiredDatabaseId) {
    for (XNode context : list) {
      final XMLStatementBuilder statementParser = new XMLStatementBuilder(configuration, builderAssistant, context, requiredDatabaseId);
      try {
        // 解析声明节点（sql语句）,将sql节点解析为MappedStatement（sql解析为SqlSource）
        statementParser.parseStatementNode();
      } catch (IncompleteElementException e) {
        configuration.addIncompleteStatement(statementParser);
      }
    }
  }
```

##### 2. 映射绑定bindMapperForNamespace

```java
  private void bindMapperForNamespace() {
    String namespace = builderAssistant.getCurrentNamespace();
    if (namespace != null) {
      // 通过classname转换为Class
      Class<?> boundType = null;
      try {
        boundType = Resources.classForName(namespace);
      } catch (ClassNotFoundException e) {
        // ignore, bound type is not required
      }
      
      // 如果不为空则将Class放到Configuration里面
      if (boundType != null && !configuration.hasMapper(boundType)) {
        // Spring may not know the real resource name so we set a flag
        // to prevent loading again this resource from the mapper interface
        // look at MapperAnnotationBuilder#loadXmlResource
        configuration.addLoadedResource("namespace:" + namespace);
        // 添加映射代理工厂，后面获取代理工厂类时候需要用到
        configuration.addMapper(boundType);
      }
    }
  }
```

##### 3. 遍历解析

parsePendingResultMaps();将incompleteResultMaps解析为resultMaps，

parsePendingCacheRefs();解析incompleteCacheRefs

parsePendingStatements();将incompleteStatements解析为mappedStatements

解析代码过多，就不帖过来了

```java
  private void parsePendingResultMaps() {
    // 获取结果数据后遍历解析 将Collection<ResultMapResolver>转为ResultMap
    Collection<ResultMapResolver> incompleteResultMaps = configuration.getIncompleteResultMaps();
    synchronized (incompleteResultMaps) {
      Iterator<ResultMapResolver> iter = incompleteResultMaps.iterator();
      while (iter.hasNext()) {
        try {
          iter.next().resolve();
          iter.remove();
        } catch (IncompleteElementException e) {
          // ResultMap is still missing a resource...
        }
      }
    }
  }
```

#### 1.1.3 BaseBuilder建造器

XMLConfigBuilder继承了BaseBuilder，这里使用了构建器来组装复杂的Configuration对象，BaseBuilder里面封装了一些各个xml解析需要的方法。

```java
public abstract class BaseBuilder {
  // 全局的配置（mybatis-config.xml）数据
  protected final Configuration configuration;
  // <typeAliases>标签 定义的别名
  protected final TypeAliasRegistry typeAliasRegistry;
  // <typeHandlers>标签 添加 自定义TypeHandler
  protected final TypeHandlerRegistry typeHandlerRegistry;

  // 构造器初始化数据
  public BaseBuilder(Configuration configuration) {
    this.configuration = configuration;
    this.typeAliasRegistry = this.configuration.getTypeAliasRegistry();
    this.typeHandlerRegistry = this.configuration.getTypeHandlerRegistry();
  }
  ... // 各种参数处理方法
}  
```

所有继承了BaseBuilder的类

```java
XMLMapperBuilder
SqlSourceBuilder.ParameterMappingTokenHandler
MapperBuilderAssistant // 一个辅助类
XMLScriptBuilder
XMLConfigBuilder
SqlSourceBuilder
XMLStatementBuilder
```

### 1.2 创建SqlSession

通过configuration里面的数据初始化执行器后创建DefaultSqlSession

```java
org.apache.ibatis.session.defaults.DefaultSqlSessionFactory#openSession()
  org.apache.ibatis.session.defaults.DefaultSqlSessionFactory#openSessionFromDataSource
  	org.apache.ibatis.transaction.jdbc.JdbcTransactionFactory#newTransaction()
    // new了一个简单的执行器，默认通过简单执行器获取二级缓存执行器。并将执行器存入拦截器责任链
  	org.apache.ibatis.session.Configuration#newExecutor()
```

```java
  private SqlSession openSessionFromDataSource(ExecutorType execType, TransactionIsolationLevel level, boolean autoCommit) {
    Transaction tx = null;
    try {
      // 通过配置消息获取事务
      final Environment environment = configuration.getEnvironment();
      final TransactionFactory transactionFactory = getTransactionFactoryFromEnvironment(environment);
      tx = transactionFactory.newTransaction(environment.getDataSource(), level, autoCommit);

      // 通过环境信息和事务获取执行器
      final Executor executor = configuration.newExecutor(tx, execType);

      // 初始化一个DefaultSqlSession
      return new DefaultSqlSession(configuration, executor, autoCommit);
    } catch (Exception e) {
      closeTransaction(tx); // may have fetched a connection so lets call close()
      throw ExceptionFactory.wrapException("Error opening session.  Cause: " + e, e);
    } finally {
      ErrorContext.instance().reset();
    }
  }

  // 通过工厂创建执行器逻辑
  public Executor newExecutor(Transaction transaction, ExecutorType executorType) {
    executorType = executorType == null ? defaultExecutorType : executorType;
    executorType = executorType == null ? ExecutorType.SIMPLE : executorType;
    // 创建执行器
    Executor executor;
    if (ExecutorType.BATCH == executorType) {
      executor = new BatchExecutor(this, transaction);
    } else if (ExecutorType.REUSE == executorType) {
      executor = new ReuseExecutor(this, transaction);
    } else {
      executor = new SimpleExecutor(this, transaction);
    }
    // 二级缓存默认为true（其中的一个配置）
    if (cacheEnabled) {
      executor = new CachingExecutor(executor);
    }
    // 将执行器放入拦截器责任链
    executor = (Executor) interceptorChain.pluginAll(executor);
    return executor;
  }
```

### 1.3 创建代理类

Mybatis通过前面把Mybatis-config.xml和各种映射Mapper.xml解析为Configuration后就获取到了所有的配置数据，之后在开发的时候就只需要写一个Mapper方法就可以了。其他程序在调用Mapper的时候最终是调用的一个动态代理类，在代理类里面通过mapper的方法名获取需要执行的sql并创建数据库连接执行sql后处理结果集并返回。

```java
org.apache.ibatis.session.defaults.DefaultSqlSession#getMapper
	org.apache.ibatis.binding.MapperRegistry#getMapper
		org.apache.ibatis.binding.MapperProxyFactory#newInstance()
```

```java
  // MapperRegistry类
  @SuppressWarnings("unchecked")
  public <T> T getMapper(Class<T> type, SqlSession sqlSession) {
    // 获取映射代理类，在bindMapperForNamespace时存入
    final MapperProxyFactory<T> mapperProxyFactory = (MapperProxyFactory<T>) knownMappers.get(type);
    if (mapperProxyFactory == null) {
      throw new BindingException("Type " + type + " is not known to the MapperRegistry.");
    }
    try {
      // 创建代理类
      return mapperProxyFactory.newInstance(sqlSession);
    } catch (Exception e) {
      throw new BindingException("Error getting mapper instance. Cause: " + e, e);
    }
  }

 // MapperProxyFactory类
  @SuppressWarnings("unchecked")
  // 通过java的jdk动态代理类创建代理
  protected T newInstance(MapperProxy<T> mapperProxy) {
    return (T) Proxy.newProxyInstance(mapperInterface.getClassLoader(), new Class[] { mapperInterface }, mapperProxy);
  }

  // 通过sqlSession创建代理类
  public T newInstance(SqlSession sqlSession) {
    // 创建代理类
    final MapperProxy<T> mapperProxy = new MapperProxy<>(sqlSession, mapperInterface, methodCache);
    return newInstance(mapperProxy);
  }

```

### 1.4 执行sql

执行sql的时候是通过动态代理去执行的MapperMethodexecute.execute方法，在execute方法里面通过区分是select还是update等去进行不同的逻辑执行，当前测试的是执行的selectList获取多条数据。之后就是各种执行器去执行CachingExecutor > BaseExecutor > SimpleExecutor后调用了PreparedStatementHandler去最终调用数据库执行sql，执行完成后通过DefaultResultSetHandler进行结果集处理。以下是部分代码逻辑：

```java
// 调用MapperMethod去执行sql
org.apache.ibatis.binding.MapperProxy#invoke
  // 通过执行命令去switch不同的方法
	org.apache.ibatis.binding.MapperMethod#execute
	  // 执行多条数据
		org.apache.ibatis.binding.MapperMethod#executeForMany
			org.apache.ibatis.session.defaults.DefaultSqlSession#selectList()
				org.apache.ibatis.session.Configuration#getMappedStatement()
				org.apache.ibatis.executor.CachingExecutor#query()
					org.apache.ibatis.mapping.MappedStatement#getBoundSql
					org.apache.ibatis.executor.CachingExecutor#createCacheKey
					// 查询数据
					org.apache.ibatis.executor.BaseExecutor#query()
					  // 处理缓存
						org.apache.ibatis.executor.BaseExecutor#queryFromDatabase
						  // 将MappedStatement等数据转换为Statement
							org.apache.ibatis.executor.SimpleExecutor#doQuery
							  // 通过PreparedStatement去执行sql
								org.apache.ibatis.executor.statement.PreparedStatementHandler#query
								  // 处理执行结果
									org.apache.ibatis.executor.resultset.DefaultResultSetHandler#handleResultSets
```

##### 1. 动态代理执行的invoke方法

```java
  // 动态代理执行的invoke方法
  @Override
  public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
    try {
      if (Object.class.equals(method.getDeclaringClass())) {
        return method.invoke(this, args);
      } else {
        // 缓存调用（cachedInvoker里面通过方法名称获取了configuration里面的sql信息）
        return cachedInvoker(method).invoke(proxy, method, args, sqlSession);
      }
    } catch (Throwable t) {
      throw ExceptionUtil.unwrapThrowable(t);
    }
  }

	  // 通过不同的名称执行不同的方法
  public Object execute(SqlSession sqlSession, Object[] args) {
    Object result;
    switch (command.getType()) {
      case INSERT: {
        Object param = method.convertArgsToSqlCommandParam(args);
        result = rowCountResult(sqlSession.insert(command.getName(), param));
        break;
      }
      case UPDATE: {
        Object param = method.convertArgsToSqlCommandParam(args);
        result = rowCountResult(sqlSession.update(command.getName(), param));
        break;
      }
      case DELETE: {
        Object param = method.convertArgsToSqlCommandParam(args);
        result = rowCountResult(sqlSession.delete(command.getName(), param));
        break;
      }
      case SELECT:
        // 返回空与存在结果处理索引
        if (method.returnsVoid() && method.hasResultHandler()) {
          executeWithResultHandler(sqlSession, args);
          result = null;
        }
        // 返回多条数据（debug走的是这个语句）
        else if (method.returnsMany()) {
          result = executeForMany(sqlSession, args);
        }
        // 返回map数据
        else if (method.returnsMap()) {
          result = executeForMap(sqlSession, args);
        }
        // 返回游标数据
        else if (method.returnsCursor()) {
          result = executeForCursor(sqlSession, args);
        }
        // 其他的直接selectOne
        else {
          Object param = method.convertArgsToSqlCommandParam(args);
          result = sqlSession.selectOne(command.getName(), param);
          if (method.returnsOptional()
              && (result == null || !method.getReturnType().equals(result.getClass()))) {
            result = Optional.ofNullable(result);
          }
        }
        break;
      case FLUSH:
        result = sqlSession.flushStatements();
        break;
      default:
        throw new BindingException("Unknown execution method for: " + command.getName());
    }
    if (result == null && method.getReturnType().isPrimitive() && !method.returnsVoid()) {
      throw new BindingException("Mapper method '" + command.getName()
          + " attempted to return null from a method with a primitive return type (" + method.getReturnType() + ").");
    }
    return result;
  }
	
```

##### 2. 执行返回多个结果的sql

```java
  // 执行返回多个结果的sql
  private <E> Object executeForMany(SqlSession sqlSession, Object[] args) {
    List<E> result;
    // sql参数转换
    Object param = method.convertArgsToSqlCommandParam(args);
    // 判断是否存在行界限索引后，执行selectList方法
    if (method.hasRowBounds()) {
      RowBounds rowBounds = method.extractRowBounds(args);
      result = sqlSession.selectList(command.getName(), param, rowBounds);
    } else {
      result = sqlSession.selectList(command.getName(), param);
    }
    // issue #510 Collections & arrays support
    if (!method.getReturnType().isAssignableFrom(result.getClass())) {
      if (method.getReturnType().isArray()) {
        return convertToArray(result);
      } else {
        return convertToDeclaredCollection(sqlSession.getConfiguration(), result);
      }
    }
    return result;
  }

```

##### 3. 进行selectList

```java
  // 执行selectList
  private <E> List<E> selectList(String statement, Object parameter, RowBounds rowBounds, ResultHandler handler) {
    try {
      // 获取映射声明
      MappedStatement ms = configuration.getMappedStatement(statement);
      // 执行器去执行查询语句
      return executor.query(ms, wrapCollection(parameter), rowBounds, handler);
    } catch (Exception e) {
      throw ExceptionFactory.wrapException("Error querying database.  Cause: " + e, e);
    } finally {
      ErrorContext.instance().reset();
    }
  }
```

##### 4. 执行器执行查询sql

```java
// ##### 缓存执行器执行查询sql #####
@Override
  public <E> List<E> query(MappedStatement ms, Object parameterObject, RowBounds rowBounds, ResultHandler resultHandler) throws SQLException {
    // 将参数转换为BoundSql
    BoundSql boundSql = ms.getBoundSql(parameterObject);
    // 获取缓存key
    CacheKey key = createCacheKey(ms, parameterObject, rowBounds, boundSql);
    return query(ms, parameterObject, rowBounds, resultHandler, key, boundSql);
  }

  @Override
  public <E> List<E> query(MappedStatement ms, Object parameterObject, RowBounds rowBounds, ResultHandler resultHandler, CacheKey key, BoundSql boundSql)
      throws SQLException {
    Cache cache = ms.getCache();
    // 未命中缓存
    if (cache != null) {
      // 缓存刷新处理
      flushCacheIfRequired(ms);
      if (ms.isUseCache() && resultHandler == null) {
        // 确保参数
        ensureNoOutParams(ms, boundSql);
        @SuppressWarnings("unchecked")
        List<E> list = (List<E>) tcm.getObject(cache, key);
        if (list == null) {
          // 调用Base执行器执行查询sql
          list = delegate.query(ms, parameterObject, rowBounds, resultHandler, key, boundSql);
          tcm.putObject(cache, key, list); // issue #578 and #116
        }
        return list;
      }
    }
    // 命中缓存
    return delegate.query(ms, parameterObject, rowBounds, resultHandler, key, boundSql);
  }

// ##### Base执行器执行逻辑 ######
  @Override
  public <E> List<E> query(MappedStatement ms, Object parameter, RowBounds rowBounds, ResultHandler resultHandler, CacheKey key, BoundSql boundSql) throws SQLException {
    ErrorContext.instance().resource(ms.getResource()).activity("executing a query").object(ms.getId());
    if (closed) {
      throw new ExecutorException("Executor was closed.");
    }
    if (queryStack == 0 && ms.isFlushCacheRequired()) {
      clearLocalCache();
    }
    List<E> list;
    try {
      queryStack++;
      // 本地缓存处理
      list = resultHandler == null ? (List<E>) localCache.getObject(key) : null;
      if (list != null) {
        handleLocallyCachedOutputParameters(ms, key, parameter, boundSql);
      }
      // 缓存为空则从数据库执行sql（从数据库进行查询操作前的本地缓存处理，之后调用抽象方法doQuery）
      else {
        list = queryFromDatabase(ms, parameter, rowBounds, resultHandler, key, boundSql);
      }
    } finally {
      queryStack--;
    }
    if (queryStack == 0) {
      for (DeferredLoad deferredLoad : deferredLoads) {
        deferredLoad.load();
      }
      // issue #601
      deferredLoads.clear();
      if (configuration.getLocalCacheScope() == LocalCacheScope.STATEMENT) {
        // issue #482
        clearLocalCache();
      }
    }
    return list;
  }

// ##### Simple执行器通过jdbc连接数据库执行sql #####
  @Override
  public <E> List<E> doQuery(MappedStatement ms, Object parameter, RowBounds rowBounds, ResultHandler resultHandler, BoundSql boundSql) throws SQLException {
    Statement stmt = null;
    try {
      // 获取全部配置后new了一个RoutingStatementHandler
      Configuration configuration = ms.getConfiguration();
      StatementHandler handler = configuration.newStatementHandler(wrapper, ms, parameter, rowBounds, resultHandler, boundSql);
      // 准备声明，获取jdbc链接和jdbc声明
      stmt = prepareStatement(handler, ms.getStatementLog());
      // 调用PreparedStatementHandler进行sql执行
      return handler.query(stmt, resultHandler);
    } finally {
      closeStatement(stmt);
    }
  }

// #### PreparedStatementHandler准备声明处理 ###
  @Override
  public <E> List<E> query(Statement statement, ResultHandler resultHandler) throws SQLException {
    // jdbc声明执行
    PreparedStatement ps = (PreparedStatement) statement;
    ps.execute();
    // 处理结果集
    return resultSetHandler.handleResultSets(ps);
  }
```

##### 5. 处理结果集

```java
// DefaultResultSetHandler.handleResultSets
  @Override
  public List<Object> handleResultSets(Statement stmt) throws SQLException {
    ErrorContext.instance().activity("handling results").object(mappedStatement.getId());

    final List<Object> multipleResults = new ArrayList<>();

    int resultSetCount = 0;
    ResultSetWrapper rsw = getFirstResultSet(stmt);

    // 处理ResultMap
    List<ResultMap> resultMaps = mappedStatement.getResultMaps();
    int resultMapCount = resultMaps.size();
    validateResultMapsCount(rsw, resultMapCount);
    while (rsw != null && resultMapCount > resultSetCount) {
      ResultMap resultMap = resultMaps.get(resultSetCount);
      // 处理结果
      handleResultSet(rsw, resultMap, multipleResults, null);
      rsw = getNextResultSet(stmt);
      cleanUpAfterHandlingResultSet();
      resultSetCount++;
    }

    String[] resultSets = mappedStatement.getResultSets();
    if (resultSets != null) {
      while (rsw != null && resultSetCount < resultSets.length) {
        ResultMapping parentMapping = nextResultMaps.get(resultSets[resultSetCount]);
        if (parentMapping != null) {
          String nestedResultMapId = parentMapping.getNestedResultMapId();
          ResultMap resultMap = configuration.getResultMap(nestedResultMapId);
          handleResultSet(rsw, resultMap, null, parentMapping);
        }
        rsw = getNextResultSet(stmt);
        cleanUpAfterHandlingResultSet();
        resultSetCount++;
      }
    }

    return collapseSingleResultList(multipleResults);
```

## 二、关键点

### 2.1 数据解析

Mybatis把解析xml数据全部加载到Configuration里面。在解析的时候，每个大的标签都对应一个类比如configuration标签对应Configuration类等等。解析的类都继承一个BaseBuilder的的基类，这个类里面有一些通用的方法供子类使用。

### 2.2 动态代理

利用动态代理的技术将调用逻辑封装起来，客户端使用的时候完全无感知调用的具体逻辑，调用者就像是调用接口直接执行sql一样。自己也写了个动态代理的demo方便后期使用该技术的时候快速上手

````java
// 代理工厂，用来创建代理类
public class ProxyFactory {

  // 创建实例
  public static <T> T createInstance(Class<?> zclass) {
    /**
     * JDK动态代理：
     *  1. 基于Java反射机制实现
     *  2. 必须要实现了接口的业务类才能用这种办法生成代理对象
     *  3. 需要代理的类必须是接口，因为代理类本身已经继承类proxy，java继承不能继承多个类。非接口代理可以使用CGLib的字节码代理方式
     */
    return (T) Proxy.newProxyInstance(zclass.getClassLoader(), new Class[] { zclass }, new ProxyClass());
  }

  public static void main(String[] args) {
    // 创建代理类后执行方法
    NeedProxy needProxyClass = ProxyFactory.createInstance(NeedProxy.class);
    needProxyClass.exe();
  }
}

// 需要代理的类，在exe方法的时候会调用ProxyClass的invoke方法去执行逻辑
interface NeedProxy {
  public void exe();
}

// 实际代理类，最终执行逻辑的地方
class ProxyClass implements InvocationHandler {
  // 代理对象调用方法时希望执行的动作，用于集中处理在动态代理类对象上的方法调用
  @Override
  public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
    System.out.println("进入代理类了：method: " + method.getName());
    return null;
  }
}
````

### 2.3 主要成员类

1. SqlSession: 完成必要数据库增删改查，和数据库的交互会话
2. Executor: 执行器是调度核心，负责sql语句生成和缓存维护
3. StatementHandler: 对JDBCstatement的操作如设置参数、将结果集转为List
4. ParameterHandler: 把参数转为JDBC Statement需要的参数
5. ResultSetHandler: 将jdbc返回的ResultSet转为list集合
6. TypeHandler: java类型和jdbc数据类型的转换
7. MappedStatement: 进行<select|update|delete|insert>的映射
8. SqlSource: 将用户传递的参数对象动态生成sql，并封装到BoundSql中
9. BoundSql: 动态生成的sql语句和对应参数
10. Configuration: mybatis所有的配置信息

![SqlSession](https://gaoqisen.github.io/GraphBed/202107/20210730094514.png)

### 2.4 Mybatis缓存

mybatis有一级缓存和二级缓存。但是二级缓存在网上看的博客有的说二级缓存默认开启，有的说默认关闭。于是经过看源码之后就有了如下收获。

#### 2.4.1 一级缓存

缓存在SqlSession会话里面，默认开启。缓存数据存放在PerpetualCache里面（DefaultSqlSession.BaseExecutor.PerpetualCache作为sqlSession的一个属性）。在同一个会话中会先去查询一级缓存里面是否存在数据，如果存在则不去查询。sqlSession中执行了update、delete、insert后都会清空缓存数据

#### 2.4.2 二级缓存

二级缓存默认开启的(settings标签下的cacheEnabled默认是true的，而且Configuration的cacheEnabled属性也是默认为true)，只不过如果不配置`<mapper>`标签下面配置`<cache/>`的话，是不会生效的（程序判断了如果cache为null就不走缓存）。`<cache/>`设置之后整个mapper里面的都会开启二级缓存，如果单个sql不需要二级缓存的话，通过标签的useCache=false可以关闭，默认false。

### 2.5 动态数据源

1. 创建SqlSessionFactory时通过AbstractRoutingDataSource.setTargetDataSources设置所有数据源
2. 实现方法determineCurrentLookupKey确定key（可以用LocalThread实现）。具体调用链如下:

```java
// 切换数据源并获取数据源，调用链
determineTargetDataSource:202, AbstractRoutingDataSource (org.springframework.jdbc.datasource.lookup)
getConnection:170, AbstractRoutingDataSource (org.springframework.jdbc.datasource.lookup)
fetchConnection:158, DataSourceUtils (org.springframework.jdbc.datasource)
doGetConnection:116, DataSourceUtils (org.springframework.jdbc.datasource)
getConnection:79, DataSourceUtils (org.springframework.jdbc.datasource)
// mybatis获取数据库链接
openConnection:82, SpringManagedTransaction (org.mybatis.spring.transaction)
getConnection:68, SpringManagedTransaction (org.mybatis.spring.transaction)
getConnection:336, BaseExecutor (org.apache.ibatis.executor)
prepareStatement:84, SimpleExecutor (org.apache.ibatis.executor)
// mybatis去执行sql
doQuery:62, SimpleExecutor (org.apache.ibatis.executor)
queryFromDatabase:324, BaseExecutor (org.apache.ibatis.executor)
query:156, BaseExecutor (org.apache.ibatis.executor)
query:109, CachingExecutor (org.apache.ibatis.executor)
// 分页插件处理
intercept:142, PageInterceptor (com.github.pagehelper)
invoke:61, Plugin (org.apache.ibatis.plugin)
query:-1, $Proxy135 (com.sun.proxy)
selectList:148, DefaultSqlSession (org.apache.ibatis.session.defaults)
selectList:141, DefaultSqlSession (org.apache.ibatis.session.defaults)
selectOne:77, DefaultSqlSession (org.apache.ibatis.session.defaults)
// jdk动态代理反射调用
invoke0:-1, NativeMethodAccessorImpl (sun.reflect)
invoke:62, NativeMethodAccessorImpl (sun.reflect)
invoke:43, DelegatingMethodAccessorImpl (sun.reflect)
invoke:498, Method (java.lang.reflect)
invoke:433, SqlSessionTemplate$SqlSessionInterceptor (org.mybatis.spring)
selectOne:-1, $Proxy130 (com.sun.proxy)
// mybatis代理处理
selectOne:166, SqlSessionTemplate (org.mybatis.spring)
execute:82, MapperMethod (org.apache.ibatis.binding)
invoke:59, MapperProxy (org.apache.ibatis.binding)
selectOne:-1, $Proxy184 (com.sun.proxy)
// 业务代码进行调用
```

3. 切换数据源直接更新key即可

### 2.5 事务

Mybatis在初始化xml解析`<environments><transactionManager>`的type属性去初始化JdbcTransaction或ManagedTransaction。JdbcTransaction是直接使用的JDBC的提交和事物管理机制, ManagedTransaction是将事物交给容器去管理。项目中常用的就是@Transaction注解，之后spring就去管理事务的提交操作，后面通过spring的源码去学习一下是如何实现的。

> 后面就是按照包的分类去逐个阅读源码，把包分为了基础包、配置解析包、核心包。在所有的包都阅读完成之后，在整体汇总学习mybatis的流程与源码。

