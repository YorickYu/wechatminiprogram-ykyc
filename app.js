//app.js
// App({
//   onLaunch: function () {
//     // 展示本地存储能力
//     var logs = wx.getStorageSync('logs') || []
//     logs.unshift(Date.now())
//     wx.setStorageSync('logs', logs)

//     // 登录
//     wx.login({
//       success: res => {
//         // 发送 res.code 到后台换取 openId, sessionKey, unionId
//       }
//     })
//     // 获取用户信息
//     wx.getSetting({
//       success: res => {
//         if (res.authSetting['scope.userInfo']) {
//           // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
//           wx.getUserInfo({
//             success: res => {
//               // 可以将 res 发送给后台解码出 unionId
//               this.globalData.userInfo = res.userInfo

//               // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
//               // 所以此处加入 callback 以防止这种情况
//               if (this.userInfoReadyCallback) {
//                 this.userInfoReadyCallback(res)
//               }
//             }
//           })
//         }
//       }
//     })
//   },
//   globalData: {
//     userInfo: null
//   }
// })

//app.js t
const baseUrl = require("config").requestPrefixUrl
const requestUtil = require("/utils/requestUtil")
const urlConfig = require("/utils/urlConfig")


/**
 * 本地缓存Storage： 
 * login      开启次数        int
 * couponGuide 优惠券引导     int
 * userGuide  用户引导        int
 * city       城市名称        string
 * cityId     城市ID         string
 * tel        手机号          string
 * icode      openId加密数据  string
 * loginFlag  sessionkey加密 string
 * token      票仓接口        string
 * currentCities 最近访问城市  array
 * location   当前经纬度      {lat: 0, lon: 0}  
 * vip        是否会员        int ( 0不是会员, 1是会员)
 */

App({

  onPageNotFound(res) {
    wx.switchTab({
      url: 'pages/home/home'
    })
  },
  onLaunch: function() {

    var login = wx.getStorageSync('login') || 0
    console.log('这是用户第', login + 1, '次开启小程序')
    wx.setStorageSync('login', login + 1)

    // globalData
    this.configData()
    // 登录
    this.configLogin()
    // 获取用户授权信息
    this.configAuth()
    // 自动更新版本
    this.updateVersion()
    // vip身份验证
    this.checkVIPId()
  },

  // 全局数据
  globalData: {
    userInfo: null,
    statusBarHeight: 0,
    navigationHeight: 0,
    tabbarHeight: 0,
    screenHeight: 0,
    screenWidth: 0,
  },

  // -------------------------------------------


  // 存储globaldata
  configData() {
    let that = this
    wx.getSystemInfo({
      success: res => {
        // console.log(res, 'systeminfo')
        that.globalData.screenHeight = res.screenHeight;
        that.globalData.screenWidth = res.screenWidth;
        that.globalData.statusBarHeight = res.statusBarHeight
        that.globalData.navigationHeight = res.statusBarHeight + 44
        that.globalData.tabbarHeight = res.screenHeight - res.windowHeight
      }
    })
  },

  // 检查授权
  configAuth() {
    let that = this
    wx.getSetting({
      success: res => {
        console.log("------当前小程序权限状态：-------")
        console.log(res.authSetting)
        console.log("保存城市:", wx.getStorageSync('city'), "cityId:", wx.getStorageSync("cityId"))
        console.log("------^^^^^^^^^^^^^^^^^-------")

        // UserInfo已经授权，可以直接调用  获取头像昵称，不会弹框，并自动登录
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: res => {
              // console.log("同意信息授权，获得信息:" , res)
              that.globalData.userInfo = res.userInfo
            }
          })
        }

        // 是否切换城市
        if (res.authSetting['scope.userLocation'] && wx.getStorageSync('cityId') != '') {
          that.getlocation()
        }
      }
    })
  },

  // 登录
  configLogin() {
    let that = this
    try {
      const value = wx.getStorageSync('loginFlag')
      if (value) {
        // 检查 session_key 是否过期
        wx.checkSession({
          success: function() {
            console.log("loginFlag可用", value)
          },
          fail: function() {
            that.doLogin() // 重新登录
          }
        })
      } else {
        this.doLogin() // 无session_key，作为首次登录
      }
    } catch (e) {
      console.log("catch error", e)
    }
  },
  doLogin() {
    this.log().then(res => {
      // 调用接口，将code传给服务器获取唯一登录态loginFlag
      // console.log("doLogin", res)
      // 发起网络请求
      requestUtil.requestPost(urlConfig.LOGIN_URL, {
        "code": res.code
      }, false).then((res) => {
        if (res.errCode == 0) {
          console.log("获得并保存loginflag", res.data.loginFlag)
          try {
            wx.setStorageSync('loginFlag', res.data.loginFlag)
          } catch (e) {
            console.log("catch error", e)
          }
        }
      })
    })
  },
  /**
   *微信登录 获取code值,并将code传递给服务器
   * @returns
   */
  log() {
    return new Promise(resolve => {
      wx.login({
        success(res) {
          if (res.errMsg === "login:ok") {
            resolve(res)
          } else {
            wx.showToast({
              title: '微信登录失败',
              icon: 'none',
            })
          }
        },
        fail() {
          wx.showToast({
            title: '微信登录接口调用失败',
            icon: 'none',
            duration: 1200
          })
        }
      })
    })
  },

  /**
   * 定位方法
   * 获取经纬度，城市名称
   */
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
            "key": "your location key",
            "location": locationString
          },
          method: 'GET',
          success: function(res) {

            const city = res.data.result.ad_info.city
            console.log("appjs 同意定位授权，获得城市:" + city)

            // 本地存储
            var storecity = wx.getStorageSync('city') || ''
            console.log("appjs 上次存储的城市:" + storecity)

            if (storecity != city) {
              // 之前存储过城市名，并发生改变，弹窗询问用户是否切换位置
              console.log('之前存储过城市名，并发生改变，弹窗询问用户是否切换位置')

              setTimeout(() => {
                wx.showModal({
                  title: '获取您的位置信息',
                  content: '检测到您当前所在城市：' + city + '，是否切换？',
                  confirmText: '切换城市',
                  confirmColor: '#db228a',
                  success(res) {
                    if (res.confirm) {
                      wx.setStorageSync('city', city)
                      if (that.locationChangedCallback) {
                        that.locationChangedCallback(city)
                      }
                    } else if (res.cancel) {
                      console.log('用户点击取消')
                    }
                  }
                })
              }, 5500);
            }
          },
          fail(e) {
            //
          }
        })

      },
      fail(e) {
        //
      }
    })
  },

  updateVersion() {
    const updateManager = wx.getUpdateManager()

    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      console.log("是否有新版本：" + res.hasUpdate)
    })

    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success(res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    })

    updateManager.onUpdateFailed(function () {
      // 新版本下载失败
    })
  },

  /**
   * VIP 身份验证
   */
  checkVIPId() {
    // 发起网络请求
    let that = this
    let tel = wx.getStorageSync('tel')
    let code = wx.getStorageSync('icode')
    if (tel && code) {
      requestUtil.requestPost(urlConfig.VIP_CHECK, {
        "tel": wx.getStorageSync('tel'),
        "code": wx.getStorageSync('icode'),
      }, false).then((res) => {
        if (res.errCode == 0) {
          wx.setStorageSync('vip', res.data.isVipMember)
          console.log("会员验证：", wx.getStorageSync("vip"))
        }
      })
    } else { // 暂无微信授权
      wx.setStorageSync('vip', 0)
      console.log("无icode，会员状态默认为：", wx.getStorageSync("vip"))
    }
  },
})