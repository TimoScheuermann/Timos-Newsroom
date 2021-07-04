<template>
  <div class="view-project">
    <div content section-wrapper>
      <NewsSubview :title="$route.params.project" />

      <tl-flow flow="column" v-if="!news">
        <tc-spinner size="20" />
        <p>Loading...</p>
      </tl-flow>
      <tl-flow flow="column" v-else-if="news.length === 0">
        <i error huge class="ti-exclamation-triangle" />
        <span>Nothing found</span>
      </tl-flow>
      <tl-grid v-else minWidth="250">
        <NewsTile v-for="n in news" :key="n.id" :news="n" />
      </tl-grid>

      <tc-link
        v-if="news && news.length > 7"
        :to="{ name: 'archive-project', params: { project: project } }"
      >
        View more <i class="ti-chevron-right" />
      </tc-link>
    </div>
  </div>
</template>

<script lang="ts">
import NewsSubview from '@/components/News-Subview.vue';
import NewsTile from '@/components/News-Tile.vue';
import { backendURL } from '@/utils/constants';
import { INewsExtended, IProjectNewsroom } from '@/utils/interfaces';
import { Vue, Component, Watch } from 'vue-property-decorator';

@Component({
  components: {
    NewsSubview,
    NewsTile
  }
})
export default class Project extends Vue {
  public news: INewsExtended[] | null = null;

  mounted() {
    this.loadNews();
  }

  get project(): string {
    const p = this.$route.params.project;
    const projects: IProjectNewsroom[] = this.$store.getters.projects;
    return projects.filter(x =>
      x.title.toLowerCase().includes(p.toLowerCase())
    )[0].id;
  }

  @Watch('$route')
  public loadNews(): void {
    this.news = null;
    fetch(`${backendURL}/newsroom/project/${this.project}?limit=10`)
      .then(res => res.json())
      .then(res => (this.news = res));
  }
}
</script>
<style lang="scss" scoped>
.view-project {
  min-height: 100vh;
  .tl-grid {
    .news-tile:first-child {
      grid-column: 1 / -1;
    }
  }

  .tc-link {
    display: block;
    width: fit-content;
    margin: 30px auto;
    i {
      font-size: 12px;
    }
    margin-bottom: calc(30px + env(safe-area-inset-bottom));
  }
}
</style>
