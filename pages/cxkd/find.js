// find.js
const SERVER_URL = "https://www.brisksoft.shop/sdt/cxkd"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tip_cxkd: "查询快递",
    tip_dh: "快递单号",
    tip_fail: "查询失败！",
    result: '',
    dh: '',
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
   * 单号输入框事件
   */
  dhInputEvent: function(e) {
      this.setData({
          dh: e.detail.value
      })
  },

  /**
   * 请求服务器查询快递
   */
  cxkdRequest: function(){
      var self = this
      wx.request({
          url: SERVER_URL, 
          header: {
              'Content-Type': 'application/json'
          },
          data: {
              dh: self.data.dh
          },
          success: function (res) {
              var tmpText = ''
              if (res.data.status && res.data.status == 200) {
                  for (var i in res.data.data) {
                      var value = res.data.data[i]
                      tmpText += value.time + "\n"
                      tmpText += value.context + "\n"
                      tmpText += "--------------------------------------------\n"
                  }
              }else{
                  tmpText = res.data
              }
              self.setData({
                  result: tmpText
              })
          },
          fail: function(res) {
              self.setData({
                  result: res.data
              })
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
              that.setData({
                  dh: res.result,
              })
          },
          fail: function (res) {
          }
      })
  }
})