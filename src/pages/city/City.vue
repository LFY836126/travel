<template>
    <div>
        <cityHeader></cityHeader>
        <citySearch :cities="cities"></citySearch>
        <cityList :cities="cities" :letter="letter" :hot="hotCities"></cityList>
        <!--@change="handleLetterChange"： 父组件接受子组件传递过来的值 -->
        <cityAlphabet :cities="cities" @change="handleLetterChange"></cityAlphabet>
    </div>
</template>
<script>
import axios from 'axios'
import cityHeader from './components/Header.vue'
import citySearch from './components/Search.vue'
import cityList from './components/List.vue'
import cityAlphabet from './components/Alphabet.vue'
export default {
    components:{
        cityHeader,
        citySearch,
        cityList,
        cityAlphabet,
    },
    data(){
        return {
            // 存放ABCD保包含的城市的名字
            cities:{},
            // 存放热门城市
            hotCities:[],
            letter:'',
        }
    },
    methods: {
        getCityInfo(){
            axios.get('/api/city.json').then(this.handleGetCityyInfoSucc);
        },
        handleGetCityyInfoSucc(res){
            // console.log(res);
            res = res.data;
            if(res.ret && res.data){
                const data = res.data;
                this.cities = data.cities;
                this.hotCities = data.hotCities;
            }
        },
        handleLetterChange(letter){
            // console.log(letter);
            this.letter=letter;
        }
    },
    mounted(){
        this.getCityInfo();
    }
}
</script>
<style lang="stylus" scoped>
</style>