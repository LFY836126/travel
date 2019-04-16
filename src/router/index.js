import VueRouter from 'vue-router'
import Home from '../pages/home/Home.vue'
import City from '../pages/city/City.vue'
import Detail from '../pages/detail/Detail.vue'
export default new VueRouter({
    routes:[
        {path:'/', component:Home},
        {path:'/city', component:City},
        {path:'/detail/:id', component:Detail},
    ],
    // 每次进行路由切换的时候，我都先进入显示的页面x轴初始位置为0， y初始位置也为0
    scrollBehavior(to , from , savedPosition){
        return{x : 0, y : 0};
    }
})