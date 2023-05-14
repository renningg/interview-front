
render 函数用途：
    创建HTML模板

知识点：
    1，render 函数的参数是 createElement 函数
    createElement 返回值是一个虚拟dom，即VNode
    也是要渲染的节点

    2，createElement 有三个参数
        第一个参数。必需，{String | Object | Function}

        第二个参数。可选：{Object}
            HTML标签的各种属性

        第三个参数：可选，{String | Array}
            子虚拟节点（VNode）
            当前HTML标签的子元素
    
    3，渲染过程
        【1】独立构建
            包含模板编译器，HTML字符串 -> render函数 -> VNode -> 真实节点

        【2】运行时构建
            不包含模板编译器，render函数 -> VNode -> 真实节点

<script>
    render(createElement){
        let el = createElement('div',{
            class:"box"
            // 设置style
            style:{color:'red', fontSize:'22'}
        },[
            createElement('h1', '什么是成长')
            createElement('p', '成长或许就是，以更高的格局和视角，观察曾经的自己，和他人，然后并理解曾经的自己')
        ])
        return el
    }

    let vnode = {
    tag: "div",
    attrs: {
        style: "color:red"
    },
    children: [{

    }]
}

    function _render(vnode) {
    // 如果是数字类型, 转化为字符串
    if (typeof vnode === "number") {
        vnode = String(vnode);
    }
    // 字符串类型直接就是文本节点
    if (typeof vnode === "string") {
        return document.createTextNode(vnode);
    }
    // 普通DOM
    const dom = document.createElement(vnode.tag);
    if (vnode.attrs) {
        // 遍历属性
        Object.keys(vnode.attrs).forEach((key) => {
            const value = vnode.attrs[key];
            dom.setAttribute(key, value);
        });
    }
    // 子数组进行递归操作
    vnode.children.forEach((child) => dom.appendChild(_render(child)));
    return dom;
}

</script>
