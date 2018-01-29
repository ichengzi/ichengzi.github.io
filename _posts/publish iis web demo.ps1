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
        Write-Error $_.Exception.Message
    }
}

if(CheckFramework() -eq $false)
{
    Write-Progress "正在安装.NET Framework" "请稍候……";
    Get-ChildItem $PSScriptRoot -Filter "dotNetFx40_Full_x86_x64.exe" | %{start -wait $_ -ArgumentList "/quiet"};
    Write-Progress "completed" "completed" -Completed;
}