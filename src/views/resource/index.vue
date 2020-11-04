<template>
  <el-card class="box-card">
    <div slot="header"
         class="clearfix">
      <el-form :inline="true" :model="searchParams" class="demo-form-inline">
  <el-form-item label="资源名称">
    <el-input v-model="searchParams.name" placeholder="填写资源名称"></el-input>
  </el-form-item>
  <el-form-item label="资源路径">
    <el-input v-model="searchParams.rul" placeholder="填写资源路径"></el-input>
  </el-form-item>
  <el-form-item label="资源分类">
    <el-select v-model="searchParams.categoryId" placeholder="选择资源分类">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="getList">查询</el-button>
  </el-form-item>
</el-form>
    </div>
    <el-table :data="list"
              class="list-table"
              style="width: 100%"
              v-loading="loading">
      <el-table-column prop="id"
                       label="编号"
                       width="180">
      </el-table-column>
      <el-table-column prop="name"
                       label="资源名称"
                       width="180">
      </el-table-column>
      <el-table-column prop="url"
                       label="资源路径">
      </el-table-column>
      <el-table-column prop="description"
                       label="描述">
      </el-table-column>
      <el-table-column prop="createdTime"
                       label="添加时间">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="edit(scope.row.id)"
                     size="small">编辑</el-button>
          <el-button @click="deleteRes(scope.row.id)"
                     type="danger"
                     size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>
<script lang='ts'>
import Vue from 'vue'
import { getList, deleteRes, getResTypeList } from '@/api/resource'
export default Vue.extend({
  name: 'Resource',
  data () {
    return {
      total: 0,
      list: [],
      typeList: [],
      loading: false,
      searchParams: {
        name: '',
        startCreateTime: '',
        url: '',
        categoryId: '',
        endCreateTime: '',
        current: 1,
        size: 10,
      },
    }
  },
  created () {
    this.getTypeList()
    this.getList()
  },
  methods: {
    async getTypeList () {
      const res = await getResTypeList()
      this.typeList = res.data.data
    },
    async getList () {
      this.loading = true
      try {
        const res = await getList(this.searchParams)
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
    async deleteRes (id: number) {
      await deleteRes(id)
      this.getList()
    }
  }
})
</script>
<style lang='scss' scoped>
</style>
