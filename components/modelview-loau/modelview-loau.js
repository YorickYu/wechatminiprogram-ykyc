
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    maskshow: false,
    locationshow: false,
  },

  /**
   * 生命周期函数
   */
  ready: function () {
    let that = this
    that.animation = wx.createAnimation({
      duration: 50,
      timingFunction: "ease-in-out",
      delay: 0
    })

    setTimeout(() => {
      that.setData({
        locationshow: true
      })
    }, 300);

    setTimeout(() => {
      that.scale()
    }, 600);
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 动画相关
    scale: function () {
      this.animation.scale(0.9).step()
        .scale(1.1).step()
        .scale(1).step()
      this.setData({ animation: this.animation.export() })
    },

    // 功能相关
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
            success: function (res) {
              const city = res.data.result.ad_info.city
              console.log("弹窗时同意定位授权，获得城市:" + city)
              // 本地存储
              wx.setStorageSync('city', city)
              
              that.triggerEvent('returnCity', {city: city})
            },fail() {
              wx.showModal({
                title: '提示',
                content: '请检查网络',
                showCancel: false
              })
            }
          })

        },fail(e) {
          wx.showModal({
            title: '提示',
            content: '请检查手机定位权限',
            showCancel: false
          })
        }
      })
    },

    // 打开设置页
    openSetting() {
      let that = this
      wx.openSetting({
        success(res) {
          if (res.authSetting['scope.userLocation']) {
            that.getlocation()
          }
        }
      })
    },

    // 用户授权
    // getUserInfo: function (e) {
    //   console.log(e, "index getUserInfo")
    //   getApp().globalData.userInfo = e.detail.userInfo
    //   this.setData({
    //     userInfo: e.detail.userInfo,
    //     hasUserInfo: true
    //   })
    // },
  }
})
