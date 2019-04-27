export default [
  {
    title: '统计面板',
    key: 'AnalysisIndex',
    icon: 'icon-monitor',
    count: 1
  },
  {
    title: '站点配置',
    key: 'WebConfig',
    icon: 'icon-cog',
    children: [
      {
        title: '网站配置',
        key: 'WebConfigSite'
      },
      {
        title: '域名配置',
        key: 'WebConfigDomainsList'
      },
      {
        title: '菜单配置',
        key: 'WebConfigMenusList'
      },
      {
        title: '链接配置',
        key: 'WebConfigLinksList'
      },
      {
        title: 'Robots配置',
        key: 'WebConfigRobots'
      }
    ]
  },
  {
    title: '内容管理',
    key: 'Content',
    icon: 'icon-paper',
    children: [
      {
        title: '分类管理',
        key: 'ContentCategoriesList'
      },
      {
        title: '文章管理',
        key: 'ContentArticlesList'
      },
      {
        title: '评论管理',
        key: 'ContentCommentsList'
      },
      {
        title: '标签展示',
        key: 'ContentTagsList'
      }
    ]
  },
  {
    title: '资源管理',
    key: 'Resource',
    icon: 'icon-share',
    children: [
      {
        title: '图片管理',
        key: 'ResourceImagesList'
      }
    ]
  },
  {
    title: '页面管理',
    key: 'Page',
    icon: 'icon-paper-stack',
    children: [
      {
        title: '自定义页面',
        key: 'PageCustomList'
      }
    ]
  },
  {
    title: '账户中心',
    key: 'Account',
    icon: 'icon-head',
    children: [
      {
        title: '用户管理',
        key: 'AccountUsersList'
      }
    ]
  },
  {
    title: '日志管理',
    key: 'Log',
    icon: 'icon-book',
    children: [
      {
        title: '搜索记录',
        key: 'LogSearchList'
      }, {
        title: '访问记录',
        key: 'LogAccessList'
      }
    ]
  }
];
