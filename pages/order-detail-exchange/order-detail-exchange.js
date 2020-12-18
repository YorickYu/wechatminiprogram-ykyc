

const requestUtil = require("../../utils/requestUtil")
const urlConfig = require("../../utils/urlConfig")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderInfo: {}
  },


  requestGoodsOrderDetail(orderid) {
    let that = this
    requestUtil.requestPost(urlConfig.GOODS_ORDER_INFO_URL, {
      "tel": wx.getStorageSync('tel'),
      "code": wx.getStorageSync('icode'),
      "orderNo": orderid.toString()
    }, false).then((res) => {
      if (res.errCode == 0) {
        that.setData({
          orderInfo: res.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideShareMenu()
    console.log(options.orderNo)
    const id = options.orderNo
    this.requestGoodsOrderDetail(id)
    
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