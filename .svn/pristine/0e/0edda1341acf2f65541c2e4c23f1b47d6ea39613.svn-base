const util = require('../../utils/util.js')

//打开评价弹出框
function openEvlu(that){
  if (that.data.info.isappraise == '0' && that.data.info.isappraise != '-1') {
    that.setData({ eva_panel: 1 });
  }
}
//关闭评价弹出框
function closeEvlu(that) {
  that.setData({ eva_panel: 0 });
}
//评价提交
function evaluateSubmit(that){
  let joinJudgeControl = that.data.joinJudgeControl;
  if (joinJudgeControl == 0) {
    joinJudgeControl = 1;
    that.setData({
      joinJudgeControl: joinJudgeControl
    })
  }
  let loginUser = wx.getStorageSync('loginUser');

  let can = true;
  let evs = that.data.evs;
  for (let i = 0; i < evs.length; i++) {
    if (parseInt(evs[i].rate) <= 0) {
      can = false;
    }
  }

  if (can) {
    let args = {
      accountid: loginUser.accountId,
      classcourseid: "",
      studentid: loginUser.studentId,
      coursewareid: that.data.lesid,
      classid: "",
      scoreList: that.data.evs
    }

    util.getServerData(args, "api/submitAppraise", function (result) {
      that.setData({
        joinJudgeControl: 0
      })
      that.queryEvl();
      wx.showToast({
        title: result ? '评价成功' : '评价失败',
        icon: 'none',
        duration: 2000
      })

      that.setData({ eva_panel: 0 });

    });
  }
  else {
    wx.showToast({
      title: "请完整评价",
      icon: 'none',
      duration: 2000
    })
  }
}
//星星点击
function evaluateClick(e,that){
  let item = e.target.dataset.item;
  let star = e.target.dataset.star;

  let evs = that.data.evs;
  for (let i = 0; i < evs.length; i++) {
    if (item.itemid == "1") {
      evs[i].rate = parseInt(star);
      evs[i].percent = parseInt(star) * 2;
    }
    else {
      if (evs[i].itemid == item.itemid) {
        evs[i].rate = parseInt(star);
        evs[i].percent = parseInt(star) * 2;
      }
    }

  }
  that.setData({
    evs: evs
  })
}
//音频控制面板
function animationClick(that){
  let processBarShow = that.data.processBarShow == 0 ? 1 : 0;
  var animation = wx.createAnimation({
    transformOrigin: "50% 50%",
    duration: 1000,
    timingFunction: "ease",
    delay: 0
  })
  animation.opacity(processBarShow).translateY(0).step();
  that.setData({
    animationData: animation.export(), processBarShow: processBarShow
  })
}
//取消待学
function cancelStudy(e, that){
  let loginUser = wx.getStorageSync('loginUser');
  let id = e.currentTarget.dataset.item.id;
  console.log(id);
  console.log(loginUser.studentId);

  util.getServerData({
    studentid: loginUser.studentId,
    coursewareid: id
  }, "api/deleteToBeStudiedUseWeicatApp/delete", function (result) {
    console.log(result);
    that.queryDetail();
    wx.showToast({
      title: result.result ? "取消成功" : "取消失败",
      icon: 'none',
      duration: 2000
    })
  });
}
//收藏点击
function collectionClick(that){
  let loginUser = wx.getStorageSync('loginUser');

  if (that.data.info.ifcollectedcourse == '0' && that.data.info.ifcollectedcourse != '-1') {
    util.getServerData([
      {
        coursewareid: that.data.lesid,
        studentid: loginUser.studentId
      }
    ], "api/insertCourseWareCollection", function (result) {
      that.queryDetail();
      wx.showToast({
        title: result.message,
        icon: 'none',
        duration: 2000
      })
    });
  }
  else {
    util.getServerData([
      {
        coursewareid: that.data.lesid,
        studentid: loginUser.studentId
      }
    ], "api/deleteCourseWareCollection", function (result) {
      that.queryDetail();
      wx.showToast({
        title: result.message,
        icon: 'none',
        duration: 2000
      })
    });
  }
}
//播放音频
function playAudio(that){
  that.setData({
    audioAction: {
      method: 'play'
    }
  });
}
//暂停音频
function pauseAudio(that){
  that.setData({
    audioAction: {
      method: 'pause'
    }
  });
}
//音频进度条控制
function timeSliderChanged(that){
  if (!that.duration)
    return;

  let method = that.data.audioAction.method;

  that.setData({
    audioAction: {
      method: 'setCurrentTime',
      data: that.duration * e.detail.value / 100
    }
  });

  that.setData({
    audioAction: {
      method: method
    }
  });
}
//tab切换
function swichNav(e,that){
  if (that.data.currentTab === e.target.dataset.current) {
    return false;
  } else {
    that.setData({
      currentTab: e.target.dataset.current
    })
  }
}
//课程列表项目点击
function playClick(e,that){
  let stepIndex = e.currentTarget.dataset.item.playIndex;
  let lessions = that.data.info.lessions;
  if (lessions[stepIndex]["see"] == 0) {
    that.playEndAction(stepIndex);
  }
  else {
    wx.showToast({
      title: "此课程已观看",
      icon: 'none',
      duration: 2000
    })
  }
}

module.exports = {
  openEvlu: openEvlu,
  closeEvlu: closeEvlu,
  evaluateSubmit: evaluateSubmit,
  evaluateClick: evaluateClick,
  animationClick: animationClick,
  cancelStudy: cancelStudy,
  collectionClick: collectionClick,
  playAudio: playAudio,
  pauseAudio: pauseAudio,
  timeSliderChanged: timeSliderChanged,
  swichNav: swichNav,
  playClick: playClick
}