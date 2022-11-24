vue动态加载组件

作用:
    通过 component 的 is 属性来切换不同的组件

知识点：
    <component></component>
    使用</component>将允许您按照名称访问全局和本地组件
    可以动态绑定组件，根据数据的不同，更换不同的组件
    在这种情况下，component更像是一个容器

    :is 属性
        is-bind的缩写
        component标签中的 is 属性决定了当前采用的是哪个组件

例如：有三个组件
    <template>
    <component :is="a"></component>
    <component :is="b"></component>
    <component :is="c"></component>
    </template>
    <script>
    import a from "./a"
    import b from "./b"
    import c from "./c"
    </script>

 
