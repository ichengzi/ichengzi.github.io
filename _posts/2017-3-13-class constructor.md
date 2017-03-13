---
layout: post
title:  "class constructor"
date:  2017-3-13 20:06:59+0800
categories: c#
author: chengzi
---


``` csharp
instance constructor  -------> .ctor
class constructor       --------> .cctor
```

CLR通过线程锁机制，保证每个AppDomain中，一个类型的 .cctor只被调用一次

类型构造器只能访问类型的静态字段。

`private static int _x = 5`，这个是 .cctor 的简化语法，c#编译器会会自动生成一个 .cctor 方法。

操作符重载比如是 `public` and `static`的。

c#允许的一元操作符： `+, - , !, ~, ++, --` 

c#允许的一元操作符： `+, -, *, /, %, &, |, ^,  <<, >>, < ,<= , >, >=`

内联代码(`Inline`) 可以让JIT编译器优化代码，减少方法调用，提升性能。
