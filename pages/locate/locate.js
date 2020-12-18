// pages/locate/locate.js
const requestUtil = require("../../utils/requestUtil")
const urlConfig = require("../../utils/urlConfig")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isUselessSet: 0,
    contentheight: 0,
    inputValue: '',
    scroll_height: 320,
    mapTop: 0,
    currentIndexNav: 0,
    cityname: "",
    longitude: 121.436209,
    latitude: 31.208715,
    markers: [],
    includeMarkers: [],
    chosenStatus: 'no',
    chosenTheater: null,
    theaterChosenList: [],
    theaterList: [],
    searchTheaterList: [],
    noTheaterSerch: false,
    showModalStatus: false,
    hideModalStatus: true,
    totalPage: 0,
    currentpage: 1,
    btmRefresh: true
  },
  activeNav(e) {
    var curIndex = e.currentTarget.dataset.index;
    var selectTheater = this.data.theaterList[curIndex - 1];
    console.log(selectTheater, "activeNav");
    this.setData({
      currentIndexNav: curIndex,
      chosenTheater: selectTheater,
      chosenStatus: 'no'
    }, function() {
      this.Downutil()
    })
  },
  navCinemaPlan(e) {
    var curIndex = e.currentTarget.dataset.index;
    var selectTheater = this.data.theaterList[curIndex - 1];
    console.log(selectTheater);
    wx.navigateTo({
      url: '../cinemaPlan/cinemaPlan?cinemaId=' + selectTheater.id
    })
  },
  activeNavChosen(e) {
    var selectChosenTheater = this.data.theaterChosenList[0];
    console.log(selectChosenTheater, "activeNavChosen");
    this.setData({
      currentIndexNav: e.currentTarget.dataset.index,
      chosenTheater: selectChosenTheater,
      chosenStatus: 'no'
    })
  },
  navCinemaPlanChosen(e) {
    var selectChosenTheater = this.data.theaterChosenList[0];
    wx.navigateTo({
      url: '../cinemaPlan/cinemaPlan?cinemaId=' + selectChosenTheater.id
    })
  },
  bindViewTap: function() {

  },
  closeMask: function(e) {
    this.setData({
      noTheaterSerch: false
    })
  },
  // 升起
  powerDrawer: function(e) {
    // var chosenStatus = e.currentTarget.dataset.statu;
    // console.log(chosenStatus)

    this.util()
    if (this.data.theaterList.length == 0) {
      this.getTotalTheaterList(1);
    }
  },
  util: function(chosenStatus) {
    this.getScreenHeight();
    this.setData({
      showModalStatus: true,
      hideModalStatus: false,
    })
  },
  // 下降
  powerDownDrawer: function(e) {
    // var curstatus = e.currentTarget.dataset.statu
    // console.log(curstatus)
    this.Downutil()
  },
  Downutil: function(curstatus) {
    /* 动画部分 */
    // 第1步：创建动画实例 
    console.log(this.data.chosenStatus);
    if (this.data.chosenStatus == "no") {
      var tmplist = this.data.theaterList;
      var tmpChosenlist = this.data.theaterChosenList;
      var firstTheater = this.data.theaterChosenList[0];
      for (var i = 0; i < tmplist.length; i++) {
        if (tmplist[i] == this.data.chosenTheater) {
          tmplist.splice(i, 1);
        }
      }
      tmpChosenlist.splice(0, 1);
      tmpChosenlist.push(this.data.chosenTheater);
      var newTmpList = new Array();
      console.log(tmplist);
      if (firstTheater.name != this.data.chosenTheater.name) {
        newTmpList.push(firstTheater);
      }
      for (var i = 0; i < tmplist.length; i++) {
        newTmpList.push(tmplist[i]);
      }
      var theaterposition = {
        id: 0,
        longitude: this.data.chosenTheater.lon,
        latitude: this.data.chosenTheater.lat,
        name: ''
      }
      var myposition = {
        id: 1,
        longitude: this.data.longitude,
        latitude: this.data.latitude,
        name: '我的位置'
      }
      var markers = [];
      var includeMarkers = [];
      markers.push(theaterposition);
      includeMarkers.push(theaterposition);
      includeMarkers.push(myposition);
      this.setData({
        theaterChosenList: tmpChosenlist,
        theaterList: newTmpList,
        markers: markers,
        includeMarkers: includeMarkers
      })

    }
    this.setData({
      showModalStatus: false,
      hideModalStatus: true,
      currentIndexNav: 0,
      scroll_height: 320
    })

  },
  tocitylist(e) {
    wx.navigateTo({
      url: '/pages/city/city',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  getScreenHeight() {
    var that = this;
    wx.getSystemInfo({ //微信自身api
      success: function(res) {
        var topHeight = res.statusBarHeight * (750 / res.windowWidth) + 44 + 150;
        that.setData({
          scroll_height: res.windowHeight * (750 / res.windowWidth) - topHeight //此处是计算滚动屏的高度
        });
        console.log('屏幕高度' + res.brand + "    " + res.statusBarHeight);
      }
    });
  },
  getMapHeight() {
    var that = this;
    wx.getSystemInfo({ //微信自身api
      success: function(res) {
        var topHeight = res.statusBarHeight * (750 / res.windowWidth) + 44 + 150;
        that.setData({
          mapTop: res.windowHeight * (750 / res.windowWidth) - topHeight //此处是计算滚动屏的高度
        });
        console.log('屏幕高度' + res.brand + "    " + res.statusBarHeight);
      }
    })
  },

  onLoad: function(options) {
    wx.hideShareMenu()
    let that = this
    var cityName = wx.getStorageSync("city")    
    const location = wx.getStorageSync('location')

    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          contentheight: res.windowHeight - getApp().globalData.navigationHeight,
          cityname: cityName,
          longitude: location.longitude,
          latitude: location.latitude
        })
      }
    })
    this.getMapHeight()
    this.getTheaterList(1)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function(e) {
    // var that = this
    // const location = wx.getStorageSync('location')
    // var theaterposition = {
    //   id: 0,
    //   longitude: that.data.chosenTheater.lon || 0.0,
    //   latitude: that.data.chosenTheater.lat || 0.0,
    //   name: ''
    // }
    // var myposition = {
    //   id: 1,
    //   longitude: location.longitude,
    //   latitude: location.latitude,
    //   name: ''
    // }
    // var markers = [];
    // var includeMarkers = [];
    // markers.push(theaterposition);
    // includeMarkers.push(theaterposition);
    // includeMarkers.push(myposition);

    // that.setData({
    //   latitude: location.latitude,
    //   longitude: location.longitude,
    //   markers: markers,
    //   includeMarkers: includeMarkers
    // })

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.setData({
      cityname: wx.getStorageSync('city') || '定位失败'
    })
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
  inputBind: function(event) {
    this.setData({
      inputValue: event.detail.value
    })
    console.log('bindInput' + this.data.inputValue)

  },
  query: function(event) {

    this.getTheaterList(1);

  },
  getTheaterList: function(pagenum) {
    var that = this;
    var inputValue = this.data.inputValue;
    console.log("inputValue:" + inputValue);
    const location = wx.getStorageSync('location')
    requestUtil.requestPost(urlConfig.CINEMA_LIST, {
      "keyword": inputValue,
      "lat": this.data.latitude,
      "lon": this.data.longitude,
      "cityId": wx.getStorageSync("cityId"),
      "page": pagenum
    }).then((result) => {
      if (pagenum == 1) {
        if (result.errCode == 0) {
          var tmpTheaterlist = new Array();
          var tmpfirstTheaterlist = new Array();
          var tmpSecondTheaterlist = new Array();
          tmpTheaterlist = result.data.list;
          if (tmpTheaterlist.length > 0) {
            for (var i = 0; i < tmpTheaterlist.length; i++) {
              if (i == 0) {
                tmpfirstTheaterlist.push(tmpTheaterlist[i]);
              } else {
                tmpSecondTheaterlist.push(tmpTheaterlist[i]);
              }
            }
            if (tmpSecondTheaterlist.length > 0) {
              this.getScreenHeight();
              that.setData({
                showModalStatus: true,
                hideModalStatus: false,
              })
            } else {
              var theaterposition = {
                id: 0,
                longitude: tmpTheaterlist[0].lon,
                latitude: tmpTheaterlist[0].lat,
                name: ''
              }
              var myposition = {
                id: 1,
                longitude: this.data.longitude,
                latitude: this.data.latitude,
                name: ''
              }
              var markers = [];
              var includeMarkers = [];
              markers.push(theaterposition);
              includeMarkers.push(theaterposition);
              includeMarkers.push(myposition);
              console.log(includeMarkers, "includeMarkers")

              that.setData({
                markers: markers,
                includeMarkers: includeMarkers,
                showModalStatus: false,
                hideModalStatus: true,
                scroll_height: 320
              })
            }
            that.setData({
              theaterChosenList: tmpfirstTheaterlist,
              theaterList: tmpSecondTheaterlist,
              currentpage: 1,
              chosenTheater: tmpTheaterlist[0],
              totalPage: result.data.totalPage
            })
          } else {
            wx.showModal({
              title: '提示',
              content: '没有找到相关的影院',
              showCancel: false
            })
            that.setData({
              markers: [],
              theaterChosenList: [],
              theaterList: [],
              currentpage: 1,
              chosenTheater: {},
              totalPage: 1
            })
          }
        }
      } else {
        if (result.errCode == 0) {
          var tmplist = new Array();
          tmplist = that.data.theaterList;
          for (var i = 0; i < result.data.list.length; i++) {
            tmplist.push(result.data.list[i]);
          }
          that.setData({
            currentpage: pagenum,
            theaterList: tmplist,
            btmRefresh: true
          })
        }
      }
    })
  },
  getTotalTheaterList: function(pageNum) {
    var that = this;
    requestUtil.requestPost(urlConfig.CINEMA_LIST, {
      "keyword": "",
      "lat": that.data.latitude,
      "lon": that.data.longitude,
      "cityId": wx.getStorageSync("cityId"),
      "page": pageNum
    }).then((result) => {
      if (result.errCode == 0) {
        var isUselessSet = 1;
        if (result.data.totalPage == pageNum) {
          isUselessSet = 0;
        }
        console.log("isUselessSet:" + isUselessSet)
        var tmpTheaterlist = new Array();
        var tmpSecondTheaterlist = new Array();
        tmpSecondTheaterlist = this.data.theaterList;
        tmpTheaterlist = result.data.list;
        if (tmpTheaterlist.length > 0) {
          for (var i = 0; i < tmpTheaterlist.length; i++) {
            if (tmpTheaterlist[i].id != this.data.theaterChosenList[0].id) {
              tmpSecondTheaterlist.push(tmpTheaterlist[i]);
            }
          }
          that.setData({
            theaterList: tmpSecondTheaterlist,
            currentpage: pageNum,
            totalPage: result.data.totalPage,
            isUselessSet: isUselessSet,
            btmRefresh: true
          })
        }
      }
    })
  },
  lower(e) {
    console.log("上拉刷新")
    if (this.data.btmRefresh) {
      let that = this
      const page = that.data.currentpage
      console.log("上拉刷新" + page)
      if (page < that.data.totalPage) {
        console.log("scrollview down")
        that.setData({
          btmRefresh: false
        }, function() {
          wx.vibrateShort()
          if (this.data.isUselessSet == 0) {
            this.getTheaterList(page + 1);
          } else {
            this.getTotalTheaterList(page + 1);
          }
        })
      }
    }
  }

})