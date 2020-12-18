

const requestUtil = require("../../utils/requestUtil")
const urlConfig = require("../../utils/urlConfig")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    naviTop: getApp().globalData.navigationHeight,
    mainImg: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideShareMenu()
    this.requestImg()
  },

  requestImg() {
    let that = this
    requestUtil.requestPost(urlConfig.ACCESS_URL, {
    }, false).then((res) => {
      if (res.errCode == 0) {
        that.setData({
          mainImg: res.data.accessImg
        })
      }
    })

  },

  authcancel() {
    wx.navigateBack({})
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
    console.log(e.encryptedData)
    console.log(e.iv)
    console.log(wx.getStorageSync('loginFlag'))
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

        // 登陆完成后验证VIP
        that.checkVIPId(res.data.tel, res.data.code).then(res => {
          let pages = getCurrentPages()
          let prevPage = pages[pages.length - 2]
          wx.navigateBack({
            detail: 1
          })
          console.log(prevPage.options, "6666666777777")
          prevPage.onLoad(prevPage.options)
        })

      }
    })
  },

  /**
   * VIP 身份验证
   */
  checkVIPId(tel, code) {
    return new Promise(resolve => {
      // 发起网络请求
      let that = this
      console.log(tel, code, "11111111111")
      if (tel && code) {
        requestUtil.requestPost(urlConfig.VIP_CHECK, {
          "tel": tel,
          "code": code,
        }, false).then((res) => {
          if (res.errCode == 0) {
            wx.setStorageSync('vip', res.data.isVipMember)
            console.log("会员验证：", wx.getStorageSync("vip"))
            resolve()
          }
        })
      } else { // 暂无微信授权
        wx.setStorageSync('vip', 0)
        console.log("无icode，会员状态默认为：", wx.getStorageSync("vip"))
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})