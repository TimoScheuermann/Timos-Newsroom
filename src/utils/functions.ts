import { backendURL } from './constants';
import { INewsExtended } from './interfaces';

/* eslint-disable */
export function copyToClipboard(text: string) {
  const dummy = document.createElement('textarea');
  document.body.appendChild(dummy);
  dummy.value = text;
  dummy.select();
  document.execCommand('copy');
  document.body.removeChild(dummy);
}

export function formatDate(time: any): string {
  switch (typeof time) {
    case 'number':
      break;
    case 'string':
      time = +new Date(time);
      break;
    case 'object':
      if (time.constructor === Date) time = time.getTime();
      break;
    default:
      time = +new Date();
  }
  const timeFormats = [
    [60, 'seconds', 1], // 60
    [120, '1 minute ago', '1 minute from now'], // 60*2
    [3600, 'minutes', 60], // 60*60, 60
    [7200, '1 hour ago', '1 hour from now'], // 60*60*2
    [86400, 'hours', 3600], // 60*60*24, 60*60
    [172800, 'Yesterday', 'Tomorrow'], // 60*60*24*2
    [604800, 'days', 86400], // 60*60*24*7, 60*60*24
    [1209600, 'Last week', 'Next week'], // 60*60*24*7*4*2
    [2419200, 'weeks', 604800], // 60*60*24*7*4, 60*60*24*7
    [4838400, 'Last month', 'Next month'], // 60*60*24*7*4*2
    [29030400, 'months', 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
    [58060800, 'Last year', 'Next year'], // 60*60*24*7*4*12*2
    [2903040000, 'years', 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
    [5806080000, 'Last century', 'Next century'], // 60*60*24*7*4*12*100*2
    [58060800000, 'centuries', 2903040000] // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
  ];
  let seconds = (+new Date() - time) / 1000,
    token = 'ago',
    listChoice = 1;

  if (seconds == 0) {
    return 'Just now';
  }
  if (seconds < 0) {
    seconds = Math.abs(seconds);
    token = 'from now';
    listChoice = 2;
  }
  let i = 0,
    format;
  while ((format = timeFormats[i++]))
    if (seconds < format[0]) {
      if (typeof format[2] == 'string') return (format as any)[listChoice];
      else
        return Math.floor(seconds / +format[2]) + ' ' + format[1] + ' ' + token;
    }
  return time;
}

export function collide(el1: HTMLElement, el2: HTMLElement): boolean {
  const rect1 = el1.getBoundingClientRect();
  const rect2 = el2.getBoundingClientRect();
  return !(
    rect1.top > rect2.bottom ||
    rect1.right < rect2.left ||
    rect1.bottom < rect2.top ||
    rect1.left > rect2.right
  );
}

export function handleNewsPreload(id: string): void {
  fetch(`${backendURL}/newsroom/${id}`)
    .then(res => res.json())
    .then((news: INewsExtended) => {
      if (news) {
        const options = {
          title: news.title,
          description: news.content,
          image: news.thumbnail,
          url: 'https://newsroom.timos.design/news/' + id
        };
        [
          'meta[name="%"]',
          'meta[property="og:%"]',
          'meta[property="twitter:%"]'
        ].forEach(type => {
          for (const [key, value] of Object.entries(options)) {
            const element = document.querySelector(type.replace('%', key));
            if (element) {
              element.setAttribute('content', value);
            }
          }
        });
      }
    });
}
