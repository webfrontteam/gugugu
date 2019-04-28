// pages/mine/minedetail/minedetail.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:"",
    score: 0,
    header: ""
  },

  billdetail: function (options) {
    wx.navigateTo({
      url: '/pages/mine/balance/balance',
    })
  },

  balance: function (options) {
    wx.navigateTo({
      url: '/pages/mine/balance/balance',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
      url: app.globalData.ip + "/account/detail",
      method: 'GET',
      header: {
        'token': app.globalData.token
      },
      success(res) {
        console.log("detailsuccess")
        console.log(res.data);
        that.setData({
          username:res.data.data.username,
          score: res.data.data.score,
          header: res.data.data.header
        })
      },
      fail: function (res) {
        console.log("fail")
        console.log(res.data);
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
  onShareAppMessage: function () {

  }
})