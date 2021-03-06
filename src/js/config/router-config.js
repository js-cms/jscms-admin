import Vue from 'vue';
import VueRouter from 'vue-router';
import demoComponents from './demo-components';
import analysis from '@/application/routers/analysis/index.js';
import webConfig from '@/application/routers/web-config/index.js';
import content from '@/application/routers/content/index.js';
import resource from '@/application/routers/resource/index.js';
import page from '@/application/routers/page/index.js';
import account from '@/application/routers/account/index.js';
import log from '@/application/routers/log/index.js';

Vue.use(VueRouter);

const initRouter = () => {
  const routerParam = {
    routes: [{
      path: '/login',
      name: 'Login',
      component: (resolve) => require(['components/login/index'], resolve)
    }, {
      path: '/',
      component: (resolve) => require(['components/app/app-frame'], resolve),
      children: [{
        path: '',
        name: 'Home',
        redirect: '/analysis'
      }, {
        path: '/system-error',
        name: 'SystemError',
        component: (resolve) => require(['components/error-pages/500'], resolve),
        meta: { title: '系统错误' }
      }, {
        path: '/permission-error',
        name: 'PermissionError',
        component: (resolve) => require(['components/error-pages/403'], resolve),
        meta: { title: '权限错误' }
      },
      {
        path: '/notfound-error',
        name: 'NotfoundError',
        component: (resolve) => require(['components/error-pages/404'], resolve),
        meta: { title: '页面找不到' }
      },
      ...demoComponents,
      ...analysis,
      ...webConfig,
      ...content,
      ...resource,
      ...page,
      ...account,
      ...log,
      {
        path: '*',
        component: (resolve) => require(['components/error-pages/404'], resolve),
        meta: { title: '页面找不到' }
      }]
    }]
  };

  let router = new VueRouter(routerParam);

  router.beforeEach((to, from, next) => {
    HeyUI.$LoadingBar.start();
    if (to.meta && to.meta.title) {
      document.title = to.meta.title + ' - 管理应用';
    } else {
      document.title = 'JSCMS管理';
    }
    next();
  });
  router.afterEach(() => {
    HeyUI.$LoadingBar.success();
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    // baidu 统计，如果有自己的统计，请至index.html修改至自己的埋点
    if (window._hmt) {
      window._hmt.push(['_trackPageview', window.location.pathname]);
    }
  });
  return router;
};

export default initRouter;
