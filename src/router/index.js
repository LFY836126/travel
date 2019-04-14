import VueRouter from 'vue-router'
import Home from '../pages/home/Home.vue'
import City from '../pages/city/City.vue'
export default new VueRouter({
    routes:[
        {path:'/', component:Home},
        {path:'/city', component:City},
    ]
})