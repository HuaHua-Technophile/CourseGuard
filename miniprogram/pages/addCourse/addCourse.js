const app = getApp();
Page({
  data: {
    id: -1, //传入的当前课表的id
    CourseList: [], //所有课程的数据存放,因为页面的顺序不能乱,因此将对象改为数组
    CourseListBackup: [], //页面进入时的数据备份,退出时检查一致性,若不一致则提示保存
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
    });
    this.setData({ CourseList });
    console.log("当前课表新增了一节课程:", this.data.CourseList);
  },
  // 输入框失去焦点保存课程名称
  changeValue(e) {
    if (e.detail.value != "")
      this.setData({
        [`CourseList[${e.target.id}].${e.target.dataset.value}`]: e.detail
          .value,
      });
  },
  saveCourse() {
    console.log("点击了保存", this.data.CourseList);
    if (this.data.CourseList.some((i) => i.name == ""))
      wx.showToast({
        title: "课程的简称为空",
        icon: "error",
      });
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
    this.setData({ id: options.id });
    const db = wx.cloud.database();
    db.collection("Curriculum")
      .where({ _id: this.data.id })
      .get({
        success: (res) => {
          let CourseList = [];
          for (let i in res.data[0].Course) {
            res.data[0].Course[i].name = i;
            CourseList.push(res.data[0].Course[i]);
          }
          this.setData({ CourseList });
          this.setData({ CourseListBackup: CourseList });
          console.log("当前课程表有这些课程", this.data.CourseList);
        },
      });
  },
  /* 生命周期函数--监听页面卸载*/
  onUnload() {
    if (
      JSON.stringify(this.data.CourseList) !=
      JSON.stringify(this.data.CourseListBackup)
    ) {
      console.log("有更改");
    }
  },
});
