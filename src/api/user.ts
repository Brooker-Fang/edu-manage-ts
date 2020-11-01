// 用户模块
import request from '@/utils/request'
import qs from 'qs'
interface User {
  phone: string
  password: string
}
export const login = (data: User) => {
  return request({
    method: 'POST',
    url: '/front/user/login',
    // headers: { 'content-type': 'application/x-www-form-urlencoded' },
    // 如果data是qs.stringify(data)装换后的数据格式：key=value&key2=value ，content-type 会设置为 application/x-www-form-urlencoded
    // 如果data 是普通对象，则content-type 会被设置为application/json
    // 如果data 是formData对象，则content-type会被设置为multipart/form-data
    // axios 默认设置content-type为 application/json
    data: qs.stringify(data),
  })
}
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/front/user/getInfo',
  })
}
