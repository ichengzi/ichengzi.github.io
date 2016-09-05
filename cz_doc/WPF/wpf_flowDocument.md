### 流文档

#### 块元素(Block Elements)
1. Paragraph(Paragraph.InLines)
2. List
3. Table
4. Section(用于包装几个块元素)
5. BlockUIContainer(用于在流文档中包含控件元素)

#### 内联元素(Inline Elements)
1. Span(用于包装几个InLine元素)
2. Run(一行数据)
3. Bold,Italic,UnderLine
4. HyperLink
5. LineBreak
6. InlineUIContainer
7. Floater and Figure(在两个元素之间嵌入一块数据)


捕获文件访问异常的代码可以通用
<Button Command="ApplicationCommands.Print" CommandTarget="docViewer">Print</Button>

FileStream
MemoryStream
StreamReader
using 语句获取一个或多个资源，执行一个语句，然后释放该资源。using 语句转换为三部分：获取、使用和释放。

枚举类型是具有命名常量的独特的类型。每个枚举类型都有一个基础类型，该基础类型必须为 byte、sbyte、 short、 ushort、 int、 uint、 long 或 ulong。枚举类型的值集和它的基础类型的值集相同。枚举类型的值并不只限于那些命名常量的值。

//获取当前windows用户的标识
System.Security.Principal.WindowsIdentity
WindowsIdentity identity = WindowsIdentity.GetCurrent();
this.Resources["AuthorName"] = identity.Name;

// office编程
primary interop assemblies -----(PIAs)