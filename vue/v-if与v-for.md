Vue.js里面，v-if 与 v-for不能同时使用

原因：
1，v-for优先级更高
2，性能浪费

解决方案：
1，把v-if写在外层dom元素
<div v-if = "false">
    <div v-for="(item, index) in list">
    {{item}}
    </div>
</div>

2，把v-if写在外层template元素
<template v-if = "false">
    <div v-for="(item, index) in list">
    {{item}}
    </div>
</template>