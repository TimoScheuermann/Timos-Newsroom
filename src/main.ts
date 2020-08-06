/* eslint-disable */
import App from '@/App.vue';
import router, { getTitle } from '@/router';
import store from '@/store';
import * as TCComponents from 'tccomponents_vue';
import 'tccomponents_vue/lib/tccomponents_vue.css';
import { getTAUser, persistLogin, verfiyTAUser } from 'timos-accounts';
import Vue from 'vue';
import { Route } from 'vue-router';
import './registerServiceWorker';

Vue.config.productionTip = false;

for (const component in TCComponents) {
  Vue.component(component, TCComponents[component]);
}

router.beforeEach(async (to: Route, from: Route, next: Function) => {
  const title = getTitle();
  document.title = title;

  const gt = document.querySelector('meta[name="title"]');
  if (gt) gt.setAttribute('content', title);

  const twitter = document.querySelector('meta[property="twitter:title"]');
  if (twitter) twitter.setAttribute('content', title);

  const og = document.querySelector('meta[property="og:title"]');
  if (og) og.setAttribute('content', title);

  const possibleToken = to.query.taToken as string;
  if (possibleToken) {
    persistLogin(possibleToken);
    next({ name: to.name });
    return;
  }

  if (await verfiyTAUser()) {
    store.commit('validate', getTAUser());
  }

  if (
    to.name !== 'home' &&
    !store.getters.valid &&
    store.getters.user.group !== 'Admin'
  ) {
    next({ name: 'home' });
  } else next();
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
