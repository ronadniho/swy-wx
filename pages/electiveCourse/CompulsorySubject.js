
var __GlobalInfo = require('../../utils/config.js');
var util = require('../../utils/util.js');
//获取应用实例
const app = getApp()
Page({
  data: {
    GlobalInfo: __GlobalInfo,
  },
  onLoad: function (e) {
    var that = this;
    console.log(e.ifmustclass)
    var ifmustclass = e.ifmustclass
    util.getServerData({
      "key": ["getMustOrChoiceClassDataListForWCate", "getMustOrChoiceClassTotalcountForWCate"],
      postData: {
        userid: wx.getStorageSync('loginUser').studentId,
        keywords1: "",
        keywords2: "",
        ifmustclass: ifmustclass,
        pageindex: 0,
        pagesize: 5
      }
    }, "api/CommonSQL", function (result) {
      console.log(result)
      var result = result[0].data
      if (result) {
        for (var i = 0; i < result.length; i++) {
          result[i].progress = util.returnFloat(parseFloat(result[i].progress) * 100);
        }
      }
      that.setData({
        PlanInClassList: result,
      })
    }, "POST")
  },
  // 专题——必修详情
  detailsjzt: function (e) {
    console.log(e)
    var that = this;
    var item = e.currentTarget.dataset.item;

    console.log(item)
    var url = item.phonerichmediaurl;
    var classid = item.id;
    if (item.ifopenrichmedia == 1 || !url == '') {
      // 查询是否已报名 
      util.getServerData({
        "key": ["GetIsSignUp"],
        "postData": {
          "classid": classid,
          "studentid": wx.getStorageSync('loginUser').studentId
        }
      }, "api/CommonSQL", function (result) {
        console.log(result)
        // 已报名
        if (result.length > 0) {
          url = url.replace("{{classid}}", classid)
          wx.navigateTo({
            url: `/pages/specialDesc/specialDesc?phonerichmediaurl=${url}&currentTab=0&classid=${item.id}`,
          })
        } else {
          // 去报名
          util.getServerData({
            "classid": classid
          }, "api/SignUp", function (result) {
            console.log(result)
            // 报名成功
            if (result.result == true) {
              wx.navigateTo({
                url: `/pages/specialDesc/specialDesc?phonerichmediaurl=${url}&currentTab=0&classid=${item.id}`,
              })
            }
          }, "post")
        }
      })
    } else {
      wx.navigateTo({
        url: `/pages/specialDesc/specialDesc?classid=${item.id}&currentTab=0`,
      })
    }
  },
  // 加载更多
  loadMore1: function (e) {
    var that = this;
    if (that.data.lastPageSize1 >= that.data.pagesize) {
      var index = that.data.index;
      index++;
      that.setData({
        index: index,
        pageindex: index * that.data.pagesize,
      });
      that.getPageData2()

    } else {
      return;
    }
  },

  onReady: function () {
    
  },
  onShareAppMessage: function (res) {
    
  },
 
 
  onPullDownRefresh: function () {
  
  },
  //跳转到搜索页
 
 
  onChangeTab: function (event){
    
  }
})
