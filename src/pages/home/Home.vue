<template>
    <div>
        <homeHeader></homeHeader>
        <homeSwiper></homeSwiper>
        <homeIcons></homeIcons>
        <homeRecommend></homeRecommend>
        <homeWeekend></homeWeekend>
    </div>
</template>
<script>
import homeHeader from './components/Header.vue'
import homeSwiper from './components/Swiper.vue'
import homeIcons from './components/Icons.vue'
import homeRecommend from './components/Recommend.vue'
import homeWeekend from './components/Weekend.vue'
import axios from 'axios'
export default{
    components:{
        homeHeader,
        homeSwiper,
        homeIcons,
        homeRecommend,
        homeWeekend
    },
    // mounted (){
    //     // 当页面挂在好了再执行
    //     this.getHomeInfo()
    // },
    // methods:{
    //     getHomeInfo(){
    //         // 利用axios.get请求url，返回一个promise对象，所以可以then()
    //         axios.get('/static/mock/index.json').then(this.getHomeInfoSucc)
    //     },
    //     getHomeInfoSucc(res){
    //         console.log(res);
    //     }
    // }
}
</script>
<style>
    
</style>