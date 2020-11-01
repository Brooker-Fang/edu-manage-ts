<template>
 <el-card class="box-card">
  <div slot="header" class="clearfix">
    <el-button type="default" @click="create">添加菜单</el-button>
  </div>
  <el-table
      :data="list"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
    </el-table>
</el-card>
</template>
<script lang='ts'>
import Vue from 'vue'
import { getList } from '@/api/menu'
export default Vue.extend({
  name: 'Menu',
  data () {
    return {
      list: []
    }
  },
  created () {
    this.getList()
  },
  methods: {
    async getList () {
      try {
        const res = await getList()
        this.list = res.data.data
      } catch (error) {
        this.$message.error(error.message)
      }
    },
    create () {
      this.$router.push({
        name: 'menu-create'
      })
    }
  }
})
</script>
<style lang='scss' scoped>
</style>
