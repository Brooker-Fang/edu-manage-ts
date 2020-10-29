<template>
 <el-container>
  <el-aside width="200px">
    <AsideLayout></AsideLayout>
  </el-aside>
  <el-container>
    <el-header>
      <HeadLayout></HeadLayout>
      </el-header>
    <el-main>
      <MainLayout></MainLayout>
      </el-main>
  </el-container>
</el-container>
</template>
<script lang='ts'>
import Vue from 'vue'
import AsideLayout from './components/aside-layout.vue'
import HeadLayout from './components/header-layout.vue'
import MainLayout from './components/main-layout.vue'
export default Vue.extend({
  name: 'Layout',
  components: {
    AsideLayout,
    HeadLayout,
    MainLayout,
  },
  data () {
    return {
    }
  },
})
</script>
<style lang='scss' scoped>
.el-container {
  min-height: 100vh;
  min-width: 980px;
}
.el-aside {
  background: #d3dce6;
}
.el-header {
  background: #b3c0d1;
}
.el-main {
  background: #e9eef3;
}
</style>
