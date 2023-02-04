// 遍历，主要就两种方法
// 1，函数里面写个递归函数，传入root，返回result
// 2，利用栈
var preorderTraversal = function (root) {
  let res = [];
  const dfs = function (root) {
    if (root === null) return;
    //先序遍历所以从父节点开始
    res.push(root.val);
    //递归左子树
    dfs(root.left);
    //递归右子树
    dfs(root.right);
  }
  //只使用一个参数 使用闭包进行存储结果
  dfs(root);
  return res;
};


var preorderTraversal = function (root) {
  if (!root) return [];
  let res = [];
  let arr = [root]
  while (arr.length) {
    let node = arr.pop()
    if (!node) return;
    res.push(node.val)
    if (node.right) {
      arr.push(node.right)
    }
    if (node.left) {
      arr.push(node.left)
    }
  }
  return res
};