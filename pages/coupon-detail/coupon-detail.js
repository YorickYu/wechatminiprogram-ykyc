
const requestUtil = require("../../utils/requestUtil")
const urlConfig = require("../../utils/urlConfig")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pwd: 0, // 券码
    detail: {
      /*
      pwd: "2019040277421289",
      time: "2019.04.30",
      cityName: "全国通用",
      cinemaName: "所有影院",
      hallTypeName: "所有影厅",
      movieTypeName: "所有类型",
      maxPrice: "0～35元",
      movieName: "xixihaha",
      limitRule: "每家影院每天仅每家影院每天仅每家影仅每家影院每天仅每家仅每家影院每天仅每家仅每家影院每天仅每家仅每家影院每天仅每家院每天仅限使用10张优惠券",
      limitTimePeriod: "00:00:00～23:59:59",
      userRule: "",
      discount: "9.0折券",
      deductionLimit: "0元"
      */
    } 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideShareMenu()

    const pwd = options.pwd
    console.log(pwd)
    this.setData({
      pwd: pwd
    })

    const type = options.type
    if (type == 3) { // 折扣券详情
      this.requestDiscountCouponDetail()
    }else if (type == 1 || type == 2) {
      this.requestOtherCouponDetail()
    }
  
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

  /**
   * 接口
   */

  // 折扣券详情
  requestDiscountCouponDetail() {
    let that = this
    requestUtil.requestPost(urlConfig.COUPONS_DISCOUNT_URL, {
      "code": wx.getStorageSync('icode'),
      "tel": wx.getStorageSync('tel'),
      "couponPwd": that.data.pwd,
    }, false).then((res) => {
      if (res.errCode == 0) {
        that.setData({
          detail: res.data
        })
      }
    })
  },

  // 通兑和抵制券详情
  requestOtherCouponDetail() {
    let that = this
    requestUtil.requestPost(urlConfig.COUPONS_OTHER_URL, {
      "code": wx.getStorageSync('icode'),
      "tel": wx.getStorageSync('tel'),
      "couponPwd": that.data.pwd,
    }, false).then((res) => {
      if (res.errCode == 0) {
        that.setData({
          detail: res.data
        })
      }
    })
  }

})