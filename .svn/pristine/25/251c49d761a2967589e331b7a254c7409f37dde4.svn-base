//special.js
var util = require('../../utils/util.js');
//获取应用实例
const app = getApp()

Page({
  data: {
    datas:[]
  },
  getPageData: function () {
    var that = this;
    util.getServerData({
      "condation": "",
      "searchType": "2",
      "pageIndex": 1,
      "pageSize": 6,
      "isMore": false
    }, "api/CommonSQL", function (result) {
      console.log(result)
      that.setData({
        datas: result,
      })
    }, "POST")
  },
  onLoad:function (){
    var that = this;
    that.getPageData();
  }
})
