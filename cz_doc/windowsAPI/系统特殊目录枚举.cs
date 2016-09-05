// 摘要: 
//     逻辑桌面，而不是物理文件系统位置。
Desktop = 0,
//     包含用户程序组的目录。
Programs = 2,
//     用作文档的公共储存库的目录。
Personal = 5,
//     “我的文档”文件夹。
MyDocuments = 5,
//     用作用户收藏夹项的公共储存库的目录。
Favorites = 6,
//     对应于用户的“启动”程序组的目录。
Startup = 7,
//     包含用户最近使用过的文档的目录。
Recent = 8,
//     包含“发送”菜单项的目录。
SendTo = 9,
//     包含“开始”菜单项的目录。
StartMenu = 11,
//     “我的音乐”文件夹。
MyMusic = 13,
//     文件系统目录，充当属于某个用户的视频的存储库。
MyVideos = 14,
//     用于物理上存储桌面上的文件对象的目录。
DesktopDirectory = 16,
//     “我的电脑”文件夹。
MyComputer = 17,
//     文件系统目录，包含“网上邻居”虚拟文件夹中可能存在的链接对象。
NetworkShortcuts = 19,
//     包含字体的虚拟文件夹。
Fonts = 20,
//     用作文档模板的公共储存库的目录。
Templates = 21,
//     文件系统目录，包含在所有用户的“开始”菜单上都出现的程序和文件夹。 此特殊文件夹仅对 Windows NT 系统有效。
CommonStartMenu = 22,
//     跨应用程序共享的组件的文件夹。 此特殊文件夹仅对 Windows NT、Windows 2000 和 Windows XP 系统有效。
CommonPrograms = 23,
//     文件系统目录，包含在所有用户的“启动”文件夹中都出现的程序。 此特殊文件夹仅对 Windows NT 系统有效。
CommonStartup = 24,
//     文件系统目录，包含在所有用户桌面上出现的文件和文件夹。 此特殊文件夹仅对 Windows NT 系统有效。
CommonDesktopDirectory = 25,
//     目录，它用作当前漫游用户的应用程序特定数据的公共储存库。
ApplicationData = 26,
//     文件系统目录，包含“打印机”虚拟文件夹中可能存在的链接对象。
PrinterShortcuts = 27,
//     目录，它用作当前非漫游用户使用的应用程序特定数据的公共储存库。
LocalApplicationData = 28,
//     用作 Internet 临时文件的公共储存库的目录。
InternetCache = 32,
//     用作 Internet Cookie 的公共储存库的目录。
Cookies = 33,
//     用作 Internet 历史记录项的公共储存库的目录。
History = 34,
//     目录，它用作所有用户使用的应用程序特定数据的公共储存库。
CommonApplicationData = 35,
//     Windows 目录或 SYSROOT。 它与 %windir% 或 %SYSTEMROOT% 环境变量相对应。
Windows = 36,
//     “System”目录。
System = 37,
//     “Program files”目录。
ProgramFiles = 38,
//     “我的图片”文件夹。
MyPictures = 39,
//     用户的配置文件文件夹。 应用程序不应在此级别上创建文件或文件夹；它们应将其数据放在 System.Environment.SpecialFolder.ApplicationData
//     所引用的位置之下。
UserProfile = 40,
//     Windows“System”文件夹。
SystemX86 = 41,
//     “Program Files”文件夹。
ProgramFilesX86 = 42,
//     用于应用程序间共享的组件的目录。
CommonProgramFiles = 43,
//     “Program Files”文件夹。
CommonProgramFilesX86 = 44,
//     文件系统目录，包含所有用户都可以使用的模板。 此特殊文件夹仅对 Windows NT 系统有效。
CommonTemplates = 45,
//     文件系统目录，包含所有用户共有的文档。 此特殊文件夹仅对装有 Shfolder.dll 的 Windows NT 系统、Windows 95 和
//     Windows 98 系统有效。
CommonDocuments = 46,
//     文件系统目录，包含计算机所有用户的管理工具。
CommonAdminTools = 47,
//     文件系统目录，用于存储各个用户的管理工具。 Microsoft Management Console (MMC) 会将自定义的控制台保存在此目录中，并且此目录将随用户一起漫游。
AdminTools = 48,
//     文件系统目录，充当所有用户共有的音乐文件的存储库。
CommonMusic = 53,
//     文件系统目录，充当所有用户共有的图像文件的存储库。
CommonPictures = 54,
//     文件系统目录，充当所有用户共有的视频文件的存储库。
CommonVideos = 55,
//     文件系统目录，包含资源数据。
Resources = 56,
//     文件系统目录，包含本地化资源数据。
LocalizedResources = 57,
//     为了实现向后兼容，Windows Vista 中可以识别此值，但该特殊文件夹本身已不再使用。
CommonOemLinks = 58,
//     文件系统目录，充当等待写入 CD 的文件的临时区域。
CDBurning = 59,