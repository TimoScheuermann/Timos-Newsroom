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
      return state.news.sort((a: News, b: News) => +b.date - +a.date);
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
      if (router.currentRoute.name !== 'home') router.push({ name: 'home' });
    },
    removeNews(state: any, news: News) {
      state.news = state.news.filter((n: News) => n._id !== news._id);
    },
    updateNews(state: any, news: News) {
      state.news = state.news.map((n: News) => {
        if (n._id !== news._id) return n;
        else return news;
      });
    },
    addNews(state: any, news: News) {
      state.news.push(news);
    }
  }
});

export default store;
