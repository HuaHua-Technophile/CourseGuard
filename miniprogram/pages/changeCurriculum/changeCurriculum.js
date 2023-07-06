const app = getApp();
const db = wx.cloud.database().collection("Curriculum"); //在开始使用数据库 API 进行增删改查操作之前，需要先获取数据库的引用。以下调用获取默认环境的数据库的引用
Page({
  data: {
    CurriculumList: [],
    theme: "", //暗色/亮色
    navBarFullHeight: 0, // 整个导航栏高度
    navBarTop: 0, //navbar内容区域顶边距
    navBarHeight: 0, //navbar内容区域高度
    pageContainerShow: false,
    value: "",
    tip: "",
    showModalcontent: "确认选用当前课表？",
    confirmText: "就要它!",
    focus: false,
  },
  // 封装模态弹窗方法
  showModalAsync() {
    return new Promise((resolve) => {
      wx.showModal({
        title: "妳不是手滑了嘛?",
        content: this.data.showModalcontent,
        cancelText: "手滑啦~",
        confirmText: this.data.confirmText,
        success(res) {
          if (res.confirm) {
            resolve(res.confirm);
          }
        },
      });
    });
  },
  // Toast封装
  showToast() {
    wx.showToast({
      title: "无法删除",
      icon: "error",
      duration: 2000,
    });
  },
  // 选用对应课表
  toSelect(e) {
    console.log(e.currentTarget.dataset);
    this.data.showModalcontent = `移情别恋至 '${e.currentTarget.dataset.name}' ?`;
    this.data.confirmText = "就要它!";
    this.showModalAsync().then(() => {
      app.globalData.id = e.currentTarget.dataset.id;
      wx.navigateBack({
        delta: 1,
      });
    });
  },
  // 删除对应课表
  toDel(e) {
    if (this.data.CurriculumList.length === 1) {
      this.showToast();
    } else {
      this.data.showModalcontent = `要丢掉 '${e.currentTarget.dataset.name}' ？`;
      this.data.confirmText = "丢掉它!";
      this.showModalAsync().then(() => {
        db.where({
          _id: e.currentTarget.dataset.id,
        }).remove({
          success: (res) => {
            console.log(res.data);
            if (e.currentTarget.dataset.id == app.globalData.id) {
              app.globalData.id = this.data.CurriculumList[0]._id;
            }
            for (let i = 0; i < this.data.CurriculumList.length; i++) {
              if (
                this.data.CurriculumList[i]._id == e.currentTarget.dataset.id
              ) {
                let CurriculumListTemp = this.data.CurriculumList;
                CurriculumListTemp.splice(i, 1);
                this.setData({
                  CurriculumList: CurriculumListTemp,
                });
              }
            }
          },
        });
      });
    }
  },
  // 绑定input框数据
  inputModel(e) {
    this.setData({
      value: e.detail.value,
      tip: "",
    });
  },
  // 新建课表弹窗
  toCreateCurriculum() {
    this.setData({
      pageContainerShow: !this.data.pageContainerShow,
      tip: "",
      focus: true,
    });
  },
  // 新建课表数据库提交函数封装
  addSaveToDataBase() {
    db.add({
      // data 字段表示需新增的 JSON 数据
      data: {
        name: this.data.value,
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
        wx.redirectTo({
          url: "../index/index",
        });
      },
    });
  },
  // 新建课表
  createCurriculum() {
    for (let item of this.data.CurriculumList) {
      if (item.name === this.data.value) {
        this.setData({
          tip: "课表命名重复",
        });
        console.log("重名");
        return;
      }
    }
    this.addSaveToDataBase();
  },
  // 取消新建课表
  notCreateCurriculum() {
    this.toCreateCurriculum();
  },
  goBack() {
    console.log("进入了goBack事件");
    wx.navigateBack({
      delta: 1,
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
    // 获取所有课表--------------------------
    db.get({
      success: (res) => {
        this.setData({
          CurriculumList: res.data,
        });
        console.log("您的所有课程表:", this.data.CurriculumList);
      },
    });
  },
});
