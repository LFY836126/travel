<template>
	<div>
		<!-- <router-link to="/home">home</router-link> -->
		<!-- keep-alive->vue自带的，意思为：当我的路由内容被加载过一次之后，我就把路由中的内容放到内存之中，下一次再进这个路由的时候，不需要重新渲染这个组件，只需要到内存中把以前的内容拿出来显示到 页面上就可以了-->
		<!-- 注意：当使用keepalive的时候，组件中会多出一个生命周期函数叫做activated -->
		<keep-alive exclude="Detail">
			<router-view></router-view>
		</keep-alive>
	</div>
</template>
<script>
export default{
	name:'App'
}
</script>