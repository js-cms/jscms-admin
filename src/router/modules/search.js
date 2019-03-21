import layoutHeaderAside from '@/layout/header-aside'

const meta = { requiresAuth: true }

export default {
  path: '/search',
  name: 'search',
  meta,
  redirect: { name: 'search-list' },
  component: layoutHeaderAside,
  children: (pre => [
    { path: 'list', name: `${pre}list`, component: () => import('@/pages/search/list'), meta: { meta, title: '搜索记录列表' } }
  ])('search-')
}
