export default [
  {
    //图片管理
    path: '/resource/images/list',
    name: 'ResourceImagesList',
    meta: { 
      title: '图片管理',
      icon: 'icon-paper'
    },
    component: (resolve) => require(['@/application/modules/resource/images/list.vue'], resolve)
  }
]
