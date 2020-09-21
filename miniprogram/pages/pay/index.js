//index.js
const app = getApp()

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: ''
  },
  // 隐藏左上角的房子图标
  onShow: function(){ 
    if(wx.canIUse('hideHomeButton')){
      wx.hideHomeButton()
    }
  },
  onLoad: function(options) {
    console.log(options,456)
    // 获取用户的openid
    this.onGetOpenid(options);
  },
  // 点击返回app事件
  launchAppError: function(e) {
    if(e.detail.errMsg=="invalid scene"){
        wx.showToast({
          title: '不具备打开 APP 的能力,请手动关闭返回到App',
          icon: "none"
        })
    }
  },
 // 微信支付
 pay: function(payData) {
   wx.showLoading();
   let that = this;
   let data = {
    // 来源
   fromDevice: "MINI",
   // 用户的openid
   openId: app.globalData.openid,  
    // 用户的返回页面
   returnUrl: "http://pfts.520shq.com/html5/project/index.html",
   // 用户的总订单
   totalOrderNo: payData.totalOrderNo, 
   // 用户的现金支付的金额
   useBalance: payData.useBalance || 0, 
   // 微信小程序支付
   payTypeH5: 7, 
 }
   console.log(data,'支付参数');
  wx.request({
    url: app.globalData.url+"/qypfs-order/api/pay/getPayInfo",
    method: "POST",
    data: data,
    success(res) {
      if(res.data.code == 200) {
        console.log("获取支付参数成功------------", res)  
        if(res.data.data.miniPayRequest){
          that.wxPay(JSON.parse(res.data.data.miniPayRequest))
        } else {
          wx.hideLoading()
          wx.showToast({
            title: '支付数据有误',
            icon:"none"
          })
        }
      } else {
        
        wx.showToast({
          title: res.data.message,
          icon: "none"
        })
      }
    },
    fail(res) {
      console.log("获取失败", res)
    },
    complete(res) {
    }
  })
},
// 唤起小程序微信支付
wxPay : function(payData){
  wx.requestPayment({
    timeStamp: decodeURIComponent(payData.timeStamp),
    nonceStr: decodeURIComponent(payData.nonceStr),
    package: decodeURIComponent(payData.package), //统一下单接口返回的 prepay_id 格式如：prepay_id=***
    signType: payData.signType,
    paySign: decodeURIComponent(payData.paySign), //签名
    success(res) {
      wx.showToast({
        title: '支付成功',
      })
    },
    fail(res) {
      wx.showToast({
        title: '支付失败',
        icon: 'none'
      })
    },
    complete(res) {
    }
  })
},

  onGetOpenid: function(options) {
    var that = this;
    // 调用云函数
    wx.showLoading();
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        // 把用户的openid 存到全局
        app.globalData.openid = res.result.openid;
        // 调用后台接口获取支付所需的参数
        that.pay(options);
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.showToast({
          title: '获取用户信息失败',
          icon : "none"
        })
      },
      complete(){
        wx.hideLoading();
      }
    })
  },
})
