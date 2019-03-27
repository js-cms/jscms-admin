export default [
  {
    //菜单配置管理
    path: '/web-config/menu',
    name: 'WebConfigMenu',
    meta: { 
      title: '菜单配置管理',
      icon: 'icon-paper'
    },
    component: (resolve) => require(['@/application/modules/web-config/menu/list.vue'], resolve)
  }
]
