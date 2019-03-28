export default [
  {
    //友情链接配置管理
    path: '/web-config/links/list',
    name: 'WebConfigLinksList',
    meta: { 
      title: '友情链接配置管理',
      icon: 'icon-paper'
    },
    component: (resolve) => require(['@/application/modules/web-config/links/list.vue'], resolve)
  }
]
