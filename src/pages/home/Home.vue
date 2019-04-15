<template>
    <div>
        <!-- 父子组件之间的传递 -->
        <homeHeader></homeHeader>
        <homeSwiper :list="swiperList"></homeSwiper>
        <homeIcons :list="iconList"></homeIcons>
        <homeRecommend :list="recommendList"></homeRecommend>
        <homeWeekend :list="weekendList"></homeWeekend>
    </div>
</template>
<script>
import homeHeader from './components/Header.vue'
import homeSwiper from './components/Swiper.vue'
import homeIcons from './components/Icons.vue'
import homeRecommend from './components/Recommend.vue'
import homeWeekend from './components/Weekend.vue'
import axios from 'axios'
import { mapState } from 'vuex'
export default{
    components:{
        homeHeader,
        homeSwiper,
        homeIcons,
        homeRecommend,
        homeWeekend
    },
    data (){
        return {
            // city:'',
            swiperList:[],
            iconList:[],
            recommendList:[],
            weekendList:[],
            lastCity: '',
        }
    },
    mounted (){
        // 当页面挂载好了再执行
        this.getHomeInfo()
        this.lastCity = this.city
    },
    // 当页面重新显示的时候触发这个方法
    activated(){
        if(this.lastCity !=this.city){
            this.lastCity = this.city
            this.getHomeInfo();
        }
    },
    computed :{
        ...mapState(['city']) 
    },
    methods:{   
        getHomeInfo(){
            // 利用axios.get请求url，返回一个promise对象，所以可以then()
            axios.get('/api/index.json?city=' + this.city).then(this.getHomeInfoSucc)
        },
        getHomeInfoSucc(res){
            res = res.data;
            // 如果正确返回了结果，并且结果中有实际内容的话 
            if(res.ret && res.data){
                const data = res.data;
                // this.city = data.city;
                this.swiperList = data.swiperList;
                this.iconList = data.iconList;
                this.recommendList = data.recommendList;
                this.weekendList = data.weekendList;
            }
        }
    }
}
</script>
<style>
    
</style>