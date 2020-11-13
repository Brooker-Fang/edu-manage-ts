<template>
  <el-card class="box-card">
    <h2>分配资源</h2>
    <el-tree ref="res-tree"
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
                   @click="resetRes"
                   >清空</el-button>
        <el-button type="primary"
                   class="login-btn"
                   @click="onSave"
                   :loading="loading">保存</el-button>
    </div>
  </el-card>
</template>
<script>
import { allocateRoleRes, getRoleRes } from '@/api/resource'
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
        children: 'resourceList',
        label: 'name'
      },
      loading: false,
      checkedKeys: []
    }
  },
  created () {
    this.getRoleRes()
  },
  methods: {
    async getRoleRes () {
      try {
        const { data } = await getRoleRes(this.roleId)
        this.menus = data.data
      } catch (error) {
        this.$message.error(error)
      }
    },
    getCheckedKeys (menus) {
      menus.forEach((menu) => {
        if (menu.selected) {
          this.checkedKeys = [...this.checkedKeys, menu.id]
        }
        if (menu.resourceList) {
          this.getCheckedKeys(menu.resourceList)
        }
      })
    },
    async onSave () {
      const menuIdList = this.$refs['res-tree'].getCheckedKeys()
      console.log(menuIdList)
      await allocateRoleRes({
        roleId: this.roleId,
        menuIdList
      })
      this.$message.success('分配成功')
      this.getRoleRes()
    },
    resetRes () {
      this.$refs['res-tree'].setCheckedKeys([])
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
