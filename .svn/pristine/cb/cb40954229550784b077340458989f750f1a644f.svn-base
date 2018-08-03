
var __GlobalInfo = require('../../utils/config.js');
var util = require('../../utils/util.js');
//获取应用实例
const app = getApp()
Page({
  data: {
    GlobalInfo: __GlobalInfo,
    PlanInClassList:[],
    pageindex: 0,
    pagesize: 10,
      index:0,
    lastPageSize: 10,
      ifmustclass:'',
  },
  onLoad: function (e) {

    var that = this;

    // console.log(e.ifmustclass)
      that.setData({
          ifmustclass:e.ifmustclass
      })

      that.xuanxiuzt()
    // util.getServerData({
    //   "key": ["getMustOrChoiceClassDataListForWCate", "getMustOrChoiceClassTotalcountForWCate"],
    //   postData: {
    //     userid: wx.getStorageSync('loginUser').studentId,
    //     keywords1: "",
    //     keywords2: "",
    //     ifmustclass: ifmustclass,
    //     pageindex: that.data.pagesindex,
    //     pagesize: that.data.pagesize
    //   }
    // }, "api/CommonSQL", function (result) {
    //   console.log(result)
    //   var result = result[0].data
    //   if (result) {
    //     for (var i = 0; i < result.length; i++) {
    //       result[i].progress = util.returnFloat(parseFloat(result[i].progress) * 100);
    //     }
    //   }
    //   that.setData({
    //     PlanInClassList: result,
    //   })
    // }, "POST")
  },

  xuanxiuzt:function (){
      var that = this;
      console.log(that.data.ifmustclass)
    util.getServerData({
      "key": ["getMustOrChoiceClassDataListForWCate", "getMustOrChoiceClassTotalcountForWCate"],
      postData: {
        userid: wx.getStorageSync('loginUser').studentId,
        keywords1: "",
        keywords2: "",
        ifmustclass: that.data.ifmustclass,
        pageindex: that.data.pageindex,
        pagesize: that.data.pagesize,
      }
    }, "api/CommonSQL", function (result) {
      console.log(result)
        var result = result[0].data
      // 初始化
      if (that.data.pageindex == 0) {
        that.setData({
          PlanInClassList: []
        })
      }
      // 当前页
      that.setData({
        lastPageSize: result ? result.length : 0,
      });

      var listss = that.data.PlanInClassList;
      if (result) {
        for (var i = 0; i < result.length; i++) {
          listss.push(result[i])
        }
      }
      that.setData({
        PlanInClassList: listss
      })
    }, "POST")
  },
  // 选修专题跳转详情
  detailxuanxiu: function (e) {
    var that = this;
    var item = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: `/pages/specialDesc/specialDesc?classid=${item.id}&currentTab=0`,
    })
  },

  // 加载更多
  loadMore: function (e) {

    var that = this;
    if (that.data.lastPageSize >= that.data.pagesize) {
      var index = that.data.index;
      index++;
      that.setData({
        index: index,
        pageindex: index * that.data.pagesize,
      });
      that.xuanxiuzt()

    } else {
      return;
    }
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
