/* eslint-disable */
import { News } from '@/utils/models';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    news: []
  },
  getters: {
    news: (state: any): News[] => {
      return state.news;
    }
  },
  mutations: {
    setNews(state: any, news: News[]) {
      state.news = news;
    }
  }
});

export default store;
