# Converting parameter names for 1.10

DataTables 1.10 [introduces the use of camelCase notation](https://datatables.net/upgrade/1.10-naming) rather than the old Hungarian notation style that was used in v1.9 and earlier. The [new API](https://datatables.net/manual/api) also follows this new naming scheme.

> DataTables 1.10开始， 从匈牙利命名法转换成了驼峰命名法。新的API遵循新的命名规则。
>
> 官方文章链接： <https://datatables.net/upgrade/1.10-convert>
>
> Hungarian, 匈牙利
>
> camelCase, 驼峰



The change is **fully backwards compatible** and you can continue to use the old versions of the parameter names and API methods as you were before. However, if you wish to update your use of the parameters and API methods to the new way, use the following tables to map between the two parameter name forms. Most of them are straightforward conversions from Hungarian to camelCase, but a few have also been renamed in the new options and API for naming consistency.



### columns.width

This parameter can be used to define the width of a column, and may take any CSS value (3em, 20px etc).

Please note that pixel perfect column width is **virtually impossible to achieve** in tables with dynamic content, so do not be surprised if the width of the column if off by a few pixels from what you assign using this property.

> 请注意，在具有动态内容的表中，像素完美的列宽实际上是不可能实现的，因此，如果列的宽度与使用此属性分配的值相差几个像素，请不要感到惊讶。

Column width in tables depends upon many properties such as **cell borders**, **table borders**, the **border-collapse property**, the **content of the table** and **many other properties**. 

Both DataTables and the browsers attempt to lay the table out in **an optimal manner** taking this options all into account.

> DataTables和浏览器都试图以最优的方式布局表格，同时考虑到所有这些选项。





### API

Please note that the is a reference for converting usage of the old API to the new. The new API is **far more comprehensive** and have a lot of additional options that are not shown here. Please see the [API reference](https://datatables.net/reference/api) for full information on how it can be used.

> 请注意，这是一个将旧API的用法转换为新API的参考。新的API要**全面得多**，并且有许多额外的选项没有显示在这里。