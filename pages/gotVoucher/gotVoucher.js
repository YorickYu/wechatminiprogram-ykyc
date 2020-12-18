// pages/gotVoucher/gotVoucher.js
const requestUtil = require("../../utils/requestUtil")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    week: '',
    voucherText: '',
    validCode: '',
    cover: '',
    type: 0,
    address: '',
    awardType: 1 //(1.取票码 2.兑换券)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.hideShareMenu({})
    var that = this;
    let activityId = options.id
    let validCode = options.validCode
    that.getActivityDetail(activityId, validCode)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  
  getActivityDetail: function(activityId, validCode) {
    var that = this;
    var tel = "empty";
    if (wx.getStorageSync("tel") != null) {
      tel = wx.getStorageSync("tel");
    }
    requestUtil.requestPost("activity/activityDetail", {
      "activityId": activityId,
      "code": wx.getStorageSync("icode"),
      "tel": tel
    }).then((result) => {
      if (result.errCode == 0) {
        var type = result.data.type
        var time = result.data.activityTime || ""
        var activitySplitTimeList = ""
        var activityTime = ""
        if (time != "") {
          activitySplitTimeList = time.split(" ")
          activityTime = activitySplitTimeList[0] + " " + result.data.week + " " + activitySplitTimeList[1].substring(0, activitySplitTimeList[1].length - 3)
        }
        var voucherText = ''
        var tit = ''
        if (type == 2) {
          voucherText = '抢券成功'
          tit = "线上抢券"
        } else if (type == 1) {
          voucherText = '报名成功'
          tit = "线上送票"
        } else {
          voucherText = '报名成功'
          tit = "线下送票"
        }
        that.setData({
          title: tit,
          voucherText: voucherText,
          week: activityTime,
          validCode: validCode,
          cover: result.data.cover,
          type: type,
          address: result.data.address,
          awardType: result.data.awardType
        })
      }
    })
  }
})