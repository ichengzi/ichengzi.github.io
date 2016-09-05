###window
UseLayoutRounding ，获取或设置一个值，该值指示在布局过程中是否应该对此元素的大小和位置应用布局舍入。
Binding="{Binding nTotalPrice,StringFormat={}{0:C1},ConverterCulture=zh-cn}"

-----
hashSet只能包含不重复的值
string[] strs = new string[5] { "a", "a", "b", "b", "c" };
HashSet<string> hs = new HashSet<string>(strs);
//只有3个值，a,b,c