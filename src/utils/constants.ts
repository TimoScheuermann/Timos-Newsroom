import { News, Project } from './models';

export const urls: Record<Project, string> = {
  'DHBW Richie': 'https://dhbw-richie.netlify.app',
  'Investing Collectors': 'https://wip-investing-collectors.netlify.app',
  'TC Components': 'https://components.timos.design',
  "Timo's Icons": 'https://icons.timos.design',
  Portfolio: 'https://portfolio.timos.design'
};

const timosIconsUpdate = 'assets/timosicons/updates/';

export const news: News[] = [
  {
    title: "Timo's Icons v2.16 has been released",
    description:
      'This updated brings 23 new icons. Featuring sort alphabetical ascending, sort alphabetical descending, sort numeric ascending, sort numeric descending, tiles minus, tiles plus, sort alphabetical, sort numeric, tiles four, tiles nine, tiles sixteen, volume 0, volume cross, volume off, eye, eye slash, volume 1, volume 2, volume 3, volume minus, volume plus, cross inverted, sidebar alt',
    thumbnail: timosIconsUpdate + '2.16.png',
    type: 'update',
    project: "Timo's Icons",
    date: 1594654078000
  },
  {
    title: "Timo's Icons v2.15 has been released",
    description:
      'This updated brings 14 new icons. Featuring biohazard, cloud fog, cloud moon rain, cloud snow rain, cloud sun rain, database, cloud moon, cloud rain, cloud snow, cloud sun, cloud thunder, cloud thunder rain, map marker, snowflake',
    thumbnail: timosIconsUpdate + '2.15.png',
    type: 'update',
    project: "Timo's Icons",
    date: 1592237957000
  },
  {
    title: "Timo's Icons v2.14 has been released",
    description:
      'This updated brings 19 new icons. Featuring calendar alt, image, mail, mail unread, music, notification disabled, wrench, anchor, calendar, map, microscope, notification, phone alt, photos, present, settings, star add, ticket, umbrella',
    thumbnail: timosIconsUpdate + '2.14.png',
    type: 'update',
    project: "Timo's Icons",
    date: 1590837186000
  },
  {
    title: "Timo's Icons v2.13 has been released",
    description:
      'This updated brings 15 new icons. Featuring attachment, chat bubble, chat bubbles, cloud upload, hard drive, microphone muted, movie, newspaper, trashcan alt, upload, cloud, cloud download, link, power, printer',
    thumbnail: timosIconsUpdate + '2.13.png',
    type: 'update',
    project: "Timo's Icons",
    date: 1590774163000
  },
  {
    title: "Timo's Icons v2.12 has been released",
    description:
      'This updated brings 27 new icons. Featuring login, logout, chevron down, chevron left, chevron up, double chevron down, double chevron left, double chevron right, double chevron up, arrow return, calculator, chevron right, cocktail, color fan, fast backward, filter, flashlight, numpad, star, fast forward, list add, pause, play, step backwards, step forward, stop, wifi 0',
    thumbnail: timosIconsUpdate + '2.12.png',
    type: 'update',
    project: "Timo's Icons",
    date: 1590159451000
  },
  {
    title: "Timo's Icons v2.11 has been released",
    description:
      'This updated brings 6 new icons. Featuring chart stocks, clock simple, credit card, dollar, globe, vehicle front',
    thumbnail: timosIconsUpdate + '2.11.png',
    type: 'update',
    project: "Timo's Icons",
    date: 1586811198000
  },
  {
    title: "Timo's Icons v2.10 has been released",
    description:
      'This updated brings 26 new icons. Featuring pin person, band aid, female, headphone, headset, heartbeat, heart broken, pin, apple, exchange, exclamation, exclamation circle, exclamation triangle, heart empty, male, microphone, minecraft, question circle, question triangle, tesla, thermometer three quarter, barometer, thermometer empty, thermometer full, thermometer half, thermometer quarter',
    thumbnail: timosIconsUpdate + '2.10.png',
    type: 'update',
    project: "Timo's Icons",
    date: 1585408686000
  },
  {
    title: "Timo's Icons v2.9 has been released",
    description:
      'This updated brings 9 new icons. Featuring key, lock closed, lock opened, alarm, minus, plus, segment, slider, tooltip',
    thumbnail: timosIconsUpdate + '2.9.png',
    type: 'update',
    project: "Timo's Icons",
    date: 1584202154000
  },
  {
    title: "Timo's Icons v2.8 has been released",
    description:
      'This updated brings 21 new icons. Featuring dice 4, dice 5, bar, bar progress, crosshair, dice 1, dice 2, dice 3, dice 6, moon, peace, quote left, repeat, sun, swap, user circle, wifi 1, wifi 2, wifi 3, percentage, quote right',
    thumbnail: timosIconsUpdate + '2.8.png',
    type: 'update',
    project: "Timo's Icons",
    date: 1582890778000
  },
  {
    title: "Timo's Icons v2.0 has been released",
    description:
      'This updated brings 12 new icons. Featuring user card, add, checkmark circle, checkmarks, cross circle, gears, heart, house, i circle, save, stars, thunder',
    thumbnail: timosIconsUpdate + '2.0.png',
    type: 'update',
    project: "Timo's Icons",
    date: 1574596322000
  },
  {
    title: "Timo's Icons v1.0 has been released",
    description:
      'This updated brings 71 new icons. Featuring camera, chart donut, chart pie, chart radial, computer, github, hockey sticks, modal, phone, spinner, tabbar, toggle, windows, amspro, button, card, chart bar, chart empty, chart radar, checkbox, code, component, divider, download, hockey stick, input, painting, table, arrow left, arrow up right, book, book p, book q, chart line, checkmark, scale, sidebar, todo, user, user active, user inactive, users, arrow down, arrow down left, arrow down right, arrow up, arrow up left, bucket, dot, dots, farm, list, list check, moped license plate, offer, scale out, scale in, arrow right, at, circle, cross, hashtag, lens, list bullet, pencil, questionmark, reply, server, share, tools, trashcan',
    thumbnail: timosIconsUpdate + '1.0.png',
    type: 'update',
    project: "Timo's Icons",
    date: 1572522730000
  }
];
