
var m_uid=0;
var m_token='';
var m_cmd;
const app = getApp()
var m_islogin = false;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    text_desc:'点击下方按钮后，向服务器发送消息，这里显示返回数据'
  },
  btn_getfood_fast:function()
  {
    console.log(m_uid);
    console.log(m_token);

    wx.request({
      url: 'http://wx.kuuvv.com/api/food/recommed', //仅为示例，并非真实的接口地址
      data: {
        food_type: "1",
      },
      header: {
        'uid': m_uid,
        'token':m_token,
      },
      success: function (res) {
        console.log('success:', res)
      }
    })
  },
  btn_getfood_drink: function () {

      wx.request({
        url: 'http://wx.kuuvv.com/api/food/recommed', //仅为示例，并非真实的接口地址
        data: {
          food_type: "2",
        },
        header: {
          'uid': m_uid,
          'token': m_token,
        },
        success: function (res) {

          console.log('success:' , res)
        }
      })
  },
  btn_login:function()
  {
    console.log('code:' , app.globalData.m_code);
    console.log('encryptedData:', app.globalData.encryptedData);
    console.log('iv:', app.globalData.iv);

        wx.request({
          url: 'http://wx.kuuvv.com/api/user/wechatlogin', //仅为示例，并非真实的接口地址
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

            console.log(res);
            m_token = res.data.data.token;
            m_uid = res.data.data.uid;
          },
          fail:function(res)
          {
            
          }
        })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '应用设置',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  }
})