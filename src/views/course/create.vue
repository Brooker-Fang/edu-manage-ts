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
          <el-input v-model="course.courseName"></el-input>
        </el-form-item>
        <el-form-item label="课程简介">
          <el-input v-model="course.brief"></el-input>
        </el-form-item>
        <el-form-item label="课程概述">
          <el-input v-model="course.previewFirstField" type="textarea"></el-input>
          <el-input style="margin-top: 10px" v-model="course.previewSecondField" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="讲师姓名">
          <el-input v-model="course.teacherDTO.teacherName"></el-input>
        </el-form-item>
        <el-form-item label="讲师简介">
          <el-input v-model="course.teacherDTO.description"></el-input>
        </el-form-item>
        <el-form-item label="课程排序">
          <el-input-number v-model="course.sortNum"></el-input-number>
        </el-form-item>
      </div>
      <div v-show="activeStep === 1">
        <el-form-item label="课程封面">
          <upload-img v-model="course.courseListImg" />
        </el-form-item>
        <el-form-item label="解锁封面">
          <upload-img v-model="course.courseImgUrl" />
        </el-form-item>
      </div>
      <div v-show="activeStep === 2">
        <el-form-item label="售卖价格">
          <el-input v-model="course.discounts">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="商品原价">
          <el-input  v-model="course.price">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="销量">
          <el-input  v-model="course.sales">
            <template slot="append">个</template>
          </el-input>
        </el-form-item>
        <el-form-item label="活动标签">
          <el-input v-model="course.discountsTag">
          </el-input>
        </el-form-item>
      </div>
      <div v-show="activeStep === 3">
        <el-form-item label="限时秒杀开关">
          <el-switch v-model="course.activityCourse">

          </el-switch>
        </el-form-item>
        <template v-if="course.activityCourse">
          <el-form-item label="开始时间">
            <el-date-picker v-model="course.activityCourseDTO.beginTime" type="date"
                            placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="结束时间">
            <el-date-picker v-model="course.activityCourseDTO.beginTime" type="date"
                            placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="秒杀价格">
            <el-input v-model="course.activityCourseDTO.amount">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="秒杀库存">
            <el-input  v-model="course.activityCourseDTO.stock">
              <template slot="append">个</template>
            </el-input>
          </el-form-item>
        </template>

      </div>
      <div v-show="activeStep === 4">
        <el-form-item label="课程详情">
            <TextEditor v-model="course.courseDescriptionMarkDown"/>
          </el-form-item>
        <el-form-item>
          <el-button @click="createCourse">保存</el-button>
        </el-form-item>
      </div>
      <el-form-item v-if="activeStep >= 0 && activeStep < 4">
        <el-button @click="activeStep++">下一步</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
import { createCourse, uploadCourseImage } from '@/api/course'
import UploadImg from '@/views/components/UploadImg.vue'
import TextEditor from '@/views/components/TextEditor.vue'
export default {
  name: 'CourseCreate',
  components: {
    UploadImg,
    TextEditor
  },
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
      imageUrl: '',
      course: {
        // id: 0,
        courseName: '',
        brief: '',
        teacherDTO: {
          // id: 0,
          courseId: 0,
          teacherName: '',
          teacherHeadPicUrl: '',
          position: '',
          description: ''
        },
        courseDescriptionMarkDown: '<h1>111</h1>',
        price: 0,
        discounts: 0,
        priceTag: '',
        discountsTag: '',
        isNew: true,
        isNewDes: '',
        courseListImg: '',
        courseImgUrl: '',
        sortNum: 0,
        previewFirstField: '',
        previewSecondField: '',
        status: 0,
        sales: 0,
        activityCourse: true,
        activityCourseDTO: {
          // id: 0,
          // courseId: 0,
          beginTime: '',
          endTime: '',
          amount: 0,
          stock: 0
        },
        autoOnlineTime: ''
      }
    }
  },
  methods: {
    async createCourse () {
      const { data } = await createCourse(this.course)
      if (data.code === '000000') {
        this.$message('创建成功')
        this.$router.push({
          name: 'course'
        })
      }
    },
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
      console.log(options)
      const fd = new FormData()
      fd.append('file', options.file)
      const { data } = await uploadCourseImage(fd)
      console.log(data)
    }
  }
}
</script>
<style lang='scss' scoped>
.step-wrap {
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
