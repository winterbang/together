//index.js
//获取应用实例
// var pinyin = require('../../lib/pinyin/web-pinyin.js')
// var pinyin = new Pinyin();
// console.log(pinyin)
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    // destination: pinyin('马尼拉')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '行程'
    })
    // console.log(pinyin)
    console.log('==========')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      console.log(userInfo)
      that.setData({
        userInfo:userInfo
      })
    })
  },
  onShareAppMessage: function () {
    return {
      title: '找个和我同路的驴友',
      path: '/page/user?id=123',
      success: function(res) {
        // 分享成功
      },
      fail: function(res) {
        // 分享失败
      }
    }
  }
})
