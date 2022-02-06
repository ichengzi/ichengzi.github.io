``` cs
namespace System.Net.Http
{
    //
    // Summary:
    //     The base type for System.Net.Http.HttpClient and other message originators.
    public class HttpMessageInvoker : IDisposable
    {
        //
        // Summary:
        //     Releases the unmanaged resources and disposes of the managed resources used by
        //     the System.Net.Http.HttpMessageInvoker.
        public void Dispose();

        //
        // Summary:
        //     Releases the unmanaged resources used by the System.Net.Http.HttpMessageInvoker
        //     and optionally disposes of the managed resources.
        //
        // Parameters:
        //   disposing:
        //     true to release both managed and unmanaged resources; false to releases only
        //     unmanaged resources.
        protected virtual void Dispose(bool disposing);
    }
}
```