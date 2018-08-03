//special.js
var util = require('../../utils/util.js')
//获取应用实例
const app = getApp()

Page({
  data: {
    results:[]
  },

  getPageData: function () {
    var that = this;
    util.getServerData({
      "key": ["getAppArticleList"],
      "postData": {
        "article_type": 0,
        "status": 1
      }
    }, "api/CommonSQL", function (result) {
      console.log(result)
      // that.setData({
      //   results: result,
      // })
    }, "POST")
  },
  onLoad:function (){
    var that=this;
    that.getPageData();
  }
})
