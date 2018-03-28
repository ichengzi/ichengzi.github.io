function CheckFramework
{
    try
    {
         $exists = test-path "HKLM:\SOFTWARE\Microsoft\NET Framework Setup\"
         if($exists -eq $false)
         {
            return $false
         }
         else
         {
            $version = gci 'HKLM:\SOFTWARE\Microsoft\NET Framework Setup\NDP'| sort pschildname -desc | select -fi 1 -exp pschildname
            if($version -ge "v4.0")
            {
                return $true
            }
            else
            {
                return $false
            }
          }
    }
    catch
    {
        Write-Output $_.Exception.Message;
        return $false;
    }
}

function CreatAppPool($appPoolName)
{
    set-location iis:\AppPools;
    $existsAppPool = test-path $appPoolName;
    if($existsAppPool -eq $false)
    {
    　　$appPool = new-item $appPoolName;
    　　#设置标识：LocalService=1;LocalSystem=2;NewworkService=3;ApplicationPoolIdentity=4
    　　$appPool.ProcessModel.IdentityType=4;
    　　
    　　$appPool.managedRuntimeVersion="v4.0";#设置.NET Framework 版本
    　　
    　　$appPool.ManagedPipelineMode=0;#设置托管管道模式：集成=0；经典=1
    　　$appPool.startMode="AlwaysRunning"
    　　$appPool.enable32BitAppOnWin64=0;#设置启用32位应用程序 false=0;true=1
    　　$appPool | set-item;
    }
    else
    {
        Write-Output "应用程序池已经存在";
    }
}

Set-ExecutionPolicy RemoteSigned;#打开脚本运行权限
$res = CheckFramework;
if($res -eq $false)
{
    Write-Progress "正在安装.NET Framework" "请稍候……";
    Get-ChildItem $PSScriptRoot -Filter "dotNetFx40_Full_x86_x64.exe" | %{start -wait $_ -ArgumentList "/quiet"};
    Write-Progress "completed" "completed" -Completed;

    Import-Module WebAdministration;
    $appPoolName = "CtripAtmSubSerPool";
    CreatAppPool($appPoolName);
    New-WebApplication -Site "Default Web Site" -Name "CtripAtmSub" -PhysicalPath $PSScriptRoot"ATMWebSer" -ApplicationPool $appPoolName;
    
    $appPoolName = "CtripUpdateSerPool";
    CreatAppPool($appPoolName);
    New-WebApplication -Site "Default Web Site" -Name "CtripUpdate" -PhysicalPath $PSScriptRoot"CtripUpdate" -ApplicationPool $appPoolName;
}

Set-ExecutionPolicy Restricted;#关闭脚本运行权限
Read-Host -Prompt "Press Enter to continue";