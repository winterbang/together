//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    title: "",
    departurePlace: "",
    startData: '出发时间',
    destination: "",
    endData: '离开时间',
    byWayOf: [],
    peopleLimit:[],
    contactWay: {},
    desc: "",
    userInfo: {},
    config: [{
      label: '目的地'
    }, {
      label: '出发地'
    }]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '发布'
    })
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  },
  bindStartData: function(e) {
    this.setData({
      startData: e.detail.value
    })
  },
  bindEndData: function(e) {
    this.setData({
      endData: e.detail.value
    })
  },
  bindLimitPeople: function(e) {
    var that = this;
    wx.showActionSheet({
      itemList: ['1人', '2-5人', '6-10人', '不限'],
      success: function(res) {
        console.log(res.tapIndex)
      },
      fail: function(res) {
        console.log(res.errMsg)
      }
    })
  },
  addLocation: function(e) {
    console.log(e)
    var locations = this.data.byWayOf;
    locations.push({location:"", arriveData: ""});
    this.setData({
      byWayOf: locations
    })
  },
  removeLocation: function(e) {
    var targetId = e.target.dataset.id;
    var locations = this.data.byWayOf;
    locations.splice(targetId, 1);
    this.setData({
      byWayOf: locations
    })
  }

})
