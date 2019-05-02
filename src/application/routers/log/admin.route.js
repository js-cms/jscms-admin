export default [
  {
    //后台操作日志
    path: '/log/admin/list',
    name: 'LogAdminList',
    meta: { 
      title: '后台操作日志',
      icon: 'icon-paper'
    },
    component: (resolve) => require(['@/application/modules/log/admin/list.vue'], resolve)
  }
]
