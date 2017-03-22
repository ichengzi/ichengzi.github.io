---
layout: post
title:  "start to use hexo"
date:   2014-2-23 6:55:48+0800
categories: hexo
author: chengzi
---

### Install

[hexo官网指南](https://hexo.io/zh-cn/docs/index.html#安装前提)

1.  安装NodeJS
2.  安装Git
3.  `npm install -g hexo-cli`
4.  cd到目标文件夹内
5.  `hexo init .`
6.  `npm install`
7.  打开_config.yml配置一些基本信息，title等

### favicon

`在themes/light/layout/_partial/head.ejs里将<link href="<%- config.root %>favicon.png" rel="icon">替换为<link href="<%- config.root %>favicon.ico" rel="icon" type="image/x-ico">`

### Edit

1.  `hexo new "hello world" 中间有空格加双引号`，或【`hexo n hello`】创建新文章
2.  `hexo clean`
3.  `hexo g`
4.  `hexo s` 【本地预览】

### Tag

md文档内，`tags:[tag1,tag2]`

### Deploy
1. _config.yml文件，找到Deployment
    # Deployment
    ## Docs: http://hexo.io/docs/deployment.html
    deploy:
      type: git
      repository: git@github.com:ichengzi/ichengzi.github.io.git【这里填写项目git地址】
      branch: master
2. hexo d
3. 打开ichengzi.github.io就可以看到github网页已经刷新了

### End