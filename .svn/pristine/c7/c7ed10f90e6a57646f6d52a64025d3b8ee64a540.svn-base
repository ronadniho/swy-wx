const util = require('../../utils/util.js')
const les_tool = require('./tool.js')
const polyv = require('../../utils/polyv.js');
var __GlobalInfo = require('../../utils/config.js');


function queryData(that) {
  let loginUser = wx.getStorageSync('loginUser');

  let args = {
    "studentid": loginUser.studentId,
    "id": that.data.lesid
  }

  util.getServerData({
    "key": ["selectFrontCoursewareById"],
    "postData": args
  }, "api/CommonSQL", function (result) {

    console.log(result);

    let vidSrc = "";
    var callbackSetData = function () {

      let isshow = 0;
      let lesorsee = -1;
      if (util.isBlank(result[0].audio_url) && !util.isBlank(vidSrc)) {
        lesorsee = 1;
      }

      if (!util.isBlank(result[0].audio_url) && util.isBlank(vidSrc)) {
        lesorsee = 0;
      }

      if (!util.isBlank(result[0].audio_url) && !util.isBlank(vidSrc)) {
        lesorsee = 1;
        isshow = 1;
      }


      let suitejson = JSON.parse(result[0].suitejson);
      for (let i = 0; i < suitejson.length; i++) {
        suitejson[i].coursewareid = suitejson[i].coursewareid.trim();
      }

      if (suitejson.length > 1) {

      }

      if (result[0].realduration) {
        let redls = result[0].realduration.split(":");
        if (redls[0] == "00") {
          result[0].realduration = redls[1] + ":" + redls[2];
        }
      }
      
     
      that.setData({
        lastplaytime: result[0].lastplaytime != '' ? result[0].lastplaytime : 0,
        lastSaveTime: result[0].lastplaytime != '' ? result[0].lastplaytime : 0,
        ["info.comment"]: result[0].comment.replace(/\&nbsp;/g,""),
        ["info.title"]: result[0].name,
        ["info.studytime"]: result[0].studytime,
        ["info.clickrate"]: result[0].clickrate,
        ["info.gradecount"]: result[0].gradecount,
        ["info.grade"]: result[0].grade,
        ["info.ifcollectedcourse"]: result[0].ifcollectedcourse,
        ["info.ifwaitcourse"]: result[0].ifwaitcourse,
        ["info.suitejson"]: suitejson,
        ["info.realduration"]: result[0].realduration,
        "audoCover": result[0].imagephoto,
        "audoSrc": that.data.GlobalInfo.fileUrl + result[0].audio_url,
        "videoSrc": vidSrc,
        lesorsee: lesorsee,
        isshow: isshow
      })



      //获取教师详情
      that.teacherDetail();

      that.queryISEvaluate();

      that.animationDo();

    }

    if (result[0].teachervideo != "") {
      /*获取视频数据*/
      polyv.getVideo(result[0].teachervideo, function (videoInfo) {
        vidSrc = videoInfo.src[0];
        callbackSetData();
      });
    }
    else {
      callbackSetData();
    }


  }, "POST");
}

function queryPartUpdate(that) {
  let loginUser = wx.getStorageSync('loginUser');

  let args = {
    "studentid": loginUser.studentId,
    "id": that.data.lesid
  }
  util.getServerData({
    "key": ["selectFrontCoursewareById"],
    "postData": args
  }, "api/CommonSQL", function (result) {

    that.setData({
      ["info.ifcollectedcourse"]: result[0].ifcollectedcourse,
      ["info.ifwaitcourse"]: result[0].ifwaitcourse
    })
    that.queryISEvaluate();


  }, "POST");
}

function teacherDetail(that) {

  let loginUser = wx.getStorageSync('loginUser');

  util.getServerData({
    key: ["selectTeachersByCoursewareId"],
    postData: {
      "studentid": loginUser.studentId,
      id: that.data.lesid
    }
  }, "api/CommonSQL", function (result) {
    
    result.forEach((item)=>{
      item.comment = item.comment.replace(/\&nbsp;/g, "");
    });
    that.setData({ teacherinfo: result });

    console.log(that.data);
  });
}

function queryISEvaluate(that) {
  util.getServerData({
    "key": ["geAppraisetFlag"],
    "postData": { "id": that.data.lesid }
  }, "api/CommonSQL", function (result) {
    that.setData({
      ["info.isappraise"]: result[0].isappraise
    })
  }, "POST");
}

function suiteQuery(e, that) {

  that.setData({
    timerLan: 0,
    timeCicle: 20000,
    GlobalInfo: __GlobalInfo,
    lesorsee: 0,//音频与视频切换开关
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
    firstPlay: 0,
    firstVideoPlay: 0,
    currentTab: 0,//tab控制
    info: {
      comment: "",
      title: "",
      studytime: "0",
      clickrate: "0",
      gradecount: "0",
      grade: "0",
      ifcollectedcourse: "0",
      ifwaitcourse: "0",
      teacherLession: [],
      isappraise: "0",
      suitejson: []
    },
    evs: [
      {
        "itemid": 1,
        "itemname": "观点正确",
        "rate": 0,
        "max": 5,
        "isReadonly": false,
        "overStar": null,
        "percent": 0
      },
      {
        "itemid": 2,
        "itemname": "表达流畅",
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
    px: 0,
    fixed_panel: 0,
    animationData: {},
    processBarShow: 0,
    teacherinfo: [],
    tid: "",
    lesid: "",
    lastSaveTime: 0
  });

  let id = e.target.dataset.item.coursewareid;
  that.setData({ lesid: id });
  that.queryData();
}


module.exports = {
  queryData: queryData,
  queryPartUpdate: queryPartUpdate,
  teacherDetail: teacherDetail,
  queryISEvaluate: queryISEvaluate,
  suiteQuery: suiteQuery
}