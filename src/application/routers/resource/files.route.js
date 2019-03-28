export default [
  {
    //文件管理
    path: '/resource/files/list',
    name: 'ResourceFilesList',
    meta: { 
      title: '评论管理',
      icon: 'icon-paper'
    },
    component: (resolve) => require(['@/application/modules/resource/files/list.vue'], resolve)
  }
]
