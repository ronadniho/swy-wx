const util = require('../../utils/util.js')
const les_tool = require('./tool.js')
const polyv = require('../../utils/polyv.js');
var __GlobalInfo = require('../../utils/config.js');
const part = require('detailx_part.js');
const part_query = require('detailx_part_query.js')

const app = getApp()

Page({
  data: {
    timerLan: 0,
    timeCicle: 20000,
    GlobalInfo: __GlobalInfo,
    lesnone: 0,
    lesorsee: -1,//音频与视频切换开关
    isshow: 0,
    videoStart: -1,//音视频播放位置
    videoSrc: "",
    audoSrc: '',
    audoCover: "",
    percent: 0,//音频播放百分比进度
    lastplaytime: 0,
    curTimeString: "00:00",//音频播放时间
    durationString: "00:00",//音频时长
    audioAction: {
      method: 'pause'
    },//音频播放动作
    firstPlay: 0,//
    firstVideoPlay: 0,//
    isAutoPlay: 1,
    currentTab: 0,//tab控制
    info: {
      comment: "",
      title: "",
      studytime: "0",
      clickrate: "0",
      gradecount: "0",
      grade: "0",
      lessions: [],
      ifcollectedcourse: "-1",
      selected_lessions: [],
      isappraise: "-1"
    },
    joinJudgeControl: 0,
    evs: [
      {
        "itemid": 1,
        "itemname": "观点清晰",
        "rate": 0,
        "max": 5,
        "isReadonly": false,
        "overStar": null,
        "percent": 0
      },
      {
        "itemid": 2,
        "itemname": "联系实际",
        "rate": 0,
        "max": 5,
        "isReadonly": false,
        "overStar": null,
        "percent": 0
      },
      {
        "itemid": 3,
        "itemname": "内容丰富",
        "rate": 0, "max": 5,
        "isReadonly": false,
        "overStar": null,
        "percent": 0
      },
      {
        "itemid": 4,
        "itemname": "讲授认真",
        "rate": 0,
        "max": 5,
        "isReadonly": false,
        "overStar": null,
        "percent": 0
      },
      {
        "itemid": 5,
        "itemname": "形式生动",
        "rate": 0,
        "max": 5,
        "isReadonly": false,
        "overStar": null,
        "percent": 0
      }
    ],
    eva_panel: 0,
    currentID: "",
    stepIndex: 0,
    anchor: "",
    px: 0,
    fixed_panel: 0,
    animationData: {},
    processBarShow: 0,
    lesid: "",
    classid: "",
    pageindex: 0,
    pkey: "",
    lastSaveTime: 0
  },
  scroll: function (e) {
    if (e.detail.scrollTop >= this.data.px) {
      this.setData({
        fixed_panel: 1
      });
    }
    else {
      this.setData({
        fixed_panel: 0
      });
    }
  },
  lower: function (e) {
    this.queryHaveList();
  },
  onLoad: function (option) {
    let that = this;
    var rpx = 200;
    var systemInfo = wx.getSystemInfoSync();
    var px = rpx / 750 * systemInfo.windowWidth;
    this.setData({
      px: px
    });

    if (option.lesid) {
      that.setData({
        lesid: option.lesid
      })
    }

    if (option.classid) {
      that.setData({
        classid: option.classid
      })
    }

  },
  onReady: function (option) {

    wx.setNavigationBarTitle({
      title: "详情"
    })

    //获取视频句柄
    this.videoContext = wx.createVideoContext('lessVideo');

    this.queryData();


  },
  queryData: function () {
    part_query.queryData(this);
  },
  queryHaveList: function () {
    part_query.queryHaveList(this);
  },
  queryDetail: function () {
    part_query.queryDetail(this);
  },
  //查询评价状态
  queryEvl: function () {
    part_query.queryEvl(this);
  },
  //视频全屏事件
  onVideoChange: function (e) {
    if (!e.detail.fullScreen) {
      this.videoContext.pause()
    }
  },
  //视频时间更新事件
  videoTimeUpdate: function (e) {
    let that = this;

    let currentTime = parseFloat(e.detail.currentTime);
    let duration = parseFloat(e.detail.duration);

    if (this.duration != duration) {
      this.duration = duration;
      let durationString = les_tool.sec_to_time(this.duration);
      this.setData({
        durationString: durationString
      });

      if (this.data.firstVideoPlay == 0) {

        let starttime = that.data.lastplaytime;
        if (starttime >= 1) {
          this.videoContext.seek(starttime);
          that.saveVideoLog(starttime);
        }
        this.setData({
          firstVideoPlay: 1
        });

        if (that.data.lesorsee == 0) {
          that.videoContext.pause();
        }

      }

    }

    let percent = parseFloat(currentTime / duration) * 100;
    this.setData({
      percent: percent, curTimeString: les_tool.sec_to_time(currentTime)
    });
    this.setData({
      videoStart: e.detail.currentTime
    })
    let timerLan = that.data.timerLan;
    if (timerLan < parseInt(that.data.timeCicle)) {
      timerLan += 250;
      this.setData({
        timerLan: timerLan
      });
    }
    else {
      this.setData({
        timerLan: 0
      });
      that.saveVideoLog(-1);
    }

    if (Math.abs(that.data.lastSaveTime - e.detail.currentTime) > 80) {
      that.saveVideoLog(-1);
    }



  },
  //音频时间更新事件
  audioTimeUpdated: function (e) {
    let that = this;

    let currentTime = parseFloat(e.detail.currentTime);
    let duration = parseFloat(e.detail.duration);

    if (this.duration != duration) {
      this.duration = duration;
      let durationString = les_tool.sec_to_time(this.duration);
      this.setData({
        durationString: durationString
      });


      if (this.data.firstPlay == 0) {

        let starttime = that.data.lastplaytime;

        if (starttime < 1) {
          this.setData({
            firstPlay: 1,
            audioAction: {
              method: 'play'
            }
          });
        }
        else {
          that.saveVideoLog(starttime);
          this.setData({
            firstPlay: 1,
            audioAction: {
              method: 'setCurrentTime',
              data: starttime
            }
          });
          this.setData({
            audioAction: {
              method: 'play'
            }
          });
        }
        
      }

    }

    let percent = parseFloat(currentTime / duration) * 100;
    this.setData({
      percent: percent, curTimeString: les_tool.sec_to_time(currentTime)
    });
    this.setData({
      videoStart: e.detail.currentTime
    })
    let timerLan = that.data.timerLan;
    if (timerLan < parseInt(that.data.timeCicle)) {
      timerLan += 250;
      this.setData({
        timerLan: timerLan
      });
    }
    else {
      this.setData({
        timerLan: 0
      });
      that.saveVideoLog(-1);
    }
    if (Math.abs(that.data.lastSaveTime - e.detail.currentTime) > 80) {
      that.saveVideoLog(-1);
    }

  },
  //切换音频与视频
  switchVideo: function (e) {
    let that = this;
    let lesorsee = that.data.lesorsee;
    switch (lesorsee) {
      case 0:
        if (that.data.videoSrc && !util.isBlank(that.data.videoSrc)) {
          this.setData({
            audioAction: {
              method: 'pause'
            }
          })
          this.videoContext.seek(this.data.videoStart);
          this.videoContext.play();
          lesorsee = lesorsee == 0 ? 1 : 0;
          that.setData({
            lesorsee: lesorsee
          })
        }
        else {
          wx.showToast({
            title: '无视频',
            icon: 'none',
            duration: 2000
          })
        }

        break;
      case 1:
        if (that.data.audoSrc && !util.isBlank(that.data.audoSrc)) {
          this.videoContext.pause();
          this.setData({
            audioAction: {
              method: 'setCurrentTime',
              data: this.data.videoStart
            }
          });
          this.setData({
            audioAction: {
              method: 'play'
            }
          })
          lesorsee = lesorsee == 0 ? 1 : 0;
          that.setData({
            lesorsee: lesorsee
          })
        }
        else {
          wx.showToast({
            title: '无音频',
            icon: 'none',
            duration: 2000
          })
        }

        break;
    }

  },
  //视频播放结束事件
  videoBindended: function (e) {
    this.playEndEvent();
  },
  //音频播放结束事件
  audioEnd: function () {
    this.playEndEvent();
  },
  //音频初始化
  audoInit: function () {
    let that = this;
    if (this.data.lesorsee == 0) {
      this.setData({
        audioAction: {
          method: 'play'
        }
      });
    }
  },
  //视频音频播放结束事件
  playEndEvent: function () {
    let that = this;
    that.saveVideoLog(-1);
    let stepIndex = that.data.stepIndex;
    let lessions = that.data.info.lessions;
    lessions[stepIndex-1]["see"] = 1;
    that.setData({
      ["info.lessions"]: lessions
    })
    that.playEndAction(stepIndex);
  },
  //播放结束处理
  playEndAction: function (stepIndex) {
    let that = this;
    let lessions = that.data.info.lessions;
    if (!lessions[stepIndex]) {
      stepIndex = 0;
    }

    if (lessions[stepIndex]) {

      let vidSrc = "";
      let lesorsee = -1;
      let isshow = 0;

      let callbackSetData = function () {

        if (util.isBlank(lessions[stepIndex].audoSrc) && !util.isBlank(vidSrc)) {
          lesorsee = 1;
        }

        if (!util.isBlank(lessions[stepIndex].audoSrc) && util.isBlank(vidSrc)) {
          lesorsee = 0;
        }

        if (!util.isBlank(lessions[stepIndex].audoSrc) && !util.isBlank(vidSrc)) {
          lesorsee = 1;
          isshow = 1;
        }

        let id = lessions[stepIndex].id;
        let title = lessions[stepIndex].title;
        let audoSrc = lessions[stepIndex].audoSrc;
        let audoCover = lessions[stepIndex].src;
        let anchor = lessions[stepIndex].anchor;
        let currentID = lessions[stepIndex].id;


        that.setData({
          lesid: id,
          ["info.title"]: title,
          lesorsee: lesorsee,
          isshow: isshow,
          videoSrc: vidSrc,
          audoSrc: audoSrc,
          audoCover: audoCover,
          stepIndex: ++stepIndex,
          anchor: anchor,
          currentID: currentID,
          percent: 0,
          videoStart: -1,
          curTimeString: "00:00",//音频播放时间
          durationString: "00:00"
        })

        that.queryDetail();



      }

      if (lessions[stepIndex].vid != "") {
        /*获取视频数据*/
        polyv.getVideo(lessions[stepIndex].vid, function (videoInfo) {
          vidSrc = videoInfo.src[0];
          callbackSetData();
        });
      }
      else {
        callbackSetData();
      }



    }
  },
  //保存视频进度
  saveVideoLog: function (timeVim) {
    let that = this;
    let loginUser = wx.getStorageSync('loginUser');

    let timeline = (timeVim == -1 ? that.data.videoStart : timeVim);

    if (that.data.videoStart == -1) {
      return;
    }

    if (that.data.lesid == undefined) {
      return;
    }

    let studentid = loginUser.studentId;
    let uuidStr = util.Guid();
    let accountid = loginUser.accountId;
    let lesid = that.data.lesid;
    let title = that.data.info.title;
    let time = parseInt(timeline);
    let timestamp = parseInt(timeline);
    let studytime = parseInt(timeline);
    let videoDuration = les_tool.full_sec_to_time(this.duration);

    let args = {
      "pkey": "",
      "studentid": studentid,
      "time": time,
      "currentID": uuidStr,
      "timestamp": timestamp,
      "videoDuration": videoDuration,
      "coursewareid": lesid,
      "accountid": accountid,
      "studytime": studytime,
      "studetailcount": 1,
      "courwarestudytime": that.data.info.studytime,
      "coursewarename": title
    }

    let pre_args = {
      "studentid": loginUser.studentId,
      "coursewareid": that.data.lesid,
      "courwarestudytime": that.data.info.studytime
    }

    console.log(pre_args);

    util.getServerData(pre_args, "api/getVideoLogPKey", function (result) {
      if (result.code) {

        args.pkey = result.pkey;

        console.log(args);

        util.getServerData(args, "api/videoPlay", function (result) {
          console.log(result);
          that.setData({ "lastSaveTime": time });
        });

      }
    });
  },
  //音频进度条控制
  timeSliderChanged: function (e) {
    part.timeSliderChanged(e, this);
  },
  //课程列表项目点击
  playClick: function (e) {
    part.playClick(e, this);
  },
  //tab切换
  swichNav: function (e) {
    part.swichNav(e,this);
  },
  //音频
  playAudio: function () {
    part.playAudio(this);
  },
  //音频
  pauseAudio: function () {
    part.pauseAudio(this);
  },
  //收藏点击
  collectionClick: function () {
    part.collectionClick(this);

  },
  //取消待学
  cancelStudy: function (e) {
    part.cancelStudy(e,this);
  },
  //音频控制面板
  animationClick: function () {
    part.animationClick(this);
  },
  //星星点击
  evaluateClick: function (e) {
    part.evaluateClick(e,this);
  },
  //评价提交
  evaluateSubmit: function () {
    part.evaluateSubmit(this);
  },
  //打开评价弹出框
  openEvlu: function () {
    part.openEvlu(this);

  },
  //关闭评价弹出框
  closeEvlu: function () {
    part.closeEvlu(this);
  }
})
