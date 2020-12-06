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
export const uploadCourseImage = (data: any) => {
  // data 为 formData 数据对象
  return request({
    method: 'POST',
    url: '/boss/course/upload',
    data
  })
}
