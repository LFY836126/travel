<template>
    <div>
        <detailBanner :sightName="sightName" :bannerImg="bannerImg" :bannerImgs="gallaryImgs"></detailBanner>
        <detailHeader></detailHeader>
        <div class="content">
            <detailList :list="list"></detailList>
        </div>
    </div>
</template>
<script>
import detailBanner from './components/Banner.vue'
import detailHeader from './components/Header.vue'
import detailList from './components/List.vue'
import axios from 'axios'
export default {
    name:'Detail',
    components:{
        detailBanner,
        detailHeader,
        detailList
    },
    data(){
        return{
            sightName: '',
            bannerImg: '',
            gallaryImgs: [],
            // categoryList: '',
            list: [],
        }
    },
    methods:{
        getDetailInfo(){
            // axios.get('/api/detail.json?id='+ this.$route.params.id );
            // 下面这个等价于上面这句话
            axios.get('/api/detail.json',{
                params:{
                    id:this.$route.params.id
                }
            // 当ajax获取到数据就调用handleGetDataSucc函数
            }).then(this.handleGetDataSucc);
        },
        handleGetDataSucc(res){
            // (res.data下面存储了返回数据中大部分信息)
            res = res.data
            // 如果获取回来的数据不为空
            if(res.ret && res.data){
                const data = res.data;
                // console.log(data);
                this.sightName = data.sightName;
                this.bannerImg = data.bannerImg;
                this.gallaryImgs = data.gallaryImgs;
                this.list = data.categoryList;
            }
        }
    },
    mounted(){
        this.getDetailInfo();
    },
}
</script>
<style lang="stylus" scoped>
    .content
        height:50rem
</style>