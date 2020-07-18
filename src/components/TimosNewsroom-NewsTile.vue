<template>
  <div
    v-if="news"
    class="timos-newsroom--news-tile"
    :class="{ latest: latest }"
    :style="{ animationDelay: index / 500 + 's' }"
  >
    <div class="thumbnail" :class="{ hasBackground: hasBackground }">
      <tc-image :src="news.thumbnail" />
      <!-- <img :src="news.thumbnail" alt="" /> -->
    </div>
    <div class="informations">
      <div class="type" :class="news.type">{{ news.type }}</div>
      <div class="title">{{ news.title }}</div>
      <div class="description">{{ news.description }}</div>
      <div class="grower"></div>
      <div class="links" v-if="news.links && news.links.length > 0">
        <div class="links-title">Links</div>
        <tc-link
          v-for="l in news.links"
          :key="news.date + l.title"
          :href="l.href"
          >{{ l.title }}</tc-link
        >
      </div>
      <div class="footer">
        <tc-tooltip :tooltip="new Date(news.date).toLocaleString()">
          <div class="date">{{ formatDate(news.date) }}</div>
        </tc-tooltip>

        <tc-link v-if="news.project" :href="getProjectURL(news.project)">
          {{ news.project }}
        </tc-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { News, Project } from '@/utils/models';
import { urls } from '@/utils/constants';
import { formatDate } from '@/utils/functions';
@Component
export default class TimosNewsroomNewsTile extends Vue {
  @Prop() news!: News;
  @Prop({ default: false }) latest!: boolean;
  @Prop() index!: number;

  get hasBackground(): boolean {
    return (
      this.news.description.startsWith('This update brings ') ||
      this.news.description.endsWith('speed up your development workflow.')
    );
  }

  public formatDate(date: number): string {
    return formatDate(date);
  }

  public getProjectURL(project: Project) {
    return urls[project];
  }
}
</script>

<style lang="scss" scoped>
@keyframes slide-in-bottom {
  0% {
    transform: translateY(1000px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
.timos-newsroom--news-tile {
  animation: slide-in-bottom 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  background: $paragraph;
  border-radius: $border-radius;
  z-index: 1;
  max-width: 90vw;
  display: grid;
  box-shadow: $shadow;
  &.latest {
    @media #{$isDesktop} {
      grid-template-columns: 1fr 1fr;
      .thumbnail img {
        height: 350px;
        margin-bottom: -4px;
      }
    }
  }
  .thumbnail {
    margin: 20px {
      bottom: 0;
    }

    img {
      width: 100%;
      max-height: 300px;
      max-width: 100%;
      object-fit: contain;
      border-radius: $border-radius;
    }
    &.hasBackground {
      margin: 0;
      img {
        object-fit: cover;
      }
    }
  }
  .informations {
    display: flex;
    flex-direction: column;
    padding: 20px;
    .type {
      text-transform: uppercase;
      font-weight: 550;
      font-size: 14px;
      margin-bottom: 5px;
      &.feature {
        color: $success;
      }
      &.update {
        color: $primary;
      }
      &.release {
        color: $error;
      }
    }
    .title {
      font-weight: bold;
      font-size: 1.5em;
      margin-bottom: 10px;
    }
    .description {
      font-weight: 500;
      margin-bottom: 10px;
    }
    .grower {
      flex-grow: 1;
    }
    .links {
      margin-left: -5px;
      .links-title {
        font-weight: 500;
        margin-left: 5px;
      }
      .tc-link {
        width: fit-content;
        margin: 2px 5px;
      }
    }
    .footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .date {
        opacity: 0.5;
      }
    }
  }
}
</style>
