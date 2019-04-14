##轮播图问题
1. 每次刷新页面，总是默认显示最后一张图片
    + 原因：因为每当加载页面时，home.vue都会发送ajax请求，当ajax没有请求回数据的时候swiper.vue中的list是一个空数组，所以会出现这样的问题
    + 解决：
    `<swiper :options="swiperOption" v-if="list.length">`
    设置v-if,当没有数据的时候轮播图不显示，当ajax请求回数据的时候，再显示轮播图
    + 改进
    ```
    <swiper :options="swiperOption" v-if="showSwiper">
    
    computed:{
        showSwiper(){
            return this.list.length
        }
    }
    ```