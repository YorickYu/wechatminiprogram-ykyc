// pages/authorize/authorize.js
const requestUtil = require("../../utils/requestUtil")
const urlConfig = require("../../utils/urlConfig")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideShareMenu()
    console.log(options, 'load options')
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
        
        let pages = getCurrentPages();
        let prevPage = pages[pages.length - 2]
        wx.navigateBack({
          detail: 1
        })
        prevPage.onLoad(prevPage.options)

      }
    })
  },

})