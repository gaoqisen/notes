---
title: 03_Mybatis源码-配置解析
date: 2021-08-05 20:43:40
tags: sourcecode
categories: sourcecode
keywords: sourcecode
description: 主要阅读binding包、builder包、mapping包、scripting包、datasource包后记录一些比较重要的注释，便于以后回忆便于学习。
---

## 一、源码阅读

主要阅读binding包、builder包、mapping包、scripting包、datasource包

### 1.1 binding包

binding包下面有5个类

主要是处理java方法和sql语句的绑定关系可以分为MapperRegistry和MapperProxyFactory去生成代理类，MapperProxy和MapperMethod去调用代理类，BindingException是一个绑定异常类。其中MapperMethod里面有两个静态内部类SqlCommand、MethodSignature

#### 1.1.1 生成代理类

客户端调用getMapper时是通过DefaultSqlSession>Configuration>MapperRegistry的调用连获取代理对象的。MapperRegistry的getMapper的逻辑如下：

```java
 // ##### MapperRegistry #####
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

// ##### 代理工厂MapperProxyFactory主要就是去生成代理类 #####
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

#### 1.1.2 调用代理类

生成代理类后，在调用接口时就会执行MapperProxy的invoke方法，SqlCommand主要是将java方法和sql进行绑定

```java
  // 动态代理执行的invoke方法
  @Override
  public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
    try {
      if (Object.class.equals(method.getDeclaringClass())) {
        // 执行原有方法
        return method.invoke(this, args);
      } else {
        // 缓存调用（初始化MapperMethod并调用execute方法）
        return cachedInvoker(method).invoke(proxy, method, args, sqlSession);
      }
    } catch (Throwable t) {
      throw ExceptionUtil.unwrapThrowable(t);
    }
  }
// ##### 初始化MapperMethod时SqlCommand和MethodSignature是通过静态内部类的构造方法初始化 #####
  // sql命令
  public static class SqlCommand {

    // sql名称
    private final String name;
    // sql类型
    private final SqlCommandType type;

    // 初始化sql命令
    public SqlCommand(Configuration configuration, Class<?> mapperInterface, Method method) {
      // 通过方法名称获取sql
      final String methodName = method.getName();
      final Class<?> declaringClass = method.getDeclaringClass();
      MappedStatement ms = resolveMappedStatement(mapperInterface, methodName, declaringClass,
          configuration);
      // 映射声明获取为空
      if (ms == null) {
        if (method.getAnnotation(Flush.class) != null) {
          name = null;
          type = SqlCommandType.FLUSH;
        } else {
          throw new BindingException("Invalid bound statement (not found): "
              + mapperInterface.getName() + "." + methodName);
        }
      }
      // 映射声明获取不为空
      else {
        name = ms.getId();
        type = ms.getSqlCommandType();
        if (type == SqlCommandType.UNKNOWN) {
          throw new BindingException("Unknown execution method for: " + name);
        }
      }
    }

    // 找出指定方法的MappedStatement
    private MappedStatement resolveMappedStatement(Class<?> mapperInterface, String methodName,
        Class<?> declaringClass, Configuration configuration) {
      // 通过接口名和方法名获取statementId
      String statementId = mapperInterface.getName() + "." + methodName;
      // 找出之前解析的sql语句并返回
      if (configuration.hasStatement(statementId)) {
        return configuration.getMappedStatement(statementId);
      }
      // 一致没有找到匹配结果，返回null
      else if (mapperInterface.equals(declaringClass)) {
        return null;
      }
      // 遍历找父类，直到遇到接口为止
      for (Class<?> superInterface : mapperInterface.getInterfaces()) {
        if (declaringClass.isAssignableFrom(superInterface)) {
          MappedStatement ms = resolveMappedStatement(superInterface, methodName,
              declaringClass, configuration);
          if (ms != null) {
            return ms;
          }
        }
      }
      return null;
    }
    // 其他方法
    ...
  }

  // 方法签名
  public static class MethodSignature {

    // 方法返回是否为集合类型
    private final boolean returnsMany;
    // 返回是否为map类型
    private final boolean returnsMap;
    // 返回是否为空
    private final boolean returnsVoid;
    // 返回是否为cursor类型
    private final boolean returnsCursor;
    // 返回是否为optional类型
    private final boolean returnsOptional;
    // 返回类型
    private final Class<?> returnType;
    // 如果返回的是map类型，记录所有key
    private final String mapKey;
    // 返回resultHandler参数类型
    private final Integer resultHandlerIndex;
    // rowBounds参数位置
    private final Integer rowBoundsIndex;
    // 参数名解析起
    private final ParamNameResolver paramNameResolver;

    // 初始化方法签名
    public MethodSignature(Configuration configuration, Class<?> mapperInterface, Method method) {
      // 获取方法值的类型
      Type resolvedReturnType = TypeParameterResolver.resolveReturnType(method, mapperInterface);
      // 初始化数据
      if (resolvedReturnType instanceof Class<?>) {
        this.returnType = (Class<?>) resolvedReturnType;
      } else if (resolvedReturnType instanceof ParameterizedType) {
        this.returnType = (Class<?>) ((ParameterizedType) resolvedReturnType).getRawType();
      } else {
        this.returnType = method.getReturnType();
      }
      this.returnsVoid = void.class.equals(this.returnType);
      this.returnsMany = configuration.getObjectFactory().isCollection(this.returnType) || this.returnType.isArray();
      this.returnsCursor = Cursor.class.equals(this.returnType);
      this.returnsOptional = Optional.class.equals(this.returnType);
      this.mapKey = getMapKey(method);
      this.returnsMap = this.mapKey != null;
      this.rowBoundsIndex = getUniqueParamIndex(method, RowBounds.class);
      this.resultHandlerIndex = getUniqueParamIndex(method, ResultHandler.class);
      this.paramNameResolver = new ParamNameResolver(configuration, method);
    }
    // 其他方法
    ...
  }
