wpf自定义快捷键
-----
这是一种，输液大厅中使用的是另外一种。
也即"快捷键"可以在后台和前台定义

<Window.Resources>
    <RoutedUICommand x:Key="IncreaseFontSize" Text="Increase Font Size" />
    <RoutedUICommand x:Key="DecreaseFontSize" Text="Decrease Font Size" />
</Window.Resources>

<Window.InputBindings>
    <KeyBinding Modifiers="Ctrl+Alt" Key="I" Command="{StaticResource IncreaseFontSize}"/>
    <KeyBinding Gesture="Ctrl+Alt+D" Command="{StaticResource DecreaseFontSize}"/>
</Window.InputBindings>

<Window.CommandBindings>
    <CommandBinding Command="{StaticResource IncreaseFontSize}"
                    CanExecute="CommandBinding_Increase_CanExecute"
                    Executed="CommandBinding_Increase_Executed"/>
    <CommandBinding Command="{StaticResource DecreaseFontSize}"
                    CanExecute="CommandBinding_Decrease_CanExecute"
                    Executed="CommandBinding_Decrease_Executed"/>
</Window.CommandBindings>