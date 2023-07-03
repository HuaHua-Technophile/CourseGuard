//获取全局公用数据

Page({
  data: {
    Curriculum: {},
    theme: "", //主题色
    week: -1, //今天是周几,用于顶部周几高亮
    Editing: false, //是否处于编辑状态
    CurriculumId: "", // 当前展示的课表是哪个
    
  },
  // 课表数据获取,封装为函数
  getCurriculum() {
    const db = wx.cloud.database(); //在开始使用数据库 API 进行增删改查操作之前，需要先获取数据库的引用。以下调用获取默认环境的数据库的引用
    console.log(`将获取_id为 "${this.data.CurriculumId}" 的课表`);
    db.collection("Curriculum")
      .where({ _id: this.data.CurriculumId })
      .get({
        success: (res) => {
          console.log(`_id"${this.data.CurriculumId}":`, res);
          this.setData({
            Curriculum: res.data[0], //返回数据是一个数组,取其第Index个作为当前渲染的课程表
          });
          console.log("当前课表数据", this.data.Curriculum); //当前课表数据
        },
      });
  },
  // 路由跳转-------------------------
  toClassSetting() {
    wx.redirectTo({
      url: `../classSetting/classSetting?theme=${this.data.theme}`,
    });
  },
  toTimeSetting() {
    wx.redirectTo({
      url: `../timeSetting/timeSetting?theme=${this.data.theme}`,
    });
  },
  toChangeCurriculum() {
    wx.redirectTo({
      url: `../changeCurriculum/changeCurriculum?theme=${this.data.theme}`,
    });
  },
  // 长按编辑课程--------------------------
  addCourse(CourseTime, item, C) {
    this.setData({ Editing: true });
    console.log("长按进入编辑状态", this.data.Editing, CourseTime, item, C);
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
    // 如果课程表id为空,说明用户新进入小程序,需要执行是否为新用户的判断
    const db = wx.cloud.database(); //在开始使用数据库 API 进行增删改查操作之前，需要先获取数据库的引用。以下调用获取默认环境的数据库的引用
    if (this.data.CurriculumId == "") {
      console.log(`课程id为空,进入数据库初始化判断`);
      // 统计数据库中能获取到多少条该用户的课程表,判断是否是新用户
      db.collection("Curriculum").count({
        success: (res) => {
          console.log(`获取到${res.total}个课程表,新用户:${res.total == 0}`);
          if (res.total == 0) {
            db.collection("Curriculum").add({
              // data 字段表示需新增的 JSON 数据
              data: {
                // _id: "课镖客666", // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
                name: "课镖客666",
                // 课程信息
                Course: {
                  声乐: {
                    courseColor: "#49700B",
                    teacher: "波澜哥",
                    textColor: "#c8c8c8",
                    classRoom: "9-301",
                  },
                  思政: {
                    classRoom: "5-214",
                    courseColor: "#8FFFD6",
                    teacher: "张三",
                    textColor: "#c8c8c8",
                  },
                  间谍伪装: {
                    classRoom: "1A-999",
                    courseColor: "#564asd",
                    teacher: "川建国",
                    textColor: "#c8c8c8",
                  },
                },
                // 课程安排
                arrangement: [
                  {
                    morningCourses: ["声乐", "思政", "", ""],
                    afternoonCourses: ["", "", "", "声乐"],
                    nightCourses: ["", ""],
                  },
                  {
                    morningCourses: ["", "", "思政", ""],
                    afternoonCourses: ["", "声乐", "间谍伪装", ""],
                    nightCourses: ["", ""],
                  },
                  {
                    morningCourses: ["", "间谍伪装", "间谍伪装", ""],
                    afternoonCourses: ["", "", "", ""],
                    nightCourses: ["", "思政"],
                  },
                  {
                    morningCourses: ["", "", "", ""],
                    afternoonCourses: ["", "", "声乐", ""],
                    nightCourses: ["", ""],
                  },
                  {
                    morningCourses: ["", "思政", "", "间谍伪装"],
                    afternoonCourses: ["", "", "", ""],
                    nightCourses: ["", ""],
                  },
                  {
                    morningCourses: ["声乐", "声乐", "声乐", "声乐"],
                    afternoonCourses: ["", "思政", "", ""],
                    nightCourses: ["间谍伪装", "间谍伪装"],
                  },
                  {
                    morningCourses: ["思政", "思政", "思政", "思政"],
                    afternoonCourses: ["间谍伪装", "", "", ""],
                    nightCourses: ["", "思政"],
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
              success: (res) => {
                console.log(`课程表${res._id}添加成功`, res);
                this.setData({ CurriculumId: res._id });
                this.getCurriculum(); //获取课表数据
              },
            });
          } else {
            db.collection("Curriculum").get({
              success: (res) => {
                this.setData({ Curriculum: res.data[0] });
                console.log("当前课表数据", this.data.Curriculum); //当前课表数据
              },
            });
          }
        },
      });
    }
    // 如果课程表id已经存在,说明是其他路由页面跳转回来
    else {
      console.log(`课程id不为空${this.data.CurriculumId},直接获取数据`);
      this.getCurriculum(); //获取课表数据
    }
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
