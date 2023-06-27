Page({
  data: {
    Curriculum: null,
    newUser: true
  },
  // 生命周期函数--监听页面加载
  onLoad(options) {
    const db = wx.cloud.database(); //在开始使用数据库 API 进行增删改查操作之前，需要先获取数据库的引用。以下调用获取默认环境的数据库的引用
    db.collection('Curriculum').count({
      success: (res) => {
        res.total > 0 && this.setData({ newUser: false })
      }
    })/*统计有多少条,判断是否是新用户*/
    // 如果为新用户,则给一个默认课表,但先不存入数据库避免污染
    if (this.data.newUser) {
      this.setData({
        Curriculum: {
          "curriculumName": "默认课表",
          "arrangement": [
            {
              "morningCourses": ["", "", "", ""],
              "afternoonCourses": ["", "", "", ""],
              "nightCourses": ["", ""]
            },
            {
              "morningCourses": ["", "", "", ""],
              "afternoonCourses": ["", "", "", ""],
              "nightCourses": ["", ""]
            },
            {
              "morningCourses": ["", "", "", ""],
              "afternoonCourses": ["", "", "", ""],
              "nightCourses": ["", ""]
            },
            {
              "morningCourses": ["", "", "", ""],
              "afternoonCourses": ["", "", "", ""],
              "nightCourses": ["", ""]
            },
            {
              "morningCourses": ["", "", "", ""],
              "afternoonCourses": ["", "", "", ""],
              "nightCourses": ["", ""]
            },
            {
              "morningCourses": ["", "", "", ""],
              "afternoonCourses": ["", "", "", ""],
              "nightCourses": ["", ""]
            },
            {
              "morningCourses": ["", "", "", ""],
              "afternoonCourses": ["", "", "", ""],
              "nightCourses": ["", ""]
            }
          ],
          "hour": [
            "08:00-08:40",
            "09:00-09:40",
            "10:00-10:40",
            "11:00-11:40",
            "14:00-14:40",
            "15:00-15:40",
            "16:00-16:40",
            "17:00-17:40",
            "19:00-19:40",
            "20:00-20:40"
          ],
          "classInfo": {
            "morningStart": "08:00",
            "morningCourses": 4,
            "afternoonStart": "14:00",
            "afternoonCourses": 4,
            "nightStart": "19:00",
            "nightCourses": 2,
            "courseTime": 40,
            "breakTime": 20,
            "courseTotal": {}
          }
        }
      })
    }//如果不是新用户
    else {
      db.collection('Curriculum').get({
        success: (res) => {
          // console.log(res.data)// res.data 包含该记录的数据
          this.setData({ Curriculum: res.data[0] })
        }
      })
    }
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
