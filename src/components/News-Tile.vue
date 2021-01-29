<template>
  <router-link
    :to="{ name: 'news', params: { news: news._id } }"
    class="news-tile"
    v-if="news"
  >
    <div class="media" :style="mediaStyle" />
    <div class="container">
      <div class="type" :type="news.type">{{ news.type }}</div>
      <div class="title">{{ news.title }}</div>
      <div class="date">{{ date }}</div>
    </div>
  </router-link>
</template>

<script lang="ts">
import { INewsExtended } from '@/utils/interfaces';
import { Vue, Component, Prop } from 'vue-property-decorator';
import { months } from '@/utils/constants';

@Component
export default class NewsTile extends Vue {
  @Prop() news!: INewsExtended;

  get date(): string {
    if (!this.news) return '';
    const date = new Date(this.news.timestamp);

    return `${
      months[date.getMonth()]
    } ${date.getDate()}, ${date.getFullYear()}`;
  }

  get mediaStyle(): string {
    if (!this.news) return '';
    return `background-image: url('${this.news.thumbnail}')`;
  }
}
</script>
<style lang="scss" scoped>
.news-tile {
  text-decoration: none;
  display: flex;
  flex-direction: column;
  background: $paragraph;
  color: inherit;

  @media only screen and (min-width: 450px) {
    &:first-child {
      display: grid;
      grid-template-columns: 2fr 1fr;
      .media {
        border-radius: $border-radius 0 0 $border-radius;
        min-height: 240px;
      }
    }
  }

  .media {
    border-radius: $border-radius $border-radius 0 0;
    overflow: hidden;
    min-height: 200px;
    background: #eaeaec;
    background: {
      repeat: no-repeat;
      size: cover;
      position: center;
    }
  }
  border-radius: $border-radius;

  transition: 0.1s ease-in-out;
  box-shadow: $shadow-light;
  &:hover {
    box-shadow: $shadow;
    transform: scale(1.007);
  }
  .container {
    padding: 20px;
    display: flex;
    flex-direction: column;
    flex-grow: 2;

    .title {
      font-weight: bold;
      font-size: 18px;
      flex-grow: 1;
    }
    .type {
      text-transform: capitalize;
      font-size: 14px;
      font-weight: bold;
      margin-bottom: 4px;
      opacity: 0.75;

      &[type='update'] {
        color: $primary;
      }
      &[type='release'] {
        color: $error;
      }
      &[type='feature'] {
        color: $success;
      }
    }
    .date {
      margin-top: 10px;
    }
  }
}
</style>
