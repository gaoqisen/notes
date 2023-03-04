---
title: 06_Spring源码(一)-初探流程
date: 2021-09-07 19:50:36
tags: sourcecode
categories: spring
keywords: spring
description: spring学习。
---

## 一、流程

搭建源码阅读环境后写了一个test类和bean方法用main方法跑了一下流程如下：

```java
// 加载xml
ClassPathResource classPathResource = new ClassPathResource("bean.xml");

// 原始方式：利用DefaultListableBeanFactory加载bean
DefaultListableBeanFactory factory = new DefaultListableBeanFactory();
XmlBeanDefinitionReader definitionReader = new XmlBeanDefinitionReader(factory);
definitionReader.loadBeanDefinitions(classPathResource);
System.out.println(factory.getBean("person", Person.class).getAge());

// 利用xmlBeanFactory创建bean() xmlBeanFactory继承了DefaultListableBeanFactory
BeanFactory bf = new XmlBeanFactory(classPathResource);
Person person = bf.getBean("person",Person.class);
System.out.println(person.getAge());

// ApplicationContext是高级形状的ioc容器，提供了BeanFactory不具备的特性
ApplicationContext ctx = new ClassPathXmlApplicationContext("bean.xml");
Person p = ctx.getBean("person",Person.class);
System.out.println(p.getAge());
```

上面的test用例就是用3种方式去获取bean并执行bean的方法。在调用的时候大致分为3步（准备容器对象、加载配置文件、获取bean）。其中准备容器对象就是去new一个对象，下面主要跟一下加载配置文件和获取bean的大致脉络。

### 1.1 DefaultListableBeanFactory

#### 1.1.1 Bean加载

##### 1 加载xml文件

加载xml文件的时候主要是调用的XmlBeanDefinitionReader.loadBeanDefinitions方法去执行逻辑，该方法将xml文件转为InputStream后去调用了doLoadBeanDefinitions方法。

```java
	protected int doLoadBeanDefinitions(InputSource inputSource, Resource resource)
			throws BeanDefinitionStoreException {

		try {
			// 获取xml的验证模式并加载xml并得到Document
			Document doc = doLoadDocument(inputSource, resource);
			// 注册bean信息
			int count = registerBeanDefinitions(doc, resource);
			if (logger.isDebugEnabled()) {
				logger.debug("Loaded " + count + " bean definitions from " + resource);
			}
			return count;
		}
		// ... 大量的catch	
	}	
```

这里兵分两路，一个通过InputSource和Resource去加载Document，另一个通过Document和resource去注册bean定义信息。

##### 2 加载Document

```java
	public Document loadDocument(InputSource inputSource, EntityResolver entityResolver,
			ErrorHandler errorHandler, int validationMode, boolean namespaceAware) throws Exception {
		// 创建DocumentBuilderFactory
		DocumentBuilderFactory factory = createDocumentBuilderFactory(validationMode, namespaceAware);
		if (logger.isTraceEnabled()) {
			logger.trace("Using JAXP provider [" + factory.getClass().getName() + "]");
		}
		// 通过DocumentBuilderFactory创建DocumentBuilder
		DocumentBuilder builder = createDocumentBuilder(factory, entityResolver, errorHandler);
		// 解析
		return builder.parse(inputSource);
	}	
```

这里主要是利用java的DocumentBuilderFactory去构建了DocumentBuilder，最终利用DocumentBuilder去解析xml文件。

##### 3 注册bean定义信息

```java
	public int registerBeanDefinitions(Document doc, Resource resource) throws BeanDefinitionStoreException {
		// 使用DefaultBeanDefinitionDocumentReader实例化BeanDefinitionDocumentReader
		BeanDefinitionDocumentReader documentReader = createBeanDefinitionDocumentReader();
		// 记录bean加载的个数
		int countBefore = getRegistry().getBeanDefinitionCount();
		// 注册及加载bean
		documentReader.registerBeanDefinitions(doc, createReaderContext(resource));
		// 记录加载的格式
		return getRegistry().getBeanDefinitionCount() - countBefore;
	}	
```

