export default [
  {
    //分类管理
    path: '/content/categories/list',
    name: 'ContentCategoriesList',
    meta: {
      title: '分类管理',
      icon: 'icon-paper'
    },
    component: (resolve) => require(['@/application/modules/content/categories/list.vue'], resolve)
  },
  {
    //分类编辑
    path: '/content/categories/edit',
    name: 'ContentCategoriesEdit',
    meta: {
      title: '分类编辑',
      icon: 'icon-paper'
    },
    component: (resolve) => require(['@/application/modules/content/categories/edit.vue'], resolve)
  }
]