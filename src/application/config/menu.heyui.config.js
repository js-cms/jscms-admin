export default [
  {
    title: '统计面板',
    key: 'Home',
    icon: 'icon-monitor',
    count: 1
  },
  {
    title: '站点配置',
    key: 'WebConfig',
    icon: 'icon-grid-2',
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
        title: '标签管理',
        key: 'ContentTagsList'
      },
      {
        title: '评论管理',
        key: 'ContentCommentsList'
      }
    ]
  },
  {
    title: '资源管理',
    key: 'Resource',
    icon: 'icon-disc',
    children: [
      {
        title: '图片管理',
        key: 'ResourceImagesList'
      },
      {
        title: '文件管理',
        key: 'ResourceFilesList'
      }
    ]
  },
  {
    title: '页面管理',
    key: 'Page',
    icon: 'icon-disc',
    children: [
      {
        title: '自定义页面',
        key: 'PageCustomsList'
      }
    ]
  },
  {
    title: '用户系统',
    key: 'User',
    icon: 'icon-cog',
    children: [
      {
        title: '用户列表',
        key: 'UsersList'
      }
    ]
  }
];
