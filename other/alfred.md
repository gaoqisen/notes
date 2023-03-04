---
title: 我的一些alfred工具
date: 2021-07-10 20:10:11
tags: alfred
categories: tool
keywords: Alfred
description: 一个特别实用的工具。
---

## 一、环境

1. 安装一个alfred4.3.4
2. github账号

## 二、用github制作的一个图床

原理：利用github存储图片后获取github的图片路径

```python
#!/usr/bin/python
import os
import time

def txt(text):
        file = open('github_image_path.txt','w+')
        file.write(text)
        file.close()
        os.system('open github_image_path.txt')
        os.system('say "ok"')

# create file
dir=time.strftime("%Y%m", time.localtime())
fileName=dir+'/'+time.strftime("%Y%m%d%H%M%S", time.localtime())+'.png'
path='/Users/gaoqisen/Documents/blog/image/GraphBed/'
if not os.path.exists(path+dir):
        os.makedirs(path+dir)
# screencapture
upload=os.system('screencapture -i '+path+fileName)


if(upload==0):
        adds=os.system('cd '+path+' ; git add .')
        commits=os.system('cd '+path+' ; git commit -m "'+fileName+' add"')
        pushs=os.system('cd '+path+' ; git pull origin master ; git push origin master')
        str='https://gaoqisen.github.io/GraphBed/'+fileName
        if (adds+commits+pushs != 0):
                os.system('say "no"')
        else:
                txt(str)

```

## 三、Hexo推送

用hexo构建静态网页并推送至github

```shell
PATH=/usr/local/opt/coreutils/libexec/gnubin:/Library/Frameworks/Python.framework/Versions/3.5/bin:/Users/gaoqisen/HyperledgerFabricSamples/fabric-samples/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/Users/gaoqisen/Downloads/apache-maven-3.5.2/bin:/usr/local/opt/go/bin
cd /Users/gaoqisen/Documents/blog
hexo clean
hexo g
hexo d
```

