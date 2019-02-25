import Taro from '@tarojs/taro'
import { CODE_SUCCESS, BASE_URL } from '../config'

interface ConfigTypes {
  url: string
  method: any
  data: any
}

export default {
  request(config: ConfigTypes) {
    const { url } = config
    return new Promise((resolve, reject) => {
      Taro.request({
        ...config,
        url: `${BASE_URL}${url}`
      })
        .then(res => {
          const { code, msg, ...data } = res.data
          if (code === CODE_SUCCESS) {
            resolve(data)
          } else {
            reject(msg || '服务器异常')
          }
        })
        .catch(error => {
          reject(error || '服务器异常')
        })
    })
  },
  get(url: string, config?: ConfigTypes) {
    return this.request(Object.assign(config || {}, { method: 'GET', url }))
  },
  post(config: any) {
    return this.request(
      Object.assign(config || {}, {
        method: 'POST'
        // header: { 'content-type': 'application/x-www-form-urlencoded' }
      })
    )
  }
}
