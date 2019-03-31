export default [
  {
    //标签列表
    path: '/content/tags/list',
    name: 'ContentTagsList',
    meta: { 
      title: '标签列表',
      icon: 'icon-paper'
    },
    component: (resolve) => require(['@/application/modules/content/tags/list.vue'], resolve)
  }
]
