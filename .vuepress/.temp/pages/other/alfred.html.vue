<template><div><h2 id="一、环境" tabindex="-1"><a class="header-anchor" href="#一、环境" aria-hidden="true">#</a> 一、环境</h2>
<ol>
<li>安装一个alfred4.3.4</li>
<li>github账号</li>
</ol>
<h2 id="二、用github制作的一个图床" tabindex="-1"><a class="header-anchor" href="#二、用github制作的一个图床" aria-hidden="true">#</a> 二、用github制作的一个图床</h2>
<p>原理：利用github存储图片后获取github的图片路径</p>
<div class="language-python line-numbers-mode" data-ext="py"><pre v-pre class="language-python"><code><span class="token comment">#!/usr/bin/python</span>
<span class="token keyword">import</span> os
<span class="token keyword">import</span> time

<span class="token keyword">def</span> <span class="token function">txt</span><span class="token punctuation">(</span>text<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token builtin">file</span> <span class="token operator">=</span> <span class="token builtin">open</span><span class="token punctuation">(</span><span class="token string">'github_image_path.txt'</span><span class="token punctuation">,</span><span class="token string">'w+'</span><span class="token punctuation">)</span>
        <span class="token builtin">file</span><span class="token punctuation">.</span>write<span class="token punctuation">(</span>text<span class="token punctuation">)</span>
        <span class="token builtin">file</span><span class="token punctuation">.</span>close<span class="token punctuation">(</span><span class="token punctuation">)</span>
        os<span class="token punctuation">.</span>system<span class="token punctuation">(</span><span class="token string">'open github_image_path.txt'</span><span class="token punctuation">)</span>
        os<span class="token punctuation">.</span>system<span class="token punctuation">(</span><span class="token string">'say "ok"'</span><span class="token punctuation">)</span>

<span class="token comment"># create file</span>
<span class="token builtin">dir</span><span class="token operator">=</span>time<span class="token punctuation">.</span>strftime<span class="token punctuation">(</span><span class="token string">"%Y%m"</span><span class="token punctuation">,</span> time<span class="token punctuation">.</span>localtime<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
fileName<span class="token operator">=</span><span class="token builtin">dir</span><span class="token operator">+</span><span class="token string">'/'</span><span class="token operator">+</span>time<span class="token punctuation">.</span>strftime<span class="token punctuation">(</span><span class="token string">"%Y%m%d%H%M%S"</span><span class="token punctuation">,</span> time<span class="token punctuation">.</span>localtime<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token operator">+</span><span class="token string">'.png'</span>
path<span class="token operator">=</span><span class="token string">'/Users/gaoqisen/Documents/blog/image/GraphBed/'</span>
<span class="token keyword">if</span> <span class="token keyword">not</span> os<span class="token punctuation">.</span>path<span class="token punctuation">.</span>exists<span class="token punctuation">(</span>path<span class="token operator">+</span><span class="token builtin">dir</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        os<span class="token punctuation">.</span>makedirs<span class="token punctuation">(</span>path<span class="token operator">+</span><span class="token builtin">dir</span><span class="token punctuation">)</span>
<span class="token comment"># screencapture</span>
upload<span class="token operator">=</span>os<span class="token punctuation">.</span>system<span class="token punctuation">(</span><span class="token string">'screencapture -i '</span><span class="token operator">+</span>path<span class="token operator">+</span>fileName<span class="token punctuation">)</span>


<span class="token keyword">if</span><span class="token punctuation">(</span>upload<span class="token operator">==</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        adds<span class="token operator">=</span>os<span class="token punctuation">.</span>system<span class="token punctuation">(</span><span class="token string">'cd '</span><span class="token operator">+</span>path<span class="token operator">+</span><span class="token string">' ; git add .'</span><span class="token punctuation">)</span>
        commits<span class="token operator">=</span>os<span class="token punctuation">.</span>system<span class="token punctuation">(</span><span class="token string">'cd '</span><span class="token operator">+</span>path<span class="token operator">+</span><span class="token string">' ; git commit -m "'</span><span class="token operator">+</span>fileName<span class="token operator">+</span><span class="token string">' add"'</span><span class="token punctuation">)</span>
        pushs<span class="token operator">=</span>os<span class="token punctuation">.</span>system<span class="token punctuation">(</span><span class="token string">'cd '</span><span class="token operator">+</span>path<span class="token operator">+</span><span class="token string">' ; git pull origin master ; git push origin master'</span><span class="token punctuation">)</span>
        <span class="token builtin">str</span><span class="token operator">=</span><span class="token string">'https://gaoqisen.github.io/GraphBed/'</span><span class="token operator">+</span>fileName
        <span class="token keyword">if</span> <span class="token punctuation">(</span>adds<span class="token operator">+</span>commits<span class="token operator">+</span>pushs <span class="token operator">!=</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
                os<span class="token punctuation">.</span>system<span class="token punctuation">(</span><span class="token string">'say "no"'</span><span class="token punctuation">)</span>
        <span class="token keyword">else</span><span class="token punctuation">:</span>
                txt<span class="token punctuation">(</span><span class="token builtin">str</span><span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="三、hexo推送" tabindex="-1"><a class="header-anchor" href="#三、hexo推送" aria-hidden="true">#</a> 三、Hexo推送</h2>
<p>用hexo构建静态网页并推送至github</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token assign-left variable"><span class="token environment constant">PATH</span></span><span class="token operator">=</span>/usr/local/opt/coreutils/libexec/gnubin:/Library/Frameworks/Python.framework/Versions/3.5/bin:/Users/gaoqisen/HyperledgerFabricSamples/fabric-samples/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/Users/gaoqisen/Downloads/apache-maven-3.5.2/bin:/usr/local/opt/go/bin
<span class="token builtin class-name">cd</span> /Users/gaoqisen/Documents/blog
hexo clean
hexo g
hexo d
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


