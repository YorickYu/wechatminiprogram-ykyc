// pages/score/score.js
const requestUtil = require("../../utils/requestUtil")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    width: 0,
    activityMode: {
      status: 0,
      lineone: "",
      lineTwo: "",
      lineThree: ""
    },
    activity: [],
    myActivityList: [],
    totalPage: 0,
    currentpage: 1,
    btmRefresh: true,
    firstLoaded: false,
    infoon: false
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
    this.getUserActivityList(1);
  },
  
  copyBtn: function(e) {
    var that = this;
    var index = e.currentTarget.dataset.index;

    wx.setClipboardData({
      //准备复制的数据
      data: that.data.myActivityList[index].validCode,
      success: function(res) {
        wx.showToast({
          title: '复制成功',
        });
      }
    });
  },

  showinfo(e) {
    var index = e.currentTarget.dataset.index;

    this.setData({
      infoon: true,
      instruction: this.data.myActivityList[index].instruction
    })
  },

  infohide(e) {
    this.setData({
      infoon: false
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

  todetail(e) {
    console.log(e)
    let mode = this.data.myActivityList[e.currentTarget.dataset.index]
    let activityId = mode.activityId
    let type = mode.type || 0
    if (type == 2) {
      wx.navigateTo({
        url: "/pages/time/time?activityId=" + activityId
      })
    } else {
      wx.navigateTo({
        url: "/pages/overdue/overdue?activityId=" + activityId
      })
    }
  },

  getUserActivityList: function(pagnum) {
    var that = this;
    var tel = "empty";
    if (wx.getStorageSync("tel") != null) {
      tel = wx.getStorageSync("tel");
    }
    requestUtil.requestPost("activity/activityHistory", {
      "page": pagnum,
      "code": wx.getStorageSync("icode"),
      "tel": tel
    }).then((result) => {
      that.setData({
        firstLoaded: true
      })
      if (pagnum == 1) {
        if (result.errCode == 0) {
          var userActivityList = result.data.list || []
          for (var i = 0; i < userActivityList.length; i++) {
            var activityData = userActivityList[i];
            userActivityList[i].status = 0
            userActivityList[i].lineone = activityData.activityTime || ''
            if (activityData.type == 2) {
              userActivityList[i].lineTwo = "抢购时间：" + activityData.joinTime
              userActivityList[i].status = 1
            } else {
              userActivityList[i].lineTwo = "报名时间：" + activityData.joinTime
              userActivityList[i].lineThree = activityData.address || ''
            }
          }
          // console.log("userActivityList:" + userActivityList)
          that.setData({
            totalPage: result.data.totalPage,
            myActivityList: userActivityList,
            currentpage: 1
          })
        }
      } else {
        if (result.errCode == 0) {
          var tmplist = this.data.myActivityList;
          var userActivityList = result.data.list;
          for (var i = 0; i < userActivityList.length; i++) {
            var activityData = userActivityList[i];
            userActivityList[i].status = 0
            userActivityList[i].lineone = "活动时间：" + activityData.activityTime || '';
            if (activityData.type == 2) {
              userActivityList[i].lineTwo = "抢购时间：" + activityData.joinTime;
              userActivityList[i].status = 1;
            } else {
              userActivityList[i].lineTwo = "报名时间：" + activityData.joinTime;
              userActivityList[i].lineThree = "活动地址：" + activityData.address;
            }
            tmplist.push(userActivityList[i]);
          }
          that.setData({
            myActivityList: tmplist,
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

    that.setData({
      currentpage: 1,
    }, function () {
      that.getUserActivityList(that.data.currentpage)
    })
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
          this.getUserActivityList(that.data.currentpage)
        })
      }
    }
  }
})