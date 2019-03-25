export default [
  {
    //域名管理
    path: '/web-config/domain/list',
    name: 'WebConfigDomainList',
    meta: { 
      title: '域名管理',
      icon: 'icon-paper'
    },
    component: (resolve) => require(['@/application/modules/web-config/domain/list.vue'], resolve)
  }
]