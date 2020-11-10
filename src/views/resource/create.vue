<template>
  <el-card class="box-card">
    <div slot="header"
         class="clearfix">
         <el-button class="back-btn" @click="$router.back()">返回</el-button>
      <span type="text">添加菜单</span>
    </div>
    <el-form ref="form"
             :model="form"
             :rules="rules"
             label-width="80px"
             class="form-style">
      <el-form-item label="资源名称"
                    prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="资源路径"
                    prop="url">
        <el-input v-model="form.url"></el-input>
      </el-form-item>
      <el-form-item label="菜单分类"
                    prop="categoryId">
        <el-select v-model="form.categoryId"
                   placeholder="选择菜单分类">
          <el-option v-for="item in typeList" :key="item.id"
           :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="描述"
                    prop="description">
        <el-input v-model="form.description"></el-input>
      </el-form-item>
      <el-button type="primary"
                 class="login-btn"
                 @click="onSubmit"
                 :loading="loading">保存</el-button>
    </el-form>
  </el-card>
</template>
<script lang='ts'>
import Vue from 'vue'
import { createRes, getResTypeList, getRes } from '@/api/resource'

export default Vue.extend({
  name: 'menu-create',
  data () {
    return {
      loading: false,
      form: {
        id: (this.$route.query && this.$route.query.id) ? this.$route.query.id : '',
        categoryId: '',
        name: '',
        url: '',
        description: '',
      },
      rules: {},
      typeList: []
    }
  },
  created () {
    this.getResTypeList()
    if (this.form.id) {
      this.getRes(parseInt(this.form.id as string))
    }
  },
  methods: {
    async getRes (id: number) {
      const { data } = await getRes(id)
      if (data.code === '000000') {
        const { id, url, description, categoryId, name } = data.data
        this.form = {
          id, url, description, categoryId, name,
        }
      }
    },
    async getResTypeList () {
      const { data } = await getResTypeList()
      if (data.code === '000000') {
        console.log('list===', data)
        this.typeList = data.data
      }
    },
    async onSubmit () {
      this.loading = true
      try {
        await createRes(this.form)
        this.$message.success('创建成功')
        this.$router.back()
      } catch (error) {
        this.$message.error(error.message)
      } finally {
        this.loading = false
      }
    },
  },
})
</script>
<style lang='scss' scoped>
.back-btn{
  margin-right: 20px;
}
</style>
