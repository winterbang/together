//index.js
//获取应用实例
var { pinyinUtil } = require('../../lib/pinyin/pinyin.js')
var app = getApp()
var fontFamily = [
   'Macondo',
   'Spirax',
   'Revalia',
   'Indie Flower',
   'Nova Oval',
   'Abril Fatface',
   'Gloria Hallelujah',
   'Amatic SC',
   'Shadows Into Light',
   'Dancing Script',
   'Fascinate Inline',
   'Kaushan Script',
   'Permanent Marker',
   'Coming Soon',
   'Tangerine'
]
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    destination: pinyinUtil.getPinyin('马尼拉'),
    fontFamily: fontFamily
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
