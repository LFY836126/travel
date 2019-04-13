<template>
    <div>
          <div class="recommend-title">热门推荐</div>
          <ul>
              <li class="item border-bottom" v-for="item in recommendList" :key="item.id">
                  <img  class="item-img" :src="item.imgUrl">
                  <div class="item-info">
                      <p class="item-title">{{item.title}}</p>
                      <p class="item-desc">{{item.desc}}</p>
                      <button class="item-button">查看详情</button>
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
                {id:'0001', imgUrl:'http://img1.qunarzz.com/sight/p0/1805/17/179163260bf3597aa3.img.jpg_200x200_95a1caac.jpg',title:'太阳岛', desc:'位于城市中心的江漫滩湿地草原fdaskhkjahndakkjfsdajhkakfsnfsa型风景名胜区'},
                {id:'0002', imgUrl:'http://img1.qunarzz.com/sight/p0/1805/17/179163260bf3597aa3.img.jpg_200x200_95a1caac.jpg',title:'太阳岛', desc:'位于城市中心的江漫滩湿地草原fdaskhkjahndakkjfsdajhkakfsnfsa型风景名胜区'},
                {id:'0003', imgUrl:'http://img1.qunarzz.com/sight/p0/1805/17/179163260bf3597aa3.img.jpg_200x200_95a1caac.jpg',title:'太阳岛', desc:'位于城市中心的江漫滩湿地草原fdaskhkjahndakkjfsdajhkakfsnfsa型风景名胜区'}
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
    .item
        overflow:hidden
        display:flex
        height:1.9rem
        .item-img
            height:1.7rem
            width:1.7rem
            padding:.1rem
        .item-info
            flex: 1
            // 设置溢出打点显示，这里设置一个min-width才生效
            min-width:0
            padding:.1rem
            .item-title
                line-height:.54rem
                font-size:.32rem
            .item-desc
                line-height: .4rem
                color:#ccc
                ellipsis()
            .item-button
                line-height:.44rem
                margin-top:.16rem
                background:#ff9300
                padding:0 .2rem
                border-radius: .06rem
                colorr:#fff
</style>