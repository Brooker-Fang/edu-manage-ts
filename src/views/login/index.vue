<template>
  <div class="flex flex-center flex-align-center login">
    <div class="flex flex-center flex-align-center form-wrap">
      <el-form ref="form"
               :model="form"
               class="form-style">
        <el-form-item label="手机">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-button type="primary" class="login-btn"
                   @click="onSubmit">登录</el-button>
      </el-form>
    </div>
  </div>
</template>
<script lang='ts'>
import Vue from 'vue'
export default Vue.extend({
  name: 'Login',
  data () {
    return {
      form: {
        phone: '',
        password: '',
      },
    }
  },
  methods: {
    onSubmit () {
      console.log('onSubmit')
    },
  },
})
</script>
<style lang='scss' scoped>
.login {
  min-height: 100vh;
  .form-wrap {
    width: 300px;
    height: 400px;
    background-color: #ffffff;
    border-radius: 5px;
    .form-style{
      text-align: center;
      .login-btn{
        width: 100%;
      }
    }
  }
}
</style>
