const app = getApp();
Page({
  data: {
    Curriculum: {},
    week: -1, //今天是周几,用于顶部周几高亮
    Editing: false, //是否处于编辑状态
    CurriculumId: "", // 当前展示的课表是哪个
    pageContainerShow: false, // 假页面容器展示状态
    theme: "", //暗色/亮色
    navBarFullHeight: 0, // 整个导航栏高度
    navBarTop: 0, //navbar内容区域顶边距
    navBarHeight: 0, //navbar内容区域高度
  },
  // 关于我们
  aboutUs() {
    this.setData({ pageContainerShow: true });
  },
  // 课表数据获取,封装为函数
  getCurriculum() {
    const db = wx.cloud.database(); //在开始使用数据库 API 进行增删改查操作之前，需要先获取数据库的引用。以下调用获取默认环境的数据库的引用
    console.log(`将获取_id为 "${this.data.CurriculumId}" 的课表`);
    db.collection("Curriculum")
      .where({
        _id: this.data.CurriculumId,
      })
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
    wx.navigateTo({
      url: `../classSetting/classSetting?id=${this.data.CurriculumId}`,
    });
  },
  toTimeSetting() {
    wx.navigateTo({
      url: `../timeSetting/timeSetting?id=${this.data.CurriculumId}`,
    });
  },
  toChangeCurriculum() {
    wx.navigateTo({
      url: `../changeCurriculum/changeCurriculum`,
    });
  },
  toAddCourse() {
    wx.navigateTo({
      url: `../addCourse/addCourse?id=${this.data.CurriculumId}`,
    });
  },
  // 切换进入预备编辑------------------------------
  changeEditing() {
    let arrangement = this.data.Curriculum.arrangement;
    arrangement.forEach((i) => {
      for (let j in i) {
        i[j].forEach((k) => (k.check = false));
      }
    });
    this.setData({
      Editing: !this.data.Editing,
    });
    this.setData({
      [`Curriculum.arrangement`]: arrangement,
    });
  },
  // 完成编辑
  finishEditing() {
    this.setData({
      Editing: !this.data.Editing,
    });
  },
  // 点击添加课程进入预备编辑或提示课程信息
  addCourse(e) {
    if (this.data.Editing) {
      let arrangement = this.data.Curriculum.arrangement;
      arrangement[e.currentTarget.dataset.day][e.currentTarget.dataset.course][
        e.currentTarget.dataset.index
      ].check = !arrangement[e.currentTarget.dataset.day][
        e.currentTarget.dataset.course
      ][e.currentTarget.dataset.index].check; //check取反
      this.setData({
        [`Curriculum.arrangement[${e.currentTarget.dataset.day}].${e.currentTarget.dataset.course}[${e.currentTarget.dataset.index}].check`]: arrangement[
          e.currentTarget.dataset.day
        ][e.currentTarget.dataset.course][e.currentTarget.dataset.index].check,
      }); //取反后设置回this.data中
      console.log(
        "添加/删除了一节课进入待编辑列表",
        arrangement[e.currentTarget.dataset.day][
          e.currentTarget.dataset.course
        ][e.currentTarget.dataset.index]
      );
    } else {
      console.log("弹出课程信息框");
    }
  },
  // 生命周期函数--监听页面加载
  async onLoad() {
    this.setData({
      theme: app.globalData.theme,
      navBarFullHeight: app.globalData.navBarFullHeight,
      navBarTop: app.globalData.navBarTop,
      navBarHeight: app.globalData.navBarHeight,
    });
    const db = wx.cloud.database();
    // 如果课程表id为空,说明用户新进入小程序,需要执行是否为新用户的判断
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
                name: "课镖客777",
                // 课程信息
                Course: {},
                // 课程安排
                arrangement: [
                  {
                    morningCourses: [
                      {
                        Course: "",
                      },
                      {
                        Course: "",
                      },
                      {
                        Course: "",
                      },
                      {
                        Course: "",
                      },
                    ],
                    afternoonCourses: [
                      {
                        Course: "",
                      },
                      {
                        Course: "",
                      },
                      {
                        Course: "",
                      },
                      {
                        Course: "",
                      },
                    ],
                    nightCourses: [
                      {
                        Course: "",
                      },
                      {
                        Course: "",
                      },
                    ],
                  },
                  {
                    morningCourses: [
                      {
                        Course: "",
                      },
                      {
                        Course: "",
                      },
                      {
                        Course: "",
                      },
                      {
                        Course: "",
                      },
                    ],
                    afternoonCourses: [
                      {
                        Course: "",
                      },
                      {
                        Course: "",
                      },
                      {
                        Course: "",
                      },
                      {
                        Course: "",
                      },
                    ],
                    nightCourses: [
                      {
                        Course: "",
                      },
                      {
                        Course: "",
                      },
                    ],
                  },
                  {
                    morningCourses: [
                      {
                        Course: "",
                      },
                      {
                        Course: "",
                      },
                      {
                        Course: "",
                      },
                      {
                        Course: "",
                      },
                    ],
                    afternoonCourses: [
                      {
                        Course: "",
                      },
                      {
                        Course: "",
                      },
                      {
                        Course: "",
                      },
                      {
                        Course: "",
                      },
                    ],
                    nightCourses: [
                      {
                        Course: "",
                      },
                      {
                        Course: "",
                      },
                    ],
                  },
                  {
                    morningCourses: [
                      {
                        Course: "",
                      },
                      {
                        Course: "",
                      },
                      {
                        Course: "",
                      },
                      {
                        Course: "",
                      },
                    ],
                    afternoonCourses: [
                      {
                        Course: "",
                      },
                      {
                        Course: "",
                      },
                      {
                        Course: "",
                      },
                      {
                        Course: "",
                      },
                    ],
                    nightCourses: [
                      {
                        Course: "",
                      },
                      {
                        Course: "",
                      },
                    ],
                  },
                  {
                    morningCourses: [
                      {
                        Course: "",
                      },
                      {
                        Course: "",
                      },
                      {
                        Course: "",
                      },
                      {
                        Course: "",
                      },
                    ],
                    afternoonCourses: [
                      {
                        Course: "",
                      },
                      {
                        Course: "",
                      },
                      {
                        Course: "",
                      },
                      {
                        Course: "",
                      },
                    ],
                    nightCourses: [
                      {
                        Course: "",
                      },
                      {
                        Course: "",
                      },
                    ],
                  },
                  {
                    morningCourses: [
                      {
                        Course: "",
                      },
                      {
                        Course: "",
                      },
                      {
                        Course: "",
                      },
                      {
                        Course: "",
                      },
                    ],
                    afternoonCourses: [
                      {
                        Course: "",
                      },
                      {
                        Course: "",
                      },
                      {
                        Course: "",
                      },
                      {
                        Course: "",
                      },
                    ],
                    nightCourses: [
                      {
                        Course: "",
                      },
                      {
                        Course: "",
                      },
                    ],
                  },
                  {
                    morningCourses: [
                      {
                        Course: "",
                      },
                      {
                        Course: "",
                      },
                      {
                        Course: "",
                      },
                      {
                        Course: "",
                      },
                    ],
                    afternoonCourses: [
                      {
                        Course: "",
                      },
                      {
                        Course: "",
                      },
                      {
                        Course: "",
                      },
                      {
                        Course: "",
                      },
                    ],
                    nightCourses: [
                      {
                        Course: "",
                      },
                      {
                        Course: "",
                      },
                    ],
                  },
                ],
                // 上课时段
                hour: {
                  morningArr: [],
                  afternonArr: [],
                  nightArr: [],
                },
                // 课表信息
                classInfo: {
                  morningCourses: 4, //上午课程数量
                  afternoonCourses: 4, //下午课程数量
                  nightCourses: 2, //晚上课程数量
                },
              },
              success: (res) => {
                console.log(`课程表${res._id}添加成功`, res);
                this.setData({
                  CurriculumId: res._id,
                });
                this.getCurriculum(); //获取课表数据
              },
            });
          } else {
            db.collection("Curriculum").get({
              success: (res) => {
                this.setData({
                  Curriculum: res.data[0],
                });
                this.setData({
                  CurriculumId: res.data[0]._id,
                });
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
});
