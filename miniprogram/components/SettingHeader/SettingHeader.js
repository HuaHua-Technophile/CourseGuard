// components/SettingHeader/SettingHeader.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    cid: {
      type: String,
      value: '默认id'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    tableName: '',
    morningNum: 4,
    affterNum: 4,
    nightNum: 2,
    morningArr: [],
    afternonArr: [],
    nightArr: [],
    array: [0]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 监听picker中的选项改变来设置课程数量
    bindPickerChange(event) {
      this.setData({
        [event.currentTarget.dataset.time]: event.detail.value
      })
    },
    // 设置课表名称
    inputChange(event) {
      this.setData({
        tableName: event.detail.value
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
          classInfo: {
            morningCourses: this.data.morningNum,
            afternoonCourses: this.data.affterNum,
            nightCourses: this.data.nightNum
          },
          name: this.data.tableName
        }
      })
      console.log('提交数据库成功');
    },
    // 获取用户当前课表设置
    getUserSetting() {
      console.log(this.properties.id);
      const db = wx.cloud.database()
      const _ = db.command
      let dbData
      db.collection('Curriculum').get({
        _id: this.properties.cid,
        success: (res) => {
          console.log('getUserSetting调用了。获取到数据为', res)
          dbData = res.data
          this.setData({
            tableName: dbData[0].name,
            morningNum: dbData[0].classInfo.morningCourses,
            affterNum: dbData[0].classInfo.afternoonCourses,
            nightNum: dbData[0].classInfo.nightCourses
          })
        }
      })
    }
  },
  lifetimes: {
    created() {

    },
    attached() {
      //   wx.login({
      //     success: (res) => {
      //         console.log(res);
      //         this.setData({
      //             wxCode: res.code,
      //         })
      //         // ====== 【获取OpenId】
      //         let m_code = this.data.wxCode; // 获取code
      //         let m_AppId = "wx5db872f7431522ce"; // appid
      //         let m_mi = "450414da9a2152c282adc1e6"; // 小程序密钥
      //         console.log("m_code:" + m_code);
      //         let url = "https://api.weixin.qq.com/sns/jscode2session?appid=" + m_AppId + "&secret=" + m_mi + "&js_code=" + m_code + "&grant_type=authorization_code";
      //         console.log(url);
      //         wx.request({
      //             url: url,
      //             success: (res) => {
      //                 console.log(res);
      //                 this.setData({
      //                     wxOpenId: res.data.openid
      //                 })
      //                 //获取到你的openid
      //                 console.log("====openID=======");
      //                 console.log(this.data.wxOpenId);
      //             }
      //         })
      //     }
      // })
      // 循环遍历设置每个时间段的课程数量
      const array = ['没有课']
      for (let i = 1; i <= 10; i++) {
        array.push(`${i}节`)
      }
      this.setData({
        array: array
      })
    },
  }
})