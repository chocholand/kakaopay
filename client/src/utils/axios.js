import axios from 'axios'

export function axiosApi(url, method = 'get', data, options = {}) {
  data = data ? method === 'get' ? { params: {...data} } : { data } : {}
  const defaultConfing = {
    url: 'http://localhost:5000' + url,
    method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }

  const config = {
    ...defaultConfing,
    ...data,
    ...options
  }

  return axios(config)
    .catch((error) => {
      console.log('error', error)
      throw error
    })
}