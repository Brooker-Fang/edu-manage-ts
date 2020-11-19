<template>
 <el-card class="box-card">
    <div slot="header"
         class="clearfix">
      <el-form :inline="true"
               :model="searchParams"
               class="demo-form-inline">
        <el-form-item label="课程名称">
          <el-input v-model="searchParams.courseName"
                    placeholder="填写课程名称"></el-input>
        </el-form-item>
        <el-form-item label="课程名称">
          <el-select v-model="searchParams.status" placeholder="选择课程状态">
            <el-option value="">全部</el-option>
            <el-option label="上架" :value="1"></el-option>
            <el-option label="下架" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="search">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="list"
              class="list-table"
              style="width: 100%"
              v-loading="loading">
      <el-table-column prop="id"
                       label="ID"
                       width="180">
      </el-table-column>
      <el-table-column prop="courseName"
                       label="课程名称"
                       width="180">
      </el-table-column>
      <el-table-column prop="price"
                       label="价格">
      </el-table-column>
      <el-table-column prop="sortNum"
                       label="排序">
      </el-table-column>
      <el-table-column prop="status"
                       label="状态">
                       <template slot-scope="scope">
                         <span v-if="scope.row.status === 0" class="status off-status"></span>
                         <span v-if="scope.row.status === 1" class="status on-status"></span>
                       </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status === 0" @click="changStatus(scope.row.id, 1)"
                     pageSize="small">上架</el-button>
                     <el-button v-if="scope.row.status === 1" @click="changStatus(scope.row.id, 0)"
                     pageSize="small">下架</el-button>
                     <el-button @click="editCourse(scope.row.id)"
                     pageSize="small">编辑</el-button>
                     <el-button @click="editCourse(scope.row.id)"
                     pageSize="small">内容管理</el-button>
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
               <el-form-item>
        <el-select v-model="form.roleIdList" multiple placeholder="请选择">
          <el-option
            v-for="item in roleList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
               </el-form-item>
        <el-button type="default"
                   class="login-btn"
                   @click="show = false"
                   >取消</el-button>
        <el-button type="primary"
                   class="login-btn"
                   @click="show = false"
                   :loading="loading">保存</el-button>
      </el-form>
    </el-dialog>
  </el-card>
</template>
<script lang='ts'>
import Vue from 'vue'
import { getList, changStatus } from '@/api/course'
import dayjs from 'dayjs'
export default Vue.extend({
  name: 'User',
  data () {
    return {
      dayjs: dayjs,
      loading: false,
      total: 0,
      list: [],
      roleList: [],
      show: false,
      searchParams: {
        courseName: '',
        status: '',
        currentPage: 1,
        pageSize: 10,
      },
      form: {
        roleIdList: [],
        userId: ''
      }
    }
  },
  created () {
    this.getList(this.searchParams)
  },
  methods: {
    search () {
      this.getList(this.searchParams)
    },
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
    editCourse (id: number | string) {
      console.log(id)
    },
    async changStatus (id: string | number, status: number) {
      try {
        await changStatus({ courseId: id, status })
        this.$message.success('操作成功')
        this.getList(this.searchParams)
      } catch (error) {
      }
    }
  }
})
</script>
<style lang='scss' scoped>
.status{
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
.off-status{
  background: red;
}
.on-status{
  background: chartreuse;
}
</style>
