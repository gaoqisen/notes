<template><div><h2 id="一、包结构" tabindex="-1"><a class="header-anchor" href="#一、包结构" aria-hidden="true">#</a> 一、包结构</h2>
<h3 id="_1-1-按照功能分类" tabindex="-1"><a class="header-anchor" href="#_1-1-按照功能分类" aria-hidden="true">#</a> 1.1 按照功能分类</h3>
<p>分为基础包、解析包、核心包。下面用一句话介绍一下包的作用和使用的设计模式，方便理解与学习。</p>
<table>
<thead>
<tr>
<th>包名</th>
<th>介绍</th>
<th>设计模式</th>
</tr>
</thead>
<tbody>
<tr>
<td>exception</td>
<td>定义了异常类的父类，主要学习分包方式和异常拆包</td>
<td>工厂模式</td>
</tr>
<tr>
<td>reflection</td>
<td>主要是提供反射功能</td>
<td>装饰器模式</td>
</tr>
<tr>
<td>annotations/long</td>
<td>都是一些注解类</td>
<td></td>
</tr>
<tr>
<td>type</td>
<td>各个类分类/Type类(java对象和jdbc类型的映射，各种处理器)</td>
<td>模版方法模式</td>
</tr>
<tr>
<td>io</td>
<td>利用VFS/JBoss6加载静态资源</td>
<td>单例模式/静态代理</td>
</tr>
<tr>
<td>logging</td>
<td>日志框架和级别兼容各个日志框架</td>
<td>适配器模式/动态代理</td>
</tr>
<tr>
<td>parsing</td>
<td>xml的解析和解析器的实现</td>
<td></td>
</tr>
<tr>
<td></td>
<td></td>
<td></td>
</tr>
<tr>
<td>binding</td>
<td>用来处理sql和java方法的语句绑定，重点是jdk的动态代理</td>
<td></td>
</tr>
<tr>
<td>builder</td>
<td>将xml或注解构建为Configuation对象</td>
<td>建造者模式</td>
</tr>
<tr>
<td>mapping</td>
<td>映射实体类</td>
<td></td>
</tr>
<tr>
<td>scripting</td>
<td>动态sql则组建，重点是OGNL</td>
<td></td>
</tr>
<tr>
<td>datasource</td>
<td>数据源的获取，Jndi和数据源池化</td>
<td>工厂模式</td>
</tr>
<tr>
<td></td>
<td></td>
<td></td>
</tr>
<tr>
<td>jdbc</td>
<td>提供了sql语句生成和执行的独立功能</td>
<td></td>
</tr>
<tr>
<td>cache</td>
<td>提供了各种缓存策略</td>
<td>包装器模式</td>
</tr>
<tr>
<td>transaction</td>
<td>事务的管理提供了两种方式一种是基于jdbc的一种是基于容器的</td>
<td>工厂模式</td>
</tr>
<tr>
<td>cursor</td>
<td>用游标的方式返回查询的结果数据</td>
<td></td>
</tr>
<tr>
<td>executor</td>
<td>执行器核心类包含了自增主键的生成、懒加载(cglib的动态代理)、参数/结果/语句处理等</td>
<td>模版方法</td>
</tr>
<tr>
<td>session</td>
<td>主要是Sqlsesison的创建</td>
<td></td>
</tr>
<tr>
<td>plugin</td>
<td>主要提供ParameterHandler、ResultSetHandler、StatementHandler、Executor类的插件拦截器</td>
<td>责任链</td>
</tr>
</tbody>
</table>
<h3 id="_1-2-按照调用流程分包" tabindex="-1"><a class="header-anchor" href="#_1-2-按照调用流程分包" aria-hidden="true">#</a> 1.2 按照调用流程分包</h3>
<p>session包就是接口包提供给开发人员使用，之后就是核心包提供了构建包进行构建Configuration类，构建的时候利用scripting解析xml动态sql后映射为mapping里面的对象之后利用binding将java方法和xml里面的sql语句进行绑定后生成执行器。执行器里面封装了缓存、事务以及插件。基础包主要是提供功能给核心包进行调用。</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>接口包<span class="token operator">:</span> session
核心包：builder mapping scripting binding executor cache datasource transaction plugin 
基础包<span class="token operator">:</span> logging parsing cursor type reflection exception annotations<span class="token operator">/</span>lang io  jdbc
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://gaoqisen.github.io/GraphBed/202108/20210817220736.png" alt="sum"></p>
<h3 id="_1-3-常见问题" tabindex="-1"><a class="header-anchor" href="#_1-3-常见问题" aria-hidden="true">#</a> 1.3 常见问题</h3>
<h4 id="_1、什么是mybatis" tabindex="-1"><a class="header-anchor" href="#_1、什么是mybatis" aria-hidden="true">#</a> 1、什么是Mybatis？</h4>
<p>mybatis是一个半ORM（对象关系映射）框架，支持编写sql去处理业务逻辑（定制sql）有很高的灵活性，开发者只需要关注sql本身对于数据库的链接等都交给mybatis去处理。主要是通过在mapper.xml获取注解里面编写sql后，mybatis将xml/注解里面的sql解析后和dao里面的方法进行关联。之后调用dao的时候实际就是去执行的xml/注解里面的sql语句。主要是用的动态代理技术（最大的优势就是能快捷的编写sql并获取数据）</p>
<h4 id="_2、mybaits的优缺点" tabindex="-1"><a class="header-anchor" href="#_2、mybaits的优缺点" aria-hidden="true">#</a> 2、Mybaits的优缺点</h4>
<p>优点：</p>
<ol>
<li>sql语句编程便于统一管理sql</li>
<li>减少了50%的jdbc代码，不用手动开关连接</li>
<li>兼容各种数据库，底层是使用的jdbc连接的数据库只要jdbc支持的mybatis都支持</li>
<li>支持动态sql能减少大量的代码</li>
</ol>
<p>缺点:
sql语句依赖数据库，如果迁移数据库的话就需要修改sql语句</p>
<h4 id="_3、-和-的区别是什么" tabindex="-1"><a class="header-anchor" href="#_3、-和-的区别是什么" aria-hidden="true">#</a> 3、#{}和${}的区别是什么？</h4>
<p>${}是直接进行的值替换，#{}会对sql语句进行预处理防止sql注入(将#{}替换为?)</p>
<h4 id="_4、通常一个mapper-xml文件-都会对应一个dao接口-这个dao接口的工作原理是什么-dao接口里的方法-参数不同时-方法能重载吗" tabindex="-1"><a class="header-anchor" href="#_4、通常一个mapper-xml文件-都会对应一个dao接口-这个dao接口的工作原理是什么-dao接口里的方法-参数不同时-方法能重载吗" aria-hidden="true">#</a> 4、通常一个mapper.xml文件，都会对应一个Dao接口，这个Dao接口的工作原理是什么？Dao接口里的方法，参数不同时，方法能重载吗？</h4>
<p>dao的底层实现是用的jdk的动态代理，在mybatis初始化的时候会给dao创建一个代理类。在请求dao的时候实际上是请求的代理类，mybatis解析xml文件的时候通过类的全限定名加上方法名进行sql语句的关联。因此dao方法里面参数不同时不能进行重载</p>
<h4 id="_5、mybatis的xml映射文件中-不同的xml映射文件-id是否可以重复" tabindex="-1"><a class="header-anchor" href="#_5、mybatis的xml映射文件中-不同的xml映射文件-id是否可以重复" aria-hidden="true">#</a> 5、Mybatis的Xml映射文件中，不同的Xml映射文件，id是否可以重复？</h4>
<p>可以重复，应该在解析xml进行sql语句关联的时候是用的namespace+id作为map的key实现的，如果没有配置namespace就不能重复（旧版本namespace可选，新版必填）</p>
<h4 id="_6、mybatis是如何进行分页的-分页插件的原理是什么" tabindex="-1"><a class="header-anchor" href="#_6、mybatis是如何进行分页的-分页插件的原理是什么" aria-hidden="true">#</a> 6、Mybatis是如何进行分页的？分页插件的原理是什么？</h4>
<p>mybatis分页是用RowBounds对象进行分页的，是对结果集的内存分页。如果要实现内存分页需要用sql分页参数实现。分页插件的原理是利用mybatis的插件功能去拦截获取到sql后并拼接分页参数实现的，比如PageHelper插件是利用ThreadLocal进行传值的，之后在拦截处获取sql将分页参数拼接在sql上。</p>
<h4 id="_7、简述mybatis的插件运行原理-以及如何编写一个插件。" tabindex="-1"><a class="header-anchor" href="#_7、简述mybatis的插件运行原理-以及如何编写一个插件。" aria-hidden="true">#</a> 7、简述Mybatis的插件运行原理，以及如何编写一个插件。</h4>
<p>插件是利用责任链实现的，在执行语句的时候会把Statement处理器（Parameter、ResultSet、、Executor处理器）放进责任链里面去判断是否存在插件，如果存在则用jdk生成动态代理类后执行插件逻辑。</p>
<p>编写插件：实现Mybatis的Interceptor接口并复写intercept()方法，然后再给插件编写注解，指定要拦截哪一个接口的哪些方法即可，最后在配置文件中配置你编写的插件。</p>
<h4 id="_8、mybatis是否支持延迟加载-如果支持-它的实现原理是什么" tabindex="-1"><a class="header-anchor" href="#_8、mybatis是否支持延迟加载-如果支持-它的实现原理是什么" aria-hidden="true">#</a> 8、Mybatis是否支持延迟加载？如果支持，它的实现原理是什么？</h4>
<p>支持动态代理，实现原理是用的cglib的动态代理技术（jdk的动态代理只支持接口）在调用get方法的时候判断需要加载的对象是否为空，如果为空则通过之前解析xml的sql去数据库查询结果赋值后在调用加载对象的get属性方法。</p>
</div></template>


