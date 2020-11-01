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
        <span>{{(userInfo && userInfo.userName) || 'admin'}}</span>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script lang='ts'>
import Vue from 'vue'
import { getUserInfo } from '@/api/user'
import { mapState } from 'vuex'
export default Vue.extend({
  name: 'HeaderLayout',
  computed: {
    ...mapState(['userInfo'])
  },
  data () {
    return {}
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    async getUserInfo () {
      try {
        const { data } = await getUserInfo()
        if (data && data.content) {
          this.$store.commit('setUserInfo', data.content)
        }
      } catch (error) {
        this.$message.error(error)
      }
    },
    logout () {
      this.$confirm('确定退出？', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.commit('setUser', null)
        this.$router.push('/login')
      })
    },
  }
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
