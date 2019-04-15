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