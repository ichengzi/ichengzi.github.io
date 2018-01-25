检查.net版本
=============
`$version = gci 'HKLM:\SOFTWARE\Microsoft\NET Framework Setup\NDP'| sort pschildname -desc | select -fi 1 -exp pschildname`


`.\dotNetFx40_Full_x86_x64.exe /?` 查看这个安装程序对应的参数
`dotNetFx40_Full_x86_x64.exe /q` ， 静默安装 .net 4

```
$exists = test-path "HKLM:\SOFTWARE\Microsoft\NET Framework Setup\";
$version = gci 'HKLM:\SOFTWARE\Microsoft\NET Framework Setup\NDP'| sort pschildname -desc | select -fi 1 -exp pschildname;
Write-Progress "正在安装.NET Framework 4" "请稍候……"
Get-ChildItem $PSScriptRoot -Filter *.exe | %{start -wait $_ -ArgumentList "/quiet"}
Write-Progress "completed" "completed" -Completed
```

# Write-Progress是显示进度条信息，
# $PSScriptRoot是获取当前脚本所在的路径。
# -ArgumentList参数表示该安装过程是以静默安装的方式进行，如果没有该参数就会显示具体的安装过程。
<#
    bolock comment， 块注释区
#>



- net start
- net stop
- sc  -- service management(cmd); Set-Content(powershell)
    `sc \\DC01 start spooler`,启动 dc01上的一个服务
- tasklist
- taskkill



## powershell 命名系统
Windows PowerShell uses a "verb-noun" naming system, where each cmdlet name consists of a standard verb hyphenated with a specific noun. Windows PowerShell verbs are not always English verbs, but they express specific actions in Windows PowerShell. Nouns are very much like nouns in any language, they describe specific types of objects that are important in system administration. It is easy to demonstrate how these two-part names reduce learning effort by looking at a few examples of verbs and nouns.


PS> Get-Command -Verb Get
PS> Get-Command -Noun Service
PS> Get-Command -Name Clear-Host

### PS> Get-Process -?
When you specify the -? parameter to any cmdlet, the cmdlet is not executed. Instead, Windows PowerShell displays help for the cmdlet.

### Common Parameters
Windows PowerShell has several parameters known as common parameters. Because these parameters are controlled by the Windows PowerShell engine, whenever they are implemented by a cmdlet, they will always behave the same way. The common parameters are **WhatIf, Confirm, Verbose, Debug, Warn, ErrorAction, ErrorVariable, OutVariable, and OutBuffer.**

### Suggested Parameters
The Windows PowerShell core cmdlets use standard names for similar parameters. Although the use of parameter names is not enforced, there is explicit guidance for usage to encourage standardization.

For example, the guidance recommends naming a parameter that refers to a computer by name as ComputerName, rather than Server, Host, System, Node, or other common alternative words. Among the important suggested parameter names are **Force, Exclude, Include, PassThru, Path, and CaseSensitive**.


### PowerShell -Confirm:$False
I stumbled upon the $False commands for unattended scripts.  What I am thinking is that if you are running scripts which require a response, then you could try appending -Confirm:False  (do remember that colon).

``` powershell
# PowerShell -Confirm for unattended machines
Restart-Service Bits -Confirm:$False
```

### How To Research PowerShell Cmdlets Containing -Confirm and -WhatIf
My idea behind this research is to list the PowerShell cmdlets that contain 'confirm' in their parameters.
``` powershell
# Research PowerShell parameters for 'Confirm'
Get-Command | where { $_.parameters.keys -Contains "Confirm"}

# Refine Get-Command with -CommandType
# PowerShell Confirm cmdlets
Get-Command -commandType cmdlet | where { $_.parameters.keys -Contains "Confirm"} | Format-Table Name
```