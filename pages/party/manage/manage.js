// pages/party/manage/manage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "members": "",
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
    var that = this
    wx.request({
      url: app.globalData.ip + "/party/detail/",
      //app.globalData.ip + '/party/participate',
      method: 'GET',

      header: {
        'token': app.globalData.token
      },
      data: {
        "party_id": that.data.partyId
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