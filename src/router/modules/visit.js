import layoutHeaderAside from '@/layout/header-aside'

const meta = { requiresAuth: true }

export default {
  path: '/visit',
  name: 'visit',
  meta,
  redirect: { name: 'visit-list' },
  component: layoutHeaderAside,
  children: (pre => [
    { path: 'list', name: `${pre}list`, component: () => import('@/pages/visit/list'), meta: { meta, title: '全站访问记录表' } }
  ])('visit-')
}
