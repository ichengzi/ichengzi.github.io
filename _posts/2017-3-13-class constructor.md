---
layout: post
title:  "class constructor"
date:  2017-3-13 20:06:59+0800
categories: csharp
author: chengzi
---

## operator overload

``` csharp
instance constructor  -------> .ctor，实例构造函数
class constructor       --------> .cctor，类型构造函数
```

CLR通过线程锁机制，保证每个AppDomain中，一个类型的 .cctor只被调用一次

类型构造器只能访问类型的静态字段。

`private static int _x = 5`，这个是 .cctor 的简化语法，c#编译器会会自动生成一个 .cctor 方法。

操作符重载比如是 `public` and `static`的。

c#允许的一元操作符： `+, - , !, ~, ++, --` 

c#允许的一元操作符： `+, -, *, /, %, &, |, ^,  <<, >>, < ,<= , >, >=`

内联代码(`Inline`) 可以让JIT编译器优化代码，减少方法调用，提升性能。


----------------
## conversion operator

对于编译器能识别的基元类型，编译器自己就知道如何生成转换对象所需的代码。

但是对于非基元类型，编译器会生成代码调用，让CLR进行强制转型。

c#支持转换操作符(conversion operator ) 重载。

``` csharp
public sealed class Rational {
        // Constructs a Rational from an Int32
        public Rational(Int32 num) { ... }
        // Constructs a Rational from a Single
        public Rational(Single num) { ... }
        // Convert a Rational to an Int32
        public Int32 ToInt32() { ... }
        // Convert a Rational to a Single
        public Single ToSingle() { ... }
        // Implicitly constructs and returns a Rational from an Int32
        public static implicit operator Rational(Int32 num) {
        return new Rational(num);
        }
        // Implicitly constructs and returns a Rational from a Single
        public static implicit operator Rational(Single num) {
        return new Rational(num);
        }
        // Explicitly returns an Int32 from a Rational
        public static explicit operator Int32(Rational r) {
        return r.ToInt32();
        }
        // Explicitly returns a Single from a Rational
        public static explicit operator Single(Rational r) {
        return r.ToSingle();
        }
}

// 生成的IL代码
//  转换操作方法在IL中的名字只有 op_Implicit, op_Explicit两种
public static Rational op_Implicit(Int32 num);
public static Rational op_Implicit(Single num);
public static Int32 op_Explicit(Rational r);
public static Single op_Explicit(Rational r);

// 隐式和显示转换
public sealed class Program {
        public static void Main() {
                Rational r1 = 5; // Implicit cast from Int32 to Rational
                Rational r2 = 2.5F; // Implicit cast from Single to Rational
                Int32 x = (Int32) r1; // Explicit cast from Rational to Int32
                Single s = (Single) r2; // Explicit cast from Rational to Single
        }
}
```

----------------
## extension method

扩展方法只能定义在顶级类(文件级别的类)中，不能定义在**嵌套类**中。

可以定义扩展方法的包括：
1. 普通类
2. 接口
3. 枚举
4. 委托

方法调用查找顺序：
1. 类本身
2. 基类或接口
3. 扩展方法

所有的方法都有一个隐藏的this指针，如果是静态方法，则this指针为null。


