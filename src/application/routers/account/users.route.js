export default [
  {
    //用户管理
    path: '/account/users/list',
    name: 'AccountUsersList',
    meta: {
      title: '用户管理',
      icon: 'icon-paper'
    },
    component: (resolve) => require(['@/application/modules/account/users/list.vue'], resolve)
  }
]
