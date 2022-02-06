### Binding Source

Binding的源是数据的来源，所以，只要一个对象包含数据**并能通过属性**把数据暴露出来，它就能当作Binding的源来使用，常用的办法有：

1. 把普通CLR类型单个对象指定为Source

如果类型实现了INotifyPropertyChanged接口，则可通过在属性的set语句中激发PropertyChanged事件来通知Binding数据已被更新

2. 把普通CLR集合类型对象指定为Source

一般是把控件的ItemsSource属性使用Binding关联到一个集合对象上，即为ItemsSource属性直接赋一个集合对象

3. 把ADO.NET数据对象指定为Source
4. 把依赖对象指定为Source
5. **把容器的DataContext指定为Source**
6. 通过ElementName指定Source
7. 通过Binding的RelativeSource属性相对的指定Source

当控件需要关注自己的、自己容器的或者自己内部元素的某个值就需要使用这种办法

8. 使用XmlDataProvider把XML数据指定为Source
9. 把ObjectDataProvider对象指定为Source

当数据源的数据不是通过属性而是通过方法暴露给外界的时候，可以使用这两种对象来包装数据源再把它们指定为Source

10. 使用LINQ检索的到的数据对象作为Binding的Source

---------------------------
### XML Data Provider
.NET Framework提供了两套处理XML数据的类库

1. 符合DOM标准的类库：包括XmlDocument、XmlElement、XmlNode、XmlAttribute等类，这套类库的特定是中规中矩、功能强大，但也背负了太多XML的传统和复杂

2. 已LINQ为基础的类库：包括XDocument、XElement、XNode、XAttribute等类，这套类库的特点是可以使用LINQ进行查询和操作，方便快捷

// Student.xml
``` xml
<?xml version="1.0" encoding="utf-8" ?>  
<StudentList>  
  <Student id="1">  
    <Name>Tim</Name>  
  </Student>  
  <Student id="2">  
    <Name>Tom</Name>  
  </Student>  
  <Student id="3">  
    <Name>Vina</Name>  
  </Student>  
  <Student id="4">  
    <Name>Emily</Name>  
  </Student>  
</StudentList>  
```
``` xml
<StackPanel Background="LightBlue">  
        <ListView x:Name="listViewStudents" Height="130" Margin="5">  
            <ListView.View>  
                <GridView>  
                    <GridViewColumn Header="Id" Width="80" DisplayMemberBinding="{Binding XPath=@id}" />  
                    <GridViewColumn Header="Name" Width="120" DisplayMemberBinding="{Binding XPath=Name}" />  
                </GridView>  
            </ListView.View>  
        </ListView>  
        <Button Content="Load" Click="Button_Click" Height="25" Margin="5, 0" />  
```

> `{Binding XPath=@id}`,注意，如果binding的是一个 attribute， 名字前要加一个@符号。如果binding的直接就是一个 xmlElement, 直接使用名称。

``` cs
XmlDocument doc = new XmlDocument();  
doc.Load("Students.xml");  
  
XmlDataProvider xdp = new XmlDataProvider();  
xdp.Document = doc;  
xdp.XPath = @"/StudentList/Student";  //通过一个XPath指定了所有目标元素的路径
// or, xdp.Source = new Uri(@"d:\Students.xml") 
  
listViewStudents.DataContext = xdp; // Binding
listViewStudents.SetBinding(ListView.ItemsSourceProperty, new Binding());  
```

#### //树形结构的数据展示
``` xml
<Window.Resources>  
        <XmlDataProvider x:Key="xdp" XPath="FileSystem/Folder">  
            <x:XData>  
                <FileSystem xmlns="">  
                    <Folder Name="Books">  
                        <Folder Name="Programming">  
                            <Folder Name="Windows">  
                                <Folder Name="WPF" />  
                                <Folder Name="MFC" />  
                                <Folder Name="Delphi" />  
                            </Folder>  
                        </Folder>  
                        <Folder Name="Tools">  
                            <Folder Name="Development" />  
                            <Folder Name="Designment" />  
                            <Folder Name="Players" />  
                        </Folder>  
                    </Folder>  
                </FileSystem>  
            </x:XData>  
        </XmlDataProvider>  
    </Window.Resources>  
    <TreeView ItemsSource="{Binding Source={StaticResource ResourceKey=xdp}}">  
            <TreeView.ItemTemplate>  
                <HierarchicalDataTemplate ItemsSource="{Binding XPath=Folder}">  
                    <TextBlock Text="{Binding XPath=@Name}" />  
                </HierarchicalDataTemplate>  
            </TreeView.ItemTemplate>  
        </TreeView>  
```

