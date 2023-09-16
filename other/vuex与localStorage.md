vuex和 localStorage 区别
最重要的区别：vuex 中的数据是存储在内存中的，页面刷新就会丢失；而 localstorage 则是存储在计算机本地，刷新并不会丢失

应用场景：vuex用于组件之间的传值,（响应式的），localstorage则主要用于不同页面之间的传值（其他页面更新数据了，当前页面要刷新才能相应更新，非响应式的）

主要的区别就是比如购物车结算时，用vuex 是不能修改价格的，如果用localstorage，客户端是可以手动修改价结算价的。这就是内存存储和物理存储的厉害 之处

（1）从存储的位置来说，Vuex 用的是内存，而 Storage 用的是文件存储；
（2）从易失性来说，Vuex与页面的生存周期相同（如关闭页面、刷新等数据就会消失），而 localStorage是“永久”存储的，sessionStorage 生存于应用会话期间，关闭浏览器才会丢失数据，刷新当前页面还存在；
（3）从存储空间来看，Vuex取决于可用内存和浏览器的限制，Storage 都有个默认的大小（至少5MB，由浏览器决定），超出大小则需要用户同意增加空间；
（4）从共享来看，Vuex无法跨标签页、跨物理页面共享，则Storage则可以在同一域名底下共享；
（5）从用途来看，Vuex是用于管理页面内容及组件的状态，而Storage主要是用于存储数据；
（6）Storage是由浏览器提供的基础设施，而Vuex则是由JavaScript程序库提供的服务。

1. Cookie：在不同浏览器中，每个 cookie 的大小都有限制，一般在 4KB 左右，Safari 除外，它允许单个 cookie 达到 7KB。此外，每个域名下的 cookie 数量也有限制，不同浏览器的具体数量不同，一般在 20 到 50 个之间。

2. sessionStorage：在不同浏览器中，sessionStorage 的大小限制也有所不同。一般来说，非移动设备的浏览器支持的大小为 5MB 到 10MB 之间，而移动设备的浏览器大小限制则更小，一般为 2MB 到 5MB 之间。

3. localStorage：localStorage 的大小限制与 sessionStorage 差不多，每个域名下的 localStorage 数据总量一般为 5MB 到 10MB 左右。但是在 Safari 浏览器中，localStorage 的大小限制是 25MB，是其他浏览器大小限制的两倍。

