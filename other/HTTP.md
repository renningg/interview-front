# 超文本传输协议HTTP（HyperText Transfer Protocol）是基于客户/服务器模式，且面向连接的请求-响应协议。

# HTTP是一种无状态协议，即服务器不保留与客户交易时的任何状态。这就大大减轻了服务器记忆负担，从而保持较快的响应速度。
# HTTP支持持久连接，在HTTP / 0.9和1.0中，连接在单个请求/响应对之后关闭。在HTTP / 1.1中，引入了保持活动机制，其中连接可以重用于多个请求。
# 可分为四个版本，分别是 HTTP 0.9/1.0/1.1/2/3。

HTTP1.0 —— 无状态无连接的应用层协议
无状态：服务器不跟踪不记录请求过的状态
无连接：浏览器每次请求都要建立TCP连接
HTTP1.0规定浏览器和服务器保持短暂的连接，浏览器每次请求都需要与服务器建立一个TCP连接，服务器处理完成后立即断开TCP连接（无连接），服务器不跟踪每个客户端也不记录过去的请求（无状态）

无连接特性会导致以下的缺陷：

无法复用连接。每次发送请求都需要建立一次TCP连接，而TCP的连接释放过程是比较费事的，导致网络利用率非常低
队头堵塞。由于HTTP1.0规定下一个请求必须在前一个响应到达之前才能发送。假设一个请求响应一直不到达，那么下一个请求就不发送，就导致阻塞后面的请求。

为了解决这些问题，HTTP1.1出现了

1.长连接
HTTP1.1增加了一个Connection字段，通过设置keep-alive(默认已设置)可以保持连接不断开，避免每次客户端与服务器请求都要重复建立释放TCP连接，提高了网络的利用率。如果客户端想关闭HTTP连接，可以在请求头中携带Connection:false来告知服务器关闭请求

2. 支持请求管道化(pipelining)
基于长连接，使得请求管线化成为可能。管道化使得请求可以“并行传输”。

3.新增请求方式
PUT
DELETE
OPTIONS
TRACE
CONNECT
HTTP2.0
先来理解几个概念：

帧： HTTP2.0数据通信的最小单位消息：指HTTP2.0中逻辑上的HTTP消息。例如请求和响应等，消息由一个或多个帧组成
流：存在于连接中的一个虚拟通道，流可以承载双向消息，每个流都有一个唯一的整数ID
消息：与逻辑消息对应的完整的一系列数据帧

1.二进制分帧
HTTP2.0采用二进制格式传输数据，而非HTTP1.x的文本格式，二进制协议解析起来更加高效。HTTP2.0将请求和响应数据分割为更小的帧，并且采用二进制编码

2.多路复用
HTTP2.0实现了真正的并行传输，它能够在一个TCP上并行地发送任意数量HTTP请求，避免了队头堵塞。而这个强大的功能则是基于“二进制分帧”的特性。

3.头部压缩
HTTP1.x协议是无状态的，导致每次请求都必须附上所有信息。所以，请求的很多头字段都是重复的，比如Cookie，一样的内容每次请求都必须附带，这会浪费很多带宽，也影响速度。
HTTP/2 对这一点做了优化，引入了头信息压缩机制；

4.服务器推送
允许服务器可以在发送页面HTML时主动推送其他资源，而不用等到浏览器解析到相应位置，发起请求再响应。

例如服务端可以主动把JS和CSS文件推送给客户端，而不需要客户端解析HTML时再发送这些请求。

服务器可以主动推送，客户端也有权利选择是否接收。

# 1.1 HTTP/0.9
最早版本是1991年发布的0.9版。该版本极其简单，只有一个命令GET。
协议规定，服务器只能回应HTML格式的字符串，不能回应别的格式。服务器发送完毕，就关闭TCP连接。

# 1.2 HTTP/1.0
1996年5月，HTTP/1.0 版本发布。除了GET，还引入了POST和HEAD方法，丰富了浏览器与服务器的互动手段。
此时不仅可以传输文字，还能传输图像、视频、二进制文件。
HTTP/1.0 版的主要缺点是，每个TCP连接只能发送一个请求。发送数据完毕，连接就关闭，如果还要请求其他资源，就必须再新建一个连接。
TCP连接的新建成本很高，因为需要客户端和服务器三次握手，并且开始时发送速率较慢（slow start）。所以，HTTP 1.0版本的性能比较差。
随着网页加载的外部资源越来越多，这个问题就愈发突出了。

