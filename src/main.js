import 'babel-polyfill';
import Vue from 'vue';
import App from 'components/App';

import heyuiConfig from 'js/config/heyui-config';
import routerConfig from 'js/config/router-config';
import store from 'js/vuex/store';
import vueMinxins from '@/application/common/vue-minxins/index.js';

import 'js/vue/components';

require('./css/app.less');

// 开发环境判断
// process.env.NODE_ENV == 'development'

// 使用mock文件， 自己开发的时候请删除
require('./mock/index');

// HeyUI已经设定为全局变量，无需引用
// 设定全局变量请参考根目录下的hey.conf.js文件

heyuiConfig();
Vue.use(HeyUI);

const router = routerConfig();

Vue.mixin(vueMinxins);
export default new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
