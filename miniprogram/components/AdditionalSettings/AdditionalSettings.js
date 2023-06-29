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
    }
  }
})