主要逻辑是创建BeanDefinitionDocumentReader和获取了bean的加载个数。其中比较重要的就是去注册bean定义信息，下面是该方法的调用栈

```java
registerBeanDefinitions:525, XmlBeanDefinitionReader
  registerBeanDefinitions:97, DefaultBeanDefinitionDocumentReader
    doRegisterBeanDefinitions:129, DefaultBeanDefinitionDocumentReader
```

之后就是doRegisterBeanDefinitions的主要注册逻辑

```java
	protected void doRegisterBeanDefinitions(Element root) {
			BeanDefinitionParserDelegate parent = this.delegate;
			// 创建委托
			this.delegate = createDelegate(getReaderContext(), root, parent);
			// 定义了namespace
			if (this.delegate.isDefaultNamespace(root)) {
				// 处理配置文件属性
				String profileSpec = root.getAttribute(PROFILE_ATTRIBUTE);
				if (StringUtils.hasText(profileSpec)) {
					String[] specifiedProfiles = StringUtils.tokenizeToStringArray(
							profileSpec, BeanDefinitionParserDelegate.MULTI_VALUE_ATTRIBUTE_DELIMITERS);
					// We cannot use Profiles.of(...) since profile expressions are not supported
					// in XML config. See SPR-12458 for details.
					if (!getReaderContext().getEnvironment().acceptsProfiles(specifiedProfiles)) {
						if (logger.isDebugEnabled()) {
							logger.debug("Skipped XML bean definition file due to specified profiles [" + profileSpec +
									"] not matching: " + getReaderContext().getResource());
						}
						return;
					}
				}
			}
	
			// 解析前处理，子类实现（模版方法的钩子）,没有任何逻辑。用于子类自行实现
			preProcessXml(root);
			// 解析bean定义并注册
			parseBeanDefinitions(root, this.delegate);
			// 解析后处理，子类实现
			postProcessXml(root);
	
			this.delegate = parent;
	}
```

其中parseBeanDefinitions方法最终的逻辑就是将xml里面的bean信息解析为BeanDefitiation后put到DefaultListableBeanFactory类的beanDefinitionMap属性中。调用栈如下:

```java
doRegisterBeanDefinitions:153, DefaultBeanDefinitionDocumentReader
  parseBeanDefinitions:183, DefaultBeanDefinitionDocumentReader
    parseDefaultElement:205, DefaultBeanDefinitionDocumentReader
      processBeanDefinition:319, DefaultBeanDefinitionDocumentReader
        registerBeanDefinition:164, BeanDefinitionReaderUtils
          registerBeanDefinition:1025, DefaultListableBeanFactory
```

最终将xml里面的所有配置的bean定义信息都存放在map中后加载过程结束。这个就是大致的xml加载过程。

#### 1.2 获取bean

##### 1 doGetBean

获取bean的时候是去调用的AbstractBeanFactory.doGetBean方法，下面删除了部分逻辑。

