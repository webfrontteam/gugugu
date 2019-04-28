// pages/party/homepage/homepage.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:null,
    start:0,
    count:5,
  },

  creatParty: function(options){
    wx.navigateTo({
      url: '/pages/party/create/create',
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
    var that = this;
    wx.request({
      url: app.globalData.ip +"/party/list",
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'token':app.globalData.token,
      },
      data: {
        'start':that.data.start,
        'count':that.data.count
      },
      success(res) {
        that.setData({
          list: res.data.data.parties
        })
      },
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
    var that = this;
    wx.request({
      url: app.globalData.ip + "/party/list",
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'token': app.globalData.token,
      },
      data: {
        'start': that.data.start+that.data.count,
        'count': that.data.count
      },
      success(res) {

        var newList = that.data.list.concat(res.data.parties);
        that.setData({
          start: that.data.start + that.data.count,
          list:newList
        })
      },
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})