export default [
  {
    //菜单配置管理
    path: '/web-config/menus/list',
    name: 'WebConfigMenusList',
    meta: { 
      title: '菜单配置管理',
      icon: 'icon-paper'
    },
    component: (resolve) => require(['@/application/modules/web-config/menus/list.vue'], resolve)
  }
]
