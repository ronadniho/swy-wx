
var __GlobalInfo = require('../../utils/config.js');
var util = require('../../utils/util.js');
//获取应用实例
const app = getApp()
Page({
  data: {
    GlobalInfo: __GlobalInfo,
    coursewarelist_4: [],
    pageIndex: 1,
    pageSize: 10,
    lastPageSize: 10,
  },
  onLoad: function (e) {
    var that = this;
    console.log(e.searchType)
    var searchType = e.searchType
    util.getServerData({
      "condation": "",
      "onecate": "",
      "twocate": "",
      "courseType": "",
      "searchType": searchType,
      "pageIndex": 1,
      "pageSize": 10,
      "allCount": 0,
      "maxSize": 10,
      "studentid": wx.getStorageSync('loginUser').studentId
    }, "api/getcoursewarelistforwcate", function (result) {
      console.log(result)
      for (var i in result.list) {
        result.list[i].duration = util.secondToDate(parseInt(result.list[i].duration) * 60);
      }
      that.setData({ coursewarelist_4: result.list});
    }, "post");
  },
  // 专题——必修
  tuijian: function () {
    var that = this;
    var obj = {
      "condation": "",
      "onecate": "",
      "twocate": "",
      "courseType": "",
      "searchType": 4,
      "pageIndex": that.data.pageIndex,
      "pageSize": that.data.pageSize,
      "allCount": 0,
      "maxSize": 10,
      "studentid": wx.getStorageSync('loginUser').studentId
    };
    util.getServerData(obj, "api/getcoursewarelistforwcate", function (result) {
      console.log(result)
      var result = result.list;
      for (var i in result) {
        result[i].duration = util.secondToDate(parseInt(result[i].duration) * 60);
      }
      // 分页加载触发
      // 初始化
      if (that.data.pageIndex == 1) {
        that.setData({
          coursewarelist_4: []
        })
      }
      // 当前页
      that.setData({
        lastPageSize: result ? result.length : 0
      });
      var lists = that.data.coursewarelist_4;
      if (result) {
        for (var i = 0; i < result.length; i++) {
          lists.push(result[i])
        }
      }
      that.setData({
        coursewarelist_4: lists
      });

    }, 'POST');

  },
  // 加载更多
  loadMore: function (e) {
    var that = this;
    if (that.data.lastPageSize >= that.data.pageSize) {
      that.setData({
        pageIndex: that.data.pageIndex + 1,
      });
      that.tuijian()
    }
  },
  // 课程——推荐——推荐课程跳转详情
  detailtj: function (e) {
    var that = this;
    var item = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: `/pages/lesdetail/detail?id=${item.coursewareid}`,
    })
  },
  onReady: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        var Heights = res.windowHeight;
        that.setData({
          clientHeight: Heights, //设备的高度等于scroll-view内容的高度
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
