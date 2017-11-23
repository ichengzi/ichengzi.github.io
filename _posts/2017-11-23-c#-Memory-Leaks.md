Three Common Causes of Memory Leaks in Managed Applications
===================
<https://blogs.msdn.microsoft.com/davidklinems/2005/11/16/three-common-causes-of-memory-leaks-in-managed-applications/>

One of the joys of working with managed code is not having to worry (as much) about memory management and letting the Garbage Collector do it's job.  There are situations, however, **when applications need to take a more active role in memory management**.  At MEDC 2005, I spoke, during my debugging session, about three common causes of memory leaks in managed applications:


* Holding references to managed objects
* Failing to release unmanaged resources
* Failing to dispose Drawing objects

## Holding references to managed objects
I do not actually consider the first of the three causes to be a leak in the truest sense of the term.  I say this because the memory in question is accounted for by at least one valid reference within the current scope.  While not a "true" leak, this can appear as one when looking at memory usage data.

**When an application holds references longer than necessary, performance counters can show a steady increase in memory consumption and may, eventually, lead to an OutOfMemoryException**.  This situation can arise when variables never leave active scope.  An example of this is an application that **keeps track of large amounts of data in a class global collection**.  If at least one reference to a managed object remains in the current scope, the Garbage Collector cannot tell if your application is finished with the object.  Since, as far as the GC can tell, the object is still in use, it cannot be marked for collection and therefore the memory is not freed.  **Since the memory is not freed the application's memory consumption continues to grow which looks very much like a memory leak.**

Whenever possible, **I recommend minimizing the scope of an object (local rather than class global variables)**.  `You can also let the Garbage Collector know you are finished with an object by setting your variable's value to null (Nothing in Visual Basic.NET) once you are finished using the object`.  This way, the GC can collect your unused objects at its earliest convenience and your application's memory consumption can be kept to a minimum.

## Failing to release unmanaged resources
I mentioned, at the start of this post, that writing managed code largely frees you from needing to be concerned about memory management.  **This is true when you are using only managed objects.**  **When you interoperate with native APIs (ex: via P/Invoke)**, your application needs to follow the native code memory management semantics -- `loaded objects must be unloaded, allocated memory must be freed`, etc.

A good example is the original version of the code in my post on *getting the display color depth*.  While the code worked, there was a small memory leak.  One of my readers kindly pointed out that I was forgetting to call ReleaseDC (I had previously called GetDC).  This is a fairly common mistake, and I remember telling myself to not forget the call to ReleaseDC...  While forgetting to call ReleaseDC is a relatively small leak, compared to forgetting to unload a large resource, **these small leaks can build up quite rapidly**.  Whenever an application consumes unmanaged resources, I highly recommend a code review with another developer.  I have found that walking someone through a block of code forces me to view it from a different angle and allows me to find these mistakes sooner.

The best source of information regarding proper handing of unmanaged resources is the API documentation.  It has been my experience that the MSDN documentation does a good job at providing cleanup information for resources requiring cleanup, typically in the remarks section of the API reference.

## Failing to dispose Drawing objects
A third common cause of memory leaks in managed applications is actually a manifestation of the previous cause.  When consuming System.Drawing and Microsoft.WindowsMobile.DirectX.Direct3D objects, `such as bitmaps, fonts, meshes and textures,` it is important to call the object's Dispose method when you no longer need the object.  This is important because, `while these are managed objects, they contain references to unmanaged resources`.  These references are cleaned up (and the memory used is freed) when the object is disposed.

## Methods of disposal
There are three methods for disposing of objects which require disposal.

*  Explicit call to the Dispose method
`Example:playerImage->Dispose();`
* Implicit via the C# using statement Example: `using(SolidBrush brush = new SolidBrush(Color.Yellow)){ /* use the brush */ }`
* Finalization (not recommended)

Of these three disposal methods, two of them warrant further discussion.

## Implicit disposal (C# using statement)
The documentation for the using statement states: "You create an instance in a using statement to ensure that Dispose is called on the object when the using statement is exited."  This is a very handy way to ensure that objects requiring disposal get cleaned up properly.  One drawback to disposal via the using statement is that all use of the object needs to be contained within the using statement's code block (within the curly braces { }).  This is not a very serious drawback, however.  In my experience, I rarely have need to use objects containing unmanaged resources (ex: System.Drawing.Bitmap) for more than a few lines of code -- in an OnPaint handler, for example.

If your application requires longer lived objects, explicitly calling the Dispose method when finished is the recommended approach.

## Finalization (not recommended)
I do not recommend relying upon finalization to dispose of object requiring disposal for two reasons.  The first reason is that the timing of finalization is not guaranteed.  Finalization is performed at the discretion of the .NET Compact Framework runtime and can occur at any time in the future.  While it is possible that finalization will occur soon after an object requiring disposal has been collected by the GC, it could also occur a significant time later.  Secondly, an object's finalizer may not actually invoke its Dispose method.  I would consider an object not calling Dispose as part of finalizationto contain a bug.  While the bug would be in the object, it is the application which will likely get the report of the memory leak.

For a good discussion on implementing Dispose for your objects using unmanaged resources, please read _Implementing Finalize and Dispose to Clean Up Unmanaged Resources (on MSDN)._

This post has covered three common causes of memory leaks in managed applications.  If you believe your application is encountering a leak, and you have been able to rule out these causes, please let us know about the issue via the Microsoft Product Feedback Center.

------------------

In my experience, I rarely have need to use **objects containing unmanaged resources (ex: System.Drawing.Bitmap)** for more than a few lines of code -- in an OnPaint handler, for example.