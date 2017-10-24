var MenuMgr = require('../Utils/MenuMgr.js')

var UserMgr = require('../Utils/UserMgr.js')

var m_curConfig;

var m_enableUse = true;//能否界面交互

var m_isLike = false;//是否点赞

//获取应用实例
const app = getApp()

Page({
  data: 
  {
    food_img: '../res/img/white.jpg',
    text: '',
    icon_comment:"../res/icon/ic_position.png",
    icon_mark:"../res/icon/ic_shortcut_star_0.png",
    icon_like:"../res/icon/ic_shortcut_thumb_up_0.png",
    text_describle_details:"",
    array: ['5', '4', '3', '2','1'],
    index: 0,
    star_1: "../res/icon/star_1.png",
    star_2: "../res/icon/star_1.png",
    star_3: "../res/icon/star_1.png",
    star_4: "../res/icon/star_1.png",
    star_5: "../res/icon/star_1.png",
    text_score:"5",
    text_toScoreNumbers:"(4343人评分)",
  },
  onLoad: function () 
  {
    var that = this;

    m_curConfig = app.globalData.m_foodData;

    this.UpdateUI();

    wx.setNavigationBarTitle({
      title: m_curConfig.name,
    })
  },
  //点击喜欢
  btn_like: function(e) 
  {
    var that = this;
    var isLike = !m_isLike;
    var url_like = isLike ? "https://wx.kuuvv.com/api/food/add_praise" : "https://wx.kuuvv.com/api/food/cancel_praise";

    wx.request({
      url: url_like,
      data: {
        code: app.globalData.m_code,
        encryptedData: app.globalData.encryptedData,
        iv: app.globalData.iv,
        food_id:"1000",
      },
      header: {
        'uid': app.globalData.uid,
        'token': app.globalData.token,
      },
      success: function (res) {

        wx.hideLoading();

        console.log(res);
        m_isLike = isLike;
        that.setData({
          icon_like: m_isLike ? "../res/icon/ic_shortcut_thumb_up.png" : "../res/icon/ic_shortcut_thumb_up_0.png",
        });

        var t_title = m_isLike ? '已点赞' : '已取消';
        wx.showToast({
          title: t_title,
          icon: 'success',
          duration: 3000
        });
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
  //点击电话
  btn_phone:function(e)
  {
    if (m_curConfig.phone == null || m_curConfig.phone == undefined)
    {
      wx.showToast({
        title: '获取电话失败',
        icon: 'loading',
        duration: 2000
      });

      console.log("m_curConfig.phone:", m_curConfig.phone);
    }
    else
    {
      wx.makePhoneCall({
        phoneNumber: m_curConfig.phone.tostring(), //仅为示例，并非真实的电话号码
      })
    }
  },
  //点击地址
  btn_position: function (e) {
    var t_latitude = 22.548300;
    var t_longitude = 113.944440;
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        wx.openLocation({
          latitude: t_latitude,
          longitude: t_longitude,
          scale: 28
        })
      }
    })
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '科兴吃什么',
      path: '/mainPage/mainPage',
      success: function (res) {
        // 转发成功
        wx.showToast({
          title: '转发成功',
          icon: 'success',
          duration: 3000
        });

      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  onPullDownRefresh: function () {    
    console.log("加载中");
    var that = this;
    wx.showLoading({
      title: '加载中',
    })

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

        console.log("res:", res);
        app.globalData.m_foodData = res.data.data.food_info;
        that.UpdateUI();
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

    wx.stopPullDownRefresh();
  },
  //评分
  bindPickerChange: function (e) {
    var that = this;
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
    var t_score = e.detail.value;

    wx.request({
      url: 'https://wx.kuuvv.com/api/food/add_score',
      data: {
        code: app.globalData.m_code,
        encryptedData: app.globalData.encryptedData,
        iv: app.globalData.iv,
        food_id: "1000",
        score: t_score,
      },
      header: {
        'uid': app.globalData.uid,
        'token': app.globalData.token,
      },
      success: function (res) {

        wx.hideLoading();

        console.log(res);

        wx.showToast({
          title: '评分成功',
          icon: 'success',
          duration: 3000
        }); 

        //刷新界面
        that.UpdateUI();
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
  UpdateUI:function()
  {
    m_curConfig = app.globalData.m_foodData;

    console.log(m_curConfig);

    this.setData({
      text: m_curConfig.price + '元',
      food_img: m_curConfig.pic_list[0],
      text_describle_details: m_curConfig.food_desc,//商品描述
      icon_like: m_isLike ? "../res/icon/ic_shortcut_thumb_up.png" : "../res/icon/ic_shortcut_thumb_up_0.png",
      text_toScoreNumbers: m_curConfig.score_info.count,
      text_score: m_curConfig.score_info.score,
    });

    this.setStar(m_curConfig.score_info.score);
  },
  //星星评分
  setStar:function(e)
  {
     var score =e;
     switch(score)
     {
       case "5":
         {
           this.setData({
             star_1:"../res/icon/star_1.png",
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
  },
}
)
