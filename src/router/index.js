import VueRouter from 'vue-router'
import Home from '../pages/home/Home.vue'
import City from '../pages/city/City.vue'
import Detail from '../pages/detail/Detail.vue'
export default new VueRouter({
    routes:[
        {path:'/', component:Home},
        {path:'/city', component:City},
        {path:'/detail/:id', component:Detail}
    ]
})