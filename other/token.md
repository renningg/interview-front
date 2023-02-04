token原理
1.将荷载payload，以及Header信息进行Base64加密，形成密文payload密文，header密文。
2.将形成的密文用句号链接起来，用服务端秘钥，进行HS256加密，生成签名.
3.将前面的两个密文后面用句号链接签名形成最终的token返回给服务端

注：
（1）用户请求时携带此token(分为三部分，header密文，payload密文，签名)到服务端，服务端解析第一部分(header密文)，用Base64解密，可以知道用了什么算法进行签名，此处解析发现是HS256。
（2）服务端使用原来的秘钥与密文(header密文+"."+payload密文)同样进行HS256运算，然后用生成的签名与token携带的签名进行对比，若一致说明token合法，不一致说明原文被修改。
（3）判断是否过期，客户端通过用Base64解密第二部分（payload密文），可以知道荷载中授权时间，以及有效期。通过这个与当前时间对比发现token是否过期。

token实现思路
1.用户登录校验，校验成功后就返回Token给客户端。
2.客户端收到数据后保存在客户端
3.客户端每次访问API是携带Token到服务器端。
4.服务器端采用filter过滤器校验。校验成功则返回请求数据，校验失败则返回错误码

C#后端返回token
<script>
      public static string SecretKey = "This is a private key for Server";//这个服务端加密秘钥 属于私钥
      private static JavaScriptSerializer myJson = new JavaScriptSerializer();
      public static string GenToken(TokenInfo M)
      {
          var payload = new Dictionary<string, dynamic>
          {
              {"UserName", M.UserName},//用于存放当前登录人账户信息
              {"UserPwd", M.UserPwd}//用于存放当前登录人登录密码信息
          };
          IJwtAlgorithm algorithm = new HMACSHA256Algorithm();
          IJsonSerializer serializer = new JsonNetSerializer();
          IBase64UrlEncoder urlEncoder = new JwtBase64UrlEncoder();
          IJwtEncoder encoder = new JwtEncoder(algorithm, serializer, urlEncoder);
          return encoder.Encode(payload, SecretKey);
      }
</script>

前端在请求头加上token
<script>
  const token = Vue.ls.get(ACCESS_TOKEN);
  if (token) {
    config.headers['Authorization'] ='BasicAuth '+token // 让每个请求携带自定义 token 请根据实际情况自行修改
  }
</script>