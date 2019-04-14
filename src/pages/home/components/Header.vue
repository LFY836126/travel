<template>
    <div class="header">
        <div class="header-left">
            <div class="iconfont back-icon">&#xe624;</div>
        </div>
        <div class="header-input">
            <span class="iconfont">&#xe632;</span>
            输入城市/景点/游玩主题
        </div>
        <div class="header-right">
            {{city}}
            <span class="iconfont arrow-icon">&#xe64a;</span>
        </div>
    </div>
</template>
<script>
export default{
    // 接受父组件传递过来的值
    props:{
        city:String
    }
}
</script>
<style lang="stylus" scoped>
    // 将resets.css中将html：font-size设置为50px是有意义的，因为移动端是实际电脑显示的2倍，所以这里的height就直接可以用.86rem(其实不是太懂)
    @import '../../../assets/styles/varibles.styl'
     .header
        line-height:.86rem
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
            margin-right:.6rem
            color:#ccc
            background:#fff
            border-radius:.1rem
            height :.62rem
            padding-left:.2rem
            line-height :.62rem
            flex:1
        .header-right
            float:right
            width:1.2rem
            font-size:.24rem
            .arrow-icon
                margin-left:-.04rem
                font-size:.24rem

</style>