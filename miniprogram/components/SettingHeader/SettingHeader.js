// components/SettingHeader/SettingHeader.js
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
    tableName: '',
    morningNum: '4节',
    affterNum: '4节',
    nightNum: '4节',
    array: ['没有课']
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 监听picker中的选项改变来设置课程数量
    bindPickerChange(event) {
      console.log(event.detail);
      let numString = event.detail.value > 0 ? `${event.detail.value}节` : '没有课'
      this.setData({
        [event.currentTarget.dataset.time]: numString
      })
    },
    // 设置课表名称
    inputChange(event) {
      this.setData({
        tableName: event.detail.value
      })
      console.log(this.data.tableName);
    }
  },
  lifetimes: {
    attached() {
      // 循环遍历设置每个时间段的课程数量
      const array = ['没有课']
      for (let i = 1; i <= 10; i++) {
        array.push(`${i}节`)
      }
      this.setData({
        array: array
      })
    }
  }
})