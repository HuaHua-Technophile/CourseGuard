//获取全局公用数据

Page({
  data: {
    Curriculum: {
      curriculumName: "",
    },
    newUser: true, //是否为新用户,默认为true
    theme: "", //主题色
  },
  // 路由跳转-----------------
  toClassSetting() {
    wx.redirectTo({
      url: "../classSetting/classSetting",
    });
  },
  toTimeSetting() {
    wx.redirectTo({
      url: "../timeSetting/timeSetting",
    });
  },
  // 生命周期函数--监听页面加载
  async onLoad(options) {
    // 主题色-----------------------------
    wx.getSystemInfo({
      success: (res) => (getApp().globalData.theme = res.theme),
    });
    this.setData({
      theme: getApp().globalData.theme
    });
    // 数据库初始化,用于判断用户是否是新用户,做出相应操作
    const db = wx.cloud.database(); //在开始使用数据库 API 进行增删改查操作之前，需要先获取数据库的引用。以下调用获取默认环境的数据库的引用
    //统计数据库中能获取到多少条该用户的课程表,判断是否是新用户
    db.collection("Curriculum").count({
      success: (res) => {
        if (res.total > 0) this.setData({
          newUser: false
        });
        // 如果为新用户,则给一个默认课表,同时存入数据库
        if (this.data.newUser) {
          this.setData({
            Curriculum: {
              curriculumName: "课镖客",
              arrangement: [{
                  morningCourses: ["", "", "", ""],
                  afternoonCourses: ["", "", "", ""],
                  nightCourses: ["", ""],
                },
                {
                  morningCourses: ["", "", "", ""],
                  afternoonCourses: ["", "", "", ""],
                  nightCourses: ["", ""],
                },
                {
                  morningCourses: ["", "", "", ""],
                  afternoonCourses: ["", "", "", ""],
                  nightCourses: ["", ""],
                },
                {
                  morningCourses: ["", "", "", ""],
                  afternoonCourses: ["", "", "", ""],
                  nightCourses: ["", ""],
                },
                {
                  morningCourses: ["", "", "", ""],
                  afternoonCourses: ["", "", "", ""],
                  nightCourses: ["", ""],
                },
                {
                  morningCourses: ["", "", "", ""],
                  afternoonCourses: ["", "", "", ""],
                  nightCourses: ["", ""],
                },
                {
                  morningCourses: ["", "", "", ""],
                  afternoonCourses: ["", "", "", ""],
                  nightCourses: ["", ""],
                },
              ],
              hour: [
                ["08:00", "08:40"],
                ["09:00", "09:40"],
                ["10:00", "10:40"],
                ["11:00", "11:40"],
                ["14:00", "14:40"],
                ["15:00", "15:40"],
                ["16:00", "16:40"],
                ["17:00", "17:40"],
                ["19:00", "19:40"],
                ["20:00", "20:40"],
              ],
              // 课表信息
              classInfo: {
                morningStart: "08:00", //上午开始时间
                morningCourses: 4, //上午课程数量
                afternoonStart: "14:00", //下午开始时间
                afternoonCourses: 4, //下午课程数量
                nightStart: "19:00", //晚上开始时间
                nightCourses: 2, //晚上课程数量
                courseTime: 40, //一节课的时间
                breakTime: 20, //课间休息的时长
                courseTotal: {}, //存放课程的信息
              },
            },
          });
          db.collection("Curriculum").add({
            // data 字段表示需新增的 JSON 数据
            data: {
              // _id: 'todo-identifiant-aleatoire', // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
              Curriculum: this.data.Curriculum,
            },
          });
        } //如果不是新用户
        else {
          db.collection("Curriculum").get({
            success: (res) => {
              // console.log(res.data)// res.data 包含该记录的数据
              this.setData({
                Curriculum: res.data[0]
              });
            },
          });
        }
      },
    });
  },
  onReady() {
    //判断用户主题是暗色还是亮色
    // 主题色
  }, //生命周期函数--监听页面初次渲染完成
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},
});