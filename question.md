
## 手机显示配适
1. 阻止用户手滑放大或缩小页面，需要在public/index.html中添加修改meta元素。
2. 解决：
```
//HTML
<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">
```

## CSS样式统一问题
1. 我们需要重置页面样式，因为在不同的手机浏览器上，默认的css样式不是统一的。
2. 解决：使用reset.css重置所有元素的默认样式

## 一像素边框问题
1. 有的手机分辨率比较高，是2倍屏或3倍屏，手机上的浏览器就会把CSS中的1像素值展示为2个或3个物理宽度
2. 解决： 添加一个border.css库，将利用scroll缩放的原理将边框重置。当我们需要使用一像素边框时只需要在标签上添加对应类名，如设置底部一像素边框就在标签上加入"border-bottom"的class名

##300毫秒点击延迟问题
1. 在移动端开发中，某些机型上使用click事件会延迟300ms才执行，这样影响了用户体验。
2. 解决方法： 引入fastclick.js库
```
（1）安装fastclick
    npm install fastclick --save

（2）在项目中（src/main.js）使用：
    import fastClick from 'fastclick' 
    fastClick.attach(document.body)
```

## 配置并使用stylus
1. 在 src/assets 文件夹下创建styles文件夹。用于公用样式的存放。比如背景色就是一个各个页面都会用到的一个统一的css参数，我们可以在src/assets/styles/varibles.styl中定义 $bgcolor = #00bcd4 ，而后在样式里引入这个styl文件即可
```
//style中的引用
    @import '../../../assets/styles/varibles.styl';
    background-color $bgcolor
//问题：@import文件引入的前缀非常长
//解决：配置别名alias解决此问题
```

## 配置别名
1. 在webpack.base.conf文件中配置
```
// （1） 拼接路径需要的配置
const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src'), resolve('test')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})
module.exports = {
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
        'vue$': 'vue/dist/vue.esm.js',
        '@': resolve('src'),
// （2）拼接路径: 之后再引用src/assets/styles里面的文件就直接可以利用~styles代替
        'styles': resolve('src/assets/styles'),
        'common': resolve('src/common'),
        }
    },
}
```
2. 配置完别名后使用：
```
//例如在style中引用文件：
    @import '~styles/varibles.styl'
```

## 轮播图问题
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
## better-scroll设置滑动
1. 安装包npm i better-scroll -S
2. 符合使用结构，在这里我们将    class="list"下再加一层div
3. 引入`import Bscroll from 'better-scroll'`
4. 创建实例
```
 mounted () {
        // setTimeout(() => {
            this.scroll = new Bscroll(this.$refs.wrapper);
        // }, 20)
    }
```
## v-for到底放在哪层？
## 兄弟组件之间传值(字母表定位)
1. Alphabet.vue组件中，当点击字母时，触发handleLetterClicks事件
`<li class="item" v-for="(item, key) of cities" :key="key" @click="handleLetterClick">{{key}}</li>`
2. 将触发事件的字母传递给父组件(City.vue)
```
handleLetterClick(e){
    // 向父组件传值
    this.$emit('change',e.target.innerText);
}
```
3. 父组件接收来自子组件(Alphabet.vue)的值，利用一个变量保存字母，
```
<cityAlphabet :cities="cities" @change="handleLetterChange"></cityAlphabet>

handleLetterChange(letter){
    // console.log(letter);
    //利用一个变量保存字母
    this.letter=letter;
}
```

4. 将这个letter传递给List子组件
`<cityList :cities="cities" :letter="letter" :hot="hotCities"></cityList>`

## axios获取json数据
1. `import axios from 'axios'`
2.  `axios.get('/api/...').then(...)`
3. 关于api的注意：
```
config目录下的index.js
proxyTable: {
    // 当请求是以api开头的那么进行以下操作
    '/api':{
    // 链接替换为target中的内容
    target:'http://localhost:8080',
    pathRewrite:{
        // 以api开头的替换为/static/mock
        '^/api': '/static/mock'
    }
}
```
## watch和computed区别
1. 自己理解就是watch是监听一个在vue已经存在的数据，computed是监听一个{{data}}中的数据

