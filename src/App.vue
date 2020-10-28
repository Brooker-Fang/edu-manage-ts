<template>
  <div id="app">
    <!-- app
    <el-button type="text">button</el-button>
    <router-view/> -->
    <Layout/>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Layout from '@/components/layout/index.vue'
export default Vue.extend({
  name: 'App',
  components: {
    Layout,
  },
})
</script>
<style lang="scss" scoped>

</style>
