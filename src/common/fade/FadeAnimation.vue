<template>
    <div>
        <transition>
            <!-- 插槽，就是那个元素要进行动画效果 -->
            <slot></slot>
        </transition>
    </div>
</template>
<script>
export default {
    name:'FadeAnimation',
}
</script>
<style lang="stylus" scoped>
    .v-enter, .v-leave-to
        opacity:0
    .v-enter-active, .v-leave-active
        transition: opacity .5s
</style>