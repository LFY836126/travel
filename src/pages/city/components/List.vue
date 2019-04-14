<template>
    <!-- ref可以帮助我们获取dom -->
    <div class="list" ref="wrapper">
        <div>
            <div class="area">
                <div class="title border-topbottom">当前城市</div>
                <div class="button-list">
                    <div class="button-wrapper">
                        <div class="button">
                            北京
                        </div>
                    </div>
                </div>
            </div>
            <div class="area">
                <div class="title border-topbottom">热门城市</div>
                <div class="button-list">
                    <!-- 注意这里是循环button-wrapper -->
                    <div class="button-wrapper" v-for="item of hot" :key="item.id">
                        <div class="button">
                            {{item.name}}
                        </div>
                    </div>
                </div>
            </div>
            <div class="area" v-for="(item, key) of cities" :key="key" :ref="key">
                <div class="title border-topbottom">{{key}}</div>
                <div class="item-list">
                    <div class="item border-bottom" v-for="innerItem of item" :key="innerItem.id">{{innerItem.name}}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Bscroll from 'better-scroll'
export default {
    props:{
        cities:Object,
        hot:Array,
        letter:String,
    },
    // 页面挂载完之后执行
    mounted () {
        // setTimeout(() => {
            this.scroll = new Bscroll(this.$refs.wrapper);
        // }, 20)
    },
    // 监听letter
    watch: {
        letter(){
            // console.log(this.letter);
            if(this.letter){
                // 通过this.$refs[this.letter]获取到这个字母所对应的class="area"这样的一个区域,但是返回的是一个数组，我们在这里加一个0就能获取到dom元素了;
                const element = this.$refs[this.letter][0];
                // 利用this.scroll.srcllToElement(element);定位到element所对应的区域，其中element必须是一个dom元素或者dom选择器
                this.scroll.scrollToElement(element);
                // console.log(element);
            }
        }
    }
}
</script>
<style lang="stylus" scoped>
    // 控制边框颜色为#777，这里这个border-topbottom不是很懂，什么after和before等等
    .border-topbottom
        &:before
            border-color:#777
        &:after
            border-color:#777
    .border-bottom
        &:before
            border-color:#777
    // 这里的list添加我也不知道有什么卵用
    .list
        overflow:hidden
        position:absolute
        top:1.58rem
        left:0
        right:0
        bottom:0
        .title
            line-height:.54rem
            background:#eee
            padding-left:.2rem
            color:#666
            font-size:.26rem
        .button-list
            padding:.1rem .6rem .1rem .1rem
            // 子级使用float，得让父级触发bfc，能包住子级
            overflow:hidden
            .button-wrapper
                float:left
                width:33.33%
                .button
                    margin:.1rem
                    padding:.1rem 0 
                    text-align:center
                    border:.02rem solid #ccc
                    border-radius:.06rem
        .item-list
            .item
                line-height:.54rem
                // color:#666
                padding-left:.2rem
</style>