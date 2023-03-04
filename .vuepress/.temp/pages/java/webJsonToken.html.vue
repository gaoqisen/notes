<template><div><h2 id="一、token" tabindex="-1"><a class="header-anchor" href="#一、token" aria-hidden="true">#</a> 一、Token</h2>
<h3 id="_1-1-定义" tabindex="-1"><a class="header-anchor" href="#_1-1-定义" aria-hidden="true">#</a> 1.1 定义</h3>
<p>token是服务器端生成的一串字符串，作为客户端访问服务端的一个令牌。第一次登录时为客户端生成一个token，后期用户登录时只需要传递token用于验证，无需带上用户的用户的帐号和密码。</p>
<h3 id="_1-2-流程" tabindex="-1"><a class="header-anchor" href="#_1-2-流程" aria-hidden="true">#</a> 1.2 流程</h3>
<p><img src="https://gaoqisen.github.io/GraphBed/201911/20191106172702.png" alt="https://gaoqisen.github.io/GraphBed/201911/20191106172702.png"></p>
<blockquote>
<p>APP登录的时候发送加密的用户名和密码到服务器，服务器验证用户名和密码，如果成功，以某种方式比如随机生成32位的字符串作为token，存储到服务器中，并返回token到APP，以后APP请求时，凡是需要验证的地方都要带上该token，然后服务器端验证token，成功返回所需要的结果，失败返回错误信息，让他重新登录。其中服务器上token设置一个有效期，每次APP请求的时候都验证token和有效期。</p>
</blockquote>
<ol>
<li>客户端使用用户名跟密码请求登录</li>
<li>服务端收到请求，去验证用户名与密码</li>
<li>验证成功后，服务端会签发一个 Token，再把这个 Token 发送给客户端</li>
<li>客户端收到 Token 以后可以把它存储起来，比如放在 Cookie 里或者 Local Storage 里</li>
<li>客户端每次向服务端请求资源的时候需要带着服务端签发的 Token</li>
<li>服务端收到请求，然后去验证客户端请求里面带着的 Token，如果验证成功，就向客户端返回请求的数据</li>
</ol>
<h3 id="_1-3-优势" tabindex="-1"><a class="header-anchor" href="#_1-3-优势" aria-hidden="true">#</a> 1.3 优势</h3>
<ul>
<li>
<p>无状态、可扩展: 在客户端存储的Token是无状态的，并且能够被扩展。基于这种无状态和不存储Session信息，负载均衡器能够将用户信息从一个服务传到其他服务器上。如果我们将已验证的用户的信息保存在Session中，则每次请求都需要用户向已验证的服务器发送验证信息(称为Session亲和性)，用户量大时，可能会造成  一些拥堵。然而tokens的无状态性完美解决了这个问题。</p>
</li>
<li>
<p>安全性: 请求中发送token而不再是发送cookie能够防止CSRF(跨站请求伪造)。即使在客户端使用cookie存储token，cookie也仅仅是一个存储机制而不是用于认证。不将信息存储在Session中，让我们少了对session操作。token是有时效的，一段时间之后用户需要重新验证。我们也不一定需要等到token自动失效，token有撤回的操作，通过token revocataion可以使一个特定的token或是一组有相同认证的token无效。
<img src="https://gaoqisen.github.io/GraphBed/201911/20191106174115.png" alt="https://gaoqisen.github.io/GraphBed/201911/20191106174115.png"></p>
</li>
<li>
<p>可扩展性: Tokens能够创建与其它程序共享权限的程序。个人理解就是自己可以提供一个类似第三方登录的功能，其他程序集成自己的登录，通过token授权</p>
</li>
<li>
<p>多平台跨域: CORS(跨域资源共享)，对应用程序和服务进行扩展的时候，需要介入各种各样的设备和应用程序。只要用户有一个通过了验证的token，数据和资源就能够在任何域上被请求到。</p>
</li>
</ul>
<h2 id="二、jwt-json-web-token" tabindex="-1"><a class="header-anchor" href="#二、jwt-json-web-token" aria-hidden="true">#</a> 二、JWT（Json Web Token）</h2>
<h3 id="_2-1-原理" tabindex="-1"><a class="header-anchor" href="#_2-1-原理" aria-hidden="true">#</a> 2.1 原理</h3>
<ul>
<li>
<p>服务端认证之后生成一个json对象，返回给客服端如</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>{"姓名","test"，"角色":"学生"}  // 返回一个json串
pC5jRyXsdYWwpC5jRyXsdYWw==  // 或者一串AES加密串保存用户姓名等
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>后面每次访问服务器的时候都将这段数据传给服务器，服务器只依靠这个就判断认定用户身份。为了防止用户篡改数据，服务器在生成这个对象的时候，会加上签名。</p>
</li>
<li>
<p>服务器不保存任何session信息，这样服务器就是无状态的了，后面添加负载也更容易</p>
</li>
</ul>
<h3 id="_2-2-结构" tabindex="-1"><a class="header-anchor" href="#_2-2-结构" aria-hidden="true">#</a> 2.2 结构</h3>
<p>JWT返回的token分为3段，Header（头部），Payload（负载），Signature（签名）。分别用 . 隔开（Header.Payload.Signature）。如(点后面没有回车)：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>eyJhbGciOiJIUzI1NiJ9.
eyJqdGkiOiJpbnNwdXIiLCJpYXQiOjE1NzMwMzAwNjQsInN1YiI6InFCMmNiNUFuMkg5WGovWEF5SVhucWc9PVxyXG4iLCJleHAiOjE1NzMxMTY0NjR9.
eUIzHeBqYKtWM9owo36FzFaJByn0K1MP2n_rXSm4Xa4
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>JSON 对象使用 Base64URL 算法解密后</p>
<p><img src="https://gaoqisen.github.io/GraphBed/201911/20191106172940.png" alt="https://gaoqisen.github.io/GraphBed/201911/20191106172940.png"></p>
<ul>
<li>
<p>Header：描述 JWT 的元数据（JSON 对象使用 Base64URL 算法）。</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code> {
   "alg": "HS256",
   "typ": "JWT"
 }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>lg属性表示签名的算法（algorithm），默认是 HMAC SHA256（写成 HS256）；typ属性表示这个令牌（token）的类型（type），JWT 令牌统一写为JWT</p>
