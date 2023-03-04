---
title: 07_Spring源码(二)-容器初始化
date: 2022-01-27 09:50:36
tags: sourcecode
categories: spring
keywords: spring
description: spring学习。
---

## 一、概述

```java
// ApplicationContext是高级形状的ioc容器，提供了BeanFactory不具备的特性
ApplicationContext ctx = new ClassPathXmlApplicationContext("bean.xml");
Person p = ctx.getBean("person",Person.class);
System.out.println(p.getAge());	
```

## 二、 容器初始化

### 2.1 父类初始化

1. 调用了很多歌super后初始化了PathMatchingResourcePatternResolver(路径匹配模式解析器)，
2. 判断父容器上下文是否为空，不为空则进行环境数据合并

### 2.2 本地配置设置

多个文件路径的配置文件解析，递归处理${}的数据，处理规则调用的公用EL表达式解析工具类

```java
	public void setConfigLocations(@Nullable String... locations) {
		if (locations != null) {
			Assert.noNullElements(locations, "Config locations must not be null");
			this.configLocations = new String[locations.length];
			for (int i = 0; i < locations.length; i++) {
				// 解析配置文件的路径（逻辑多，会进行递归解析: ${}的解析规则是一样的）
				this.configLocations[i] = resolvePath(locations[i]).trim();
			}
		}
		else {
			this.configLocations = null;
		}
	}

// resolvePath方法里面最终的解析方法是parseStringValue，主要的调用链如下，
resolvePath:127, AbstractRefreshableConfigApplicationContext
  resolveRequiredPlaceholders:624, AbstractEnvironment
    resolveRequiredPlaceholders:210, AbstractPropertyResolver
      doResolvePlaceholders:240, AbstractPropertyResolver
        replacePlaceholders:126, PropertyPlaceholderHelper
          parseStringValue:134, PropertyPlaceholderHelper
```

### 2.3 刷新(refresh重要)

刷新方法最重要的13个方法

```java
	public void refresh() throws BeansException, IllegalStateException {
		synchronized (this.startupShutdownMonitor) {
			StartupStep contextRefresh = this.applicationStartup.start("spring.context.refresh");
			// 1. 做容器刷新前的准备工作
			prepareRefresh();
			// 2. 获取beanFactory【重要】（createBeanDefinition、解析xml）【调用getBean】
			ConfigurableListableBeanFactory beanFactory = obtainFreshBeanFactory();
			// 3. 准备bean工厂（将默认类初始化到ConfigurableListableBeanFactory）
			prepareBeanFactory(beanFactory);
			try {
				// 4. 对工厂bean的后置处理，默认为空实现
				postProcessBeanFactory(beanFactory);
				StartupStep beanPostProcess = this.applicationStartup.start("spring.context.beans.post-process");
				// 5. 调用BeanFactoryPostProcessors，优先级处理。逻辑处理复杂（beanFactory）
				invokeBeanFactoryPostProcessors(beanFactory);
				// 6. 实例化和注册BeanPostProcessors(bean对象)
				registerBeanPostProcessors(beanFactory);
				beanPostProcess.end();
				// 7. 初始化消息源，辅助i18n
				initMessageSource();
				// 8. 初始化应用时间多播器
				initApplicationEventMulticaster();
				// 9. 空实现
				onRefresh();
				// 10. 注册监听器
				registerListeners();
				// 11. 完成bean的创建，非懒加载 doGetBean【重要】
				finishBeanFactoryInitialization(beanFactory);
				// 12. 完成刷新
				finishRefresh();
			}catch (BeansException ex) {
				destroyBeans();
				cancelRefresh(ex);
				throw ex;
			}finally {
        // 13. 重置命令缓存
				resetCommonCaches();
				contextRefresh.end();
			}
		}
	}
```

比较重要的一些方法堆栈

#### 2.3.1 obtainFreshBeanFactory

主要堆栈（创建/注册BeanDefinition堆栈）

