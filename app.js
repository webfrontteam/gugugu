//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    var that = this;
    wx.login({
      success: res => {
        var code = res.code
        wx.getUserInfo({
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
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    ip: "http://127.0.0.1:8080",
    token: null,
  }
})