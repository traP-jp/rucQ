import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
              path: 'detail/:id',
              name: 'DetailPage',
              component: () => import('@/views/admin/AdminInformationDetail.vue'),
            },
          ],
        },
      ],
    },
  ],
})

export default router