
const requestUtil = require("../../utils/requestUtil")
const urlConfig = require("../../utils/urlConfig")

Page({

  /**
   * 页面的初始数据
   */
  data: {    
    hasWxAuth: false,
    bindsuccess: false,
    title: "我的优惠券",
    switchbar: ["折扣券", "通兑券", "抵值券"],
    currentSelected: 0,
    authorizetel: false,
    borderPosition: {}, // guide-page 元素位置
    showGuide: false,

    // type: 1, // 1通兑 2抵制 3折扣
    // enable: true, // false不可用 true可用
    // left: index, // 左侧内容
    // title: "主标题",
    // subtitle: "副标题副标题副标题副标题副标题副标题副标题",
    // duringtime: "不限",
    // endtime: "2018-4-23"

    contents:[], // 当前显示的array
    list: [], // 总的array [[1], [2], [3]]
    exchangelist: [], // 通兑券
    offsetlist: [],   // 抵值券
    discountlist: [],  // 折扣券
    firstLoaded: false
  },
  switchaction(e) {
    let current = e.currentTarget.dataset.aindex
    this.setData({
      currentSelected: current,
      contents: this.data.list[current] || []
    })

    // 切换到通兑券或者抵制券时判断是否绑定手机号
    const _flag = wx.getStorageSync('couponGuide') || 0
    if (current > 0) {
      const tel = wx.getStorageSync('tel')
      console.log(_flag, "couponGuide")
      if (_flag > 0 && tel == 'empty' ) {
        this.setData({
          authorizetel: true
        })
      }
    } else {
      if (_flag == 0 && this.data.contents.length > 0) {
        this.pageGuide()
      }
    }

  },
  bindtelmaskviewreturn(e) {
    const result = e.detail.state

    if (result == 0) { 
      this.setData({
        authorizetel: false,
      }, function () {
        this.requestCouponList()
      })
    } else if (result == 1) { // 绑定失败，通过手机验证码绑定
      wx.navigateTo({
        url: '/pages/regist/regist',
      })
    } else if (result == 2) {
      this.setData({
        authorizetel: false
      })
    }
  },

  // regist页面绑定手机成功后返回
  successFromRegist() {
    this.setData({
      authorizetel: false,
      bindsuccess: true,
    },function() {
      setTimeout(() => {
        this.setData({
          bindsuccess: false
        })
      }, 1000)
      this.requestCouponList()
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */

  todetail(e) {
    const mode = e.currentTarget.dataset.content
    const pwd = mode.pwd
    const type = mode.type

    wx.navigateTo({
      url: '/pages/coupon-detail/coupon-detail?pwd=' + pwd + "&type=" + type,
    })
  },

  bindGetUserInfo: function (e) {
    wx.navigateTo({
      url: '/pages/authorize-home/authorize-home',
    })
  },

  onLoad: function (options) {
    wx.hideShareMenu()
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
    const code = wx.getStorageSync('icode')
    if (code == '' || code == null) {
      console.log('未登陆')
      this.setData({
        hasWxAuth: true
      })
    } else {
      this.setData({
        hasWxAuth: false
      })
      this.requestCouponList()
    }    
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
  requestCouponList() {
    let that = this
    requestUtil.requestPost(urlConfig.COUPONS_GET_URL, {
      "code": wx.getStorageSync('icode'),
      "tel": wx.getStorageSync('tel'),
    }).then((res) => {
      if (res.errCode == 0) {
        var _list = [res.data.disCountCouponList, res.data.exchangeCouponList,  res.data.offsetCouponList]
        that.setData({
          exchangelist: res.data.exchangeCouponList, // 通兑券
          offsetlist: res.data.offsetCouponList, // 抵值券
          discountlist: res.data.disCountCouponList, // 折扣券
          firstLoaded: true
        })
        that.setData({
          list: _list,
          contents: _list[that.data.currentSelected]
        }, function() {
          const _flag = wx.getStorageSync('couponGuide') || 0
          if (_flag == 0 && that.data.contents.length > 0) {
            that.pageGuide()
          }
        })
      }
    })
  },

  pageGuide() {
    let that = this
    const query = wx.createSelectorQuery()
    query.select('#position').boundingClientRect(function (rect) {

      // console.log("anchorrect", that.data.anchorrect.top)
      // rect.right // 节点的右边界坐标
      // rect.top // 节点的上边界坐标
      // rect.bottom // 节点的下边界坐标
      // rect.width // 节点的宽度
      // rect.height // 节点的高度
      that.setData({
        borderPosition: rect,
        showGuide: true
      })
    }).exec()
  },
  guideClick(e) {
    let that = this
    that.setData({
      showGuide: false,
    }, function() {
      let _discountCoup = that.data.discountlist[0]
      console.log(_discountCoup, "coup")
      const pwd = _discountCoup.pwd
      const type = _discountCoup.type

      wx.navigateTo({
        url: '/pages/coupon-detail/coupon-detail?pwd=' + pwd + "&type=" + type,
      })

      wx.setStorageSync("couponGuide", 1)
    })
  },
  handletouchtart(e) {
    return
  }
})