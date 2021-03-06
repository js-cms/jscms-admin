import fly from 'flyio';
import storejs from 'store';

const env = 'dev';
const lineApi = '/';

let _baseURL = env === 'dev' ? 'http://127.0.0.1:7011/' : lineApi;

fly.interceptors.request.use((request) => {
  const token = storejs.get('token')
  // 给所有请求添加自定义header
  request.headers['authorization'] = token
  request.baseURL = baseURL
  return request
});

function Req(vueInstance) {
  //拦截请求
  fly.interceptors.response.use(
    (response) => {
      //如果是403则退回登录页面。
      if (response.data.code === 403) {
        storejs.remove('token');
        storejs.remove('uuid');
        vueInstance.$router.push({
          name: 'Login'
        });
      }
      //只返回data
      return response.data;
    },
    (err) => {
      vueInstance.$Message({
        type: 'error',
        text: '网络错误'
      });
      storejs.remove('token');
      storejs.remove('uuid');
      vueInstance.$router.push({
        name: 'Login'
      });
      //发生网络错误后会走到这里
      //return Promise.resolve("ssss")
    }
  )
  return fly;
}

window.req = fly;
export let Request = Req;
export let req = fly;
export let baseURL = _baseURL;
