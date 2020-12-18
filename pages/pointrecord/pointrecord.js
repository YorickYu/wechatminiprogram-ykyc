const requestUtil = require("../../utils/requestUtil")
const urlConfig = require("../../utils/urlConfig")


Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentpage: 1,
    totalPage: 1,
    bottomRefresh: false,
    lists: [],
    firstLoaded: false
  },

  fadeOutInfo: function() {
    var that = this
    that.setData({
      infoShow: []
    })
  },

  fadeInInfo: function(callback = function() {}) {
    var that = this
    var info = this.data.lists
    var key

    var animationInfoData = []
    var infoShow = []
    for (key in info) {
      var animation = wx.createAnimation({
        duration: 0,
        timingFunction: 'step-start',
      })
      animation.opacity(0).scale(0.8, 0.8).step()
      animationInfoData[key] = animation.export()
      infoShow[key] = true
    }
    that.setData({
      animationInfoData: animationInfoData
    }, function() {
      that.setData({
        infoShow: infoShow
      })

      for (key in info) {
        var time = 100 * key
        var animation = wx.createAnimation({
          duration: 500,
          timingFunction: 'ease',
          delay: time
        })
        animation.opacity(1).scale(1, 1).step()
        animationInfoData[key] = animation.export()
      }
      setTimeout(function() {
        that.setData({
          animationInfoData: animationInfoData
        })
      }, 100)
    })
  },

  normalInfo() {
    var that = this
    var info = this.data.lists
    var key
    var animationInfoData = []
    var infoShow = []
    for (key in info) {
      var animation = wx.createAnimation({ })
      animationInfoData[key] = animation.export()
      infoShow[key] = true
    }
    that.setData({
      animationInfoData: animationInfoData
    }, function () {
      that.setData({
        infoShow: infoShow
      })

      for (key in info) {
        var time = 10 * key
        var animation = wx.createAnimation({ })
        animationInfoData[key] = animation.export()
      }
      that.setData({
        animationInfoData: animationInfoData
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.hideShareMenu()
    let that = this
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          contentheight: res.windowHeight - getApp().globalData.navigationHeight
        })
      }
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
    this.requestPointList(1)
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

  upper(e) {
    let that = this
    const com = that.selectComponent('#tfresh')
    if (com.data.toprefresh) {
      return
    }
    console.log("scrollview top")
    com.refreshstart()

    that.setData({
      currentpage: 1,
    }, function () {
      that.requestPointList(that.data.currentpage)
    })
  },

  lower(e) {
    let that = this
    const page = that.data.currentpage
    if (page < that.data.totalPage && !that.data.bottomRefresh) {
      console.log("scrollview down")
      that.setData({
        currentpage: page + 1,
        bottomRefresh: true
      }, function() {
        wx.vibrateShort()
        that.requestPointList(that.data.currentpage)
      })
    }
  },

  // 接口
  requestPointList(currentpage) {
    let that = this
    requestUtil.requestPost(urlConfig.POINT_LIST_URL, {
      "page": currentpage.toString(),
      "size": 15,
      'code': wx.getStorageSync('icode'),
      'tel': wx.getStorageSync('tel')
    }, false).then((res) => {
      if (res.errCode == 0) {
        if (that.data.currentpage == 1) {
          that.setData({
            lists: res.data.list || [],
            totalPage: res.data.totalPage,
            firstLoaded: true
          })
          that.fadeInInfo()
        } else { 
          var orignlist = that.data.lists
          that.setData({
            lists: orignlist.concat(res.data.list),
            totalPage: res.data.totalPage
          })
          that.normalInfo()
        }
      }
      const com = that.selectComponent('#tfresh')
      com.refreshend()
      that.setData({ // 停止刷新阻断
        bottomRefresh: false
      })
    })
  }

})