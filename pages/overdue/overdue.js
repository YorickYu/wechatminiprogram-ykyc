// pages/time/time.js
const requestUtil = require("../../utils/requestUtil")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'',
    id:0,
    activityStatus:0,
    buttonText:'',
    activityTitle: '',
    poster: "../../images/video-background.png",
    activityTime:'',
    limitMoney: '免费', // 目前只有免费活动，6-20徐总确认
    state:0,
    address:'',
    activityDetail: [],
    // activity:{time:'2018.11.11 周六 10:00',fee:'免费',address:'浦东新区世博大道1200号梅赛德斯文化中心6层'},
    // datelist: ["周日","周一","周二","周三","周四","周五","周六"]
  },


  formSubmit: function (e) {
    // 获取表单id
    var formId = e.detail.formId;
    // 非真机运行时 formId 应该为 the formId is a mock one
    console.log('表单id:', formId);
    this.gotVoucher(formId);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let activityId = options.activityId;
    var that = this;
    that.getActivityDetail(activityId);
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
      
      if (result.errCode == 0) {
        var regular = result.data.regular;
        var json = JSON.parse(regular);
        var ruleList = json['list'];
        var tmplist = new Array();
        for (var i = 0; i < ruleList.length; i++) {
          tmplist.push(ruleList[i]);
        }
        // var limitMoney = ""
        // if (result.data.limitMoney != null) {
        //   limitMoney = result.data.limitMoney + "元"
        // } else if (result.data.limitMoney == 0 || result.data.limitMoney == null) {
        //   limitMoney = "免费"
        // }
        var dayOfWeek = result.data.week;
        var time = result.data.activityTime || ""
        var activitySplitTimeList = ""
        var activityTime = ""
        if (time != "") {
          activitySplitTimeList = time.split(" ")
          activityTime = activitySplitTimeList[0] + " " + result.data.week + " " + activitySplitTimeList[1].substring(0, activitySplitTimeList[1].length - 3)
        }
        var activityStatus = result.data.state;
        var status = 0;
        var text = '';
        if (activityStatus == 1) {
          text = '活动未开始';
        } else if (activityStatus == 2) {
          if (result.data.canJoin == 0) {
            if (result.data.notJoinReason == "参与活动次数已达上限") {
              text = '已报名';
            } else {
              text = '参与报名';

              wx.showToast({
                title: result.data.notJoinReason,
                icon: 'none',
                mask: true,
                duration: 2500
              })

            }
          } else {
            text = '参与报名';
            status = 1;
          }
        } else {
          text = '活动过期';
        }
        var title = '';
        if (result.data.type == 0) {
          title = '线下送票';
        } else {
          title = '线上送票';
        }
        that.setData({
          id:activityId,
          activityTitle:result.data.title,
          poster:result.data.poster,
          activityDetail:tmplist,
          activityTime:activityTime,
          address:result.data.address,
          activityTitle:result.data.title,
          // limitMoney:limitMoney,
          buttonText:text,
          activityStatus:status,
          title:title
        })
      }
   })
  },
  gotVoucher: function(formId){
    
    var id = this.data.id;
    console.log(id);
    requestUtil.requestPost("activity/joinActivity", {
      "activityId": id,
      "code": wx.getStorageSync("icode"),
      "tel": wx.getStorageSync('tel'),
      "formId":formId
    }).then((result) => {
      if (result.errCode == 0) {
        wx.redirectTo({
          url:"/pages/gotVoucher/gotVoucher?id="+ id + "&validCode="
        })
      }else{
        wx.showToast({
          title: result.errMsg,
          icon: 'none',
          duration: 2000
        })
      }
    })
  }
})