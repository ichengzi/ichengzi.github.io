---
layout: post
title:  "javaScript 学习笔记01"
date:  2017-3-27 16:37:16+0800
categories: js
author: chengzi
---

* 目录
{:toc}

## Cookies

``` js
// cookies
document.cookie //获取cookie对象
document.cookie = 'key = value';
//key存在就修改为value,不存在就创建
document.cookie = 'key = value;expires=date;path=/;domain=csdn.cn'

//cookie是一个分号分割的长 key/value 字符串，读取时需要进行字符串的切割
var  getCookie  = function( keyName){
 	var items = [] , json = {};
	var cookie = document.cookie;
 	if( cookie.length > 0 ){
 		items = cookie.split(';');
 		for(var i = 0;i < items.length;i++){
            var item = items[i].split('=');
 			json[item[0]] = item[1] ;
 		}
 		return unescape(json[keyName]);	
        //该函数的工作原理是这样的：通过找到形式为 %xx 和 %uxxxx 的字符序列（x 表示十六进制的数字， 如URL），用 Unicode 字符 \u00xx 和 \uxxxx 替换这样的字符序列进行解码。
        //注释：ECMAScript v3 已从标准中删除了 unescape() 函数，并反对使用它，因此应该用 decodeURI() 和 decodeURIComponent() 取而代之。
 	}else{
 		return '';
 	}
}

// use jquery.cookie.js
var value = $.cookie("name"); //get cookie
$.cookie('name', 'new_value'); //set cookie 
$.cookie('name', 'new_value', { expires: 14, path: '/' }); // set cookie with  ex
$.removeCookie('name');
```

## LocalStorage, SessionStorage

``` js
// html5, localStorage
window.localStorage.setItem(key, value);
window.localStorage.getItem(key);
window.localStorage.removeItem(key);
window.localStorage.clear();

// sessionStorage 同 localStorage
```

## Navigator

Navigator 对象包含有关浏览器的信息。

**注释**：没有应用于 navigator 对象的公开标准，不过所有浏览器都支持该对象。

``` js
window.navigator.cookieEnabled; // 读取浏览器是否设置可以使用cookie
window.navigator.userAgent;
// userAgent 属性是一个只读的字符串，声明了浏览器用于 HTTP 请求的用户代理头的值。
```

## Window

`Window` is the main JavaScript object root, aka the global object in a browser, also can be treated as the root of the document object model. You can access it as `window` in most of the cases (in the browser);

`window.screen` is a small information object about physical screen dimensions.

`window.document` or just `document` is the main object of the visible document object model/DOM.

	`document` can also be `window.document`, 
	`screen` can be `window.screen`, 
	`window` can be `window.window` (or` window.window.window`)

	console.dir(); //可以在chrome调试工具里显示一个对象的内容
    console.dir(window);
    console.dir(document);
    console.dir(screen); 

``` js
window对象下的对象或属性：
window.location //giving the current URL
window.history //with methods back() and forward() giving the tab's mutable history
window.navigator //describing the browser software
```

------------------
``` html
<body>
	<p id="p1"> This is the first paragraph.</p>
</body>
```

the paragraph element can be referenced by any of the following:

 * `window.p1` or `window["p1"]`
 * `document.getElementById("p1")`
 * `document.body.firstChild`
 * `document.body.children[0]`


 ##  js-Class
 
[MDN js class](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)

 **JavaScript classes** introduced in ECMAScript 2015 are **syntactical sugar**  over **JavaScript's existing prototype-based inheritance**. The class syntax is **not introducing a new object-oriented inheritance model to JavaScript**. JavaScript classes provide a much **simpler and clearer syntax to create objects and deal with inheritance**.

 ecma2015中引入的class是基于js的**原型链继承方式**，并不是为js引入了一种新的**面向对象的继承模型**。新的class关键字只是提供了一种更简单清晰的**创建对象和处理继承的语法**。

--------------------------
 ## html element --- id vs name

 1. id 适用于所有元素，name只适用一部分如form, img 等
 2. 当一个form提交数据时，其必须设置name属性
 3. name - document.getElementsByName();    id - document.getElementById()

--------------------------
 ## js内置的对象

JS的对象可以使用‘.’操作符动态的扩展其属性，可以使用’delete’操作符或将属性值设置为’undefined’来删除属性。

JavaScript is designed on a simple object-based paradigm. An object is a collection of properties, and a property is an association between a name (or key) and a value. A property's value can be a function, in which case the property is known as a method. 

ECMA标准定义JS中对象：无序属性的集合，其属性可以包含基本值、对象或者函数。可以简单理解为JS的对象是一组无序的值，其中的属性或方法都有一个名字，根据这个名字可以访问相映射的值（值可以是基本值/对象/方法）。

学习（MDN）：
1. [JS Standard built-in objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects)
2. [Working with objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects)
3. [JS面向对象的程序设计](http://www.cnblogs.com/gaojun/archive/2013/10/24/3386552.html)
4. [全面理解面向对象的 JavaScript](https://www.ibm.com/developerworks/cn/web/1304_zengyz_jsoo/)

	JavaScript 函数式脚本语言特性以及其看似随意的编写风格，导致长期以来人们对这一门语言的误解，即认为 JavaScript 不是一门面向对象的语言，或者只是部分具备一些面向对象的特征。本文将回归面向对象本意，从对语言感悟的角度阐述为什么 JavaScript 是一门彻底的面向对象的语言，以及如何正确地使用这一特性。
5. [Javascript 面向对象编程-阮一峰](http://www.ruanyifeng.com/blog/2010/05/object-oriented_javascript_encapsulation.html)

	学习Javascript，最难的地方是什么？我觉得，Object（对象）最难。因为Javascript的Object模型很独特，和其他语言都不一样，初学者不容易掌握。