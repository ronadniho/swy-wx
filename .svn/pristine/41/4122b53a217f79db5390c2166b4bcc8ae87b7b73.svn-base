//special.js
var util=require('../../utils/util.js')
//获取应用实例
const app = getApp()

Page({
  data: {
    results:[
        {
          imgs: '../../image/8.png',
          title: '产业规划与战略性招商引资战',
          jieshao: '杨培源（中共上海市委巡视组原副组长、正局巡视专员）',
          num: 3689,
          times:'02-23'
          
        },
        {
          imgs: '../../image/8.png',
          title: '产业规划与战略性招商引资战略决',
          jieshao: '杨培源（中共上海原副组长、正局巡视专员）',
          num: 3601,
           times: '02-23'
        }
    ],
    datatime:'4-23',
  },
  getPageData: function () {
    var that = this;
    util.getServerData({
      "key": ["getAppArticleList"],
      "postData": {
        "article_type": 1,
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
    var that = this;
    that.getPageData();
  }
})
