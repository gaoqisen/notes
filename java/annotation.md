---
title: Annotation学习
date: 2019-10-26 12:22:40
tags: java
categories: java
keywords: java
description: java自定义注解的一些使用方法
---
## 一、基本概述

- Annontation是Java5开始引入的新特征。中文名称一般叫注解。它提供了一种安全的类似注释的机制，用来将任何的信息或元数据（metadata）与程序元素（类、方法、成员变量等）进行关联测试。
- 更通俗的意思是为程序的元素（类、方法、成员变量）加上更直观更明了的说明，这些说明信息是与程序的业务逻辑无关，并且是供指定的工具或框架使用的。
- Annontation像一种修饰符一样，应用于包、类型、构造方法、方法、成员变量、参数及本地变量的声明语句中。

## 二、原理

- Annotation其实是一种接口。通过Java的反射机制相关的API来访问Annotation信息。相关类（框架或工具中的类即使用注解的类）根据这些信息来决定如何使用该程序元素或改变它们的行为。
- Annoation和程序代码的隔离性：Annotation是不会影响程序代码的执行，无论Annotation怎么变化，代码都始终如一地执行。

```java
// @Before 切入点开始处切入内容
// @After 切入点结尾处切入内容
// @AfterReturning 切入点return内容之后切入内容
// @Around在切入点前后切入内容，并自己控制何时执行切入点自身的内容
// @AfterThrowing用来处理当切入内容部分抛出异常之后的处理逻辑

try{  
     try{  
         // 对应@Before注解的方法切面逻辑
         doBefore();  
         method.invoke();  
     }finally{  
         // 对应@After注解的方法切面逻辑
         doAfter();  
     }  
     // 对应@AfterReturning注解的方法切面逻辑
     doAfterReturning();  
 }catch(Exception e){  
      // 对应@AfterThrowing注解的方法切面逻辑 
      doAfterThrowing(); 
 }  
```



## 三、元注解

### 3.1 @Target：注解的作用目标

- ElementType.TYPE：允许被修饰的注解作用在类、接口、注解和枚举上
- ElementType.FIELD：允许作用在属性字段上
- ElementType.METHOD：允许作用在方法上
- ElementType.PARAMETER：允许作用在方法参数上
- ElementType.CONSTRUCTOR：允许作用在构造器上
- ElementType.LOCAL_VARIABLE：允许作用在本地局部变量上
- ElementType.ANNOTATION_TYPE：允许作用在注解上
- ElementType.PACKAGE：允许作用在包上

### 3.2 @Retention：注解的生命周期

- RetentionPolicy.SOURCE：当前注解编译期可见，不会写入 class 文件
- RetentionPolicy.CLASS：类加载阶段丢弃，会写入 class 文件
- RetentionPolicy.RUNTIME：永久保存，可以反射获取

### 3.3 @Documented：

注解是否应当被包含在 JavaDoc 文档中

### 3.4 @Inherited

允许子类继承该注解,但不能从接口继承注解

#### 3.5 @Repeatable

该注解可以在同一个地方被重复使用多次

## 四、实践

### 4.1 Log注解

#### 4.1.1 目标

为了简化代码只需要添加一个注解就可以记录关键接口的日志，便于后期排查问题

#### 4.1.2 定义注解

```java
import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
/**
 * 自定义日志注解
 * @author gaoqisen
 *
 */
@Documented
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface Log {
	String value() default "";
}
```

#### 4.1.3 Aspect实现逻辑

