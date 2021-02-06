---
title: SpringSecurity
date: 2020-02-06 10:36:18
tags: java security
categories: java
keywords: java
description: 关于SpringSecurity的一些学习整理
---



## 官方

- OAuth sql

    ```
    https://github.com/spring-projects/spring-security-oauth/blob/master/spring-security-oauth2/src/test/resources/schema.sql
    ```
    
- pom.xml
    
    ```pom
     <!-- Spring Security -->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-oauth2</artifactId>
        </dependency>
    ```

## 配置

### 创建配置类

```java
@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true, securedEnabled = true, jsr250Enabled = true)
public class WebSecurityConfiguration extends WebSecurityConfigurerAdapter {
}
```    
    
### 配置用户信息

```java
@Bean
    @Override
    protected UserDetailsService userDetailsService() {
        return new UserDetailsServiceImpl();
    }
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {

        // 通过数据库创建
        auth.userDetailsService(userDetailsService());

//        // 在内存中创建用户
//        auth.inMemoryAuthentication()
//                .withUser("user").password(passwordEncoder().encode("123456")).roles("USER")
//                .and()
//                .withUser("admin").password(passwordEncoder().encode("admin888")).roles("ADMIN");
    }
```

### 配置拦截路径

```java
@Override
    protected void configure(HttpSecurity http) throws Exception {
        // 自定义login.html登录界面
        http.formLogin().loginPage("/login")
                // .loginProcessingUrl("/login) //form 表单action
                .failureHandler(failureHandler)
                .successHandler(successHandler)
                //.usernameParameter("uname")
                //.passwordParameter("psd")
                .and()
                .authorizeRequests()
                // 一定要把自定义登录界面给放开权限。即.antMatchers("/login").permitAll(),否则就是死循环。
                .antMatchers("/login").permitAll()
                // 除了login.html页面以外都需要身份认证 （一定要记得添加这一句，否则就是死循环）
                .anyRequest()
                .authenticated();
    }
```

### 启用HTTPS

```java
@Override
    protected void configure(HttpSecurity http) throws Exception
    {
        http.authorizeRequests()
                .anyRequest().permitAll()
                .and()
                .requiresChannel()
                .antMatchers("/bankInfo").requiresSecure()  // enable HTTPS
                .antMatchers("/").requiresInsecure();       // disable HTTPS
    }
```

### 禁用CSRF

```java
@Override
    protected void configure(HttpSecurity http) throws Exception
    {
        http.authorizeRequests()
                .anyRequest().permitAll()
                .and()
                .csrf().disable();
    }
```

### 启用默认登录页

```java
@Override
    protected void configure(HttpSecurity http) throws Exception
    {
        http.authorizeRequests()
                .anyRequest().permitAll()
                .and()
                .formLogin();
    }
```

### 自定义登录页面

```java
// 指定URL
@Override
    protected void configure(HttpSecurity http) throws Exception
    {
        http.authorizeRequests()
                .anyRequest().permitAll()
                .and()
                .formLogin().loginPage("/login");
    }
    // 指定自定义页面
    @Override
   public void addViewControllers(ViewControllerRegistry registry) {
      registry.addViewController("/login").setViewName("login");
   }
```


## 测试

- 登录获取code

    ```url
    http://localhost:8082/oauth/authorize?client_id=client&response_type=code
    ```
- 通过code获取token

    ```
    curl -X POST -H "Content-Type: application/x-www-form-urlencoded" -d 'grant_type=authorization_code&code=7JpO0c' "http://client:secret@localhost:8082/oauth/token"
    ```
- 通过token获取数据

    ```
    curl --location --request GET "http://localhost:8081/contents" --header "Content-Type: application/json" --header "Authorization: Bearer 23e0070c-4fc6-4e6f-a3e8-9e170c8e74e6"
    ```