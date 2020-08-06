import Axios from 'axios';
import { getCookie } from './functions';

export const axios = Axios.create({
  headers: {
    Authorization: `Bearer ${getCookie('timos-designs-auth')}`
  },
  baseURL: process.env.VUE_APP_LOCAL
    ? 'http://localhost:3000/'
    : 'https://api.timos.design/'
});

export const urls: Record<string, string> = {
  'DHBW Richie': 'https://dhbw-richie.netlify.app',
  'Investing Collectors': 'https://wip-investing-collectors.netlify.app',
  'TC Components': 'https://components.timos.design',
  "Timo's Icons": 'https://icons.timos.design',
  Portfolio: 'https://portfolio.timos.design',
  'NHL Stats': 'https://github.com/TimoScheuermann/Advanced-DB-Cassandra',
  "Timo's Translator": 'https://translator.timos.design',
  'AMS Pro': 'https://ams-pro.de'
};
