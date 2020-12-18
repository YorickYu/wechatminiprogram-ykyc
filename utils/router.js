
/**
 * type (Int) 1 外链, 2 内链, 3 小程序, 4 ...
 * url 
 * param json数据
 */
function handle(type, url, param = "") {
  var targetpath = "/pages"
  // 内链
  if (type == 2) {
    console.log("original param", param)
    var obj = JSON.parse(param)
    var p = paramToString(obj)
    switch (url) {
      case "coupon":
        targetpath += '/coupon/coupon'
        break
      case "cinema":
        targetpath += '/cinemaPlan/cinemaPlan' + '?' + p
        break
      case "video":
        targetpath += '/ykyc/ykyc'
        break
      case "activity":
        targetpath += '/activity-list/activity-list'
        break
      case "videoDetail":
        targetpath += '/ykyc-detail/ykyc-detail' + '?' + p
        break
      case "activityDetail":
        const type = parseInt(obj['type'])
        targetpath += (type == 2) ? '/time/time' : '/overdue/overdue'
        targetpath += '?' + p
        break
      case "creditsExchange":
        targetpath += '/credits-exchange/credits-exchange'
        break
      case "memberShip":
        targetpath += '/purchase-vip/purchase-vip' + '?' + p
        break
      default:
        targetpath = ''
        break
    }

    console.log("route", targetpath)
    if (url == 'video') {
      wx.switchTab({ url: targetpath })
      return
    }
    wx.navigateTo({ url: targetpath })

  } else if (type == 1) { // 外链
    var targetpath = "/pages/outerweb/outerweb?outurl=" + url

  } else if (type == 3) { // 小程序

  }
}

function paramToString(param) {
  // 默认给一个route， 用于判断跳转来源
  var json = 'route=1&' 
  for (var key in param) {
    if (Array.isArray(param[key]) || param[key] == '') { continue }

    json += key
    json += '='
    json += param[key]
    json += '&'
  }
  return json.slice(0, json.length-1)
}


module.exports = {
  handle: handle
}