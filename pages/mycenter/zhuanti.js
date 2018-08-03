// pages/lesdetail/teacherlist.js
var __GlobalInfo = require('../../utils/config.js');
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    userInfo: {},
    GlobalInfo: __GlobalInfo,
    showLoading: false,
    pageIndex: 1,//当前页数
    pageSize: 15,//每页显示数量
    lastPageSize: 15//最后一页显示数量
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //wx.showNavigationBarLoading() //在标题栏中显示加载
    var that = this;
    that.setData({ userInfo: wx.getStorageSync('loginUser') });
    //查询数字
    that.getTeacherList();
  },
  //获取消息
  getTeacherList: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    var that = this;
    util.getServerData({
      key: ["getMyClassListUseWeicatApp"],
      postData: {
        keywords1: "",
        keywords2: "",
        pageindex: (that.data.pageIndex - 1) * that.data.pageSize,
        pagesize: that.data.pageSize,
        userid: that.data.userInfo.studentId
      }
    }, "api/CommonSQL", function (result) {
      console.log(result);
      if (that.data.pageIndex == 1) {
        //初始化列表
        that.setData({
          list: []
        });
      }
      that.setData({
        lastPageSize: result ? result.length : 0
      });
      var list = that.data.list;
      if (result) {
        for (var i = 0; i < result.length; i++) {
          let playpercentage = result[i].playpercentage;
          if (playpercentage == null || playpercentage == "null"){
            playpercentage = 0;
          }
          result[i].schedulecomp = parseFloat(playpercentage*100).toFixed(2);
          list.push(result[i]);
        }
      }

      that.setData({ list: that.data.list });


      // complete
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
      that.setData({
        showLoading: false
      })
    });
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */

  onPullDownRefresh: function () {
    var that = this;
    that.setData({
      pageIndex: 1
    });
    this.getTeacherList();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    // 显示加载图标
      if(that.data.lastPageSize >= that.data.pageSize){
          that.setData({
              showLoading: true
          });
          that.setData({
              pageIndex: that.data.pageIndex + 1
          });
          that.getTeacherList();
      }
  },
  // 司局级跳转详情
  detailsj: function (event) {
    var that = this;
    wx.navigateTo({
      url: `/pages/specialDesc/specialDesc?classid=${event.currentTarget.dataset.itemid}&currentTab=0`,
    })
  }
})