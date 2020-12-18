const requestUtil = require("../../utils/requestUtil")
const urlConfig = require("../../utils/urlConfig")
const router = require("../../utils/router")


Page({

  /**
   * 页面的初始数据
   */
  data: {
    vipStatus: wx.getStorageSync('vip'),
    vipPrice: 0,
    noWxAuth: false,
    username: '点击登录',
    avatar: '',
    showVip: false,
    items: [{
        title: "当前折扣",
        value: 0
      },
      {
        title: "当前积分",
        value: 0
      },
      {
        title: "消费金额",
        value: 0
      },
      {
        title: "购票次数",
        value: 0
      },
    ],
    lists: [{
        id: 0,
        name: "订单查询",
        path: "/pages/order/order"
      },
      {
        id: 1,
        name: "我的优惠券",
        path: "/pages/coupon/coupon"
      },
      {
        id: 2,
        name: "我参与的活动",
        path: "/pages/score/score"
      },
      {
        id: 3,
        name: "联系客服",
        path: '',
      }
    ],
    activities: [],
  },

  // 跳转
  switchto(e) {
    let that = this;
    let idz = e.currentTarget.dataset.idz
    var path = that.data.lists[idz].path
    if (idz == 3) {
      wx.makePhoneCall({
        phoneNumber: '4006075588' //仅为示例，并非真实的电话号码
      })
      return
    }
    wx.navigateTo({
      url: path,
      success: (result) => {

      },
      fail: () => {},
      complete: () => {}
    })

  },

  // 跳转VIP购买页
  switchtovip() {
    wx.navigateTo({
      url: '/pages/purchase-vip/purchase-vip?id=' + 1, // id=1为尊享会员
    })
  },

  // 绑定手机
  bindPhone() {
    const tel = wx.getStorageSync('tel')
    var path = ''
    if (tel != 'empty') {
      path = "/pages/already-regist/already-regist"
    }else {
      path = "/pages/regist/regist"
    }
    wx.navigateTo({
      url: path
    })
  },

  boxclick(e) {
    const idx = e.currentTarget.dataset.aindex
    if (idx == 1) {
      wx.navigateTo({
        url: '/pages/pointrecord/pointrecord',
      })
    }
  },

  toactivitydetail(e) {
    const item = e.detail
    router.handle(item.type, item.url, item.param)
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.hideShareMenu()

  },

  // 获取头像及昵称
  authUserInfo() {
    let that = this
    if (that.data.username != '点击登录') {
      return
    }
    wx.navigateTo({
      url: '/pages/authorize-home/authorize-home',
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

    const code = wx.getStorageSync('icode')
    this.setData({
      vipStatus: wx.getStorageSync('vip') || 0,
      noWxAuth: (code=='' || code==null)
    })
    this.requestInfo()

    const userinfo = getApp().globalData.userInfo
    
    if (userinfo != null) {
      this.setData({
        username: getApp().globalData.userInfo['nickName'],
        avatar: getApp().globalData.userInfo['avatarUrl']
      })
    }
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


  /**
   * 接口
   */
  requestInfo() {
    let that = this
    requestUtil.requestPost(urlConfig.INFO_USER_URL, {
      "code": wx.getStorageSync('icode'),
      "tel": wx.getStorageSync('tel'),
    }, false).then((res) => {
      if (res.errCode == 0) {
        var temp = [{
            title: "当前折扣",
            value: res.data.curDiscount
          },
          {
            title: "当前积分",
            value: res.data.point
          },
          {
            title: "消费金额",
            value: res.data.spendMoney
          },
          {
            title: "购票次数",
            value: res.data.orderCount
          },
        ]
        that.setData({
          items: temp,
          activities: res.data.activityList,
          showVip: res.data.showVip
        })
      }
    })
  }

})