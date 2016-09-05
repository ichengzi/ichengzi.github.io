using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;
using System.Windows;

class hello_world
{
	static void Main(string[] args)
	{
		int a = 1;
		//int b = 2;
		//int c = a + b;
		//Console.WriteLine(c);
		Console.WriteLine(args[0]);
		Console.WriteLine("Hello , World!");
		
		bool? b = null;
		Console.WriteLine(b);		
		
		bool c = false;
		Console.WriteLine(c);
		
		Console.WriteLine("end");
	}
}
