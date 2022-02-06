---
layout: post
title:  "javaScript 学习笔记02"
date:  2017-3-27 19:37:16+0800
categories: js
author: chengzi
---

## 1. const

const works like let, but the variable you declare must be `immediately initialized`, with a value that can’t be changed afterwards.

const only means that a variable always has the same value, but it does not mean that the `value itself is or becomes immutable.`

    The const declaration creates a read-only reference to a value. It does not mean the value it holds is immutable, just that the variable identifier cannot be reassigned. For instance, in case the content is an object, this means the object itself can still be altered.
    More succinctly: const creates an immutable binding.

    In other words: const, like var, gives you a mutable chunk of memory in which you're storing something. However, const dictates that you must keep referring to that same chunk of memory – you can't reassign the variable to a different chunk of memory, because the variable reference is constant.

    const只是声明了一个变量，这个变量指向了一个object；这个变量的值不能改变，也即它一直指向同一个内存地址。但是那个内存中的object的值是可以改变的。


## 2.  this
js的this关键字

[Javascript的this用法 - 阮一峰](http://www.ruanyifeng.com/blog/2010/04/using_this_keyword_in_javascript.html)