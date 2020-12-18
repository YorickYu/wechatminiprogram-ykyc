/**
 * 
 * triggerEvent('returnBind', { state: false })
 * state: 0 success 1 fail 2 cancel
 * 
 */

const requestUtil = require("../../utils/requestUtil")
const urlConfig = require("../../utils/urlConfig")

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
    telshow: false,
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
        telshow: true
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

    getPhoneNumber(e) {
      console.log(e)
      const msg = e.detail.errMsg
      if (msg == 'getPhoneNumber:ok') {
        // 成功获取data 和 iv
        this.requestBind(e.detail)
      }else {
        // 拒绝授权
        console.log("拒绝授权")
        this.triggerEvent('returnBind', { state: 1 })
      }
    },
    cancel() {
      console.log("取消")
      this.triggerEvent('returnBind', { state: 2 })
    },

    // 绑定手机号
    requestBind(e) {
      let that = this
      console.log(e.encryptedData)
      console.log(e.iv)
      console.log(wx.getStorageSync('loginFlag'))
      // 绑定手机
      requestUtil.requestPost(urlConfig.BIND_PHONE_URL, {
        "encryptedData": e.encryptedData,
        "iv": e.iv,
        "loginFlag": wx.getStorageSync('loginFlag'),
        "vaildCode": '',
        "tel": '',
      }, false).then((res) => {
        if (res.errCode == 0) {
          wx.showToast({ title: '绑定成功', 'icon': 'none' })

          try {
            wx.setStorageSync('icode', res.data.code)
            wx.setStorageSync('tel', res.data.tel)
          } catch (e) {
            console.log("catch error", e)
          }

          that.triggerEvent('returnBind', { state: 0 })
        }
        if (res.errCode == 8001) {
          console.log("微信未绑定手机号")
          that.triggerEvent('returnBind', { state: 1 })
        }
      })
    },
  }
})
