<template>
  <el-card class="box-card">
    <div slot="header"
         class="clearfix">
    </div>
    <div>
      <el-button class="back-btn" @click="$router.back()">返回</el-button>
      <el-button @click="createDialog">添加</el-button>
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
          <el-button @click="edit(scope.row)"
                     size="small">编辑</el-button>
          <el-button @click="deleteResType(scope.row.id)"
                     type="danger"
                     size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="opeaStatus === 'add' ? '添加分类': '修改分类'" :visible="show" width="400px" left>
      <el-form ref="form"
             :model="form"
             label-width="80px"
             class="form-style">
      <el-form-item label="名称"
                    prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="排序"
                    prop="sort">
        <el-input-number v-model="form.sort" :min="1" :max="10" label="排序"></el-input-number>
      </el-form-item>
      <el-button type="primary"
                 class="login-btn"
                 @click="create"
                 :loading="loading">保存</el-button>
    </el-form>
    </el-dialog>
  </el-card>
</template>
<script lang='ts'>
import Vue from 'vue'
import { createType, deleteResType, getResTypeList } from '@/api/resource'
type Form = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  id: any
  name: string
  sort: number
}
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
      opeaStatus: 'add',
      show: false
    }
  },
  created () {
    this.getTypeList()
  },
  methods: {
    createDialog () {
      this.show = true
    },
    async getTypeList () {
      const res = await getResTypeList()
      this.typeList = res.data.data
    },
    async create () {
      try {
        await createType(this.form)
        this.$message.success('操作成功')
        this.show = false
        this.getTypeList()
      } catch (error) {
        this.show = false
      }
    },
    edit ({ id, name, sort }: Form) {
      this.form = {
        id, name, sort
      }
      this.createDialog()
    },
    async deleteResType (id: number) {
      await deleteResType(id)
    },
  },
})
</script>
<style lang='scss' scoped>
</style>
