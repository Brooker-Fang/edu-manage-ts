import dayjs from 'dayjs'

export default {
  formatDate (value: string| Date, f = 'YYYY-MM-DD HH:mm:ss') {
    if (!value) return ''
    return dayjs(value).format(f)
  }
}
