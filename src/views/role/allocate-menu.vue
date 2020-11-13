<template>
  <el-card class="box-card">
    <el-tree ref="menu-tree"
      :data="menus"
      node-key="id"
      default-expand-all=""
             show-checkbox
             :default-checked-keys="checkedKeys"
             :props="defaultProps"></el-tree>
    <div class="flex flex-center ">
      <el-button type="default"
                   class="login-btn"
                   @click="$router.back()"
                   >取消</el-button>
                   <el-button type="default"
                   class="login-btn"
                   @click="resetMenu"
                   >清空</el-button>
        <el-button type="primary"
                   class="login-btn"
                   @click="onSave"
                   :loading="loading">保存</el-button>
    </div>
  </el-card>
</template>
<script>
import { getAllMenuLevel, allocateMenu, getRoleMenu } from '@/api/menu'
export default {
  name: 'AllocateRole',
  props: {
    roleId: {
      type: [String, Number],
      require: true
    }
  },
  data () {
    return {
      menus: [],
      defaultProps: {
        children: 'subMenuList',
        label: 'name'
      },
      loading: false,
      checkedKeys: []
    }
  },
  created () {
    this.getAllMenuLevel()
    this.getRoleMenu()
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
    async getRoleMenu () {
      const { data } = await getRoleMenu(this.roleId)
      this.getCheckedKeys(data.data)
    },
    getCheckedKeys (menus) {
      menus.forEach((menu) => {
        if (menu.selected) {
          this.checkedKeys = [...this.checkedKeys, menu.id]
        }
        if (menu.subMenuList) {
          this.getCheckedKeys(menu.subMenuList)
        }
      })
    },
    async onSave () {
      const menuIdList = this.$refs['menu-tree'].getCheckedKeys()
      console.log(menuIdList)
      await allocateMenu({
        roleId: this.roleId,
        menuIdList
      })
      this.$message.success('分配成功')
      this.getRoleMenu()
    },
    resetMenu () {
      this.$refs['menu-tree'].setCheckedKeys([])
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
