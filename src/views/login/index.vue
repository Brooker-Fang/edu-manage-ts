<template>
  <div class="flex flex-center flex-align-center login">
    <div class="flex flex-center flex-align-center form-wrap">
      <el-form ref="form"
               :model="form"
               :rules="rules"
               class="form-style">
        <el-form-item label="手机" prop="phone">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-button type="primary"
                   class="login-btn"
                   @click="onSubmit" :loading="loading">登录</el-button>
      </el-form>
    </div>
  </div>
</template>
<script lang='ts'>
import Vue from 'vue'
import { login } from '@/api/user'
import { Form } from 'element-ui'
export default Vue.extend({
  name: 'Login',
  data () {
    return {
      loading: false,
      form: {
        phone: '', // 18201288771
        password: '', // 111111
      },
      rules: {
        phone: [
          { required: true, message: '请输入手机号码', trigger: 'blur', },
          { min: 11, max: 11, message: '长度在 3 到 5 个字符', trigger: 'blur', },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'change', },
        ],
      },
    }
  },
  methods: {
    async onSubmit () {
      try {
        // (this.$refs.form as any)
        const res = await (this.$refs.form as Form).validate()
        if (res) {
          this.loading = true
          const { data, } = await login(this.form)
          if (data.state !== 1) {
            this.loading = false
            return this.$message.error(data.message)
          } else {
            this.loading = false
            console.log(data.content)
            this.$store.commit('setUser', data.content)
            this.$message.success('登录成功')
            this.$router.push({
              name: 'home',
            })
          }
          this.loading = false
        }
      } catch (error) {
        this.loading = false
      }
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
    .form-style {
      text-align: center;
      .login-btn {
        width: 100%;
      }
    }
  }
}
</style>
