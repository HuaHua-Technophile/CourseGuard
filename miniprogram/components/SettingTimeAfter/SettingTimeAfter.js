// components/SettingTime/SettingTime.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    st: {
      type: Number,
      value: 0,
    },
    mark: {
      type: Number,
      value: 0
    },
    cid: {
      type: String
    },
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
    afternonArr: [],
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
      const afternonTemp = []
      for (let i = 0; i < this.properties.afternon; i++) {
        afternonTemp.push({
          id: i + 1,
          startTime: '00:00',
          endTime: '00:00',
        })
      }
      this.setData({
        afternonArr: afternonTemp,
      })
    },
    // 提交数据到云数据库
    toInitDataBase() {
      const db = wx.cloud.database()
      const _ = db.command
      db.collection('Curriculum').where({
        _id: this.properties.cid
      }).update({
        data: {
          hour: {
            afternonArr: this.data.afternonArr,
          },
        },
        success: () => {
          console.log('提交数据库成功');
        }
      })
    },
    // 提交数据到云数据库
    toDataBase() {
      const db = wx.cloud.database()
      const _ = db.command
      db.collection('Curriculum').where({
        _id: this.properties.cid
      }).update({
        data: {
          hour: {
            [`afternonArr.${this.properties.timeIndex}`]: this.data.afternonArr[this.properties.timeIndex],
          },
        },
        success: () => {
          console.log('提交数据库成功');
        }
      })
    },
  },
  observers: {
    'st': function (newVal) {
      this.toDataBase()
    }
  },
  lifetimes: {
    ready() {
      this.initTime()
      this.toInitDataBase()
    }
  }
})