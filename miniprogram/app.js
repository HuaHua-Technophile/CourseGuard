// app.js

App({
  onLaunch: function () {
    const that = this; //存储对象备份,避免随着运行环境的变化,this的指向改变
    const menuButtonInfo = wx.getMenuButtonBoundingClientRect(); // 胶囊按钮位置信息
    that.globalData.navBarFullHeight =
      menuButtonInfo.top + menuButtonInfo.height;
    that.globalData.navBarTop = menuButtonInfo.top;
    that.globalData.navBarHeight = menuButtonInfo.height;
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
    theme: "",//暗色/亮色
    navBarFullHeight: 0, // 整个导航栏高度
    navBarTop: 0, //navbar内容区域顶边距
    navBarHeight: 0, //navbar内容区域高度
  },
});
