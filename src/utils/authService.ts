import store from '@/store';
import { axios } from '@/utils/constants';

function deleteCookie(name: string): void {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
}

function setCookie(key: string, value: string): void {
  document.cookie = `${key}=${value};${
    process.env.VUE_APP_LOCAL ? '' : 'domain=.timos.design;'
  }path=/`;
}

export function getCookie(name: string): string | undefined {
  const nameEQ = name + '=';
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return undefined;
}

export async function validateAndAutoLogin(): Promise<boolean> {
  deleteCookie('timos-designs-redirect');
  const token = getCookie('timos-designs-auth');
  if (token) {
    axios
      .post('user/verify')
      .then(() => {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        const user = JSON.parse(window.atob(base64));
        store.commit('validate', user);
        return true;
      })
      .catch(() => {
        return false;
      });
  }
  return false;
}

export function sendToLogin(): void {
  if (process.env.VUE_APP_LOCAL) {
    setCookie('timos-designs-redirect', 'http://localhost:8081');
    window.location.replace('http://localhost:8080');
  } else {
    setCookie('timos-designs-redirect', 'https://newsroom.timos.design');
    window.location.replace('https://accounts.timos.design');
  }
}

export function logOut() {
  store.commit('logout');
  deleteCookie('timos-designs-auth');
  deleteCookie('timos-designs-redirect');
}
