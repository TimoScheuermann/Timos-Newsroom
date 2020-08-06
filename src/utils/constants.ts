import Axios from 'axios';
import { getToken } from 'timos-accounts/dist/jwt-helper';

export const axios = Axios.create({
  headers: {
    Authorization: `Bearer ${getToken()}`
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
  'AMS Pro': 'https://ams-pro.de',
  "Timo's Accounts": 'https://accounts.timos.design',
  'Gastro Assistant': 'https://gastro-assistant.com'
};

export const projects: string[] = [
  'TC Components',
  "Timo's Icons",
  'Portfolio',
  'Investing Collectors',
  'DHBW Richie',
  "Timo's Translator",
  'NHL Stats',
  'AMS Pro',
  "Timo's Accounts",
  'Gastro Assistant'
];
