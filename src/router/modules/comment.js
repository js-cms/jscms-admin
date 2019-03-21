import layoutHeaderAside from '@/layout/header-aside'

const meta = { requiresAuth: true }

export default {
  path: '/comment',
  name: 'comment',
  meta,
  redirect: { name: 'comment-list' },
  component: layoutHeaderAside,
  children: (pre => [
    { path: 'list', name: `${pre}list`, component: () => import('@/pages/comment/list'), meta: { meta, title: '分类列表' } }
  ])('comment-')
}
