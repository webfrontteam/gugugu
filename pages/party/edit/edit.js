// pages/party/edit/edit.js

var dateTimePicker = require('../../../utils/dateTimePicker.js');
var util = require('../../../utils/util.js');
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // party_id: null,
    party_id: "bdd31b44bd5241e98b280c728baf1fcb",
    name: null,
    timestamp: null,
    time: null,
    place: null,
    fee: null,
    isInit: false,
    isEdited: false,
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
  onLoad: function(options) {
    // 获取完整的年月日 时分秒，以及默认显示的数组
    var obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    var obj1 = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    // 精确到分的处理，将数组的秒去掉
    var lastArray = obj1.dateTimeArray.pop();
    var lastTime = obj1.dateTime.pop();

    this.setData({
      dateTime: obj.dateTime,
      dateTimeArray: obj.dateTimeArray,
      dateTimeArray1: obj1.dateTimeArray,
      dateTime1: obj1.dateTime
    });

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this
    if (!that.data.isInit) {
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
      that.data.isInit = true
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  //保存按钮
  save: function() {
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
      success: function(res) {
        console.log("edit: save success")
        console.log(res.data)
        that.setData({
          party_id: res.data.data.party_id
        })
      },
      fail: function(res) {
        console.log("edit: save fail")
        console.log(res.data);
      }
    })
  },

  mapView: function() {
    var that = this
    wx.chooseLocation({
      success: function(res) {
        // success
        console.log(res, "location")
        that.setData({
          longitude: res.longitude,
          latitude: res.latitude,
          place: res.name,
        })
      },
      fail: function() {
        console.log("location: fail")
      }
    })
  },

  changeDate(e) {
    this.setData({
      date: e.detail.value
    });
  },
  changeTime(e) {
    this.setData({
      time: e.detail.value
    });
  },
  changeDateTime(e) {
    this.setData({
      dateTime: e.detail.value
    });
  },
  changeDateTime1(e) {
    this.setData({
      dateTime1: e.detail.value
    });
  },
  changeDateTimeColumn(e) {
    var arr = this.data.dateTime,
      dateArr = this.data.dateTimeArray;

    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);

    this.setData({
      dateTimeArray: dateArr,
      dateTime: arr
    });
  },
  changeDateTimeColumn1(e) {
    var arr = this.data.dateTime1,
      dateArr = this.data.dateTimeArray1;

    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);

    this.setData({
      dateTimeArray1: dateArr,
      dateTime1: arr
    });
  },
  isEdited: function(){
    var that = this
    that.data.isEdited = true
  }

})