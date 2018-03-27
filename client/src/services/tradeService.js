import { axiosApi } from '../utils/axios'

/**
 * 호가 가져오기
 */
export const getTrade = () => {
  return axiosApi('/trade', 'get')
}

/**
 * 호가 파일 초기화
 * @returns {*}
 */
export const initializeTrade = () => {
  return axiosApi('/trade', 'post')
}