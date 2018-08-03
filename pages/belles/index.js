const util = require('../../utils/util.js')

const app = getApp()

Page({
  data: {
    info: {
      title: "",
      content: "",
      videourl: ""
    }
  },
  onLoad: function () {
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#F14141'
    })
    wx.setNavigationBarTitle({
      title: "美文详情"
    });

    var callback = res => {
      console.log(res);
    }

    util.getServerData({
      "key": ["getAppArticleDetail"],
      "postData": {
        status: 1,
        id: "fde5d3e5-6940-4801-848d-56dac6c263f8"
      }
    }, "api/CommonSQL", function (result) {
      callback(result);
    });

  },
  onReady: function () {

  }
})
