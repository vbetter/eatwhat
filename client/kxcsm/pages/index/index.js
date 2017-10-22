var MenuMgr = require('../Utils/MenuMgr.js')

//获取应用实例
const app = getApp()

var m_isLogin = false;//是否登录

Page({
  data: {
    motto: 'L 出品',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
      items: [
      { name: '0', value: '快餐', checked: 'true'},
      { name: '1', value: '下午茶'},
    ]
  },
  onLoad: function () {
    var foodType = app.globalData.m_foodType;
    app.globalData.m_foodType = foodType == 0 ? 1 : foodType;

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
      this.login();
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        this.login();
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo

          console.log(app.globalData.userInfo)

          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
          this.login();
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    console.log(app.globalData.userInfo)

    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  btn_enter: function (e) {
    if (!m_isLogin) {
      wx.showToast({
        title: '登录失败',
        icon: 'loading',
        duration: 2000
      });

      return;
    }

    wx.showLoading({
      title: '加载中',
    })

    wx.request({
      url: 'https://wx.kuuvv.com/api/food/recommed',
      data: {
        code: app.globalData.m_code,
        encryptedData: app.globalData.encryptedData,
        iv: app.globalData.iv,
        food_type: app.globalData.m_foodType,
      },
      header: {
        'uid': app.globalData.uid,
        'token': app.globalData.token,
      },
      success: function (res) {

        wx.hideLoading();

        console.log("res:",res);
        app.globalData.m_foodData = res.data.data.food_info;
        wx.navigateTo({
          url: '../mainPage/mainPage'
        })
      },
      fail: function (res) {
        wx.hideLoading();

        wx.showToast({
          title: '登录失败',
          icon: 'loading',
          duration: 2000
        });
      }
    })
  },
  radioChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value);
    MenuMgr.SetItemType(e.detail.value);

    app.globalData.m_foodType = e.detail.value;
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '科兴吃什么',
      path: '/pages/index/index',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  btn_note:function(e)
  {
    
  },
  btn_set: function (e) {
    wx.navigateTo({
      url: '../appSetting/appSetting',
    })
  },
  login:function()
  {
    wx.showLoading({
      title: '加载中',
    })

    wx.request({
      url: 'https://wx.kuuvv.com/api/user/wechatlogin',
      data: {
        code: app.globalData.m_code,
        encryptedData: app.globalData.encryptedData,
        iv: app.globalData.iv,
      },
      header: {
        'uid': "m_uid",
        'token': "m_token",
      },
      success: function (res) {

        wx.hideLoading();

        console.log(res);
        app.globalData.token = res.data.data.token;
        app.globalData.uid = res.data.data.uid;

        m_isLogin = true;
      },
      fail: function (res) {
        wx.hideLoading();

        wx.showToast({
          title: '登录失败',
          icon: 'loading',
          duration: 2000
        });
      }
    })
  }

})
