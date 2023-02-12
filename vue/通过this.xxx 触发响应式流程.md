# 代理 $data 数据
 Vue 做了一层代理，实际上还是访问的 this.$data.xxx 来获取属性的值的，因此我们可以通过 Object.defineProperty 来做代理，代理的对象是 this，如果用户想访问 this.xxx ，那么就通过 get 方法 return this.$data.xxx 来解决代理。

# 注意
这里不需要递归代理每一个数据，因为我们只要代理第一层数据，让代码能访问到第一层的数据即可。
比如访问 this.a.b ，因为 this 对象下并没有 a 属性，所以要代理，代理后能访问到 this.a ，因为对象 a 中本来就有 b 属性，所以不进行代理还是能获取到的。

实现的思路就是获取到 vm.$data 后遍历每个 key 后进行代理处理，代码如下：

<script>
  function proxyData(vm) {
  // 代理$data，能通过this.xxx直接访问属性
  const $data = vm.$data;
  for (let key in $data) {
    Object.defineProperty(vm, key, {
      get() {
        return $data[key];
      },
      set(newVal) {
        $data[key] = newVal;
      }
    })
  }
}

</script>