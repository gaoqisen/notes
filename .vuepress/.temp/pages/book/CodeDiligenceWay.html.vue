<template><div><h2 id="一-技艺" tabindex="-1"><a class="header-anchor" href="#一-技艺" aria-hidden="true">#</a> 一 技艺</h2>
<h3 id="_1-1-命名" tabindex="-1"><a class="header-anchor" href="#_1-1-命名" aria-hidden="true">#</a> 1.1 命名</h3>
<ol>
<li>
<p>命名的力量：就像企业名称一样，一个好的名字能给人留下一个深刻的映像</p>
</li>
<li>
<p>命名很难：一个好的名字需要把要义浓缩到一两个词语中</p>
</li>
<li>
<p>有意义的命名：好的命名代码即注释</p>
<ul>
<li>变量名：能正确描述业务的名词，不要用缩略单词</li>
<li>函数名：要具体。要体现做什么，而不是怎么做。</li>
<li>类名：实体类要体现业务语义，并在团队内达成共识。辅助类通过实体名加后缀，尽量不要用Helper、Util这种太笼统的后缀</li>
<li>包名：一组有关系的类的集合，不要太抽象也不要太具体</li>
<li>模块名：相对于包来说粒度更大，一个模块中包含了多个包</li>
</ul>
</li>
<li>
<p>保持一致，一旦选中就要持续遵循，可以提高代码的可读性，从而简化复杂度</p>
<ul>
<li>
<p>每个概念一个词如：create新增，add添加，remove删除，update修改，get获取单个结果，list获取多个结果，page分页查询，count统计</p>
</li>
<li>
<p>使用对仗词：add/remove, increment/decrement, open/close, begin/end, insert/delete, show/hide, create/destroy, lock/unlock, source/target, first/last, min/max, start/stop, get/set, next/previous, up/down, old/new</p>
</li>
<li>
<p>后置限定词：用类似Total, Sum, Average, Max, Min, Count这样的词作为后置限定</p>
</li>
<li>
<p>统一业务语言：统一业务语言之后和前端、测试、开发、业务沟通起来就会顺畅很多</p>
</li>
<li>
<p>统一技术语言：DO, DAT, DTO, ServiceI, ServiceImpl, Component, Repository设置通用的技术语言之后，开发人员都能一眼明白</p>
</li>
</ul>
</li>
<li>
<p>白明的代码：好的代码是最好的文档，在不借助注释的情况下，代码本身就能向读者清晰的传达自身的含义</p>
<ul>
<li>中间变量：用有意义的变量名命名中间变量，可以把隐藏的计算过程明白的表达出来，可以一眼就看出代码逻辑</li>
<li>设计模式语言：用设计模式在命名上面体现出来，能让阅读代码的人领会设计者的意图</li>
<li>小心注释：<strong>如果是为了阐述代码背后的意图，那么注释是有意义的；如果只是复述代码功能（为了弥补代码的表达能力不足），那么注释就有了坏味道。</strong>
<ol>
<li>不要复述功能：为了复述代码功能而存在的注释，就要考虑注释是否需要，真正的高手是尽量不写注释</li>
<li>要解释背后的意图：为什么写这段代码，这个代码的意义。而不是写这段代码的作用。如Thread.sleep(2000), 好的注释是：休息2秒，为了等待关联系统的处理结果。没必要的注释：在这里等待2秒</li>
</ol>
</li>
</ul>
</li>
<li>
<p>命名工具：OnlineSearch插件，里面有海量的互联网上的开源代码。</p>
</li>
</ol>
<p>命名的力量就是语言的力量，好的命名是人和人之间沟通的桥梁。</p>
<h3 id="_1-2-规范" tabindex="-1"><a class="header-anchor" href="#_1-2-规范" aria-hidden="true">#</a> 1.2 规范</h3>
<ol>
<li>认知成本：在学习的过程中，需要交的学费就是认知成本。知识是人类对经验范围内的感觉进行总结归纳之后发现的规律。发现共同抽象和机制可以在很大程度上帮助我们理解复杂系统</li>
<li>混乱的代价：混乱是有代价的，我们有必要使用规范和约定来让大脑解脱出来，让有限的精力用在刀刃上面。</li>
<li>代码规范
<ul>
<li>代码格式：缩进、水平对齐、代码注释等，统一固定模版</li>
<li>空行规范：免费的空行可以让相关概念的代码在一起。如果每行代码后面都添加空行则空行就失去了意义。空行加好之后，在看代码的时候会清晰很多。</li>
<li>命名规范：类名大驼峰，方法小驼峰，常量全部大写，枚举Enum结尾，抽象类Abstract结尾，包名统一小写</li>
<li>日志规范：error-不能自己恢复的错误，warn-可预知的业务问题，info-记录系统的基本运行过程和运行状态，debug-调试信息</li>
<li>异常规范：定义业务异常和系统异常，统一兜底处理。错误码统一约定，在搭建系统的时候就要制定好规范，否则后面想改就很麻烦</li>
</ul>
</li>
<li>埋点规范：数据采集可以沉淀数据</li>
<li>架构规范：架构有约束，需要遵从这些约束，才能符合架构要求，否则架构就失去了意义</li>
<li>防止破窗：不要做“打破第一扇窗的人”，发现“破窗”后及时修复，不要让事情进一步恶化。整洁的代码需要每一个人精心维护</li>
</ol>
<p>制定规范是为了从无序走向有序，减少认知成本。</p>
<h3 id="_1-3-函数" tabindex="-1"><a class="header-anchor" href="#_1-3-函数" aria-hidden="true">#</a> 1.3 函数</h3>
<p>好的函数能够大大降低阅读代码的困难度，提升代码的可读性。在通往匠人的路上，好的函数必不可少。</p>
<ol>
<li>
<p>什么是函数：“凡此变数中函彼变数者，则此为彼之函数”</p>
</li>
<li>
<p>软件中的函数：函数是一组代码的集合，是程序中最小的功能模块。面向对象中叫方法。</p>
</li>
<li>
<p>封装判断：将判断封装起来能让代码更容易理解</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token comment">// 不明确的业务逻辑</span>
<span class="token keyword">if</span><span class="token punctuation">(</span>xxx<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>xxx<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> yyy<span class="token punctuation">.</span><span class="token function">equels</span><span class="token punctuation">(</span>yyy<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
	<span class="token comment">// 业务逻辑</span>
<span class="token punctuation">}</span>

<span class="token comment">// 明确的业务逻辑</span>
<span class="token keyword">if</span><span class="token punctuation">(</span><span class="token function">isEquals</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token comment">// 业务逻辑</span>
<span class="token punctuation">}</span>

<span class="token keyword">private</span> <span class="token keyword">boolean</span> <span class="token function">isEqueals</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>xxx<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>xxx<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>yyy<span class="token punctuation">.</span><span class="token function">equels</span><span class="token punctuation">(</span>yyy<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token boolean">false</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>函数参数化：最理想的参数数量是0，其次是1，再次是2，尽量避免3。参数越少越容易理解，如果参数超过3个就应该封装为一个类</p>
</li>
<li>
<p>短小的函数：建议一个方法不要超过20行</p>
</li>
<li>
<p>职责单一：一个方法只做一件事。函数太长，拆分是有意义的</p>
</li>
<li>
<p>精简辅助代码：如判空、打日志、缓存检查等，减少这些代码可以让函数中的代码更体现业务逻辑，而不是让业务代码淹没在辅助代码中</p>
<ul>
<li>优化判空：利用Optional简化判空</li>
<li>优化缓存判断：可以利用注解（方法注解+字段注解）自研缓存框架，减少缓存的辅助代码。</li>
<li>优雅降级：比如Spring Cloud Hystrix提供的优雅降级方案</li>
</ul>
</li>
<li>
<p>组合函数模式：将大函数拆分为多个步骤，并组合在一起。利用入口函数（入口函数读起来向执行步骤一样），将一个大函数拆分为多个子函数的集合。</p>
</li>
<li>
<p>SLAP(抽象层次一致性): 函数体中的内容必须在同一个抽象层次上。如：不要在入口函数里面通过判断执行相同的函数，可以在函数里面通过类型进行区分</p>
</li>
<li>
<p>函数式编程：把函数作为参数传递给另一个函数（1. 减少冗余代码，让代码更简洁。2. 函数是无副作用的可以并行处理而不用担心线程安全问题）</p>
</li>
</ol>
<p>不解决函数的复杂性，就很难解决系统的复杂性。函数不向面向对象那么复杂，但是写好一个好的函数不是一件容易的事情。</p>
<h3 id="_1-4-设计原则" tabindex="-1"><a class="header-anchor" href="#_1-4-设计原则" aria-hidden="true">#</a> 1.4 设计原则</h3>
<p>所谓原则，就是前人总结出来的一套经验，可以有效解决问题的指导思想和方法论</p>
<ol>
<li>SOLID(稳定的)，寓意可以建立稳定、灵活、健壮的系统（O、L是设计目标，S、I、D是设计方法）
<ul>
<li>S（SRP）单一职责原则: 要求软件职责要单一，模块中应该只有一个被修改的原因</li>
<li>0（OCP）开闭原则：对扩展开放，对修改关闭</li>
<li>L（LSP）里氏替换原则: 父类型都应该可以正确地被子类型替换
<ol>
<li>有强制类型转换和需要通过instanceof判断子类型的地方都不满足LSP</li>
<li>子类覆盖了父类的方法，改变了含义，这样会出现意想不到的问题</li>
</ol>
</li>
<li>I（LSP）接口隔离原则: 用多个专门的接口比使用一个宽泛用途的接口好</li>
<li>D（DIP）依赖倒置原则: 模块之间交互应该依赖抽象，而非实现。（面向接口编程）</li>
</ul>
</li>
<li>DRY: 系统的每个功能都应该是唯一的实现，不要开发重复的功能，避免散弹式修改</li>
<li>YAGNI: 你自以为有用的功能，实际上却用不到。除了核心功能外，其他功能都不要提前设计，这样可以大大加快开发进程</li>
<li>Rule of Three: 事不过三，三则重构。不赞成过度设计，也不赞成无设计。是DRY和YAGNL的一个平衡。</li>
<li>KILL原则：把事情变复杂很简单，把事情变简单很复杂。真正的简单不是不思考，而是先发散、在收敛。“宝剑锋从磨砺出”</li>
<li>POLA原则：最小惊奇原则，写代码不是写小说，要简单易懂，而不是是不是冒出个“Surprise”</li>
</ol>
<p>不要教条，软件是一种平衡的艺术。尽量减少系统的复杂度，在不能满足所有原则的时候，要懂得适当取舍</p>
<h3 id="_1-5-设计模式" tabindex="-1"><a class="header-anchor" href="#_1-5-设计模式" aria-hidden="true">#</a> 1.5 设计模式</h3>
<ol>
<li>模式：模式不是框架也不是过程，不是简单的“问题解决方案”，必须是典型问题的解决方案。要做到知道，但不滥用</li>
<li>GoF: 四人组收录了23种设计模式，分为创建型（怎样创建对象，将创建和使用分离）、结构型（将对象组成更大的结构）、行为型（类或对象之间如何相互协作完成单个对象无法单独完成的任务）</li>
<li>拦截器模式：可以在业务操作前后提供一些切面的操作</li>
<li>插件模式：插件在软件外部将独立的组件加入到软件中（开源软件JPF）</li>
<li>管道模式：体现了一种分治思想如：Stream API的原理就是管道模式</li>
</ol>
<h3 id="_1-6-模型" tabindex="-1"><a class="header-anchor" href="#_1-6-模型" aria-hidden="true">#</a> 1.6 模型</h3>
<ol>
<li>什么是模型：对现实世界的抽象
<ul>
<li>物理模型：飞机模型、汽车模型等</li>
<li>数学模型：建模过程，代数方程</li>
<li>概率模型：对真实世界中问题域的事物的描述</li>
<li>思维模型：把简单易懂的图形、符号或结构化语言等表达人们思考和解决问题的形式称为思维模型</li>
<li>模型不能代替现实：能解决问题的模型就是好模型</li>
</ul>
</li>
<li>UML: 提供了一套IT专业人员期待多年的统一标准建模符号</li>
<li>类图：用来描述类以及它们的相互关系
<ul>
<li>类的UML表示法：可见性（+共有的，-私有的，#受保护的）、名称（大驼峰字母）、类型（表示数据的基本数据类型）</li>
<li>类的关联关系：双向关联、限定关联、单向关联、自关联、聚合关系、组合关系、</li>
<li>类的依赖关系：将一个对象作为另一个类中方法的参数、一个类型将另一个类作为局部对象、一个类中调用另一个类的静态方法</li>
<li>类的泛化关系：继承关系（空心三角形的直线）</li>
<li>接口实现关系：只有操作的声明，没有操作的实现（用空心三角形的虚线）</li>
</ul>
</li>
<li>领域模型：帮助分析理解复杂业务领域问题、是分析人员和用户交流的有力工具、分析如何满足系统功能性需求</li>
<li>敏捷建模：模型能用来沟通和理解、尽量用简单的工具创建简单的模型、需求是变化的故模型也要随时变化、重点是交付软件不是交付模型（如果模型没有价值，就不要创建它们）</li>
<li>广义模型：凡是可以实现对复杂问题的抽象、帮助理解问题域、让沟通高效的图形化方法都是建模
<ul>
<li>C4模型：使用上下文、容器、组件和代码分层的图表</li>
<li>UI流程图：用页面之间的流转来描述系统交互流程</li>
<li>业务模版：用图形化的方式描述业务</li>
</ul>
</li>
</ol>
<p>只要有助于对问题域的理解，就是好的模型</p>
<h3 id="_1-7-ddd的精髓" tabindex="-1"><a class="header-anchor" href="#_1-7-ddd的精髓" aria-hidden="true">#</a> 1.7 DDD的精髓</h3>
<ol>
<li>什么是DDD: 通过统一语言、业务抽象、领域划分和领域建模等一系列手段控制软件复杂度的方法论</li>
<li>初步体验DDD: 将行为和业务逻辑放到实体，重构后类多了，但是每个类的职责更加单一，代码的可读性和扩展性随之提高</li>
<li>数据驱动和领域驱动
<ul>
<li>数据驱动：需求分析 &gt; 数据建模 &gt; 建库建表 &gt; 编写业务逻辑</li>
<li>领域驱动: 需求分许 &gt; 领域分析 &gt;  领域建模 &gt; 核心业务逻辑 &gt;  技术细节</li>
<li>ORM: 太理想化，期望通过工具把数据建模和领域建模合一，实践DDD建议不要使用工具建模</li>
</ul>
</li>
<li>优势
<ul>
<li>统一语言： 日常交流中术语无歧义，沟通效率会提高</li>
<li>面向对象：DDD强调业务抽象和面向对象编程（领域模型的设计精髓在于面向对象分析、对事物的抽象能力）</li>
<li>业务语义显性化：代码更容易被理解和维护，一切都是为了控制复杂度</li>
<li>分离业务逻辑和技术细节：核心业务逻辑对技术细节没有任何依赖，依赖都是由外向内。（数据库、框架、UI都是技术细节），业务逻辑不应该依赖框架</li>
</ul>
</li>
<li>核心概念
<ol>
<li>领域实体：软件系统就是现实世界的真实模拟（事物&gt;对象，职责&gt;职责，行为&gt;函数，关系&gt;关系），通过找名词的方式可以获得</li>
<li>聚合跟：更大范围的把一组相同生命周期和在业务上不可分割的实体和值对象放在一起，是一种内聚性的表现</li>
<li>领域服务：有些领域中的动作是一些动词，看上去不属于任何对象。它们代表领域中的重要行为，所有不能忽略它们或者简单的合并到某个实体或对象中。这样的行为从领域中识别出来后推荐的方式就是把它声明为服务。</li>
<li>领域事件：一个特定领域由一个用户动作触发的，是发生在过去的行为产生的事件，这个事件是系统的其他部分或相关系统感兴趣的。</li>
<li>边界上下文：限定模型的应用范围，在同一个上下文中要保证模型在逻辑上统一，不用考虑它是不是适用于边界之外的情况。</li>
</ol>
</li>
<li>领域建模方法
<ol>
<li>用例分析法：获取用户描述 &gt; 寻找概念类 &gt; 添加关联 &gt; 添加属性 &gt; 模型精化</li>
<li>四色建模法：任务关键时刻 &gt; 角色 &gt; 人、事、物 &gt; 描述</li>
</ol>
</li>
<li>模型演化: 建模不是一次性的工作，世界上唯一不变的就是变化，通过快速的改变来维护更加具体的模型</li>
<li>为什么饱受争议
<ul>
<li>照搬概念： 没有领会精髓就在项目中加入概念</li>
<li>抽象的灵活性：不合理的抽象不如没有抽象，不同的人看问题的角度和对业务的理解各有不同</li>
<li>领域层的边界：如何划分Application层逻辑和Domain层逻辑是很模糊的，不容易找到边界</li>
</ul>
</li>
</ol>
<p>对于DDD自己还是没有很好的理解，大部分都只是搬运了一下书上的内容加深了一下自己的理解</p>
<h2 id="二-思想" tabindex="-1"><a class="header-anchor" href="#二-思想" aria-hidden="true">#</a> 二 思想</h2>
<h3 id="_2-1-抽象" tabindex="-1"><a class="header-anchor" href="#_2-1-抽象" aria-hidden="true">#</a> 2.1 抽象</h3>
<ol>
<li>伟大的抽象：人类之所以成为人类，是因为人类能够想象。（归类）</li>
<li>到底什么是抽象：抽象就是简化事物，抓住事物本质的过程</li>
<li>抽象是OO的基础: 万物皆对象，抽象帮我们将现实世界的对象抽象为类，完成了现实世界到计算机世界的模型映射</li>
<li>抽象的层次：抽象是有不同层次的，抽象程度越高所包含的东西就越多，含义就越宽泛，忽略的细节就越多。</li>
<li>如何进行抽象
<ul>
<li>寻找共性：合并同类项、归并分类、寻找共性的过程</li>
<li>提升抽象层次：当发现有些无法归到一个类时，就可以往上提升一个抽象层次</li>
<li>构筑金字塔：金字塔结构通过抽象形成不同的抽象层次，便于理解和记忆</li>
</ul>
</li>
<li>如何提升抽象思维
<ul>
<li>多阅读：阅读的过程可以锻炼我们的抽象能力、想象能力。抽象思维的差别区分了孩子们的学习成绩，零件部件、车床等更加具象，因此不适应抽象训练的孩子就可能去选择读职业技校</li>
<li>多总结：读书笔记最好不要抄写，要添加自己的理解，用自己的话归纳总结，这样不仅提升自己的抽象思维还可以加深理解（感觉自己这方面没做好）</li>
<li>领域建模训练：直接去进行领域建模，在实践的过程中就是在锻炼自己的抽象能力</li>
</ul>
</li>
</ol>
<p>自己要坚持锻炼自己的抽象能力，寻找抽象之美</p>
<h3 id="_2-2-分治" tabindex="-1"><a class="header-anchor" href="#_2-2-分治" aria-hidden="true">#</a> 2.2 分治</h3>
<p>分治思想是人类进化过程中伟大的智慧，是我们解决问题的不二选择</p>
<ol>
<li>分支算法：分解 &gt; 求解 &gt; 合并(归并排序、二分搜索、k选择问题)</li>
<li>函数分解：将大函数分为多个小的函数</li>
<li>写代码的两次创造: 第一遍实现功能，第二遍重构优化</li>
<li>分治模式：责任链和装饰者模式都是分治的思想</li>
<li>分层设计：
<ul>
<li>分层网络模型：TCP/IP的四层模型</li>
<li>分层架构：通过分离关注点来降低系统的复杂度</li>
</ul>
</li>
<li>横切和竖切：分库分表的水平拆分和垂直拆分</li>
</ol>
<h3 id="_2-3-技术人的素养" tabindex="-1"><a class="header-anchor" href="#_2-3-技术人的素养" aria-hidden="true">#</a> 2.3 技术人的素养</h3>
<ol>
<li>
<p>不教条：软件中没有“银弹”。“控制软件复杂度”才是软件开发中最重要的原则</p>
<ul>
<li>瀑布/敏捷?：不要纠结用哪种方法开发，开发的过程都是需求 &gt; 分析与设计 &gt; 实现 &gt; 测试 &gt; 部署。综合各种方式找到最优的方式才是最好的办法</li>
<li>贫血/充血?: 开发的核心是有没有有效的控制复杂度，如果没有抓住本质就容易造成系统的复杂度</li>
<li>单体/分布式?: 当系统不满足业务需求的时候，必然需要分布式系统</li>
</ul>
</li>
<li>
<p>批判性思维：不被动全盘接受，也不刻意反驳一个观点。明知道对方乱说，却无法找到反驳的理由就需要批判性思维。</p>
</li>
<li>
<p>成长型思维: 把失败当成学习的机会，积极主动的去学习和寻找解决方案。工作遇到挫折和挑战的时候要用【成长型思维】去面对</p>
</li>
<li>
<p>结构化思维：无法把一件事情说明白就是没有结构化思维，这就是我所欠缺的。</p>
<ul>
<li>逻辑：演绎顺序（大前提、小前提、结论），时间(步骤)顺序（第一、第二、第三），空间（结构）顺序（前端、后端、数据），程度（重要性）顺序（最重要、次重要、不重要）</li>
<li>套路：why(who、when、where、what、what、how、how much)</li>
</ul>
<ol>
<li>如何落地新团队：
<ul>
<li>熟悉业务：了解业务形态、了解业务流程、走访客户</li>
<li>熟悉技术：了解系统架构、了解领域模型、了解代码结构</li>
<li>熟悉人：了解组织结构、了解人员角色、勤沟通</li>
</ul>
</li>
<li>如何做晋级述职： 提出问题、定义问题、分析问题、解决问题、展望未来</li>
</ol>
</li>
<li>
<p>工具化思维：适当的懒比低效的勤奋更有智慧（磨刀不误砍柴工），不要举步维艰还拒绝改变</p>
<ul>
<li>实在懒：拖延不喜欢的任务</li>
<li>开明懒：快速做完自己不喜欢的任务，以摆脱之</li>
<li>智慧懒：写工具去完成不喜欢的任务，一劳永逸</li>
</ul>
</li>
<li>
<p>好奇心：好奇心是创新的驱动力，持续学习才能创造价值并且快乐</p>
</li>
<li>
<p>做笔记：知识内化、形成知识体系、方便回顾。做笔记时候尽量归类分组方便自己查找，不要复制粘贴要记录自己吸收吸收消化之后的东西，简短内容的重点突出</p>
</li>
<li>
<p>有目标：没有带着目标去学习很容易找不到方向，有了目标就会事半功倍</p>
</li>
<li>
<p>选择的自由：<strong>自由不是想做什么就做什么，自由是为自己过去、现在、未来负责的一种价值观。自由是一种责任，是一种敢于做出选择，并愿意为自己选择承担后果的责任</strong></p>
</li>
<li>
<p>平和的心态：做事要积极，心态要放平。“动机至善，了无私心；用无为的心，做有为的事”</p>
</li>
<li>
<p>精进：每天进步一点点，滴水穿石。“人生就像滚雪球，关键就是找到足够多的雪，和足够长的坡”</p>
</li>
</ol>
<h3 id="_2-4-技术leader的修养" tabindex="-1"><a class="header-anchor" href="#_2-4-技术leader的修养" aria-hidden="true">#</a> 2.4 技术Leader的修养</h3>
<ol>
<li>技术氛围：一个技术团队如果没有“技术味道”，那个Leader要负很大的责任
<ul>
<li>代码好坏味道：每周成员轮流组织分享自己找到的3个代码好味道和代码坏味道</li>
<li>技术分享：用分享倒逼我们去学习，一个人学习整个团队都有了解和认知</li>
<li>CR周报：透明的代码审查</li>
<li>读书会：看中学习能力。书的范围放宽、读书的方式可以是几章可以读同一本书、频率灵活</li>
</ul>
</li>
<li>目标管理
<ul>
<li>什么是OKR: 目标与关键成果区别于KPI</li>
<li>SMART原则：S-指标要具体，M-指标要可衡量，A-指标是有可能达成的，R-表示kr和o要有一定关联性，T-具有明确的截止期限</li>
<li>OKR设定：目标要足够有野心，只有高远的目标，才能最大程度的激发人的潜能</li>
</ul>
</li>
<li>技术规划：分而治之
<ul>
<li>当前问题：马上需要解决的问题</li>
<li>技术领域：根据优先级去判断使用那些技术领域等</li>
<li>业务领域：让业务先赢是技术的首要使命</li>
<li>团队特色：寻找自己团队的特色（差异化部分）</li>
</ul>
</li>
<li>推理阶梯：不要轻易对员工做推理。在做决定之前一定要问问自己“此事是否可能只是我的推理，实际情况并非如此”。</li>
<li>Leader和Manager的区别：Manager是控制和权威,Leader是引领和激发。<strong>“我们不需要那么多‘高高在上’，‘指点江山”的技术Manager,而是需要能深入系统，深入技术细节，给团队带来改变的技术Leader</strong></li>
<li>视人为人：对待上级-有胆量，对待平级-有肺腑，对待下级-有心肝。</li>
</ol>
<h2 id="三-实践" tabindex="-1"><a class="header-anchor" href="#三-实践" aria-hidden="true">#</a> 三 实践</h2>
<h3 id="_3-1-cola架构" tabindex="-1"><a class="header-anchor" href="#_3-1-cola架构" aria-hidden="true">#</a> 3.1 COLA架构</h3>
<ol>
<li>软件架构：架构始于建筑，是人类发展分工协作的需要（业务架构、应用架构、系统架构、数据架构、物理架构、运维架构）</li>
<li>典型的应用架构
<ul>
<li>分层架构：根据系统角色和组织代码单元的常规实践</li>
<li>CQRS: 任何一个对象的方法都可以分为命令和查询</li>
<li>六边形架构：也是分层架构，不是上下，而是内部和外部</li>
<li>洋葱架构：提供了一个完全独立的对象模型，在架构层面运用了依赖倒置原则</li>
<li>DDD: 以数据驱动转向为领域驱动</li>
</ul>
</li>
<li>COLA架构设计
<ul>
<li>分层设计：一种改良的三层架构（展现层、应用层、领域层、基础设施层）</li>
<li>扩展设计：每个业务或者场景都可以实现一个或多个扩展点</li>
<li>规范设计：组件规范、包规范、命名规范、</li>
</ul>
</li>
<li>COLA测试：单元测试、集成测试、ColaMock(自研的mock工具)</li>
</ol>
<h3 id="_3-2-工匠平台" tabindex="-1"><a class="header-anchor" href="#_3-2-工匠平台" aria-hidden="true">#</a> 3.2 工匠平台</h3>
<ol>
<li>项目背景：技术人员的画像，反应技术人员的技术贡献</li>
<li>整理需求：应用质量、技术影响力、技术贡献、开发质量</li>
<li>工匠demo：团队成员列表页面、个人详情页面</li>
<li>使用COLA: 安装、搭建应用</li>
<li>领域模型
<ul>
<li>领域建模：代码和模型的迭代是交替、螺旋式前进的</li>
<li>领域词汇表：通过建模过程整理出核心的领域词汇</li>
</ul>
</li>
<li>核心业务逻辑：核心业务逻辑不依赖任何技术细节</li>
<li>实现技术细节
<ul>
<li>数据存储：领域模型关注业务抽象，将少量的数据进行数据落库</li>
<li>控制器：利用Controller实现</li>
</ul>
</li>
<li>单元测试：测试范围小、运行速度快</li>
<li>集成测试：用mock数据进行测试</li>
<li>回归测试：有了单元测试和集成测试之后，在改代码后只要回归了这些测试就很方便的可以进行预发布验证</li>
</ol>
<p>总结：上周把整本书看完之后，感觉自己没什么印象，今天10点抵达图书馆把整本书有过了一遍，还是有不少的收获。唯一不足的就是大部分的都是抄的书目录，自己没有归纳总结。唯一的收获就是加深了自己的理解也加深了自己的印象，在以后的工作中可以经常回顾一下，时常巩固才能有所提高。以后要加强自己的归纳总结的能力，争取能有更多的收获。加油^o^!</p>
</div></template>


