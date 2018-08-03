const util = require('../../utils/util.js')

const app = getApp()

Page({
  data: {
    current: {
      poster: 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000',
      name: '',
      author: '',
      src: 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46'
    },
    percent: 0,
    curTimeString: "",
    durationString:"00:00",
    audioAction: {
      method: 'pause'
    }
  },
  onLoad: function () {
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#F14141'
    })
    wx.setNavigationBarTitle({
      title: "爱听"
    })
  },
  onReady: function () {

  },
  sendVify: function () {

  },
  audioPlayed: function (e) {
    console.log('audio is played')
  },
  audioTimeUpdated: function (e) {
    let currentTime = parseFloat(e.detail.currentTime);
    let duration = parseFloat(e.detail.duration);

    let durationString = this.data.durationString;
    if (durationString == "00:00"){
      durationString = this.sec_to_time(duration);
      this.setData({
        durationString: "/" + durationString
      });

      //var hour = Math.floor(duration / 3600);

    }
    let curTimeString = this.sec_to_time(currentTime);

    let percent = parseFloat(currentTime / duration) * 100;
    this.setData({
      percent: percent, curTimeString: curTimeString
    });
  },
  sec_to_time: function (s) {
    var t = "";
    if (s > -1) {
      var hour = Math.floor(s / 3600);
      var min = Math.floor(s / 60) % 60;
      var sec = s % 60;
      if (hour < 10) {
        if (hour >= 1){
          t = '0' + hour + ":";
        }        
      } else  {
        t = hour + ":";
      }

      if (min < 10) {
        t += "0";
      }
      t += min + ":";
      if (sec < 10) {
        t += "0";
      }
      t += sec.toFixed(0);
    }
    return t;
  },
  playAudio: function () {
    this.setData({
      audioAction: {
        method: 'play'
      }
    });
  },
  pauseAudio: function () {
    this.setData({
      audioAction: {
        method: 'pause'
      }
    });
  }
})
