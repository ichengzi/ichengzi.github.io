## PowerShell
Windows PowerShell introduces **the concept of a cmdlet** (pronounced "command-let"), a simple, single-function command-line tool built into the shell.

Windows PowerShell is a combined interactive and scripting environment that gives you access to **command-line tools** and** COM objects**, and also enables you to use **the power of the .NET Framework Class Library (FCL)**.

```
两种模块：
1. cmdlet
2. module,(可以包含多个 cmdlet，类似 nameSpace)
```
## PowerShell 版本

`$PSVersionTable` 查看 powershell 版本
``` ps
Windows PowerShell 3.0 requires the full installation of Microsoft .NET Framework 4. 
Windows PowerShell 4.0 requires the full installation of Microsoft .NET Framework 4.5. 
Windows PowerShell 5.0 requires the full installation of Microsoft .NET Framework 4.5. 
```
Windows PowerShell 2.0, Windows PowerShell 3.0, and Windows PowerShell 4.0 run in the Windows Preinstallation Environment (Windows PE). 但是在PE环境下，一部分命令不支持。

## 运行脚本
To keep Windows PowerShell secure, the default execution policy on Windows PowerShell is Restricted. This policy allows you to **run cmdlets, but not scripts.** windows 默认可以运行 cmdlet，但不能运行脚本（需要开启权限）。

## 远程运行脚本
**Enable remoting**. The system is already configured for you to run remote commands on other computers. On Windows Server 2012 R2 and Windows Server 2012, the system is also configured to receive remote commands, that is, to allow other computers to run remote commands on the local computer. To enable computers running other versions of Windows to receive remote commands, run the Enable-PSRemoting cmdlet on the computer that you want to manage remotely. Only members of the Administrators group on the computer can run this cmdlet.
 开启执行远程 powershell 命令。

## 基础命令
``` ps
1. Get-Command *-Service
2. Get-Help Get-Service
3. Get-Service | Get-Member
```
Most cmdlets **emit objects which can be manipulated** and then **rendered into text for display**. To fully understand the output of that cmdlet, **pipe its output to the Get-Member cmdlet**. For example, the following command displays information about the members of the object output by the Get-Service cmdlet.


## Consistency - 关于一致性
<https://docs.microsoft.com/en-us/powershell/scripting/getting-started/fundamental/about-windows-powershell?view=powershell-5.1>

Managing systems can be a complex endeavor and tools that have a consistent interface help to control the **inherent complexity**(内在的复杂性). Unfortunately, neither **command-line tools nor scriptable COM objects**（命令行工具或可脚本调用的COM对象） have been known for their consistency.

The consistency of Windows PowerShell is **one of its primary assets**（一个主要的优点）. For example, if you learn how to use the Sort-Object cmdlet, you can use that knowledge to sort the output of any cmdlet. You do not have to learn the different sorting routines of each cmdlet.

In addition, cmdlet developers do not have to design sorting features for their cmdlets. Windows PowerShell gives them a framework that provides the basic features and forces them to be consistent about many aspects of the interface. The framework eliminates some of the choices that are typically left to the developer, but, in return, it makes the development of robust and easy-to-use cmdlets much simpler.

## Object Orientation - 面向对象
Although you interact with Windows PowerShell by typing commands in text, **Windows PowerShell is based on objects, not text**. The output of a command is an object. You can send the output object to another command as its input. As a result, Windows PowerShell provides a familiar interface to people experienced with other shells, while introducing a new and powerful command-line paradigm. **It extends the concept of sending data between commands by enabling you to send objects, rather than text**.



## 基础cmdlet
<https://docs.microsoft.com/zh-cn/powershell/module/Microsoft.PowerShell.Management/Get-Service?view=powershell-5.1>

`Get-Service | Where-Object {$_.Status -eq "Running"}`， 过滤出只在运行的 service

`Get-Service -ComputerName "Server02"` Because the ComputerName parameter of Get-Service **does not use Windows PowerShell remoting**, you can use this parameter even if the computer is not configured for remoting in Windows PowerShell. 这个命令不需要远程权限，所以可以获取内网机器上的服务。