<template>
    <div>
        <div class="item" v-for="(item, index) in list" :key="index">
            <div class="item-title">
                <span class="item-title-icon"></span>
                {{item.title}}
            </div>
            <!-- 如果自己下面有子组件的话，就递归循环显示 -->
            <div v-if="item.children" class="item-children">
                <detailList :list="item.children"></detailList>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    // 这个名字很大的一个用处就是我们使用递归组件来使用
    name:'detailList',
    props:{
        list:Array,
    }
}
</script>
<style lang="stylus" scoped>
    .item-title
        line-height:.8rem
        font-size:.32rem
        padding:0 .2rem
        .item-title-icon
            position:relative
            left: 0.06rem 
            top:.06rem
            display:inline-block
            width:.36rem
            height:.36rem
            background :url(http://s.qunarzz.com/piao/image/touch/sight/detail.png) 0 -.45rem no-repeat;
            margin-right: .1rem
            background-size: .4rem 3rem;
    .item-children
        padding:0 .2rem
</style>