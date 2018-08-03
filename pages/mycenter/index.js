//special.js
var __GlobalInfo = require('../../utils/config.js');
var util = require('../../utils/util.js');
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    wxUserInfo: {},
    numberTime: [],
    GlobalInfo: __GlobalInfo
  },
  setNavigationBarTitleText: function () {
    wx.setNavigationBarTitle({
      title: '我的'
    });
  },
  onLoad: function () {
    this.setNavigationBarTitleText();
    wx.showShareMenu({
      withShareTicket: true
    });
  },
  onReady: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    var that = this;
    that.getPageData();
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '中国干部网络学院.浦东分院',
      path: '/pages/index/index',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  getPageData: function () {
    //console.log(wx.getStorageSync('loginUser'));
    var that = this;
    util.getServerData({}, "api/Session", function (result) {
      console.log(result);
      that.setData({ userInfo: result.loginUser });
      //查询数字
      util.getServerData({
        "key": ["getUserStudyTime"],
        "postData": {
          "studentid": that.data.userInfo.studentId
        }
      }, "api/CommonSQL", function (result) {
        console.log(result);

        
        let alltime = parseFloat(result[0].alltime);
        result[0].alltime = parseFloat(alltime / 3600).toFixed(1);

        let perc = 0;
        if (result[0].alltime && result[0].alltime != "" && result[0].alltime != "null") {
          perc = parseFloat(result[0].alltime) / 50;
          if (perc < 1) {
            perc = perc.toFixed(2) * 100;
          }
          else {
            perc = 100;
          }
        }
        result[0].perc = perc;

        that.setData({ numberTime: result[0] });


        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
      });
    });
    wx.getUserInfo({
      success: res => {
        that.setData({ wxUserInfo: res.userInfo });
      }
    });

  },
  onPullDownRefresh: function () {
    var that = this;
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.getPageData();
  },
  //跳转到最近学习
  onGoStudy: function () {
    wx.navigateTo({
      url: '/pages/zuijinxuexi/zuijinxuexi'
    })
  },
  //跳转到登录页面
  goLogin: function () {
    getApp().globalData.header = { 'content-type': 'application/json', 'Cookie': 'ASP.NET_SessionId=' };
    wx.removeStorage({
      key: 'sessionId',
      success: function (res) {

        wx.reLaunch({
          url: '/pages/login/login'
        })
      }
    })
    
  },
  goOtherPage: function (event) {
    wx.navigateTo({
      url: '/pages/' + event.currentTarget.dataset.pagepath
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //wx.showNavigationBarLoading() //在标题栏中显示加载
    this.getPageData();
  },
  tip1:function(){
    wx.showToast({
      title: '暂未开放',
      icon: 'none',
      duration: 2000
    })
  }
})
