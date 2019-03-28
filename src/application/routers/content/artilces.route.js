export default [
  {
    //文章管理
    path: '/content/articles/list',
    name: 'ContentArticlesList',
    meta: {
      title: '文章管理',
      icon: 'icon-paper'
    },
    component: (resolve) => require(['@/application/modules/content/articles/list.vue'], resolve)
  },
  {
    //文章编辑
    path: '/content/articles/edit',
    name: 'ContentArticlesEdit',
    meta: {
      title: '文章编辑',
      icon: 'icon-paper'
    },
    component: (resolve) => require(['@/application/modules/content/articles/edit.vue'], resolve)
  }
]
