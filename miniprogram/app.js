// app.js

App({
  onLaunch: function () {
    const that = this; //存储对象备份,避免随着运行环境的变化,this的指向改变
    const menuButtonInfo = wx.getMenuButtonBoundingClientRect(); // 胶囊按钮位置信息
    that.globalData.navBarFullHeight =
      menuButtonInfo.top + menuButtonInfo.height;
    that.globalData.navBarTop = menuButtonInfo.top;
    that.globalData.navBarHeight = menuButtonInfo.height;
    that.globalData.navBarWidth = menuButtonInfo.left;
    // 暗色/亮色检测----------------------
    wx.getSystemInfo({
      success: (res) => (that.globalData.theme = res.theme),
    });
    if (!wx.cloud) {
      console.error("请使用 2.2.3 或以上的基础库以使用云能力");
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        traceUser: true,
      });
    }
  },
  globalData: {
    id: -1, //课程id
    theme: "", //暗色/亮色
    navBarFullHeight: 0, // 整个导航栏高度
    navBarTop: 0, //navbar内容区域顶边距
    navBarHeight: 0, //navbar内容区域高度
    navBarWidth: 0, // 胶囊遮挡的不可用区域宽度,用作右外边距/右内边距
    // 默认课表/新课表---骨架数据
    // 课程信息
    Course: {},
    // 课程安排
    arrangement: [{
        morningCourses: [{
            Course: "",
          },
          {
            Course: "",
          },
          {
            Course: "",
          },
          {
            Course: "",
          },
        ],
        afternoonCourses: [{
            Course: "",
          },
          {
            Course: "",
          },
          {
            Course: "",
          },
          {
            Course: "",
          },
        ],
        nightCourses: [{
            Course: "",
          },
          {
            Course: "",
          },
        ],
      },
      {
        morningCourses: [{
            Course: "",
          },
          {
            Course: "",
          },
          {
            Course: "",
          },
          {
            Course: "",
          },
        ],
        afternoonCourses: [{
            Course: "",
          },
          {
            Course: "",
          },
          {
            Course: "",
          },
          {
            Course: "",
          },
        ],
        nightCourses: [{
            Course: "",
          },
          {
            Course: "",
          },
        ],
      },
      {
        morningCourses: [{
            Course: "",
          },
          {
            Course: "",
          },
          {
            Course: "",
          },
          {
            Course: "",
          },
        ],
        afternoonCourses: [{
            Course: "",
          },
          {
            Course: "",
          },
          {
            Course: "",
          },
          {
            Course: "",
          },
        ],
        nightCourses: [{
            Course: "",
          },
          {
            Course: "",
          },
        ],
      },
      {
        morningCourses: [{
            Course: "",
          },
          {
            Course: "",
          },
          {
            Course: "",
          },
          {
            Course: "",
          },
        ],
        afternoonCourses: [{
            Course: "",
          },
          {
            Course: "",
          },
          {
            Course: "",
          },
          {
            Course: "",
          },
        ],
        nightCourses: [{
            Course: "",
          },
          {
            Course: "",
          },
        ],
      },
      {
        morningCourses: [{
            Course: "",
          },
          {
            Course: "",
          },
          {
            Course: "",
          },
          {
            Course: "",
          },
        ],
        afternoonCourses: [{
            Course: "",
          },
          {
            Course: "",
          },
          {
            Course: "",
          },
          {
            Course: "",
          },
        ],
        nightCourses: [{
            Course: "",
          },
          {
            Course: "",
          },
        ],
      },
      {
        morningCourses: [{
            Course: "",
          },
          {
            Course: "",
          },
          {
            Course: "",
          },
          {
            Course: "",
          },
        ],
        afternoonCourses: [{
            Course: "",
          },
          {
            Course: "",
          },
          {
            Course: "",
          },
          {
            Course: "",
          },
        ],
        nightCourses: [{
            Course: "",
          },
          {
            Course: "",
          },
        ],
      },
      {
        morningCourses: [{
            Course: "",
          },
          {
            Course: "",
          },
          {
            Course: "",
          },
          {
            Course: "",
          },
        ],
        afternoonCourses: [{
            Course: "",
          },
          {
            Course: "",
          },
          {
            Course: "",
          },
          {
            Course: "",
          },
        ],
        nightCourses: [{
            Course: "",
          },
          {
            Course: "",
          },
        ],
      },
    ],
    // 上课时段
    hour: {
      morningArr: [{
          id: 1,
          startTime: "07:00",
          endTime: "07:40",
        },
        {
          id: 2,
          startTime: "08:00",
          endTime: "08:40",
        },
        {
          id: 3,
          startTime: "09:00",
          endTime: "09:40",
        },
        {
          id: 4,
          startTime: "10:00",
          endTime: "10:40",
        },
      ],
      afternonArr: [{
          id: 1,
          startTime: "13:00",
          endTime: "13:40",
        },
        {
          id: 2,
          startTime: "14:00",
          endTime: "14:40",
        },
        {
          id: 3,
          startTime: "15:00",
          endTime: "15:40",
        },
        {
          id: 4,
          startTime: "16:00",
          endTime: "16:40",
        },
      ],
      nightArr: [{
          id: 1,
          startTime: "19:00",
          endTime: "19:40",
        },
        {
          id: 2,
          startTime: "20:00",
          endTime: "20:40",
        },
      ],
    },
    // 课表信息
    classInfo: {
      morningCourses: 4, //上午课程数量
      afternoonCourses: 4, //下午课程数量
      nightCourses: 2, //晚上课程数量
    },
  },
});