// pages/time/time.js
const requestUtil = require("../../utils/requestUtil")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bindsuccess: false,
    activityId: 0, // 活动id
    isStart: false,
    activityStatus:1,
    title: '线上抢券',
    id:0,
    activityTitle:'',
    countdown: '', 
    endDate2: '',
    activityDetail: [],
    poster:"../../images/video-background.png",
    day:0,
    hour:0,
    minute:0,
    second:0,
    milisecond:0,
    authorizetel: false,
    buttonText:''
  },
  recycleTime(){
    var that = this;
    var date = new Date()
    var now = date.getTime()
    var endtime = that.data.endDate2
    if (endtime.indexOf('-') > -1) {
      var endtime = endtime.replace(/-/g, '/')
    }
    var endDate = new Date(endtime)//设置截止时间
    var end = endDate.getTime()
    var leftTime = end - now                            
    var d, h, m, s, ms
    if (leftTime >= 0) {
      d = Math.floor(leftTime / 1000 / 60 / 60 / 24);
      h = Math.floor(leftTime / 1000 / 60 / 60 % 24);
      m = Math.floor(leftTime / 1000 / 60 % 60);
      s = Math.floor(leftTime / 1000 % 60);
      ms = Math.floor(leftTime % 1000);

      ms = ms < 100 ? "0" + ms : ms
      s = s < 10 ? "0" + s : s
      m = m < 10 ? "0" + m : m
      h += d * 24
      h = h < 10 ? "0" + h : h
      
      that.setData({
        countdown: d + "&nbsp;:&nbsp;" + h + "&nbsp;:&nbsp;" + m + "&nbsp;:&nbsp;" + s + "&nbsp;:&nbsp;" + ms,
        hour:h,
        minute:m,
        second:s,
        milisecond:ms
      })
      //递归每秒调用，显示动态时间效果
      setTimeout(that.recycleTime, 100);
    } else {
      console.log('已截止recycleTime')
      that.setData({
        countdown: '00:00:00'
      })
      if (!that.data.isStart) {
        wx.redirectTo({
          url: "/pages/time/time?activityId=" + that.data.activityId,
        })
      }
    }
  },
  // 判断活动的开始时间
  judgStartTime(startdate) {
    var date = new Date()
    var now = date.getTime()
    var endtime = startdate
    if (endtime.indexOf('-') > -1) {
      var endtime = endtime.replace(/-/g, '/')
    }
    var endDate = new Date(endtime)//设置截止时间
    var end = endDate.getTime()
    var leftTime = end - now //时间差
    if (leftTime>0) {
      // 未到开始时间
      this.setData({
        isStart: false
      })
    } else {
      // 已到开始时间
      this.setData({
        isStart: true
      })
    }
  },
  countTime(enddate) {
    var that = this;
    var date = new Date()
    var now = date.getTime()
    var endtime = enddate
    if (endtime.indexOf('-') > -1) {
      var endtime = endtime.replace(/-/g, '/')
    }
    var endDate = new Date(endtime)//设置截止时间
    var end = endDate.getTime()
    var leftTime = end - now //时间差                              
    var d, h, m, s, ms
    if (leftTime >= 0) {
      d = Math.floor(leftTime / 1000 / 60 / 60 / 24);
      h = Math.floor(leftTime / 1000 / 60 / 60 % 24);
      m = Math.floor(leftTime / 1000 / 60 % 60);
      s = Math.floor(leftTime / 1000 % 60);
      ms = Math.floor(leftTime % 1000);
      
      ms = ms < 100 ? "0" + ms : ms
      s = s < 10 ? "0" + s : s
      m = m < 10 ? "0" + m : m
      h += d * 24
      h = h < 10 ? "0" + h : h
      that.setData({
        endDate2:enddate,
        day:d,
        hour:h,
        minute:m,
        second:s,
        milisecond:ms
      })
      that.recycleTime() // 进入递归
    } else {
      console.log('已截止')
      that.setData({
        countdown: '00:00:00'
      })
      if (!that.data.isStart) {
        wx.redirectTo({
          url: "/pages/time/time?activityId=" + that.data.activityId,
        })
      }
    }

  },

  formSubmit: function (e) {
    // 获取表单id
    var formId = e.detail.formId;
    // 非真机运行时 formId 应该为 the formId is a mock one
    console.log('表单id:', formId);
    this.gotVoucher(formId);
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
  // regist页面绑定手机成功后返回
  successFromRegist() {
    this.setData({
      authorizetel: false,
      bindsuccess: true
    },function () {
      setTimeout(() => {
        this.setData({
          bindsuccess: false
        })
      }, 1000)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _activityId = options.activityId;
    var that = this;
    that.setData({
      activityId: _activityId
    },function() {
      that.getActivityDetail(_activityId)
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //什么时候触发倒计时，就在什么地方调用这个函数
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    // 停止递归调用
    this.setData({
      endDate2: ''
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var shareTitle = "我正在参加" + this.data.activityTitle + "活动，你也可以赢福利！"
    return {
      title: shareTitle,
    }
  },
  gotVoucher: function(formId){
    // 先判断手机号
    const tel = wx.getStorageSync('tel')
    if (tel == 'empty') {
      this.setData({
        authorizetel: true
      })
      return
    }

    var id = this.data.id;
    requestUtil.requestPost("activity/joinActivity", {
      "activityId": id,
      "code": wx.getStorageSync("icode"),
      "tel": tel,
      "formId":formId
    }).then((result) => {
      if (result.errCode == 0) {
        wx.redirectTo({
          url: "/pages/gotVoucher/gotVoucher?id=" + id + "&validCode=" + result.data.validCode
        })
      }else{
        wx.showToast({
          title: result.errMsg,
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  getActivityDetail: function (activityId) {
    var that = this;
    var tel = "empty";
    if(wx.getStorageSync("tel")!=null){
      tel = wx.getStorageSync("tel");
    }
    requestUtil.requestPost("activity/activityDetail", {
      "activityId": activityId,
      "code": wx.getStorageSync("icode"),
      "tel": tel
    }, false).then((result) => {
      var activityStatus = result.data.state;
      var text = '';
      var status = 0;
      if(activityStatus==1){
        text = '活动未开始';
      }else if(activityStatus==2){
        if(result.data.canJoin==0){
          if(result.data.notJoinReason=="参与活动次数已达上限"){
            text = '已参与';
          }else{
            text = '立即抢券';

            wx.showToast({
              title: result.data.notJoinReason,
              icon: 'none',
              mask: true,
              duration: 2500,
            })

          }
        }else{
          text = '立即抢券';
          status = 1;
        }
      }else{
        text = '活动过期';
      }
      that.judgStartTime(result.data.startTime)
      var regular = result.data.regular;
      var json = JSON.parse(regular);
      var ruleList = json['list'];
      var tmplist = new Array();
      for(var i = 0; i<ruleList.length;i++){
        tmplist.push(ruleList[i]);
      }
      if (result.errCode == 0) {
        that.setData({
          id:activityId,
          activityTitle:result.data.title,
          poster:result.data.poster,
          activityDetail:tmplist,
          activityStatus:status,
          buttonText:text,
        })
        that.countTime(that.data.isStart ? result.data.endTime : result.data.startTime)
      }
    })
  }
})