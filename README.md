# Vue开发去哪儿核心页面

## 项目技术栈：Vue-cli脚手架配合Vue、Vue-router、Vuex
1. 通过Html+CSS对页面进行搭建，利用sass预编译语言进行布局
2. 使用JavaScript等技术，实现产品所需的交互效果；
3. Vue-axios结合mock数据进行渲染，利用Vuex实现数据共享，使用localStorage持久存储数据
4. 兄弟组件实现城市选择页面，递归组件实现详情列表
5. 使用Vue路由实现页面内容的切换，利用keep-alive优化路由页面性能

## 项目主要效果展示
<img width="800" src="./imgs/res.png"/>
<!-- <figure class="third">
<img width="150" src="./imgs/first.png"/><img width="150" src="./imgs/city.png"/><img width="150" src="./imgs/details.png"/>
</figure> -->
<!-- ### 首页
<img width="150" src="./imgs/first.png"/>
### 城市列表页
<img width="150" src="./imgs/city.png"/>
### 详情页
<img width="150" src="./imgs/details.png"/> -->

## 项目开发流程

### 项目初始化
1. 环境配置
2. 项目代码结构
3. 单文件组建与路由
4. 单页应用与多页应用
5. 项目代码初始化

### 首页开发
1. Header制作
2. Iconfont的引入
3. 首页轮播
4. 图标区域实现
5. 热销推荐与周末游组件
6. 使用axios获取接口数据
7. 首页父子组件间数据的传递

### 城市选择页面开发
1. 路由配置
2. 搜索框布局
3. Better-scroll的使用和字母表布局
4. 兄弟组建间的传值
5. 列表性能优化
6. 搜索逻辑实现
7. Vuex实现数据共享
8. LocalStorage实现页面数据持久存储
9. 使用keep-alive优化路由页面性能

### 详情页面开发
1. 动态路由配置及banner布局
2. 公用画廊组件拆分
3. 渐隐渐显的header效果实现
4. 递归组件实现详情列表
5. 画廊动画效果封装

## 项目中的问题
1. 见同目录下question.md文件