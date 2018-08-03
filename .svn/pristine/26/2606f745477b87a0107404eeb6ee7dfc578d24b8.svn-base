//special.js
var __GlobalInfo = require('../../utils/config.js');
var util = require('../../utils/util.js');
//获取应用实例
const app = getApp()
Page({
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    userInfo: {},
    PlanInClassList:[],
    GlobalInfo: __GlobalInfo,
    selTabIndex:1,
    coursewarelist_1: [],
    coursewarelist_2: [],
    coursewarelist_4: []
  },
  setNavigationBarTitleText: function () {
    wx.setNavigationBarTitle({
      title: '中国干部网络学院.浦东分院'
    });
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#F34141'
    })
  },
  onLoad: function () {
    this.setNavigationBarTitleText();
    wx.showShareMenu({
      withShareTicket: true
    });
  },
  onReady: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    var that = this;
    that.getPageData();
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '中国干部网络学院.浦东分院',
      path: '/pages/index/index',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  getPageData:function(){
    var that = this;
    //司局专修班
    util.getServerData({
      "key": ["GetPlanInClassList"],
      "postData": {}
    },"api/CommonSQL",function(result){
      console.log(result);
      that.setData({ PlanInClassList: result });
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    });
    that.getCoursewarelist();
  },
  getCoursewarelist: function () {
    var that = this;
    if (that.data["coursewarelist_" + that.data.selTabIndex+""].length>0){
      return;
    }
    //最新 最热 推荐
    util.getServerData({
      "condation": "",
      "onecate": "",
      "twocate": "",
      "courseType": "",
      "searchType": that.data.selTabIndex,
      "pageIndex": 1,
      "pageSize": 5,
      "allCount": 0,
      "maxSize": 5
    }, "api/getcoursewarelist2", function (result) {
      // console.log(result);
      for(var i in result.list){
        result.list[i].duration = util.secondToDate(result.list[i].duration);
      }
      switch (that.data.selTabIndex+""){
        case "1":
          that.setData({ coursewarelist_1: result.list });
          break;
        case "2":
          that.setData({ coursewarelist_2: result.list });
          break;
        case "4":
          that.setData({ coursewarelist_4: result.list });
          break;
      }
    });
  },
  onPullDownRefresh: function () {
    var that = this;
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.getPageData();
  },
  //跳转到搜索页
  onGoSerachPage: function () {
    wx.navigateTo({
      url: '/pages/serach/index'
    })
  },
  //跳转到其他页面
  onGoOtherPage: function (event) {
    wx.navigateTo({
      url: '/pages/' + event.currentTarget.dataset.pagepath
    })
  },
  onSwitchTabPage:function(event){
    wx.switchTab({
      url: '/pages/' + event.currentTarget.dataset.pagepath
    })
  },
  onChangeTab: function (event){
    this.setData({ selTabIndex: event.currentTarget.dataset.tabindex});
    this.getCoursewarelist();
  }
})
