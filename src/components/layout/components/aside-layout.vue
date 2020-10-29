<template>
  <div class="aside">
  <el-menu
    default-active="/"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    router
  >
  <el-menu-item index="/">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>
    <el-menu-item index="/course">
        <i class="el-icon-notebook-1"></i>
        <span slot="title">课程管理</span>
      </el-menu-item>
    <el-menu-item index="/user">
        <i class="el-icon-user-solid"></i>
        <span slot="title">用户管理</span>
      </el-menu-item>
    <el-submenu index="/ad">
      <template slot="title">
        <i class="el-icon-setting"></i>
        <span>广告管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/advert">广告列表</el-menu-item>
        <el-menu-item index="/advert-space">广告位列表</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="/role">
      <template slot="title">
        <i class="el-icon-coordinate"></i>
        <span>权限管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/role">角色管理</el-menu-item>
        <el-menu-item index="/menu">菜单管理</el-menu-item>
        <el-menu-item index="/resource">资源管理</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
  </div>
</template>
<script lang='ts'>
import Vue from 'vue'
export default Vue.extend({
  name: 'AsideLayout',
  data () {
    return {}
  },
  methods: {
    handleOpen (key: string, keyPath: string): void {
      console.log(key, keyPath)
    },
    handleClose (key: string, keyPath: string): void {
      console.log(key, keyPath)
    },
  },
})
</script>
<style lang='scss' scoped>
.aside{
  height: 100vh;
  background:#545c64;
}
</style>
