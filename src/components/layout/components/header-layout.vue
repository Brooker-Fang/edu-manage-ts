<template>
  <div class="flex flex-align-center flex-space-between header">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
    <el-dropdown>
      <span class="flex flex-align-center el-dropdown-link">
        <img class="avatar" src="@/assets/avatar.jpeg" />
        <span>admin</span>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script lang='ts'>
import Vue from 'vue'
export default Vue.extend({
  name: 'HeaderLayout',
  data () {
    return {}
  },
})
</script>
<style lang='scss' scoped>
.header {
  height: 100%;
  .avatar{
    width: 60px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
  }
}
</style>
