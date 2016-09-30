#### 二进制表示小数，使用无限逼近的策略

``` js
//javascript
var a = 1.0000002;
var b = 0.0000002;
console.log(a+b);
console.log(a-b);
//out:
1.0000003999999998
0.9999999999999999
```

``` js
//javascript
var a = 1.00000000000000002;
var b = 0.00000000000000001;
console.log(a+b);
console.log	(a-b);
//out:
1
1
```

``` csharp
//c#
var a = 1.00000000000000002m;
var b = 0.00000000000000001m;
Console.WriteLine(a+b);
Console.WriteLine(a-b);
//out:
1.00000000000000003
1.00000000000000001
```

``` csharp
//c#
var a = 1.00000000000000002;
var b = 0.00000000000000001;
Console.WriteLine(a+b);
Console.WriteLine(a-b);
//out: 默认为double类型
1
1
```