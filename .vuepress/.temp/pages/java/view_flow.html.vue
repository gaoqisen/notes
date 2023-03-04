<template><div><h2 id="一、案例分析" tabindex="-1"><a class="header-anchor" href="#一、案例分析" aria-hidden="true">#</a> 一、案例分析</h2>
<ol>
<li>有两个审核组（审核组1、审核组2）、每组有两个审核成员（审核组1- a，b。审核组2- c，d）</li>
<li>当有数据需要审核初始化审核组的时候，如数据a需要审核组1和审核组2进行审核。则初始化两条审核信息</li>
<li>初始数据只有审核组1的成员可以查看并且审核，审核组1审核通过之后审核组2才能查看和审核数据到审核数据。审核组2审核的时候，审核组1只能查看并不能操作审核数据。</li>
<li>当前用户去查询列表的时候，需要先去查找自己的数据权限。如果有权限则进行展示。（代办事项）</li>
</ol>
<p>sql初始化成功之后，进行代码开发。</p>
<h2 id="二、接口设计" tabindex="-1"><a class="header-anchor" href="#二、接口设计" aria-hidden="true">#</a> 二、接口设计</h2>
<h3 id="_2-1-创建审核流程接口-初始化审核流" tabindex="-1"><a class="header-anchor" href="#_2-1-创建审核流程接口-初始化审核流" aria-hidden="true">#</a> 2.1 创建审核流程接口（初始化审核流）</h3>
<ol>
<li>逻辑：根据审核类型关联flow_review_rule、flow_rule_group、flow_review_group获取审核类型所需要的审核组并创建审核流程</li>
<li>入参: 审核唯一编码、审核类型、用户ID...</li>
</ol>
<h3 id="_2-2-流程列表查询接口-代办事项" tabindex="-1"><a class="header-anchor" href="#_2-2-流程列表查询接口-代办事项" aria-hidden="true">#</a> 2.2 流程列表查询接口（代办事项）</h3>
<ol>
<li>入参:  产品编码、用户ID、开始时间和结束时间</li>
<li>逻辑：
<ol>
<li>通过用户ID去查询用户所在的审核组，如果没有审核组则直接返还空数据</li>
<li>通过审核组和业务类型分页获取当前用户可以审核的流程审核表里面的数据</li>
<li>用业务类型获取业务系统的dubbo接口</li>
<li>通过dubbo接口和分页获取的审核唯一编码泛化调用业务系统，获取业务系统的列表数据</li>
<li>组装审核信息后返还给前端</li>
</ol>
</li>
</ol>
<p>通用的业务审核列表。只是展示需要审核的数据</p>
<h3 id="_2-3-流程审核查询-查看审核情况" tabindex="-1"><a class="header-anchor" href="#_2-3-流程审核查询-查看审核情况" aria-hidden="true">#</a> 2.3 流程审核查询（查看审核情况）</h3>
<ol>
<li>入参: 审核唯一编码、业务类型</li>
<li>逻辑: 通过审核唯一编码查询审核流程表和审核流程记录表并组装数据后返回给前端</li>
</ol>
<h3 id="_2-4-流程审核接口-判断是否有审核权限" tabindex="-1"><a class="header-anchor" href="#_2-4-流程审核接口-判断是否有审核权限" aria-hidden="true">#</a> 2.4 流程审核接口（判断是否有审核权限）</h3>
<ol>
<li>入参: 审核唯一编码、审核人员ID、审核结果、驳回资料等、当前审核流程ID、审核类型</li>
<li>逻辑：
<ol>
<li>判断审核情况是通过还是拒绝，如果是拒绝则通过审核类型调用业务系统（用户中心or订单中心）审核接口进行拒绝操作。</li>
<li>如果是通过则判断当前审核流程是否是最后一个审核流程，如果是最后一个流程则通过审核类型调用业务系统（用户中心or订单中心）审核接口进行审核。</li>
<li>修改流程表里面当前流程流状态</li>
<li>在审核流程记录表里面添加记录</li>
</ol>
</li>
</ol>
<p>审核通过、审核拒绝时调用</p>
<h3 id="_2-5-流程数据修改接口-判断是否有权限修改" tabindex="-1"><a class="header-anchor" href="#_2-5-流程数据修改接口-判断是否有权限修改" aria-hidden="true">#</a> 2.5 流程数据修改接口（判断是否有权限修改）</h3>
<h2 id="三、数据库表设计" tabindex="-1"><a class="header-anchor" href="#三、数据库表设计" aria-hidden="true">#</a> 三、数据库表设计</h2>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token operator">-</span> 用户和组的关联表
<span class="token keyword">create</span> <span class="token keyword">table</span> flow_group_user<span class="token punctuation">(</span>
    id <span class="token keyword">bigint</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span> <span class="token keyword">auto_increment</span> <span class="token keyword">key</span> <span class="token keyword">comment</span> <span class="token string">'自增ID'</span><span class="token punctuation">,</span>

    group_id <span class="token keyword">bigint</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span> <span class="token operator">not</span> <span class="token boolean">null</span> <span class="token keyword">comment</span> <span class="token string">'组ID'</span><span class="token punctuation">,</span>
    user_id <span class="token keyword">bigint</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span> <span class="token operator">not</span> <span class="token boolean">null</span> <span class="token keyword">comment</span> <span class="token string">'用户ID'</span><span class="token punctuation">,</span>

    create_user_id <span class="token keyword">bigint</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span> <span class="token keyword">comment</span> <span class="token string">'创建用户ID'</span><span class="token punctuation">,</span>
    create_date <span class="token keyword">timestamp</span> <span class="token boolean">null</span> <span class="token keyword">default</span> <span class="token keyword">current_timestamp</span> <span class="token keyword">comment</span> <span class="token string">'创建时间'</span><span class="token punctuation">,</span>
    modify_user_id <span class="token keyword">bigint</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span> <span class="token keyword">comment</span> <span class="token string">'修改用户ID'</span><span class="token punctuation">,</span>
    modify_date <span class="token keyword">timestamp</span> <span class="token boolean">null</span> <span class="token keyword">default</span> <span class="token keyword">current_timestamp</span> <span class="token keyword">on</span> <span class="token keyword">update</span> <span class="token keyword">current_timestamp</span> <span class="token keyword">comment</span> <span class="token string">'修改时间'</span>
<span class="token punctuation">)</span> <span class="token keyword">comment</span> <span class="token string">'用户和组的关联表'</span><span class="token punctuation">;</span>
<span class="token comment">-- 审核组</span>
<span class="token keyword">create</span> <span class="token keyword">table</span> flow_review_group<span class="token punctuation">(</span>
    id <span class="token keyword">bigint</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span> <span class="token keyword">auto_increment</span> <span class="token keyword">key</span> <span class="token keyword">comment</span> <span class="token string">'自增ID'</span><span class="token punctuation">,</span>

    name <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span> <span class="token operator">not</span> <span class="token boolean">null</span> <span class="token keyword">comment</span> <span class="token string">'审核组名称'</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>desc<span class="token punctuation">`</span></span> <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">300</span><span class="token punctuation">)</span> <span class="token keyword">default</span> <span class="token boolean">null</span> <span class="token keyword">comment</span> <span class="token string">'审核组名称'</span><span class="token punctuation">,</span>

    create_user_id <span class="token keyword">bigint</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span> <span class="token keyword">comment</span> <span class="token string">'创建用户ID'</span><span class="token punctuation">,</span>
    create_date <span class="token keyword">timestamp</span> <span class="token boolean">null</span> <span class="token keyword">default</span> <span class="token keyword">current_timestamp</span> <span class="token keyword">comment</span> <span class="token string">'创建时间'</span><span class="token punctuation">,</span>
    modify_user_id <span class="token keyword">bigint</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span> <span class="token keyword">comment</span> <span class="token string">'修改用户ID'</span><span class="token punctuation">,</span>
    modify_date <span class="token keyword">timestamp</span> <span class="token boolean">null</span> <span class="token keyword">default</span> <span class="token keyword">current_timestamp</span> <span class="token keyword">on</span> <span class="token keyword">update</span> <span class="token keyword">current_timestamp</span> <span class="token keyword">comment</span> <span class="token string">'修改时间'</span>
<span class="token punctuation">)</span> <span class="token keyword">comment</span> <span class="token string">'审核组'</span><span class="token punctuation">;</span>
<span class="token comment">-- 审核表（一条审核记录对应多条审核操作操作记录）为了展示所有的审核详情</span>
<span class="token keyword">create</span> <span class="token keyword">table</span> flow_review<span class="token punctuation">(</span>
    id <span class="token keyword">bigint</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span> <span class="token keyword">auto_increment</span> <span class="token keyword">key</span> <span class="token keyword">comment</span> <span class="token string">'自增ID'</span><span class="token punctuation">,</span>

    review_no <span class="token keyword">bigint</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span> <span class="token operator">not</span> <span class="token boolean">null</span> <span class="token keyword">comment</span> <span class="token string">'审核码'</span><span class="token punctuation">,</span>
    rule_id <span class="token keyword">bigint</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span> <span class="token operator">not</span> <span class="token boolean">null</span> <span class="token keyword">comment</span> <span class="token string">'规则ID'</span><span class="token punctuation">,</span>
    review_status <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span> <span class="token operator">not</span> <span class="token boolean">null</span> <span class="token keyword">comment</span> <span class="token string">'审核状态 0-待审核,1-审核中,2-审核成功,3-审核失败'</span><span class="token punctuation">,</span>

    create_user_id <span class="token keyword">bigint</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span> <span class="token keyword">comment</span> <span class="token string">'创建用户ID'</span><span class="token punctuation">,</span>
    create_date <span class="token keyword">timestamp</span> <span class="token boolean">null</span> <span class="token keyword">default</span> <span class="token keyword">current_timestamp</span> <span class="token keyword">comment</span> <span class="token string">'创建时间'</span><span class="token punctuation">,</span>
    modify_user_id <span class="token keyword">bigint</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span> <span class="token keyword">comment</span> <span class="token string">'修改用户ID'</span><span class="token punctuation">,</span>
    modify_date <span class="token keyword">timestamp</span> <span class="token boolean">null</span> <span class="token keyword">default</span> <span class="token keyword">current_timestamp</span> <span class="token keyword">on</span> <span class="token keyword">update</span> <span class="token keyword">current_timestamp</span> <span class="token keyword">comment</span> <span class="token string">'修改时间'</span>
<span class="token punctuation">)</span> <span class="token keyword">comment</span> <span class="token string">'审核表'</span><span class="token punctuation">;</span>

<span class="token comment">-- 审核操作记录表</span>
<span class="token keyword">create</span> <span class="token keyword">table</span> flow_review_operate<span class="token punctuation">(</span>
    id <span class="token keyword">bigint</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span> <span class="token keyword">auto_increment</span> <span class="token keyword">key</span> <span class="token keyword">comment</span> <span class="token string">'自增ID'</span><span class="token punctuation">,</span>

    review_no <span class="token keyword">bigint</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span> <span class="token operator">not</span> <span class="token boolean">null</span> <span class="token keyword">comment</span> <span class="token string">'审核码'</span><span class="token punctuation">,</span>
    review_parent_id <span class="token keyword">bigint</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span> <span class="token operator">not</span> <span class="token boolean">null</span> <span class="token keyword">comment</span> <span class="token string">'审核父ID'</span><span class="token punctuation">,</span>
    review_status <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span> <span class="token operator">not</span> <span class="token boolean">null</span> <span class="token keyword">comment</span> <span class="token string">'审核状态 0-待审核,1-审核成功,2-审核失败'</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>desc<span class="token punctuation">`</span></span> <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">300</span><span class="token punctuation">)</span> <span class="token keyword">default</span> <span class="token boolean">null</span> <span class="token keyword">comment</span> <span class="token string">'审核描述'</span><span class="token punctuation">,</span>
    review_group_id <span class="token keyword">bigint</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span> <span class="token operator">not</span> <span class="token boolean">null</span> <span class="token keyword">comment</span> <span class="token string">'审核组ID'</span><span class="token punctuation">,</span>
    review_user_id <span class="token keyword">bigint</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span> <span class="token operator">not</span> <span class="token boolean">null</span> <span class="token keyword">comment</span> <span class="token string">'审核用户ID'</span><span class="token punctuation">,</span>

    create_user_id <span class="token keyword">bigint</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span> <span class="token keyword">comment</span> <span class="token string">'创建用户ID'</span><span class="token punctuation">,</span>
    create_date <span class="token keyword">timestamp</span> <span class="token boolean">null</span> <span class="token keyword">default</span> <span class="token keyword">current_timestamp</span> <span class="token keyword">comment</span> <span class="token string">'创建时间'</span><span class="token punctuation">,</span>
    modify_user_id <span class="token keyword">bigint</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span> <span class="token keyword">comment</span> <span class="token string">'修改用户ID'</span><span class="token punctuation">,</span>
    modify_date <span class="token keyword">timestamp</span> <span class="token boolean">null</span> <span class="token keyword">default</span> <span class="token keyword">current_timestamp</span> <span class="token keyword">on</span> <span class="token keyword">update</span> <span class="token keyword">current_timestamp</span> <span class="token keyword">comment</span> <span class="token string">'修改时间'</span>
<span class="token punctuation">)</span> <span class="token keyword">comment</span> <span class="token string">'审核操作记录表'</span><span class="token punctuation">;</span>
<span class="token comment">-- 审核规则</span>
<span class="token keyword">create</span> <span class="token keyword">table</span> flow_review_rule<span class="token punctuation">(</span>
    id <span class="token keyword">bigint</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span> <span class="token keyword">auto_increment</span> <span class="token keyword">key</span> <span class="token keyword">comment</span> <span class="token string">'自增ID'</span><span class="token punctuation">,</span>

    name <span class="token keyword">bigint</span><span class="token punctuation">(</span><span class="token number">50</span><span class="token punctuation">)</span> <span class="token operator">not</span> <span class="token boolean">null</span> <span class="token keyword">comment</span> <span class="token string">'名称'</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>type<span class="token punctuation">`</span></span> <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span> <span class="token operator">not</span> <span class="token boolean">null</span> <span class="token keyword">comment</span> <span class="token string">'类型: 0-用户,1-订单,2-实名制'</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>desc<span class="token punctuation">`</span></span> <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">300</span><span class="token punctuation">)</span> <span class="token keyword">default</span> <span class="token boolean">null</span> <span class="token keyword">comment</span> <span class="token string">'描述'</span><span class="token punctuation">,</span>
    request_type <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span> <span class="token operator">not</span> <span class="token boolean">null</span> <span class="token keyword">comment</span> <span class="token string">'请求类型1-dubbo,2-http'</span><span class="token punctuation">,</span>
    class_name <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">300</span><span class="token punctuation">)</span> <span class="token keyword">default</span> <span class="token boolean">null</span> <span class="token keyword">comment</span> <span class="token string">'类名'</span><span class="token punctuation">,</span>
    class_method <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">300</span><span class="token punctuation">)</span> <span class="token keyword">default</span> <span class="token boolean">null</span> <span class="token keyword">comment</span> <span class="token string">'类方法'</span><span class="token punctuation">,</span>
    class_method_args <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">300</span><span class="token punctuation">)</span> <span class="token keyword">default</span> <span class="token boolean">null</span> <span class="token keyword">comment</span> <span class="token string">'类方法参数'</span><span class="token punctuation">,</span>


    create_user_id <span class="token keyword">bigint</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span> <span class="token keyword">comment</span> <span class="token string">'创建用户ID'</span><span class="token punctuation">,</span>
    create_date <span class="token keyword">timestamp</span> <span class="token boolean">null</span> <span class="token keyword">default</span> <span class="token keyword">current_timestamp</span> <span class="token keyword">comment</span> <span class="token string">'创建时间'</span><span class="token punctuation">,</span>
    modify_user_id <span class="token keyword">bigint</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span> <span class="token keyword">comment</span> <span class="token string">'修改用户ID'</span><span class="token punctuation">,</span>
    modify_date <span class="token keyword">timestamp</span> <span class="token boolean">null</span> <span class="token keyword">default</span> <span class="token keyword">current_timestamp</span> <span class="token keyword">on</span> <span class="token keyword">update</span> <span class="token keyword">current_timestamp</span> <span class="token keyword">comment</span> <span class="token string">'修改时间'</span>
<span class="token punctuation">)</span> <span class="token keyword">comment</span> <span class="token string">'审核规则'</span><span class="token punctuation">;</span>
<span class="token comment">-- 规则和组关联表</span>
<span class="token keyword">create</span> <span class="token keyword">table</span> flow_rule_group<span class="token punctuation">(</span>
    id <span class="token keyword">bigint</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span> <span class="token keyword">auto_increment</span> <span class="token keyword">key</span> <span class="token keyword">comment</span> <span class="token string">'自增ID'</span><span class="token punctuation">,</span>

    group_id <span class="token keyword">bigint</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span> <span class="token operator">not</span> <span class="token boolean">null</span> <span class="token keyword">comment</span> <span class="token string">'组ID'</span><span class="token punctuation">,</span>
    rule_id <span class="token keyword">bigint</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span> <span class="token operator">not</span> <span class="token boolean">null</span> <span class="token keyword">comment</span> <span class="token string">'规则ID'</span><span class="token punctuation">,</span>
    is_modify <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span> <span class="token operator">not</span> <span class="token boolean">null</span> <span class="token keyword">comment</span> <span class="token string">'是否修改0-不修改, 1-修改'</span><span class="token punctuation">,</span>
    is_review <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span> <span class="token operator">not</span> <span class="token boolean">null</span> <span class="token keyword">comment</span> <span class="token string">'请求审核0-不审核, 1-审核'</span><span class="token punctuation">,</span>

    create_user_id <span class="token keyword">bigint</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span> <span class="token keyword">comment</span> <span class="token string">'创建用户ID'</span><span class="token punctuation">,</span>
    create_date <span class="token keyword">timestamp</span> <span class="token boolean">null</span> <span class="token keyword">default</span> <span class="token keyword">current_timestamp</span> <span class="token keyword">comment</span> <span class="token string">'创建时间'</span><span class="token punctuation">,</span>
    modify_user_id <span class="token keyword">bigint</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span> <span class="token keyword">comment</span> <span class="token string">'修改用户ID'</span><span class="token punctuation">,</span>
    modify_date <span class="token keyword">timestamp</span> <span class="token boolean">null</span> <span class="token keyword">default</span> <span class="token keyword">current_timestamp</span> <span class="token keyword">on</span> <span class="token keyword">update</span> <span class="token keyword">current_timestamp</span> <span class="token keyword">comment</span> <span class="token string">'修改时间'</span>
<span class="token punctuation">)</span> <span class="token keyword">comment</span> <span class="token string">'规则和组关联表'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


