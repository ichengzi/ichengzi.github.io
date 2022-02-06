1. `echo "hello" > a.txt`, 通过 > 可以创建新文件并将内容放到文件中，如果文件存在，则会覆盖
2. `echo "hello" >> a.txt`，通过 >> 可以向已有的文件中**追加内容**，如果没有则会创建文件
3.  不存在aa.txt; 
``` cmd
PS D:\>  ls // out: a.txt
PS D:\>  cat a.txt >log.txt 2>err.txt //log.txt有值， err.txt为空
PS D:\>  cat aa.txt >log.txt 2>err.txt // log.txt 被覆盖为空， err.txt有错误信息
PS D:\>  cat a.txt >log.txt 2>err.txt
PS D:\>  cat aa.txt >>log.txt 2>>err.txt // log.txt值不动， err.txt附加错误信息
```

> **stdin、stdout和stderr流都有对应的编号，分别是0到2。stderr对应的流编号是2，可以用2> errors.log重定向，shell看到这个就知道要将编号为2的流重定向到文件errors.log中。**

![stdout errout stream](/images/stdout-err-stream.png)

参考链接： https://www.cnblogs.com/xixiuling/p/10208583.html

