C# decision structures provide logic in your application code that allows the execution of different sections of code depending on the state of data in the application. 
Visual C# uses conditional statements to achieve this functionality.
// 决策结构
// 条件语句

------

If you require any more than five else if clauses, you might want to consider the switch statement.
// 如果多于5个分支，使用 switch

------

Traditionally, applications used the concept of a global error object. When a piece of code caused an error, it would set the data in this object to indicate the cause of the error and then return to the caller. It was the responsibility of the calling code to examine the error object and determine how to handle it. However, this approach is not robust, because it is too easy for a programmer to forget to handle errors appropriately.
// 传统的异常、错误处理方法
``` cs
try
{
}
catch (NullReferenceException ex)
{
    // Catch all NullReferenceException exceptions.
}
catch (Exception ex)
{
    // Attempt to handle the exception
    ...
    // If this catch handler cannot resolve the exception, 
    // throw it to the calling code
    throw;
}
// 注意最下边的throw没有带 ex
```
-----


C/C++ and other similar languages consider a String to be a character array.

Arrays can be single-dimensional, multidimensional, or jagged.
int[] arr1 = new int[10];
int[ , ] arrayName = new int[10,10];
int[][] arr3 = new int[10][];
// 一维，多维，交叉数组（锯齿数组，每个行可以包含不同长度的数组）

-----

In Visual C#, a struct is a programming construct that you can use to define custom types.
// struct, construct(概念)

----

**Properties are required for data binding in WPF**. For example, you can bind controls to property values, but you cannot bind controls to field values.
When you want to create a property that simply gets and sets the value of a private field without performing any additional logic, you can use an abbreviated syntax. 
// 属性，wpf

----

``` cs
public struct Menu //Creating an Indexer 
{ 
    private string[] beverages; 
    // This is the indexer. 
    public string this[int index] 
    { 
        get { return this.beverages[index]; } 
        set { this.beverages[index] = value; } 
    } 
    // Enable client code to determine the size of the collection. 
    public int Length 
    { 
        get { return beverages.Length; } 
    } 
}
string firstDrink = myMenu.beverages[0];
A more intuitive approach would be if you could access the first item from the menu by using the syntax myMenu[0]. 
// 更简洁直接的方式应该是在对象上设置索引器
// 索引器
```