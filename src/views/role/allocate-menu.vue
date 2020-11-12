<template>
  <el-card class="box-card">
    <el-tree :data="menus"
             show-checkbox
             :props="defaultProps"
             @node-click="handleNodeClick"></el-tree>
  </el-card>
</template>
<script>
import { getAllMenuLevel } from '@/api/menu'
export default {
  name: 'AllocateRole',
  props: {
    roleId: {
      type: [String, Number]
    }
  },
  data () {
    return {
      menus: [],
      defaultProps: {
        children: 'subMenuList',
        label: 'name'
      }
    }
  },
  created () {
    this.getAllMenuLevel()
  },
  methods: {
    async getAllMenuLevel () {
      try {
        const { data } = await getAllMenuLevel()
        this.menus = data.data
      } catch (error) {
        this.$message.error(error)
      }
    },
    handleNodeClick () {
      console.log(111)
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
