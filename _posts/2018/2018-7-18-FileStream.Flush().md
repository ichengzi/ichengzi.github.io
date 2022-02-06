## [how-to-ensure-all-data-has-been-physically-written-to-disk](https://stackoverflow.com/questions/383324/how-to-ensure-all-data-has-been-physically-written-to-disk/3992428#3992428)

NET FileStream's Flush only writes the .NET buffers to the OS cache, it does not flush the OS cache to disk. Sadly the MSDN doc on this class doesn't say that. For .NET < 4.0, you'll have to call Flush + Win32's FlushFilebuffers:

``` cs
using System.Runtime.InteropServices;
. . .

// start of class:
[DllImport("kernel32", SetLastError=true)]
private static extern bool FlushFileBuffers(IntPtr handle);
. . .

stream.Flush();     // Flush .NET buffers to OS file cache.
#pragma warning disable 618,612 // disable stream.Handle deprecation warning.
if (!FlushFileBuffers(stream.Handle))   // Flush OS file cache to disk.
#pragma warning restore 618,612
{
  Int32 err = Marshal.GetLastWin32Error();
  throw new Win32Exception(err, "Win32 FlushFileBuffers returned error for " + stream.Name);
}
```

