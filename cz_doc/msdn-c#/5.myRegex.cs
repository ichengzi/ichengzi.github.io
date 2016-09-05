using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;
using System.Windows;
using System.Text.RegularExpressions;
class myRegex
{
	static void Main(string[] args)
	{
		string emailPattern = @"[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`
			{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?";
		// @"^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)||[ccc] 
		// (([\w-]+\.)+))([a-zA-Z]{2,4}||[0-9]{1,3})(\]?)$"; 

		Console.Write("Enter an e-mail address:");
		string emailInput = Console.ReadLine();
		bool match = Regex.IsMatch(emailInput, emailPattern);
		if (match)
		　Console.WriteLine("E-mail address is valid.");
		else
		　Console.WriteLine("Supplied input is not a valid e-mail address.");
	}
}
