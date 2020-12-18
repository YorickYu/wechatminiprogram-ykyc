
const requestUtil = require("../../utils/requestUtil")
const urlConfig = require("../../utils/urlConfig")

/**
 * 传入参数：
 * sourceType 1 跳转会首页 0 返回上一级 
 */
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentpage: 1,
    totalPage: 1,
    bottomRefresh: false,
    switchbar: ["电影订单", "商品订单"],
    currentSelected: 0,
    movieDetaillist: [
      /*{
        id: "106201904251717498054905",
        movieName: "战狼复仇者联盟4: ENDGAME复仇者联盟4: ENDGAME",
        planStartTime: "2019-04-28 19:002019-04-28 19:002019-04-28 19:002019-04-28 19:00",
        cinemaName: "SFC测试影院SFC测试影院SFC测试影院SFC测试影院",
        state: "finish",
        status: 3,
        isExpire: 0
      }*/
    ],
    goodsExchangelist: [],
    customback: false,
    firstMovieLoaded: false,
    firstGoodsLoaded: false
  },
  switchaction(e) {
    let that = this
    let current = e.currentTarget.dataset.aindex
    that.setData({
      currentSelected: current
    },function() {
      that.firstLoading()
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.hideShareMenu()

    let that = this
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          contentheight: res.windowHeight - getApp().globalData.navigationHeight - 145 / 2
        })
      }
    })

    that.setData({
      customback: options.sourceType == "1" ? true : false,
      // currentSelected: 1
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.firstLoading()
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

  back() {
    if (this.data.customback) {
      wx.switchTab({
        url: '/pages/mine/mine'
      })
    }else {
      console.log("返回上一级")
      wx.navigateBack({
        delta: 1
      })
    }
  },
  
  firstLoading() {
    console.log("当前tag" + this.data.currentSelected)
    const _cutsed = this.data.currentSelected

    this.setData({
      currentpage: 1,
    }, function () {
      const page = this.data.currentpage
      if (_cutsed == 0) {
        this.requestOrderList(page)
      }else if (_cutsed == 1) {
        this.requestGoodsList(page)
      }
    })
  },

  // 上下加载
  upper(e) {
    let that = this
    const com = that.selectComponent('#tfresh')
    if (com.data.toprefresh) {
      return
    }
    console.log("loading top")
    com.refreshstart()

    that.firstLoading()
  },

  lower(e) {
    let that = this
    const page = that.data.currentpage
    const _cutsed = this.data.currentSelected
    if (page < that.data.totalPage && !that.data.bottomRefresh) {
      console.log("loading down")
      that.setData({
        currentpage: page + 1,
        bottomRefresh: true
      }, function() {
        wx.vibrateShort()
        const page = this.data.currentpage
        if (_cutsed == 0) {
          that.requestOrderList(page)
        } else if (_cutsed == 1) {
          that.requestGoodsList(page)
        }
      })
    }
  },

  // 电影订单
  requestOrderList(currentpage) {
    let that = this
    requestUtil.requestPost(urlConfig.MOVIE_LIST_URL, {
      "page": currentpage.toString(),
      "code": wx.getStorageSync('icode'),
      "tel": wx.getStorageSync('tel'),
    }).then((res) => {
      if (res.errCode == 0) {
        var tmplist = res.data.list || [];
        for (var i = 0; i < tmplist.length; i++) {
          if (tmplist[i].isExpire == 1) {
            tmplist[i].stateValue = "已过期"
            continue
          }
          var status = tmplist[i].status;
          var stateValue = '';
          if (status == 1) {
            stateValue = "待支付";
            tmplist[i].state = "wait";
          } else if (status == 2) {
            stateValue = "已支付";
            tmplist[i].state = "paid";
          } else if (status == 3) {
            stateValue = "已完成";
          } else if (status == 4) {
            stateValue = "已取消"
          } else if (status == 5) {
            if (tmplist[i].state == "failed") {
              stateValue = "订单失败"
            } else {
              stateValue = "已退票";
            }
          } else if (status == 6) {
            stateValue = "已退票";
          }
          tmplist[i].stateValue = stateValue;
        }

        if (this.data.currentpage == 1) {
          that.setData({
            movieDetaillist: tmplist,
          })
        }else {
          var orignlist = this.data.movieDetaillist
          that.setData({
            movieDetaillist: orignlist.concat(tmplist),
          })
        }
       
      }
      const com = that.selectComponent('#tfresh')
      com.refreshend()
      that.setData({ // 停止刷新阻断
        bottomRefresh: false,
        firstMovieLoaded: true,
        totalPage: res.data.totalPage,
      })
    })
  },

  // 商品订单
  requestGoodsList(currentpage) {
    let that = this
    requestUtil.requestPost(urlConfig.GOODS_ORDER_LIST_URL, {
      "tel": wx.getStorageSync("tel"),
      "code": wx.getStorageSync("icode"),
      "page": currentpage.toString(),
    }).then((res) => {
      if (that.data.currentpage == 1) {
        that.setData({
          goodsExchangelist: res.data.list || [],
        })
      } else {
        var orignlist = this.data.goodsExchangelist
        that.setData({
          goodsExchangelist: orignlist.concat(res.data.list),
        })
      }

      const com = that.selectComponent('#tfresh')
      com.refreshend()
      that.setData({ // 停止刷新阻断
        totalPage: res.data.totalPage,
        bottomRefresh: false,
        firstGoodsLoaded: true
      })
      console.log(this.data.goodsExchangelist)

    })

  },

  // cancel
  cancelOrder(e) {
    let that = this
    const orderid = e.currentTarget.dataset.orderid

    requestUtil.requestPost(urlConfig.CANCEL_ORDER_URL, {
      "tel": wx.getStorageSync("tel"),
      "code": wx.getStorageSync("icode"),
      "orderNo": orderid
    }).then((result) => {
    
      if (result.errCode == 0) {
        // that.reshowCell(orderid)
        // 刷新列表
        that.firstLoading()
      } else {
        wx.showToast({
          title: result.errMsg,
          icon: 'none',
          duration: 2000
        })
      }
    })
  },

  // 刷新cell
  reshowCell(orderid) {
    const _list = this.data.movieDetaillist
    for (var index in _list) {
      const item = _list[index]
      if (item.id == orderid) {
        item.status = 4
        item.state = "unpay"
        item.stateValue = "已取消"
        break;
      }
    }
    this.setData({
      movieDetaillist: _list
    })
  },

  confirmOrder(e) {
    let that = this
    console.log(e)
    const orderitem = e.currentTarget.dataset.orderitem
    if (orderitem.payType == "empty") { //到支付确认页面
      wx.navigateTo({
        url: "../orderConfirm/orderConfirm?orderId=" + orderitem.id
      })
    } else { //有支付订单,切已调过支付但未付款
      requestUtil.requestPost(urlConfig.UNPAY_ORDER_URL, {
        "tel": wx.getStorageSync("tel"),
        "code": wx.getStorageSync("icode"),
        "orderNo": orderitem.id
      }).then((result) => {
        console.log("支付未支付的订单", result)
        if (result.errCode == 0) {
          wx.requestPayment({
            'timeStamp': result.data.timestamp,
            'nonceStr': result.data.noncestr,
            'package': result.data.prepayid,
            'signType': result.data.signType,
            'paySign': result.data.sign,
            success: function (res) {
              console.log("支付成功", res)
              that.firstLoading()
            },
            fail: function (res) {
              wx.showToast({
                title: "支付失败",
                icon: 'none',
                duration: 2000
              })
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
    }
  }
})