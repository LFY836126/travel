<template>
    <div>
        <router-link class="header-abs" to="/" tag="div" v-show="showAbs">
            <div class="iconfont header-abs-icon">&#xe624;</div>
        </router-link>
        <div class="header-fixed" v-show="!showAbs" :style="opacityStyle">
            <router-link to="/">
                <div class="iconfont header-fixed-back">&#xe624;</div>
            </router-link>
            景点详情
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            showAbs: true,
            opacityStyle : {
                opacity:0
            }
        }
    },
    activated(){
        // 页面展示时候绑定scroll事件
        window.addEventListener('scroll' , this.handleScroll)
        // console.log('aaa');
    },
    deactivated(){
        // 页面隐藏的时候解绑scroll事件
        window.removeEventListener('scroll' , this.handleScroll)
    },
    methods:{
        handleScroll(){
            console.log('aaa');
            // 滚动距离：document.documentElement.scrollTop
            // console.log(document.documentElement.scrollTop);
            const top = document.documentElement.scrollTop
            if(top > 60){
                let opacity = top / 140
                opacity = opacity > 1? 1 : opacity
                this.opacityStyle = {
                    opacity,
                }
                this.showAbs = false;
            }
            else{
                this.showAbs = true;
            }
        }
    }
}
</script>
<style lang="stylus" scoped>
    @import '~styles/varibles.styl'
    .header-abs
        position:absolute
        left:.2rem
        top:.2rem
        width:.7rem
        height:.7rem
        border-radius:.4rem
        background:rgba(0, 0, 0, .8)
        text-align:center
        line-height:.7rem
        .header-abs-icon
            color:#fff
            fonr-size:.4rem
    .header-fixed
        position: fixed
        top:0
        left:0
        right:0
        // overflow:hidden
        height :$headerHeight
        line-height:$headerHeight
        text-align:center
        color:#fff
        background:$bgColor
        font-size:.32rem
        .header-fixed-back
            position: absolute
            top:0
            left:0
            width:.64rem
            text-align:center
            color:#fff
</style>