#### //Object Data Provider
``` cs
public class Calculator
{
    public string Add(string arg1, string arg2)  
    {  
        double x = 0;  
        double y = 0;  
        double z = 0;  
        if (double.TryParse(arg1, out x) && double.TryParse(arg2, out y))  
        {  
            z = x + y;  
            return z.ToString();  
        }  
        return "Error";  
    }  
}

ObjectDataProvider odp = new ObjectDataProvider();  
odp.ObjectInstance = new Calculator();  
odp.MethodName = "Add";  
odp.MethodParameters.Add("0");  
odp.MethodParameters.Add("0");  
  
Binding bindingToArg1 = new Binding();  
bindingToArg1.Source = odp;  
bindingToArg1.Path = new PropertyPath("MethodParameters[0]");  
bindingToArg1.BindsDirectlyToSource = true;  
bindingToArg1.UpdateSourceTrigger = UpdateSourceTrigger.PropertyChanged;  
  
Binding bindingToArg2 = new Binding();  
bindingToArg2.Source = odp;  
bindingToArg2.Path = new PropertyPath("MethodParameters[1]");  
bindingToArg2.BindsDirectlyToSource = true;  
bindingToArg2.UpdateSourceTrigger = UpdateSourceTrigger.PropertyChanged;  
  
Binding bindingToResult = new Binding();  
bindingToResult.Source = odp;  
bindingToResult.Path = new PropertyPath(".");  
//If using this PropertyPath in source mode for a binding, parameter is a string representing a property name, or can be a string that describes a "step-through" path to the property in the CLR object model of the object that is being used as the source for a binding. For a binding property path, the character that identifies a "step" is a dot (.). 
  
textBoxArg1.SetBinding(TextBox.TextProperty, bindingToArg1);  
textBoxArg2.SetBinding(TextBox.TextProperty, bindingToArg2);  
textBoxResult.SetBinding(TextBox.TextProperty, bindingToResult);  
```
``` xml
<TextBox x:Name="textBoxArg1" Margin="5" />  
<TextBox x:Name="textBoxArg2" Margin="5" />  
<TextBox x:Name="textBoxResult" Margin="5" />  
```

ObjectDataProvider对象并与Calculator类的Add方法进行关联，把第一个输入框中的内容同函数的参数1进行绑定，第二个输入框中的内容同函数的参数2进行绑定，函数的返回值与第三个输入框绑定。

BindsDirectlyToSource = true这句代码的意思是，Binding对象只负责把从UI元素收集到的数据写入其直接Source（即ObjectDataProvider对象）而不是被ObjectDataProvider对象包装着的Calculator对象。

------------------

#### Binding.Path 语法

// copy from msdn

> https://msdn.microsoft.com/en-us/library/system.windows.data.binding.path(v=vs.110).aspx
> 


Each binding typically has these four components: a binding target object, a target property, a binding source, and a path to the value in the binding source to use. For more information about these data binding concepts, see Data Binding Overview.

Use the Path property to specify the source value you want to bind to:

- In the simplest case, the Path property value is the name of the property of the source object to use for the binding, such as **Path=PropertyName**.
- Subproperties of a property can be specified by a syntax similar to that used in C#. For instance, the clause **Path=ShoppingCart.Order** sets the binding to the subproperty Order of the object or property ShoppingCart.
- To bind to an attached property, place parentheses around the attached property. For example, to bind to the attached property DockPanel.Dock, the syntax is **Path=(DockPanel.Dock)**.
- Indexers of a property can be specified within square brackets following the property name where the indexer is applied. For instance, the clause **Path=ShoppingCart[0]** sets the binding to the index that corresponds to how your property's internal indexing handles the literal string "0". Multiple indexers are also supported.
- Indexers and subproperties can be mixed in a Path clause; for example, **Path=ShoppingCart.ShippingInfo[MailingAddress,Street].**
- Inside indexers you can have multiple indexer parameters separated by commas (,). The type of each parameter can be specified with parentheses. For example, you can have **Path="[(sys:Int32)42,(sys:Int32)24]"**, where sys is mapped to the System namespace.
- When the source is a collection view, the current item can be specified with a slash (/). For example, the clause **Path=/** sets the binding to the current item in the view. **When the source is a collection, this syntax specifies the current item of the default collection view.**
- Property names and slashes can be combined to traverse properties that are collections. For example, **Path=/Offices/ManagerName** specifies the current item of the source collection, which contains an Offices property that is also a collection. Its current item is an object that contains a ManagerName property.
- Optionally, a period (.) path can be used to bind to the current source. For example, **Text="{Binding}" is equivalent to Text="{Binding Path=.}".**