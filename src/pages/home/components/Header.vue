<template>
    <div class="header">
        <div class="header-left">
            <div class="iconfont back-icon">&#xe624;</div>
        </div>
        <div class="header-input">
            <span class="iconfont">&#xe632;</span>
            输入城市/景点/游玩主题
        </div>
        <router-link to="/city">
        <div class="header-right">
            <!-- {{this.$store.state.city}} -->

            <!-- 因为使用了mapState -->
            <!-- {{this.city}} -->
            {{this.doubleCity}}
            <span class="iconfont arrow-icon">&#xe64a;</span>
        </div>
        </router-link>
    </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
export default{
    // 将vuex里面的数据映射到我的组件computed里，也就是vuex中的数据city，在我的计算属性里也有个一样的
    //mapState里面参数可以是一个数组也可以是一个对象
    computed:{
        ...mapState(['city']),
        ...mapGetters(['doubleCity'])
    }
}
</script>
<style lang="stylus" scoped>
    // 将resets.css中将html：font-size设置为50px是有意义的，因为移动端是实际电脑显示的2倍，所以这里的height就直接可以用.86rem(其实不是太懂)
    @import '../../../assets/styles/varibles.styl'
     .header
        line-height:$headerHeight
        display :flex
        background: $bgColor
        color:#fff
        .header-left
            float:left
            width:.6rem
            .back-icon
                text-align:center
                font-size:.4rem
        .header-input
            margin-top:.12rem
            margin-left:.4rem
            margin-right:.2rem
            color:#ccc
            background:#fff
            border-radius:.1rem
            height :.62rem
            padding-left:.2rem
            line-height :.62rem
            flex:1
        .header-right
            color:#fff
            float:right
            min-width:1.04rem
            padding:0 .1rem
            font-size:.27rem
            .arrow-icon
                margin-left:-.04rem
                font-size:.24rem

</style>