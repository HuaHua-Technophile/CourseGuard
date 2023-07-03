// pages/timeSetting/timeSetting.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    morningNum: 10,
    affternonNum: 5,
    nightNum: 7,
    theme: "light",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 接收其他页面传值
    this.setData({ theme: options.theme });
    const db = wx.cloud.database();
    const _ = db.command;
    // 根据课表设置中的课程数渲染相应时间设置条数
    db.collection("Curriculum")
      .where({
        _openid: "o7U2J5VjuP8mKkbX7KvETK-NYH98",
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
