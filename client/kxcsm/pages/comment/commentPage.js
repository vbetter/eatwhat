// pages/comment/commentPage.js
const app = getApp()
var m_myScore =0;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    star_1: "../res/icon/star_1.png",
    star_2: "../res/icon/star_1.png",
    star_3: "../res/icon/star_1.png",
    star_4: "../res/icon/star_1.png",
    star_5: "../res/icon/star_1.png",
    m_score: "0分",
    m_isHiddenBtnOK:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) 
  {
    m_myScore = app.globalData.m_foodData.score_info.user_score;

    wx.setNavigationBarTitle({
      title: app.globalData.m_foodData.name,
    })

    this.UpdateUI();
  },
  UpdateUI:function()
  {
    var user_score = app.globalData.m_foodData.score_info.user_score;
    if (!this.IsAlreadyWrite()) {
      user_score = "0";
    }
    else {
      this.data.m_isHiddenBtnOK = true;
    }

    this.setData
      ({
        m_score: user_score + "分",
        m_isHiddenBtnOK: this.IsAlreadyWrite()
      });

    this.setStar(user_score);
  }
  ,
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
  
  },
  btn_ok: function (e)
  {
    if (this.IsAlreadyWrite()) {
      //已评分
      console.log("AlreadyWrite")
      return;
    }

    console.log("m_myScore:", m_myScore)

    var that = this;
    wx.request({
      url: 'https://wx.kuuvv.com/api/food/add_score',
      data: {
        code: app.globalData.m_code,
        encryptedData: app.globalData.encryptedData,
        iv: app.globalData.iv,
        food_id: app.globalData.m_foodData.food_id,
        score: m_myScore.toString(),
      },
      header: {
        'uid': app.globalData.uid,
        'token': app.globalData.token,
      },
      success: function (res) {

        wx.hideLoading();

        console.log("评分数据:", res);

        if (res.data.data == null) {

          if (res.data.meta.code == 2) {
            wx.showToast({
              title: '已评分',
              icon: 'success',
              duration: 2000
            });

          } else {
            wx.showToast({
              title: '评分异常',
              icon: 'success',
              duration: 2000
            });
          }
        } else {
          
          app.globalData.m_foodData.score_info.user_score = m_myScore.toString();
          app.globalData.m_foodData.score_info.score = res.data.data.score;
          app.globalData.m_foodData.score_info.count = res.data.data.count;
          console.log(app.globalData.m_foodData.score_info);

          wx.showToast({
            title: '评分成功',
            icon: 'success',
            duration: 3000
          });

          //刷新界面
          that.UpdateUI();
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
  IsAlreadyWrite:function () {
    var user_score = Number(app.globalData.m_foodData.score_info.user_score);
    if (user_score != null && user_score > 0) {
      //已评分
      return true;
    }
    return false;
  }
  ,
  btn_score: function (e) {
    if (this.IsAlreadyWrite())
    {
      //已评分
      return;
    }

    m_myScore = e.target.id;
    console.log(m_myScore);
    this.setStar(m_myScore.toString())

    this.setData
      ({
        m_score: m_myScore + "分"
      });
  },
  //星星评分
  setStar: function (e) {
    //console.log(e);
    var score = e.toString();
    switch (score) {
      case "5":
        {
          this.setData({
            star_1: "../res/icon/star_1.png",
            star_2: "../res/icon/star_1.png",
            star_3: "../res/icon/star_1.png",
            star_4: "../res/icon/star_1.png",
            star_5: "../res/icon/star_1.png",
          });
        }
        break;
      case "4":
        {
          this.setData({
            star_1: "../res/icon/star_1.png",
            star_2: "../res/icon/star_1.png",
            star_3: "../res/icon/star_1.png",
            star_4: "../res/icon/star_1.png",
            star_5: "../res/icon/star_3.png",
          });
        }
        break;
      case "3":
        {
          this.setData({
            star_1: "../res/icon/star_1.png",
            star_2: "../res/icon/star_1.png",
            star_3: "../res/icon/star_1.png",
            star_4: "../res/icon/star_3.png",
            star_5: "../res/icon/star_3.png",
          });
        }
        break;
      case "2":
        {
          this.setData({
            star_1: "../res/icon/star_1.png",
            star_2: "../res/icon/star_1.png",
            star_3: "../res/icon/star_3.png",
            star_4: "../res/icon/star_3.png",
            star_5: "../res/icon/star_3.png",
          });
        }
        break;
      case "1":
        {
          this.setData({
            star_1: "../res/icon/star_1.png",
            star_2: "../res/icon/star_3.png",
            star_3: "../res/icon/star_3.png",
            star_4: "../res/icon/star_3.png",
            star_5: "../res/icon/star_3.png",
          });
        }
        break;
      default:
        {
          this.setData({
            star_1: "../res/icon/star_3.png",
            star_2: "../res/icon/star_3.png",
            star_3: "../res/icon/star_3.png",
            star_4: "../res/icon/star_3.png",
            star_5: "../res/icon/star_3.png",
          });
        }
    }
  }
})