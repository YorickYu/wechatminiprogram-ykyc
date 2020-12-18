// pages/home/home.js
const timer = require('../../utils/wxTimer.js');
const requestUtil = require("../../utils/requestUtil")
const urlConfig = require("../../utils/urlConfig")
const router = require("../../utils/router")
var startPoint;


Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 会员判定
    vipStatus: wx.getStorageSync('vip') || 0,
    vipEndTime: '',

    /// 用户引导
    userGuideCoupon: (wx.getStorageSync('userGuide') || 0) == 0,
    userGuideActions: false,
    guideButtonRect: {}, // 记录浮层2中button的位置

    /// 悬浮
    buttonTop: 500,
    buttonLeft: 100,
    windowHeight: '',
    windowWidth: '',
    timeStamp: 0, // user-guide按钮两次点击时间记录

    /// 广告
    adstop: getApp().globalData.navigationHeight,
    adsource: {
      title: "",
      imageUrl: "",
      out_url: "",
      showTime: 5
    },
    showads: false, // 控制广告页显示
    timercontroller: timer,
    wxTimerList: {},
    requestErr: false,

    /// -----------------------------------
    showdiscount: false, // 控制折扣列表
    fakebar: false, // 控制tabbar
    height: getApp().globalData.tabbarHeight,

    authorizelocation: false, // 控制定位授权页面
    escapetap: false, // 授权流程屏蔽页面点击事件用
    discounticon_n: "../../images/home/detail-normal.png", // 当前折扣展开图
    discounticon_s: "../../images/home/detail-selected.png", // 当前折扣展开图
    anchorrect: {}, // detail-normal.png 元素位置
    title: 'OPENSOURCE',
    loadingSuccess: false,
    /// -----------------------------------

    carousels: [], // banners
    activities: [],
    cinemaModel: {},
    discountInfoModel: {},
    memberShipList: [], // 会员页展位
    userInfo: {},
    cityname: wx.getStorageSync('city') || '定位失败',

  },

  // 接收app.js的回调
  callbacks() {
    // 首次开启程序，授权后获取定位信息，可能会在 Page.onLoad 之后才返回
    // 所以此处加入 callback 以防止这种情况

    getApp().locationChangedCallback = res => {
      console.log("home locationChangedCallback")

      this.setData({
        cityname: res
      })

      // 切换城市成功
      this.requestCityId(res)

    }
  },

  // 定位回传
  locationmaskviewreturn(e) {
    let that = this
    console.log(e.detail.city, "home maskviewreturn")
    that.setData({
      cityname: e.detail.city,
      authorizelocation: false,
      fakebar: false,
      escapetap: false,
    }, function () {
      wx.showTabBar({
        success() {
          console.log('显示成功')
        }
      })
      that.requestCityId(e.detail.city)
    })
  },

  conformauth() {
    let that = this

    wx.getSetting({
      success(res) {

        // 确认定位授权弹窗
        if (!res.authSetting['scope.userLocation'] || wx.getStorageSync('cityId') == '') {
          wx.hideTabBar({
            success() {
              console.log('隐藏成功')
              that.setData({
                fakebar: true,
                escapetap: true
              })
            }
          })
          wx.authorize({
            scope: 'scope.userLocation',
            success() {
              that.getlocation()
            },
            fail() {
              if (!that.data.authorizelocation) {
                that.setData({
                  authorizelocation: true
                })
              }
            }
          })
        } else {
          that.configadscount()
        }
      }
    })
  },

  getlocation() {
    let that = this

    wx.getLocation({
      type: 'gcj02',
      success(res) {
        const latitude = res.latitude
        const longitude = res.longitude
        wx.setStorageSync('location', {
          latitude: res.latitude,
          longitude: res.longitude
        })
        // 反地理编码
        var locationString = latitude + "," + longitude;
        wx.request({
          url: 'https://apis.map.qq.com/ws/geocoder/v1/?location=',
          data: {
            "key": "PMCBZ-F4BCW-TSNRR-OHWNP-WM763-R4BBZ",
            "location": locationString
          },
          method: 'GET',
          success: function(res) {

            const city = res.data.result.ad_info.city
            console.log("第一次定位授权，获得城市:" + city)

            try {
              wx.setStorageSync('city', city)
            } catch (e) {
              console.log("catch error", e)
            }

            that.setData({
              cityname: city,
              fakebar: false,
              escapetap: false,
            }, function() {
              wx.showTabBar({
                success() {
                  console.log('显示成功')
                }
              })
              that.requestCityId(city)
            })

          },
          fail(e) {
            wx.showModal({
              title: '提示',
              content: '请检查网络',
              showCancel: false
            })
            that.setData({
              authorizelocation: true
            })
          }
        })

      },
      fail(e) {
        wx.showModal({
          title: '提示',
          content: '请检查手机定位权限',
          showCancel: false
        })
        that.setData({
          authorizelocation: true
        })
      }
    })
  },
  discountaction() {
    if (this.data.showdiscount) {
      this.dismissdiscount()
    } else {
      this.showdiscount()
    }
  },
  handletouchtart(e) {
    if (this.data.userGuideCoupon) {
      return
    }
    this.discountaction()
  },
  // VIP跳转
  switchtovip(e) {
    let id = e.currentTarget.dataset.item
    wx.navigateTo({
      url: '/pages/purchase-vip/purchase-vip?id=' + id,
    })
  },
  guidenext() {
    let that = this
    const query = wx.createSelectorQuery()
    query.select('.buyticket').boundingClientRect(function (rect) {

      console.log("buyticket", rect)

      that.setData({
        guideButtonRect: rect,
        userGuideCoupon: false,
        userGuideActions: true
      }, function () {
        that.discountaction()
      })
    }).exec()
    
  },
  guidefinish() {
    this.setData({
      userGuideActions: false
    },function() {
      wx.setStorageSync("userGuide", 1)
    })
  },
  // 折扣列表展示
  showdiscount() {
    let that = this
    console.log("折扣列表展示")

    const query = wx.createSelectorQuery()
    query.select('#anchor').boundingClientRect(function(rect) {

      // console.log("anchorrect", that.data.anchorrect.top)
      // rect.right // 节点的右边界坐标
      // rect.top // 节点的上边界坐标
      // rect.bottom // 节点的下边界坐标
      // rect.width // 节点的宽度
      // rect.height // 节点的高度

      that.setData({
        anchorrect: rect,
        showdiscount: true,
        userGuideCoupon: (wx.getStorageSync('userGuide') || 0) == 0,
      })
    }).exec()

    // 弹出动画
    that.animation = wx.createAnimation({
      duration: 0,
      timingFunction: 'step-start',
    })
    that.animation.opacity(0).step()
    that.setData({
      animation: that.animation.export()
    }, function() {
      that.animation = wx.createAnimation({
        duration: 500,
        timingFunction: 'ease',
        delay: 200
      })
      that.animation.opacity(1).step()
      setTimeout(function() {
        that.setData({
          animation: that.animation.export()
        })
      }, 100)
    })
  },

  dismissdiscount() {

    this.setData({
      showdiscount: false,
    })

  },

  configfloatview() {
    let that = this;
    wx.getSystemInfo({
      success: function(res) {
        console.log(res);
        // 高度 宽度 单位为px
        that.setData({
          buttonTop: res.windowHeight - 150,
          buttonLeft: res.windowWidth - 70,
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // wx.showTabBar({}) // 重置底部tabbar状态

    this.callbacks() // 切换城市时监听app.js的定位回调
    this.conformauth() // 检查定位授权
    this.configfloatview() // 确定新手引导浮动view的位置

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
   
    this.requestHome()
    this.setData({
      cityname: wx.getStorageSync('city') || '定位失败',
      vipStatus: wx.getStorageSync('vip') || 0
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    this.setData({
      showads: false,
      userGuideCoupon: false
    },function() {
      this.dismissdiscount()
    })
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
    this.shareAddPoint()
    return {
      title: "最新、最优惠的电影在这等你来看！",
    }
  },

  shareAddPoint() {
    console.log("转发送积分")
    let that = this
    requestUtil.requestPost(urlConfig.POINT_ADD_URL, {
      "code": wx.getStorageSync('icode'),
      "tel": wx.getStorageSync('tel'),
      "videoId": this.data.videoid,
      "type": "3", // (3 转发）
    }, false).then((res) => {
      if (res.errCode == 0) {
        that.data.userInfo.point += res.data.rewardScore
      }
    })
  },

  // 广告跳过
  adsdismiss() {
    this.setData({
      showads: false
    })
  },
  configadscount() {
    let that = this

    that.requestGuide().then(res => {
      that.setData({
        adsource: res.data,
      })
      const time = "00:00:0" + res.data.showTime || "5"
      that.setData({
        showads: true,
        timercontroller: new timer({
          beginTime: time,
          complete: function() {
            that.setData({
              showads: false
            })
            that.data.timercontroller.stop();
          }
        })
      })
      that.data.timercontroller.start(this);
    })
  },
  buyticket: function() {
    const cinemaId = this.data.cinemaModel.cinemaId
    wx.navigateTo({
      url: '/pages/cinemaPlan/cinemaPlan?cinemaId=' + cinemaId,
    })
  },
  tocitylist(e) {
    wx.navigateTo({
      url: '/pages/city/city',
    })
  },
  tomovielist() {
    wx.navigateTo({
      url: '/pages/locate/locate',
    })
  },
  tocoupon(e) {
    wx.navigateTo({
      url: '/pages/coupon/coupon',
    })
  },
  toscore(e) {
    console.log("积分")
    wx.navigateTo({
      url: '/pages/credits-exchange/credits-exchange'
    })
  },
  moreactivities(e) {
    wx.navigateTo({
      url: '/pages/activity-list/activity-list',
    })
  },

  toactivitydetail(e) {
    const item = e.detail
    router.handle(item.type, item.url, item.param)
  },

  openads(e) {
    /**
     * 广告页点击需求暂时不做
     const url = this.data.adsource.out_url
    if (!(url.trim().length == 0)) { // url为空不能跳转
      wx.navigateTo({
        url: '/pages/outerweb/outerweb?outurl=' + url,
      })
    }
     */
  },
  bannernavigate(e) {
    console.log(e)
    const type = e.currentTarget.dataset.item.linkType
    const url = e.currentTarget.dataset.item.url
    const param = e.currentTarget.dataset.item.parameter
    // router.handle(2, "activityDetail", { "type": "2" , id: 144})
    router.handle(type, url, param)
  },

  /**
   * 接口
   */

  // 获取城市id
  requestCityId(cityname) {
    let that = this
    requestUtil.requestPost("city/getCityId", {
      "cityName": cityname,
    }, false).then((res) => {
      if (res.errCode == 0) {
        try {
          wx.setStorageSync('cityId', res.data.cityId)
        } catch (e) {
          console.log("catch error", e)
        }
        that.requestHome().then(res => {
          if ((wx.getStorageSync('userGuide') || 0) == 0) {
            that.showdiscount()
          }
        })
      }
    })
  },

  // 获取轮播图
  requestGuide() {
    return new Promise(resolve => {
      requestUtil.requestPost("guide/getGuideInfo", {}).then((res) => {
        if (res.errCode == 0 && res.data) {
          resolve(res)
        }
      })
    })
  },

  requestHome() {
    return new Promise(resolve => {

      let that = this
      const location = wx.getStorageSync('location')
      requestUtil.requestPost(urlConfig.INDEX_URL, {
        'code': wx.getStorageSync('icode'),
        'cityId': wx.getStorageSync('cityId'),
        'tel': wx.getStorageSync('tel'),
        'lat': location.latitude,
        'lon': location.longitude,
      }, false).then((res) => {
        if (res.errCode == 0) {
          
          let info = res.data.userInfo || {
            couponCount: 0, // 剩余优惠券数量
            point: 0, // 当前积分
            maxDiscount: 0, // 当前折扣
            memberShipInfo: []
          }
          // 会员资格确认
          if (info.memberShipInfo.length > 0) {
            for (var i = 0; i < info.memberShipInfo.length; i++) {
              const item = info.memberShipInfo[i]
              if (item.memberShipId == 1) { // 判断是否为VIP尊享会员
                that.setData({
                  vipStatus: 1,
                  vipEndTime: item.endTime
                }, function () {
                  wx.setStorageSync('vip', 1)
                })
                break
              }
            }
          }

          that.setData({
            carousels: res.data.carouselList,
            activities: res.data.activityList || [],
            cinemaModel: res.data.cinemaModel || {
              cinemaId: "0",
              cinemaName: "SFC上海影城",
              distinct: "0",
              miniPrice: "0",
              addPoint: true,
              canUseDiscount: true,
              canUserCoupon: true,
            },
            discountInfoModel: res.data.discountInfoModel || {
              remineDay: "0",
              list: [{
                planCount: 0, // 观影次数
                discount: 0 // 获得折扣
              }],
              newUserAward: {
                type: 1,
                discount: 9.9
              }
            },
            memberShipList: res.data.memberShipList || [],
            userInfo: info,
            requestErr: false
          })
          
          
          resolve() // promise 回调
        } else {
          that.setData({
            requestErr: true
          })
        }
      }).catch(() => {
        that.setData({
          requestErr: true
        })
      })
    }) // promise end
  },
  reloaddata() {
    this.requestHome()
  },
  bannerImageLoadSuccess(e) {
    this.setData({
      loadingSuccess: true
    })
  },

  // 浮动按钮操作
  buttonStart: function(e) {
    this.setData({
      timeStamp: e.timeStamp
    })
    startPoint = e.touches[0]
  },
  buttonMove: function(e) {
    var endPoint = e.touches[e.touches.length - 1]
    var translateX = endPoint.clientX - startPoint.clientX
    var translateY = endPoint.clientY - startPoint.clientY
    startPoint = endPoint
    var buttonTop = this.data.buttonTop + translateY
    var buttonLeft = this.data.buttonLeft + translateX
    //判断是移动否超出屏幕
    if (buttonLeft + 50 >= this.data.windowWidth) {
      buttonLeft = this.data.windowWidth - 50;
    }
    if (buttonLeft <= 0) {
      buttonLeft = 0;
    }
    let _top = this.data.adstop
    if (buttonTop <= _top) {
      buttonTop = _top
    }
    if (buttonTop + 50 >= this.data.windowHeight) {
      buttonTop = this.data.windowHeight - 50;
    }
    this.setData({
      buttonTop: buttonTop,
      buttonLeft: buttonLeft
    })
  },
  buttonEnd: function(e) {
    const startTime = this.data.timeStamp
    const endTime = e.timeStamp
    let duration = endTime - startTime
    if (duration < 100) { // 两次操作间隔小于100ms 视为单击
      wx.navigateTo({
        url: '/pages/guide/guide',
      })
    }
  },
  handletouchmove(e) {
    return
  },
})