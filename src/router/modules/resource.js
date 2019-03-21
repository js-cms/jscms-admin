import layoutHeaderAside from '@/layout/header-aside'

const meta = { requiresAuth: true }

export default {
  path: '/resource',
  name: 'resource',
  meta,
  redirect: { name: 'resource-image' },
  component: layoutHeaderAside,
  children: (pre => [
    { path: 'image', name: `${pre}image`, component: () => import('@/pages/resource/image'), meta: { meta, title: '图片管理' } }
  ])('resource-')
}
