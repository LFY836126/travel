<template>
    <div class="icons">
        <swiper :options="swiperOption">
            <!-- 二维数组，先循环页数，再循环每页的小图标 -->
            <swiper-slide v-for="(page, index) of pages" :key="index">
                <!-- 循环每页的数据 -->
                <div class="icon" v-for="item in page" :key="item.id">
                    <div class="icon-img">
                        <img  class="icon-img-content" :src="item.imgUrl">
                    </div>
                    <p class="icon-desc">{{item.desc}}</p>
                </div>
            </swiper-slide>
            <div class="swiper-pagination"  slot="pagination"></div>
        </swiper>
    </div>
</template>
<script>
export default {
    props:{
        list:Array,
    },
    data(){
        return {
            // iconList:[
            //     {id:'0001', imgUrl:'http://img1.qunarzz.com/piao/fusion/1803/95/f3dd6c383aeb3b02.png', desc:'景点门票'},
            //     {id:'0002', imgUrl:'http://img1.qunarzz.com/piao/fusion/1804/ff/fdf170ee89594b02.png', desc:'哈尔滨必游'},
            //     {id:'0003', imgUrl:'http://img1.qunarzz.com/piao/fusion/1804/5a/13ceb38dcf262f02.png', desc:'一日游'},
            //     {id:'0004', imgUrl:'http://mp-piao-admincp.qunarzz.com/mp_piao_admin_mp_piao_admin/admin/20193/a40ee278d67000f2a29d2e20f6a029b3.png', desc:'自然风光'},
            //     {id:'0005', imgUrl:'http://img1.qunarzz.com/piao/fusion/1803/ab/6f7d6e44963c9302.png', desc:'泡温泉'},
            //     {id:'0006', imgUrl:'http://img1.qunarzz.com/piao/fusion/1803/f5/a963333e1fa802.png', desc:'当地好玩'},
            //     {id:'0007', imgUrl:'http://img1.qunarzz.com/piao/fusion/1803/76/eb88861d78fb9902.png', desc:'动植物园'},
            //     {id:'0008', imgUrl:'http://img1.qunarzz.com/piao/fusion/1803/50/26ffa31b56646402.png', desc:'亲子游'},
            //     {id:'0009', imgUrl:'http://img1.qunarzz.com/piao/fusion/1803/95/8246f27355943202.png', desc:'游乐园'},
            // ],
            swiperOption:{
                autoplay:false,
                // 实现轮播图下面的圈圈
                pagination:{
                    el : '.swiper-pagination'
                },
            },
        }
    },
    computed:{
        // 将轮播图分页，1-8处于第一页，2-16属于第二页等等
        pages (){
            const pages = [];
            this.list.forEach((item, index) =>{
                const page = Math.floor(index/8);
                if(!pages[page]){
                    pages[page] = [];
                }
                pages[page].push(item);
            })
            return pages
        }
    }  
}
</script>
<style lang="stylus" scoped>
    @import '../../../assets/styles/varibles.styl'
    @import '../../../assets/styles/mixins.styl'
    .icons >>> .swiper-container
        overflow:hidden
        height:0
        padding-bottom:50%
    .icons >>> .swiper-pagination-bullet-active
            background:rgba(0,175,190,.8)!important
    .icons
        margin-top:.1rem
        .icon
            position: relative
            overflow: hidden
            float:left
            // width是相对于父元素的25%
            width:25%
            // padding-bottom比例是指height相对于width比例为1:1，这里不能利用height，因为父元素height为0
            padding-bottom:22%
            // 这里关于图片往下的样式都不是很懂
            .icon-img
                position:absolute
                left:0
                top:0
                right:0
                bottom:.44rem
                box-sizing:border-box
                padding:.1rem
                .icon-img-content
                    display:block
                    margin:0 auto 
                    height:100%
            .icon-desc
                position:absolute
                left:0
                right:0
                bottom:0
                height:.4rem
                text-align:center
                // 将多余文本成.显示样式封装为一个单独的文件，然后再css头部引入文件,@import '../../../assets/styles/mixins.styl'
                ellipsis()
</style>