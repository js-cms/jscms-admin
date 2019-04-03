export default [
  {
    //访问记录
    path: '/log/access/list',
    name: 'LogAccessList',
    meta: { 
      title: '访问记录',
      icon: 'icon-paper'
    },
    component: (resolve) => require(['@/application/modules/log/access/list.vue'], resolve)
  }
]
