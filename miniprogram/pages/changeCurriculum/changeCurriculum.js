const app = getApp();
Page({
  data: {
    CurriculumList: [],
    theme: "", //暗色/亮色
    navBarFullHeight: 0, // 整个导航栏高度
    navBarTop: 0, //navbar内容区域顶边距
    navBarHeight: 0, //navbar内容区域高度
    pageContainerShow: false
  },
  // 新建课表
  createCurriculum() {
    this.setData({
      pageContainerShow: true
    })
    // const db = wx.cloud.database();
    // db.collection("Curriculum").add({
    //   // data 字段表示需新增的 JSON 数据
    //   data: {
    //     name: this.data,
    //     // 课程信息
    //     Course: app.globalData.Course,
    //     // 课程安排
    //     arrangement: app.globalData.arrangement,
    //     // 上课时段
    //     hour: app.globalData.hour,
    //     // 课表信息
    //     classInfo: app.globalData.classInfo,
    //   },
    //   success: (res) => {
    //     app.globalData.id = res._id;
    //     console.log(`课程表${app.globalData.id}添加成功`, res);
    //     wx.navigateBack({
    //       delta: 1
    //     });
    //   },
    // })
  },
  goBack() {
    wx.navigateBack({
      delta: 1
    });
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
    console.log(
      "当前课程id:",
      app.globalData.id,
      "是否第一次进入页面:",
      app.globalData.id == -1
    );
    const db = wx.cloud.database(); //在开始使用数据库 API 进行增删改查操作之前，需要先获取数据库的引用。以下调用获取默认环境的数据库的引用
    // 获取所有课表--------------------------
    db.collection("Curriculum").get({
      success: (res) => {
        this.setData({
          CurriculumList: res.data
        });
        console.log("您的所有课程表:", this.data.CurriculumList);
      },
    });
  },
});