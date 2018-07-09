20.写出一条Sql语句：取出表A中第31到第40记录（SQLServer,以自动增长的ID作为主键,注意：ID可能不是连续的。

答

　　解1:  select top 10 * from A where id not in (select top 30 id from A)

　　解2:  select top 10 * from A where id > (select max(id) from (select top 30 id from A )as A)


24.try {}里有一个return语句，那么紧跟在这个try后的finally {}里的code会不会被执行，什么时候被执行，在return前还是后?

答

会执行，在return前执行。


project -> properties -> debug -> enable native code debugging

start debug -> debug -> windows -> modules

You'll then also see **mscorjit.dll**, **mscorwks.dll** and **msvcr80.dll**, three other chunks of native code that are required to run managed code. 
- Respectively the just-in-time compiler, 
- the CLR and 
- the C-runtime support library. 
They have different DLL names in .NET 4.

实际上，调试 .net4 console app（下面只是一小部分，实际dll文件比这个多不少）
- mscorlib.dll
- clrjit.dll
- clr.dll
- mscoree.dll
- mscoreei.dll
- msvr120_clr0400.dll