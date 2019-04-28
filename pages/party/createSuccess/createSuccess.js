// pages/party/createSuccess/createSuccess.js

var app = getApp();
var util = require('../../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    party_id: null,
    name: null,
    timestamp: null,
    time: null,
    plcae: null,

  },

  backToHomepage: function(options){
    wx.navigateTo({
      url: '/pages/party/homepage/homepage',
    })
  },

  detail:function(options){
    wx.navigateTo({
      url: '/pages/party/detail/detail',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      party_id: options.party_id
    })
    // console.log(that.data.party_id)
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
    var that = this
    wx.request({
      url: app.globalData.ip + "/party/detail",
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'token': app.globalData.token,
      },
      data: {
        'party_id': that.data.party_id
      },
      success(res) {
        console.log("createsuccess")
        console.log(res.data)
        that.setData({
          name: res.data.data.name,
          timestamp: res.data.data.time,
          place: res.data.data.place
        })
        that.setData({
          time: util.tsFormatTime(that.data.timestamp, 'Y-M-D h:m')
        })
      }
    })
    
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
  onShareAppMessage: function (res) {
    if (res.from == 'button') {
      console.log(res.target, res)
    }
    return {
      title: '邀请加入',
      path: 'pages/party/join/join',
      success: function (res) {
        // 转发成功
        console.log("转发成功");
      },
      fail: function (res) {
        // 转发失败
        console.log("转发失败" );
      }
    }
  }
})