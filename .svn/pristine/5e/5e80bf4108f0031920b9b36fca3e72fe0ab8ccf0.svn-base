
var __GlobalInfo = require('../../utils/config.js');
var util = require('../../utils/util.js');
//获取应用实例
const app = getApp()
Page({
  data: {
    GlobalInfo: __GlobalInfo,
    clientHeight: '',
    coursewarelist_1: [],
    pageIndex: 1,
    pageSize: 10,
    lastPageSize: 10,
    condation: '',
    searchnull:false
  },
  onLoad: function (e) {
    var that = this;
    console.log(e)
    var searchType = e.searchType
    var condation = e.condation
    var onecate = e.onecate
    var twocate = e.twocate
      that.param = {
          "condation": condation,
          "onecate": onecate,
          "twocate": twocate,
          "courseType": "",
          "searchType": searchType,
          "pageIndex": that.data.pageIndex,
          "pageSize": that.data.pageSize,
          "allCount": 0,
          "maxSize": 10,
          "studentid": wx.getStorageSync('loginUser').studentId
      };
      util.getServerData(that.param, "api/getcoursewarelist2", function (result) {
      console.log(result)
      var result = result.list
      // 请求数据为空
      if (result.length == 0) {
        console.log(111)
        that.setData({
          searchnull: true
        })
      }
      for (var i in result) {
        result[i].duration = util.secondToDate(parseInt(result[i].duration) * 60);
      }
      that.setData({ coursewarelist_1: result });
    }, "post");
},
  

  zuixin: function () {
    var that = this;
    var obj = {
      "condation": "",
      "onecate": "",
      "twocate": "",
      "courseType": "",
      "searchType": 1,
      "pageIndex": that.data.pageIndex,
      "pageSize": that.data.pageSize,
      "allCount": 0,
      "maxSize": 10,
      "studentid": wx.getStorageSync('loginUser').studentId
    };
    console.log(obj)

    util.getServerData(that.param, "api/getcoursewarelist2", function (result) {
      console.log(result)
      var result = result.list;
      for (var i in result) {
        result[i].duration = util.secondToDate(parseInt(result[i].duration) * 60);
      }
      // 分页加载触发
      // 初始化
      if (that.param.pageIndex == 1) {
        that.setData({
          coursewarelist_1: []
        })
      }
      // 当前页
      that.setData({
        lastPageSize: result ? result.length : 0
      });
      var lists = that.data.coursewarelist_1;
      if (result) {
        for (var i = 0; i < result.length; i++) {
          lists.push(result[i])
        }
      }
      console.log(that.data.coursewarelist_1.teachervideo)
      that.setData({
        coursewarelist_1: lists
      });
    }, 'POST');

  },
  // 加载更多
  loadMore: function (e) {
    var that = this;
    if (that.data.lastPageSize >= that.data.pageSize) {
        that.param.pageIndex++;
      // that.setData({
      //   pageIndex: that.data.pageIndex + 1,
      // });
      that.zuixin()
    }
  },
  // 课程——推荐——最新课程跳转详情
  detailkcnew: function (e) {
    var that = this;
    var item = e.currentTarget.dataset.item;
    if (item.videotype == 3) {
      wx.navigateTo({
        url: '/pages/lesdetail/richmedia?id=' + item.coursewareid
      })
    }
    else {
      util.getServerData({
        studentid: wx.getStorageSync('loginUser').studentId,
        coursewareid: item.coursewareid
      }, "api/inertToBeStudiedUseWeicatApp/save", function (result) {
        wx.navigateTo({
          url: `/pages/lesdetail/detail?id=${item.coursewareid}`,
        })
      });
    }
  },
  onReady: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        var Heights = res.windowHeight;
        that.setData({
          clientHeight: Heights+'px', //设备的高度等于scroll-view内容的高度
        });
      }
    })
  },
  onShareAppMessage: function (res) {

  },


  onPullDownRefresh: function () {

  },
  //跳转到搜索页


  onChangeTab: function (event) {

  }
})
