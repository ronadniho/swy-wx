// pages/lesdetail/richmedia.js

var __GlobalInfo = require('../../utils/config.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    __GlobalInfo: __GlobalInfo,
    url: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let coursewareid = options.id;
    let loginUser = wx.getStorageSync('loginUser');
    let url = __GlobalInfo.postUrl + "templates/mobilecourse.html" + "?coursewareid=" + coursewareid + "&userid=" + loginUser.userid + "&accountid=" + loginUser.accountId;
    console.log(url);
    console.log(wx.getStorageSync('loginUser'));
    this.setData({ url: url });
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

  }
})