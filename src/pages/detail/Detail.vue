<template>
    <div>
        <detailBanner></detailBanner>
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
export default {
    components:{
        detailBanner,
        detailHeader,
        detailList
    },
    data(){
        return{
            list:[
            {
                title: '成人票',
                children:[
                    {   
                        title:'成人三人票',
                        children:[
                            {title:'成人三人A连锁票'},
                            {title:'成人三人B连锁票'},
                        ]
                    },
                    {title:'成人四人票'},
                ],
            },
            {title: '学生票'},
            {title: '儿童票'},
            {title: '特惠票'},
            ]
        }
    }
}
</script>
<style lang="stylus" scoped>
    .content
        height:50rem
</style>