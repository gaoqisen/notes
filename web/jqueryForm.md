---
title: 用js写了一个比较方便的表单验证器
date: 2018-11-14 20:10:11
tags: javaScript jquery form
categories: javaScript
keywords: javaScript
description: 之前总是在表单验证的框架，可是有时候总会觉得框架有冗余的代码，于是用js写了一个简单的表单验证器，特别的轻巧，方便自己效验表单。
---

## 一、实现方式

- 导入jquery

- 将以下代码复制到html页面中

```javascript
<script>
$(function() {
    // 调用此方法获取表单是否合法
    function checkInputPostData() {
        var list = $(".validInputs")
        var j = 0
        for(var i = 0; i<list.length; i++) {
            j = j+inputDataValid(list[i])
        }
        if (j == 4) {
            return false
        }
        return true
    }
    // 自定义表单效验 gqs
    function inputDataValid(then) {
        var th, promt, value, reg
        th = $(then)
        promt = th.parent().find(".Validform_info")[0]
        value = th.val()
        if(value == null || value == "") {
            $(promt).html('<span style="color:red">'+th.attr('nullmsg')+'</span>')
            $(promt).removeClass('Validform_right').addClass('Validform_wrong')
            return false
        }
        reg = th.attr("datatype")
        if(!eval(reg).test(value)){
            $(promt).html('<span style="color:red">'+th.attr('errormsg')+'</span>')
            $(promt).removeClass('Validform_right').addClass('Validform_wrong')
            return false
        }
        $(promt).html('<span style="color:red"></span>')
        $(promt).removeClass('Validform_wrong').addClass('Validform_right')
        return true
    }
}
</script>

```

- input框写入自定义属性

```javascript
 <input id="name" 
    onblur="inputDataValid(this)" 
    name="name" 
    type="text" 
    class="span3 validInputs"  <!-- 必须要validInputs的class,或者和checkInputPostData函数中的validInputs一致 -->
    datatype="/^[a-zA-Z\u4E00-\u9FA5]{1,20}$/" <!-- 正则：用于效验表单 -->
    value="123" 
    nullmsg="此项不能为空" <!-- 表单为空时的提示 -->
    errormsg="请填写字母或汉字"/> <!-- 正则效验失败时的提示 -->
                        
```

- 在input下创建

```
<div class="Validform_info"></div>
```

> 注：需要和下面的代码层级一致，如果不一致要注意层级查找（ th.parent().find(".Validform_info") ）的更换

## 二、全部代码

```javascript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>简单的表单验证器</title>
    <script src="https://cdn.bootcss.com/jquery/3.3.1/core.js"></script>
    <style>
    .Validform_right{
        正确提示的css
    }
    .Validform_wrong{
        错误提示的css
    }
</style>
</head>
<body>
    <table class="gritter-with-table" cellspacing="1">
        <tbody id="tbody">
            <tr name="posts">
                <th>姓名：</th>
                <td>
                    <input 
                        id="name" 
                        onblur="inputDataValid(this)" 
                        name="name" 
                        type="text" 
                        class="span3 validInputs" 
                        datatype="/^[a-zA-Z\u4E00-\u9FA5]{1,20}$/"
                        value="123" 
                        nullmsg="此项不能为空" 
                        errormsg="请填写字母或汉字"/>
                    <div class="Validform_info"></div>
                </td>
            </tr>    
            <tr name="posts">						
                <th>电话：</th>
                <td>
                    <input 
                        onblur="inputDataValid(this)" 
                        nullmsg="此项不能为空" 
                        value="1234" 
                        datatype="/^[a-zA-Z\u4E00-\u9FA5]{1,40}$/" 
                        placeholder="例：*********"  
                        class="span3 validInputs" 
                        id="phone" 
                        type="text"
                        name="phone" >
                        <div class="Validform_info"></div>
                </td>
            </tr>	
        </tbody>
    </table>
<script>
$(function() {
    // 调用此方法获取表单是否合法
    function checkInputPostData() {
        var list = $(".validInputs")
        var j = 0
        for(var i = 0; i<list.length; i++) {
            j = j+inputDataValid(list[i])
        }
        if (j == 4) {
            return false
        }
        return true
    }
    // 自定义表单效验 gqs
    function inputDataValid(then) {
        var th, promt, value, reg
        th = $(then)
        promt = th.parent().find(".Validform_info")[0]
        value = th.val()
        if(value == null || value == "") {
            $(promt).html('<span style="color:red">'+th.attr('nullmsg')+'</span>')
            $(promt).removeClass('Validform_right').addClass('Validform_wrong')
            return false
        }
        reg = th.attr("datatype")
        if(!eval(reg).test(value)){
            $(promt).html('<span style="color:red">'+th.attr('errormsg')+'</span>')
            $(promt).removeClass('Validform_right').addClass('Validform_wrong')
            return false
        }
        $(promt).html('<span style="color:red"></span>')
        $(promt).removeClass('Validform_wrong').addClass('Validform_right')
        return true
    }
}
</script>
</body>
</html>
```