# 1.3 HTTP/1.1
前面截图中也看到了使用的是这个版本的HTTP。 最大变化，就是引入了持久连接（persistent connection），即TCP连接默认不关闭，可以被多个请求复用。
客户端和服务器发现对方一段时间没有活动，就可以主动关闭连接。不过，规范的做法是，客户端在最后一个请求时，发送Connection: close，明确要求服务器关闭TCP连接。
一个TCP连接现在可以传送多个回应，势必就要有一种机制，区分数据包是属于哪一个回应的。这就是Content-length字段的作用，声明本次回应的数据长度。
支持管道（pipeline）网络传输，只要第一个请求发出去了，不必等其回来，就可以发第二个请求出去，可以减少整体的响应时间。
HTTP 1.1 还提供了与身份认证、状态管理和 Cache 缓存等机制相关的请求头和响应头

此外，还新增了五种请求方法：OPTIONS, PUT, DELETE, TRACE 和 CONNECT 。
也就是说到目前为止，在HTTP中已经有了8中指令：
GET、POST、HEAD、PUT、DELETE、OPTIONS、TRACE、CONNECT
GET：从指定的资源请求数据。在发送数据时，get 方法会向 url 添加数据，只允许 ascii 码，安全性较差，数据在 url 中对所有人可见。
HEAD：类似于 get 请求，只不过返回的响应中没有具体的内容，用于获取报头。
POST：向指定资源提交数据进行处理请求，数据被包含在请求体中，对长度无要求。数据不会显示在 url 中，安全性高。
PUT：从客户端向服务器传送的数据取代指定的文档的内容。
DELETE ：请求服务器删除指定的页面。
OPTIONS： 允许客户端查看服务器的性能。
TRACE： 回显服务器收到的请求，主要用于测试或诊断。
CONNECT： HTTP/1.1 协议中预留给能够将连接改为管道方式的代理服务器。
HTTP1.1 增加 host 字段，在 HTTP1.0 中认为每台服务器都绑定一个唯一的 IP 地址，因此，请求消息中的 URL 并没有传递主机名（hostname）。但随着虚拟主机技术的发展，在一台物理服务器上可以存在多个虚拟主机，并且它们共享一个 IP 地址。

HTTP1.1 的请求消息和响应消息都应支持 Host 头域，且请求消息中如果没有 Host 头域会报告一个错误（400 Bad Request）。

# 1.4 HTTP/2
HTTP/2 协议是基于 HTTPS 的，所以 HTTP/2 的安全性也是有保障的。
HTTP/2 会压缩头（Header）如果你同时发出多个请求，他们的头是一样的或是相似的，那么，协议会帮你消除重复的部分。
HTTP/2 不再像 HTTP/1.1 里的纯文本形式的报文，而是全面采用了二进制格式，头信息和数据体都是二进制，并且统称为帧（frame）：头信息帧和数据帧。这样虽然对人不友好，但是对计算机非常友好，因为计算机只懂二进制，那么收到报文后，无需再将明文的报文转成二进制，而是直接解析二进制报文，这增加了数据传输的效率。

HTTP/2 的数据包不是按顺序发送的，同一个连接里面连续的数据包，可能属于不同的回应。因此，必须要对数据包做标记，指出它属于哪个回应。每个请求或回应的所有数据包，称为一个数据流（ Stream ）。每个数据流都标记着一个独一无二的编号，其中规定客户端发出的数据流编号为奇数， 服务器发出的数据流编号为偶数。客户端还可以指定数据流的优先级。优先级高的请求，服务器就先响应该请求。
HTTP/2 还在一定程度上改善了传统的「请求 - 应答」工作模式，服务不再是被动地响应，也可以主动向客户端发送消息。举例来说，在浏览器刚请求 HTML 的时候，就提前把可能会用到的 JS、CSS 文件等静态资源主动发给客户端，减少延时的等待，也就是服务器推送。

# 1.5 HTTP/3
HTTP/2 主要的问题在于，多个 HTTP 请求在复用一个 TCP 连接，下层的 TCP 协议是不知道有多少个 HTTP 请求的。
所以一旦发生了丢包现象，就会触发 TCP 的重传机制，这样在一个 TCP 连接中的所有的 HTTP 请求都必须等待这个丢了的包被重传回来。
所以 HTTP/3 把 HTTP 下层的 TCP 协议改成了 UDP。
因为：
基于 TCP 开发的设备和协议非常多，兼容困难
TCP 协议栈是 Linux 内部的重要部分，修改和升级成本很大

UDP 本身是无连接的、没有建链和拆链成本
UDP 的数据包无队头阻塞问题
UDP 改造成本小


