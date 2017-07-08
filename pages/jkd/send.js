// send.js

const SERVER_URL = "https://www.brisksoft.shop/sdt/jkd"
var cityList = require('./cityList').cityList;
var Base64 = require('../../lib/base64.modified.js'); 

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tip_1: '功能正在开发中，敬请期待！',
    tip_2: '查询',
    tip_3: '寄件人地址:',
    tip_4: '选择',
    tip_5: '详细地址:',
    addr1: '',
    addr2: '',
    guid: '',

    address: {},
    showArea: false,
    currentTab: 1,
    country: [],
    residecity: [],
    resideprovince: [],
    curr_pro: '',
    curr_cit: '',
    curr_cou: '',
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
        var self = this
        self.setData({
            tip_3: '寄件人地址:',
            tip_5: '详细地址:',
        });
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
      if (self.data.addr1.length == 0 || self.data.addr2.length == 0){
          wx.showModal({
              title: "错误",
              content: "地址输入不完整",
              showCancel: false,
              confirmText: "确定"
          })
          return
      }
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
              if (res.data.status && res.data.status == 200) {
                  var s = Base64.encode(JSON.stringify(res.data.coList))
                  wx.navigateTo({ url: '../details/index?kdInfo=' + s,}) 
              }else{
                  wx.showModal({
                      title: "提示",
                      content: res.data,
                      showCancel: false,
                      confirmText: "确定"
                  })
              }
          },
          fail: function(res) {
              wx.showModal({
                  title: "提示",
                  content: res.data,
                  showCancel: false,
                  confirmText: "确定"
              })
          },
      })
  },

  /**
   * 单号输入框事件
   */
  dhInputEvent: function (e) {
      var self = this
      self.setData({
          addr1: e.detail.value
      })
  },

  dhInputEvent_ex: function (e) {
      var self = this
      self.setData({
          addr2: e.detail.value
      })
  },

  choosearea: function () {
      var self = this
      let result = self.data.address;
      var _currentTab = 1;
      if (result.country) {
          _currentTab = 3;
      } else if (result.residecity) {
          _currentTab = 3;
      } else if (result.resideprovince) {
          _currentTab = 1;
      } else {
          _currentTab = 1;
      }

      let _resideprovince = [];
      let _residecity = [];
      let _country = [];

      cityList.forEach((item) => {
          _resideprovince.push({
              name: item.name
          });
          if (item.name == result.resideprovince) {
              item.city.forEach((item) => {
                  _residecity.push({
                      name: item.name
                  });
                  if (item.name == result.residecity) {
                      item.area.forEach((item) => {
                          _country.push({
                              name: item.name
                          });
                      });
                  }
              });
          }
      });

      self.setData({
          showArea: true,
          resideprovince: _resideprovince,
          residecity: _residecity,
          country: _country,

          currentTab: _currentTab,
          curr_pro: result.resideprovince || '请选择',
          curr_cit: result.residecity || '请选择',
          curr_cou: result.country || '请选择',
      });
  },
  areaClose: function () {
      var self = this
      self.setData({
          showArea: false
      });
  },
  //点击省选项卡
  resideprovince: function (e) {
      var self = this
      self.setData({
          currentTab: 1
      });
  },
  //点击市选项卡
  residecity: function () {
      var self = this
      self.setData({
          currentTab: 2
      });
  },
  country: function () {
      var self = this
      self.setData({
          currentTab: 3
      });
  },
  //点击选择省
  selectResideprovince: function (e) {
      var self = this
      let _residecity = [];
      let _country = [];
      let name = e.currentTarget.dataset.itemName;

      cityList.forEach((item) => {
          if (item.name == name) {
              item.city.forEach((item, index) => {
                  _residecity.push({
                      name: item.name
                  });
                  if (index == 0) {
                      item.area.forEach((item) => {
                          _country.push({
                              name: item.name
                          });
                      });
                  }
              });
          }
      });

      self.setData({
          currentTab: 2,
          residecity: _residecity,
          country: _country,
          curr_pro: e.currentTarget.dataset.itemName,
          curr_cit: '请选择',
          curr_cou: '',
      });
  },
  //点击选择市
  selectResidecity: function (e) {
      var self = this
      let _country = [];
      let name = e.currentTarget.dataset.itemName;
      cityList.forEach((item) => {
          if (item.name == self.data.curr_pro) {
              item.city.forEach((item, index) => {
                  if (item.name == name) {
                      item.area.forEach((item) => {
                          _country.push({
                              name: item.name
                          });
                      });
                  }
              });
          }
      });

      self.setData({
          currentTab: 3,
          country: _country,
          curr_cit: e.currentTarget.dataset.itemName,
          curr_cou: '请选择',
      });
  },
  //点击选择区
  selectCountry: function (e) {
      var self = this
      var _address = {
          resideprovince: self.data.curr_pro,
          residecity: self.data.curr_cit,
          country: e.currentTarget.dataset.itemName,
      }
      self.setData({
          showArea: false,
          resideprovince: self.data.curr_pro,
          residecity: self.data.curr_cit,
          country: e.currentTarget.dataset.itemName,
          curr_cou: e.currentTarget.dataset.itemName,
          address: _address,
          addr1: self.data.curr_pro + "," + self.data.curr_cit + "-" + e.currentTarget.dataset.itemName,
          tip_3: self.data.curr_pro + "," + self.data.curr_cit + "-" + e.currentTarget.dataset.itemName,
      });
  },
  // 滑动切换tab
  bindChange: function (e) {
      console.log("bindChange")
      var that = this;
      that.setData({
          currentTab: e.detail.current + 1
      });
  },
})