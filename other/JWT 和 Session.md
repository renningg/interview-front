# 什么是JWT？
  JWT是为了在网络应用环境间传递声明而执行的一种基于JSON的开发标准，是签发token和校验token的一种机制，该token紧凑且安全，特别适合用于单点登录(SSO)。基于token的鉴权机制类似于http协议，也是无状态的，不需要在服务端保留用户认证信息

<script>
  JWT的构成
第一部分我们称它为头部（header),第二部分我们称其为载荷（payload, 类似于飞机上承载的物品)，第三部分是签证（signature).

header
jwt的头部承载两部分信息：
声明类型，这里是jwt
声明加密的算法 通常直接使用 HMAC SHA256
完整的头部就像下面这样的JSON：
  {
    'typ': 'JWT',
    'alg': 'HS256'
  }
然后将头部进行base64加密（该加密是可以对称解密的),构成了第一部分.
      
payload 载荷就是存放有效信息的地方。这个名字像是特指飞机上承载的货品，这些有效信息包含三个部分
    {
      {"UserName", M.UserName},//用于存放当前登录人账户信息
      {"UserPwd", M.UserPwd}//用于存放当前登录人登录密码信息
    };
然后将其进行base64加密，得到JWT的第二部分。

signatureJWT的第三部分是一个签证信息，这个签证信息由三部分组成：

header (base64后的)
payload (base64后的)
secret
这个部分需要base64加密后的header和base64加密后的payload使用.连接组成的字符串，然后通过header中声明的加密方式进行secret组合加密，然后就构成了jwt的第三部分。
将这三部分用.连接成一个完整的字符串,构成了最终的jwt:
"  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ"
  public static string SecretKey = "This is a private key for Server";//这个服务端加密秘钥 属于私钥
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

# JWT优点
  因为JSON的通用性，所以JWT是可以跨语言的；
  payload部分存储敏感信息；
  JWT构成非常简单，字节占用小，非常便于传输；
  不需要在服务端保存会话信息，易于应用扩展；
# session
  session都是保存在内存中，服务端开销较大；
  扩展性差：用户认证之后，服务端做认证记录，如果认证的记录被保存在内存中的话，这意味着用户下次请求还必须要请求在这台服务器上,这样才能拿到授权的资源，