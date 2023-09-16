
// 定义树节点
class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

// 构造一个树
let root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
root.left.right = new TreeNode(5);
// 递归遍历每个节点
function TreeMap(root) {
  if (!root || !root.next) return;
  console.log(root.value);
  TreeMap(root.left);
  TreeMap(root.right);
}
// 非递归遍历
function test(root) {
  let p = root;
  let arr = [];
  while (p || arr.length != 0) {
    if (p) {
      arr.push(p)
      console.log(p.value);
      p = p.left;
    } else {
      const q = arr.pop();
      p = q.right;
    }
  }

}

// 
// TreeMap(root)
test(root)

function cengXu(tree) {
  let res = [];
  const dfs = (node, deep) => {
    if (!node) return;
    if (res.length === deep) res.push([])
    res[deep].push(node.val)
    dfs(node.left, deep + 1)
    dfs(node.right, deep + 1)
  }
  return res;
}
