activated
类型：function

触发时机：keep-alive组件激活时使用；

deactivated
类型：function

触发时机：keep-alive组件停用时调用；

< keep-alive > 标签，可以把内部的组件进行缓存，而不是销毁组件；
默认情况下，切换动态组件时无法保持组件的状态，此时可以使用 vue 内置的 < keep-alive > 标签保持动态组件的状态；
< keep-alive > 的生命周期；重点来了！！！
当组件被 “激活” 时，会自动触发组件的 activated 生命周期函数；
当组件被 “缓存” 时，也就是该组件停用时，会自动触发组件的 deactivated 生命周期函数；



activated与deactivated
先说下这个生命周期钩子，官网说其是在服务器端渲染期间不被调用，其实说白了就是在挂载后和更新前被调用的；

但如果该组件中没有使用缓存，也就是没有被 < keep-alive > 包裹的话，activated是不起作用的：
//template中
<template>
	// 被包裹在<keep-alive>组件中
	<keep-alive>
		<component is="component1"></component>
	</keep-alive>
	//外面没有<keep-alive>组件包裹
	<component is="component2"></component>
</template>

//component1中
  created() {
    console.log("1激活created钩子函数");
  },
  activated() {
    console.log("1激活activated钩子函数");
  },
  mounted() {
    console.log("1激活mounted钩子函数");
  }

//component2中
  created() {
    console.log("2激活created钩子函数");
  },
  activated() {
    console.log("2激活activated钩子函数");
  },
  mounted() {
    console.log("2激活mounted钩子函数");
  }