```java
import java.lang.reflect.Method;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.LocalVariableTableParameterNameDiscoverer;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@Aspect
@Component
public class LogAspect {
	@Autowired
	private CommonService commonServcie;
	/**
	 * 切入点
	 */
	@Pointcut("@annotation(cn.annotation.Log)")
	public void pointcut() {
	}
	@Around("pointcut()")
	public Object around(ProceedingJoinPoint point) {
		Object result = null;
        long beginTime = System.currentTimeMillis();
        try {
            // 执行方法
            result = point.proceed();
        } catch (Throwable e) {
        	e.printStackTrace();
        	throw new AppException(e.getMessage());
        }
        // 执行时长(毫秒)
        long time = System.currentTimeMillis() - beginTime;
        // 保存日志
        saveLog(point, time);
        return result;
	}
	private void saveLog(ProceedingJoinPoint joinPoint, long time) {
		MethodSignature signature = (MethodSignature) joinPoint.getSignature();
        Method method = signature.getMethod();
        SysLog sysLog = new SysLog();
        Log logAnnotation = method.getAnnotation(Log.class);
        if (logAnnotation != null) {
            // 注解上的描述
            sysLog.setOperation(logAnnotation.value());
        }
        // 请求的方法名
        String className = joinPoint.getTarget().getClass().getName();
        String methodName = signature.getName();
        sysLog.setMethods(className + "." + methodName + "方法");
        // 请求的方法参数值
        Object[] args = joinPoint.getArgs();
        // 请求的方法参数名称
        LocalVariableTableParameterNameDiscoverer u = new LocalVariableTableParameterNameDiscoverer();
        String[] paramNames = u.getParameterNames(method);
        if (args != null && paramNames != null) {
        	String params = "";
            for (int i = 0; i < args.length; i++) {
                params += "  " + paramNames[i] + ": " + args[i];
            }
            sysLog.setParms(params);
        }
        // 获取request
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        Object obj = request.getSession().getAttribute("user");
        // 设置IP地址
        String ip = RequestUtil.getIpAddress(request);
        sysLog.setIp(ip);
        sysLog.setAddress(RequestUtil.getAddressByIp(ip));
        // 模拟一个用户名
        if(obj != null) {
        	User user = (User) obj;
        	sysLog.setUser_name(user.getUsername());
        	sysLog.setUser_id(user.getId());
        } else {
        	sysLog.setUser_name("未知");
        }
        sysLog.setBaseData();
        sysLog.setTime((int) time);
        // 保存系统日志
        this.commonServcie.inster("sys_log", sysLog);
	}
	private String replaceBlank(String s) {
	    String result= null;
	    if (s == null) {
	        return result;
	    } else {
	        Pattern p = Pattern.compile("\\s*|\t|\r|\n");
	        Matcher m = p.matcher(s);
	        result= m.replaceAll("");
	        return result;
	    }
	}
}
```

### 4.2 Validation注解校验

#### 4.2.1 目标

Validation用于校验是特别方便的，但是官方提供的注解可能不满足自己的需要，因此自定义注解用于数据校验

#### 4.2.1 定义注解

```java
@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = LengthInvalidatorImpl.class)
@Documented
public @interface MaxLength {

    // 字段支持的最大长度(字符数)
    int maxLength() default 5;

    // 校验失败后返回的错误信息
    String message() default "超过最大长度";

    // 分组
    Class<?>[] groups() default {};

    // 负载
    Class<? extends Payload>[] payload() default {};

}
```

#### 4.2.3 Aspect实现逻辑

```java
/**
 * 最大长度校验实现类
 */
public class LengthInvalidatorImpl implements ConstraintValidator<MaxLength, String> {

    private MaxLength maxLength;

    /**
     * 初始化数据
     * @param constraintAnnotation 注解类
     */
    @Override
    public void initialize(MaxLength constraintAnnotation) {
        maxLength = constraintAnnotation;
    }

    /**
     * 校验是否有效
     *
     * @param fieldValue 字段值
     * @param context 限制校验上下文
     * @return 是否有效
     */
    @Override
    public boolean isValid(String fieldValue, ConstraintValidatorContext context) {

        if (fieldValue.length() > maxLength.maxLength()) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate(maxLength.message()).addConstraintViolation();
            // 校验失败返回false。返回true上游收集不到错误信息。
            return false;
        }
        return false;
    }
}
```

#### 4.2.4 手动校验工具

```java
/**
 * validation校验工具
 */
public class ValidationUtils {

    private static Validator validation = Validation.buildDefaultValidatorFactory().getValidator();

    /**
     * 校验实体
     * @param obj 需要校验的对象
     */
    public static void validationEntity(Object obj) {
        Set<ConstraintViolation<Object>> constraintViolations = validation.validate(obj);
        for (ConstraintViolation<Object> constraintViolation : constraintViolations) {
            String message = constraintViolation.getMessage();
            throw new AppException(message);
        }
    }

}
```



