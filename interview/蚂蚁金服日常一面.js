// 六道算法题

// 版本比较
// 第K和第M最大数之和
// 数组扁平化
let arr = [1, [2, 3], [4], [[5]]]
function myFlat(arr) {
  let res = []
  const fn = (arr) => {
    for (let i = 0; i < arr.length; i++) {
      if (Array.isArray(arr[i])) {
        fn(arr[i]);
        continue
      } else res.push(arr[i])

    }
  }
  fn(arr)
  return res
}
function ff(arr){
  console.log(arr.toString().split(","));
  return arr.toString().split(",").map(item => parseFloat(item))
}
console.log(ff(arr));


// 数组转树
// 大数相加
// 二叉树公共祖先

// 讲讲部署

// 讲讲 git 分支, git 回滚 (git checkout; git log; git reset;)

// Vue生态很成熟，了解过 Vue-Echarts吗？(没有)

// 我在下面修改报表，上面实时刷新怎么做？(编辑完重新调接口？？！)

// 发生错的日志，会怎么办？(后端try ... catch 捕获 error )

// 别人的组件封装的很好，获取渠道有哪些？(官网，git，)

// 整个系统的安全性考虑过吗？(SQL注入，XSSF攻击，cookie盗取)