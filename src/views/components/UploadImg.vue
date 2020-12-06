<template>
  <el-upload class="avatar-uploader"
             action="https://jsonplaceholder.typicode.com/posts/"
             :show-file-list="false"
             :before-upload="beforeAvatarUpload"
             :http-request="handleUpload">
    <img v-if="value"
         :src="value"
         class="avatar">
    <i v-else
       class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
</template>
<script>
import { uploadCourseImage } from '@/api/course'
export default {
  name: 'UploadImg',
  props: {
    value: {
      require: true,
      type: String
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
    },
    // 自定义上传
    async handleUpload (options) {
      const fd = new FormData()
      fd.append('file', options.file)
      const { data } = await uploadCourseImage(fd)
      this.$emit('input', data.data.name)
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
::v-deep .avatar-uploader .el-upload:hover {
  border-color: #409eff;
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
