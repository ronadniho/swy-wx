var __GlobalInfo = require('../../utils/config.js');
var util = require('../../utils/util.js');

//获取应用实例
const app = getApp()
Page({
  data: {
    GlobalInfo: __GlobalInfo,
    selTabIndex: 1,
    sear: true,
    close: false,
    scroll: true,
    inputValue: '',
    first: '',
    two: '',
    userInfo: {},
    wxUserInfo: {},
    turn: false,
    frtcate: [],
    seccate: [],
    PlanInClassList: [],
    coursewarelist_1: [],
    coursewarelist_2: [],
    coursewarelist_4: [],
    getSearch: [],
    searchs: false,
    // 课程分页加载
    pageIndex: 1,
    pageSize: 10,
    lastPageSize1: 10,
    searchnull: false,
    searchkecheng: false,
    loadMore: false,
    change: true,
    // 搜索专题
    names: '',
    codes: ''
  },
  // 搜索过滤课程
  bindInput: function (e) {
    var that = this;
    that.setData({
      inputValue: e.detail.value
    })
    if (that.data.inputValue == '') {
      that.setData({
        searchnull: false
      })
      that.kecheng();
      that.getPageData2();
    } else {
      that.setData({
        first: '',
        two: ''
      })
    }
  },
  searchfilt: function () {
    var that = this;
    if (that.data.currentTab == 0) {
      that.setData({
        currentTab: 1
      })
    }
    that.setData({
      pageIndex: 1,
      pageSize: 10,
      pagesize: 10,
      pageindex: 0
    })
    that.kecheng(that.data.inputValue);
    that.getPageData2(that.data.inputValue);
  },

  close: function () {
    this.setData({
      sear: true,
      close: false,
      inputValue: ''
    })
    this.kecheng();
  },
  closes: function () {
    this.setData({
      inputValue: ''
    })
    this.kecheng();
    this.getPageData2();
  },

  // 分类页面
  classification: function () {
    var that = this;
    that.setData({
      turn: !that.data.turn,
      scroll: !that.data.scroll,
      inputValue: ''
    })
    // if (that.data.turn==true){
    //   that.kecheng()
    // }

  },
  // tab切换
  tabNav: function (e) {
    var that = this;
    if (that.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
    if (that.data.currentTab == 1) {
      wx.showLoading({
        title: '加载中...',
        mask: true,
        success: function () {
          that.getPageData2()
        }
      })
      setTimeout(function () {
        wx.hideLoading()
      }, 2000)
      that.setData({
        names: that.da
      })
    }
    if (that.data.currentTab == 2) {
      wx.showLoading({
        title: '加载中...',
        mask: true,
        success: function () {
          that.kecheng()
        }
      })
      setTimeout(function () {
        wx.hideLoading()
      }, 2000)
    }
  },
  // tab课程切换
  onChangeTab: function (event) {
    this.setData({selTabIndex: event.currentTarget.dataset.tabindex });
    this.getCoursewarelist();
  },
  getCoursewarelist: function () {
    var that = this;
    var lis = that.data["coursewarelist_" + that.data.selTabIndex + ""];
    // 课程——最新 最热 推荐
    util.getServerData({
      "condation": that.data.inputValue,
      "onecate": that.data.first,
      "twocate": that.data.two,
      "courseType": "",
      "searchType": that.data.selTabIndex,
      "pageIndex": that.data.pageIndex,
      "pageSize": that.data.pageSize,
      "allCount": 0,
      "maxSize": 10
    }, "api/getcoursewarelist2", function (result) {
      console.log(that.data.selTabIndex)
      var result = result.list;
      console.log(result)
      //请求数据为空
      if (!result.length == 0) {
        that.setData({
          searchkecheng: false
        })
      } else {
        that.setData({
          searchkecheng: true
        })
      }
    // 分页加载触发
    // 初始化
    if (that.data.pageIndex == 1) {
      that.setData({
        lis: []
      })
    }
   
      for (var i in result) {
        result[i].duration = util.secondToDate(parseInt(result[i].duration) * 60);
      }
      switch (that.data.selTabIndex + "") {
        case "1":
           // 当前页
      that.setData({
        lastPageSize1: result ? result.length : 0
      });
      var lists = that.data.coursewarelist_1;
      if (result) {
        for (var i = 0; i < result.length; i++) {
          lists.push(result[i])
        }
      }
      that.setData({ coursewarelist_1: lists });
          break;
        case "2":
          // 当前页
          that.setData({
            lastPageSize1: result ? result.length : 0
          });
          var lists = that.data.coursewarelist_2;
          if (result) {
            for (var i = 0; i < result.length; i++) {
              lists.push(result[i])
            }
          }
          that.setData({ coursewarelist_2: lists });
          break;
        case "4":
          // 当前页
          that.setData({
            lastPageSize1: result ? result.length : 0
          });
          var lists = that.data.coursewarelist_4;
          if (result) {
            for (var i = 0; i < result.length; i++) {
              lists.push(result[i])
            }
          }
          that.setData({ coursewarelist_4: lists });
          break;
      }
      // 判断音频视频标识
      if (result.list) {
        for (var i = 0; i < result.list.length; i++) {
          var teachervideo = result.list[i].teachervideo, audio_url = result.list[i].audio_url;
          if (teachervideo != '' && teachervideo != 'null' && teachervideo != null
            && audio_url != '' && audio_url != 'null' && audio_url != null) {
            result.list[i].activetype = 3;
          } else if (teachervideo != '' && teachervideo != 'null' && teachervideo != null) {
            result.list[i].activetype = 1;
          } else if (audio_url != '' && audio_url != 'null' && audio_url != null) {
            result.list[i].activetype = 2;
          } else {
            result.list[i].activetype = 0;
          }
        }
      }
    });
  },
  // 加载更多
  loadMore1: function (e) {
    var that = this;
    if (that.data.lastPageSize1 >= that.data.pageSize) {
      that.setData({
        pageIndex: that.data.pageIndex + 1,
      });
      that.getCoursewarelist()
    }
  },
  // 课程——最热跳转详情
  detailhot: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    console.log(that.data.coursewarelist_2)
    wx.navigateTo({
      url: `/pages/lesdetail/detail?id=${that.data.coursewarelist_2[index].coursewareid}`,
    })
  },
  // 课程——推荐跳转详情
  detailtj: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    console.log(that.data.coursewarelist_4)
    wx.navigateTo({
      url: `/pages/lesdetail/detail?id=${that.data.coursewarelist_4[index].coursewareid}`,
    })
  },
  // 课程——最新跳转详情
  detailnew: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    console.log(that.data.coursewarelist_1)
    wx.navigateTo({
      url: `/pages/lesdetail/detail?id=${that.data.coursewarelist_1[index].coursewareid}`,
    })
  },

  onLoad: function () {
    var that = this;
    var callback = result => {
      for (let i = 0; i < result.length; i++) {
        result[i]["choice"] = 0;
      }
      result.splice(0, 0, { "id": "", "name": "全部", "coursecount": 0, "choice": 1 });
      that.setData({
        frtcate: result
      })
    }
    util.getServerData({
      "key": ["mystudy-allcourse-category"],
      "postData": { "fid": "0" }
    }, "api/CommonSQL", function (result) {
      callback(result);
    });

    wx.getSystemInfo({
      success: function (res) {
        var Heights = res.windowHeight;
        that.setData({
          clientHeight: Heights, //设备的高度等于scroll-view内容的高度
        });
      }
    }),
    that.getCoursewarelist();
  },
  onReady: function () {

  },
  choiceFir: function (e) {
    let item = e.currentTarget.dataset.item;
    let frtcate = this.data.frtcate;
    for (let i = 0; i < frtcate.length; i++) {
      frtcate[i]["choice"] = 0;
      if (frtcate[i].id == item.id) {
        frtcate[i]["choice"] = 1;
      }
    }
    var callback = res => {
      for (let i = 0; i < res.length; i++) {
        res[i]["choice"] = 0;
      }
      res.splice(0, 0, { "id": "", "name": "全部", "coursecount": 0, "choice": 1 });
      this.setData({
        seccate: res,
        frtcate: frtcate,
        first: item.id
      })
      console.log(this.data.first)
    }
    util.getServerData({
      "key": ["mystudy-allcourse-category"],
      "postData": { "fid": item.id }
    }, "api/CommonSQL", function (result) {
      callback(result);
    });
  },
  choiceSer: function (e) {
    let item = e.currentTarget.dataset.item;
    let seccate = this.data.seccate;
    for (let i = 0; i < seccate.length; i++) {
      seccate[i]["choice"] = 0;
      if (seccate[i].id == item.id) {
        seccate[i]["choice"] = 1;
      }
    }
    this.setData({
      seccate: seccate,
      turn: false,
      currentTab: 2,
      two: item.id
    })
    this.getCoursewarelist(this.data.two)
  },
  // 课程
  // kecheng: function () {
  //   var that = this;
  //   var obj = {
  //     "condation": that.data.inputValue,
  //     "onecate": that.data.first,
  //     "twocate": that.data.two,
  //     "courseType": "",
  //     "searchType": 1,
  //     "pageIndex": that.data.pageIndex,
  //     "pageSize": that.data.pageSize,
  //     "allCount": 0,
  //     "maxSize": 10
  //   };
  //   util.getServerData(obj, "api/getcoursewarelist2", function (result) {
  //     console.log(result)
  //     var result = result.list;
  //     // 请求数据为空
  //     if (!result.length == 0) {
  //       that.setData({
  //         searchkecheng: false
  //       })
  //     } else {
  //       that.setData({
  //         searchkecheng: true
  //       })
  //     }
  //     for (var i = 0; i < result.length; i++) {
  //       // 格式化时间
  //       var time1 = parseInt(result[i].duration) * 60;
  //       result[i].duration = util.secondToDate(time1);
  //     }
  //     // 分页加载触发
  //     // 初始化
  //     if (that.data.pageIndex == 1) {
  //       that.setData({
  //         list: []
  //       })
  //     }
  //     // 当前页
  //     that.setData({
  //       lastPageSize2: result ? result.length : 0
  //     });
  //     var lists = that.data.list;
  //     if (result) {
  //       for (var i = 0; i < result.length; i++) {
  //         lists.push(result[i])
  //       }
  //     }
  //     that.setData({
  //       list: lists
  //     });

  //   }, 'POST');
  // },
 
  //跳转到其他页面
  onGoOtherPage: function (event) {
    wx.navigateTo({
      url: '/pages/' + event.currentTarget.dataset.pagepath
    })
  }
})
