import { News, Project } from './models';

export const urls: Record<Project, string> = {
  'DHBW Richie': 'https://dhbw-richie.netlify.app',
  'Investing Collectors': 'https://wip-investing-collectors.netlify.app',
  'TC Components': 'https://components.timos.design',
  "Timo's Icons": 'https://icons.timos.design',
  Portfolio: 'https://portfolio.timos.design',
  'NHL Stats': 'https://github.com/TimoScheuermann/Advanced-DB-Cassandra',
  "Timo's Translator": 'https://translator.timos.design',
  'AMS Pro': 'https://ams-pro.de'
};

const timosIconsUpdate = 'assets/timosicons/updates/';
const timosIconsFeature = 'assets/timosicons/features/';
const tcComponentsFeatures = 'assets/tccomponents/features/';
const timosTranslatorReleases = 'assets/timostranslator/releases/';

export const news: News[] = [
  {
    title: 'Icon Issue Page - Submit your own request',
    description:
      "You either can't find the right icon for your project or there is something wrong with an icon or You want something to be changed, then submit Your issue using the button below.",
    thumbnail: timosIconsFeature + 'issues-page.png',
    type: 'feature',
    project: "Timo's Icons",
    date: 1591467660000
  },
  {
    title: 'You can now copy the SVG code of any icon',
    description:
      'Instead of having to load the whole library into your project, you can now simply copy the icon you want to use in your project and paste them right into your template.',
    thumbnail: timosIconsFeature + 'copy svg.png',
    type: 'feature',
    project: "Timo's Icons",
    date: 1593815651000
  },
  {
    title: 'Introducing TC Components - Designer',
    description:
      'The component designer will let you easily style TC Components. Simply edit every possible attribute and copy your mark-up. Save styles and load them for later edits.',
    thumbnail: tcComponentsFeatures + 'introducing-designer.png',
    type: 'feature',
    project: 'TC Components',
    date: 1590522421000
  },
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
    title: "Timo's Icons v2.7 has been released",
    description:
      'This updated brings 10 new icons. Featuring camera, chart donut, chart pie, chart radial, computer, github, hockey sticks, modal, phone, spinner',
    thumbnail: timosIconsUpdate + '2.7.png',
    type: 'update',
    project: "Timo's Icons",
    date: 1582038360000
  },
  {
    title: "Timo's Icons v2.6 has been released",
    description:
      'This updated brings 5 new icons. Featuring tabbar, toggle, windows, amspro, button',
    thumbnail: timosIconsUpdate + '2.6.png',
    type: 'update',
    project: "Timo's Icons",
    date: 1581953700000
  },
  {
    title: "Timo's Icons v2.5 has been released",
    description:
      'This updated brings 6 new icons. Featuring card, chart bar, chart empty, chart radar, checkbox, chart line',
    thumbnail: timosIconsUpdate + '2.5.png',
    type: 'update',
    project: "Timo's Icons",
    date: 1581701340000
  },
  {
    title: "Timo's Icons v2.4 has been released",
    description:
      'This updated brings 7 new icons. Featuring code, component, divider, download, hockey stick, input, painting',
    thumbnail: timosIconsUpdate + '2.4.png',
    type: 'update',
    project: "Timo's Icons",
    date: 1581626340000
  },
  {
    title: "Timo's Icons v2.3 has been released",
    description:
      'This updated brings 8 new icons. Featuring table, book, book p, book q, checkmark, scale, sidebar, todo',
    thumbnail: timosIconsUpdate + '2.3.png',
    type: 'update',
    project: "Timo's Icons",
    date: 1581547140000
  },
  {
    title: "Timo's Icons v2.2 has been released",
    description:
      'This updated brings 4 new icons. Featuring user, user active, user inactive, users',
    thumbnail: timosIconsUpdate + '2.2.png',
    type: 'update',
    project: "Timo's Icons",
    date: 1581528540000
  },
  {
    title: "Timo's Icons v2.1 has been released",
    description:
      'This updated brings 10 new icons. Featuring bucket, dot, dots, farm, list, list check, moped license plate, offer, scale out, scale in',
    thumbnail: timosIconsUpdate + '2.1.png',
    type: 'update',
    project: "Timo's Icons",
    date: 1581467220000
  },
  {
    title: "Timo's Icons v2.0 has been released",
    description:
      'This updated brings 33 new icons. Featuring arrow right, arrow left, arrow up right, arrow down, arrow down left, arrow down right, arrow up, arrow up left, at, circle, cross, hashtag, lens, list bullet, pencil, questionmark, reply, server, share, tools, trashcan, user card, add, checkmark circle, checkmarks, cross circle, gears, heart, house, i circle, save, stars, thunder',
    thumbnail: timosIconsUpdate + '2.0.png',
    type: 'update',
    project: "Timo's Icons",
    date: 1574596322000
  },
  {
    title: "Introducing Timo's Icons",
    description:
      'A library of high-quality ready to use icons that will help you speed up your development workflow.',
    thumbnail:
      'https://icons.timos.design/pwa/splash/apple-splash-2732-2048.jpg',
    type: 'release',
    project: "Timo's Icons",
    date: 1572292842000
  },
  {
    title: 'Introducing TC Components',
    description:
      'A Vue.js component-library of high-quality ready to use components that will help you speed up your development workflow.',
    thumbnail:
      'https://components.timos.design/pwa/splash/apple-splash-2732-2048.jpg',
    type: 'release',
    project: 'TC Components',
    date: 1586273708000
  },
  {
    title: 'Introducing Investing-Collectors',
    description:
      'At Investing Collectors we are firm believers in the innovative power of car values, cryptocurrencies, digitised assets and blockchain technology. Our mission is to tear down the barriers to personal finance and bring emotional binding rare cars into the 21st century.',
    thumbnail: 'https://wip-investing-collectors.netlify.app/assets/logo.png',
    type: 'release',
    project: 'Investing Collectors',
    date: 1581123420000
  },
  {
    title: "Introducing Timo's Translator",
    description:
      "Translate received messages of Timo to human readable text. Insert received messages and Timo's Translator will replace any known abbreviation",
    thumbnail: timosTranslatorReleases + 'introduction.png',
    type: 'release',
    project: "Timo's Translator",
    date: 1594237680000
  },
  {
    title: 'Introducing NHL Stats',
    description:
      'University Project: NHL Stats, is a demonstrating web application to compare scores of NHL teams and players of different season. Packed in a beatiful Web UI.',
    thumbnail:
      'https://portfolio.timos.design/assets/projects/nhlstats/preview.png',
    type: 'release',
    project: 'NHL Stats',
    date: 1573663620000
  },
  {
    title: 'Introducing AMS Pro Icons',
    description:
      'This updated brings special icons, exclusively designed for ams-pro.de. They will be feautured on their management platform for workprotection and healthprotection',
    thumbnail: 'assets/amspro/releases/icons.png',
    type: 'release',
    project: 'AMS Pro',
    date: 1585595760000
  }
];
