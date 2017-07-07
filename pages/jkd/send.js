// send.js

const SERVER_URL = "https://www.brisksoft.shop/sdt/jkd"
const SERVER_URL_DETAILS = "https://www.brisksoft.shop/sdt/details" 

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tip_1: '功能正在开发中，敬请期待！',
    tip_2: '查询',
    addr1: '湖南,长沙市-长沙市-岳麓区',
    addr2: '麓谷像素汇',
    guid: '889572253A04ECA5BEB893F02B51C537',
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
   * 获取附近快递信息
   */
  getKdInfo: function() {
      var self = this
      wx.request({
          url: SERVER_URL,
          data: {
                xzqname: self.data.addr1,
                keywords: self.data.addr2,
          },
          header: {
              'Content-Type': 'application/json',
          },
          success: function(res) {
                console.log(res)
          },
          fail: function(res) {

          },
      })
  },

  /**
   * 获取某个快递的具体信息
   */
  getKdDetailsInfo: function() {
      var self = this
      wx.request({
          url: SERVER_URL_DETAILS,
          data: {
              guid: self.data.guid,
          },
          header: {
              'Content-Type': 'application/json',
          },
          success: function (res) {
              console.log(res)
          },
          fail: function (res) {

          },
      })
  },
})