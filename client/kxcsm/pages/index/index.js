var MenuMgr = require('../Utils/MenuMgr.js')

//获取应用实例
const app = getApp()

var m_isLogin = false;//是否登录

Page({
  data: {
    motto: '',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
      items: [
      { name: '1', value: '快餐', checked: 'true'},
      { name: '2', value: '下午茶'},
    ]
  },
  onLoad: function () {
    var foodType = app.globalData.m_foodType;
    app.globalData.m_foodType = foodType == 0 ? 1 : foodType;

    this.login_wx();
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    console.log(app.globalData.userInfo)

    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  btn_enter: function (e) {
    if (app.globalData.encryptedData == null) {
      wx.showToast({
        title: '登录失败,点击头像',
        icon: 'loading',
        duration: 2000
      });

      return;
    }
    

    if (!m_isLogin) {
      wx.showToast({
        title: '登录失败,再点一下试试',
        icon: 'loading',
        duration: 2000
      });

      this.login_server();
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

        console.log("菜单数据:",res);

        if (res.statusCode !=200)
        {
          wx.showToast({
            title: '获取菜单失败',
            icon: 'loading',
            duration: 2000
          });

          return;
        }

        if (res.data.data==null)
        {
          wx.showToast({
            title: '获取菜单失败',
            icon: 'loading',
            duration: 2000
          });

          console.log("[request] m_foodType:",app.globalData.m_foodType);
        }else{
          app.globalData.m_foodData = res.data.data.food_info;

          app.addRecord(app.globalData.m_foodData);//记录浏览数据
          
          wx.navigateTo({
            url: '../mainPage/mainPage'
          })
        }
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
  login_server:function()
  {
    wx.showLoading({
      title: '加载中',
    })
    console.log(app.globalData.encryptedData)

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

        console.log("登录服务器:",res);

        if (res.data.data==null)
        {
          wx.showToast({
            title: '数据异常',
            icon: 'loading',
            duration: 2000
          });
        }
        else
        {
          app.globalData.token = res.data.data.token;
          app.globalData.uid = res.data.data.uid;
          m_isLogin = true;
        }

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
  login_wx:function()
  {

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
      this.login_server();
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        console.log("app.userInfoReadyCallback,res:",res)

        if (res.userInfo == null || res.userInfo == undefined)
        {
          wx.getUserInfo({
            success: res => {
              app.globalData.userInfo = res.userInfo
              app.globalData.encryptedData = res.encryptedData
              app.globalData.iv = res.iv

              //console.log(app.globalData.userInfo)

              this.setData({
                userInfo: res.userInfo,
                hasUserInfo: true
              })
              this.login_server();
            }
          })
          return;
        }else{
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
          this.login_server();
        }
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
          this.login_server();
        }
      })
    }
  }

})
