``` cs
namespace System.Web.Mvc
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, Inherited = true, AllowMultiple = false)]
    public abstract class ActionFilterAttribute : FilterAttribute, IActionFilter, IResultFilter
    {

    }
}
```

`System.Web.Mvc.ActionFilterAttribute` 