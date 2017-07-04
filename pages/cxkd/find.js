// find.js
const SERVER_URL = "http://www.brisksoft.shop"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tip_cxkd: "查询快递",
    tip_dh: "快递单号",
    tip_fail: "查询失败！",
    result: '',
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
   * 请求服务器查询快递
   */
  cxkdRequest: function(){
      wx.request({
          url: SERVER_URL, //仅为示例，并非真实的接口地址
          data: {
              dh:this.data.tip_dh
          },
          header: {
              'content-type': 'application/json'
          },
          success: function (res) {
              console.log(res.data)
          },
          fail: function(res) {
            console.log(res)
          }
      })
  },

  /**
   * 扫码
   */
  scanCode: function (cb) {
      var that = this
      wx.scanCode({
          success: function (res) {
              this.setData({
                  tip_dh: res.result
              })
          },
          fail: function (res) {
          }
      })
  }
})