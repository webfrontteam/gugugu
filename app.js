//app.js
App({
  onLaunch: function () {
    // 登录
    var that = this;
    wx.login({
      success: res => {
        var code = res.code
        wx.getUserInfo({
          fail: res => {
            console.log("fe")
          },
          success: res => {
            that.globalData.userInfo = res.userInfo
            wx.request({
              url: that.globalData.ip + '/account/login',
              method: 'POST',
              header: {
                'content-type': 'application/x-www-form-urlencoded'
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
                that.globalData.ifTokenGet=true
                // console.log(res.data.data.token)
              },
              fail: function (res) {
                console.log("fail")
                console.log(res.data);
              }
            })
          }
        })
      }
    })
    //跳转
    setTimeout(function () {
      wx.switchTab({
        url: '../party/homepage/homepage',
      })
    }, 5000)
  },
  globalData: {
    userInfo: null,
    ip: "http://127.0.0.1:8080",
    // ip: "http://193.112.77.221:8080",
    token: null,
    ifTokenGet:false
  }
})