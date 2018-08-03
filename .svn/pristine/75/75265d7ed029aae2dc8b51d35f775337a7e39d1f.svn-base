// pages/lesdetail/teacherlist.js
var __GlobalInfo = require('../../utils/config.js');
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
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
    var that = this;
    that.setData({ userInfo: wx.getStorageSync('loginUser') });
    //查询数字
    that.getTeacherList();
  },
  //获取消息
  getTeacherList: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    var that = this;
    /*util.getServerData({
        "key": ["selectFinishedCourseware"],
        "postData": {
            "studentid": that.data.userInfo.studentId,
            "pageindex": (that.data.pageIndex - 1) * that.data.pageSize,
            "pagesize": that.data.pageSize
        }
    }, "api/CommonSQL", function (result) {
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
                list.push(result[i]);
            }
        }

        that.setData({list: that.data.list});
        //util.showModel("提示", JSON.stringify(result));


        // complete
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
        that.setData({
            showLoading: false
        })
    });

    */
    console.log(that.data.userInfo.studentId)
    util.getServerData({
      "studentid": that.data.userInfo.studentId,
      "pageindex": that.data.pageIndex,
      "pagesize": that.data.pageSize,
      "isfinished": ''
    }, "api/getMyWaitCourseware/list", function (result) {
      console.log(result)
      if (that.data.pageIndex == 1) {
        //初始化列表
        that.setData({
          list: []
        });
      }
      that.setData({
        lastPageSize: result ? result.dataList.length : 0
      });
      var list = that.data.list;
      if (result.dataList) {
        for (var i = 0; i < result.dataList.length; i++) {

          let vidc = 0;
          var teachervideo = result.dataList[i].teachervideo;
          var audio_url = result.dataList[i].audio_url;
          if (teachervideo != '' && teachervideo != 'null' && teachervideo != null
            && audio_url != '' && audio_url != 'null' && audio_url != null) {
            vidc = 3;
          } else if (teachervideo != '' && teachervideo != 'null' && teachervideo != null) {
            vidc = 1;
          } else if (audio_url != '' && audio_url != 'null' && audio_url != null) {
            vidc = 2;
          }
          result.dataList[i].vidc = vidc;
          list.push(result.dataList[i]);
        }
        console.log(that.data.list)
      }

      that.setData({ list: that.data.list });
      //util.showModel("提示", JSON.stringify(result));


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
    if (that.data.lastPageSize >= that.data.pageSize) {
      that.setData({
        showLoading: true
      });
      that.setData({
        pageIndex: that.data.pageIndex + 1
      });
      that.getTeacherList();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  goDetail: function (event) {
    wx.navigateTo({
      url: '/pages/lesdetail/detail?id=' + event.currentTarget.dataset.itemid
    })
  }
})