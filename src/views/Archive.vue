<template>
  <div class="view-archive">
    <section content section-wrapper>
      <div class="archive-head">
        <NewsSubview subtitle="Archive" :title="project || 'Newsroom'" />
        <tl-flow>
          <tc-select
            placeholder="Select a project"
            :showSelection="false"
            @selectedItems="projectChanged"
          >
            <tc-select-item
              v-for="p in $store.getters.projects"
              :key="p"
              :title="p"
              :defaultSelected="p === project"
            />
          </tc-select>
        </tl-flow>
      </div>

      <br />
      <tl-flow flow="column" v-if="!news">
        <tc-spinner size="20" />
        <p>Loading News...</p>
      </tl-flow>
      <tl-flow flow="column" v-else-if="news.length === 0">
        <i huge error class="ti-exclamation-triangle" />
        <p>Unable to load news.</p>
      </tl-flow>

      <template v-else>
        <NewsTileSmall v-for="r in news" :key="r._id" :news="r" />
      </template>
    </section>
  </div>
</template>

<script lang="ts">
import NewsSubview from '@/components/News-Subview.vue';
import NewsTileSmall from '@/components/News-Tile-Small.vue';
import { backendURL } from '@/utils/constants';
import { INewsExtended } from '@/utils/interfaces';
import { Vue, Component, Watch } from 'vue-property-decorator';

@Component({
  components: {
    NewsSubview,
    NewsTileSmall
  }
})
export default class Archive extends Vue {
  public news: INewsExtended[] | null = null;

  get project(): string | null {
    return this.$route.params.project;
  }

  mounted(): void {
    this.loadNews();
  }

  @Watch('$route', { deep: true })
  public loadNews(): void {
    this.news = null;
    let project = '';
    if (this.project) {
      project = '?project=' + this.project;
    }

    fetch(`${backendURL}/newsroom${project}`)
      .then(res => res.json())
      .then(res => (this.news = res));
  }

  public projectChanged(selection: string[]): void {
    if (selection.length === 0 && this.project) {
      this.$router.push({ name: 'archive' });
      return;
    }
    const project = selection[0];
    if (project && project != this.project) {
      this.$router.push({
        name: 'archive-project',
        params: { project: project }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.view-archive {
  .archive-head {
    display: grid;
    grid-template-columns: 1fr auto;
    grid-gap: 5px;
  }
}
</style>
