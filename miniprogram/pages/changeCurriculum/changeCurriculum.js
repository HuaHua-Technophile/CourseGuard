Page({
  data: {
    theme: "light",
    CurriculumList: [],
  },
  /* 生命周期函数--监听页面加载*/
  onLoad(options) {
    // 接收其他页面传值-------------------------
    this.setData({ theme: options.theme });
    const db = wx.cloud.database(); //在开始使用数据库 API 进行增删改查操作之前，需要先获取数据库的引用。以下调用获取默认环境的数据库的引用
    // 获取所有课表--------------------------
    db.collection("Curriculum").get({
      success: (res) => {
        this.setData({ CurriculumList: res.data });
        console.log("您的所有课程表:", this.data.CurriculumList);
      },
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
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
