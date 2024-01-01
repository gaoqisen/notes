<template><div><p>按照词性依次学习语法的索引</p>
<p><img src="https://gaoqisen.github.io/GraphBed/202312/20231227230332.png" alt=""></p>
<h2 id="一、词性-10种" tabindex="-1"><a class="header-anchor" href="#一、词性-10种" aria-hidden="true">#</a> 一、词性(10种)</h2>
<h3 id="_1、实词-重点4个" tabindex="-1"><a class="header-anchor" href="#_1、实词-重点4个" aria-hidden="true">#</a> 1、实词(重点4个)</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
动词v: 表示动作或状态，动作或者状态的词
分类: 及物动词、不及物、连系、情态
*/</span>
<span class="token function">touch</span><span class="token punctuation">(</span>触摸<span class="token punctuation">)</span>、look <span class="token punctuation">(</span>看<span class="token punctuation">)</span>、know <span class="token punctuation">(</span>认识<span class="token punctuation">)</span>，run（跑）、eat（吃）、sleep（睡觉）
  
<span class="token doc-comment comment">/**
名词（Noun）: 用来表示人、物、地方、概念等的名称 
分类: 可数和不可数
  1. 可数名词(countable noun,c): 有单数变复数的变化[apple > apples]
  2. 不可数名词(uncountable noun,u): 没有变化形式。
*/</span>
dog 狗、book 书、<span class="token class-name">London</span> 伦敦、happiness 幸福、toy 玩具 head 头 hat 帽子  policeman 警察  nurse 护士  nose 鼻子  fish 树  bed 床  cow 奶牛  mouth 嘴  ear 耳朵 eye 眼睛  face 脸 

<span class="token doc-comment comment">/**
形容词（Adjective）: 用来修饰名词、表示人或事物的特征，放在名词前面修饰名词
分类: 性质、数量、大小、年龄
*/</span>
beautiful（美丽的）、happy（快乐的）、big（大的）、run（跑）、eat（吃）、sleep（睡觉），litte 小的、big 大的、fat 肥胖的，thin 瘦的，big 大的

<span class="token doc-comment comment">/**
副词（Adverb）：修饰动词、形容词、其他副词或整个句子，表示时间、地点、方式、程度等 
分类:  方式、地点、时间
*/</span>
quickly（快速地）、very（非常）、here（这里）  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2、虚词-重点3个" tabindex="-1"><a class="header-anchor" href="#_2、虚词-重点3个" aria-hidden="true">#</a> 2、虚词(重点3个)</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 介词（Preposition）：用来表示位置、方向、时间、方式等关系 
 分类：时间、地点、方向、形式、归属
 */</span>
in（在……里）、on（在……上面）、at（在……处）<span class="token punctuation">,</span> down<span class="token punctuation">,</span> up<span class="token punctuation">,</span> under（在……之下<span class="token punctuation">)</span>

<span class="token doc-comment comment">/**
 连词（Conjunction）：用来连接词语、短语或句子
 分类：并列、从属、连接、瞬时、选择
 */</span> 
<span class="token keyword">if</span>、because、and（和）、but（但是）、or（或者）

<span class="token doc-comment comment">/**
 冠词（Article）：用来限定名词的词语，说明名词所指的范围， 用在名词前
 分类：定冠词、不定冠词
    不定冠词: an  a    一、一个
    定冠词: the      这、这个
    中文样式：我今天买了一支`不定冠词` 笔，这^定冠词 支笔很好看
 */</span> 
a（一个）、an（一个，用于以元音音素开头的词语）、the（定冠词）  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3、非重点-3个" tabindex="-1"><a class="header-anchor" href="#_3、非重点-3个" aria-hidden="true">#</a> 3、非重点（3个）</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * 代词pron: 代替名词、数词、形容词(人称代词)
 * 分类：单数、复数。人称、物主
 *    分类 | 第一人称(我) | 第二人称(你) | 第三人称(他她它) 
 *    单数 | I           | you         | It               
 *    复数 | we          | You         | They             
 */</span> 
