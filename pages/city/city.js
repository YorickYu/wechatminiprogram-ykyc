
/** 城市元素模版
  cityItem: {
    id: "340800",
    pingyin: "anqingshi",
    index: "A",
    cityName: "安庆市"
  }
*/

const requestUtil = require("../../utils/requestUtil")
const urlConfig = require("../../utils/urlConfig")

Page({
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.hideShareMenu()

    var list = wx.getStorageSync('currentCities') || []
    const item = {
      id: wx.getStorageSync('cityId'),
      pingyin: "",
      index: "",
      cityName: wx.getStorageSync('city')
    }

    // 最近访问城市
    if (list.length == 0) {
      list.push(item)
      this.setData({
        recentCityList: list
      }, function() {
        wx.setStorageSync('currentCities', list)
      })
    } else {
      this.setData({
        recentCityList: list
      })
    }

    // 当前城市
    this.setData({
      currentCity: item
    })
  },

  requestCityList() {
    let that = this
    requestUtil.requestPost(urlConfig.GET_CITY_LIST, {}).then((res) => {
      if (res.errCode == 0) {
        that.setData({
          respondHotCityList: res.data.hotCityList,
          respondAllCityList: res.data.allCityList
        }, function() {
          /* 处理数据 */
          // 热门城市
          var temphotlist = []
          for (var i in res.data.hotCityList) {
            let hotCityListItem = res.data.hotCityList[i]
            for (var j in hotCityListItem.cityList) {
              let innerListItem = hotCityListItem.cityList[j]
              temphotlist.push(innerListItem)
            }
          }
          that.setData({
            targetHotCityList: temphotlist
          })


          // 更多城市
          var tempalllist = []
          var templetterlist = []
          for (var i in res.data.allCityList) {
            let allCityListItem = res.data.allCityList[i]
            let item = {
              cityName: allCityListItem.groupKey
            }
            templetterlist.push(item)
            tempalllist.push(item)
            for (var j in allCityListItem.cityList) {
              let innerListItem = allCityListItem.cityList[j]
              tempalllist.push(innerListItem)
            }
          }
          that.setData({
            targetAllCityList: tempalllist,
            cityAZ: templetterlist
          })
          // console.log(tempalllist)
        })
      }
    })
  },

  bindAZ: function(e) {
    var name = e.currentTarget.dataset.id
    this.scrollTo(name)
  },

  handlerMove(e) {
    let moveY = e.touches[0].clientY
    let rY = moveY - 150
    if (rY >= 0) {
      let index = Math.ceil((rY - 14) / 14)
      if (0 <= index < this.data.cityAZ.length) {
        var mode = this.data.cityAZ[index]
        this.scrollTo(mode.cityName)
      }
    }
  },

  scrollTo(name) {
    var that = this;
    //放入A-Z的scrollTop参数
    if (that.data.scrollAZ == null) {
      wx.createSelectorQuery().selectAll('.city-item-A-Z').fields({
        dataset: true,
        size: true,
        rect: true
      }, function (res) {
        res.forEach(function (re) {
          if (name == re.dataset.cityname) {
            wx.pageScrollTo({
              scrollTop: re.top + that.data.scrollNow - 62.5,
              duration: 0
            })
          }
        })
      }).exec();
    } else {
      this.data.scrollAZ.forEach(function (re) {
        if (name == re.dataset.cityname) {
          wx.pageScrollTo({
            scrollTop: re.top + that.data.scrollNow - 62.5,
            duration: 0
          })
        }
      })
    }
  },

  onPageScroll: function(e) { // 获取滚动条当前位置
    this.setData({
      scrollNow: e.scrollTop
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.requestCityList()
  },

  citySelected: function(e) {
    var temp = e.currentTarget.dataset.cityitem

    // 城市未变更时直接退出
    if (temp.id == wx.getStorageSync('cityId')) {
      this.returnhome()
      return;
    }

    // 添加至最近访问城市
    var list = wx.getStorageSync('currentCities') || []
    var flag = false // 说明数组中没有重复元素
    for (var index in list) {
      const item = list[index]
      if (item.id == temp.id) {
        flag = true
        break
      }else {
        console.log(item.cityName)
      }
    }
    if (!flag) { // 循环结束判断flag
      if (list.length >= 3) {
        list.pop()
      }
      list.unshift(temp)
      wx.setStorageSync('currentCities', list)
    }

    // 城市变更时，更换city和cityId，并重新请求首页数据
    try {
      wx.setStorageSync('cityId', temp.id)
      wx.setStorageSync('city', temp.cityName)
    } catch (e) {
      console.log("catch error", e)
    }
    
    /*
    //当前页面
    let pages = getCurrentPages();
    //上一页面
    let prevPage = pages[pages.length - 2];
    // prevPage.requestHome()
    prevPage.setData({
      cityname: temp.cityName
    })
    */
  
    wx.navigateBack({
      delta: 1
    })

  },

  returnhome() {
    wx.navigateBack({
      delta: 1
    })  
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
 
  
  
  /**
   * 页面的初始数据
   */
  data: {
    currentCity: {},
    recentCityList: [/*cityItem*/],
    targetHotCityList: [/*cityItem*/],
    targetAllCityList: [/*cityItem*/],
    cityAZ: [/*{cityName: '-'}*/],
    scrollAZ: null,
    scrollNow: 0,
  }
})