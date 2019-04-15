<template>
    <div class="container" @click="handleGallaryClick">
        <div class="wrapper">
            <swiper :options="swiperOptions">
                <swiper-slide v-for="(item, index) in imgs" :key="index">
                    <img class="gallary-img" :src="item">
                </swiper-slide>
                <div class="swiper-pagination"  slot="pagination"></div>
            </swiper>
        </div>
    </div>
</template>
<script>
export default {
    // 接受父组件传值
    props:{
        imgs:{
            // img必须是数组类型的，
            type:Array,
            // 给个默认返回值(数组)
            default(){
                return []
            }
        }
    },
    data(){
        return {
            swiperOptions: {
                pagination: {
                    el : '.swiper-pagination',
                    type : 'fraction'
                },
                // 当swiper插件只要监听我这个元素或者父级元素DOM结构的改变，会自动的自我刷新一次，通过刷新就能解决swiper计算宽度的问题
                observer:true,
                observeParents:true,
                // paginationType: 'fraction',
            }
        }
    },
    methods:{
        handleGallaryClick(){
            this.$emit('close');
        }
    }
}
</script>
<style lang="stylus" scoped>
    .container >>> .swiper-container
        overflow:inherit
    .container
        // 以下三行将元素分为两部分
        display:flex
        flex-direction:column
        justify-content:center
        z-index:99
        position:fixed
        left:0
        right:0
        top:0
        bottom:0
        background:#000
        .wrapper
            background  #fff
            // overflow:hidden,因为这个会影响下面分页的位置
            width:100%
            height:0
            padding-bottom:54%
            .gallary-img
                width:100%
            .swiper-pagination
                color:#fff
                bottom:-1rem
</style>