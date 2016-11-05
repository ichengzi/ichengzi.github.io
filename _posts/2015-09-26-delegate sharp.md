---
layout: post
title:  delegate csharp
date:   2016-10-23 13:22:47 +0800
categories: csharp
author: chengzi
---

### what is delegate
实际上，委托在编译的时候确实会编译成类。  
因为Delegate是一个类，所以在任何可以声明类的地方都可以声明委托。  
一个类内部(内部类)，或者一个类外部都行。

委托是一个类，它定义了方法的类型，使得可以将方法当作另一个方法的参数来进行传递，这种将方法动态地赋给参数的做法，可以避免在程序中大量使用If-Else(Switch)语句，同时使得程序具有更好的可扩展性。

可以将多个方法赋给同一个委托，或者叫将多个方法绑定到同一个委托，当调用这个委托的时候，将依次调用其所绑定的方法。

``` csharp
GreetingDelegate delegate1;
delegate1 = EnglishGreeting; // 先给委托类型的变量赋值
`delegate1 += ChineseGreeting; `  // 给此委托变量再绑定一个方法
第一次用的“=”，是`赋值的语法；`
第二次，用的是“+=”，是`绑定的语法`
第一个方法注册用“=”，是赋值语法，因为要进行`实例化`，第二个方法注册则用的是`+=`
如果第一次就使用“+=”，将出现“使用了未赋值的局部变量”的编译错误。
```

> /*注册，相当于`一个方法`向一个`委托机构`注册，让委托被call时，来调用方法*/

### Observer设计模式
在继续进行之前，我们先了解一下Observer设计模式，Observer设计模式中主要包括如下两类对象：

> Subject：监视对象，它往往包含着其他对象所感兴趣的内容。在本范例中，热水器就是一个监视对象，它包含的其他对象所感兴趣的内容，就是temprature字段，当这个字段的值快到100时，会不断把数据发给监视它的对象。
> Observer：监视者，它监视Subject，当Subject中的某件事发生的时候，会告知Observer，而Observer则会采取相应的行动。在本范例中，Observer有警报器和显示器，它们采取的行动分别是发出警报和显示水温。

### Event声明与使用
在回答上面的问题之前，我们先搞懂 .Net Framework的编码规范：
- 委托类型的名称都应该以EventHandler结束。
- 委托的原型定义：有一个void返回值，并接受两个输入参数：一个Object 类型，一个 EventArgs类型(或继承自EventArgs)。
- 事件的命名为 委托去掉 EventHandler之后剩余的部分。
- 继承自EventArgs的类型应该以EventArgs结尾。

