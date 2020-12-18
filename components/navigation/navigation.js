/**
 * title	标题	String	none
 * color	标题字体颜色	String	#000000
 * fontSize	导航栏字体大小，单位rpx、px	String	40rpx
 * background	导航栏背景颜色	String	transparent
 * backgroundimage	导航栏占位图片	String	/images/barbackground.png
 * back	是否显示导航栏返回按钮	Boolean	false
 * fixed	导航栏是否fixed定位置顶	Boolean	true
 */

/**
 * 注意： back 和 customback 不可同时为true
 * 如需返回       则指定back
 * 如需自定义返回  则指定customback 并bind:customback="方法1" 实现方法1即可
 */

/**
 * toprefresh 下拉加载动画 Boolean false
 * 使用时需要在页面的配置文件中，添加隐藏的加载操作
 * "enablePullDownRefresh": true,
 * "backgroundTextStyle": "light"
 * 注意：toprefresh不能与fixed="{{false}}"通用
 */

Component({
  properties: {
    // 这里定义属性，属性值可以在组件使用时指定
    back: { //是否显示返回
      type: Boolean,
      value: false,
    },
    customback: {
      type: Boolean,
      value: false
    },
    showimage: { // 是否显示背景图片
      type: Boolean,
      value: true,
      observer: function (newVal, oldVal, changedPath) {
        console.log(newVal, "showimage");
        if (newVal !== false && newVal !== true) {
          let obj = {};
          obj[changedPath[0]] = oldVal;
          this.setData(obj);
        }
      }
    },
    background: { //导航栏背景色
      type: String,
      value: 'transparent', //默认
      observer: function(newVal, oldVal, changedPath) {
        console.log(newVal, "background");
        if (!newVal) {
          let obj = {};
          obj[changedPath[0]] = oldVal;
          this.setData(obj);
        }
      }
    },
    color: { //导航栏字体色
      type: String,
      value: '#ffffff', //默认 白色
      observer: function(newVal, oldVal, changedPath) {
        if (!newVal) {
          let obj = {};
          obj[changedPath[0]] = oldVal;
          this.setData(obj);
        }
      }
    },
    fontSize: { //导航栏字大小
      type: String,
      value: '36rpx', //默认
      observer: function(newVal, oldVal, changedPath) {
        if (!newVal) {
          let obj = {};
          obj[changedPath[0]] = oldVal;
          this.setData(obj);
        }
      }
    },
    title: { //导航栏标题
      type: String,
      value: 'none', //默认
      observer: function(newVal, oldVal, changedPath) {
        // console.log(newVal,oldVal,changedPath);
        if (!newVal) {
          let obj = {};
          obj[changedPath[0]] = oldVal;
          this.setData(obj);
        }
      }
    },
    fixed: { //导航栏是否fixed定位
      type: Boolean,
      value: true, //默认
      observer: function(newVal, oldVal, changedPath) {
        // console.log(newVal,oldVal,changedPath);
        if (newVal !== false && newVal !== true) {
          let obj = {};
          obj[changedPath[0]] = oldVal;
          this.setData(obj);
        }
      }
    },
    toprefresh: { 
      type: Boolean,
      value: false, //默认
      observer: function (newVal, oldVal, changedPath) {
        if (newVal !== false && newVal !== true) {
          let obj = {};
          obj[changedPath[0]] = oldVal;
          this.setData(obj);
        }
      }
    },
    backgroundimage: {
      type: String,
      value: '/images/barbackground.png',
      observer: function(newVal, oldVal, changedPath) {
        if (!newVal) {
          let obj = {};
          obj[changedPath[0]] = oldVal;
          this.setData(obj);
        }
      }
    }
  },
  data: {
    // 这里是一些组件内部数据
    height: 44, //导航栏高度,
    paddingTop: 20, //导航栏上内边距对应状态栏高度
    showHomeButton: false, //是否显示返回首页
    show: true, //是否显示导航栏
  },
  attached: function(option) {
    //检测首页是否在当前页面栈中
    let pages = getCurrentPages();
    let showHomeButton = false;
    if (pages.length < 2 && pages[0].route != __wxConfig.pages[0]) {
      showHomeButton = true;
    }
    //导航栏自适应
    let systemInfo = wx.getSystemInfoSync();
    let reg = /ios/i;
    let pt = 20; //导航状态栏上内边距
    let h = 44; //导航状态栏高度
    if (reg.test(systemInfo.system)) {
      pt = systemInfo.statusBarHeight;
      h = 44;
    } else {
      pt = systemInfo.statusBarHeight;
      h = 48;
    }
    this.setData({
      height: h,
      paddingTop: pt,
      showHomeButton: showHomeButton
    })
    console.log(this);
  },
  methods: {
    // 返回
    navigateBack() {
      // 默认返回事件
      if (this.properties.back) {
        let pages = getCurrentPages();
        if (pages.length < 2 && pages[0].route != __wxConfig.pages[0]) {
          wx.reLaunch({
            url: '/' + __wxConfig.pages[0]
          })
        } else {
          wx.navigateBack({
            delta: 1
          });
        }
      }

      // 自定义返回事件
      if (this.properties.customback) {
        // 向外传递
        this.triggerEvent('customback', {})
      }
    },
    navigateBackHome() {
      wx.reLaunch({
        url: '/' + __wxConfig.pages[0]
      })
    },
    /**
     * 切换导航栏显示
     */
    toggleShow() {
      if (!this.data.show) {
        this.setData({
          show: true
        });
      }
    },
    /**
     * 切换导航栏隐藏
     */
    toggleHide() {
      if (this.data.show) {
        this.setData({
          show: false
        });
      }
    }
  }
})