</li>
<li>
<p>Payload: 用来存放实际需要传递的数据（JSON 对象也要使用 Base64URL 算法转成字符串）。JWT 规定了7个官方字段:</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>iss (issuer)：签发人
exp (expiration time)：过期时间
sub (subject)：主题
aud (audience)：受众
nbf (Not Before)：生效时间
iat (Issued At)：签发时间
jti (JWT ID)：编号
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>除了官方字段，也可以在这个部分定义私有字段。但是JWT 默认是不加密的，任何人都可以读到，所以不要把秘密信息放在这个部分。</p>
</li>
<li>
<p>Signature: 是对前两部分的签名，防止数据篡改。</p>
<ul>
<li>需要指定一个密钥（secret）。这个密钥只有服务器才知道，不能泄露给用户。然后，使用 Header 里面指定的签名算法（默认是 HMAC SHA256），按照下面的公式产生签名。</li>
<li>算出签名以后，把 Header、Payload、Signature 三个部分拼成一个字符串，每个部分之间用&quot;点&quot;（.）分隔，就可以返回给用户。</li>
</ul>
</li>
</ul>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>    HMACSHA256(
    base64UrlEncode(header) + "." +
    base64UrlEncode(payload),
    secret)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>Base64 有三个字符+、/和=，在 URL 里面有特殊含义，所以要被替换掉：=被省略、+替换成-，/替换成_ 。这就是 Base64URL 算法</p>
