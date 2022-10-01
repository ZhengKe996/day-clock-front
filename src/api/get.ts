import service from '@/service'

export const getDetail = (value?: string) => {
  return service({ url: '/get/detail', params: { class: value } })
}
export const getTakeRate = () => {
  return service({ url: '/get/take-rate' })
}
export const getNotList = () => {
  return service({ url: '/get/not-list' })
}
