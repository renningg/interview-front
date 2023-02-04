// https://segmentfault.com/a/1190000042703398
// 1，都是异步加载脚本，不会阻塞HTML

// 2，defer在HTML完成后执行。会按照 HTML 中的相对顺序执行脚本。
// 会在脚本下载并执行完成之后，才会触发 DOMContentLoaded 事件。

// 3，async在脚本下载完，立即执行。互相独立，谁先下载完，谁先执行，没有固定的先后顺序，不可控。
// DOMContentLoaded 事件和 script 脚本无相关性，无法确定他们的先后顺序。