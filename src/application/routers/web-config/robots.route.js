export default [
  {
    //robots内容配置
    path: '/web-config/robots',
    name: 'WebConfigRobots',
    meta: { 
      title: 'robots文件内容配置',
      icon: 'icon-paper'
    },
    component: (resolve) => require(['@/application/modules/web-config/robots/edit.vue'], resolve)
  }
]
