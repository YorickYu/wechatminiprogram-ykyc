// pages/cinemaPlan/cinemaPlan.js
const requestUtil = require("../../utils/requestUtil")
const urlConfig = require("../../utils/urlConfig.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    posterimgs: [],
    alreadyLoaded: false,
    authorizetel: false,
    registerDialog: false, //注册对话框默认不显示
    showModal: false, //模态框默认隐藏
    selectIndex: 0,
    dateIndex: 0,
    isSend: false, //是否发送了短信
    getcode: '获取验证码',
    timer: '', //
    countDownNum: '59', //倒计时初始值
    latitude: '',
    longitude: '',
    phone: '',

    planId: 0,
    order: null,

    // 图形验证码
    imageCode: '',
    uid: '',
    base64ImgUrl: '',
    hasDiscountPrice: false
  },

  bindtelmaskviewreturn(e) {
    const result = e.detail.state
    this.setData({
      authorizetel: false
    })
    if (result == 0 || result == 2) {
      
    } else if (result == 1) { 
      // 绑定失败，通过手机验证码绑定
      this.showRegisterModal();
    }
  },

  movieImageLoadSuccess(e) {
    const _index = e.currentTarget.dataset.aindex
    var _posterimgs = this.data.posterimgs
    _posterimgs[_index] = 1
    this.setData({
      posterimgs: _posterimgs
    })
  },
  // regist页面绑定手机成功后返回
  // successFromRegist() {
  //   this.setData({
  //     authorizetel: false
  //   })
  // },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      cinemaId: options.cinemaId,
      movieId: options.movieId || 0,
      posterimgs: this.data.posterimgs
    })
    this.getPlanList()    
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
    return {
      title: "这家影院还不错，快来选个场次看吧！",
    }
  },

  toMovieDetail: function() {
    // wx.navigateTo({
    //   url: '../movie-detail/movie-detail?movieId=' + this.data.resultData.movieList[this.data.selectIndex].movieId
    // })
  },
  listenSwiper: function(e) {
    //打印信息
    var that = this;
    //console.log(e.detail.current);
    this.setData({
      selectData: that.data.moviesArr[e.detail.current],
      selectIndex: e.detail.current,
      planList: that.data.moviesArr[e.detail.current].planList[0].sessionList,
      dateIndex: 0,
    })
  },
  dateSecect: function(e) {
    var that = this;
    var index = parseInt(e.currentTarget.dataset.index);
    this.setData({
      planList: that.data.moviesArr[that.data.selectIndex].planList[index].sessionList,
      dateIndex: index,
    })
  },
  buyTicket: function(e) {
    // 验证手机号是否绑定
    var tel = wx.getStorageSync("tel");
    if (tel === "empty") {      
      this.setData({
        authorizetel: true
      })
      return;
    }
    
    //判断有没有未支付订单
    this.findUnpayOrder(e);
  },
  getPlanList: function() {
    var that = this
    requestUtil.requestPost(urlConfig.CINEMA_DETAIL_URL, {
      "cinemaId": that.data.cinemaId,
      "code": wx.getStorageSync('icode'),
      "tel": wx.getStorageSync('tel'),
    }, false).then((res) => {
      if (res.errCode == 0) {
        if (res.data == null || res.data.movieList == null) {
          wx.showModal({
            title: '提示',
            content: '该影院暂无排期',
            showCancel: false,
            confirmText: '确定',
            success(res) {
              if (res.confirm) {
                wx.navigateBack({
                  delta: 1
                });
              }
            }
          })
          return;
        }
        var defaultIndex = 0
        var imgarr = new Array(res.data.movieList.length)

        for (var j = 0; j < res.data.movieList.length; j++) {
          if (res.data.movieList[j].movieId == this.data.movieId) {
            defaultIndex = j;
          }
          // 海报默认图
          imgarr[j] = 0
        }
        that.setData({
          alreadyLoaded: true,
          resultData: res.data,
          moviesArr: res.data.movieList,
          firstSelectIndex: defaultIndex,
          selectIndex: defaultIndex,
          selectData: res.data.movieList[defaultIndex],
          planList: res.data.movieList[defaultIndex].planList[0].sessionList,
          dateIndex: 0,
          latitude: res.data.lat,
          longitude: res.data.lon,
          posterimgs: that.data.posterimgs.length==0 ? imgarr : that.data.posterimgs,
          hasDiscountPrice: res.data.hasDiscountPrice
        })
        
      } else {
        wx.showToast({
          title: res.errMsg,
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  //确定-未支付订单对话框
  onConfirm: function() {
    var that = this
    that.cancelOrder(that.data.planId);
    this.hideModal();
  },
  //取消-未支付订单对话框
  onCancel: function() {
    var that = this
    this.hideModal()
    if (that.data.order.payType == "empty") { //到支付确认页面
      wx.navigateTo({
        url: "../orderConfirm/orderConfirm?orderId=" + that.data.order.orderNo
      })
    } else { //有支付订单,切已调过支付但未付款
      that.unPayOrder(that.data.order.orderNo)
    }
  },
  hideModal: function() {
    this.setData({
      showModal: false
    });
  },
  showModal: function() {
    this.setData({
      showModal: true
    });
  },
  //注册提醒——显示
  showRegisterModal: function() {
    this.setData({
      registerDialog: true,
      phone: ''
    })
    this.renewImageCode()
  },
  //注册提醒——关闭
  hideRegisterModal: function() {
    this.setData({
      registerDialog: false,
    })
  },
  //获取手机号
  phoneInput: function(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  sendMsg: function() {
    let that = this;
    if (that.data.isSend) return;
    var phone = that.data.phone;
    if (!phone) {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    if (phone.length != 11) {
      wx.showToast({
        title: '手机号不对',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    var imageCode = this.data.imageCode
    if (imageCode.length == 0) {
      wx.showToast({
        title: '请填写图形验证码',
        icon: 'none',
      })
      return
    }

    requestUtil.requestPost(urlConfig.MSG_CODE_URL, {
      "tel": phone,
      "channel": '',
      "uid": that.data.uid,
      "captchaCode": that.data.imageCode,
    }).then((result) => {
      console.log("短信注册", result)
      wx.hideLoading();
      if (result.errCode == 0) {
        wx.showToast({
          title: '短信发送成功',
          icon: 'none',
          duration: 2000
        })
        this.setData({
          isSend: true,
          getcode: that.data.countDownNum + '秒后重发'
        });
        this.countDown();
      } else {
        wx.showToast({
          title: result.errMsg,
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  countDown: function() { //倒计时
    let that = this;
    let countDownNum = that.data.countDownNum; //获取倒计时初始值
    that.setData({
      timer: setInterval(function() { //这里把setInterval赋值给变量名为timer的变量
        //每隔一秒countDownNum就减一，实现同步
        countDownNum--;
        //然后把countDownNum存进data，好让用户知道时间在倒计着
        that.setData({
          countDownNum: countDownNum,
          getcode: countDownNum + '秒后重发'
        })
        //在倒计时还未到0时，这中间可以做其他的事情，按项目需求来
        if (countDownNum == 0) {
          //这里特别要注意，计时器是始终一直在走的，如果你的时间为0，那么就要关掉定时器！不然相当耗性能
          //因为timer是存在data里面的，所以在关掉时，也要在data里取出后再关闭
          clearInterval(that.data.timer);
          //关闭定时器之后，可作其他处理codes go here
          that.setData({
            isSend: false,
            getcode: '获取验证码',
            countDownNum: '59',
          })
        }
      }, 1000)
    })
  },
  /**
   * 提交验证
   */
  submitRegister: function(e) {
    var phone = e.detail.value.phone;
    if (!phone) {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    if (phone.length != 11) {
      wx.showToast({
        title: '手机号不对',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    var code = e.detail.value.code;
    if (!code) {
      wx.showToast({
        title: '请输入验证码',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    const loginFlag = wx.getStorageSync('loginFlag')
    requestUtil.requestPost("bindPhone", {
      "loginFlag": loginFlag,
      "vaildCode": code,
      "tel": phone
    }).then((result) => {
      console.log("短信注册", result)
      wx.hideLoading();
      if (result.errCode === 0) {
        wx.showToast({
          title: '注册成功',
          icon: 'none',
          duration: 2000
        })
        wx.setStorageSync('tel', result.data.tel)
        wx.setStorageSync('icode', result.data.code)
        this.hideRegisterModal()
      } else {
        wx.showToast({
          title: '验证失败',
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  preventTouchMove: function() {
    return;
  },
  clickTip: function() {
    // this.showRegisterModal();
    let that = this
    var lon_lat = that.convert_BD09_To_GCJ02(that.data.latitude, that.data.longitude)
    wx.openLocation({
      // latitude: parseFloat(that.data.latitude),
      // longitude: parseFloat(that.data.longitude),
      latitude: lon_lat._lat,
      longitude: lon_lat._lng,
      name: that.data.resultData.name,
      address: that.data.resultData.address,
      scale: 18
    })
  },
  /*
  * 
  * 百度地图BD09坐标---->中国正常GCJ02坐标
  * 腾讯地图用的也是GCJ02坐标
  * @param double $lat 纬度
  * @param double $lng 经度
  * @return array();
  */
  convert_BD09_To_GCJ02: function(lat, lng){
    var x_pi = 3.14159265358979324 * 3000.0 / 180.0
    var x = lng - 0.0065
    var y = lat - 0.006
    var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi)
    var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi)
    var _lng = z * Math.cos(theta)
    var _lat = z * Math.sin(theta)
    return {_lng,_lat}
  },
  findUnpayOrder: function(e) {
    var index = parseInt(e.currentTarget.dataset.index);
    var selectSession = this.data.planList[index]
    requestUtil.requestPost(urlConfig.FIND_UNPAY_ORDER_URL, {
      "tel": wx.getStorageSync("tel"),
      "code": wx.getStorageSync("icode")
    }).then((result) => {
      console.log("查询未支付订单", result)
      wx.hideLoading();
      if (result.errCode == 0) {
        if (result.data == undefined || result.data == null) { //没有未支付订单
          wx.navigateTo({
            url: '/pages/new-select-seat/new-select-seat?planId=' + selectSession.id
          })
        } else { //有未支付订单,未调过支付
          let self = this;
          // wx.showModal({
          //   title: '提示',
          //   content: '您有未支付的订单，是否取消此订单?',
          //   cancelText: "去支付",
          //   confirmText: "确定",
          //   success(res) {
          //     console.log(res)
          //     if (res.confirm) {
          //       //确定
          //       self.cancelOrder(result.data.orderNo, selectSession.id);
          //     } else if (res.cancel) {
          //       //去支付
          //       console.log("去支付")
          //       if (result.data.payType == "empty") { //到支付确认页面
          //         wx.navigateTo({
          //           url: "../orderConfirm/orderConfirm?orderId=" + result.data.orderNo
          //         })
          //       } else { //有支付订单,切已调过支付但未付款
          //         self.unPayOrder(result.data.orderNo)
          //       }
          //     }
          //   }
          // })
          this.setData({
            planId: selectSession.id,
            order: result.data,
          })
          this.showModal();
        }
      } else {
        if (result.errCode != 403) {
          wx.showToast({
            title: result.errMsg,
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  },
  cancelOrder: function(planId) {
    var that = this
    requestUtil.requestPost(urlConfig.CANCEL_ORDER_URL, {
      "tel": wx.getStorageSync("tel"),
      "code": wx.getStorageSync("icode"),
      "orderNo": that.data.order.orderNo
    }).then((result) => {
      console.log("取消订单", result)
      wx.hideLoading();
      if (result.errCode == 0) {
        wx.navigateTo({
          url: '/pages/new-select-seat/new-select-seat?planId=' + planId
        })
      } else {
        wx.showToast({
          title: result.errMsg,
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  unPayOrder: function(orderNo) {
    requestUtil.requestPost(urlConfig.UNPAY_ORDER_URL, {
      "tel": wx.getStorageSync("tel"),
      "code": wx.getStorageSync("icode"),
      "orderNo": orderNo
    }).then((result) => {
      console.log("支付未支付的订单", result)
      wx.hideLoading();
      if (result.errCode == 0) {
        wx.requestPayment({
          'timeStamp': result.data.timestamp,
          'nonceStr': result.data.noncestr,
          'package': result.data.prepayid,
          'signType': result.data.signType,
          'paySign': result.data.sign,
          success: function(res) {
            console.log("支付成功", res)
            setTimeout(function() {
              wx.navigateTo({//支付成功，跳转到我的订单页
                url: '../order/order?sourceType=1',
              })
            }, 200)
          },
          fail: function(res) {
            console.log("支付失败", res)
            console.log(res)
            wx.showLoading({
              title: '支付取消',
            })
            wx.hideLoading();
          }
        })
      } else {
        wx.showToast({
          title: result.errMsg,
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  clickMovie: function(e) {
    var that = this;
    //console.log(e.currentTarget.dataset.index)
    this.setData({
      firstSelectIndex: e.currentTarget.dataset.index,
      dateIndex: 0,
      selectIndex: e.currentTarget.dataset.index,
      selectData: that.data.moviesArr[e.currentTarget.dataset.index],
      planList: that.data.moviesArr[e.currentTarget.dataset.index].planList[0].sessionList,
    })
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
      "channel": '',
      "uid": '',
    }, false).then((res) => {
      if (res.errCode == 0) {
        that.setData({
          uid: res.data.uid,
        }, function () {
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