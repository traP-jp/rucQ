import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Root',
      component: () => import('@/views/RootView.vue'),
    },
    {
      path: '/camps',
      name: 'Camps',
      component: () => import('@/views/CampSelectView.vue'),
    },
    {
      path: '/:campname',
      children: [
        {
          path: '',
          name: 'Guidebook',
          component: () => import('@/views/GuidebookView.vue'),
        },
        {
          path: 'schedule',
          name: 'Schedule',
          component: () => import('@/views/ScheduleView.vue'),
        },
        {
          path: 'personal-notes',
          name: 'PersonalNotes',
          component: () => import('@/views/PersonalNotesView.vue'),
        },
        {
          path: 'chat',
          name: 'Chat',
          component: () => import('@/views/ChatView.vue'),
        },
        {
          path: 'info',
          name: 'UserInformation',
          component: () => import('@/views/UserInformationView.vue'),
        },
        {
          path: 'info/users',
          name: 'UserRoomInformation',
          component: () => import('@/views/UserRoomInformationView.vue'),
        },
        {
          path: 'admin',
          children: [
            {
              path: '',
              name: 'AdminSettings',
              component: () => import('@/views/admin/AdminSettings.vue'),
            },
            {
              path: 'guidebook',
              name: 'GuidebookEdit',
              component: () => import('@/views/admin/AdminGuidebookEdit.vue'),
            },
            {
              path: 'users',
              name: 'UserInformationView',
              component: () => import('@/views/admin/AdminInformationView.vue'),
            },
            {
              path: 'users/detail/:id',
              name: 'DetailPage',
              component: () => import('@/views/admin/AdminInformationDetail.vue'),
            },
            {
              path: 'users/info',
              name: 'UserInfo',
              component: () => import('@/views/admin/AdminUserView.vue'),
            },
            {
              path: 'payments',
              name: 'AdminPayments',
              component: () => import('@/views/admin/AdminPaymentsView.vue'),
            },
            {
              path: 'payments/register',
              name: 'AdminPaymentRegister',
              component: () => import('@/views/admin/AdminPayments.vue'),
            },
          ],
        },
        {
          path: '/:path(.*)*',
          name: 'NotFoundView',
          component: () => import('@/views/NotFoundView.vue'),
        },
      ],
    },
  ],
})

export default router
