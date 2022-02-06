## 参考文档
* https://referencesource.microsoft.com/#mscorlib/system/io/filestream.cs,0268f0f5e2f14824
* https://referencesource.microsoft.com/#mscorlib/system/io/stream.cs,f956b0c07e86df64
* https://referencesource.microsoft.com/#mscorlib/system/gc.cs,c080e735b6f6f86a
* [浅谈C#内存回收与Finalize, Dispose, Close方法(一)](http://www.voidcn.com/article/p-vinhcrdh-nk.html)
* [浅谈C#内存回收与Finalize, Dispose, Close方法(二)](http://www.voidcn.com/article/p-dtefrgvq-nk.html)
* [Difference between BinaryWriter and BinaryFormatter.Serialize?](https://stackoverflow.com/questions/40749926/difference-between-binarywriter-and-binaryformatter-serialize)

## Dispose() vs Close()

如 stream close() 代码注释所说， **在引入 IDisposable接口之前，清理非托管资源的代码一般是放在 close方法里**。
为了不破坏这个编程模式， 可以看到 Dispose() 也只是简单调用了close 方法。 
close() 调用 虚方法 Dispose(bool disposing), 来实现真正的资源清理释放。

在具体的编程实践中，调用`close()` 和`dispose()`都是可以的:
1. 如果是维护之前的老代码， 可以写`close()`
2. 如果是新的IDisposable模式 可以写`dispose()`

在FileStream 的Dispose(bool disposing) 实现中， 有一个特殊的实现，当写buffer里有数据， 但未写到文件中时， 会执行写文件操作。 这就会有一个特殊的现象：

1. 打开FileStream， **写流， 无flush， 执行了close**， 文件实际是写成功的。 
2. 打开FileStream， **写流， 无flush， 无close**，如果这个 fliestream 超出了作用域，并且CLR执行了GC， 那么CLR在执行 GC的时候会执行下析构函数，析构函数调用Dispose()，执行清理操作，也执行了写文件，实际上也是写成功的。（**但GC时间、时机是不可控、不可预测的，所以文件写成功的具体精确时间也是不定的**）


``` cs
// FileStream code
[System.Security.SecuritySafeCritical]  // auto-generated
protected override void Dispose(bool disposing)
{
    // Nothing will be done differently based on whether we are 
    // disposing vs. finalizing.  This is taking advantage of the
    // weak ordering between normal finalizable objects & critical
    // finalizable objects, which I included in the SafeHandle 
    // design for FileStream, which would often "just work" when 
    // finalized.
    try {
        if (_handle != null && !_handle.IsClosed) {
            // Flush data to disk iff we were writing.  After 
            // thinking about this, we also don't need to flush
            // our read position, regardless of whether the handle
            // was exposed to the user.  They probably would NOT 
            // want us to do this.
            if (_writePos > 0) {
                FlushWrite(!disposing);
            }
        }
    }
    finally {
        if (_handle != null && !_handle.IsClosed)
            _handle.Dispose();
        
        _canRead = false;
        _canWrite = false;
        _canSeek = false;
        // Don't set the buffer to null, to avoid a NullReferenceException
        // when users have a race condition in their code (ie, they call
        // Close when calling another method on Stream like Read).
        //_buffer = null;
        base.Dispose(disposing);
    }
}

[System.Security.SecuritySafeCritical]  // auto-generated
~FileStream()
{
    if (_handle != null) {
        BCLDebug.Correctness(_handle.IsClosed, "You didn't close a FileStream & it got finalized.  Name: \""+_fileName+"\"");
        Dispose(false);
    }
}
```

``` cs
// Stream code

// Stream used to require that all cleanup logic went into Close(),
// which was thought up before we invented IDisposable.  However, we
// need to follow the IDisposable pattern so that users can write 
// sensible subclasses without needing to inspect all their base 
// classes, and without worrying about version brittleness, from a
// base class switching to the Dispose pattern.  We're moving
// Stream to the Dispose(bool) pattern - that's where all subclasses 
// should put their cleanup starting in V2.
public virtual void Close()
{
    /* These are correct, but we'd have to fix PipeStream & NetworkStream very carefully.
    Contract.Ensures(CanRead == false);
    Contract.Ensures(CanWrite == false);
    Contract.Ensures(CanSeek == false);
    */

    Dispose(true);
    GC.SuppressFinalize(this);
}

public void Dispose()
{
    /* These are correct, but we'd have to fix PipeStream & NetworkStream very carefully.
    Contract.Ensures(CanRead == false);
    Contract.Ensures(CanWrite == false);
    Contract.Ensures(CanSeek == false);
    */

    Close();
}

protected virtual void Dispose(bool disposing)
{
    // Note: Never change this to call other virtual methods on Stream
    // like Write, since the state on subclasses has already been 
    // torn down.  This is the last code to run on cleanup for a stream.
}
```
