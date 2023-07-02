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
    },
    morning: {
      type: Number,
      value: 0
    },
    afternon: {
      type: Number,
      value: 0
    },
    night: {
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    morningArr: [],
    afternonArr: [],
    nightArr: []
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
    },
    // 初始化各时间段课程时间
    initTime() {
      const morningTemp = []
      const afternonTemp = []
      const nightTemp = []
      for (let i = 0; i < this.properties.morning; i++) {
        morningTemp.push({
          id: i + 1,
          startTime: '00:00',
          endTime: '00:00',
        })
      }
      for (let j = 0; j < this.properties.afternon; j++) {
        afternonTemp.push({
          id: j + 1,
          startTime: '00:00',
          endTime: '00:00',
        })
      }
      for (let k = 0; k < this.properties.night; k++) {
        nightTemp.push({
          id: k + 1,
          startTime: '00:00',
          endTime: '00:00',
        })
      }
      this.setData({
        morningArr: morningTemp,
        afternonArr: afternonTemp,
        nightArr: nightTemp
      })
    }
  },
  lifetimes: {
    ready() {
      this.initTime()
    }
  }
})