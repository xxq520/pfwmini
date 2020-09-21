# 批发网小程序

技术栈：原生微信小程序+云开发(获取openid)
### cloudfunctions: 云开发代码目录
- 数据库：一个既可在小程序前端操作，也能在云函数中读写的 JSON 文档型数据库
- 文件存储：在小程序前端直接上传/下载云端文件，在云开发控制台可视化管理
- 云函数：在云端运行的代码，微信私有协议天然鉴权，开发者只需编写业务逻辑代码

### miniprogram: 小程序端代码目录
#### pages/pay: 支付页面（包含功能：获取用户openid，请求支付参数，唤起支付，返回app）
#### pages/index: 首页（目前使用web-view嵌套爱之家h5的方式）
## 参考文档

- [云开发文档](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html)
- [批发网h5测试](http://pfts.520shq.com/html5/project/index.html)
- [批发网h5正式](http://pf.520shq.com/html5/project/index.html)
- [批发网h5测试接口文档地址](https://qypfts.520shq.com/doc.html)
- [批发网h5正式接口文档地址](https://qypf.520shq.com/doc.html)

