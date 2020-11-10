<template>
  <el-card class="box-card">
    <div slot="header"
         class="clearfix">
    </div>
    <div>
      <el-button class="back-btn" @click="$router.back()">返回</el-button>
      <el-button @click="create">添加</el-button>
    </div>
    <el-table :data="typeList"
              class="typeList-table"
              style="width: 100%"
              v-loading="loading">
      <el-table-column prop="id"
                       label="编号"
                       width="180">
      </el-table-column>
      <el-table-column prop="name"
                       label="名称"
                       width="180">
      </el-table-column>
      <el-table-column prop="createdTime"
                       label="添加时间">
      </el-table-column>
      <el-table-column prop="sort"
                       label="排序">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="edit(scope.row.id)"
                     size="small">编辑</el-button>
          <el-button @click="deleteResType(scope.row.id)"
                     type="danger"
                     size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>
<script lang='ts'>
import Vue from 'vue'
import { createType, deleteResType, getResTypeList } from '@/api/resource'
export default Vue.extend({
  name: 'Resource',
  data () {
    return {
      typeList: [],
      loading: false,
      form: {
        id: '',
        name: '',
        sort: 0
      },
      opeaStatus: 'add'
    }
  },
  created () {
    this.getTypeList()
  },
  methods: {
    async getTypeList () {
      const res = await getResTypeList()
      this.typeList = res.data.data
    },
    async create () {
      try {
        await createType(this.form)
        this.$message.success('操作成功')
        this.getTypeList()
      } catch (error) {
      }
    },
    edit (id: string) {
      this.$router.push({
        name: 'resource-create',
        query: {
          id,
        },
      })
    },
    async deleteResType (id: number) {
      await deleteResType(id)
    },
  },
})
</script>
<style lang='scss' scoped>
</style>
