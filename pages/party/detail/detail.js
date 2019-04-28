// pages/party/detail/detail.js

var app = getApp()
var util = require('../../../utils/util.js');


Page({

  /**
   * 页面的初始数据
   */
  data: {
    "name": null,
    "time": null,  // 聚会集合时间的时间戳
    "fee": null,  // 单人缴纳费用
    "leader": null,  // 用于在参与者列表中突出显示盟主
    "members": "",
    "total":"",
    "count":0,
    "party_id": null
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   this.setData({
     party_id:options.party_id
   })
   var that=this
    wx.request({
      url: app.globalData.ip + "/party/detail/",
      //app.globalData.ip + '/party/participate',
      method: 'GET',
     
      header: {
        'token': app.globalData.token
      },
      data:{
        "party_id": that.data.party_id
      },
      success: function (res) {
        console.log("detail")
        console.log(res.data.data.members.length);
        for (var j = 0, len = res.data.data.members.length; j < len; j++) {
          if (res.data.data.members[j].status!=0){
            count++;
          }
        }
        that.setData({
          mode: res.data.data.mode,
          place:res.data.data.place,
          name: res.data.data.name,
          time: util.tsFormatTime(res.data.data.time, 'Y-M-D h:m'),
          fee: res.data.data.fee,
          leader: res.data.data.leader,
          members: res.data.data.members,
          total:res.data.data.members.length
        })

      },
      fail: function (res) {
        console.log("fail")
        console.log(res.data);
      }
    });

    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
   
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  manage:function(){
    var that = this
    wx.navigateTo({
      url: '/pages/party/manage/manage?party_id=' + that.data.party_id,
    })
  },

  openSign:function(){
    var that = this
    wx.request({
      url: app.globalData.ip + "/party/chmod",
      method: 'POST',

      header: {
        'token': app.globalData.token,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: {
        "party_id": that.data.party_id,
        "mode": 1
      },
      success: function (res) {
        console.log("open success")
      },
      fail: function (res) {
        console.log("open fail")
        console.log(res.data);
      }
    })
  }
})