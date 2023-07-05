const app = getApp();
Page({
  data: {
    id: -1,
    theme: "", //暗色/亮色
    navBarFullHeight: 0, // 整个导航栏高度
    navBarTop: 0, //navbar内容区域顶边距
    navBarHeight: 0, //navbar内容区域高度
  },
  goBack() {
    wx.navigateBack({
      delta: 1
    });
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
  // 点击确认设置按钮，将当前设置保存到云数据库及storage
  submitSetting() {
    this.showModalAsync().then((res) => {
      // 获取组件实例，调用组件中定义的方法进行数据库及storage数据更新
      const settingHeader = this.selectComponent(".settingHeader");
      const additionalSettings = this.selectComponent(".additionalSettings");
      settingHeader.toDataBase();
      additionalSettings.saveToStorage();
      console.log(`success => ${res}`);
      // 更新数据库数据后回到首页
      this.saveSuccess();
    });
  },
  /* 生命周期函数--监听页面加载*/
  onLoad(options) {
    // 接收其他页面传值
    this.setData({
      theme: app.globalData.theme,
      navBarFullHeight: app.globalData.navBarFullHeight,
      navBarTop: app.globalData.navBarTop,
      navBarHeight: app.globalData.navBarHeight,
    });
    this.setData({
      id: options.id
    });
    console.log(this.data.id);
  },
});