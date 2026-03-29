# Anime Nav Site

一个基于 **HTML + CSS + JavaScript + Express + SQLite** 开发的动漫导航小项目。  
这个项目用于整理常用的追番、评分、漫画和资源站点，并支持站点的加载、搜索和新增。

## 项目简介

Anime Nav Site 是一个前后端联动的小型 Web 项目。  
前端负责页面展示、搜索交互和新增表单，后端使用 Express 提供接口，SQLite 负责保存站点数据。

这个项目的目标是把一个普通的静态导航页，升级成一个可以读取和管理数据的全栈练习项目。

## 功能

- 自动加载站点列表
- 按关键词搜索站点
- 新增站点
- 页面样式美化（毛玻璃卡片、霓虹风格、后台面板风格表单）

## 技术栈

- HTML
- CSS
- JavaScript
- Node.js
- Express
- SQLite

## 项目结构

```bash
anime-nav-site/
├─ public/
│  ├─ index.html
│  ├─ Zhu-Ye-Mian.css
│  ├─ Zhu-Ye-Mian-5.js
│  └─ favicon.ico
├─ db.js
├─ server.js
├─ package.json
├─ package-lock.json
└─ README.md
```

## 本地运行

### 1. 克隆仓库

```bash
git clone https://github.com/FangXin05/anime-nav-site.git
```

### 2. 进入项目目录

```bash
cd anime-nav-site
```

### 3. 安装依赖

```bash
npm install
```

### 4. 启动项目

```bash
npm start
```

### 5. 打开浏览器访问

```bash
http://localhost:3000
```

## 使用说明

1. 打开页面后，系统会自动加载已有站点。
2. 在搜索框输入关键词，可以搜索相关站点。
3. 在“站点管理面板”中填写信息后，可以新增站点。
4. 新增成功后，页面会自动刷新站点列表。

## 适合练习的内容

这个项目适合用来练习以下知识：

- 前端页面布局与样式设计
- JavaScript DOM 操作
- Fetch API 调用后端接口
- Express 路由编写
- SQLite 数据库存储
- 前后端联调

## 后续可扩展功能

- 删除站点
- 编辑站点
- 分类筛选
- 部署到线上
- 增加项目截图和演示链接

## 项目截图

你可以在这里补充项目运行截图：

- 首页截图
- 搜索结果截图
- 新增站点截图

## 作者

- GitHub: [FangXin05](https://github.com/FangXin05)

## 项目地址

- Repository: https://github.com/FangXin05/anime-nav-site
