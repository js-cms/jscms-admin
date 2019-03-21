import layoutHeaderAside from '@/layout/header-aside'

const meta = { requiresAuth: true }

export default {
  path: '/article',
  name: 'article',
  meta,
  redirect: { name: 'article-list' },
  component: layoutHeaderAside,
  children: (pre => [
    { path: 'list', name: `${pre}list`, component: () => import('@/pages/article/list'), meta: { meta, title: '文章列表' } },
    { path: 'edit', name: `${pre}edit`, component: () => import('@/pages/article/edit'), meta: { meta, title: '文章编辑页' } }
  ])('article-')
}
