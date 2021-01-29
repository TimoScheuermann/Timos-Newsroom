<template>
  <div class="view-news">
    <div content section-wrapper>
      <tl-flow flow="column" v-if="!notFound && !news">
        <tc-spinner size="20" />
        <p>Loading...</p>
      </tl-flow>
      <tl-flow flow="column" v-else-if="notFound">
        <i error huge class="ti-exclamation-triangle" />
        <span>Nothing found</span>
      </tl-flow>

      <template v-else>
        <div class="news-head">
          <div class="type" :type="news.type">{{ news.type }}</div>
          <div class="title">{{ news.title }}</div>
          <div class="date">{{ date }}</div>

          <div class="share-options">
            <button @click="shareTwitter">
              <i class="ti-twitter"></i>
            </button>
            <a :href="shareMail">
              <i class="ti-mail"></i>
            </a>
            <button @click="copyURL">
              <i class="ti-link"></i>
            </button>
          </div>
          <tc-divider></tc-divider>
        </div>

        <tc-image :src="news.thumbnail" />

        <p line-break>{{ news.content }}</p>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { backendURL, months } from '@/utils/constants';
import { copyToClipboard } from '@/utils/functions';
import { INewsExtended } from '@/utils/interfaces';
import { Vue, Component, Watch } from 'vue-property-decorator';

@Component
export default class News extends Vue {
  public news: INewsExtended | null = null;
  public notFound = false;

  mounted() {
    this.loadNews();
  }

  @Watch('$route')
  public loadNews() {
    this.notFound = false;
    this.news = null;
    fetch(`${backendURL}/newsroom/news/${this.$route.params.news}`)
      .then(res => res.json())
      .then(res => (this.news = res));
  }

  get mediaStyle(): string {
    if (!this.news) return '';
    return `background-image: url('${this.news.thumbnail}')`;
  }

  get date(): string {
    if (!this.news) return '';
    const date = new Date(this.news.timestamp);

    return `${
      months[date.getMonth()]
    } ${date.getDate()}, ${date.getFullYear()}`;
  }

  public shareTwitter(): void {
    const url = `https://twitter.com/intent/tweet?url=${encodeURI(
      window.location.href
    )}&text=`;
    this.openWindow(url, 'twitter');
  }

  get shareMail(): string | null {
    if (!this.news) return null;
    return `mailto:?subject=${encodeURI(this.news!.title)}&body=${encodeURI(
      window.location.href
    )}`;
  }

  public copyURL(): void {
    copyToClipboard(window.location.href);
  }

  public openWindow(url: string, provider: string): void {
    const params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=400,height=500,left=100,top=100`;
    window.open(url, 'share-' + provider + this.$route.params.news, params);
  }
}
</script>

<style lang="scss" scoped>
.view-news {
  min-height: 100vh;

  .news-head,
  p {
    max-width: 600px;
    margin: 20px auto;
  }

  img {
    border-radius: $border-radius;
    overflow: hidden;
    max-width: 100%;
    background: #eaeaec;
  }

  .title {
    font-weight: bold;
    font-size: 32px;
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

  .share-options {
    margin-top: 30px;
    margin-bottom: 10px;

    button,
    a {
      display: inline-block;
      border: none;
      outline: none;
      color: inherit;
      text-decoration: none;
      background: none;
      font-size: 20px;
      cursor: pointer;
      opacity: 0.75;

      transition: 0.2s ease-in-out;
      &:hover {
        opacity: 1;
      }
      &:not(:first-child) {
        margin-left: 10px;
      }
    }
  }
}
</style>
