<template>
    <ul class="list">
        <!-- 遍历对象 -->
        <li class="item" v-for="item of letters" :key="item" 
        @touchstart="handleTouchStart"
        @touchmove="handleTouchMove"
        @touchend="handleTouchEnd"
        @click="handleLetterClick"
        :ref="item"
        >{{item}}</li>
    </ul>
</template>
<script>
export default {
    data(){
        return {
            touchStatus:false
        }
    },
    // 接受父组件的值
    props:{
        cities:Object,
    },
    computed:{
        letters(){
            const letters = [];
            for(let i in this.cities){
                letters.push(i);
            }
            return letters//['A', 'B', 'C',...]
        }
    },
    methods:{
        handleLetterClick(e){
            // 向父组件传值
            this.$emit('change',e.target.innerText);
        },
        handleTouchStart(){
            // 设置一个开关，当触发touchstart之后再触发touchmove中的内容
            this.touchStatus = true;
        },
        handleTouchMove(e){
            // 当滑动时，计算当前是哪个元素，然后定位到该元素对应的所有城市上
            //计算当前元素：利用当前位置距离A字母的距离，然后除以每个字母的高度，计算出中间隔了多少个字母，进而计算出当前元素
            if(this.touchStatus){
                // 通过this.$refs[this.letter]获取到这个字母所对应的class="area"这样的一个区域,但是返回的是一个数组，我们在这里加一个0就能获取到dom元素了;
                //offsetTop是指A这个字母距离顶部绿色边下沿的距离
                const startY = this.$refs['A'][0].offsetTop;
                //e.touches是个数组，里面存有好多内容，只有e.touches[0]是对应的dom元素
                //touches[0].clientY是指手指触碰的位置距离页面顶部的位置
                const touchY = e.touches[0].clientY - 79//79是绿色背景所占宽度
                const index = Math.floor((touchY- startY)/20)   //20是指每个字母的高度
                // console.log(index);
                if(index >= 0 && index <= this.letters.length){
                    // 传递给父组件进而传递给List组件，实现当拖动时，城市随着字母显示
                    this.$emit('change' , this.letters[index])
                }
            }
        },
        handleTouchEnd(){
            this.touchStatus = false;
        }
    }
}
</script>
<style lang="stylus" scoped>
    @import '~styles/varibles.styl'
     .list
        //以下三行设置字母竖直方向上居中
        display:flex
        flex-direction:column
        justify-content:center
        position:absolute
        top:1.58rem
        right:0
        bottom:0
        width:.4rem
        // background-color:red 
        // 设置字母水平居中
        .item
            text-align:center
            line-height:.4rem
            color:$bgColor
</style>