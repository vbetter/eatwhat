var MenuMgr = require('../Utils/MenuMgr.js')

var UserMgr = require('../Utils/UserMgr.js')

var m_curConfig;

var m_enableUse = true;//能否界面交互

var m_isLoading = false;//是否在loading

//获取应用实例
const app = getApp()

Page({
  data: 
  {
    food_img: null,
    text: '',
    m_shopName:"",
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
    m_curConfig = app.globalData.m_foodData;
  },
  onShow: function () {
    this.UpdateUI();
  },
  onReady: function () {

    
  },
  //点击喜欢
  btn_like: function(e) 
  {
    var that = this;
    var isLike = m_curConfig.praise_info.state == 0 ?true:false;
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

        if (isLike)
        {

          app.globalData.m_foodData.praise_info.count++;
          app.globalData.m_foodData.praise_info.state = 1;

          console.log("点赞:", app.globalData.m_foodData.praise_info);
        }else{

          app.globalData.m_foodData.praise_info.count--;
          app.globalData.m_foodData.praise_info.state = 0;

          console.log("取消点赞:", app.globalData.m_foodData.praise_info);

        }

        m_curConfig = app.globalData.m_foodData;

        that.setData({
          icon_like: m_curConfig.praise_info.state == 1 ? "../res/icon/ic_shortcut_thumb_up.png" : "../res/icon/ic_shortcut_thumb_up_0.png",
        });

        var t_title = m_curConfig.praise_info.state == 1 ? '已点赞' : '已取消';
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
    if (m_curConfig.tel == null || m_curConfig.tel == undefined)
    {
      wx.showToast({
        title: '获取电话失败',
        icon: 'loading',
        duration: 2000
      });

      console.log("m_curConfig.phone:", m_curConfig.tel);
    }
    else
    {
      wx.makePhoneCall({
        phoneNumber: m_curConfig.tel.toString(), //仅为示例，并非真实的电话号码
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
    //console.log("加载中");

    if (m_isLoading == true) {
        return;
    }
    var that = this;

    m_isLoading = true;

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

        console.log("菜单数据:", res);

        if (res.statusCode != 200) {
          wx.showToast({
            title: '获取菜单失败',
            icon: 'loading',
            duration: 2000
          });

          return;
        }

        m_isLoading = false;
        wx.hideLoading();
        wx.stopPullDownRefresh();

        app.globalData.m_foodData = res.data.data.food_info;

        app.addRecord(app.globalData.m_foodData);//记录浏览数据
        that.UpdateUI();
      },
      fail: function (res) {
        m_isLoading = false;
        wx.hideLoading();

        wx.showToast({
          title: '登录失败',
          icon: 'loading',
          duration: 2000
        });

        wx.stopPullDownRefresh();
      }
    })
  },
  //评分
  bindPickerChange: function (e) {
    var that = this;
    var t_score = this.data.array[e.detail.value];

    console.log('picker发送选择改变，携带值为', t_score)
    this.setData({
      index: e.detail.value
    })

    wx.request({
      url: 'https://wx.kuuvv.com/api/food/add_score',
      data: {
        code: app.globalData.m_code,
        encryptedData: app.globalData.encryptedData,
        iv: app.globalData.iv,
        food_id: m_curConfig.food_id,
        score: t_score,
      },
      header: {
        'uid': app.globalData.uid,
        'token': app.globalData.token,
      },
      success: function (res) {

        wx.hideLoading();

        console.log("评分数据:",res);

        if (res.data.data == null)
        {

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
        }else{
          app.globalData.m_foodData.score_info = res.data.data;

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
  UpdateUI:function()
  {
    m_curConfig = app.globalData.m_foodData;

    console.log(m_curConfig);
    var img = m_curConfig.pic_list[0];
    console.log("img:",img);

    this.setData({
      text: m_curConfig.price + '元',
      m_shopName: "店名 : " + m_curConfig.shop_name,
      food_img: img,
      text_describle_details: m_curConfig.food_desc,//商品描述
      icon_like: m_curConfig.praise_info.state == 1 ? "../res/icon/ic_shortcut_thumb_up.png" : "../res/icon/ic_shortcut_thumb_up_0.png",
      text_toScoreNumbers: m_curConfig.score_info.count,
      text_score: m_curConfig.score_info.score,
    });

    wx.setNavigationBarTitle({
      title: m_curConfig.name,
    })

    this.setStar(m_curConfig.score_info.score);
  }
  ,
  imageError: function (e) {
    console.log('image发生error事件，携带值为', e.detail.errMsg)
  },
  //星星评分
  setStar:function(e)
  {
    //console.log(e);
     var score =e.toString();
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