```java
protected <T> T doGetBean(String name, @Nullable Class<T> requiredType, @Nullable Object[] args, boolean typeCheckOnly)
			throws BeansException {

		String beanName = transformedBeanName(name);
		Object beanInstance;

		// Eagerly check singleton cache for manually registered singletons.
		// 检查单例bean缓存已存在则直接获取
		Object sharedInstance = getSingleton(beanName);
		if (sharedInstance != null && args == null) {
			...
		} else {
			if (isPrototypeCurrentlyInCreation(beanName)) {
				throw new BeanCurrentlyInCreationException(beanName);
			}
			// 检查bean工厂中是否存在bean定义信息
			BeanFactory parentBeanFactory = getParentBeanFactory();
			if (parentBeanFactory != null && !containsBeanDefinition(beanName)) {
				...
			}
			StartupStep beanCreation = this.applicationStartup.start("spring.beans.instantiate").tag("beanName", name);
			try {
				...
				RootBeanDefinition mbd = getMergedLocalBeanDefinition(beanName);
				checkMergedBeanDefinition(mbd, beanName, args);
				// 依赖bean的处理
				String[] dependsOn = mbd.getDependsOn();
				if (dependsOn != null) {
					for (String dep : dependsOn) {
						...
						// 注册依赖bean
						registerDependentBean(dep, beanName);
						try {
							getBean(dep);
						} ...
					}
				}

				// Create bean instance.
				// 单例模式（默认）
				if (mbd.isSingleton()) {
					// 获取单例bean
					sharedInstance = getSingleton(beanName, () -> {
						try {
              // AbstractAutowireCapableBeanFactory.createBean
							return createBean(beanName, mbd, args);
						}
						catch (BeansException ex) {
              // 消费单例
							destroySingleton(beanName);
							throw ex;
						}
					});
					beanInstance = getObjectForBeanInstance(sharedInstance, name, beanName, mbd);
				}

				// 原型模式
				else if (mbd.isPrototype()) {
					...
				}
				// 其他作用域
				else {
					...
				}
			}
		}
		// 适配bean实例
		return adaptBeanInstance(name, beanInstance, requiredType);
	}
```

spring中bean拥有5种模式（单例、原型、request、session、global session），该方法里面就通过getMergedLocalBeanDefinition方法整合数据后获取了bean的模式，之后通过不同的作用域去创建不同的bean。下面就是跟着默认的单例bean去走一下大致流程。AbstractBeanFactory的父类的父类就是DefaultSingletonBeanRegistry, getSingleton方法就是去获取单例bean。

```java
public Object getSingleton(String beanName, ObjectFactory<?> singletonFactory) {
		Assert.notNull(beanName, "Bean name must not be null");
		synchronized (this.singletonObjects) {
			Object singletonObject = this.singletonObjects.get(beanName);
			// 缓存单例bean中不存在则创建
			if (singletonObject == null) {
				...
				try {
					// 获取单例对象(最终是调用的AbstractAutowireCapableBeanFactory.createBean)
					singletonObject = singletonFactory.getObject();
					newSingleton = true;
				}
				catch ...
				// 如果是新的单例bean则添加bean到singletonObjects
				if (newSingleton) {
					addSingleton(beanName, singletonObject);
				}
			}
			return singletonObject;
		}
	}
```

