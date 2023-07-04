Page({
  data: {
    theme: "light", //主题
    id: -1, //传入的当前课表的id
    Course: [], //所有课程的数组
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
          this.setData({ Course: res.data[0].Course });
          console.log("当前课程表有这些课程", this.data.Course);
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
