import Vue from 'vue'
import VueRouter from 'vue-router'
import router from './router/index.js'
import App from './App.vue'
// 这三行引入轮播图插件
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper)

Vue.use(VueRouter)
// 解决 移动端click点击300ms延迟的问题 1.引入 2.fastClick.attach(document.body)
import fastClick from 'fastclick'
// 方便为元素添加样式
import './assets/styles/reset.css'
// 解决1像素边框的问题，防止在不同设备显示像素不同
import './assets/styles/border.css'
// 导入图标,解决导入失败：配置webpack,ttf等文件使用file-loader
import './assets/styles/iconfont.css'
fastClick.attach(document.body)
var vm = new Vue({
	el:'#app',
	render: c => c(App),
	router,
})