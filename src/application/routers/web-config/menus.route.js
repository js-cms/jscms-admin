export default [
  {
    //菜单列表
    path: '/web-config/menus/list',
    name: 'WebConfigMenusList',
    meta: {
      title: '菜单列表',
      icon: 'icon-paper'
    },
    component: (resolve) => require(['@/application/modules/web-config/menus/list.vue'], resolve)
  },
  {
    //菜单编辑
    path: '/web-config/menus/edit',
    name: 'WebConfigMenusEdit',
    meta: {
      title: '菜单编辑',
      icon: 'icon-paper'
    },
    component: (resolve) => require(['@/application/modules/web-config/menus/edit.vue'], resolve)
  }
]
