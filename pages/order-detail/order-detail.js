// pages/order-detail/order-detail.js
const requestUtil = require("../../utils/requestUtil")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order: {
      // "movieTag": "",
      // "movieName": "",
      // "state": "finish",
      // "status": 0,
      // "planTime": "",
      // "cinemaName": "",
      // "hallName": "",
      // "seatInfo": "",
      // "validCode": "",
      // "validInfoBak": "",
      // "address": "",
      // "ticketCount": 0,
      // "orderNo": "",
      // "crtTime": "",
      // "factPayMoney": 0,
      // "preferencePrice": 0,
      // "discount": 0,
      // "tel": ""
    },
    stateValue: "",
    state: "",
    seatList: [],
    ticketNum: 0,
    orderId: '',
    codes: [/*{ name: '取票码', validCode: 123456 }*/]
  },

  configCodes(info = "") {

    if (info == "") {
      return
    }
    var tempcodes = []
    if (info.indexOf('|') >= 0) {
      let items = info.split('|')
      for (var index in items) {
        let item = items[index]
        if (item.indexOf('：') >= 0) {
          let sep = item.split('：')
          let obj = { name: sep[0], validCode: sep[1] }
          tempcodes.push(obj)
        }
      }
    } else {
      if (info.indexOf('：') >= 0) {
        let sep = info.split('：')
        let obj = { name: sep[0], validCode: sep[1] }
        tempcodes.push(obj)
      }
    }
    this.setData({
      codes: tempcodes
    })
    console.log(tempcodes)
    
  },

  getOrderDetail(orderId) {
    let that = this
    requestUtil.requestPost("order/getOrderDetail", {
      "orderNo": orderId,
      "code": wx.getStorageSync('icode'),
      "tel": wx.getStorageSync('tel'),
    }).then((res) => {
      var seatInfo = res.data.seatInfo || ""
      var seatList = seatInfo.split(",")
      var status = res.data.status
      var state = ""
      var stateValue = ""
      var isexpire = res.data.isExpire
      if (isexpire == 1) {
        stateValue = "已过期"
        state = "cancel"
      } else if (status == 1) {
        stateValue = "待支付";
        state = "wait";
      } else if (status == 2) {
        stateValue = "已支付";
        state = "paid";
      } else if (status == 3) {
        stateValue = "已完成";
        state = "finish";
      } else if (status == 4) {
        stateValue = "已取消"
        state = "cancel";
      } else if (status == 5) {
        if (res.data.state == "failed") {
          stateValue = "订单失败"
          state = "failed";
        } else {
          stateValue = "已退票";
          state = "refunded";
        }
      } else if (status == 6) {
        stateValue = "已退票";
        state = "refunded";
      }
      that.configCodes(res.data.ticketInfo || "")
      that.setData({
        order: res.data,
        seatList: seatList,
        ticketNum: seatList.length,
        stateValue: stateValue,
        state: state
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.hideShareMenu({})

    var that = this;
    that.setData({
      orderId: options.orderId
    })
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
    this.getOrderDetail(this.data.orderId)
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

  }
})