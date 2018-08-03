var util = require('../../utils/util.js');
var __GlobalInfo = require('../../utils/config.js');

// pages/login/welcome.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let start = new Date();
    console.log(start);
    console.log(start.getMilliseconds());
    wx.request({
      url: 'https://file.e-celap.com/FileDownLoad/staticJson/getIndexMicroVideo.json', //仅为示例，并非真实的接口地址
      data: {
        x: '',
        y: ''
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        let end = new Date();
        console.log(end);
        console.log(end.getMilliseconds());
      }
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
  
  },
  goLogin: function () {

    var sessionId = wx.getStorageSync('sessionId');
    let _header = getApp().globalData.header;
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

        if (res.statusCode == 200 && res.data.code == "success" && res.data.loginUser && res.data.loginUser.sessionId != "") {
          wx.reLaunch({
            url: "/pages/electiveCourse/electiveCourse"
          })
        }
        else {
          wx.request({
            url: __GlobalInfo.postUrl + 'api/GetSessionId',
            data: {},
            header: _header,
            success: res => {

              var sessionId = res.data.sessionId;

              let cookieVal = 'ASP.NET_SessionId=' + sessionId;

              wx.setStorage({
                key: 'sessionId',
                data: cookieVal,
                success: res => {
                  _header.Cookie = cookieVal;
                  getApp().globalData.header = _header;
                  wx.reLaunch({
                    url: "/pages/login/login"
                  })
                }
              })
            }
          })
        }

      }
    })

    
  }
})