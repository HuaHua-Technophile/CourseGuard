const app = getApp();
Page({
  data: {
    CurriculumList: [],
    theme: "", //暗色/亮色
    navBarFullHeight: 0, // 整个导航栏高度
    navBarTop: 0, //navbar内容区域顶边距
    navBarHeight: 0, //navbar内容区域高度
  },
  goBack() {
    wx.navigateBack({ delta: 1 });
  },
  /* 生命周期函数--监听页面加载*/
  onLoad(options) {
    // 接收其他页面传值-------------------------
    this.setData({
      theme: app.globalData.theme,
      navBarFullHeight: app.globalData.navBarFullHeight,
      navBarTop: app.globalData.navBarTop,
      navBarHeight: app.globalData.navBarHeight,
    });
    const db = wx.cloud.database(); //在开始使用数据库 API 进行增删改查操作之前，需要先获取数据库的引用。以下调用获取默认环境的数据库的引用
    // 获取所有课表--------------------------
    db.collection("Curriculum").get({
      success: (res) => {
        this.setData({ CurriculumList: res.data });
        console.log("您的所有课程表:", this.data.CurriculumList);
      },
    });
  },
});
