import layoutHeaderAside from '@/layout/header-aside'

const meta = { requiresAuth: true }

export default {
  path: '/category',
  name: 'category',
  meta,
  redirect: { name: 'category-list' },
  component: layoutHeaderAside,
  children: (pre => [
    { path: 'list', name: `${pre}list`, component: () => import('@/pages/category/list'), meta: { meta, title: '分类列表' } }
  ])('category-')
}
