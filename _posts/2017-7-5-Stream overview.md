// fork from <http://blog.csdn.net/pengdean/article/details/2225974>

stream本质是对byte进行操作
- binaryReader, binaryWriter
- textReader, textWriter(抽象类)
- strigReader， stringWriter
- streamReader, streamWriter

- bufferStream
- memoryStream
- networkStream

-----------
### Stream

System.IO为我们提供了一个抽象类Stream,**Stream类支持对字节的读写操作**。在Stream类中包括了对**异步操作**的支持。

既然Stream是抽象类，所有其它流的类就都必须从Steam类中继承。Stream类及其子类共同构成了一个数据源和数据存储的视图，从而封装了操作系统和底层存储的各个细节，使程序员把注意力集中到程序的应用逻辑上来。

流包含以下基本操作：

1. 读操作(Reading)。即读出流中的数据，把数据存放在另一种数据结构中，比如数组。
2. 写操作(Writting)。即从另一种数据结构中读出数据，存放至流对象中。
3. 搜索操作(Seeking)。即从流中的当前位置开始搜索，定位到指定的位置。

由于数据视图的不同，一些流可能不同时支持以上的所有操作。比如_网络流就不支持搜索操作_。Stream类提供了**CanRead,CanWrite和CanSeek**三种属性，来表示流是否支持这些操作。

#### BinaryReader和BinaryWriter
BinaryReader和BinaryWriter这两个类提供了从字符串或原始数据到各种流之间的读写操作。

#### FileStream
File类的静态方法主要是用于创建FileStream类。**一个FileStream类的实例实际上代表一个磁盘文件**，它通过Seek()方法进行对文件的随机访问，也同时包含了流的标准输入、标准输出、标准错误等。**FileStream默认对文件的打开方式是同步的，但它同样很好地支持异步操作**。

#### TextReader和TextWriter
TextReader和TextWriter类都是抽象类。和Stream类的**字节形式**的输入和输出不同，它们用于**Unicode字符**的输入和输出。

#### StringReader和StringWriter
StringReader和StringWriter在**字符串中读写字符**。

#### StreamReader和StreamWriter
StreamReader和StreamWriter在**流中读写字符**。

#### BufferedStream
BufferedStream是为**诸如网络流的其它流添加缓冲**的一种流类型。其实，**FileStream流自身内部含有缓冲，而MemorySteam流则不需要缓冲**。

一个BufferStream类的实例可以由多个其它类型的流复合而成，以达到提高性能的目的。**缓冲实际上是内存中的一个字节块**，利用缓冲可以避免操作系统频繁地到磁盘上读取数据，从而减轻了操作系统的负担。

#### MemoryStream
MemoryStream是一个无缓冲流，它所封装的数据直接放在内存中，因此可以用于**快速临时存储、进程间传递信息**等。

#### NetworkSteam
Networksteam表示在互联网络上传递的流。

当使用名字空间System.IO中提供的类时，对存储数据的访问权限必须符合操作系统的安全性要求。

注意：不要使用这些类来编写应用程序对网络文件进行操作。因为Internet默认的安全政策是不允许对文件直接访问。**可以使用IsolatedStroage类来处理网络文件。**

-----------------
### >File和Directory

File类支持对文件的基本操作，包括创建、拷贝、移动、删除和打开一个文件。Directory类则用于执行常见的各种目录操作，如创建、移动、浏览目录及其子目录。

**File类和Directory类都是密封类**。不象抽象类Stream,File类和Directory类可以被实例化，但它们不能被其它类继承。

File类和Directory类的基类都是抽象类FileSystemEntry。