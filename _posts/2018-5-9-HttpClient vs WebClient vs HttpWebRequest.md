[参考文章 http://www.diogonunes.com/blog/webclient-vs-httpclient-vs-httpwebrequest](http://www.diogonunes.com/blog/webclient-vs-httpclient-vs-httpwebrequest/)


- HttpWebRequest for control（控制选项多，偏底层）
- WebClient for simplicity and brevity（api简洁，支持进度报告，支持FTP协议）
- RestSharp for both on non-.NET 4.5 environments
- HttpClient for both + async features on .NET 4.5 environments（更现代，async模型更好）
