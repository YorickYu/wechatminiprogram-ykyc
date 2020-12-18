const requestUtil = require("../../utils/requestUtil")
const urlConfig = require("../../utils/urlConfig.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ticketing: false,
    orderId: "",
    planId: 0,
    isShowCouponDialog: false,
    animationData: {},
    tabIndex: '0', //默认兑换券弹框标签索引0兑换券1抵值券2折扣券
    list: [],
    exchangelist: [],
    offsetlist: [],
    discountlist: [],
    contents: [],
    countDownTime: 0,
    countDownTimeIsShow: true,
    movieName: '',
    count: 0,
    movieTime: '',
    movieType: '',
    cinemaName: '',
    hallName: '',
    seats: [],
    selectCouponList: [], //选中的兑换券数组
    preSelectCouponList: [], //上次选择的券数组
    selectCoupon: '', //选中的兑换券字符串格式
    selectCouponCount: 0, //选中兑换券数量
    selectCouponInfo: '折扣券',
    phone: '',
    totalPrice: 0,
    realPrice: 0,
    serviceFee: 0,
    discountHidden: true, //优惠信息部分布局是否隐藏
    discountInfo: '5折券', //优惠信息内容
    discountText: '折扣', //优惠类型
    orderBean: null,
    inputPhoned: false, //设置手机输入框焦点

    isChangeOrder: true, //当点击过支付后，此参数变成false订单不可再改变

    pauseTime: 0,
    startTime: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.hideShareMenu({})
    var that = this
    that.data.pauseTime = Date.parse(new Date())
    console.log(">>>> onLoad : " + that.data.pauseTime)

    this.setData({
      orderId: options.orderId,
      title: '确认订单',
    });
    this.getPayOrderDetail();
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
    var that = this
    clearInterval(that.data.timer);
    this.setData({
      startTime: Date.parse(new Date())
    })
    var timeS = (that.data.startTime - that.data.pauseTime) / 1000
    if (that.data.countDownTime > timeS) {
      this.setData({
        countDownTime: that.data.countDownTime - timeS
      })
    } else {
      this.setData({
        countDownTime: 0
      })
    }
    this.countDown()
    console.log(">>>> onShow : " + (that.data.startTime - that.data.pauseTime))
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    var that = this
    that.data.pauseTime = Date.parse(new Date());
    console.log(">>>> onHide : " + that.data.pauseTime)
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
  //返回
  back: function() {
    var self = this
    //倒计时结束，订单超时，直接返回
    if (self.data.countDownTime <= 0) {
      wx.navigateBack({
        delta: 1
      });
      return;
    }
    //倒计时还未结束
    wx.showModal({
      title: '提示',
      content: '确定要取消当前订单吗',
      success(res) {
        if (res.confirm) {
          self.cancelOrder();
        }
      }
    })
  },
  countDown: function() { //倒计时
    let that = this;
    let countDownTime = that.data.countDownTime; //获取倒计时初始值
    that.setData({
      timer: setInterval(function() { //这里把setInterval赋值给变量名为timer的变量
        //每隔一秒countDownNum就减一，实现同步
        countDownTime--;
        //然后把countDownNum存进data，好让用户知道时间在倒计着
        that.setData({
          countDownTime: countDownTime,
        })
        //在倒计时还未到0时，这中间可以做其他的事情，按项目需求来
        if (countDownTime <= 0) {
          //这里特别要注意，计时器是始终一直在走的，如果你的时间为0，那么就要关掉定时器！不然相当耗性能
          //因为timer是存在data里面的，所以在关掉时，也要在data里取出后再关闭
          clearInterval(that.data.timer);
          //关闭定时器之后，可作其他处理codes go here
          that.setData({
            countDownTime: 0,
            countDownTimeIsShow: false
          })
        }
      }, 1000)
    })
  },
  showCouponDialog: function() {
    var that = this;
    if (!that.data.isChangeOrder) {
      wx.showModal({
        title: '提示',
        content: '当前订单已生成，如需修改优惠券，请先取消当前订单',
        success(res) {
          if (res.confirm) {
            that.cancelOrder();
          }
        }
      })
      return;
    }

    //更新优惠券对话框选中的内容
    that.clearCouponListSelected()
    that.data.selectCouponList = []
    that.data.selectCouponList = that.data.preSelectCouponList.slice()
    //that.data.selectCouponList.concat(that.data.preSelectCouponList)
    for (let i = 0; i < that.data.selectCouponList.length; i++) {
      for (let j = 0; j < that.data.list.length; j++) {
        if (that.data.list[j] == null) continue;
        for (let k = 0; k < that.data.list[j].length; k++) {
          if (that.data.selectCouponList[i].pwd == that.data.list[j][k].pwd) {
            that.data.list[j][k].isSelected = true;
          }
        }
      }
    }
    this.updateGreyCoupon()
    this.setData({
      contents: that.data.list[that.data.tabIndex] || []
    })
    /* 动画部分 */
    // 第1步：创建动画实例 
    that.setData({
      isShowCouponDialog: true
    })
    var animation = wx.createAnimation({
      duration: 800, //动画时长
      timingFunction: "ease", //线性
      delay: 0 //0则不延迟
    });
    // 第2步：这个动画实例赋给当前的动画实例
    this.animation = animation;
    // 第4步：导出动画对象赋给数据对象储存
    setTimeout(function() {
      that.fadeIn(); //调用显示动画
    }, 200)
  },
  hideCouponDialog: function() {
    var that = this;
    var animation = wx.createAnimation({
      duration: 800, //动画的持续时间 默认400ms   数值越大，动画越慢   数值越小，动画越快
      timingFunction: 'ease', //动画的效果 默认值是linear
    })
    this.animation = animation
    that.fadeDown(); //调用隐藏动画   
    setTimeout(function() {
      that.setData({
        isShowCouponDialog: false
      })
    }, 320) //先执行下滑动画，再隐藏模块
  },
  //动画集
  fadeIn: function() {
    this.animation.translateY(0).step()
    this.setData({
      animationData: this.animation.export() //动画实例的export方法导出动画数据传递给组件的animation属性
    })
  },
  fadeDown: function() {
    this.animation.translateY(1040).step()
    this.setData({
      animationData: this.animation.export(),
    })
  },
  selectTabIndex: function(e) {
    var data = e.currentTarget.dataset.index;
    this.setData({
      tabIndex: data,
      contents: this.data.list[data] || []
    })
  },
  getInput: function(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  clickInputPhone: function() {
    var that = this;
    if (!that.data.isChangeOrder) {
      wx.showModal({
        title: '提示',
        content: '当前订单已生成，如需修改手机号，请先取消当前订单',
        success(res) {
          if (res.confirm) {
            that.cancelOrder();
          }
        }
      })
      return;
    }
    this.setData({
      inputPhoned: true,
    })
  },
  getPayOrderDetail: function() {
    var that = this;
    requestUtil.requestPost(urlConfig.PAY_ORDER_DETAIL_URL, {
      "tel": wx.getStorageSync("tel"),
      "code": wx.getStorageSync("icode"),
      "orderNo": that.data.orderId
    }).then((result) => {
      console.log("支付订单信息", result)
      wx.hideLoading();
      if (result.errCode == 0) {
        that.setData({
          countDownTime: result.data.surplusTime,
          movieName: result.data.movieName,
          count: result.data.ticketCount,
          movieTime: result.data.planTime,
          movieType: "(" + result.data.movieTag + ")",
          cinemaName: result.data.cinemaName,
          hallName: result.data.hallName,
          seats: result.data.seatInfo.split(","),
          phone: result.data.phone,
          totalPrice: result.data.totalPrice,
          serviceFee: result.data.serviceFee,
          realPrice: result.data.totalPrice,
          planId: result.data.planId,
          orderBean: result.data
        });
        setTimeout(function() {
          wx.hideLoading()
        }, 1000)
        clearInterval(that.data.timer);
        this.countDown();
        this.getMyCoupons();
      } else {
        wx.showModal({
          title: '提示',
          content: result.errMsg,
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
    })
  },
  cancelOrder: function() {
    var that = this
    requestUtil.requestPost(urlConfig.CANCEL_ORDER_URL, {
      "tel": wx.getStorageSync("tel"),
      "code": wx.getStorageSync("icode"),
      "orderNo": that.data.orderId
    }).then((result) => {
      console.log("取消订单", result)
      wx.hideLoading();
      if (result.errCode == 0) {
        wx.navigateBack({
          delta: 1
        });
      } else {
        wx.showToast({
          title: result.errMsg,
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  getMyCoupons: function() {
    var that = this
    requestUtil.requestPost(urlConfig.AVAILABLE_COUPON_LIST_URL, {
      "tel": wx.getStorageSync("tel"),
      "code": wx.getStorageSync("icode"),
      "orderNo": that.data.orderId,
      "planId": that.data.planId
    }).then((result) => {
      console.log("我的兑换券", result)
      // wx.hideLoading();
      if (result.errCode == 0) {
        //封装优惠券
        let _exchangelist = []
        let _offsetlist = []
        if (result.data.list != null) {
          for (let i = 0; i < result.data.list.length; i++) {
            if (result.data.list[i].couponCategory == '1') { //兑换券
              result.data.list[i].type = 1
              _exchangelist.push(result.data.list[i])
            } else { //抵值券
              result.data.list[i].type = 2
              _offsetlist.push(result.data.list[i])
            }
          }
        }
        this.setData({
          exchangelist: _exchangelist,
          offsetlist: _offsetlist,
        })
        this.getMyDiscountCoupons();
      } else {
        wx.showToast({
          title: result.errMsg,
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  getMyDiscountCoupons: function() {
    var that = this
    requestUtil.requestPost(urlConfig.AVAILABLE_DISCOUNT_COUPON_LIST_URL, {
      "tel": wx.getStorageSync("tel"),
      "code": wx.getStorageSync("icode"),
      "orderNo": that.data.orderId,
      "planId": that.data.planId
    }).then((result) => {
      console.log("我的折扣券", result)
      if (result.errCode == 0) {
        this.setData({
          discountlist: result.data
        })
        if (that.data.discountlist != null) {
          for (let i = 0; i < that.data.discountlist.length; i++) {
            that.data.discountlist[i].type = 3
          }
        }
        that.setData({
          list: [
            that.data.exchangelist,
            that.data.offsetlist,
            that.data.discountlist
          ]
        })
        //封装优惠券
        that.setData({
          contents: that.data.list[0] || []
        })
        that.startWithDiscountCoupon()
      } else {
        wx.showToast({
          title: result.errMsg,
          icon: 'none',
          duration: 2000
        })
      }
    })
  },

  startWithDiscountCoupon() {
    const discounts = this.data.discountlist
    const orderBean = this.data.orderBean

    if (discounts.length == 0) { return }
    var maxDiscount = 10 // 最低折扣
    var maxDiscountCouponList = [] // 最低折扣券列表

    var maxFinalPrice = 99999 // 最低价格
    var maxPriceCouponList = [] // 最低价格券列表

    var maxTime = "" // 最近日期
    var maxFinalCoupon = {} // 最终选择的券

    // 筛选最低折扣
    for (let i = 0; i < discounts.length; i++) {
      const _c = discounts[i]
      if (_c.type != 3 || !_c.couponsFlag) { break }

      // maxDiscount = _c.discount < maxDiscount ? _c.discount : maxDiscount
      if (_c.discount < maxDiscount) {
        let array = new Array(_c)
        maxDiscountCouponList = array
        maxDiscount = _c.discount
      } else if (_c.discount == maxDiscount) {
        maxDiscountCouponList.push(_c)
      }
    }

    // 筛选最优价格
    for (let i = 0; i < maxDiscountCouponList.length; i++) {
      const _c = maxDiscountCouponList[i]
      const discountPrice = orderBean.totalPrice * (10 - _c.discount) / 10
      const favorPrice = (discountPrice >= _c.deductionLimit && _c.deductionLimit != 0) ? _c.deductionLimit : discountPrice
      const finalPrice = orderBean.totalPrice - favorPrice
      if (finalPrice < maxFinalPrice) {
        let array = new Array(_c)
        maxPriceCouponList = array
        maxFinalPrice = finalPrice
      } else if (finalPrice == maxFinalPrice) {
        maxPriceCouponList.push(_c)
      }
    }

    // 筛选日期最优券
    for (let i = 0; i < maxPriceCouponList.length; i++) {
      const _c = maxPriceCouponList[i]
      var _date = new Date(_c.time)
      if (maxTime == "" || maxTime == null) {
        maxTime = _date.getTime() 
        maxFinalCoupon = _c
      }
      if (_date.getTime() < maxTime) {
        maxTime = _date.getTime()
        maxFinalCoupon = _c
      }
    }

    console.log("最低折扣：", maxDiscount)
    console.log("最优折扣券：", maxDiscountCouponList)
    console.log("最优价格：", maxFinalPrice)
    console.log("最优价格券：", maxPriceCouponList)
    console.log("最终券", maxFinalCoupon)

    this.setData({
      realPrice: maxFinalPrice,
      discountHidden: false,
      discountText: '折扣',
      discountInfo: maxFinalCoupon.couponName + '券'+'(折扣上限'+ maxFinalCoupon.deductionLimit/100+'元)',
      selectCouponCount: 1,
      selectCouponInfo: '折扣券',
      discountCoupon: maxFinalCoupon.pwd,
      selectCoupon: '',

      // 
      tabIndex: 2,
    })
    this.data.selectCouponList.push(maxFinalCoupon) 
    this.data.preSelectCouponList.push(maxFinalCoupon)
    // this.actionWithClick(0)

  },

  goToPay: function() {
    var that = this
    if (that.data.countDownTime <= 0) {
      wx.showToast({
        title: "订单超时，请重新下单",
        icon: 'none',
        duration: 2000
      })
      return;
    }
    //判断手机号
    if (that.data.phone.length < 11) {
      wx.showToast({
        title: '请输入正确的手机',
        icon: 'none',
        duration: 2000
      })
      return
    }

    //订单状态改成不可更改数据的类型
    this.setData({
      isChangeOrder: false
    })

    requestUtil.requestPost(urlConfig.PAY_ORDER_URL, {
      "orderNo": that.data.orderId,
      "coupons": that.data.selectCoupon,
      "discountCoupon": that.data.discountCoupon,
      "payType": "wxPay",
      "movieCardNo": "",
      "vaildCode": "",
      "code": wx.getStorageSync("icode"),
      "tel": wx.getStorageSync("tel"),
      "mobile": that.data.phone,
    }).then((result) => {
      console.log("立即支付", result)
      if (result.errCode == 0) {
        if (that.data.realPrice == 0) {
          //我的订单
          wx.redirectTo({
            url: '../order/order?sourceType=1'
          })
        } else {
          //唤醒微信支付
          wx.requestPayment({
            'timeStamp': result.data.timestamp,
            'nonceStr': result.data.noncestr,
            'package': result.data.prepayid,
            'signType': result.data.signType,
            'paySign': result.data.sign,
            success: function(res) {
              console.log("支付成功", res)
              that.setData({
                ticketing: true
              })
              if (that.data.ticketing) {
                setTimeout(function () {
                  wx.redirectTo({
                    url: '../order/order?sourceType=1'
                  })
                }, 5000)
              }
            },
            fail: function(res) {
              console.log("支付失败", res)
              wx.showLoading({
                title: '支付取消',
              })
              wx.hideLoading();
            }
          })
        }
      } else {
        wx.showToast({
          title: result.errMsg,
          icon: 'none',
          duration: 2000
        })
      }
    })
  },

  orderexit () {
    this.setData({
      ticketing: false
    }, function() {
      wx.redirectTo({
        url: '../order/order?sourceType=1'
      })
    })
  },

  clickCoupon: function(e) {
    this.actionWithClick(e.currentTarget.dataset.index)
  },

  actionWithClick(innerIndex) {
    var that = this
    var targetc = that.data.list[that.data.tabIndex][innerIndex]
    var errormsg = ""

    //此券不可用
    if (!targetc.couponsFlag) {
      errormsg = targetc.falseReason
    }
    //此券不可再点击选择
    if (targetc.unableClick) {
      let selectlist = that.data.selectCouponList
      let selectc = selectlist[0]
      errormsg = "此券不能被同时使用"
      // 只能使用相同类型的券
      if (selectc.type != targetc.type) {
        errormsg = "只能使用相同类型的券"
      } else
      // 处理不同类型的券
      if (selectc.type == 1) { // 多选通兑券
        if (targetc.maxPrice != selectc.maxPrice) {
          errormsg = "通兑券只能选择相同金额"
        } else if (targetc.paymentType != selectc.paymentType) {
          errormsg = "名称不同的通兑券不能同时使用"
        }
      } else if (selectc.type == 2) { // 多选抵值券
        if (selectlist.length >= that.data.count) {
          errormsg = "抵值券数量超出座位数"
        }
      } else if (selectc.type == 3) { // 多选折扣券
        if (selectlist.length > 0) {
          errormsg = "折扣券只能选择一张"
        }
      }
    }
    if (errormsg.length > 0) {
      wx.showToast({
        title: errormsg,
        icon: 'none',
        duration: 2000
      })
      return
    }

    if (that.data.list[that.data.tabIndex][innerIndex].isSelected) {
      that.data.list[that.data.tabIndex][innerIndex].isSelected = false
    } else {
      that.data.list[that.data.tabIndex][innerIndex].isSelected = true
    }
    //添加到selectCouponList选中数组中
    //or 删除selectCouponList中去勾选的券
    var coupon = that.data.list[that.data.tabIndex][innerIndex]
    if (coupon.isSelected) {
      that.data.selectCouponList.push(coupon)
    } else {
      for (let i = 0; i < that.data.selectCouponList.length; i++) {
        if (coupon.pwd == that.data.selectCouponList[i].pwd) {
          that.data.selectCouponList.splice(i, 1)
          break;
        }
      }
    }

    this.updateGreyCoupon()

    //刷新券列表
    this.setData({
      contents: that.data.list[that.data.tabIndex] || []
    })
  },

  confirmCoupon: function() {
    var that = this
    //1. 不使用券
    if (that.data.selectCouponList.length == 0) {
      that.data.preSelectCouponList = []
      that.data.preSelectCouponList = that.data.selectCouponList.slice()
      this.setData({
        realPrice: that.data.orderBean.totalPrice,
        discountHidden: true,
        selectCouponCount: that.data.selectCouponList.length,
        discountCoupon: '',
        selectCoupon: '',
      })
      that.hideCouponDialog()
      return;
    }
    //折扣券逻辑
    //2. 本次选择折扣券
    if (that.data.selectCouponList.length > 0 && that.data.selectCouponList[0].type == 3) {
      //计算是否达到抵扣上限
      var _realPrice = 0;
      var _discountPrice = that.data.orderBean.totalPrice * (10 - that.data.selectCouponList[0].discount) / 10
      //超过上限or不限制
      if (_discountPrice >= that.data.selectCouponList[0].deductionLimit && that.data.selectCouponList[0].deductionLimit != 0) {
        _realPrice = that.data.orderBean.totalPrice - that.data.selectCouponList[0].deductionLimit
      } else {
        _realPrice = that.data.orderBean.totalPrice * that.data.selectCouponList[0].discount / 10
      }
      console.log(_realPrice)
      that.data.preSelectCouponList = []
      that.data.preSelectCouponList = that.data.selectCouponList.slice()
      this.setData({
        realPrice: _realPrice.toFixed(2),
        discountHidden: false,
        discountText: '折扣',
        discountInfo: that.data.selectCouponList[0].couponName + '券' + '(折扣上限' + that.data.selectCouponList[0].deductionLimit / 100 + '元)',
        selectCouponCount: that.data.selectCouponList.length,
        selectCouponInfo: '折扣券',
        discountCoupon: that.data.preSelectCouponList[0].pwd,
        selectCoupon: '',
      })
      that.hideCouponDialog()
      return;
    }
    //3. 本次选择通兑券或抵值券
    var _selectCoupon = ''; //选择的券
    for (let i = 0; i < that.data.selectCouponList.length; i++) {
      _selectCoupon = _selectCoupon + that.data.selectCouponList[i].pwd + ","
    }
    _selectCoupon = _selectCoupon.substr(0, _selectCoupon.length - 1);

    requestUtil.requestPost(urlConfig.RECOMMEND_COUPON_LIST_URL, {
      "code": wx.getStorageSync("icode"),
      "tel": wx.getStorageSync("tel"),
      "orderNo": that.data.orderId,
      "planId": that.data.planId,
      "couponPwdList": _selectCoupon,
    }).then((result) => {
      if (result.errCode == 0) {
        that.data.preSelectCouponList = []
        that.data.preSelectCouponList = that.data.selectCouponList.slice()
        this.setData({
          discountCoupon: '',
          selectCoupon: _selectCoupon
        })
        that.hideCouponDialog()
        //计算实际要付的价格
        var _realPrice = 0;
        for (let i = 0; i < result.data.seatCounponlist.length; i++) {
          _realPrice = Number(result.data.seatCounponlist[i].priceToPay) + _realPrice
        }
        //显示抵值券文字，还是兑换券文字
        var _selectCouponInfo;
        if (that.data.selectCouponList[0].type == 1) {
          _selectCouponInfo = '兑换券'
        } else {
          _selectCouponInfo = '抵值券'
        }
        this.setData({
          selectCouponCount: that.data.selectCouponList.length,
          selectCouponInfo: _selectCouponInfo,
          discountHidden: false,
          discountText: '优惠',
          discountInfo: '-' + (that.data.orderBean.totalPrice - _realPrice) / 100 + '元',
          realPrice: _realPrice,
        })
      } else {
        wx.showToast({
          title: result.errMsg,
          icon: 'none',
          duration: 2000
        })
        if (result.data == null || result.data.seatCounponlist == null) {
          return;
        }
        // 重新选中兑换券
        that.clearCouponListSelected();
        that.selectCouponList = []
        var _selectCouponList = []
        // 取出接口返回的券，组装成数组
        for (let i = 0; i < result.data.seatCounponlist.length; i++) {
          if (result.data.seatCounponlist[i].couponList.length == 0) continue;
          for (let j = 0; j < result.data.seatCounponlist.couponList.length; j++) {
            _selectCouponList.push(result.data.seatCounponlist[i].couponList[j])
          }
        }
        //匹配通兑券，勾选返回的券数组
        for (let i = 0; i < _selectCouponList.length; i++) {
          if (that.data.list[0] == null) continue;
          for (let j = 0; j < that.data.list[0].length; j++) {
            if (_selectCouponList[i].couponpwd == that.data.list[0][j].pwd) {
              that.data.list[0][j].isSelected = true
              that.seatCounponlist.push(that.data.list[0][j])
            }
          }
        }
        //匹配优惠券，勾选返回的券数组
        for (let i = 0; i < _selectCouponList.length; i++) {
          if (that.data.list[1] == null) continue;
          for (let j = 0; j < that.data.list[1].length; j++) {
            if (_selectCouponList[i].couponpwd == that.data.list[1][j].pwd) {
              that.data.list[1][j].isSelected = true
              that.seatCounponlist.push(that.data.list[1][j])
            }
          }
        }
        //刷新券列表
        this.setData({
          contents: that.data.list[that.data.tabIndex] || []
        })
      }
    })
  },
  //清除所有券的选择状态
  clearCouponListSelected: function() {
    var that = this
    for (let i = 0; i < that.data.list.length; i++) {
      if (that.data.list[i] == null) continue;
      for (let j = 0; j < that.data.list[i].length; j++) {
        that.data.list[i][j].isSelected = false
      }
    }
  },
  //更新券的灰显状态
  updateGreyCoupon: function() {
    var that = this;
    //先重置为可点击
    for (let i = 0; i < that.data.list.length; i++) {
      if (that.data.list[i] == null) continue;
      for (let j = 0; j < that.data.list[i].length; j++) {
        that.data.list[i][j].unableClick = false;
      }
    }
    if (that.data.selectCouponList == null) return;
    //如果没有选择券
    if (that.data.selectCouponList.length == 0) {
      for (let i = 0; i < that.data.list.length; i++) {
        if (that.data.selectCouponList[i] == null) continue;
        for (let j = 0; j < that.data.list[i].length; j++) {
          that.data.list[i][j].unableClick = false;
        }
      }
      return;
    }
    //有已选择的券
    var sCoupon = that.data.selectCouponList[0]
    //1. 先屏蔽其他类别券
    for (let i = 0; i < that.data.list.length; i++) {
      if (that.data.list[i] == null) continue;
      for (let j = 0; j < that.data.list[i].length; j++) {
        if (sCoupon.type != that.data.list[i][j].type) {
          that.data.list[i][j].unableClick = true;
        }
      }
    }
    //2. 屏蔽自身券根据券规则
    //2.1 屏蔽折扣券
    if (sCoupon.type == 3 && that.data.list[2] != null) {
      for (let i = 0; i < that.data.list[2].length; i++) {
        if (sCoupon.pwd != that.data.list[2][i].pwd) {
          that.data.list[2][i].unableClick = true;
        }
      }
    }
    //2.2 屏蔽抵值券数量
    if (sCoupon.type == 2 && that.data.list[1] != null) {
      //已选数量等于座位数，则屏蔽所有其他抵值券
      if (that.data.selectCouponList.length == that.data.count) {
        //先全屏蔽,在把选中的不屏蔽
        for (let i = 0; i < that.data.list[1].length; i++) {
          if (sCoupon.pwd != that.data.list[1][i].pwd) {
            that.data.list[1][i].unableClick = true;
          }
        }
        for (let i = 0; i < that.data.selectCouponList.length; i++) {
          for (let j = 0; j < that.data.list[1].length; j++) {
            if (that.data.selectCouponList[i].pwd == that.data.list[1][j].pwd) {
              that.data.list[1][j].unableClick = false;
              break;
            }
          }
        }
      } else {
        //如果已选择券小于座位数, 则其他抵值券可以使用
        for (let i = 0; i < that.data.list[1].length; i++) {
          if (sCoupon.pwd != that.data.list[1][i].pwd) {
            that.data.list[1][i].unableClick = false;
          }
        }
      }
    }
    //2.3 屏蔽通兑券
    if (sCoupon.type == 1 && that.data.list[0] != null) {
      //2.3.1 如果已选通兑券，屏蔽不同价格和补差与不可补差类型不同的券
      for (let i = 0; i < that.data.list[0].length; i++) {
        if (sCoupon.maxPrice != that.data.list[0][i].maxPrice || sCoupon.paymentType != that.data.list[0][i].paymentType) {
          that.data.list[0][i].unableClick = true;
        }
      }
    }
  }
})