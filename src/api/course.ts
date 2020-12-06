import request from '@/utils/request'
interface Course {
  courseId: string | number
  status: number
}
export const getList = (data: object) => {
  return request({
    method: 'POST',
    url: '/boss/course/getQueryCourses',
    data
  })
}
export const createCourse = (data: object) => {
  return request({
    method: 'POST',
    url: '/boss/course/saveOrUpdateCourse',
    data,
  })
}
export const changStatus = (data: Course) => {
  return request({
    method: 'GET',
    url: '/boss/course/changeState',
    params: {
      courseId: data.courseId,
      status: data.status
    }
  })
}
export const getCourseById = (courseId: number| string) => {
  return request({
    method: 'GET',
    url: '/boss/course/getCourseById',
    params: {
      courseId,
    }
  })
}
export const uploadCourseImage = (data: any, onUploadProgress: (progressEvent: any) => void) => {
  // data 为 formData 数据对象
  return request({
    method: 'POST',
    url: '/boss/course/upload',
    data,
    // html5 新增的上传响应事件: progress
    // onUploadProgress(e){
    //   // console.log(e.loaded) // 已上传的数据大小
    //   // console.log(e.total) // 上传文件的总大小
    // }
    // 通过回调方式传入
    onUploadProgress
  })
}
