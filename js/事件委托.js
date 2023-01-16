// 适用于给动态绑定元素的一系列事件操作

// <EM></EM>标签是动态的，当EM被点击的时候，执行clearHandle()函数
upload_list.addEventListener('click', function (ev) {
    let target = ev.target;
    if (target.tagName === "EM") {
        // 点击的是移除按钮
        clearHandle();
    }
});