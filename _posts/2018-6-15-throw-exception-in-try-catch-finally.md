## throw-exception-in-try-catch-finally


问题： https://stackoverflow.com/questions/1555567/when-is-finally-run-if-you-throw-an-exception-from-the-catch-block

> SF上的一个回答

After reading all of the answers here it looks like the final answer is **it depends**:

*  If you re-throw an exception within the catch block, and that exception is caught inside of another catch block, everything executes according to the documentation.  

*  However, if the **re-trown exception is unhandled, the finally never executes**.  

I tested this code sample in VS2010 w/ C# 4.0

``` c#
static void Main()
{
    Console.WriteLine("Example 1: re-throw inside of another try block:");

    try
    {
        Console.WriteLine("--outer try");
        try
        {
            Console.WriteLine("----inner try");
            throw new Exception();
        }
        catch
        {
            Console.WriteLine("----inner catch");
            throw;
        }
        finally
        {
            Console.WriteLine("----inner finally");
        }
    }
    catch
    {
        Console.WriteLine("--outer catch");
        // swallow
    }
    finally
    {
        Console.WriteLine("--outer finally");
    }
    Console.WriteLine("Huzzah!");
    
    Console.WriteLine();
    Console.WriteLine("Example 2: re-throw outside of another try block:");
    try
    {
        Console.WriteLine("--try");
        throw new Exception();
    }
    catch
    {
        Console.WriteLine("--catch");
        throw;
    }
    finally
    {
        Console.WriteLine("--finally");
    }

    Console.ReadLine();
}
```

Here is the output:

> Example 1: re-throw inside of another try block:  
> --outer try  
> ----inner try  
> ----inner catch  
> ----inner finally  
> --outer catch  
> --outer finally  
> Huzzah!  
>  
> Example 2: re-throw outside of another try block:  
> --try  
> --catch
>  
> Unhandled Exception: System.Exception: Exception of type 'System.Exception' was thrown.  
> at ConsoleApplication1.Program.Main() in C:\local source\ConsoleApplication1\Program.cs:line 53


------------

## 更近一步

https://stackoverflow.com/questions/46267044/exception-in-catch-block-means-the-finally-block-never-executes/46267841#46267841

> Windows Exception Dispatching(windows 异常处理调度机制)

https://msdn.microsoft.com/en-us/library/windows/desktop/ms679327%28v=vs.85%29.aspx?f=255&MSPPError=-2147217396