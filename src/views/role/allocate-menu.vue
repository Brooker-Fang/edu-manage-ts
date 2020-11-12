<template>
 <el-card class="box-card">
   AllocateRole
 </el-card>
</template>
<script>
export default {
  name: 'AllocateRole',
  props: {
    roleId: {
      type: [String, Number]
    }
  },
  data () {
    return {
    }
  },
  mounted () {
    console.log(this.roleId)
  }
}
</script>
<style lang="scss" scoped>
</style>
