Page({
  data: {
    state: 0,
    id: -1,
    morningNum: 4,
    affternonNum: 4,
    nightNum: 4,
    theme: "light",
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
  changeState() {
    this.showModalAsync().then(() => {
      this.setData({
        state: this.data.state + 1,
      });
    });
  },
  /* 生命周期函数--监听页面加载 */
  onLoad(options) {
    this.setData({
      id: options.id,
    });
    console.log(this.data.id);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
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
          let classInfo = res.data[0].Curriculum.classInfo;
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
