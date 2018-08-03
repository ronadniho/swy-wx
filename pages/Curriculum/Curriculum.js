var __GlobalInfo = require('../../utils/config.js');
var util = require('../../utils/util.js');

//获取应用实例
const app = getApp()
Page({
  data: {
    GlobalInfo: __GlobalInfo,
    currentTab: 0,
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
    teachphotoList: [],
    datas: [],
    getSearch: [],
    searchs: false,
    // 课程——专题分页加载
    results2: [],
    pageindex: 0,
    index: 0,
    pagesize: 10,
    lastPageSize1: 10,
    // 课程分页加载
    Index: 0,
    list: [],
    pageIndex: 1,
    pageSize: 10,
    lastPageSize2: 10,
    searchnull: false,
    searchkecheng:false,
    loadMore: false,
    change: true,
    // 搜索专题
    names: '',
    codes: ''
  },

  //  推荐——司局级必修专题
  getPageData1: function () {
    var that = this;
    util.getServerData({
      "key": ["GetPlanInClassList"],
      "postData": {
        "pageindex": 0,
        "pagesize": 4
      }
    }, "api/CommonSQL", function (result) {
      console.log(result)
      that.setData({
        PlanInClassList: result,
      })
    }, "POST")
  },
  // 司局必修专题——更多
  morezt: function () {
    this.setData({
      currentTab: 1,
    })
    this.getPageData2()
  },
  // 课程——更多
  morekc: function () {
    this.setData({
      currentTab: 2,
    })
    this.kecheng()
  },
  // 老师榜——更多
  onSwitchTabPage: function () {
    wx.navigateTo({
      url: '/pages/lesdetail/teacherlist'
    })
  },
  // 老师图片
  teachphoto: function () {
    var that = this;
    util.getServerData({
      "key": ["getAppTeacherList"],
      "postData": {
        "pageindex": 0,
        "pagesize": 5
      }
    }, "api/CommonSQL", function (result) {
      console.log(result)
      that.setData({
        teachphotoList: result,
      })
    }, "POST")
  },
  // 搜索过滤课程
  bindInput: function (e) {
    var that=this;
    that.setData({
      inputValue: e.detail.value
    })
    if (that.data.inputValue == '') {
      that.setData({
        searchnull:false
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
  // 专题——未报名
  getPageData2: function () {
    var that = this;
    util.getServerData({
      key: ["getPlanClassByUser"],
      postData: {
        keywords1: that.data.inputValue,
        keywords2: that.data.inputValue,
        pageindex: that.data.pageindex,
        pagesize: that.data.pagesize,
        studentid: wx.getStorageSync('loginUser').studentId
      }
    }, "api/CommonSQL", function (result) {
      console.log(result)
      // 请求数据为空
      if (!result.length == 0) {
        that.setData({
          searchnull: false
        })
      } else {
        that.setData({
          searchnull: true
        })
      }
      // 初始化
      if (that.data.pageindex == 0) {
        that.setData({
          results2: []
        })
      }
      // 当前页
      that.setData({
        lastPageSize1: result ? result.length : 0,
        // pageindex: that.data.index * that.data.pagesize
      });

      var listss = that.data.results2;
      if (result) {
        for (var i = 0; i < result.length; i++) {
          listss.push(result[i])
        }
      }
      that.setData({
        results2: listss
      })
      console.log(that.data.pageindex)
    }, "POST")
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
    this.setData({ selTabIndex: event.currentTarget.dataset.tabindex });
    this.getCoursewarelist();
  },
  getCoursewarelist: function () {
    var that = this;
    if (that.data["coursewarelist_" + that.data.selTabIndex + ""].length > 0) {
      return;
    }
    // 课程——最新 最热
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
      console.log(result)
      for (var i in result.list) {
        result.list[i].duration = util.secondToDate(parseInt(result.list[i].duration) * 60);
      }
      switch (that.data.selTabIndex + "") {
        case "1":
          that.setData({ coursewarelist_1: result.list });
          break;
        case "2":
          that.setData({ coursewarelist_2: result.list });
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

  // 司局级跳转详情
  // detailsj: function (event) {
  //   var that = this;
  //   wx.navigateTo({
  //     url: `/pages/specialDesc/specialDesc?classid=${event.currentTarget.dataset.itemid}&currentTab=0`,
  //   })
  // },

  detailsj: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    
    console.log(that.data.PlanInClassList[index])
    var url = that.data.PlanInClassList[index].phonerichmediaurl;
    var classid = that.data.PlanInClassList[index].id;
    if (that.data.PlanInClassList[index].ifopenrichmedia == 1 || !url == '') {
      // 查询是否已报名 
      util.getServerData({
        "key": ["GetIsSignUp"],
        "postData": {
          "classid": classid,
          "studentid": wx.getStorageSync('loginUser').studentId
        }
      }, "api/CommonSQL", function (result) {
        console.log(result)
        if (result.length > 0) {
          url = url.replace("{{class.id}}", classid)
          wx.navigateTo({
            url: `/pages/Curriculum/webview?url=${url}`,
          })
        }
      })
    } else {
      wx.navigateTo({
        url: `/pages/specialDesc/specialDesc?classid=${that.data.PlanInClassList[index].id}&currentTab=0`,
      })
    }
  },
  // 专题跳转详情
  detailzt: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: `/pages/specialDesc/specialDesc?classid=${that.data.results2[index].id}&currentTab=0`,
    })
  },
  // 课程——推荐——最新课程跳转详情
  // detailkc: function (event) {
  //   var that = this;
  //   wx.navigateTo({
  //     url: `/pages/lesdetail/detail?id=${event.currentTarget.dataset.itemid}`,
  //   })
  // },
  detailkcnew: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    console.log(that.data.coursewarelist_1)
    wx.navigateTo({
      url: `/pages/lesdetail/detail?id=${that.data.coursewarelist_1[index].coursewareid}`,
    })
  },
  // 课程——推荐——最热课程跳转详情
  detailkchot: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    console.log(that.data.coursewarelist_2)
    wx.navigateTo({
      url: `/pages/lesdetail/detail?id=${that.data.coursewarelist_2[index].coursewareid}`,
    })
  },
  // 课程——课程跳转详情
  detailkc: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    console.log(that.data.list)
    wx.navigateTo({
      url: `/pages/lesdetail/detail?id=${that.data.list[index].coursewareid}`,
    })
  },
  // 老师跳转详情
  detailteach: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: `/pages/lesdetail/teacher?id=${that.data.teachphotoList[index].id}`,
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
      that.getPageData1();
    that.getCoursewarelist();
    that.teachphoto();
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
    this.kecheng(this.data.two)
  },
  // 课程
  kecheng: function () {
    var that = this;
    var obj = {
      "condation": that.data.inputValue,
      "onecate": that.data.first,
      "twocate": that.data.two,
      "courseType": "",
      "searchType": 1,
      "pageIndex": that.data.pageIndex,
      "pageSize": that.data.pageSize,
      "allCount": 0,
      "maxSize": 10
    };
    util.getServerData(obj, "api/getcoursewarelist2", function (result) {
      console.log(result)
      var result = result.list;
      // 请求数据为空
      if (!result.length == 0) {
        that.setData({
          searchkecheng: false
        })
      }else{
        that.setData({
          searchkecheng: true
        })
      }
      for (var i = 0; i < result.length; i++) {
        // 格式化时间
        var time1 = parseInt(result[i].duration) * 60;
        result[i].duration = util.secondToDate(time1);
      }

      // 上中下分开列表显示

      // let jsonList = [];
      // let arr = [];
      // for (var i = 0; i < result.length; i++) {
      //   // 格式化时间
      //     var time1 = parseInt(result[i].duration) * 60;
      //     result[i].duration = util.secondToDate(time1);
      //     jsonList = JSON.parse(result[i].suitejson)
      //     for (var j = 0; j < jsonList.length; j++) {
      //         arr.push(Object.assign({}, result[i], jsonList[j]))
      //     }
      // }
      // console.log(arr)

      // 分页加载触发
      // 初始化
      if (that.data.pageIndex == 1) {
        that.setData({
          list: []
        })
      }
      // 当前页
      that.setData({
        lastPageSize2: result ? result.length : 0
      });
      var lists = that.data.list;
      if (result) {
        for (var i = 0; i < result.length; i++) {
          lists.push(result[i])
        }
      }
      that.setData({
        list: lists
      });

    }, 'POST');

  },
  loadMore2: function (e) {
    var that = this;
    if (that.data.lastPageSize2 >= that.data.pageSize) {
      that.setData({
        pageIndex: that.data.pageIndex + 1,
      });
      that.kecheng()
    }
  },
  //跳转到其他页面
  onGoOtherPage: function (event) {
    wx.navigateTo({
      url: '/pages/' + event.currentTarget.dataset.pagepath
    })
  }
})