```

之后是MapperMethod.execute源码，主要是通过不同的命令执行不同的数据库操作

```java
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
        // 返回多条数据
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
    return result;
  }

  // case SELECT时，返回多条数据执行的方法
  // 执行返回多个结果的sql
  private <E> Object executeForMany(SqlSession sqlSession, Object[] args) {
    List<E> result;
    // 用SqlCommand参数转换
    Object param = method.convertArgsToSqlCommandParam(args);
    // 判断是否存在rowBounds后，执行selectList方法
    if (method.hasRowBounds()) {
      RowBounds rowBounds = method.extractRowBounds(args);
      // 去调用SqlSession的selectList方法去操作数据库
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

### 1.2 builder包

按类型分sqlSource处理（用来处理sqlSource）、辅助类、annotation子包、xml子包

#### 1.2.1 sqlSource处理

sqlSource处理有BaseBuilder、SqlSourceBuilder、StaticSqlSource。BaseBuilder提供了一些基本的通用方法，SqlSourceBuilder主要是将sql的占位符替换掉，StaticSqlSource将参数、sql一起封装为BoundSql。主要源码如下：

```java
// ##### BaseBuilder #####
public abstract class BaseBuilder {
  // 全局的配置（mybatis-config.xml）数据
  protected final Configuration configuration;
  // <typeAliases>标签 定义的别名
  protected final TypeAliasRegistry typeAliasRegistry;
  // <typeHandlers>标签 添加 自定义TypeHandler
  protected final TypeHandlerRegistry typeHandlerRegistry;
  // 其他方法
  ...
}  

// ##### SqlSourceBuilder.parse #####
  public SqlSource parse(String originalSql, Class<?> parameterType, Map<String, Object> additionalParameters) {
    // 创建处理器
    ParameterMappingTokenHandler handler = new ParameterMappingTokenHandler(configuration, parameterType, additionalParameters);
    // 占位符解析起
    GenericTokenParser parser = new GenericTokenParser("#{", "}", handler);
    String sql;
    // sql空格处理
    if (configuration.isShrinkWhitespacesInSql()) {
      sql = parser.parse(removeExtraWhitespaces(originalSql));
    } else {
      sql = parser.parse(originalSql);
    }
    // 生成新的StaticSqlSource
    return new StaticSqlSource(configuration, sql, handler.getParameterMappings());
  }
  
  // ##### StaticSqlSource #####
  public class StaticSqlSource implements SqlSource {

  // 转化后只有？的sql
  private final String sql;
  // sql语句对于的参数列表
  private final List<ParameterMapping> parameterMappings;
  private final Configuration configuration;
	// ...
  @Override
  public BoundSql getBoundSql(Object parameterObject) {
    return new BoundSql(configuration, sql, parameterMappings, parameterObject);
  }

}
```

#### 1.2.2 辅助类

辅助类主要有MapperBuilderAssistant、ParameterExpression、ResultMapResolver、CacheRefResolver。MapperBuilderAssistant虽然继承了BaseBuilder但是实际上还是辅助的功能，ParameterExpression是将sql字符串解析为map，ResultMapResolver主要处理resultMap标签里面的extends，CacheRefResolver用来处理（cache-ref解析器）多个命名空间之间的缓存共享。主要源码如下：

```java
// ##### MapperBuilderAssistant.useCacheRef #####
  // 使用其他命名空间的缓存
  public Cache useCacheRef(String namespace) {
    if (namespace == null) {
      throw new BuilderException("cache-ref element requires a namespace attribute.");
    }
    try {
      unresolvedCacheRef = true;
      // 获取其他命名空间的缓存
      Cache cache = configuration.getCache(namespace);
      if (cache == null) {
        throw new IncompleteElementException("No cache for namespace '" + namespace + "' could be found.");
      }
      // 修改当前缓存为其他命名空间的缓存，从而实现缓存共享
      currentCache = cache;
      unresolvedCacheRef = false;
      return cache;
    } catch (IllegalArgumentException e) {
      throw new IncompleteElementException("No cache for namespace '" + namespace + "' could be found.", e);
    }
  }
  
  // ##### ParameterExpression #####
  public class ParameterExpression extends HashMap<String, String> {
  public ParameterExpression(String expression) {
    parse(expression);
  }
  // 数据解析
  private void parse(String expression) {
    int p = skipWS(expression, 0);
    if (expression.charAt(p) == '(') {
      expression(expression, p + 1);
    } else {
      property(expression, p);
    }
  }
  // ...
 } 
 
 // ##### ResultMapResolver #####
public class ResultMapResolver {
  // 建造者辅助类
  private final MapperBuilderAssistant assistant;
  private final String id;
  private final Class<?> type;
  // 继承属性
  private final String extend;
  // 鉴别器
  private final Discriminator discriminator;
  // 属性映射类比
  private final List<ResultMapping> resultMappings;
  // 是否字段自动映射
  private final Boolean autoMapping;

  // 解析成一个拥有继承关系的对象
  public ResultMap resolve() {
    return assistant.addResultMap(this.id, this.type, this.extend, this.discriminator, this.resultMappings, this.autoMapping);
  }
}

// ##### CacheRefResolver cache-ref解析器 多个命名空间之间的缓存共享 #####
public class CacheRefResolver {
  // 建造者辅助类
  private final MapperBuilderAssistant assistant;
  // 被引用的命名空间
  private final String cacheRefNamespace;

  public CacheRefResolver(MapperBuilderAssistant assistant, String cacheRefNamespace) {
    this.assistant = assistant;
    this.cacheRefNamespace = cacheRefNamespace;
  }

  public Cache resolveCacheRef() {
    return assistant.useCacheRef(cacheRefNamespace);
  }
}
```

#### 1.2.3 xml子包

解析mybatis-conofig.xml的XMLConfigBuilder，解析DOCTYPE标签的XMLMapperEntityResolver，解析映射文件的XMLMapperBuilder，解析include标签的XMLIncludeTransformer，解析声明标签（select|insert|update|delete）的XMLStatementBuilder。主要源码如下:

```java
// ##### XMLConfigBuilder.parseConfiguration #####
private void parseConfiguration(XNode root) {
    try {
      // 官方链接：https://mybatis.org/mybatis-3/zh/configuration.html
      // 先解析properties属性，提过给其他节点使用
      propertiesElement(root.evalNode("properties"));
      // 设置
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
  
  // ##### XMLMapperEntityResolver.resolveEntity #####
    public InputSource resolveEntity(String publicId, String systemId) throws SAXException {
    try {
      if (systemId != null) {
        // 将systemId转为小写后判断是否是配置文件，如果是则获取本地路径的dtd文件
        String lowerCaseSystemId = systemId.toLowerCase(Locale.ENGLISH);
        if (lowerCaseSystemId.contains(MYBATIS_CONFIG_SYSTEM) || lowerCaseSystemId.contains(IBATIS_CONFIG_SYSTEM)) {
          return getInputSource(MYBATIS_CONFIG_DTD, publicId, systemId);
        } else if (lowerCaseSystemId.contains(MYBATIS_MAPPER_SYSTEM) || lowerCaseSystemId.contains(IBATIS_MAPPER_SYSTEM)) {
          return getInputSource(MYBATIS_MAPPER_DTD, publicId, systemId);
        }
      }
      return null;
    } catch (Exception e) {
      throw new SAXException(e.toString());
    }
  }
  
  // ##### XMLMapperBuilder ##### 
    public void parse() {
    // 加载的数据没有加载过则加载
    if (!configuration.isResourceLoaded(resource)) {
      // 配置处理，从上往下解析，可能存在引用的节点还没有被定义（无序依赖问题）
      configurationElement(parser.evalNode("/mapper"));
      // 防止重复解析
      configuration.addLoadedResource(resource);
      // 将mapper注册到configuration
      bindMapperForNamespace();
    }

    // 处理解析中的暂时性错误
    // 遍历解析resultMap
    parsePendingResultMaps();
    // 遍历解析缓存配置
    parsePendingCacheRefs();
    // 遍历解析语句
    parsePendingStatements();
  }

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
      // 解析cache节点：如果不配置这个节点则不会使用二级缓存
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
  
  // ##### XMLIncludeTransformer.applyIncludes #####
  private void applyIncludes(Node source, final Properties variablesContext, boolean included) {
    if ("include".equals(source.getNodeName())) {
      // 找出被引用的节点
      Node toInclude = findSqlFragment(getStringAttribute(source, "refid"), variablesContext);
      Properties toIncludeContext = getVariablesContext(source, variablesContext);
      // 递归处理被引用节点中的include
      applyIncludes(toInclude, toIncludeContext, true);
      if (toInclude.getOwnerDocument() != source.getOwnerDocument()) {
        toInclude = source.getOwnerDocument().importNode(toInclude, true);
      }
      // 完成include节点的替换
      source.getParentNode().replaceChild(toInclude, source);
      while (toInclude.hasChildNodes()) {
        toInclude.getParentNode().insertBefore(toInclude.getFirstChild(), toInclude);
      }
      toInclude.getParentNode().removeChild(toInclude);
    }
    // 元素节点
    else if (source.getNodeType() == Node.ELEMENT_NODE) {
      if (included && !variablesContext.isEmpty()) {
        // 用属性值代理变量
        NamedNodeMap attributes = source.getAttributes();
        for (int i = 0; i < attributes.getLength(); i++) {
          Node attr = attributes.item(i);
          attr.setNodeValue(PropertyParser.parse(attr.getNodeValue(), variablesContext));
        }
      }
      // 循环到下层节点递归处理下层的include
      NodeList children = source.getChildNodes();
      for (int i = 0; i < children.getLength(); i++) {
        applyIncludes(children.item(i), variablesContext, included);
      }
    } else if (included && (source.getNodeType() == Node.TEXT_NODE || source.getNodeType() == Node.CDATA_SECTION_NODE)
        && !variablesContext.isEmpty()) {
      // 用属性值代理变量
      source.setNodeValue(PropertyParser.parse(source.getNodeValue(), variablesContext));
    }
  }
  
  // ##### XMLStatementBuilder.parseStatementNode 解析sql语句（select|insert|update|delete）#####
    public void parseStatementNode() {
    String id = context.getStringAttribute("id");
    String databaseId = context.getStringAttribute("databaseId");
    // 验证数据库ID和ID是否匹配
    if (!databaseIdMatchesCurrent(id, databaseId, this.requiredDatabaseId)) {
      return;
    }

    String nodeName = context.getNode().getNodeName();
    // 读取和判断语句类型
    SqlCommandType sqlCommandType = SqlCommandType.valueOf(nodeName.toUpperCase(Locale.ENGLISH));
    boolean isSelect = sqlCommandType == SqlCommandType.SELECT;
    // 是否刷新缓存,当不是 SELECT 类型的SQL节点时刷新
    boolean flushCache = context.getBooleanAttribute("flushCache", !isSelect);
    // 是否可使用缓存, 当是SELECT 类型的SQL节点时可使用
    boolean useCache = context.getBooleanAttribute("useCache", isSelect);
    boolean resultOrdered = context.getBooleanAttribute("resultOrdered", false);

    // 处理语句中的Include语句
    XMLIncludeTransformer includeParser = new XMLIncludeTransformer(configuration, builderAssistant);
    includeParser.applyIncludes(context.getNode());

    // 参数类型
    String parameterType = context.getStringAttribute("parameterType");
    Class<?> parameterTypeClass = resolveClass(parameterType);

    // 语句类型
    String lang = context.getStringAttribute("lang");
    LanguageDriver langDriver = getLanguageDriver(lang);

    // 处理selectKey节点
    processSelectKeyNodes(id, parameterTypeClass, langDriver);

    // Parse the SQL (pre: <selectKey> and <include> were parsed and removed)
    KeyGenerator keyGenerator;
    String keyStatementId = id + SelectKeyGenerator.SELECT_KEY_SUFFIX;
    keyStatementId = builderAssistant.applyCurrentNamespace(keyStatementId, true);
    // 判断是否存在解析好的selectKey
    if (configuration.hasKeyGenerator(keyStatementId)) {
      keyGenerator = configuration.getKeyGenerator(keyStatementId);
    } else {
      keyGenerator = context.getBooleanAttribute("useGeneratedKeys",
          configuration.isUseGeneratedKeys() && SqlCommandType.INSERT.equals(sqlCommandType))
          ? Jdbc3KeyGenerator.INSTANCE : NoKeyGenerator.INSTANCE;
    }

    // sql语句解析将#{id}，转为?
    SqlSource sqlSource = langDriver.createSqlSource(configuration, context, parameterTypeClass);
    // 读取各个属性配置
    StatementType statementType = StatementType.valueOf(context.getStringAttribute("statementType", StatementType.PREPARED.toString()));
    Integer fetchSize = context.getIntAttribute("fetchSize");
    Integer timeout = context.getIntAttribute("timeout");
    String parameterMap = context.getStringAttribute("parameterMap");
    String resultType = context.getStringAttribute("resultType");
    Class<?> resultTypeClass = resolveClass(resultType);
    String resultMap = context.getStringAttribute("resultMap");
    String resultSetType = context.getStringAttribute("resultSetType");
    ResultSetType resultSetTypeEnum = resolveResultSetType(resultSetType);
    if (resultSetTypeEnum == null) {
      resultSetTypeEnum = configuration.getDefaultResultSetType();
    }
    String keyProperty = context.getStringAttribute("keyProperty");
    String keyColumn = context.getStringAttribute("keyColumn");
    String resultSets = context.getStringAttribute("resultSets");

    // 用MapperBuilderAssistant的帮助下创建MappedStatement并set到configuration
    builderAssistant.addMappedStatement(id, sqlSource, statementType, sqlCommandType,
        fetchSize, timeout, parameterMap, parameterTypeClass, resultMap, resultTypeClass,
        resultSetTypeEnum, flushCache, useCache, resultOrdered,
        keyGenerator, keyProperty, keyColumn, databaseId, langDriver, resultSets);
  }
```

#### 1.2.4 annotation子包

主要由直接注解映射MapperAnnotationBuilder的解析和Provider开头的间接注解解析构成

1. 直接注解解析的调用链和主要源码如下：

```java
// 调用链（调用链是从下往上）
parse:116, MapperAnnotationBuilder (org.apache.ibatis.builder.annotation)
addMapper:77, MapperRegistry (org.apache.ibatis.binding)
addMapper:848, Configuration (org.apache.ibatis.session)
bindMapperForNamespace:456, XMLMapperBuilder (org.apache.ibatis.builder.xml)
// 解析xml后
parse:102, XMLMapperBuilder (org.apache.ibatis.builder.xml)
mapperElement:429, XMLConfigBuilder (org.apache.ibatis.builder.xml)
parseConfiguration:138, XMLConfigBuilder (org.apache.ibatis.builder.xml)
parse:103, XMLConfigBuilder (org.apache.ibatis.builder.xml)
build:81, SqlSessionFactoryBuilder (org.apache.ibatis.session)
build:65, SqlSessionFactoryBuilder (org.apache.ibatis.session)
// main方法
main:23, MybatisTest (com.gqs.mybatis.test)
  
  // 解析方法
  public void parse() {
    String resource = type.toString();
    // 防止重复解析
    if (!configuration.isResourceLoaded(resource)) {
      // 支持注解和xml混合使用
      loadXmlResource();
      // 记录资源路径
      configuration.addLoadedResource(resource);
      // 设置命名空间
      assistant.setCurrentNamespace(type.getName());
      // 处理缓存
      parseCache();
      parseCacheRef();
      for (Method method : type.getMethods()) {
        if (!canHaveStatement(method)) {
          continue;
        }
        if (getAnnotationWrapper(method, false, Select.class, SelectProvider.class).isPresent()
            && method.getAnnotation(ResultMap.class) == null) {
          // 解析方法
          parseResultMap(method);
        }
        try {
          // 主要声明语句解析
          parseStatement(method);
        } catch (IncompleteElementException e) {
          configuration.addIncompleteMethod(new MethodResolver(this, method));
        }
      }
    }
    // 处理解析异常的方法
    parsePendingMethods();
  }

void parseStatement(Method method) {
    // 获取方法的参数类型
    final Class<?> parameterTypeClass = getParameterType(method);
    // 获取脚本语言驱动
    final LanguageDriver languageDriver = getLanguageDriver(method);

    getAnnotationWrapper(method, true, statementAnnotationTypes).ifPresent(statementAnnotation -> {
      // 通过注解获取SqlSource
      final SqlSource sqlSource = buildSqlSource(statementAnnotation.getAnnotation(), parameterTypeClass, languageDriver, method);
      final SqlCommandType sqlCommandType = statementAnnotation.getSqlCommandType();
      // 获取注解包装器
      final Options options = getAnnotationWrapper(method, false, Options.class).map(x -> (Options)x.getAnnotation()).orElse(null);
      final String mappedStatementId = type.getName() + "." + method.getName();
      
      // ...
      
      // 将获取的数据存入到configuration
      assistant.addMappedStatement(...)
    }
```

2. 间接注解映射

映射的时候通过MapperAnnotationBuilder.buildSqlSource里面判断是否走间接注解逻辑。调用链如下：

```java
<init>:106, ProviderSqlSource (org.apache.ibatis.builder.annotation)
// buildSqlSource判断是否是直接注解，如果不是则初始化间接注解ProviderSqlSource
buildSqlSource:643, MapperAnnotationBuilder (org.apache.ibatis.builder.annotation)
lambda$parseStatement$2:312, MapperAnnotationBuilder (org.apache.ibatis.builder.annotation)
accept:-1, 1757880885 (org.apache.ibatis.builder.annotation.MapperAnnotationBuilder$$Lambda$37)
ifPresent:159, Optional (java.util)
parseStatement:310, MapperAnnotationBuilder (org.apache.ibatis.builder.annotation)
parse:139, MapperAnnotationBuilder (org.apache.ibatis.builder.annotation)
addMapper:77, MapperRegistry (org.apache.ibatis.binding)
addMapper:848, Configuration (org.apache.ibatis.session)
bindMapperForNamespace:456, XMLMapperBuilder (org.apache.ibatis.builder.xml)
parse:102, XMLMapperBuilder (org.apache.ibatis.builder.xml)
mapperElement:429, XMLConfigBuilder (org.apache.ibatis.builder.xml)
parseConfiguration:138, XMLConfigBuilder (org.apache.ibatis.builder.xml)
parse:103, XMLConfigBuilder (org.apache.ibatis.builder.xml)
build:81, SqlSessionFactoryBuilder (org.apache.ibatis.session)
build:65, SqlSessionFactoryBuilder (org.apache.ibatis.session)
main:23, MybatisTest (com.gqs.mybatis.test)
```

间接注解有3个类：ProviderContext用来将其他类的功能整合在一起，ProviderMethodResolver只有一个类用来从@*Provider注解的type指向类中找出method指定的方法，ProviderSqlSource里面主要通过参数生成BoundSql。主要源码如下:

```java
// ##### ProviderContext #####
public final class ProviderContext {

  // 提供映射信息的类
  private final Class<?> mapperType;
  // 提供映射信息的方法
  private final Method mapperMethod;
  // 数据库编号
  private final String databaseId;
}

// ##### ProviderMethodResolver.resolveMethod #####
  default Method resolveMethod(ProviderContext context) {
    // 找出同名方法
    List<Method> sameNameMethods = Arrays.stream(getClass().getMethods())
        .filter(m -> m.getName().equals(context.getMapperMethod().getName()))
        .collect(Collectors.toList());
    // 没有找到指定方法
    if (sameNameMethods.isEmpty()) {
      throw new BuilderException("Cannot resolve the provider method because '"
          + context.getMapperMethod().getName() + "' not found in SqlProvider '" + getClass().getName() + "'.");
    }
    // 再次判断必须是CharSequence类或是其子类
    List<Method> targetMethods = sameNameMethods.stream()
        .filter(m -> CharSequence.class.isAssignableFrom(m.getReturnType()))
        .collect(Collectors.toList());
    if (targetMethods.size() == 1) {
      // 方法唯一则返回该方法
      return targetMethods.get(0);
    }
    if (targetMethods.isEmpty()) {
      throw new BuilderException("Cannot resolve the provider method because '"
          + context.getMapperMethod().getName() + "' does not return the CharSequence or its subclass in SqlProvider '"
          + getClass().getName() + "'.");
    } else {
      throw new BuilderException("Cannot resolve the provider method because '"
          + context.getMapperMethod().getName() + "' is found multiple in SqlProvider '" + getClass().getName() + "'.");
    }
  }
  
  // ##### ProviderSqlSource #####
  public class ProviderSqlSource implements SqlSource {

  private final Configuration configuration;
  // *Provider注解上type属性所指的类
  private final Class<?> providerType;
  // 语言驱动
  private final LanguageDriver languageDriver;
  // 含有注解的接口方法
  private final Method mapperMethod;
  // *Provider注解上method属性所指的方法
  private final Method providerMethod;
  // 给定sql语句的方法对于的参数
  private final String[] providerMethodArgumentNames;
  // 给定sql语句的方法对应的参数类型
  private final Class<?>[] providerMethodParameterTypes;
  // ProviderContext对象
  private final ProviderContext providerContext;
  // providerContext编号
  private final Integer providerContextIndex;
  
  @Override
  public BoundSql getBoundSql(Object parameterObject) {
    // 获取SqlSource对象
    SqlSource sqlSource = createSqlSource(parameterObject);
    // 从SqlSource获取BoundSql
    return sqlSource.getBoundSql(parameterObject);
  }

  private SqlSource createSqlSource(Object parameterObject) {
    try {
      String sql;
      if (parameterObject instanceof Map) {
        int bindParameterCount = providerMethodParameterTypes.length - (providerContext == null ? 0 : 1);
        if (bindParameterCount == 1
            && providerMethodParameterTypes[Integer.valueOf(0).equals(providerContextIndex) ? 1 : 0].isAssignableFrom(parameterObject.getClass())) {
          // 调用*Provider注解的type类中的method方法，从而获取sql
          sql = invokeProviderMethod(extractProviderMethodArguments(parameterObject));
        } else {
          @SuppressWarnings("unchecked")
          Map<String, Object> params = (Map<String, Object>) parameterObject;
          sql = invokeProviderMethod(extractProviderMethodArguments(params, providerMethodArgumentNames));
        }
      } else if (providerMethodParameterTypes.length == 0) {
        // 不需要参数
        sql = invokeProviderMethod();
      } else if (providerMethodParameterTypes.length == 1) {
        if (providerContext == null) {
          // 有一个输入参数
          sql = invokeProviderMethod(parameterObject);
        } else {
          // 输入参数为providerContext对象
          sql = invokeProviderMethod(providerContext);
        }
      } else if (providerMethodParameterTypes.length == 2) {
        sql = invokeProviderMethod(extractProviderMethodArguments(parameterObject));
      } else {
        throw new BuilderException("Cannot invoke SqlProvider method '" + providerMethod
          + "' with specify parameter '" + (parameterObject == null ? null : parameterObject.getClass())
          + "' because SqlProvider method arguments for '" + mapperMethod + "' is an invalid combination.");
      }
      Class<?> parameterType = parameterObject == null ? Object.class : parameterObject.getClass();
      // 调用languageDriver生成sqlSource
      return languageDriver.createSqlSource(configuration, sql, parameterType);
    } catch (BuilderException e) {
      throw e;
    } catch (Exception e) {
      throw new BuilderException("Error invoking SqlProvider method '" + providerMethod
          + "' with specify parameter '" + (parameterObject == null ? null : parameterObject.getClass()) + "'.  Cause: " + extractRootCause(e), e);
    }
  }
}  

```

### 1.3 mapping包

mapping是很重要的包，定义了很多解析实体类。主要的功能有sql语句处理能力、输出结果处理、输入参数处理、数据库种类处理、其他。

#### 1.3.1 sql语句处理能力

主要有3个类SqlSource、MappedStatement、BoundSql。MappedStatement类是将mapper.xml里面的insert|update|delete|select这些节点解析的实体类。BoundSql存储了转化后的sql信息也包含了实参等。SqlSource主要有4个实现类如下：

![sqlSource](https://gaoqisen.github.io/GraphBed/202108/20210806092954.png)

DynamicSqlSource：动态sql语句，主要是去处理带有if where这种的动态sql

RawSqlSource: 原生sql语句，非动态sql语句中可能有#{}等占位符

StaticSqlSource: 静态sql语句，语句中可能包含？，DynamicSqlSource和RawSqlSource最终都会解析为StaticSqlSource后去执行

ProviderSqlSource: 是通过注解形式获取的sql语句

```java
// BoundSql属性
  // 可能包含？的sql语句
  private final String sql;
  // 参数映射列表
  private final List<ParameterMapping> parameterMappings;
  // 实参对象本身
  private final Object parameterObject;
  // 实参
  private final Map<String, Object> additionalParameters;
  // additionalParameters的包装对象
  private final MetaObject metaParameters;
```

#### 1.3.2 输出结果处理

主要是ResultMap、ResultMapping、Discriminator三个类，主要是解决根据不同的输出数据返回不同的子类功能。

resultMap节点的解析实体类ResultMap的属性如下：

```java
  // 全局属性
  private Configuration configuration;
  // resultMap的编号
  private String id;
  // 最终数据结果的java类型
  private Class<?> type;
  // <result>标签的列表
  private List<ResultMapping> resultMappings;
  // <id><idArg>标签的列表
  private List<ResultMapping> idResultMappings;
  // <constructor>各个属性的列表
  private List<ResultMapping> constructorResultMappings;
  // 非<constructor>各个属性的列表
  private List<ResultMapping> propertyResultMappings;
  // 所有参与映射的数据库中字段的集合
  private Set<String> mappedColumns;
  // 所有参与映射的java对象的集合
  private Set<String> mappedProperties;
  // 鉴别器
  private Discriminator discriminator;
  // 是否存在嵌套映射
  private boolean hasNestedResultMaps;
  // 是否存在嵌套查询
  private boolean hasNestedQueries;
  // 是否启动字段映射
  private Boolean autoMapping;
```

ResultMapping类存在很多的属性，创建这个对象就很复杂。ResultMapping使用了建造者模式来改善这种情况

Discriminator类的属性比较简单，鉴别的功能是比较复杂的。主要逻辑在executor包里面

#### 1.3.3 输入结果处理

主要有两个类ParameterMap和ParameterMapping，这两个类的主要作用就是将对象拆解为指定参数。ParameterMap类就是parameterMap的解析类，ParameterMapping类就是parameterMap里面的parameter标签的映射解析类

#### 1.3.4 数据库种类处理

主要是数据库类型（mysql、oracle等）的处理，用VendorDatabaseIdProvider去处理数据库名，主要源码如下：

```java
  private String getDatabaseName(DataSource dataSource) throws SQLException {
    // 获取当前连接的数据库名
    String productName = getDatabaseProductName(dataSource);
    // 如果存在properties属性则通过key获取value
    if (this.properties != null) {
      for (Map.Entry<Object, Object> property : properties.entrySet()) {
        if (productName.contains((String) property.getKey())) {
          return (String) property.getValue();
        }
      }
      // no match, return null
      return null;
    }
    return productName;
  }
```

数据库环境的映射解析类为Environment，主要逻辑也是通过建造器去初始化类

#### 1.3.5 其他

缓存建造者CacheBuilder去构建缓存，build源码如下：

```java
  public Cache build() {
    setDefaultImplementations();
    // 创建缓存
    Cache cache = newBaseCacheInstance(implementation, id);
    setCacheProperties(cache);
    // issue #352, do not apply decorators to custom caches
    // 一级缓存处理
    if (PerpetualCache.class.equals(cache.getClass())) {
      for (Class<? extends Cache> decorator : decorators) {
        cache = newCacheDecoratorInstance(decorator, cache);
        setCacheProperties(cache);
      }
      cache = setStandardDecorators(cache);
    }
    // 日志缓存处理
    else if (!LoggingCache.class.isAssignableFrom(cache.getClass())) {
      cache = new LoggingCache(cache);
    }
    return cache;
  }
```

其他的都是一些枚举类：

延迟加载设置：FetchType

参数类型：ParameterMode

结果标识：ResultFlag

结果集支持的访问方式：ResultSetType

sql命令类型：SqlCommandType

sql语句种类：StatementType

### 1.4 scripting包

主要是进行sql语句的动态组建，scripting里面主要分为了语言驱动、OGNL辅助、节点组建、节点解析、sqlResource

| 分类        | 包含的类                                                     |
| ----------- | ------------------------------------------------------------ |
| 语言驱动    | LanguageDriver接口<br />RawLanguageDriver 原始语言驱动实现<br />XMLLanguageDriver xml语言驱动实现<br />LanguageDriverRegistry 语言驱动注册表<br />DefaultParameterHandler 默认参数处理器 |
| 节点组建    | XMLScriptBuilder xml脚本构建器<br />NodeHandler 节点处理器<br />... 各种节点处理器的实现 |
| OGNL辅助    | OgnlCache ognl缓存<br />OgnlClassResolver ognl解析器<br />OgnlMemberAccess ognl成员访问<br />ExpressionEvaluator 表达式求值器（将ognl的功能进行封装） |
| 节点解析    | DynamicContext 动态上下文（节点解析需要的一些上下文数据）<br />SqlNode sql节点接口<br />... sql节点的各个实现类 |
| SqlResource | DynamicSqlSource 动态sql资源                                 |

#### 1.4.1 语言驱动

LanguageDriver接口

```java
public interface LanguageDriver {

  // 创建参数处理器
  ParameterHandler createParameterHandler(MappedStatement mappedStatement, Object parameterObject, BoundSql boundSql);

  // 创建sqlSource（xml映射文件的方式）, 在启动是读取映射文件时调用
  SqlSource createSqlSource(Configuration configuration, XNode script, Class<?> parameterType);
  
  // 创建sqlSource（基于注解的方式）, 在启动是读取映射文件时调用
  SqlSource createSqlSource(Configuration configuration, String script, Class<?> parameterType);

}
```

![languageDriver](https://gaoqisen.github.io/GraphBed/202108/20210808135726.png)

RawLanguageDriver继承了XMLLanguageDriver，XMLLanguageDriver实现了LanguageDriver接口。在RawLanguageDriver中全部书调用的父类的实现，而通过checkIsNotDynamic去判断返回的类是否是RawSqlSource类，让接口返回只支持RawSqlSource，源码如下：

```java
public class RawLanguageDriver extends XMLLanguageDriver {

  // 调用super进行创建sqlSource
  @Override
  public SqlSource createSqlSource(Configuration configuration, XNode script, Class<?> parameterType) {
    SqlSource source = super.createSqlSource(configuration, script, parameterType);
    checkIsNotDynamic(source);
    return source;
  }

  // 调用super进行创建sqlSource
  @Override
  public SqlSource createSqlSource(Configuration configuration, String script, Class<?> parameterType) {
    SqlSource source = super.createSqlSource(configuration, script, parameterType);
    checkIsNotDynamic(source);
    return source;
  }

  // 检查返回的类是否为RawSqlSource
  private void checkIsNotDynamic(SqlSource source) {
    if (!RawSqlSource.class.equals(source.getClass())) {
      throw new BuilderException("Dynamic content is not allowed when using RAW language");
    }
  }

}
```

xml语言驱动XMLLanguageDriver类去构建SqlSource和创建ParameterHandler，源码如下：

```java
  @Override
  public ParameterHandler createParameterHandler(MappedStatement mappedStatement, Object parameterObject, BoundSql boundSql) {
    // 创建DefaultParameterHandler
    return new DefaultParameterHandler(mappedStatement, parameterObject, boundSql);
  }

  @Override
  public SqlSource createSqlSource(Configuration configuration, XNode script, Class<?> parameterType) {
    // 利用XMLScriptBuilder建造sqlSource
    XMLScriptBuilder builder = new XMLScriptBuilder(configuration, script, parameterType);
    return builder.parseScriptNode();
  }

  @Override
  public SqlSource createSqlSource(Configuration configuration, String script, Class<?> parameterType) {
    // issue #3
    if (script.startsWith("<script>")) {
      // xml解析
      XPathParser parser = new XPathParser(script, false, configuration.getVariables(), new XMLMapperEntityResolver());
      return createSqlSource(configuration, parser.evalNode("/script"), parameterType);
    } else {
      // issue #127 属性解析
      script = PropertyParser.parse(script, configuration.getVariables());
      TextSqlNode textSqlNode = new TextSqlNode(script);
      // 动态sql解析
      if (textSqlNode.isDynamic()) {
        return new DynamicSqlSource(configuration, textSqlNode);
      }
      // 原生sql解析
      else {
        return new RawSqlSource(configuration, script, parameterType);
      }
    }
  }
```

mybatis的setDefaultScriptingLanguage也支持用户自定义设置语言驱动。

```java
  // 设置默认脚本语言，如果没有指定则默认使用XMLLanguageDriver
  public void setDefaultScriptingLanguage(Class<? extends LanguageDriver> driver) {
    if (driver == null) {
      driver = XMLLanguageDriver.class;
    }
    getLanguageRegistry().setDefaultDriverClass(driver);
  }
```

LanguageDriverRegistry语言驱动类里面又一些注册方法将语言驱动put到map中，之后提供了一些get和set方法，主要属性如下：

```java
// 语言驱动注册表
public class LanguageDriverRegistry {

  // 所有的语言驱动类
  private final Map<Class<? extends LanguageDriver>, LanguageDriver> LANGUAGE_DRIVER_MAP = new HashMap<>();

  // 默认的语言驱动类
  private Class<? extends LanguageDriver> defaultDriverClass;
 }
```

#### 1.4.2 节点组建

XMLScriptBuilder类主要是解析由众多sql节点组成的树。节点处理器接口只有一个handleNode方法用来将当前节点拼装到节点树中，其他的实现类则去完成各自的处理，initNodeHandlerMap方法将所有的实现类都put到nodeHandlerMap属性中，如ifHandle源码：

```java
    @Override
    public void handleNode(XNode nodeToHandle, List<SqlNode> targetContents) {
      // 解析当前节点的下级节点
      MixedSqlNode mixedSqlNode = parseDynamicTags(nodeToHandle);
      // 获取test属性
      String test = nodeToHandle.getStringAttribute("test");
      // 创建一个IfSqlNode节点，并放入到sql节点树中
      IfSqlNode ifSqlNode = new IfSqlNode(mixedSqlNode, test);
      targetContents.add(ifSqlNode);
    }

// ##### XMLScriptBuilder类中的属性 #####
  // 需要处理的xml节点
  private final XNode context;
  // 当前节点是否为动态节点
  private boolean isDynamic;
  // 输入参数的类型
  private final Class<?> parameterType;
  // 节点类型和对于处理器的组成的map
  private final Map<String, NodeHandler> nodeHandlerMap = new HashMap<>();
```

解析脚本节点方法parseScriptNode主要是将xnode节点解析为MixedSqlNode后创建sqlSource。解析源码如下:

```java
// 解析脚本节点
  public SqlSource parseScriptNode() {
    // 通过当前XNode节点解析出混合sql节点
    MixedSqlNode rootSqlNode = parseDynamicTags(context);
    SqlSource sqlSource;
    // 动态sqlSource初始化
    if (isDynamic) {
      sqlSource = new DynamicSqlSource(configuration, rootSqlNode);
    }
    // 原生sqlSource初始化
    else {
      sqlSource = new RawSqlSource(configuration, rootSqlNode, parameterType);
    }
    return sqlSource;
  }

  // 解析动态标签中的下级节点
  protected MixedSqlNode parseDynamicTags(XNode node) {
    List<SqlNode> contents = new ArrayList<>();
    // 处理所有子节点
    NodeList children = node.getNode().getChildNodes();
    for (int i = 0; i < children.getLength(); i++) {
      // 遍历循环每一个子节点
      XNode child = node.newXNode(children.item(i));
      // CDATASection和text类型的节点
      if (child.getNode().getNodeType() == Node.CDATA_SECTION_NODE || child.getNode().getNodeType() == Node.TEXT_NODE) {
        // 获取节点的内部数据并实例化TextSqlNode
        String data = child.getStringBody("");
        TextSqlNode textSqlNode = new TextSqlNode(data);
        // 动态节点则将textSqlNode添加到sqlNode中，只要一个是动态的则其他的全部是动态的
        if (textSqlNode.isDynamic()) {
          contents.add(textSqlNode);
          isDynamic = true;
        }
        // 其他节点则添加StaticTextSqlNode
        else {
          contents.add(new StaticTextSqlNode(data));
        }
      }
      // 子节点还是xnode类型
      else if (child.getNode().getNodeType() == Node.ELEMENT_NODE) { // issue #628
        // 找到对应处理器
        String nodeName = child.getNode().getNodeName();
        NodeHandler handler = nodeHandlerMap.get(nodeName);
        if (handler == null) {
          throw new BuilderException("Unknown element <" + nodeName + "> in SQL statement.");
        }
        // 用处理器处理节点
        handler.handleNode(child, contents);
        isDynamic = true;
      }
    }
    // 构建混个节点并返回
    return new MixedSqlNode(contents);
  }
```

#### 1..4.3 OGNL辅助

节点树中会存在很多的ognl的表达式，ognl主要就是去解析这些表达式。

类解析器OgnlClassResolver的源码很简单，就是去覆盖了toClassForName方法源码如下：

```java
public class OgnlClassResolver extends DefaultClassResolver {

  // 通过一个类名转化为一个类
  @Override
  protected Class toClassForName(String className) throws ClassNotFoundException {
    return Resources.classForName(className);
  }

}
```

成员访问OgnlMemberAccess类设置属性访问：

```java
// MemberAccess是ognl提供的一个钩子接口（为访问对象的属性作准备）
class OgnlMemberAccess implements MemberAccess {

  // 是否通过能控制成员访问
  private final boolean canControlMemberAccessible;

  OgnlMemberAccess() {
    this.canControlMemberAccessible = Reflector.canControlMemberAccessible();
  }

  // 设置属性的可访问性
  @Override
  public Object setup(Map context, Object target, Member member, String propertyName) {
    Object result = null;
    // 允许修改
    if (isAccessible(context, target, member, propertyName)) {
      AccessibleObject accessible = (AccessibleObject) member;
      if (!accessible.isAccessible()) {
        result = Boolean.FALSE;
        // 将属性修改为可访问
        accessible.setAccessible(true);
      }
    }
    return result;
  }
  // ...
}  
```

为了提高ognl的效率，利用OgnlCache做了一个缓存

```java
public final class OgnlCache {

  // mybatis提供的类
  private static final OgnlMemberAccess MEMBER_ACCESS = new OgnlMemberAccess();
  private static final OgnlClassResolver CLASS_RESOLVER = new OgnlClassResolver();
  // 缓存解析后的ognl表达式，提高效率
  private static final Map<String, Object> expressionCache = new ConcurrentHashMap<>();

  private OgnlCache() {
    // Prevent Instantiation of Static Class
  }

  // 获取表达式结果
  public static Object getValue(String expression, Object root) {
    try {
      // 创建默认的上下文环境
      Map context = Ognl.createDefaultContext(root, MEMBER_ACCESS, CLASS_RESOLVER, null);
      // 获取结果
      return Ognl.getValue(parseExpression(expression), context, root);
    } catch (OgnlException e) {
      throw new BuilderException("Error evaluating expression '" + expression + "'. Cause: " + e, e);
    }
  }

  // 解析表达式，得到解析后的表达式树
  private static Object parseExpression(String expression) throws OgnlException {
    Object node = expressionCache.get(expression);
    // 不存在缓存则注解解析后存入缓存
    if (node == null) {
      node = Ognl.parseExpression(expression);
      expressionCache.put(expression, node);
    }
    return node;
  }

}
```

表达式求值器ExpressionEvaluator主要是对结果表达式处理，源码如下：

```java
// 表达式求值器
public class ExpressionEvaluator {

  // 对boolean类型的表达式求值
  public boolean evaluateBoolean(String expression, Object parameterObject) {
    // 获取表达式的值
    Object value = OgnlCache.getValue(expression, parameterObject);
    // boolean类型
    if (value instanceof Boolean) {
      return (Boolean) value;
    }
    // 数值类型
    if (value instanceof Number) {
      return new BigDecimal(String.valueOf(value)).compareTo(BigDecimal.ZERO) != 0;
    }
    return value != null;
  }

  // 对迭代类型的表达式求职
  public Iterable<?> evaluateIterable(String expression, Object parameterObject) {
    // 获取表达式的值
    Object value = OgnlCache.getValue(expression, parameterObject);
    if (value == null) {
      throw new BuilderException("The expression '" + expression + "' evaluated to a null value.");
    }
    if (value instanceof Iterable) {
      return (Iterable<?>) value;
    }
    // array类型
    if (value.getClass().isArray()) {
      // 手动转为ArrayList，处理可能出现的ClassCastException
      int size = Array.getLength(value);
      List<Object> answer = new ArrayList<>();
      for (int i = 0; i < size; i++) {
        Object o = Array.get(value, i);
        answer.add(o);
      }
      return answer;
    }
    // map类型
    if (value instanceof Map) {
      return ((Map) value).entrySet();
    }
    throw new BuilderException("Error evaluating expression '" + expression + "'.  Return value (" + value + ") was not iterable.");
  }
}

```

#### 1.4.4 节点解析

动态上下文DynamicContext主要是保存解析完的sql片段和提供一些参数和环境信息作为解析依据，该类里面存在一个静态内部类ContextMap，用于存储数据。

```java
public class DynamicContext {

  public static final String PARAMETER_OBJECT_KEY = "_parameter";
  public static final String DATABASE_ID_KEY = "_databaseId";

  static {
    OgnlRuntime.setPropertyAccessor(ContextMap.class, new ContextAccessor());
  }

  // 上下文环境
  private final ContextMap bindings;
  // sql语句的拼装
  private final StringJoiner sqlBuilder = new StringJoiner(" ");
  private int uniqueNumber = 0;

  public DynamicContext(Configuration configuration, Object parameterObject) {
    if (parameterObject != null && !(parameterObject instanceof Map)) {
      // 获取参数对象的元对象
      MetaObject metaObject = configuration.newMetaObject(parameterObject);
      // 判断参数是否存在类型处理器
      boolean existsTypeHandler = configuration.getTypeHandlerRegistry().hasTypeHandler(parameterObject.getClass());
      // 初始化ContextMap对象
      bindings = new ContextMap(metaObject, existsTypeHandler);
    } else {
      bindings = new ContextMap(null, false);
    }
    // 把参数和数据库ID存入上下文，可以直接用数据库ID和_parameter引用参数
    bindings.put(PARAMETER_OBJECT_KEY, parameterObject);
    bindings.put(DATABASE_ID_KEY, configuration.getDatabaseId());
  }
  
  static class ContextMap extends HashMap<String, Object> {
    private static final long serialVersionUID = 2977601501966151582L;
    // 元对象
    private final MetaObject parameterMetaObject;
    private final boolean fallbackParameterObject;

    public ContextMap(MetaObject parameterMetaObject, boolean fallbackParameterObject) {
      this.parameterMetaObject = parameterMetaObject;
      this.fallbackParameterObject = fallbackParameterObject;
    }

    @Override
    public Object get(Object key) {
      String strKey = (String) key;
      // 在map中获取
      if (super.containsKey(strKey)) {
        return super.get(strKey);
      }

      // 如果map中不存在则从参数元对象中获取
      if (parameterMetaObject == null) {
        return null;
      }
      if (fallbackParameterObject && !parameterMetaObject.hasGetter(strKey)) {
        return parameterMetaObject.getOriginalObject();
      } else {
        // issue #61 do not modify the context when reading
        return parameterMetaObject.getValue(strKey);
      }
    }
  }
  // ...
}


```

sql节点就是为了处理xml中的动态节点。SqlNode是一个接口，只有一个方法apply方法用于完成自身的解析。所有的if、where、foreach等都是实现类这个接口。部分实现类代码:

```java
public class IfSqlNode implements SqlNode {
  // 表达式求值器
  private final ExpressionEvaluator evaluator;
  // 判断时的测试条件
  private final String test;
  // 如果测试条件为true需要拼装的sql信息
  private final SqlNode contents;

  public IfSqlNode(SqlNode contents, String test) {
    this.test = test;
    this.contents = contents;
    this.evaluator = new ExpressionEvaluator();
  }

  // 解析
  @Override
  public boolean apply(DynamicContext context) {
    // 判断if条件是否成立
    if (evaluator.evaluateBoolean(test, context.getBindings())) {
      // 将内容拼接到上下文中
      contents.apply(context);
      return true;
    }
    return false;
  }
}

// ##### foreach ##### 
public class ForEachSqlNode implements SqlNode {
  public static final String ITEM_PREFIX = "__frch_";

  // 求值器
  private final ExpressionEvaluator evaluator;
  // collect属性的值
  private final String collectionExpression;
  // sql信息
  private final SqlNode contents;
  // open="(" 的值，左边需要插入的字符串
  private final String open;
  // close=")" 右边需要插入的字符串
  private final String close;
  // 分隔符
  private final String separator;
  // 属性值
  private final String item;
  // 属性编号
  private final String index;
  // 配置信息
  private final Configuration configuration;

  @Override
  public boolean apply(DynamicContext context) {
    // 获取上下文信息
    Map<String, Object> bindings = context.getBindings();
    // 通过求值器获取迭代器
    final Iterable<?> iterable = evaluator.evaluateIterable(collectionExpression, bindings);
    // 没有元素遍历
    if (!iterable.iterator().hasNext()) {
      return true;
    }
    boolean first = true;
    // 添加open
    applyOpen(context);
    int i = 0;
    for (Object o : iterable) {
      DynamicContext oldContext = context;
      // 第一个元素添加
      if (first || separator == null) {
        context = new PrefixedContext(context, "");
      }
      // 添加间隔符
      else {
        context = new PrefixedContext(context, separator);
      }
      int uniqueNumber = context.getUniqueNumber();
      // Issue #709
      // 迭代对象为map
      if (o instanceof Map.Entry) {
        @SuppressWarnings("unchecked")
        // 将被迭代对象放入上下文环境
        Map.Entry<Object, Object> mapEntry = (Map.Entry<Object, Object>) o;
        applyIndex(context, mapEntry.getKey(), uniqueNumber);
        applyItem(context, mapEntry.getValue(), uniqueNumber);
      } else {
        applyIndex(context, i, uniqueNumber);
        applyItem(context, o, uniqueNumber);
      }
      // 根据上下文环境构建内容
      contents.apply(new FilteredDynamicContext(configuration, context, index, item, uniqueNumber));
      if (first) {
        first = !((PrefixedContext) context).isPrefixApplied();
      }
      context = oldContext;
      i++;
    }
    // 添加close
    applyClose(context);
    // 清理数据
    context.getBindings().remove(item);
    context.getBindings().remove(index);
    return true;
  }
  // ...
}  
```

#### 1.4.5  SqlResource

DynamicSqlSource类就是将参数和动态sql节点进行绑定操作的入口，在经过#{}占位符处理、动态节点处理之后就变为了StaticSqlSource，量具体源码如下：

```java
public class DynamicSqlSource implements SqlSource {

  private final Configuration configuration;
  private final SqlNode rootSqlNode;

  public DynamicSqlSource(Configuration configuration, SqlNode rootSqlNode) {
    this.configuration = configuration;
    this.rootSqlNode = rootSqlNode;
  }

  @Override
  public BoundSql getBoundSql(Object parameterObject) {
    // 创建DynamicSqlSource的辅助类DynamicContext，用来记录DynamicSqlSource解析出来的sql
    DynamicContext context = new DynamicContext(configuration, parameterObject);
    // 从根节点开始，逐层调用apply替换掉动态节点和${}
    rootSqlNode.apply(context);
    // 处理占位符和汇总参数信息
    SqlSourceBuilder sqlSourceParser = new SqlSourceBuilder(configuration);
    Class<?> parameterType = parameterObject == null ? Object.class : parameterObject.getClass();
    // 使用SqlSourceBuilder将#{}转为？最终生成StaticSqlSource
    SqlSource sqlSource = sqlSourceParser.parse(context.getSql(), parameterType, context.getBindings());
    BoundSql boundSql = sqlSource.getBoundSql(parameterObject);
    // 将context.getBindings()的参数放到metaParameters进行保存
    context.getBindings().forEach(boundSql::setAdditionalParameter);
    return boundSql;
  }

}
```

![sqlSource](https://gaoqisen.github.io/GraphBed/202108/20210808160122.png)

### 1.5 datasource包

可以分为JNDI、池化、非池化数据源三种类型。包下面有一个DataSourceFactory接口，三种类型都实现了该接口，其中PooledDataSourceFactory实现了UnpooledDataSourceFactory。池化化非池化就是一个用链接池一个不用。

```java
public interface DataSourceFactory {

  // 设置属性
  void setProperties(Properties props);

  // 获取数据源
  DataSource getDataSource();

}
```



#### 1.5.1 JNDI数据源

JNDI（Java Naming and Directory Interface）是 Java命名和目录接口可以理解为一个命名规范该规范将资源放在上下文中，mybatis的JndiDataSourceFactory就去获取。具体的实现就是去获取上下文里面的数据源，源码如下：

```java
public class JndiDataSourceFactory implements DataSourceFactory {

  // 起始环境信息
  public static final String INITIAL_CONTEXT = "initial_context";
  // 给出的数据名称
  public static final String DATA_SOURCE = "data_source";
  public static final String ENV_PREFIX = "env.";

  private DataSource dataSource;

  // 只是去查找数据源：如tomcat可以把相关的数据命名好后放在环境中，之后通过这个方法就可以获取
  @Override
  public void setProperties(Properties properties) {
    try {
      InitialContext initCtx;
      Properties env = getEnvProperties(properties);
      if (env == null) {
        initCtx = new InitialContext();
      } else {
        initCtx = new InitialContext(env);
      }

      // 如果properties存在initial_context、data_source两个属性
      if (properties.containsKey(INITIAL_CONTEXT) && properties.containsKey(DATA_SOURCE)) {
        // 通过InitialContext查找initial_context
        Context ctx = (Context) initCtx.lookup(properties.getProperty(INITIAL_CONTEXT));
        // 通过Context查找dataSource
        dataSource = (DataSource) ctx.lookup(properties.getProperty(DATA_SOURCE));
      }
      // 只存在data_source属性
      else if (properties.containsKey(DATA_SOURCE)) {
        dataSource = (DataSource) initCtx.lookup(properties.getProperty(DATA_SOURCE));
      }

    } catch (NamingException e) {
      throw new DataSourceException("There was an error configuring JndiDataSourceTransactionPool. Cause: " + e, e);
    }
  }

  @Override
  public DataSource getDataSource() {
    return dataSource;
  }

  // 获取环境属性
  private static Properties getEnvProperties(Properties allProps) {
    final String PREFIX = ENV_PREFIX;
    Properties contextProperties = null;
    for (Entry<Object, Object> entry : allProps.entrySet()) {
      String key = (String) entry.getKey();
      String value = (String) entry.getValue();
      // 如果key的前缀包含env.则截取掉后put属性
      if (key.startsWith(PREFIX)) {
        if (contextProperties == null) {
          contextProperties = new Properties();
        }
        contextProperties.put(key.substring(PREFIX.length()), value);
      }
    }
    return contextProperties;
  }

}
```

#### 1.5.2 非池化数据源

非池化数据源共两个类UnpooledDataSource、UnpooledDataSourceFactory。UnpooledDataSourceFactory实现了setProperties方法，UnpooledDataSource主要就是一些数据源的操作，源码如下：

```java
// ##### DataSourceFactory 比较重要的方法 #####
  @Override
  public void setProperties(Properties properties) {
    Properties driverProperties = new Properties();
    // 将UnpooledDataSource反射为元对象之后进行数据操作
    MetaObject metaDataSource = SystemMetaObject.forObject(dataSource);
    for (Object key : properties.keySet()) {
      String propertyName = (String) key;
      // key以driver.开头
      if (propertyName.startsWith(DRIVER_PROPERTY_PREFIX)) {
        // 去掉driver.后将数据set到元对象中
        String value = properties.getProperty(propertyName);
        driverProperties.setProperty(propertyName.substring(DRIVER_PROPERTY_PREFIX_LENGTH), value);
      }
      // 元对象中存在属性名的set方法
      else if (metaDataSource.hasSetter(propertyName)) {
        String value = (String) properties.get(propertyName);
        // 转化值后将数据set到元对象中
        Object convertedValue = convertValue(metaDataSource, propertyName, value);
        metaDataSource.setValue(propertyName, convertedValue);
      } else {
        throw new DataSourceException("Unknown DataSource property: " + propertyName);
      }
    }
    if (driverProperties.size() > 0) {
      metaDataSource.setValue("driverProperties", driverProperties);
    }
  }
  
  // ##### UnpooledDataSource #####
  // 池化数据源
public class UnpooledDataSource implements DataSource {

  // 驱动加载器
  private ClassLoader driverClassLoader;
  // 驱动配置信息
  private Properties driverProperties;
  // 已经注册的所有驱动
  private static Map<String, Driver> registeredDrivers = new ConcurrentHashMap<>();
  // 数据库驱动
  private String driver;
  // 地址
  private String url;
  // 用户名
  private String username;
  // 密码
  private String password;
  // 是否字段提交
  private Boolean autoCommit;
  // 默认事务隔离
  private Integer defaultTransactionIsolationLevel;
  // 最长等待时间
  private Integer defaultNetworkTimeout;
  
  // 建立数据库链接
  private Connection doGetConnection(Properties properties) throws SQLException {
    // 初始化驱动
    initializeDriver();
    // 通过MetaObject获取链接
    Connection connection = DriverManager.getConnection(url, properties);
    // 配置链接
    configureConnection(connection);
    return connection;
  }

  private synchronized void initializeDriver() throws SQLException {
    // 如果驱动没有注册则进行注册
    if (!registeredDrivers.containsKey(driver)) {
      Class<?> driverType;
      try {
        // 存在类加载器
        if (driverClassLoader != null) {
          // 优先使用驱动类加载器加载驱动
          driverType = Class.forName(driver, true, driverClassLoader);
        } else {
          // 使用resources类的加载起加载
          driverType = Resources.classForName(driver);
        }
        // DriverManager requires the driver to be loaded via the system ClassLoader.
        // http://www.kfu.com/~nsayer/Java/dyn-jdbc.html
        // 实例化驱动
        Driver driverInstance = (Driver) driverType.getDeclaredConstructor().newInstance();
        // DriverManager注册驱动
        DriverManager.registerDriver(new DriverProxy(driverInstance));
        // 添加到map中，下次可以直接使用
        registeredDrivers.put(driver, driverInstance);
      } catch (Exception e) {
        throw new SQLException("Error setting driver on UnpooledDataSource. Cause: " + e);
      }
    }
  }
  // ...
```

#### 1.5.3 池化数据源

池化包里面有4个类，PooledDataSourceFactory继承了UnpooledDataSourceFactory后添加了一个无参构造器用来初始化PooledDataSource，PooledDataSource里面的属性UnpooledDataSource就是数据库连接参数以及一些链接池的配置，PoolState池状态类用于记录连接池的状态，PooledDataSource连接池数据源类处理了获取一个连接以及收回连接的逻辑

连接池状态PoolState的属性

```java
 // 链接池数据
  protected PooledDataSource dataSource;
  // 空闲的链接
  protected final List<PooledConnection> idleConnections = new ArrayList<>();
  // 活跃的链接
  protected final List<PooledConnection> activeConnections = new ArrayList<>();
  // 链接请求次数
  protected long requestCount = 0;
  // 取出请求花费时间的累计值
  protected long accumulatedRequestTime = 0;
  // 累计被检出的时间
  protected long accumulatedCheckoutTime = 0;
  // 过期链接数
  protected long claimedOverdueConnectionCount = 0;
  // 过期连接数的链接时长
  protected long accumulatedCheckoutTimeOfOverdueConnections = 0;
  // 总等待时间
  protected long accumulatedWaitTime = 0;
  // 等待的轮次
  protected long hadToWaitCount = 0;
  // 坏链接的数目
  protected long badConnectionCount = 0;
```

连接池数据源源代码：

```java
public class PooledDataSource implements DataSource {

  private static final Log log = LogFactory.getLog(PooledDataSource.class);
  // 链接池（存储了所有数据库链接和状态信息）
  private final PoolState state = new PoolState(this);
  // 非链接池
  private final UnpooledDataSource dataSource;

  // OPTIONAL CONFIGURATION FIELDS
  // 和链接池相关的配置项
  protected int poolMaximumActiveConnections = 10;
  protected int poolMaximumIdleConnections = 5;
  protected int poolMaximumCheckoutTime = 20000;
  protected int poolTimeToWait = 20000;
  protected int poolMaximumLocalBadConnectionTolerance = 3;
  protected String poolPingQuery = "NO PING QUERY SET";
  protected boolean poolPingEnabled;
  protected int poolPingConnectionsNotUsedFor;
  // 存储池中连接的编码（用于确保连接的等价性，避免非本池的连接放入）
  private int expectedConnectionTypeCode;
  
  // 从链接池中给出一个连接
  private PooledConnection popConnection(String username, String password) throws SQLException {
    boolean countedWait = false;
    PooledConnection conn = null;
    // 统计时间使用
    long t = System.currentTimeMillis();
    int localBadConnectionCount = 0;

    while (conn == null) {
      // 添加同步锁
      synchronized (state) {
        // 存在空闲连接
        if (!state.idleConnections.isEmpty()) {
          // Pool has available connection
          // 左移一个取出一个连接
          conn = state.idleConnections.remove(0);
          if (log.isDebugEnabled()) {
            log.debug("Checked out connection " + conn.getRealHashCode() + " from pool.");
          }
        }
        // 池中没有空闲连接
        else {
          // Pool does not have available connection
          // 活跃连接小于池最大活跃
          if (state.activeConnections.size() < poolMaximumActiveConnections) {
            // Can create new connection
            // 创建新的连接
            conn = new PooledConnection(dataSource.getConnection(), this);
            if (log.isDebugEnabled()) {
              log.debug("Created connection " + conn.getRealHashCode() + ".");
            }
          }
          // 池中没有空闲连接
          else {
            // Cannot create new connection
            // 找出借出去最久的连接
            PooledConnection oldestActiveConnection = state.activeConnections.get(0);
            // 获取借出时间
            long longestCheckoutTime = oldestActiveConnection.getCheckoutTime();
            // 如果借出时间大于最大借出时间（超期）
            if (longestCheckoutTime > poolMaximumCheckoutTime) {
              // Can claim overdue connection
              // 声明该连接超时
              state.claimedOverdueConnectionCount++;
              state.accumulatedCheckoutTimeOfOverdueConnections += longestCheckoutTime;
              state.accumulatedCheckoutTime += longestCheckoutTime;
              // 删除该连接
              state.activeConnections.remove(oldestActiveConnection);
              // 超期不还的没有设置自动提交事务
              if (!oldestActiveConnection.getRealConnection().getAutoCommit()) {
                // 尝试提交事务
                try {
                  oldestActiveConnection.getRealConnection().rollback();
                } catch (SQLException e) {
                  log.debug("Bad connection. Could not roll back");
                }
              }
              // 新建新的连接
              conn = new PooledConnection(oldestActiveConnection.getRealConnection(), this);
              conn.setCreatedTimestamp(oldestActiveConnection.getCreatedTimestamp());
              conn.setLastUsedTimestamp(oldestActiveConnection.getLastUsedTimestamp());
              oldestActiveConnection.invalidate();
              if (log.isDebugEnabled()) {
                log.debug("Claimed overdue connection " + conn.getRealHashCode() + ".");
              }
            }
            // 未超期
            else {
              // Must wait
              // 等待有连接归还到链接池
              try {
                if (!countedWait) {
                  // 记录等待次数，等待多次也只算一次
                  state.hadToWaitCount++;
                  countedWait = true;
                }
                if (log.isDebugEnabled()) {
                  log.debug("Waiting as long as " + poolTimeToWait + " milliseconds for connection.");
                }
                long wt = System.currentTimeMillis();
                // 等待一会在试，防止一直占用资源
                state.wait(poolTimeToWait);
                state.accumulatedWaitTime += System.currentTimeMillis() - wt;
              } catch (InterruptedException e) {
                break;
              }
            }
          }
        }
        // 获取到连接
        if (conn != null) {
          // ping to server and check the connection is valid or not
          // 连接可用
          if (conn.isValid()) {
            // 没有自动提交
            if (!conn.getRealConnection().getAutoCommit()) {
              // 回滚操作
              conn.getRealConnection().rollback();
            }
            // 这只数据源类型编码等数据
            conn.setConnectionTypeCode(assembleConnectionTypeCode(dataSource.getUrl(), username, password));
            conn.setCheckoutTimestamp(System.currentTimeMillis());
            conn.setLastUsedTimestamp(System.currentTimeMillis());
            state.activeConnections.add(conn);
            state.requestCount++;
            state.accumulatedRequestTime += System.currentTimeMillis() - t;
          }
          // 连接不可以
          else {
            if (log.isDebugEnabled()) {
              log.debug("A bad connection (" + conn.getRealHashCode() + ") was returned from the pool, getting another connection.");
            }
            state.badConnectionCount++;
            localBadConnectionCount++;
            // 删除连接
            conn = null;
            // 如果所有连接都不能用，则一次提示
            if (localBadConnectionCount > (poolMaximumIdleConnections + poolMaximumLocalBadConnectionTolerance)) {
              if (log.isDebugEnabled()) {
                log.debug("PooledDataSource: Could not get a good connection to the database.");
              }
              throw new SQLException("PooledDataSource: Could not get a good connection to the database.");
            }
          }
        }
      }
      // 如果一直没有获取到，则一直循环获取
    }
    
      // 收回连接
  protected void pushConnection(PooledConnection conn) throws SQLException {

    synchronized (state) {
      // 删除活跃连接
      state.activeConnections.remove(conn);
      // 当前连接可用
      if (conn.isValid()) {
        // 空闲连接数小于链接池最大数量与存储池中连接的编码一致
        if (state.idleConnections.size() < poolMaximumIdleConnections && conn.getConnectionTypeCode() == expectedConnectionTypeCode) {
          state.accumulatedCheckoutTime += conn.getCheckoutTime();
          // 非自动提交则将未完成的操作进行回滚
          if (!conn.getRealConnection().getAutoCommit()) {
            conn.getRealConnection().rollback();
          }
          // 创建新的连接并添加到空闲连接列表
          PooledConnection newConn = new PooledConnection(conn.getRealConnection(), this);
          state.idleConnections.add(newConn);
          newConn.setCreatedTimestamp(conn.getCreatedTimestamp());
          newConn.setLastUsedTimestamp(conn.getLastUsedTimestamp());
          // 设置连接未校验，便于取出时校验
          conn.invalidate();
          if (log.isDebugEnabled()) {
            log.debug("Returned connection " + newConn.getRealHashCode() + " to pool.");
          }
          // 通知所有
          state.notifyAll();
        }
        // 空闲连接数大于等于链接池最大数量或存储池中连接的编码不一致
        else {
          state.accumulatedCheckoutTime += conn.getCheckoutTime();
          // 非自动提交则进行回滚
          if (!conn.getRealConnection().getAutoCommit()) {
            conn.getRealConnection().rollback();
          }
          // 直接关闭连接
          conn.getRealConnection().close();
          if (log.isDebugEnabled()) {
            log.debug("Closed connection " + conn.getRealHashCode() + ".");
          }
          conn.invalidate();
        }
      }
      // 连接不可用
      else {
        if (log.isDebugEnabled()) {
          log.debug("A bad connection (" + conn.getRealHashCode() + ") attempted to return to the pool, discarding connection.");
        }
        state.badConnectionCount++;
      }
    }
  }
  
    // 通过链接+用户名+密码生成hash，确保连接结束后归还时校验
  private int assembleConnectionTypeCode(String url, String username, String password) {
    return ("" + url + username + password).hashCode();
  }
  // ...
}  
```

PooledDataSource继承了javax.sql.DataSource实现了一些方法也添加了一些UnpooledDataSource类的get和set方法，在获取连接的时候就去PoolState里面获取。PooledConnection是一个java.sql的一个代理类主要是替换了close方法去收回连接而不是去关闭连接，PooledConnection源码如下:

```java
// 池连接 实现了动态代理InvocationHandler
class PooledConnection implements InvocationHandler {

  private static final String CLOSE = "close";
  private static final Class<?>[] IFACES = new Class<?>[] { Connection.class };
  private final int hashCode;
  // 池数据源
  private final PooledDataSource dataSource;
  // 真实连接
  private final Connection realConnection;
  // 代理连接
  private final Connection proxyConnection;
  // 检出时间
  private long checkoutTimestamp;
  // 创建时间
  private long createdTimestamp;
  // 最后使用时间
  private long lastUsedTimestamp;
  // 连接类型编码
  private int connectionTypeCode;
  // 是否验证
  private boolean valid;
  
    @Override
  public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
    String methodName = method.getName();
    // 如果方法为close则收回连接
    if (CLOSE.equals(methodName)) {
      dataSource.pushConnection(this);
      return null;
    }
    try {
      if (!Object.class.equals(method.getDeclaringClass())) {
        checkConnection();
      }
      return method.invoke(realConnection, args);
    } catch (Throwable t) {
      throw ExceptionUtil.unwrapThrowable(t);
    }
  }
}

// ##### PooledDataSource.forceCloseAll方法 #####
  // 关闭所有连接，确保连接始终是等价的
  public void forceCloseAll() {
    synchronized (state) {
      // 重新更新连接编码
      expectedConnectionTypeCode = assembleConnectionTypeCode(dataSource.getUrl(), dataSource.getUsername(), dataSource.getPassword());
      // 依次关闭所有的活动连接
      for (int i = state.activeConnections.size(); i > 0; i--) {
        try {
          PooledConnection conn = state.activeConnections.remove(i - 1);
          conn.invalidate();

          Connection realConn = conn.getRealConnection();
          if (!realConn.getAutoCommit()) {
            realConn.rollback();
          }
          realConn.close();
        } catch (Exception e) {
          // ignore
        }
      }
      // 依次关闭所有的空闲连接
      for (int i = state.idleConnections.size(); i > 0; i--) {
        try {
          PooledConnection conn = state.idleConnections.remove(i - 1);
          conn.invalidate();

          Connection realConn = conn.getRealConnection();
          if (!realConn.getAutoCommit()) {
            realConn.rollback();
          }
          realConn.close();
        } catch (Exception e) {
          // ignore
        }
      }
    }
    if (log.isDebugEnabled()) {
      log.debug("PooledDataSource forcefully closed/removed all connections.");
    }
  }
```

整理一下，PoolState类是维护连接的类，PooledConnection类是java.sql.Connect的代理类，PooledDataSource类是连接池数据源的操作类，PooledDataSourceFactory类产生PooledDataSource类

## 二、包结构汇总

| 包名       | 介绍                                                 | 设计模式   |
| ---------- | ---------------------------------------------------- | ---------- |
| binding    | 用来处理sql和java方法的语句绑定，重点是jdk的动态代理 |            |
| builder    | 将xml或注解构建为Configuation对象                    | 建造者模式 |
| mapping    | 映射实体类                                           |            |
| scripting  | 动态sql则组建，重点是OGNL                            |            |
| datasource | 数据源的获取，Jndi和数据源池化                       | 工厂模式   |



