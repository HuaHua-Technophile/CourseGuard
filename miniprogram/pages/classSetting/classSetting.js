// pages/classSetting/classSetting.js
Page({

  /**
   * 页面的初始数据
   */
  data: {},
  // 封装模态弹窗方法
  showModalAsync() {
    return new Promise((resolve) => {
      wx.showModal({
        title: '温馨提示',
        content: '修改课程数量直接影响现有课程配置，确定要这么操作?',
        success(res) {
          if (res.confirm) {
            resolve(res.confirm)
          }
        }
      })
    })
  },
  // 保存设置成功提示封装
  saveSuccess() {
    return new Promise((resolve) => {
      wx.showToast({
        title: '保存设置成功',
        icon: 'success',
        duration: 2000,
        success: (res) => {
          resolve(res)
        }
      })
    })
  },
  // 点击确认设置按钮，将当前设置保存到云数据库及storage
  submitSetting() {
    this.showModalAsync().then((res) => {
      // 获取组件实例，调用组件中定义的方法进行数据库及storage数据更新
      const settingHeader = this.selectComponent('.settingHeader');
      const additionalSettings = this.selectComponent('.additionalSettings');
      settingHeader.toDataBase()
      additionalSettings.saveToStorage()
      console.log(`success => ${res}`);
      // 更新数据库数据后回到首页
      this.saveSuccess()
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})