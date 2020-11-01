// 菜单
import request from '@/utils/request'
export const createMenu = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/menu/saveOrUpdate',
    data,
  })
}
export const getList = () => {
  return request({
    method: 'GET',
    url: '/boss/menu/getAll',
  })
}
