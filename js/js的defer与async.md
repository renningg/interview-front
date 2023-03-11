# 如何优化网页加载速度？
  把CSS文件放在页面顶部，把JS文件放在页面底部。因为浏览器的解析规则就是遇到 script 标签，需要等到下载且执行完毕后，再继续解析后面的Html，如果把JS放在 head 里面，网络不佳时，会导致长时间页面白屏。
  因此！！！！浏览器可以通过 defer 与 async 来优化页面加载速度，提升页面性能
// https://blog.csdn.net/mrlmx/article/details/127581208
// https://segmentfault.com/a/1190000042703398
// 1，都是异步加载脚本，不会阻塞HTML

// 2，defer在HTML完成后执行。会按照 HTML 中的相对顺序执行脚本。会阻止 DOMContentLoaded 事件，直到脚本被加载且解析完成。
// 会在脚本下载并执行完成之后，才会触发 DOMContentLoaded 事件。

// 3，async在脚本下载完，立即执行。互相独立，谁先下载完，谁先执行，没有固定的先后顺序，不可控。
// DOMContentLoaded 事件和 script 脚本无相关性，无法确定他们的先后顺序。

# async
不阻塞浏览器解析 HTML，但是 script 下载完成后，会立即中断浏览器解析 HTML，并执行此 script。
会并行下载 JavaScript 资源。
互相独立，谁先下载完，谁先执行，没有固定的先后顺序，不可控。
由于没有确定的执行时机，所以在脚本里面可能会获取不到 HTML 中已有的元素。
DOMContentLoaded 事件和 script 脚本无相关性，无法确定他们的先后顺序。
# defer
不阻塞浏览器解析 HTML，等解析完 HTML 之后，才会执行 script。
会并行下载 JavaScript 资源。
会按照 HTML 中的相对顺序执行脚本。
会在脚本下载并执行完成之后，才会触发 DOMContentLoaded 事件。
在脚本执行过程中，一定可以获取到 HTML 中已有的元素。
# 不同点
  -- (1)  从表现形式上来说，async 的优先级比 defer 高，
            也就是如果同时存在这 2 个属性，那么浏览器将会以 async 的特性去加载此脚本。
  -- (2)  async 适用于：独立的第三方脚本。无法判断DOMContentLoaded的执行顺序 
          defer 属性对模块脚本无效 <script type="module"><script>。适用于：所有外部脚本（通过 src 引用的 script）。会阻塞DOMContentLoaded事件
         