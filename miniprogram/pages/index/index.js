//获取全局公用数据

Page({
  data: {
    Curriculum: {
      curriculumName: "",
    },
    theme: "", //主题色
    week: -1, //今天是周几,用于顶部周几高亮
    // Editing: false,//是否处于编辑状态
    CurriculumId: 'ke'biao'ke', // 当前展示的课表是哪个
  },
  // 课表数据获取,封装为函数
  getCurriculum() {
    const db = wx.cloud.database(); //在开始使用数据库 API 进行增删改查操作之前，需要先获取数据库的引用。以下调用获取默认环境的数据库的引用
    db.collection("Curriculum")
      .where({ _id: this.data.CurriculumId })
      .get({
        success: (res) => {
          this.setData({
            Curriculum: res.data[this.data.CurriculumIndex], //返回数据是一个数组,取其第Index个作为当前渲染的课程表
          });
          console.log("打印课表数据", this.data.Curriculum); //打印课表数据
        },
      });
  },
  // 路由跳转-------------------------
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
  toChangeCurriculum() {
    wx.redirectTo({
      url: "../changeCurriculum/changeCurriculum",
    });
  },
  // 生命周期函数--监听页面加载
  async onLoad(options) {
    // 主题色-----------------------------
    wx.getSystemInfo({
      success: (res) => (getApp().globalData.theme = res.theme),
    });
    this.setData({
      theme: getApp().globalData.theme,
    });
    // 数据库初始化,用于判断用户是否是新用户,做出相应操作
    const db = wx.cloud.database(); //在开始使用数据库 API 进行增删改查操作之前，需要先获取数据库的引用。以下调用获取默认环境的数据库的引用
    //统计数据库中能获取到多少条该用户的课程表,判断是否是新用户
    db.collection("Curriculum").count({
      success: (res) => {
        console.log(`获取到${res.total}个课程表,新用户:${res.total == 0}`);
        if (res.total == 0) {
          db.collection("Curriculum").add({
            // data 字段表示需新增的 JSON 数据
            data: {
              _id: "课镖客", // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
              // 课程信息
              arrangement: [
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
                {
                  morningCourses: ["", "", "", ""],
                  afternoonCourses: ["", "", "", ""],
                  nightCourses: ["", ""],
                },
              ],
              // 上课时段
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
            success: function (res) {
              console.log("课程表添加成功", res);
              this.setData()
            },
          });
        }
      },
    });
    this.getCurriculum();
    // 判断当前为该周的周几,然后进行页面顶部周几的高亮------------------
    this.setData({ week: new Date().getDay() });
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