</blockquote>
<h3 id="_2-3-特点" tabindex="-1"><a class="header-anchor" href="#_2-3-特点" aria-hidden="true">#</a> 2.3 特点</h3>
<ul>
<li>默认是不加密，但也是可以加密的。生成原始 Token 以后，可以用密钥再加密一次。</li>
<li>不加密的情况下，不能将秘密数据写入 JWT</li>
<li>不仅可以用于认证，也可以用于交换信息。有效使用 JWT，可以降低服务器查询数据库的次数</li>
<li>最大的缺点是由于服务器不保存 session 状态，因此无法在使用过程中废止某个 token，或者更改 token 的权限。也就是说，一旦 JWT 签发了，在到期之前就会始终有效，除非服务器部署额外的逻辑</li>
<li>本身包含了认证信息，一旦泄露，任何人都可以获得该令牌的所有权限。为了减少盗用，JWT 的有效期应该设置得比较短。对于一些比较重要的权限，使用时应该再次对用户进行认证</li>
<li>为了减少盗用，JWT 不应该使用 HTTP 协议明码传输，要使用 HTTPS 协议传输。</li>
</ul>
<h2 id="三、springboot使用" tabindex="-1"><a class="header-anchor" href="#三、springboot使用" aria-hidden="true">#</a> 三、SpringBoot使用</h2>
<h3 id="_3-1-maven依赖" tabindex="-1"><a class="header-anchor" href="#_3-1-maven依赖" aria-hidden="true">#</a> 3.1 maven依赖</h3>
<div class="language-xml line-numbers-mode" data-ext="xml"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>io.jsonwebtoken<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>jjwt<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>0.9.1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-工具类" tabindex="-1"><a class="header-anchor" href="#_3-2-工具类" aria-hidden="true">#</a> 3.2 工具类</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">javax<span class="token punctuation">.</span>crypto<span class="token punctuation">.</span></span><span class="token class-name">SecretKey</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">Date</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">javax<span class="token punctuation">.</span>crypto<span class="token punctuation">.</span>spec<span class="token punctuation">.</span></span><span class="token class-name">SecretKeySpec</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">io<span class="token punctuation">.</span>jsonwebtoken<span class="token punctuation">.</span></span><span class="token operator">*</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>apache<span class="token punctuation">.</span>commons<span class="token punctuation">.</span>codec<span class="token punctuation">.</span>binary<span class="token punctuation">.</span></span><span class="token class-name">Base64</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>slf4j<span class="token punctuation">.</span></span><span class="token class-name">Logger</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>slf4j<span class="token punctuation">.</span></span><span class="token class-name">LoggerFactory</span></span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * @ClassName JwtUtil
 * @Author gaoqisen
 * @Date 2019-11-05
 * @Version 1.0
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">JwtUtil</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">Logger</span> logger <span class="token operator">=</span> <span class="token class-name">LoggerFactory</span><span class="token punctuation">.</span><span class="token function">getLogger</span><span class="token punctuation">(</span><span class="token class-name">ApacheHttpClient</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 由字符串生成加密key
     * <span class="token keyword">@return</span>
     */</span>
    <span class="token keyword">public</span> <span class="token class-name">SecretKey</span> <span class="token function">generalKey</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">//本地配置文件中加密的密文7786df7fc3a34e26a61c034d5ec8245d</span>
        <span class="token class-name">String</span> stringKey <span class="token operator">=</span> <span class="token class-name">TokenConstant</span><span class="token punctuation">.</span><span class="token constant">JWT_SECRET</span><span class="token punctuation">;</span>
        <span class="token comment">//本地的密码解码[B@152f6e2786df7fc3a34e26a61c034d5ec8245d</span>
        <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> encodedKey <span class="token operator">=</span> <span class="token class-name">Base64</span><span class="token punctuation">.</span><span class="token function">decodeBase64</span><span class="token punctuation">(</span>stringKey<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 根据给定的字节数组使用AES加密算法构造一个密钥，使用 encodedKey中的始于且包含 0 到前 leng 个字节这是当然是所有。</span>
        <span class="token class-name">SecretKey</span> key <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SecretKeySpec</span><span class="token punctuation">(</span>encodedKey<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> encodedKey<span class="token punctuation">.</span>length<span class="token punctuation">,</span> <span class="token string">"AES"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> key<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 创建jwt
     * <span class="token keyword">@param</span> <span class="token parameter">id</span>
     * <span class="token keyword">@param</span> <span class="token parameter">subject</span>
     * <span class="token keyword">@param</span> <span class="token parameter">ttlMillis</span>
     * <span class="token keyword">@return</span>
     * <span class="token keyword">@throws</span> <span class="token reference"><span class="token class-name">Exception</span></span>
     */</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">createJWT</span><span class="token punctuation">(</span><span class="token class-name">String</span> id<span class="token punctuation">,</span> <span class="token class-name">String</span> subject<span class="token punctuation">,</span> <span class="token keyword">long</span> ttlMillis<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span><span class="token punctuation">{</span>

        <span class="token class-name">SignatureAlgorithm</span> signatureAlgorithm <span class="token operator">=</span> <span class="token class-name">SignatureAlgorithm</span><span class="token punctuation">.</span><span class="token constant">HS256</span><span class="token punctuation">;</span>
        <span class="token keyword">long</span> nowMillis <span class="token operator">=</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">currentTimeMillis</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Date</span> now <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span>nowMillis<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//创建payload的私有声明（根据特定的业务需要添加，如果要拿这个做验证，一般是需要和jwt的接收方提前沟通好验证方式的）</span>
        <span class="token comment">//Map&lt;String,Object> claims = new HashMap&lt;String,Object>();</span>
        <span class="token comment">//claims.put("uid", "CVLm6KSSSkeNRg5pMqop2w");</span>
        <span class="token comment">//claims.put("user_name", "admin");</span>
        <span class="token comment">//claims.put("nick_name","DASDA121");</span>
        <span class="token class-name">SecretKey</span> key <span class="token operator">=</span> <span class="token function">generalKey</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">JwtBuilder</span> builder <span class="token operator">=</span> <span class="token class-name">Jwts</span><span class="token punctuation">.</span><span class="token function">builder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token comment">//如果有私有声明，一定要先设置这个自己创建的私有的声明，这个是给builder的claim赋值，一旦写在标准的声明赋值之后，就是覆盖了那些标准的声明的</span>
                <span class="token comment">//.setClaims(claims)</span>
                <span class="token punctuation">.</span><span class="token function">setId</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">setIssuedAt</span><span class="token punctuation">(</span>now<span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">setSubject</span><span class="token punctuation">(</span>subject<span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">signWith</span><span class="token punctuation">(</span>signatureAlgorithm<span class="token punctuation">,</span> key<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>ttlMillis <span class="token operator">>=</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">long</span> expMillis <span class="token operator">=</span> nowMillis <span class="token operator">+</span> ttlMillis<span class="token punctuation">;</span>
            <span class="token class-name">Date</span> exp <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span>expMillis<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//设置过期时间</span>
            builder<span class="token punctuation">.</span><span class="token function">setExpiration</span><span class="token punctuation">(</span>exp<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment">//就开始压缩为xxxxxxxxxxxxxx.xxxxxxxxxxxxxxx.xxxxxxxxxxxxx这样的jwt</span>
        <span class="token keyword">return</span> builder<span class="token punctuation">.</span><span class="token function">compact</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 解密jwt
     * <span class="token keyword">@param</span> <span class="token parameter">jwt</span>
     * <span class="token keyword">@return</span>
     * <span class="token keyword">@throws</span> <span class="token reference"><span class="token class-name">Exception</span></span>
     */</span>
    <span class="token keyword">public</span> <span class="token class-name">Claims</span> <span class="token function">parseJWT</span><span class="token punctuation">(</span><span class="token class-name">String</span> jwt<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span><span class="token punctuation">{</span>
        <span class="token class-name">SecretKey</span> key <span class="token operator">=</span> <span class="token function">generalKey</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Claims</span> claims <span class="token operator">=</span> <span class="token class-name">Jwts</span><span class="token punctuation">.</span><span class="token function">parser</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">setSigningKey</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">parseClaimsJws</span><span class="token punctuation">(</span>jwt<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getBody</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> claims<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 校验jwt
     * <span class="token keyword">@param</span> <span class="token parameter">jwt</span>
     * <span class="token keyword">@return</span>
     * <span class="token keyword">@throws</span>
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">validateJWT</span><span class="token punctuation">(</span><span class="token class-name">String</span> jwt<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">boolean</span> flag <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token function">parseJWT</span><span class="token punctuation">(</span>jwt<span class="token punctuation">)</span><span class="token punctuation">;</span>
            flag <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">ExpiredJwtException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            logger<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">"token过期"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">SignatureException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            logger<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">"签名校验失败"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            logger<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">"其它错误"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> flag<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-3-常量" tabindex="-1"><a class="header-anchor" href="#_3-3-常量" aria-hidden="true">#</a> 3.3 常量</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">JWT_ID</span> <span class="token operator">=</span> <span class="token string">"jwt"</span><span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">JWT_SECRET</span> <span class="token operator">=</span> <span class="token string">"26e4b9wqrfe444568f24232108460891"</span><span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">int</span> <span class="token constant">JWT_TTL</span> <span class="token operator">=</span> <span class="token number">1</span><span class="token operator">*</span><span class="token number">60</span><span class="token operator">*</span><span class="token number">60</span><span class="token operator">*</span><span class="token number">1000</span><span class="token punctuation">;</span> <span class="token comment">// 60*60*1000;  //过期时间（毫秒）</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-4-接口开发" tabindex="-1"><a class="header-anchor" href="#_3-4-接口开发" aria-hidden="true">#</a> 3.4 接口开发</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>    <span class="token keyword">public</span> <span class="token class-name">JSONObject</span> <span class="token function">getToken</span><span class="token punctuation">(</span><span class="token class-name">String</span> msg<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">JSONObject</span> json <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">JSONObject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">JwtUtil</span> util <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">JwtUtil</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token class-name">String</span> token <span class="token operator">=</span> util<span class="token punctuation">.</span><span class="token function">createJWT</span><span class="token punctuation">(</span><span class="token class-name">TokenConstant</span><span class="token punctuation">.</span><span class="token constant">JWT_ID</span><span class="token punctuation">,</span> msg <span class="token class-name">TokenConstant</span><span class="token punctuation">.</span><span class="token constant">JWT_TTL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            json<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">"state"</span><span class="token punctuation">,</span> <span class="token string">"ok"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            json<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">"token"</span><span class="token punctuation">,</span> token<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            json<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">"state"</span><span class="token punctuation">,</span><span class="token string">"error"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            json<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">"msg"</span><span class="token punctuation">,</span> <span class="token string">"Token处理失败"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> json<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token class-name">JSONObject</span> <span class="token function">checkToken</span><span class="token punctuation">(</span><span class="token class-name">String</span> token<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">JSONObject</span> json <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">JSONObject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">JwtUtil</span> jwt <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">JwtUtil</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">boolean</span> rs <span class="token operator">=</span> jwt<span class="token punctuation">.</span><span class="token function">validateJWT</span><span class="token punctuation">(</span>token<span class="token punctuation">)</span><span class="token punctuation">;</span>
        json<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">"state"</span><span class="token punctuation">,</span><span class="token string">"ok"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        json<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">"token"</span><span class="token punctuation">,</span> rs<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> json<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token class-name">JSONObject</span> <span class="token function">getUserInfoByToken</span><span class="token punctuation">(</span><span class="token class-name">String</span> token<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">JSONObject</span> json <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">JSONObject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">JwtUtil</span> jwt <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">JwtUtil</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">boolean</span> rs <span class="token operator">=</span> jwt<span class="token punctuation">.</span><span class="token function">validateJWT</span><span class="token punctuation">(</span>token<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>rs<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            json<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">"state"</span><span class="token punctuation">,</span> <span class="token string">"error"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            json<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">"msg"</span><span class="token punctuation">,</span> <span class="token string">"Token验证失败"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> json<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token comment">// 通过用户帐号获取用户信息</span>
            <span class="token class-name">Claims</span> claims <span class="token operator">=</span> jwt<span class="token punctuation">.</span><span class="token function">parseJWT</span><span class="token punctuation">(</span>token<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">String</span> id <span class="token operator">=</span> claims<span class="token punctuation">.</span><span class="token function">getSubject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// 处理业务逻辑</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> json<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注: 网上说jwt只能抗2w并发， 如果并发过大会出现问题。（待验证）</p>
</div></template>


