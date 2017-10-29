//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        console.log("login:",res);
          this.globalData.m_code = res.code;

          // 获取用户信息
          wx.getSetting({
            success: res => {
              if (res.authSetting['scope.userInfo']) {
                // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                wx.getUserInfo({
                  success: res => {
                    // 可以将 res 发送给后台解码出 unionId
                    this.globalData.encryptedData = res.encryptedData
                    this.globalData.iv = res.iv
                    console.log("getSetting:", res)

                    // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                    // 所以此处加入 callback 以防止这种情况
                    if (this.userInfoReadyCallback) {
                      this.userInfoReadyCallback(res)
                    }
                  }
                })
              }else{
                wx.authorize({
                  scope: 'scope.userInfo',
                  success: res => {
                    // 可以将 res 发送给后台解码出 unionId
                    this.globalData.encryptedData = res.encryptedData
                    this.globalData.iv = res.iv
                    console.log("getSetting:", res)

                    // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                    // 所以此处加入 callback 以防止这种情况
                    if (this.userInfoReadyCallback) {
                      this.userInfoReadyCallback(res)
                    }
                  }
                })
              }
            }
          })
      }
    })
  },
  globalData: {
    userInfo: null,
    m_code:null,
    encryptedData:null,
    iv:null,
    uid:null,
    token:null,
    m_foodData:null,
    m_foodType:1,
    m_record:[],
  },
  addRecord: function(data)
  {
    if (this.globalData.m_record.length >=10)
    {
      this.globalData.m_record.shift();
    }
    this.globalData.m_record.push(data);
  },
})