<template>
  <el-card class="box-card">
    <div slot="header"
         class="clearfix">
      <el-form :inline="true"
               :model="searchParams"
               class="demo-form-inline">
        <el-form-item label="角色名称">
          <el-input v-model="searchParams.name"
                    placeholder="角色名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="getList">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-button @click="createDialog">添加角色</el-button>
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
                       label="角色名称"
                       width="180">
      </el-table-column>
      <el-table-column prop="description"
                       label="描述">
      </el-table-column>
      <el-table-column prop="createdTime"
                       label="添加时间">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="allocateMenu(scope.row.id)"
                     type="text"
                     size="small">分配菜单</el-button>
          <el-button @click="allocateRes(scope.row.id)"
                     type="text"
                     size="small">分配资源</el-button>
          <el-button @click="editDialog(scope.row)"
                     type="text"
                     size="small">编辑</el-button>
          <el-button @click="deleteRes(scope.row.id)"
                     type="text"
                     size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="opeaStatus === 'add' ? '添加角色': '修改角色'"
               :visible="show"
               width="400px"
               left>
      <el-form ref="form"
               :model="form"
               label-width="80px"
               class="form-style">
        <el-form-item label="角色名称"
                      prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="角色编码"
                      prop="code">
          <el-input v-model="form.code"></el-input>
        </el-form-item>
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
import { getList, deleteRole, createRole } from '@/api/role'
type Form = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  id: any
  code: string
  name: string
  description: string
}
export default Vue.extend({
  name: 'Role',
  data () {
    return {
      total: 0,
      list: [],
      typeList: [],
      loading: false,
      searchParams: {
        name: '',
        startCreateTime: '',
        code: '',
        endCreateTime: '',
        current: 1,
        size: 10,
      },
      opeaStatus: 'add',
      show: false,
      form: {
        id: '',
        code: '',
        name: '',
        description: ''
      }
    }
  },
  created () {
    this.getList()
  },
  methods: {
    async getList () {
      this.loading = true
      try {
        const res = await getList(this.searchParams)
        this.list = res.data.data.records
        this.total = res.data.data.total
      } catch (error) {
        this.$message.error(error.message)
      } finally {
        this.loading = false
      }
    },
    createDialog () {
      this.opeaStatus = 'add'
      this.show = true
    },
    editDialog ({ id, name, code, description }: Form) {
      this.opeaStatus = 'edit'
      this.show = true
      this.form = {
        id, name, code, description
      }
    },
    async createRole () {
      this.loading = true
      try {
        await createRole(this.form)
        this.$message.success('创建成功')
        this.show = false
        this.getList()
      } catch (error) {
        this.$message.error(error.message)
      } finally {
        this.loading = false
      }
    },
    goResClassify () {
      this.$router.push({
        name: 'resource-type',
      })
    },
    async deleteRes (id: number) {
      await deleteRole(id)
      this.getList()
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    allocateMenu (id: any) {
      this.$router.push({
        name: 'allocate-menu',
        params: {
          roleId: id,
        }
      })
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    allocateRes (id: any) {
      this.$router.push({
        name: 'allocate-res',
        params: {
          roleId: id,
        }
      })
    },
    allocateRoleRes () {
      console.log('allocateRoleRes')
    }
  },
})
</script>
<style lang='scss' scoped>
</style>
