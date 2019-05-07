export default [
    {
      //公告管理
      path: '/web-config/notices/list',
      name: 'WebConfigNoticesList',
      meta: { 
        title: '公告管理',
        icon: 'icon-paper'
      },
      component: resolve => require(['@/application/modules/web-config/notices/list.vue'], resolve)
    }
  ]
  