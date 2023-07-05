const app = getApp();
Page({
  data: {
    state: 0,
    id: -1,
    morningNum: 6,
    affternonNum: 6,
    nightNum: 6,
    theme: "", //暗色/亮色
    navBarFullHeight: 0, // 整个导航栏高度
    navBarTop: 0, //navbar内容区域顶边距
    navBarHeight: 0, //navbar内容区域高度
  },
  goBack() {
    wx.navigateBack({ delta: 1 });
  },
  // 封装模态弹窗方法
  showModalAsync() {
    return new Promise((resolve) => {
      wx.showModal({
        title: "温馨提示",
        content: "修改课程数量直接影响现有课程配置，确定要这么操作?",
        success(res) {
          if (res.confirm) {
            resolve(res.confirm);
          }
        },
      });
    });
  },
  // 保存设置成功提示封装
  saveSuccess() {
    return new Promise((resolve) => {
      wx.showToast({
        title: "保存设置成功",
        icon: "success",
        duration: 2000,
        success: (res) => {
          resolve(res);
        },
      });
    });
  },
  // 保存后改变子组件状态触发子组件回调
  changeState() {
    this.showModalAsync().then(() => {
      this.setData({
        state: this.data.state + 1,
      });
      this.saveSuccess();
    });
  },
  /* 生命周期函数--监听页面加载 */
  onLoad(options) {
    this.setData({
      theme: app.globalData.theme,
      navBarFullHeight: app.globalData.navBarFullHeight,
      navBarTop: app.globalData.navBarTop,
      navBarHeight: app.globalData.navBarHeight,
    });
    this.setData({ id: options.id });
    console.log(this.data.id);
  },
  /* 生命周期函数--监听页面初次渲染完成*/
  onReady() {
    const db = wx.cloud.database();
    const _ = db.command;
    // 根据课表设置中的课程数渲染相应时间设置条数
    db.collection("Curriculum")
      .where({
        _id: this.data.id,
      })
      .get({
        success: (res) => {
          let classInfo = res.data[0].classInfo;
          this.setData({
            morningNum: Number(classInfo.morningCourses),
            affternonNum: Number(classInfo.afternoonCourses),
            nightNum: Number(classInfo.nightCourses),
          });
          console.log(res);
        },
      });
    console.log("提交数据库成功");
  },
});