<span class="token class-name">I</span><span class="token punctuation">,</span>  you<span class="token punctuation">,</span> it，he（他）、she（她）、it（它）、they（他们）   

<span class="token doc-comment comment">/**
 * 数词（Numeral）：表示数量或顺序的词语
 * 分类：基数词、序数词、分数词、百分数词
 */</span> 
one、 two

<span class="token doc-comment comment">/**
  感叹词（Interjection）：表示强烈的情感或感叹的词语
 * 分类：常规、惊讶、喜悦、痛苦
 */</span> 
oh、hello、hi、yeah，wow（哇）、oh（哦）、alas（唉）
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="二、句子成份-9种" tabindex="-1"><a class="header-anchor" href="#二、句子成份-9种" aria-hidden="true">#</a> 二、句子成份(9种)</h2>
<p>主、谓、宾、表、定、状、补、同。</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token comment">// 这个高大的  男孩  经常    去   大         动物园。</span>
如：'<span class="token class-name">The</span> tall<span class="token char">' boy '</span>often<span class="token char">' go '</span><span class="token keyword">to</span> <span class="token namespace">the</span> big' zoo<span class="token punctuation">.</span>   
   <span class="token punctuation">(</span>定语<span class="token punctuation">)</span>      主语 <span class="token punctuation">(</span>状语<span class="token punctuation">)</span>  谓语 <span class="token punctuation">(</span>定语<span class="token punctuation">)</span>      宾语 <span class="token punctuation">(</span>状语<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1、主谓宾-3个" tabindex="-1"><a class="header-anchor" href="#_1、主谓宾-3个" aria-hidden="true">#</a> 1、主谓宾(3个)</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
主语 (Subject)（句子最主要的）: 句子中执行或承受动作的核心，通常是一个名词、代词或名词短语 
充当者：名词、代词、数词、短语
位置：一般句子开头
*/</span>
<span class="token char">'I'</span> will drink water 
<span class="token char">'John'</span> is reading a book<span class="token punctuation">.</span>   

<span class="token doc-comment comment">/**
谓语 (Predicate)(主语的行为): 表示主语的行为或状态，对主句加以称述(动作)，通常是一个动词或动词短语
充当者：be动词、行为动词(跑、动等实际动作意义的词)
位置：一般主语后
*/</span>
<span class="token class-name">I</span> <span class="token char">'will'</span> drink water  
<span class="token class-name">She</span> is `singing` beautifully<span class="token punctuation">.</span> 
  
<span class="token doc-comment comment">/**
宾语 (Object)(谓语行为的承受): 句子中接受动作的对象，通常是一个名词、代词或名词短语 。动作承受的对象就是宾语(配角)
充当者：名词、代词、数词构成
位置：动词、谓语后面
*/</span>
<span class="token class-name">I</span> hit the <span class="token char">'TV'</span><span class="token punctuation">.</span> 
<span class="token class-name">I</span> bought `a <span class="token keyword">new</span> car`<span class="token punctuation">.</span>   
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2、表定状补同-6个" tabindex="-1"><a class="header-anchor" href="#_2、表定状补同-6个" aria-hidden="true">#</a> 2、表定状补同（6个）</h3>
<p>不是很好理解的成份表语、定语、状语、补语</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
表语(Predicate Nominative)（表明主语特征） : 用于描述主语的特征或身份的部分，通常是一个名词、代词或名词短语
充当者：名词、代词、数词、介词短语、副词
位置：放在be动词和系动词的后面。
*/</span>
<span class="token class-name">This</span> <span class="token char">'table'</span> is <span class="token keyword">long</span><span class="token punctuation">.</span> <span class="token punctuation">(</span>这个桌子是长的。<span class="token punctuation">)</span>  
<span class="token class-name">She</span> is a `doctor`<span class="token punctuation">.</span> 

<span class="token doc-comment comment">/**
定语 (Adjective)(给名词等定位): 修饰名词或代词(即在汉语里的……的)，一般起描述作用
充当者：形容词或者相当于形容词的短语或从句担任
位置：名词前
*/</span>
`<span class="token class-name">The</span>` red car is mine<span class="token punctuation">.</span> 
  
<span class="token doc-comment comment">/**
状语 (Adverb)(形容词等的状态)：形容词等的状态。修饰动词，形容词或副词，有的修饰全句，用于说明地点，时间，方式，程度，原因，目的，结果，条件，方向等
充当者：副词
位置：不定
*/</span>
<span class="token class-name">I</span> often write <span class="token keyword">to</span> <span class="token namespace">him<span class="token punctuation">.</span></span> <span class="token punctuation">(</span>我常给他写信。<span class="token punctuation">)</span>  <span class="token comment">// often 就是状语</span>
<span class="token class-name">He</span> ran 'quickly'<span class="token punctuation">.</span> 
  
<span class="token doc-comment comment">/**
宾语补足语(宾补)(Complement)(对宾语的补充)：用来补充和完善主语或宾语的信息，通常是动词的补充部分。补语可以是名词、形容词、副词或介词短语。就是对宾语的描述(有时如果没有宾语补足语，句子就不完整)
*/</span>
<span class="token class-name">She</span> became 'a doctor'   <span class="token comment">// "became"是连系动词，后"a doctor"并不是受到动作的影响，而是用来描述"变成的状态。就连系动词这一点来看，"a doctor并不能算是宾语，而应该是补足语</span>

<span class="token doc-comment comment">/**
双宾语 (Double Object): 在某些句子中，动词可以同时接受两个宾语。一个宾语是直接宾语 (Direct Object)，表示动作的直接承受者；另一个宾语是间接宾语 (Indirect Object)，表示动作的受益者或间接对象    
*/</span>
<span class="token class-name">She</span> gave <span class="token char">'him'</span> <span class="token char">'a book'</span><span class="token punctuation">.</span> 
                                   
<span class="token doc-comment comment">/**
同位语 (Appositive): 同位语是用来进一步说明或解释名词的词语、词组或从句。它们与前面的名词具有同样的指代或指向相同的事物。同位语通常用逗号或破折号将其与名词隔开  
*/</span>
<span class="token class-name">My</span> friend<span class="token punctuation">,</span> 'a talented musician'<span class="token punctuation">,</span> performed at the concert<span class="token punctuation">.</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="三、句形-8种" tabindex="-1"><a class="header-anchor" href="#三、句形-8种" aria-hidden="true">#</a> 三、句形(8种)</h2>
<h3 id="_1、常用结构-5个" tabindex="-1"><a class="header-anchor" href="#_1、常用结构-5个" aria-hidden="true">#</a> 1、常用结构（5个）</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
主+谓: 由一个主语和一个谓语构成。它用来陈述一个动作或状态 
特点：句子的谓语动词都能表达完整的意思。这类动词叫做不及物动词，后面可以跟副词、介词短语、状语从句等
主语       谓语
*/</span>
<span class="token class-name">She</span>       sings
<span class="token class-name">The</span> moon  rose<span class="token punctuation">.</span>  <span class="token comment">// 月亮升起</span>
<span class="token class-name">The</span> sun   was shining<span class="token punctuation">.</span>  <span class="token comment">// 太阳照耀</span>
<span class="token class-name">The</span> pen   writes smoothly<span class="token punctuation">.</span>  <span class="token comment">// 这支笔书写流利</span>

<span class="token doc-comment comment">/**
主+谓+宾: 在基本的主+谓结构上添加了一个宾语，宾语是动作的接受者或影响者
特点：谓语动词都具有实义，都是主语产生的动作，但不能表达完整的意思，必须跟一个宾语，即动作的承受者，才能使意思完整
*/</span>
<span class="token class-name">They</span> eat apples  
<span class="token class-name">Who</span> <span class="token char">'knows'</span> the answer<span class="token operator">?</span>  <span class="token comment">// 谁知道答案 </span>
<span class="token class-name">He</span> <span class="token char">'enjoys'</span> reading<span class="token punctuation">;</span>  <span class="token comment">// 他喜欢看书</span>
<span class="token class-name">I</span> <span class="token char">'want'</span> <span class="token keyword">to</span> <span class="token namespace">have</span> a cup of tea<span class="token punctuation">;</span>  <span class="token comment">// 我想喝杯茶</span>

<span class="token doc-comment comment">/**
主+系+表: 由一个主语、一个系动词和一个表语构成。系动词用来描述或说明主语的状态 
特点：特点：句子谓语动词都不能表达一个完整的意思，必须加上一个表明主语身份或状态的表语构成复合谓语，才能表达完整的意思。
*/</span>
<span class="token class-name">He</span> <span class="token char">'is'</span> happy 
<span class="token class-name">This</span> <span class="token char">'is'</span> an <span class="token class-name">English</span><span class="token operator">-</span><span class="token class-name">Chinese</span> dictionary<span class="token punctuation">;</span>  <span class="token comment">//这是本英汉词典。</span>
<span class="token class-name">He</span> 'is growing' tall and strong<span class="token punctuation">;</span>  <span class="token comment">// 他长的又高又壮</span>

<span class="token doc-comment comment">/**
主+谓+双宾（主语 ＋ 谓语 ＋ 间宾 ＋直宾）: 有一个主语、一个谓语和两个宾语。第一个宾语是动作的直接接受者，第二个宾语是动作的间接接受者 
特点：有些及物动词有两个宾语。这两个宾语通常一个指人，为间接宾语。一个指物，为直接宾语。间接宾语一般位于直接宾语之前。一般顺序：动词 ＋ 间接宾语 ＋ 直接宾语
*/</span>
<span class="token class-name">She</span> gave me a book     
<span class="token class-name">I</span> <span class="token char">'gave'</span>  <span class="token char">'my car'</span> a wash<span class="token punctuation">.</span> <span class="token comment">// 我洗了我的车</span>
<span class="token class-name">He</span> <span class="token char">'showed'</span> <span class="token char">'me'</span> how <span class="token keyword">to</span> <span class="token namespace">run</span> the machine<span class="token punctuation">.</span>  <span class="token comment">// 他教我开机器   </span>

<span class="token doc-comment comment">/**
主+谓+宾+宾补: 在主+谓+宾结构上添加了一个宾语补足语，用来补充或说明宾语   
特点：动词虽然是及物动词，但是只跟一个宾语还不能表达完整的意思，必须加一个补充成份来补足宾语，才能使意思完整
*/</span>
<span class="token class-name">They</span> made him their leader 
<span class="token class-name">We</span> saw him out<span class="token punctuation">.</span> <span class="token comment">// 我们送他出去。</span>
<span class="token class-name">He</span> asked me <span class="token keyword">to</span> <span class="token namespace">come</span> back soon<span class="token punctuation">.</span>  <span class="token comment">// 他要我早点回来。</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2、从句-3个" tabindex="-1"><a class="header-anchor" href="#_2、从句-3个" aria-hidden="true">#</a> 2、从句（3个）</h3>
<div class="language-json line-numbers-mode" data-ext="json"><pre v-pre class="language-json"><code><span class="token comment">// 名词性从句: 名词性从句用来作为句子的一个成分，可以充当主语、宾语、表语等 </span>
What she said surprised me 
  
<span class="token comment">// 定语从句: 定语从句用来修饰一个名词或代词，提供额外的信息  </span>
The book that I borrowed is very interesting.
  
<span class="token comment">// 状语从句: 状语从句用来修饰谓语动词，表达时间、原因、条件、目的等方面的信息</span>
I will go to the park if it doesn't rain  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


