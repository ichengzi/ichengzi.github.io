---
layout: post
title:  "c# keynote 1"
date:   2016-4-21 20:56:35 +0800
categories: c#
---

``` csharp
public class User
{
	public string Name{set;get;}
	public int Age{set;get;}
}
//下面代码，效果一致，{}内称为对象初始化器
var user = new User{ Name = "apple", Age = 14 };
var user = new User(){ Name = "apple", Age = 14 };
```

----
``` xml
扩展方法是一种特殊的静态方法，但可以像扩展类型上的实例方法一样进行调用。

//noWrap,很多的tabitem
<ResourceDictionary Source="pack://application:,,,/MahApps.Metro;component/Styles/Controls.AnimatedSingleRowTabControl.xaml" />

//Wrap
<ResourceDictionary Source="pack://application:,,,/MahApps.Metro;component/Styles/Controls.AnimatedTabControl.xaml" />

Controls:TabControlHelper.IsUnderlined="True" 对于 Controls:MetroTabControl无效，可用于TabControl

Controls:TabControlHelper.IsUnderlined="True" 可用于水平放置的tabcontrol，竖直的不好看

Separator 的背景色在布局控件中无效，toolbar中的可用
```

----
```
WPF----解决Window Handle问题 
  
在Windows GDI或WinForm开发中复杂的GUI应用程序，会使用的大量的控件，如Grid等。
而每个控件或Grid cell都是一个小窗口，会使用一个Window handle，尽管控件厂商提供了很多优化办法，但还是会碰到Out of Memory或"Error Create Window handle"，而导致程序退出。 
  
WPF彻底改变了控件显示的模式，控件不在使用窗口，也就不会占用Window handle。
理论上，如果一个WPF只有一个主窗口的话，WPF只会使用一个Window handle（如果忽略用于Dispatcher的隐藏窗口的话）。所以WPF GUI程序不会出现Window handle不够用的情况。 

WPF处在中间层 不温不火。开发效率比不上winform，执行效率比不上C++或其它。
```