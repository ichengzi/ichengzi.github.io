### wpf binding validation

// fork from http://blog.csdn.net/iamsupercola/article/details/7051289

Binding用ValidationRules属性来校验数据的有效性，ValidationRules属性类型是Collection<ValidationRule>，他可以设置多个数据校验条件，ValidationRule是抽象类，使用的时候需要创建它的派生类并实现它的Validate方法，Validate方法的返回值是ValidationResult类型对象，如果校验通过，就把ValidationResult对象的IsValid属性设为true，反之，设为false，并为其ErrorContent属性设置一个合法的消息内容。

``` xml
<TextBox x:Name="textBox1" Margin="5"></TextBox>  
<Slider x:Name="slider1" Minimum="0" Maximum="100" Margin="5" />  
```
``` cs
class RangeValidationRule : ValidationRule  
{  
    public override ValidationResult Validate(object value, CultureInfo cultureInfo)  
    {  
        double d = 0;  
        if (double.TryParse(value.ToString(), out d))  
        {  
            if ((0 <= d) && (d <= 100))  
            {  
                return new ValidationResult(true, null);  
            }  
        }
        return new ValidationResult(false, "输入值非法");  
    }  
}

Binding binding = new Binding();  
binding.Source = slider1;  
binding.Path = new PropertyPath("Value");  
binding.UpdateSourceTrigger = UpdateSourceTrigger.PropertyChanged;  
//binding.NotifyOnValidationError = true;

RangeValidationRule rvr = new RangeValidationRule();  
binding.ValidationRules.Add(rvr);  
//rvr.ValidatesOnTargetUpdated = true; 
textBox1.SetBinding(TextBox.TextProperty, binding);
```

**Binding进行校验时的默认行为是认为来自Source的数据始终是正确的**，只有来自Target的数据才有可能有问题，为了不让有问题的数据污染Source所以需要校验，所以，Binding只有在Target被外部方法更新时校验数据，而来自Binding的Source数据更新Target时是不会进行校验的。

如果想在Target改变Source数据时也进行校验，就需要将验证条件的ValidatesOnTargetUpdated属性设置为true。

当source 更新 target，校验失败时，ValidationResult对象携带了一条错误消息，想要显示这条消息，首先在创建Binding时要把Binding对象的NotifyOnValidationError属性设置为true