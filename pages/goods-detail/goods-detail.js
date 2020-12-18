const requestUtil = require("../../utils/requestUtil")
const urlConfig = require("../../utils/urlConfig")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 手机号授权
    authorizetel: false,
    loadingSuccess: false,
    contentheight: 0,


    goodsid: 0, // id
    productInfo: {
      name: "",
      point: 0,
      poster: "",
      regular: "",
      productImgs: [],
    },

    expository: [], // 商品说明
    gallery: [{
      index: 0,
      img: "",
      load: false
    }], // 商品图集
  },

  requestDetail() {
    let that = this
    requestUtil.requestPost(urlConfig.GOODS_INFO_URL, {
      "productId": that.data.goodsid,
    }, false).then((res) => {
      if (res.errCode == 0 && res.data) {
        that.setData({
          productInfo: res.data
        }, function() {
          // 处理商品说明
          let regular = res.data.regular
          let json = JSON.parse(regular)
          let ruleList = json['list']

          // 处理图片
          var _gal = []
          let imgs = res.data.productImgs == null ? [] : res.data.productImgs
          for (var i = 0; i < imgs.length; i++) {
            const item = {
              index: i,
              img: imgs[i],
              load: false
            }
            _gal.push(item)
          }

          that.setData({
            expository: ruleList,
            gallery: _gal
          })
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this
    that.setData({
      goodsid: options.id
    }, function() {
      that.requestDetail()
    })

    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          contentheight: res.windowHeight - 75 - getApp().globalData.navigationHeight
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

  // 顶部封面图加载
  posterImageLoadSuccess() {
    this.setData({
      loadingSuccess: true
    })
  },

  // 详情图组加载
  productImagesLoadSuccess(e) {
    // console.log("详情图组加载", e)
    const idx = e.currentTarget.dataset.aindex
    var _gal = this.data.gallery
    for (var i = 0; i < _gal.length; i++) {
      let target = _gal[i]
      if (target.index == idx) {
        target.load = true
        break
      }
    }
    this.setData({
      gallery: _gal
    })

  },

  bindtelmaskviewreturn(e) {
    const result = e.detail.state

    if (result == 0 || result == 2) {
      this.setData({
        authorizetel: false
      })
    } else if (result == 1) { // 绑定失败，通过手机验证码绑定
      wx.navigateTo({
        url: '/pages/regist/regist',
      })
    }
  },

  formSubmit(e) {
    let that = this
    const _phone = wx.getStorageSync('tel')
    console.log(_phone)
    if (_phone == "empty") {
      that.setData({
        authorizetel: true
      })
      return
    }

    wx.showModal({
      title: '商品兑换提示',
      content: '该商品需消耗 ' + that.data.productInfo.point +' 积分，是否确认兑换？',
      confirmText: '兑换',
      confirmColor: '#db228a',
      success(res) {
        if (res.confirm) {
          // 获取表单id
          var formId = e.detail.formId
          // 非真机运行时 formId 应该为 the formId is a mock one
          console.log('表单id:', formId)
          that.goodsExchange(formId)
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  },

  goodsExchange(formId) {
    let that = this
    requestUtil.requestPost(urlConfig.GOODS_EXCHANGE_URL, {
      "productId": that.data.goodsid,
      "tel": wx.getStorageSync('tel'),
      "code": wx.getStorageSync('icode'),
      "formId": formId,
      "count": 1,
      "payType": 1,
    }, false).then((res) => {
      if (res.errCode == 0) {
        const _productName = res.data.name
        const _time = res.data.crtTime
        const _point = res.data.point

        wx.redirectTo({
          url: '/pages/credits-exchange-success/credits-exchange-success?name=' + _productName + '&time=' + _time + '&point=' + _point,
        })

      } else {
        // if (res.errMsg == "非法登录") {

        // }
        const _msg = res.errMsg == null ? '兑换失败' : res.errMsg
        wx.showToast({
          title: _msg,
          icon: 'none',
        })
      }
    })
  },

})