//special.js
var util=require('../../utils/util.js');
//获取应用实例
const app = getApp()

Page({
  data: {
    datas1:[],
    datas2:[],
    datas3:[],
    datas:[],
    currentTab: 0,
  },
  bindChange: function (e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    })
  },
  tabNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  // 未报名
  getPageData1: function () {
    var that = this;
    util.getServerData({
      "key": ["getPlanClassByUser"],
      "postData": {
        plancategory: 2,
        userid: "5cff189e-9690-11e6-a71f-00fffab6298f",
        keywords1: "",
        keywords2: ""
      }
    }, "api/CommonSQL", function (result) {
      // console.log(result)
      that.setData({
        datas1:result,
      })
    }, "POST")
  },
  // 已报名
  getPageData2: function () {
    var that = this;
    util.getServerData({
      "key": ["getSignClassByUser"],
      "postData": {
        graduatestatus: 0,
        userid: "5cff189e-9690-11e6-a71f-00fffab6298f",
        keywords1: "",
        keywords2: ""
      }
    }, "api/CommonSQL", function (result) {
      console.log(result)
      that.setData({
        datas2: result,
      })
    }, "POST")
  },
  // 已完成
  getPageData3: function () {
    var that = this;
    util.getServerData({
      "key": ["getCompleteClassByUser"],
      "postData": {
        graduatestatus: 0,
        userid: "5cff189e-9690-11e6-a71f-00fffab6298f",
        keywords1: "",
        keywords2: ""
      }
    }, "api/CommonSQL", function (result) {
      console.log(result)
      that.setData({
        datas3: result,
      })
    }, "POST")
  },  
  // 详情页
  details:function (e){
    var that = this;
    var index = e.currentTarget.dataset.index;
    if (that.data.currentTab==1){
      console.log(that.data.datas1[index]);
      wx.navigateTo({
        url: '/pages/lesdetail/detail?id=' + that.data.datas1[index],
      })
    }
    if (that.data.currentTab == 0){
      console.log(that.data.datas2[index]);
      wx.navigateTo({
        url: '/pages/lesdetail/detail?id=' + that.data.datas2[index],
      })
    }
    if (that.data.currentTab == 2) {
      console.log(that.data.datas3[index]);
      wx.navigateTo({
        url: '/pages/lesdetail/detail?id=' + that.data.datas3[index],
      })
    }
  },
  onLoad: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        var Heights = res.windowHeight;
        that.setData({
          clientHeight: Heights, //设备的高度等于scroll-view内容的高度
        });
      }
    })
     that.getPageData1();
    that.getPageData2();
    that.getPageData3();
  }
})
