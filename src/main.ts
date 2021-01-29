/* eslint-disable */
import App from '@/App.vue';
import router, { getTitle } from '@/router';
import store from '@/store';
import smoothscroll from 'smoothscroll-polyfill';
import * as TCComponents from 'tccomponents_vue';
import 'tccomponents_vue/lib/tccomponents_vue.css';
import Vue from 'vue';
import { Route } from 'vue-router';
import './registerServiceWorker';
import { handleNewsPreload } from './utils/functions';

smoothscroll.polyfill();

Vue.config.productionTip = false;

for (const component in TCComponents) {
  Vue.component(component, TCComponents[component]);
}

router.beforeEach((to: Route, from: Route, next: Function) => {
  const title = getTitle();
  document.title = title;

  const gt = document.querySelector('meta[name="title"]');
  if (gt) gt.setAttribute('content', title);

  const twitter = document.querySelector('meta[property="twitter:title"]');
  if (twitter) twitter.setAttribute('content', title);

  const og = document.querySelector('meta[property="og:title"]');
  if (og) og.setAttribute('content', title);

  if (to.name === 'news') {
    handleNewsPreload(to.params.news);
  }

  next();
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
