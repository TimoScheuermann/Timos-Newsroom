import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);
const prefix = "Newsroom - Timo's Design";

const router = new VueRouter({
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home.vue'),
      meta: {
        title: prefix + 'Home'
      }
    },
    {
      path: '/project/:project',
      name: 'project',
      component: () => import('@/views/Project.vue'),
      meta: {
        title: prefix + 'Project'
      }
    },
    {
      path: '/news/:news',
      name: 'news',
      component: () => import('@/views/News.vue'),
      meta: {
        title: prefix + 'News'
      }
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('@/views/Search.vue'),
      meta: {
        title: prefix + 'Search'
      }
    },
    {
      path: '/archive',
      name: 'archive',
      component: () => import('@/views/Archive.vue'),
      meta: {
        title: prefix + 'Archive'
      }
    },
    {
      path: '/archive/:project',
      name: 'archive-project',
      component: () => import('@/views/Archive.vue'),
      meta: {
        title: prefix + 'Archive'
      }
    },
    {
      path: '*',
      redirect: { name: 'home' }
    }
  ]
});
export default router;

export function getTitle(): string {
  return prefix;
}
