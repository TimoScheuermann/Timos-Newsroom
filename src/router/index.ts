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
      path: '*',
      redirect: { name: 'home' }
    }
  ]
});

export default router;

export function getTitle(): string {
  return prefix;
}
