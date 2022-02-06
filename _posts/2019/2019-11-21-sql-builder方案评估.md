公司dal方案： https://github.com/ctripcorp/dal


项目.net, 基于已有dal方案,不想太麻烦的拼接SQL， 评估了下找到的SQl builder方案：

## 1. DbExtensions

https://maxtoroq.github.io/DbExtensions/docs/SqlBuilder.html

``` cs
var query = new SqlBuilder()
   .SELECT("*")
   .FROM("Products")
   .WHERE("Name LIKE {0}", "A%");

var str = query.ToString();
// SELECT *
// FROM products
// WHERE name LIKE {0}
var arr = query.ParameterValues;
// 参数值数组.
var db = new Database();
Console.WriteLine(db.CreateCommand(query).CommandText);
// 参数化查询
// SELECT *
// FROM Products
// WHERE Name LIKE @p0
// The parameter placeholder is now replaced with a parameter name, and the parameter value is included in the command.
```

## 2. sqlkata

https://sqlkata.com/docs/#compile-only-example

```cs
using SqlKata;
using SqlKata.Compilers;

// Create an instance of SQLServer
var compiler = new SqlServerCompiler();

var query = new Query("Users").Where("Id", 1).Where("Status", "Active");

SqlResult result = compiler.Compile(query);

string sql = result.Sql;
// SELECT * FROM [Users] WHERE [Id] = @p0 AND [Status] = @p1
List<object> bindings = result.Bindings; // [ 1, "Active" ]
```
> **Warning: Don't ever use SqlResult.ToString() to execute your queries.**


> **两种方式效果基本类似，但是参数化查询还是要再想办法处理。**

## 3. Dapper


