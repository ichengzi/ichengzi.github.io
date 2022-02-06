

> 窗口全屏，隐藏任务栏

### WPF 

``` csharp
void MainWindow_Loaded(object sender, RoutedEventArgs e)
{
    // 设置全屏  
    this.WindowState = System.Windows.WindowState.Normal;
    this.WindowStyle = System.Windows.WindowStyle.None;
    this.ResizeMode = System.Windows.ResizeMode.NoResize;
    this.Topmost = true;

    this.Left = 0.0;
    this.Top = 0.0;
    this.Width = System.Windows.SystemParameters.PrimaryScreenWidth;
    this.Height = System.Windows.SystemParameters.PrimaryScreenHeight; 
}
```

### WinForm

``` csharp
void Form1_Load(object sender, EventArgs e)
{
    this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.None;
    this.WindowState = FormWindowState.Maximized;
}
```