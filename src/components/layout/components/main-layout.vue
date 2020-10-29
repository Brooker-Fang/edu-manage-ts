<template>
 <!-- <div>
   <router-view></router-view>
 </div> -->
 <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key" />
      </keep-alive>
    </transition>
  </section>
</template>
<script lang='ts'>
import Vue from 'vue'
export default Vue.extend({
  name: 'MainLayout',
  data () {
    return {
    }
  },
})
</script>
<style lang='scss' scoped>
</style>
