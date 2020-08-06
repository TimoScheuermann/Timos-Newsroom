/* eslint-disable */
import App from '@/App.vue';
import router, { getTitle } from '@/router';
import store from '@/store';
import * as TCComponents from 'tccomponents_vue';
import 'tccomponents_vue/lib/tccomponents_vue.css';
import Vue from 'vue';
import { Route } from 'vue-router';
import './registerServiceWorker';
import { User } from './utils/models';

Vue.config.productionTip = false;

for (const component in TCComponents) {
  Vue.component(component, TCComponents[component]);
}

router.beforeEach((to: Route, from: Route, next: Function) => {
  if (
    (to.name === 'edit' || to.name === 'post') &&
    !store.getters.valid &&
    (store.getters.user as User).group !== 'Admin'
  )
    next(false);
  else next();

  const title = getTitle();
  document.title = title;

  const gt = document.querySelector('meta[name="title"]');
  if (gt) gt.setAttribute('content', title);

  const twitter = document.querySelector('meta[property="twitter:title"]');
  if (twitter) twitter.setAttribute('content', title);

  const og = document.querySelector('meta[property="og:title"]');
  if (og) og.setAttribute('content', title);
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
