//index.js
//获取应用实例
var { pinyinUtil } = require('../../lib/pinyin/pinyin.js')
var app = getApp()
var api = app.API()
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

var colors = ['#FFCE54', '#48CFAD', '#F6BB42', '#8CC152', '#37BC9B', '#DA4453']
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    destination: pinyinUtil.getPinyin('马尼拉'),
    fontFamily: fontFamily,
    colors: colors
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
    let journeys=[]
    api.sync().limitToFirst(10).ref('journeys').on('child_added',function(snapshot,prev){
      journeys.push(snapshot.val())
    });
    // console.log(journeys.limitToFirst(10), 'journeys')
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
  },
  bindShow(e) {
    console.log('show...')
  },
  bindMore: function(e) {
    console.log('click more...')
  },
  bindStar: function(e) {
    console.log('click start')
  }
})
