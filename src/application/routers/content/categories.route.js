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
  }
];
