const app = getApp();
const db = wx.cloud.database();
Component({
  data: {
    tableName: "",
    morningNum: 4,
    affterNum: 4,
    nightNum: 2,
    array: [0],
    morningArr: [],
    afternonArr: [],
    nightArr: []
  },

  /* 组件的方法列表*/
  methods: {
    // 监听picker中的选项改变来设置课程数量
    bindPickerChange(event) {
      this.setData({
        [event.currentTarget.dataset.time]: event.detail.value,
      });
    },
    // 设置课表名称
    inputChange(event) {
      this.setData({
        tableName: event.detail.value,
      });
    },
    // 提交数据到云数据库
    toDataBase() {
      const _ = db.command;
      // 获取数据库中用户时间设置（上午）
      db.collection("Curriculum")
        .where({
          _id: app.globalData.id,
        })
        .get({
          success: (res) => {
            console.log('获取成功', res.data[0]);
            if (res.data[0].hour.morningArr.length > 0) {
              console.log('数据存在', res.data[0].hour.morningArr);
              this.setData({
                morningArr: res.data[0].hour.morningArr,
              });
              // 根据课程数显示上午相应时间设置条目
              let morningArrAdd = [];
              for (
                let i = 1; i <= this.data.morningNum - this.data.morningArr.length; i++
              ) {
                morningArrAdd.push({
                  id: res.data[0].hour.morningArr[
                    res.data[0].hour.morningArr.length - 1
                  ].id + i,
                  startTime: "00:00",
                  endTime: "00:40",
                });
              }
              this.setData({
                morningArr: [...this.data.morningArr, ...morningArrAdd],
              });
              this.toSavemorningData()
              console.log("morningArr", this.data.morningArr);
            }
          },
        });
      // 获取数据库中用户时间设置（下午）
      db.collection("Curriculum")
        .where({
          _id: app.globalData.id,
        })
        .get({
          success: (res) => {
            console.log(res);
            if (res.data[0].hour.afternonArr.length > 0) {
              console.log(res.data[0].hour.afternonArr);
              this.setData({
                afternonArr: res.data[0].hour.afternonArr,
              });
              // 根据课程数显示相应时间设置条目
              let afternonArrAdd = [];
              for (
                let i = 1; i <= this.data.affterNum - this.data.afternonArr.length; i++
              ) {
                afternonArrAdd.push({
                  id: res.data[0].hour.afternonArr[
                    res.data[0].hour.afternonArr.length - 1
                  ].id + i,
                  startTime: "00:00",
                  endTime: "00:40",
                });
              }
              this.setData({
                afternonArr: [...this.data.afternonArr, ...afternonArrAdd],
              });
              this.toSaveafternoonData()
            }
          },
        });
      // 获取数据库中用户时间设置(晚上)
      db.collection("Curriculum")
        .where({
          _id: app.globalData.id,
        })
        .get({
          success: (res) => {
            console.log(res, res.data[0].hour.nightArr.length);
            if (res.data[0].hour.nightArr.length > 0) {
              console.log(res.data[0].hour.nightArr);
              this.setData({
                nightArr: res.data[0].hour.nightArr,
              });
              // 根据课程数显示相应时间设置条目
              let nightArrAdd = [];
              for (
                let i = 1; i <= this.data.nightNum - this.data.nightArr.length; i++
              ) {
                nightArrAdd.push({
                  id: res.data[0].hour.nightArr[
                    res.data[0].hour.nightArr.length - 1
                  ].id + i,
                  startTime: "00:00",
                  endTime: "00:40",
                });
              }
              this.setData({
                nightArr: [...this.data.nightArr, ...nightArrAdd],
              });
              this.toSavenightData()
            }
          },
        });
      this.toSaveHeaderData()
    },
    // 提交头部信息到数据库
    toSaveHeaderData() {
      db.collection("Curriculum")
        .where({
          _id: app.globalData.id,
        })
        .update({
          data: {
            classInfo: {
              morningCourses: this.data.morningNum,
              afternoonCourses: this.data.affterNum,
              nightCourses: this.data.nightNum,
            },
            name: this.data.tableName,
          },
        });
    },
    // 提交上午信息到数据库
    toSavemorningData() {
      db.collection("Curriculum")
        .where({
          _id: app.globalData.id,
        })
        .update({
          data: {
            hour: {
              morningArr: this.data.morningArr
            }
          },
        });
    },
    // 提交下午信息到数据库
    toSaveafternoonData() {
      db.collection("Curriculum")
        .where({
          _id: app.globalData.id,
        })
        .update({
          data: {
            hour: {
              afternonArr: this.data.afternonArr
            }
          },
        });
    },
    // 提交晚上信息到数据库
    toSavenightData() {
      db.collection("Curriculum")
        .where({
          _id: app.globalData.id,
        })
        .update({
          data: {
            hour: {
              nightArr: this.data.nightArr
            }
          },
        });
    },
    // 获取用户当前课表设置
    getUserSetting() {
      const _ = db.command;
      let dbData;
      db.collection("Curriculum")
        .where({
          _id: app.globalData.id,
        })
        .get({
          success: (res) => {
            console.log("getUserSetting调用了。获取到数据为", res);
            dbData = res.data;
            this.setData({
              tableName: dbData[0].name,
              morningNum: dbData[0].classInfo.morningCourses,
              affterNum: dbData[0].classInfo.afternoonCourses,
              nightNum: dbData[0].classInfo.nightCourses,
            });
          },
        });
    },
  },
  lifetimes: {
    created() {
      console.log(app.globalData.id);
    },
    attached() {
      this.getUserSetting();
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
      const array = ["没有课"];
      for (let i = 1; i <= 10; i++) {
        array.push(`${i}节`);
      }
      this.setData({
        array: array,
      });
    },
  },
});