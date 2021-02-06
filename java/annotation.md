---
title: Annotation学习
date: 2019-10-26 12:22:40
tags: java
categories: java
keywords: java
description: java自定义注解的一些使用方法
---
## 基本概述

- Annontation是Java5开始引入的新特征。中文名称一般叫注解。它提供了一种安全的类似注释的机制，用来将任何的信息或元数据（metadata）与程序元素（类、方法、成员变量等）进行关联。
- 更通俗的意思是为程序的元素（类、方法、成员变量）加上更直观更明了的说明，这些说明信息是与程序的业务逻辑无关，并且是供指定的工具或框架使用的。
- Annontation像一种修饰符一样，应用于包、类型、构造方法、方法、成员变量、参数及本地变量的声明语句中。

## 原理

- Annotation其实是一种接口。通过Java的反射机制相关的API来访问Annotation信息。相关类（框架或工具中的类即使用注解的类）根据这些信息来决定如何使用该程序元素或改变它们的行为。
- Annoation和程序代码的隔离性：Annotation是不会影响程序代码的执行，无论Annotation怎么变化，代码都始终如一地执行。

## 实践

### 自定义Log注解

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

### 用Aop实现注解逻辑

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

## 元注解

* @Target：注解的作用目标
    - ElementType.TYPE：允许被修饰的注解作用在类、接口和枚举上
    - ElementType.FIELD：允许作用在属性字段上
    - ElementType.METHOD：允许作用在方法上
    - ElementType.PARAMETER：允许作用在方法参数上
    - ElementType.CONSTRUCTOR：允许作用在构造器上
    - ElementType.LOCAL_VARIABLE：允许作用在本地局部变量上
    - ElementType.ANNOTATION_TYPE：允许作用在注解上
    - ElementType.PACKAGE：允许作用在包上
* @Retention：注解的生命周期
    - RetentionPolicy.SOURCE：当前注解编译期可见，不会写入 class 文件
   - RetentionPolicy.CLASS：类加载阶段丢弃，会写入 class 文件
   - RetentionPolicy.RUNTIME：永久保存，可以反射获取
* @Documented：注解是否应当被包含在 JavaDoc 文档中
* @Inherited：是否允许子类继承该注解

