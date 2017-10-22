//logs.js
const util = require('../../utils/util.js')
var MyUtils = require('../Utils/Utils.js')

Page({
  
  data: {
    logs: []
  },
  onLoad: function () {
    console.log(MyUtils.searchmtdata('1000'));

    this.setData({

      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  }
})
