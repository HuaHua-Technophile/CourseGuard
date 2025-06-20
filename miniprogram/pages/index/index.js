const app = getApp();
const db = wx.cloud.database().collection("Curriculum"); //在开始使用数据库 API 进行增删改查操作之前，需要先获取数据库的引用。以下调用获取默认环境的数据库的引用
Page({
  data: {
    Curriculum: {},
    week: -1, //今天是周几,用于顶部周几高亮
    Editing: false, //是否处于编辑状态
    pageContainerShow: false, // 假页面容器展示状态
    pageContainerAbout: false, // 控制当前弹出的假页面容器,是用于展示"关于我们",还是"课程信息"
    Course: "", //弹出的假页面如果展示的是课程信息,那就从这里拿取数据
    CourseTime: "", //弹出的假页面如果展示的是课程信息,那就从这里拿取上课时长的数据
    theme: "", //暗色/亮色
    navBarFullHeight: 0, // 整个导航栏高度
    navBarTop: 0, //navbar内容区域顶边距
    navBarHeight: 0, //navbar内容区域高度
    navBarWidth: 0, // 胶囊遮挡的不可用区域宽度,用作右外边距/右内边距
    CourseList: [], //课程列表,用户picker选择器的遍历
    checkCount: 0, //当前已经勾选的课时的统计,如果没有勾选任何课程则弹出提示
    storageData: {},
    dayArr: ["一", "二", "三", "四", "五", "六", "日"],
    teacherShow: true,
    teachAdress: true,
    showStarday: true,
    showSunday: true,
    loading: true, //骨架屏显示/隐藏
  },
  // 关于我们
  aboutUs() {
    this.setData({
      pageContainerAbout: true,
      pageContainerShow: true,
    });
  },
  // 没选课时的提示
  NothingCheckToast() {
    wx.showToast({
      title: "您还未勾选课时",
      icon: "error",
    });
  },
  // CourseList课程列表修改与当前课程信息log打印
  pushCourseList() {
    // 将课程写入数组中,以进行编辑课程的选择
    let CourseList = [];
    for (let i in this.data.Curriculum.Course) {
      CourseList.push(i);
    }
    this.setData({
      CourseList,
    });
    console.log("当前课表:", this.data.Curriculum); //当前课表数据
    console.log("当前课表有这些课程:", this.data.CourseList); //当前课表数据
  },
  // 课表数据判断课时数量合理性,若课程数量小于设定的课程数量,需要添加空课程,以让页面中for循环遍历渲染
  CompleteCourse(data) {
    let Curriculum = data;
    for (let time in Curriculum.arrangement[0]) {
      let Difference =
        Curriculum.classInfo[time] - Curriculum.arrangement[0][time].length;
      // 取第一天的上午/下午/晚上做判断,如果实际课时数量小于设定课时数量,就添加空课时
      if (Difference > 0) {
        Curriculum.arrangement.forEach((i) => {
          i[time].push(
            ...Array.apply(null, { length: Difference }).map(() => ({
              Course: "",
            }))
          );
        });
        console.log(`${time}补全了`, Curriculum.arrangement);
      }
    }
    this.setData({ Curriculum, loading: false });
  },
  // 课表数据获取,封装为函数
  getCurriculum() {
    console.log("--- 开始获取课表数据 ---"); // 调试语句1：函数开始
    console.log(`将要获取的课表 _id 是: "${app.globalData.id}"`); // 调试语句2：打印ID

    // 检查 ID 是否存在
    if (!app.globalData.id) {
      console.error("错误：全局 globalData.id 为空，无法查询课表！");
      wx.showToast({
        title: "未找到课表ID",
        icon: "error",
      });
      this.setData({ loading: false }); // 隐藏骨架屏
      return; // 终止函数
    }

    db.where({
      _id: app.globalData.id,
    }).get({
      success: (res) => {
        console.log("数据库查询成功，返回结果: ", res); // 调试语句3：打印成功结果
        if (res.data && res.data.length > 0) {
          console.log("成功获取到课表数据:", res.data[0]);
          this.CompleteCourse(res.data[0]); //返回数据是一个数组,取其第Index个作为当前渲染的课程表
          this.pushCourseList();
        } else {
          console.warn("警告：数据库查询成功但数据为空，将加载本地假数据。");
          wx.showToast({
            title: "加载本地示例课表",
            icon: "none",
          });
          this.CompleteCourse(app.globalData.fakeCurriculum);
          this.pushCourseList();
          this.setData({ loading: false }); // 隐藏骨架屏
        }
      },
      fail: (err) => {
        console.error("数据库查询失败！将加载本地假数据。错误信息: ", err); // 调试语句4：打印失败信息
        wx.showToast({
          title: "加载本地示例课表",
          icon: "none",
          duration: 2000,
        });
        this.CompleteCourse(app.globalData.fakeCurriculum);
        this.pushCourseList();
        this.setData({ loading: false }); // 隐藏骨架屏
      },
    });
  },
  // 路由跳转-------------------------
  toThisPage(e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.url,
    });
  },
  // 切换课表中的check状态,封装为函数,供changeEditing与全选操作调用
  changeArrangementCheck(flag) {
    let arrangement = this.data.Curriculum.arrangement;
    arrangement.forEach((i) => {
      for (let j in i) {
        i[j].forEach((k) => (k.check = flag));
      }
    });
    if (flag)
      this.setData({
        checkCount:
          7 *
          (this.data.Curriculum.morningCourses +
            this.data.Curriculum.afternoonCourses +
            this.data.Curriculum.nightCourses),
      });
    else
      this.setData({
        checkCount: 0,
      });
    this.setData({
      [`Curriculum.arrangement`]: arrangement,
    });
  },
  // 切换状态,进入预备编辑------------------------------
  changeEditing() {
    this.changeArrangementCheck(false);
    this.setData({
      Editing: !this.data.Editing,
    });
  },
  // 提示课程信息,或点击添加课时进入预备编辑
  addCourseToEditing(e) {
    if (this.data.Editing) {
      let arrangement = this.data.Curriculum.arrangement;
      arrangement[e.currentTarget.dataset.day][e.currentTarget.dataset.course][
        e.currentTarget.dataset.index
      ].check =
        !arrangement[e.currentTarget.dataset.day][
          e.currentTarget.dataset.course
        ][e.currentTarget.dataset.index].check; //check取反
      if (
        arrangement[e.currentTarget.dataset.day][
          e.currentTarget.dataset.course
        ][e.currentTarget.dataset.index].check
      )
        this.setData({
          checkCount: this.data.checkCount + 1,
        });
      //如果新增勾选,就增加
      else
        this.setData({
          checkCount: this.data.checkCount - 1,
        }); //取消勾选就减少
      this.setData({
        [`Curriculum.arrangement[${e.currentTarget.dataset.day}].${e.currentTarget.dataset.course}[${e.currentTarget.dataset.index}].check`]:
          arrangement[e.currentTarget.dataset.day][
            e.currentTarget.dataset.course
          ][e.currentTarget.dataset.index].check,
      }); //取反后设置回this.data中
      console.log(
        "添加/删除了一节课进入待编辑列表",
        arrangement[e.currentTarget.dataset.day][
          e.currentTarget.dataset.course
        ][e.currentTarget.dataset.index]
      );
    } else {
      console.log(
        "当前点击item的name是",
        e.currentTarget.dataset.name,
        "课程时段为:",
        this.data.Curriculum.hour,
        "携带信息为",
        e.currentTarget.dataset.coursetime
      );
      if (e.currentTarget.dataset.name) {
        let CourseTime =
          this.data.Curriculum.hour[e.currentTarget.dataset.coursetime][
            e.currentTarget.dataset.index
          ];
        this.setData({
          CourseTime,
          pageContainerAbout: false,
          Course: e.currentTarget.dataset.name,
          pageContainerShow: true,
        });
        console.log("这节课的授课时长是:", this.data.CourseTime);
      }
    }
  },
  // 遍历编辑课表,封装为方法,供批量修改课时和批量删除课时使用
  editingArrangement(course) {
    let arrangement = this.data.Curriculum.arrangement;
    arrangement.forEach((i) => {
      for (let j in i) {
        i[j].forEach((k) => {
          if (k.check == true) {
            k.check = false;
            k.Course = course;
          }
        });
      }
    });
    this.setData({
      checkCount: 0,
    });
    db.where({
      _id: this.data.id,
    }).update({
      data: {
        arrangement,
      },
      success: (res) => {
        console.log("更新了数据库", res);
        this.getCurriculum();
      },
    });
  },
  // 编辑已经勾选的课时
  changeArrangement(e) {
    console.log("picker选择了", this.data.CourseList[e.detail.value]);
    this.editingArrangement(this.data.CourseList[e.detail.value]);
  },
  // 删除已勾选的课时
  deleteArrangement() {
    this.editingArrangement("");
  },
  // 完成编辑
  finishEditing() {
    this.setData({
      Editing: !this.data.Editing,
    });
  },
  // 生命周期函数--监听页面加载
  async onLoad() {
    this.setData({
      theme: app.globalData.theme,
      navBarFullHeight: app.globalData.navBarFullHeight,
      navBarTop: app.globalData.navBarTop,
      navBarHeight: app.globalData.navBarHeight,
      navBarWidth: app.globalData.navBarWidth,
    });
  },
  onShow() {
    // 获取课表设置
    wx.getStorage({
      key: "setting",
      success: (res) => {
        this.setData({
          storageData: res.data,
        });
        if (this.data.storageData.starState && this.data.storageData.sunState) {
          this.setData({
            dayArr: ["一", "二", "三", "四", "五", "六", "日"],
            showStarday: true,
            showSunday: true,
          });
        } else if (
          this.data.storageData.starState === false &&
          this.data.storageData.sunState
        ) {
          this.setData({
            dayArr: ["一", "二", "三", "四", "五", "日"],
            showStarday: false,
            showSunday: true,
          });
        } else if (
          this.data.storageData.starState &&
          this.data.storageData.sunState === false
        ) {
          this.setData({
            dayArr: ["一", "二", "三", "四", "五", "六"],
            showStarday: true,
            showSunday: false,
          });
        } else {
          this.setData({
            dayArr: ["一", "二", "三", "四", "五"],
            showStarday: false,
            showSunday: false,
          });
        }
        if (this.data.storageData.showTeacher === false) {
          this.setData({
            teacherShow: false,
          });
        } else {
          this.setData({
            teacherShow: true,
          });
        }
        if (this.data.storageData.showAdress === false) {
          this.setData({
            teachAdress: false,
          });
        } else {
          this.setData({
            teachAdress: true,
          });
        }
      },
    });

    // 强行调用，绕过所有云开发逻辑
    this.getCurriculum();

    if (app.globalData.theme) {
      this.setData({
        theme: app.globalData.theme,
      });
    }
  },
  onHide() {
    console.log("页面隐藏了");
  },
});
