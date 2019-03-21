import layoutHeaderAside from '@/layout/header-aside'

const meta = { requiresAuth: true }

export default {
  path: '/page',
  name: 'page',
  meta,
  redirect: { name: 'page-list' },
  component: layoutHeaderAside,
  children: (pre => [
    { path: 'list', name: `${pre}list`, component: () => import('@/pages/page/list'), meta: { meta, title: '自定义页面列表' } }
  ])('config-')
}
