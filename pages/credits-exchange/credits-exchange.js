const requestUtil = require("../../utils/requestUtil")
const urlConfig = require("../../utils/urlConfig")
const router = require("../../utils/router")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    loadingSuccess: false,
    currentpage: 1,
    totalPage: 1,
    bottomRefresh: false,
    headerInfo: {
      carouselList: [{}],
      login: 1,
      point: 0,
    },
    productList: [],
    listFirstLoad: false
  },

  requestHeader() {
    let that = this
    const _tel = wx.getStorageSync('tel')
    const _code = wx.getStorageSync('icode')

    requestUtil.requestPost(urlConfig.GOODS_INFO_HEADER_URL, {
      "tel": _tel,
      "code": _code
    }, false).then((res) => {
      if (res.errCode == 0) {
        that.setData({
          headerInfo: res.data
        })
      }
    })
  },
  requestList(currentpage) {
    let that = this
    requestUtil.requestPost(urlConfig.GOODS_LIST_URL, {
      "page": currentpage.toString(),
      "size": 10,
    }, false).then((res) => {
      if (res.errCode == 0) {
        if (that.data.currentpage == 1) {
          that.setData({
            productList: res.data.list || [],
            totalPage: res.data.totalPage,
            listFirstLoad: true
          })
        } else {
          var orignlist = this.data.productList
          that.setData({
            productList: orignlist.concat(res.data.list),
            totalPage: res.data.totalPage
          })
        }
      }
    })
  },
  firstLoading() {
    this.setData({
      currentpage: 1,
    }, function() {
      this.requestHeader()
      this.requestList(this.data.currentpage)
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          contentheight: res.windowHeight - getApp().globalData.navigationHeight
        })
      }
    })

    that.firstLoading()
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
    this.requestHeader()
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

  lower(e) {
    let that = this
    const page = that.data.currentpage
    if (page < that.data.totalPage && !that.data.bottomRefresh) {
      console.log('lower')
      that.setData({
        currentpage: page + 1,
        bottomRefresh: true
      }, function() {
        wx.vibrateShort()
        that.requestList(that.data.currentpage)
      })
    }
  },

  bannernavigate(e) {
    console.log(e)
    const type = e.currentTarget.dataset.item.linkType
    const url = e.currentTarget.dataset.item.url
    const param = e.currentTarget.dataset.item.parameter
    // router.handle(2, "activityDetail", { "type": "2" , id: 144})
    router.handle(type, url, param)
  },

  bannerImageLoadSuccess(e) {
    this.setData({
      loadingSuccess: true
    })
  },

  toPointsList() {
    wx.navigateTo({
      url: '/pages/pointrecord/pointrecord',
    })
  },

  toGoodsDetail(e) {
    const _index = e.currentTarget.dataset.aindex
    const item = this.data.productList[_index]
    const _id = item.productId
    console.log('toGoodsDetail: id', _id)
    wx.navigateTo({
      url: '/pages/goods-detail/goods-detail?id=' + _id,
    })
  },
  toLogin() {
    wx.navigateTo({
      url: "/pages/authorize-home/authorize-home",
    })
  },

})