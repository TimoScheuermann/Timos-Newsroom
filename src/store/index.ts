import { INewsExtended } from '@/utils/interfaces';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    news: null,
    projects: null,
    olderNews: null,
    featured: null
  },
  getters: {
    news: (state: any): INewsExtended[] | null => {
      return state.news;
    },
    projects: (state: any): string[] | null => {
      return state.projects;
    },
    olderNews: (state: any): INewsExtended[] | null => {
      return state.olderNews;
    },
    featured: (state: any): INewsExtended[] | null => {
      const featured: INewsExtended[] | null = state.featured;
      if (!featured) return null;
      return featured.sort((a, b) => b.timestamp - a.timestamp);
    }
  },
  mutations: {
    setNews(state: any, news: INewsExtended[]): void {
      state.news = news;
    },
    setProjects(state: any, projects: string[]): void {
      state.projects = projects;
    },
    setOlderNews(state: any, news: INewsExtended[]): void {
      state.olderNews = news;
    },
    setFeatured(state: any, news: INewsExtended[]): void {
      state.featured = news;
    }
  }
});

export default store;
