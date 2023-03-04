<template><div><h2 id="一、数据校验" tabindex="-1"><a class="header-anchor" href="#一、数据校验" aria-hidden="true">#</a> 一、数据校验</h2>
<h3 id="_1-1-重复请求" tabindex="-1"><a class="header-anchor" href="#_1-1-重复请求" aria-hidden="true">#</a> 1.1 重复请求</h3>
<p>同一个接口多次原封不动的调用导致出现重复数据。可以利用时间戳(判断时间必须当前时间的60s以内)＋随机串（通过redis进行缓存校验查询，判断随机串是否出现过）进行处理</p>
<p>同一个接口请求多次流水号不一致，这种请求就需要写业务代码的时候进行逻辑判断，比如审核通过后的数据再次请求就判断状态是否改动过，如果变动过则异常提示</p>
<h3 id="_1-2-数据权限" tabindex="-1"><a class="header-anchor" href="#_1-2-数据权限" aria-hidden="true">#</a> 1.2 数据权限</h3>
<p>攻击者可以执行同级别的其它用户可以执行的权限，比如攻击者可以自己登陆之后修改其它用户的信息等。</p>
<p>每个阶段都通过cookie和sessin等进行用户身份的校验，数据添加用户ID字段，查询数据的时候添加用户ID，每个用户只能处理自己的数据。</p>
<h3 id="_1-3-短信漏洞" tabindex="-1"><a class="header-anchor" href="#_1-3-短信漏洞" aria-hidden="true">#</a> 1.3 短信漏洞</h3>
<p>短信接口被其他非法人员利用发送短信，造成公司短信发送太多产生经济损失和用户收到垃圾短信。</p>
<p>这种情况可以利用短信频率限制（1分钟获取一次等），添加图形验证码（防止爬虫通过接口发送验证码）</p>
<h3 id="_1-4-铭感信息" tabindex="-1"><a class="header-anchor" href="#_1-4-铭感信息" aria-hidden="true">#</a> 1.4 铭感信息</h3>
<p>账号如果被泄漏，个人消息处展示了用户敏感就会泄漏用户隐私。</p>
<p>可以隐藏手机号码、邮箱等敏感信息或者关键信息替换为***</p>
<h2 id="二、业务处理" tabindex="-1"><a class="header-anchor" href="#二、业务处理" aria-hidden="true">#</a> 二、业务处理</h2>
<h3 id="_2-1-分布式锁" tabindex="-1"><a class="header-anchor" href="#_2-1-分布式锁" aria-hidden="true">#</a> 2.1 分布式锁</h3>
<h4 id="_2-1-1-数据库锁" tabindex="-1"><a class="header-anchor" href="#_2-1-1-数据库锁" aria-hidden="true">#</a> 2.1.1 数据库锁</h4>
<h5 id="_1-乐观锁" tabindex="-1"><a class="header-anchor" href="#_1-乐观锁" aria-hidden="true">#</a> 1. 乐观锁</h5>
<p>乐观锁一般都乐观的认为数据不会被锁，</p>
<ol>
<li>
<p>在读取数据的时候把数据的版本号一起读出，更新数据的时候使用数据版本号进行数据的更新，如果更新失败了则重新读取数据后再次更新如:</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>update tablesname set data = #{data}, version = #{version} +1 where id = #{id} and version = #{version}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>也是增加一个字段用来保存时间戳，查询数据的时候把时间戳也查询出来。更新的是判断时间戳是否是一致的</p>
</li>
</ol>
<h5 id="_2-悲观锁" tabindex="-1"><a class="header-anchor" href="#_2-悲观锁" aria-hidden="true">#</a> 2. 悲观锁</h5>
<p>悲观锁是悲观的认为所有的数据都会出现被锁的情况，故有表锁、行锁、读锁、写锁等，直接数据库层面的锁属于重量级的锁</p>
<h4 id="_2-1-2-redis锁" tabindex="-1"><a class="header-anchor" href="#_2-1-2-redis锁" aria-hidden="true">#</a> 2.1.2 redis锁</h4>
<p>利用redis的setnx去增加锁(setnx只有当key在redis中不存在的时候才能设置成功)，通过expire去释放锁来实现。在代码中判断setnx是否成功，如果成功了则表示锁是空闲状态，否则锁处于占用状态</p>
<h3 id="_2-2-分布式事务" tabindex="-1"><a class="header-anchor" href="#_2-2-分布式事务" aria-hidden="true">#</a> 2.2 分布式事务</h3>
<h4 id="_2-2-1-数据库层面" tabindex="-1"><a class="header-anchor" href="#_2-2-1-数据库层面" aria-hidden="true">#</a> 2.2.1 数据库层面</h4>
<p>2PC: 两阶段提交是一种尽量保证强一致的分布式事务</p>
<p>3PC: 三阶提交是为了解决两阶段提交的一些问题，准备提交、预提交、提交阶段。相比于2PC它添加了超时机制等</p>
<h4 id="_2-2-2-业务层面" tabindex="-1"><a class="header-anchor" href="#_2-2-2-业务层面" aria-hidden="true">#</a> 2.2.2 业务层面</h4>
<p>TCC(Try预留-Confirm确认-Cancel撤销): 先试探执行，如果可以就commit否则就回滚</p>
<p>本地消息表：实现的是最终一致性，通过一个消息表记录状态如果调用失败了就用定时任务去处理没有成功的数据，直到全部成功。重试的时候需要保证对应服务的幂等</p>
<p>消息事务：利用RocketMQ的事务消息实现，先给Brokerf发送半消息（对消费方不可见），发送成功后发送方在执行本地事务。</p>
<p>分布式事务参考: https://zhuanlan.zhihu.com/p/183753774</p>
</div></template>


