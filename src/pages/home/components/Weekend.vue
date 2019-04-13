<template>
    <div>
          <div class="recommend-title">周末去哪儿</div>
          <ul>
                <li class="item border-bottom" v-for="item in recommendList" :key="item.id">
                <div class="item-img-wrapper">
                    <img  class="item-img" :src="item.imgUrl">
                </div>
                <div class="item-info">
                    <p class="item-title">{{item.title}}</p>
                    <p class="item-desc">{{item.desc}}</p>
                </div>
              </li>
          </ul>
    </div>
</template>
<script>
export default {
    data (){
        return {
            recommendList:[
                {id:'0001', imgUrl:'http://img1.qunarzz.com/sight/source/1505/e3/e9761259adfc1d.jpg_r_640x214_21b96532.jpg',title:'太阳岛', desc:'位于城市中心的江漫滩湿地草原fdaskhkjahndakkjfsdajhkakfsnfsa型风景名胜区'},
                {id:'0002', imgUrl:'http://img1.qunarzz.com/sight/source/1505/e3/e9761259adfc1d.jpg_r_640x214_21b96532.jpg',title:'太阳岛', desc:'位于城市中心的江漫滩湿地草原fdaskhkjahndakkjfsdajhkakfsnfsa型风景名胜区'},
                {id:'0003', imgUrl:'http://img1.qunarzz.com/sight/source/1505/e3/e9761259adfc1d.jpg_r_640x214_21b96532.jpg',title:'太阳岛', desc:'位于城市中心的江漫滩湿地草原fdaskhkjahndakkjfsdajhkakfsnfsa型风景名胜区'}
            ]
        }
    }
}
</script>
<style lang="stylus" scoped>
    @import '../../../assets/styles/mixins.styl'
    .recommend-title
        margint-top:.2rem
        line-height:.8rem
        background: #eee
        text-indent:.2rem
    
    .item-img-wrapper
        overflow:hidden
        height:0
        padding-bottom:33.9%
    .item-img
        width:100%
    .item-info
        padding:.1rem
        .item-title
            line-height:.54rem
            font-size:.32rem
        .item-desc
            line-height: .4rem
            color:#ccc
            ellipsis()
</style>