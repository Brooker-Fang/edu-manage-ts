<template>
 <el-card class="box-card">
  <div slot="header" class="clearfix">
    <el-button type="default" @click="create">添加菜单</el-button>
  </div>
  <el-table
      :data="list"
      class="list-table"
      style="width: 100%"
      v-loading="loading">
      <el-table-column
        prop="name"
        label="菜单名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="level"
        label="菜单级数"
        width="180">
      </el-table-column>
      <el-table-column
        prop="icon"
        label="前端图标">
      </el-table-column>
      <el-table-column
        prop="orderNum"
        label="排序">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
        <el-button @click="edit(scope.row.id)" size="small">编辑</el-button>
        <el-button @click="deleteMenu(scope.row.id)" type="danger" size="small">删除</el-button>
      </template>
      </el-table-column>
    </el-table>
</el-card>
</template>
<script lang='ts'>
import Vue from 'vue'
import { getList, deleteMenu } from '@/api/menu'
export default Vue.extend({
  name: 'Menu',
  data () {
    return {
      loading: false,
      list: []
    }
  },
  created () {
    this.getList()
  },
  methods: {
    async getList () {
      this.loading = true
      try {
        const res = await getList()
        this.list = res.data.data
      } catch (error) {
        this.$message.error(error.message)
      } finally {
        this.loading = false
      }
    },
    create () {
      this.$router.push({
        name: 'menu-create'
      })
    },
    edit (id: string) {
      this.$router.push({
        name: 'menu-create',
        query: {
          id
        }
      })
    },
    async deleteMenu (id: number) {
      await deleteMenu(id)
      this.getList()
    }
  }
})
</script>
<style lang='scss' scoped>
.list-table{
  height: 500px;
  overflow: auto;
}
</style>
