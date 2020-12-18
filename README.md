## wechatminiprogram-ykyc

#### 说明

**项目代码在 `mastrer` 分支** 

这是一个废弃的生产级票务类小程序

技术栈停滞在19年中旬

项目停止运营但是技术无过，开源给大家做借鉴和参考



这个项目不会更新和维护，如有问题可以添加我的工作微信：iOSCodery

---



**主要功能及页面：**

- 授权（非强制）
- 新用户引导
- 启动广告页
- 城市列表
- 影院列表
- 新手引导悬浮球
- 影院相关（厅图、锁座等）
- 自定义导航
- 自定义下拉刷新
- 路由
- 等



#### 总览GIF

![GIF](https://yloopdaed-public.oss-cn-shanghai.aliyuncs.com/ykyc-opensource/gif-show.gif)

#### 获取定位权限

根据具体业务场景修改

封装 `components/modelview-loau` 组件

![location](https://yloopdaed-public.oss-cn-shanghai.aliyuncs.com/ykyc-opensource/7ccffa68ebeea456a17d1079fb5d7c3.png)

#### 新用户引导

![guide1](https://yloopdaed-public.oss-cn-shanghai.aliyuncs.com/ykyc-opensource/a6ac85421a5b1d529a12812da5b3770.png)

![guide2](https://yloopdaed-public.oss-cn-shanghai.aliyuncs.com/ykyc-opensource/9b6b0de6dcde3241c626f0bbbeef82c.png)

上面两个模块，mask遮盖层覆盖全屏幕的问题。

首先，如果遮盖层需要覆盖全屏幕需要自定义 `导航栏` 和底部 `tabbar` ，整个小程序的导航栏都是自定义的渐变色导航，所以这里不做展开。

问题是底部的tabbar如何覆盖。

在 `获取定位权限` 采用的方案是，瞬间隐藏系统的 `tabbar` ，同时放一个假的 `tabbar` 模块。

这种实现方式最好在全页面加载时使用，因为页面全部刷新时不会注意到有一个 **快速的tabbar隐藏并显示** 的操作。

> 有些安卓设备这个切换过程会有明显卡顿



#### 错误页面

![error](https://yloopdaed-public.oss-cn-shanghai.aliyuncs.com/ykyc-opensource/error-page.png)

#### 授权页面/弹窗

封装 `components/authorize` 组件（弹窗）

封装 `components/authorize-home` 组件（页面）

![authorize](https://yloopdaed-public.oss-cn-shanghai.aliyuncs.com/ykyc-opensource/5ed08e040700953d77e339643bec922.png)

#### 其他

**1 简易路由模块** `utils/router.js` 

思路：接收参数：type、url、param。通过type判断跳转类型，url指定跳转路径，param传递json参数。

**2 网络请求模块** `utils/requestUtil.js` 

封装了常用的 `get` 和 `post` 请求，并加入授权判断等

> Demo中所有数据来自于 `utils/mockUp.js` 

**3 自定义下拉刷新组件**  `components/top-refresh` 

基于小程序 `scroll-view` 和 `GIF` 封装的简易下拉刷新控件

解决自定义导航栏以后系统下拉刷新控件的位置不正确问题（19年小程序官方没有给出可行的方案，所以自己封装了一个下拉组件）













