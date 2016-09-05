using System;
using System.Reflection;

namespace ConsoleApplication2
{
    class Program
    {
        static void Main(string[] args)
        {
            MyClass m = new MyClass();
            Type type = m.GetType();
            Console.WriteLine("类型名:" + type.Name);
            Console.WriteLine("类全名：" + type.FullName);
            Console.WriteLine("命名空间名:" + type.Namespace);
            Console.WriteLine("程序集名：" + type.Assembly);
            Console.WriteLine("模块名:" + type.Module);
            Console.WriteLine("基类名：" + type.BaseType);
            Console.WriteLine("是否类：" + type.IsClass);
            Console.WriteLine("类的公共成员：");
            MemberInfo[] memberInfos = type.GetMembers();//得到所有公共成员
            foreach (var item in memberInfos)
            {
                Console.WriteLine("{0}:{1}", item.MemberType, item);
            }
			
			 Console.WriteLine(Environment.NewLine);
			 //获取当前执行代码的程序集
            Assembly assem = Assembly.GetExecutingAssembly();

            Console.WriteLine("程序集全名:" + assem.FullName);
            Console.WriteLine("程序集的版本：" + assem.GetName().Version);
            Console.WriteLine("程序集初始位置:" + assem.CodeBase);
            Console.WriteLine("程序集位置：" + assem.Location);
            Console.WriteLine("程序集入口：" + assem.EntryPoint);


            Type[] types = assem.GetTypes();
            Console.WriteLine("程序集下包含的类型:");
            foreach (var item in types)
            {
                Console.WriteLine("类：" + item.Name);
            }
        }

    }
    class MyClass
    {
        public string m;
        public void test()
        { }
        public int MyProperty { get; set; }

    }
}