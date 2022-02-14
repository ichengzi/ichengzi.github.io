项目用到了 `node-sass`, 但是 `node-sass` 不支持 apple macbook m1 芯片， 所以只能使用 rosetta运行 x86 模式兼容。

**记录一下处理方法：**

## 使用 rosetta 启动终端

1. cd  /application,  `copy terminal.app terminal-intel.app`
2. finder 打开 application 目录， terminal-intel.app-右键-简介，「使用 rosetta打开」
3. `> arch` 可以查看当前终端的运行模式

> arch 也可以直接指定以某个模式启动应用， `arch -x86_64 zsh`(x64 模式启动一个zsh)。 但是容易混乱，直接复制一个terminal，然后修改app属性简单点。

## 安装node

1. 因项目使用了老版本node12且不能升级，brew 无法安装，使用node官网 pkg包安装
2. pkg安装后的global目录是 `/usr/local/lib/node_modules`，普通用户权限不足
3. `chmod a+w /dir_dir_dir`, 给普通用户添加写入权限，避免`npm -g` 安装包时权限不足报错
4. `rm -rf /node_modules`，因为之前在arm模式下错误安装了包， 删除下重新安装
5. 后续使用这个`terminal-intel` 来启动这个老node项目
