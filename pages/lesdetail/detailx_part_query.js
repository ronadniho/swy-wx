const util = require('../../utils/util.js')
const les_tool = require('./tool.js')
const polyv = require('../../utils/polyv.js');
var __GlobalInfo = require('../../utils/config.js');


function queryData(that) {

  let args = {
    "coursewareid": that.data.lesid,
    "classid": that.data.classid,
    "enableplaylist": true
  }

  console.log(args);

  util.getServerData(args, "api/getCoursewareVideoplay", function (result) {

    console.log(result);

    if (result.playlist.length < 1) {
      wx.showToast({
        title: "当前所有课程已学完,请返回选择其他课程进行学习",
        icon: 'none',
        duration: 5000,
        success: function () {

        }
      })
      that.setData({ lesnone: 1 });
      return;
    }



    let lessions = [];
    let stepIndex = 0;
    if (result.playlist && result.playlist.length > 0) {

      let playlist = result.playlist;

      for (let i = 0; i < playlist.length; i++) {
        var timestamp = Date.parse(new Date());

        let vidc = 0;
        var teachervideo = playlist[i].teachervideo;
        var audio_url = playlist[i].audio_url;
        if (teachervideo != '' && teachervideo != 'null' && teachervideo != null
          && audio_url != '' && audio_url != 'null' && audio_url != null) {
          vidc = 3;
        } else if (teachervideo != '' && teachervideo != 'null' && teachervideo != null) {
          vidc = 1;
        } else if (audio_url != '' && audio_url != 'null' && audio_url != null) {
          vidc = 2;
        }


        let les = {
          id: playlist[i].id,
          title: playlist[i].name,
          src: playlist[i].imagephoto + "?t=" + timestamp,
          audoSrc: playlist[i].audio_url,
          vid: playlist[i].teachervideo,
          isrequire: playlist[i].isrequire,
          teachersname: playlist[i].teachersname,
          clickrate: playlist[i].clickrate,
          gradecount: playlist[i].gradecount,
          description: playlist[i].description == "null" ? "" : playlist[i].description,
          grade: playlist[i].grade,
          playpercentage: playlist[i].playpercentage == "" ? '0%' : playlist[i].playpercentage,
          studytime: playlist[i].studytime,
          vidc: vidc,
          see: 0,
          playIndex: i
        }
        if (playlist[i].id == result.currentcourseware.id) {
          stepIndex = i;
        }
        lessions.push(les);
      }

      for (let i = 0; i < lessions.length; i++) {
        if (i < 2) {
          lessions[i]["anchor"] = "";
        }
        else {
          lessions[i]["anchor"] = "S_" + lessions[i - 1].id;
        }
      }


      let vidSrc = "";
      let callbackSetData = function () {
        let lesorsee = -1;
        let isshow = 0;
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

        let audoSrc = that.data.GlobalInfo.fileUrl + lessions[stepIndex].audoSrc;
        let audoCover = lessions[stepIndex].src;
        let currentID = lessions[stepIndex].id;
        let anchor = lessions[stepIndex].anchor;


        that.setData({
          lesorsee: lesorsee,
          isshow: isshow,
          videoSrc: vidSrc,
          audoSrc: audoSrc,
          audoCover: audoCover,
          stepIndex: ++stepIndex,
          anchor: anchor,
          currentID: currentID
        })

        that.queryEvl();

        that.audoInit();


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

    that.setData({
      lesid: result.currentcourseware.id,
      lastplaytime: result.currentcourseware.lastplaytime != "" ? result.currentcourseware.lastplaytime : 0,
      lastSaveTime: result.currentcourseware.lastplaytime != "" ? result.currentcourseware.lastplaytime : 0,
      ["info.comment"]: result.currentcourseware.comment,
      ["info.title"]: result.currentcourseware.name,
      ["info.studytime"]: result.currentcourseware.studytime,
      ["info.clickrate"]: result.currentcourseware.clickrate,
      ["info.gradecount"]: result.currentcourseware.gradecount,
      ["info.grade"]: result.currentcourseware.grade,
      ["info.ifcollectedcourse"]: result.currentcourseware.ifcollectedcourse,
      ["info.lessions"]: lessions
    })





  }, "POST");

  that.queryHaveList();
}

function queryHaveList(that) {

  let loginUser = wx.getStorageSync('loginUser');
  let pageindex = that.data.pageindex;

  util.getServerData({
    key: ["selectFinishedCourseware"],
    postData: {
      studentid: loginUser.studentId,
      "pageindex": pageindex,
      "pagesize": 5
    }
  }, "api/CommonSQL", function (result) {
    pageindex += 5;

    console.log(that.data.info.selected_lessions);

    let selected_lessions = that.data.info.selected_lessions;
    for (let i = 0; i < result.length; i++) {
      selected_lessions.push(result[i]);
    }
    that.setData({
      pageindex: pageindex,
      ["info.selected_lessions"]: selected_lessions
    })
  });
}

function queryDetail(that) {

  let detai_args = {
    "coursewareid": that.data.lesid,
    "classid": "",
    "enableplaylist": true
  }

  console.log("queryDetail参数:");
  console.log(detai_args);

  util.getServerData(detai_args, "api/getSigleCoursewareInfo", function (result) {

    console.log("queryDetail结果:");
    console.log(result);

    that.setData({
      lesid: result.currentcourseware.id,
      lastplaytime: result.currentcourseware.lastplaytime != "" ? result.currentcourseware.lastplaytime : 0,
      lastSaveTime: result.currentcourseware.lastplaytime != "" ? result.currentcourseware.lastplaytime : 0,
      ["info.comment"]: result.currentcourseware.comment,
      ["info.title"]: result.currentcourseware.name,
      ["info.studytime"]: result.currentcourseware.studytime,
      ["info.clickrate"]: result.currentcourseware.clickrate,
      ["info.gradecount"]: result.currentcourseware.gradecount,
      ["info.grade"]: result.currentcourseware.grade,
      ["info.ifcollectedcourse"]: result.currentcourseware.ifcollectedcourse,
      firstVideoPlay: 0,
      firstPlay: 0
    })

    wx.setNavigationBarTitle({
      title: result.currentcourseware.name
    })

    that.audoInit();

  }, "POST");

  that.queryEvl();
}

//查询评价状态
function queryEvl(that) {
  util.getServerData({
    "key": ["geAppraisetFlag"],
    "postData": { "id": that.data.lesid }
  }, "api/CommonSQL", function (result) {
    that.setData({
      ["info.isappraise"]: result[0].isappraise
    })
  }, "POST");
}


module.exports = {
  queryData: queryData,
  queryHaveList: queryHaveList,
  queryDetail: queryDetail,
  queryEvl: queryEvl
}