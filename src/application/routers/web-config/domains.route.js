export default [
  {
    //域名管理
    path: '/web-config/domains/list',
    name: 'WebConfigDomainsList',
    meta: { 
      title: '域名管理',
      icon: 'icon-paper'
    },
    component: (resolve) => require(['@/application/modules/web-config/domains/list.vue'], resolve)
  }
]
