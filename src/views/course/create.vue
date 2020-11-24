<template>
  <el-card>
    <div class="step-wrap">
      <el-steps :active="activeStep"
                simple>
        <el-step v-for="(item, index) in steps"
                 :key="index"
                 :title="item.title"
                 :icon="item.icon"
                 @click.native="activeStep = index"></el-step>
      </el-steps>
    </div>
    <el-form label-width="80px">
      <div v-show="activeStep === 0">
        <el-form-item label="课程名称">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="课程简介">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="课程概述">
          <el-input type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="讲师姓名">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="讲师简介">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="课程排序">
          <el-input-number></el-input-number>
        </el-form-item>
      </div>
      <div v-show="activeStep === 1">
        <el-form-item label="课程封面">
          <el-upload class="avatar-uploader"
                     action="https://jsonplaceholder.typicode.com/posts/"
                     :show-file-list="false"
                     :on-success="handleAvatarSuccess"
                     :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl"
                 :src="imageUrl"
                 class="avatar">
            <i v-else
               class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="解锁封面">
          <el-upload class="avatar-uploader"
                     action="https://jsonplaceholder.typicode.com/posts/"
                     :show-file-list="false"
                     :on-success="handleAvatarSuccess"
                     :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl"
                 :src="imageUrl"
                 class="avatar">
            <i v-else
               class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </div>
      <div v-show="activeStep === 2">
        销售信息
      </div>
      <div v-show="activeStep === 3">
        秒杀活动
      </div>
      <div v-show="activeStep === 4">
        课程详情
        <el-form-item>
          <el-button>保存</el-button>
        </el-form-item>
      </div>
      <el-form-item v-if="activeStep >= 0 && activeStep < 4">
        <el-button @click="activeStep++">下一步</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
export default {
  name: 'CourseCreate',
  data () {
    return {
      activeStep: 0,
      steps: [{
        title: '基本信息',
        icon: 'el-icon-edit'
      },
      {
        title: '课程封面',
        icon: 'el-icon-edit'
      },
      {
        title: '销售信息',
        icon: 'el-icon-edit'
      },
      {
        title: '秒杀活动',
        icon: 'el-icon-edit'
      },
      {
        title: '课程详情',
        icon: 'el-icon-edit'
      }],
      imageUrl: ''
    }
  },
  methods: {
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>
<style lang='scss' scoped>
.step-wrap{
  margin-bottom: 20px;
}
.el-step {
  cursor: pointer;
}
::v-deep .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
::v-deep .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
