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
    colors: colors,
    showMask: false
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
    api.sync().ref('journeys').limitToFirst(10).on('child_added',function(snapshot,prev){
      journeys.push(snapshot.val())
    });
    console.log(journeys)
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
    console.log(e)
    this.setData({
      showMask: true,
      left: e.touches[0].pageX,
      top: e.touches[0].pageY-98,
    })
    console.log('click more...')
    // wx.showModal({
    //   title: '提示',
    //   content: '这是一个模态弹窗',
    //   success: function(res) {
    //     if (res.confirm) {
    //       console.log('用户点击确定')
    //     } else if (res.cancel) {
    //       console.log('用户点击取消')
    //     }
    //   }
    // })
  },
  bindStar: function(e) {
    console.log('click start')
  },
  hideMask: function(e) {
    console.log(e)
    this.setData({
      showMask: false,
    })
  },
  bindScroll: function(e) {
    console.log(e, 'bindScroll')
    this.hideMask(e)
  }
})
