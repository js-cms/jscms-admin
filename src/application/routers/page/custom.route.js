export default [
  {
    //自定义页面管理
    path: '/page/custom/list',
    name: 'PageCustomList',
    meta: { 
      title: '自定义页面管理',
      icon: 'icon-paper'
    },
    component: (resolve) => require(['@/application/modules/page/custom/list.vue'], resolve)
  }
]
