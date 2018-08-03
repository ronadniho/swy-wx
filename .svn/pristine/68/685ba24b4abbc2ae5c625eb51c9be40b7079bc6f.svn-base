var __GlobalInfo = require('../../utils/config.js');
var util = require('../../utils/util.js');
var WxParse = require('../../utils/wxParse/wxParse.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        currentTab: 0, // tab下标
        childTab: 0,///*必修课选修课tab下标*/
        status: false,//课程设计
        testStatus: true,//考试状态
        GlobalInfo: __GlobalInfo,
        banner: '',//图片
        signUpStatus: true,//报名状态
        classInfo: {},//班级专题简介
        userInfo: {},//用户信息
        studentId: '',//学生id'5cff189e-9690-11e6-a71f-00fffab6298f'
        classId: '',//班级id'dd068bb6-7f68-4499-86a5-8b7b986422f6'
        category0: [],//必修课
        category1: [],//选修课
        progress: {},//学习进度
        testDetail: {},//考试详情包括最高分和本次得分
        currentScore: 0,//本次得分
        category0Item: 6,//必修课显示6条数据
        category1Item: 6,//选修课显示6条数据
        category0Page: 0,//必修课分页
        category1Page: 0,//选修课分页
        category0Len: 0,//必修课len
        category1Len: 0,//选修课len
        allcount0: 0,//必修课总数
        allcount1: 0,//选修课总数
        waitstudytime: 0,//待学学时
        testStatus: 0,//初始状态用来判断是从考试列表页进来的还是从专题详情进来的,0为考试详情，1为考试列表
        ifopenrichmedia: 0,//是否有富媒体
        phonerichmediaurl: '',//移动富媒体url
    },
    getAllcount: function () {//获取必修课和选修课总数
        var that = this;
        var classId = that.data.classId;
        util.getServerData(//获取班级课程设计必修课总数
            {
                key: ["getTopicClassRequiredElectiveCourseTotalCountUseWeicat"],
                postData: {
                    classid: classId,
                    // classid: "dd068bb6-7f68-4499-86a5-8b7b986422f6",
                    category: 0,
                }

            }, "api/CommonSQL", function (result) {
                console.log('获取班级课程设计必修课总数0')
                console.log(result);
                that.setData({
                    allcount0: result[0].allcount
                })
            });

        util.getServerData(//获取班级课程设计选修课总数
            {
                key: ["getTopicClassRequiredElectiveCourseTotalCountUseWeicat"],
                postData: {
                    classid: classId,
                    // classid: "dd068bb6-7f68-4499-86a5-8b7b986422f6",
                    category: 1,
                    // pageindex: that.data.category1Page,
                    // pagesize: that.data.category1Item
                }

            }, "api/CommonSQL", function (result) {
                console.log('获取班级课程设计选修课总数1')
                console.log(result);
                that.setData({
                    allcount1: result[0].allcount
                })
            });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.showLoading({
            title: '加载中',
            mask: true,
            duration: 2000,
        });

        var that = this;
        console.log('currentTab:' + options.currentTab);
        console.log('classid:' + options.classid);
        console.log('phonerichmediaurl:' + options.phonerichmediaurl);
        that.setData({
            classId: options.classid
        });
        /* if (options.phonerichmediaurl) {
             that.setData({
                 currentTab: 2
             })
         var url = options.phonerichmediaurl.replace("{{classid}}", that.data.classId)
         console.log(that.data.classId)
         console.log(url)
         // wx.navigateTo({
         //     url: `/pages/Curriculum/webview?url=${url}`,
         // })
         }
         options.currentTab && that.setData({
             currentTab: options.currentTab,
             classId: options.classid,
             phonerichmediaurl: options.phonerichmediaurl ? options.phonerichmediaurl : ''
         });*/


        that.getPageData();
    },
    getPageData: function () {
        var that = this;

        console.log(that.data.classId)
        util.getServerData({}, "api/Session", function (result) {//获取用户信息
            console.log('用户信息')
            console.log(result.loginUser);
            console.log(result.loginUser.userid);
            console.log(result.loginUser.studentId);
            that.setData({
                userInfo: result.loginUser,
                userid: result.loginUser.userid,
                studentId: result.loginUser.studentId
            });
            var studentId = that.data.studentId;
            var classId = that.data.classId;
            var userid = that.data.userid;
            console.log('班级id:' + classId)
            console.log('学生id:' + studentId)

            util.getServerData(//获取班级专题简介
                {
                    key: ["getAppTopicClassInfo"],
                    postData: {
                        "classid": classId,
                        // "classid": 'b8d3f418-d024-11e7-8f29-005056bf154b',
                        "studentid": studentId
                    }
                },
                "api/CommonSQL", function (result) {
                    console.log('获取班级专题简介');
                    console.log(result)
                    console.log(result[0]);
                    console.log(result[0].phonerichmediaurl);
                    var data = {
                        url: '',
                        image: '',
                        guidingideology: result[0].guidingideology,
                        targetrequirements: result[0].targetrequirements,
                        graduationrequirement: result[0].graduationrequirement,
                    };
                    console.log(data);
                    console.log(result[0].image_servername);

                    that.setData({
                        classInfo: result[0],
                        banner: result[0].image_servername,
                        ifopenrichmedia: result[0].ifopenrichmedia,
                        phonerichmediaurl: result[0].phonerichmediaurl
                    });
                    wx.setNavigationBarTitle({
                        title: result[0].name,
                    })
                    // WxParse.wxParse('guidingideology', 'html', data.guidingideology, that, 25);
                    // WxParse.wxParse('targetrequirements', 'html', data.targetrequirements, that, 25);
                    // WxParse.wxParse('graduationrequirement', 'html', data.graduationrequirement, that, 25);

                    util.getServerData(//获取班级学习进度
                        {
                            key: ["getAppTopicClassProgress"],
                            postData: {
                                "classid": classId,
                                "studentid": studentId
                            }
                        },
                        "api/CommonSQL", function (result) {
                            console.log('获取班级学习进度');
                            console.log(result);
                            that.setData({
                                progress: result[0]
                            });

                            that.getTestDetail();//获得考试详情


                        })


                    /*util.getServerData(//获取班级课程设计必修课,选修课(合并必修选修列表)
                        {
                            key: ["getTopicClassRequiredElectiveCourseListUseWeicatTwo", "getTopicClassRequiredElectiveCourseTotalCountUseWeicatTwo"],
                            postData: {
                                classid: classId,
                                // classid: "dd068bb6-7f68-4499-86a5-8b7b986422f6",
                                pageindex: that.data.category0Page * that.data.category0Item,
                                pagesize: that.data.category0Item
                            }

                        },
                        "api/CommonSQL", function (result) {
                            console.log('获取班级课程设计必修课,选修课(合并必修选修列表)')
                            console.log(result)
                            console.log(result[0].data)
                            console.log(result[1].data[0].allcount)
                            var category = [];
                            result[0].data.map((res) => {
                                res.duration = util.secondToDate(res.duration * 60);
                                res.playpercentage = res.playpercentage.split('%')[0];
                                category.push(res)
                            });
                            that.setData({
                                category0: category,
                                category0Page: that.data.category0Page * that.data.category0Item,
                                allcount0: result[1].data[0].allcount
                            })


                        });*/

                    that.getCourse();
                    /*  util.getServerData(//获取班级课程设计必修课
                          {
                              key: ["getTopicClassRequiredElectiveCourseListUseWeicat"],
                              postData: {
                                  classid: classId,
                                  // classid: "dd068bb6-7f68-4499-86a5-8b7b986422f6",
                                  category: 0,
                                  pageindex: that.data.category0Page * that.data.category0Item,
                                  pagesize: that.data.category0Item
                              }

                          },
                          "api/CommonSQL", function (result) {
                              console.log('获取班级课程设计必修课')
                              console.log(result);
                              var category = [];
                              if (result.length) {
                                  that.setData({
                                      status: true
                                  });
                                  result.map((res) => {
                                      res.duration = util.secondToDate(res.duration * 60);
                                      res.playpercentage = res.playpercentage.split('%')[0];
                                      category.push(res)
                                  });
                                  that.setData({
                                      category0: category,
                                      category0Page: that.data.category0Page * that.data.category0Item,
                                  });
                              }
                              else {
                                  that.setData({
                                      status: false
                                  });
                              }

                              console.log(that.data.category0)
                              util.getServerData(//获取班级课程设计选修课
                                  {
                                      key: ["getTopicClassRequiredElectiveCourseListUseWeicat"],
                                      postData: {
                                          classid: classId,
                                          // classid: "dd068bb6-7f68-4499-86a5-8b7b986422f6",
                                          category: 1,
                                          pageindex: that.data.category1Page * that.data.category1Item,
                                          pagesize: that.data.category1Item
                                      }

                                  },
                                  "api/CommonSQL", function (result) {
                                      console.log('获取班级课程设计选修课')
                                      console.log(result);
                                      // let category0 = [];
                                      var category = [];
                                      if (result.length) {
                                          that.setData({
                                              status: true
                                          });
                                          result.map((res) => {
                                              res.duration = util.secondToDate(res.duration * 60);
                                              res.playpercentage = res.playpercentage.split('%')[0];
                                              category.push(res)
                                          });
                                          that.setData({
                                              category1Page: that.data.category1Page * that.data.category1Item,
                                              category1: category,
                                              //category1Len: result.length
                                          });
                                      }
                                      else {
                                          that.setData({
                                              status: false
                                          });
                                      }
                                      console.log(that.data.status)
                                      console.log(that.data.category0)
                                      console.log(that.data.category1)

                                      that.getAllcount();//获取必修课选修课总数


                                  })


                          })*/

                })


            util.getServerData(//专题培训结业考试(考试完成查看本次考试详情)
                {
                    classid: classId,
                    userid: studentId
                },
                "api/getLastExamDetailsInfo", function (result) {
                    console.log('本次得分')
                    console.log(result);
                    console.log(result.userexam)
                    if (result.userexam.length) {
                        console.log(result.userexam[0].examscore)
                        that.setData({
                            currentScore: result.userexam[0].examscore
                        })
                    }

                })


            util.getServerData({//根据学生id获取待学的学时
                key: ["getStudentWaitStudyTimeUseWeicat"],
                postData: {
                    studentid: studentId
                }

            }, "api/CommonSQL", function (result) {
                console.log('获取待学学时')
                console.log(result)
                console.log(result[0].waitstudytime)
                that.setData({
                    waitstudytime: result[0].waitstudytime
                })
            })


            util.getServerData(//查询该学员是否报名，用于课程设计页面的判断
                {
                    "key": ["GetIsSignUp"],
                    "postData": {
                        "classid": classId,
                        "studentid": studentId,

                        // "classid":"dd068bb6-7f68-4499-86a5-8b7b986422f6",
                        // "studentid": "5cff189e-9690-11e6-a71f-00fffab6298f",
                    }
                },
                "api/CommonSQL", function (result) {
                    console.log('查询该学员是否报名')
                    console.log(result);
                    console.log(result.length);
                    that.setData({
                        signUpStatus: result.length > 0 ? true : false
                    });


                })
        });

        /*
         util.getServerData(//专题培训结业考试(考试完成查看本次考试详情)
         {
         classid: "b8d3f418-d024-11e7-8f29-005056bf154b",
         userid: "5cff189e-9690-11e6-a71f-00fffab6298f"
         },
         "api/getLastExamDetailsInfo", function (result) {
         console.log('考试完成查看本次考试详情')
         console.log(result)
         })*/
    },
    getTestDetail: function () {
        var that = this;
        var classId = that.data.classId;
        console.log('classId:' + classId)
        console.log('userid:' + that.data.studentId)
        util.getServerData(//专题培训结业考试(查看最高分的考试详情)
            {
                classid: classId,
                userid: that.data.studentId
                // classid: "b8d3f418-d024-11e7-8f29-005056bf154b",
                // userid: "5cff189e-9690-11e6-a71f-00fffab6298f"
            },
            "api/getExamInfo", function (result) {
                console.log('查看最高分的考试详情');
                console.log(result);
                if (result.result) {
                    console.log(result.userexam[0]);
                    var testDetails = result.userexam[0];//考试详情
                    that.setData({
                        testDetail: testDetails
                    });
                    wx.hideLoading();

                }

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
    getCourse: function (e) {
        var that = this;
        var classId = that.data.classId;
        console.log(e)
        if (e) {
            that.setData({
                category0Page: 0
            });
        }

        util.getServerData(//获取班级课程设计必修课,选修课(合并必修选修列表)
            {
                key: ["getTopicClassRequiredElectiveCourseListUseWeicatTwo", "getTopicClassRequiredElectiveCourseTotalCountUseWeicatTwo"],
                postData: {
                    classid: classId,
                    // classid: "dd068bb6-7f68-4499-86a5-8b7b986422f6",
                    pageindex: that.data.category0Page * that.data.category0Item,
                    pagesize: that.data.category0Item
                }

            },
            "api/CommonSQL", function (result) {
                console.log('获取班级课程设计必修课,选修课(合并必修选修列表)')
                console.log(result)
                console.log(result[0].data)
                console.log(result[1].data[0].allcount)
                var category = [];
                result[0].data.map((res) => {
                    res.duration = util.secondToDate(res.duration * 60);
                    res.playpercentage = res.playpercentage.split('%')[0];
                    category.push(res)
                });
                that.setData({
                    category0: category,
                    category0Page: that.data.category0Page * that.data.category0Item,
                    allcount0: result[1].data[0].allcount
                })

                wx.hideNavigationBarLoading();
                wx.stopPullDownRefresh();
            });
    },
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        this.getCourse(1);
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    /*onReachBottom: function (e) {//前台模拟上拉加载
     var that = this;
     var tabIdx = that.data.currentTab;//当前选中的tab 下标
     var category0Item = that.data.category0Item;//必修课显示数量
     var category1Item = that.data.category1Item;//选修课显示数量
     var category0 = that.data.category0;//必修课集合
     var category1 = that.data.category1;//选修课集合
     var status = that.data.status;//false为必修选修没数据，true为有数据
     if (tabIdx == 1 && category0Item < category0.length && status) {
     category0Item = category0Item * 2;
     }
     else if (tabIdx == 2 && category1Item < category1.length && status) {
     category1Item = category1Item * 2;
     }
     that.setData({
     category0Item: category0Item,
     category1Item: category1Item
     })

     },*/
    onReachBottom: function (e) {//后台上拉加载
        var that = this;
        var tabIdx = that.data.currentTab;//当前选中的tab 下标
        var category0Item = that.data.category0Item;//必修课显示数量
        var category1Item = that.data.category1Item;//选修课显示数量
        var category0Page = that.data.category0Page;//必修课显示当前页
        var category1Page = that.data.category1Page;//选修课显示当前页
        var allcount0 = that.data.allcount0;//必修课总数
        var allcount1 = that.data.allcount1;//选修课总数
        var category0Len = that.data.category0Len;//必修课len
        var category1Len = that.data.category1Len;//选修课len
        var classId = that.data.classId;//班级id
        var category0 = that.data.category0;//必修课集合
        var category1 = that.data.category1;//选修课集合
        var status = that.data.status;//false为必修选修没数据，true为有数据
        var category0MaxPage = Math.ceil(allcount0 / category0Item);
        var category1MaxPage = Math.ceil(allcount1 / category1Item);
        console.log('allcount0:' + allcount0)
        console.log('category0Page:' + category0Page)
        console.log('category0MaxPage:' + category0MaxPage)
        console.log(status)
        if (tabIdx == 1) {
            category0Page += 1;
        }
        else if (tabIdx == 2) {
            category1Page += 1;
        }
        if (tabIdx == 1 && category0Page < category0MaxPage) {
            that.setData({
                category0Page: category0Page
            });


            util.getServerData(//获取班级课程设计必修课,选修课(合并必修选修列表)
                {
                    key: ["getTopicClassRequiredElectiveCourseListUseWeicatTwo", "getTopicClassRequiredElectiveCourseTotalCountUseWeicatTwo"],
                    postData: {
                        classid: classId,
                        // classid: "dd068bb6-7f68-4499-86a5-8b7b986422f6",
                        pageindex: category0Page * category0Item,
                        pagesize: category0Item
                    }

                },
                "api/CommonSQL", function (result) {
                    console.log('获取班级课程设计必修课,选修课(合并必修选修列表)')
                    console.log(result);

                    result[0].data.map((res) => {
                        res.duration = util.secondToDate(res.duration * 60);
                        res.playpercentage = res.playpercentage.split('%')[0];
                        category0.push(res)
                    });
                    that.setData({
                        category0: category0,
                    });


                })
        }
        /* else if (tabIdx == 2 && category1Page < category1MaxPage) {

             that.setData({
                 category1Page: category1Page
             });


             util.getServerData(//获取班级课程设计选修课
                 {
                     key: ["getTopicClassRequiredElectiveCourseListUseWeicat"],
                     postData: {
                         classid: classId,
                         // classid: "dd068bb6-7f68-4499-86a5-8b7b986422f6",
                         category: 1,
                         pageindex: category1Page * category1Item,
                         pagesize: category1Item
                     }

                 },
                 "api/CommonSQL", function (result) {
                     console.log('获取班级课程设计选修课')
                     console.log(result);
                     if (result.length) {
                         that.setData({
                             status: true
                         });
                         result.map((res) => {
                             res.duration = util.secondToDate(res.duration * 60);
                             res.playpercentage = res.playpercentage.split('%')[0];
                             category1.push(res)
                         });
                         that.setData({
                             category1: category1
                         });
                     }
                     else {
                         that.setData({
                             status: false
                         });
                     }
                 },)


         }*/


    },

    /*swichChild: function (e) {//必修选修课切换
        var that = this;
        if (this.data.childTab === e.target.dataset.child) {
            return false;
        }
        else {
            that.setData({
                childTab: e.target.dataset.child
            })
        }
    },*/
    swichNav: function (e) {//点击tab切换下面内容
        var that = this;
        console.log(e.target.dataset.current)
        /*if (e.target.dataset.current == 2) {
            console.log(that.data.phonerichmediaurl)
            var url = that.data.phonerichmediaurl.replace("{{classid}}", that.data.classId)
            console.log(that.data.classId)
            console.log(url)
            wx.navigateTo({
                url: `/pages/Curriculum/webview?url=${url}`,
            })
        }
        else if (that.data.currentTab === e.target.dataset.current) {
            return false;
        }*/
        if (that.data.currentTab === e.target.dataset.current) {
            return false;
        }
        else {
            that.setData({
                currentTab: e.target.dataset.current
            });
        }
    },
    endTest: function () {//进入考试页面endTest
        var that = this;
        var classId = that.data.classId;
        var testStatus = that.data.testStatus;
        console.log(classId)

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
        else {
            wx.navigateTo({
                url: `../endTest/endTest?classId=${classId}&testStatus=${testStatus}`
            })
        }

    },
    subScore: function () {//提交分数
        var that = this;
        console.log(this.data.studentId)
        util.getServerData(//获取班级课程设计选修课
            {
                "classid": that.data.classId,
                // classid: "dd068bb6-7f68-4499-86a5-8b7b986422f6",
                "studentid": that.data.studentId,
                "userid": that.data.studentId,
                "examstudytime": 1,
                "whoNeed": 1
            },
            "api/submitExamscore", function (result) {
                if (result.result) {
                    wx.showToast({
                        title: result.message,
                        icon: 'success',
                        duration: 2000
                    })
                }
            })

    },
    signUp: function () {//报名状态
        var that = this;
        if (!that.data.signUpStatus) {//没报名

            util.getServerData(//报名
                {
                    "classid": that.data.classId,
                },
                "api/SignUp", function (result) {
                    console.log(result)
                    if (result.result) {
                        wx.showToast({
                            title: '报名成功',
                            icon: 'success',
                            duration: 2000,
                            mask: true,
                            success: function () {
                                that.setData({
                                    signUpStatus: !that.data.signUpStatus
                                });
                            }
                        })
                    }
                    else {
                        wx.showToast({
                            title: result.message,
                            icon: 'none',
                            duration: 2000,
                            mask: true
                        })
                    }
                })
        }
    },
    toPlay: function (e) {//进入播放页
        var that = this;
        console.log(e.currentTarget.dataset.coursewareid);
        var courseId = e.currentTarget.dataset.coursewareid;//课程id
        if (!that.data.signUpStatus) {//没报名

            util.getServerData(//报名
                {
                    "classid": that.data.classId,
                },
                "api/SignUp", function (result) {
                    console.log(result)
                    if (result.result) {
                        wx.showToast({
                            title: '报名成功',
                            icon: 'success',
                            duration: 2000,
                            mask: true,
                            success: function () {
                                that.setData({
                                    signUpStatus: !that.data.signUpStatus
                                });
                                wx.navigateTo({
                                    url: `../lesdetail/detail?id=${courseId}`
                                })
                            }
                        })
                    }
                    else {
                        wx.showToast({
                            title: result.message,
                            icon: 'none',
                            duration: 2000,
                            mask: true
                        })
                    }
                })
        }
        else {
            wx.navigateTo({
                url: `../lesdetail/detail?id=${courseId}`
            })
        }

    }
});
