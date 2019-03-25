export default [
  {
    title: '统计面板',
    key: 'Home',
    icon: 'icon-monitor',
    count: 1
  },
  {
    title: '网站配置',
    icon: 'icon-grid-2',
    children: [
      {
        title: '域名配置',
        key: 'WebConfigDomainList'
      },
      // {
      //   title: '网站配置',
      //   key: 'TableSearch'
      // },
      // {
      //   title: '菜单配置',
      //   key: 'TableSearch'
      // }
    ]
  },
  {
    title: '内容管理',
    key: 'form-folder',
    icon: 'icon-paper',
    children: [
      {
        title: '文章管理',
        key: 'Form'
      },
      // {
      //   title: '标签管理',
      //   key: 'FormDetail'
      // },
      // {
      //   title: '分类管理',
      //   key: 'FormDetail'
      // }
    ]
  },
  {
    title: '页面管理',
    key: 'AutoComplete-folder',
    icon: 'icon-disc',
    children: [
      {
        title: '模糊搜索',
        key: 'Autocomplete1'
      },
      {
        title: '场景应用',
        key: 'Autocomplete2'
      },
      {
        title: '复杂场景',
        key: 'Autocomplete3'
      }
    ]
  },
  {
    title: '商城系统',
    key: 'Advance-folder',
    icon: 'icon-bar-graph-2',
    children: [
      {
        title: '图表',
        key: 'Chart'
      },
      {
        title: '富文本编辑器',
        key: 'RicktextEditor'
      },
      {
        title: '代码编辑器',
        key: 'CodeEditor'
      },
      {
        title: 'Markdown编辑器',
        key: 'MarkdownEditor'
      }, {
        title: '百度地图',
        key: 'BaiduMap'
      }
    ]
  },
  // {
  //   title: '论坛系统',
  //   key: 'SysSetting',
  //   icon: 'icon-cog',
  //   children: [
  //     {
  //       title: '个人中心',
  //       key: 'AccountBasic'
  //     },
  //     {
  //       title: '安全设置',
  //       key: 'SecuritySetting'
  //     }
  //   ]
  // },
  // {
  //   title: '用户管理',
  //   key: 'SysSetting',
  //   icon: 'icon-cog',
  //   children: [
  //     {
  //       title: '个人中心',
  //       key: 'AccountBasic'
  //     },
  //     {
  //       title: '安全设置',
  //       key: 'SecuritySetting'
  //     }
  //   ]
  // }
];

