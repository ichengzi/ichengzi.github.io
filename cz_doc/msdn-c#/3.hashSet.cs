using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
 
namespace Hash
{
    class Program
    {
        static void Main(string[] args)
        {
            HashSet<string>  name1 = new HashSet<string>() { "zhang", "wang", "li", "zhao" };//定义两个集合
            HashSet<string>  name2 = new HashSet<string>() { "zhao", "qian", "sun", "li" };
            HashSet<string> subName1 = new HashSet<string>() { "zhang", "wang" };
 
            if(name1.Add("zhang")) //添加元素
            {
                Console.WriteLine("'zhang' Added success");
  
            }
            else
            {
                Console.WriteLine("'zhang' is alreadly in.");
            }
 
            if (subName1.IsSubsetOf(name1))  //判断subName1是不是name1的子集
            {
                Console.WriteLine("subName1是name1的子集");
            }
 
            if (name1.IsSupersetOf(subName1))//判断集合name1是不是包含subname1
            {
                Console.WriteLine("集合name1包含subName1");
            }
 
            if (name1.Overlaps(name2))//判断集合name1和name2是不是有交集
            {
                Console.WriteLine("集合name1和name2有交集");
            }
 
            HashSet<string> allName = new HashSet<string>(name1);//使用集合初始化
            allName.UnionWith(name2);//与name2求并集
            allName.UnionWith(subName1);//
            Console.Write("所有的姓氏:  ");
            foreach (var name in allName)  //迭代输出
            {
                Console.Write(name + "   ");
            }
            Console.WriteLine();
 
            allName.ExceptWith(name1);
            Console.Write("从所有姓氏中除去name1中的姓氏:  ");
            foreach (var name in allName)  //迭代输出
            {
                Console.Write(name + "   ");
            }
            Console.WriteLine();
 
            Console.Write("name1中的姓氏:  ");
            foreach (var name in name1)  //迭代输出
            {
                Console.Write(name + "   ");
            }
            Console.ReadKey();
        }
    }
}