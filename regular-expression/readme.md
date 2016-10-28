## 使用正则表达式处理ICD10编码

#### 1. 处理标题 
```
find:   河南省医疗卫生信息标准 V2.0（标准编码集）\r\n
replace: 空(什么也不填)
```

#### 2. 处理页码
```
find: - [0-9]* -\r\n
replace: 空
```

#### 3. 处理编码、名称 KeyValue对
总结下来总共有 三种情况：
`((\d\d)( ))|((\d\*)( ))|((\d\+)( ))`  可以用来查找所有匹配的情况

```
1. A00.000 古典生物型霍乱
        find:   (\d\d)( )
        replace:    $1\t

2. A01.001+K77.0* 伤寒性肝炎
    A01.002+G01* 伤寒性脑膜炎
        find:   (\d\*)( )
        repalce:    $1\t

3. A32.100+ 利斯特菌性脑膜炎和脑膜脑炎
        find:   (\d\+)( )
        replace:    $1\t
```

#### 4. 总结
- \r\n --- 换行符
- $1 --- 第一个小括号
- \d --- 表示数字
- [notepad++官方文档](http://docs.notepad-plus-plus.org/index.php/Regular_Expressions#Substitutions)
- [博客文章](http://www.cnblogs.com/kekec/p/5255475.html)
```
\d
A digit in the 0-9 range, same as [[:digit:]].
\D
Not a digit. Same as [^[:digit]].
\l
A lowercase letter. Same as [a-z] or [[:lower:]].
NOTE: this will fall back on "a word character" if the "Match case" search option is off.
\L
Not a lower case letter. See note above.
\u
An uppercase letter. Same as [[:uper:]]. See note about lower case letters.
\U
Not an uppercase letter. Same note applies.
```
