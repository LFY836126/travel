<template>
    <div>
        <div class="banner" @click="handleBannerClick">
            <img :src="bannerImg" class="banner-img">
            <div class="banner-info">
                <div class="banner-title">{{this.sightName}}</div>
                <div class="banner-number">
                    <span class="iconfont banner-icon">&#xe692;</span>
                    {{this.bannerImgs.length}}
                </div>
            </div>
        </div>
        <!-- :imgs：  传递给子组件的值 -->
        <!-- @close:   接受子组件传递的值-->
        <commonGallary v-show="showGallary" :imgs="bannerImgs" @close="handleGallaryClose"></commonGallary>
    </div>
</template>
<script>
import commonGallary from 'common/gallary/Gallary.vue'
export default {
    props:{
        sightName: String,
        bannerImg: String,
        bannerImgs: Array
    },
    data(){
        return {
            showGallary:false,
        }
    },
    components:{
        commonGallary,
    },
    methods:{
        handleBannerClick(){
            this.showGallary = true;
        },
        handleGallaryClose(){
            this.showGallary = false;
        }
    }
}
</script>
<style lang="stylus" scoped>
    // 防止抖动
    .banner
        position: relative
        overflow:hidden
        height: 0
        padding-bottom: 55%
        .banner-img
            width:100%
        .banner-info
            position: absolute
            display:flex
            left:0
            right:0
            bottom:0
            line-height:.6rem
            color:#fff
            // 背景图片底部渐变效果
            background-image:linear-gradient(top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8))
            .banner-title
                flex: 1
                font-size:.32rem
                padding:0 .2rem
            .banner-number
                margin-top:.14rem
                padding:0 .4em
                line-height:.32rem
                height:.32rem
                border-radius:.2rem
                background:rgb(0, 0, 0, .8)
                font-size:.3rem
                .banner-icon
                    font-size:.3rem
</style>