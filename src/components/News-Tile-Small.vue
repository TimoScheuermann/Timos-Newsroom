<template>
  <router-link
    :to="{ name: 'news', params: { news: news._id } }"
    class="news-tile-small"
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
export default class NewsTileSmall extends Vue {
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
.news-tile-small {
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-wrap: nowrap;
  padding: 15px 0;

  &:not(:last-child) {
    border-bottom: 1px solid rgba($color, 0.25);
  }

  .media {
    border-radius: $border-radius;
    min-height: 120px;
    min-width: 120px;
    background: #eaeaec;
    background: {
      repeat: no-repeat;
      size: cover;
      position: center;
    }
  }

  .container {
    padding: 10px 20px;
    display: flex;
    flex-direction: column;

    .title {
      font-weight: bold;
      //   font-size: 18px;
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
