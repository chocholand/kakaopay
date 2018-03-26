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
      if (error.response) {
        const { data, status } = error.response
        if(data.message) {
          console.log(data.message)
        }
      } else if (error.request) {
        console.log(error.request)
      } else {
        console.log('Error', error.message)
      }
    })
}