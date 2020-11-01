import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
import router from '@/router'
import qs from 'qs'
const request = axios.create({
  // 配置选项
  // baseURL,
  // timeout
})
// const errorStr : object = {
//   400: '请求参数错误',
//   401: '',
//   403: '没有权限，请联系管理员',
//   404: '请求资源不存在',
// }
function redirectLogin () {
  router.push({
    name: 'login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}
function refreshToken () {
  // 用新的请求实例，新的实例不会走request流程，防止 无限循环请求
  return axios.create()({
    method: 'POST',
    url: '/front/user/refresh_token',
    data: qs.stringify({
      refreshtoken: store.state.user.refresh_token
    })
  })
}

// 请求拦截器
request.interceptors.request.use(function (config) {
  const { user } = store.state
  if (user && user.access_token) {
    config.headers.Authorization = user.access_token
  }
  return config
}, function (error) {
  return Promise.reject(error)
})
let isRefresh = false
// eslint-disable-next-line
let requests: any[] = [] // 存储刷新token期间的401请求
// 响应拦截器
request.interceptors.response.use(function (response) {
  // 后端自定义错误处理
  return response
}, async function (error) {
  //  响应错误 即HTTP状态码超过200
  console.dir(error)
  if (error.response) {
    // 请求发出去收到响应，状态码超过200
    const { status } = error.response
    // if (errorStr[status]) {
    //   Message.error(errorStr[status])
    // }
    if (status === 400) {
      Message.error('请求参数错误')
    } else if (status === 401) {
      // token过期
      if (!store.state.user) {
        redirectLogin()
        return Promise.reject(error)
      }
      if (!isRefresh) {
        isRefresh = true
        return refreshToken().then(res => {
          if (!res.data.success) {
            throw new Error('刷新token失败')
          }
          const { data } = res
          // 成功后，重新设置user，把本次请求重新发出去
          store.commit('setUser', data.content)
          // 把挂起的请求重新 发送
          requests.forEach(cb => cb())
          // 重置数组
          requests = []
          console.log(error.config)
          // 把本次请求重新发出去
          return request(error.config)
        }).catch(() => {
          store.commit('setUser', null)
          redirectLogin()
        }).finally(() => {
          isRefresh = false
        })
      }
      // 刷新期间，把请求挂起到request数组里
      return new Promise(resolve => {
        requests.push(() => {
          resolve(request(error.config))
        })
      })
    } else if (status === 403) {
      Message.error('没有权限，请联系管理员')
    } else if (status === 404) {
      Message.error('请求资源不存在')
    }
  } else if (error.request) {
    // 请求发出没有响应
    Message.error('请求超时，请刷新重试')
  } else {
    // 设置请求时发生错误
    Message.error(`请求失败：${error.message}`)
  }
  return Promise.reject(error)
})
export default request
