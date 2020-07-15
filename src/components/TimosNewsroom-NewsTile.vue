<template>
  <div class="timos-newsroom--news-tile" :class="{ latest: latest }">
    <div class="thumbnail">
      <tc-image :src="news.thumbnail" />
      <!-- <img :src="news.thumbnail" alt="" /> -->
    </div>
    <div class="informations">
      <div class="type" :class="news.type">{{ news.type }}</div>
      <div class="title">{{ news.title }}</div>
      <div class="description">{{ news.description }}</div>
      <div class="grower"></div>
      <div class="footer">
        <div class="date">{{ formatDate(news.date) }}</div>

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

  public formatDate(date: Date): string {
    return formatDate(date);
  }

  public getProjectURL(project: Project) {
    return urls[project];
  }
}
</script>

<style lang="scss" scoped>
.timos-newsroom--news-tile {
  background: $paragraph;
  border-radius: $border-radius;
  overflow: hidden;
  max-width: 90vw;
  display: grid;
  box-shadow: $shadow;
  &.latest {
    grid-template-columns: 1fr 1fr;
    .thumbnail img {
      height: 350px;
    }
  }
  .thumbnail {
    img {
      width: 100%;
      height: 300px;
      max-width: 100%;
      object-fit: cover;
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
      &.change {
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
