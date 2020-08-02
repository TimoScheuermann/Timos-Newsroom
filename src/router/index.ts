import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);
const prefix = "Newsroom - Timo's Design";
const routes: RouteConfig[] = [
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
];

if (window.location.href.includes('localhost')) {
  routes.push({
    path: '/generate',
    component: () => import('@/views/AssetGenerator.vue'),
    meta: {
      title: prefix + 'Asset Generator'
    }
  });
  routes.push({
    path: '/post',
    name: 'post',
    component: () => import('@/views/Post.vue'),
    meta: {
      title: prefix + 'Post news'
    }
  });
  routes.push({
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue'),
    meta: {
      title: prefix + 'login news'
    }
  });
}

const router = new VueRouter({
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  mode: 'history',
  routes: routes
});

export default router;

export function getTitle(): string {
  return prefix;
}