## 字母表部分的性能优化
1. Alphabet.vue是由City.vue这个文件中的city中的数据渲染的 ，当City.vue  ajax获取数据之后，city{}的值发生变化，Alphabet.vue才会被渲染出来，当向Alphabet.vue传的数据发生变化的时候，Alphabet.vue就会重新渲染，然后updated这个生命周期钩子函数就会被执行
```
// 将startY放在这里避免每次都需要重复计算
updatad(){
    this.startY = this.$refs['A'][0].offsetTop;
},
```
2. 函数节流：当鼠标在字母表上来回移动的时候，这时的touchmove执行频率是非常高的，通过节流限制函数执行频率,提高网页性能
```
//如果正在做这件事情，就让它延迟16毫秒之后再去执行，如果在16毫秒之间，又去做收治的滚动，那么它会将上次的操作清除掉，重新执行这次的操作
if(this.timer){
    clearTimeout(this.timer);
}
this.timer = setTimeout(() => {
    const touchY = e.touches[0].clientY - 79//79是绿色背景所占宽度
    const index = Math.floor((touchY- this.startY)/20)   //20是指每个字母的高度
    // console.log(index);
    if(index >= 0 && index <= this.letters.length){
        // 传递给父组件进而传递给List组件，实现当拖动时，城市随着字母显示
        this.$emit('change' , this.letters[index])
    }
}, 16)
```

## return
```
// 如果输入查找字母之后，删除了,让下方显示恢复正常
//这里的return充当什么角色？不加就不好使
if(!this.keyword){
    this.list = [];
    return;
}
```

## 利用vuex，城市切换
1. 安装vuex， 在main.js中引入`vuex import  store from './store/index.js'`, 在vue实例中挂载，这样每个子组件都可以使用vuex中的数据
2. 当点击城市的时候，改变this.$store.state.city
```
（1）先点击城市，触发handleCityClick(item.name)事件，将城市名传进去
（2）
handleCityClick(city){
    // 我需要调用dispatch将数据传给actions，然后actions通过commit调用mutations，完成state中数据的改变
    this.$store.dispatch('changeCity' , city);
}
```
3. 在index.js中：(导入vuex的文件)
```
actions:{
    changeCity(ctx, city){
        // 第一个参数：上下文ctx，第二个参数我们传递过来的对象
        // action通过commit调用mutations
        ctx.commit('changeCity', city);
    }
},
mutations:{
    changeCity(state, city){
        state.city= city;
    }
}
```
4. 优化
```
//在handleCityClick(city)方法中，直接调用commit

handleCityClick(city){
    this.$store.commit('changeCity' , city);
}

index.js中直接写mutations，不用actions：
mutations:{
    changeCity(state, city){
        state.city= city;
    }
}
```

## 利用路由跳转页面
1. router-link to
2. this.$router.push('/');  // 跳转到路由为 / 的页面

## 刷新后依然是之前更改的城市
1. 利用localStorage
2. 考虑兼容
```
let defaultCity = '上海'
try{
    if(localStorage.city){
        defaultCity = localStorage.city
    }
}catch(e){}

state 部分：
state:{
    city:defaultCity
},

mutations部分:
changeCity(state, city){
    state.city= city;
        try{
            localStorage.city = city;
        }catch(e){
    }
}
```

## mapState, mapMutations
1. 导入：`import { mapState, mapMutations } from 'vuex'`
2. 使用：
```
methods:{
    ...mapMutations(['changeCity'])
}
调用：
// 因为 -> ...mapMutations(['changeCity']),所以这里直接用changeCity就可以
this.changeCity(city);
```
```
computed:{
    ...mapState(['city'])
}

调用： 
<!-- 因为使用了mapState -->
{{this.city}}
```

## getters
1. 使用：
```
// 当我们需要根据state中的数据计算出新的数据的时候，我们就可以借助getters，可以避免数据的冗余
index.js(vuex文件)
    getters:{
        doubleCity(state){
            return state.city + ' ' + state.city
        }
    }
使用vuex中数据的文件，这里是Header.vue
    computed:{
        ...mapState(['city']),
        ...mapGetters(['doubleCity'])
    }
使用：
    {{this.doubleCity}}
```
2. 总结
    + 经过对比，发现 getters 中的方法， 和组件中的过滤器比较类似，因为 过滤器和 getters 都没有修改原数据， 都是把原数据做了一层包装，提供给了 调用者；
    + 其次， getters 也和 computed 比较像， 只要 state 中的数据发生变化了，那么，如果 getters 正好也引用了这个数据，那么 就会立即触发 getters 的重新求值；

