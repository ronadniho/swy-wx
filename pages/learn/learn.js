var __GlobalInfo = require('../../utils/config.js');
var util = require('../../utils/util.js');
const part = require('../lesdetail/detailx_part.js');
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
    yinpingshipin: false,
    del: true
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this;
    that.studylist();
    // 页面初始化 options为页面跳转所带来的参数  
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

    util.getServerData({
      "key": ["getUserStudyTime"],
      "postData": {
        "studentid": wx.getStorageSync('loginUser').studentId
      }
    }, "api/CommonSQL", function (result) {
      console.log(result);
      result[0].alltime = parseInt(result[0].alltime / 360);
      that.setData({ numberTime: result[0] });
    });


    var that = this;
    util.getServerData({
      "studentid": wx.getStorageSync('loginUser').studentId,
      "userid": wx.getStorageSync('loginUser').studentId
    }, "api/getMyClassAndCourseware", function (result) {
      console.log(result)
      wx.hideNavigationBarLoading(); //完成停止加载
      wx.stopPullDownRefresh(); //停止下拉刷新

      var result1 = result.classlist.data;
      var result2 = result.coursewarelist.data;

      for (var i in result2) {
        result2[i].duration = util.secondToDate(parseInt(result2[i].duration) * 60);
        if (result2[i].playpercentage == null) {
          result2[i].playpercentage = '0%'
        }
      }
      // 判断音频视频标识
      if (result2 && result2) {
        for (var i = 0; i < result2.length; i++) {
          result2[i].delshow = 0;
          var teachervideo = result2[i].teachervideo, audio_url = result2[i].audio_url;
          if (teachervideo != '' && teachervideo != 'null' && teachervideo != null
            && audio_url != '' && audio_url != 'null' && audio_url != null) {
            result2[i].activetype = 3;
          } else if (teachervideo != '' && teachervideo != 'null' && teachervideo != null) {
            result2[i].activetype = 1;
          } else if (audio_url != '' && audio_url != 'null' && audio_url != null) {
            result2[i].activetype = 2;
          } else {
            result2[i].activetype = 0;
          }
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
      if (result1.length == 0 && result2.length == 0) {
        wx.switchTab({
          url: '/pages/Curriculum/Curriculum'
        })
      }
    })

  },
  // 专题班跳转详情
  detailzt: function (e) {
    var that = this;
    var item = e.currentTarget.dataset.item;
    console.log(item)
    wx.navigateTo({
      url: `/pages/lesdetail/detailx?classid=${item.id}`
    })
  },
  // 课程跳转详情
  detailkc: function (e) {
    var that = this;
    var item = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: `/pages/lesdetail/detail?id=${item.coursewareid}`
    })
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

  },
  //点击删除按钮事件  
  delItem: function (e) {
    var that = this
    //获取列表中要删除项的下标  
    var index = e.currentTarget.dataset.index

    let args = {
      "studentid": wx.getStorageSync('loginUser').studentId,
      "coursewareid": e.currentTarget.dataset.item.coursewareid
    }
    util.getServerData(args, "api/deleteToBeStudiedUseWeicatApp/delete", function (result) {


      wx.showToast({
        title: result.message,
        icon: 'none',
        duration: 2000,
        complete: function () {
          console.log(index)
          if (result.result) {
            var list = that.data.studylists2;

            list.forEach(function (item) {
              if (item.coursewareid.trim() == e.currentTarget.dataset.item.coursewareid.trim()){
                item.delshow = 1;
              }
            });

          
            //更新列表的状态  
            that.setData({
              studylists2: list,
            });
          }

        }
      })



    });


  }

})
