// pages/party/create/create.js

var dateTimePicker = require('../../../utils/dateTimePicker.js');
var util = require('../../../utils/util.js');
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    party_id: null,
    name: "聚会",
    fee: null,
    feeArray: [
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    ],
    feeIndex: [5, 0],
    time: null,
    timestamp: null,
    longitude: null,
    latitude: null,
    place: null,
    // location: {
    //   longitude: null,
    //   latitude: null,
    //   name: null,
    //   address: null
    // },
    dateTimeArray: null,
    dateTime: null,
    dateTimeArray1: null,
    dateTime1: null,
    startYear: 2019,
    endYear: 2050
  },
  nameInput: function (e) {
    this.setData({
      name: e.detail.value
    })
    console.log(name);
  },
  mapView: function () {
    var that = this
    wx.chooseLocation({
      success: function (res) {
        // success
        console.log(res, "location")
        that.setData({
          longitude: res.longitude,
          latitude: res.latitude,
          plcae: res.name,
          // location: {
          //   longitude: res.longitude,
          //   latitude: res.latitude,
          //   address: res.address,
          //   name: res.name
          // },
          detail_info: res.address,
          wd: res.latitude,
          jd: res.longitude
        })
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
  //押金
  changefeePicker(e) {
    this.setData({
      feeIndex: e.detail.value
    })
  },

  //创建成功
  createSuccess: function (options) {
    var that = this

    //时间戳
    var s = that.data.dateTimeArray1[0][that.data.dateTime1[0]] + "-" + that.data.dateTimeArray1[1][that.data.dateTime1[1]] + "-" + that.data.dateTimeArray1[2][that.data.dateTime1[2]] + " " + that.data.dateTimeArray1[3][that.data.dateTime1[3]] + ":" + that.data.dateTimeArray1[4][that.data.dateTime1[4]]
    that.setData({
      timestamp: new Date(s.replace(/-/g, "/")).getTime()
    })
    console.log(that.data.timestamp)

    //押金
    var temp = that.data.feeArray[0][that.data.feeIndex[0]] + "." + that.data.feeArray[1][that.data.feeIndex[1]] + "0"
    that.setData({
      fee: temp
    })
    console.log(that.data.fee)
    console.log(that.data.name)

    //提交数据
    wx.request({
      url: app.globalData.ip + '/party/launch',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'token': app.globalData.token
      },
      data: {
        name: that.data.name,
        latitude: that.data.latitude,
        fee: that.data.fee,
        time: that.data.timestamp,
        longtitude: that.data.longitude,
        place: that.data.place
      },
      success: function (res) {
        console.log("success")
        console.log(res.data)
        // console.log(res.data.data.party_id)
        that.setData({
          party_id: res.data.data.party_id
        })
      },
      fail: function (res) {
        console.log("fail")
        console.log(res.data);
      }
    })

    setTimeout(function () {
      wx.navigateTo({
        url: '/pages/party/createSuccess/createSuccess?party_id=' + that.data.party_id,
      })
    }, 2000)

    
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