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

