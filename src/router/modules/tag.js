import layoutHeaderAside from '@/layout/header-aside'

const meta = { requiresAuth: true }

export default {
  path: '/tag',
  name: 'tag',
  meta,
  redirect: { name: 'tag-list' },
  component: layoutHeaderAside,
  children: (pre => [
    { path: 'list', name: `${pre}list`, component: () => import('@/pages/tag/list'), meta: { meta, title: '标签查看' } }
  ])('tag-')
}
