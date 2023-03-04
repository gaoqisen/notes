<template><div><blockquote>
<p>目标：了解Vue, 了解常用的Vue的一些工具，用vue cli搭建一个测试用例，在浏览器上面运行起来。</p>
</blockquote>
<h2 id="了解vue" tabindex="-1"><a class="header-anchor" href="#了解vue" aria-hidden="true">#</a> 了解Vue</h2>
<h3 id="百科定义" tabindex="-1"><a class="header-anchor" href="#百科定义" aria-hidden="true">#</a> 百科定义</h3>
<p>Vue (读音 /vjuː/，类似于 view) 是一套用于构建用户界面的渐进式JavaScript框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，方便与第三方库或既有项目整合。</p>
<h3 id="同类的技术" tabindex="-1"><a class="header-anchor" href="#同类的技术" aria-hidden="true">#</a> 同类的技术</h3>
<p><a href="https://www.angularjs.net.cn/tutorial/" target="_blank" rel="noopener noreferrer">AngularJS<ExternalLinkIcon/></a>: 诞生于2009年，由Misko Hevery 等人创建，后为Google所收购。是一款优秀的前端JS框架，已经被用于Google的多款产品当中。AngularJS有着诸多特性，最为核心的是：MVC（Model–view–controller）、模块化、自动化双向数据绑定、语义化标签、依赖注入等等。</p>
<p><a href="https://zh-hans.reactjs.org/" target="_blank" rel="noopener noreferrer">React<ExternalLinkIcon/></a>: 起源于 Facebook 的内部项目，因为该公司对市场上所有 JavaScript MVC 框架，都不满意，就决定自己写一套，用来架设 Instagram 的网站。做出来以后，发现这套东西很好用，就在2013年5月开源了。主要用于构建UI，很多人认为 React 是 MVC 中的 V（视图）。</p>
<blockquote>
<p>AngularJS、React、Vue.js并称前端3大框架。</p>
</blockquote>
<h3 id="同类技术优缺点" tabindex="-1"><a class="header-anchor" href="#同类技术优缺点" aria-hidden="true">#</a> 同类技术优缺点</h3>
<p><img src="https://gaoqisen.github.io/GraphBed/201908/20190810153240.png" alt="https://gaoqisen.github.io/GraphBed/201908/20190810153240.png"></p>
<table>
<thead>
<tr>
<th></th>
<th>优点</th>
<th>缺点</th>
</tr>
</thead>
<tbody>
<tr>
<td>Vue.js</td>
<td>轻量级,学习成本低</td>
<td>生态不太成熟</td>
</tr>
<tr>
<td>angularJS</td>
<td>有优秀的组件系统</td>
<td>学习曲线是非常陡峭</td>
</tr>
<tr>
<td>React</td>
<td>丰富的生态系统</td>
<td>学习曲线陡峭</td>
</tr>
</tbody>
</table>
<p>vue对比链接：<a href="https://cn.vuejs.org/v2/guide/comparison.html#AngularJS-Angular-1" target="_blank" rel="noopener noreferrer">https://cn.vuejs.org/v2/guide/comparison.html#AngularJS-Angular-1<ExternalLinkIcon/></a></p>
<ul>
<li>
<p>vue vs React :合严格的 Flux 架构，适合超大规模多人协作的复杂项目。理论上 Vue 配合类似架构也可以胜任这样的用例，但缺少类似 Flux 这样的官方架构。小快灵的项目上，Vue 和 React 的选择更多是开发风格的偏好。对于需要对 DOM 进行很多自定义操作的项目，Vue 的灵活性优于 React。</p>
</li>
<li>
<p>vue vs Angular：Angular的学习曲线是非常陡峭的——作为一个框架，它的 API 面积比起 Vue 要大得多，你也因此需要理解更多的概念才能开始有效率地工作。当然，Angular 本身的复杂度是因为它的设计目标就是只针对大型的复杂应用；但不可否认的是，这也使得它对于经验不甚丰富的开发者相当的不友好。</p>
</li>
</ul>
<h3 id="渐进式javascript框架" tabindex="-1"><a class="header-anchor" href="#渐进式javascript框架" aria-hidden="true">#</a> 渐进式JavaScript框架</h3>
<p>vue官网的第一句话就是渐进式JavaScript框架，我的理解就是循序渐进可以自底向上逐层应用开发的框架，可以单独一个页面用来做表单，也可以整个项目用来做框架，可以一步一步引入vue，模块化需要那个就引入那个。</p>
<h2 id="vue时间轴" tabindex="-1"><a class="header-anchor" href="#vue时间轴" aria-hidden="true">#</a> Vue时间轴</h2>
<p><img src="https://gaoqisen.github.io/GraphBed/201908/20190810165334.png" alt="尤雨溪"></p>
<ul>
<li>
<p>2013: 在Google工作的尤雨溪，受到Angular的启发，从中提取自己所喜欢的部分，开发出了一款轻量框架，最初命名为Seed。</p>
</li>
<li>
<p>2013.12：这粒种子发芽了，更名为Vue，版本号是0.6.0。</p>
</li>
<li>
<p>2014.01.24：Vue正式对外发布，版本号是0.8.0。</p>
</li>
<li>
<p>2014.02.25：vue版本0.9.0发布（代号Animatrix动画版的骇客帝国），此后重要的版本都会有自己的代号。</p>
</li>
<li>
<p>2015.06.13：vue版本0.12.0发布（代号Dragon Ball龙珠），这一年Vue大爆发，Laravel 社区（一款流行的 PHP 框架的社区）首次使用 Vue，Vue在JS社区也打响了知名度。</p>
</li>
<li>
<p>2015.08.18：vue里程碑-新世纪福音战士发布。vue-router（2015-08-18）、vuex（2015-11-28）、vue-cli（2015-12-27）相继发布，标志着 Vue从一个视图层库发展为一个渐进式框架。</p>
</li>
<li>
<p>2016.9.3：尤雨溪正式宣布加盟阿里巴巴Weex团队，尤雨溪称他将以技术顾问的身份加入 Weex 团队来做 Vue 和 Weex 的 JavaScript runtime 整合，目标是让大家能用 Vue 的语法跨三端</p>
</li>
<li>
<p>2016.9.30:  vue版本2.0.0 （Ghost in the Shell 攻壳机动队）发布，这是第二个重要的里程碑，它吸收了React的Virtual Dom方案，还支持服务端渲染。</p>
</li>
<li>
<p>2018.9.30： 发布了 Vue 3.0 的开发路线，会保持与 2.x 的兼容并表示将从头开始重写 3.0</p>
</li>
<li>
<p>2019.2.4：vue版本2.6.0 （Macross超时空要塞）发布了。新增了Scoped slots(作用域插槽)的新语法、 动态参数指令、响应对象等新特性。</p>
</li>
</ul>
<h2 id="一点小知识" tabindex="-1"><a class="header-anchor" href="#一点小知识" aria-hidden="true">#</a> 一点小知识</h2>
<h3 id="vue学习之前需要了解" tabindex="-1"><a class="header-anchor" href="#vue学习之前需要了解" aria-hidden="true">#</a> Vue学习之前需要了解:</h3>
<ul>
<li>
<p><a href="https://nodejs.org/zh-cn/download/" target="_blank" rel="noopener noreferrer">Node.js<ExternalLinkIcon/></a>：运行在服务端的 JavaScript，是一个事件驱动I/O服务端JavaScript环境，基于Google的V8引擎，V8引擎执行Javascript的速度非常快，性能非常好。</p>
</li>
<li>
<p><a href="https://www.npmjs.cn/getting-started/what-is-npm/" target="_blank" rel="noopener noreferrer">npm<ExternalLinkIcon/></a>、<a href="https://npm.taobao.org" target="_blank" rel="noopener noreferrer">cnpm<ExternalLinkIcon/></a> : npm是nodejs的包管理器，cnpm是淘宝 NPM 镜像，用来加速。</p>
</li>
<li>
<p><a href="https://www.webpackjs.com/" target="_blank" rel="noopener noreferrer">webpack<ExternalLinkIcon/></a>:  基于node的一个现代 JavaScript 应用程序的静态模块打包器</p>
</li>
<li>
<p><a href="http://caibaojian.com/es6/" target="_blank" rel="noopener noreferrer">ECMAScript 6<ExternalLinkIcon/></a>: ECMAScript 6.0（以下简称ES6）是JavaScript语言的下一代标准，已经在2015年6月正式发布了。它的目标，是使得JavaScript语言可以用来编写复杂的大型应用程序，成为企业级开发语言。</p>
</li>
<li>
<p><a href="https://www.w3school.com.cn/html5/index.asp" target="_blank" rel="noopener noreferrer">html<ExternalLinkIcon/></a>、<a href="https://www.w3school.com.cn/css/index.asp" target="_blank" rel="noopener noreferrer">css<ExternalLinkIcon/></a>、<a href="https://www.w3school.com.cn/js/index.asp" target="_blank" rel="noopener noreferrer">JavaScript<ExternalLinkIcon/></a>的基础</p>
</li>
<li>
<p><a href="https://cn.vuejs.org/index.html" target="_blank" rel="noopener noreferrer">vue官网<ExternalLinkIcon/></a>: 官方文档</p>
</li>
<li>
<p><a href="https://www.kancloud.cn/dataoedu/vue/327238" target="_blank" rel="noopener noreferrer">看云Vue文档<ExternalLinkIcon/></a>: 二手文档</p>
</li>
<li>
<p><a href="https://vscode.en.softonic.com/" target="_blank" rel="noopener noreferrer">VSCode<ExternalLinkIcon/></a>：速度较快，对超大文件读写速度飞快(打开10M代码不到1s)，插件数量相对少，有一些增强功能比如调试器， 终端，原生支持语言语法高亮较少(C# JS TypeScript是第一位)，内置JS/TS调试器…可以基于不同项目(文件夹)设置偏好，写C#和JS/TS专用</p>
</li>
<li>
<p><a href="https://element.eleme.cn/#/zh-CN/component/installation" target="_blank" rel="noopener noreferrer">Element-UI<ExternalLinkIcon/></a>:   饿了么提供的UI框架。<a href="https://iviewui.com/docs/guide/install" target="_blank" rel="noopener noreferrer">iView<ExternalLinkIcon/></a>：<a href="https://segmentfault.com/u/aresn" target="_blank" rel="noopener noreferrer">一个团队<ExternalLinkIcon/></a></p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code> // 在main.js中全局引入element
  import ElementUI from 'element-ui'
  import 'element-ui/lib/theme-chalk/index.css'
  Vue.use(ElementUI)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><a href="https://doc.vux.li/zh-CN/" target="_blank" rel="noopener noreferrer">维护靠个人的vux<ExternalLinkIcon/></a>: 基于webpack+vue-loader+vux可以快速开发移动端页面，配合vux-loader方便你在WeUI的基础上定制需要的样式。<a href="https://didi.github.io/cube-ui/#/zh-CN/example" target="_blank" rel="noopener noreferrer">滴滴的cube-ui<ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://vuepress.vuejs.org/zh/guide/#todo" target="_blank" rel="noopener noreferrer">vuepress<ExternalLinkIcon/></a>:  Vue 开发主题的极简静态网站生成器，另一个部分是为书写技术文档而优化的默认主题。它的诞生初衷是为了支持 Vue 及其子项目的文档需求。</p>
</li>
</ul>
<h3 id="vue组成方式-mvvm模式以及两个核心点" tabindex="-1"><a class="header-anchor" href="#vue组成方式-mvvm模式以及两个核心点" aria-hidden="true">#</a> Vue组成方式(MVVM模式以及两个核心点)</h3>
<ul>
<li>
<p>MVVM模式</p>
<p><img src="https://gaoqisen.github.io/GraphBed/201908/20190810191221.png" alt="https://gaoqisen.github.io/GraphBed/201908/20190810191221.png"></p>
<p><img src="https://gaoqisen.github.io/GraphBed/201908/20190811121954.png" alt="https://gaoqisen.github.io/GraphBed/201908/20190811121954.png">
Model(数据层)-View(视图层)-ViewModel(视图和数据的链接层)，ViewModel层连接Model和View。View层和Model层并没有直接联系，而是通过ViewModel层进行交互。ViewModel层通过双向数据绑定将View层和Model层连接了起来，使得View层和Model层的同步工作完全是自动的。因此开发者只需关注业务逻辑，无需手动操作DOM，复杂的数据状态维护交给MVVM统一来管理
<img src="https://gaoqisen.github.io/GraphBed/201908/20190810191714.png" alt="https://gaoqisen.github.io/GraphBed/201908/20190810191714.png"></p>
</li>
<li>
<p>数据驱动</p>
<blockquote>
<p>所谓数据驱动，是指视图是由数据驱动生成的，我们对视图的修改，不会直接操作 DOM，而是通过修改数据。它相比我们传统的前端开发，如使用 jQuery 等前端库直接修改 DOM，大大简化了代码量。特别是当交互复杂的时候，只关心数据的修改会让代码的逻辑变的非常清晰，因为 DOM 变成了数据的映射，我们所有的逻辑都是对数据的修改，而不用碰触 DOM，这样的代码非常利于维护。</p>
</blockquote>
</li>
<li>
<p>组件化</p>
</li>
</ul>
<blockquote>
<p>所谓组件化，就是把页面拆分成多个组件 (component)，每个组件依赖的 CSS、JavaScript、模板、图片等资源放在一起开发和维护。组件是资源独立的，组件在系统内部可复用，组件和组件之间可以嵌套。</p>
</blockquote>
<ul>
<li>代码结构</li>
</ul>
<p><img src="https://gaoqisen.github.io/GraphBed/201908/20190810152605.png" alt="https://gaoqisen.github.io/GraphBed/201908/20190810152605.png"></p>
<ul>
<li>Vue的生命周期图(当遇到页面初始化的时候需要处理一下逻辑的时候，在什么时候触发函数) 。详细的生命周期解释：<a href="https://segmentfault.com/a/1190000011381906" target="_blank" rel="noopener noreferrer">https://segmentfault.com/a/1190000011381906<ExternalLinkIcon/></a></li>
</ul>
<p><img src="https://gaoqisen.github.io/GraphBed/201902/vue.png" alt="https://gaoqisen.github.io/GraphBed/201902/vue.png"></p>
<ul>
<li>技术揭秘<a href="https://ustbhuangyi.github.io/vue-analysis/data-driven/" target="_blank" rel="noopener noreferrer">https://ustbhuangyi.github.io/vue-analysis/data-driven/<ExternalLinkIcon/></a></li>
</ul>
<h2 id="实战" tabindex="-1"><a class="header-anchor" href="#实战" aria-hidden="true">#</a> 实战</h2>
<h3 id="安装方式" tabindex="-1"><a class="header-anchor" href="#安装方式" aria-hidden="true">#</a> 安装方式</h3>
<ul>
<li>在官网下载Node.js</li>
</ul>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>node -v  // 查看node版本
npm -v  // 查看npm版本
npm install cnpm -g  // 全局安装cnpm
npm install -g cnpm --registry=https://registry.npm.taobao.org    // 指定地址安装cnpm
cnpm install vue  // 安装最新稳定版本的vue
vue --version   // 查看vue版本
cnpm install --global vue-cli  // cnpm 全局安装vue脚手架，
npm install -g @vue/cli   // npm 全局安装vue脚手架
vue init webpack my-project  // 创建一个基于 webpack 模板的新项目
cd my-project  // 到达项目根目录
cnpm install  // 安装依赖
cnpm run dev  // 启动项目，或者npm run dev
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>
<p>vue脚手架安装时的选项</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>❯   vue build 构建方式,两个选择（上下箭头选择，回车即为选定）
    Runtime + Compiler:recommended for most users (译：运行+编译：被推荐给大多数用户)
    Runtime-only:about 6KB lighter min+gzip,but templates (or any Vue-specific HTML) are ONLY allowed in .vue files-render functions are required elsewhere(译：只运行大约6KB比较轻量的压缩文件，但只允许模板（或任何VUE特定HTML）。VUE文件需要在其他地方呈现函数。(意思大概是选择该构建方式对文件大小有要求, 这里推荐使用1选项，适合大多数用户的)
    Standard (https://github.com/standard/standard)  js的标准风格
    Airbnb (https://github.com/airbnb/javascript) JavaScript最合理的方法，这个github地址说是JavaScript最合理的方法
    none (configure it yourself) 自己配置
    Setup unit tests?  是否安装单元测试
    Setup e2e tests with Nightwatch(Y/n)?是否安装E2E测试框架NightWatch（E2E，也就是End To End，就是所谓的“用户真实场景”。）
    yes,use npm(使用npm)
    yes,use yarn(使用yarn)
    no,I will handle that myself(自己操作)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>如果报以下的错误，就安装缺少依赖(cnpm install)，全部安装完成之后就可以通过链接访问了。
<img src="https://gaoqisen.github.io/GraphBed/201908/20190810192702.png" alt="https://gaoqisen.github.io/GraphBed/201908/20190810192702.png"></p>
</li>
<li>
<p>访问http://localhost:8080出现vue标识表示安装成功</p>
</li>
</ul>
<p><img src="https://gaoqisen.github.io/GraphBed/201908/20190810163742.png" alt="https://gaoqisen.github.io/GraphBed/201908/20190810163742.png"></p>
<ul>
<li><a href="https://router.vuejs.org/zh/" target="_blank" rel="noopener noreferrer">vue路由<ExternalLinkIcon/></a><div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>routes: [
{
 // 路由路径，浏览器网址输入栏的路径
  path: '/',   
  // 通过name属性，为一个页面中不同的router-view渲染不同的组件,如：将上面代码的Hello渲染在 name为Hello的router-view中，将text渲染在name为text的router-view中。不设置name的将为默认的渲染组件。&lt;router-view  name="test">12345645645&lt;/router-view>
  name: 'HelloWorld',  
  // 导入的组件import HelloWorld from '@/components/HelloWorld'
  component:  HelloWorld
},
]
// 页面跳转方式
&lt;router-link to="/test">测试1&lt;/router-link>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h3 id="配置文件" tabindex="-1"><a class="header-anchor" href="#配置文件" aria-hidden="true">#</a> 配置文件</h3>
<ul>
<li>package.json</li>
</ul>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>{
 "name": "ffdd-fast-vue",    // 项目名称
 "version": "1.2.2",  // 版本
 "description": "...",  // 描述
 "author": "",   // 作者
 "private": true,   // 是否私有
 "scripts": {
   "dev": "webpack-dev-server --inline --progress --config build/webpack.dev.conf.js",  // npm run dev 执行的语句
   "start": "npm run dev",  // 项目启动
   "unit": "jest --config test/unit/jest.conf.js --coverage",  // 单元测试
   "e2e": "node test/e2e/runner.js",  // 前端到后端整个过程的测试
   "test": "npm run unit &amp;&amp; npm run e2e",  // 测试
   "lint": "eslint --ext .js,.vue src test/unit/specs test/e2e/specs",  // 修改代码样式,  运行之后就不报ESLint的错误
   "build": "gulp"  // 构建
 },
 "dependencies": {   // 生产环境所有的第三方依赖
   "axios": "0.17.1",  // 代替ajax
   "babel-plugin-component": "0.10.1",  // 按需加载插件
   "babel-polyfill": "6.26.0",  // 按需加载进行性能优化插件
   "element-ui": "2.8.2",   // 饿了么提供UI框架
   "gulp": "3.9.1",  // 自动化构建工具
   "gulp-concat": "2.6.1",  // 文件合并插件
   "gulp-load-plugins": "1.5.0",  // 自动加载插件
   "gulp-replace": "0.6.1",  // 文件替换插件
   "gulp-shell": "0.6.5",  // 命令行插件
   "lodash": "4.17.5",  // JavaScript 实用工具库。
   "node-sass": "4.9.0",  // sass编译成css
   "npm": "^6.9.0",
   "sass-loader": "6.0.6",  // 是webpack的一个loader, 
   "svg-sprite-loader": "3.7.3",  // 实现自己的Icon组件
   "vue": "2.5.2",
   "vue-cookie": "1.1.4",  // cookie插件
   "vue-router": "3.0.1",   // vue 路由
   "vuex": "3.0.1"  // vue状态管理
 },
 "devDependencies": {  // 开发环境所有的第三方依赖
   "autoprefixer": "7.1.2",  // 自动补全css前缀
   "babel-core": "6.22.1",  // 把 js 代码分析成 ast ,方便各个插件分析语法进行相应的处理
   "babel-eslint": "7.1.1",  // 语法检查
   "babel-jest": "21.0.2",  // 单元测试
   ...
 },
 "engines": {   // 引擎
   "node": ">= 8.11.1",
   "npm": ">= 5.6.0"
 },
 "browserslist": [  // 浏览器列表
   "> 1%",    // 全球超过1%人使用的浏览器
   "last 2 versions",  // 所有浏览器兼容到最后两个版本根据CanIUse.com追踪的版本
   "not ie &lt;= 8"   // 方向排除部分版本
 ]
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>
<p>config/index.js</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>'use strict'
 // 模版版本号: 1.3.1
 // see http://vuejs-templates.github.io/webpack for documentation.
 
 const path = require('path')
 
 module.exports = {
   dev: {    // npm run dev 执行参数
     // 路径
     assetsSubDirectory: 'static', // 静态文件路径
     assetsPublicPath: '/',  
     // 代理列表
     proxyTable : {
       '/proxyApi': {
         target: 'http://localhost:8887/',  // 代理地址
         changeOrigin: true,   // 变化源
         pathRewrite: {    // 路径重写
           '^/proxyApi': '/'
         }
       }
     },
     // 各种开发服务器设置
     host: 'localhost', // 可以被process.env.HOST覆盖
     port: 8080, // 可以被process.env.PORT覆盖，如果端口正在使用，将换一个端口
     autoOpenBrowser: false,  // 自动打开浏览器
     errorOverlay: true,  // 异常覆盖
     notifyOnErrors: true,  // 异常通知
     poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-
 
     // 如果为true，则在捆绑期间将对您的代码进行处理，linting错误和警告将显示在控制台中
     useEslint: true,
     // 如果为true, 错误和警告也将显示在错误覆盖中
     showEslintErrorsInOverlay: false,
 
     /**
      * Source Maps
      */
 
     // 开发环境工具
     devtool: 'cheap-module-eval-source-map',
 
     // 缓存破坏
     // https://vue-loader.vuejs.org/en/options.html#cachebusting
     cacheBusting: true,
     cssSourceMap: true
   },
 
   build: {  // npm run build 执行参数
     // index.html文件路径指定
     index: path.resolve(__dirname, '../dist/index.html'),
     // 构建后路径指定、资源文件夹名、公开路径
     assetsRoot: path.resolve(__dirname, '../dist'),
     assetsSubDirectory: 'static',
     assetsPublicPath: '/',
 
     /**
      * 生产环境的Source Maps
      */
 
     productionSourceMap: true,
     // https://webpack.js.org/configuration/devtool/#production
     devtool: '#source-map',
 
      //默认情况下Gzip关闭许多流行的静态主机，例如Surge或Netlify已经为您准备了所有静态资源。
      //在设置为“true”之前，请确保：npm install --save-dev compression-webpack-plugin
     productionGzip: false,
     productionGzipExtensions: ['js', 'css'],
 
     //运行带有额外参数的build命令
      //在构建完成后查看捆绑分析器报告：`npm run build --report`
     bundleAnalyzerReport: process.env.npm_config_report
   }
 }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
</div></template>


