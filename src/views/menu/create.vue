<template>
  <el-card class="box-card">
    <div slot="header"
         class="clearfix">
      <span type="text">添加菜单</span>
    </div>
    <el-form ref="form"
             :model="form"
             :rules="rules"
             label-width="80px"
             class="form-style">
      <el-form-item label="菜单名称"
                    prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="菜单路径"
                    prop="href">
        <el-input v-model="form.href"></el-input>
      </el-form-item>
      <el-form-item label="上级菜单"
                    prop="parentId">
        <el-select v-model="form.parentId"
                   placeholder="活动区域">
                   <el-option :value="-1" label="无上级菜单"></el-option>
          <el-option v-for="item in parentList" :key="item.id"
           :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="描述"
                    prop="description">
        <el-input v-model="form.description"></el-input>
      </el-form-item>
      <el-form-item label="前端图标"
                    prop="icon">
        <el-input v-model="form.icon"></el-input>
      </el-form-item>
      <el-form-item label="是否显示"
                    prop="shown">
        <el-radio-group v-model="form.shown">
          <el-radio :label="true">是</el-radio>
          <el-radio :label="false">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="排序"
                    prop="phone">
        <el-input-number v-model="form.orderNum" :min="1" :max="10" label="排序"></el-input-number>
      </el-form-item>
      <el-button type="primary"
                 class="login-btn"
                 @click="onSubmit"
                 :loading="loading">创建</el-button>
    </el-form>
  </el-card>
</template>
<script lang='ts'>
import Vue from 'vue'
import { createMenu, getEditMenuInfo } from '@/api/menu'

export default Vue.extend({
  name: 'menu-create',
  data () {
    return {
      loading: false,
      form: {
        id: '',
        parentId: -1,
        name: '',
        href: '',
        icon: '',
        orderNum: '',
        description: '',
        shown: true,
      },
      rules: {},
      parentList: []
    }
  },
  created () {
    this.getEditMenuInfo()
  },
  methods: {
    async getEditMenuInfo () {
      const { data } = await getEditMenuInfo()
      if (data.code === '000000') {
        this.parentList = data.data.parentMenuList
      }
    },
    async onSubmit () {
      this.loading = true
      try {
        await createMenu(this.form)
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
</style>
