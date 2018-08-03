var __GlobalInfo = require('../../utils/config.js');
var util = require('../../utils/util.js');
// pages/testList/testList.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        GlobalInfo: __GlobalInfo,
        alreadyTest: [],//已完成考试集合
        notTest: [],//未完成考试集合
        userInfo: {},//用户信息
        userid: '',//用户id
        testStatus: 1,//考试状态

    },
    testing: function (e) {
        console.log(e)
        var classId = e.currentTarget.dataset.classid;
        var testStatus = this.data.testStatus;
        //var classId = 'b8d3f418-d024-11e7-8f29-005056bf154b';
        console.log(classId)
        if (classId) {
            console.log(wx.getStorageSync(classId))

            
            if (wx.getStorageSync(classId) && (wx.getStorageSync(classId)[0].studentId == wx.getStorageSync('loginUser').studentId)) {
                wx.showModal(
                    {
                        title: '提示',
                        content: '上一次有未完成的考试，是否继续？',
                        success: function (res) {
                            if (res.confirm) {
                                console.log('用户点击确定')
                            }
                             else if (res.cancel) {
                                console.log('用户点击取消')
                                wx.removeStorageSync(classId);
                            }
                            wx.navigateTo({
                              url: `../endTest/endTest?classId=${classId}&testStatus=${testStatus}`
                            })
                        }
                    }
                )
            }
            else{
                wx.navigateTo({
                    url: `../endTest/endTest?classId=${classId}&testStatus=${testStatus}`
                })
            }
            //wx.getStorageSync(classId) && wx.removeStorageSync(classId)
        }

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getPageData();
    }
    ,
    getPageData: function () {
        var that = this;

        wx.showLoading({
            title: '加载中',
        });

        util.getServerData({}, "api/Session", function (result) {
            console.log(result);
            that.setData({
                userInfo: result.loginUser,
                userid: result.loginUser.userid,
                studentId: result.loginUser.studentId
            });

            console.log('userid:' + that.data.userid)
            console.log('studentId:' + that.data.studentId)


            util.getServerData(//根据用户userid获取专题班完成及未完成的考试列表
                {
                    key: ["getIfFinishClassInfoUseWeicatApp"],
                    postData: {
                        userid: that.data.studentId
                    }
                },
                "api/CommonSQL", function (result) {
                    // console.log(result);
                    var notTest = [];
                    var alreadyTest = [];
                    result.map((val) => {
                        val.progress = Math.ceil(((val.compulsorynumber + val.electivenumber) / (val.requiredpassmark + val.electivepassmark)) * 100);
                        val.graduatestatus ? alreadyTest.push(val) : notTest.push(val);
                    })
                    that.setData({
                        alreadyTest: alreadyTest,
                        notTest: notTest,
                    })
                    console.log(alreadyTest)
                    console.log(notTest)


                    wx.hideLoading();
                })

        });


    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    }
    ,

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    }
    ,

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    }
    ,

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    }
    ,

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    }
    ,

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    }
    ,

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})