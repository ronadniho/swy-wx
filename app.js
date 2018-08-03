
var util = require('./utils/util.js');
var __GlobalInfo = require('./utils/config.js');
//app.js

App({
  onLaunch: function () {
    //检测登录
    var sessionId = wx.getStorageSync('sessionId');
    let _header = this.globalData.header;
    if (!util.isBlank(sessionId)) {
      _header.Cookie = sessionId;
    }
    wx.request({
      url: __GlobalInfo.postUrl + 'api/Session',
      data: {
      },
      method: "POST",
      header: _header,
      success: res => {

        if (res.statusCode == 200 && res.data.code == "success" && res.data.loginUser && res.data.loginUser.sessionId != ""){
          wx.reLaunch({
            url: "/pages/electiveCourse/electiveCourse"
          })
        }
        else{
          wx.reLaunch({
            url: "/pages/login/login"
          })
        }
       

      }
    })

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          // wx.getUserInfo({
          //   success: res => {
          //     // 可以将 res 发送给后台解码出 unionId
          //     this.globalData.userInfo = res.userInfo

          //     // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
          //     // 所以此处加入 callback 以防止这种情况
          //     if (this.userInfoReadyCallback) {
          //       this.userInfoReadyCallback(res)
          //     }
          //   }
          // })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    header: { 'content-type': 'application/json', 'Cookie': 'ASP.NET_SessionId=' }
  }
})