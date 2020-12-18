const config = require("../config")
const mockUp = require("mockUp")

function requestGet(suffixUrl, parameter, loading = true) {
  return new Promise((resolve, reject) => {
    if (loading) {
      wx.showLoading({
        title: '数据加载中',
        mask: true
      })
    }
    console.log(config.requestPrefixUrl + suffixUrl);
    console.log(parameter)
    if (true) { // 之前是获取 getApp().globalData.mockup
      wx.hideLoading()
      mockUp.request(suffixUrl).then((res) => {
        resolve(res);
      })
      return;
    }
    wx.request({
      url: config.requestPrefixUrl + suffixUrl,
      method: "GET",
      data: parameter,
      success: function(result) {
        wx.hideLoading();
        if (result.statusCode !== 200) {
          if (loading) {
            wx.showToast({
              title: '网络错误或服务器繁忙!',
              icon: 'none',
            })
          }
        } else {
          console.log(result.data, suffixUrl, "get success")
          if (result.data.errCode == 403) {
            wx.navigateTo({
              url: "/pages/authorize-home/authorize-home",
            })
          }
          resolve(result.data)
        }
      },
      fail: function(errMsg) {
        wx.hideLoading()
        if (loading) {
          wx.showToast({
            title: '网络错误或服务器繁忙!',
            icon: 'none',
          })
        }
        console.log(errMsg, suffixUrl, "get error")
        reject(errMsg)
      }
    })
  })
}

function requestPost(suffixUrl, parameter, loading = true) {
  return new Promise((resolve, reject) => {
    if (loading) {
      wx.showLoading({
        title: '数据加载中',
        mask: true
      })
    }
    console.log(config.requestPrefixUrl + suffixUrl);
    console.log(parameter)
    if (true) { // 之前是获取 getApp().globalData.mockup
      wx.hideLoading()
      mockUp.request(suffixUrl).then((res) => {
        resolve(res);
      })
      return;
    }
    wx.request({
      url: config.requestPrefixUrl + suffixUrl,
      method: "POST",
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: parameter,
      success: function(result) {
        wx.hideLoading();
        if (result.statusCode !== 200) {
          if (loading) {
            wx.showToast({
              title: '网络错误或服务器繁忙!',
              icon: 'none',
            })
          }
        } else {
          console.log(result.data, suffixUrl, "post success")

          if (result.data.errCode == 403) {
            wx.navigateTo({
              url: "/pages/authorize-home/authorize-home",
            })
            return
          }
          resolve(result.data)
        }
      },
      fail: function(errMsg) {
        wx.hideLoading()
        if (loading) {
          wx.showToast({
            title: '网络错误或服务器繁忙!',
            icon: 'none',
          })
        }
        console.log(errMsg, suffixUrl, "post error")
        reject(errMsg)
      }
    })
  })
}

module.exports = {
  requestGet: requestGet,
  requestPost: requestPost
}