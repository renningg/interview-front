session的机制

session并不是浏览器产生的，而是由服务端生成。

当访问服务器某个网页的时候，只要发起了http请求（包括请求html,css,img,js等等），就会在服务器端的内存里开辟一块内存，这块内存就叫做session，而这个内存是跟浏览器关联在一起的。当程序需要为某个客户端的请求创建一个session的时候，服务器首先检查这个客户端的请求里是否已包含了一个session标识 - 称为session id，如果已包含一个session id则说明以前已经为此客户端创建过session，服务器就按照session id把这个session检索出来使用，如果检索不到，就会新建一个。如果客户端请求不包含session id，则为此客户端创建一个session并且生成一个与此session相关联的session id，然后把这个session id返回给客户端，并在客户端的cookie中保存起来。
如图：文件路径：/assets/session.webp   
     任何请求都会自动的带上这个cookie,比如用户提交登录请求时带上了这cookie，
那么在用户查看订单记录的时候也会带上这个cookie,服务器通过这个cookie就能获取到session id的值，
就能判断发送这个请求的是哪个用户，然后返回正确的数据给客户端。

<script>
  // 微信小程序配置SESSIONID
   header: { 
  'content-type': 'application/json' 
  'Cookie': 'JSESSIONID=' + wx.getStorageSync('cookieKey')
}，
</script>