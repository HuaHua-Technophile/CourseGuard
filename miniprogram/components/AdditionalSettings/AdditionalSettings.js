// components/AdditionalSettings/AdditionalSettings.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    switchArr: ['allNameState', 'teacherState', 'classroomState', 'starState', 'sunState'],
    allNameState: false,
    teacherState: false,
    classroomState: false,
    starState: false,
    sunState: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 额外设置所有switch开启/关闭功能
    switchChange(event) {
      this.setData({
        [this.data.switchArr[event.currentTarget.dataset.index]]: event.detail.value
      })
      console.log(this.data[this.data.switchArr[event.currentTarget.dataset.index]]);
    },
    // 保存设置到Storage
    saveToStorage() {
      wx.setStorage({
        key: "setting",
        data: {
          allNameState: this.data.allNameState,
          teacherState: this.data.teacherState,
          classroomState: this.data.classroomState,
          starState: this.data.starState,
          sunState: this.data.sunState
        },
      })
    },
    getStorageData() {
      return new Promise((reslove) => {
        wx.getStorage({
          key: "setting",
          success(res) {
            reslove(res.data)
          }
        })
      })
    },
    // 调用保存到Storage的方法
    toStorage() {
      this.saveToStorage()
    }
  },
  lifetimes: {
    created() {
      // 获取用户当前课表设置
      this.getStorageData().then(res => {
        this.setData({
          allNameState: res.allNameState,
          teacherState: res.teacherState,
          classroomState: res.classroomState,
          starState: res.starState,
          sunState: res.sunState
        })
      })
    }
  }
})