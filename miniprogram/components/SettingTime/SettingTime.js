// components/SettingTime/SettingTime.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    timeArea: {
      type: String,
    },
    timeIndex: {
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    startTime: '00:00',
    endTime: '00:00',
    morningArr: [{
      id: 1,
      startTime: '00:00',
      endTime: '00:00',
    }],
    afternonArr: [{
      id: 1,
      startTime: '00:00',
      endTime: '00:00',
    }],
    nightArr: [{
      id: 1,
      startTime: '00:00',
      endTime: '00:00',
    }]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 选择每节课的开始时间
    bindStartTimeChange(event) {
      if (this.properties.timeArea === 'morningArr') {
        this.setData({
          [`morningArr[${this.properties.timeIndex}].startTime`]: event.detail.value
        })
      } else if (this.properties.timeArea === 'afternonArr') {
        this.setData({
          [`afternonArr[${this.properties.timeIndex}].startTime`]: event.detail.value
        })
      } else {
        this.setData({
          [`nightArr[${this.properties.timeIndex}].startTime`]: event.detail.value
        })
      }
    },
    // 选择每节课的结束时间
    bindEndTimeChange(event) {
      if (this.properties.timeArea === 'morningArr') {
        this.setData({
          [`morningArr[${this.properties.timeIndex}].endTime`]: event.detail.value
        })
      } else if (this.properties.timeArea === 'afternonArr') {
        this.setData({
          [`afternonArr[${this.properties.timeIndex}].endTime`]: event.detail.value
        })
      } else {
        this.setData({
          [`nightArr[${this.properties.timeIndex}].endTime`]: event.detail.value
        })
      }
    }
  },
  lifetimes: {
    created() {

    }
  }
})