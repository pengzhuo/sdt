//app.js

const SERVER_URL = "https://www.brisksoft.shop/sdt/user"

App({
  onLaunch: function() {
    // wx.checkSession({
    //     success: function(res) {},
    //     fail: function(res) {
            wx.login({
                success: function(res) {
                    //将code上传给服务器换取session
                    wx.request({
                        url: SERVER_URL,
                        data: {
                            type: 1,
                            code: res.code,
                        },
                        header: {
                            'Content-Type': 'application/json'
                        },
                        success: function(res) {
                            wx.setStorageSync("userId", res.data)
                        },
                        fail: function(res) {},
                        complete: function(res) {},
                    })
                },
                fail: function(res) {},
                complete: function(res) {},
            })
    //     },
    //     complete: function(res) {},
    // })
  },

  getUserInfo: function(cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        withCredentials: true,
        success: function(res) {
            var _userId = wx.getStorageSync('userId')
            if (!_userId){
                _userId = "-1"
            }
            wx.request({
                url: SERVER_URL,
                data: {
                    type: 2,
                    uinfo: {
                        userId: _userId,
                        encryptedData: res.encryptedData,
                        iv: res.iv,
                        rawData: res.rawData,
                        signature: res.signature,
                    },
                },
                header: {
                    'Content-Type': 'application/json'
                },
                success: function(res) {},
                fail: function(res) {},
                complete: function(res) {},
            })
          that.globalData.userInfo = res
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  },

  globalData: {
    userInfo: null
  }
})
