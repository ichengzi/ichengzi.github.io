- winfrom 事件为中心
- WPF mvvm 数据为中心，datacontext绑定数据， 通过绑定把数据推送给view。

- asp.net mvc, 因为BS结构的缘故，MVC提供了**modelbinder**自动帮助开发人员**对应传递的参数**，通过**modelstate将各个参数的验证信息存储**，同样的，让别人帮你干活，你就得听别人的，参数名字什么的一致性，你就得保证好了。

-------------

## c# 闭包

``` cs
class Program
{
    static void Main(string[] args)
    {
        int comparionCount = 0;
        int[] items = new int[2];
        for (int i = 0; i < items.Length; i++)
        {
            Console.WriteLine("Enter a integer:");
            items[i] = int.Parse(Console.ReadLine());
        }

        var flag = Sort(items, (first, second) => 
        {
            comparionCount++;
            return first > second; 
        });

        if (flag)
            Console.WriteLine("First Parameter is bigger");
        else
            Console.WriteLine("Second Parameter is bigger");
        Console.WriteLine(string.Format("Items were compared {0} times", comparionCount));
        Console.Read();
    }

    static bool Sort(int[] items, Func<int,int,bool> method)
    {
        return method(items[0], items[1]);
    }
}
```

编译完成后的 IL代码，被使用的局部变量被当作一个实例字段，包含在编译器生成的内部类中。

原文是这么说的：生成的__LocalsDisplayClass类成为闭包，它是一个数据结构（一个C#类），其中包含一个表达式以及对表达式进行求值所需的变量。

``` cs
class Program
{
    private sealed class class __LocalsDisplayClass_00000001
    {
        public int comparionCount;
        public bool __AnonymousMethd_00000000(int first,int second)
        {
            comparionCount ++;
            return first>second;
        }
    }

    static void Main(string[] args)
    {
        __LocalsDisplayClass_00000001 locals =
            new __LocalsDisplayClass_00000001 ();
        locals .comparionCount =0;
        int[] items = new int[2];
        for (int i = 0; i < items.Length; i++)
        {
            Console.WriteLine("Enter a integer:");
            items[i] = int.Parse(Console.ReadLine());
        }

        var flag = Sort(items,locals.__AnonymousMethd_00000000);

        if (flag)
            Console.WriteLine("First Parameter is bigger");
        else
            Console.WriteLine("Second Parameter is bigger");
        Console.WriteLine(string.Format("Items were compared {0} times", comparionCount));
        Console.Read();
    }

    static bool Sort(int[] items, Func<int,int,bool> method)
    {
        return method(items[0], items[1]);
    }
}
```