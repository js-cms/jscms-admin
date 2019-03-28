export default [
  {
    //评论管理
    path: '/content/comments/list',
    name: 'ContentCommentsList',
    meta: { 
      title: '评论管理',
      icon: 'icon-paper'
    },
    component: (resolve) => require(['@/application/modules/content/comments/list.vue'], resolve)
  }
]
