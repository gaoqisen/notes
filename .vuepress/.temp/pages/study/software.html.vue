<template><div><h2 id="第一章-绪论" tabindex="-1"><a class="header-anchor" href="#第一章-绪论" aria-hidden="true">#</a> 第一章  绪论</h2>
<h3 id="软件危机" tabindex="-1"><a class="header-anchor" href="#软件危机" aria-hidden="true">#</a> 软件危机</h3>
<p>随着计算机的广泛应用，软件生产率、软件质量远远满足不了社会发展的需求，成为社会、经济发展的制约因素，人们把这种现象称为“软件危机”</p>
<h3 id="软件工程" tabindex="-1"><a class="header-anchor" href="#软件工程" aria-hidden="true">#</a> 软件工程</h3>
<p>其目的是倡导以工程的原理、原则和方法进行软件开发，以期解决“软件危机”。</p>
<h2 id="第二章-软件需求与软件需求规约" tabindex="-1"><a class="header-anchor" href="#第二章-软件需求与软件需求规约" aria-hidden="true">#</a> 第二章  软件需求与软件需求规约</h2>
<h3 id="需求与需求获取" tabindex="-1"><a class="header-anchor" href="#需求与需求获取" aria-hidden="true">#</a> 需求与需求获取</h3>
<h4 id="需求定义" tabindex="-1"><a class="header-anchor" href="#需求定义" aria-hidden="true">#</a> 需求定义</h4>
<ul>
<li>一个需求是一个‘要予构造’的陈述，描述了一个待开发产品/系统应该具有的功能、性能和其他性质。</li>
<li>单一一个需求的5个基本性质：必要的、误歧义的、可测的、可跟踪的、可测量的。</li>
</ul>
<h4 id="需求分类" tabindex="-1"><a class="header-anchor" href="#需求分类" aria-hidden="true">#</a> 需求分类</h4>
<ul>
<li>功能需求</li>
<li>非功能需求：性能需求、外部接口需求（用户接口、硬件接口、软件接口、通信接口、内存约束、运行、地点需求）、设计约束（法规政策、硬件限制、与其他应用的接口、并发操作、审计功能、控制功能、高级语言需求、握手协议应用的关键程度、安全和保密）、质量属性</li>
</ul>
<h4 id="需求发现技术" tabindex="-1"><a class="header-anchor" href="#需求发现技术" aria-hidden="true">#</a> 需求发现技术</h4>
<p>自悟、交谈、观察、小组会、提炼</p>
<h3 id="需求规约" tabindex="-1"><a class="header-anchor" href="#需求规约" aria-hidden="true">#</a> 需求规约</h3>
<h4 id="定义" tabindex="-1"><a class="header-anchor" href="#定义" aria-hidden="true">#</a> 定义</h4>
<p>需求规约是一个软件／产品／系统所有需求称述的正式文档，它表达了一个软件产品／系统的概念模型。</p>
<h4 id="满足的4个基本性质" tabindex="-1"><a class="header-anchor" href="#满足的4个基本性质" aria-hidden="true">#</a> 满足的4个基本性质</h4>
<ol>
<li>重要性和稳定性程度。</li>
<li>可修改的</li>
<li>完整的</li>
<li>一致的</li>
</ol>
<h4 id="需求规约格式" tabindex="-1"><a class="header-anchor" href="#需求规约格式" aria-hidden="true">#</a> 需求规约格式</h4>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>1. 引言
    1.1 目的
    1.2 范围
    1.3定义，缩略语
    1.4参考文献
    1.5 概述
2. 总体描述
    2.1 产品概述
    2.2 产品功能
    2.3 用户特性
    2.4 约束
    2.5 假设和依赖
