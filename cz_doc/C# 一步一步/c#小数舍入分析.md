Math.Round这个函数的解释是将值按指定的小数位数舍入，并不就是四舍五入。这种舍入有时称为`就近舍入或四舍六入五成双`

``` cs
C# code
Math.Round(0.4)  //result:0 
Math.Round(0.6)  //result:1 
Math.Round(0.5)  //result:0 
Math.Round(1.5)  //result:2 
Math.Round(2.5)  //result:2 
Math.Round(3.5)  //result:4 
Math.Round(5.5)  //result:6 
Math.Round(6.5)  //result:6 
Math.Round(8.5)  //result:8 
Math.Round(9.5)  //result:10
```

可以看出 并不是四舍五入的。
其实在 VB, VBScript, C#, J#, T-SQL 中 Round 函数都是采用 `Banker's rounding（银行家舍入）`算法，即`四舍六入五取偶`。`事实上这也是 IEEE 规定的舍入标准`。因此所有符合 IEEE 标准的语言都应该是采用这一算法的。

请调用  Math.Round(Decimal, MidpointRounding) 重载！~哦，原来还有重载的方法可用，MidpointRounding在两个数字之间时如何舍入的规范，规范MidpointRounding中它有2个成员，一个是ToEven还有个是AwayFromZero。

``` cs
C# code
//四舍五入  
Math.Round(0.5,MidpointRounding.AwayFromZero)
```
-----
### 1. (int )double
### 2. convert.toInt32(object),object可能为string
### 3. int.parse(string)

### Note:
Convert.ToInt32(null)会返回0而不会产生任何异常，但int.Parse(null)则 会产生异常。
Convert.ToInt32(double value)，使用的上边的`银行家舍入算法`。
(int )double，直接是强制转换(即`截取整数部分`)