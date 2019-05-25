import Vue from 'vue'
import Vuex from 'vuex'
import state from './state.js'
import mutations from './mutations.js'
Vue.use(Vuex);
// 在这里定义完再在main.js中引入(vuex:import  store from './store/index.js')，在vue实例中挂载，这样每个子组件都可以使用vuex中的数据
export default new Vuex.Store({
    state,
    // actions:{
    //     changeCity(ctx, city){
    //         // 第一个参数：上下文ctx，第二个参数我们传递过来的对象
    //         // action通过commit调用mutations
    //         ctx.commit('changeCity', city);
    //     }
    // }, 
    mutations,
    // 当我们需要根据state中的数据计算出新的数据的时候，我们就可以借助getters，可以避免数据的冗余
    getters:{
        doubleCity(state){
            return state.city + ' ' + state.city
        }
    }
})