import { axiosApi } from '../utils/axios'

/**
 * 호가 가져오기
 */
export const getTrade = () => {
  return axiosApi('/trade', 'get')
}