import layoutHeaderAside from '@/layout/header-aside'

const meta = { requiresAuth: true }

export default {
  path: '/config',
  name: 'config',
  meta,
  redirect: { name: 'config-domain' },
  component: layoutHeaderAside,
  children: (pre => [
    { path: 'domain', name: `${pre}domain`, component: () => import('@/pages/config/domain'), meta: { meta, title: '域名配置' } },
    { path: 'website', name: `${pre}website`, component: () => import('@/pages/config/website'), meta: { meta, title: '网站配置' } },
    { path: 'menu', name: `${pre}menu`, component: () => import('@/pages/config/menu'), meta: { meta, title: '菜单配置' } }
  ])('config-')
}