### 4.3 Redis缓存

#### 4.3.1 目标

很多地方都需要进行redis缓存，为了简化代码用注解实现redis缓存，方便后期使用

#### 4.3.2 定义注解

```java
/**
 * redis缓存
 *
 * @author gaoqisen
 */
@Target({ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface RedisCache {

    /**
     * 缓存key
     */
    String key() default "";

    /**
     * 缓存时间（单位秒）
     * 默认缓存30分钟
     */
    int time() default 60 * 30;

    /**
     * 业务key
     * 例子: #obj.attribute
     */
    String bizKey() default "";
}
```

#### 4.3.3 Aspect实现逻辑

```java
@Slf4j
@Aspect
@Component
@Order(10)
public class RedisCacheAspect {

    private final StringRedisTemplate stringRedisTemplate;

    public RedisCacheAspect(StringRedisTemplate stringRedisTemplate) {
        this.stringRedisTemplate = stringRedisTemplate;
    }


    @Pointcut(value = "@annotation(com.gaoqisen.RedisCache)")
    public void redisCacheAspectPointcut() {}

    @Around("redisCacheAspectPointcut()")
    public Object redisCache(ProceedingJoinPoint joinPoint) throws Throwable {
        MethodSignature signature = (MethodSignature) joinPoint.getSignature();
        Method method = signature.getMethod();
        RedisCache annotation = method.getAnnotation(RedisCache.class);

        String key = annotation.key();
        int time = annotation.time();
        String bizKey = annotation.bizKey();

        String redisKey;
        if(UT.Str.isNullOrEmpty(bizKey)) {
            redisKey = RedisKeySupport.generateCommonKey(key);
        } else {
            ExpressionParser parser=new SpelExpressionParser();
            EvaluationContext ctx = new StandardEvaluationContext();

            //获取方法的参数名和参数值
            List<String> paramNameList = Arrays.asList(signature.getParameterNames());
            List<Object> paramList = Arrays.asList(joinPoint.getArgs());

            //将方法的参数名和参数值一一对应的放入上下文中
            for (int i = 0; i < paramNameList.size(); i++) {
                ctx.setVariable(paramNameList.get(i), paramList.get(i));
            }

            //解析SpEL表达式获取值
            String value = parser.parseExpression(bizKey).getValue(ctx).toString();
          
            //解析后的业务代码
            redisKey = RedisKeySupport.generateCommonKey(key, value);
        }
        String dataStr = stringRedisTemplate.opsForValue().get(redisKey);
        if(UT.Str.isNotBlank(dataStr)) {
            Object obj = SerializeUtils.str2Object(dataStr);
            log.info("Redis切面缓存-缓存命中: {}", UT.Json.toJSONString(obj));
            return obj;
        }

        log.info("Redis切面未命中缓存-请求接口获取数据 redisKey: {}", redisKey);
        Object obj = joinPoint.proceed();
        stringRedisTemplate.opsForValue().set(redisKey, SerializeUtils.object2Str(obj), time, TimeUnit.SECONDS);
        return obj;
    }

}
```

#### 4.3.4 缓存序列化工具

```java
public class SerializeUtils {

    public static final String CHARSET_NAME = "ISO-8859-1";

    /**
     * 对象转字符串
     */
    public static String object2Str(Object obj) throws Exception {
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        ObjectOutputStream objectOutputStream = new ObjectOutputStream(byteArrayOutputStream);
        objectOutputStream.writeObject(obj);

        String objectStr = byteArrayOutputStream.toString(CHARSET_NAME);
        byteArrayOutputStream.close();
        objectOutputStream.close();
        return objectStr;
    }

    /**
     * 字符串转对象
     */
    public static Object str2Object(String str) throws Exception {
        ByteArrayInputStream byteArrayOutputStream = new ByteArrayInputStream(str.getBytes(CHARSET_NAME));
        ObjectInputStream objectInputStream = new ObjectInputStream(byteArrayOutputStream);
        Object object = objectInputStream.readObject();

        byteArrayOutputStream.close();
        objectInputStream.close();
        return object;
    }

}
```

