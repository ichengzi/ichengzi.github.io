---
layout: post
title:  "async await"
date:   2016-10-21 21:35:28 +0800
categories: csharp
author: chengzi
---


[MSDN - async await keyword](https://msdn.microsoft.com/en-us/library/mt674892.aspx)

这篇文章总结起来： **when a task(fuction) is suspend, the progress will back to the caller.**

``` csharp
public partial class MainWindow : Window
{
    // . . .
    private async void startButton_Click(object sender, RoutedEventArgs e)
    {
        // ONE
        Task<int> getLengthTask = AccessTheWebAsync();

        // FOUR
        int contentLength = await getLengthTask;

        // SIX
        resultsTextBox.Text +=
            String.Format("\r\nLength of the downloaded string: {0}.\r\n", contentLength);
    }


    async Task<int> AccessTheWebAsync()
    {
        // TWO
        HttpClient client = new HttpClient();
        Task<string> getStringTask =
            client.GetStringAsync("http://msdn.microsoft.com");

        // THREE                 
        string urlContents = await getStringTask;

        // FIVE
        return urlContents.Length;
    }
}
```