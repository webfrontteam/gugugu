// pages/party/edit/edit.js

var dateTimePicker = require('../../../utils/dateTimePicker.js');
var util = require('../../../utils/util.js');
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    party_id: null,
    name: null,
    timestamp: null,
    time: null,
    place: null,
    fee: null,
    location: {
      longitude: null,
      latitude: null,
      name: null,
      address: null
    },
    dateTimeArray: null,
    dateTime: null,
    dateTimeArray1: null,
    dateTime1: null,
    startYear: 2019,
    endYear: 2050
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
        console.log("edit:get success")
        console.log(res.data)
        that.setData({
          name: res.data.data.name,
          time: util.tsFormatTime(res.data.data.time, 'Y-M-D h:m'),
          place: res.data.data.place,
          fee: res.data.data.fee
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
  onShareAppMessage: function () {

  },
  
  //保存按钮
  save: function () {
    wx.request({
      url: app.globalData.ip + '/party/launch',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'token': app.globalData.token
      },
      data: {
        name: that.data.name,
        latitude: that.data.location.latitude,
        fee: that.data.fee,
        time: that.data.timestamp,
        longtitude: that.data.location.longitude,
        place: that.data.location.name,
        party_id: that.data.party_id
      },
      success: function (res) {
        console.log("edit: save success")
        console.log(res.data)
        that.setData({
          party_id: res.data.data.party_id
        })
      },
      fail: function (res) {
        console.log("edit: save fail")
        console.log(res.data);
      }
    })
  },

})

