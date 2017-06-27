### Binding 
DataContext属性被定义在FrameworkElement类里，这个类是WPF控件的基类，这意味着所有WPF控件都具备这个属性，**当一个Binding只知道自己的Path而不知道自己的Source**时，它会沿着UI元素树一路向输的根部找过去，**每路过一个节点，就看看这个节点的DataContext有没有指定的Path**，如果有，就把这个对象作为自己的Source。

```csharp
class Student  
{  
    public int Id { get; set; }  
    public string Name { get; set; }  
    public int Age { get; set; }  
}  
```
```xml
<StackPanel>  
    <StackPanel.DataContext>  
        <local:Student Id="10001" Name="daijun" Age="20" />  
    </StackPanel.DataContext>  
    <TextBlock Text="{Binding Path=Id}"></TextBlock>  
    <TextBlock Text="{Binding Path=Name}"></TextBlock>  
    <TextBlock Text="{Binding Path=Age}"></TextBlock>  
</StackPanel>  
```

实际上DataContext对象是一个依赖属性，**依赖属性**有个重要特点就是**当没有为控件的某个依赖属性显性赋值时，控件会把自己`容器的属性值`当作自己的属性值（也就是window的 FontFamily可以作用于本窗口的原理）**，所以实际上，属性值是沿着UI元素树向下传递了。