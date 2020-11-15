// 菜单
import request from '@/utils/request'
export const createRole = (data: object) => {
  return request({
    method: 'POST',
    url: '/boss/role/saveOrUpdate',
    data,
  })
}
export const getList = (data: object) => {
  return request({
    method: 'POST',
    url: '/boss/role/getRolePages',
    data
  })
}
export const getRole = (id: number | string) => {
  return request({
    method: 'GET',
    url: `/boss/role/${id}`,
  })
}
export const deleteRole = (id: number) => {
  return request({
    method: 'DELETE',
    url: `/boss/role/${id}`,
  })
}
export const allocateUserRoles = (data: object) => {
  return request({
    method: 'POST',
    url: '/boss/role/allocateUserRoles',
    data
  })
}
export const getAllRole = () => {
  return request({
    method: 'GET',
    url: '/boss/role/all',
  })
}
export const getUserRole = (userId: string|number) => {
  return request({
    method: 'GET',
    url: `/boss/role/user/${userId}`,
    params: {
      userId
    }
  })
}
