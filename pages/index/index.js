var __GlobalInfo = require('../../utils/config.js');
var util = require('../../utils/util.js');
const les_tool = require('../lesdetail/tool.js')

//获取应用实例
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    GlobalInfo: __GlobalInfo,
    studylists1: [],
    studylists2: [],
    numberTime: [],
    yinping: false,
    shipin: false,
    yinpingshipin: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this;
    that.studylist();
  },
  // 考试
  Examination: function () {
    wx.navigateTo({
      url: '/pages/testList/testList'
    })
  },
  // 专题
  special: function () {
    wx.navigateTo({
      url: '/pages/mycenter/zhuanti'
    })
  },
  goOtherPage: function (event) {
    wx.navigateTo({
      url: '/pages/' + event.currentTarget.dataset.pagepath
    })
  },
  // 列表
  studylist: function () {
    var that = this;
    util.getServerData({
      "studentid": wx.getStorageSync('loginUser').studentId,
      "userid": wx.getStorageSync('loginUser').studentId
    }, "api/getMyClassAndCourseware", function (result) {
      console.log(result);

      wx.hideNavigationBarLoading(); //完成停止加载
      wx.stopPullDownRefresh(); //停止下拉刷新

      var result1 = result.classlist.data;
      var result2 = result.coursewarelist.data;
      // 判断音频视频标识
      if (result2 && result2) {
        for (var i = 0; i < result2.length; i++) {
          let vidc = 0;
          let listObject = result2;
          var teachervideo = listObject[i].teachervideo;
          var audio_url = listObject[i].audio_url;
          if (teachervideo != '' && teachervideo != 'null' && teachervideo != null
            && audio_url != '' && audio_url != 'null' && audio_url != null) {
            vidc = 3;
          } else if (teachervideo != '' && teachervideo != 'null' && teachervideo != null) {
            vidc = 1;
          } else if (audio_url != '' && audio_url != 'null' && audio_url != null) {
            vidc = 2;
          }
          result2[i].vidc = vidc;
          result2[i].deleted = 0;
          result2[i].playpercentage = result2[i].playpercentage == null ? "0%" : result2[i].playpercentage;

          let duration = 0
          if (result2[i].duration && result2[i].duration != null && result2[i].duration != "null"){
            duration = les_tool.full_sec_to_time(parseFloat(result2[i].duration)*60);
          }
          result2[i].duration = duration;
        }

      }
      if (result1 && result1) {
        for (var i = 0; i < result1.length; i++) {
          result1[i].schedulecomp = util.returnFloat(parseFloat(result1[i].schedulecomp) * 100);
        }
      }

      that.setData({
        studylists1: result1,
        studylists2: result2
      });
      if (!result1 && !result2) {
        wx.switchTab({
          url: '/pages/Curriculum/Curriculum'
        })
      }
    })

  },
  //取消待学
  cancelStudy: function (e) {
    let that = this;
    let loginUser = wx.getStorageSync('loginUser');
    let id = e.currentTarget.dataset.item.coursewareid;

    util.getServerData({
      studentid: loginUser.studentId,
      coursewareid: id
    }, "api/deleteToBeStudiedUseWeicatApp/delete", function (result) {
      let studylists2 = that.data.studylists2;
      that.data.studylists2.forEach(function (item) {
        if (id.trim() == item.coursewareid.trim()) {
          item.deleted = 1;
        }
      });

      that.setData({ studylists2: studylists2 });

      wx.showToast({
        title: result.result ? "取消成功" : "取消失败",
        icon: 'none',
        duration: 2000
      })
    });

  },
  // 专题班跳转详情
  detailzt: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    console.log(that.data.studylists1[index].id)
    wx.navigateTo({
      url: `/pages/lesdetail/detailx?classid=${that.data.studylists1[index].id}`
    })
  },
  // 课程跳转详情
  detailkc: function (e) {
    var that = this;
    var item = e.currentTarget.dataset.item;
    if (item.videotype == 3) {
      wx.navigateTo({
        url: '/pages/lesdetail/richmedia?id=' + item.coursewareid
      })
    }
    else {
      wx.navigateTo({
        url: `/pages/lesdetail/detailx?lesid=${item.coursewareid}`,
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //wx.showNavigationBarLoading() //在标题栏中显示加载
    this.studylist();
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
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.studylist();
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