## modules
1. 网址：https://vuex.vuejs.org/guide/modules.html
2. 优点：可以提高项目的可维护性

## keep-alive
```
（1）
keep-alive->vue自带的，意思为：当我的路由内容被加载过一次之后，我就把路由中的内容放到内存之中，下一次再进这个路由的时候，不需要重新渲染这个组件，只需要到内存中把以前的内容拿出来显示到 页面上就可以了
（2）
注意：当使用keepalive的时候，组件中会多出一个生命周期函数叫做activated

App.vue:
<template>
	<div>
		<keep-alive>
			<router-view></router-view>
		</keep-alive>
	</div>
</template>
<script>
export default{
	name:'App'
}
</script>
```

## 在使用keepalive的情况下，切换城市发送带城市这个参数的ajax请求
1. 使用activated：当页面重新显示的时候触发这个方法，可以判断当前页面显示的城市和上一个页面显示的城市不同时再发一个ajax请求
```
（1）先用一个变量将上次城市保存起来
mounted (){
    // 当页面挂载好了再执行
    this.lastCity = city
},
（2）当页面重新显示的时候，判断上次城市和这次城市是否一样，一样不改变，不一样重新发一次ajax请求
activated(){
    if(this.lastCity !=this.city){
        this.lastCity = city
        this.getHomeInfo();
    }
},
```
2. 通过在keep-alive中设置exclude="Detail",意思为除了Detail之外其他的页面都可以被缓存，这里的Detail是Detail.vue中属性name的值，也就是Detail.vue组件的名字
```
<keep-alive exclude="Detail">
    <router-view></router-view>
</keep-alive>
```
3. 补充一个生命周期函数deactivated:它是页面即将被隐藏，或者页面即将被替换为新的页面的时候执行的

## 防止图片抖动
```
// 它的高度相对于它的宽度会自动撑开31.25%，这样就保存了图片的比例，一下这四行就是设置了图片保留原比例，而且防抖动（当图片未加载，下面内容先加载占据图片原本位置，当图片加载完恢复正常布局）
overflow:hidden
width:100%
height:0
padding-bottom:30.4%
```

## Swiper的使用
1. 导入
```
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
```
2. 
```
应用：
<swiper :options="swiperOption">
    <swiper-slide>
        <img class="swiper-img" :src="#">
    </swiper-slide>
    <div class="swiper-pagination"  slot="pagination"></div>
</swiper>
```
3. js：
```
（1）轮播图下面默认是圈圈
data (){
        return{
            swiperOption:{
                // 实现轮播图下面的圈圈
                pagination:{
                    el : '.swiper-pagination'
                },
                // 让轮播图支持循环轮播，就是第一页往前还能翻
                loop:true
            }
        },
    },

（2）让轮播图下面为分页显示像 ' 1/24'一样
swiperOptions: {
    pagination: {
        el : '.swiper-pagination',
        type : 'fraction'
    }
    // paginationType: 'fraction',
}
```
4. 网址： ` https://3.swiper.com.cn/api/index.html`

## 画廊轮播图问题
1. 描述：画廊部分的轮播图出现卡顿，并且滑动有问题
2. 原因：最初gallary画廊组件处于隐藏的状态，如果再次把它显示出来的时候，swiper计算宽度可能会有些问题，导致轮播图无法正常滚动
3. 解决：` observer:true  observeParents:true,`
```
swiperOptions: {
    pagination: {
        el : '.swiper-pagination',
        type : 'fraction'
    },
    // 当swiper插件只要监听我这个元素或者父级元素DOM结构的改变，会自动的自我刷新一次，通过刷新就能解决swiper计算宽度的问题
    observer:true,
    observeParents:true,
    // paginationType: 'fraction',
}
```

