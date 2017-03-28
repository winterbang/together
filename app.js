//app.js
var wilddog = require('lib/wilddog-weapp-all')
var config = {
    syncURL: 'https://together.wilddogio.com',
    authDomain: 'together.wilddog.com'
}
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo:function(cb){
    var that = this
    wilddog.initializeApp(config)
    wilddog.auth().signInWeapp(function(err,user){
      console.log(user)
    })
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo:null
  }
})