3. 特定需求
附录
索引
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="需求规约的表达" tabindex="-1"><a class="header-anchor" href="#需求规约的表达" aria-hidden="true">#</a> 需求规约的表达</h4>
<ol>
<li>形式化的需求规约（自然语言）</li>
<li>半形式化的需求规约（一半自然语言，一半正式语言）</li>
<li>形式化规约（基于良好的数学概念的符号体系编织的）</li>
</ol>
<h4 id="需求规约的作用" tabindex="-1"><a class="header-anchor" href="#需求规约的作用" aria-hidden="true">#</a> 需求规约的作用</h4>
<ol>
<li>是软件开发组织和用户之间一份事实上的技术合同书。</li>
<li>对于项目的其余大多数工作，需求规约是一个管理控制点。</li>
<li>对于产品／系统的设计，是一个正式的、受控的起始点</li>
<li>是创建产品验收测试计划和用户指南的基础。</li>
</ol>
<blockquote>
<p>需求规约回答交付给客户的产品／系统是什么（关注产品需求）。项目需求回答开发组要做的是什么（关注项目工作与管理）。</p>
</blockquote>
<h2 id="第三章-结构化方法" tabindex="-1"><a class="header-anchor" href="#第三章-结构化方法" aria-hidden="true">#</a> 第三章  结构化方法</h2>
<h3 id="结构化需求分析" tabindex="-1"><a class="header-anchor" href="#结构化需求分析" aria-hidden="true">#</a> 结构化需求分析</h3>
<h4 id="三大挑战" tabindex="-1"><a class="header-anchor" href="#三大挑战" aria-hidden="true">#</a> 三大挑战</h4>
<ol>
<li>问题空间的理解</li>
<li>人与人之间的通信</li>
<li>需求的变化性</li>
</ol>
<h4 id="好的需求技术的基本特征" tabindex="-1"><a class="header-anchor" href="#好的需求技术的基本特征" aria-hidden="true">#</a> 好的需求技术的基本特征</h4>
<ol>
<li>提供方便通信的机制</li>
<li>鼓励需求分析人员使用问题空间的术语思考问题，编写文档</li>
<li>提供定义系统边界的方法</li>
<li>提供支持抽象的基本机制</li>
<li>为需求分析人员提供多种可供选择的方案</li>
<li>提供特定的技术，适应需求的变化</li>
</ol>
<h4 id="基本术语" tabindex="-1"><a class="header-anchor" href="#基本术语" aria-hidden="true">#</a> 基本术语</h4>
<p>数据源、数据潭、数据流、加工、数据存储</p>
<h4 id="数据流图-dfd" tabindex="-1"><a class="header-anchor" href="#数据流图-dfd" aria-hidden="true">#</a> 数据流图（DFD）</h4>
<p>为了建立系统功能模型，为此结构化分析方法给出了一种表达功能模型的工具</p>
<h4 id="建模过程" tabindex="-1"><a class="header-anchor" href="#建模过程" aria-hidden="true">#</a> 建模过程</h4>
<ol>
<li>建立系统环境图，确定系统语境（顶层数据流图）</li>
<li>自动向下，逐步求精（数据流的分派）</li>
<li>定义数据字典（顺序结构、选择结构、重复结构）</li>
<li>描述加工（结构化自然语言、判定表、判定树）</li>
</ol>
<h4 id="需求验证" tabindex="-1"><a class="header-anchor" href="#需求验证" aria-hidden="true">#</a> 需求验证</h4>
<p>需求中发现的错误类型</p>
<table>
<thead>
<tr>
<th>类型</th>
<th>百分比</th>
<th>类型</th>
<th>百分比</th>
</tr>
</thead>
<tbody>
<tr>
<td>不正确的事实</td>
<td>40</td>
<td>歧义性</td>
<td>5</td>
</tr>
<tr>
<td>遗漏</td>
<td>31</td>
<td>错放</td>
<td>2</td>
</tr>
<tr>
<td>不一致</td>
<td>13</td>
<td>其他</td>
<td>9</td>
</tr>
</tbody>
</table>
<p>发现错误的方法</p>
<table>
<thead>
<tr>
<th>方法</th>
<th>发现错误的百分比</th>
<th>方法</th>
<th>发现错误的百分比</th>
</tr>
</thead>
<tbody>
<tr>
<td>审查</td>
<td>65</td>
<td>集成</td>
<td>5</td>
</tr>
<tr>
<td>单元测试</td>
<td>10</td>
<td>其他</td>
<td>10</td>
</tr>
<tr>
<td>评估</td>
<td>10</td>
<td></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="结构化设计" tabindex="-1"><a class="header-anchor" href="#结构化设计" aria-hidden="true">#</a> 结构化设计</h3>
<h4 id="目标" tabindex="-1"><a class="header-anchor" href="#目标" aria-hidden="true">#</a> 目标</h4>
<p>建立系统的模块结构，即系统实现所需要的软件模块----系统中可标识的软件成分，以及这些模块之间的调用关系。</p>
<ul>
<li>模块： 是指软件中具有特定标识的独立成分；</li>
<li>模块调用：指模块之间的一种使用关系</li>
</ul>
<h4 id="表达软件体系结构的工具" tabindex="-1"><a class="header-anchor" href="#表达软件体系结构的工具" aria-hidden="true">#</a> 表达软件体系结构的工具</h4>
<ul>
<li>模块结构图：是一种描述软件宏观结构的图形化工具。</li>
<li>层次图：主要描绘软件的层次结构</li>
<li>HIPO图：层次图＋输入／处理／输出</li>
</ul>
<h4 id="总体设计步骤" tabindex="-1"><a class="header-anchor" href="#总体设计步骤" aria-hidden="true">#</a> 总体设计步骤</h4>
<ul>
<li>变换型数据流图： 具有明显的输入部分和变换部分之间的界面、变换部分和输出部分之间节目的数据流图</li>
<li>事务型数据流图：数据达到一个加工T ,改加工T根据输入数据的值，在其后的若干动作序列（一个事物）中选出一个执行。</li>
</ul>
<h4 id="三个阶段" tabindex="-1"><a class="header-anchor" href="#三个阶段" aria-hidden="true">#</a> 三个阶段</h4>
<ol>
<li>初始设计</li>
<li>精华设计</li>
<li>复审阶段</li>
</ol>
<h4 id="模块化及启发式规则" tabindex="-1"><a class="header-anchor" href="#模块化及启发式规则" aria-hidden="true">#</a> 模块化及启发式规则</h4>
<h5 id="模块化" tabindex="-1"><a class="header-anchor" href="#模块化" aria-hidden="true">#</a> 模块化</h5>
<ul>
<li>
<p>是执行一个特殊任务的一个过程以及相关的数据结构</p>
</li>
<li>
<p>把一个待开发的软件分解成若干简单的具有高内聚低耦合的模块</p>
</li>
<li>
<p>耦合：指不同模块之间相互依赖程度的度量（内容耦合、标记耦合、控制耦合、公共耦合、数据耦合）</p>
</li>
<li>
<p>内聚：指一个模块内部各成分之间相互关联程度的度量（偶然内聚、逻辑内聚、时间内聚、过程内聚、通信内聚、顺序内聚、功能内聚）</p>
</li>
</ul>
<h5 id="启发式规则" tabindex="-1"><a class="header-anchor" href="#启发式规则" aria-hidden="true">#</a> 启发式规则</h5>
<ol>
<li>改进软件结构，提高模块独立性。</li>
<li>力求模块规模适中</li>
<li>力求深度、宽度、扇出和扇入适中。</li>
<li>尽力使模块的作用域在其控制域之内。</li>
<li>尽力江都模块接口的复杂度</li>
<li>力求模块功能可以预测</li>
</ol>
<h4 id="详细设计" tabindex="-1"><a class="header-anchor" href="#详细设计" aria-hidden="true">#</a> 详细设计</h4>
<p>具体描述模块结构图中的每一个模块，即给出实现模块功能的实施机制，包括一组例程和数据结构。目标是将总体设计阶段产生的系统高层结构映射为以这些术语所表达的底层结构，也是系统的最终结构。</p>
<p>三种基本结构控制：顺序、选择、循环。</p>
<h5 id="详细设计工具" tabindex="-1"><a class="header-anchor" href="#详细设计工具" aria-hidden="true">#</a> 详细设计工具</h5>
<ol>
<li>程序流程图（程序框图）： 历史最悠久、使用最广泛的软件设计工具。</li>
<li>盒图（N-S图）：支持自顶向下逐步求精的详细设计</li>
<li>PAD图：用二维树形结构图表示程序的控制流。</li>
<li>类程序设计语言PDL（伪码）：借用某种结构化程序设计语言的关键字作为语法框架，用于定义控制结构和数据结构。</li>
</ol>
<h5 id="概要设计规约的主要内容" tabindex="-1"><a class="header-anchor" href="#概要设计规约的主要内容" aria-hidden="true">#</a> 概要设计规约的主要内容</h5>
<ol>
<li>系统环境</li>
<li>软件模块的结构</li>
<li>模块描述</li>
<li>文件结构和全局数据文件的逻辑结构</li>
<li>测试需求</li>
</ol>
<p>详细设计规约增加了 ：1.各处理过程的算法。2.算法所涉及的全部数据结构的描述。</p>
<h2 id="第四章-面向对象方法-uml" tabindex="-1"><a class="header-anchor" href="#第四章-面向对象方法-uml" aria-hidden="true">#</a> 第四章 面向对象方法－－UML</h2>
<blockquote>
<p>8个术语：类与对象、接口、协作、用况、主动类、构件、制品、节点。</p>
</blockquote>
</div></template>


