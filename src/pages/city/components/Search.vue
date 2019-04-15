<template>
    <div>
        <div class="search">
            <input class="search-input" type="text" placeholder="输入城市名或拼音" v-model="keyword">
            <!-- 输入字母后，也就是keyword有值时，将输入应该显示的背景输入出来 -->
            <div class="search-content" ref="search" v-show="keyword">
                <ul>
                    <li class="search-item border-bottom" v-for="item of list" :key="item.id" @click="handleCityClick(item.name)">{{item.name}}</li>
                   <!-- 当keyword不存在的时候提示没有数据 -->
                    <li class="search-item border-bottom" v-show="flag">没有匹配到城市</li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import Bscroll from 'better-scroll'
export default {
    props:{
        cities:Object
    },
    data(){
        return {
            keyword:'',
            list:[],
            timer:null,
            flag:0,
        }
    },
    methods:{
        handleCityClick(city){
            // 我需要调用dispatch将数据传给actions，然后actions通过commit调用mutations，完成state中数据的改变
            // this.$store.dispatch('changeCity' , city);
            // this.$store.commit('changeCity' , city);

            // 因为 -> ...mapMutations(['changeCity']),所以这里直接用changeCity就可以
            this.changeCity(city);
            // 跳转到路由为 / 的页面
            this.$router.push('/');
        },
        ...mapMutations(['changeCity'])
    },
    watch: {
        keyword(){
            if(this.timer){
                clearTimeout(this.timer)
            }
            // 如果输入查找字母之后，删除了,让下方显示恢复正常
            if(!this.keyword){
                this.list = [];
                // console.log();
                return;
            }
            // 当keyword改变的时候，这个函数100秒之后再执行
            this.timer = setTimeout(() => {
                const result = [];
                for (let i in this.cities){
                    this.cities[i].forEach((value) =>{
                        if(value.spell.indexOf(this.keyword) > -1 || value.name.indexOf(this.keyword) > -1){
                            result.push(value);
                        }
                    })
                }
                this.list = result;
                if(!result.length){
                    this.flag = 1;
                }
                else{
                    this.flag = 0;
                }
            }, 100)
        }
    },
    // 实现滚动效果
    mounted(){
        this.scroll = new Bscroll(this.$refs.search);
    }
}
</script>
<style lang="stylus" scoped>
    @import '~styles/varibles.styl'
    .search
        height:.72rem
        padding:0 .1rem
        background: $bgColor
        .search-input
            box-sizing:border-box
            // touch-action: none
            padding:0 .1rem
            height:.62rem
            width:100%
            line-height:.62rem
            text-align:center
            border-radius:.06rem
            color:#666
        .search-content
            overflow:hidden
            z-index:1
            position:absolute
            background:#eee
            top:1.58rem
            left:0
            right:0
            bottom:0
            .search-item
                padding-left:.2rem
                line-height:.62rem
                background:#fff
                color:#666
</style>