// pages/mine/activity-list.js
const requestUtil = require("../../utils/requestUtil")
const router = require("../../utils/router")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    totalPage: 0,
    activityList: [],
    contentheight: 0,
    currentpage: 1,
    btmRefresh: true
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
    this.getActivityList(1);
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
  getActivityList: function(pagnum) {
    var that = this;
    requestUtil.requestPost("activity/activityList", {
      "page": pagnum,
    }).then((result) => {
      if (pagnum == 1) {
        if (result.errCode == 0) {
          that.setData({
            activityList: result.data.list,
            totalPage: result.data.totalPage,
            currentpage: 1
          })
        }
      } else {
        if (result.errCode == 0) {
          var tmplist = new Array();
          tmplist = that.data.activityList;
          for (var i = 0; i < result.data.list.length; i++) {
            tmplist.push(result.data.list[i]);
          }
          that.setData({
            activityList: tmplist,
            btmRefresh: true
          })
        }
      }
      const com = that.selectComponent('#tfresh')
      com.refreshend()
    })
  },
  upper(e) {
    let that = this
    const com = that.selectComponent('#tfresh')
    if (com.data.toprefresh) {
      return
    }
    console.log("scrollview top")
    com.refreshstart()
    wx.vibrateShort()
    that.getActivityList(1)
  },

  lower(e) {
    console.log("下拉成功")
    if (this.data.btmRefresh) {
      let that = this
      const page = that.data.currentpage
      if (page < that.data.totalPage) {
        console.log("scrollview down")
        that.setData({
          currentpage: page + 1,
          btmRefresh: false
        }, function() {
          wx.vibrateShort()
          this.getActivityList(that.data.currentpage)
        })
      }
    }
  },

  navToDetail(e) {
    var curIndex = e.currentTarget.dataset.index
    var item = this.data.activityList[curIndex]
    router.handle(item.linkType, item.url, item.parameter)
  }
})