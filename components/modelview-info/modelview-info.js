const requestUtil = require("../../utils/requestUtil.js")
const urlConfig = require("../../utils/urlConfig")

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    maskshow: false,
    locationshow: false,
  },

  /**
   * 生命周期函数
   */
  ready: function () {
    let that = this
    that.animation = wx.createAnimation({
      duration: 50,
      timingFunction: "ease-in-out",
      delay: 0
    })

    setTimeout(() => {
      that.setData({
        locationshow: true
      })
    }, 300);

    setTimeout(() => {
      that.scale()
    }, 600);
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 动画相关
    scale: function () {
      this.animation.scale(0.9).step()
        .scale(1.1).step()
        .scale(1).step()
      this.setData({ animation: this.animation.export() })
    },

    // 用户授权
    bindGetUserInfo: function (e) {
      let that = this
      wx.getSetting({
        success(res) {
          if (res.authSetting['scope.userInfo']) {
            getApp().globalData.userInfo = e.detail.userInfo
            that.requestAuthorize(e.detail)
          }
        }
      })  
    },

    // 微信授权
    requestAuthorize(e) {
      let that = this
      // 注册
      requestUtil.requestPost(urlConfig.AUTHORIZE_URL, {
        "encryptedData": e.encryptedData,
        "iv": e.iv,
        "loginFlag": wx.getStorageSync('loginFlag')
      }, false).then((res) => {
        if (res.errCode == 0) {
          wx.showToast({ title: '登录成功', 'icon': 'none' })
          
          try {
            wx.setStorageSync('icode', res.data.code)
            wx.setStorageSync('tel', res.data.tel)
          } catch (e) {
            console.log("catch error", e)
          }

          that.triggerEvent('returnInfo', { info: res })
        }else {
          wx.showToast({ title: res.errMsg, 'icon': 'none' })
        }
      })
    },
  }
})