```java
refresh:561, AbstractApplicationContext
  obtainFreshBeanFactory:701, AbstractApplicationContext
    refreshBeanFactory:135, AbstractRefreshableApplicationContext
      loadBeanDefinitions:96, AbstractXmlApplicationContext // 调用各种重载（xml结构处理），适配器模式
        loadBeanDefinitions:311, XmlBeanDefinitionReader
          // 去解析xml（createDocumentBuilder）
          doLoadDocument:440, XmlBeanDefinitionReader
            loadDocument:77, DefaultDocumentLoader
          // 去加载BeanDefinitions（重要）  
          doLoadBeanDefinitions:399, XmlBeanDefinitionReader
            registerBeanDefinitions:525, XmlBeanDefinitionReader
              registerBeanDefinitions:97, DefaultBeanDefinitionDocumentReader
                doRegisterBeanDefinitions:154, DefaultBeanDefinitionDocumentReader
                  parseBeanDefinitions:184, DefaultBeanDefinitionDocumentReader // 前后过程处理（自定义）
                    parseDefaultElement:207, DefaultBeanDefinitionDocumentReader // 解析默认元素
                      processBeanDefinition:316, DefaultBeanDefinitionDocumentReader
                        // 创建BeanDefinition
                        parseBeanDefinitionElement:406, BeanDefinitionParserDelegate // 调用各种重载，并解析xml元素
                          createBeanDefinition:643, BeanDefinitionParserDelegate
                            createBeanDefinition:60, BeanDefinitionReaderUtils // 【进行new GenericBeanDefinition()】
                        // 注册BeanDefinition      
                        processBeanDefinition:322, DefaultBeanDefinitionDocumentReader
                          registerBeanDefinition:165, BeanDefinitionReaderUtils
                    parseCustomElement // 解析自定义元素      
```

#### 2.3.2 finishBeanFactoryInitialization

主要堆栈（利用反射实例化bean）

```java
refresh:600, AbstractApplicationContext
  finishBeanFactoryInitialization:953, AbstractApplicationContext
    preInstantiateSingletons:949, DefaultListableBeanFactory
      // BPP,BFPP都调用了getBean方法
      getBean:208, AbstractBeanFactory
        doGetBean:347, AbstractBeanFactory
          getSingleton:243, DefaultSingletonBeanRegistry
            getObject:-1, 1764996806
              lambda$doGetBean$0:349, AbstractBeanFactory
                createBean:548, AbstractAutowireCapableBeanFactory
                  doCreateBean:589, AbstractAutowireCapableBeanFactory
                    // 创建bean实例化
                    createBeanInstance:1253, AbstractAutowireCapableBeanFactory
                      instantiateBean:1348, AbstractAutowireCapableBeanFactory
                        instantiate:88, SimpleInstantiationStrategy
                          instantiateClass:209, BeanUtils // 【反射进行实例化】 ctor.newInstance(argsWithDefaultValues)
                    // 应用合并的bean定义后置处理器        
                    applyMergedBeanDefinitionPostProcessors:1126, AbstractAutowireCapableBeanFactory
                    // 【往三级缓存里面put值】
                    addSingletonFactory: 158,   
                    // 准备bean
                    populateBean:1476, AbstractAutowireCapableBeanFactory
                      applyPropertyValues:1682, AbstractAutowireCapableBeanFactory       
                    // 初始化bean
                    initializeBean:1822, AbstractAutowireCapableBeanFactory
                      // 调用感知方法（BeanNameAware）
                      invokeAwareMethods:1845, AbstractAutowireCapableBeanFactory
                      // 前置处理器初始化（BeanPostProcessor）
                      applyBeanPostProcessorsBeforeInitialization:436,AbstractAutowireCapableBeanFactory
                        postProcessBeforeInitialization:102, ApplicationContextAwareProcessor
                          invokeAwareInterfaces:109, ApplicationContextAwareProcessor //调用感知接口
                      // 调用初始化方法
                      invokeInitMethods
                      // 后置处理器初始化（BeanPostProcessor）
                      applyBeanPostProcessorsAfterInitialization:457, AbstractAutowireCapableBeanFactory
```



### 2.3 扩展点

```java
ClassPathXmlApplicationContext // 扩展对象是否被覆盖，是否循环依赖，beanFactory后处理
  
DefaultBeanDefinitionDocumentReader.preProcessXml // xml解析的前置和后置
  
AbstractBeanDefinitionParser  // 扩展自定义标签  
NamespaceHandlerSupport // 扩展命名空间  
  
PropertyEditorRegistrar // 自定义属性编辑器 
  
BeanDefinitionRegistryPostProcessor // bean定义注册表处理器  
  
BeanFactoryPostProcesser // bean工厂处理器  
```





## 三、 获取Bean

获取bean的堆栈

```java
getBean:1195, AbstractApplicationContext
  getBean:213, AbstractBeanFactory
    doGetBean:275, AbstractBeanFactory
      getSingleton:172, DefaultSingletonBeanRegistry
        // 判断一级缓存是否存在bean，判断二级缓存是否存在半成品bean，判断三级缓存是否存在ObjectFactory。如果第二级为空则加锁重新判断一级二级没有则获取三级调用getObject方法进行创建bean
        getSingleton:187, DefaultSingletonBeanRegistry
      // 获取到了bean则进行实例化操作（FactoryBean的实例化，非FactoryBean则直接返回）    
      getObjectForBeanInstance:1305, AbstractAutowireCapableBeanFactory
```

