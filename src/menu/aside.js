// 菜单 侧边栏
export default [
  { path: '/index', title: '首页', icon: 'home' },
  {
    title: '站点配置',
    icon: 'cogs',
    children: [
      { path: '/config/domain', title: '域名配置' },
      { path: '/config/website', title: '网站配置' },
      { path: '/config/menu', title: '菜单配置' }
    ]
  },
  {
    title: '资源管理',
    icon: 'cubes',
    children: [
      {
        icon: 'image',
        path: '/resource/image', 
        title: '图片管理'
      }
    ]
  },
  {
    title: '标签管理',
    icon: 'tag',
    path: '/tag/list'
  },
  {
    title: '分类管理',
    icon: 'folder',
    path: '/category/list'
  },
  {
    title: '评论管理',
    icon: 'commenting',
    children: [
      { path: '/comment/list', title: '评论列表' }
    ]
  },
  {
    title: '文章管理',
    icon: 'file-word-o',
    children: [
      { path: '/article/list', title: '文章列表' }
    ]
  },
  {
    title: '自定义页面',
    icon: 'file-code-o',
    children: [
      { path: '/page/list', title: '页面列表' }
    ]
  },
  {
    title: '搜索管理',
    icon: 'search',
    children: [
      { path: '/search/list', title: '搜索记录' }
    ]
  },
  {
    title: '访问管理',
    icon: 'bar-chart-o ',
    children: [
      { path: '/visit/list', title: '访问记录' }
    ]
  }
]
