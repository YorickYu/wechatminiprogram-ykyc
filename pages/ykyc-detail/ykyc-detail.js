const timer = require('../../utils/wxTimer.js');
const requestUtil = require("../../utils/requestUtil")
const urlConfig = require("../../utils/urlConfig")
const router = require("../../utils/router")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    iscounting: false, // 是否在倒计时
    iscomplete: false, // 是否完成倒计时，获得积分
    isFailed: false,
    failMsg: '',
    alreadyWatch: false, // 是否已经看过
    title: "",
    videoid: "",
    sourcepath: "",
    rewardtime: "", // 观看时长后获得积分
    rewardpoint: "", // 获得多少积分

    // router
    linkType:  0,
    parameter: {},
    routeUrl: "",

    timercontroller: timer,
    wxTimerList: {},
    videoheight: 0,
    fullscreenmode: false,

  },
  playaction(e) {
    let that = this
    var begintime = "00:00:00"
    if (!that.data.alreadyWatch && that.data.rewardpoint > 0 && !that.data.iscounting) {
      console.log("开始倒计时")
      begintime = "00:00:0" + that.data.rewardtime
      that.setData({
        iscounting: true
      })
      that.settleTimer(begintime)
    } else if (that.data.iscounting && !that.data.iscomplete) {
      console.log("再次开始倒计时", this.data.wxTimer)
      begintime = this.data.wxTimer
      that.settleTimer(begintime)
    } 
   
  },
  settleTimer(begintime) {
    let that = this
    that.setData({
      timercontroller: new timer({
        beginTime: begintime,
        complete: function () {
          that.reqestAddPoint()
          that.data.timercontroller.stop()
        }
      })
    })
    that.data.timercontroller.start(this)
  },
  pauseaction() {
    if (this.data.iscounting) {
      this.data.timercontroller.stop()
    }
  },
  endaction() {
    console.log("endaction")
    if (this.data.fullscreenmode) { // 如果是全屏状态播放完成后自动退出全屏
      this.videoContext.exitFullScreen()
    }

    let that = this
    let type = that.data.linkType
    let url = that.data.routeUrl
    let param = that.data.parameter
    if (type == 0) {
      return
    }
    wx.showModal({
      title: '购票提醒',
      content: '视频已播完，是否立即购买影票？',
      confirmText: '立即购票',
      confirmColor: '#dc228a',
      cancelText: '我再想想',
      success(res) {
        if (res.confirm) {
          console.log('立即购票')
          router.handle(type, url, param)
        } else if (res.cancel) {
          console.log('我再想想')
        }
      }
    })

  },
  fullscreenaction(e) {
    const fullscreen = e.detail.fullScreen
    this.setData({
      fullscreenmode: fullscreen
    })
  },
  loaderror(e) {
    if (this.data.iscounting) {
      this.data.timercontroller.stop()
    }
    wx.showToast({
      title: "啊哦！视频出错了…",
      icon: 'none',
      duration: 2000
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
          videoheight: res.screenHeight - getApp().globalData.navigationHeight
        })
      }
    })


    that.requestVideoDetail(options.videoId)

    // that.setData({
    // rewardtime: options.time,
    // title: options.title,
    // videoid: options.videoid,
    // alreadyWatch: options.watched=="1" ? true : false,
    // rewardpoint: options.rewardpoint
    // })

    // const pages = getCurrentPages();
    // const prevPage = pages[pages.length - 2];  //上一个页面
    // const lists = prevPage.data.lists
    // for (var index in lists) {
    //   const item = lists[index]
    //   if (item.videoId == options.videoid) {
    //     that.setData({
    //       sourcepath: item.videoSrc
    //     })
    //     break
    //   }
    // }
  },

  requestVideoDetail(videoid) {
    let that = this
    requestUtil.requestPost(urlConfig.VIDEO_DETAIL_URL, {
      "videoId": videoid,
      "code": wx.getStorageSync('icode'),
      "tel": wx.getStorageSync('tel'),
    }).then((res) => {
      if (res.errCode == 0) {
        that.setData({
          rewardtime: res.data.viewTime || 5,
          title: res.data.title,
          videoid: res.data.videoId,
          alreadyWatch: res.data.hasWatched == 1 ? true : false,
          rewardpoint: res.data.point,
          sourcepath: res.data.videoSrc,
          linkType: res.data.linkType || 0,
          parameter: res.data.parameter,
          routeUrl: res.data.url
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.videoContext = wx.createVideoContext('myVideo')
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
    // 退出页面销毁计时器
    if (this.data.iscounting) {
      this.data.timercontroller.stop()
    }
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
    var shareTitle = "我正在看" + this.data.title +"视频，看视频还能赢海量积分！"
    return {
      title: shareTitle,
    }
  },

  reqestAddPoint() {
    let that = this
    if (that.data.rewardpoint == 0) {
      console.log("这个视频不获取积分")
      return
    }
    requestUtil.requestPost(urlConfig.POINT_ADD_URL, {
      "code": wx.getStorageSync('icode'),
      "tel": wx.getStorageSync('tel'),
      "videoId": this.data.videoid,
      "type": "2", // (1.下单,2.看视频）
    }, false).then((res) => {
      if (res.errCode == 0) {
        that.setData({
          rewardpoint: res.data.rewardScore,
          iscomplete: true
        })

        // 刷新外部列表
        //当前页面
        let pages = getCurrentPages()
        //上一页面
        let prevPage = pages[pages.length - 2]
        if (prevPage.route == "pages/ykyc/ykyc") {
          prevPage.reshowCell()
        }

      } else {
        // 当日获取积分已达上线
        that.setData({
          iscomplete: true,
          isFailed: true,
          failMsg: res.errMsg || '出错了 @_@'
        })
      }
    })
  },
})