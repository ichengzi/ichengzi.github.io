$exists = test-path "HKLM:\SOFTWARE\Microsoft\NET Framework Setup\";
if($exists)
{
    $version = Get-ChildItem 'HKLM:\SOFTWARE\Microsoft\NET Framework Setup\NDP'| Sort-Object pschildname -desc | Select-Object -fi 1 -exp pschildname;
    if($version -eq 'v4.0')
    {
        Write-Output '.net 4.0 has installed successed';
    }
}
