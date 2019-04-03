export default [
  {
    //搜索记录
    path: '/log/search/list',
    name: 'LogSearchList',
    meta: { 
      title: '搜索记录',
      icon: 'icon-paper'
    },
    component: (resolve) => require(['@/application/modules/log/search/list.vue'], resolve)
  }
]
