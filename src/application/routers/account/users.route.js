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
  },
  {
    //编辑用户
    path: '/account/users/edit',
    name: 'AccountUsersEdit',
    meta: {
      title: '编辑用户',
      icon: 'icon-paper'
    },
    component: (resolve) => require(['@/application/modules/account/users/edit/index.vue'], resolve)
  }
]
