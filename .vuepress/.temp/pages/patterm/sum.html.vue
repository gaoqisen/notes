<template><div><blockquote>
<p>已经将head first一书看完了，应该总结一下这本书学到了些什么，下面就将自己学习的设计模式整理一下，方便自己后期复习，以及简短的描述各个设计模式的定义，以及在哪些方面需要使用到设计模式。</p>
</blockquote>
<h2 id="什么是设计模式" tabindex="-1"><a class="header-anchor" href="#什么是设计模式" aria-hidden="true">#</a> 什么是设计模式</h2>
<p>设计模式就是很多面向对象的开发者，根据自己开发的经验，想出来的一些模式，经过时间的认证和大多数程序员的认同后形成的一种比较好的开发模式。利用这些模式，程序员之间可以有自己的方言，程序之间沟通也更加便捷。也很利于代码的维护和扩展。是一套反复使用、多人知晓、分类遍目的代码设计经验的总结。</p>
<h2 id="模式词汇-23个" tabindex="-1"><a class="header-anchor" href="#模式词汇-23个" aria-hidden="true">#</a> 模式词汇(23个)</h2>
<table>
<thead>
<tr>
<th style="text-align:left">创建型</th>
<th style="text-align:left">5个</th>
<th style="text-align:left"></th>
<th style="text-align:left"></th>
<th style="text-align:left"></th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">singleton 单例</td>
<td style="text-align:left">builder 生成器（建造者）</td>
<td style="text-align:left">prototype  原型</td>
<td style="text-align:left">abstract factory 抽象工厂</td>
<td style="text-align:left">factory method 工厂方法</td>
</tr>
</tbody>
</table>
<table>
<thead>
<tr>
<th style="text-align:left">行为型</th>
<th style="text-align:left">11个</th>
<th style="text-align:left"></th>
<th style="text-align:left"></th>
<th style="text-align:left"></th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">template method 模版方法</td>
<td style="text-align:left">command 命令</td>
<td style="text-align:left">observer 观察者</td>
<td style="text-align:left">state 状态</td>
<td style="text-align:left">mediator 中介</td>
</tr>
<tr>
<td style="text-align:left">iterator  迭代器</td>
<td style="text-align:left">strategy 策略</td>
<td style="text-align:left">interpreter 解释器</td>
<td style="text-align:left">chain of responsibility 责任链</td>
<td style="text-align:left">memento 备忘录</td>
</tr>
<tr>
<td style="text-align:left">visitor 访问者</td>
<td style="text-align:left"></td>
<td style="text-align:left"></td>
<td style="text-align:left"></td>
<td style="text-align:left"></td>
</tr>
</tbody>
</table>
<table>
<thead>
<tr>
<th style="text-align:left">结构型</th>
<th style="text-align:left">7个</th>
<th style="text-align:left"></th>
<th style="text-align:left"></th>
<th style="text-align:left"></th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">proxy 代理</td>
<td style="text-align:left">decorator 装饰</td>
<td style="text-align:left">composite 复合</td>
<td style="text-align:left">facade 外观</td>
<td style="text-align:left">adapter 适配器</td>
</tr>
<tr>
<td style="text-align:left">flyweight 享元</td>
<td style="text-align:left">bridge 桥接</td>
<td style="text-align:left"></td>
<td style="text-align:left"></td>
<td style="text-align:left"></td>
</tr>
</tbody>
</table>
<h2 id="模式何时用" tabindex="-1"><a class="header-anchor" href="#模式何时用" aria-hidden="true">#</a> 模式何时用</h2>
<h3 id="创建型模式" tabindex="-1"><a class="header-anchor" href="#创建型模式" aria-hidden="true">#</a> 创建型模式</h3>
<table>
<thead>
<tr>
<th style="text-align:left">模式名称</th>
<th style="text-align:left">何时用</th>
<th style="text-align:left">备注</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">单例 singleton</td>
<td style="text-align:left">你需要程序中只用一个共享的对象</td>
<td style="text-align:left">确保一个类只有一个实例</td>
</tr>
<tr>
<td style="text-align:left">建造者 builder</td>
<td style="text-align:left">需要创建一个复杂对象的时候</td>
<td style="text-align:left">由多个简单对象构建为一个复杂对象</td>
</tr>
<tr>
<td style="text-align:left">原型 prototpye</td>
<td style="text-align:left">需要创建许多重复且互不干扰的对象时</td>
<td style="text-align:left">通过复制对象实现</td>
</tr>
<tr>
<td style="text-align:left">抽象工厂 abstract factory</td>
<td style="text-align:left">创建一系列产品族时（多个产品）</td>
<td style="text-align:left">提供一个创建一系列相互依赖对象的接口</td>
</tr>
<tr>
<td style="text-align:left">工厂方法 factory method</td>
<td style="text-align:left">想动态产生你想要的具体对象（单个产品）</td>
<td style="text-align:left">通过简单工厂模式的抽象和推广</td>
</tr>
</tbody>
</table>
<h3 id="行为型模式" tabindex="-1"><a class="header-anchor" href="#行为型模式" aria-hidden="true">#</a> 行为型模式</h3>
<table>
<thead>
<tr>
<th style="text-align:left">模式名称</th>
<th style="text-align:left">何时用</th>
<th style="text-align:left">备注</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">模版方法 template method</td>
<td style="text-align:left">很多类都需要执行固定或者可选的步骤</td>
<td style="text-align:left">可以用钩子实现不改变算法结构的时候改变步骤</td>
</tr>
<tr>
<td style="text-align:left">命令 command</td>
<td style="text-align:left">多个回退操作，宏纪录</td>
<td style="text-align:left">通过把请求或操作封装到类中，支持撤销、恢复操作</td>
</tr>
<tr>
<td style="text-align:left">观察者 observer</td>
<td style="text-align:left">想让你的发送者和接收者不用同步阻塞的时候</td>
<td style="text-align:left">依赖它的对象都会收到通知并自动更新，就像微信订阅号</td>
</tr>
<tr>
<td style="text-align:left">迭代器 iterator</td>
<td style="text-align:left">遍历不同类型集合的一种方式</td>
<td style="text-align:left">通过访问迭代器接口实现‘下一个’、和’有下一个方法‘</td>
</tr>
<tr>
<td style="text-align:left">策略 strategy</td>
<td style="text-align:left">客服端可以根据自己的需求进行相应的选择</td>
<td style="text-align:left">把一系列的算法分别封装到对应的类中，实现相同接口之后可以相互替换</td>
</tr>
<tr>
<td style="text-align:left">解释器模式 interpreter</td>
<td style="text-align:left">当需要使用一个简单的语言时</td>
<td style="text-align:left">将每一个语法规则表示为一个类</td>
</tr>
<tr>
<td style="text-align:left">访问者 visitor</td>
<td style="text-align:left">在封装不是很重要，需要给类添加新的能力时</td>
<td style="text-align:left">封装某些结构元素的操作，在不改变数据结构的情况下新增新的操作</td>
</tr>
<tr>
<td style="text-align:left">中介者 mediator</td>
<td style="text-align:left">利用中介者改善类与类之间的过多耦合</td>
<td style="text-align:left">利用星型结构改善(降低多个对象和类之间的通信复杂性)</td>
</tr>
<tr>
<td style="text-align:left">备忘录</td>
<td style="text-align:left">在需要纪录操作备忘时，捕获类的内部状态</td>
<td style="text-align:left">将被记录的状态记录在外部，帮助维护类聚</td>
</tr>
<tr>
<td style="text-align:left">责任链 chain of responsibility</td>
<td style="text-align:left">一个请求需要多个对象处理，形成链条</td>
<td style="text-align:left">让对个对象都可以接受请求，就像请假一样(日志打印、请求等)</td>
</tr>
<tr>
<td style="text-align:left">状态 state</td>
<td style="text-align:left">在内部状态改变时，进行不同的行为操作</td>
<td style="text-align:left">一个状态一个类，改变状态时，对象看这向修改了类</td>
</tr>
</tbody>
</table>
<h3 id="结构型模式" tabindex="-1"><a class="header-anchor" href="#结构型模式" aria-hidden="true">#</a> 结构型模式</h3>
<table>
<thead>
<tr>
<th style="text-align:left">模式名称</th>
<th style="text-align:left">何时用</th>
<th style="text-align:left">备注</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">代理 proxy</td>
<td style="text-align:left">A调不到C，而A可以通过B来调C</td>
<td style="text-align:left">通过类似黄牛的代理角色去处理</td>
</tr>
<tr>
<td style="text-align:left">装饰者 decorator</td>
<td style="text-align:left">动态的给类添加职责，有别于继承的另外一种选择</td>
<td style="text-align:left">通过动态运行时选择不同的具体装饰类，从而实现不同的行为。常见的就是io流</td>
</tr>
<tr>
<td style="text-align:left">组合模式 composite</td>
<td style="text-align:left">树状结构的数据时</td>
<td style="text-align:left">处理树状结构时候使用</td>
</tr>
<tr>
<td style="text-align:left">外观模式 facade</td>
<td style="text-align:left">接口特别多，比较混乱，需要统一调用时</td>
<td style="text-align:left">将各个接口统一在一个类中，调用时只需要调用一次</td>
</tr>
<tr>
<td style="text-align:left">适配器 adapter</td>
<td style="text-align:left">将一个对象转化为另一个对象</td>
<td style="text-align:left">就想转换插头，适配不同的插座一样</td>
</tr>
<tr>
<td style="text-align:left">享元模式 flyweight</td>
<td style="text-align:left">共享之前的元对象，减少实例化次数</td>
<td style="text-align:left">在相同的对象特别多的时候，通过map存储对象。每次需要新对象时，就去map里面查找，没有则创建</td>
</tr>
<tr>
<td style="text-align:left">桥接模式 bridge</td>
<td style="text-align:left">好几个接口，需要同时使用他们的部分特性</td>
<td style="text-align:left">就像多种颜色和多种形状组合一样，两种类别都需要扩展</td>
</tr>
</tbody>
</table>
<h2 id="模式定义与用途" tabindex="-1"><a class="header-anchor" href="#模式定义与用途" aria-hidden="true">#</a> 模式定义与用途</h2>
<h3 id="创建型模式-1" tabindex="-1"><a class="header-anchor" href="#创建型模式-1" aria-hidden="true">#</a> 创建型模式</h3>
<h4 id="单例模式" tabindex="-1"><a class="header-anchor" href="#单例模式" aria-hidden="true">#</a> 单例模式</h4>
<ul>
<li>
<p>定义：确保一个类只有一个实例，并提供全局访问点</p>
</li>
<li>
<p>用途：当只需要一个实例的时候</p>
</li>
</ul>
<h4 id="建造者模式" tabindex="-1"><a class="header-anchor" href="#建造者模式" aria-hidden="true">#</a> 建造者模式</h4>
<ul>
<li>
<p>定义：将复杂对象的建造过程抽象出来（抽象类别），使这个抽象过程的不同实现方法可以构造出不同表现（属性）的对象。</p>
</li>
<li>
<p>用途：经常被用来创建组合结构</p>
</li>
</ul>
<h4 id="原型模式" tabindex="-1"><a class="header-anchor" href="#原型模式" aria-hidden="true">#</a> 原型模式</h4>
<ul>
<li>
<p>定义：通过‘复制’一个已经存在的实例来返回新的实例，而不是新建实例。被复制的实例就是我们称之为的‘原型’，这个原型是可定制的。</p>
</li>
<li>
<p>用途：在一个复杂的类层次中，当系统必须从其中的许多类型创建新对象的时候，可以考虑使用原型。</p>
</li>
</ul>
<h4 id="抽象工厂模式" tabindex="-1"><a class="header-anchor" href="#抽象工厂模式" aria-hidden="true">#</a> 抽象工厂模式</h4>
<ul>
<li>
<p>定义：提供一个创建一系列相关或相互依赖对象的接口。</p>
</li>
<li>
<p>用途：系统中有多个的产品族，而每次只使用一个产品族。用来创建一系列相关或相互依赖对象的接口</p>
</li>
</ul>
<h4 id="工厂方法模式" tabindex="-1"><a class="header-anchor" href="#工厂方法模式" aria-hidden="true">#</a> 工厂方法模式</h4>
<ul>
<li>
<p>定义：由子类决定要创建的具体类是那一个</p>
</li>
<li>
<p>用途：由工厂生产产品，如果用简单工厂模式生产新的产品，就要更改工厂类，违背了开闭原则。工厂方法模式就是将类更工厂化，让扩展更简单。</p>
</li>
</ul>
<h3 id="行为型模式-1" tabindex="-1"><a class="header-anchor" href="#行为型模式-1" aria-hidden="true">#</a> 行为型模式</h3>
<h4 id="模版方法" tabindex="-1"><a class="header-anchor" href="#模版方法" aria-hidden="true">#</a> 模版方法</h4>
<ul>
<li>
<p>定义：在一个方法中定义一个算法的骨架,而将一些步骤延伸到之类中，模版方法使得之类可以在不改变算法结构的情况下，重新定义算法中的某些步骤</p>
</li>
<li>
<p>用途：一个可共用的模版，在共用的方法中子类可以利用钩子重新定义算法步骤。</p>
</li>
</ul>
<h4 id="命令模式" tabindex="-1"><a class="header-anchor" href="#命令模式" aria-hidden="true">#</a> 命令模式</h4>
<ul>
<li>
<p>定义：将请求封装成对象，这可以让你使用不同的请求、队列或者日志请求来参数化其他对象。命令模式也支持撤销操作</p>
</li>
<li>
<p>用途：将单个的请求封装为对象。</p>
</li>
</ul>
<h4 id="观察者模式" tabindex="-1"><a class="header-anchor" href="#观察者模式" aria-hidden="true">#</a> 观察者模式</h4>
<ul>
<li>
<p>定义：让对象在状态改变时被通知</p>
</li>
<li>
<p>用途：观察者模式就是相当于公众号一样，你关注公众号就会受到消息，取消就收不到消息，一对多的关系。</p>
</li>
</ul>
<h4 id="迭代器" tabindex="-1"><a class="header-anchor" href="#迭代器" aria-hidden="true">#</a> 迭代器</h4>
<ul>
<li>
<p>定义：提供一种方法，顺序访问一个聚合对象中的各个元素，而又不暴露内部的实现。</p>
</li>
<li>
<p>用途：用来遍历集合中有不同对象的一种统一方式。</p>
</li>
</ul>
<h4 id="策略模式" tabindex="-1"><a class="header-anchor" href="#策略模式" aria-hidden="true">#</a> 策略模式</h4>
<ul>
<li>
<p>定义：封装可以交互的行为，并使用委托来决定要使用那一个</p>
</li>
<li>
<p>用途：策略模式就是通过不同的策略可以给对象组装不同的行为，比如给小猫小狗添加不同的行为等。</p>
</li>
</ul>
<h4 id="解释器模式" tabindex="-1"><a class="header-anchor" href="#解释器模式" aria-hidden="true">#</a> 解释器模式</h4>
<ul>
<li>
<p>定义：提供了评估语言的语法或表达式的方式，这种模式实现了一个表达式接口，该接口解释一个特定的上下文。</p>
</li>
<li>
<p>用途: 当需要实现一个简单的语言时，可以使用解释器。</p>
</li>
</ul>
<h4 id="访问者模式" tabindex="-1"><a class="header-anchor" href="#访问者模式" aria-hidden="true">#</a> 访问者模式</h4>
<ul>
<li>
<p>定义：封装某些作用于某种数据结构中各元素的操作，它可以在不改变数据结构的情况下定义作用于这些元素的新的操作。</p>
</li>
<li>
<p>用途：当你想要为一个对象的组合增加新的能力，且封装并不重要时，可以使用访问者模式。</p>
</li>
</ul>
<h4 id="中介者模式" tabindex="-1"><a class="header-anchor" href="#中介者模式" aria-hidden="true">#</a> 中介者模式</h4>
<ul>
<li>
<p>定义：用一个中介者对象封装一系列的对象交互，中介者使各对象不需要显示的相互作用，从而时耦合松散，而且可以独立地改变它们之间的交互。</p>
</li>
<li>
<p>用途：使用中介者模式来集中相关对象之间复杂的沟通和控制方式。常常用来协调相关的GUI组件。</p>
</li>
</ul>
<h4 id="备忘录模式" tabindex="-1"><a class="header-anchor" href="#备忘录模式" aria-hidden="true">#</a> 备忘录模式</h4>
<ul>
<li>
<p>定义：在不破坏封装的情况下，捕获一个对象的内部状态，并在该对象之外保存这个状态。这样就可以将该对象恢复到原先保存的状态。</p>
</li>
<li>
<p>用途：当你需要让对象返回之前的状态，如你的用户请求‘撤销’，就可以使用备忘录模式。常常用来存储状态。</p>
</li>
</ul>
<h4 id="责任链模式" tabindex="-1"><a class="header-anchor" href="#责任链模式" aria-hidden="true">#</a> 责任链模式</h4>
<ul>
<li>
<p>定义：使多个对象都有机会处理请求，从而避免了请求的发送者与接收者之间的耦合关系。将这些对象连成一条链，并沿着一条链传递这请求，直到有对象处理它为止。</p>
</li>
<li>
<p>用途：当你想让一个以上的对象能有机会处理某个请求的时候，就可以使用责任链模式。</p>
</li>
</ul>
<h4 id="状态模式" tabindex="-1"><a class="header-anchor" href="#状态模式" aria-hidden="true">#</a> 状态模式</h4>
<ul>
<li>
<p>定义：允许一个对象在其内部状态发生改变时改变它的行为，对象看起来似乎修改了它的类。又叫状态对象。</p>
</li>
<li>
<p>用途：在工作流和游戏等类型的软件中经常使用，经常处理一批状态。比如请假流程（主管批准、经理批准、总经理批准）</p>
</li>
</ul>
<h3 id="结构型模式-1" tabindex="-1"><a class="header-anchor" href="#结构型模式-1" aria-hidden="true">#</a> 结构型模式</h3>
<h4 id="代理模式" tabindex="-1"><a class="header-anchor" href="#代理模式" aria-hidden="true">#</a> 代理模式</h4>
<ul>
<li>
<p>定义：为另一个对象提供一个替身或占位符以访问这个对象。</p>
</li>
<li>
<p>用途：代理常常用来保护目标对象的作用，协调调用者和被调用者，降低了系统的耦合度。</p>
</li>
</ul>
<h4 id="装饰者模式" tabindex="-1"><a class="header-anchor" href="#装饰者模式" aria-hidden="true">#</a> 装饰者模式</h4>
<ul>
<li>
<p>定义：包装一个对象，并提供新的行为</p>
</li>
<li>
<p>用途：就像装修房子一样，选择不同的厂商，不同的材料装饰房子。java io流就是使用的装饰模式</p>
</li>
</ul>
<h4 id="复合模式" tabindex="-1"><a class="header-anchor" href="#复合模式" aria-hidden="true">#</a> 复合模式</h4>
<ul>
<li>
<p>定义：结合两个或两个以上的模式，组成一个解决方案，解决一再发生的一般性问题。</p>
</li>
<li>
<p>用途：通过多个模式去解决复杂的问题，实现不同的功能。常见的就是mvc模式</p>
</li>
</ul>
<h4 id="外观模式" tabindex="-1"><a class="header-anchor" href="#外观模式" aria-hidden="true">#</a> 外观模式</h4>
<ul>
<li>
<p>定义：提供了一个统一的接口。用来访问子系统中的一群接口。外观定义了一个高层接口，让子系统更容易访问。</p>
</li>
<li>
<p>用途: 封装一个统一的接口，就像很多插头插在一个大擦板上面，每次使用的时候，只需要按大插板的开关。</p>
</li>
</ul>
<h4 id="适配器模式" tabindex="-1"><a class="header-anchor" href="#适配器模式" aria-hidden="true">#</a> 适配器模式</h4>
<ul>
<li>
<p>定义：将一个类的接口，转换成客户期望的另一个接口。适配器让原本接口不兼容的类可以合作无间。</p>
</li>
<li>
<p>用途: 就像转换插头一样，转换接口。</p>
</li>
</ul>
<h4 id="享元模式" tabindex="-1"><a class="header-anchor" href="#享元模式" aria-hidden="true">#</a> 享元模式</h4>
<ul>
<li>
<p>定义：运用共享技术有效地支持大量细粒度对象的复用，系统只使用少量的对象，而这些对象都很相似，状态变化很小，可以实现对象的多次反复使用，由于享元模式对象需要是细粒度对象，所以又叫轻量模式、蝇量模式。</p>
</li>
<li>
<p>用途：如果想让某个实例能提供很多的虚拟实例，就可以使用享元模式，也叫蝇量模式。</p>
</li>
</ul>
<h4 id="桥接模式" tabindex="-1"><a class="header-anchor" href="#桥接模式" aria-hidden="true">#</a> 桥接模式</h4>
<ul>
<li>
<p>定义：将抽象部分与它的实现部分分离，使它们可以独立的变化</p>
</li>
<li>
<p>用途：不只改变你的实现，也改变你的抽象，适合使用在跨越多个平台的图形和窗口系统上。</p>
</li>
</ul>
</div></template>


