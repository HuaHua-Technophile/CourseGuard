const app = getApp();
const db = wx.cloud.database(); //在开始使用数据库 API 进行增删改查操作之前，需要先获取数据库的引用。以下调用获取默认环境的数据库的引用
Page({
  data: {
    Curriculum: {},
    week: -1, //今天是周几,用于顶部周几高亮
    Editing: false, //是否处于编辑状态
    pageContainerShow: false, // 假页面容器展示状态
    theme: "", //暗色/亮色
    navBarFullHeight: 0, // 整个导航栏高度
    navBarTop: 0, //navbar内容区域顶边距
    navBarHeight: 0, //navbar内容区域高度
    CourseList: [],
  },
  // 关于我们
  aboutUs() {
    this.setData({
      pageContainerShow: true,
    });
  },
  // 课程列表修改与当前课程信息log打印
  pushCourseList() {
    // 将课程写入数组中,以进行编辑课程的选择
    let CourseList = [];
    for (let i in this.data.Curriculum.Course) {
      CourseList.push(i);
    }
    this.setData({ CourseList });
    console.log(
      "当前课表",
      this.data.Curriculum,
      "有这些课程:",
      this.data.CourseList
    ); //当前课表数据
  },
  // 课表数据获取,封装为函数
  getCurriculum() {
    console.log(`将获取_id为 "${app.globalData.id}" 的课表`);
    db.collection("Curriculum")
      .where({
        _id: app.globalData.id,
      })
      .get({
        success: (res) => {
          console.log(`_id"${app.globalData.id}":`, res);
          this.setData({ Curriculum: res.data[0] }); //返回数据是一个数组,取其第Index个作为当前渲染的课程表
          this.pushCourseList();
        },
      });
  },
  // 路由跳转-------------------------
  toThisPage(e) {
    wx.navigateTo({ url: e.currentTarget.dataset.url });
  },
  // 切换进入预备编辑------------------------------
  changeEditing() {
    let arrangement = this.data.Curriculum.arrangement;
    arrangement.forEach((i) => {
      for (let j in i) {
        i[j].forEach((k) => (k.check = false));
      }
    });
    this.setData({ Editing: !this.data.Editing });
    this.setData({ [`Curriculum.arrangement`]: arrangement });
  },
  // 点击添加课程进入预备编辑或提示课程信息
  addCourseToEditing(e) {
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
  // 编辑已经勾选的课时
  PickerChange(e) {
    let arrangement = this.data.Curriculum.arrangement;
    arrangement.forEach((i) => {
      for (let j in i) {
        i[j].forEach((k) => {
          if (k.check == true) k.name = this.data.CourseList[e.detail.value];
        });
      }
    });

    console.log("picker选择了", e);
  },
  // 完成编辑
  finishEditing() {
    this.setData({
      Editing: !this.data.Editing,
    });
  },
  // 生命周期函数--监听页面加载
  async onLoad() {
    this.setData({
      theme: app.globalData.theme,
      navBarFullHeight: app.globalData.navBarFullHeight,
      navBarTop: app.globalData.navBarTop,
      navBarHeight: app.globalData.navBarHeight,
    });
  },
  onShow() {
    console.log(
      "当前课程id:",
      app.globalData.id,
      "是否第一次进入页面:",
      app.globalData.id == -1
    );
    // 如果课程表id为空,说明用户新进入小程序,需要执行是否为新用户的判断
    if (app.globalData.id == -1) {
      // 统计数据库中能获取到多少条该用户的课程表,判断是否是新用户
      db.collection("Curriculum").count({
        success: (res) => {
          console.log(`获取到${res.total}个课程表,新用户:${res.total == 0}`);
          if (res.total == 0) {
            db.collection("Curriculum").add({
              // data 字段表示需新增的 JSON 数据
              data: {
                name: '课镖客',
                // 课程信息
                Course: app.globalData.Course,
                // 课程安排
                arrangement: app.globalData.arrangement,
                // 上课时段
                hour: app.globalData.hour,
                // 课表信息
                classInfo: app.globalData.classInfo,
              },
              success: (res) => {
                app.globalData.id = res._id;
                console.log(`课程表${app.globalData.id}添加成功`, res);
                this.getCurriculum(); //获取课表数据
              },
            });
          } else {
            db.collection("Curriculum").get({
              success: (res) => {
                this.setData({
                  Curriculum: res.data[0],
                });
                app.globalData.id = res.data[0]._id;
                this.pushCourseList();
              },
            });
          }
        },
      });
    }
    // 如果课程表id已经存在,说明是其他路由页面跳转回来
    else {
      console.log(`课程id不为空${app.globalData.id},直接获取数据`);
      this.getCurriculum(); //获取课表数据
    }
    // 判断当前为该周的周几,然后进行页面顶部周几的高亮------------------
    this.setData({ week: new Date().getDay() });
  },
});
