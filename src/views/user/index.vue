<template>
 <el-card class="box-card">
    <div slot="header"
         class="clearfix">
      <el-form :inline="true"
               :model="searchParams"
               class="demo-form-inline">
        <el-form-item label="手机号">
          <el-input v-model="searchParams.phone"
                    placeholder="填写手机号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="getList">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="list"
              class="list-table"
              style="width: 100%"
              v-loading="loading">
      <el-table-column prop="id"
                       label="用户id"
                       width="180">
      </el-table-column>
      <el-table-column prop="name"
                       label="头像"
                       width="180">
      </el-table-column>
      <el-table-column prop="name"
                       label="用户名">
      </el-table-column>
      <el-table-column prop="phone"
                       label="手机号">
      </el-table-column>
      <el-table-column prop="phone"
                       label="状态">
      </el-table-column>
      <el-table-column prop="createdTime"
                       label="添加时间">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="allocateRole(scope.row.id)"
                     type="text"
                     size="small">分配角色</el-button>
          <el-button @click="deleteRes(scope.row.id)"
                     type="text"
                     size="small">禁用</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="'分配角色'"
               :visible="show"
               width="400px"
               left>
      <el-form ref="form"
               :model="form"
               label-width="80px"
               class="form-style">
        <el-form-item label="描述"
                      prop="description">
          <el-input v-model="form.description"></el-input>
        </el-form-item>
        <el-button type="default"
                   class="login-btn"
                   @click="show = false"
                   >取消</el-button>
        <el-button type="primary"
                   class="login-btn"
                   @click="createRole"
                   :loading="loading">保存</el-button>
      </el-form>
    </el-dialog>
  </el-card>
</template>
<script lang='ts'>
import Vue from 'vue'
import { getList, enableUser, forbidUser } from '@/api/user'
export default Vue.extend({
  name: 'User',
  data () {
    return {
      loading: false,
      total: 0,
      list: [],
      searchParams: {
        phone: '',
        startCreateTime: '',
        code: '',
        endCreateTime: '',
        current: 1,
        size: 10,
      },
      form: {
        id: '',
        code: '',
        name: '',
        description: ''
      }
    }
  },
  created () {
    this.getList(this.searchParams)
  },
  methods: {
    async getList (searchParams: object) {
      this.loading = true
      try {
        const res = await getList(searchParams)
        this.list = res.data.data.records
        this.total = res.data.data.total
      } catch (error) {
        this.$message.error(error.message)
      } finally {
        this.loading = false
      }
    },
    allocateRole (id: string|number) {
      console.log(id)
    }
  }
})
</script>
<style lang='scss' scoped>
</style>
