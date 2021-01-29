<template>
  <div
    class="news-tile-features"
    :focused="focused"
    :style="mediaStyle"
    v-if="news"
    @click="focus"
  >
    <div class="container">
      <div class="type" :type="news.type">{{ news.type }}</div>
      <div class="title">{{ news.title }}</div>
      <div class="date">{{ date }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { INewsExtended } from '@/utils/interfaces';
import { Vue, Component, Prop } from 'vue-property-decorator';
import { months } from '@/utils/constants';

@Component
export default class NewsTileFeatured extends Vue {
  @Prop() news!: INewsExtended;
  @Prop() focused!: boolean;

  get date(): string {
    if (!this.news) return '';
    const date = new Date(this.news.timestamp);

    return `${
      months[date.getMonth()]
    } ${date.getDate()}, ${date.getFullYear()}`;
  }

  get mediaStyle(): string {
    if (!this.news) return '';
    return `background-image: url('${this.news.featured ||
      this.news.thumbnail}')`;
  }

  public focus(e: Event): void {
    if (this.news) {
      if (!this.focused) {
        e.preventDefault();
        e.stopPropagation();
        this.$emit('focus');
      } else {
        this.$router.push({ name: 'news', params: { news: this.news._id } });
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.news-tile-features {
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-wrap: nowrap;
  border-radius: $border-radius;
  background: #eaeaec;
  background: {
    repeat: no-repeat;
    size: cover;
    position: center;
  }

  transition: 0.3s ease-in-out;
  transition-delay: 0.1s;

  filter: brightness(50%);
  &[focused] {
    cursor: pointer;
    filter: none;
  }

  &:not(:first-of-type) {
    margin-left: 30px;
  }

  width: calc(90vw - 120px);
  max-width: calc(#{$content-max-width} - 120px);
  flex-shrink: 0;
  scroll-snap-align: center;

  height: 400px;

  .media {
    min-width: 120px;
    min-height: 120px;
  }

  .container {
    background: linear-gradient(to top, #000, transparent 50%);
    border-radius: 0 0 $border-radius $border-radius;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    width: 100%;

    .title {
      font-weight: bold;
      font-size: 20px;
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
