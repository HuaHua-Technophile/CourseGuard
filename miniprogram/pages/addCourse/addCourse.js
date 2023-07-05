Page({
  data: {
    theme: "light", //主题
    id: -1, //传入的当前课表的id
    CourseList: [], //所有课程的数据存放,因为页面的顺序不能乱,因此将对象改为数组
    CourseIndex: "", // 指定当前缓冲栈中的颜色存入哪个课程
    color: "", //指定当前缓冲栈中的颜色存入课程的背景色还是前景色
    rgb: "rgb(0,154,97)", //当前存放进入缓冲栈的的颜色值
    pick: false, //控制颜色选择器显示/隐藏
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
  addCourse() {},
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
  },
  /*生命周期函数--监听页面加载*/
  onLoad(options) {
    // 接收其他页面传值-------------------------
    this.setData({ theme: options.theme });
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
          console.log("当前课程表有这些课程", this.data.CourseList);
        },
      });
  },
  /* 生命周期函数--监听页面初次渲染完成 */
  onReady() {},

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
