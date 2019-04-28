// pages/party/manage/manage.js
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    "members": "",
    party_id:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      party_id:options.party_id
    })
    var that = this
    wx.request({
      url: app.globalData.ip + "/party/detail/",
      //app.globalData.ip + '/party/participate',
      method: 'GET',

      header: {
        'token': app.globalData.token
      },
      data: {
        "party_id": that.data.party_id
      },
      success: function (res) {
        console.log("detail")
        console.log(res.data.data.members.length);
        that.setData({
          members: res.data.data.members,
        })

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

  },

  endSign: function(){
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
        "mode": 3
      },
      success: function (res) {
        console.log("end success")
        console.log(res.data);
      },
      fail: function (res) {
        console.log("end fail")
        console.log(res.data);
      }
    })
  }
})