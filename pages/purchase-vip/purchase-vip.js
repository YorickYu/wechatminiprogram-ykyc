const requestUtil = require("../../utils/requestUtil")
const urlConfig = require("../../utils/urlConfig")

Page({

  /**
   * 页面的初始数据
   */
  data: {

    id: 0, // detail接口获取到的vip id
    name: "", // 标题名称
    description: {
      title: '', // 副标题
      body: []  // 优惠条款n条
    },
    illustration: "", // 底部说明图片url height: 1736rpx
    validityPeriod: 0, // 有效期
    store: 0, // 剩余VIP数量
    originalPrice: 0.0, // 原价
    price: 0.0, // 现价
    vipStatus: wx.getStorageSync('vip'),

    bodyicons: [ // icons 最多支持四个
      '/images/vip/icon-1.png',
      '/images/vip/icon-2.png',
      '/images/vip/icon-3.png',
      '/images/vip/icon-1.png'
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options.id) 
    this.requestDetail(options.id)
  },

  requestDetail(idz) {
    let that = this
    requestUtil.requestPost(urlConfig.VIP_DETAIL, {
      "id": idz,
    }, false).then((res) => {
      if (res.errCode == 0) {
        var jsonstr = res.data.description
        let jsonobj = JSON.parse(jsonstr)

        that.setData({
          id: res.data.id,
          description: jsonobj,
          name: res.data.name,
          illustration: res.data.illustration,
          validityPeriod: res.data.validityPeriod,
          store: res.data.store,
          originalPrice: res.data.originalPrice,
          price: res.data.price
        })
        
      }
    })
  },

  formSubmit(e) {
    const formId = e.detail.formId
    // 非真机运行时 formId 应该为 the formId is a mock one
    console.log('表单id:', formId)

    if (this.data.vipStatus) {
      // 跳转订单页
      wx.navigateTo({
        url: '/pages/purchase-vip-list/purchase-vip-list',
      })
    } else {
      // 购买
      this.purchaseAction(formId)
    }
  },

  /**
   * 购买操作
   */
  purchaseAction(formId) {
    this.getWxPaymentObject(formId).then(obj => {
      wx.requestPayment({
        timeStamp: obj.data.timestamp,
        nonceStr: obj.data.noncestr,
        package: obj.data.prepayid,
        signType: obj.data.signType,
        paySign: obj.data.sign,
        success(res) { 
          console.log('支付成功')
          try {
            wx.setStorageSync('vip', 1)
          } catch (e) { }
          wx.redirectTo({
            url: "/pages/purchase-vip-success/purchase-vip-success"
          })
        },fail(res) {
          console.log('取消支付')
        }
      })
    })
  },

  getWxPaymentObject(formId) {
    return new Promise(resolve => {
      let that = this
      requestUtil.requestPost(urlConfig.VIP_PURCHASE, {
        "id": that.data.id,
        "tel": wx.getStorageSync('tel'),
        "code": wx.getStorageSync('icode'),
        "formId": formId,
      }, true).then((res) => {
        if (res.errCode == 0) {
          resolve(res)
        }else {
          wx.showToast({
            title: res.errMsg || '支付object获取失败',
            icon: 'none',
          })
        }
      })
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
    this.setData({
      vipStatus: wx.getStorageSync('vip') || 0
    })
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