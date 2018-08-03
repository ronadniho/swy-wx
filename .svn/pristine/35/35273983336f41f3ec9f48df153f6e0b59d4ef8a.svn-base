const util = require('../../utils/util.js')
const app = getApp()

Page({
  data: {
    frtcate: [],
    seccate: []
  },
  onLoad: function () {
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#F14141'
    })
    wx.setNavigationBarTitle({
      title: "课程分类"
    })

    var callback = res => {

      for (let i = 0; i < res.length; i++) {
        res[i]["choice"] = 0;
      }
      res.splice(0, 0, { "id": "", "name": "全部", "coursecount": 0, "choice": 1 });

      this.setData({
        frtcate: res
      })
    }

    util.getServerData({
      "key": ["mystudy-allcourse-category"],
      "postData": { "fid": "0" }
    }, "api/CommonSQL", function (result) {
      callback(result);
    });

  },
  onReady: function () {

  },
  choiceFir: function (e) {
    let item = e.currentTarget.dataset.item;
    let frtcate = this.data.frtcate;

    for (let i = 0; i < frtcate.length; i++) {
      frtcate[i]["choice"] = 0;
      if (frtcate[i].id == item.id){
        frtcate[i]["choice"] = 1;
      }      
    }

    var callback = res => {

      for (let i = 0; i < res.length; i++) {
        res[i]["choice"] = 0;
      }
      res.splice(0, 0, { "id": "", "name": "全部", "coursecount": 0, "choice": 1 });

      this.setData({
        seccate: res, frtcate: frtcate
      })
    }

    util.getServerData({
      "key": ["mystudy-allcourse-category"],
      "postData": { "fid": item.id }
    }, "api/CommonSQL", function (result) {
      callback(result);
    });

  },
  choiceSer:function(){
    let item = e.currentTarget.dataset.item;
    let seccate = this.data.seccate;

    for (let i = 0; i < seccate.length; i++) {
      seccate[i]["choice"] = 0;
      if (seccate[i].id == item.id) {
        seccate[i]["choice"] = 1;
      }
    }

    this.setData({
      seccate: seccate
    })

  }
})
