import fly from 'flyio'
import util from '@/libs/util.js'

const env = 'dev'

const lineApi = 'http://api.meicili.com/'
let _baseURL = env === 'dev' ? 'http://127.0.0.1:7011/' : lineApi

fly.interceptors.request.use((request) => {
  const token = util.cookies.get('token')
  // 给所有请求添加自定义header
  request.headers['authorization'] = token
  request.baseURL = baseURL
  return request
})

//拦截请求
fly.interceptors.response.use(
  (response) => {
      //只将请求结果的data字段返回
      if ( response.data.code === 101 ) {
        util.cookies.remove('token')
        util.cookies.remove('uuid')
        window.location.href = "/"
      }
      return response
  },
  (err) => {
      //发生网络错误后会走到这里
      //return Promise.resolve("ssss")
  }
)

export let req = fly
export let baseURL = _baseURL
