//index.js
//获取应用实例
var app = getApp()
var api = app.API()
Page({
  data: {
    title: "",
    departurePlace: "",
    startData: '',
    destination: "",
    endData: '',
    byWayOf: [],
    peopleLimit:[1, 2],
    contactWays: [],
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
    console.log(api.auth().currentUser.uid)
    let wilddog = app.API()
    var sessionsRef = wilddog.sync().ref("sessions");
    var mySessionRef = sessionsRef.push();
    mySessionRef.onDisconnect().update({
        'endedAt': wilddog.sync().ServerValue.TIMESTAMP
    });
    mySessionRef.update({
        'startedAt': wilddog.sync().ServerValue.TIMESTAMP
    });
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
  },
  addContactWay: function(e) {
    var contactWays = this.data.contactWays;
    contactWays.push({type:"", value: ""});
    this.setData({
      contactWays: contactWays
    })
  },
  choiceContactType: function(e) {
    var that = this;
    var items = {qq: 'QQ', wechat: '微信', phoneNumber: '手机号'}
    var targetId = e.target.dataset.id;
    var contactWays = this.data.contactWays;
    wx.showActionSheet({
      itemList: Object.values(items),
      success: function(res) {
        contactWays[targetId].type = Object.keys(items)[res.tapIndex]
        that.setData({
          contactWays: contactWays
        })
      },
      fail: function(res) {
        console.log(res.errMsg)
      }
    })
  },
  removeContactWay: function(e) {
    var targetId = e.target.dataset.id;
    var contactWays = this.data.contactWays;
    contactWays.splice(targetId, 1);
    this.setData({
      contactWays: contactWays
    })
  },
  getData: function(e) {
    var keys = e.target.dataset.key.split('.');
    var oldData = this.data;
    var lastNest = oldData;
    keys.forEach(function(v, i){
      if(i == keys.length-1){
        lastNest[v] = e.detail.value
      }else {
        v = parseInt(v)||v
        lastNest = lastNest[v]
      }
    })
    this.setData({
      [keys[0]]: oldData[keys[0]]
    })
  },
  publish: function() {
    const {title, departurePlace, startData, destination, endData, byWayOf, peopleLimit, contactWays, desc} = this.data
    let uid = api.auth().currentUser.uid
    let journey = {uid, title, departurePlace, startData, destination, endData, byWayOf, peopleLimit, contactWays, desc}
    console.log(journey)
    api.sync().ref("journeys").push(journey)
      .then(function(newRef){
         // newRef 的地址类似下面：
         // https://<appId>.wilddogio.com/city/-JmRhjbYk73IFRZ7
         console.info(newRef.toString());
         console.info(newRef.key());
         let lastJourneyId
         api.sync().ref(`userinfo/${uid}/journeys`)
          .limitToLast(10).on('child_added',function(snapshot,prev){
           lastJourneyId = snapshot.key()
         });
         api.sync().ref(`userinfo/${uid}/journeys/${lastJourneyId+1}`).set(newRef.key())
      })
      .catch(function(err){
         console.info('remove node failed', err.code, err);
      });
  }
})
