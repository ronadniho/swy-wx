//special.js
const polyv = require('../../utils/polyv.js');

const innerAudioContext = wx.createInnerAudioContext();
Page({
  data: {
    video: {},
    Audiostatus:"播放音乐",
    AudioAlltime:0,
    currentTime:0
  },
  onLoad: function () {

    var that = this;
    var vid = "873c41fa75291cfa095450cf4d3316cd_8";

    /*获取视频数据*/
    polyv.getVideo(vid, function (videoInfo) {
      that.setData({
        video: {
          src: videoInfo.src[0]
        }

      });
    });


    //音频

    innerAudioContext.autoplay = false
    innerAudioContext.src = 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46'
    innerAudioContext.onPlay(() => {
      console.log('开始播放')
      that.setData({ Audiostatus: "暂停播放" });
    })
    innerAudioContext.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    });
    innerAudioContext.onTimeUpdate(() => {
      that.setData({ AudioAlltime: innerAudioContext.duration });
      that.setData({ currentTime: innerAudioContext.currentTime });
    });

  },
  onBindAutoPlay: function () {
    var that = this;
    if (innerAudioContext.paused) {
      innerAudioContext.play();
      that.setData({ Audiostatus: "暂停播放" });
    } else {
      innerAudioContext.pause();
      that.setData({ Audiostatus: "开始播放" });
    }
  }


})
