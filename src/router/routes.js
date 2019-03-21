import config from './modules/config'
import category from './modules/category'
import resource from './modules/resource'
import tag from './modules/tag'
import comment from './modules/comment'
import article from './modules/article'
import search from './modules/search'
import visit from './modules/visit'
import page from './modules/page'

import layoutHeaderAside from '@/layout/header-aside'

const meta = { requiresAuth: true }

/**
 * 在主框架内显示
 */
const frameIn = [
  {
    path: '/',
    redirect: { name: 'index' },
    component: layoutHeaderAside,
    children: [
      {
        path: 'index',
        name: 'index',
        meta,
        component: () => import('@/pages/index')
      }
    ]
  },
  config,
  category,
  resource,
  tag,
  comment,
  article,
  search,
  visit,
  page
]

/**
 * 在主框架之外显示
 */
const frameOut = [
  // 页面重定向使用 必须保留
  {
    path: '/redirect/:path*',
    component: {
      beforeCreate () { this.$router.replace(JSON.parse(this.$route.params.path)) },
      render: h => h()
    }
  },
  // 登录
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/login')
  }
]

/**
 * 错误页面
 */
const errorPage = [
  // 404
  {
    path: '*',
    name: '404',
    component: () => import('@/pages/error-page-404')
  }
]

// 导出需要显示菜单的
export const frameInRoutes = frameIn

// 重新组织后导出
export default [
  ...frameIn,
  ...frameOut,
  ...errorPage
]
