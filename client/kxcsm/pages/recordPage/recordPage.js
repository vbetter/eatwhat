// pages/recordPage/recordPage.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    msgData:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData
    (
      {
          msgData: app.globalData.m_record,
      }
    );
  },
  btn_enter:function(e)
  {
    if (e.target == null || e.target == undefined || e.target.id == null || e.target.id == undefined)
    {
      return;
    }
      //console.log(e);
      var itemIndex =Number(e.target.id);

      //console.log(app.globalData.m_record);

      app.globalData.m_foodData = app.globalData.m_record[itemIndex];

      wx.navigateTo({
        url: '../mainPage/mainPage',
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
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})