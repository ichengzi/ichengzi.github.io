### Binding
Binding时，有的时候由于不能确定Source的对象叫什么名字，但知道它与作为Binding`目标的对象`在UI布局上有相对关系，比如控件自己关联自己的某个数据、关联自己某级容器的数据，就要使用Binding的RelativeSource属性。
``` xml
<Grid x:Name="g1" Background="Red" Margin="10">  
    <DockPanel x:Name="d1" Background="Orange" Margin="10">  
        <Grid x:Name="g2" Background="Yellow" Margin="10">  
            <DockPanel x:Name="d2" Background="LawnGreen" Margin="10">  
                <TextBox x:Name="textBox1" FontSize="24" Margin="10"></TextBox>  
            </DockPanel>  
        </Grid>  
    </DockPanel>  
</Grid>  
```
```csharp
RelativeSource rs = new RelativeSource();  
rs.Mode = RelativeSourceMode.FindAncestor;  
rs.AncestorLevel = 1;  
rs.AncestorType = typeof(Grid);  
  
Binding binding = new Binding();  
binding.RelativeSource = rs;  
binding.Path = new PropertyPath("Name");  
textBox1.SetBinding(TextBox.TextProperty, binding);
// 设置tbx绑定到了g2的名字
```
``` xml
// 等价的xaml描述
< TextBox Text="{Binding RelativeSource={RelativeSource Mode=FindAncestor, AncestorLevel=1, AncestorType={x:Type Grid}}, Path=Name}"><TextBox>
```

### Tempalte
IsHitTestVisible="False"
Focusable = "False"

### RelativeSourceMode
ns: System.Windows.Data

Mode  | description
------- |--------
**Self** |自身的其他属性，属性间的相互影响
**FindAncestor** | 界面布局上的相关性
**TemplatedParent** | Refers to the element to which the template | is applied. This is similar to setting a TemplateBindingExtension and is only applicable if the Binding is within a template.
**PreviousData** | Allows you to bind the previous data item (not that control that contains the data item) in the list of data items being displayed.

// From StackOverFlow
If you want to bind to another property on the object:

    {Binding Path=PathToProperty, RelativeSource={RelativeSource Self}}

If you want to get a property on an ancestor:

    {Binding Path=PathToProperty, RelativeSource={RelativeSource AncestorType={x:Type typeOfAncestor}}}

If you want to get a property on the templated parent (so you can do 2 way bindings in a ControlTemplate)

    {Binding Path=PathToProperty, RelativeSource={RelativeSource TemplatedParent}}

or, shorter (this only works for OneWay bindings):

    {TemplateBinding Path=PathToProperty}


