/* eslint-disable */
import router from '@/router';
import { News, User } from '@/utils/models';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    news: [],
    user: {} as User,
    validated: false
  },
  getters: {
    news: (state: any): News[] => {
      return state.news;
    },
    valid: (state: any): boolean => {
      return state.validated;
    },
    user: (state: any): User => {
      return state.user;
    }
  },
  mutations: {
    setNews(state: any, news: News[]) {
      state.news = news;
    },
    validate(state: any, user: User) {
      state.validated = true;
      state.user = user;
    },
    logout(state: any) {
      state.validated = false;
      state.user = undefined;
      router.push({ name: 'home' });
    }
  }
});

export default store;
