> 之前所有的WPF开发都是基于通用桌面设备的，开始触屏开发后发现有不少坑。如下： wpf中用srollViewer 显示数据会用到滚动条，当滚动到最top还向下拉（最bottom还向上拉），windows给这些触屏操作添加了默认的窗口抖动效果。如何取消这个默认效果？

> When using Touch in WPF it is possible to scroll lists. It’s just that the Window is moving to give Feedback when you are reaching the end of the list. This is not always what you want. 

> The default behaviour of the WPF touch Scrollbar moves the entire Window when reaching the end of the scrolling area.

[https://antonidol.wordpress.com/2012/01/24/how-to-stop-a-wpf-window-from-moving-by-removing-the-manipulationboundaryfeedback/](https://antonidol.wordpress.com/2012/01/24/how-to-stop-a-wpf-window-from-moving-by-removing-the-manipulationboundaryfeedback/)

``` xml
<Grid :Name="LayoutRoot"  
    ManipulationBoundaryFeedback="ManipulationBoundaryFeedbackHandler">

<DataGrid 
    ScrollViewer.CanContentScroll ="False" 
    ScrollViewer.PanningMode="VerticalOnly" 
    ScrollViewer.PanningRatio="2" 
    ScrollViewer.PanningDeceleration="1000" 
    ScrollViewer.VerticalScrollBarVisibility="Hidden"> 
        … 
</DataGrid>
</Grid>
```
``` csharp
private void ManipulationBoundaryFeedbackHandler  (object sender, 
    ManipulationBoundaryFeedbackEventArgs e) 
{ 
    e.Handled = true; // Bubbling event, 冒泡事件，截断后不会再向上传播
}
```
Handling the event on the window didn’t remove the behaviour in the application. Handle the event on the child content of window can prevent the window to move.

------------

> 上边方法对于原生的wpf控件是可以的，但是 webBrowser 不行。对于webbrowser，何解？

You could turn of this behavior for the whole system. 

Open registry ( `run regedit command` )and set `HKEY_CURRENT_USER\Software\Microsoft\Wisp\Touch` `Bouncing` to `0`;
if `HKEY_CURRENT_USER\Software\Microsoft\Wisp\Touch` not exist `Bouncing` item, add it( **DWORD type Not QWORD or String**) and set it value to `0`;

------

a manipulation has encountered a boundary.

ManipulationDelta

ManipulationDevice //触屏输入设备


