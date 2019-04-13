<template>
    <div class="wrapper">
        <!-- 插槽的形式 -->
        <swiper :options="swiperOption">
            <!-- slides -->
            <swiper-slide v-for="item of swiperList" :key="item.id">
                <img class="swiper-img" :src="item.url">
            </swiper-slide>
            <div class="swiper-pagination"  slot="pagination"></div>
        </swiper>
  </div>
</template>
<script>
export default {
    name:'HomeSwiper',
    data (){
        return{
            swiperOption:{
                // 实现轮播图下面的圈圈
                pagination:{
                    el : '.swiper-pagination'
                },
                // 让轮播图支持循环轮播，就是第一页往前还能翻
                loop:true
            },
            // 将轮播图放进数组中，遍历数组实现轮播图
            swiperList:[
                {id:'0001', url:'//img1.qunarzz.com/vc/80/80/1a/72b8f423c33e581ca72fc136da.jpg'},
                {id:'0002', url:'//img1.qunarzz.com/vc/bf/9d/a3/67b7b37511fa26a78298bf1da1.jpg'},
                {id:'0003', url:'//img1.qunarzz.com/vc/5a/8f/69/16cbf52c43d04f6940a6786679.jpg'}
            ]
        }
    }
}
</script>
<style lang="stylus" scoped>
// .swiper-pagination-bullet-active这个类名并不是我们swiper自己组件身上的，所以由于scoped导致我们并不能直接改变它，但是我们可以通过.wrapper >>> 来改变，这个这个意思为只要是wrapper下使用了.swiper-pagination-bullet-active，我们通过>>> （穿透）就能改变
    .wrapper >>> .swiper-pagination-bullet-active
            background:#fff!important
    .wrapper
        // 它的高度相对于它的宽度会自动撑开31.25%，这样就保存了图片的比例，一下这四行就是设置了图片保留原比例，而且防抖动（当图片未加载，下面内容先加载占据图片原本位置，当图片加载完恢复正常布局）
        overflow:hidden
        width:100%
        height:0
        padding-bottom:30.4%
        // 当图片未加载显示灰色背景
        background：#ccc
        .swiper-img
            width:100%
</style>