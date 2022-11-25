// const data = [
//     { id: '01', name: '张大大', pid: '', job: '项目经理' },
//     { id: '02', name: '小亮', pid: '01', job: '产品leader' },
//     { id: '03', name: '小美', pid: '01', job: 'UIleader' },
//     { id: '04', name: '老马', pid: '01', job: '技术leader' },
//     { id: '05', name: '老王', pid: '01', job: '测试leader' },
//     { id: '06', name: '老李', pid: '01', job: '运维leader' },
//     { id: '07', name: '小丽', pid: '02', job: '产品经理' },
//     { id: '08', name: '大光', pid: '02', job: '产品经理' },
//     { id: '09', name: '小高', pid: '03', job: 'UI设计师' },
//     { id: '10', name: '小刘', pid: '04', job: '前端工程师' },
//     { id: '11', name: '小华', pid: '04', job: '后端工程师' },
//     { id: '12', name: '小李', pid: '04', job: '后端工程师' },
//     { id: '13', name: '小赵', pid: '05', job: '测试工程师' },
//     { id: '14', name: '小强', pid: '05', job: '测试工程师' },
//     { id: '15', name: '小涛', pid: '06', job: '运维工程师' }
//   ]
// 转换为
// [{
//   label: '张大大',
//   children: [
//     {
//       label: '小亮',
//       children: [{label: '小丽'}，{label: '大光'}]
//     },
//     {
//       label: '小美',
//       children: [{label: '小高'}]
//     },
//     {
//       label: '老马',
//       children: [{label: '小刘'}，{label: '小华'},{label: '小李'}]
//     },
//     {
//       label: '老王',
//       children: [{label: '小赵'}，{label: '小强'}]
//     },
//     {
//       label: '老李',
//       children: [{label: '小涛'}]
//     }
//   ]
// }]
const data = [
    { id: '01', name: '张大大', pid: '', job: '项目经理' },
    { id: '02', name: '小亮', pid: '01', job: '产品leader' },
    { id: '03', name: '小美', pid: '01', job: 'UIleader' },
    { id: '04', name: '老马', pid: '01', job: '技术leader' },
    { id: '05', name: '老王', pid: '01', job: '测试leader' },
    { id: '06', name: '老李', pid: '01', job: '运维leader' },
    { id: '07', name: '小丽', pid: '02', job: '产品经理' },
    { id: '08', name: '大光', pid: '02', job: '产品经理' },
    { id: '09', name: '小高', pid: '03', job: 'UI设计师' },
    { id: '10', name: '小刘', pid: '04', job: '前端工程师' },
    { id: '11', name: '小华', pid: '04', job: '后端工程师' },
    { id: '12', name: '小李', pid: '04', job: '后端工程师' },
    { id: '13', name: '小赵', pid: '05', job: '测试工程师' },
    { id: '14', name: '小强', pid: '05', job: '测试工程师' },
    { id: '15', name: '小涛', pid: '06', job: '运维工程师' }
]

function test(data) {
    let tree = []
    let map = {}
    data.forEach(item=>{
        map[item.id] = item
    })
    data.forEach(item=>{
        let parent = map[item.pid]
        delete item.pid
        item['label'] = item.name
        delete item.name
        if(parent){
            parent.children = parent.children || (parent.children = [])
            parent.children.push(item)
        }else tree.push(item)
    })
    return tree
}

function arrToTree(data) {
    let tree = []
    // if (!Array.isArray(data)) {
    //     return tree
    // }
    // 将数组转换成对象（键值对），将ID作为属性名，原来的数组里的对象作为属性值
    let map = {}
    data.forEach(item => {
        map[item.id] = item
    })
    // 通过对象的属性名（ID）来找到父级节点，将存到map里的对象取出来放到父级节点的childere数组中
    data.forEach(item => {
        let parent = map[item.pid]
        // 修改对象的属性
        delete item.pid
        item['label'] = item.name
        delete item.name
        if (parent) {
            (parent.children || (parent.children = [])).push(item)
        } else {
            tree.push(item)
        }
    })
    return tree
}

const tree = test(data)
console.log(tree)
