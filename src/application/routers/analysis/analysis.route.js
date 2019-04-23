export default [
  {
    //统计页
    path: '/analysis',
    name: 'AnalysisIndex',
    meta: {
      title: '统计页',
      icon: 'icon-paper'
    },
    component: (resolve) => require(['@/application/modules/analysis/analysis/index.vue'], resolve)
  }
]
