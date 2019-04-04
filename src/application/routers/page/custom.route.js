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
  },
  {
    //编辑页面
    path: '/page/custom/edit',
    name: 'PageCustomEdit',
    meta: {
      title: '编辑自定义页面',
      icon: 'icon-paper'
    },
    component: (resolve) => require(['@/application/modules/page/custom/edit.vue'], resolve)
  }
]
