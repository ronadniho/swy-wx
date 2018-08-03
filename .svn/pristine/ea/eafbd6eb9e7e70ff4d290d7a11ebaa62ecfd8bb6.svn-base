// pages/serach/special.js
var __GlobalInfo = require('../../utils/config.js');
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    serachTxt:"",
    serachHis:"",
    serachHisArry:[],
    isShowClose:false,
    isShowResult:false,
    aitinglist: [{
      imgs: '../../image/5.png',
      title: '《再造文明之梦:胡适传》|胡一峰按双方发生发生',
      jieshao: " 读懂了胡适人生中的“尝试”也就读懂了胡适对于今天的意义",
      times: "28分11秒"
    }, {
      imgs: '../../image/5.png',
      title: '《再造文明之梦:胡适传》|胡一峰按双方发生发生',
      jieshao: " 读懂了胡适人生中的“尝试”也就读懂了胡适对于今天的意义",
      times: "28分11秒"
    }],
    meiwenlist: [
      {
        title: '领导力： 真诚的领导者应有的4种特质',
        jieshao: " 真诚往往被人们理解为坦率、真诚、不世故，是虚伪的反面，这种看法不仅简单，也不正确。表达本真自我是极其复杂、虚假的行为，所有真诚的领导者都复杂虚假。不过他们清楚，想要获得真诚的评价，必须付出艰苦努力以及小心维护自己的声誉。",
        num: "1234"
      },
      {
        title: '领导力： 真诚的领导者应有的4种特质',
        jieshao: " 真诚往往被人们理解为坦率、真诚、不世故，是虚伪的反面，这种看法不仅简单，也不正确。表达本真自我是极其复杂、虚假的行为，所有真诚的领导者都复杂虚假。不过他们清楚，想要获得真诚的评价，必须付出艰苦努力以及小心维护自己的声誉。",
        num: "2345"
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({ serachHisArry: wx.getStorageSync('serachHis')? wx.getStorageSync('serachHis').split(','):[]});
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
  
  },
  //去检索
  onSerachConfirm:function(){
    var that = this;
    if (util.isBlank(that.data.serachTxt)) {
      wx.showToast({
        title: '请输入检索关键字', icon: "none"
      });
      return;
    }
    //去检索结果
    wx.showToast({
      title: '去检索结果' + that.data.serachTxt, icon: "none"
    });
    var serachHis = wx.getStorageSync('serachHis');
    wx.setStorageSync('serachHis', that.data.serachTxt + (serachHis ? "," : "") + serachHis );
    this.setData({ isShowResult: true, isShowClose: true });
    this.setData({ serachHisArry: wx.getStorageSync('serachHis').split(',') });
  },
  //input改变事件
  onSerachInput: function (e){
    this.setData({ serachTxt: e.detail.value });
    this.setData({ isShowClose: util.isBlank(e.detail.value) ? false : true });
  },
  //清除结果
  onClearInput: function () {
    this.setData({ serachTxt: "" });
    this.setData({ isShowClose: false, isShowResult:false });
  },
  //关闭页面
  onClosePage:function(){
    wx.navigateBack();
  },
  onClearHis:function(){
    this.setData({ serachHisArry: [] });
    wx.removeStorageSync("serachHis");
  },
  //点击去检索
  onClickGoSerach: function (event){
    this.setData({ serachTxt: event.currentTarget.dataset.itemvalue  });
    this.onSerachConfirm();
  }
})