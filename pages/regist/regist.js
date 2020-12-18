
const timer = require('../../utils/wxTimer.js');
const requestUtil = require("../../utils/requestUtil")
const urlConfig = require("../../utils/urlConfig")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    timercontroller: timer,
    wxTimerList: {},

    send: true,
    alreadySend: false,
    disabled: true,
    phoneNum: '',
    code: '',
    imageCode: '',
    uid: '',
    base64ImgUrl: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.hideShareMenu()
    this.renewImageCode()
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
  

  // 输入手机号
  inputPhoneNum: function(e) {
    let number = e.detail.value
    this.setData({
      phoneNum: number
    })
  },

  // 发送验证码
  requestSendMsg(tel) {
    let that = this
    requestUtil.requestPost(urlConfig.MSG_CODE_URL, {
      "tel": tel,
      "channel": '',
      "uid": that.data.uid,
      "captchaCode": that.data.imageCode,
    }).then((res) => {
      if (res.errCode == 0) {
        wx.showToast({
          title: '验证码已发送',
          icon: 'none',
        })
        that.timerstart()
      }else if (res.errCode == 800) {
        wx.showToast({
          title: res.errMsg,
          icon: 'none',
        })
      }
    })
  },

  // 倒计时
  timerstart() {
    // 开始倒计时
    let that = this
    that.setData({
      alreadySend: true,
      send: false,
      timercontroller: new timer({
        beginTime: "00:00:59",
        complete: function () {
          that.setData({
            alreadySend: false,
            send: true
          })
          that.data.timercontroller.stop();
        }
      })
    })
    that.data.timercontroller.start(this);
  
  },

  // 获取验证码
  sendMsg: function() {
    let that = this
    if (this.data.alreadySend) {
      return
    }

    var phoneNum = this.data.phoneNum;
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (!myreg.test(phoneNum)) {
      wx.showToast({
        title: '请填写正确手机号',
        icon: 'none',
      })
      return
    }

    var imageCode = this.data.imageCode
    if (imageCode.length == 0) {
      wx.showToast({
        title: '请填写图形验证码',
        icon: 'none',
      })
      return
    }

    // 发送验证码
    this.requestSendMsg(phoneNum)

  },

  // 输入验证码
  inputCode: function(e) {
    this.setData({
      code: e.detail.value
    })
    this.activeButton()
  },

  // 按钮
  activeButton: function() {
    let {
      phoneNum,
      code
    } = this.data
    if (phoneNum && code) {
      this.setData({
        disabled: false
      })
    } else {
      this.setData({
        disabled: true
      })
    }
  },

  // 绑定手机号
  onSubmit: function() {

    let that = this

    requestUtil.requestPost(urlConfig.BIND_PHONE_URL, {
      "encryptedData": '',
      "iv": '',
      "loginFlag": wx.getStorageSync('loginFlag'),
      "vaildCode": that.data.code,
      "tel": that.data.phoneNum,
    }, false).then((res) => {
      if (res.errCode == 0) {

        try {
          wx.setStorageSync('icode', res.data.code)
          wx.setStorageSync('tel', res.data.tel)
        } catch (e) {
          console.log("catch error", e)
        }
        // 成功后返回
        that.successBack()
      }else {
        var msg = (res.errMsg != null) ? res.errMsg : "绑定失败"
        wx.showToast({ title: msg, 'icon': 'none' })
      }
    })
  
  },

  successBack() {
    //当前页面
    let pages = getCurrentPages()
    let prevPage = pages[pages.length - 2]
    if (prevPage.route == "pages/mine/mine") {
      wx.redirectTo({
        url: "/pages/already-regist/already-regist",
      })
      return
    }else {
      wx.navigateBack({
        delta: 1
      })
      prevPage.successFromRegist()
    }
  },

  // js base64 解码图片
  getBase64ImageUrl: function (imagestring) {
    /// 获取到base64Data
    var base64Data = imagestring
    /// 通过微信小程序自带方法将base64转为二进制去除特殊符号，再转回base64
    base64Data = wx.arrayBufferToBase64(wx.base64ToArrayBuffer(base64Data))
    /// 拼接请求头，data格式可以为image/png或者image/jpeg等，看需求
    const base64ImgUrl = "data:image/png;base64," + base64Data
    /// 刷新数据
    this.setData({
      base64ImgUrl: base64ImgUrl
    })
  },

  renewImageCode() {
    this.loadImageCode()
  },

  loadImageCode() {
    let that = this
    console.log(that.data.code)
    console.log(that.data.phoneNum)
    requestUtil.requestPost(urlConfig.GET_IMAGE_CODE, {
      "channel" : '',
      "uid": '',
    }, false).then((res) => {
      if (res.errCode == 0) {
        that.setData({
          uid: res.data.uid,
        }, function() {
          that.getBase64ImageUrl(res.data.image)
        })
      } 
    })
  },

  inputImageCode(e) {
    this.setData({
      imageCode: e.detail.value
    })
    console.log(this.data.imageCode)
  }
})