![DefaultListableBeanFactory](https://gaoqisen.github.io/GraphBed/202110/20211021112233.png)

现在就去调用AbstractAutowireCapableBeanFactory.createBean方法，整个的调用栈如下可以接口上面的图进行对比

```java
main:41, Test
  getBean:213, AbstractBeanFactory
    doGetBean:339, AbstractBeanFactory
      getSingleton:238, DefaultSingletonBeanRegistry
        // 利用lambda表达式去查询
        lambda$doGetBean$0:341, AbstractBeanFactory
          createBean:505, AbstractAutowireCapableBeanFactory
```

##### 2 createBean

去创建bean的时候主要就是去实例化bean后初始化bean。部分代码如下

```java
protected Object doCreateBean(String beanName, RootBeanDefinition mbd, @Nullable Object[] args)
			throws BeanCreationException {

		// Instantiate the bean.
		BeanWrapper instanceWrapper = null;
		if (mbd.isSingleton()) {
			instanceWrapper = this.factoryBeanInstanceCache.remove(beanName);
		}
		if (instanceWrapper == null) {
			// 创建bean实例化
			instanceWrapper = createBeanInstance(beanName, mbd, args);
		}
    // 解析目标类型
		Object bean = instanceWrapper.getWrappedInstance();
		Class<?> beanType = instanceWrapper.getWrappedClass();
		if (beanType != NullBean.class) {
			mbd.resolvedTargetType = beanType;
		}

		// Allow post-processors to modify the merged bean definition.
		synchronized (mbd.postProcessingLock) {
			if (!mbd.postProcessed) {
				try {
					// 应用合并的bean定义后置处理器
					applyMergedBeanDefinitionPostProcessors(mbd, beanType, beanName);
				}...
				mbd.postProcessed = true;
			}
		}...

		// Initialize the bean instance.
		Object exposedObject = bean;
		try {
			// 准备bean
			populateBean(beanName, mbd, instanceWrapper);
			// 初始化bean
			exposedObject = initializeBean(beanName, exposedObject, mbd);
		}...
	}
```

下面也是分为两步，实例化和初始化。

###### 1.2.1 实例化bean

实例化bean执行的方法主要是createBeanInstance，主要逻辑是先去判断工厂方法是否为空，不为空则直接返回等逻辑。如果为空则去实例化对象

```java
protected BeanWrapper createBeanInstance(String beanName, RootBeanDefinition mbd, @Nullable Object[] args) {
		// Make sure bean class is actually resolved at this point.
		...
		// 如果是提供商的bean则重提供商处获取
		Supplier<?> instanceSupplier = mbd.getInstanceSupplier();
		if (instanceSupplier != null) {
			return obtainFromSupplier(instanceSupplier, beanName);
		}
		// 如果工厂方法名称存在则使用工厂处获取实例化
		if (mbd.getFactoryMethodName() != null) {
			return instantiateUsingFactoryMethod(beanName, mbd, args);
		}

		// Shortcut when re-creating the same bean...
		...
		if (resolved) {
			if (autowireNecessary) {
				// 自动装配构造函数
				return autowireConstructor(beanName, mbd, null, null);
			}
			else {
				// 实例化bean
				return instantiateBean(beanName, mbd);
			}
		}

		// Candidate constructors for autowiring?
		// 重bean的后置处理起确定的构造函数不为空
		Constructor<?>[] ctors = determineConstructorsFromBeanPostProcessors(beanClass, beanName);
		if (ctors != null || mbd.getResolvedAutowireMode() == AUTOWIRE_CONSTRUCTOR ||
				mbd.hasConstructorArgumentValues() || !ObjectUtils.isEmpty(args)) {
			return autowireConstructor(beanName, mbd, ctors, args);
		}

		// Preferred constructors for default construction?
		// 首选构造函数不为空
		ctors = mbd.getPreferredConstructors();
		if (ctors != null) {
			return autowireConstructor(beanName, mbd, ctors, null);
		}

		// No special handling: simply use no-arg constructor.
		// 没有特殊需求，用无参构造器实例化bean
		return instantiateBean(beanName, mbd);
	}
```

最终实例化是调用BeanUtils.instantiateClass方法去反射实例化的类。调用方法链路比较长，下面是调用栈：

```java
doCreateBean:588, AbstractAutowireCapableBeanFactory
	createBeanInstance:1251, AbstractAutowireCapableBeanFactory
    instantiateBean:1346, AbstractAutowireCapableBeanFactory
      instantiate:88, SimpleInstantiationStrategy
        instantiateClass:209, BeanUtils
```

###### 1.2.2 初始化bean

```java
// 初始化bean
	protected Object initializeBean(String beanName, Object bean, @Nullable RootBeanDefinition mbd) {
		if (System.getSecurityManager() != null) {
			AccessController.doPrivileged((PrivilegedAction<Object>) () -> {
				// 调用感知方法
				invokeAwareMethods(beanName, bean);
				return null;
			}, getAccessControlContext());
		}
		else {
			// 调用感知方法
			invokeAwareMethods(beanName, bean);
		}

		Object wrappedBean = bean;
		if (mbd == null || !mbd.isSynthetic()) {
			// 前置处理器初始化
			wrappedBean = applyBeanPostProcessorsBeforeInitialization(wrappedBean, beanName);
		}

		try {
			// 调用初始化方法
			invokeInitMethods(beanName, wrappedBean, mbd);
		}
		catch (Throwable ex) {
			throw new BeanCreationException(
					(mbd != null ? mbd.getResourceDescription() : null),
					beanName, "Invocation of init method failed", ex);
		}
		if (mbd == null || !mbd.isSynthetic()) {
			// 后置处理器初始化
			wrappedBean = applyBeanPostProcessorsAfterInitialization(wrappedBean, beanName);
		}

		return wrappedBean;
	}
```

总结起来在getBean的时候最主要的步骤就是通过反射实例化bean后在给属性赋值最后在进行类的初始化操作。其中初始化又分为调用感知方法、调用感知接口、调用前置处理器初始化方法、调用初始化方法、调用后置初始化方法、最后在销毁对象的时候会调用销毁方法。伪代码如下：

```java
//  bean的生命周期
// 实例化
createBeanInstance
// 属性赋值
populateBean
// 初始化bean
initializeBean
    // 调用感知方法（BeanNameAware）
    invokeAwareMethods
    // 调用感知接口（ApplicationContextAware）
    invokeAwareInterfaces
    // 前置处理器初始化（BeanPostProcessor）
    postProcessBeforeInitialization
    // 调用初始化方法
    invokeInitMethods
    // 后置处理器初始化（BeanPostProcessor）
    postProcessAfterInitialization
		// 返回完整对象   
```

SpringBean的生命周期: 实例化 > 属性赋值 > 初始化 > 销毁

在调用前置处理器的时候，会遍历处理器列表（beanPostProcessors）进行依次执行。而自己写的类实现了BeanPostProcessor，也是会依次执行的。下面就是spring是如何将自定义的BeanPostProcessor如何放到bean后处理器列表中的大致逻辑。

1. 将bean定义信息的beanName分类存放到list里面
2. 遍历后处理器名称区分优先排序后处理器、内部后处理器、有序的后处理器名称、非有序后处理器名称
3. 将internalPostProcessors添加到beanPostProcessors的列表中

### 二、循环依赖

spring的循环依赖是大致使用三级缓存来解决的（构造器无法解决循环依赖，因为构造器每次都要new一个新的实例）。是定义在DefaultSingletonBeanRegistry类里面的三个map属性去进行相应的存储。循环依赖的关键点就是将实例化和初始化分开，在给其他对象赋值的时候不是把完整的bean赋值给对象，而是把半成品赋值给其他对象。

| 别名     | 属性名                | 存储数据                                       |
| -------- | --------------------- | ---------------------------------------------- |
| 一级缓存 | singletonObjects      | 成品bean（实例化&&初始化的bean）               |
| 二级缓存 | earlySingletonObjects | 早期bean(半成品，实例化未初始化的bean)         |
| 三级缓存 | singletonFactories    | 存储的一个lambda表达式(完成代理对象的覆盖过程) |

```java
/** Cache of singleton objects: bean name to bean instance. */
	// 缓存的单例bean(一级缓存)
	private final Map<String, Object> singletonObjects = new ConcurrentHashMap<>(256);

	// 三级缓存（ObjectFactory是一个函数式接口，可以是匿名内部类。本质在于使用aop代理问题 ）
	/** Cache of singleton factories: bean name to ObjectFactory. */
	private final Map<String, ObjectFactory<?>> singletonFactories = new HashMap<>(16);

	// 二级缓存
	/** Cache of early singleton objects: bean name to bean instance. */
	private final Map<String, Object> earlySingletonObjects = new ConcurrentHashMap<>(16);
```

![循环依赖](https://gaoqisen.github.io/GraphBed/202110/20211024111529.png)

流程：







1. 添加a到三级缓存(singletonFactories) 
2. 添加b到三级缓存(singletonFactories) 
3. 添加a到二级缓存(earlySingletonObjects) 
4. 添加b到一级缓存(singletonObjects)，删除二/三级缓存
5. 添加a到一级缓存(singletonObjects)，删除二/三级缓存

