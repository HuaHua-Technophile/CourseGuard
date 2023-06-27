Page({
  data: {
    Curriculum: null,
    newUser: false
  },
  toClassSetting() {
    wx.navigateTo({
      url: '../classSetting/classSetting'
    })
  },
  // 生命周期函数--监听页面加载
  onLoad(options) {
    const db = wx.cloud.database(); //在开始使用数据库 API 进行增删改查操作之前，需要先获取数据库的引用。以下调用获取默认环境的数据库的引用
    db.collection('Curriculum').count({
      success: (res) => {
        res.total > 0 && this.setData({ newUser: true })
      }
    })/*统计有多少条*/
  },

  onReady() { },//生命周期函数--监听页面初次渲染完成

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() { },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() { },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() { },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() { },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() { },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() { },
});
