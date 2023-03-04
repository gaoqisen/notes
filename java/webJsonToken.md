---
title: 了解token并用JWT实现
date: 2019-11-06 12:22:26
tags: java token
categories: java
keywords: java
description: 关于token的一些整理，以及用json web token实现token功能。
---

## 一、Token

### 1.1 定义

token是服务器端生成的一串字符串，作为客户端访问服务端的一个令牌。第一次登录时为客户端生成一个token，后期用户登录时只需要传递token用于验证，无需带上用户的用户的帐号和密码。

### 1.2 流程

![https://gaoqisen.github.io/GraphBed/201911/20191106172702.png](https://gaoqisen.github.io/GraphBed/201911/20191106172702.png)

> APP登录的时候发送加密的用户名和密码到服务器，服务器验证用户名和密码，如果成功，以某种方式比如随机生成32位的字符串作为token，存储到服务器中，并返回token到APP，以后APP请求时，凡是需要验证的地方都要带上该token，然后服务器端验证token，成功返回所需要的结果，失败返回错误信息，让他重新登录。其中服务器上token设置一个有效期，每次APP请求的时候都验证token和有效期。

1. 客户端使用用户名跟密码请求登录
2. 服务端收到请求，去验证用户名与密码
3. 验证成功后，服务端会签发一个 Token，再把这个 Token 发送给客户端
4. 客户端收到 Token 以后可以把它存储起来，比如放在 Cookie 里或者 Local Storage 里
5. 客户端每次向服务端请求资源的时候需要带着服务端签发的 Token
6. 服务端收到请求，然后去验证客户端请求里面带着的 Token，如果验证成功，就向客户端返回请求的数据

### 1.3 优势

- 无状态、可扩展: 在客户端存储的Token是无状态的，并且能够被扩展。基于这种无状态和不存储Session信息，负载均衡器能够将用户信息从一个服务传到其他服务器上。如果我们将已验证的用户的信息保存在Session中，则每次请求都需要用户向已验证的服务器发送验证信息(称为Session亲和性)，用户量大时，可能会造成  一些拥堵。然而tokens的无状态性完美解决了这个问题。

- 安全性: 请求中发送token而不再是发送cookie能够防止CSRF(跨站请求伪造)。即使在客户端使用cookie存储token，cookie也仅仅是一个存储机制而不是用于认证。不将信息存储在Session中，让我们少了对session操作。token是有时效的，一段时间之后用户需要重新验证。我们也不一定需要等到token自动失效，token有撤回的操作，通过token revocataion可以使一个特定的token或是一组有相同认证的token无效。
    ![https://gaoqisen.github.io/GraphBed/201911/20191106174115.png](https://gaoqisen.github.io/GraphBed/201911/20191106174115.png)

- 可扩展性: Tokens能够创建与其它程序共享权限的程序。个人理解就是自己可以提供一个类似第三方登录的功能，其他程序集成自己的登录，通过token授权

- 多平台跨域: CORS(跨域资源共享)，对应用程序和服务进行扩展的时候，需要介入各种各样的设备和应用程序。只要用户有一个通过了验证的token，数据和资源就能够在任何域上被请求到。

## 二、JWT（Json Web Token）

### 2.1 原理

- 服务端认证之后生成一个json对象，返回给客服端如

    ```
    {"姓名","test"，"角色":"学生"}  // 返回一个json串
    pC5jRyXsdYWwpC5jRyXsdYWw==  // 或者一串AES加密串保存用户姓名等
    ```

- 后面每次访问服务器的时候都将这段数据传给服务器，服务器只依靠这个就判断认定用户身份。为了防止用户篡改数据，服务器在生成这个对象的时候，会加上签名。

- 服务器不保存任何session信息，这样服务器就是无状态的了，后面添加负载也更容易

### 2.2 结构

JWT返回的token分为3段，Header（头部），Payload（负载），Signature（签名）。分别用 . 隔开（Header.Payload.Signature）。如(点后面没有回车)：
 ```
eyJhbGciOiJIUzI1NiJ9.
eyJqdGkiOiJpbnNwdXIiLCJpYXQiOjE1NzMwMzAwNjQsInN1YiI6InFCMmNiNUFuMkg5WGovWEF5SVhucWc9PVxyXG4iLCJleHAiOjE1NzMxMTY0NjR9.
eUIzHeBqYKtWM9owo36FzFaJByn0K1MP2n_rXSm4Xa4
 ```

JSON 对象使用 Base64URL 算法解密后

![https://gaoqisen.github.io/GraphBed/201911/20191106172940.png](https://gaoqisen.github.io/GraphBed/201911/20191106172940.png)


 - Header：描述 JWT 的元数据（JSON 对象使用 Base64URL 算法）。

   ``` 
    {
      "alg": "HS256",
      "typ": "JWT"
    }
   ```
   
    lg属性表示签名的算法（algorithm），默认是 HMAC SHA256（写成 HS256）；typ属性表示这个令牌（token）的类型（type），JWT 令牌统一写为JWT
   
 - Payload: 用来存放实际需要传递的数据（JSON 对象也要使用 Base64URL 算法转成字符串）。JWT 规定了7个官方字段:

    ```
    iss (issuer)：签发人
    exp (expiration time)：过期时间
    sub (subject)：主题
    aud (audience)：受众
    nbf (Not Before)：生效时间
    iat (Issued At)：签发时间
    jti (JWT ID)：编号
    ```
    
    除了官方字段，也可以在这个部分定义私有字段。但是JWT 默认是不加密的，任何人都可以读到，所以不要把秘密信息放在这个部分。
    
- Signature: 是对前两部分的签名，防止数据篡改。

    * 需要指定一个密钥（secret）。这个密钥只有服务器才知道，不能泄露给用户。然后，使用 Header 里面指定的签名算法（默认是 HMAC SHA256），按照下面的公式产生签名。
    * 算出签名以后，把 Header、Payload、Signature 三个部分拼成一个字符串，每个部分之间用"点"（.）分隔，就可以返回给用户。
    
 ```
     HMACSHA256(
     base64UrlEncode(header) + "." +
     base64UrlEncode(payload),
     secret)
 ```

   > Base64 有三个字符+、/和=，在 URL 里面有特殊含义，所以要被替换掉：=被省略、+替换成-，/替换成_ 。这就是 Base64URL 算法

### 2.3 特点

- 默认是不加密，但也是可以加密的。生成原始 Token 以后，可以用密钥再加密一次。   
- 不加密的情况下，不能将秘密数据写入 JWT
- 不仅可以用于认证，也可以用于交换信息。有效使用 JWT，可以降低服务器查询数据库的次数
- 最大的缺点是由于服务器不保存 session 状态，因此无法在使用过程中废止某个 token，或者更改 token 的权限。也就是说，一旦 JWT 签发了，在到期之前就会始终有效，除非服务器部署额外的逻辑
- 本身包含了认证信息，一旦泄露，任何人都可以获得该令牌的所有权限。为了减少盗用，JWT 的有效期应该设置得比较短。对于一些比较重要的权限，使用时应该再次对用户进行认证
- 为了减少盗用，JWT 不应该使用 HTTP 协议明码传输，要使用 HTTPS 协议传输。

## 三、SpringBoot使用

### 3.1 maven依赖

```xml
<dependency>
  <groupId>io.jsonwebtoken</groupId>
  <artifactId>jjwt</artifactId>
  <version>0.9.1</version>
</dependency>
```

### 3.2 工具类

```java
import javax.crypto.SecretKey;
import java.util.Date;
import javax.crypto.spec.SecretKeySpec;
import io.jsonwebtoken.*;
import org.apache.commons.codec.binary.Base64;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * @ClassName JwtUtil
 * @Author gaoqisen
 * @Date 2019-11-05
 * @Version 1.0
 */
public class JwtUtil {

    private static final Logger logger = LoggerFactory.getLogger(ApacheHttpClient.class);

    /**
     * 由字符串生成加密key
     * @return
     */
    public SecretKey generalKey(){
        //本地配置文件中加密的密文7786df7fc3a34e26a61c034d5ec8245d
        String stringKey = TokenConstant.JWT_SECRET;
        //本地的密码解码[B@152f6e2786df7fc3a34e26a61c034d5ec8245d
        byte[] encodedKey = Base64.decodeBase64(stringKey);
        // 根据给定的字节数组使用AES加密算法构造一个密钥，使用 encodedKey中的始于且包含 0 到前 leng 个字节这是当然是所有。
        SecretKey key = new SecretKeySpec(encodedKey, 0, encodedKey.length, "AES");
        return key;
    }

    /**
     * 创建jwt
     * @param id
     * @param subject
     * @param ttlMillis
     * @return
     * @throws Exception
     */
    public String createJWT(String id, String subject, long ttlMillis) throws Exception{

        SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;
        long nowMillis = System.currentTimeMillis();
        Date now = new Date(nowMillis);
        //创建payload的私有声明（根据特定的业务需要添加，如果要拿这个做验证，一般是需要和jwt的接收方提前沟通好验证方式的）
        //Map<String,Object> claims = new HashMap<String,Object>();
        //claims.put("uid", "CVLm6KSSSkeNRg5pMqop2w");
        //claims.put("user_name", "admin");
        //claims.put("nick_name","DASDA121");
        SecretKey key = generalKey();
        JwtBuilder builder = Jwts.builder()
                //如果有私有声明，一定要先设置这个自己创建的私有的声明，这个是给builder的claim赋值，一旦写在标准的声明赋值之后，就是覆盖了那些标准的声明的
                //.setClaims(claims)
                .setId(id)
                .setIssuedAt(now)
                .setSubject(subject)
                .signWith(signatureAlgorithm, key);
        if (ttlMillis >= 0) {
            long expMillis = nowMillis + ttlMillis;
            Date exp = new Date(expMillis);
            //设置过期时间
            builder.setExpiration(exp);
        }
        //就开始压缩为xxxxxxxxxxxxxx.xxxxxxxxxxxxxxx.xxxxxxxxxxxxx这样的jwt
        return builder.compact();
    }

    /**
     * 解密jwt
     * @param jwt
     * @return
     * @throws Exception
     */
    public Claims parseJWT(String jwt) throws Exception{
        SecretKey key = generalKey();
        Claims claims = Jwts.parser()
                .setSigningKey(key)
                .parseClaimsJws(jwt).getBody();
        return claims;
    }

    /**
     * 校验jwt
     * @param jwt
     * @return
     * @throws
     */
    public boolean validateJWT(String jwt) {
        boolean flag = false;
        try {
            parseJWT(jwt);
            flag = true;
        } catch (ExpiredJwtException e) {
            logger.error("token过期");
        } catch (SignatureException e) {
            logger.error("签名校验失败");
        } catch (Exception e) {
            logger.error("其它错误");
        }
        return flag;
    }
}
```

### 3.3 常量

```java
public static final String JWT_ID = "jwt";
    public static final String JWT_SECRET = "26e4b9wqrfe444568f24232108460891";
    public static final int JWT_TTL = 1*60*60*1000; // 60*60*1000;  //过期时间（毫秒）
```

### 3.4 接口开发

```java
    public JSONObject getToken(String msg) {
        JSONObject json = new JSONObject();
        JwtUtil util = new JwtUtil();
        try {
            String token = util.createJWT(TokenConstant.JWT_ID, msg TokenConstant.JWT_TTL);
            json.put("state", "ok");
            json.put("token", token);
        } catch (Exception e) {
            json.put("state","error");
            json.put("msg", "Token处理失败");
        }
        return json;
    }
    public JSONObject checkToken(String token) {
        JSONObject json = new JSONObject();
        JwtUtil jwt = new JwtUtil();
        boolean rs = jwt.validateJWT(token);
        json.put("state","ok");
        json.put("token", rs);
        return json;
    }
    public JSONObject getUserInfoByToken(String token) {
        JSONObject json = new JSONObject();
        JwtUtil jwt = new JwtUtil();
        boolean rs = jwt.validateJWT(token);
        if (!rs) {
            json.put("state", "error");
            json.put("msg", "Token验证失败");
            return json;
        }
        try {
            // 通过用户帐号获取用户信息
            Claims claims = jwt.parseJWT(token);
            String id = claims.getSubject();
            // 处理业务逻辑
        } catch (Exception e) {
            e.printStackTrace();
        }
        return json;
    }
}
```
注: 网上说jwt只能抗2w并发， 如果并发过大会出现问题。（待验证）