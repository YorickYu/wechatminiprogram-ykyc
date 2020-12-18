
const requestUtil = require("../../utils/requestUtil")
const urlConfig = require("../../utils/urlConfig")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    lists: [/*{
      videoId: 0,
      imgSrc: "",
      videoSrc: "",
      point: 0,
      viewTime: 0,
      title: "视频1",
      type: 1
    }*/],
    currentVideoId: 0,
    currentpage: 1,
    totalPage: 1,
    requestErr: false,
    firstloading: false,
    bottomRefresh: false,
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
    this.requestVideoList(1)
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
  onUnload: function() {},

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
    wx.showToast({
      title: '分享成功',
      icon: 'success',
      duration: 2000
    })

    console.log("123123")
    return {
      title: "最新、最优惠的电影在这等你来看！",
    }
  },
  touchmoveHandler(e) {
    console.log('stop user scroll it!');
    return;
  },
  /**
   * 播放
   */
  play: function(e) {
    const videoId = e.currentTarget.dataset.item.videoId
    // const time = e.currentTarget.dataset.item.viewTime
    // const videotitle = e.currentTarget.dataset.item.title
    // const watched = e.currentTarget.dataset.item.hasWatched
    // const rewardpoint = e.currentTarget.dataset.item.point
    this.requestVideoCount(videoId)
    wx.navigateTo({
      url: '/pages/ykyc-detail/ykyc-detail?videoId=' + videoId
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
      that.requestVideoList(that.data.currentpage)
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
        that.requestVideoList(that.data.currentpage)
      })
    }
  },
  reloaddata() {
    this.setData({
      currentpage: 1,
    }, function () {
      this.requestVideoList(this.data.currentpage)
    })
  },

  /**
   * 请求列表
   */
  requestVideoList(currentpage) {
    let that = this
    requestUtil.requestPost(urlConfig.VIDEO_LIST_URL, {
      "page": currentpage.toString(),
      "code": wx.getStorageSync('icode'),
      "tel": wx.getStorageSync('tel'),
    }, false).then((res) => {
      if (res.errCode == 0) {
        if (that.data.currentpage == 1) {
          that.setData({
            lists: res.data.list || [],
          })
        } else {
          var orignlist = this.data.lists
          that.setData({
            lists: orignlist.concat(res.data.list),
          })
        }
        that.setData({
          totalPage: res.data.totalPage,
          requestErr: false,
          firstloading: true
        })
      } else {
        that.setData({
          requestErr:  true
        })
      }
      const com = that.selectComponent('#tfresh')
      com.refreshend()
    }).catch( (err) => {
      that.setData({
        requestErr: true
      })
    })
  },

  requestVideoCount(videoid) {
    this.setData({
      currentVideoId: videoid
    })
    requestUtil.requestPost(urlConfig.VIDEO_COUNT_URL, {
      "code": wx.getStorageSync('icode'),
      "tel": wx.getStorageSync('tel'),
      "videoId": videoid,
    }, false).then((res) => {
      if (res.errCode == 0) {
        console.log("记录成功", videoid)
      }
    })
  },

  reshowCell() {
    const id = this.data.currentVideoId
    const list = this.data.lists
    for (var index in list) {
      const item = list[index]
      if (item.videoId == id) {
        item.hasWatched = 1
        item.playTimes += 1
        break;
      }
    }
    this.setData({
      lists: list
    })
  }
})