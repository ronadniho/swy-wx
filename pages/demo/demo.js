// pages/demo/demo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [
      {
        "coursewareid": "q1"
      },
      {
        "coursewareid": "q2"
      },
      {
        "coursewareid": "q3"
      },
      {
        "coursewareid": "q4"
      },
      {
        "coursewareid": "q5"
      },
      {
        "coursewareid": "q6"
      },
      {
        "coursewareid": "q7"
      },
      {
        "coursewareid": "q8888"
      }
    ],
    info: { suitejson:[]},
    lesid:"a7",
    lang:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let suitejsonj = [];
    for (let i = 0; i < 100; i++) {
      suitejsonj.push({ "coursewareid": "q" + i.toString(), "shortname": "sss" });
    }
    suitejsonj.push({ "coursewareid": "q8888", "shortname": "dddd" });
    this.setData({
      ["info.suitejson"]: suitejsonj, lang:"q8888"
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})