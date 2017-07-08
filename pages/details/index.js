// index.js

var Base64 = require('../../lib/base64.modified.js'); 
const SERVER_URL_DETAILS = "https://www.brisksoft.shop/sdt/details" 

Page({

  /**
   * 页面的初始数据
   */
  data: {
      kdInfo: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
        var self = this
        self.setData({
            kdInfo: JSON.parse(Base64.decode(options.kdInfo)),
        })
        console.log(self.data.kdInfo)
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

  /**
  * 获取某个快递的具体信息
  */
  getKdDetailsInfo: function (e) {
      var self = this
      wx.request({
          url: SERVER_URL_DETAILS,
          data: {
              guid: e.currentTarget.id,
          },
          header: {
              'Content-Type': 'application/json',
          },
          success: function (res) {
              if (res.data.status && res.data.status == 200) {
                  wx.makePhoneCall({
                      phoneNumber: res.data.courier.courierTel,
                      success: function () {
                          console.log("拨打电话成功！")
                      },
                      fail: function () {
                          console.log("拨打电话失败！")
                      }
                  })
              }else{
                  wx.showModal({
                      title: "提示",
                      content: res.data,
                      showCancel: false,
                      confirmText: "确定"
                  })
              }
          },
          fail: function (res) {

          },
      })
  },

  upper: function (e) {
      console.log(e)
  },
  lower: function (e) {
      console.log(e)
  },
  scroll: function (e) {
      console.log(e)
  },
  scrollToTop: function (e) {
      this.setAction({
          scrollTop: 0
      })
  },
  tap: function (e) {
      for (var i = 0; i < order.length; ++i) {
          if (order[i] === this.data.toView) {
              this.setData({
                  toView: order[i + 1],
                  scrollTop: (i + 1) * 200
              })
              break
          }
      }
  },
  tapMove: function (e) {
      this.setData({
          scrollTop: this.data.scrollTop + 10
      })
  }
})