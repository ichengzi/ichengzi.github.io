### 背景

> 项目拆分，把一个git库拆成了多个。为了便于维护老代码，`git blame`时能看到对应的修改记录，新的git库里只是删除了不用的文件， 并没有 `git init`新建一个git 库

但是修改完 `git push` 到新的git url时，由于公司git服务器最近加了限制commit email必须是公司内部email(之前git server管理的不严，对email地址无限制)，导致push失败。

### 处理方法

1. 根据git异常信息， google 使用 `git filter-branch`处理， 但是这个命令很慢， 需要逐个重写 commit log， 我这个repo 约3000次 commit，得耗时1分钟多
2. 在执行命令时， git 提示 可以使用 `git filter-repo`处理
3. [https://github.com/newren/git-filter-repo](https://github.com/newren/git-filter-repo)， `brew install git-filter-repo` 安装
4. [官网demo修改name-email demo](https://htmlpreview.github.io/?https://github.com/newren/git-filter-repo/blob/docs/html/git-filter-repo.html)
5. 这个命令执行的很快，基本上回车后就完成了

``` bash
> git filter-repo --mailmap my-mailmap

> cat my-mailmap
Name For User <email@addre.ss>
<new@ema.il> <old1@ema.il>
New Name <new@ema.il> <old2@ema.il>
New Name <new@ema.il> Old Name And <old3@ema.il>
```

### 附录
`git log --format='%an %ae' | sort -u` 查看所有的author,email

https://htmlpreview.github.io/?https://raw.githubusercontent.com/newren/git-filter-repo/docs/html/git-log.html

```bash
%an  //author name
%ae  //author email
```