var __GlobalInfo = require('../../utils/config.js');
var util = require('../../utils/util.js');
Page({
    /**
     * 页面的初始数据
     */
    data: {
        searchStatus: false,//初始化false答题状态，true答题卡状态
        userInfo: {},//用户信息
        classId: '',//班级id
        userid: '',//用户id
        studentId: '',//学生id
        key: 'exam',//storage key名
        GlobalInfo: __GlobalInfo,
        examName: '',//50题试题分类
        examlist: [],//50题题名集合
        examdetaillist: [],//50题答案集合
        examTotal: 0,//题目总数
        page: 1,//默认第一题
        submitStatus: 0,//交卷状态
        testStatus: 0,//初始状态用来判断是从考试列表页进来的还是从专题详情进来的,0为考试详情，1为考试列表
        animate: 'end',
    },
    sign: function (e) {//标记
        var that = this;
        console.log(that.data.page)
        var pageIdx = that.data.page - 1;//获取当前页下标
        var test = that.data.examlist[pageIdx];//获取当前页题目
        console.log(test)
        test.sign = !test.sign;
        that.setData({
            examlist: that.data.examlist
        })
        that.setStorage();
    },
    close: function () {//false答题状态，true答题卡状态
        var that = this;
        that.setData({
            searchStatus: !that.data.searchStatus
        })
        that.setStorage();
    },
    toggle: function (e) {//跳到目标题
        var that = this;
        console.log(e)
        console.log(e.currentTarget.dataset.page)
        var togglePage = e.currentTarget.dataset.page;//切换到目标页
        that.setData({
            searchStatus: false,
            page: togglePage
        });
        that.setStorage();
    },
    shareTesting: function (e, type) {
        var that = this;
        var selectVal = e;//选中的值
        console.log(selectVal)
        var pageIdx = that.data.page - 1;//50题集合下标
        var test = that.data.examlist[pageIdx];//当前页的题目
        var answer = test.answerList;//当前页面答案集合
        if (type == 'radio') {//单选题和判断题
            test.selectid = selectVal;
        }
        else {//多选题
            var answerT = [];//题目答案状态 true false
            var actionT = [];//用户输入的状态 true false
            selectVal.length ? test.selectid = selectVal : test.selectid = [];
        }
        console.log(test)

        test.isright = 0;//每次选中答案初始化错误
        for (var i = 0; i < answer.length; i++) {//遍历答案集合
            answer[i].isselect = false;
            if (type == 'radio') {//单选题和判断题
                answer[i].answerid == selectVal && (answer[i].isselect = true);
                if (answer[i].isselect && answer[i].isright == 1) {
                    test.isright = 1;
                }
            }
            else {//多选题
                console.log(selectVal)
                selectVal.map((val) => {
                    answer[i].answerid == val && (answer[i].isselect = true);
                })
                answerT.push(answer[i].isright);
                actionT.push(answer[i].isselect);
            }
        }
        if (type == 'checkbox') {
            console.log(answerT)
            console.log(actionT)
            for (var i = 0; i < answerT.length; i++) {
                if (answerT[i] != actionT[i]) {
                    break;
                }
            }
            console.log('i:' + i)
            i == answerT.length ? (test.isright = 1) : test.isright = 0;

        }
        that.setData({
            examlist: that.data.examlist
        });
    }
    ,
    radioChange: function (e) {
        var selectVal = e.detail.value;//选中的值
        this.shareTesting(selectVal, 'radio');
    }
    ,
    checkboxChange: function (e) {
        var selectVal = e.detail.value;//选中的值集合
        this.shareTesting(selectVal, 'checkbox');
    }
    ,
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
        console.log('关闭页面')
        if (this.data.testStatus && this.data.submitStatus) {

            wx.navigateTo({
                // url: `../specialDesc/specialDesc?currentTab=3&classid=b8d3f418-d024-11e7-8f29-005056bf154b`
                url: `../specialDesc/specialDesc?currentTab=3&classid=${this.data.classId}`
            })
        }
        //this.setStorage();
    }
    ,
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.showLoading({
            title: '加载中',
        });
        console.log(options.classId)
        console.log(options.testStatus)
        this.setData({
            classId: options.classId,
            testStatus: options.testStatus
        })
        this.getPageData();
    }
    ,
    setStorage: function () {//存session
        var that = this;
        let data = that.data.examlist;
        let classId = that.data.classId;
        console.log(data)
        console.log(wx.getStorageSync('loginUser').studentId);
        data.map(res => {
            res.page = that.data.page;
            res.studentId = wx.getStorageSync('loginUser').studentId;
        });
        console.log(wx.getStorageSync(classId))
        console.log(data)
        wx.setStorageSync(classId, data)
    }
    ,
    getStorage: function () {//取session
        var that = this;
        let key = that.data.key;
        let classId = that.data.classId;
        let sessionStatus = false;//默认没有缓存
        console.log(wx.getStorageSync(classId));
        console.log(wx.getStorageSync(classId) == false);
        if (wx.getStorageSync(classId)) {//有缓存
            console.log('有缓存');
            var examName = wx.getStorageSync(classId)[0].answerList[0].category;//获取50题集合分类名
            that.setData({
                examlist: wx.getStorageSync(classId),
                examTotal: wx.getStorageSync(classId).length,
                examName: examName,
                page: wx.getStorageSync(classId)[0].page
            })
        }
        else {//无缓存
            console.log('无缓存')
            console.log('classId:' + that.data.classId)
            util.getServerData(//专题培训结业考试(随机获取题目)
                {
                    /*TODO************由于数据问题先用测试参数**************************/
                    // classid: "b8d3f418-d024-11e7-8f29-005056bf154b"
                    classid: that.data.classId
                },
                "api/getClassExamlist50", function (result) {
                    console.log(result)
                    if (result.result) {
                        var examlist = result.examlist;
                        var examdetaillist = result.examdetaillist;
                        that.setData({
                            examTotal: examlist.length
                        });
                        for (var i = 0, tar; i < examlist.length; i++) {
                            examlist[i].page = that.data.page;//给缓存添加当前页
                            examlist[i].answerList = [];//答案集合
                            examlist[i].sign = false;//标记状态
                            tar = examlist[i].id;//题目id
                            examlist[i].isright = 0;
                            examlist[i].examcategory == 1 && (examlist[i].selectid = []);//字符串转数组方便html模板渲染
                            for (var j = 0; j < examdetaillist.length; j++) {
                                if (examdetaillist[j].examid == tar) {
                                    examlist[i].answerList.push(examdetaillist[j])
                                }
                            }
                        }
                        console.log(examlist[0].answerList[0].category);
                        var examName = examlist[0].answerList[0].category;
                        that.setData({
                            examlist: examlist,
                            examName: examName
                        });
                        console.log(that.data.examlist);
                        that.setStorage();
                    }
                }
            )
        }
        /*for (var keys in wx.getStorageSync(classId)) {//拿到本地存储中的classId
            console.log(keys)
            if (keys == classId) {
                console.log('有缓存');
                var examName = wx.getStorageSync(classId)[0].answerList[0].category;//获取50题集合分类名
                that.setData({
                    examlist: wx.getStorageSync(classId),
                    examTotal: wx.getStorageSync(classId).length,
                    examName: examName
                })
                sessionStatus = true;
                break;
            }

        }
        if (!sessionStatus) {//没缓存//获取50题题目
            console.log('无缓存')
            console.log('classId:' + that.data.classId)
            util.getServerData(//专题培训结业考试(随机获取题目)
                {
                    /!*TODO************由于数据问题先用测试参数**************************!/
                    // classid: "b8d3f418-d024-11e7-8f29-005056bf154b"
                    classid: that.data.classId
                },
                "api/getClassExamlist50", function (result) {
                    console.log(result)
                    if (result.result) {
                        var examlist = result.examlist;
                        var examdetaillist = result.examdetaillist;
                        that.setData({
                            examTotal: examlist.length
                        });
                        for (var i = 0, tar; i < examlist.length; i++) {
                            examlist[i].answerList = [];//答案集合
                            examlist[i].sign = false;//标记状态
                            tar = examlist[i].id;//题目id
                            /!*TODO:初始化都是错误状态************************************************************!/
                            examlist[i].isright = 0;
                            examlist[i].examcategory == 1 && (examlist[i].selectid = []);//字符串转数组方便html模板渲染
                            for (var j = 0; j < examdetaillist.length; j++) {
                                if (examdetaillist[j].examid == tar) {
                                    examlist[i].answerList.push(examdetaillist[j])
                                }
                            }
                        }
                        console.log(examlist[0].answerList[0].category);
                        var examName = examlist[0].answerList[0].category;
                        that.setData({
                            examlist: examlist,
                            examName: examName
                        });
                        console.log(that.data.examlist);
                        that.setStorage();
                    }
                }
            )
        }*/


        wx.hideLoading();
    }
    ,
    clearStorage: function () {//清除session
        var that = this;
        console.log(that.data.classId)
        wx.removeStorageSync(that.data.classId)
    }
    ,
    next: function () {
        var that = this;
        if (that.data.page < that.data.examTotal && that.data.animate == 'end') {
            that.setData({
                page: ++that.data.page,
                animate: 'next'
            })
            setTimeout(function () {
                that.setData({
                    animate: 'end'
                })
            }, 600)
            that.setStorage();
        }

    }
    ,
    prev: function () {
        var that = this;
        if (that.data.page > 1 && that.data.animate == 'end') {
            that.setData({
                page: --that.data.page,
                animate: 'prev'
            })
            setTimeout(function () {
                that.setData({
                    animate: 'end'
                })
            }, 600)
            that.setStorage();
        }

    }
    ,
    getPageData: function () {
        var that = this;
        that.getStorage();
    }
    ,
    submit: function () {
        var that = this;
        var classId = that.data.classId;
        var examlist = that.data.examlist;
        var testStatus = that.data.testStatus;
        var exampass = 0;//合格分数
        that.setData({
            submitStatus: 1
        })
        console.log(examlist)
        // var userid = 'b1f12796-23aa-48be-b2c8-712b995935d4';
        // var classId = 'b8d3f418-d024-11e7-8f29-005056bf154b';
        util.getServerData({}, "api/Session", function (result) {//获取用户信息
            console.log(result);
            that.setData({
                userInfo: result.loginUser,
                // userid: result.loginUser.userid,
                studentId: result.loginUser.studentId,
                // classId: classId
            });
            // var userid = that.data.userid;
            // var classId = that.data.classId;
            console.log('班级id:' + classId)
            console.log('学生id:' + that.data.studentId)

            util.getServerData(
                {
                    key: ["getAppTopicClassProgress"],
                    postData: {
                        "classid": classId,
                        "studentid": that.data.studentId
                    }
                }
                , "api/CommonSQL", function (result) {
                    console.log(result)
                    console.log(result[0].exampass)
                    exampass = result[0].exampass;

                    util.getServerData(//专题培训结业考试(提交分数)
                        {
                            "classid": classId,
                            "userid": that.data.studentId,
                            // "userid": '5cff189e-9690-11e6-a71f-00fffab6298f',
                            // "classid": "b8d3f418-d024-11e7-8f29-005056bf154b",
                            // "classid": that.data.classId,
                            // "userid": "5cff189e-9690-11e6-a71f-00fffab6298f",
                            "exampass": exampass,
                            "examlist": examlist
                        },
                        "api/SubmitStudenExam", function (result) {
                            console.log(result)
                            if (result.result) {
                                that.clearStorage();
                                // wx.redirectTo({
                                //     url: `../specialDesc/specialDesc?currentTab=3&classid=${classId}`
                                // })
                                console.log('testStatus:' + testStatus)
                                wx.navigateBack({
                                    delta: 1
                                })
                            }
                        })

                })


        });


    }
    ,


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
        console.log('跳前台了')
    }
    ,

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
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