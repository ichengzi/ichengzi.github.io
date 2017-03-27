---
layout: post
title:  "有意思的StackOverflow"
date:  2017-3-27 18:37:16+0800
categories: sf
author: chengzi
---

* 目录
{:toc}

## 1. Why does ?: cause a conversion error while if-else does not? 

[Question Link](http://stackoverflow.com/questions/42690073/why-does-cause-a-conversion-error-while-if-else-does-not)

``` csharp
uint a = b==c ? 0 : 1;
//vs: Cannot implicitly convert type 'int' to 'uint'. An explicit conversion exists (are you missing a cast?)

uint a; 
if (b == c) 
    a = 0; 
else 
    a = 1;
// working correctly
```

**[Answer]**

> Why can't I use `uint a = b == c ? 0 : 1;`?

The type of the expression `b == c ? 0 : 1` is `int`. As shown in [this table](https://msdn.microsoft.com/en-us/library/y5b434w4.aspx), there is no implicit conversion from `int` to `uint`, so this is not allowed.

> Why can I use `a = 0`?

Because there is special treatment of **numeric types** when the value is a **constant expression**. 

From section 6.1.9 of the C# specification:

>- A constant expression of type int can be converted to type **sbyte, byte, short, ushort, uint, or ulong**, provided the value of the constant-expression is within the range of the destination type.

>- A constant expression of type long can be converted to type ulong, provided the value of the constant expression is not negative.

As indicated in the first bullet `a = 0` and `a = 1` are both allowed because `0` and `1` are constant expressions and are valid `uint` values. Basically what this boils down to is that the compiler can easily determine at compile time that these conversions are valid, so it allows them.

Incidentally, if the `b == c` part of your first example were changed to a constant expression (e.g. `true`), then the whole conditional operator expression would be a constant expression and the code would compile.
