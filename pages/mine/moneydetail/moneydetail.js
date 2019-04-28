// pages/mine/moneydetail/moneydetail.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    wx.request({
      url: that.globalData.ip + '/account/transaction',
      method: 'GET',
      header: {
        'token': 'application/x-www-form-urlencoded'
      },
      data: {
        code: code,
        name: that.globalData.userInfo.nickName,
        header: that.globalData.userInfo.avatarUrl
      },
      success: function (res) {
        console.log("success")
        console.log(res.data)
        that.globalData.token = res.data.data.token
        // console.log(res.data.data.token)
      },
      fail: function (res) {
        console.log("fail")
        console.log(res.data);
      }
    })

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

  }
})