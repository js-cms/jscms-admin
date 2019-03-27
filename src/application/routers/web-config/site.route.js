export default [
  {
    //网站配置管理
    path: '/web-config/site',
    name: 'WebConfigSite',
    meta: { 
      title: '网站配置管理',
      icon: 'icon-paper'
    },
    component: (resolve) => require(['@/application/modules/web-config/site/edit.vue'], resolve)
  }
]