## 景点详情中顶部渐隐渐显
1. 在元素身上绑定样式
```
<div class="header-fixed" v-show="!showAbs" :style="opacityStyle">
```
2. 初始透明度为0
```
opacityStyle : {
    opacity:0
}
```
3. 让颜色随滚动条滚动距离改变
```
let opacity = top / 140
    opacity = opacity > 1? 1 : opacity
    this.opacityStyle = {
        opacity,
}
```

## 全局事件的使用：圈重点
1. 在对scroll事件进行监听的时候，使用了
`window.addEventListener('scroll' ,this.handleScroll)`，但是这个事件会对全局都有影响，所以我们要适时的解绑
2. 解绑，因为我只需要在我Header.vue当前页进行操作，所以解绑事件我放在了deactivated
```
activated(){
    // 页面展示时候绑定scroll事件
    window.addEventListener('scroll' , this.handleScroll)
},
deactivated(){
    // 页面隐藏的时候解绑scroll事件
    window.removeEventListener('scroll' , this.handleScroll)
},
```

## 递归组件
1. name的作用：这个名字很大的一个用处就是我们使用递归组件来使用
```
export default {
    // 这个名字很大的一个用处就是我们使用递归组件来使用
    name:'detailList',
    props:{
        list:Array,
    }
}
```
2. 使用
```
<!-- 如果自己下面有子组件的话，就把子组件传进去，递归循环显示所有子组件 -->
<div v-if="item.children">
    <detailList :list="item.children"></detailList>
</div>
```

## name属性的作用
1. 递归组件，标签就是名字
```
name:'detailList',

<detailList :list="item.children"></detailList>
```
2. keep-alive设置不被缓存的组件，利用组件的名字
3. 在vue开发工具中，一个个组件的名字，就是在name中的值

## 组件之间相互影响
1. 描述：当首页故宫栏被拖到下面了，详情页也会到下面了
2. 解决：在route下的index.js文件中配置如下
```
// 每次进行路由切换的时候，我都先进入显示的页面x轴初始位置为0， y初始位置也为0
scrollBehavior(to , from , savedPosition){
    return{x : 0, y : 0};
}
//这里就是我让页面切换的时候，始终回到最顶部
```

## config下的index.js下的proxyTable
```
在开发环境下，如果访问api这个路径，它会帮助你把这个路径的请求打到http://localhost:8080这个端口下(这个端口是前端服务器的一个端口)

proxyTable: {
    // 当请求是以api开头的那么进行以下操作
    '/api':{
        // 链接替换为target中的内容
        target:'http://localhost:8080',
        pathRewrite:{
        // 以api开头的替换为/static/mock
        '^/api': '/static/mock'
        }
    }
},
```

## Vue项目接口的联调(前后端整和，调试)
1. 改变proxyTable中target指向的地址
```
//当访问api的时候，我就转发到http://localhost:80这个端口下，也就是我的PHP服务器之上
 proxyTable: {
    '/api':{
        //这个地址可以写内网的ip地址或者外网的域名都是没问题的
        target:'http://localhost',
    }
},
```
## 其他
1. 
```
问题描述：
   当访问localhost:8080时，项目可以正常显示，但是当输入我本机IP地址加上8080就会被拒绝，但是IP地址加80就可以正常启动php服务器

原因：
   前端的项目是通过webpack-dev-server启动的，webpack默认不支持通过IP的形式进行页面的访问
解决：
更改package.json文件中的dev值，-->加上一个--host 0.0.0.0,如下：
"dev": "webpack-dev-server --host 0.0.0.0 --inline --progress --config build/webpack.dev.conf.js"`

然后再访问http://10.51.26.2:8080/#/(本机地址为：10.51.26.2)
```

## 滚动字母表，页面随着动
1. 解决：给事件添加阻止默认，这样问题就解决了
```
@touchstart.prevent
```

## 手机端使用白屏的的问题
1. 下载babel-polyfill : npm i babel-polyfill -D
2. 引入:import 'babel-polyfill'

## 后续学习
1. vue-router：`https://router.vuejs.org/zh/`
2. vuex: `https://router.vuejs.org/zh/`
3. 服务器端渲染: `https://ssr.vuejs.org/zh/`
4. vue插件: `https://github.com/vuejs/awesome-vue`

## copy
1. 整个项目仿自`http://touch.piao.qunar.com/`