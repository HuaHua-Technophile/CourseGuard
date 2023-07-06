const app = getApp();
const db = wx.cloud.database().collection("Curriculum"); //在开始使用数据库 API 进行增删改查操作之前，需要先获取数据库的引用。以下调用获取默认环境的数据库的引用
Page({
  data: {
    Curriculum: {}, //课程表数据,在保存后使用set更新记录时,需要放入部分的原本数据
    CourseList: [], //所有课程的数据存放,因为页面的顺序不能乱,因此将对象改为数组
    CourseIndex: "", // 指定当前缓冲栈中的颜色存入哪个课程
    color: "", //指定当前缓冲栈中的颜色存入课程的背景色还是前景色
    rgb: "rgb(0,154,97)", //当前存放进入缓冲栈的的颜色值
    pick: false, //控制颜色选择器显示/隐藏
    theme: "", //暗色/亮色
    navBarFullHeight: 0, // 整个导航栏高度
    navBarTop: 0, //navbar内容区域顶边距
    navBarHeight: 0, //navbar内容区域高度
  },
  goBack() {
    wx.navigateBack({ delta: 1 });
  },
  // 显示取色器
  toPick(e) {
    this.setData({ pick: true });
    this.setData({
      CourseIndex: e.currentTarget.dataset.index,
      color: e.currentTarget.dataset.color,
    });
    console.log("准备修改颜色值", this.data.CourseIndex, this.data.color);
  },
  //取色结果回调
  pickColor(e) {
    this.setData({
      [`CourseList[${this.data.CourseIndex}].${this.data.color}`]: e.detail.color
        .replace("rgb(", "")
        .replace(")", ""),
    });
    console.log(
      `修改了${this.data.CourseList[this.data.CourseIndex].name}的${
        this.data.color
      }颜色值为:`,
      this.data.CourseList[this.data.CourseIndex][this.data.color]
    );
  },
  addCourse() {
    let CourseList = this.data.CourseList;
    CourseList.unshift({
      name: "",
      fullName: "",
      teacher: "",
      location: "",
      bgColor: "",
      textColor: "",
      remark: "",
    });
    this.setData({ CourseList });
    console.log("当前课表新增了一节课程:", this.data.CourseList);
  },
  // 输入框失去焦点保存课程名称
  changeValue(e) {
    console.log("即将编辑:", this.data.CourseList[e.target.id]);
    if (e.detail.value != "")
      this.setData({
        [`CourseList[${e.target.id}].${e.target.dataset.value}`]: e.detail
          .value,
      });
    console.log("编辑完成:", this.data.CourseList);
  },
  // 删除课程
  deleteThisCourse(e) {
    wx.showModal({
      title: `删除${e.currentTarget.dataset.name}`,
      content: "你不是手滑了嘛?",
      cancelText: "手滑啦",
      confirmText: "删掉它!",
      success: (res) => {
        if (res.confirm) {
          let CourseList = this.data.CourseList;
          CourseList.splice(e.currentTarget.dataset.index, 1);
          this.setData({ CourseList });
        }
      },
    });
  },
  // 保存数据,替换数据库中数据
  saveCourse() {
    if (this.data.CourseList.some((i) => i.name == ""))
      wx.showToast({
        title: "课程的简称为空",
        icon: "error",
      });
    else {
      let Course = {};
      this.data.CourseList.forEach((i) => {
        Course[i.name] = i;
      });
      db.doc(`${app.globalData.id}`).set({
        data: {
          Course,
          name: this.data.Curriculum.name,
          classInfo: this.data.Curriculum.classInfo,
          arrangement: this.data.Curriculum.arrangement,
          hour: this.data.Curriculum.hour,
        },
        success: function (res) {
          console.log("更新了数据库", res);
          wx.navigateBack({ delta: 1 });
        },
      });
      console.log("点击了保存", Course);
    }
  },
  /*生命周期函数--监听页面加载*/
  onLoad(options) {
    this.setData({
      theme: app.globalData.theme,
      navBarFullHeight: app.globalData.navBarFullHeight,
      navBarTop: app.globalData.navBarTop,
      navBarHeight: app.globalData.navBarHeight,
    });
    // 接收其他页面传值-------------------------
    db.where({ _id: app.globalData.id }).get({
      success: (res) => {
        this.setData({ Curriculum: res.data[0] });
        let CourseList = [];
        for (let i in res.data[0].Course) {
          res.data[0].Course[i].name = i;
          CourseList.push(res.data[0].Course[i]);
        }
        this.setData({ CourseList });
        console.log("当前课程表有这些课程", res, this.data.CourseList);
      },
    });
  },
});
